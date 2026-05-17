// ENDPOINTS:
//   GET /api/nodes -> all nodes for FROM dropdown (excludes Lift nodes)
//   GET /api/nodes/destinations -> destination-only nodes for TO dropdown
//   GET /api/route/all-> A* for all 4 priorities (for Home time estimates)
//   GET /api/routem -> A* for one priority (full result with steps + images)\

const express = require("express");
const router = express.Router();
const pool = require("../db/pool");
const { astar } = require("../services/astar");

//returns true if current time (WIB = UTC+7) falls within UNPAR rush hours, lift edges are multiplied by 2 to reflect the extra waiting time (queue at lift, slower doors, etc.)
function isRushHour() {
  //wib = utc+7
  const now = new Date();
  const wibHour = (now.getUTCHours() + 7) % 24;
  const wibMin = now.getUTCMinutes();

  //convert to minute
  const totalMin = wibHour * 60 + wibMin;

  // rush hour
  const rushWindows = [
    [7 * 60 + 30, 8 * 60 + 10], // 07:30 – 08:10
    [9 * 60 + 30, 10 * 60 + 10], // 09:30 – 10:10
    [11 * 60 + 40, 12 * 60 + 20], // 11:40 – 12:20
    [12 * 60 + 40, 13 * 60 + 10], // 12:40 – 13:10
  ];

  return rushWindows.some(
    ([start, end]) => totalMin >= start && totalMin < end,
  );
}

// buildGraph()
// adjacency list
//   "1": { id, nama, tipe, lantai, lantai_label, x, y, confirmation_image, neighbors: [...] }
// tipe: 0=lantai (floor/room), 1=tangga (stairs), 2=lift (elevator)

async function buildGraph() {
  const nodesRes = await pool.query("SELECT * FROM node");
  const edgesRes = await pool.query("SELECT * FROM edge");
  const rushHour = isRushHour();

  const graph = {};

  for (const node of nodesRes.rows) {
    graph[String(node.id)] = {
      // String key : A* returns string IDs in path
      id: node.id,
      nama: node.nama,
      tipe: node.tipe,
      lantai: node.lantai,
      lantai_label: node.lantai_label,
      confirmation_image: node.confirmation_image || null,
      x: parseFloat(node.x),
      y: parseFloat(node.y),
      neighbors: [],
    };
  }

  for (const edge of edgesRes.rows) {
    if (graph[String(edge.from_id)]) {
      const fromNode = graph[String(edge.from_id)];
      const toNode = graph[String(edge.to_id)];
      const isLiftEdge = fromNode?.tipe === 2 && toNode?.tipe === 2;
      const rushPenalty = rushHour && isLiftEdge ? 2 : 1;

      graph[String(edge.from_id)].neighbors.push({
        toId: edge.to_id,
        weight: parseFloat(edge.weight) * rushPenalty,
        accessible: edge.accessible,
      });
    }
  }

  return graph;
}

// GET /api/nodes
// All nodes for FROM dropdown. Excludes "Lift%" nodes.

router.get("/nodes", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, nama, tipe FROM node
       WHERE nama NOT ILIKE 'Lift%'
       ORDER BY nama ASC`,
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching nodes:", err);
    res.status(500).json({ error: "Failed to fetch nodes" });
  }
});

// GET /api/nodes/destinations
// Only is_destination = TRUE nodes for TO dropdown

router.get("/nodes/destinations", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, nama, tipe FROM node
       WHERE is_destination = TRUE
       ORDER BY nama ASC`,
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching destination nodes:", err);
    res.status(500).json({ error: "Failed to fetch destination nodes" });
  }
});

// GET /api/route/all?from=1&to=5

router.get("/route/all", async (req, res) => {
  const { from, to } = req.query;
  if (!from || !to)
    return res.status(400).json({ error: "from and to are required" });

  if (from === to)
    return res
      .status(400)
      .json({ error: "from and cannot be the same location" });
  try {
    const graph = await buildGraph();
    const fromId = String(from);
    const toId = String(to);

    if (!graph[fromId] || !graph[toId]) {
      return res.status(404).json({ error: "Node not found" });
    }

    const priorities = [
      {
        key: "none",
        filter: () => true,
        fallback: false,
      },
      {
        key: "tangga",
        // Allow lantai(0) + tangga(1), block lift(2)
        filter: (edge) => {
          const t = graph[String(edge.toId)];
          return t && t.tipe !== 2;
        },
        fallback: true,
      },
      {
        key: "lift",
        // Allow lantai(0) + lift(2), block tangga(1)
        filter: (edge) => {
          const t = graph[String(edge.toId)];
          return t && t.tipe !== 1;
        },
        fallback: true,
      },
      {
        key: "disabilitas",
        filter: (edge) => edge.accessible === 1 || edge.accessible === 2,
        fallback: false,
      },
    ];

    const results = {};

    for (const p of priorities) {
      let result = astar(graph, fromId, toId, p.filter);
      if (!result && p.fallback)
        result = astar(graph, fromId, toId, () => true);

      if (!result) {
        results[p.key] = null;
        continue;
      }

      const entry = {
        cost: result.cost,
        path: result.path.map((id) => graph[id].nama),
      };

      if (p.key === "disabilitas") {
        const pairs = [];
        for (let i = 0; i < result.path.length - 1; i++) {
          pairs.push({ from: result.path[i], to: result.path[i + 1] });
        }
        const accRes = await Promise.all(
          pairs.map((pair) =>
            pool.query(
              "SELECT accessible FROM edge WHERE from_id = $1 AND to_id = $2",
              [pair.from, pair.to],
            ),
          ),
        );
        const accValues = accRes
          .map((r) => r.rows[0]?.accessible)
          .filter((v) => v !== undefined);
        entry.hasAssist = accValues.some((v) => v === 2);
      }

      results[p.key] = entry;
    }

    res.json(results);
  } catch (err) {
    console.error("Error in /route/all:", err);
    res.status(500).json({ error: "Failed to calculate routes" });
  }
});

// GET /api/route?from=1&to=5&priority=lift

router.get("/route", async (req, res) => {
  const { from, to, priority } = req.query;
  if (!from || !to || !priority) {
    return res
      .status(400)
      .json({ error: "from, to, and priority are required" });
  }

  try {
    const graph = await buildGraph();
    const fromId = String(from);
    const toId = String(to);

    if (!graph[fromId] || !graph[toId]) {
      return res.status(404).json({ error: "Node not found" });
    }

    // FILTER
    //use tipe: 0=lantai, 1=tangga, 2=lift.
    let filterEdge;
    let useFallback = false;

    if (priority === "none") {
      filterEdge = () => true;
    } else if (priority === "tangga") {
      // Block lift nodes (tipe=2), allow lantai(0) and tangga(1)
      filterEdge = (edge) => {
        const t = graph[String(edge.toId)];
        return t && t.tipe !== 2;
      };
      useFallback = true;
    } else if (priority === "lift") {
      // Block tangga nodes (tipe=1), allow lantai(0) and lift(2)
      filterEdge = (edge) => {
        const t = graph[String(edge.toId)];
        return t && t.tipe !== 1;
      };
      useFallback = true;
    } else if (priority === "disabilitas") {
      filterEdge = (edge) => edge.accessible === 1 || edge.accessible === 2;
    } else {
      filterEdge = () => true;
    }

    // A*
    let result = astar(graph, fromId, toId, filterEdge);
    if (!result && useFallback) result = astar(graph, fromId, toId, () => true);

    if (!result) {
      return res.status(404).json({
        error:
          priority === "disabilitas"
            ? "Tidak ada rute yang sepenuhnya accessible untuk pengguna disabilitas pada jalur ini."
            : "Tidak ada rute yang ditemukan.",
      });
    }

    // PATH NODES
    const pathNodes = result.path.map((id) => ({
      id: Number(id),
      nama: graph[id].nama,
      tipe: graph[id].tipe,
    }));

    const pathStr = pathNodes.map((n) => n.nama).join(" -> ");
    const lastNodeId = result.path[result.path.length - 1];
    const confirmationImage = graph[lastNodeId]?.confirmation_image || null;

    // EDGE PAIRS
    const edgePairs = [];
    for (let i = 0; i < result.path.length - 1; i++) {
      edgePairs.push({ from: result.path[i], to: result.path[i + 1] });
    }

    // FETCH EDGE IDs
    const edgeQueryResults = await Promise.all(
      edgePairs.map((pair) =>
        pool.query("SELECT id FROM edge WHERE from_id = $1 AND to_id = $2", [
          pair.from,
          pair.to,
        ]),
      ),
    );
    const edgesData = edgeQueryResults.map((r) => r.rows[0] || null);

    // FETCH IMAGES
    const edgeIds = edgesData.filter(Boolean).map((e) => e.id);
    const imagesMap = {};

    if (edgeIds.length > 0) {
      const imagesRes = await pool.query(
        `SELECT id, edge_id, image_url, step_order, petunjuk
         FROM edge_images
         WHERE edge_id = ANY($1)
         ORDER BY edge_id, step_order ASC`,
        [edgeIds],
      );
      imagesRes.rows.forEach((img) => {
        if (!imagesMap[img.edge_id]) imagesMap[img.edge_id] = [];
        imagesMap[img.edge_id].push({
          url: img.image_url,
          petunjuk: img.petunjuk,
          stepOrder: img.step_order,
        });
      });
    }

    // BUILD STEPS WITH LIFT COLLAPSING
    // Consecutive lift-touching edges are collapsed into one step.
    // The petunjuk for that step is generated dynamically:
    // "Masuk lift, tekan tombol lantai [lantai_label]"
    const steps = [];
    let i = 0;

    while (i < edgePairs.length) {
      const pair = edgePairs[i];
      const fromNode = graph[pair.from];
      const toNode = graph[pair.to];

      const fromIsLift = fromNode.tipe === 2;
      const toIsLift = toNode.tipe === 2;
      const isLiftEdge = fromIsLift || toIsLift;
      if (!fromIsLift && toIsLift) {
        let j = i;

        while (j < edgePairs.length && graph[edgePairs[j].to].tipe === 2) {
          j++;
        }

        const lastLiftPair = edgePairs[j - 1];
        const lastLiftNode = graph[lastLiftPair.to];

        const targetFloor =
          lastLiftNode.lantai_label ?? lastLiftNode.lantai ?? "?";

        const firstEdge = edgesData[i];
        const liftImages = firstEdge ? imagesMap[firstEdge.id] || [] : [];

        steps.push({
          from: fromNode.nama,
          to: lastLiftNode.nama,
          fromTipe: fromNode.tipe,
          toTipe: lastLiftNode.tipe,
          petunjuk: `Masuk ke ${toNode.nama}, tekan tombol lantai ${targetFloor}`,
          images: liftImages,
          isLiftStep: true,
        });

        i = j;
        continue;
      } else if (fromIsLift && toIsLift) {
        i++;
        continue;
      } else {
        const edge = edgesData[i];

        steps.push({
          from: fromNode.nama,
          to: toNode.nama,
          fromTipe: fromNode.tipe,
          toTipe: toNode.tipe,
          petunjuk: null,
          images: edge ? imagesMap[edge.id] || [] : [],
          isLiftStep: false,
        });
      }

      i++;
    }

    res.json({
      priority,
      pathStr,
      cost: result.cost,
      path: pathNodes,
      steps,
      confirmationImage,
    });
  } catch (err) {
    console.error("Error in /route:", err);
    res.status(500).json({ error: "Pathfinding failed" });
  }
});

module.exports = router;

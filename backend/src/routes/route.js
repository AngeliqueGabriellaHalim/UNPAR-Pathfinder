//handle logic

const express = require("express");
const router = express.Router(); // Router = a mini-app for grouping related routes
const pool = require("../db/pool");
const { astar } = require("../services/astar");

// build graph structure (adj list) from all nodes and edge for a star -> faster because we need to know node's neighbors

// adj list :
// list of {fromNode : [list of to Nodes]}
async function buildGraph() {
  // fetch all node
  const nodesRes = await pool.query("SELECT * FROM node");

  // fetch all edge
  const edgesRes = await pool.query("SELECT * FROM edge");

  //initiate graph
  const graph = {};

  // add all nodes to the graph with empty neighbors array
  for (const node of nodesRes.rows) {
    graph[node.id] = {
      id: node.id,
      nama: node.nama,
      tipe: node.tipe,
      x: parseFloat(node.x),
      y: parseFloat(node.y),
      neighbors: [], //empty for now
    };
  }

  // fill the neighbors array of each node
  for (const edge of edgesRes.rows) {
    // check if source node exist in graph object
    if (graph[edge.from_id]) {
      graph[edge.from_id].neighbors.push({
        toId: edge.to_id,
        weight: parseFloat(edge.weight),
        accessible: edge.accessible,
        petunjuk: edge.petunjuk,
      });
    }
  }

  return graph;
}

// GET /api/nodes
// Returns ALL nodes:for FROM ("Dari") dropdown
// any node can be starting node
router.get("/nodes", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, nama, tipe FROM node ORDER BY nama ASC",
      // "SELECT id, nama FROM node ORDER BY nama ASC",
    );

    // respond with array of objects nodes
    res.json(result.rows);
  } catch (err) {
    //log error
    console.error("Error fetching nodes:", err);
    res.status(500).json({ error: "Failed to fetch nodes" });
  }
});

// GET /api/nodes/destinations
// returns ONLY nodes where is_destination = 1
// for the TO ("Ke") dropdown
router.get("/nodes/destinations", async (req, res) => {
  try {
    const result = await pool.query(
      // "SELECT id, nama FROM node WHERE is_destination = TRUE ORDER BY nama ASC"
      "SELECT id, nama, tipe FROM node WHERE is_destination = TRUE ORDER BY nama ASC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching destination nodes:", err);
    res.status(500).json({ error: "Failed to fetch destination nodes" });
  }
});

//GET /api/route/all?from=1&to=5

// Runs A* once per priority: tangga, lift, disabilitas
// and returns all results at once, bcs we need estimate time of all priority

router.get("/route/all", async (req, res) => {
  // req.query = the ?from=1&to=5 part of the URL, parsed into an object
  const { from, to } = req.query;

  // both params must be present in url
  if (!from || !to) {
    return res.status(400).json({ error: "from and to are required" });
    // client mistake error
  }

  try {
    const graph = await buildGraph();
    const fromId = String(from);
    const toId = String(to);

    // both node must exist in graph
    if (!graph[fromId] || !graph[toId]) {
      return res.status(404).json({ error: "Node not found" });
    }

    // TANGGA MODE: node tipe 1
    // LIFT MODE: node tipe 2
    // DISABILITAS MODE: edge accessible (1/2)

    const priorities = [
      {
        //no prio or fastest route
        key: "none",

        //default : no prio
        // always says yes = no filter
        filter: () => true,
      },
      {
        //prio tangga
        key: "tangga",
        // avoid lift if possible

        // Step 1: run A* blocking lift nodes (tipe=2) , prefer tangga
        // Step 2: if null (no path found), run A* again with no filter

        //filter all lift node
        filter: (edge) => {
          const targetNode = graph[String(edge.toId)];
          return targetNode && targetNode.tipe !== 2; // prefer no lifts
        },
        fallback: true, // true -> try a star again with no prio
      },
      {
        //filter all stair nodes
        key: "lift",
        filter: (edge) => {
          const targetNode = graph[String(edge.toId)];
          return targetNode && targetNode.tipe !== 1; // prefer no stairs
        },
        fallback: true,
      },
      {
        key: "disabilitas",
        // only accessible edges
        // no path -> return & no need to try again-> "rute not found"
        filter: (edge) => edge.accessible === 1 || edge.accessible === 2,
        fallback: false, // never fall back, inaccessible paths are not an option
      },
    ];

    // run A* for each priority and collect results
    const results = {};

    for (const p of priorities) {
      let result = astar(graph, fromId, toId, p.filter);

      //if no path found, retry with no prio
      if (!result && p.fallback) {
        result = astar(graph, fromId, toId, () => true);
      }

      results[p.key] = result
        ? {
            cost: result.cost,
            path: result.path.map((id) => graph[id].nama),
          }
        : null;
    }

    //send all 3 results
    res.json(results);
  } catch (err) {
    console.error("Error in /route/all:", err);
    res.status(500).json({ error: "Failed to calculate routes" });
  }
});

// GET /api/route?from=1&to=5&priority=tangga
// runs A* for ONE specific priority and returns the full result
// used for showing final result after clicking "cari rute"

// ?from=1&to=5&priority=tangga (or lift, or disabilitas)

router.get("/route", async (req, res) => {
  const { from, to, priority } = req.query;

  // all 3 params are required
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

    // set filter and fallback based on chosen prio
    let filterEdge;
    let useFallback = false;

    if (priority === "none") {
      // no filter at all
      filterEdge = () => true;
      useFallback = false;
    } else if (priority === "tangga") {
      // block lift nodes
      filterEdge = (edge) => {
        const target = graph[String(edge.toId)];
        return target && target.tipe !== 2; // try to avoid lift nodes
      };
      useFallback = true; // allowed to retry without filter if no path found
    } else if (priority === "lift") {
      // block all stair nodes
      filterEdge = (edge) => {
        const target = graph[String(edge.toId)];
        return target && target.tipe !== 1; // try to avoid tangga nodes
      };
      useFallback = true;
    } else if (priority === "disabilitas") {
      // only allow edges where accessible = 1 or 2.
      //no such path exists -> return error
      filterEdge = (edge) => edge.accessible === 1 || edge.accessible === 2;
      useFallback = false;
    } else {
      filterEdge = () => true;
      useFallback = false;
    }

    // run A* with the chosen filter
    let result = astar(graph, fromId, toId, filterEdge);

    // retry for fallback true prio
    if (!result && useFallback) {
      result = astar(graph, fromId, toId, () => true);
    }

    // eeror for no path found
    if (!result) {
      return res.status(404).json({
        error:
          priority === "disabilitas"
            ? "Tidak ada rute yang sepenuhnya accessible untuk pengguna disabilitas pada jalur ini."
            : "Tidak ada rute yang ditemukan.",
      });
    }

    // result path nodes
    const pathNodes = result.path.map((id) => ({
      id: Number(id),
      nama: graph[id].nama,
      tipe: graph[id].tipe,
    }));

    // pathStr = simple one slap sentence
    const pathStr = pathNodes.map((n) => n.nama).join(" -> ");

    res.json({
      priority, // echo back which priority was used
      path: pathNodes, // array of {id, nama, tipe} for step-by-step display
      pathStr: pathStr, // simple stringfor the one-line route display
      cost: result.cost, // total seconds
    });
  } catch (err) {
    console.error("Error in /route:", err);
    res.status(500).json({ error: "Pathfinding failed" });
  }
});

// export router so can be used by app
module.exports = router;

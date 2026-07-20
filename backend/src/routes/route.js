// route.js as Backend API Router
// handle graph construction from PostgreSQL, build graph matrix, build navigation steps + photos

// ENDPOINTS:
//   GET /api/nodes -> all nodes for FROM dropdown (excludes Lift nodes)
//   GET /api/nodes/destinations -> destination-only nodes for TO dropdown
//   GET /api/graph -> kirim matriks graf ke client (A* jalan di client)
//   GET /api/route/steps -> terima path dari client, balikin langkah + foto

const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

//returns true if current time (WIB = UTC+7) falls within UNPAR rush hours
function isRushHour() {
  const now = new Date();
  const wibHour = (now.getUTCHours() + 7) % 24;
  const wibMin = now.getUTCMinutes();
  const totalMin = wibHour * 60 + wibMin;
  // rush hour
  const rushWindows = [
    [7 * 60 + 30, 8 * 60 + 10], // 07:30 -- 08:10
    [9 * 60 + 30, 10 * 60 + 10], // 09:30 -- 10:10
    [11 * 60 + 40, 12 * 60 + 20], // 11:40 -- 12:20
    [12 * 60 + 40, 13 * 60 + 10], // 12:40 -- 13:10
  ];
  // true if current time is within the rush windows
  return rushWindows.some(
    ([start, end]) => totalMin >= start && totalMin < end,
  );
}

// buildGraph(): queries PostgreSQL for all nodes and edges
// Representasi: ADJACENCY MATRIX
// - nodeMeta[id]: data simpul (nama, tipe, koordinat, dll)
// - idList / indexOf: pemetaan id untuk indeks baris/kolom matriks
// - weightMatrix[i][j]: bobot sisi (null = tidak ada sisi)
// - accessMatrix[i][j]: nilai accessible sisi
// tipe: 0=lantai (floor/room), 1=tangga (stairs), 2=lift (elevator)
async function buildGraph() {
  const nodesRes = await pool.query("SELECT * FROM node");
  const edgesRes = await pool.query("SELECT * FROM edge");
  const rushHour = isRushHour();

  const nodeMeta = {}; //complete info tiap node
  const idList = []; //node id
  const indexOf = {}; //map node id -> matrix index

  //process every node from database
  for (const node of nodesRes.rows) {
    const sid = String(node.id);

    //assign each node a matrix index
    indexOf[sid] = idList.length;
    idList.push(sid);

    //store node metadata
    nodeMeta[sid] = {
      id: node.id,
      nama: node.nama,
      tipe: node.tipe,
      lantai: node.lantai,
      lantai_label: node.lantai_label,
      confirmation_image: node.confirmation_image || [],
      x: parseFloat(node.x),
      y: parseFloat(node.y),
    };
  }

  const n = idList.length; //num of nodes

  const weightMatrix = Array.from({ length: n }, () => new Array(n).fill(null));
  const accessMatrix = Array.from({ length: n }, () => new Array(n).fill(null));

  //process every edge from db
  for (const edge of edgesRes.rows) {
    const fromSid = String(edge.from_id);
    const toSid = String(edge.to_id);
    if (!nodeMeta[fromSid] || !nodeMeta[toSid]) continue;

    const fromNode = nodeMeta[fromSid];
    const toNode = nodeMeta[toSid];

    //check if edge represent waktu tunggu lift
    const isWaitingLift = fromNode?.tipe === 0 && toNode?.tipe === 2;

    let rushPenalty = 0;
    if (rushHour && isWaitingLift) {
      const liftName = toNode.nama.toLowerCase();
      if (liftName.includes("gedung 9")) {
        // Gedung 9: worst case 18 lantai x 20 detik
        rushPenalty = 18 * 20;
      } else if (liftName.includes("ppag")) {
        // PPAG: worst case 29 lantai x 15 detik
        rushPenalty = 29 * 15;
      }
    }

    // weight includes base travel time + any rush hour penalty.
    const w = parseFloat(edge.weight) + rushPenalty;
    // convert node IDs into matrix indices
    const i = indexOf[fromSid];
    const j = indexOf[toSid];

    // store edge weight and accessibility
    weightMatrix[i][j] = w;
    accessMatrix[i][j] = edge.accessible;
  }

  return { nodeMeta, idList, indexOf, weightMatrix, accessMatrix };
}

// caching graf di memori
// buildGraph() menjalankan 2 query SELECT * tiap
// permintaan padahal graf hampir tak berubah
// cache memakai ulang hasil build
let _graphCacheEntry = null;
const GRAPH_TTL_MS = 5 * 60 * 1000; //cache validity period (5 minutes)

async function getCachedGraph() {
  const now = Date.now();
  const rush = isRushHour();

  //reuse cached graph if cache exist and not expired, and rush hour status hasnt changed
  if (
    _graphCacheEntry &&
    _graphCacheEntry.rush === rush &&
    now - _graphCacheEntry.builtAt < GRAPH_TTL_MS
  ) {
    return _graphCacheEntry.data;
  }
  const data = await buildGraph(); // else rebuild the graph
  // Store the new graph together with its metadata
  _graphCacheEntry = { data, builtAt: now, rush };
  return data;
}

// GET /api/nodes
// All nodes for FROM dropdown. Excludes "Lift %" nodes.
router.get("/nodes", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, nama, tipe FROM node
   WHERE nama NOT ILIKE 'Lift %'
     AND tipe <> 1
   ORDER BY nama ASC`,
    );
    // Allow clients and browsers to cache the response for 10 minutes
    res.set("Cache-Control", "public, max-age=600");
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
    res.set("Cache-Control", "public, max-age=600");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching destination nodes:", err);
    res.status(500).json({ error: "Failed to fetch destination nodes" });
  }
});

// GET /api/graph
// kirim matriks graf langsung ke client
router.get("/graph", async (req, res) => {
  try {
    const { nodeMeta, idList, indexOf, weightMatrix, accessMatrix } =
      await getCachedGraph();

    const nodes = idList.map((id) => {
      const meta = nodeMeta[id];
      return {
        id: meta.id,
        nama: meta.nama,
        tipe: meta.tipe,
        lantai: meta.lantai,
        lantai_label: meta.lantai_label,
        x: meta.x,
        y: meta.y,
      };
    });

    res.set("Cache-Control", "public, max-age=300");
    res.json({ nodes, idList, indexOf, weightMatrix, accessMatrix });
  } catch (err) {
    console.error("Error in /graph:", err);
    res.status(500).json({ error: "Failed to build graph" });
  }
});

// GET /api/route/steps?path=1,7,12,5&priority=lift
// Menerima urutan simpul jalur yang SUDAH dihitung frontend, mengembalikan
// langkah navigasi + foto panduan dari basis data
router.get("/route/steps", async (req, res) => {
  const { path: pathParam, priority } = req.query;
  if (!pathParam) {
    return res.status(400).json({ error: "path is required" });
  }
  // Convert comma-separated IDs into an array
  const path = pathParam.split(",").map((s) => s.trim());
  if (path.length < 2) {
    return res
      .status(400)
      .json({ error: "path must contain at least 2 nodes" });
  }

  try {
    const { nodeMeta } = await getCachedGraph();

    for (const id of path) {
      if (!nodeMeta[id]) {
        return res.status(404).json({ error: `Node ${id} not found` });
      }
    }

    // PATH NODES: convert path IDs into readable objects
    const pathNodes = path.map((id) => ({
      id: Number(id),
      nama: nodeMeta[id].nama,
      tipe: nodeMeta[id].tipe,
    }));

    const pathStr = pathNodes.map((n) => n.nama).join(" -> ");
    const lastNodeId = path[path.length - 1];
    // confirmation_image sudah bertipe array dari kolom text[]
    const confirmationImages = nodeMeta[lastNodeId]?.confirmation_image || [];

    // EDGE PAIRS: convert path [A, B, C, D] into edge pairs [{A->B}, {B->C}, {C->D}]
    const edgePairs = [];
    for (let i = 0; i < path.length - 1; i++) {
      edgePairs.push({ from: path[i], to: path[i + 1] });
    }

    // ambil semua edge di jalur dalam 1 query
    // unnest pasangkan array from & to jadi baris, jadi ga perlu query per pasangan
    const fromIds = edgePairs.map((p) => Number(p.from));
    const toIds = edgePairs.map((p) => Number(p.to));

    const edgeRowsRes = await pool.query(
      `SELECT id, from_id, to_id FROM edge
       WHERE (from_id, to_id) IN (
         SELECT * FROM unnest($1::int[], $2::int[])
       )`,
      [fromIds, toIds],
    );

    // hasil query ga urut, susun balik ke urutan path lewat lookup key "from->to"
    const edgeLookup = {};
    for (const row of edgeRowsRes.rows) {
      edgeLookup[`${row.from_id}->${row.to_id}`] = row;
    }
    // Restore edges to match the original route order
    const edgesData = edgePairs.map(
      (p) => edgeLookup[`${p.from}->${p.to}`] || null,
    );

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
      // group images by edge_id for fast lookup
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
    // consecutive lift edges are collapsed into one step
    // "Masuk lift, tekan tombol lantai [lantai_label]"
    const steps = [];
    let i = 0;

    while (i < edgePairs.length) {
      const pair = edgePairs[i];
      const fromNode = nodeMeta[pair.from];
      const toNode = nodeMeta[pair.to];

      const fromIsLift = fromNode.tipe === 2;
      const toIsLift = toNode.tipe === 2;
      if (!fromIsLift && toIsLift) {
        let j = i;
        // scan forward while destination nodes are still elevator type.
        while (j < edgePairs.length && nodeMeta[edgePairs[j].to].tipe === 2) {
          j++;
        }
        // j now is first edge AFTER the elevator sequence
        // edgePairs[j-1].to is the last elevator node (target floor) untuk tombol lift
        const lastLiftPair = edgePairs[j - 1];
        const lastLiftNode = nodeMeta[lastLiftPair.to];

        const targetFloor =
          lastLiftNode.lantai_label ?? lastLiftNode.lantai ?? "?";
        // use photos from the FIRST edge only
        // use photos from the FIRST edge only; fall back to a default lift photo if none exist
        const firstEdge = edgesData[i];
        let liftImages = firstEdge ? imagesMap[firstEdge.id] || [] : [];
        if (liftImages.length === 0) {
          liftImages = [
            {
              url: "/uploads/532_543.png",
              petunjuk: null,
              stepOrder: 1,
            },
          ];
        }

        steps.push({
          from: fromNode.nama,
          to: lastLiftNode.nama,
          fromTipe: fromNode.tipe,
          toTipe: lastLiftNode.tipe,
          petunjuk: `Masuk ke ${toNode.nama}, tekan tombol lantai ${targetFloor}`,
          images: liftImages,
          isLiftStep: true,
        });

        // lewati merged steps
        i = j;
        continue;
      } else if (fromIsLift && toIsLift) {
        // safety guard kalau dimulai dari lift tanpa pintu
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
      pathStr, // path str for debug
      path: pathNodes, // array of {id, nama, tipe} objects
      steps, // navigation steps with photos & instructions
      confirmationImages,
    });
  } catch (err) {
    console.error("Error in /route/steps:", err);
    res.status(500).json({ error: "Failed to build navigation steps" });
  }
});

module.exports = router;

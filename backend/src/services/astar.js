// g(n) = actual cost from start to node n
// h(n) = heuristic: manhattan,  estimated cost from n to tujuan
// f(n) = g(n) + h(n) = total estimated cost through n
// openSet = node yang telah ter-discover namun belum  selesai dieksplor
// closedSet = nodes sudah selesai diproses (seluruh tetangga sudah dieksplorasi)
// cameFrom = parent node

function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

//masukan graf kampus, simpul awal, simpul tujuan, dan filter prio(default always true = rute tercepat)
// Result object {path: string[], cost: number}
//  path: Array of node IDs from start to end
//  cost: Total weight of the path in seconds
//  Returns null if no path exists sesuai filter
function astar(graph, startId, endId, filterEdge = () => true) {
  // openSet berisi id node
  const openSet = new Set([startId]);
  // mencegah node yang sudah dievaluasi diproses ulang
  const closedSet = new Set();
  // cameFrom = parent node, used to reconstruct the path at the end
  const cameFrom = {};

  // gScore = bobot aktual dari simpul awal hingga simpul n
  const gScore = {};

  // fScore =  total cost through each node, to decide which node to explore next
  const fScore = {};

  // initialize all scores to infinity, and update later
  for (const id in graph) {
    gScore[id] = Infinity;
    fScore[id] = Infinity;
  }

  // bobot aktual start node = 0
  gScore[startId] = 0;

  // fScore of start = 0 + heuristic to end node
  fScore[startId] = heuristic(graph[startId], graph[endId]);

  //MAIN LOOP
  // explore all candidate nodes
  while (openSet.size > 0) {
    // pilih node dengan fScore terendah di openSet
    let current = null;
    let lowestF = Infinity;
    for (const id of openSet) {
      if (fScore[id] < lowestF) {
        lowestF = fScore[id];
        current = id;
      }
    }

    // sampai di tujuan -> rekonstruksi & return path
    if (current === endId) {
      const path = [];
      let cur = endId;

      //reconstruct path from backwards
      while (cur !== undefined) {
        path.unshift(cur); // unshift = push to the front of the list
        cur = cameFrom[cur];
      }

      return {
        path: path, //arr of nodes id
        cost: gScore[endId], // total cost detik of the path
      };
    }

    // pindahkan current dari open ke closed
    openSet.delete(current);
    closedSet.add(current);

    // ambil semua tetangga current
    const neighbors = graph[current]?.neighbors || [];

    for (const edge of neighbors) {
      // apply prio filter
      // if filterEdge returns false, SKIP this edge
      if (!filterEdge(edge)) continue;

      // save neighbor id
      const neighbor = String(edge.toId);

      // node not exist = skip
      if (!graph[neighbor]) continue;

      // skip jika neighbor sudah ada di closedSet
      if (closedSet.has(neighbor)) continue;

      //check for tangga penalty
      const fromIsTangga = graph[current].tipe === 1;
      const toIsTangga = graph[neighbor].tipe === 1;
      const isTangga = fromIsTangga && toIsTangga; // BOTH must be tangga
      const finalWeight = isTangga ? edge.weight * 1.8 : edge.weight;

      // tentativeG = cost ke current + bobot efektif edge
      const tentativeG = gScore[current] + finalWeight;

      // cek apakah path baru lebih baik
      if (tentativeG < gScore[neighbor]) {
        // update records with this better path
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeG;
        fScore[neighbor] =
          tentativeG + heuristic(graph[neighbor], graph[endId]);
        // add neighbor to openSet
        openSet.add(neighbor);
      }
    }
  }

  // no path exists: open set empty but dest never reached
  return null;
}

// export so route.js can use it
module.exports = { astar };

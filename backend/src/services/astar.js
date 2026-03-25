//use manhattan as heuristic

// g(n) = actual cost from start to node n
// h(n) = heuristic: estimated cost from n to end
// f(n) = g(n) + h(n) = total estimated cost through n
// openSet = nodes we've discovered but haven't fully explored yet
// cameFrom = parent node

function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

//return : exam
//   { path: ["1","3","5"], cost: 75.5 }

function astar(graph, startId, endId, filterEdge = () => true) {
  // openSet = IDs of nodes we've found but not fully explored
  const openSet = new Set([startId]);

  // cameFrom = parent node -> child : parent
  // used to reconstruct the path at the end
  const cameFrom = {};

  // gScore = the real cost (sum of edge weights) from start to each node.
  // start at infinity for all nodes, then update as we find better paths.
  const gScore = {};

  // fScore = g + h =  total cost through each node -> to decide which node to explore next
  const fScore = {};

  // initialize all scores to infinity
  for (const id in graph) {
    gScore[id] = Infinity;
    fScore[id] = Infinity;
  }

  // start node cost 0
  gScore[startId] = 0;

  // fScore of start = 0 + heuristic to end node
  fScore[startId] = heuristic(graph[startId], graph[endId]);

  // explore all candidate nodes
  while (openSet.size > 0) {
    // pick the node in openSet with the lowest fScore
    let current = null;
    let lowestF = Infinity;
    for (const id of openSet) {
      if (fScore[id] < lowestF) {
        lowestF = fScore[id];
        current = id;
      }
    }

    // reach dest = reconstruct and return the path
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

    // remove current from openSet
    openSet.delete(current);

    // Lget all neighbors of current
    const neighbors = graph[current]?.neighbors || [];

    for (const edge of neighbors) {
      // apply prio filter.
      // if filterEdge returns false, SKIP this edge entirely = block unwanted edge

      //if not suitable then skip the edge
      if (!filterEdge(edge)) continue;

      // save neighbor id
      const neighbor = String(edge.toId);

      // not exist = skip
      if (!graph[neighbor]) continue;

      //check for tangga penalty
      const fromIsTangga = graph[current].tipe === 1;
      const toIsTangga = graph[neighbor].tipe === 1;
      const isTangga = fromIsTangga && toIsTangga; // BOTH must be tangga
      const effectiveWeight = isTangga ? edge.weight * 1.8 : edge.weight;

      // tentativeG = cost to reach current + effective edge weight
      const tentativeG = gScore[current] + effectiveWeight;

      // check if better path
      if (tentativeG < gScore[neighbor]) {
        // update our records with this better path
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeG;
        fScore[neighbor] =
          tentativeG + heuristic(graph[neighbor], graph[endId]);
        // add neighbor to openSet
        openSet.add(neighbor);
      }
    }
  }

  // no path exists
  return null;
}

// export so route.js can use it
module.exports = { astar };

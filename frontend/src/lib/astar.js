// g(n) = actual cost from start to node n
// h(n) = heuristic: manhattan, estimated cost from n to tujuan
// f(n) = g(n) + h(n) = total estimated cost through n
// openSet = node yang telah ter-discover namun belum selesai dieksplor
// closedSet = nodes sudah selesai diproses (seluruh tetangga sudah dieksplorasi)
// cameFrom = parent node

// Binary min-heap keyed by fScore,stores {id, f} entries
// Lazy-deletion strategy: instead of decrease-key, we push a new entry whenever a node's fScore improves, and discard stale entries on pop
class MinHeap {
  constructor() {
    this.heap = []; // internal array representation of the binary heap
  }

  get size() {
    return this.heap.length;
  }

  // Restore heap order by moving the new element upward
  push(id, f) {
    const heap = this.heap;
    heap.push({ id, f });
    // sift-up: Restore heap order by moving the root downward
    let i = heap.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (heap[parent].f <= heap[i].f) break;
      [heap[parent], heap[i]] = [heap[i], heap[parent]];
      i = parent;
    }
  }

  pop() {
    const heap = this.heap;
    const top = heap[0];
    const last = heap.pop();
    if (heap.length > 0) {
      heap[0] = last;
      // sift-down: turunkan akar hingga properti heap terpenuhi
      let i = 0;
      const n = heap.length;
      while (true) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        let smallest = i;
        if (left < n && heap[left].f < heap[smallest].f) smallest = left;
        if (right < n && heap[right].f < heap[smallest].f) smallest = right;
        if (smallest === i) break;
        [heap[smallest], heap[i]] = [heap[i], heap[smallest]];
        i = smallest;
      }
    }
    return top;
  }
}

function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// Executes the A* search algorithm
// graphData  : graph representation
// startId    : starting node
// endId      : destination node
// filterEdge : edge filter (default: allow all edges)
// Returns:
// {
//   path: array of node IDs,
//   cost: total travel cost
// }
// Returns null if no valid path exists
function astar(graphData, startId, endId, filterEdge = () => true) {
  const { nodeMeta, idList, indexOf, weightMatrix, accessMatrix } = graphData;

  // Tracks nodes whose shortest path has been finalized
  const closedSet = new Set();
  // cameFrom = parent node, used to reconstruct the path at the end
  const cameFrom = {};

  // gScore = bobot aktual dari simpul awal hingga simpul n
  // Current shortest known cost from the start node
  const gScore = {};

  // fScore = total cost through each node, to decide which node to explore next
  const fScore = {};

  // initialize all scores to infinity, and update later
  for (const id of idList) {
    gScore[id] = Infinity;
    fScore[id] = Infinity;
  }

  // bobot aktual start node = 0
  gScore[startId] = 0;

  // fScore of start = 0 + heuristic to end node
  fScore[startId] = heuristic(nodeMeta[startId], nodeMeta[endId]);

  // openHeap = priority queue (binary min-heap) berisi entri {id, f}
  // menggantikan pencarian linear O(n) menjadi pop O(log n)
  const openHeap = new MinHeap();
  openHeap.push(startId, fScore[startId]);

  // MAIN LOOP
  // explore all candidate nodes
  while (openHeap.size > 0) {
    // Remove the node with the lowest estimated total cost
    const { id: current, f: poppedF } = openHeap.pop();

    // ignore outdated entries that no longer match the current fScore
    if (poppedF > fScore[current]) continue;
    // lewati node yang sudah final (entri duplikat di heap)
    if (closedSet.has(current)) continue;

    // sampai di tujuan -> rekonstruksi & return path
    if (current === endId) {
      const path = [];
      let cur = endId;

      // reconstruct path from backwards
      while (cur !== undefined) {
        path.unshift(cur); // unshift = push to the front of the list
        cur = cameFrom[cur];
      }

      return {
        path: path, // arr of nodes id
        cost: gScore[endId], // total cost detik of the path
      };
    }

    // tandai current sebagai sudah selesai diproses
    closedSet.add(current);

    // baca tetangga dari baris matriks, skip sel yang null
    const i = indexOf[current];
    const row = weightMatrix[i];
    for (let j = 0; j < row.length; j++) {
      const w = row[j];
      if (w === null) continue; // ga ada edge i->j

      const neighbor = idList[j];

      // skip jika neighbor sudah ada di closedSet
      if (closedSet.has(neighbor)) continue;

      // bungkus jadi object edge biar filterEdge tetap jalan seperti versi list
      const edge = {
        toId: Number(neighbor),
        weight: w,
        accessible: accessMatrix[i][j],
      };
      // apply prio filter
      // if filterEdge returns false, SKIP this edge
      if (!filterEdge(edge)) continue;

      // check for tangga penalty
      const fromIsTangga = nodeMeta[current].tipe === 1;
      const toIsTangga = nodeMeta[neighbor].tipe === 1;
      const finalWeight = fromIsTangga && toIsTangga ? w * 1.8 : w;

      // tentativeG = cost ke current + bobot efektif edge
      const tentativeG = gScore[current] + finalWeight;

      // cek apakah path baru lebih baik
      if (tentativeG < gScore[neighbor]) {
        // update records with this better path
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeG;
        fScore[neighbor] =
          tentativeG + heuristic(nodeMeta[neighbor], nodeMeta[endId]);
        // push entri baru ke heap (lazy: tanpa decrease-key)
        openHeap.push(neighbor, fScore[neighbor]);
      }
    }
  }

  // no path exists: open set empty but dest never reached
  return null;
}

export { astar };

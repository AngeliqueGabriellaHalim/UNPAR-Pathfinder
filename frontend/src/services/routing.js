// get graf sekali per sesi, lalu jalankan A* di perangkat pengguna untuk seluruh prioritas
import { astar } from "../lib/astar";
import { getFilter } from "../lib/filter";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

let _graphCache = null; // cache graf selama sesi, fetch sekali pakai berulang

async function loadGraph() {
  if (_graphCache) return _graphCache; // udah ada? ga usah fetch lagi
  const res = await fetch(`${BACKEND_URL}/api/graph`);
  if (!res.ok) throw new Error("Gagal mengambil graf");
  // server kirim matriks + mapping id<->index
  const { nodes, idList, indexOf, weightMatrix, accessMatrix } =
    await res.json();

  // ubah array nodes jadi map {id: node} untuk lookup  saat A* jalan
  const nodeMeta = {};
  for (const n of nodes) nodeMeta[String(n.id)] = n;

  // simpan seluruh struktur matriks, dipakai A* untuk baca tetangga
  _graphCache = { nodeMeta, idList, indexOf, weightMatrix, accessMatrix };
  return _graphCache;
}

// hitung rute untuk keempat prioritas sekaligus
export async function computeAllRoutes(from, to) {
  const graphData = await loadGraph();
  const { nodeMeta, indexOf, weightMatrix, accessMatrix } = graphData;
  const out = {};

  for (const key of ["none", "tangga", "lift", "disabilitas"]) {
    const r = astar(
      graphData,
      String(from),
      String(to),
      getFilter(key, nodeMeta),
    );
    if (!r) {
      out[key] = null; // ga ada rute untuk prioritas ini, tombol jadi disabled
      continue;
    }
    const entry = {
      cost: r.cost,
      path: r.path.map((id) => nodeMeta[id].nama), // id -> agar nama  kebaca
    };

    // pengecekan hasAssist untuk prioritas disabilitas
    if (key === "disabilitas") {
      // cek apakah ada edge di jalur dengan accessible === 2 (butuh pendamping)
      let hasAssist = false;
      for (let k = 0; k < r.path.length - 1; k++) {
        // baca pasangan simpul dari matriks lewat indexOf
        const i = indexOf[r.path[k]];
        const j = indexOf[r.path[k + 1]];
        if (weightMatrix[i][j] !== null && accessMatrix[i][j] === 2) {
          hasAssist = true;
          break;
        }
      }
      entry.hasAssist = hasAssist;
    }
    out[key] = entry;
  }
  return out;
}

// hitung satu rute + ambil langkah navigasi (pengganti /api/route)
// A* dijalankan lokal
//  server hanya dimintai foto/langkah lewat /route/steps.
export async function computeRouteWithSteps(from, to, priority) {
  const graphData = await loadGraph();
  const { nodeMeta } = graphData;
  const r = astar(
    graphData,
    String(from),
    String(to),
    getFilter(priority, nodeMeta),
  );
  if (!r) {
    // return object error (bukan throw) supaya RoutePage bisa cek data.error
    return {
      error:
        priority === "disabilitas"
          ? "Tidak ada rute yang sepenuhnya accessible untuk pengguna disabilitas pada jalur ini."
          : "Tidak ada rute yang ditemukan.",
    };
  }
  // A* sudah dapat path, server cuma diminta foto + petunjuk (server ga hitung rute)
  const stepsRes = await fetch(
    `${BACKEND_URL}/api/route/steps?path=${r.path.join(",")}&priority=${priority}`,
  );
  if (!stepsRes.ok) throw new Error("Gagal mengambil langkah navigasi");
  const data = await stepsRes.json();
  return { ...data, cost: r.cost }; // cost dihitung di client
}

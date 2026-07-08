// Dipakai oleh A* client-side untuk menyaring sisi sesuai prioritas rute
export function getFilter(priority, graph) {
  if (priority === "tangga") {
    return (edge) => {
      const t = graph[String(edge.toId)];
      return t && t.tipe !== 2;
    };
  }
  if (priority === "lift") {
    return (edge) => {
      const t = graph[String(edge.toId)];
      return t && t.tipe !== 1;
    };
  }
  if (priority === "disabilitas") {
    return (edge) => edge.accessible === 1 || edge.accessible === 2;
  }
  return () => true; // "none" atau default
}

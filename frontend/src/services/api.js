import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

//fetch all nodes
// return Promise<Array<{id, nama, tipe}>>
// All nodes for "Lokasi Anda" (FROM) dropdown
export const getNodes = () => api.get("/nodes").then((r) => r.data);

// fetch all dest nodes
// Returns: Promise<Array<{id, nama, tipe}>>
// Destination nodes only for "Tujuan Anda" (TO) dropdown
export const getDestinationNodes = () =>
  api.get("/nodes/destinations").then((r) => r.data);

//get all routes, returns promise <array of path for each prio>
// Run A* for all 4 priorities at once for time estimates on home page
export const getAllRoutes = (from, to) =>
  api
    .get("/route/all", {
      params: { from, to },
    })
    .then((r) => r.data);

//get chosen priority route
// Run A* for one priority: full route with steps + images
export const getRoute = (from, to, priority) =>
  api
    .get("/route", {
      params: { from, to, priority },
      //?from=id&to=id&priority=text
    })
    .then((r) => r.data);

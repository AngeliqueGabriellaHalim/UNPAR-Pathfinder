import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

//fetch all nodes
// return Promise<Array<{id, nama, tipe}>>
export const getNodes = () => api.get("/nodes").then((r) => r.data);

// fetch all dest nodes
// Returns: Promise<Array<{id, nama, tipe}>>
export const getDestinationNodes = () =>
  api.get("/nodes/destinations").then((r) => r.data);

//get all routes, returns promise <array of path for each prio>
export const getAllRoutes = (from, to) =>
  api
    .get("/route/all", {
      params: { from, to },
    })
    .then((r) => r.data);

//get chose priority route
export const getRoute = (from, to, priority) =>
  api
    .get("/route", {
      params: { from, to, priority },
      //?from=id&to=id&priority=text
    })
    .then((r) => r.data);

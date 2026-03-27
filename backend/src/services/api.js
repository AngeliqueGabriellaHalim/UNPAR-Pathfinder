// src/services/api.js
// All backend API calls in one place.

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

// All nodes → for "Lokasi Anda" (FROM) dropdown
export const getNodes = () => api.get("/nodes").then((r) => r.data);

// Destination nodes only → for "Tujuan Anda" (TO) dropdown
export const getDestinationNodes = () =>
  api.get("/nodes/destinations").then((r) => r.data);

// Run A* for all 4 priorities at once → for time estimates on home page
export const getAllRoutes = (from, to) =>
  api.get("/route/all", { params: { from, to } }).then((r) => r.data);

// Run A* for one priority → full route with steps + images
export const getRoute = (from, to, priority) =>
  api.get("/route", { params: { from, to, priority } }).then((r) => r.data);

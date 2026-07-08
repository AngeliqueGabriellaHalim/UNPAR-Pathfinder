import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: BACKEND_URL + "/api",
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

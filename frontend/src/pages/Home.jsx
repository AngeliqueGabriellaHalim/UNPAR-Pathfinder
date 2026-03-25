import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import RouteOption from "../components/RouteOption.jsx";
import {
  getNodes,
  getDestinationNodes,
  getAllRoutes,
} from "../services/api.js";

// available priorities
const PRIORITIES = ["none", "tangga", "lift", "disabilitas"];

export default function Home() {
  const navigate = useNavigate();

  //states
  const [nodes, setNodes] = useState([]); // all nodes for FROM
  const [destNodes, setDestNodes] = useState([]); // destination nodes for TO
  const [from, setFrom] = useState(null); // selected FROM node ID
  const [to, setTo] = useState(null); // selected TO node ID
  const [priority, setPriority] = useState(null); // selected priority
  const [routeData, setRouteData] = useState(null); // all route data of all prio {tangga:{cost,path}, lift:..., disabilitas:...}
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // initial data fetching, loads on mount
  useEffect(() => {
    // Promise.all runs both API calls at the same time (parallel),
    // then waits for both to finish before calling .then().
    // Faster than doing them sequentially.
    Promise.all([getNodes(), getDestinationNodes()])
      .then(([allNodes, destinations]) => {
        setNodes(allNodes);
        setDestNodes(destinations);
      })
      .catch(() =>
        setError("Gagal memuat data lokasi. Pastikan backend berjalan."),
      );
  }, []); // [] = only on mount

  // --- EFFECT 2: Fetch route estimates when from/to change ---
  // This runs every time `from` or `to` changes.
  // Gives users live cost estimates as they pick locations.
  useEffect(() => {
    // Don't fetch if either isn't selected, or both are the same node
    if (!from || !to || from === to) {
      setRouteData(null);
      return;
    }

    setLoading(true);
    setError("");

    getAllRoutes(from, to)
      .then((data) => {
        setRouteData(data); // data = {tangga: {...}, lift: {...}, disabilitas: {...}}
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal menghitung estimasi rute.");
        setLoading(false);
      });
  }, [from, to]); // re-run whenever from or to changes

  // --- SUBMIT ---
  // Called when user clicks "Cari Rute".
  // Navigates to /result and PASSES data via router state.
  //
  // WHY PASS DATA VIA STATE instead of URL params?
  // - We need to pass the `nodes` array for name lookups on the result page
  // - Arrays are too large and messy in URLs
  // - Router state is clean and immediate (no extra API call on result page)
  const handleSubmit = () => {
    if (!canSubmit) return;
    navigate("/result", {
      state: { from, to, priority, nodes },
      // nodes is passed so Result page can look up node names without
      // making another API call
    });
  };

  // Can the user submit? All 3 fields must be filled and from≠to
  const canSubmit = from && to && from !== to && priority;

  // =============================================================
  // RENDER
  // =============================================================
  return (
    <div style={styles.page}>
      {/* Decorative background blobs for visual depth */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.card}>
        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.logoWrapper}>
            <span style={styles.logoEmoji}>🗺️</span>
          </div>
          <h1 style={styles.title}>Pathfinder</h1>
          <p style={styles.subtitle}>Temukan rute terbaik di area UNPAR</p>
        </div>

        {/* FROM DROPDOWN — all nodes */}
        <div style={styles.fieldGroup}>
          <SearchBar
            label="Dari"
            nodes={nodes}
            value={from}
            onChange={setFrom}
          />
        </div>

        {/* Visual connector between FROM and TO */}
        <div style={styles.connector}>
          <div style={styles.connectorLine} />
          <div style={styles.connectorDot}>↕</div>
          <div style={styles.connectorLine} />
        </div>

        {/* TO DROPDOWN — destination nodes only */}
        <div style={styles.fieldGroup}>
          <SearchBar
            label="Ke"
            nodes={destNodes} // <-- Only destinations here!
            value={to}
            onChange={setTo}
          />
        </div>

        {/* PRIORITY SECTION */}
        <div style={styles.fieldGroup}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionLabel}>Prioritas Rute</span>
            {/* Show loading indicator while estimating costs */}
            {loading && (
              <span style={styles.estimatingText}>menghitung...</span>
            )}
          </div>

          {/* Show hint if FROM and TO not yet both selected */}
          {(!from || !to || from === to) && (
            <div style={styles.hint}>
              Pilih lokasi asal dan tujuan untuk melihat estimasi waktu
            </div>
          )}

          {/* Priority cards — one per priority */}
          <div style={styles.priorityStack}>
            {PRIORITIES.map((p) => (
              <RouteOption
                key={p}
                priority={p}
                // Pass the data for THIS priority (or null if not loaded yet)
                data={routeData ? routeData[p] : null}
                selected={priority === p}
                onClick={() => setPriority(p)}
              />
            ))}
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {error && <div style={styles.errorBox}>⚠️ {error}</div>}

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            ...styles.button,
            // Visually dim the button when it can't be clicked
            opacity: canSubmit ? 1 : 0.35,
            cursor: canSubmit ? "pointer" : "not-allowed",
          }}
        >
          Cari Rute
        </button>
      </div>
    </div>
  );
}

// =============================================================
// STYLES
// =============================================================
const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0c14",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    position: "relative",
    overflow: "hidden",
  },
  // Decorative blurred blobs in background
  blob1: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(92,124,250,0.15) 0%, transparent 70%)",
    top: -100,
    right: -100,
    pointerEvents: "none", // don't block clicks
  },
  blob2: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(76,202,122,0.1) 0%, transparent 70%)",
    bottom: -80,
    left: -80,
    pointerEvents: "none",
  },
  card: {
    background: "#13162280", // semi-transparent card
    backdropFilter: "blur(20px)", // glass effect (blurs what's behind)
    border: "1px solid #2a2d3a",
    borderRadius: 24,
    padding: "36px 32px",
    width: "100%",
    maxWidth: 460,
    position: "relative", // above the blobs
    animation: "fadeUp 0.4s ease both",
  },
  header: {
    textAlign: "center",
    marginBottom: 32,
  },
  logoWrapper: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 64,
    background: "linear-gradient(135deg, #1e2235, #2a2d3a)",
    borderRadius: 18,
    marginBottom: 16,
    border: "1px solid #3a3f5a",
  },
  logoEmoji: {
    fontSize: 30,
  },
  title: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 28,
    fontWeight: 800,
    color: "#e8eaf6",
    letterSpacing: "-0.5px",
    margin: "0 0 6px",
  },
  subtitle: {
    fontSize: 14,
    color: "#5a5f7a",
  },
  fieldGroup: {
    marginBottom: 20,
  },
  connector: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: "4px 16px",
  },
  connectorLine: {
    flex: 1,
    height: 1,
    background: "#2a2d3a",
  },
  connectorDot: {
    fontSize: 14,
    color: "#3a3f5a",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "#7a7f99",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  estimatingText: {
    fontSize: 12,
    color: "#5c7cfa",
    fontStyle: "italic",
  },
  hint: {
    fontSize: 13,
    color: "#3a3f5a",
    fontStyle: "italic",
    marginBottom: 12,
    textAlign: "center",
    padding: "10px",
    background: "#13152080",
    borderRadius: 8,
  },
  priorityStack: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  errorBox: {
    fontSize: 13,
    color: "#ff6b6b",
    background: "#ff6b6b18",
    border: "1px solid #ff6b6b30",
    borderRadius: 10,
    padding: "10px 14px",
    marginBottom: 16,
  },
  button: {
    width: "100%",
    padding: "15px",
    marginTop: 8,
    background: "linear-gradient(135deg, #5c7cfa, #4a6ae8)",
    color: "white",
    border: "none",
    borderRadius: 14,
    fontSize: 16,
    fontWeight: 700,
    fontFamily: "'Sora', sans-serif",
    letterSpacing: "0.02em",
    transition: "all 0.2s",
    boxShadow: "0 4px 20px rgba(92,124,250,0.3)",
  },
};

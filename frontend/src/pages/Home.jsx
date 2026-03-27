// src/pages/Home.jsx
// BERANDA — route search form
//
// Persists the FROM selection in sessionStorage so it survives
// navigation back from the result pages.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchDropdown from "../components/SearchDropdown.jsx";
import {
  getNodes,
  getDestinationNodes,
  getAllRoutes,
} from "../services/api.js";
import s from "./Home.module.css";

// Priority config: label, emoji, description shown on card
const PRIORITY_CONFIG = {
  none: { label: "Tercepat", emoji: "⚡", desc: "Rute paling cepat" },
  tangga: { label: "Tangga", emoji: "🪜", desc: "Lewat tangga" },
  lift: { label: "Lift", emoji: "🛗", desc: "Lewat lift" },
  disabilitas: { label: "Disabilitas", emoji: "♿", desc: "Jalur accessible" },
};

const PRIORITIES = ["none", "tangga", "lift", "disabilitas"];

// Converts seconds to "X menit Y detik"
function formatDuration(seconds) {
  if (seconds == null) return null;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  if (m === 0) return `${s} detik`;
  if (s === 0) return `${m} menit`;
  return `${m} menit ${s} detik`;
}

export default function Home() {
  const navigate = useNavigate();

  const [nodes, setNodes] = useState([]);
  const [destNodes, setDestNodes] = useState([]);

  // FROM: persisted in sessionStorage so it stays when user navigates back
  const [from, setFrom] = useState(() => {
    const saved = sessionStorage.getItem("pathfinder_from");
    return saved ? Number(saved) : null;
  });

  const [to, setTo] = useState(null);
  const [priority, setPriority] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [estimating, setEstimating] = useState(false);
  const [warning, setWarning] = useState("");

  // Load node lists on mount
  useEffect(() => {
    Promise.all([getNodes(), getDestinationNodes()])
      .then(([all, dest]) => {
        setNodes(all);
        setDestNodes(dest);
      })
      .catch(() => setWarning("Gagal memuat data. Pastikan backend berjalan."));
  }, []);

  // Persist FROM selection across navigations
  const handleSetFrom = (id) => {
    setFrom(id);
    sessionStorage.setItem("pathfinder_from", String(id));
  };

  // Fetch route estimates whenever from+to both selected
  useEffect(() => {
    if (!from || !to || from === to) {
      setRouteData(null);
      return;
    }
    setEstimating(true);
    setWarning("");
    getAllRoutes(from, to)
      .then((data) => {
        setRouteData(data);
        setEstimating(false);
        // Warn if no disabilitas route exists
        if (!data.disabilitas) {
          setWarning(
            "Tidak ada jalur accessible untuk rute ini. Pilihan Disabilitas tidak tersedia.",
          );
        }
      })
      .catch(() => {
        setEstimating(false);
        setWarning("Gagal menghitung estimasi rute.");
      });
  }, [from, to]);

  const canSubmit =
    from &&
    to &&
    from !== to &&
    priority &&
    !(priority === "disabilitas" && routeData && !routeData.disabilitas);

  const handleSubmit = () => {
    if (!canSubmit) return;
    navigate("/route", { state: { from, to, priority, nodes } });
  };

  return (
    <div className={s.page}>
      {/* ---- HERO ---- */}
      <div className={s.hero}>
        <p className={s.heroLabel}>Selamat Datang</p>
        <h1 className={s.heroTitle}>Temukan Rute Anda</h1>
        <p className={s.heroSubtitle}>Navigasi gedung dengan mudah dan cepat</p>
      </div>

      {/* ---- FORM CARD ---- */}
      <div className={s.formCard}>
        {/* FROM — persists across navigations */}
        <div className={s.fieldGroup}>
          <SearchDropdown
            label="Lokasi Anda"
            nodes={nodes}
            value={from}
            onChange={handleSetFrom}
            placeholder="Pilih lokasi awal..."
          />
        </div>

        {/* Divider */}
        <div className={s.routeDivider}>
          <div className={s.dividerLine} />
          <div className={s.dividerIcon}>↕</div>
          <div className={s.dividerLine} />
        </div>

        {/* TO — destinations only */}
        <div className={s.fieldGroup}>
          <SearchDropdown
            label="Tujuan Anda"
            nodes={destNodes}
            value={to}
            onChange={setTo}
            placeholder="Pilih tujuan..."
          />
        </div>

        {/* PRIORITY */}
        <div className={s.fieldGroup}>
          <div className={s.sectionLabel}>
            <span>Prioritas Jalur</span>
            {estimating && (
              <span className={s.estimatingBadge}>menghitung...</span>
            )}
          </div>

          {(!from || !to || from === to) && (
            <p className={s.hint}>
              Pilih lokasi awal dan tujuan terlebih dahulu
            </p>
          )}

          <div className={s.priorityStack}>
            {PRIORITIES.map((p) => {
              const cfg = PRIORITY_CONFIG[p];
              const data = routeData?.[p];
              const duration = data ? formatDuration(data.cost) : null;
              // Disabilitas disabled when route unavailable
              const disabled =
                p === "disabilitas" && routeData !== null && !data;
              const selected = priority === p;

              return (
                <button
                  key={p}
                  type="button"
                  className={[
                    s.priorityCard,
                    selected ? s.priorityCardSelected : "",
                    disabled ? s.priorityCardDisabled : "",
                  ].join(" ")}
                  onClick={() => !disabled && setPriority(p)}
                >
                  <span className={s.priorityEmoji}>{cfg.emoji}</span>
                  <div className={s.priorityInfo}>
                    <div className={s.priorityName}>{cfg.label}</div>
                    <div className={s.priorityTime}>
                      {/* Show duration if available, description if not yet loaded */}
                      {disabled
                        ? "Tidak ada jalur accessible"
                        : duration
                          ? duration
                          : cfg.desc}
                    </div>
                  </div>
                  {selected && <div className={s.priorityCheck}>✓</div>}
                </button>
              );
            })}
          </div>
        </div>

        {/* WARNING / ERROR — hidden when empty */}
        {warning && (
          <div className={s.warningBox}>
            <span className={s.warningIcon}>⚠️</span>
            <p className={s.warningText}>{warning}</p>
          </div>
        )}

        {/* SUBMIT */}
        <button
          className={`${s.submitBtn} ${!canSubmit ? s.submitBtnDisabled : ""}`}
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          Cari Rute →
        </button>
      </div>
    </div>
  );
}

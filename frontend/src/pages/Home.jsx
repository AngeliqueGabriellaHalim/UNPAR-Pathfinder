import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchDropdown from "../components/SearchDropdown.jsx";
import PriorityCard from "../components/PriorityCard.jsx";
import { getNodes, getDestinationNodes } from "../services/api.js";
import { computeAllRoutes } from "../services/routing.js";
import {
  IconArrowDown,
  IconBan,
  IconWarning,
  IconParking,
  IconArrowRight,
} from "../components/Icons.jsx";

const PRIORITIES = [
  { key: "none", label: "Tercepat", desc: "Rute paling efisien" },
  { key: "tangga", label: "Tangga", desc: "Lewat tangga" },
  { key: "lift", label: "Lift", desc: "Lewat lift" },
  {
    key: "disabilitas",
    label: "Keterbatasan Mobilitas",
    desc: "Jalur accessible untuk kursi roda",
  },
];

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
  const [nodes, setNodes] = useState([]); //from nodes
  const [destNodes, setDestNodes] = useState([]); //to nodes
  const [routeData, setRouteData] = useState(null); //result of route/all
  const [estimating, setEstimating] = useState(false); //loading
  const [warning, setWarning] = useState("");
  const [priority, setPriority] = useState(null); //selected prio

  //saved previous selected start node
  const [from, setFrom] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromUrl = urlParams.get("from");
    if (fromUrl && !isNaN(Number(fromUrl))) {
      // QR code URL has a valid node ID, then  use it
      sessionStorage.setItem("pf_from", fromUrl);
      return Number(fromUrl);
    }
    const saved = sessionStorage.getItem("pf_from");
    return saved ? Number(saved) : null;
  });

  //to node
  const [to, setTo] = useState(null);

  //put the nodes in start and dest
  useEffect(() => {
    Promise.all([getNodes(), getDestinationNodes()])
      .then(([all, dest]) => {
        setNodes(all);
        setDestNodes(dest);
      })
      .catch(() => setWarning("Gagal memuat data. Pastikan backend berjalan."));
  }, []);

  const handleSetFrom = (id) => {
    setFrom(id);
    sessionStorage.setItem("pf_from", String(id));
  };

  useEffect(() => {
    if (!from || !to || from === to) {
      setRouteData(null);
      return;
    }
    setEstimating(true);
    setWarning("");
    computeAllRoutes(from, to)
      .then((data) => {
        setRouteData(data);
        setEstimating(false);
        if (!data.disabilitas) {
          setWarning(
            "Tidak ada jalur accessible untuk rute ini. Pilihan Keterbatasan Mobilitas tidak tersedia.",
          );
        } else {
          setWarning("");
        }
      })
      .catch(() => {
        setEstimating(false);
        setWarning("Gagal menghitung estimasi.");
      });
  }, [from, to]);

  const isDisabled = (key) => routeData !== null && !routeData[key];
  const canSubmit = //required fields
    from && to && from !== to && priority && !isDisabled(priority);

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/*  HEADER  */}
      <div
        className="relative overflow-hidden px-5 pt-12 pb-10"
        style={{
          background:
            "linear-gradient(150deg, #3B1EDF 0%, #5C0FE1 65%, #7900E2 100%)",
        }}
      >
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full border-[1.5px] border-white/10 pointer-events-none" />
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full border-[1.5px] border-white/10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/10 pointer-events-none" />
        {/* logo */}
        <div className="absolute top-0 right-4  flex items-center">
          <img
            src="/logo_unpar.png"
            alt="Logo UNPAR dan IF UNPAR"
            className="w-30 object-contain"
          />
        </div>
        {/* title */}
        <div className="flex items-center gap-2 mb-4 mt-4">
          <div className="w-1 h-4 rounded-full bg-white/40" />
          <span
            className="text-white/60 text-xs font-semibold tracking-widest uppercase"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            Parahyangan Navigator
          </span>
        </div>
        <h1
          className="text-white text-[26px] font-bold leading-snug mb-1.5"
          style={{ fontFamily: "var(--font-family-display)" }}
        >
          Mau ke mana
          <br />
          hari ini?
        </h1>
        <p className="text-white/55 text-sm leading-relaxed">
          Temukan rute tercepat menuju gedung fakultas,
          <br />
          lab, perpustakaan, dan fasilitas lainnya.
        </p>
      </div>

      <div
        className="flex-1 bg-surface rounded-t-3xl -mt-5 px-5 pt-6 pb-10"
        style={{ animation: "fadeUp 0.3s ease both" }}
      >
        <p className="text-xs font-bold text-ink-3 uppercase tracking-widest mb-3">
          Tentukan rute
        </p>

        {/* FROM */}
        <div className="mb-2">
          <SearchDropdown
            label="Dari mana?"
            nodes={nodes}
            value={from}
            onChange={handleSetFrom}
            placeholder="Pilih titik awal..."
          />
        </div>

        <div className="flex items-center gap-3 my-2 mb-2">
          <div className="flex-1 h-px bg-surface-3" />
          <div className="w-8 h-8 rounded-full  border-surface-3 shadow-sm flex items-center justify-center">
            <IconArrowDown />
          </div>
          <div className="flex-1 h-px bg-surface-3" />
        </div>

        {/* TO */}
        <div className="mb-6">
          <SearchDropdown
            label="Ke mana?"
            nodes={destNodes.filter((node) => String(node.id) !== String(from))}
            value={to}
            onChange={setTo}
            placeholder="Pilih tujuan..."
          />
        </div>

        {/* PRIORITY section */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-ink-3 uppercase tracking-widest">
              Pilih jalur
            </p>
            {estimating && (
              <span
                className="text-xs text-primary bg-primary-soft px-2.5 py-1 rounded-full font-medium flex items-center gap-1"
                style={{ animation: "fadeIn 0.2s ease" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
                menghitung...
              </span>
            )}
          </div>

          {(!from || !to || from === to) && (
            <p className="text-sm text-ink-3 text-center bg-surface-2 rounded-2xl py-3 px-4 mb-2">
              Pilih titik awal dan tujuan dulu ya
            </p>
          )}

          <div className="flex flex-col gap-2">
            {PRIORITIES.map(({ key, label, desc }) => {
              const data = routeData?.[key];
              const duration = data ? formatDuration(data.cost) : null;
              const disabled = isDisabled(key);
              const selected = priority === key;
              return (
                <PriorityCard
                  key={key}
                  priorityKey={key}
                  label={label}
                  desc={desc}
                  duration={duration}
                  selected={selected}
                  disabled={disabled}
                  onClick={() => !disabled && setPriority(key)}
                />
              );
            })}
          </div>
        </div>

        {/* WARNINGS */}
        {warning && (
          <div
            className="flex items-start gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-2xl mb-3 text-sm text-red-700"
            style={{ animation: "fadeIn 0.2s ease" }}
          >
            <IconBan />
            <p className="leading-relaxed">{warning}</p>
          </div>
        )}

        {(() => {
          const destNode = destNodes.find((n) => Number(n.id) === Number(to));
          const nama = destNode?.nama?.toLowerCase() || "";
          return ["perpustakaan", "laboratorium komputasi"].some((kw) =>
            nama.includes(kw),
          );
        })() && (
          <div
            className="flex items-start gap-2.5 px-4 py-3 bg-blue-50 border border-blue-200 rounded-2xl mb-3 text-sm text-blue-700"
            style={{ animation: "fadeIn 0.2s ease" }}
          >
            <IconParking />
            <p className="leading-relaxed">
              Rekomendasi: Parkir dan masuk lewat{" "}
              <strong>Gedung 9 Lantai B1</strong> untuk akses rute accessible ke{" "}
              <strong> Perpustakaan</strong> dan{" "}
              <strong>Laboratorium Komputasi Gedung 9</strong>.
            </p>
          </div>
        )}

        {priority === "disabilitas" && routeData?.disabilitas?.hasAssist && (
          <div
            className="flex items-start gap-2.5 px-4 py-3 bg-amber-50 border border-amber-200 rounded-2xl mb-3 text-sm text-amber-800"
            style={{ animation: "fadeIn 0.2s ease" }}
          >
            <IconWarning />
            <p className="leading-relaxed">
              Sebagian jalur butuh <strong>bantuan pendamping</strong>.
            </p>
          </div>
        )}

        {/* SUBMIT */}
        <button
          type="button"
          onClick={() =>
            canSubmit &&
            navigate("/route", {
              state: { from, to, priority, nodes, forceRefresh: true },
            })
          }
          disabled={!canSubmit}
          className={[
            "w-full py-4 rounded-2xl font-bold text-base text-white transition-all duration-150 flex items-center justify-center gap-2",
            "shadow-[0_4px_20px_rgba(79,70,229,0.35)]",
            canSubmit ? "active:scale-[0.98]" : "opacity-40 cursor-not-allowed",
          ].join(" ")}
          style={{
            background: "linear-gradient(135deg, #4C17E0, #7900E2)",
            fontFamily: "var(--font-family-display)",
          }}
        >
          Mulai Navigasi
          <IconArrowRight />
        </button>
      </div>
    </div>
  );
}

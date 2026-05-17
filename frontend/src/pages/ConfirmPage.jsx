import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const imgUrl = (path) => {
  if (!path) return null;
  return BACKEND_URL + (path.startsWith("/") ? path : "/" + path);
};

const IconHome = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconBack = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconCheck = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Flag icon:  used before location name in the confirm panel
const IconFlag = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 text-primary shrink-0"
  >
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);

const IconBuilding = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-16 h-16 text-indigo-200"
  >
    <rect x="3" y="3" width="18" height="18" rx="1" />
    <path d="M9 22V12h6v10" />
    <path d="M9 7h.01M12 7h.01M15 7h.01M9 11h.01M12 11h.01M15 11h.01" />
  </svg>
);

export default function ConfirmPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { from, to, priority, nodes, toName, result, confirmationImage } =
    state || {};
  const [arrived, setArrived] = useState(false);

  const steps = result?.steps || [];

  const destName =
    toName || nodes?.find((n) => Number(n.id) === Number(to))?.nama || "Tujuan";

  const handleNo = () => {
    const lastStep = steps[steps.length - 1];
    const lastImages = lastStep?.images || [];
    navigate("/route", {
      state: {
        from,
        to,
        priority,
        nodes,
        prefetchedResult: result,
        initialStepIndex: steps.length - 1,
        initialImageIndex: Math.max(lastImages.length - 1, 0),
      },
    });
  };

  // ARRIVED SCREEN
  if (arrived)
    return (
      <div className="flex flex-col min-h-screen bg-surface">
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ background: "linear-gradient(150deg, #3B1EDF, #5C0FE1)" }}
        >
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white active:bg-white/25 transition-colors"
          >
            <IconHome />
          </button>
          <span
            className="font-semibold text-white text-sm"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            Selesai
          </span>
        </div>

        <div
          className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-5"
          style={{ animation: "fadeUp 0.4s ease both" }}
        >
          <div className="relative">
            <div className="w-48 h-48 rounded-full bg-primary-soft flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-accent-soft flex items-center justify-center">
                <img src="/wovey.png" alt="" />
              </div>
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 scale-110" />
          </div>

          <div>
            <p
              className="text-2xl font-bold text-ink mb-1"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Kamu sudah sampai!
            </p>
            <p
              className="text-base font-semibold text-primary"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              {destName}
            </p>
          </div>

          <p className="text-sm text-ink-3 leading-relaxed max-w-65">
            Semoga kegiatanmu berjalan lancar. Sampai jumpa lagi di UNPAR!
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-2 px-10 py-4 text-white font-bold rounded-2xl shadow-[0_4px_20px_rgba(79,70,229,0.3)] active:scale-[0.97] transition-all"
            style={{
              background: "linear-gradient(135deg, #3B1EDF, #5C0FE1)",
              fontFamily: "var(--font-family-display)",
            }}
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );

  // CONFIRM SCREEN
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ background: "linear-gradient(135deg, #3B1EDF, #5C0FE1)" }}
      >
        <button
          onClick={handleNo}
          className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white active:bg-white/25 transition-colors"
        >
          <IconBack />
        </button>
        <span
          className="font-semibold text-white text-sm"
          style={{ fontFamily: "var(--font-family-display)" }}
        >
          Konfirmasi Kedatangan
        </span>
      </div>

      {/* Destination photo */}
      {confirmationImage ? (
        <div className="relative" style={{ height: "52vh" }}>
          <img
            src={imgUrl(confirmationImage)}
            alt={destName}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-28"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
            }}
          />
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center gap-3"
          style={{
            height: "52vh",
            background: "linear-gradient(150deg, #EEF2FF 0%, #E0E7FF 100%)",
          }}
        >
          <IconBuilding />
          <p className="text-sm text-indigo-400 font-medium">{destName}</p>
        </div>
      )}

      {/* Bottom panel */}
      <div
        className="flex-1 px-6 pt-6 pb-8 flex flex-col gap-4"
        style={{ animation: "fadeUp 0.3s ease both" }}
      >
        <div className="text-center flex flex-col items-center gap-2">
          {/* Location name with flag icon */}
          <div className="flex items-center gap-2 justify-center">
            <IconFlag />
            <p
              className="font-semibold text-primary text-sm"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              {destName}
            </p>
          </div>

          {/* Divider */}
          <div className="w-8 h-px bg-surface-3" />

          {/* Question */}
          <p
            className="text-xl font-bold text-ink leading-snug"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            Sudah sampai di sini?
          </p>
          <p className="text-sm text-ink-3">
            Pastikan kamu berada di lokasi yang tepat
          </p>
        </div>

        <div className="flex flex-col gap-2.5 mt-auto">
          <button
            onClick={() => setArrived(true)}
            className="w-full py-4 text-white font-bold rounded-2xl shadow-[0_4px_16px_rgba(79,70,229,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #4C17E0, #7900E2)",
              fontFamily: "var(--font-family-display)",
            }}
          >
            <IconCheck />
            Ya, saya sudah sampai
          </button>

          <button
            onClick={handleNo}
            className="w-full py-3.5 bg-surface-2 text-ink-2 font-semibold rounded-2xl border-2 border-surface-3 active:bg-surface-3 transition-all text-sm flex items-center justify-center gap-2"
          >
            <IconBack />
            Belum, kembali ke langkah sebelumnya
          </button>
        </div>
      </div>
    </div>
  );
}

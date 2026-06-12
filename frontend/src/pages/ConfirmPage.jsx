import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IconHome,
  IconCheck,
  IconBack,
  IconDest,
  IconNext,
  IconFlag,
} from "../components/Icons.jsx";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const imgUrl = (path) => {
  if (!path) return null;
  return BACKEND_URL + (path.startsWith("/") ? path : "/" + path);
};

export default function ConfirmPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { from, to, priority, nodes, toName, result, confirmationImages } =
    state || {};
  const [arrived, setArrived] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const steps = result?.steps || [];

  const destName =
    toName || nodes?.find((n) => Number(n.id) === Number(to))?.nama || "Tujuan";

  // array foto konfirmasi (bisa 1 atau lebih)
  const images = confirmationImages || [];
  const hasMultiple = images.length > 1;

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
      <div className="flex flex-col h-dvh bg-surface">
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
    <div className="flex flex-col h-dvh bg-surface">
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
      {images.length > 0 ? (
        <div className="relative h-[50dvh]">
          <img
            key={imgIndex}
            src={imgUrl(images[imgIndex])}
            alt={`${destName} foto ${imgIndex + 1}`}
            className="w-full h-full object-cover"
            style={{ animation: "fadeIn 0.2s ease both" }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-28"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
            }}
          />

          {/* arrow buttons for multiple photos */}
          {hasMultiple && (
            <>
              {/* left arrow */}
              {imgIndex > 0 && (
                <button
                  onClick={() => setImgIndex((i) => i - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white active:bg-black/60 transition-colors"
                >
                  <IconBack />
                </button>
              )}

              {/* right arrow */}
              {imgIndex < images.length - 1 && (
                <button
                  onClick={() => setImgIndex((i) => i + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white active:bg-black/60 transition-colors"
                >
                  <IconNext />
                </button>
              )}
            </>
          )}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center gap-3"
          style={{
            height: "52vh",
            background: "linear-gradient(150deg, #EEF2FF 0%, #E0E7FF 100%)",
          }}
        >
          <IconFlag />
          <p className="text-sm text-indigo-400 font-medium">{destName}</p>
        </div>
      )}

      {/* bottom panel */}
      <div
        className="flex-1 px-6 pt-6 pb-8 flex flex-col gap-4"
        style={{ animation: "fadeUp 0.3s ease both" }}
      >
        <div className="text-center flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 justify-center">
            <IconDest className="text-primary w-4 h-4" />
            <p
              className="font-semibold text-primary text-sm"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              {destName}
            </p>
          </div>

          <div className="w-8 h-px bg-surface-3" />

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

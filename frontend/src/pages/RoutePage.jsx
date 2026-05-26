import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getRoute } from "../services/api.js";
import {
  House,
  ArrowRight,
  ArrowLeft,
  Flag,
  TriangleAlert,
  SquareParking,
  Image as ImageIcon,
} from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// to handles paths with or without leading slash
const imgUrl = (path) => {
  if (!path) return null;
  return BACKEND_URL + (path.startsWith("/") ? path : "/" + path);
};

// SVG ICONS from lucide
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

const IconNext = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
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

const IconFlag = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3.5 h-3.5 text-white/70 shrink-0"
  >
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);

const IconElevator = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <rect x="3" y="2" width="18" height="20" rx="2" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <polyline points="7 8 9.5 5.5 12 8" />
    <polyline points="12 16 14.5 18.5 17 16" />
  </svg>
);

const IconWarning = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3.5 h-3.5 shrink-0 mt-0.5"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconParking = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3.5 h-3.5 shrink-0 mt-0.5"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
  </svg>
);

const IconImage = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-10 h-10 text-white/20"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

// TOP BAR
function TopBar({ onBack, toName, stepLabel }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 sticky top-0 z-10"
      style={{ background: "linear-gradient(135deg, #3B1EDF, #5C0FE1)" }}
    >
      <button
        onClick={onBack}
        className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white shrink-0 active:bg-white/25 transition-colors"
      >
        <IconHome />
      </button>

      {/* dest name */}
      <div className="flex-1">
        <div className="flex items-start gap-1.5">
          <IconFlag className="mt-0.5" />
          <p
            className="text-white font-semibold text-sm leading-tight line-clamp-2"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            {toName}
          </p>
        </div>
        {/* Step counter */}
        <p className="text-white/50 text-xs mt-0.5">{stepLabel}</p>
      </div>
    </div>
  );
}

export default function RoutePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    from,
    to,
    priority,
    nodes,
    prefetchedResult,
    initialStepIndex = 0,
    initialImageIndex = 0,
  } = state || {};

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stepIndex, setStepIndex] = useState(initialStepIndex);
  const [imageIndex, setImageIndex] = useState(initialImageIndex);

  const toName =
    nodes?.find((n) => Number(n.id) === Number(to))?.nama || "Tujuan";

  useEffect(() => {
    if (!from || !to || !priority) {
      navigate("/");
      return;
    }
    if (prefetchedResult) {
      setResult(prefetchedResult);
      setLoading(false);
      return;
    }
    getRoute(from, to, priority)
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Gagal mendapatkan rute");
        setLoading(false);
      });
  }, []);

  // LOADING
  if (loading)
    return (
      <div className="flex flex-col min-h-screen bg-surface">
        <TopBar
          onBack={() => navigate("/")}
          toName={toName}
          stepLabel="Memuat rute..."
        />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-ink-3">
          <div
            className="w-9 h-9 rounded-full border-[3px] border-surface-3 border-t-primary"
            style={{ animation: "spin 0.7s linear infinite" }}
          />
          <p className="text-sm">Sedang menghitung rute terbaik...</p>
        </div>
      </div>
    );

  // ERROR
  if (error)
    return (
      <div className="flex flex-col min-h-screen bg-surface">
        <TopBar
          onBack={() => navigate("/")}
          toName={toName}
          stepLabel="Gagal"
        />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-red-50 border border-red-200 rounded-3xl p-6 text-center w-full">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
                className="w-7 h-7"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p
              className="font-bold text-red-700 text-base mb-1"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Rute tidak ditemukan
            </p>
            <p className="text-sm text-red-600 mb-5 leading-relaxed">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-semibold text-sm active:scale-[0.97] transition-all"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );

  const steps = result?.steps || [];
  if (!steps.length)
    return (
      <div className="flex flex-col min-h-screen bg-surface">
        <TopBar onBack={() => navigate("/")} toName={toName} stepLabel="" />
        <div className="flex-1 flex items-center justify-center p-6 text-center text-ink-3 text-sm">
          Rute tidak memiliki langkah yang dapat ditampilkan.
        </div>
      </div>
    );

  const currentStep = steps[stepIndex];
  const images = currentStep.images || [];
  const currentImage = images[imageIndex] || null;

  const totalImages = steps.reduce(
    (acc, st) => acc + Math.max(st.images?.length || 0, 1),
    0,
  );
  const passedImages = steps
    .slice(0, stepIndex)
    .reduce((acc, st) => acc + Math.max(st.images?.length || 0, 1), 0);
  const progressPct = ((passedImages + imageIndex + 1) / totalImages) * 100;

  const isFirstImage = stepIndex === 0 && imageIndex === 0;

  const handleNext = () => {
    if (imageIndex < images.length - 1) {
      setImageIndex((i) => i + 1);
      return;
    }
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
      setImageIndex(0);
      return;
    }
    navigate("/confirm", {
      state: {
        from,
        to,
        priority,
        nodes,
        toName,
        result,
        confirmationImages: result.confirmationImages,
      },
    });
  };

  const handleBack = () => {
    if (imageIndex > 0) {
      setImageIndex((i) => i - 1);
      return;
    }
    if (stepIndex > 0) {
      const prev = steps[stepIndex - 1];
      setStepIndex((i) => i - 1);
      setImageIndex(Math.max((prev.images?.length || 1) - 1, 0));
      return;
    }
    navigate("/");
  };

  //  Only on the LAST image of the lift step, petunjuk di-override with "Masuk ke [lift name]..."
  const isLastImageOfStep =
    imageIndex >= images.length - 1 || images.length === 0;

  const petunjukText = currentStep?.isLiftStep
    ? isLastImageOfStep
      ? currentStep.petunjuk // last image : petunjuknya "Masuk ke Lift A, tekan tombol lantai 3"
      : currentImage?.petunjuk || "Ikuti arah menuju titik berikutnya"
    : // earlier images, biarin
      currentImage?.petunjuk || "Ikuti arah menuju titik berikutnya";

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* TOP BAR */}
      <TopBar
        onBack={() => navigate("/")}
        toName={toName}
        stepLabel={`Checkpoint ${stepIndex + 1} dari ${steps.length}`}
      />

      {/* PROGRESS BAR */}
      <div className="h-1 bg-white/10">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${progressPct}%`,
            background: "linear-gradient(90deg, #4C17E0, #7900E2)",
          }}
        />
      </div>

      {/* WARNINGS STRIP */}
      {result?.warnings?.length > 0 && (
        <div className="bg-white border-b border-surface-3 px-4 py-2 flex flex-col gap-1.5">
          {result.warnings.map((w, i) => (
            <div
              key={i}
              className={[
                "flex items-start gap-2 px-3 py-2 rounded-xl text-xs leading-relaxed",
                w.type === "assist"
                  ? "bg-amber-50 text-amber-800 border border-amber-200"
                  : "",
                w.type === "parking"
                  ? "bg-blue-50 text-blue-800 border border-blue-200"
                  : "",
              ].join(" ")}
            >
              {w.type === "assist" ? <IconWarning /> : <IconParking />}
              <p>{w.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* IMAGE AREA */}
      <div className="flex-1 relative bg-[#111] flex items-center justify-center overflow-hidden">
        {/* EDGE NAME*/}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-9 w-full flex justify-center px-4">
          <div className="bg-black/35 backdrop-blur-lg px-3 py-2 rounded-full border border-white/10 max-w-[97%]">
            <p
              className="text-white text-xs font-medium text-center wrap-break-word leading-relaxed"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              {currentStep.from}
              <span className="text-white/40 mx-2">→</span>
              {currentStep.to}
            </p>
          </div>
        </div>
        {currentImage ? (
          <img
            key={`${stepIndex}-${imageIndex}`}
            src={imgUrl(currentImage.url)}
            alt={`Langkah ${stepIndex + 1}`}
            className="w-full h-full object-cover"
            style={{ animation: "fadeIn 0.2s ease both" }}
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-white/25">
            <IconImage />
            <p className="text-xs tracking-wide">
              Tidak ada foto untuk langkah ini
            </p>
          </div>
        )}
      </div>

      {/* BOTTOM PANEL */}
      <div className="bg-white px-5 pt-4 pb-6 flex flex-col gap-4">
        {/*Petunjuk text  centered */}
        <p
          className={[
            "text-base leading-relaxed min-h-11 text-center",
            petunjukText &&
            petunjukText !== "Ikuti arah menuju titik berikutnya"
              ? "text-ink font-medium"
              : "text-ink-3 text-sm",
          ].join(" ")}
        >
          {petunjukText}
        </p>

        {/* Navigation buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleBack}
            disabled={isFirstImage}
            className={[
              "flex-1 py-3.5 rounded-2xl font-semibold text-sm border-2 border-surface-3 bg-surface-2 text-ink-2",
              "transition-all duration-150 flex items-center justify-center gap-2",
              isFirstImage
                ? "opacity-30 cursor-not-allowed"
                : "active:scale-[0.97] active:bg-surface-3",
            ].join(" ")}
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            <IconBack />
            Kembali
          </button>

          <button
            onClick={handleNext}
            className="flex-2 py-3.5 rounded-2xl font-bold text-sm text-white transition-all duration-150 active:scale-[0.97] shadow-[0_4px_16px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #4C17E0, #7900E2)",
              fontFamily: "var(--font-family-display)",
            }}
          >
            Lanjut
            <IconNext />
          </button>
        </div>
      </div>
    </div>
  );
}

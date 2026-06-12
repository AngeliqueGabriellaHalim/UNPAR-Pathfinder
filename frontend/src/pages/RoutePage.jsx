import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getRoute } from "../services/api.js";
import TopBar from "../components/TopBar.jsx";
import {
  IconNext,
  IconBack,
  IconWarning,
  IconParking,
  IconImage,
  IconBan,
} from "../components/Icons.jsx";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// to handles paths with or without leading slash
const imgUrl = (path) => {
  if (!path) return null;
  return BACKEND_URL + (path.startsWith("/") ? path : "/" + path);
};

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
  const [imgLoaded, setImgLoaded] = useState(false);

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
  }, []); //dependecy memang kosong karena hanya fetch route saat pertama kali halaman dibuka dan tidak berubahubah

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
              <IconBan />
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
    setImgLoaded(false); // reset sebelum ganti foto
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
    setImgLoaded(false); // reset sebelum ganti foto
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

  // only on the LAST image of the lift step, petunjuk di-override with "Masuk ke [lift name]..."
  const isLastImageOfStep =
    imageIndex >= images.length - 1 || images.length === 0;

  const petunjukText = currentStep?.isLiftStep
    ? isLastImageOfStep
      ? currentStep.petunjuk // last image : petunjuknya "Masuk ke Lift A, tekan tombol lantai 3"
      : currentImage?.petunjuk || "Ikuti arah menuju titik berikutnya"
    : // earlier images, biarin
      currentImage?.petunjuk || "Ikuti arah menuju titik berikutnya";

  return (
    <div className="flex flex-col h-dvh bg-black">
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

      {/* WARNINGS */}
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
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <img
              key={`${stepIndex}-${imageIndex}`}
              src={imgUrl(currentImage.url)}
              alt={`Langkah ${stepIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ animation: "fadeIn 0.2s ease both" }}
              onLoad={() => setImgLoaded(true)}
            />
          </>
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
        {/*Petunjuk text  */}
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

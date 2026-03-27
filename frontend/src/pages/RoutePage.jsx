// src/pages/RoutePage.jsx
// STEP-BY-STEP NAVIGATION PAGE
//
// This page walks the user through each edge in the route.
// Each "step" = one edge (from→to).
// Each step may have multiple images — user swipes through them.
//
// STATE MACHINE:
//   stepIndex    = which edge we're on (0 to steps.length-1)
//   imageIndex   = which photo within the current edge
//
// When user presses NEXT on the last image of the last step:
//   → navigate to ConfirmPage (arrival confirmation)
//
// When user presses BACK on the first image of the first step:
//   → navigate back to Home (keeping FROM selection)

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getRoute } from "../services/api.js";
import s from "./RoutePage.module.css";

const BACKEND_URL = "http://localhost:3001";

export default function RoutePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    from,
    to,
    priority,
    nodes,
    prefetchedResult,
    initialStepIndex,
    initialImageIndex,
  } = location.state || {};

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Support jumping back to a specific step (e.g. from ConfirmPage)
  const [stepIndex, setStepIndex] = useState(initialStepIndex ?? 0);
  const [imageIndex, setImageIndex] = useState(initialImageIndex ?? 0);

  // Destination name for top bar
  const toName = nodes?.find((n) => n.id === to)?.nama || "Tujuan";

  // Fetch the route on mount
  useEffect(() => {
    if (!from || !to || !priority) {
      navigate("/");
      return;
    }

    // If we already have the result (coming back from ConfirmPage), skip fetch
    if (prefetchedResult) {
      setResult(prefetchedResult);
      setLoading(false);
      return;
    }
    setLoading(true);
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

  if (loading)
    return (
      <div className={s.page}>
        <TopBar
          onBack={() => navigate("/", { state: { from, to, priority, nodes } })}
          toName={toName}
          step="Memuat..."
        />
        <div className={s.loading}>
          <div className={s.spinner} />
          <p>Menghitung rute terbaik...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className={s.page}>
        <TopBar onBack={() => navigate("/")} toName={toName} step="Error" />
        <div className={s.errorBox}>
          <p className={s.errorTitle}>Rute tidak ditemukan</p>
          <p className={s.errorText}>{error}</p>
          <button className={s.retryBtn} onClick={() => navigate("/")}>
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );

  const steps = result?.steps || [];
  if (steps.length === 0)
    return (
      <div className={s.page}>
        <TopBar
          onBack={() => navigate("/")}
          toName={toName}
          step="Tidak ada rute"
        />
        <div className={s.errorBox}>
          <p className={s.errorTitle}>Rute kosong</p>
          <p className={s.errorText}>
            Tidak ada langkah yang dapat ditampilkan.
          </p>
          <button className={s.retryBtn} onClick={() => navigate("/")}>
            Kembali
          </button>
        </div>
      </div>
    );

  const currentStep = steps[stepIndex];
  const images = currentStep.images || [];
  const currentImage = images[imageIndex] || null;

  // How many total images across all steps (for progress)
  const totalImages = steps.reduce(
    (acc, st) => acc + Math.max(st.images?.length || 0, 1),
    0,
  );
  const passedImages = steps
    .slice(0, stepIndex)
    .reduce((acc, st) => acc + Math.max(st.images?.length || 0, 1), 0);
  const progressPct = ((passedImages + imageIndex + 1) / totalImages) * 100;

  const isFirstImage = stepIndex === 0 && imageIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;
  const isLastImage = imageIndex === images.length - 1 || images.length === 0;

  // NEXT: advance image, then step, then go to confirm page
  const handleNext = () => {
    // If there are more images in this step
    if (imageIndex < images.length - 1) {
      setImageIndex((i) => i + 1);
      return;
    }
    // If there are more steps
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
      setImageIndex(0);
      return;
    }
    // Last step, last image → go to confirmation
    navigate("/confirm", {
      state: { from, to, priority, nodes, toName, result },
    });
  };

  // BACK: go to previous image, then previous step, then home
  const handleBack = () => {
    if (imageIndex > 0) {
      setImageIndex((i) => i - 1);
      return;
    }
    if (stepIndex > 0) {
      const prevStep = steps[stepIndex - 1];
      const prevImages = prevStep.images || [];
      setStepIndex((i) => i - 1);
      setImageIndex(Math.max(prevImages.length - 1, 0));
      return;
    }
    // First step first image → back to home
    navigate("/");
  };

  const stepLabel = `Langkah ${stepIndex + 1} dari ${steps.length}`;

  return (
    <div className={s.page}>
      {/* TOP BAR */}
      <TopBar onBack={() => navigate("/")} toName={toName} step={stepLabel} />

      {/* PROGRESS BAR */}
      <div className={s.progressBar}>
        <div className={s.progressFill} style={{ width: `${progressPct}%` }} />
      </div>

      {/* IMAGE AREA — main content */}
      <div className={s.imageArea}>
        {currentImage ? (
          <>
            <img
              key={`${stepIndex}-${imageIndex}`} /* key forces re-render animation */
              src={BACKEND_URL + currentImage.url}
              alt={`Panduan langkah ${stepIndex + 1}`}
              className={s.stepImage}
              style={{ animation: "fadeIn 0.25s ease" }}
            />
            {/* Show counter only if this step has multiple images */}
            {images.length > 1 && (
              <div className={s.imageCounter}>
                {imageIndex + 1} / {images.length}
              </div>
            )}
          </>
        ) : (
          <div className={s.noImage}>
            <span className={s.noImageIcon}>🗺️</span>
            <p className={s.noImageText}>Tidak ada foto untuk langkah ini</p>
          </div>
        )}
      </div>

      {/* BOTTOM PANEL */}
      <div className={s.bottomPanel}>
        {/* Petunjuk text — from the current image, or from the step */}
        <p
          className={
            currentImage?.petunjuk
              ? s.petunjuk
              : `${s.petunjuk} ${s.petunjukEmpty}`
          }
        >
          {currentImage?.petunjuk ||
            currentStep.petunjuk ||
            "Ikuti arah menuju checkpoint berikutnya"}
        </p>

        {/* Navigation buttons */}
        <div className={s.navRow}>
          <button
            className={`${s.navBtn} ${s.navBtnBack} ${isFirstImage ? s.navBtnDisabled : ""}`}
            onClick={handleBack}
            disabled={isFirstImage}
          >
            ← Kembali
          </button>
          <button
            className={`${s.navBtn} ${s.navBtnNext}`}
            onClick={handleNext}
          >
            {isLastStep && isLastImage ? "Selesai ✓" : "Lanjut →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- TOP BAR sub-component ----
function TopBar({ onBack, toName, step }) {
  return (
    <div className={s.topBar}>
      <button className={s.backBtn} onClick={onBack}>
        ←
      </button>
      <div className={s.topBarInfo}>
        <div className={s.topBarDestination}>🏁 {toName}</div>
        <div className={s.topBarStep}>{step}</div>
      </div>
    </div>
  );
}

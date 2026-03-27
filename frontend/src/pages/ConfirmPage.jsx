// src/pages/ConfirmPage.jsx
// ARRIVAL CONFIRMATION PAGE
//
// Shown after the user completes all navigation steps.
// Shows a photo of the destination and asks:
//   "Apakah anda sudah melihat lokasi ini?"
//   → Ya  → show "Anda telah sampai!" screen
//   → Tidak → go back to last step of RoutePage

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import s from "./ConfirmPage.module.css";

const BACKEND_URL = "http://localhost:3001";

export default function ConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { from, to, priority, nodes, toName, result } = location.state || {};

  // arrived = true when user confirms they see the location
  const [arrived, setArrived] = useState(false);

  // Get the destination photo.
  // We look for an image in the LAST step of the route.
  // If none found, we show a placeholder emoji instead.
  const steps = result?.steps || [];
  const lastStep = steps[steps.length - 1];
  const lastImages = lastStep?.images || [];
  const destinationPhoto =
    lastImages.length > 0 ? lastImages[lastImages.length - 1] : null;

  const destinationName =
    toName || nodes?.find((n) => n.id === to)?.nama || "Tujuan";

  // "Tidak" → go back to the last step of RoutePage
  // We pass state so RoutePage can re-use the already-fetched result
  const handleNo = () => {
    navigate("/route", {
      state: {
        from,
        to,
        priority,
        nodes,
        // Tell RoutePage to jump to the last step
        initialStepIndex: steps.length - 1,
        initialImageIndex: Math.max(lastImages.length - 1, 0),
        prefetchedResult: result,
      },
    });
  };

  // "Ya" → show arrived screen
  const handleYes = () => setArrived(true);

  // ---- ARRIVED SCREEN ----
  if (arrived) {
    return (
      <div className={s.page}>
        <div className={s.topBar}>
          <button className={s.backBtn} onClick={() => navigate("/")}>
            ←
          </button>
          <span className={s.topBarTitle}>Selesai</span>
        </div>

        <div className={s.arrivedScreen}>
          <div className={s.arrivedIcon}>🎉</div>
          <div>
            <p className={s.arrivedTitle}>Anda telah sampai di</p>
            <p className={s.arrivedDestination}>{destinationName}</p>
          </div>
          <p className={s.arrivedSubtext}>
            Selamat! Anda berhasil menavigasi rute dengan sukses.
          </p>
          <button className={s.homeBtn} onClick={() => navigate("/")}>
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  // ---- CONFIRMATION SCREEN ----
  return (
    <div className={s.page}>
      <div className={s.topBar}>
        <button className={s.backBtn} onClick={handleNo}>
          ←
        </button>
        <span className={s.topBarTitle}>Konfirmasi Kedatangan</span>
      </div>

      <div className={s.confirmScreen}>
        {/* Destination photo — the "do you see this?" image */}
        {destinationPhoto ? (
          <img
            src={BACKEND_URL + destinationPhoto.url}
            alt={destinationName}
            className={s.destinationImage}
          />
        ) : (
          <div className={s.noPhoto}>🏢</div>
        )}

        <div className={s.confirmPanel}>
          <h2 className={s.confirmQuestion}>
            Apakah Anda sudah melihat lokasi ini?
          </h2>
          <p className={s.confirmSubtext}>{destinationName}</p>

          <div className={s.confirmButtons}>
            <button className={s.btnYes} onClick={handleYes}>
              ✓ Ya, saya sudah sampai
            </button>
            <button className={s.btnNo} onClick={handleNo}>
              ← Belum, kembali ke langkah sebelumnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

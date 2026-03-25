// card for a route priority (tangga/lift/
// disabilitas).

//  seconds to menit detik
function formatDuration(seconds) {
  // if no data
  if (seconds == null) return "—";

  const minutes = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);

  if (minutes === 0) return `${secs} detik`;
  if (secs === 0) return `${minutes} menit`;
  return `${minutes} menit ${secs} detik`;
}

//priority style
const PRIORITY_CONFIG = {
  none: {
    label: "Tercepat",
    emoji: "⚡",
    color: "#c678dd",
    bgIdle: "#1a1d2e",
    bgActive: "#1a1028",
    border: "#c678dd",
  },
  tangga: {
    label: "Tangga",
    emoji: "🪜",
    color: "#f4a43a",
    bgIdle: "#1a1d2e",
    bgActive: "#231e10",
    border: "#f4a43a",
  },
  lift: {
    label: "Lift",
    emoji: "🛗",
    color: "#5c7cfa",
    bgIdle: "#1a1d2e",
    bgActive: "#101828",
    border: "#5c7cfa",
  },
  disabilitas: {
    label: "Keterbatasan Mobilitas",
    emoji: "♿",
    color: "#4cca7a",
    bgIdle: "#1a1d2e",
    bgActive: "#0f1f18",
    border: "#4cca7a",
  },
};

export default function RouteOption({ priority, data, selected, onClick }) {
  //style based on prio
  const cfg = PRIORITY_CONFIG[priority];

  // Disabilitas with no accessible route should not be selectable
  const isDisabled = priority === "disabilitas" && data === null;

  const unavailableText =
    priority === "disabilitas"
      ? "Tidak ada rute accessible"
      : "Rute tidak tersedia";

  return (
    <div
      onClick={isDisabled ? undefined : onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 18px",
        borderRadius: 12,
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.45 : 1,
        border: `1.5px solid ${selected ? cfg.color : "#2a2d3a"}`,
        background: selected ? cfg.bgActive : cfg.bgIdle,
        transform: selected ? "translateY(-1px)" : "translateY(0)",
        boxShadow: selected ? `0 4px 20px ${cfg.color}25` : "none",
        transition: "all 0.2s ease",
        position: "relative",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Large emoji icon */}
      <span style={{ fontSize: 22, flexShrink: 0 }}>{cfg.emoji}</span>

      {/* Text content: priority name + time estimate */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: selected ? cfg.color : "#c8cce8",
            fontFamily: "'Sora', sans-serif",
            transition: "color 0.2s",
          }}
        >
          {cfg.label}
        </div>
        <div style={{ fontSize: 13, color: "#5a5f7a", marginTop: 2 }}>
          {/* Show the formatted duration, or a specific fallback message */}
          {data ? formatDuration(data.cost) : unavailableText}
        </div>
      </div>

      {/* Selection indicator dot — only visible when selected */}
      {selected && (
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: cfg.color,
            flexShrink: 0,
            // Pulsing animation to draw attention to selection
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      )}
    </div>
  );
}

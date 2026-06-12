import {
  IconFlash,
  IconStairs,
  IconElevator,
  IconWheelchair,
} from "../components/Icons.jsx";

const ICON_MAP = {
  none: <IconFlash />,
  tangga: <IconStairs />,
  lift: <IconElevator />,
  disabilitas: <IconWheelchair />,
};

// accent colors per priority
const COLOR_MAP = {
  none: {
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    border: "border-indigo-400",
    selectedBg: "bg-indigo-50",
  },
  tangga: {
    bg: "bg-violet-50",
    text: "text-violet-600",
    border: "border-violet-400",
    selectedBg: "bg-violet-50",
  },
  lift: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-400",
    selectedBg: "bg-blue-50",
  },
  disabilitas: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-400",
    selectedBg: "bg-emerald-50",
  },
};

export default function PriorityCard({
  priorityKey,
  label,
  desc,
  duration,
  selected,
  disabled,
  onClick,
}) {
  const icon = ICON_MAP[priorityKey] || Icons.flash;
  const colors = COLOR_MAP[priorityKey] || COLOR_MAP.none;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-left w-full",
        "transition-all duration-150 active:scale-[0.98]",
        disabled
          ? "opacity-40 cursor-not-allowed border-surface-3 bg-white"
          : selected
            ? `${colors.border} ${colors.selectedBg} shadow-sm`
            : "border-surface-3 bg-white active:bg-surface-2",
      ].join(" ")}
    >
      {/* Icon :  colored per priority */}
      <span
        className={[
          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
          selected ? `${colors.bg} ${colors.text}` : "bg-surface-2 text-ink-3",
        ].join(" ")}
      >
        {icon}
      </span>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className={`font-semibold text-sm leading-none mb-0.5 ${selected ? colors.text : "text-ink"}`}
          style={{ fontFamily: "var(--font-family-display)" }}
        >
          {label}
        </p>
        <p className={`text-xs ${selected ? "text-ink-2" : "text-ink-3"}`}>
          {disabled ? "Tidak ada jalur ditemukan" : (duration ?? desc)}
        </p>
      </div>
    </button>
  );
}

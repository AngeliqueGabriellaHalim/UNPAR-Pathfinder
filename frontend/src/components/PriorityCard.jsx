const Icons = {
  flash: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  stairs: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <polyline points="4 20 4 14 10 14 10 8 16 8 16 4 20 4" />
    </svg>
  ),
  elevator: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <rect x="3" y="2" width="18" height="20" rx="2" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <polyline points="7 8 9.5 5.5 12 8" />
      <polyline points="12 16 14.5 18.5 17 16" />
    </svg>
  ),
  wheelchair: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <circle cx="12" cy="4" r="1.5" />
      <path d="M9 9h4l1 5h3" />
      <path d="M9 9l-1 5h5" />
      <circle cx="10" cy="19" r="2.5" />
      <circle cx="17" cy="19" r="2.5" />
    </svg>
  ),
};

const ICON_MAP = {
  none: Icons.flash,
  tangga: Icons.stairs,
  lift: Icons.elevator,
  disabilitas: Icons.wheelchair,
};

// Accent colors per priority :  used for the icon container bg and selected state
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
      {/* Icon pill :  colored per priority */}
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
          {disabled ? "Tidak ada jalur accessible" : (duration ?? desc)}
        </p>
      </div>
    </button>
  );
}

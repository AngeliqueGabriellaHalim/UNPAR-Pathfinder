// components/TopBar.jsx
import { IconHome, IconFlag } from "./Icons.jsx";

export default function TopBar({ onBack, toName, stepLabel }) {
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
        <p className="text-white/50 text-xs mt-0.5">{stepLabel}</p>
      </div>
    </div>
  );
}

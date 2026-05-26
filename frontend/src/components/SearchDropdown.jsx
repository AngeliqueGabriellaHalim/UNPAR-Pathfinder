import { useState, useRef, useEffect } from "react";

// Location pin: for regular floor/room nodes (tipe=0)
const IconPin = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// Staircase steps: for tangga nodes (tipe=1)
const IconStairs = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="4 20 4 14 10 14 10 8 16 8 16 4 20 4" />
  </svg>
);

// Elevator door with arrows: for lift nodes (tipe=2)
const IconElevator = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="2" width="18" height="20" rx="2" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <polyline points="7 8 9.5 5.5 12 8" />
    <polyline points="12 16 14.5 18.5 17 16" />
  </svg>
);

const IconSearch = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// Checkmark: shown next to the currently selected item
const IconCheck = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Chevron: the down arrow on the trigger button, rotates when open
const IconChevron = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

//getNodeIcon(tipe, className)
// Returns the correct icon component for a node type
function getNodeIcon(tipe, className) {
  if (tipe === 1) return <IconStairs className={className} />;
  if (tipe === 2) return <IconElevator className={className} />;
  return <IconPin className={className} />;
}

export default function SearchDropdown({
  label,
  nodes,
  value,
  onChange,
  placeholder = "Pilih lokasi...",
}) {
  // open: is the dropdown panel visible?
  // Toggled by clicking the trigger button, closed by outside click or selection
  const [open, setOpen] = useState(false);

  // query: what the user has typed in the search box inside the dropdown, to filter the node list in real time
  // Cleared whenever the dropdown closes
  const [query, setQuery] = useState("");

  // ref: a reference to the outer wrapper div
  // useRef() creates a box that holds a value (the DOM element) without triggering re-renders when it changes, used to detect outside clicks
  const ref = useRef(null);

  // Find the full node object matching the currently selected ID, `value` is just a number; we need name + tipe to display it
  const selected = nodes.find((n) => n.id === value);

  // Filter nodes by the search query
  const filtered = nodes.filter((n) =>
    n.nama.toLowerCase().includes(query.toLowerCase()),
  );

  // Close dropdown when user clicks outside this component
  // add a mousedown listener to the entire document to check whether click is inside wrapper div? do nothing : close/clear query
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Called when user clicks a node row in the dropdown list
  const handleSelect = (node) => {
    onChange(node.id);
    setQuery(""); // reset search so next open is clean
    setOpen(false); // hide the dropdown
  };

  return (
    <div ref={ref} className="relative w-full">
      {/* LABEL: shown above the button (e.g. "Dari mana?") */}
      {label && (
        <span className="block text-xs font-semibold text-ink-2 uppercase tracking-wider mb-1.5">
          {label}
        </span>
      )}

      {/*Looks like an input field but is a <button>
          clicking it should toggle the dropdown,
          TTyping happens inside the dropdown panel below.*/}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={[
          "w-full flex items-center gap-2 px-4 py-3.5 rounded-2xl text-left",
          "bg-white border-2 transition-all duration-150 active:scale-[0.99]",
          open
            ? "border-primary shadow-[0_0_0_3px_#EEF2FF]"
            : "border-surface-3",
        ].join(" ")}
      >
        {/* Show node type icon when something is selected */}
        {selected && (
          <span className="text-ink-3 shrink-0">
            {getNodeIcon(selected.tipe, "w-4 h-4")}
          </span>
        )}

        {/* Name of selected node, or placeholder if nothing selected */}
        <span
          className={`flex-1 truncate text-base font-medium ${
            selected ? "text-ink" : "text-ink-3"
          }`}
        >
          {selected ? selected.nama : placeholder}
        </span>

        {/* Chevron arrow: CSS transition rotates it 180 degree when open */}
        <span
          className={`text-ink-3 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <IconChevron className="w-4 h-4" />
        </span>
      </button>

      {/* Only rendered when open=true */}
      {open && (
        <div
          className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white border-2 border-primary-mid rounded-2xl shadow-xl overflow-hidden"
          style={{ animation: "fadeUp 0.15s ease both" }}
        >
          {/* A real text <input> for filtering the list.
              autoFocus = browser automatically focuses this element when
              the dropdown opens, so user can start typing immediately without needing to tap the field*/}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-surface-3">
            <span className="text-ink-3 shrink-0">
              <IconSearch className="w-4 h-4" />
            </span>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              placeholder="Cari nama lokasi..."
              className="flex-1 text-sm text-ink bg-transparent outline-none placeholder:text-ink-3"
              style={{ fontFamily: "var(--font-family-body)" }}
            />
          </div>

          {/* 
              filtered.map() renders one button per matching node */}
          <div className="max-h-56 overflow-y-auto">
            {filtered.length === 0 ? (
              // Empty state: shown when no nodes match the search query
              <p className="px-4 py-5 text-sm text-ink-3 text-center italic">
                Tidak ada hasil untuk "{query}"
              </p>
            ) : (
              filtered.map((node) => (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => handleSelect(node)}
                  className={[
                    "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                    "border-b border-surface-2 last:border-none",
                    // Highlight currently selected item
                    node.id === value
                      ? "bg-primary-soft"
                      : "active:bg-primary-soft",
                  ].join(" ")}
                >
                  {/* Node type icon */}
                  <span className="text-ink-3 shrink-0">
                    {getNodeIcon(node.tipe, "w-4 h-4")}
                  </span>

                  {/* Node name */}
                  <span className="flex-1 text-sm font-medium text-ink">
                    {node.nama}
                  </span>

                  {/* Checkmark: only visible on the selected item */}
                  {node.id === value && (
                    <span className="text-primary shrink-0">
                      <IconCheck className="w-4 h-4" />
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

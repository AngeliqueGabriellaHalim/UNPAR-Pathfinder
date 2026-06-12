import { useState, useRef, useEffect } from "react";
import {
  IconChevron,
  IconSearch,
  IconElevator,
  IconCheckMark,
  IconPin,
  IconStairs,
} from "../components/Icons.jsx";

//getNodeIcon(tipe, className)
// returns the correct icon component for a node type
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
  // toggled by clicking the trigger button, closed by outside click or selection
  const [open, setOpen] = useState(false);

  // query: what the user has typed in the search box inside the dropdown, to filter the node list in real time
  // cleared whenever the dropdown closes
  const [query, setQuery] = useState("");

  // ref: a reference to the outer wrapper div
  // useRef() used to detect outside clicks
  const ref = useRef(null);

  // find the full node object matching the currently selected ID
  const selected = nodes.find((n) => n.id === value);

  // filter nodes by the search query
  const filtered = nodes.filter((n) =>
    n.nama.toLowerCase().includes(query.toLowerCase()),
  );

  // close dropdown when user clicks outside this component
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

  // called when user clicks a node row in the dropdown list
  const handleSelect = (node) => {
    onChange(node.id);
    setQuery(""); // reset search so next open is clean
    setOpen(false); // hide the dropdown
  };

  return (
    <div ref={ref} className="relative w-full">
      {label && (
        <span className="block text-xs font-semibold text-ink-2 uppercase tracking-wider mb-1.5">
          {label}
        </span>
      )}

      {/*searchdropdown button,
          clicking it should toggle the dropdown*/}
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
        {selected && (
          <span className="text-ink-3 shrink-0">
            {getNodeIcon(selected.tipe, "w-4 h-4")}
          </span>
        )}
        <span
          className={`flex-1 truncate text-base font-medium ${
            selected ? "text-ink" : "text-ink-3"
          }`}
        >
          {selected ? selected.nama : placeholder}
        </span>

        <span
          className={`text-ink-3 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <IconChevron className="w-4 h-4" />
        </span>
      </button>

      {/* only rendered when open=true */}
      {open && (
        <div
          className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white border-2 border-primary-mid rounded-2xl shadow-xl overflow-hidden"
          style={{ animation: "fadeUp 0.15s ease both" }}
        >
          {/* text <input> for filtering the list.
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
              //  shown when no nodes match the search query
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
                    // highlight currently selected item
                    node.id === value
                      ? "bg-primary-soft"
                      : "active:bg-primary-soft",
                  ].join(" ")}
                >
                  {/* node type icon */}
                  <span className="text-ink-3 shrink-0">
                    {getNodeIcon(node.tipe, "w-4 h-4")}
                  </span>

                  {/* Node name */}
                  <span className="flex-1 text-sm font-medium text-ink">
                    {node.nama}
                  </span>
                  {node.id === value && (
                    <span className="text-primary shrink-0">
                      <IconCheckMark className="w-4 h-4" />
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

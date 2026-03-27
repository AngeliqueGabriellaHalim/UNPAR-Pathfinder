// src/components/SearchDropdown.jsx
// Reusable searchable dropdown for node selection.
// Used for both FROM (all nodes) and TO (destination nodes).

import { useState, useRef, useEffect } from "react";
import s from "./SearchDropdown.module.css";

// Icon shown next to each node based on whether it's a staircase
function nodeIcon(istangga) {
  return istangga ? "🪜" : "📍";
}

export default function SearchDropdown({
  label,
  nodes,
  value,
  onChange,
  placeholder = "Pilih lokasi...",
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  // The full node object for the currently selected ID
  const selected = nodes.find((n) => n.id === value);

  // Filter list by search query
  const filtered = nodes.filter((n) =>
    n.nama.toLowerCase().includes(query.toLowerCase()),
  );

  // Close dropdown when user clicks outside
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (node) => {
    onChange(node.id);
    setQuery("");
    setOpen(false);
  };

  return (
    <div ref={ref} className={s.wrapper}>
      {label && <span className={s.label}>{label}</span>}

      {/* The visible "input" that toggles the dropdown */}
      <button
        type="button"
        className={`${s.trigger} ${open ? s.triggerOpen : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={`${s.triggerText} ${!selected ? s.placeholder : ""}`}>
          {selected ? selected.nama : placeholder}
        </span>
        <span className={`${s.arrow} ${open ? s.arrowOpen : ""}`}>▼</span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className={s.dropdown}>
          {/* Search field inside dropdown */}
          <div className={s.searchBox}>
            <span className={s.searchIcon}>🔍</span>
            <input
              autoFocus
              className={s.searchInput}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama lokasi..."
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className={s.list}>
            {filtered.length === 0 ? (
              <div className={s.empty}>Tidak ada hasil untuk "{query}"</div>
            ) : (
              filtered.map((node) => (
                <div
                  key={node.id}
                  className={`${s.item} ${node.id === value ? s.itemSelected : ""}`}
                  onClick={() => handleSelect(node)}
                >
                  <span className={s.itemIcon}>{nodeIcon(node.istangga)}</span>
                  <span className={s.itemName}>{node.nama}</span>
                  {node.id === value && <span className={s.itemCheck}>✓</span>}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

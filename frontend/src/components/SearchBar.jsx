import { useState, useRef, useEffect } from "react";

//styles
const TIPE_CONFIG = {
  0: { label: "Lantai", bg: "#f0f4ff", color: "#4a6fa5" },
  1: { label: "Tangga", bg: "#fff4e6", color: "#c47a1a" },
  2: { label: "Lift", bg: "#e6f7ee", color: "#1a7a4a" },
};

export default function SearchBar({ label, nodes, value, onChange }) {
  const [query, setQuery] = useState("");

  //is dropdown open
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  // find chosen node by id
  const selected = nodes.find((n) => n.id === value);

  // filter search query (case insen)
  const filtered = nodes.filter((n) =>
    n.nama.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      //if click is inside our div
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false); // clicked outside → close dropdown
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); // on mount

  // update seleted node
  const handleSelect = (node) => {
    onChange(node.id); //chosen id
    setQuery(""); // clear search field
    setOpen(false); // close dropdown
  };

  return (
    //attach div to ref so can handle outside click
    <div ref={ref} style={styles.wrapper}>
      {/* Label above the dropdown (e.g. "Dari" or "Ke") */}
      <div style={styles.label}>{label}</div>

      {/* The "input-looking" div that opens/closes the dropdown on click */}
      <div
        style={{
          ...styles.inputBox,
          // Highlight border when dropdown is open
          borderColor: open ? "#5c7cfa" : "#2a2d3a",
          boxShadow: open ? "0 0 0 3px rgba(92,124,250,0.15)" : "none",
        }}
        onClick={() => setOpen((o) => !o)}
        // o => !o means "toggle": if it was true, make it false, and vice versa
      >
        {selected ? (
          <span style={styles.selectedText}>{selected.nama}</span>
        ) : (
          <span style={styles.placeholder}>Pilih lokasi...</span>
        )}
        {/* Arrow icon that rotates when open */}
        <span
          style={{
            ...styles.arrow,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▾
        </span>
      </div>

      {/* Dropdown panel — only renders when open=true */}
      {open && (
        <div style={styles.dropdown}>
          {/* Search input inside the dropdown */}
          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}>⌕</span>
            <input
              autoFocus // automatically focus this when dropdown opens
              value={query}
              onChange={(e) => setQuery(e.target.value)} // update query on every keystroke
              placeholder="Cari nama lokasi..."
              style={styles.searchInput}
              // Prevent clicks inside the search input from bubbling up
              // and triggering the outer div's onClick (which would close the dropdown)
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Scrollable list of filtered nodes */}
          <div style={styles.list}>
            {filtered.length === 0 ? (
              <div style={styles.empty}>Tidak ada hasil untuk "{query}"</div>
            ) : (
              filtered.map((node) => {
                const tipe = TIPE_CONFIG[node.tipe];
                const isSelected = node.id === value;
                return (
                  <div
                    key={node.id} // React needs a unique key for list items
                    style={{
                      ...styles.item,
                      background: isSelected ? "#1e2235" : "transparent",
                    }}
                    onClick={() => handleSelect(node)}
                  >
                    {/* Small colored badge showing node type */}
                    <span
                      style={{
                        ...styles.badge,
                        background: tipe.bg,
                        color: tipe.color,
                      }}
                    >
                      {tipe.label}
                    </span>
                    <span style={styles.nodeName}>{node.nama}</span>
                    {/* Checkmark on the currently selected item */}
                    {isSelected && <span style={styles.check}>✓</span>}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    color: "#7a7f99",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 8,
  },
  inputBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "13px 16px",
    background: "#1a1d2e",
    border: "1.5px solid #2a2d3a",
    borderRadius: 12,
    cursor: "pointer",
    transition: "border-color 0.2s, box-shadow 0.2s",
    userSelect: "none", // prevent text selection when clicking
  },
  selectedText: {
    fontSize: 15,
    color: "#e8eaf6",
    fontWeight: 500,
  },
  placeholder: {
    fontSize: 15,
    color: "#4a4f6a",
  },
  arrow: {
    fontSize: 14,
    color: "#5c7cfa",
    transition: "transform 0.2s",
    flexShrink: 0,
  },
  dropdown: {
    position: "absolute", // floats over other content
    top: "calc(100% + 6px)", // just below the input box
    left: 0,
    right: 0,
    zIndex: 200, // high z-index so it appears above everything else
    background: "#1a1d2e",
    border: "1.5px solid #2a2d3a",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    padding: "10px 14px",
    borderBottom: "1px solid #2a2d3a",
    gap: 8,
  },
  searchIcon: {
    fontSize: 18,
    color: "#4a4f6a",
    flexShrink: 0,
  },
  searchInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    fontSize: 14,
    color: "#e8eaf6",
    fontFamily: "'DM Sans', sans-serif",
  },
  list: {
    maxHeight: 240,
    overflowY: "auto", // scroll if more than 240px of items
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    cursor: "pointer",
    transition: "background 0.15s",
  },
  badge: {
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 7px",
    borderRadius: 4,
    flexShrink: 0,
    letterSpacing: "0.04em",
  },
  nodeName: {
    fontSize: 14,
    color: "#c8cce8",
    flex: 1,
  },
  check: {
    color: "#5c7cfa",
    fontWeight: 700,
    fontSize: 14,
  },
  empty: {
    padding: "16px 14px",
    fontSize: 13,
    color: "#4a4f6a",
    fontStyle: "italic",
  },
};

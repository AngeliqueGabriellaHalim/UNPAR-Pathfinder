// =============================================================
// src/pages/Result.jsx
// RESULT PAGE — ROUTE DISPLAY
//
// This page receives the from/to/priority selection from Home,
// calls the backend to get the full route, and displays it.
//
// HOW DATA GETS HERE:
// Home.jsx calls navigate('/result', { state: { from, to, priority, nodes } })
// This page reads that data with useLocation().state
//
// WHAT IT SHOWS:
//   - Which priority was chosen (badge at top)
//   - Origin → Destination subtitle
//   - Estimated travel time (big number)
//   - Full route as a string: "A → B → C → D"
//   - Step-by-step visual list with node types
// =============================================================

import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRoute } from '../services/api.js'


// -------------------------------------------------------------
// formatDuration(seconds)
// Same helper as in RouteOption — converts seconds to readable text.
// We duplicate it here rather than importing from RouteOption
// because RouteOption is a UI component, not a utility module.
// (In a larger app you'd put this in src/utils/format.js)
// -------------------------------------------------------------
function formatDuration(seconds) {
  if (seconds == null) return '—'
  const minutes = Math.floor(seconds / 60)
  const secs    = Math.round(seconds % 60)
  if (minutes === 0) return `${secs} detik`
  if (secs === 0)    return `${minutes} menit`
  return `${minutes} menit ${secs} detik`
}


// Config for each priority's visual style on this page
const PRIORITY_CONFIG = {
  none:        { label: 'Tercepat',          emoji: '⚡', color: '#c678dd', bg: '#1a102830' },
  tangga:      { label: 'Via Tangga',        emoji: '🪜', color: '#f4a43a', bg: '#231e1030' },
  lift:        { label: 'Via Lift',          emoji: '🛗', color: '#5c7cfa', bg: '#10182830' },
  disabilitas: { label: 'Ramah Disabilitas', emoji: '♿', color: '#4cca7a', bg: '#0f1f1830' },
}

// Config for node type labels
const TIPE_LABEL = {
  0: { label: 'Lantai', color: '#7a7f99' },
  1: { label: 'Tangga', color: '#f4a43a' },
  2: { label: 'Lift',   color: '#5c7cfa' },
}


// =============================================================
// COMPONENT
// =============================================================
export default function Result() {
  // useLocation() gives us access to the router's location object.
  // location.state = whatever was passed in navigate('/result', { state: ... })
  const location = useLocation()
  const navigate  = useNavigate()

  // Destructure the data passed from Home page
  // If state is null (user navigated directly to /result), these are all undefined
  const { from, to, priority, nodes } = location.state || {}

  // --- STATE ---
  const [result,  setResult]  = useState(null)  // full route from API
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')

  // Look up the human-readable names for from/to
  // nodes was passed from Home so we don't need another API call
  const fromName = nodes?.find(n => n.id === from)?.nama || `Node ${from}`
  const toName   = nodes?.find(n => n.id === to)?.nama   || `Node ${to}`

  const cfg = PRIORITY_CONFIG[priority] || {}


  // --- EFFECT: Fetch the route ---
  useEffect(() => {
    // If we don't have the required data (e.g. direct URL access), go back to home
    if (!from || !to || !priority) {
      navigate('/')
      return
    }

    setLoading(true)
    getRoute(from, to, priority)
      .then(data => {
        setResult(data)
        setLoading(false)
      })
      .catch(err => {
        // err.response?.data?.error = the error message from our Express route
        // The ?. is optional chaining — safe even if response or data is undefined
        setError(err.response?.data?.error || 'Gagal mendapatkan rute')
        setLoading(false)
      })
  }, []) // [] = run once on mount (we only need to fetch once)


  // =============================================================
  // RENDER
  // =============================================================
  return (
    <div style={styles.page}>
      <div style={styles.blob} />

      <div style={styles.card}>

        {/* BACK BUTTON */}
        <button onClick={() => navigate('/')} style={styles.backBtn}>
          ← Kembali
        </button>

        {/* HEADER */}
        <div style={styles.header}>
          {/* Priority badge */}
          <div style={{
            ...styles.priorityBadge,
            background: cfg.bg,
            border: `1px solid ${cfg.color}30`,
            color: cfg.color,
          }}>
            {cfg.emoji} {cfg.label}
          </div>

          <h2 style={styles.title}>Hasil Rute</h2>
          <p style={styles.subtitle}>{fromName} → {toName}</p>
        </div>


        {/* LOADING STATE */}
        {loading && (
          <div style={styles.loadingBox}>
            <div style={styles.spinner} />
            <span style={{ color: '#5a5f7a', fontSize: 14 }}>Menghitung rute...</span>
          </div>
        )}


        {/* ERROR STATE */}
        {error && !loading && (
          <div style={styles.errorBox}>
            <span style={{ fontSize: 28 }}>🚫</span>
            <div>
              <div style={{ fontWeight: 700, color: '#ff6b6b', marginBottom: 4 }}>
                Rute tidak ditemukan
              </div>
              <div style={{ fontSize: 13, color: '#aa4444' }}>{error}</div>
            </div>
          </div>
        )}


        {/* SUCCESS STATE */}
        {result && !loading && (
          <>
            {/* DURATION BOX — the big time display */}
            <div style={{
              ...styles.durationBox,
              background: `${cfg.color}10`,
              border: `1.5px solid ${cfg.color}30`,
            }}>
              <div style={styles.durationLabel}>Estimasi Waktu</div>
              <div style={{ ...styles.durationValue, color: cfg.color }}>
                {formatDuration(result.cost)}
              </div>
            </div>


            {/* ROUTE STRING — "A → B → C → D" all in one line */}
            <div style={styles.section}>
              <div style={styles.sectionLabel}>Jalur Lengkap</div>
              <div style={styles.routeString}>
                {result.pathStr}
              </div>
            </div>


            {/* STEP BY STEP LIST */}
            <div style={styles.section}>
              <div style={styles.sectionLabel}>Langkah demi Langkah</div>

              <div style={styles.stepList}>
                {result.path.map((node, index) => {
                  const isFirst = index === 0
                  const isLast  = index === result.path.length - 1
                  const tipe    = TIPE_LABEL[node.tipe]

                  return (
                    // React needs a unique key for each item in a list.
                    // Using node.id is ideal — it's guaranteed unique.
                    <div key={node.id} style={styles.stepRow}>

                      {/* Left column: circle number + vertical connector line */}
                      <div style={styles.stepLeft}>
                        {/* Circle dot with number */}
                        <div style={{
                          ...styles.stepCircle,
                          // First and last nodes get the priority color, middle get grey
                          background: (isFirst || isLast) ? cfg.color : '#2a2d3a',
                          color:      (isFirst || isLast) ? '#fff' : '#7a7f99',
                          border:     `2px solid ${(isFirst || isLast) ? cfg.color : '#3a3f5a'}`,
                        }}>
                          {/* Show special chars for start/end, number for middle */}
                          {isFirst ? '▶' : isLast ? '★' : index + 1}
                        </div>

                        {/* Vertical line connecting to next step (don't show on last item) */}
                        {!isLast && (
                          <div style={{
                            ...styles.stepConnector,
                            // Gradient from priority color → grey as you go down
                            background: `linear-gradient(${cfg.color}80, #2a2d3a)`,
                          }} />
                        )}
                      </div>

                      {/* Right column: node name + type label */}
                      <div style={styles.stepRight}>
                        <div style={styles.stepName}>{node.nama}</div>
                        <div style={{ ...styles.stepType, color: tipe.color }}>
                          {tipe.label}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}


// =============================================================
// STYLES
// =============================================================
const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0c14',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '24px 20px 48px',
    position: 'relative',
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(92,124,250,0.08) 0%, transparent 70%)',
    top: -150,
    left: '50%',
    transform: 'translateX(-50%)',
    pointerEvents: 'none',
  },
  card: {
    background: '#13162280',
    backdropFilter: 'blur(20px)',
    border: '1px solid #2a2d3a',
    borderRadius: 24,
    padding: '32px 28px',
    width: '100%',
    maxWidth: 460,
    marginTop: 12,
    animation: 'fadeUp 0.35s ease both',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#5a5f7a',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    padding: 0,
    marginBottom: 24,
    fontFamily: "'DM Sans', sans-serif",
    transition: 'color 0.15s',
  },
  header: {
    marginBottom: 24,
  },
  priorityBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '5px 14px',
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 12,
    fontFamily: "'Sora', sans-serif",
  },
  title: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 26,
    fontWeight: 800,
    color: '#e8eaf6',
    margin: '0 0 6px',
    letterSpacing: '-0.3px',
  },
  subtitle: {
    fontSize: 14,
    color: '#5a5f7a',
  },
  loadingBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '24px 0',
    justifyContent: 'center',
  },
  spinner: {
    width: 22,
    height: 22,
    border: '2.5px solid #2a2d3a',
    borderTop: '2.5px solid #5c7cfa',
    borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
  },
  errorBox: {
    display: 'flex',
    gap: 14,
    alignItems: 'flex-start',
    padding: '18px',
    background: '#ff6b6b10',
    border: '1px solid #ff6b6b20',
    borderRadius: 14,
  },
  durationBox: {
    borderRadius: 16,
    padding: '20px 24px',
    marginBottom: 24,
    textAlign: 'center',
  },
  durationLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: '#5a5f7a',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: 6,
  },
  durationValue: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 32,
    fontWeight: 800,
    letterSpacing: '-0.5px',
  },
  section: {
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: '#4a4f6a',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: 12,
  },
  routeString: {
    fontSize: 14,
    color: '#9099cc',
    lineHeight: 1.8,
    padding: '14px 16px',
    background: '#1a1d2e',
    borderRadius: 12,
    border: '1px solid #2a2d3a',
    wordBreak: 'break-word', // wrap long strings
    fontFamily: "'DM Sans', sans-serif",
  },
  stepList: {
    display: 'flex',
    flexDirection: 'column',
  },
  stepRow: {
    display: 'flex',
    gap: 14,
    alignItems: 'flex-start',
  },
  stepLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 0,
    width: 28,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 700,
    flexShrink: 0,
    zIndex: 1,
    fontFamily: "'Sora', sans-serif",
  },
  stepConnector: {
    width: 2,
    height: 28,
    marginTop: 2,
  },
  stepRight: {
    paddingTop: 4,
    paddingBottom: 16,
    flex: 1,
  },
  stepName: {
    fontSize: 14,
    fontWeight: 600,
    color: '#c8cce8',
    marginBottom: 2,
    fontFamily: "'DM Sans', sans-serif",
  },
  stepType: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
}

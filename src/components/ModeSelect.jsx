import { useState } from 'react'

const MODES = [
  {
    key: 'scene',
    icon: '◈',
    name: 'Scene',
    desc: 'One situation at a time. Read the scene, rate all four questions.',
  },
  {
    key: 'deck',
    icon: '◉',
    name: 'Deck',
    desc: 'One card per question. Pick fast — it auto-advances. Keys 1–5.',
  },
  {
    key: 'sprint',
    icon: '◆',
    name: 'Sprint',
    desc: 'One dimension across all 14 situations. A fast batch sweep.',
  },
]

// Failure mode colour swatches shown on the start screen
const FAILURE_MODES = [
  { label: 'Producing Speech',     color: '#00ff88' },
  { label: 'Understanding Speech', color: '#00d4ff' },
  { label: 'Reading & Forms',      color: '#ffaa00' },
  { label: 'Judging Formality',    color: '#c060ff' },
]

export default function ModeSelect({ onStart }) {
  const [mode, setMode] = useState('deck')

  return (
    <main className="mode-select">
      {/* Title */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: 'center' }}>
        <h1 className="navi-title">NAVI</h1>
        <p className="navi-sub">Navigating Academic &amp; Vocational English</p>
        {/* Failure-mode pills — preview of the dynamic theming */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
          {FAILURE_MODES.map(fm => (
            <span
              key={fm.label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '100px',
                border: `1px solid ${fm.color}55`,
                background: `${fm.color}0f`,
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: fm.color,
                boxShadow: `0 0 10px ${fm.color}33`,
              }}
            >
              <span style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: fm.color,
                boxShadow: `0 0 6px ${fm.color}`,
                flexShrink: 0,
              }} />
              {fm.label}
            </span>
          ))}
        </div>
      </div>

      {/* Mode picker */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: 'center' }}>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
          // select your play style
        </p>
        <div className="mode-cards">
          {MODES.map(m => (
            <button
              key={m.key}
              className={`mode-card mode-card--${m.key}${mode === m.key ? ' selected' : ''}`}
              onClick={() => setMode(m.key)}
              type="button"
              aria-pressed={mode === m.key}
            >
              <span className="mode-card__icon">{m.icon}</span>
              <span className="mode-card__name">{m.name}</span>
              <span className="mode-card__desc">{m.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => onStart({ mode, flavour: 'en' })}
        type="button"
        style={{ minWidth: 200, fontSize: 'var(--font-size-lg)', padding: 'var(--space-4) var(--space-6)' }}
      >
        Begin
      </button>
    </main>
  )
}

import { useState, useRef } from 'react'
import { SITUATIONS, DIMENSIONS } from '../data/questions.js'

const STRESS_COLORS = ['#c8dcf8', '#8fb8f0', '#5690e4', '#2d65c0', '#0d3a8a']

// SVG layout constants
const SVG_W = 540
const SVG_H = 380
const MARGIN = { top: 20, right: 140, bottom: 60, left: 60 }
const PLOT_W = SVG_W - MARGIN.left - MARGIN.right  // 340
const PLOT_H = SVG_H - MARGIN.top - MARGIN.bottom  // 300
const UNIT_X = PLOT_W / 4  // 85
const UNIT_Y = PLOT_H / 4  // 75
const POINT_R = 9

function jitter(id) {
  let h = 0
  for (let i = 0; i < id.length; i++) h = Math.imul(31, h) + id.charCodeAt(i) | 0
  return { jx: ((h & 0xFF) / 255) * 16 - 8, jy: (((h >> 8) & 0xFF) / 255) * 16 - 8 }
}

function xScale(v) { return v * UNIT_X }
function yScale(v) { return PLOT_H - v * UNIT_Y }

function hashStr(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = Math.imul(31, h) + str.charCodeAt(i) | 0
  return h
}

export default function Results({ ratings, answers, mode, flavour, situationOrder }) {
  const [hoverId, setHoverId] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  // Build data points
  const points = SITUATIONS.map(sit => {
    const r = ratings[sit.id] || {}
    return {
      id: sit.id,
      scene: sit.scene,
      freq: r.freq !== undefined ? r.freq : null,
      diff: r.diff !== undefined ? r.diff : null,
      stress: r.stress !== undefined ? r.stress : null,
      avoid: r.avoid !== undefined ? r.avoid : null,
    }
  }).filter(p => p.freq !== null && p.diff !== null)

  // Compute positions with jitter
  const positioned = points.map(p => {
    const { jx, jy } = jitter(p.id)
    const cx = MARGIN.left + xScale(p.freq) + jx
    const cy = MARGIN.top + yScale(p.diff) + jy
    return { ...p, cx, cy }
  })

  // Top 3 by sum
  const sorted = [...positioned].filter(p => p.stress !== null).sort((a, b) => {
    return (b.freq + b.diff + b.stress) - (a.freq + a.diff + a.stress)
  })
  const top3Ids = new Set(sorted.slice(0, 3).map(p => p.id))

  // Labels with collision avoidance
  const placedLabels = []
  const labelPoints = positioned.filter(p => top3Ids.has(p.id))
  for (const p of labelPoints) {
    const sit = SITUATIONS.find(s => s.id === p.id)
    const shortName = sit ? sit.id.replace(/_/g, ' ') : p.id
    const estW = shortName.length * 7
    const nearRight = p.cx + estW + 12 > SVG_W - MARGIN.right + MARGIN.left
    const lx = nearRight ? p.cx - estW - 14 : p.cx + 14
    const ly = p.cy + 4

    // Simple collision check
    const overlaps = placedLabels.some(lb => {
      return Math.abs(lb.lx - lx) < estW + 10 && Math.abs(lb.ly - ly) < 18
    })
    if (!overlaps) {
      placedLabels.push({ id: p.id, lx, ly, text: shortName })
    }
  }

  function handleMouseMove(e, p) {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setTooltipPos({ x: e.clientX - rect.left + 12, y: e.clientY - rect.top - 10 })
    setHoverId(p.id)
  }

  // Sample JSON row
  const sampleSit = SITUATIONS[0]
  const sampleRatings = ratings[sampleSit.id] || { freq: 2, diff: 3, stress: 2, avoid: 1 }
  const sampleRow = {
    session_id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
    mode,
    flavour,
    [`${sampleSit.id}.freq`]: sampleRatings.freq,
    [`${sampleSit.id}.diff`]: sampleRatings.diff,
    [`${sampleSit.id}.stress`]: sampleRatings.stress,
    [`${sampleSit.id}.avoid`]: sampleRatings.avoid,
    '...': '(one column per situation × dimension)',
  }

  const hoveredPoint = positioned.find(p => p.id === hoverId)
  const hoveredSit = hoveredPoint ? SITUATIONS.find(s => s.id === hoveredPoint.id) : null

  return (
    <div className="results-wrap">
      <div>
        <h1 className="results-title">Your Results</h1>
        <p className="results-subtitle">
          Here's a visualization of how you rated the 14 situations across four dimensions.
        </p>
      </div>

      {/* Scatter plot */}
      <div>
        <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-3)' }}>
          Frequency vs. Difficulty
        </h2>
        <div ref={containerRef} style={{ position: 'relative', overflowX: 'auto' }}>
          <svg
            width={SVG_W}
            height={SVG_H}
            style={{ display: 'block', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
            onMouseLeave={() => setHoverId(null)}
          >
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map(tick => (
              <g key={tick}>
                <line
                  x1={MARGIN.left + xScale(tick)} y1={MARGIN.top}
                  x2={MARGIN.left + xScale(tick)} y2={MARGIN.top + PLOT_H}
                  stroke="var(--color-border)" strokeWidth={1}
                />
                <line
                  x1={MARGIN.left} y1={MARGIN.top + yScale(tick)}
                  x2={MARGIN.left + PLOT_W} y2={MARGIN.top + yScale(tick)}
                  stroke="var(--color-border)" strokeWidth={1}
                />
              </g>
            ))}

            {/* X axis ticks and labels */}
            {[0, 1, 2, 3, 4].map(tick => (
              <g key={tick}>
                <line
                  x1={MARGIN.left + xScale(tick)} y1={MARGIN.top + PLOT_H}
                  x2={MARGIN.left + xScale(tick)} y2={MARGIN.top + PLOT_H + 5}
                  stroke="var(--color-text-muted)" strokeWidth={1}
                />
                <text
                  x={MARGIN.left + xScale(tick)}
                  y={MARGIN.top + PLOT_H + 18}
                  textAnchor="middle"
                  fontSize={11}
                  fill="var(--color-text-muted)"
                >
                  {tick}
                </text>
              </g>
            ))}

            {/* Y axis ticks and labels */}
            {[0, 1, 2, 3, 4].map(tick => (
              <g key={tick}>
                <line
                  x1={MARGIN.left - 5} y1={MARGIN.top + yScale(tick)}
                  x2={MARGIN.left} y2={MARGIN.top + yScale(tick)}
                  stroke="var(--color-text-muted)" strokeWidth={1}
                />
                <text
                  x={MARGIN.left - 10}
                  y={MARGIN.top + yScale(tick) + 4}
                  textAnchor="end"
                  fontSize={11}
                  fill="var(--color-text-muted)"
                >
                  {tick}
                </text>
              </g>
            ))}

            {/* Axis labels */}
            <text
              x={MARGIN.left + PLOT_W / 2}
              y={SVG_H - 8}
              textAnchor="middle"
              fontSize={12}
              fill="var(--color-text-muted)"
            >
              Frequency
            </text>
            <text
              x={14}
              y={MARGIN.top + PLOT_H / 2}
              textAnchor="middle"
              fontSize={12}
              fill="var(--color-text-muted)"
              transform={`rotate(-90, 14, ${MARGIN.top + PLOT_H / 2})`}
            >
              Difficulty
            </text>

            {/* Data points */}
            {positioned.map(p => {
              const stressVal = p.stress !== null ? Math.min(4, Math.max(0, p.stress)) : 2
              const fill = STRESS_COLORS[stressVal]
              const isHovered = hoverId === p.id
              return (
                <g key={p.id}>
                  {p.avoid !== null && p.avoid > 0 && (
                    <circle
                      cx={p.cx}
                      cy={p.cy}
                      r={POINT_R + 4}
                      fill="none"
                      stroke="var(--color-surface)"
                      strokeWidth={4}
                    />
                  )}
                  {p.avoid !== null && p.avoid > 0 && (
                    <circle
                      cx={p.cx}
                      cy={p.cy}
                      r={POINT_R + 4}
                      fill="none"
                      stroke={fill}
                      strokeWidth={2}
                      opacity={0.6}
                    />
                  )}
                  <circle
                    cx={p.cx}
                    cy={p.cy}
                    r={POINT_R}
                    fill={fill}
                    stroke={isHovered ? '#fff' : 'transparent'}
                    strokeWidth={isHovered ? 2 : 0}
                    style={{ cursor: 'pointer', transition: 'r 80ms' }}
                    onMouseMove={e => handleMouseMove(e, p)}
                    onMouseLeave={() => setHoverId(null)}
                  />
                </g>
              )
            })}

            {/* Direct labels for top 3 */}
            {placedLabels.map(lb => (
              <text
                key={lb.id}
                x={lb.lx}
                y={lb.ly}
                fontSize={10}
                fill="var(--color-text-muted)"
              >
                {lb.text}
              </text>
            ))}

            {/* Legend */}
            {STRESS_COLORS.map((color, i) => (
              <g key={i}>
                <rect
                  x={SVG_W - MARGIN.right + 12}
                  y={MARGIN.top + i * 22}
                  width={14}
                  height={14}
                  rx={3}
                  fill={color}
                />
                <text
                  x={SVG_W - MARGIN.right + 32}
                  y={MARGIN.top + i * 22 + 11}
                  fontSize={11}
                  fill="var(--color-text-muted)"
                >
                  Stress {i}
                </text>
              </g>
            ))}
            <text
              x={SVG_W - MARGIN.right + 12}
              y={MARGIN.top + 5 * 22 + 16}
              fontSize={10}
              fill="var(--color-text-muted)"
            >
              Ring = avoids
            </text>
          </svg>

          {/* Tooltip */}
          {hoverId && hoveredPoint && hoveredSit && (
            <div
              className="scatter-tooltip"
              style={{ left: tooltipPos.x, top: tooltipPos.y, position: 'absolute' }}
            >
              <strong style={{ display: 'block', marginBottom: 4, color: 'var(--color-text)' }}>
                {hoveredSit.scene}
              </strong>
              <span>Freq: {hoveredPoint.freq} &nbsp; Diff: {hoveredPoint.diff}</span><br />
              <span>Stress: {hoveredPoint.stress} &nbsp; Avoid: {hoveredPoint.avoid}</span>
            </div>
          )}
        </div>
      </div>

      {/* Data table */}
      <div>
        <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-3)' }}>
          All Ratings
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="results-table">
            <thead>
              <tr>
                <th>Situation</th>
                <th>Freq</th>
                <th>Diff</th>
                <th>Stress</th>
                <th>Avoid</th>
                <th>Scene</th>
              </tr>
            </thead>
            <tbody>
              {SITUATIONS.map(sit => {
                const r = ratings[sit.id] || {}
                return (
                  <tr key={sit.id}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-sm)' }}>{sit.id}</td>
                    <td>{r.freq !== undefined ? r.freq : '—'}</td>
                    <td>{r.diff !== undefined ? r.diff : '—'}</td>
                    <td>{r.stress !== undefined ? r.stress : '—'}</td>
                    <td>{r.avoid !== undefined ? r.avoid : '—'}</td>
                    <td style={{ color: 'var(--color-text-muted)', maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {sit.scene}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sample JSON */}
      <div>
        <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-3)' }}>
          Data Schema Example
        </h2>
        <pre className="sample-json">{JSON.stringify(sampleRow, null, 2)}</pre>
        <p style={{ marginTop: 'var(--space-3)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
          A participant who used Deck mode and one who used Scene mode produce rows with the same columns.
          Mode only affects presentation, never the data schema.
        </p>
      </div>
    </div>
  )
}

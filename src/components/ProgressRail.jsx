export default function ProgressRail({ value, max }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}
      style={{ height: 3, background: 'var(--color-border)', position: 'sticky', top: 0, zIndex: 10 }}>
      <div style={{ height: '100%', width: `${pct}%`, background: 'var(--color-accent)', transition: 'width var(--transition-base)' }} />
    </div>
  )
}

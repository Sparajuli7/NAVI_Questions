/** Shared input controls. Everything is a real button or input for keyboard use. */

export function ChoiceGroup({ name, options, value, onChange, stack = false }) {
  return (
    <div className={'choices' + (stack ? ' stack' : '')} role="radiogroup" aria-label={name}>
      {options.map((label, i) => (
        <button
          key={i}
          type="button"
          role="radio"
          aria-checked={value === i}
          className="choice"
          onClick={() => onChange(value === i ? undefined : i)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export function MultiGroup({ name, options, value, onChange }) {
  const arr = Array.isArray(value) ? value : []
  return (
    <div className="choices stack" role="group" aria-label={name}>
      {options.map((label, i) => {
        const on = arr.includes(i)
        return (
          <button
            key={i}
            type="button"
            role="checkbox"
            aria-checked={on}
            className="choice check"
            onClick={() =>
              onChange(on ? arr.filter((x) => x !== i) : [...arr, i].sort((a, b) => a - b))
            }
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

export function Progress({ done, total }) {
  const pct = total ? Math.round((done / total) * 100) : 0
  return (
    <div className="progress" aria-label={`Progress ${pct} percent`}>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: pct + '%' }} />
      </div>
      <span className="progress-num">{pct}%</span>
    </div>
  )
}

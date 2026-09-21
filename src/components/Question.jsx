import { ChoiceGroup, MultiGroup } from './Controls'

/** Renders any question from the master list by type. */
export default function Question({ q, value, onChange }) {
  const labelId = `q-${q.id}`

  let control = null

  if (q.type === 'single') {
    control = (
      <ChoiceGroup
        name={q.label}
        options={q.options}
        value={value}
        onChange={onChange}
        stack={q.options.some((o) => o.length > 18)}
      />
    )
  }

  if (q.type === 'yesno') {
    // stored as 1 for the first option, 0 for the second
    const idx = value === 1 ? 0 : value === 0 ? 1 : undefined
    control = (
      <ChoiceGroup
        name={q.label}
        options={q.options}
        value={idx}
        onChange={(i) => onChange(i === undefined ? undefined : i === 0 ? 1 : 0)}
        stack={q.options.some((o) => o.length > 18)}
      />
    )
  }

  if (q.type === 'scale5') {
    control = (
      <>
        <ChoiceGroup
          name={q.label}
          options={['1', '2', '3', '4', '5']}
          value={value === undefined ? undefined : value - 1}
          onChange={(i) => onChange(i === undefined ? undefined : i + 1)}
        />
        <div className="scale-ends">
          <span>1 · Basic</span>
          <span>5 · Fluent</span>
        </div>
      </>
    )
  }

  if (q.type === 'multi') {
    control = <MultiGroup name={q.label} options={q.options} value={value} onChange={onChange} />
  }

  if (q.type === 'select') {
    control = (
      <select
        aria-labelledby={labelId}
        value={value ?? ''}
        onChange={(e) => {
          const raw = e.target.value
          if (raw === '') return onChange(undefined)
          const opt = q.options.find((o) => String(o.value) === raw)
          onChange(opt ? opt.value : raw)
        }}
      >
        <option value="">Choose one</option>
        {q.options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    )
  }

  if (q.type === 'text') {
    control = (
      <input
        aria-labelledby={labelId}
        type={q.inputType || 'text'}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    )
  }

  if (q.type === 'longtext') {
    control = (
      <textarea
        aria-labelledby={labelId}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
      />
    )
  }

  return (
    <div className="question">
      <p className="q-label" id={labelId}>
        {q.label}
        {q.required && <span className="req" aria-label="required"> *</span>}
      </p>
      {q.help && <p className="q-help">{q.help}</p>}
      {control}
    </div>
  )
}

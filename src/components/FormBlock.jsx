import { useState } from 'react'

const MONTHS = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
]

const YEARS = Array.from({ length: 2026 - 2018 + 1 }, (_, i) => String(2018 + i))

function isConditionMet(question, localAnswers) {
  if (!question.conditional) return true
  const { any } = question.conditional
  if (any) {
    return any.some(cond => {
      const [qid, val] = cond.split(':')
      return localAnswers[qid] === val
    })
  }
  return true
}

function isQuestionAnswered(question, value) {
  if (!question.required) return true
  if (value === undefined || value === null || value === '') return false
  if (Array.isArray(value) && value.length === 0) return false
  if (typeof value === 'object' && !Array.isArray(value)) {
    return value.month && value.year
  }
  return true
}

export default function FormBlock({ block, answers, onComplete, onBack }) {
  const init = {}
  for (const q of block.questions) {
    if (answers[q.id] !== undefined) init[q.id] = answers[q.id]
  }
  const [localAnswers, setLocalAnswers] = useState(init)

  function setAnswer(qid, value) {
    setLocalAnswers(prev => ({ ...prev, [qid]: value }))
  }

  function toggleMulti(qid, value) {
    setLocalAnswers(prev => {
      const cur = Array.isArray(prev[qid]) ? prev[qid] : []
      if (cur.includes(value)) {
        return { ...prev, [qid]: cur.filter(v => v !== value) }
      }
      return { ...prev, [qid]: [...cur, value] }
    })
  }

  const visibleQuestions = block.questions.filter(q => isConditionMet(q, localAnswers))

  const allValid = visibleQuestions.every(q => {
    if (!q.required) return true
    return isQuestionAnswered(q, localAnswers[q.id])
  })

  function handleContinue() {
    // Check if any gate question with exitOnNo is answered 'no'
    for (const q of visibleQuestions) {
      if (q.type === 'gate' && q.exitOnNo && localAnswers[q.id] === 'no') {
        onComplete({}, true)
        return
      }
    }
    onComplete(localAnswers, false)
  }

  return (
    <main className="form-block">
      <div className="form-block__inner">
        <h1 className="form-block__title">{block.title}</h1>

        {block.placeholder && (
          <div className="placeholder-note">{block.placeholderNote}</div>
        )}

        {visibleQuestions.map(q => (
          <QuestionItem
            key={q.id}
            question={q}
            value={localAnswers[q.id]}
            onChange={(val) => setAnswer(q.id, val)}
            onToggleMulti={(val) => toggleMulti(q.id, val)}
          />
        ))}

        <div className="form-block__nav">
          {onBack && (
            <button className="btn btn-ghost" type="button" onClick={onBack}>
              Back
            </button>
          )}
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleContinue}
            disabled={!allValid}
            style={{ marginLeft: 'auto' }}
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  )
}

function QuestionItem({ question, value, onChange, onToggleMulti }) {
  return (
    <div className="question-group">
      <div className="question-label">{question.text}</div>
      {question.hint && <div className="question-hint">{question.hint}</div>}
      <QuestionInput question={question} value={value} onChange={onChange} onToggleMulti={onToggleMulti} />
    </div>
  )
}

function QuestionInput({ question, value, onChange, onToggleMulti }) {
  const { type } = question

  if (type === 'gate' || type === 'single') {
    return (
      <div className="option-list" role="radiogroup" aria-label={question.text}>
        {question.options.map(opt => (
          <label
            key={opt.value}
            className={`option-item${value === opt.value ? ' selected' : ''}`}
          >
            <input
              type="radio"
              name={question.id}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
    )
  }

  if (type === 'multi') {
    const checked = Array.isArray(value) ? value : []
    return (
      <div className="option-list" role="group" aria-label={question.text}>
        {question.options.map(opt => (
          <label
            key={opt.value}
            className={`option-item${checked.includes(opt.value) ? ' selected' : ''}`}
          >
            <input
              type="checkbox"
              value={opt.value}
              checked={checked.includes(opt.value)}
              onChange={() => onToggleMulti(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
    )
  }

  if (type === 'likert') {
    const count = question.max - question.min + 1
    const labels = question.labels || []
    return (
      <div className="likert-row" role="radiogroup" aria-label={question.text}>
        {Array.from({ length: count }, (_, i) => {
          const val = question.min + i
          const label = labels[i] || String(val)
          return (
            <button
              key={val}
              type="button"
              className={`likert-btn${value === val ? ' selected' : ''}`}
              onClick={() => onChange(val)}
              aria-pressed={value === val}
            >
              <span className="likert-btn__value">{val}</span>
              <span>{label}</span>
            </button>
          )
        })}
      </div>
    )
  }

  if (type === 'text') {
    return (
      <input
        type="text"
        className="text-input"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        maxLength={question.maxLength}
        placeholder=""
      />
    )
  }

  if (type === 'longtext') {
    return (
      <textarea
        className="text-input"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        maxLength={question.maxLength}
        rows={5}
      />
    )
  }

  if (type === 'month') {
    const cur = value && typeof value === 'object' ? value : { month: '', year: '' }
    return (
      <div className="month-row">
        <select
          value={cur.month}
          onChange={e => onChange({ ...cur, month: e.target.value })}
          aria-label="Month"
        >
          <option value="">Month</option>
          {MONTHS.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
        <select
          value={cur.year}
          onChange={e => onChange({ ...cur, year: e.target.value })}
          aria-label="Year"
        >
          <option value="">Year</option>
          {YEARS.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
    )
  }

  return null
}

import { useState, useEffect } from 'react'
import { DIMENSIONS } from '../../data/questions.js'

export default function SprintMode({ situationOrder, ratings, onComplete, onBack, onThemeChange }) {
  const [localRatings, setLocalRatings] = useState(() => {
    const copy = {}
    for (const s of situationOrder) {
      copy[s.id] = ratings[s.id] ? { ...ratings[s.id] } : {}
    }
    return copy
  })
  const [pageIndex, setPageIndex] = useState(0)

  // Sprint shows all situations at once — clear any situation-specific theme
  useEffect(() => { onThemeChange?.('') }, []) // eslint-disable-line

  const dim = DIMENSIONS[pageIndex]

  const allRated = situationOrder.every(s => {
    return localRatings[s.id]?.[dim.key] !== undefined
  })

  function setRating(sitId, val) {
    setLocalRatings(prev => ({
      ...prev,
      [sitId]: { ...prev[sitId], [dim.key]: val },
    }))
  }

  function handleContinue() {
    if (pageIndex < DIMENSIONS.length - 1) {
      setPageIndex(i => i + 1)
    } else {
      onComplete(localRatings)
    }
  }

  function handleBack() {
    if (pageIndex > 0) {
      setPageIndex(i => i - 1)
    } else if (onBack) {
      onBack()
    }
  }

  const optionCount = dim.max - dim.min + 1

  return (
    <div className="sprint-wrap">
      <div className="sprint-inner">
        <div>
          <p className="progress-label" style={{ textAlign: 'left', marginBottom: 'var(--space-2)' }}>Step {pageIndex + 1} of {DIMENSIONS.length}</p>
          <div className="sprint-question-header">{dim.question}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: 1 }}>
          {situationOrder.map((sit, i) => {
            const curVal = localRatings[sit.id]?.[dim.key]
            return (
              <div key={sit.id} className="sprint-row">
                <span
                  className="sprint-scene"
                  title={sit.scene}
                >
                  {i + 1}. {sit.scene}
                </span>
                <div className="sprint-options">
                  {Array.from({ length: optionCount }, (_, j) => {
                    const val = dim.min + j
                    const label = dim.labels[j] || String(val)
                    return (
                      <button
                        key={val}
                        type="button"
                        className={`sprint-opt-btn${curVal === val ? ' selected' : ''}`}
                        onClick={() => setRating(sit.id, val)}
                        title={label}
                        aria-label={`${label} for situation ${i + 1}`}
                        aria-pressed={curVal === val}
                      >
                        {val}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div className="form-block__nav" style={{ marginTop: 0 }}>
          <button className="btn btn-ghost" type="button" onClick={handleBack}>
            Back
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleContinue}
            disabled={!allRated}
            style={{ marginLeft: 'auto' }}
          >
            {pageIndex < DIMENSIONS.length - 1 ? 'Continue' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { DIMENSIONS } from '../../data/questions.js'

const FAILURE_LABELS = {
  producing:     'Producing Speech',
  understanding: 'Understanding Speech',
  reading:       'Reading & Forms',
  formality:     'Judging Formality',
}

export default function SceneMode({ situationOrder, ratings, onComplete, onBack, onThemeChange }) {
  const [localRatings, setLocalRatings] = useState(() => {
    const copy = {}
    for (const s of situationOrder) {
      copy[s.id] = ratings[s.id] ? { ...ratings[s.id] } : {}
    }
    return copy
  })
  const [currentIndex, setCurrentIndex] = useState(0)

  const situation = situationOrder[currentIndex]
  const sitRatings = localRatings[situation.id] || {}

  const allRated = DIMENSIONS.every(d => sitRatings[d.key] !== undefined)

  useEffect(() => {
    onThemeChange?.(situation.failureMode)
  }, [currentIndex]) // eslint-disable-line

  function setRating(sitId, dimKey, value) {
    setLocalRatings(prev => ({
      ...prev,
      [sitId]: { ...prev[sitId], [dimKey]: value },
    }))
  }

  function handleContinue() {
    if (currentIndex < situationOrder.length - 1) {
      setCurrentIndex(i => i + 1)
    } else {
      onComplete(localRatings)
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1)
    } else if (onBack) {
      onBack()
    }
  }

  return (
    <div className="scene-wrap">
      <div className="scene-inner">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <span className="mode-badge">{FAILURE_LABELS[situation.failureMode]}</span>
          <span className="progress-label">Situation {currentIndex + 1} of {situationOrder.length}</span>
        </div>

        <div className="scene-card">
          <p className="scene-text">{situation.scene}</p>
        </div>

        <div className="scene-dims">
          {DIMENSIONS.map(dim => {
            const count = dim.max - dim.min + 1
            const selected = sitRatings[dim.key]
            return (
              <div key={dim.key} className="question-group">
                <div className="question-label">{dim.question}</div>
                <div className="likert-row" role="radiogroup" aria-label={dim.question}>
                  {Array.from({ length: count }, (_, i) => {
                    const val = dim.min + i
                    const label = dim.labels[i] || String(val)
                    return (
                      <button
                        key={val}
                        type="button"
                        className={`likert-btn${selected === val ? ' selected' : ''}`}
                        onClick={() => setRating(situation.id, dim.key, val)}
                        aria-pressed={selected === val}
                      >
                        <span className="likert-btn__value">{val}</span>
                        <span>{label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div className="scene-nav">
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
            {currentIndex < situationOrder.length - 1 ? 'Continue' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  )
}

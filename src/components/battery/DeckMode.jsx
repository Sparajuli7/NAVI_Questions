import { useState, useEffect, useCallback } from 'react'
import { DIMENSIONS } from '../../data/questions.js'

const FAILURE_LABELS = {
  producing:     'Producing Speech',
  understanding: 'Understanding Speech',
  reading:       'Reading & Forms',
  formality:     'Judging Formality',
}

export default function DeckMode({ situationOrder, ratings, onComplete, onBack, onThemeChange }) {
  // Build flat card list: [{ situation, dimension }]
  const cards = []
  for (const situation of situationOrder) {
    for (const dimension of DIMENSIONS) {
      cards.push({ situation, dimension })
    }
  }
  const totalCards = cards.length

  const [localRatings, setLocalRatings] = useState(() => {
    const copy = {}
    for (const s of situationOrder) {
      copy[s.id] = ratings[s.id] ? { ...ratings[s.id] } : {}
    }
    return copy
  })
  const [cardIndex, setCardIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [advancing, setAdvancing] = useState(false)

  const card = cards[cardIndex]
  const dim = card.dimension
  const sit = card.situation
  const optionCount = dim.max - dim.min + 1

  // Restore selected from localRatings when card changes + fire theme
  useEffect(() => {
    if (cardIndex < totalCards) {
      onThemeChange?.(cards[cardIndex].situation.failureMode)
    }
    const existing = localRatings[sit.id]?.[dim.key]
    setSelected(existing !== undefined ? existing : null)
  }, [cardIndex]) // eslint-disable-line

  const selectAnswer = useCallback((val) => {
    if (advancing) return
    setSelected(val)
    setLocalRatings(prev => ({
      ...prev,
      [sit.id]: { ...prev[sit.id], [dim.key]: val },
    }))
    setAdvancing(true)
    setTimeout(() => {
      setAdvancing(false)
      if (cardIndex < totalCards - 1) {
        setCardIndex(i => i + 1)
      } else {
        // Will trigger completion after ratings updated
        setCardIndex(i => i + 1) // go past end to signal done
      }
    }, 300)
  }, [advancing, cardIndex, totalCards, sit.id, dim.key])

  // When cardIndex goes past totalCards, complete
  useEffect(() => {
    if (cardIndex >= totalCards) {
      onComplete(localRatings)
    }
  }, [cardIndex, totalCards]) // eslint-disable-line

  // Keyboard handler
  useEffect(() => {
    function onKeyDown(e) {
      const n = parseInt(e.key, 10)
      if (isNaN(n) || n < 1) return
      const idx = n - 1
      if (idx >= optionCount) return
      const val = dim.min + idx
      selectAnswer(val)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectAnswer, optionCount, dim])

  if (cardIndex >= totalCards) {
    return (
      <div className="deck-wrap">
        <p className="progress-label">All done! Saving...</p>
      </div>
    )
  }

  const sitIndex = situationOrder.findIndex(s => s.id === sit.id)

  return (
    <div className="deck-wrap">
      <p className="progress-label">Card {cardIndex + 1} of {totalCards}</p>

      <div className="deck-card">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
            <span className="mode-badge">{FAILURE_LABELS[sit.failureMode]}</span>
            <span className="deck-scene">Situation {sitIndex + 1} of {situationOrder.length}</span>
          </div>
          <p className="deck-situation-text">{sit.scene}</p>
        </div>

        <div className="deck-question">{dim.question}</div>

        <div className="deck-answers">
          {Array.from({ length: optionCount }, (_, i) => {
            const val = dim.min + i
            const label = dim.labels[i] || String(val)
            const keyNum = i + 1
            return (
              <button
                key={val}
                type="button"
                className={`deck-answer-btn${selected === val ? ' selected' : ''}`}
                onClick={() => selectAnswer(val)}
              >
                <span className="deck-key">{keyNum}</span>
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        <button
          className="btn btn-ghost"
          type="button"
          onClick={() => {
            if (cardIndex > 0) setCardIndex(i => i - 1)
            else if (onBack) onBack()
          }}
        >
          Back
        </button>
      </div>
    </div>
  )
}

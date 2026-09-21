import { useEffect, useState } from 'react'
import { SITUATIONS, NAVI_UNDERSTAND, NAVI_NATURAL, NAVI_USE } from '../data/questions'
import { loadConversation } from '../lib/conversations'
import { ChoiceGroup } from './Controls'

const LETTERS = ['A', 'B', 'C']

function Conversation({ convo }) {
  return (
    <div className="convo" dir="auto">
      {convo.turns.map((t, i) => (
        <div key={i} className={'turn ' + (t.speaker === 'navi' ? 'turn-navi' : 'turn-you')}>
          <span className="who">{t.speaker === 'navi' ? 'NAVI' : 'You'}</span>
          <span className="said" dir="auto">
            {t.text}
          </span>
        </div>
      ))}
    </div>
  )
}

/**
 * Three versions of the same conversation, shown in a random order as A, B, C.
 * Every answer is stored against the mixing level, never the letter.
 */
export default function NaviPage({ step, number, total, language, answers, setAnswer }) {
  const { situation, order } = step
  const [convos, setConvos] = useState(null)
  const [failed, setFailed] = useState(false)
  const sit = SITUATIONS.find((s) => s.id === situation)

  useEffect(() => {
    let alive = true
    Promise.all(order.map((lvl) => loadConversation(situation, lvl, language)))
      .then((c) => alive && setConvos(c))
      .catch(() => alive && setFailed(true))
    return () => {
      alive = false
    }
  }, [situation, order, language])

  const prefField = `navi_${situation}_pref`

  return (
    <>
      <p className="eyebrow">
        Example conversations · {number} of {total}
      </p>
      <h2 className="sit-name">{sit?.name}</h2>
      <p className="lede">
        Here is the same short conversation three ways. In each one, NAVI, an AI practice
        partner, mixes a different amount of your language into its English. Read all three,
        then answer.
      </p>

      {failed && (
        <p className="notice">These examples could not be loaded. Please continue to the next page.</p>
      )}

      {!convos && !failed && <p className="muted">Loading…</p>}

      {convos &&
        convos.map((convo, i) => {
          const level = order[i]
          const u = `navi_${situation}_${level}_understand`
          const n = `navi_${situation}_${level}_natural`
          return (
            <section className="version" key={level}>
              <h3 className="version-label">Version {LETTERS[i]}</h3>
              {convo.sample && (
                <p className="sample-flag">Sample text, replace with NAVI output before use</p>
              )}
              <Conversation convo={convo} />
              <div className="question">
                <p className="q-label">How well did you understand Version {LETTERS[i]}?</p>
                <ChoiceGroup
                  name={`Understanding version ${LETTERS[i]}`}
                  options={NAVI_UNDERSTAND}
                  value={answers[u]}
                  onChange={(v) => setAnswer(u, v)}
                />
              </div>
              <div className="question">
                <p className="q-label">How natural does NAVI sound in Version {LETTERS[i]}?</p>
                <ChoiceGroup
                  name={`Naturalness version ${LETTERS[i]}`}
                  options={NAVI_NATURAL}
                  value={answers[n]}
                  onChange={(v) => setAnswer(n, v)}
                />
              </div>
            </section>
          )
        })}

      {convos && (
        <>
          <div className="question">
            <p className="q-label">Which version would help you most in this situation?</p>
            <ChoiceGroup
              name="Preferred version"
              options={LETTERS.map((l) => 'Version ' + l)}
              value={answers[prefField] ? order.indexOf(answers[prefField]) : undefined}
              onChange={(i) => setAnswer(prefField, i === undefined ? undefined : order[i])}
            />
          </div>
          <div className="question">
            <p className="q-label">
              If NAVI talked to you like the version you chose, would you use it to practice before
              this situation?
            </p>
            <ChoiceGroup
              name="Would use"
              options={NAVI_USE}
              value={answers[`navi_${situation}_use`]}
              onChange={(v) => setAnswer(`navi_${situation}_use`, v)}
            />
          </div>
        </>
      )}
    </>
  )
}

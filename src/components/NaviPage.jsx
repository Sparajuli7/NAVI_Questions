import { useEffect, useState } from 'react'
import { SITUATIONS, NAVI_UNDERSTAND, NAVI_NATURAL, NAVI_USE } from '../data/questions'
import { loadConversation } from '../lib/conversations'
import { ChoiceGroup } from './Controls'
import Conversation from './Conversation'

const LETTERS = ['A', 'B', 'C']

function ScreenshotOrChat({ situation, level, lang, convo }) {
  const imgSrc = level === 'none'
    ? `/screenshots/_shared/${situation}_none.png`
    : `/screenshots/${lang}/${situation}_${level}.png`
  const [useImg, setUseImg] = useState(true)
  return useImg ? (
    <img
      className="convo-screenshot"
      src={imgSrc}
      alt=""
      onError={() => setUseImg(false)}
    />
  ) : (
    <Conversation convo={convo} />
  )
}

/**
 * Three versions of the same practice exchange, shown as A/B/C.
 * Answers are stored by mixing level, never by letter.
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
        Practice preview · {number} of {total}
      </p>
      <h2 className="sit-name">{sit?.name}</h2>
      <p className="lede">
        Here is what practicing this situation could look like in the app. Each version shows
        your line (input) and NAVI&apos;s reply (output). The three versions mix different amounts
        of your language into English. Read all three, then rank which helps you most.
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
              <ScreenshotOrChat situation={situation} level={level} lang={language} convo={convo} />
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

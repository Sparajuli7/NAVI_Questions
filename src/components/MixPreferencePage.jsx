import { useEffect, useState } from 'react'
import { loadConversation } from '../lib/conversations'
import Conversation from './Conversation'
import Question from './Question'
import { PAGES } from '../data/questions'

function ScreenshotOrChat({ level, lang, convo }) {
  const imgSrc = level === 'none'
    ? `/screenshots/_shared/clinic_none.png`
    : `/screenshots/${lang}/clinic_${level}.png`
  const [useImg, setUseImg] = useState(true)
  return useImg ? (
    <img className="convo-screenshot" src={imgSrc} alt="" onError={() => setUseImg(false)} />
  ) : (
    <Conversation convo={convo} compact />
  )
}

const PREVIEWS = [
  { level: 'none', label: 'Almost none', hint: 'English only' },
  { level: 'light', label: 'A little', hint: 'Light mix of your language' },
  { level: 'heavy', label: 'Mostly my language', hint: 'Heavy mix of your language' },
]

/**
 * Visual guide: same clinic exchange at three mix levels, then preference question.
 * “About half” / “Not sure” / “Other” have no separate preview — that is intentional.
 */
export default function MixPreferencePage({ language, answers, setAnswer }) {
  const [previews, setPreviews] = useState(null)
  const [failed, setFailed] = useState(false)
  const questions = PAGES.mix.questions.filter((q) => !q.showIf || q.showIf(answers))

  useEffect(() => {
    if (!language || language === 'other') {
      setFailed(true)
      return
    }
    let alive = true
    Promise.all(PREVIEWS.map((p) => loadConversation('clinic', p.level, language)))
      .then((c) => alive && setPreviews(c))
      .catch(() => alive && setFailed(true))
    return () => {
      alive = false
    }
  }, [language])

  return (
    <>
      <h2 className="page-title">{PAGES.mix.title}</h2>
      <p className="lede">{PAGES.mix.intro}</p>

      {failed && (
        <p className="notice">
          Previews could not be loaded for this language. You can still answer the question below.
        </p>
      )}

      {!previews && !failed && <p className="muted">Loading previews…</p>}

      {previews && (
        <div className="mix-grid">
          {PREVIEWS.map((p, i) => (
            <div className="mix-card" key={p.level}>
              <p className="mix-card-label">
                {p.label}
                <span className="mix-card-hint">{p.hint}</span>
              </p>
              <ScreenshotOrChat level={p.level} lang={language} convo={previews[i]} />
            </div>
          ))}
        </div>
      )}

      <p className="muted mix-note">
        “About half” sits between “A little” and “Mostly my language.” Pick the closest match, or
        choose Other and tell us in your own words.
      </p>

      {questions.map((q) => (
        <Question key={q.id} q={q} value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} />
      ))}
    </>
  )
}

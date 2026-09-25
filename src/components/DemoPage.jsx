import { useEffect, useState } from 'react'
import { LANGUAGES, NAVI_SITUATIONS, SITUATIONS } from '../data/questions'
import { loadConversation } from '../lib/conversations'
import Conversation from './Conversation'

const LEVELS = [
  { key: 'none', label: 'None (English only)' },
  { key: 'light', label: 'Light mix' },
  { key: 'heavy', label: 'Heavy mix' },
]

function ScreenshotOrChat({ situation, level, lang, convo }) {
  // Try screenshot first; fall back to Conversation widget if image 404s
  const isNone = level === 'none'
  const imgSrc = isNone
    ? `/screenshots/_shared/${situation}_none.png`
    : `/screenshots/${lang}/${situation}_${level}.png`
  const [useImg, setUseImg] = useState(true)

  return useImg ? (
    <img
      className="convo-screenshot"
      src={imgSrc}
      alt={`${situation} ${level} conversation screenshot`}
      onError={() => setUseImg(false)}
    />
  ) : (
    <Conversation convo={convo} />
  )
}

export default function DemoPage({ manifest }) {
  // Default to first language with conversations
  const l1Langs = LANGUAGES.filter(
    (l) => l.code !== 'other' && manifest?.includes(`clinic_light_${l.code}`)
  )
  const [lang, setLang] = useState(l1Langs[0]?.code || 'ne')
  const [situation, setSituation] = useState('clinic')
  const [convos, setConvos] = useState(null)
  const [loading, setLoading] = useState(false)

  const sit = SITUATIONS.find((s) => s.id === situation)

  useEffect(() => {
    if (!manifest) return
    setLoading(true)
    setConvos(null)
    const noneKey = `${situation}_none_en`
    const lightKey = `${situation}_light_${lang}`
    const heavyKey = `${situation}_heavy_${lang}`
    const hasAll = [noneKey, lightKey, heavyKey].every((k) => manifest.includes(k))
    if (!hasAll) {
      setLoading(false)
      return
    }
    Promise.all([
      loadConversation(situation, 'none', 'en'),
      loadConversation(situation, 'light', lang),
      loadConversation(situation, 'heavy', lang),
    ]).then((c) => {
      setConvos(c)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [lang, situation, manifest])

  return (
    <div className="demo-page">
      <div className="demo-controls">
        <h2 className="demo-title">NAVI · Demo preview</h2>
        <div className="demo-selectors">
          <label className="demo-select-label">
            Language
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="demo-select">
              {l1Langs.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </label>
          <label className="demo-select-label">
            Situation
            <select value={situation} onChange={(e) => setSituation(e.target.value)} className="demo-select">
              {NAVI_SITUATIONS.map((id) => {
                const s = SITUATIONS.find((x) => x.id === id)
                return <option key={id} value={id}>{s?.name || id}</option>
              })}
            </select>
          </label>
        </div>
        {sit && <p className="demo-scene"><em>Scene: {sit.scene}</em></p>}
      </div>

      {loading && <p className="muted">Loading…</p>}

      {!loading && convos && (
        <div className="demo-levels">
          {LEVELS.map((lv, i) => (
            <div key={lv.key} className="demo-level-card">
              <p className="demo-level-label">{lv.label}</p>
              <ScreenshotOrChat
                situation={situation}
                level={lv.key}
                lang={lang}
                convo={convos[i]}
              />
            </div>
          ))}
        </div>
      )}

      {!loading && !convos && (
        <p className="notice">No conversation files found for this language + situation.</p>
      )}
    </div>
  )
}

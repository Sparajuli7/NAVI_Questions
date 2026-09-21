import { SITUATIONS } from '../data/questions'
import { RECORDING } from '../lib/recording'

/** The consent form promises a short summary of the participant's own answers. */
function topSituations(answers) {
  return SITUATIONS.map((s) => {
    const f = answers[`${s.id}_freq`]
    const d = answers[`${s.id}_diff`]
    const st = answers[`${s.id}_stress`]
    if (f === undefined && d === undefined && st === undefined) return null
    return { s, score: (f ?? 0) + (d ?? 0) * 1.5 + (st ?? 0) * 1.5 }
  })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

export default function EndPage({ reason, answers, response, onDownload }) {
  if (reason === 'declined') {
    return (
      <>
        <h1>No problem at all.</h1>
        <p className="lede">Nothing has been recorded. Thank you for taking a look, and enjoy your semester.</p>
      </>
    )
  }

  if (reason === 'ineligible') {
    return (
      <>
        <h1>Thank you for your interest.</h1>
        <p className="lede">
          This study is only for students at St. Cloud State who arrived in the United States within
          the last two years. Nothing has been recorded.
        </p>
      </>
    )
  }

  const top = topSituations(answers)

  return (
    <>
      <h1>Thank you.</h1>
      <p className="lede">That is everything. Your answers help us understand what newly arrived students actually find hard.</p>

      {top.length > 0 && (
        <div className="summary">
          <h2>Your summary</h2>
          <p className="muted">Based on how often, how hard and how stressful you said each one was, these came out on top for you:</p>
          <ol>
            {top.map(({ s }) => (
              <li key={s.id}>{s.name}</li>
            ))}
          </ol>
        </div>
      )}

      {!RECORDING && (
        <div className="dev-note">
          <p>
            <strong>Test mode.</strong> Recording is off, so nothing was saved anywhere. This is
            what would have been submitted:
          </p>
          <button className="ghost" onClick={onDownload}>
            Download this response as JSON
          </button>
          <pre className="json">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </>
  )
}

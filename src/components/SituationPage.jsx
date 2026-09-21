import { SITUATIONS, DIMENSIONS } from '../data/questions'
import { ChoiceGroup } from './Controls'

/** One situation, one page, all four questions underneath. */
export default function SituationPage({ id, number, total, answers, setAnswer }) {
  const s = SITUATIONS.find((x) => x.id === id)
  if (!s) return null

  return (
    <>
      <p className="eyebrow">
        Situation {number} of {total}
      </p>
      <h2 className="sit-name">{s.name}</h2>
      <p className="scene">{s.scene}</p>

      {DIMENSIONS.map((d) => {
        const field = `${id}_${d.key}`
        return (
          <div className="question" key={d.key}>
            <p className="q-label">{d.label}</p>
            <ChoiceGroup
              name={d.label}
              options={d.options}
              value={answers[field]}
              onChange={(v) => setAnswer(field, v)}
            />
          </div>
        )
      })}
    </>
  )
}

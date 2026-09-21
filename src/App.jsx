import { useEffect, useMemo, useRef, useState } from 'react'
import { PAGES, SITUATIONS } from './data/questions'
import { buildSteps, gateFor, newSituationOrder, planNavi } from './lib/flow'
import { loadManifest } from './lib/conversations'
import { participantIdentity, splitPayload, submit, RECORDING } from './lib/recording'
import { Progress } from './components/Controls'
import Question from './components/Question'
import ConsentText from './components/ConsentText'
import SituationPage from './components/SituationPage'
import NaviPage from './components/NaviPage'
import EndPage from './components/EndPage'

function visibleQuestions(pageKey, answers) {
  return PAGES[pageKey].questions.filter((q) => !q.showIf || q.showIf(answers))
}

/** Drop answers to questions that ended up hidden, e.g. an email after "No". */
function pruneHidden(answers) {
  const out = { ...answers }
  for (const page of Object.values(PAGES)) {
    for (const q of page.questions) {
      if (q.showIf && !q.showIf(answers)) delete out[q.id]
    }
  }
  return out
}

export default function App() {
  const [situationOrder] = useState(newSituationOrder)
  const [identity] = useState(participantIdentity)
  const [startedAt] = useState(() => new Date())
  const [manifest, setManifest] = useState(null)
  const [naviPlan, setNaviPlan] = useState([])
  const [naviLang, setNaviLang] = useState(null)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [ended, setEnded] = useState(null)
  const [response, setResponse] = useState(null)
  const [missing, setMissing] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const topRef = useRef(null)

  useEffect(() => {
    loadManifest().then(setManifest)
  }, [])

  const steps = useMemo(() => buildSteps(situationOrder, naviPlan), [situationOrder, naviPlan])
  const step = steps[index]

  const situationCount = situationOrder.length
  const naviCount = naviPlan.length

  const setAnswer = (id, v) => {
    setMissing(false)
    setAnswers((a) => {
      const next = { ...a }
      if (v === undefined || v === '') delete next[id]
      else next[id] = v
      return next
    })
  }

  const scrollTop = () => {
    topRef.current?.scrollIntoView({ block: 'start' })
    window.scrollTo(0, 0)
  }

  // Block 14 is planned once the first language is known.
  const settleNavi = async (lang) => {
    if (lang === naviLang) return
    const m = manifest ?? (await loadManifest())
    const plan = planNavi(lang, m)
    setNaviLang(lang)
    setNaviPlan(plan)
    setAnswers((a) => {
      const next = {}
      for (const [k, v] of Object.entries(a)) if (!k.startsWith('navi_')) next[k] = v
      if (plan.length) {
        next.navi_shown = plan.map((p) => p.situation).join(',')
        plan.forEach((p) => (next[`navi_${p.situation}_order`] = p.order.join(',')))
      }
      return next
    })
  }

  const finish = async () => {
    setSubmitting(true)
    const completedAt = new Date()
    const meta = {
      participant_id: identity.participantId,
      play_number: identity.playNumber,
      situation_order: situationOrder.join(','),
      started_at: startedAt.toISOString(),
      completed_at: completedAt.toISOString(),
      duration_sec: Math.round((completedAt - startedAt) / 1000),
    }
    const { response: r, contact } = splitPayload(pruneHidden(answers), meta)
    setResponse(r)
    await submit(r, contact)
    setSubmitting(false)
    setEnded('done')
    scrollTop()
  }

  const next = async () => {
    if (step.kind === 'page') {
      const qs = visibleQuestions(step.key, answers)
      const unanswered = qs.filter((q) => q.required && answers[q.id] === undefined)
      if (unanswered.length) {
        setMissing(true)
        return
      }
      const gate = gateFor(step.key, answers)
      if (gate) {
        setEnded(gate)
        scrollTop()
        return
      }
      if (step.key === 'background') await settleNavi(answers.first_language)
    }
    if (index === steps.length - 1) return finish()
    setIndex(index + 1)
    scrollTop()
  }

  const back = () => {
    setMissing(false)
    if (index > 0) {
      setIndex(index - 1)
      scrollTop()
    }
  }

  const download = () => {
    const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `navi-response-${identity.participantId.slice(0, 8)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  let body = null
  if (ended) {
    body = <EndPage reason={ended} answers={answers} response={response} onDownload={download} />
  } else if (step.kind === 'page') {
    const page = PAGES[step.key]
    body = (
      <>
        {step.key === 'consent' ? <ConsentText /> : <h2 className="page-title">{page.title}</h2>}
        {page.intro && <p className="lede">{page.intro}</p>}
        {visibleQuestions(step.key, answers).map((q) => (
          <Question key={q.id} q={q} value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} />
        ))}
      </>
    )
  } else if (step.kind === 'situation') {
    body = (
      <SituationPage
        id={step.id}
        number={situationOrder.indexOf(step.id) + 1}
        total={situationCount}
        answers={answers}
        setAnswer={setAnswer}
      />
    )
  } else if (step.kind === 'navi') {
    body = (
      <NaviPage
        step={step}
        number={naviPlan.findIndex((p) => p.situation === step.situation) + 1}
        total={naviCount}
        language={naviLang}
        answers={answers}
        setAnswer={setAnswer}
      />
    )
  }

  return (
    <>
      {!RECORDING && (
        <div className="test-banner">Test mode · answers are not saved · pending SCSU IRB approval</div>
      )}
      <main className="shell" ref={topRef}>
        {!ended && index > 0 && <Progress done={index} total={steps.length} />}
        <section className="card">
          {body}
          {!ended && (
            <>
              {missing && (
                <p className="notice" role="alert">
                  Please answer the questions marked with * to continue.
                </p>
              )}
              <div className="actions">
                {index > 0 && (
                  <button className="ghost" onClick={back} disabled={submitting}>
                    Back
                  </button>
                )}
                <button className="primary" onClick={next} disabled={submitting}>
                  {index === steps.length - 1 ? (submitting ? 'Sending…' : 'Finish') : index === 0 ? 'Continue' : 'Next'}
                </button>
              </div>
            </>
          )}
        </section>
        <p className="foot">
          St. Cloud State University · Department of Computing, Informatics and Data Science
          <br />
          {SITUATIONS.length} everyday situations · about 10 to 13 minutes
        </p>
      </main>
    </>
  )
}

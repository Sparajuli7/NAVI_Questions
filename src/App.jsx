import { useEffect, useMemo, useRef, useState } from 'react'
import { PAGES, SITUATIONS, DIMENSIONS } from './data/questions'
import { buildSteps, gateFor, newSituationOrder, planNavi } from './lib/flow'
import { loadManifest } from './lib/conversations'
import { participantIdentity, splitPayload, submit, RECORDING } from './lib/recording'
import { Progress } from './components/Controls'
import Question from './components/Question'
import ConsentText from './components/ConsentText'
import SituationPage from './components/SituationPage'
import NaviPage from './components/NaviPage'
import MixPreferencePage from './components/MixPreferencePage'
import EndPage from './components/EndPage'
import DemoPage from './components/DemoPage'

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
  const demo = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('demo') === '1'
  const [situationOrder] = useState(newSituationOrder)
  const [identity] = useState(participantIdentity)
  const [startedAt] = useState(() => new Date())
  const [manifest, setManifest] = useState(null)
  const [naviPlan, setNaviPlan] = useState([])
  const [naviLang, setNaviLang] = useState(null)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState(() =>
    demo
      ? {
          consent: 1,
          enrolled_scsu: 1,
          age_18_plus: 1,
          arrival_month: 8,
          arrival_year: 2025,
          participant_group: 0,
          first_language: 'ne',
          english_speaking: 3,
          english_listening: 3,
          english_reading: 3,
        }
      : {},
  )
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
      for (const [k, v] of Object.entries(a)) {
        if (!k.startsWith('navi_') && !k.startsWith('mix_')) next[k] = v
      }
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
    setMissing(false)
    if (step.kind === 'page') {
      const qs = visibleQuestions(step.key, answers)
      // Optional pages (open, contact): only enforce fields marked required.
      // All other pages: every visible question must be answered to continue.
      const need =
        step.key === 'open' || step.key === 'contact'
          ? qs.filter((q) => q.required)
          : qs
      const unanswered = need.filter((q) => answers[q.id] === undefined || answers[q.id] === '')
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
    } else if (step.kind === 'situation') {
      const missingDims = DIMENSIONS.some((d) => answers[`${step.id}_${d.key}`] === undefined)
      if (missingDims) {
        setMissing(true)
        return
      }
    } else if (step.kind === 'navi') {
      const { situation, order } = step
      const need = []
      for (const level of order) {
        need.push(`navi_${situation}_${level}_understand`, `navi_${situation}_${level}_natural`)
      }
      need.push(`navi_${situation}_pref`, `navi_${situation}_use`)
      if (need.some((id) => answers[id] === undefined)) {
        setMissing(true)
        return
      }
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

  if (demo) {
    return (
      <>
        <div className="test-banner">Demo mode · no data saved · pending SCSU IRB approval</div>
        <main className="shell">
          <section className="card">
            {manifest ? <DemoPage manifest={manifest} /> : <p className="muted">Loading…</p>}
          </section>
          <p className="foot">
            St. Cloud State University · Department of Computing, Informatics and Data Science
          </p>
        </main>
      </>
    )
  }

  let body = null
  if (ended) {
    body = <EndPage reason={ended} answers={answers} response={response} onDownload={download} />
  } else if (step.kind === 'page' && step.key === 'mix') {
    body = <MixPreferencePage language={naviLang} answers={answers} setAnswer={setAnswer} />
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
                  Please answer every question on this page to continue.
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

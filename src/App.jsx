import { useState, useEffect } from 'react'
import { BLOCKS, SITUATIONS } from './data/questions.js'
import ModeSelect from './components/ModeSelect.jsx'
import FormBlock from './components/FormBlock.jsx'
import BatteryBlock from './components/battery/BatteryBlock.jsx'
import Results from './components/Results.jsx'
import ExitScreen from './components/ExitScreen.jsx'
import ProgressRail from './components/ProgressRail.jsx'
import { startSession, saveAnswer, completeSession, saveContact } from './lib/recording.js'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function App() {
  const [phase, setPhase] = useState('start')
  const [mode, setMode] = useState('deck')
  const [flavour, setFlavour] = useState('en')
  const [blockIndex, setBlockIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [ratings, setRatings] = useState({})
  const [situationOrder, setSituationOrder] = useState([])
  const [currentTheme, setCurrentTheme] = useState('')

  // Sync theme to <html> so body background and root-level vars react
  useEffect(() => {
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme)
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [currentTheme])

  // Clear theme when leaving battery
  useEffect(() => {
    if (phase !== 'survey') setCurrentTheme('')
  }, [phase])

  function handleStart({ mode: m, flavour: f }) {
    const order = shuffle(SITUATIONS)
    setMode(m); setFlavour(f); setSituationOrder(order)
    setBlockIndex(0); setPhase('survey')
    startSession({ mode: m, flavour: f, situationOrder: order.map(s => s.id) })
  }

  function handleBlockComplete(blockAnswers, shouldExit) {
    if (shouldExit) { setPhase('exited'); return }
    const newAnswers = { ...answers, ...blockAnswers }
    setAnswers(newAnswers)
    const block = BLOCKS[blockIndex]
    if (block.id === 'contact') {
      const email = blockAnswers['contact_email']
      const iOk = blockAnswers['interview_ok'] === 'yes'
      const rOk = blockAnswers['raffle_ok'] === 'yes'
      if (email && (iOk || rOk)) saveContact({ email, interviewOk: iOk, raffleOk: rOk })
      completeSession()
      setPhase('results')
      return
    }
    Object.entries(blockAnswers).forEach(([qid, val]) => saveAnswer(qid, val))
    const next = blockIndex + 1
    if (next >= BLOCKS.length) { completeSession(); setPhase('results') }
    else setBlockIndex(next)
  }

  function handleBatteryComplete(newRatings) {
    setCurrentTheme('')
    setRatings(newRatings)
    Object.entries(newRatings).forEach(([sid, dims]) =>
      Object.entries(dims).forEach(([dk, v]) => saveAnswer(`${sid}.${dk}`, v))
    )
    const next = blockIndex + 1
    if (next >= BLOCKS.length) { completeSession(); setPhase('results') }
    else setBlockIndex(next)
  }

  if (phase === 'start') return <ModeSelect onStart={handleStart} />
  if (phase === 'exited') return <ExitScreen />
  if (phase === 'results') return <Results ratings={ratings} answers={answers} mode={mode} flavour={flavour} situationOrder={situationOrder} />

  const block = BLOCKS[blockIndex]
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <ProgressRail value={blockIndex} max={BLOCKS.length} />
      {block.id === 'situations'
        ? <BatteryBlock
            mode={mode}
            situationOrder={situationOrder}
            ratings={ratings}
            onComplete={handleBatteryComplete}
            onBack={blockIndex > 0 ? () => setBlockIndex(b => b - 1) : null}
            onThemeChange={setCurrentTheme}
          />
        : <FormBlock
            block={block}
            answers={answers}
            onComplete={handleBlockComplete}
            onBack={blockIndex > 0 ? () => setBlockIndex(b => b - 1) : null}
          />
      }
    </div>
  )
}

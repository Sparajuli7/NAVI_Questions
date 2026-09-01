import { generateUUID } from './uuid.js'

const ENABLED = import.meta.env.VITE_RECORDING_ENABLED === 'true'

function getParticipantId() {
  let id = localStorage.getItem('navi_participant_id')
  if (!id) { id = generateUUID(); localStorage.setItem('navi_participant_id', id) }
  return id
}

let _sessionId = null

async function _post(url, body) {
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
  } catch {
    try {
      await new Promise(r => setTimeout(r, 1200))
      await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    } catch { /* silently fail — losing a response is better than breaking the survey */ }
  }
}

export function startSession({ mode, flavour, situationOrder }) {
  if (!ENABLED) return
  _sessionId = generateUUID()
  _post('/api/session', { session_id: _sessionId, participant_id: getParticipantId(), mode, flavour, situation_order: situationOrder, user_agent: navigator.userAgent })
}

export function saveAnswer(questionId, value) {
  if (!ENABLED || !_sessionId) return
  _post('/api/answers', { session_id: _sessionId, question_id: questionId, value })
}

export function completeSession() {
  if (!ENABLED || !_sessionId) return
  _post('/api/complete', { session_id: _sessionId })
}

export function saveContact({ email, interviewOk, raffleOk }) {
  if (!ENABLED || !_sessionId) return
  _post('/api/contact', { session_id: _sessionId, email, interview_ok: interviewOk, raffle_ok: raffleOk })
}

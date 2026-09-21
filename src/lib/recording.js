import { CONTACT_FIELDS } from '../data/questions'

/**
 * Recording is OFF unless VITE_RECORDING=on.
 * Turn it on only after IRB approval and after the research office has
 * confirmed where data may be stored.
 *
 * While off, nothing leaves the browser.
 */
export const RECORDING = import.meta.env.VITE_RECORDING === 'on'

function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

/** Stable random id in this browser, so repeat plays are recognisable. */
export function participantIdentity() {
  try {
    let id = localStorage.getItem('navi_pid')
    let plays = Number(localStorage.getItem('navi_plays') || 0)
    if (!id) {
      id = uuid()
      localStorage.setItem('navi_pid', id)
    }
    return { participantId: id, playNumber: plays + 1 }
  } catch {
    return { participantId: uuid(), playNumber: 1 }
  }
}

function markPlayed() {
  try {
    const plays = Number(localStorage.getItem('navi_plays') || 0)
    localStorage.setItem('navi_plays', String(plays + 1))
  } catch {
    /* storage unavailable, fine */
  }
}

/** Split answers into the survey response and the separate contact record. */
export function splitPayload(answers, meta) {
  const response = { ...meta }
  const contact = { participant_id: meta.participant_id }
  for (const [k, v] of Object.entries(answers)) {
    if (CONTACT_FIELDS.includes(k)) contact[k] = v
    else response[k] = v
  }
  const hasContact = contact.contact_email && String(contact.contact_email).trim()
  return { response, contact: hasContact ? contact : null }
}

async function post(body) {
  const res = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('submit failed ' + res.status)
  return res.json()
}

/**
 * Never throws and never blocks the participant. A failed save is better
 * than a broken survey.
 */
export async function submit(response, contact) {
  markPlayed()
  if (!RECORDING) return { recorded: false }
  try {
    return await post({ response, contact })
  } catch {
    try {
      await new Promise((r) => setTimeout(r, 1500))
      return await post({ response, contact })
    } catch {
      return { recorded: false, error: true }
    }
  }
}

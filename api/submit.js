/**
 * Vercel serverless function. Only used when VITE_RECORDING=on.
 *
 * Writes one survey response into SCSU's Qualtrics as embedded data, and the
 * optional contact record into a SEPARATE Qualtrics survey, so emails never sit
 * next to answers (IRB protocol, section 7).
 *
 * Status: written against the Qualtrics v3 "create response" API but NOT yet
 * tested against the SCSU instance. Test it with a throwaway survey before the
 * study goes live, and only after the research office confirms this route is
 * allowed.
 *
 * No participant text is sent anywhere except Qualtrics. No AI calls.
 */
import { allFieldIds, CONTACT_FIELDS } from '../src/data/questions.js'

const RESPONSE_FIELDS = new Set(allFieldIds())
const CONTACT_ALLOWED = new Set(['participant_id', ...CONTACT_FIELDS])

function clean(obj, allowed) {
  const out = {}
  for (const [k, v] of Object.entries(obj || {})) {
    if (!allowed.has(k)) continue
    if (v === null || v === undefined) continue
    out[k] = Array.isArray(v) ? v.join(',') : String(v).slice(0, 5000)
  }
  return out
}

async function createResponse(surveyId, values) {
  const dc = process.env.QUALTRICS_DATACENTER
  const url = `https://${dc}.qualtrics.com/API/v3/surveys/${surveyId}/responses`
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-token': process.env.QUALTRICS_API_TOKEN,
    },
    body: JSON.stringify({ values }),
  })
  if (!r.ok) throw new Error(`Qualtrics ${r.status}`)
  return r.json()
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const { QUALTRICS_DATACENTER, QUALTRICS_API_TOKEN, QUALTRICS_SURVEY_ID, QUALTRICS_CONTACT_SURVEY_ID } =
    process.env
  if (!QUALTRICS_DATACENTER || !QUALTRICS_API_TOKEN || !QUALTRICS_SURVEY_ID) {
    return res.status(503).json({ error: 'Recording is not configured' })
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  const response = clean(body.response, RESPONSE_FIELDS)

  if (response.consent !== '1') return res.status(400).json({ error: 'No consent' })

  try {
    await createResponse(QUALTRICS_SURVEY_ID, response)
    if (body.contact && QUALTRICS_CONTACT_SURVEY_ID) {
      const contact = clean(body.contact, CONTACT_ALLOWED)
      if (contact.contact_email) await createResponse(QUALTRICS_CONTACT_SURVEY_ID, contact)
    }
    return res.status(200).json({ recorded: true })
  } catch (e) {
    console.error(e)
    return res.status(502).json({ error: 'Could not record' })
  }
}

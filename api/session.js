import { neon } from '@neondatabase/serverless'

const VALID_MODES = ['scene', 'deck', 'sprint']
const VALID_FLAVOURS = ['en', 'ne', 'es', 'hi', 'so', 'zh']

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { session_id, participant_id, mode, flavour, situation_order, user_agent } = req.body
  if (!session_id || !participant_id || !VALID_MODES.includes(mode) || !VALID_FLAVOURS.includes(flavour)) {
    return res.status(400).json({ error: 'Invalid session data' })
  }
  const sql = neon(process.env.DATABASE_URL)
  const [{ count }] = await sql`SELECT COUNT(*) as count FROM sessions WHERE participant_id = ${participant_id}`
  const play_number = Number(count) + 1
  await sql`INSERT INTO sessions (session_id, participant_id, play_number, mode, flavour, situation_order, user_agent)
    VALUES (${session_id}, ${participant_id}, ${play_number}, ${mode}, ${flavour}, ${JSON.stringify(situation_order)}, ${user_agent || null})`
  return res.status(201).json({ play_number })
}

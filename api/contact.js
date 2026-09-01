import { neon } from '@neondatabase/serverless'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { session_id, email, interview_ok, raffle_ok } = req.body
  if (!session_id || !email || typeof interview_ok !== 'boolean' || typeof raffle_ok !== 'boolean') {
    return res.status(400).json({ error: 'Invalid contact data' })
  }
  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }
  const sql = neon(process.env.DATABASE_URL)
  await sql`INSERT INTO contacts (session_id, email, interview_ok, raffle_ok)
    VALUES (${session_id}, ${email}, ${interview_ok}, ${raffle_ok})`
  return res.status(201).json({ ok: true })
}

import { neon } from '@neondatabase/serverless'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { session_id } = req.body
  if (!session_id) return res.status(400).json({ error: 'Missing session_id' })
  const sql = neon(process.env.DATABASE_URL)
  await sql`UPDATE sessions SET completed_at = NOW() WHERE session_id = ${session_id}`
  return res.status(200).json({ ok: true })
}

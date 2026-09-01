import { neon } from '@neondatabase/serverless'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { session_id, question_id, value } = req.body
  if (!session_id || !question_id || value === undefined) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  // question_id must look like a valid id (alphanumeric + . + _)
  if (!/^[\w.]+$/.test(question_id)) {
    return res.status(400).json({ error: 'Invalid question_id format' })
  }
  const sql = neon(process.env.DATABASE_URL)
  await sql`INSERT INTO answers (session_id, question_id, value)
    VALUES (${session_id}, ${question_id}, ${JSON.stringify(value)})
    ON CONFLICT (session_id, question_id) DO UPDATE SET value = EXCLUDED.value`
  return res.status(201).json({ ok: true })
}

import { neon } from '@neondatabase/serverless'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()
  const auth = req.headers.authorization || ''
  if (!process.env.EXPORT_TOKEN || auth !== `Bearer ${process.env.EXPORT_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const sql = neon(process.env.DATABASE_URL)
  const sessions = await sql`SELECT * FROM sessions ORDER BY started_at`
  const answers = await sql`SELECT * FROM answers ORDER BY session_id, question_id`

  // Build answer map: session_id -> { question_id: value }
  const answerMap = {}
  for (const a of answers) {
    if (!answerMap[a.session_id]) answerMap[a.session_id] = {}
    answerMap[a.session_id][a.question_id] = a.value
  }

  // Get all question_ids in sorted order (deterministic)
  const allQids = [...new Set(answers.map(a => a.question_id))].sort()

  const headers = ['session_id', 'participant_id', 'play_number', 'mode', 'flavour', 'started_at', 'completed_at', 'duration_seconds', ...allQids]

  const rows = sessions.map(s => {
    const duration = s.completed_at ? Math.round((new Date(s.completed_at) - new Date(s.started_at)) / 1000) : ''
    const aMap = answerMap[s.session_id] || {}
    return [
      s.session_id, s.participant_id, s.play_number, s.mode, s.flavour,
      s.started_at, s.completed_at || '', duration,
      ...allQids.map(qid => {
        const v = aMap[qid]
        if (v === undefined) return ''
        if (typeof v === 'object') return JSON.stringify(v)
        return v
      })
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')
  })

  const csv = [headers.map(h => `"${h}"`).join(','), ...rows].join('\n')
  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', 'attachment; filename="navi-export.csv"')
  return res.status(200).send(csv)
}

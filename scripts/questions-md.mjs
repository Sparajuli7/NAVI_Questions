/**
 * Writes questions.md (full instrument) and questions-example.md (one worked
 * Block 14 example) so an advisor can review without running the survey.
 *
 * Usage: node scripts/questions-md.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  SITUATIONS,
  DIMENSIONS,
  LANGUAGES,
  PAGES,
  NAVI_SITUATIONS,
  NAVI_LEVELS,
  NAVI_UNDERSTAND,
  NAVI_NATURAL,
  NAVI_USE,
  CONTACT_FIELDS,
  allFieldIds,
} from '../src/data/questions.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CONVO_DIR = join(ROOT, 'public/conversations')

const LEVEL_LABEL = {
  none: 'English only (no mixing)',
  light: 'Light mixing of the first language',
  heavy: 'Heavy mixing of the first language',
}

function loadConvos() {
  const out = {}
  for (const name of readdirSync(CONVO_DIR).filter((f) => f.endsWith('.json') && f !== 'manifest.json')) {
    const c = JSON.parse(readFileSync(join(CONVO_DIR, name), 'utf8'))
    out[`${c.situation}_${c.level}_${c.language}`] = c
  }
  return out
}

function optLabel(o) {
  return typeof o === 'object' && o !== null ? o.label : String(o)
}

function optValue(o) {
  return typeof o === 'object' && o !== null && 'value' in o ? o.value : undefined
}

function formatQuestion(q, n) {
  const lines = []
  const req = q.required ? ' **(required)**' : ''
  lines.push(`### Q${n}. \`${q.id}\`${req}`)
  lines.push('')
  lines.push(q.label)
  if (q.help) lines.push('')
  if (q.help) lines.push(`*${q.help}*`)
  if (q.showIf) {
    lines.push('')
    lines.push('*Shown only when a prior answer matches the survey logic.*')
  }
  lines.push('')
  lines.push(`**Type:** ${q.type}`)
  if (q.type === 'scale5') {
    lines.push('')
    lines.push('1 · 2 · 3 · 4 · 5')
  } else if (q.options?.length) {
    lines.push('')
    for (const o of q.options) {
      const v = optValue(o)
      const label = optLabel(o)
      lines.push(v !== undefined ? `- [ ] ${label} *(stored value: \`${v}\`)*` : `- [ ] ${label}`)
    }
  } else if (q.type === 'text' || q.type === 'longtext') {
    lines.push('')
    lines.push('*(open text)*')
  }
  lines.push('')
  return lines.join('\n')
}

function formatConvo(convo) {
  if (!convo) return '_Missing conversation file._\n'
  const lines = []
  for (const t of convo.turns) {
    const who = t.speaker === 'navi' ? '**NAVI (output)**' : '**You (input)**'
    lines.push(`- ${who}: ${t.text}`)
  }
  lines.push('')
  return lines.join('\n')
}

function instrumentBody({ exampleOnly }) {
  const convos = loadConvos()
  const lines = []
  let qn = 0

  lines.push('## How this maps to Qualtrics')
  lines.push('')
  lines.push(
    'The live survey is a Vite web app. When recording is on, answers are posted to Qualtrics as **Embedded Data** (field names below). Qualtrics itself has no visible questions—only those embedded fields. A **second** Qualtrics survey holds contact fields so email is never stored next to answers.',
  )
  lines.push('')
  lines.push('Stored choice values are usually **0-based indexes** into the option list (Yes/No is stored as 1/0). Language and month/year selects store the option `value`.')
  lines.push('')

  // Consent
  lines.push('## Page: Consent')
  lines.push('')
  lines.push('_Consent form text is shown above this question (see app `ConsentText.jsx`)._')
  lines.push('')
  for (const q of PAGES.consent.questions) lines.push(formatQuestion(q, ++qn))

  // Screening
  lines.push('## Page: Screening')
  lines.push('')
  lines.push('_Declining consent or failing screening ends the survey; nothing is recorded._')
  lines.push('')
  for (const q of PAGES.screening.questions) lines.push(formatQuestion(q, ++qn))

  // Background
  lines.push('## Page: Background')
  lines.push('')
  for (const q of PAGES.background.questions) lines.push(formatQuestion(q, ++qn))

  // Situations
  lines.push('## Pages: Everyday situations (10, random order)')
  lines.push('')
  lines.push(
    'Every participant rates the same 10 situations. Order is randomized per session and stored in `situation_order`.',
  )
  lines.push('')
  for (const s of SITUATIONS) {
    lines.push(`### Situation: ${s.name}`)
    lines.push('')
    lines.push(`**Scene (shown):** ${s.scene}`)
    lines.push('')
    lines.push(`**Situation id:** \`${s.id}\``)
    lines.push('')
    for (const d of DIMENSIONS) {
      lines.push(formatQuestion({
        id: `${s.id}_${d.key}`,
        type: 'single',
        label: d.label,
        options: d.options,
        required: true,
      }, ++qn))
    }
  }

  // Block 14
  lines.push('## Pages: NAVI example exchanges (Block 14)')
  lines.push('')
  lines.push(
    'Shown only if the participant’s first language has conversation files. Each person sees **2 of 4** situations at random (`clinic`, `professor`, `ordering`, `smalltalk`). For each situation they see three versions (none / light / heavy mixing) in a **random order** labeled A, B, C. Answers are stored by mixing level, not by letter.',
  )
  lines.push('')
  lines.push('**Metadata fields**')
  lines.push('')
  lines.push('- `navi_shown` — comma-separated situation ids shown')
  lines.push('- `navi_{situation}_order` — comma-separated levels in display order (e.g. `light,none,heavy`)')
  lines.push('')

  const langsForBlock = exampleOnly
    ? LANGUAGES.filter((l) => l.code === 'ne')
    : LANGUAGES.filter((l) => l.code !== 'other')
  const sitsForBlock = exampleOnly ? ['clinic'] : NAVI_SITUATIONS

  if (exampleOnly) {
    lines.push(
      '_This file shows one worked example: **clinic** in English (none) plus Nepali (light and heavy). The full file lists every language._',
    )
    lines.push('')
  }

  for (const sitId of sitsForBlock) {
    const sit = SITUATIONS.find((s) => s.id === sitId)
    lines.push(`### NAVI situation: ${sit?.name || sitId} (\`${sitId}\`)`)
    lines.push('')

    // English-only (none) once
    const en = convos[`${sitId}_none_en`]
    lines.push(`#### Version content — ${LEVEL_LABEL.none} (\`none\`, language \`en\`)`)
    lines.push('')
    lines.push('_Shared by every language that has Block 14._')
    lines.push('')
    lines.push(formatConvo(en))

    for (const lang of langsForBlock) {
      for (const level of ['light', 'heavy']) {
        const c = convos[`${sitId}_${level}_${lang.code}`]
        lines.push(
          `#### Version content — ${LEVEL_LABEL[level]} (\`${level}\`, ${lang.label} / \`${lang.code}\`)`,
        )
        lines.push('')
        lines.push(formatConvo(c))
      }
    }

    lines.push('#### Questions after the three versions')
    lines.push('')
    for (const level of NAVI_LEVELS) {
      lines.push(
        formatQuestion({
          id: `navi_${sitId}_${level}_understand`,
          type: 'single',
          label: `How well did you understand Version [A/B/C mapped to ${level}]?`,
          options: NAVI_UNDERSTAND,
        }, ++qn),
      )
      lines.push(
        formatQuestion({
          id: `navi_${sitId}_${level}_natural`,
          type: 'single',
          label: `How natural does NAVI sound in Version [A/B/C mapped to ${level}]?`,
          options: NAVI_NATURAL,
        }, ++qn),
      )
    }
    lines.push(
      formatQuestion({
        id: `navi_${sitId}_pref`,
        type: 'single',
        label: 'Which version would help you most in this situation?',
        options: ['Version A', 'Version B', 'Version C'],
        help: 'Stored as the mixing level (`none` / `light` / `heavy`), not the letter.',
      }, ++qn),
    )
    lines.push(
      formatQuestion({
        id: `navi_${sitId}_use`,
        type: 'single',
        label:
          'If NAVI talked to you like the version you chose, would you use it to practice before this situation?',
        options: NAVI_USE,
      }, ++qn),
    )
  }

  // Product, coping, open
  for (const key of ['product', 'coping', 'open']) {
    const page = PAGES[key]
    lines.push(`## Page: ${page.title}`)
    lines.push('')
    if (page.intro) {
      lines.push(`_${page.intro}_`)
      lines.push('')
    }
    for (const q of page.questions) lines.push(formatQuestion(q, ++qn))
  }

  // Contact
  lines.push('## Page: Contact (separate Qualtrics survey)')
  lines.push('')
  lines.push(
    `_Stored only in the contact survey. Fields: ${CONTACT_FIELDS.map((f) => `\`${f}\``).join(', ')} plus \`participant_id\`._`,
  )
  lines.push('')
  if (PAGES.contact.intro) {
    lines.push(`_${PAGES.contact.intro}_`)
    lines.push('')
  }
  for (const q of PAGES.contact.questions) lines.push(formatQuestion(q, ++qn))

  // Meta
  lines.push('## Session metadata (survey response)')
  lines.push('')
  for (const id of [
    'situation_order',
    'participant_id',
    'play_number',
    'started_at',
    'completed_at',
    'duration_sec',
  ]) {
    lines.push(`- \`${id}\``)
  }
  lines.push('')

  lines.push('## Complete embedded-data field list (survey response)')
  lines.push('')
  lines.push('```')
  for (const id of allFieldIds()) lines.push(id)
  lines.push('```')
  lines.push('')

  return lines.join('\n')
}

function write(name, body) {
  const path = join(ROOT, name)
  writeFileSync(path, body, 'utf8')
  console.log('Wrote', name, `(${body.length} chars)`)
}

const headerFull = `# NAVI Phase 1 survey — full question instrument (v2)

Generated from \`src/data/questions.js\` and \`public/conversations/\`.  
Regenerate with \`npm run questions-md\`.

This file includes **every** NAVI example exchange in every supported language so an advisor can read the instrument without running the app.

`

const headerExample = `# NAVI Phase 1 survey — question instrument with one worked example (v2)

Generated from \`src/data/questions.js\` and \`public/conversations/\`.  
Regenerate with \`npm run questions-md\`.

Same question wording and Qualtrics field IDs as \`questions.md\`, but Block 14 shows only **clinic**: English-only plus Nepali light/heavy, as a visual sample of input/output turns.

`

write(
  'questions.md',
  headerFull + instrumentBody({ exampleOnly: false }),
)
write(
  'questions-example.md',
  headerExample + instrumentBody({ exampleOnly: true }),
)

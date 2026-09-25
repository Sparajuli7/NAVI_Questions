/**
 * NAVI Phase 1 — MASTER QUESTION LIST (version 2)
 *
 * Single source of truth. Matches NAVI_Survey_Questions_v2.
 * Nothing in the UI invents a question.
 *
 * Changing wording or options is an instrument change: once the IRB protocol is
 * approved it needs an amendment. Never rename or remove an `id`; analysis and the
 * Qualtrics field list key off them.
 */

export const SITUATIONS = [
  { id: 'groceries', name: 'Buying groceries and asking staff where something is',
    scene: 'You cannot find the rice. An employee is stocking a shelf a few feet away.' },
  { id: 'ordering', name: 'Ordering food at a counter or a restaurant',
    scene: 'There is a line behind you and the person just asked something you did not catch.' },
  { id: 'transit', name: 'Buying a bus ticket or asking about a route',
    scene: 'You need to know whether this bus goes to campus. It leaves in two minutes.' },
  { id: 'forms', name: 'Filling out a form for housing, health or campus paperwork',
    scene: 'A field asks for something you have never heard of before.' },
  { id: 'clinic', name: 'Talking to a doctor or someone at a clinic',
    scene: 'You need to describe how you feel and the exact word is not coming.' },
  { id: 'professor', name: 'Asking a professor a question after class',
    scene: 'You have a question. Three other students are waiting behind you.' },
  { id: 'classtalk', name: 'Speaking up in a class discussion or a group project',
    scene: 'You know the answer. The discussion has already moved on.' },
  { id: 'smalltalk', name: 'Making small talk with a classmate before class starts',
    scene: 'Someone sits down next to you and says something about the weather.' },
  { id: 'phone', name: 'A phone call where you cannot see the person',
    scene: 'The clinic is calling back and you cannot read their face.' },
  { id: 'humor', name: 'Following humor, sarcasm or slang in a group',
    scene: 'Everyone laughs. You understood every word and still missed the joke.' },
]

// Rated for every situation. Values are stored as the option index.
export const DIMENSIONS = [
  { key: 'freq', label: 'How often does this come up for you?',
    options: ['Never', 'A few times a year', 'Monthly', 'Weekly', 'Daily'] },
  { key: 'diff', label: 'How hard is it when it happens?',
    options: ['Not hard', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
  { key: 'stress', label: 'How stressful does it feel?',
    options: ['Not at all', 'A little', 'Somewhat', 'A lot', 'I dread it'] },
  { key: 'avoid', label: 'Have you put this off or avoided it because of the language?',
    options: ['Never', 'Once or twice', 'Often'] },
]

// Languages NAVI example conversations are prepared in. `code` must match the
// conversation file names. To add a language: add it here, add its 8 files to
// public/conversations, and list them in manifest.json. Keep "other" last.
export const LANGUAGES = [
  { code: 'zh', label: 'Chinese (Mandarin)' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'ha', label: 'Hausa' },
  { code: 'hi', label: 'Hindi' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'ne', label: 'Nepali' },
  { code: 'ru', label: 'Russian' },
  { code: 'es', label: 'Spanish' },
  { code: 'other', label: 'Other' },
]

// Block 14
export const NAVI_SITUATIONS = ['clinic', 'professor', 'ordering', 'smalltalk', 'transit']
export const NAVI_LEVELS = ['none', 'light', 'heavy']
/** At most 4 situations with conversation files; keep ≤5 for the instrument. */
export const NAVI_PER_PERSON = 3

export const NAVI_UNDERSTAND = ['Not at all', 'A little', 'Somewhat', 'Mostly', 'Completely']
export const NAVI_NATURAL = ['Not at all natural', 'Slightly', 'Somewhat', 'Mostly', 'Completely natural']
export const NAVI_USE = ['No', 'Maybe', 'Yes']

export const MIX_PREFERENCE = [
  'Almost none',
  'A little',
  'About half',
  'Mostly my language',
  'Not sure',
  'Other',
]

export const PAIN_POINTS = [
  'I get stuck for a word',
  'I am afraid of looking stupid',
  'I cannot practice before the real situation',
  'I do not understand what people say back',
  'I am too nervous to speak',
  'I do not have time to practice',
  'Other',
]

const YESNO = ['Yes', 'No'] // stored as 1 / 0, see yesNo()

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December']

/**
 * Fixed pages. Question types:
 *   single   one choice, value = index
 *   yesno    Yes/No, value = 1 or 0
 *   multi    several choices, value = array of indexes
 *   select   dropdown, value = option value
 *   scale5   1 to 5 rating, value = 1..5
 *   text     short text
 *   longtext long text
 */
export const PAGES = {
  consent: {
    title: 'Before you start',
    questions: [
      { id: 'consent', type: 'yesno', required: true,
        label: 'Selecting "Yes, I agree" indicates that you are at least 18 years of age, have read the information above, and consent to participate.',
        options: ['Yes, I agree', 'No, I do not want to take part'] },
    ],
  },

  screening: {
    title: 'A few quick checks',
    questions: [
      { id: 'enrolled_scsu', type: 'yesno', required: true,
        label: 'Are you currently a student at St. Cloud State University?', options: YESNO },
      { id: 'age_18_plus', type: 'yesno', required: true,
        label: 'Are you 18 or older?', options: YESNO },
      { id: 'arrival_month', type: 'select', required: true,
        label: 'When did you arrive in the United States? Month',
        options: MONTHS.map((m, i) => ({ value: i + 1, label: m })) },
      { id: 'arrival_year', type: 'select', required: true,
        label: 'When did you arrive in the United States? Year',
        options: [
          { value: 2026, label: '2026' },
          { value: 2025, label: '2025' },
          { value: 2024, label: '2024 or earlier' },
        ] },
      { id: 'participant_group', type: 'single', required: true,
        label: 'Which of these describes you best right now?',
        options: [
          'Degree-seeking student',
          'Degree-seeking, and also taking English for Academic Purposes',
          'Exchange or study abroad student',
          'Intensive English Center student',
        ] },
    ],
  },

  background: {
    title: 'About you',
    questions: [
      { id: 'first_language', type: 'select',
        label: 'What is your first language?',
        options: LANGUAGES.map((l) => ({ value: l.code, label: l.label })) },
      { id: 'first_language_other', type: 'text',
        label: 'Which language?', showIf: (a) => a.first_language === 'other' },
      { id: 'english_speaking', type: 'scale5', label: 'How would you rate your English for speaking?' },
      { id: 'english_listening', type: 'scale5', label: 'How would you rate your English for listening?' },
      { id: 'english_reading', type: 'scale5', label: 'How would you rate your English for reading?' },
    ],
  },

  product: {
    title: 'If something like NAVI existed',
    intro: 'A few questions about what would actually be useful to you. There are no right answers.',
    questions: [
      { id: 'practice_situations', type: 'multi',
        label: 'Which of these would you actually open an app to practice?',
        help: 'Choose every one that applies.',
        options: [...SITUATIONS.map((s) => s.name), 'None of these'] },
      { id: 'practice_mode', type: 'single',
        label: 'How would you want to practice?',
        options: ['Typing', 'Talking out loud', 'Both', 'Not sure'] },
      { id: 'practice_when', type: 'single',
        label: 'When would help be most useful?',
        options: [
          'Practicing beforehand, on my phone',
          'Quiet help during the situation, for example through earbuds',
          'Both',
          'Neither',
        ] },
      { id: 'pain_points', type: 'multi',
        label: 'What gets in the way most when you have to use English in real life?',
        help: 'Choose every one that applies.',
        options: PAIN_POINTS },
      { id: 'pain_points_other', type: 'text',
        label: 'What else gets in the way?',
        showIf: (a) => Array.isArray(a.pain_points) && a.pain_points.includes(PAIN_POINTS.indexOf('Other')) },
      { id: 'irresistible_text', type: 'longtext',
        label: 'What would make you actually open this every week?',
        help: 'Be specific. There is no wrong answer.' },
      { id: 'would_pay', type: 'single',
        label: 'Would you pay for an app like this?',
        options: ['No, only if it were free', 'Maybe', 'Yes'] },
      { id: 'pay_amount', type: 'single',
        label: 'What is the most you would pay per month?',
        options: ['Less than $3', '$3 to $5', '$5 to $10', '$10 to $15', 'More than $15'],
        showIf: (a) => a.would_pay === 1 || a.would_pay === 2 },
    ],
  },

  mix: {
    title: 'How much of your language in the tool?',
    intro:
      'Below is the same short clinic practice shown three ways — almost no mixing, a little, and mostly your language. Look at them, then tell us how much of your first language you would want in the tool.',
    questions: [
      { id: 'mix_preference', type: 'single',
        label: 'How much of your first language do you want in the tool?',
        options: MIX_PREFERENCE },
      { id: 'mix_preference_other', type: 'text',
        label: 'Describe how much mixing you want',
        showIf: (a) => a.mix_preference === MIX_PREFERENCE.indexOf('Other') },
    ],
  },

  coping: {
    title: 'When it goes wrong',
    questions: [
      { id: 'coping', type: 'multi',
        label: 'When you get stuck in one of those situations, what do you usually do?',
        help: 'Choose every one that applies.',
        options: [
          'Use a translation app',
          'Ask a friend or family member to help',
          'Use gestures or point',
          'Give up and leave',
          'Push through and hope for the best',
          'Avoid the situation next time',
        ] },
      { id: 'tools_used', type: 'multi',
        label: 'What do you use now to help with English?',
        help: 'Choose every one that applies.',
        options: [
          'Google Translate or similar',
          'ChatGPT or another AI chatbot',
          'A dictionary app',
          'A language learning app',
          'A person I know',
          'Nothing',
        ] },
      { id: 'tools_freq', type: 'single',
        label: 'How often do you use those?',
        options: ['Never', 'Rarely', 'Weekly', 'Daily', 'Many times a day'] },
    ],
  },

  open: {
    title: 'In your own words',
    intro: 'Both questions are optional.',
    questions: [
      { id: 'incident_text', type: 'longtext',
        label: 'Think of one time in the last month when language got in the way. What happened?',
        help: 'Write as much or as little as you want, in any language.' },
      { id: 'wish_text', type: 'longtext',
        label: 'Is there anything you wish existed that would have helped?' },
    ],
  },

  contact: {
    title: 'One last thing',
    intro: 'These are optional. Anything here is stored separately from your answers and deleted when the study ends.',
    questions: [
      { id: 'interview_ok', type: 'yesno',
        label: 'Would you be willing to talk for 30 to 45 minutes about this?', options: YESNO },
      { id: 'beta_ok', type: 'yesno',
        label: 'Would you be willing to try an early version of NAVI later this year?', options: YESNO },
      { id: 'contact_email', type: 'text', inputType: 'email',
        label: 'What is the best email to reach you at?',
        showIf: (a) => a.interview_ok === 1 || a.beta_ok === 1 },
    ],
  },
}

// Fields that must never be sent with the survey response. They go to the
// separate contact store only, per the IRB protocol.
export const CONTACT_FIELDS = ['contact_email', 'interview_ok', 'beta_ok']

/** Every field id the survey can produce, in a fixed order. */
export function allFieldIds() {
  const ids = []
  for (const key of ['consent', 'screening', 'background']) {
    PAGES[key].questions.forEach((q) => ids.push(q.id))
  }
  SITUATIONS.forEach((s) => DIMENSIONS.forEach((d) => ids.push(`${s.id}_${d.key}`)))
  ids.push('navi_shown')
  NAVI_SITUATIONS.forEach((s) => {
    ids.push(`navi_${s}_order`)
    NAVI_LEVELS.forEach((l) => {
      ids.push(`navi_${s}_${l}_understand`, `navi_${s}_${l}_natural`)
    })
    ids.push(`navi_${s}_pref`, `navi_${s}_use`)
  })
  for (const key of ['mix', 'product', 'coping', 'open']) {
    PAGES[key].questions.forEach((q) => ids.push(q.id))
  }
  ids.push('situation_order', 'participant_id', 'play_number', 'started_at', 'completed_at', 'duration_sec')
  return ids
}

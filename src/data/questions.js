/**
 * src/data/questions.js — SINGLE SOURCE OF TRUTH
 *
 * EDITING RULES (read before touching this file):
 *  1. Never add, remove, or reword a question without a corresponding IRB amendment
 *     once data collection has begun. Flag any such change explicitly in the diff.
 *  2. Never remove or reassign a question id. Analysis code and the codebook key
 *     off these ids permanently.
 *  3. No component may hard-code question text. All question and label text is
 *     rendered from this file. If you are typing question text inside a component,
 *     stop and add it here instead.
 *  4. Changing a situation's scene line is permitted (it is presentation decoration,
 *     never rated). Changing a situation id, a DIMENSION question, or any response
 *     label is an instrument change requiring an IRB amendment.
 *
 * LANGUAGE FLAVOURS — placeholder status:
 *  'en'  English  — implemented, default
 *  'ne'  Nepali   — PLACEHOLDER (scene lines and UI strings only; no rated items change)
 *  'es'  Spanish  — PLACEHOLDER
 *  'hi'  Hindi    — PLACEHOLDER
 *  'so'  Somali   — PLACEHOLDER
 *  'zh'  Mandarin — PLACEHOLDER
 *
 * A flavour may only change: scene line incidental nouns, UI button/label strings.
 * A flavour MUST NOT change: any question text, any response option text, any id.
 * If a flavour changes a rated item, data stops pooling and the study is broken.
 */

// ─── Modes ───────────────────────────────────────────────────────────────────
// scene  — one situation per screen, all four dimensions together
// deck   — one question per card, auto-advance on select (most game-like)
// sprint — one dimension across all 14 situations in a compact list

export const MODES = [
  { key: 'scene',  label: 'Scene'  },
  { key: 'deck',   label: 'Deck'   },
  { key: 'sprint', label: 'Sprint' },
]

// ─── Flavours ─────────────────────────────────────────────────────────────────

export const FLAVOURS = [
  { key: 'en', label: 'English',  placeholder: false },
  { key: 'ne', label: 'Nepali',   placeholder: true  },
  { key: 'es', label: 'Spanish',  placeholder: true  },
  { key: 'hi', label: 'Hindi',    placeholder: true  },
  { key: 'so', label: 'Somali',   placeholder: true  },
  { key: 'zh', label: 'Mandarin', placeholder: true  },
]

// ─── Dimensions ───────────────────────────────────────────────────────────────
// Four dimensions rated for every situation. Keys match the question_id suffix
// stored in the database: e.g. groceries.diff

export const DIMENSIONS = [
  {
    key: 'freq',
    question: 'How often does this come up for you?',
    type: 'likert',
    min: 0,
    max: 4,
    labels: ['Never', 'Rarely', 'Sometimes', 'Often', 'Daily'],
  },
  {
    key: 'diff',
    question: 'How hard is it when it happens?',
    type: 'likert',
    min: 0,
    max: 4,
    labels: ['Not hard', 'Slightly hard', 'Moderately hard', 'Very hard', 'Extremely hard'],
  },
  {
    key: 'stress',
    question: 'How stressful does it feel?',
    type: 'likert',
    min: 0,
    max: 4,
    labels: ['Not at all', 'A little', 'Somewhat stressful', 'Very stressful', 'I dread it'],
  },
  {
    key: 'avoid',
    question: 'Have you put this off or avoided it because of the language?',
    type: 'likert',
    min: 0,
    max: 2,
    labels: ['Never', 'Sometimes', 'Often'],
  },
]

// ─── Situations ───────────────────────────────────────────────────────────────
// 14 situations covering four failure modes:
//   producing speech, understanding speech, reading text/forms, judging formality
//
// scene: short one-line description used by the presentation layer — decoration only,
//        never rated. Safe to edit for clarity or flavour. The id is permanent.

export const SITUATIONS = [
  // — Producing speech ————————————————————————————————————————————————————————
  {
    id: 'asking_help',
    failureMode: 'producing',
    scene: 'You need to ask a store employee where to find something.',
  },
  {
    id: 'phone_appt',
    failureMode: 'producing',
    scene: 'You call to schedule a doctor, dentist, or government appointment.',
  },
  {
    id: 'class_speak',
    failureMode: 'producing',
    scene: 'You want to ask a question or share an idea during class.',
  },
  {
    id: 'order_food',
    failureMode: 'producing',
    scene: 'You order at a restaurant, café counter, or food truck.',
  },

  // — Understanding speech ————————————————————————————————————————————————————
  {
    id: 'lecture_pace',
    failureMode: 'understanding',
    scene: 'A professor speaks quickly or uses a lot of idioms and jokes.',
  },
  {
    id: 'group_work',
    failureMode: 'understanding',
    scene: 'Your project group is talking fast and overlapping each other.',
  },
  {
    id: 'staff_window',
    failureMode: 'understanding',
    scene: 'A staff member at an office counter gives you verbal instructions.',
  },
  {
    id: 'small_talk',
    failureMode: 'understanding',
    scene: 'American peers are chatting casually — slang, speed, references you don\'t share.',
  },

  // — Reading text / forms ————————————————————————————————————————————————————
  {
    id: 'official_forms',
    failureMode: 'reading',
    scene: 'You fill out a financial aid, housing, health, or government form.',
  },
  {
    id: 'lease_doc',
    failureMode: 'reading',
    scene: 'You read a lease, contract, or legal notice before signing.',
  },
  {
    id: 'course_text',
    failureMode: 'reading',
    scene: 'You parse assignment instructions, a rubric, or syllabus requirements.',
  },

  // — Judging formality ———————————————————————————————————————————————————————
  {
    id: 'email_prof',
    failureMode: 'formality',
    scene: 'You write an email to a professor and aren\'t sure of the right tone.',
  },
  {
    id: 'reply_admin',
    failureMode: 'formality',
    scene: 'You need to respond formally to a university office, landlord, or official.',
  },
  {
    id: 'social_register',
    failureMode: 'formality',
    scene: 'You\'re unsure whether a situation calls for formal or casual language.',
  },
]

// ─── Blocks ───────────────────────────────────────────────────────────────────
// Ordered list of survey blocks. The 'situations' block is a sentinel — its
// questions are generated at runtime from SITUATIONS × DIMENSIONS.

export const BLOCKS = [
  // ── 1. Consent ──────────────────────────────────────────────────────────────
  {
    id: 'consent',
    title: 'Before we begin',
    questions: [
      {
        id: 'consent_agree',
        type: 'gate',
        required: true,
        exitOnNo: true,
        text: 'I have read the study information sheet. I understand that my participation is voluntary, that I may stop at any time without penalty, and that my responses will be kept confidential. I agree to participate.',
        options: [
          { value: 'yes', label: 'Yes, I agree to participate' },
          { value: 'no',  label: 'No, I do not wish to participate' },
        ],
      },
    ],
  },

  // ── 2. Screening ────────────────────────────────────────────────────────────
  {
    id: 'screening',
    title: 'A few quick questions first',
    questions: [
      {
        id: 'enrolled_scsu',
        type: 'gate',
        required: true,
        exitOnNo: true,
        text: 'Are you currently enrolled at St. Cloud State University?',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no',  label: 'No' },
        ],
      },
      {
        id: 'age_18_plus',
        type: 'gate',
        required: true,
        exitOnNo: true,
        text: 'Are you 18 years of age or older?',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no',  label: 'No' },
        ],
      },
      {
        id: 'arrival_date',
        type: 'month',
        required: true,
        text: 'When did you arrive in the United States for your current period of stay?',
        hint: 'Month and year only',
      },
      {
        id: 'participant_group',
        type: 'single',
        required: true,
        text: 'Which best describes your enrollment status at SCSU?',
        options: [
          { value: 'degree',        label: 'Degree-seeking student' },
          { value: 'degree_eap',    label: 'Degree-seeking student also enrolled in EAP' },
          { value: 'exchange',      label: 'Exchange or study-abroad student' },
          { value: 'iec',           label: 'Intensive English Center (IEC) student' },
        ],
      },
      {
        id: 'intended_stay',
        type: 'single',
        required: true,
        text: 'How long do you plan to stay in the United States in total?',
        options: [
          { value: 'lt6m',   label: 'Less than 6 months' },
          { value: '6_12m',  label: '6 to 12 months' },
          { value: '1_2yr',  label: '1 to 2 years' },
          { value: 'gt2yr',  label: 'More than 2 years' },
        ],
      },
    ],
  },

  // ── 3. Background ───────────────────────────────────────────────────────────
  {
    id: 'background',
    title: 'About your language background',
    questions: [
      {
        id: 'first_language',
        type: 'text',
        required: true,
        text: 'What is your first language (the language you grew up speaking at home)?',
        maxLength: 80,
      },
      {
        id: 'self_speaking',
        type: 'likert',
        required: true,
        text: 'How would you rate your English speaking ability?',
        min: 1,
        max: 5,
        labels: ['Very limited', 'Basic', 'Intermediate', 'Advanced', 'Near-native'],
      },
      {
        id: 'self_listening',
        type: 'likert',
        required: true,
        text: 'How would you rate your English listening ability?',
        min: 1,
        max: 5,
        labels: ['Very limited', 'Basic', 'Intermediate', 'Advanced', 'Near-native'],
      },
      {
        id: 'self_reading',
        type: 'likert',
        required: true,
        text: 'How would you rate your English reading ability?',
        min: 1,
        max: 5,
        labels: ['Very limited', 'Basic', 'Intermediate', 'Advanced', 'Near-native'],
      },
      {
        id: 'self_writing',
        type: 'likert',
        required: true,
        text: 'How would you rate your English writing ability?',
        min: 1,
        max: 5,
        labels: ['Very limited', 'Basic', 'Intermediate', 'Advanced', 'Near-native'],
      },
      {
        id: 'prior_english_country',
        type: 'single',
        required: true,
        text: 'Before this current stay, how much time had you spent living in an English-speaking country?',
        options: [
          { value: 'none',   label: 'None' },
          { value: 'lt6m',   label: 'Less than 6 months' },
          { value: '6_12m',  label: '6 to 12 months' },
          { value: '1_2yr',  label: '1 to 2 years' },
          { value: 'gt2yr',  label: 'More than 2 years' },
        ],
      },
      {
        id: 'prior_english_school',
        type: 'single',
        required: true,
        text: 'Before SCSU, had you studied at a school or university where English was the primary language of instruction?',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no',  label: 'No' },
        ],
      },
      {
        id: 'degree_level',
        type: 'single',
        required: true,
        text: 'What level of degree or program are you enrolled in at SCSU?',
        options: [
          { value: 'undergrad',    label: 'Undergraduate (Bachelor\'s)' },
          { value: 'masters',      label: 'Graduate — Master\'s' },
          { value: 'doctoral',     label: 'Graduate — Doctoral' },
          { value: 'certificate',  label: 'Certificate or non-degree program' },
          { value: 'iec',          label: 'Intensive English Center' },
        ],
      },
    ],
  },

  // ── 4. Situations (battery) ─────────────────────────────────────────────────
  // Sentinel block. Questions are generated from SITUATIONS × DIMENSIONS.
  // Situation order is randomised per session. See SITUATIONS and DIMENSIONS above.
  {
    id: 'situations',
    title: 'Everyday English situations',
    type: 'battery',
    questions: [], // populated at runtime — do not add items here
  },

  // ── 5. Coping ───────────────────────────────────────────────────────────────
  {
    id: 'coping',
    title: 'When you get stuck',
    questions: [
      {
        id: 'coping_strategies',
        type: 'multi',
        required: true,
        text: 'When you struggle to understand or be understood in English, what do you usually do? Select all that apply.',
        options: [
          { value: 'ask_repeat',      label: 'Ask the person to repeat themselves' },
          { value: 'ask_slow',        label: 'Ask the person to speak more slowly' },
          { value: 'nod_pretend',     label: 'Nod along even if I didn\'t fully understand' },
          { value: 'phone_lookup',    label: 'Look it up on my phone in the moment' },
          { value: 'note_later',      label: 'Write it down and research it later' },
          { value: 'ask_peer',        label: 'Ask a classmate or friend to explain' },
          { value: 'avoid',           label: 'Avoid the situation if I can' },
          { value: 'other',           label: 'Something else' },
        ],
      },
      {
        id: 'tools_used',
        type: 'multi',
        required: true,
        text: 'Which of the following tools or resources do you use to help with English? Select all that apply.',
        options: [
          { value: 'google_translate', label: 'Google Translate' },
          { value: 'deepl',            label: 'DeepL' },
          { value: 'ai_chat',          label: 'ChatGPT or another AI assistant' },
          { value: 'dictionary_app',   label: 'Dictionary app (Merriam-Webster, Oxford, etc.)' },
          { value: 'youtube',          label: 'YouTube or other video' },
          { value: 'l1_friend',        label: 'A friend or family member who speaks my language' },
          { value: 'university',       label: 'University resources (writing center, EAP tutoring, etc.)' },
          { value: 'none',             label: 'I don\'t use any tools' },
          { value: 'other',            label: 'Something else' },
        ],
      },
      {
        id: 'tools_frequency',
        type: 'single',
        required: true,
        text: 'How often do you use these tools or strategies in a typical week?',
        options: [
          { value: 'rarely',    label: 'Rarely or never' },
          { value: 'few_week',  label: 'A few times a week' },
          { value: 'daily',     label: 'Daily' },
          { value: 'many_day',  label: 'Multiple times a day' },
        ],
      },
    ],
  },

  // ── 6. Anxiety (PLACEHOLDER) ─────────────────────────────────────────────────
  // SCALE_PLACEHOLDER — these four items will be replaced with a validated short
  // form of a foreign language anxiety scale before data collection begins.
  // Do NOT present these items as validated or cite any instrument name.
  // An IRB amendment is required before substituting the real scale.
  {
    id: 'anxiety',
    title: 'How you feel about English',
    placeholder: true,
    placeholderNote: 'These questions are placeholders. They will be replaced with a validated instrument before data collection begins.',
    questions: [
      {
        id: 'anxiety_1',
        type: 'likert',
        scale: 'SCALE_PLACEHOLDER',
        required: true,
        text: '[Placeholder] I feel nervous when I have to speak English with someone I don\'t know.',
        min: 1,
        max: 5,
        labels: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      },
      {
        id: 'anxiety_2',
        type: 'likert',
        scale: 'SCALE_PLACEHOLDER',
        required: true,
        text: '[Placeholder] I worry that other people will notice my English mistakes.',
        min: 1,
        max: 5,
        labels: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      },
      {
        id: 'anxiety_3',
        type: 'likert',
        scale: 'SCALE_PLACEHOLDER',
        required: true,
        text: '[Placeholder] I feel confident when speaking English in class.',
        min: 1,
        max: 5,
        labels: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      },
      {
        id: 'anxiety_4',
        type: 'likert',
        scale: 'SCALE_PLACEHOLDER',
        required: true,
        text: '[Placeholder] I get anxious when I don\'t understand what someone said and have to ask them to repeat.',
        min: 1,
        max: 5,
        labels: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      },
    ],
  },

  // ── 7. Willingness to Communicate (PLACEHOLDER) ──────────────────────────────
  // SCALE_PLACEHOLDER — will be replaced with a validated WTC short form.
  // Do NOT present these items as validated or cite any instrument name.
  {
    id: 'wtc',
    title: 'Willingness to use English',
    placeholder: true,
    placeholderNote: 'These questions are placeholders. They will be replaced with a validated instrument before data collection begins.',
    questions: [
      {
        id: 'wtc_1',
        type: 'likert',
        scale: 'SCALE_PLACEHOLDER',
        required: true,
        text: '[Placeholder] I am willing to start a conversation with a native English speaker I have just met.',
        min: 1,
        max: 5,
        labels: ['Almost never', 'Rarely', 'Sometimes', 'Often', 'Almost always'],
      },
      {
        id: 'wtc_2',
        type: 'likert',
        scale: 'SCALE_PLACEHOLDER',
        required: true,
        text: '[Placeholder] I am willing to ask a question in front of a large group who speak English.',
        min: 1,
        max: 5,
        labels: ['Almost never', 'Rarely', 'Sometimes', 'Often', 'Almost always'],
      },
      {
        id: 'wtc_3',
        type: 'likert',
        scale: 'SCALE_PLACEHOLDER',
        required: true,
        text: '[Placeholder] I am willing to use English even when I might make mistakes.',
        min: 1,
        max: 5,
        labels: ['Almost never', 'Rarely', 'Sometimes', 'Often', 'Almost always'],
      },
      {
        id: 'wtc_4',
        type: 'likert',
        scale: 'SCALE_PLACEHOLDER',
        required: true,
        text: '[Placeholder] I am willing to speak English with a classmate outside of class.',
        min: 1,
        max: 5,
        labels: ['Almost never', 'Rarely', 'Sometimes', 'Often', 'Almost always'],
      },
    ],
  },

  // ── 8. Open-ended ────────────────────────────────────────────────────────────
  {
    id: 'open',
    title: 'In your own words',
    questions: [
      {
        id: 'open_missing_situation',
        type: 'longtext',
        required: false,
        text: 'Is there an English situation not covered above that causes you significant difficulty or stress? If so, please describe it briefly.',
        maxLength: 500,
      },
      {
        id: 'open_anything_else',
        type: 'longtext',
        required: false,
        text: 'Is there anything else you\'d like to share about your experience using English at SCSU?',
        maxLength: 500,
      },
    ],
  },

  // ── 9. Contact ───────────────────────────────────────────────────────────────
  // Stored in the contacts table, never joined into the analysis export.
  {
    id: 'contact',
    title: 'Follow-up and prize drawing',
    questions: [
      {
        id: 'interview_ok',
        type: 'single',
        required: true,
        text: 'Would you be willing to participate in a brief follow-up interview (approximately 30 minutes, online) about your experiences?',
        options: [
          { value: 'yes', label: 'Yes, I\'m open to it' },
          { value: 'no',  label: 'No, thank you' },
        ],
      },
      {
        id: 'raffle_ok',
        type: 'single',
        required: true,
        text: 'Would you like to enter the prize drawing for completing this survey?',
        options: [
          { value: 'yes', label: 'Yes, enter me in the drawing' },
          { value: 'no',  label: 'No, thank you' },
        ],
      },
      // email is conditionally shown when interview_ok === 'yes' OR raffle_ok === 'yes'
      {
        id: 'contact_email',
        type: 'text',
        required: false, // required only when interview_ok or raffle_ok is 'yes'
        conditional: { any: ['interview_ok:yes', 'raffle_ok:yes'] },
        text: 'Please enter your email address. It will be stored separately from your survey responses and will never appear in the research data.',
        hint: 'Your email is only used for interview scheduling and/or prize notification.',
        maxLength: 254,
      },
    ],
  },
]

// ─── Derived counts ───────────────────────────────────────────────────────────

// All non-battery question ids across all blocks
const _nonBatteryCount = BLOCKS.reduce((sum, block) => {
  if (block.id === 'situations') return sum
  return sum + block.questions.length
}, 0)

// Battery items: 14 situations × 4 dimensions
const _batteryCount = SITUATIONS.length * DIMENSIONS.length

export const QUESTION_COUNT = _nonBatteryCount + _batteryCount

// Quick sanity check in development
if (typeof import.meta.env !== 'undefined' && import.meta.env.DEV) {
  console.info(
    `[questions.js] ${SITUATIONS.length} situations × ${DIMENSIONS.length} dimensions = ${_batteryCount} battery items`,
    `+ ${_nonBatteryCount} other questions = ${QUESTION_COUNT} total`
  )
}

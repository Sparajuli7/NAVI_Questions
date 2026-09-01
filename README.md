# NAVI — Navigating Academic & Vocational English

**Master's thesis research instrument — St. Cloud State University**
Researcher: Shreyash Parajuli

---

## What this is

NAVI is a Phase 1 survey instrument built for a master's thesis study at SCSU. It measures which everyday English situations cause difficulty, stress, and avoidance for newly arrived international students. The instrument is designed to feel like a game — participants choose between three presentation modes (Scene, Deck, Sprint) so that repeat plays stay engaging and so that the researcher can compare response stability across modes.

The core measure is a **14-situation × 4-dimension battery** (56 rated items). Every situation is rated on frequency, difficulty, stress, and avoidance. Regardless of which mode a participant uses, every response lands in identical database columns — mode affects presentation only, never the data schema.

Data collection is gated behind an environment flag and will not begin until IRB approval confirms the storage location.

---

## Running locally

No environment variables are needed to run or demo the app. The recording layer is off by default and writes nothing.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build check
```

---

## Environment variables

### For the advisor demo right now
**None required.** Skip this section entirely.

### After IRB approval — to enable real data collection

Set these in **Vercel → Settings → Environment Variables** (never commit them).

| Variable | Scope | Purpose |
|---|---|---|
| `DATABASE_URL` | Server-side only (no `VITE_` prefix) | Neon Postgres connection string |
| `VITE_RECORDING_ENABLED` | Client-visible | Set to `"true"` to activate writes |
| `EXPORT_TOKEN` | Server-side only | Bearer token protecting `GET /api/export` |

See `.env.example` for the full template.

### Steps before flipping the flag

1. Create a free Neon Postgres database at [neon.tech](https://neon.tech)
2. Run the schema below in the Neon SQL editor
3. Set `DATABASE_URL` in Vercel (Production + Preview environments)
4. Set `EXPORT_TOKEN` to any strong random string (generate with `openssl rand -hex 32`)
5. Confirm the storage location in writing with the SCSU IRB office
6. Set `VITE_RECORDING_ENABLED=true` in Vercel — **only after IRB sign-off**

---

## Database schema

```sql
create table sessions (
  session_id      uuid primary key,
  participant_id  text not null,           -- stable UUID from localStorage; links replays
  play_number     int  not null default 1, -- 1 = primary response, >1 = replay
  mode            text not null,           -- 'scene' | 'deck' | 'sprint'
  flavour         text not null,           -- 'en' | 'ne' | 'es' | 'hi' | 'so' | 'zh'
  situation_order jsonb not null,          -- randomised situation id array (order effects)
  started_at      timestamptz not null default now(),
  completed_at    timestamptz,             -- null = dropout; partial data is still usable
  user_agent      text
);

create table answers (
  session_id  uuid references sessions(session_id) on delete cascade,
  question_id text not null,              -- e.g. 'first_language', 'asking_help.diff'
  value       jsonb not null,
  answered_at timestamptz not null default now(),
  primary key (session_id, question_id)
);

create table contacts (                   -- NEVER joined into the analysis export
  session_id   uuid references sessions(session_id) on delete cascade,
  email        text not null,
  interview_ok boolean not null,
  raffle_ok    boolean not null,
  created_at   timestamptz not null default now()
);
```

Battery answers use `question_id` of the form `<situation_id>.<dimension_key>`, e.g. `asking_help.diff`. One row per rated item means a dropout still leaves usable partial data.

---

## Instrument editing rules

> These rules exist because analysis code and the codebook key off question ids permanently. Violating them after data collection begins corrupts the dataset.

1. **`src/data/questions.js` is the single source of truth.** No component may invent, reword, or hard-code question text.
2. **Never remove or reassign a question id.** Adding or rewording a question after IRB approval is an instrument change requiring an amendment.
3. **Situation scene lines are safe to edit** — they are presentation decoration and are never rated.
4. **Language flavours may only change** scene line incidental nouns and UI strings. A flavour must never change a question, a response option, or an id. If it does, data stops pooling across participants and the study is broken.
5. **Placeholder scales** (anxiety, WTC) must be replaced with validated instruments before real collection. An IRB amendment is required.

---

## Master question list

All question text is rendered from `src/data/questions.js`. Nothing below may be changed without an IRB amendment once data collection has begun.

---

### Dimensions (rated for every situation)

These four dimensions are the core of the battery. Every situation is rated on all four.

| Key | Question | Scale | Labels |
|---|---|---|---|
| `freq` | How often does this come up for you? | 0–4 | Never / Rarely / Sometimes / Often / Daily |
| `diff` | How hard is it when it happens? | 0–4 | Not hard / Slightly hard / Moderately hard / Very hard / Extremely hard |
| `stress` | How stressful does it feel? | 0–4 | Not at all / A little / Somewhat stressful / Very stressful / I dread it |
| `avoid` | Have you put this off or avoided it because of the language? | 0–2 | Never / Sometimes / Often |

Battery `question_id` format: `<situation_id>.<dimension_key>` — e.g. `asking_help.diff`

---

### Situations (14 total, 4 failure modes)

#### Producing Speech

| ID | Scene |
|---|---|
| `asking_help` | You need to ask a store employee where to find something. |
| `phone_appt` | You call to schedule a doctor, dentist, or government appointment. |
| `class_speak` | You want to ask a question or share an idea during class. |
| `order_food` | You order at a restaurant, café counter, or food truck. |

#### Understanding Speech

| ID | Scene |
|---|---|
| `lecture_pace` | A professor speaks quickly or uses a lot of idioms and jokes. |
| `group_work` | Your project group is talking fast and overlapping each other. |
| `staff_window` | A staff member at an office counter gives you verbal instructions. |
| `small_talk` | American peers are chatting casually — slang, speed, references you don't share. |

#### Reading Text / Forms

| ID | Scene |
|---|---|
| `official_forms` | You fill out a financial aid, housing, health, or government form. |
| `lease_doc` | You read a lease, contract, or legal notice before signing. |
| `course_text` | You parse assignment instructions, a rubric, or syllabus requirements. |

#### Judging Formality

| ID | Scene |
|---|---|
| `email_prof` | You write an email to a professor and aren't sure of the right tone. |
| `reply_admin` | You need to respond formally to a university office, landlord, or official. |
| `social_register` | You're unsure whether a situation calls for formal or casual language. |

---

### Block 1 — Consent

**Title:** Before we begin

| ID | Type | Text |
|---|---|---|
| `consent_agree` | gate | I have read the study information sheet. I understand that my participation is voluntary, that I may stop at any time without penalty, and that my responses will be kept confidential. I agree to participate. |

Options: `yes` = "Yes, I agree to participate" / `no` = "No, I do not wish to participate" — selecting No ends the session immediately.

---

### Block 2 — Screening

**Title:** A few quick questions first

| ID | Type | Text |
|---|---|---|
| `enrolled_scsu` | gate | Are you currently enrolled at St. Cloud State University? |
| `age_18_plus` | gate | Are you 18 years of age or older? |
| `arrival_date` | month | When did you arrive in the United States for your current period of stay? |
| `participant_group` | single | Which best describes your enrollment status at SCSU? |
| `intended_stay` | single | How long do you plan to stay in the United States in total? |

`participant_group` options: Degree-seeking student / Degree-seeking + EAP / Exchange or study-abroad / Intensive English Center (IEC)

`intended_stay` options: Less than 6 months / 6 to 12 months / 1 to 2 years / More than 2 years

---

### Block 3 — Background

**Title:** About your language background

| ID | Type | Scale | Text |
|---|---|---|---|
| `first_language` | text | — | What is your first language (the language you grew up speaking at home)? |
| `self_speaking` | likert | 1–5 | How would you rate your English speaking ability? |
| `self_listening` | likert | 1–5 | How would you rate your English listening ability? |
| `self_reading` | likert | 1–5 | How would you rate your English reading ability? |
| `self_writing` | likert | 1–5 | How would you rate your English writing ability? |
| `prior_english_country` | single | — | Before this current stay, how much time had you spent living in an English-speaking country? |
| `prior_english_school` | single | — | Before SCSU, had you studied at a school or university where English was the primary language of instruction? |
| `degree_level` | single | — | What level of degree or program are you enrolled in at SCSU? |

Self-rating labels (1–5): Very limited / Basic / Intermediate / Advanced / Near-native

`prior_english_country` options: None / Less than 6 months / 6 to 12 months / 1 to 2 years / More than 2 years

`degree_level` options: Undergraduate (Bachelor's) / Graduate — Master's / Graduate — Doctoral / Certificate or non-degree / Intensive English Center

---

### Block 4 — Situations (battery)

56 rated items generated at runtime from **14 situations × 4 dimensions**. Situation order is randomised per session and stored in `sessions.situation_order` for order-effects analysis. See the Situations and Dimensions sections above.

Presented in one of three modes chosen by the participant at the start:
- **Scene** — one situation per screen, all four dimensions rated together
- **Deck** — one question per card (56 cards), auto-advances on selection, keyboard 1–5
- **Sprint** — one dimension at a time, all 14 situations in a compact list (4 pages)

---

### Block 5 — Coping

**Title:** When you get stuck

| ID | Type | Text |
|---|---|---|
| `coping_strategies` | multi | When you struggle to understand or be understood in English, what do you usually do? Select all that apply. |
| `tools_used` | multi | Which of the following tools or resources do you use to help with English? Select all that apply. |
| `tools_frequency` | single | How often do you use these tools or strategies in a typical week? |

`coping_strategies` options: Ask the person to repeat / Ask the person to slow down / Nod along even if I didn't understand / Look it up on my phone / Write it down and research later / Ask a classmate or friend / Avoid the situation / Something else

`tools_used` options: Google Translate / DeepL / ChatGPT or another AI / Dictionary app / YouTube or other video / A friend/family member who speaks my language / University resources (writing center, EAP) / I don't use any tools / Something else

`tools_frequency` options: Rarely or never / A few times a week / Daily / Multiple times a day

---

### Block 6 — Anxiety ⚠️ SCALE_PLACEHOLDER

**Title:** How you feel about English

> These four items are placeholders. They will be replaced with a validated short form of a foreign language anxiety scale before data collection begins. Do not present them as validated. An IRB amendment is required before substitution.

| ID | Text |
|---|---|
| `anxiety_1` | [Placeholder] I feel nervous when I have to speak English with someone I don't know. |
| `anxiety_2` | [Placeholder] I worry that other people will notice my English mistakes. |
| `anxiety_3` | [Placeholder] I feel confident when speaking English in class. |
| `anxiety_4` | [Placeholder] I get anxious when I don't understand what someone said and have to ask them to repeat. |

Scale: 1–5, Strongly disagree → Strongly agree

---

### Block 7 — Willingness to Communicate ⚠️ SCALE_PLACEHOLDER

**Title:** Willingness to use English

> Same placeholder status as Block 6. Will be replaced with a validated WTC short form before data collection.

| ID | Text |
|---|---|
| `wtc_1` | [Placeholder] I am willing to start a conversation with a native English speaker I have just met. |
| `wtc_2` | [Placeholder] I am willing to ask a question in front of a large group who speak English. |
| `wtc_3` | [Placeholder] I am willing to use English even when I might make mistakes. |
| `wtc_4` | [Placeholder] I am willing to speak English with a classmate outside of class. |

Scale: 1–5, Almost never → Almost always

---

### Block 8 — Open-ended

**Title:** In your own words (both questions optional)

| ID | Text |
|---|---|
| `open_missing_situation` | Is there an English situation not covered above that causes you significant difficulty or stress? If so, please describe it briefly. |
| `open_anything_else` | Is there anything else you'd like to share about your experience using English at SCSU? |

Max 500 characters each.

---

### Block 9 — Contact

**Title:** Follow-up and prize drawing

> Stored in the `contacts` table. Never joined into the analysis export. Email is stored separately from responses and linked only by `session_id`.

| ID | Type | Text |
|---|---|---|
| `interview_ok` | single | Would you be willing to participate in a brief follow-up interview (approximately 30 minutes, online) about your experiences? |
| `raffle_ok` | single | Would you like to enter the prize drawing for completing this survey? |
| `contact_email` | text | Please enter your email address. It will be stored separately from your survey responses and will never appear in the research data. *(shown only if interview_ok = yes OR raffle_ok = yes)* |

---

### Results screen

After the contact block, participants see a scatter plot of their own ratings (frequency × difficulty, colored by stress, ringed if avoided), a data table of all 14 situations, and a sample JSON row. This screen exists primarily so the researcher can demo the data structure to advisors and committee members.

---

## Question count

| Component | Count |
|---|---|
| Consent | 1 |
| Screening | 5 |
| Background | 8 |
| Battery (14 × 4) | 56 |
| Coping | 3 |
| Anxiety (placeholder) | 4 |
| WTC (placeholder) | 4 |
| Open | 2 |
| Contact | 3 |
| **Total** | **86** |

---

## Stack

- Vite + React 18, plain JavaScript
- Plain CSS with custom properties (no component library, no Tailwind)
- Vercel for hosting; Vercel serverless functions in `/api/` for all database writes
- Neon Postgres for storage
- `@neondatabase/serverless` as the database driver

## Deployment

Push to `main` → Vercel auto-deploys. No build configuration needed beyond what is already in `vercel.json`.

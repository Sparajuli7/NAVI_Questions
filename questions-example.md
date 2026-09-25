# NAVI Phase 1 survey — question instrument with one worked example (v2)

Generated from `src/data/questions.js` and `public/conversations/`.  
Regenerate with `npm run questions-md`.

Same question wording and Qualtrics field IDs as `questions.md`, but Block 14 shows only **clinic**: English-only plus Nepali light/heavy, as a visual sample of input/output turns.

## How this maps to Qualtrics

The live survey is a Vite web app. When recording is on, answers are posted to Qualtrics as **Embedded Data** (field names below). Qualtrics itself has no visible questions—only those embedded fields. A **second** Qualtrics survey holds contact fields so email is never stored next to answers.

Stored choice values are usually **0-based indexes** into the option list (Yes/No is stored as 1/0). Language and month/year selects store the option `value`.

## Page: Consent

_Consent form text is shown above this question (see app `ConsentText.jsx`)._

### Q1. `consent` **(required)**

Selecting "Yes, I agree" indicates that you are at least 18 years of age, have read the information above, and consent to participate.

**Type:** yesno

- [ ] Yes, I agree
- [ ] No, I do not want to take part

## Page: Screening

_Declining consent or failing screening ends the survey; nothing is recorded._

### Q2. `enrolled_scsu` **(required)**

Are you currently a student at St. Cloud State University?

**Type:** yesno

- [ ] Yes
- [ ] No

### Q3. `age_18_plus` **(required)**

Are you 18 or older?

**Type:** yesno

- [ ] Yes
- [ ] No

### Q4. `arrival_month` **(required)**

When did you arrive in the United States? Month

**Type:** select

- [ ] January *(stored value: `1`)*
- [ ] February *(stored value: `2`)*
- [ ] March *(stored value: `3`)*
- [ ] April *(stored value: `4`)*
- [ ] May *(stored value: `5`)*
- [ ] June *(stored value: `6`)*
- [ ] July *(stored value: `7`)*
- [ ] August *(stored value: `8`)*
- [ ] September *(stored value: `9`)*
- [ ] October *(stored value: `10`)*
- [ ] November *(stored value: `11`)*
- [ ] December *(stored value: `12`)*

### Q5. `arrival_year` **(required)**

When did you arrive in the United States? Year

**Type:** select

- [ ] 2026 *(stored value: `2026`)*
- [ ] 2025 *(stored value: `2025`)*
- [ ] 2024 or earlier *(stored value: `2024`)*

### Q6. `participant_group` **(required)**

Which of these describes you best right now?

**Type:** single

- [ ] Degree-seeking student
- [ ] Degree-seeking, and also taking English for Academic Purposes
- [ ] Exchange or study abroad student
- [ ] Intensive English Center student

## Page: Background

### Q7. `first_language`

What is your first language?

**Type:** select

- [ ] Chinese (Mandarin) *(stored value: `zh`)*
- [ ] French *(stored value: `fr`)*
- [ ] German *(stored value: `de`)*
- [ ] Hausa *(stored value: `ha`)*
- [ ] Hindi *(stored value: `hi`)*
- [ ] Japanese *(stored value: `ja`)*
- [ ] Korean *(stored value: `ko`)*
- [ ] Nepali *(stored value: `ne`)*
- [ ] Russian *(stored value: `ru`)*
- [ ] Spanish *(stored value: `es`)*
- [ ] Other *(stored value: `other`)*

### Q8. `first_language_other`

Which language?

*Shown only when a prior answer matches the survey logic.*

**Type:** text

*(open text)*

### Q9. `english_speaking`

How would you rate your English for speaking?

**Type:** scale5

1 · 2 · 3 · 4 · 5

### Q10. `english_listening`

How would you rate your English for listening?

**Type:** scale5

1 · 2 · 3 · 4 · 5

### Q11. `english_reading`

How would you rate your English for reading?

**Type:** scale5

1 · 2 · 3 · 4 · 5

## Pages: Everyday situations (10, random order)

Every participant rates the same 10 situations. Order is randomized per session and stored in `situation_order`.

### Situation: Buying groceries and asking staff where something is

**Scene (shown):** You cannot find the rice. An employee is stocking a shelf a few feet away.

**Situation id:** `groceries`

### Q12. `groceries_freq` **(required)**

How often does this come up for you?

**Type:** single

- [ ] Never
- [ ] A few times a year
- [ ] Monthly
- [ ] Weekly
- [ ] Daily

### Q13. `groceries_diff` **(required)**

How hard is it when it happens?

**Type:** single

- [ ] Not hard
- [ ] Slightly
- [ ] Moderately
- [ ] Very
- [ ] Extremely

### Q14. `groceries_stress` **(required)**

How stressful does it feel?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] A lot
- [ ] I dread it

### Q15. `groceries_avoid` **(required)**

Have you put this off or avoided it because of the language?

**Type:** single

- [ ] Never
- [ ] Once or twice
- [ ] Often

### Situation: Ordering food at a counter or a restaurant

**Scene (shown):** There is a line behind you and the person just asked something you did not catch.

**Situation id:** `ordering`

### Q16. `ordering_freq` **(required)**

How often does this come up for you?

**Type:** single

- [ ] Never
- [ ] A few times a year
- [ ] Monthly
- [ ] Weekly
- [ ] Daily

### Q17. `ordering_diff` **(required)**

How hard is it when it happens?

**Type:** single

- [ ] Not hard
- [ ] Slightly
- [ ] Moderately
- [ ] Very
- [ ] Extremely

### Q18. `ordering_stress` **(required)**

How stressful does it feel?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] A lot
- [ ] I dread it

### Q19. `ordering_avoid` **(required)**

Have you put this off or avoided it because of the language?

**Type:** single

- [ ] Never
- [ ] Once or twice
- [ ] Often

### Situation: Buying a bus ticket or asking about a route

**Scene (shown):** You need to know whether this bus goes to campus. It leaves in two minutes.

**Situation id:** `transit`

### Q20. `transit_freq` **(required)**

How often does this come up for you?

**Type:** single

- [ ] Never
- [ ] A few times a year
- [ ] Monthly
- [ ] Weekly
- [ ] Daily

### Q21. `transit_diff` **(required)**

How hard is it when it happens?

**Type:** single

- [ ] Not hard
- [ ] Slightly
- [ ] Moderately
- [ ] Very
- [ ] Extremely

### Q22. `transit_stress` **(required)**

How stressful does it feel?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] A lot
- [ ] I dread it

### Q23. `transit_avoid` **(required)**

Have you put this off or avoided it because of the language?

**Type:** single

- [ ] Never
- [ ] Once or twice
- [ ] Often

### Situation: Filling out a form for housing, health or campus paperwork

**Scene (shown):** A field asks for something you have never heard of before.

**Situation id:** `forms`

### Q24. `forms_freq` **(required)**

How often does this come up for you?

**Type:** single

- [ ] Never
- [ ] A few times a year
- [ ] Monthly
- [ ] Weekly
- [ ] Daily

### Q25. `forms_diff` **(required)**

How hard is it when it happens?

**Type:** single

- [ ] Not hard
- [ ] Slightly
- [ ] Moderately
- [ ] Very
- [ ] Extremely

### Q26. `forms_stress` **(required)**

How stressful does it feel?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] A lot
- [ ] I dread it

### Q27. `forms_avoid` **(required)**

Have you put this off or avoided it because of the language?

**Type:** single

- [ ] Never
- [ ] Once or twice
- [ ] Often

### Situation: Talking to a doctor or someone at a clinic

**Scene (shown):** You need to describe how you feel and the exact word is not coming.

**Situation id:** `clinic`

### Q28. `clinic_freq` **(required)**

How often does this come up for you?

**Type:** single

- [ ] Never
- [ ] A few times a year
- [ ] Monthly
- [ ] Weekly
- [ ] Daily

### Q29. `clinic_diff` **(required)**

How hard is it when it happens?

**Type:** single

- [ ] Not hard
- [ ] Slightly
- [ ] Moderately
- [ ] Very
- [ ] Extremely

### Q30. `clinic_stress` **(required)**

How stressful does it feel?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] A lot
- [ ] I dread it

### Q31. `clinic_avoid` **(required)**

Have you put this off or avoided it because of the language?

**Type:** single

- [ ] Never
- [ ] Once or twice
- [ ] Often

### Situation: Asking a professor a question after class

**Scene (shown):** You have a question. Three other students are waiting behind you.

**Situation id:** `professor`

### Q32. `professor_freq` **(required)**

How often does this come up for you?

**Type:** single

- [ ] Never
- [ ] A few times a year
- [ ] Monthly
- [ ] Weekly
- [ ] Daily

### Q33. `professor_diff` **(required)**

How hard is it when it happens?

**Type:** single

- [ ] Not hard
- [ ] Slightly
- [ ] Moderately
- [ ] Very
- [ ] Extremely

### Q34. `professor_stress` **(required)**

How stressful does it feel?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] A lot
- [ ] I dread it

### Q35. `professor_avoid` **(required)**

Have you put this off or avoided it because of the language?

**Type:** single

- [ ] Never
- [ ] Once or twice
- [ ] Often

### Situation: Speaking up in a class discussion or a group project

**Scene (shown):** You know the answer. The discussion has already moved on.

**Situation id:** `classtalk`

### Q36. `classtalk_freq` **(required)**

How often does this come up for you?

**Type:** single

- [ ] Never
- [ ] A few times a year
- [ ] Monthly
- [ ] Weekly
- [ ] Daily

### Q37. `classtalk_diff` **(required)**

How hard is it when it happens?

**Type:** single

- [ ] Not hard
- [ ] Slightly
- [ ] Moderately
- [ ] Very
- [ ] Extremely

### Q38. `classtalk_stress` **(required)**

How stressful does it feel?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] A lot
- [ ] I dread it

### Q39. `classtalk_avoid` **(required)**

Have you put this off or avoided it because of the language?

**Type:** single

- [ ] Never
- [ ] Once or twice
- [ ] Often

### Situation: Making small talk with a classmate before class starts

**Scene (shown):** Someone sits down next to you and says something about the weather.

**Situation id:** `smalltalk`

### Q40. `smalltalk_freq` **(required)**

How often does this come up for you?

**Type:** single

- [ ] Never
- [ ] A few times a year
- [ ] Monthly
- [ ] Weekly
- [ ] Daily

### Q41. `smalltalk_diff` **(required)**

How hard is it when it happens?

**Type:** single

- [ ] Not hard
- [ ] Slightly
- [ ] Moderately
- [ ] Very
- [ ] Extremely

### Q42. `smalltalk_stress` **(required)**

How stressful does it feel?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] A lot
- [ ] I dread it

### Q43. `smalltalk_avoid` **(required)**

Have you put this off or avoided it because of the language?

**Type:** single

- [ ] Never
- [ ] Once or twice
- [ ] Often

### Situation: A phone call where you cannot see the person

**Scene (shown):** The clinic is calling back and you cannot read their face.

**Situation id:** `phone`

### Q44. `phone_freq` **(required)**

How often does this come up for you?

**Type:** single

- [ ] Never
- [ ] A few times a year
- [ ] Monthly
- [ ] Weekly
- [ ] Daily

### Q45. `phone_diff` **(required)**

How hard is it when it happens?

**Type:** single

- [ ] Not hard
- [ ] Slightly
- [ ] Moderately
- [ ] Very
- [ ] Extremely

### Q46. `phone_stress` **(required)**

How stressful does it feel?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] A lot
- [ ] I dread it

### Q47. `phone_avoid` **(required)**

Have you put this off or avoided it because of the language?

**Type:** single

- [ ] Never
- [ ] Once or twice
- [ ] Often

### Situation: Following humor, sarcasm or slang in a group

**Scene (shown):** Everyone laughs. You understood every word and still missed the joke.

**Situation id:** `humor`

### Q48. `humor_freq` **(required)**

How often does this come up for you?

**Type:** single

- [ ] Never
- [ ] A few times a year
- [ ] Monthly
- [ ] Weekly
- [ ] Daily

### Q49. `humor_diff` **(required)**

How hard is it when it happens?

**Type:** single

- [ ] Not hard
- [ ] Slightly
- [ ] Moderately
- [ ] Very
- [ ] Extremely

### Q50. `humor_stress` **(required)**

How stressful does it feel?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] A lot
- [ ] I dread it

### Q51. `humor_avoid` **(required)**

Have you put this off or avoided it because of the language?

**Type:** single

- [ ] Never
- [ ] Once or twice
- [ ] Often

## Pages: NAVI example exchanges (Block 14)

Shown only if the participant’s first language has conversation files. Each person sees **2 of 4** situations at random (`clinic`, `professor`, `ordering`, `smalltalk`). For each situation they see three versions (none / light / heavy mixing) in a **random order** labeled A, B, C. Answers are stored by mixing level, not by letter.

**Metadata fields**

- `navi_shown` — comma-separated situation ids shown
- `navi_{situation}_order` — comma-separated levels in display order (e.g. `light,none,heavy`)

_This file shows one worked example: **clinic** in English (none) plus Nepali (light and heavy). The full file lists every language._

### NAVI situation: Talking to a doctor or someone at a clinic (`clinic`)

#### Version content — English only (no mixing) (`none`, language `en`)

_Shared by every language that has Block 14._

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: Okay, thank you for telling me. Is the pain sharp, or more like a dull ache?
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: It is probably not serious, but I want to check. Drink water, rest, and come back if the pain gets worse or you get a fever.

#### Version content — Light mixing of the first language (`light`, Nepali / `ne`)

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: Okay, भन्नुभएकोमा धन्यवाद। Is the pain sharp, or more like a dull ache?
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: It is probably not serious, तर म एकपटक जाँच गर्न चाहन्छु। Drink water, rest, and come back if the pain gets worse वा ज्वरो आयो भने।

#### Version content — Heavy mixing of the first language (`heavy`, Nepali / `ne`)

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: ठीक छ, भन्नुभएकोमा धन्यवाद। दुखाइ घोचेजस्तो छ, कि dull ache जस्तो?
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: सायद त्यति गम्भीर होइन, तर म एकपटक जाँच गर्न चाहन्छु। पानी पिउनुहोस्, आराम गर्नुहोस्, and come back if the pain gets worse or you get a fever.

#### Questions after the three versions

### Q52. `navi_clinic_none_understand`

How well did you understand Version [A/B/C mapped to none]?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely

### Q53. `navi_clinic_none_natural`

How natural does NAVI sound in Version [A/B/C mapped to none]?

**Type:** single

- [ ] Not at all natural
- [ ] Slightly
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely natural

### Q54. `navi_clinic_light_understand`

How well did you understand Version [A/B/C mapped to light]?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely

### Q55. `navi_clinic_light_natural`

How natural does NAVI sound in Version [A/B/C mapped to light]?

**Type:** single

- [ ] Not at all natural
- [ ] Slightly
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely natural

### Q56. `navi_clinic_heavy_understand`

How well did you understand Version [A/B/C mapped to heavy]?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely

### Q57. `navi_clinic_heavy_natural`

How natural does NAVI sound in Version [A/B/C mapped to heavy]?

**Type:** single

- [ ] Not at all natural
- [ ] Slightly
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely natural

### Q58. `navi_clinic_pref`

Which version would help you most in this situation?

*Stored as the mixing level (`none` / `light` / `heavy`), not the letter.*

**Type:** single

- [ ] Version A
- [ ] Version B
- [ ] Version C

### Q59. `navi_clinic_use`

If NAVI talked to you like the version you chose, would you use it to practice before this situation?

**Type:** single

- [ ] No
- [ ] Maybe
- [ ] Yes

## Page: How much of your language in the tool?

_Below is the same short clinic practice shown three ways — almost no mixing, a little, and mostly your language. Look at them, then tell us how much of your first language you would want in the tool._

_This page shows three live clinic previews (Almost none / A little / Mostly my language) as app-style input/output chats, then asks the preference question._

### Q60. `mix_preference`

How much of your first language do you want in the tool?

**Type:** single

- [ ] Almost none
- [ ] A little
- [ ] About half
- [ ] Mostly my language
- [ ] Not sure
- [ ] Other

### Q61. `mix_preference_other`

Describe how much mixing you want

*Shown only when a prior answer matches the survey logic.*

**Type:** text

*(open text)*

## Page: If something like NAVI existed

_A few questions about what would actually be useful to you. There are no right answers._

### Q62. `practice_situations`

Which of these would you actually open an app to practice?

*Choose every one that applies.*

**Type:** multi

- [ ] Buying groceries and asking staff where something is
- [ ] Ordering food at a counter or a restaurant
- [ ] Buying a bus ticket or asking about a route
- [ ] Filling out a form for housing, health or campus paperwork
- [ ] Talking to a doctor or someone at a clinic
- [ ] Asking a professor a question after class
- [ ] Speaking up in a class discussion or a group project
- [ ] Making small talk with a classmate before class starts
- [ ] A phone call where you cannot see the person
- [ ] Following humor, sarcasm or slang in a group
- [ ] None of these

### Q63. `practice_mode`

How would you want to practice?

**Type:** single

- [ ] Typing
- [ ] Talking out loud
- [ ] Both
- [ ] Not sure

### Q64. `practice_when`

When would help be most useful?

**Type:** single

- [ ] Practicing beforehand, on my phone
- [ ] Quiet help during the situation, for example through earbuds
- [ ] Both
- [ ] Neither

### Q65. `pain_points`

What gets in the way most when you have to use English in real life?

*Choose every one that applies.*

**Type:** multi

- [ ] I get stuck for a word
- [ ] I am afraid of looking stupid
- [ ] I cannot practice before the real situation
- [ ] I do not understand what people say back
- [ ] I am too nervous to speak
- [ ] I do not have time to practice
- [ ] Other

### Q66. `pain_points_other`

What else gets in the way?

*Shown only when a prior answer matches the survey logic.*

**Type:** text

*(open text)*

### Q67. `irresistible_text`

What would make you actually open this every week?

*Be specific. There is no wrong answer.*

**Type:** longtext

*(open text)*

### Q68. `would_pay`

Would you pay for an app like this?

**Type:** single

- [ ] No, only if it were free
- [ ] Maybe
- [ ] Yes

### Q69. `pay_amount`

What is the most you would pay per month?

*Shown only when a prior answer matches the survey logic.*

**Type:** single

- [ ] Less than $3
- [ ] $3 to $5
- [ ] $5 to $10
- [ ] $10 to $15
- [ ] More than $15

## Page: When it goes wrong

### Q70. `coping`

When you get stuck in one of those situations, what do you usually do?

*Choose every one that applies.*

**Type:** multi

- [ ] Use a translation app
- [ ] Ask a friend or family member to help
- [ ] Use gestures or point
- [ ] Give up and leave
- [ ] Push through and hope for the best
- [ ] Avoid the situation next time

### Q71. `tools_used`

What do you use now to help with English?

*Choose every one that applies.*

**Type:** multi

- [ ] Google Translate or similar
- [ ] ChatGPT or another AI chatbot
- [ ] A dictionary app
- [ ] A language learning app
- [ ] A person I know
- [ ] Nothing

### Q72. `tools_freq`

How often do you use those?

**Type:** single

- [ ] Never
- [ ] Rarely
- [ ] Weekly
- [ ] Daily
- [ ] Many times a day

## Page: In your own words

_Both questions are optional._

### Q73. `incident_text`

Think of one time in the last month when language got in the way. What happened?

*Write as much or as little as you want, in any language.*

**Type:** longtext

*(open text)*

### Q74. `wish_text`

Is there anything you wish existed that would have helped?

**Type:** longtext

*(open text)*

## Page: Contact (separate Qualtrics survey)

_Stored only in the contact survey. Fields: `contact_email`, `interview_ok`, `beta_ok` plus `participant_id`._

_These are optional. Anything here is stored separately from your answers and deleted when the study ends._

### Q75. `interview_ok`

Would you be willing to talk for 30 to 45 minutes about this?

**Type:** yesno

- [ ] Yes
- [ ] No

### Q76. `beta_ok`

Would you be willing to try an early version of NAVI later this year?

**Type:** yesno

- [ ] Yes
- [ ] No

### Q77. `contact_email`

What is the best email to reach you at?

*Shown only when a prior answer matches the survey logic.*

**Type:** text

*(open text)*

## Session metadata (survey response)

- `situation_order`
- `participant_id`
- `play_number`
- `started_at`
- `completed_at`
- `duration_sec`

## Complete embedded-data field list (survey response)

```
consent
enrolled_scsu
age_18_plus
arrival_month
arrival_year
participant_group
first_language
first_language_other
english_speaking
english_listening
english_reading
groceries_freq
groceries_diff
groceries_stress
groceries_avoid
ordering_freq
ordering_diff
ordering_stress
ordering_avoid
transit_freq
transit_diff
transit_stress
transit_avoid
forms_freq
forms_diff
forms_stress
forms_avoid
clinic_freq
clinic_diff
clinic_stress
clinic_avoid
professor_freq
professor_diff
professor_stress
professor_avoid
classtalk_freq
classtalk_diff
classtalk_stress
classtalk_avoid
smalltalk_freq
smalltalk_diff
smalltalk_stress
smalltalk_avoid
phone_freq
phone_diff
phone_stress
phone_avoid
humor_freq
humor_diff
humor_stress
humor_avoid
navi_shown
navi_clinic_order
navi_clinic_none_understand
navi_clinic_none_natural
navi_clinic_light_understand
navi_clinic_light_natural
navi_clinic_heavy_understand
navi_clinic_heavy_natural
navi_clinic_pref
navi_clinic_use
navi_professor_order
navi_professor_none_understand
navi_professor_none_natural
navi_professor_light_understand
navi_professor_light_natural
navi_professor_heavy_understand
navi_professor_heavy_natural
navi_professor_pref
navi_professor_use
navi_ordering_order
navi_ordering_none_understand
navi_ordering_none_natural
navi_ordering_light_understand
navi_ordering_light_natural
navi_ordering_heavy_understand
navi_ordering_heavy_natural
navi_ordering_pref
navi_ordering_use
navi_smalltalk_order
navi_smalltalk_none_understand
navi_smalltalk_none_natural
navi_smalltalk_light_understand
navi_smalltalk_light_natural
navi_smalltalk_heavy_understand
navi_smalltalk_heavy_natural
navi_smalltalk_pref
navi_smalltalk_use
navi_transit_order
navi_transit_none_understand
navi_transit_none_natural
navi_transit_light_understand
navi_transit_light_natural
navi_transit_heavy_understand
navi_transit_heavy_natural
navi_transit_pref
navi_transit_use
mix_preference
mix_preference_other
practice_situations
practice_mode
practice_when
pain_points
pain_points_other
irresistible_text
would_pay
pay_amount
coping
tools_used
tools_freq
incident_text
wish_text
situation_order
participant_id
play_number
started_at
completed_at
duration_sec
```

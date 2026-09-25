# NAVI Phase 1 survey — full question instrument (v2)

Generated from `src/data/questions.js` and `public/conversations/`.  
Regenerate with `npm run questions-md`.

This file includes **every** NAVI example exchange in every supported language so an advisor can read the instrument without running the app.

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

### NAVI situation: Talking to a doctor or someone at a clinic (`clinic`)

#### Version content — English only (no mixing) (`none`, language `en`)

_Shared by every language that has Block 14._

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: Okay, thank you for telling me. Is the pain sharp, or more like a dull ache?
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: It is probably not serious, but I want to check. Drink water, rest, and come back if the pain gets worse or you get a fever.

#### Version content — Light mixing of the first language (`light`, Chinese (Mandarin) / `zh`)

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: Okay, 谢谢你告诉我。Is the pain sharp, or more like a dull ache?
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: It is probably not serious, 但我想检查一下。Drink water, rest, and come back if the pain gets worse or 发烧了。

#### Version content — Heavy mixing of the first language (`heavy`, Chinese (Mandarin) / `zh`)

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: 好的，谢谢你告诉我。疼痛是刺痛，还是更像 dull ache？
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: 应该不严重，但我想检查一下。多喝水，好好休息，and come back if the pain gets worse or you get a fever.

#### Version content — Light mixing of the first language (`light`, French / `fr`)

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: Okay, merci de me le dire. Is the pain sharp, or more like a dull ache?
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: It is probably not serious, mais je veux vérifier. Drink water, rest, and come back if the pain gets worse or you get de la fièvre.

#### Version content — Heavy mixing of the first language (`heavy`, French / `fr`)

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: D’accord, merci de me le dire. La douleur est aiguë, ou plutôt comme un dull ache ?
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: Ce n’est probablement pas grave, mais je veux vérifier. Buvez de l’eau, reposez-vous, and come back if the pain gets worse or you get a fever.

#### Version content — Light mixing of the first language (`light`, German / `de`)

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: Okay, danke, dass Sie es mir sagen. Is the pain sharp, or more like a dull ache?
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: It is probably not serious, aber ich möchte es prüfen. Drink water, rest, and come back if the pain gets worse or you get Fieber.

#### Version content — Heavy mixing of the first language (`heavy`, German / `de`)

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: Okay, danke, dass Sie es mir sagen. Ist der Schmerz stechend, oder eher wie ein dull ache?
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: Es ist wahrscheinlich nicht schlimm, aber ich möchte es prüfen. Trinken Sie Wasser, ruhen Sie sich aus, and come back if the pain gets worse or you get a fever.

#### Version content — Light mixing of the first language (`light`, Hindi / `hi`)

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: Okay, बताने के लिए शुक्रिया। Is the pain sharp, or more like a dull ache?
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: It is probably not serious, लेकिन मैं एक बार देखना चाहता हूँ। Drink water, rest, and come back if the pain gets worse या बुखार आए।

#### Version content — Heavy mixing of the first language (`heavy`, Hindi / `hi`)

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: ठीक है, बताने के लिए शुक्रिया। दर्द तेज़ चुभने वाला है, या ज़्यादा dull ache जैसा?
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: शायद कुछ गंभीर नहीं है, लेकिन मैं एक बार देखना चाहता हूँ। पानी पीजिए, आराम कीजिए, and come back if the pain gets worse or you get a fever.

#### Version content — Light mixing of the first language (`light`, Japanese / `ja`)

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: Okay, 教えてくれてありがとうございます。Is the pain sharp, or more like a dull ache?
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: It is probably not serious, でも確認したいです。Drink water, rest, and come back if the pain gets worse, または熱が出たら。

#### Version content — Heavy mixing of the first language (`heavy`, Japanese / `ja`)

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: わかりました、教えてくれてありがとうございます。痛みは鋭い感じですか、それとも dull ache のような感じですか？
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: たぶん深刻ではないですが、確認したいです。水を飲んで、休んで、come back if the pain gets worse or you get a fever.

#### Version content — Light mixing of the first language (`light`, Korean / `ko`)

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: Okay, 말씀해 주셔서 감사합니다. Is the pain sharp, or more like a dull ache?
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: It is probably not serious, 하지만 확인하고 싶어요. Drink water, rest, and come back if the pain gets worse or 열이 나면요.

#### Version content — Heavy mixing of the first language (`heavy`, Korean / `ko`)

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: 네, 말씀해 주셔서 감사합니다. 통증이 찌르는 듯한가요, 아니면 dull ache 같은 느낌인가요?
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: 아마 심각하진 않지만 확인하고 싶어요. 물 마시고 푹 쉬세요, and come back if the pain gets worse or you get a fever.

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

#### Version content — Light mixing of the first language (`light`, Russian / `ru`)

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: Okay, спасибо, что сказали. Is the pain sharp, or more like a dull ache?
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: It is probably not serious, но я хочу проверить. Drink water, rest, and come back if the pain gets worse или появится температура.

#### Version content — Heavy mixing of the first language (`heavy`, Russian / `ru`)

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: Хорошо, спасибо, что сказали. Боль острая, или больше похожа на dull ache?
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: Скорее всего, ничего серьёзного, но я хочу проверить. Пейте воду, отдыхайте, and come back if the pain gets worse or you get a fever.

#### Version content — Light mixing of the first language (`light`, Spanish / `es`)

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: Okay, gracias por decírmelo. Is the pain sharp, or more like a dull ache?
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: It is probably not serious, pero quiero revisarlo. Drink water, rest, and come back if the pain gets worse or you get fiebre.

#### Version content — Heavy mixing of the first language (`heavy`, Spanish / `es`)

- **You (input)**: I have a pain here, in my stomach. Since yesterday.
- **NAVI (output)**: Está bien, gracias por decírmelo. ¿El dolor es agudo, o más como un dull ache?
- **You (input)**: Is it serious? What should I do?
- **NAVI (output)**: Probablemente no es grave, pero quiero revisarlo. Toma agua, descansa, y regresa if the pain gets worse or you get a fever.

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

### NAVI situation: Asking a professor a question after class (`professor`)

#### Version content — English only (no mixing) (`none`, language `en`)

_Shared by every language that has Block 14._

- **You (input)**: Excuse me, do you have a minute? I did not understand the part about the deadline.
- **NAVI (output)**: Of course. The paper is due Friday at midnight, but you can ask for an extension if you need one.
- **You (input)**: So can I submit it on Monday?
- **NAVI (output)**: Only if you email me before Friday and ask for an extension. Just explain why, and I will usually say yes.

#### Version content — Light mixing of the first language (`light`, Chinese (Mandarin) / `zh`)

- **You (input)**: Excuse me, do you have a minute? I did not understand the part about the deadline.
- **NAVI (output)**: Of course. The paper is due Friday 午夜, but you can ask for an extension if you need one.
- **You (input)**: So can I submit it on Monday?
- **NAVI (output)**: Only if you email me 周五之前 and ask for an extension. Just explain why, and I will usually say yes.

#### Version content — Heavy mixing of the first language (`heavy`, Chinese (Mandarin) / `zh`)

- **You (input)**: Excuse me, do you have a minute? I did not understand the part about the deadline.
- **NAVI (output)**: 当然。论文周五午夜截止，but you can ask for an extension，如果你需要的话。
- **You (input)**: So can I submit it on Monday?
- **NAVI (output)**: 只要你周五之前给我发邮件 and ask for an extension 就行。说明一下原因，我一般都会同意。

#### Version content — Light mixing of the first language (`light`, French / `fr`)

- **You (input)**: Excuse me, do you have a minute? I did not understand the part about the deadline.
- **NAVI (output)**: Of course. The paper is due Friday à minuit, but you can ask for an extension if you need one.
- **You (input)**: So can I submit it on Monday?
- **NAVI (output)**: Only if you email me avant vendredi and ask for an extension. Just explain why, and I will usually say yes.

#### Version content — Heavy mixing of the first language (`heavy`, French / `fr`)

- **You (input)**: Excuse me, do you have a minute? I did not understand the part about the deadline.
- **NAVI (output)**: Bien sûr. Le devoir est à rendre vendredi à minuit, but you can ask for an extension si vous en avez besoin.
- **You (input)**: So can I submit it on Monday?
- **NAVI (output)**: Seulement si vous m’envoyez un e-mail avant vendredi and ask for an extension. Expliquez-moi pourquoi, et en général je dis oui.

#### Version content — Light mixing of the first language (`light`, German / `de`)

- **You (input)**: Excuse me, do you have a minute? I did not understand the part about the deadline.
- **NAVI (output)**: Of course. The paper is due Friday um Mitternacht, but you can ask for an extension if you need one.
- **You (input)**: So can I submit it on Monday?
- **NAVI (output)**: Only if you email me vor Freitag and ask for an extension. Just explain why, and I will usually say yes.

#### Version content — Heavy mixing of the first language (`heavy`, German / `de`)

- **You (input)**: Excuse me, do you have a minute? I did not understand the part about the deadline.
- **NAVI (output)**: Natürlich. Die Arbeit ist Freitag um Mitternacht fällig, but you can ask for an extension, wenn Sie eine brauchen.
- **You (input)**: So can I submit it on Monday?
- **NAVI (output)**: Nur wenn Sie mir vor Freitag eine E-Mail schreiben and ask for an extension. Erklären Sie mir kurz, warum, und normalerweise sage ich ja.

#### Version content — Light mixing of the first language (`light`, Hindi / `hi`)

- **You (input)**: Excuse me, do you have a minute? I did not understand the part about the deadline.
- **NAVI (output)**: Of course. The paper is due Friday आधी रात तक, but you can ask for an extension if you need one.
- **You (input)**: So can I submit it on Monday?
- **NAVI (output)**: Only if you email me शुक्रवार से पहले and ask for an extension. Just explain why, and I will usually say yes.

#### Version content — Heavy mixing of the first language (`heavy`, Hindi / `hi`)

- **You (input)**: Excuse me, do you have a minute? I did not understand the part about the deadline.
- **NAVI (output)**: बिल्कुल। पेपर शुक्रवार आधी रात तक जमा करना है, but you can ask for an extension अगर ज़रूरत हो।
- **You (input)**: So can I submit it on Monday?
- **NAVI (output)**: बस शुक्रवार से पहले मुझे email कीजिए and ask for an extension. वजह बता दीजिए, आमतौर पर मैं हाँ कह देता हूँ।

#### Version content — Light mixing of the first language (`light`, Japanese / `ja`)

- **You (input)**: Excuse me, do you have a minute? I did not understand the part about the deadline.
- **NAVI (output)**: Of course. The paper is due Friday の夜12時, but you can ask for an extension if you need one.
- **You (input)**: So can I submit it on Monday?
- **NAVI (output)**: Only if you email me 金曜日までに and ask for an extension. Just explain why, and I will usually say yes.

#### Version content — Heavy mixing of the first language (`heavy`, Japanese / `ja`)

- **You (input)**: Excuse me, do you have a minute? I did not understand the part about the deadline.
- **NAVI (output)**: もちろん。レポートの締め切りは金曜日の夜12時です。But you can ask for an extension、必要なら。
- **You (input)**: So can I submit it on Monday?
- **NAVI (output)**: 金曜日までにメールして ask for an extension してください。理由を説明してくれれば、たいていOKします。

#### Version content — Light mixing of the first language (`light`, Korean / `ko`)

- **You (input)**: Excuse me, do you have a minute? I did not understand the part about the deadline.
- **NAVI (output)**: Of course. The paper is due Friday 자정까지, but you can ask for an extension if you need one.
- **You (input)**: So can I submit it on Monday?
- **NAVI (output)**: Only if you email me 금요일 전에 and ask for an extension. Just explain why, and I will usually say yes.

#### Version content — Heavy mixing of the first language (`heavy`, Korean / `ko`)

- **You (input)**: Excuse me, do you have a minute? I did not understand the part about the deadline.
- **NAVI (output)**: 물론이죠. 과제는 금요일 자정까지 제출이에요. But you can ask for an extension, 필요하면요.
- **You (input)**: So can I submit it on Monday?
- **NAVI (output)**: 금요일 전에 이메일로 ask for an extension 하면 돼요. 이유만 설명해 주면 보통 괜찮다고 해요.

#### Version content — Light mixing of the first language (`light`, Nepali / `ne`)

- **You (input)**: Excuse me, do you have a minute? I did not understand the part about the deadline.
- **NAVI (output)**: Of course. The paper is due Friday मध्यरातसम्म, but you can ask for an extension if you need one.
- **You (input)**: So can I submit it on Monday?
- **NAVI (output)**: Only if you email me शुक्रबार अघि and ask for an extension. Just explain why, and I will usually say yes.

#### Version content — Heavy mixing of the first language (`heavy`, Nepali / `ne`)

- **You (input)**: Excuse me, do you have a minute? I did not understand the part about the deadline.
- **NAVI (output)**: पक्कै पनि। पेपर शुक्रबार मध्यरातसम्म बुझाउनुपर्छ, but you can ask for an extension चाहिएमा।
- **You (input)**: So can I submit it on Monday?
- **NAVI (output)**: शुक्रबार अघि मलाई email गरेर ask for an extension गर्नुहोस्। कारण बताउनुभयो भने म प्रायः हुन्छ भन्छु।

#### Version content — Light mixing of the first language (`light`, Russian / `ru`)

- **You (input)**: Excuse me, do you have a minute? I did not understand the part about the deadline.
- **NAVI (output)**: Of course. The paper is due Friday в полночь, but you can ask for an extension if you need one.
- **You (input)**: So can I submit it on Monday?
- **NAVI (output)**: Only if you email me до пятницы and ask for an extension. Just explain why, and I will usually say yes.

#### Version content — Heavy mixing of the first language (`heavy`, Russian / `ru`)

- **You (input)**: Excuse me, do you have a minute? I did not understand the part about the deadline.
- **NAVI (output)**: Конечно. Работу нужно сдать в пятницу в полночь, but you can ask for an extension, если нужно.
- **You (input)**: So can I submit it on Monday?
- **NAVI (output)**: Только если напишете мне письмо до пятницы and ask for an extension. Просто объясните причину, и обычно я соглашаюсь.

#### Version content — Light mixing of the first language (`light`, Spanish / `es`)

- **You (input)**: Excuse me, do you have a minute? I did not understand the part about the deadline.
- **NAVI (output)**: Of course. The paper is due Friday a la medianoche, but you can ask for an extension if you need one.
- **You (input)**: So can I submit it on Monday?
- **NAVI (output)**: Only if you email me antes del viernes and ask for an extension. Just explain why, and I will usually say yes.

#### Version content — Heavy mixing of the first language (`heavy`, Spanish / `es`)

- **You (input)**: Excuse me, do you have a minute? I did not understand the part about the deadline.
- **NAVI (output)**: Claro. El trabajo se entrega el viernes a la medianoche, but you can ask for an extension si la necesitas.
- **You (input)**: So can I submit it on Monday?
- **NAVI (output)**: Solo si me escribes un correo antes del viernes and ask for an extension. Explícame por qué, y normalmente digo que sí.

#### Questions after the three versions

### Q60. `navi_professor_none_understand`

How well did you understand Version [A/B/C mapped to none]?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely

### Q61. `navi_professor_none_natural`

How natural does NAVI sound in Version [A/B/C mapped to none]?

**Type:** single

- [ ] Not at all natural
- [ ] Slightly
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely natural

### Q62. `navi_professor_light_understand`

How well did you understand Version [A/B/C mapped to light]?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely

### Q63. `navi_professor_light_natural`

How natural does NAVI sound in Version [A/B/C mapped to light]?

**Type:** single

- [ ] Not at all natural
- [ ] Slightly
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely natural

### Q64. `navi_professor_heavy_understand`

How well did you understand Version [A/B/C mapped to heavy]?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely

### Q65. `navi_professor_heavy_natural`

How natural does NAVI sound in Version [A/B/C mapped to heavy]?

**Type:** single

- [ ] Not at all natural
- [ ] Slightly
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely natural

### Q66. `navi_professor_pref`

Which version would help you most in this situation?

*Stored as the mixing level (`none` / `light` / `heavy`), not the letter.*

**Type:** single

- [ ] Version A
- [ ] Version B
- [ ] Version C

### Q67. `navi_professor_use`

If NAVI talked to you like the version you chose, would you use it to practice before this situation?

**Type:** single

- [ ] No
- [ ] Maybe
- [ ] Yes

### NAVI situation: Ordering food at a counter or a restaurant (`ordering`)

#### Version content — English only (no mixing) (`none`, language `en`)

_Shared by every language that has Block 14._

- **You (input)**: Hi, can I get the chicken sandwich?
- **NAVI (output)**: Sure. Do you want that as a combo, with fries and a drink?
- **You (input)**: What is a combo?
- **NAVI (output)**: It means the sandwich, fries and a drink together for one price. It is usually cheaper.

#### Version content — Light mixing of the first language (`light`, Chinese (Mandarin) / `zh`)

- **You (input)**: Hi, can I get the chicken sandwich?
- **NAVI (output)**: Sure. Do you want that as a combo, 配薯条和饮料？
- **You (input)**: What is a combo?
- **NAVI (output)**: It means the sandwich, fries and a drink 一起, for one price. It is usually 更便宜。

#### Version content — Heavy mixing of the first language (`heavy`, Chinese (Mandarin) / `zh`)

- **You (input)**: Hi, can I get the chicken sandwich?
- **NAVI (output)**: 好的。要做成 combo 吗？配薯条和饮料。
- **You (input)**: What is a combo?
- **NAVI (output)**: Combo 就是三明治、薯条和饮料一起，一个价格。Usually it is cheaper.

#### Version content — Light mixing of the first language (`light`, French / `fr`)

- **You (input)**: Hi, can I get the chicken sandwich?
- **NAVI (output)**: Sure. Do you want that as a combo, avec des frites et une boisson ?
- **You (input)**: What is a combo?
- **NAVI (output)**: It means the sandwich, fries and a drink ensemble, for one price. It is usually moins cher.

#### Version content — Heavy mixing of the first language (`heavy`, French / `fr`)

- **You (input)**: Hi, can I get the chicken sandwich?
- **NAVI (output)**: Bien sûr. Vous le voulez en combo, avec des frites et une boisson ?
- **You (input)**: What is a combo?
- **NAVI (output)**: Un combo, c’est le sandwich, les frites et la boisson ensemble pour un seul prix. Usually it is cheaper.

#### Version content — Light mixing of the first language (`light`, German / `de`)

- **You (input)**: Hi, can I get the chicken sandwich?
- **NAVI (output)**: Sure. Do you want that as a combo, mit Pommes und einem Getränk?
- **You (input)**: What is a combo?
- **NAVI (output)**: It means the sandwich, fries and a drink zusammen, for one price. It is usually günstiger.

#### Version content — Heavy mixing of the first language (`heavy`, German / `de`)

- **You (input)**: Hi, can I get the chicken sandwich?
- **NAVI (output)**: Klar. Möchtest du das als combo, mit Pommes und einem Getränk?
- **You (input)**: What is a combo?
- **NAVI (output)**: Ein combo heißt Sandwich, Pommes und Getränk zusammen für einen Preis. Usually it is cheaper.

#### Version content — Light mixing of the first language (`light`, Hindi / `hi`)

- **You (input)**: Hi, can I get the chicken sandwich?
- **NAVI (output)**: Sure. Do you want that as a combo, फ्राइज़ और ड्रिंक के साथ?
- **You (input)**: What is a combo?
- **NAVI (output)**: It means the sandwich, fries and a drink एक साथ, for one price. It is usually सस्ता पड़ता है।

#### Version content — Heavy mixing of the first language (`heavy`, Hindi / `hi`)

- **You (input)**: Hi, can I get the chicken sandwich?
- **NAVI (output)**: ज़रूर। क्या आप इसे combo में लेना चाहेंगे, फ्राइज़ और ड्रिंक के साथ?
- **You (input)**: What is a combo?
- **NAVI (output)**: Combo का मतलब है सैंडविच, फ्राइज़ और ड्रिंक एक साथ, एक ही दाम में। Usually it is cheaper.

#### Version content — Light mixing of the first language (`light`, Japanese / `ja`)

- **You (input)**: Hi, can I get the chicken sandwich?
- **NAVI (output)**: Sure. Do you want that as a combo, ポテトとドリンク付きで？
- **You (input)**: What is a combo?
- **NAVI (output)**: It means the sandwich, fries and a drink セットで, for one price. It is usually お得です。

#### Version content — Heavy mixing of the first language (`heavy`, Japanese / `ja`)

- **You (input)**: Hi, can I get the chicken sandwich?
- **NAVI (output)**: かしこまりました。combo にしますか？ポテトとドリンクが付きます。
- **You (input)**: What is a combo?
- **NAVI (output)**: Combo は、サンドイッチとポテトとドリンクがセットで一つの値段です。Usually it is cheaper.

#### Version content — Light mixing of the first language (`light`, Korean / `ko`)

- **You (input)**: Hi, can I get the chicken sandwich?
- **NAVI (output)**: Sure. Do you want that as a combo, 감자튀김이랑 음료랑 같이?
- **You (input)**: What is a combo?
- **NAVI (output)**: It means the sandwich, fries and a drink 같이, for one price. It is usually 더 싸요.

#### Version content — Heavy mixing of the first language (`heavy`, Korean / `ko`)

- **You (input)**: Hi, can I get the chicken sandwich?
- **NAVI (output)**: 네. combo로 하시겠어요? 감자튀김이랑 음료가 같이 나와요.
- **You (input)**: What is a combo?
- **NAVI (output)**: Combo는 샌드위치, 감자튀김, 음료를 한 가격에 같이 주는 거예요. Usually it is cheaper.

#### Version content — Light mixing of the first language (`light`, Nepali / `ne`)

- **You (input)**: Hi, can I get the chicken sandwich?
- **NAVI (output)**: Sure. Do you want that as a combo, फ्राइज र ड्रिंकसँग?
- **You (input)**: What is a combo?
- **NAVI (output)**: It means the sandwich, fries and a drink सँगै, for one price. It is usually सस्तो पर्छ।

#### Version content — Heavy mixing of the first language (`heavy`, Nepali / `ne`)

- **You (input)**: Hi, can I get the chicken sandwich?
- **NAVI (output)**: हुन्छ। यसलाई combo मा लिनुहुन्छ, फ्राइज र ड्रिंकसँग?
- **You (input)**: What is a combo?
- **NAVI (output)**: Combo भनेको स्यान्डविच, फ्राइज र ड्रिंक सँगै एउटै मूल्यमा। Usually it is cheaper.

#### Version content — Light mixing of the first language (`light`, Russian / `ru`)

- **You (input)**: Hi, can I get the chicken sandwich?
- **NAVI (output)**: Sure. Do you want that as a combo, с картошкой фри и напитком?
- **You (input)**: What is a combo?
- **NAVI (output)**: It means the sandwich, fries and a drink вместе, for one price. It is usually дешевле.

#### Version content — Heavy mixing of the first language (`heavy`, Russian / `ru`)

- **You (input)**: Hi, can I get the chicken sandwich?
- **NAVI (output)**: Конечно. Хотите это как combo, с картошкой фри и напитком?
- **You (input)**: What is a combo?
- **NAVI (output)**: Combo значит сэндвич, картошка и напиток вместе за одну цену. Usually it is cheaper.

#### Version content — Light mixing of the first language (`light`, Spanish / `es`)

- **You (input)**: Hi, can I get the chicken sandwich?
- **NAVI (output)**: Sure. Do you want that as a combo, con papas fritas y una bebida?
- **You (input)**: What is a combo?
- **NAVI (output)**: It means the sandwich, fries and a drink juntos, for one price. It is usually más barato.

#### Version content — Heavy mixing of the first language (`heavy`, Spanish / `es`)

- **You (input)**: Hi, can I get the chicken sandwich?
- **NAVI (output)**: Claro. ¿Lo quieres como combo, con papas fritas y una bebida?
- **You (input)**: What is a combo?
- **NAVI (output)**: Combo significa el sándwich, las papas y la bebida juntos por un solo precio. Usually it is cheaper.

#### Questions after the three versions

### Q68. `navi_ordering_none_understand`

How well did you understand Version [A/B/C mapped to none]?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely

### Q69. `navi_ordering_none_natural`

How natural does NAVI sound in Version [A/B/C mapped to none]?

**Type:** single

- [ ] Not at all natural
- [ ] Slightly
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely natural

### Q70. `navi_ordering_light_understand`

How well did you understand Version [A/B/C mapped to light]?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely

### Q71. `navi_ordering_light_natural`

How natural does NAVI sound in Version [A/B/C mapped to light]?

**Type:** single

- [ ] Not at all natural
- [ ] Slightly
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely natural

### Q72. `navi_ordering_heavy_understand`

How well did you understand Version [A/B/C mapped to heavy]?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely

### Q73. `navi_ordering_heavy_natural`

How natural does NAVI sound in Version [A/B/C mapped to heavy]?

**Type:** single

- [ ] Not at all natural
- [ ] Slightly
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely natural

### Q74. `navi_ordering_pref`

Which version would help you most in this situation?

*Stored as the mixing level (`none` / `light` / `heavy`), not the letter.*

**Type:** single

- [ ] Version A
- [ ] Version B
- [ ] Version C

### Q75. `navi_ordering_use`

If NAVI talked to you like the version you chose, would you use it to practice before this situation?

**Type:** single

- [ ] No
- [ ] Maybe
- [ ] Yes

### NAVI situation: Making small talk with a classmate before class starts (`smalltalk`)

#### Version content — English only (no mixing) (`none`, language `en`)

_Shared by every language that has Block 14._

- **You (input)**: It is really cold today.
- **NAVI (output)**: I know, right? I was not ready for it. Did you just move here?
- **You (input)**: Is it always like this here?
- **NAVI (output)**: Honestly, this is nothing. Wait until January. You will want a real winter coat.

#### Version content — Light mixing of the first language (`light`, Chinese (Mandarin) / `zh`)

- **You (input)**: It is really cold today.
- **NAVI (output)**: I know, right? 我完全没准备好。Did you just move here?
- **You (input)**: Is it always like this here?
- **NAVI (output)**: Honestly, 这还不算什么。Wait until January. You will want a real winter coat.

#### Version content — Heavy mixing of the first language (`heavy`, Chinese (Mandarin) / `zh`)

- **You (input)**: It is really cold today.
- **NAVI (output)**: I know, right? 我完全没做好心理准备。你是刚搬来的吗？
- **You (input)**: Is it always like this here?
- **NAVI (output)**: 说实话，这还不算什么。等到一月份吧。You will want a real winter coat.

#### Version content — Light mixing of the first language (`light`, French / `fr`)

- **You (input)**: It is really cold today.
- **NAVI (output)**: I know, right? Je n’étais pas prêt. Did you just move here?
- **You (input)**: Is it always like this here?
- **NAVI (output)**: Honestly, ce n’est rien. Wait until January. You will want a real winter coat.

#### Version content — Heavy mixing of the first language (`heavy`, French / `fr`)

- **You (input)**: It is really cold today.
- **NAVI (output)**: I know, right? Je n’étais pas prêt pour ça. Tu viens d’arriver ici ?
- **You (input)**: Is it always like this here?
- **NAVI (output)**: Franchement, ce n’est rien. Attends janvier. You will want a real winter coat.

#### Version content — Light mixing of the first language (`light`, German / `de`)

- **You (input)**: It is really cold today.
- **NAVI (output)**: I know, right? Darauf war ich nicht vorbereitet. Did you just move here?
- **You (input)**: Is it always like this here?
- **NAVI (output)**: Honestly, das ist noch gar nichts. Wait until January. You will want a real winter coat.

#### Version content — Heavy mixing of the first language (`heavy`, German / `de`)

- **You (input)**: It is really cold today.
- **NAVI (output)**: I know, right? Darauf war ich echt nicht vorbereitet. Bist du gerade erst hergezogen?
- **You (input)**: Is it always like this here?
- **NAVI (output)**: Ehrlich gesagt ist das noch gar nichts. Warte mal bis Januar. You will want a real winter coat.

#### Version content — Light mixing of the first language (`light`, Hindi / `hi`)

- **You (input)**: It is really cold today.
- **NAVI (output)**: I know, right? मैं इसके लिए तैयार ही नहीं था। Did you just move here?
- **You (input)**: Is it always like this here?
- **NAVI (output)**: Honestly, ये तो कुछ भी नहीं है। Wait until January. You will want a real winter coat.

#### Version content — Heavy mixing of the first language (`heavy`, Hindi / `hi`)

- **You (input)**: It is really cold today.
- **NAVI (output)**: I know, right? मैं तो बिल्कुल तैयार नहीं था। तुम अभी-अभी यहाँ आए हो क्या?
- **You (input)**: Is it always like this here?
- **NAVI (output)**: सच कहूँ तो ये कुछ भी नहीं है। जनवरी तक रुको। You will want a real winter coat.

#### Version content — Light mixing of the first language (`light`, Japanese / `ja`)

- **You (input)**: It is really cold today.
- **NAVI (output)**: I know, right? 全然準備してなかった。Did you just move here?
- **You (input)**: Is it always like this here?
- **NAVI (output)**: Honestly, これはまだ全然。Wait until January. You will want a real winter coat.

#### Version content — Heavy mixing of the first language (`heavy`, Japanese / `ja`)

- **You (input)**: It is really cold today.
- **NAVI (output)**: I know, right? 全然心の準備ができてなかったよ。最近ここに引っ越してきたの？
- **You (input)**: Is it always like this here?
- **NAVI (output)**: 正直、これはまだ序の口だよ。1月まで待ってみて。You will want a real winter coat.

#### Version content — Light mixing of the first language (`light`, Korean / `ko`)

- **You (input)**: It is really cold today.
- **NAVI (output)**: I know, right? 완전 준비 안 됐었어. Did you just move here?
- **You (input)**: Is it always like this here?
- **NAVI (output)**: Honestly, 이건 아무것도 아니야. Wait until January. You will want a real winter coat.

#### Version content — Heavy mixing of the first language (`heavy`, Korean / `ko`)

- **You (input)**: It is really cold today.
- **NAVI (output)**: I know, right? 진짜 마음의 준비가 안 됐었어. 여기 이사 온 지 얼마 안 됐어?
- **You (input)**: Is it always like this here?
- **NAVI (output)**: 솔직히 이건 아무것도 아니야. 1월까지 기다려 봐. You will want a real winter coat.

#### Version content — Light mixing of the first language (`light`, Nepali / `ne`)

- **You (input)**: It is really cold today.
- **NAVI (output)**: I know, right? म त यसको लागि तयार नै थिइनँ। Did you just move here?
- **You (input)**: Is it always like this here?
- **NAVI (output)**: Honestly, यो त केही पनि होइन। Wait until January. You will want a real winter coat.

#### Version content — Heavy mixing of the first language (`heavy`, Nepali / `ne`)

- **You (input)**: It is really cold today.
- **NAVI (output)**: I know, right? म त पटक्कै तयार थिइनँ। तिमी भर्खरै यहाँ सरेको हो?
- **You (input)**: Is it always like this here?
- **NAVI (output)**: साँचो भन्नुपर्दा यो त केही पनि होइन। जनवरीसम्म पर्ख। You will want a real winter coat.

#### Version content — Light mixing of the first language (`light`, Russian / `ru`)

- **You (input)**: It is really cold today.
- **NAVI (output)**: I know, right? Я был к этому не готов. Did you just move here?
- **You (input)**: Is it always like this here?
- **NAVI (output)**: Honestly, это ещё ничего. Wait until January. You will want a real winter coat.

#### Version content — Heavy mixing of the first language (`heavy`, Russian / `ru`)

- **You (input)**: It is really cold today.
- **NAVI (output)**: I know, right? Я вообще не был к этому готов. Ты только переехал сюда?
- **You (input)**: Is it always like this here?
- **NAVI (output)**: Честно, это ещё ничего. Подожди до января. You will want a real winter coat.

#### Version content — Light mixing of the first language (`light`, Spanish / `es`)

- **You (input)**: It is really cold today.
- **NAVI (output)**: I know, right? No estaba listo para esto. Did you just move here?
- **You (input)**: Is it always like this here?
- **NAVI (output)**: Honestly, esto no es nada. Wait until January. You will want a real winter coat.

#### Version content — Heavy mixing of the first language (`heavy`, Spanish / `es`)

- **You (input)**: It is really cold today.
- **NAVI (output)**: I know, right? No estaba listo para esto. ¿Te acabas de mudar aquí?
- **You (input)**: Is it always like this here?
- **NAVI (output)**: La verdad, esto no es nada. Espera hasta enero. You will want a real winter coat.

#### Questions after the three versions

### Q76. `navi_smalltalk_none_understand`

How well did you understand Version [A/B/C mapped to none]?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely

### Q77. `navi_smalltalk_none_natural`

How natural does NAVI sound in Version [A/B/C mapped to none]?

**Type:** single

- [ ] Not at all natural
- [ ] Slightly
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely natural

### Q78. `navi_smalltalk_light_understand`

How well did you understand Version [A/B/C mapped to light]?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely

### Q79. `navi_smalltalk_light_natural`

How natural does NAVI sound in Version [A/B/C mapped to light]?

**Type:** single

- [ ] Not at all natural
- [ ] Slightly
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely natural

### Q80. `navi_smalltalk_heavy_understand`

How well did you understand Version [A/B/C mapped to heavy]?

**Type:** single

- [ ] Not at all
- [ ] A little
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely

### Q81. `navi_smalltalk_heavy_natural`

How natural does NAVI sound in Version [A/B/C mapped to heavy]?

**Type:** single

- [ ] Not at all natural
- [ ] Slightly
- [ ] Somewhat
- [ ] Mostly
- [ ] Completely natural

### Q82. `navi_smalltalk_pref`

Which version would help you most in this situation?

*Stored as the mixing level (`none` / `light` / `heavy`), not the letter.*

**Type:** single

- [ ] Version A
- [ ] Version B
- [ ] Version C

### Q83. `navi_smalltalk_use`

If NAVI talked to you like the version you chose, would you use it to practice before this situation?

**Type:** single

- [ ] No
- [ ] Maybe
- [ ] Yes

## Page: How much of your language in the tool?

_Below is the same short clinic practice shown three ways — almost no mixing, a little, and mostly your language. Look at them, then tell us how much of your first language you would want in the tool._

_This page shows three live clinic previews (Almost none / A little / Mostly my language) as app-style input/output chats, then asks the preference question._

### Q84. `mix_preference`

How much of your first language do you want in the tool?

**Type:** single

- [ ] Almost none
- [ ] A little
- [ ] About half
- [ ] Mostly my language
- [ ] Not sure
- [ ] Other

### Q85. `mix_preference_other`

Describe how much mixing you want

*Shown only when a prior answer matches the survey logic.*

**Type:** text

*(open text)*

## Page: If something like NAVI existed

_A few questions about what would actually be useful to you. There are no right answers._

### Q86. `practice_situations`

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

### Q87. `practice_mode`

How would you want to practice?

**Type:** single

- [ ] Typing
- [ ] Talking out loud
- [ ] Both
- [ ] Not sure

### Q88. `practice_when`

When would help be most useful?

**Type:** single

- [ ] Practicing beforehand, on my phone
- [ ] Quiet help during the situation, for example through earbuds
- [ ] Both
- [ ] Neither

### Q89. `pain_points`

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

### Q90. `pain_points_other`

What else gets in the way?

*Shown only when a prior answer matches the survey logic.*

**Type:** text

*(open text)*

### Q91. `irresistible_text`

What would make you actually open this every week?

*Be specific. There is no wrong answer.*

**Type:** longtext

*(open text)*

### Q92. `would_pay`

Would you pay for an app like this?

**Type:** single

- [ ] No, only if it were free
- [ ] Maybe
- [ ] Yes

### Q93. `pay_amount`

What is the most you would pay per month?

*Shown only when a prior answer matches the survey logic.*

**Type:** single

- [ ] Less than $3
- [ ] $3 to $5
- [ ] $5 to $10
- [ ] $10 to $15
- [ ] More than $15

## Page: When it goes wrong

### Q94. `coping`

When you get stuck in one of those situations, what do you usually do?

*Choose every one that applies.*

**Type:** multi

- [ ] Use a translation app
- [ ] Ask a friend or family member to help
- [ ] Use gestures or point
- [ ] Give up and leave
- [ ] Push through and hope for the best
- [ ] Avoid the situation next time

### Q95. `tools_used`

What do you use now to help with English?

*Choose every one that applies.*

**Type:** multi

- [ ] Google Translate or similar
- [ ] ChatGPT or another AI chatbot
- [ ] A dictionary app
- [ ] A language learning app
- [ ] A person I know
- [ ] Nothing

### Q96. `tools_freq`

How often do you use those?

**Type:** single

- [ ] Never
- [ ] Rarely
- [ ] Weekly
- [ ] Daily
- [ ] Many times a day

## Page: In your own words

_Both questions are optional._

### Q97. `incident_text`

Think of one time in the last month when language got in the way. What happened?

*Write as much or as little as you want, in any language.*

**Type:** longtext

*(open text)*

### Q98. `wish_text`

Is there anything you wish existed that would have helped?

**Type:** longtext

*(open text)*

## Page: Contact (separate Qualtrics survey)

_Stored only in the contact survey. Fields: `contact_email`, `interview_ok`, `beta_ok` plus `participant_id`._

_These are optional. Anything here is stored separately from your answers and deleted when the study ends._

### Q99. `interview_ok`

Would you be willing to talk for 30 to 45 minutes about this?

**Type:** yesno

- [ ] Yes
- [ ] No

### Q100. `beta_ok`

Would you be willing to try an early version of NAVI later this year?

**Type:** yesno

- [ ] Yes
- [ ] No

### Q101. `contact_email`

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

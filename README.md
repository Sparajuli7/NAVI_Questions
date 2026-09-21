# NAVI Phase 1 survey (version 2)

The survey for the NAVI Phase 1 study at St. Cloud State University.

**This app never calls an AI model.** The NAVI example conversations in Block 14
are generated once, ahead of time, saved as JSON files, and shown as fixed text.
Nothing a participant types is sent to any AI system. That is what keeps the study
an exempt survey under the IRB, and it means there is no API key or usage cost.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build
```

Node 18 or newer.

## Deploy

To keep the existing URL, replace the contents of the current repo with this
project and push. Vercel detects Vite on its own.

```bash
git rm -r --cached . -q
# copy these files over the old ones, then
git add -A
git commit -m "Rebuild survey, version 2"
git push
```

`index.html` has `noindex, nofollow` so the survey stays out of search results.

## What is in it

```
src/data/questions.js       every question, the one place they live
src/lib/flow.js             page order, random situations, Block 14 planning, gates
src/lib/conversations.js    loads the example conversation files
src/lib/recording.js        OFF by default, sends nothing until turned on
src/components/             pages and controls
public/conversations/       the example conversations and manifest.json
api/submit.js               sends responses to Qualtrics, only when recording is on
scripts/fields.mjs          prints every field name, for setting up Qualtrics
scripts/make-samples.mjs    writes the sample conversations for all nine languages
```

Flow: consent, screening, background, the 10 situations in random order, up to 2
NAVI example pages, product questions, coping and tools, open questions, contact.

Everyone rates the same 10 situations, so answers pool across the whole sample.
Only the NAVI example conversations change, to the person's first language.

Languages with conversations: Chinese (Mandarin, simplified), French, German, Hindi,
Japanese, Korean, Nepali, Russian, Spanish. Anyone who picks "Other" skips Block 14.

The product block asks which situations they would practice, typing or talking,
beforehand on a phone or in the moment through earbuds, whether they would pay, and
how much per month (only asked if they did not say no). The consent form discloses
that findings may inform a future product, since the researcher is a co-founder.

## Adding a language

1. Add it to `LANGUAGES` in `src/data/questions.js`, above "Other". Use a two-letter
   code, e.g. `{ code: 'vi', label: 'Vietnamese' }`.
2. Add its 8 conversation files to `public/conversations/`: each of `clinic`,
   `professor`, `ordering`, `smalltalk`, at `light` and `heavy`, e.g.
   `clinic_light_vi.json`. The English versions are shared by every language.
3. Add the 8 file names to `manifest.json`.
4. Push. Nothing else changes.

If a language is in the list but its files are missing, those participants simply
skip Block 14. The survey never breaks.

- Declining consent or failing screening ends the survey and records nothing.
- Block 14 only appears if the person's first language has conversation files. Each
  person sees 2 of the 4 NAVI situations at random, and the three versions appear in
  random order as A, B and C. Answers are stored by mixing level, not by letter.
- A crash shows an error message and a reload button, never a blank page.

## The sample conversations

`public/conversations/` currently holds **hand-written samples in all nine
languages** (76 files: 4 English plus 8 per language) so Block 14 can be tested.
They were written to show the format and the difference between light and heavy
mixing. They have not been checked by native speakers. Every one has `"sample": true`, and the app shows a warning label on
screen while that is set. They are not NAVI output and must be replaced.

To add real conversations, follow `NAVI_Example_Conversations_Guide.md`:

1. Save each one as `{situation}_{level}_{language}.json`, e.g. `clinic_light_ne.json`.
2. Add every file name, without `.json`, to `public/conversations/manifest.json`.
3. Make sure the language code matches the list in `src/data/questions.js`
   (`LANGUAGES`).
4. Remove `"sample": true` once a native speaker has checked it.

A language only gets Block 14 once all three versions exist for at least one
situation. Until then those participants skip it automatically.

## Recording answers

**Off by default.** While off, a test-mode banner shows at the top, nothing leaves the
browser, and the last page shows the exact response that would have been sent, with a
download button. Use that to check the data with Ghosh and Wilder.

Turn it on only after the IRB approves the protocol and the research office confirms
where the data may be stored.

The planned route is SCSU's Qualtrics (`stcloudstate.co1.qualtrics.com`):

1. In Qualtrics, create a survey with no questions. In Survey Flow, add an Embedded
   Data element containing every field printed by `npm run fields` under "Survey
   response fields".
2. Create a second, separate survey the same way for the contact fields. Emails must
   never be stored next to answers.
3. In Vercel, set `VITE_RECORDING=on`, `QUALTRICS_DATACENTER=co1`,
   `QUALTRICS_API_TOKEN`, `QUALTRICS_SURVEY_ID` and `QUALTRICS_CONTACT_SURVEY_ID`.
   Never commit these.
4. Redeploy, submit one test response, and confirm it appears in Qualtrics before
   anything goes out.

`api/submit.js` is written against the Qualtrics v3 create-response API but has
**not been tested against the SCSU account**. Treat step 4 as required.

The server only accepts field names from the master list, drops anything else, and
refuses a response without consent.

## Before it goes out

- [ ] IRB approval, and the protocol number added to `ConsentText.jsx`
- [ ] Consent text in the app matches the approved consent form word for word
- [ ] Real NAVI conversations in place, checked, `sample` flags removed
- [ ] Language list matches this year's intake
- [ ] Recording turned on and one test response confirmed in Qualtrics
- [ ] Test responses deleted from Qualtrics
- [ ] Taken end to end on a phone

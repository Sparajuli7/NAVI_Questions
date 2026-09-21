// Prints every field the survey can produce, one per line.
// Use this list to create the matching embedded data fields in Qualtrics.
import { allFieldIds, CONTACT_FIELDS } from '../src/data/questions.js'

console.log('# Survey response fields')
for (const id of allFieldIds()) console.log(id)
console.log('\n# Contact fields (separate Qualtrics survey)')
for (const id of ['participant_id', ...CONTACT_FIELDS]) console.log(id)

import { SITUATIONS, NAVI_SITUATIONS, NAVI_LEVELS, NAVI_PER_PERSON } from '../data/questions'

export function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function newSituationOrder() {
  return shuffle(SITUATIONS.map((s) => s.id))
}

/**
 * Decide which NAVI situations this person sees and in what version order.
 * Only situations with all three versions available in their language qualify.
 * Returns [] if their language has no conversations, which skips Block 14.
 */
export function planNavi(language, manifest) {
  if (!language || language === 'other' || !manifest) return []
  const eligible = NAVI_SITUATIONS.filter((sit) =>
    NAVI_LEVELS.every((lvl) => {
      const lang = lvl === 'none' ? 'en' : language
      return manifest.includes(`${sit}_${lvl}_${lang}`)
    })
  )
  return shuffle(eligible)
    .slice(0, NAVI_PER_PERSON)
    .map((situation) => ({ situation, order: shuffle(NAVI_LEVELS) }))
}

/**
 * The ordered list of pages for this session. Pages before Block 14 never
 * change once the session starts, so the current index stays valid.
 */
export function buildSteps(situationOrder, naviPlan) {
  return [
    { kind: 'page', key: 'consent' },
    { kind: 'page', key: 'screening' },
    { kind: 'page', key: 'background' },
    ...situationOrder.map((id) => ({ kind: 'situation', id })),
    ...naviPlan.map((p) => ({ kind: 'navi', ...p })),
    ...(naviPlan.length ? [{ kind: 'page', key: 'mix' }] : []),
    { kind: 'page', key: 'product' },
    { kind: 'page', key: 'coping' },
    { kind: 'page', key: 'open' },
    { kind: 'page', key: 'contact' },
  ]
}

/** Gate checks. Returns the reason the session should end, or null. */
export function gateFor(pageKey, answers) {
  if (pageKey === 'consent' && answers.consent === 0) return 'declined'
  if (pageKey === 'screening') {
    if (answers.enrolled_scsu === 0 || answers.age_18_plus === 0) return 'ineligible'
    if (answers.arrival_year === 2024) return 'ineligible'
  }
  return null
}

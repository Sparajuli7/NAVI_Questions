/**
 * Example conversations are static JSON files in public/conversations.
 * They are generated ahead of time from NAVI and checked by a native speaker.
 * Nothing here calls an AI model.
 */

let manifestPromise = null

export function loadManifest() {
  if (!manifestPromise) {
    manifestPromise = fetch('/conversations/manifest.json')
      .then((r) => (r.ok ? r.json() : { available: [] }))
      .then((m) => m.available || [])
      .catch(() => [])
  }
  return manifestPromise
}

const cache = new Map()

export function loadConversation(situation, level, language) {
  const lang = level === 'none' ? 'en' : language
  const id = `${situation}_${level}_${lang}`
  if (!cache.has(id)) {
    cache.set(
      id,
      fetch(`/conversations/${id}.json`).then((r) => {
        if (!r.ok) throw new Error(`Missing conversation ${id}`)
        return r.json()
      })
    )
  }
  return cache.get(id)
}

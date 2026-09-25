# NAVI Demo Screenshots — capture guide

## Open the demo

```
http://localhost:5173/?demo=1
```

Use the **Language** and **Situation** dropdowns to navigate. All five situations and all supported languages are available.

## What to capture

For each combination you want a screenshot:
1. Select the language and situation in the demo
2. Scroll to the level you want (None / Light / Heavy)
3. Capture just the chat widget (phone-chat element)

## Where to save

| File path | Contents |
|---|---|
| `public/screenshots/{lang}/{situation}_light.png` | Light-mix chat for that language |
| `public/screenshots/{lang}/{situation}_heavy.png` | Heavy-mix chat for that language |
| `public/screenshots/_shared/{situation}_none.png` | English-only (shared across all languages) |

**Example:** `public/screenshots/ne/clinic_light.png`

Languages: `zh fr de ha ko ne ru es` (plus `hi ja` if kept)
Situations: `clinic professor ordering smalltalk transit`

## How the fallback works

If a PNG file is not present at the expected path the app automatically renders the JSON-based Conversation widget instead. No code change needed — just drop the PNG in the right folder.

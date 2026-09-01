import SceneMode from './SceneMode.jsx'
import DeckMode from './DeckMode.jsx'
import SprintMode from './SprintMode.jsx'

export default function BatteryBlock({ mode, situationOrder, ratings, onComplete, onBack, onThemeChange }) {
  if (mode === 'scene')  return <SceneMode  situationOrder={situationOrder} ratings={ratings} onComplete={onComplete} onBack={onBack} onThemeChange={onThemeChange} />
  if (mode === 'deck')   return <DeckMode   situationOrder={situationOrder} ratings={ratings} onComplete={onComplete} onBack={onBack} onThemeChange={onThemeChange} />
  if (mode === 'sprint') return <SprintMode situationOrder={situationOrder} ratings={ratings} onComplete={onComplete} onBack={onBack} onThemeChange={onThemeChange} />
  return null
}

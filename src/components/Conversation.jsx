/** App-like practice chat: learner input vs NAVI output. */
export default function Conversation({ convo, compact = false }) {
  if (!convo?.turns?.length) return null
  return (
    <div className={'phone-chat' + (compact ? ' phone-chat-compact' : '')} dir="auto">
      <div className="phone-chat-bar">
        <span className="phone-chat-dot" />
        <span>NAVI practice</span>
      </div>
      <div className="phone-chat-body">
        {convo.turns.map((t, i) => {
          const isNavi = t.speaker === 'navi'
          return (
            <div key={i} className={'bubble-row ' + (isNavi ? 'bubble-row-navi' : 'bubble-row-you')}>
              <span className="bubble-tag">{isNavi ? 'NAVI · output' : 'You · input'}</span>
              <div className={'bubble ' + (isNavi ? 'bubble-navi' : 'bubble-you')} dir="auto">
                {t.text}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function ExitScreen() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh', padding: 'var(--space-6)', textAlign: 'center', gap: 'var(--space-4)' }}>
      <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)' }}>Thank you for your time</h1>
      <p style={{ color: 'var(--color-text-muted)', maxWidth: '42ch', lineHeight: 'var(--line-height-base)' }}>
        This study is open to currently enrolled SCSU students who are 18 or older. We appreciate your interest.
      </p>
    </main>
  )
}

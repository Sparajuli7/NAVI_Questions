import { Component } from 'react'

/** A crash shows a message and a way out, never a blank white page. */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Survey error:', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <main className="shell">
        <section className="card">
          <h1>Something went wrong</h1>
          <p className="lede">
            Sorry, the survey hit an error. Please reload the page to start again. If it keeps
            happening, email shreyash.parajuli@go.stcloudstate.edu and say what page you were on.
          </p>
          <button className="primary" onClick={() => window.location.reload()}>
            Reload
          </button>
          <pre className="err">{String(this.state.error?.message || this.state.error)}</pre>
        </section>
      </main>
    )
  }
}

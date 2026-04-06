const syncStages = [
  {
    title: 'Directory binding',
    status: 'next',
    description: 'Bind one local root path to a knowledge base sync target.',
  },
  {
    title: 'Local scan',
    status: 'planned',
    description: 'Build the initial file snapshot and fingerprint baseline.',
  },
  {
    title: 'Delta detection',
    status: 'planned',
    description: 'Track add, update, move, and delete changes before upload.',
  },
  {
    title: 'Sync reporting',
    status: 'planned',
    description: 'Submit sync jobs to the server and show retry or conflict states.',
  },
]

const localCapabilities = [
  'read_dir',
  'read_file',
  'write_file',
  'create_dir',
  'remove_file',
  'rename_file',
]

const scopeRules = [
  'No duplicated knowledge-base UI in the desktop client.',
  'No document editor or route-level shell until sync basics are stable.',
  'Keep the desktop app focused on local filesystem and sync execution.',
]

function App() {
  return (
    <main className="agent-shell">
      <section className="panel hero-panel">
        <p className="eyebrow">Memora Client</p>
        <h1>Local Sync Agent Shell</h1>
        <p className="hero-copy">
          This desktop app has been reduced to the sync-agent baseline. The web app
          remains responsible for tenants, knowledge bases, documents, editing, and
          permissions.
        </p>
        <div className="hero-badges">
          <span className="badge badge-live">Current shape</span>
          <span className="badge">Tauri + Rust + React</span>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <p className="section-kicker">Roadmap</p>
          <h2>Sync path</h2>
        </div>
        <div className="stage-grid">
          {syncStages.map((stage) => (
            <article key={stage.title} className="stage-card">
              <div className="stage-topline">
                <span className={`status-pill status-${stage.status}`}>{stage.status}</span>
                <h3>{stage.title}</h3>
              </div>
              <p>{stage.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-grid">
        <article className="panel">
          <div className="section-heading">
            <p className="section-kicker">Runtime</p>
            <h2>Available local commands</h2>
          </div>
          <ul className="list">
            {localCapabilities.map((capability) => (
              <li key={capability}>
                <code>{capability}</code>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <div className="section-heading">
            <p className="section-kicker">Guardrails</p>
            <h2>What stays out</h2>
          </div>
          <ul className="list">
            {scopeRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  )
}

export default App

async function renderDeepseekHarness() {
  const content = document.getElementById('pageContent');
  content.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">DeepSeek Harness Lab</h1>
        <p class="page-subtitle">Experimental local harness lane for compatibility checks and disposable tests.</p>
      </div>
      <a class="btn btn-primary" href="http://127.0.0.1:3080" target="_blank" rel="noopener">Open Local UI</a>
    </div>

    <div class="grid grid-3">
      <div class="stat-card"><div class="stat-value">0.1</div><div class="stat-label">Developer Preview</div></div>
      <div class="stat-card"><div class="stat-value">3080</div><div class="stat-label">Default Local Port</div></div>
      <div class="stat-card"><div class="stat-value">MIT</div><div class="stat-label">License</div></div>
    </div>

    <div class="grid grid-2 mt-4">
      <div class="card">
        <div class="card-header"><div><div class="card-title">Lab Checklist</div><div class="card-subtitle">Install carefully, wire context, test once, review logs.</div></div></div>
        <ul class="clean-list">
          <li><strong>Setup:</strong> install Node.js, then run <code>npx @deepseek-ai/dsh web</code>.</li>
          <li><strong>Wire:</strong> choose this workspace and load Agentic OS instruction files.</li>
          <li><strong>Assign:</strong> give it one bounded job, such as competitor watching or content outlines.</li>
          <li><strong>Review:</strong> inspect Trajectory logs before trusting any plugin or workflow.</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-header"><div><div class="card-title">Operator Guardrails</div><div class="card-subtitle">Treat Harness as a lab lane until its APIs settle.</div></div></div>
        <ul class="clean-list">
          <li>Do not paste API keys into chat, docs, prompts, or source files.</li>
          <li>Keep credentials in Harness model/provider settings or local secret storage.</li>
          <li>Run first tasks in a disposable or freshly backed-up workspace.</li>
          <li>Review Trajectory logs before promoting a plugin or workflow.</li>
        </ul>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-header"><div><div class="card-title">Compatibility Plan</div><div class="card-subtitle">Keep the preview isolated until it proves stable.</div></div></div>
      <div class="timeline-list">
        <div class="timeline-item"><span class="badge badge-info">Week 1</span><div><strong>Install and explore</strong><p>Launch the local Web UI, select a model, and inspect runtime modes.</p></div></div>
        <div class="timeline-item"><span class="badge badge-info">Week 2</span><div><strong>Wire it in</strong><p>Add Agent OS files, compare the same task against Codex, Hermes, Kilo, and opencode.</p></div></div>
        <div class="timeline-item"><span class="badge badge-info">Week 3</span><div><strong>Disposable task only</strong><p>Use a tiny non-production task and log quality, crashes, cost, and failure modes.</p></div></div>
        <div class="timeline-item"><span class="badge badge-info">Week 4</span><div><strong>Decide later</strong><p>Promote nothing until stability, permissions, memory behavior, and rollback are proven.</p></div></div>
      </div>
    </div>

    <div class="grid grid-2 mt-4">
      <div class="card"><div class="card-header"><div><div class="card-title">Install Command</div><div class="card-subtitle">Run from the workspace Harness should see by default.</div></div></div><pre><code>npx @deepseek-ai/dsh web</code></pre></div>
      <div class="card"><div class="card-header"><div><div class="card-title">Saved Notes</div><div class="card-subtitle">Implementation brief and reusable prompt.</div></div></div><ul class="clean-list"><li><code>docs/deepseek-harness-agent-os.md</code></li><li><code>prompts/deepseek-harness-lab.md</code></li></ul></div>
    </div>
  `;
}


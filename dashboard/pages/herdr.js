async function renderHerdr() {
  const content = document.getElementById('pageContent');
  content.innerHTML = [
    '<div class="page-header">',
    '<div class="page-header-left">',
    '<div class="page-title">Herdr Sessions</div>',
    '<div class="page-subtitle">Launch and manage multi-agent terminal workspaces from Agent OS</div>',
    '</div>',
    '<div class="btn-group">',
    '<button class="btn btn-primary" onclick="launchHerdr()">Launch Herdr</button>',
    '<button class="btn btn-ghost" onclick="refreshHerdrStatus()">Refresh</button>',
    '</div>',
    '</div>',
    '<div class="grid grid-2" style="margin-bottom:20px">',
    '<div class="card" id="herdrStatusCard">',
    '<div class="loading"><div class="loading-spinner"></div><span>Checking Herdr...</span></div>',
    '</div>',
    '<div class="card">',
    '<div class="card-title">Why this tab exists</div>',
    '<p class="text-sm text-muted" style="line-height:1.7;margin-top:8px">Herdr keeps several agent terminals organized in one persistent workspace, so Codex, Kilo, opencode, logs, and checks can stay side by side without extra tabs or repeated commands.</p>',
    '</div>',
    '</div>',
    '<div class="section-title">Starter Layout</div>',
    '<div class="card">',
    '<div class="table-wrap">',
    '<table class="table">',
    '<thead><tr><th>Pane</th><th>Use</th><th>Suggested agent</th></tr></thead>',
    '<tbody>',
    '<tr><td>Primary</td><td>Main implementation work</td><td>Codex</td></tr>',
    '<tr><td>Sidecar</td><td>Cheap/free coding passes and refactors</td><td>Kilo Code</td></tr>',
    '<tr><td>Verification</td><td>Tests, logs, dashboards, health checks</td><td>opencode or shell</td></tr>',
    '<tr><td>Research</td><td>Docs, notes, and handoff summaries</td><td>agy or Codex</td></tr>',
    '</tbody>',
    '</table>',
    '</div>',
    '</div>'
  ].join('');
  await refreshHerdrStatus();
}

async function refreshHerdrStatus() {
  const card = document.getElementById('herdrStatusCard');
  if (!card) return;
  try {
    const data = await api.getHerdrStatus();
    const installed = Boolean(data.installed);
    const state = installed ? 'online' : 'offline';
    const label = installed ? 'Installed' : 'Not installed';
    const launchDisabled = installed ? '' : ' disabled';
    card.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px">',
      '<div>',
      '<div class="card-title">Runtime Status</div>',
      '<div class="text-sm text-muted" style="margin-top:6px">Workspace: ' + escapeHtml(data.workspace || '') + '</div>',
      '</div>',
      '<div class="status-indicator ' + state + '">',
      '<span class="agent-dot ' + state + '"></span>',
      label,
      '</div>',
      '</div>',
      '<div style="margin-top:16px;font-size:13px;color:var(--text-secondary);line-height:1.6">',
      'Binary: <code>' + escapeHtml(data.binary || 'herdr') + '</code><br>',
      escapeHtml(data.quick_start || ''),
      '</div>',
      '<div class="btn-group" style="margin-top:16px">',
      '<button class="btn btn-primary" onclick="launchHerdr()"' + launchDisabled + '>Launch Herdr</button>',
      '<button class="btn btn-ghost" onclick="installHerdr()">Copy Install Command</button>',
      '<a class="btn btn-ghost" href="' + escapeHtml(data.docs || 'https://herdr.dev/docs') + '" target="_blank" rel="noreferrer">Docs</a>',
      '</div>'
    ].join('');
  } catch (err) {
    card.innerHTML = '<div class="empty-state"><div class="empty-state-icon">!</div><div class="empty-state-title">Herdr status failed</div><div class="empty-state-desc">' + escapeHtml(err.message) + '</div></div>';
  }
}

async function launchHerdr() {
  try {
    const data = await api.launchHerdr();
    showToast('Herdr launched for ' + data.workspace, 'success');
    await refreshHerdrStatus();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function installHerdr() {
  const command = 'powershell -ExecutionPolicy Bypass -c "irm https://herdr.dev/install.ps1 | iex"';
  if (navigator.clipboard) navigator.clipboard.writeText(command);
  showToast('Install command copied for PowerShell.', 'info');
}

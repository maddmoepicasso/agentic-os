async function renderPmoAi() {
  const content = document.getElementById('pageContent');
  content.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">PMO AI</h1>
        <p class="page-subtitle">PMO AI is routed through Kilo Code as the free sidecar agent beside Codex.</p>
      </div>
      <div class="btn-group"><button class="btn" onclick="refreshPmoAi()">↻ Refresh</button><button class="btn btn-primary" onclick="testPmoAiKilo()">Test Kilo</button></div>
    </div>
    <div class="grid grid-2">
      <div class="card"><div class="card-header"><div><div class="card-title">PMO AI Status</div><div class="card-subtitle">Active package and Kilo assignment</div></div></div><div id="pmoAiStatus"><div class="loading"><div class="loading-spinner"></div></div></div></div>
      <div class="card"><div class="card-header"><div><div class="card-title">Free API Route</div><div class="card-subtitle">Switch Kilo between Cloudflare and OpenRouter free routes</div></div></div><div id="kiloRoutes"><div class="loading"><div class="loading-spinner"></div></div></div></div>
    </div>
    <div class="card mt-4">
      <div class="card-header"><div><div class="card-title">PMO AI Actions</div><div class="card-subtitle">Open and operate PMO AI from Angelic OS / VS Code</div></div></div>
      <div class="grid grid-3">
        <button class="btn" onclick="api.chat('vscode','Open PMO AI in VS Code')">Open PMO AI in VS Code</button>
        <button class="btn" onclick="api.chat('vscode','Open PMO Bot in VS Code')">Open PMO Bot in VS Code</button>
        <button class="btn" onclick="navigate('chat')">Go to AI Chat</button>
      </div>
      <div id="pmoAiResult" style="margin-top:12px;color:var(--text-muted);font-size:13px"></div>
    </div>`;
  await refreshPmoAi();
}

async function refreshPmoAi() {
  const statusEl = document.getElementById('pmoAiStatus');
  const routesEl = document.getElementById('kiloRoutes');
  try {
    const status = await api.getPmoAiStatus();
    const routes = await api.getKiloRoutes();
    statusEl.innerHTML = `
      <div class="stat-grid"><div class="stat-card"><div class="stat-value">${escapeHtml(status.status)}</div><div class="stat-label">PMO AI</div></div><div class="stat-card"><div class="stat-value">${status.open_code_refs.length}</div><div class="stat-label">OpenCode refs</div></div></div>
      <div style="font-size:13px;line-height:1.8;margin-top:12px">
        <div><strong>Assigned agent:</strong> ${escapeHtml(status.assigned_agent)}</div>
        <div><strong>Folder:</strong> ${escapeHtml(status.pmoai_dir)}</div>
        <div><strong>Kilo rule:</strong> ${status.kilo_rule_exists ? 'Installed' : 'Missing'}</div>
        <div><strong>Route configured:</strong> ${status.route_configured ? 'Yes' : 'Needs API key'}</div>
      </div>`;
    routesEl.innerHTML = `<div style="font-size:13px;margin-bottom:10px"><strong>Active:</strong> ${escapeHtml(routes.active_model)}</div>` + Object.entries(routes.routes || {}).map(([name, cfg]) => `
      <div class="card" style="padding:12px;margin-bottom:10px;border-color:${routes.active_route === name ? 'var(--primary)' : 'var(--border)'}">
        <div style="display:flex;justify-content:space-between;gap:8px;align-items:center">
          <div><strong>${escapeHtml(cfg.label)}</strong><div style="font-size:12px;color:var(--text-muted)">${escapeHtml(cfg.provider)}/${escapeHtml(cfg.model)}</div><div style="font-size:12px;color:${cfg.configured ? 'var(--green)' : 'var(--yellow)'}">${cfg.configured ? 'Configured' : 'Needs key'}</div></div>
          <button class="btn btn-sm ${routes.active_route === name ? 'btn-primary' : ''}" onclick="setKiloRoute('${name}', '${escapeHtml(cfg.model)}')">${routes.active_route === name ? 'Active' : 'Use'}</button>
        </div>
      </div>`).join('');
  } catch (err) {
    statusEl.innerHTML = `<div class="empty-state"><div class="empty-state-title">${escapeHtml(err.message)}</div></div>`;
    routesEl.innerHTML = '';
  }
}

async function setKiloRoute(route, model) {
  try { await api.updateKiloRoute({ route, model }); showToast('Kilo route updated', 'success'); await refreshPmoAi(); }
  catch (err) { showToast(err.message, 'error'); }
}

async function testPmoAiKilo() {
  const out = document.getElementById('pmoAiResult');
  out.textContent = 'Testing PMO AI through Kilo…';
  try { const r = await api.testPmoAiKilo(); out.textContent = r.response || JSON.stringify(r); showToast('PMO AI Kilo test finished', 'success'); }
  catch (err) { out.textContent = err.message; showToast(err.message, 'error'); }
}

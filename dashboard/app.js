const pageCache = {};

const APP_VERSION = '0.4.5';

const PAGE_TITLES = {
  dashboard: { title: 'Dashboard', breadcrumb: 'Overview' },
  chat: { title: 'AI Chat', breadcrumb: 'Talk to Codex, Kilo, and Angelic OS agents' },
  'agent-codex': { title: 'Codex', breadcrumb: 'OpenAI coding agent' },
  'agent-kilo': { title: 'Kilo Code', breadcrumb: 'Free coding sidecar' },
  'agent-vscode': { title: 'VS Code', breadcrumb: 'Local workspace opener' },
  'agent-opencode': { title: 'opencode', breadcrumb: 'DevOps and code agent' },
  'deepseek-harness': { title: 'DeepSeek Harness', breadcrumb: 'Plugin-composed local agent harness' },
  'agent-hermes': { title: 'Hermes', breadcrumb: 'Memory and scheduling agent' },
  'agent-agy': { title: 'agy', breadcrumb: 'Research and analysis agent' },
  history: { title: 'Chat History', breadcrumb: 'Review prior agent sessions' },
  'media-studio': { title: 'Media Studio', breadcrumb: 'Generate images and creative assets' },
  'hermes-muse': { title: 'Hermes Muse', breadcrumb: 'Daily content ideas from your own winning signals' },
  'video-intake': { title: 'Video Intake', breadcrumb: 'Turn YouTube transcripts into implementation briefs' },
  'pmo-ai': { title: 'PMO AI', breadcrumb: 'Kilo-powered PMO AI harness' },
  skills: { title: 'Skills', breadcrumb: 'Installed skills and capabilities' },
  memory: { title: 'Memory', breadcrumb: 'Persistent knowledge and notes' },
  scheduler: { title: 'Scheduler', breadcrumb: 'Timed jobs and automations' },
  audit: { title: 'Audit', breadcrumb: 'System audit trail' },
  kanban: { title: 'Kanban Board', breadcrumb: 'Plan and track work' },
  goals: { title: 'Goals', breadcrumb: 'Goal mode and progress' },
  journal: { title: 'Journal', breadcrumb: 'Notes and reflections' },
  'agent-health': { title: 'Agent Health', breadcrumb: 'Monitor agent status' },
  'smart-router': { title: 'Smart Router', breadcrumb: 'Agent and model routing' },
  'learning-analytics': { title: 'Learning Analytics', breadcrumb: 'Usage and learning insights' },
  'session-replay': { title: 'Session Replay', breadcrumb: 'Replay previous sessions' },
  herdr: { title: 'Herdr Sessions', breadcrumb: 'Multi-agent terminal sessions' },
  errors: { title: 'Error Dashboard', breadcrumb: 'Errors and recovery' },
  cost: { title: 'Cost Analytics', breadcrumb: 'Token and provider costs' },
  plugins: { title: 'Plugins', breadcrumb: 'Installed plugins and integrations' },
  backups: { title: 'Backups', breadcrumb: 'Backup and restore points' },
  prompts: { title: 'Prompts', breadcrumb: 'Prompt library' },
  standards: { title: 'Standards', breadcrumb: 'Project rules and standards' },
  settings: { title: 'Settings', breadcrumb: 'Keys, providers, and preferences' },
  'setup-wizard': { title: 'Setup Wizard', breadcrumb: 'Guided Angelic OS setup' },
};

const PAGE_BASE = '/dashboard/pages/';

async function loadPage(name) {
  if (pageCache[name]) return pageCache[name];
  try {
    const scriptName = name.startsWith('agent-') ? 'agent' : name;
    await loadScript(`${PAGE_BASE}${scriptName}.js`);
    pageCache[name] = true;
  } catch (err) {
    showToast(`Failed to load page: ${name}`, 'error');
    throw err;
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const versioned = `${src}?v=${APP_VERSION}`;
    if (document.querySelector(`script[src="${versioned}"]`)) { resolve(); return; }
    const script = document.createElement('script');
    script.src = versioned;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

async function navigate(page) {
  const hash = page || window.location.hash.slice(1) || 'dashboard';
  if (!hash) { window.location.hash = 'dashboard'; return; }

  // Show loading bar
  const bar = document.getElementById('topLoadingBar');
  if (bar) { bar.classList.add('active'); bar.style.width = '30%'; }

  document.querySelectorAll('.nav-item, .bottom-nav-item').forEach(el => el.classList.remove('active'));
  const navItem = document.querySelector(`[data-page="${hash}"]`);
  if (navItem) navItem.classList.add('active');

  const info = PAGE_TITLES[hash] || { title: 'Unknown', breadcrumb: '' };
  document.getElementById('pageTitle').textContent = info.title;
  document.getElementById('pageBreadcrumb').textContent = info.breadcrumb;

  const content = document.getElementById('pageContent');
  content.innerHTML = `<div class="loading"><div class="loading-spinner"></div><span>Loading ${info.title}...</span></div>`;

  try {
    await loadPage(hash);
    const renderFn = hash.startsWith('agent-')
      ? () => window.renderAgent(hash.replace('agent-', ''))
      : window[`render${capitalize(hash.replace(/-./g, m => m[1].toUpperCase()))}`];
    if (renderFn) {
      content.innerHTML = '';
      content.className = 'page-content page-enter';
      if (bar) bar.style.width = '70%';
      await renderFn();
      if (bar) { bar.style.width = '100%'; setTimeout(() => { bar.style.width = '0'; bar.classList.remove('active'); }, 400); }
    } else {
      content.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🔍</div><div class="empty-state-title">Page not found</div><div class="empty-state-desc">The page "${hash}" doesn't have a render function</div></div>`;
      if (bar) { bar.style.width = '0'; bar.classList.remove('active'); }
    }
  } catch (err) {
    content.innerHTML = `<div class="empty-state"><div class="empty-state-icon">⚠</div><div class="empty-state-title">Failed to load</div><div class="empty-state-desc">${escapeHtml(err.message)}</div><button class="btn btn-primary mt-3" onclick="navigate('dashboard')">Go to Dashboard</button></div>`;
    if (bar) { bar.style.width = '0'; bar.classList.remove('active'); }
  }
}

function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

async function updateAgentStatus() {
  try {
    const status = await api.getStatus();
    const agents = status.agents || [];
    const bar = document.getElementById('agentStatusBar');
    const online = agents.filter(a => a.status === 'online').length;
    const total = agents.length;
    const dot = bar.querySelector('.agent-dot');
    if (online === total) { dot.className = 'agent-dot online'; bar.querySelector('span').textContent = 'All agents online'; }
    else if (online > 0) { dot.className = 'agent-dot warning'; bar.querySelector('span').textContent = `${online}/${total} online`; }
    else { dot.className = 'agent-dot offline'; bar.querySelector('span').textContent = 'All agents offline'; }

    const badge = document.getElementById('skillCount');
    if (badge && status.skills_count !== undefined) badge.textContent = status.skills_count;
  } catch {
    const bar = document.getElementById('agentStatusBar');
    if (bar) { bar.querySelector('.agent-dot').className = 'agent-dot offline'; bar.querySelector('span').textContent = 'Disconnected'; }
  }
}

window.addEventListener('hashchange', () => navigate());
window.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  navigate(window.location.hash.slice(1) || 'dashboard');
  updateAgentStatus();
  setInterval(updateAgentStatus, 15000);
});








async function renderHermesMuse() {
  const content = document.getElementById('pageContent');
  let settings = {};
  let museStatus = { board: {}, settings: {}, configured: false, cache_exists: false };
  try {
    settings = await api.getSettings();
    museStatus = await api.getHermesMuseStatus();
  } catch (err) {
    settings = {};
  }

  const muse = settings.hermes_muse || {};
  const statusSettings = museStatus.settings || {};
  const board = museStatus.board || {};
  const stats = board.stats || {};
  const ideas = Array.isArray(board.ideas) ? board.ideas : [];
  const winners = Array.isArray(board.winners) ? board.winners : [];
  const channel = settings.youtubeChannel || muse.youtubeChannel || '';
  const furnaceChannels = Array.isArray(settings.furnaceChannels)
    ? settings.furnaceChannels
    : (Array.isArray(muse.furnaceChannels) ? muse.furnaceChannels : []);
  const channelText = channel || furnaceChannels.join(', ') || (statusSettings.channels || []).join(', ') || 'No channel configured yet';
  const cachePath = statusSettings.cache_path || muse.cache_path || '~/.agentic-os/furnace/latest.json';
  const dailyTime = statusSettings.daily_time || muse.daily_time || '06:20';
  const ideaCount = statusSettings.idea_count || muse.idea_count || 8;

  content.innerHTML = `
    <div class="page-header">
      <div>
        <h1>Hermes Muse</h1>
        <p class="text-muted">Hermes whispers the data before you wake up. Muse turns your proven winners into the next ideas to create.</p>
      </div>
      <div class="actions-row">
        <button class="btn btn-primary" onclick="window.hermesMuseStartRun()">Re-stoke Now</button>
        <button class="btn btn-secondary" onclick="navigate('scheduler')">Schedule ${escapeHtml(dailyTime)}</button>
      </div>
    </div>

    <div class="grid grid-4">
      <div class="card">
        <div class="metric-value">${escapeHtml(String(dailyTime))}</div>
        <div class="metric-label">daily restoke</div>
      </div>
      <div class="card">
        <div class="metric-value">${escapeHtml(String(stats.videos_scanned || 0))}</div>
        <div class="metric-label">videos scanned</div>
      </div>
      <div class="card">
        <div class="metric-value">${escapeHtml(String(stats.views_on_board || 0))}</div>
        <div class="metric-label">views on board</div>
      </div>
      <div class="card">
        <div class="metric-value">${escapeHtml(String(stats.ideas_forged || ideas.length || ideaCount))}</div>
        <div class="metric-label">ideas forged</div>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-header">
        <h3>Current Source</h3>
        <span class="badge ${museStatus.configured ? 'badge-success' : 'badge-warning'}">${museStatus.configured ? 'Configured' : 'Needs setup'}</span>
      </div>
      <p class="text-muted">Channel source: <code>${escapeHtml(channelText)}</code></p>
      <p class="text-muted">Cached board: <code>${escapeHtml(cachePath)}</code></p>
      <p class="text-muted">Last restoke: <code>${escapeHtml(board.generated_at || 'not run yet')}</code></p>
      <div class="form-grid">
        <label class="form-group">
          <span>YouTube channel</span>
          <input id="museChannel" class="form-input" value="${escapeHtml(channel)}" placeholder="https://youtube.com/@YourHandle">
        </label>
        <label class="form-group">
          <span>Extra furnace channels</span>
          <input id="museFurnaceChannels" class="form-input" value="${escapeHtml(furnaceChannels.join(', '))}" placeholder="HandleOne, HandleTwo">
        </label>
      </div>
      <div class="actions-row mt-3">
        <button class="btn btn-primary" onclick="window.hermesMuseSaveSettings()">Save Source</button>
        <button class="btn btn-secondary" onclick="navigate('memory')">Open Memory</button>
      </div>
    </div>

    <div class="grid grid-2 mt-4">
      <div class="card">
        <div class="card-header"><h3>Heat Formula</h3></div>
        <ol class="clean-list">
          <li>Pull: total views, normalized against your board.</li>
          <li>Velocity: views per day, normalized against your board.</li>
          <li>Heat: 60% pull plus 40% velocity.</li>
          <li>Ideas copy proven title, hook, and format patterns.</li>
        </ol>
      </div>
      <div class="card">
        <div class="card-header"><h3>One-Click Handoffs</h3></div>
        <div class="quick-actions">
          <button class="btn btn-secondary" onclick="navigate('video-intake')">Video Director</button>
          <button class="btn btn-secondary" onclick="navigate('kanban')">Agent Kanban</button>
          <button class="btn btn-secondary" onclick="navigate('media-studio')">Thumbnail Studio</button>
          <button class="btn btn-secondary" onclick="navigate('agent-hermes')">Ask Hermes</button>
        </div>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-header"><h3>Forged Ideas</h3></div>
      <div class="muse-idea-list">
        ${ideas.length ? ideas.map(renderHermesMuseIdea).join('') : `<div class="empty-state"><div class="empty-state-title">No ideas forged yet</div><div class="empty-state-desc">Save a channel source, then click Re-stoke Now.</div></div>`}
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-header"><h3>Burning Hottest</h3></div>
      <div class="muse-winner-list">
        ${winners.length ? winners.slice(0, 5).map(renderHermesMuseWinner).join('') : `<p class="text-muted">No winners cached yet.</p>`}
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-header"><h3>Signature Prompt</h3></div>
      <pre class="code-block">Hermes is the messenger. The Muse is the inspiration. The data is the proof.

Read my content performance, find the winners, calculate heat as 60% pull plus 40% velocity, and forge ${escapeHtml(String(ideaCount))} ranked ideas with titles, spoken hooks, formats, proof patterns, and one-click handoff targets.</pre>
    </div>
  `;
}

function renderHermesMuseIdea(idea) {
  return `
    <div class="muse-idea-card">
      <div class="muse-idea-score">${escapeHtml(String(idea.heat || 0))}</div>
      <div class="muse-idea-body">
        <h4>${escapeHtml(idea.title || 'Untitled idea')}</h4>
        <p>${escapeHtml(idea.hook || '')}</p>
        <small>${escapeHtml(idea.why_it_works || '')}</small>
        <div class="quick-actions mt-3">
          <button class="btn btn-sm btn-secondary" onclick="window.hermesMuseHandoff('${escapeHtml(idea.id)}', 'video_director')">Make the Video</button>
          <button class="btn btn-sm btn-secondary" onclick="window.hermesMuseHandoff('${escapeHtml(idea.id)}', 'agent_kanban_seo')">SEO Article</button>
          <button class="btn btn-sm btn-secondary" onclick="window.hermesMuseHandoff('${escapeHtml(idea.id)}', 'thumbnail_studio')">Thumbnail</button>
        </div>
      </div>
    </div>
  `;
}

function renderHermesMuseWinner(winner) {
  return `
    <div class="muse-winner-row">
      <strong>${escapeHtml(winner.title || 'Untitled winner')}</strong>
      <span>Heat ${escapeHtml(String(winner.heat || 0))}</span>
      <span>${escapeHtml(String(winner.views || 0))} views</span>
      <span>${escapeHtml(String(winner.velocity || 0))}/day</span>
    </div>
  `;
}

window.hermesMuseSaveSettings = async function hermesMuseSaveSettings() {
  try {
    const current = await api.getSettings();
    const channel = document.getElementById('museChannel').value.trim();
    const furnaceRaw = document.getElementById('museFurnaceChannels').value.trim();
    const furnaceChannels = furnaceRaw
      ? furnaceRaw.split(',').map((v) => v.trim()).filter(Boolean)
      : [];
    const hermesMuse = {
      ...(current.hermes_muse || {}),
      enabled: true,
      daily_time: (current.hermes_muse && current.hermes_muse.daily_time) || '06:20',
      cadence: '24h',
      source: 'youtube_public_pages',
      heat_score: '60_pull_40_velocity',
      idea_count: 8,
      cache_path: '~/.agentic-os/furnace/latest.json',
      youtubeChannel: channel,
      furnaceChannels,
    };
    await api.updateSettings({ ...current, youtubeChannel: channel, furnaceChannels, hermes_muse: hermesMuse });
    showToast('Hermes Muse source saved', 'success');
    await renderHermesMuse();
  } catch (err) {
    showToast(`Could not save Hermes Muse source: ${err.message}`, 'error');
  }
};

window.hermesMuseStartRun = async function hermesMuseStartRun() {
  try {
    showToast('Re-stoking Hermes Muse...', 'info');
    await api.restokeHermesMuse();
    showToast('Hermes Muse forged a fresh board', 'success');
    await renderHermesMuse();
  } catch (err) {
    showToast(`Hermes Muse restoke failed: ${err.message}`, 'error');
  }
};

window.hermesMuseHandoff = async function hermesMuseHandoff(ideaId, target) {
  try {
    const result = await api.handoffHermesMuse(ideaId, target);
    showToast(`Created Kanban task: ${result.task.title}`, 'success');
  } catch (err) {
    showToast(`Handoff failed: ${err.message}`, 'error');
  }
};

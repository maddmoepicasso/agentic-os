async function renderVideoIntake() {
  const content = document.getElementById('pageContent');
  content.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">Video Intake</h1>
        <p class="page-subtitle">Turn a YouTube transcript into a build brief, backlog, and saved implementation notes.</p>
      </div>
    </div>
    <div class="grid grid-2">
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Source</div>
            <div class="card-subtitle">Paste a YouTube URL. Add transcript text if captions are blocked.</div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Video URL</label>
          <input id="videoIntakeUrl" class="form-input" value="https://www.youtube.com/watch?v=VtsebEEOAFE" placeholder="https://www.youtube.com/watch?v=...">
        </div>
        <div class="form-group">
          <label class="form-label">Transcript Override</label>
          <textarea id="videoIntakeTranscript" class="form-textarea" rows="12" placeholder="Paste transcript here when YouTube does not expose captions."></textarea>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-primary" onclick="runVideoIntake()">Analyze</button>
          <button class="btn btn-ghost" onclick="saveVideoIntakeBrief()">Save Brief</button>
        </div>
      </div>
      <div class="card" id="videoIntakeResult">
        <div class="empty-state">
          <div class="empty-state-icon">YT</div>
          <div class="empty-state-title">Ready for transcript intake</div>
          <div class="empty-state-desc">The result will show summary points, implementation tasks, keywords, and source status.</div>
        </div>
      </div>
    </div>
    <div class="card mt-4">
      <div class="card-header">
        <div>
          <div class="card-title">Saved Briefs</div>
          <div class="card-subtitle">Recent implementation briefs created from video transcripts.</div>
        </div>
      </div>
      <div id="videoBriefList" class="grid grid-3"></div>
    </div>
  `;
  await loadVideoBriefs();
}

let latestVideoIntake = null;

async function runVideoIntake() {
  const url = document.getElementById('videoIntakeUrl').value.trim();
  const transcript = document.getElementById('videoIntakeTranscript').value.trim();
  const result = document.getElementById('videoIntakeResult');
  result.innerHTML = '<div class="loading"><div class="loading-spinner"></div><span>Reading transcript...</span></div>';
  try {
    latestVideoIntake = await api.fetchVideoIntake({ url, transcript });
    renderVideoIntakeResult(latestVideoIntake);
    if (latestVideoIntake.transcript && !transcript) {
      document.getElementById('videoIntakeTranscript').value = latestVideoIntake.transcript;
    }
  } catch (err) {
    result.innerHTML = `<div class="empty-state"><div class="empty-state-icon">!</div><div class="empty-state-title">Intake failed</div><div class="empty-state-desc">${escapeHtml(err.message)}</div></div>`;
  }
}

function renderVideoIntakeResult(data) {
  const analysis = data.analysis || {};
  const tasks = analysis.actions || [];
  const summary = analysis.summary || [];
  const keywords = analysis.keywords || [];
  document.getElementById('videoIntakeResult').innerHTML = `
    <div class="card-header">
      <div>
        <div class="card-title">Implementation Brief</div>
        <div class="card-subtitle">${escapeHtml(data.canonical_url || '')}</div>
      </div>
      <span class="badge ${data.source === 'youtube' ? 'badge-success' : 'badge-warning'}">${escapeHtml(data.source || 'manual')}</span>
    </div>
    ${data.error ? `<div class="alert alert-warning mb-3">${escapeHtml(data.error)}</div>` : ''}
    <div class="stat-grid mb-3">
      <div class="stat-card"><div class="stat-value">${analysis.word_count || 0}</div><div class="stat-label">Words</div></div>
      <div class="stat-card"><div class="stat-value">${tasks.length}</div><div class="stat-label">Tasks</div></div>
      <div class="stat-card"><div class="stat-value">${keywords.length}</div><div class="stat-label">Signals</div></div>
    </div>
    <h3 class="section-title">Summary</h3>
    <ul class="clean-list">${summary.map(item => `<li>${escapeHtml(item)}</li>`).join('') || '<li>No summary yet. Paste more transcript text.</li>'}</ul>
    <h3 class="section-title mt-3">Backlog</h3>
    <ul class="clean-list">${tasks.map(item => `<li>${escapeHtml(item)}</li>`).join('') || '<li>No action phrases detected yet.</li>'}</ul>
    <h3 class="section-title mt-3">Keywords</h3>
    <div class="flex gap-2 flex-wrap">${keywords.map(k => `<span class="badge badge-info">${escapeHtml(k)}</span>`).join('')}</div>
  `;
}

async function saveVideoIntakeBrief() {
  const url = document.getElementById('videoIntakeUrl').value.trim();
  const transcript = document.getElementById('videoIntakeTranscript').value.trim() || (latestVideoIntake && latestVideoIntake.transcript) || '';
  if (!url || !transcript) {
    showToast('Add a video URL and transcript first.', 'warning');
    return;
  }
  try {
    const saved = await api.saveVideoBrief({ url, transcript, title: 'Implementation brief from YouTube transcript' });
    showToast('Brief saved', 'success');
    latestVideoIntake = saved.brief;
    await loadVideoBriefs();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function loadVideoBriefs() {
  const list = document.getElementById('videoBriefList');
  if (!list) return;
  try {
    const data = await api.getVideoBriefs();
    const briefs = data.briefs || [];
    if (!briefs.length) {
      list.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-title">No saved briefs yet</div></div>';
      return;
    }
    list.innerHTML = briefs.map(brief => `
      <div class="skill-card">
        <div class="skill-card-header">
          <div class="skill-card-icon">YT</div>
          <div class="skill-card-name">${escapeHtml(brief.title || brief.video_id)}</div>
        </div>
        <div class="skill-card-desc">${escapeHtml((brief.analysis && brief.analysis.summary && brief.analysis.summary[0]) || brief.url || '')}</div>
        <div class="skill-card-footer">
          <span class="badge badge-info">${(brief.analysis && brief.analysis.word_count) || 0} words</span>
          <span>${formatDate(brief.created_at)}</span>
        </div>
      </div>
    `).join('');
  } catch (err) {
    list.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-title">${escapeHtml(err.message)}</div></div>`;
  }
}

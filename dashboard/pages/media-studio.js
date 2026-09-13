async function renderMediaStudio() {
  const content = document.getElementById('pageContent');
  content.innerHTML = `
    <div class="page-header"><div><h1 class="page-title">Media Studio</h1><p class="page-subtitle">Generate photos, artwork, product visuals, and creative assets from inside Angelic OS.</p></div><button class="btn" onclick="refreshMediaStudio()">↻ Refresh</button></div>
    <div class="grid grid-2">
      <div class="card" style="background:linear-gradient(135deg,rgba(108,92,231,.18),rgba(253,121,168,.12));border-color:rgba(253,121,168,.35)">
        <div class="card-header"><div><div class="card-title">Create an image</div><div class="card-subtitle" id="mediaStatusText">Checking OpenAI image setup…</div></div></div>
        <div class="form-group"><label class="form-label">Prompt</label><textarea id="mediaPrompt" class="form-control" rows="7" placeholder="A cinematic angelic operating-system command center, purple and gold, glass panels, soft glow, ultra detailed"></textarea></div>
        <div class="grid grid-3">
          <div class="form-group"><label class="form-label">Model</label><input id="mediaModel" class="form-control" value="gpt-image-1"></div>
          <div class="form-group"><label class="form-label">Size</label><select id="mediaSize" class="form-control"><option>1024x1024</option><option>1024x1536</option><option>1536x1024</option></select></div>
          <div class="form-group"><label class="form-label">Quality</label><select id="mediaQuality" class="form-control"><option>auto</option><option>low</option><option>medium</option><option>high</option></select></div>
        </div>
        <button id="mediaGenerateBtn" class="btn btn-primary" onclick="generateMediaImage()">🎨 Generate Image</button><div id="mediaMessage" style="margin-top:12px;color:var(--text-muted);font-size:13px"></div>
      </div>
      <div class="card"><div class="card-header"><div><div class="card-title">Latest result</div><div class="card-subtitle">Saved locally inside Angelic OS</div></div></div><div id="mediaResult" class="empty-state" style="min-height:320px"><div class="empty-state-icon">🖼️</div><div class="empty-state-title">No image selected</div><div class="empty-state-desc">Generate an image or pick one from the gallery below.</div></div></div>
    </div>
    <div class="card mt-4"><div class="card-header"><div><div class="card-title">Gallery</div><div class="card-subtitle">Recent Angelic OS image generations</div></div></div><div id="mediaGallery" class="grid grid-4"></div></div>`;
  await refreshMediaStudio();
}
async function refreshMediaStudio() {
  try {
    const status = await api.getMediaStatus();
    const statusEl = document.getElementById('mediaStatusText');
    if (statusEl) statusEl.textContent = status.openai_configured ? 'OpenAI image generation is configured.' : 'Add an OpenAI API key in Settings → API Keys to generate images.';
    const images = await api.getMediaImages(24);
    renderMediaGallery(images.images || []);
  } catch (err) { showToast(err.message, 'error'); }
}
function renderMediaGallery(images) {
  const gallery = document.getElementById('mediaGallery');
  if (!gallery) return;
  if (!images.length) { gallery.innerHTML = '<div class="empty-state"><div class="empty-state-title">No generated images yet</div></div>'; return; }
  gallery.innerHTML = images.map(img => `<div class="card" style="padding:8px;cursor:pointer" onclick="showMediaImage('${escapeHtml(img.url)}','${escapeHtml(img.name)}')"><img src="${escapeHtml(img.url)}" alt="${escapeHtml(img.name)}" style="width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:12px;border:1px solid var(--border)"><div style="font-size:11px;color:var(--text-muted);margin-top:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(img.name)}</div></div>`).join('');
}
function showMediaImage(url, name) {
  const result = document.getElementById('mediaResult'); if (!result) return; result.className = ''; result.innerHTML = `<img src="${url}" alt="${name}" style="width:100%;max-height:520px;object-fit:contain;border-radius:16px;border:1px solid var(--border)"><div style="margin-top:8px"><a href="${url}" target="_blank">Open full image</a></div>`;
}
async function generateMediaImage() {
  const btn = document.getElementById('mediaGenerateBtn'); const msg = document.getElementById('mediaMessage'); const prompt = document.getElementById('mediaPrompt').value.trim();
  if (!prompt) { showToast('Prompt required', 'error'); return; }
  btn.disabled = true; btn.textContent = 'Generating…'; msg.textContent = 'Creating image. This can take a minute.';
  try { const r = await api.generateMediaImage({ prompt, model: document.getElementById('mediaModel').value, size: document.getElementById('mediaSize').value, quality: document.getElementById('mediaQuality').value }); if (r.image) showMediaImage(r.image.url, r.image.name); msg.textContent = 'Image generated and saved.'; showToast('Image generated', 'success'); await refreshMediaStudio(); }
  catch (err) { msg.textContent = err.message; showToast(err.message, 'error'); }
  finally { btn.disabled = false; btn.textContent = '🎨 Generate Image'; }
}

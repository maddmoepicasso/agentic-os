async function renderSettings() {
  const content = document.getElementById('pageContent');
  content.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">Settings</h1>
        <p class="page-subtitle">Configure Agentic OS behavior</p>
      </div>
      <button class="btn btn-primary" onclick="saveAllSettings()">Save All</button>
    </div>
    <div id="settingsForm"><div class="loading"><div class="loading-spinner"></div></div></div>
  `;

  try {
    const settings = await api.getSettings();
    const prefs = settings.agent_preferences || {};
    const dashboard = settings.dashboard || {};
    const limits = settings.free_tier_limits || {};
    const apiKeys = settings.api_keys || {};
    const obsidian = settings.obsidian || { enabled: true, vault_path: '' };
    const omnium = settings.omnium || { active_route: 'omniroute', routes: {} };
    const publishing = settings.publishing_integrations || {};
    const picasso = publishing.picassomoes || {};
    const netlify = publishing.netlify || {};
    const gsc = publishing.google_search_console || {};
    const reddit = publishing.reddit || {};
    const social = publishing.social || {};
    const routes = omnium.routes || {};
    const direct = routes.direct || {};
    const openrouter = routes.openrouter || {};
    const omniroute = routes.omniroute || {};

    document.getElementById('settingsForm').innerHTML = `
      <div class="card">
        <div class="card-header"><span class="card-title">Agent Preferences</span></div>
        <div class="grid grid-3">
          ${['codex', 'kilo', 'vscode', 'opencode', 'hermes', 'agy'].map(a => `
            <div class="card" style="padding:14px">
              <div class="flex items-center gap-2 mb-2">
                <div class="agent-dot ${prefs[a] && prefs[a].enabled !== false ? 'online' : 'offline'}" style="width:10px;height:10px"></div>
                <strong style="font-size:13px">${a}</strong>
              </div>
              <label class="switch" style="margin:8px 0">
                <input type="checkbox" id="agent_${a}" ${prefs[a] && prefs[a].enabled !== false ? 'checked' : ''} onchange="toggleAgent('${a}')">
                <span class="switch-slider"></span>
              </label>
              <div class="form-group" style="margin-bottom:0;margin-top:8px">
                <label class="form-label">Binary Path</label>
                <input id="bin_${a}" class="form-input" value="${escapeHtml((prefs[a] && prefs[a].binary) || a)}" style="font-size:12px">
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">Omnium Route Switcher</span></div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Active Codex Route</label>
            <select id="omniumActive" class="form-input">
              <option value="direct" ${omnium.active_route === 'direct' ? 'selected' : ''}>Codex Direct</option>
              <option value="openrouter" ${omnium.active_route === 'openrouter' ? 'selected' : ''}>OpenRouter</option>
              <option value="omniroute" ${omnium.active_route === 'omniroute' ? 'selected' : ''}>OmniRoute Gateway</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Direct Model Override</label>
            <input id="omniumDirectModel" class="form-input" value="${escapeHtml(direct.model || '')}" placeholder="blank = Codex config default">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">OpenRouter Base URL</label>
            <input id="omniumOpenrouterBase" class="form-input" value="${escapeHtml(openrouter.base_url || 'https://openrouter.ai/api/v1')}">
          </div>
          <div class="form-group">
            <label class="form-label">OpenRouter Model</label>
            <input id="omniumOpenrouterModel" class="form-input" value="${escapeHtml(openrouter.model || '')}" placeholder="provider model id">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">OmniRoute Base URL</label>
            <input id="omniumOmnirouteBase" class="form-input" value="${escapeHtml(omniroute.base_url || 'http://localhost:20128/v1')}" placeholder="http://localhost:20128/v1">
          </div>
          <div class="form-group">
            <label class="form-label">OmniRoute Model</label>
            <input id="omniumOmnirouteModel" class="form-input" value="${escapeHtml(omniroute.model || 'auto')}" placeholder="auto">
          </div>
        </div>
        <p style="font-size:12px;color:var(--text-secondary);margin:0">When OmniRoute is active, Codex uses the local OmniRoute gateway and lets the gateway choose or fall back across its provider pool.</p>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">API Keys</span></div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Gemini API Key</label>
            <input id="keyGemini" class="form-input" type="password" value="${escapeHtml(apiKeys.gemini || '')}" placeholder="Enter Gemini API key">
          </div>
          <div class="form-group">
            <label class="form-label">OpenRouter API Key</label>
            <input id="keyOpenrouter" class="form-input" type="password" value="${escapeHtml(apiKeys.openrouter || '')}" placeholder="Enter OpenRouter API key">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">OpenAI API Key</label>
            <input id="keyOpenai" class="form-input" type="password" value="${escapeHtml(apiKeys.openai || '')}" placeholder="Used by Media Studio image generation">
          </div>
          <div class="form-group">
            <label class="form-label">OmniRoute API Key</label>
            <input id="keyOmniroute" class="form-input" type="password" value="${escapeHtml(apiKeys.omniroute || '')}" placeholder="Enter OmniRoute key if your gateway requires one">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Key Env Names</label>
            <input class="form-input" value="OPENAI_API_KEY / OPENROUTER_API_KEY / OMNIROUTE_API_KEY" disabled>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">Publishing & SEO Integrations</span></div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Picassomoes Site URL</label>
            <input id="pubPicassoSite" class="form-input" value="${escapeHtml(picasso.site_url || 'https://picassomoes.com')}">
          </div>
          <div class="form-group">
            <label class="form-label">Booking URL</label>
            <input id="pubPicassoBooking" class="form-input" value="${escapeHtml(picasso.booking_url || 'https://picassomoescom.simplybook.me')}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Publishing Path</label>
            <input id="pubPicassoPath" class="form-input" value="${escapeHtml(picasso.publishing_path || '')}" placeholder="Cloudflare, Netlify, CMS, or manual">
          </div>
          <div class="form-group">
            <label class="form-label">Netlify Site ID/Name</label>
            <input id="pubNetlifySite" class="form-input" value="${escapeHtml(netlify.site_id || netlify.site_name || '')}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Google Search Console Property</label>
            <input id="pubGscProperty" class="form-input" value="${escapeHtml(gsc.property_url || 'https://picassomoes.com/')}">
          </div>
          <div class="form-group">
            <label class="form-label">Reddit Subreddit</label>
            <input id="pubRedditSubreddit" class="form-input" value="${escapeHtml(reddit.subreddit || 'r/HillsboroughTattoos')}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Instagram Account</label>
            <input id="pubInstagram" class="form-input" value="${escapeHtml(social.instagram_account || '')}" placeholder="@account">
          </div>
          <div class="form-group">
            <label class="form-label">LinkedIn Page/Profile</label>
            <input id="pubLinkedin" class="form-input" value="${escapeHtml(social.linkedin_page || '')}">
          </div>
          <div class="form-group">
            <label class="form-label">X Account</label>
            <input id="pubX" class="form-input" value="${escapeHtml(social.x_account || '')}" placeholder="@account">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Netlify Token</label>
            <input id="keyNetlify" class="form-input" type="password" value="${escapeHtml(apiKeys.netlify || '')}" placeholder="NETLIFY_AUTH_TOKEN">
          </div>
          <div class="form-group">
            <label class="form-label">Google Search Console Key</label>
            <input id="keyGsc" class="form-input" type="password" value="${escapeHtml(apiKeys.google_search_console || '')}" placeholder="API key or credential marker">
          </div>
          <div class="form-group">
            <label class="form-label">Omega Indexer Key</label>
            <input id="keyOmega" class="form-input" type="password" value="${escapeHtml(apiKeys.omega_indexer || '')}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Reddit Token/App Key</label>
            <input id="keyReddit" class="form-input" type="password" value="${escapeHtml(apiKeys.reddit || '')}">
          </div>
          <div class="form-group">
            <label class="form-label">Instagram/Meta Token</label>
            <input id="keyInstagram" class="form-input" type="password" value="${escapeHtml(apiKeys.instagram || '')}">
          </div>
          <div class="form-group">
            <label class="form-label">LinkedIn Token</label>
            <input id="keyLinkedin" class="form-input" type="password" value="${escapeHtml(apiKeys.linkedin || '')}">
          </div>
          <div class="form-group">
            <label class="form-label">X/Twitter Token</label>
            <input id="keyX" class="form-input" type="password" value="${escapeHtml(apiKeys.x || '')}">
          </div>
        </div>
        <p style="font-size:12px;color:var(--text-secondary);margin:0">Agent OS marks publishing live only when a real key/login and destination are configured. Draft generation still works without these.</p>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">Dashboard</span></div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Port</label>
            <input id="setPort" class="form-input" type="number" value="${dashboard.port || 8080}">
          </div>
          <div class="form-group">
            <label class="form-label">Host</label>
            <input id="setHost" class="form-input" value="${escapeHtml(dashboard.host || '127.0.0.1')}">
          </div>
        </div>
        <div class="form-group">
          <label class="switch" style="width:auto;display:flex;align-items:center;gap:10px">
            <input type="checkbox" id="setDarkMode" ${dashboard.dark_mode !== false ? 'checked' : ''}>
            <span class="switch-slider" style="position:relative;display:inline-block;width:40px;height:22px"></span>
            <span style="font-size:13px">Dark Mode</span>
          </label>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">Obsidian Save</span></div>
        <div class="form-group">
          <label class="switch" style="width:auto;display:flex;align-items:center;gap:10px">
            <input type="checkbox" id="obsidianEnabled" ${obsidian.enabled !== false ? 'checked' : ''}>
            <span class="switch-slider" style="position:relative;display:inline-block;width:40px;height:22px"></span>
            <span style="font-size:13px">Auto-save chats, goals, and journal entries</span>
          </label>
        </div>
        <div class="form-group">
          <label class="form-label">Vault Path</label>
          <input id="obsidianVaultPath" class="form-input" value="${escapeHtml(obsidian.vault_path || '')}" placeholder="C:\\Users\\mauri\\Documents\\ObsidianVault">
        </div>
        <p style="font-size:12px;color:var(--text-secondary);margin:0">Agent OS writes markdown into an "Agentic OS" folder inside this vault, one file per day.</p>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">Free Tier Limits</span></div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Gemini Flash - Requests/Day</label>
            <input id="limGReqs" class="form-input" type="number" value="${(limits.gemini_flash && limits.gemini_flash.requests_per_day) || 1500}">
          </div>
          <div class="form-group">
            <label class="form-label">Gemini Flash - Tokens/Day</label>
            <input id="limGTokens" class="form-input" type="number" value="${(limits.gemini_flash && limits.gemini_flash.tokens_per_day) || 1000000}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">OpenRouter Free - Requests/Day</label>
            <input id="limORReqs" class="form-input" type="number" value="${(limits.openrouter_free && limits.openrouter_free.requests_per_day) || 100}">
          </div>
          <div class="form-group">
            <label class="form-label">OpenRouter Free - Tokens/Day</label>
            <input id="limORTokens" class="form-input" type="number" value="${(limits.openrouter_free && limits.openrouter_free.tokens_per_day) || 200000}">
          </div>
        </div>
      </div>

      <div class="card" style="border-color:var(--red)">
        <div class="card-header"><span class="card-title" style="color:var(--red)">Danger Zone</span></div>
        <p style="font-size:13px;color:var(--text-secondary);margin-bottom:12px">Reset all settings to factory defaults.</p>
        <button class="btn btn-danger" onclick="resetSettings()">Reset to Defaults</button>
      </div>
    `;
  } catch (err) {
    document.getElementById('settingsForm').innerHTML = `<div class="empty-state"><div class="empty-state-icon">!</div><div class="empty-state-title">${escapeHtml(err.message)}</div></div>`;
  }
}

function toggleAgent(name) {
  const cb = document.getElementById(`agent_${name}`);
  const card = cb.closest('.card');
  const dot = card.querySelector('.agent-dot');
  dot.className = `agent-dot ${cb.checked ? 'online' : 'offline'}`;
}

async function saveAllSettings() {
  try {
    const settings = {
      agent_preferences: {
        codex: { enabled: document.getElementById('agent_codex').checked, binary: document.getElementById('bin_codex').value },
        kilo: { enabled: document.getElementById('agent_kilo').checked, binary: document.getElementById('bin_kilo').value },
        vscode: { enabled: document.getElementById('agent_vscode').checked, binary: document.getElementById('bin_vscode').value },
        opencode: { enabled: document.getElementById('agent_opencode').checked, binary: document.getElementById('bin_opencode').value },
        hermes: { enabled: document.getElementById('agent_hermes').checked, binary: document.getElementById('bin_hermes').value },
        agy: { enabled: document.getElementById('agent_agy').checked, binary: document.getElementById('bin_agy').value },
      },
      omnium: {
        active_route: document.getElementById('omniumActive').value,
        routes: {
          direct: { label: 'Codex Direct', enabled: true, model: document.getElementById('omniumDirectModel').value, base_url: '', api_key_env: '', api_key_setting: '' },
          openrouter: { label: 'OpenRouter', enabled: true, model: document.getElementById('omniumOpenrouterModel').value, base_url: document.getElementById('omniumOpenrouterBase').value || 'https://openrouter.ai/api/v1', api_key_env: 'OPENROUTER_API_KEY', api_key_setting: 'openrouter' },
          omniroute: { label: 'OmniRoute Gateway', enabled: true, model: document.getElementById('omniumOmnirouteModel').value || 'auto', base_url: document.getElementById('omniumOmnirouteBase').value || 'http://localhost:20128/v1', api_key_env: 'OMNIROUTE_API_KEY', api_key_setting: 'omniroute' },
        },
      },
      dashboard: {
        port: parseInt(document.getElementById('setPort').value) || 8080,
        host: document.getElementById('setHost').value || '127.0.0.1',
        dark_mode: document.getElementById('setDarkMode').checked,
      },
      obsidian: {
        enabled: document.getElementById('obsidianEnabled').checked,
        vault_path: document.getElementById('obsidianVaultPath').value,
      },
      api_keys: {
        openai: document.getElementById('keyOpenai') ? document.getElementById('keyOpenai').value : '',
        gemini: document.getElementById('keyGemini').value,
        openrouter: document.getElementById('keyOpenrouter').value,
        omniroute: document.getElementById('keyOmniroute').value,
        netlify: document.getElementById('keyNetlify').value,
        google_search_console: document.getElementById('keyGsc').value,
        omega_indexer: document.getElementById('keyOmega').value,
        reddit: document.getElementById('keyReddit').value,
        instagram: document.getElementById('keyInstagram').value,
        linkedin: document.getElementById('keyLinkedin').value,
        x: document.getElementById('keyX').value,
      },
      publishing_integrations: {
        picassomoes: {
          site_url: document.getElementById('pubPicassoSite').value,
          booking_url: document.getElementById('pubPicassoBooking').value,
          publishing_path: document.getElementById('pubPicassoPath').value,
        },
        netlify: {
          site_id: document.getElementById('pubNetlifySite').value,
          site_name: document.getElementById('pubNetlifySite').value,
        },
        google_search_console: {
          property_url: document.getElementById('pubGscProperty').value,
        },
        omega_indexer: {
          enabled: true,
        },
        reddit: {
          subreddit: document.getElementById('pubRedditSubreddit').value,
        },
        social: {
          instagram_account: document.getElementById('pubInstagram').value,
          linkedin_page: document.getElementById('pubLinkedin').value,
          x_account: document.getElementById('pubX').value,
        },
      },
      free_tier_limits: {
        gemini_flash: {
          requests_per_day: parseInt(document.getElementById('limGReqs').value) || 1500,
          tokens_per_day: parseInt(document.getElementById('limGTokens').value) || 1000000,
        },
        openrouter_free: {
          requests_per_day: parseInt(document.getElementById('limORReqs').value) || 100,
          tokens_per_day: parseInt(document.getElementById('limORTokens').value) || 200000,
        },
      },
    };
    await api.updateSettings(settings);
    showToast('Settings saved successfully', 'success');
  } catch (err) {
    showToast(`Error: ${err.message}`, 'error');
  }
}

async function resetSettings() {
  showModal('Reset to Defaults', `
    <div class="card" style="background:var(--red-dim);border-color:transparent">
      <div class="flex items-center gap-2"><span style="font-size:18px">!</span><div><strong style="font-size:13px">Warning</strong><div style="font-size:12px;color:var(--text-secondary);margin-top:2px">This will reset all settings to factory defaults and cannot be undone.</div></div></div>
    </div>
  `, `
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-danger" onclick="confirmReset()">Reset</button>
  `);
}

async function confirmReset() {
  const defaults = {
    theme: 'dark',
    agent_preferences: { codex: { enabled: true, binary: 'codex' }, opencode: { enabled: true, binary: 'opencode' }, hermes: { enabled: false, binary: 'hermes' }, agy: { enabled: false, binary: 'agy' } },
    omnium: { active_route: 'omniroute', routes: { direct: { label: 'Codex Direct', enabled: true, model: '', base_url: '', api_key_env: '', api_key_setting: '' }, openrouter: { label: 'OpenRouter', enabled: true, model: '', base_url: 'https://openrouter.ai/api/v1', api_key_env: 'OPENROUTER_API_KEY', api_key_setting: 'openrouter' }, omniroute: { label: 'OmniRoute Gateway', enabled: true, model: 'auto', base_url: 'http://localhost:20128/v1', api_key_env: 'OMNIROUTE_API_KEY', api_key_setting: 'omniroute' } } },
    dashboard: { port: 8080, host: '127.0.0.1', dark_mode: true },
    obsidian: { enabled: true, vault_path: 'C:\\Users\\mauri\\Documents\\ObsidianVault' },
    api_keys: { openai: '', gemini: '', openrouter: '', omniroute: '' },
    free_tier_limits: { gemini_flash: { requests_per_day: 1500, tokens_per_day: 1000000 }, openrouter_free: { requests_per_day: 100, tokens_per_day: 200000 } },
  };
  try {
    await api.updateSettings(defaults);
    closeModal();
    showToast('Settings reset to defaults', 'success');
    renderSettings();
  } catch (err) {
    showToast(`Error: ${err.message}`, 'error');
  }
}





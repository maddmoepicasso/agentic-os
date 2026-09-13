const AGENT_PROFILES = {
  codex: { name: 'Codex', avatar: 'CX', desc: 'Primary builder, code editor, tester, and project operator.', accent: '#45aaf2', prompt: 'Build, debug, review, and ship work in this workspace.' },
  kilo: { name: 'Kilo Code', avatar: 'KC', desc: 'Free coding sidecar for implementation and fallback capacity.', accent: '#00d4aa', prompt: 'Use Kilo for coding tasks and quick implementation support.' },
  vscode: { name: 'VS Code', avatar: 'VS', desc: 'Open local projects and developer tools from Agent OS.', accent: '#6c8cff', prompt: 'Ask VS Code to open Agentic OS, PMO AI, or PMO Bot.' },
  opencode: { name: 'opencode', avatar: 'OC', desc: 'Code and DevOps helper for focused tasks.', accent: '#f7b731', prompt: 'Use opencode for concise code and infrastructure support.' },
  hermes: { name: 'Hermes', avatar: 'HM', desc: 'Memory, scheduling, and personal context agent.', accent: '#fd79a8', prompt: 'Ask Hermes about memory, schedules, and context.' },
  agy: { name: 'agy', avatar: 'AG', desc: 'Research and analysis route.', accent: '#a55eea', prompt: 'Use agy for research, comparisons, and analysis.' },
};

async function renderAgent(agent = 'codex', showAllAgents = false) {
  const selected = AGENT_PROFILES[agent] ? agent : 'codex';
  const profile = AGENT_PROFILES[selected];
  const content = document.getElementById('pageContent');
  content.innerHTML = `
    <div class="agent-workspace">
      <aside class="agent-rail">
        <div class="agent-rail-title">Agents</div>
        ${Object.entries(AGENT_PROFILES).map(([key, item]) => `
          <button class="agent-pill ${key === selected ? 'active' : ''}" onclick="navigate('agent-${key}')">
            <span class="agent-avatar" style="--agent-color:${item.accent}">${item.avatar}</span>
            <span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.desc)}</small></span>
          </button>
        `).join('')}
      </aside>
      <section class="agent-chat-panel">
        <header class="agent-hero" style="--agent-color:${profile.accent}">
          <div class="agent-avatar hero-avatar">${profile.avatar}</div>
          <div>
            <h1>${escapeHtml(showAllAgents ? 'AI Chat' : profile.name)}</h1>
            <p>${escapeHtml(showAllAgents ? 'Pick an agent or keep working with Codex.' : profile.desc)}</p>
          </div>
          <div class="agent-live-badge" id="agentLiveBadge">checking</div>
        </header>
        <div id="chatMessages" class="chat-messages modern-chat">
          <div class="chat-welcome">
            <div class="chat-welcome-title">${escapeHtml(profile.name)} is ready</div>
            <div class="chat-welcome-desc">${escapeHtml(profile.prompt)}</div>
          </div>
        </div>
        <div class="agent-composer">
          <button class="btn btn-icon mic-button" onclick="startVoiceInput('chatInput')" title="Voice input">Mic</button>
          <textarea id="chatInput" class="chat-input" rows="1" placeholder="Message ${escapeHtml(profile.name)}..." onkeydown="handleAgentChatKey(event)"></textarea>
          <button class="btn btn-icon" onclick="document.getElementById('chatFileInput').click()" title="Attach file">File</button>
          <input type="file" id="chatFileInput" style="display:none" onchange="handleChatFile(this)">
          <button class="btn btn-primary" onclick="sendAgentMessage('${selected}')" id="chatSendBtn">Send</button>
        </div>
        <div id="chatAttachment" class="agent-attachment" style="display:none">
          <span id="chatAttachmentName"></span>
          <button class="btn btn-sm" onclick="clearChatAttachment()">Remove</button>
        </div>
      </section>
    </div>
  `;
  window._currentAgent = selected;
  document.getElementById('chatInput').focus();
  await updateAgentBadge(selected);
  await renderAgentHistory(selected);
}

async function updateAgentBadge(agent) {
  try {
    const status = await api.getStatus();
    const info = (status.agents || []).find(a => a.name === agent);
    const badge = document.getElementById('agentLiveBadge');
    if (badge) {
      const state = info ? info.status : 'offline';
      badge.textContent = state === 'online' ? 'LIVE' : state.toUpperCase();
      badge.className = `agent-live-badge ${state}`;
    }
  } catch {}
}

async function renderAgentHistory(agent) {
  try {
    const data = await api.searchChatHistory('', agent, 80);
    const messages = data.messages || [];
    if (!messages.length) return;
    const container = document.getElementById('chatMessages');
    container.innerHTML = '';
    messages.forEach(msg => addAgentChatMessage(msg.role, msg.content, msg.agent || agent, msg.timestamp));
  } catch {}
}

function handleAgentChatKey(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendAgentMessage(window._currentAgent || 'codex');
  }
  autoResizeTextarea(event.target);
}

function autoResizeTextarea(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 150) + 'px';
}

async function sendAgentMessage(agent) {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  const fileInput = document.getElementById('chatFileInput');
  const file = fileInput && fileInput.files && fileInput.files[0];
  if (!message && !file) return;

  input.value = '';
  input.style.height = 'auto';
  addAgentChatMessage('user', message || `Attached ${file.name}`, agent);
  const typingId = showAgentTyping(agent);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 200000);
  try {
    const response = file
      ? await api.chatWithFile(agent, message, file, controller)
      : await api.chat(agent, message, controller);
    clearTimeout(timeoutId);
    removeTypingIndicator(typingId);
    clearChatAttachment();
    addAgentChatMessage('assistant', response.response.content, agent);
  } catch (err) {
    clearTimeout(timeoutId);
    removeTypingIndicator(typingId);
    const msg = err.name === 'AbortError' ? 'Request timed out after 200 seconds.' : err.message;
    addAgentChatMessage('assistant', `Error: ${msg}`, agent);
  }
}

function addAgentChatMessage(role, content, agent, timestamp) {
  const container = document.getElementById('chatMessages');
  if (!container) return;
  const welcome = container.querySelector('.chat-welcome');
  if (welcome) welcome.remove();
  const profile = AGENT_PROFILES[agent] || AGENT_PROFILES.codex;
  const msg = document.createElement('div');
  msg.className = `chat-message ${role}`;
  msg.innerHTML = `
    <div class="chat-message-avatar" style="border-color:${profile.accent};color:${profile.accent}">${role === 'user' ? 'ME' : profile.avatar}</div>
    <div class="chat-message-body">
      <div class="chat-message-header">
        <span class="chat-message-agent">${role === 'user' ? 'You' : escapeHtml(profile.name)}</span>
        <span class="chat-message-time">${timestamp ? timeAgo(timestamp) : 'just now'}</span>
      </div>
      <div class="chat-message-content">${escapeHtml(content || '')}</div>
    </div>
  `;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

function showAgentTyping(agent) {
  const id = 'typing-' + Date.now();
  const profile = AGENT_PROFILES[agent] || AGENT_PROFILES.codex;
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-message assistant';
  div.id = id;
  div.innerHTML = `
    <div class="chat-message-avatar" style="border-color:${profile.accent};color:${profile.accent}">${profile.avatar}</div>
    <div class="chat-message-body">
      <div class="chat-message-header"><span class="chat-message-agent">${escapeHtml(profile.name)}</span></div>
      <div class="typing-indicator"><span></span><span></span><span></span></div>
    </div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return id;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function handleChatFile(fileInput) {
  const file = fileInput.files && fileInput.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
    showToast('File too large (max 2 MB)', 'error');
    fileInput.value = '';
    return;
  }
  document.getElementById('chatAttachment').style.display = '';
  document.getElementById('chatAttachmentName').textContent = `${file.name} (${formatBytes(file.size)})`;
}

function clearChatAttachment() {
  const fileInput = document.getElementById('chatFileInput');
  if (fileInput) fileInput.value = '';
  const bar = document.getElementById('chatAttachment');
  if (bar) bar.style.display = 'none';
}

function startVoiceInput(targetId) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast('Voice input is not supported in this browser.', 'warning');
    return;
  }
  const target = document.getElementById(targetId);
  if (!target) return;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.continuous = false;
  recognition.onstart = () => showToast('Listening...', 'info');
  recognition.onerror = event => showToast(`Voice input stopped: ${event.error}`, 'warning');
  recognition.onresult = event => {
    const text = Array.from(event.results).map(result => result[0].transcript).join(' ');
    const spacer = target.value && !target.value.endsWith(' ') ? ' ' : '';
    target.value = `${target.value}${spacer}${text}`;
    target.dispatchEvent(new Event('input', { bubbles: true }));
    target.focus();
  };
  recognition.start();
}

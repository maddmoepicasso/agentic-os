async function renderChat() {
  await loadScript('/dashboard/pages/agent.js');
  return renderAgent('codex', true);
}

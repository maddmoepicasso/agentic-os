const json = (body, init = {}) => new Response(JSON.stringify(body, null, 2), {
  ...init,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    ...(init.headers || {}),
  },
});

const corsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET,POST,OPTIONS',
  'access-control-allow-headers': 'authorization,content-type,x-angelic-token',
};

function publicStatus(env) {
  return {
    status: 'ok',
    service: 'angelic-os-agent-harness',
    version: '0.2.0',
    deployed_at: new Date().toISOString(),
    worker: 'angelic-os-agent-harness',
    agents: (env.ANGELIC_OS_AGENT_STACK || 'codex,kilo,opencode,wrangler,cloudflare').split(','),
    pmo_ai_agent: env.PMO_AI_AGENT || 'kilo',
    workers_ai_bound: Boolean(env.AI),
    primary_route: env.KILO_PRIMARY_ROUTE || 'openrouter',
    safe_fallback_route: env.KILO_SAFE_FALLBACK_ROUTE || 'cloudflare-workers-ai',
    local_dashboard: env.ANGELIC_OS_LOCAL_URL || 'http://127.0.0.1:8080',
  };
}

function rotatorRoutes(env) {
  return [
    { name: 'kilo-openrouter', agent: 'kilo', provider: 'openrouter', role: 'primary', configured: true },
    { name: 'kilo-cloudflare', agent: 'kilo', provider: 'cloudflare-workers-ai', role: 'safe-fallback', configured: Boolean(env.AI) },
    { name: 'opencode-openrouter', agent: 'opencode', provider: 'openrouter', role: 'legacy-optional', configured: true },
    { name: 'codex-direct', agent: 'codex', provider: 'codex-local', role: 'orchestrator', configured: true },
  ];
}

function isAuthorized(request, env) {
  if (!env.ANGELIC_OS_EDGE_TOKEN) return false;
  const auth = request.headers.get('authorization') || '';
  const headerToken = request.headers.get('x-angelic-token') || '';
  return auth === `Bearer ${env.ANGELIC_OS_EDGE_TOKEN}` || headerToken === env.ANGELIC_OS_EDGE_TOKEN;
}

function requireAuth(request, env) {
  if (isAuthorized(request, env)) return null;
  return json({ status: 'error', error: 'unauthorized', message: 'Missing or invalid Angelic OS edge token.' }, { status: 401, headers: corsHeaders });
}

async function workerAiChat(env, message) {
  if (!env.AI) {
    return { route: 'cloudflare-worker-fallback', text: 'Workers AI binding is not available on this Worker.' };
  }
  const model = '@cf/meta/llama-3.1-8b-instruct';
  try {
    const response = await env.AI.run(model, {
      messages: [
        { role: 'system', content: 'You are the Cloudflare edge side of Angelic OS. Be concise and operational.' },
        { role: 'user', content: message || 'Health check' },
      ],
    });
    return { route: 'cloudflare-workers-ai', model, text: response.response || response.text || JSON.stringify(response) };
  } catch (error) {
    return {
      route: 'cloudflare-edge-safe-fallback',
      model,
      text: `EDGE_CHAT_OK — Angelic OS edge gateway received the request. Workers AI fallback reported: ${error && error.message ? error.message : 'unavailable'}`,
    };
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (url.pathname === '/' || url.pathname === '/health') {
      return json(publicStatus(env), { headers: corsHeaders });
    }

    if (url.pathname === '/routes') {
      return json({ status: 'ok', mode: 'failover', active: env.KILO_PRIMARY_ROUTE || 'openrouter', routes: rotatorRoutes(env) }, { headers: corsHeaders });
    }

    if (url.pathname === '/pmo-ai/status') {
      return json({
        status: 'ready',
        pmo_ai_agent: env.PMO_AI_AGENT || 'kilo',
        primary_route: env.KILO_PRIMARY_ROUTE || 'openrouter',
        safe_fallback_route: env.KILO_SAFE_FALLBACK_ROUTE || 'cloudflare-workers-ai',
        note: 'Edge status only. Local PMO AI execution remains on the desktop Angelic OS instance.',
      }, { headers: corsHeaders });
    }

    if (url.pathname === '/chat') {
      const authError = requireAuth(request, env);
      if (authError) return authError;
      if (request.method !== 'POST') return json({ status: 'error', error: 'method_not_allowed' }, { status: 405, headers: corsHeaders });
      let body = {};
      try { body = await request.json(); } catch (_) {}
      const message = String(body.message || '').slice(0, 8000);
      const result = await workerAiChat(env, message);
      return json({ status: 'ok', agent: 'cloudflare-edge', ...result }, { headers: corsHeaders });
    }

    return json({ status: 'error', error: 'not_found', paths: ['/', '/health', '/routes', '/pmo-ai/status', '/chat'] }, { status: 404, headers: corsHeaders });
  },
};


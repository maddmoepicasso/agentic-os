# OpenRouter Hy3 in Agent OS

**Status:** Opt-in comparison lane

Agent OS exposes Tencent Hy3 through the existing Kilo/OpenRouter provider path. The route is named `openrouter-hy3` and uses `tencent/hy3:free`.

## Configuration

Keep the key outside the repository. Configure `OPENROUTER_API_KEY` in the Kilo/OpenRouter credential store or process environment. Do not paste a key into `data/settings.json` or commit one to source control.

Select the route through the existing Kilo route API or dashboard settings:

```json
{
  "route": "openrouter-hy3",
  "model": "tencent/hy3:free"
}
```

The default remains Cloudflare Workers AI. Hy3 is text-only, has a 262,144-token context window, supports configurable reasoning, and its free endpoint is rate-limited. Treat free-route availability, limits, and pricing as changeable provider state.

## Suggested evaluation

Run the same small task set against the existing default and Hy3:

1. Read-only Agent OS registry audit.
2. Small code change with a unit test.
3. Multi-step documentation or research synthesis.

Record correctness, tool-call reliability, latency, failure mode, and token/provider cost before considering a default change. Do not use the free route for healthcare records, secrets, trading actions, deployments, payments, or other high-risk work.

Provider reference: <https://openrouter.ai/tencent/hy3:free/api>

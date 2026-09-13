# 10 · Thumbnail Studio  ·  *optional*

Make better YouTube thumbnails. Upload your thumbnail (and any reference images — a logo, a screenshot, your face), tell it what to improve in plain English, and **gpt-image-2** generates better versions. Every round is saved to your Obsidian vault so you build a library of what worked.

You'll find it in the sidebar under **Thumbnails**.

---

## What you need

1. **An OpenAI API key with credits.** ⚠️ Important: the API is **prepaid and completely separate from ChatGPT Plus**. Paying for ChatGPT does *not* fund the API. You add credits to it separately.
2. **Python 3 + Pillow** (a tiny image library). Almost certainly already on your Mac.

That's it. The image generator itself is included in this pack.

---

## Setup (5 minutes)

### Step 1 — Get an OpenAI API key + add credits
1. Go to <https://platform.openai.com> → sign in (or make a free account).
2. **Settings → Billing** → add a payment method → **add credits** (even $5 is plenty — each thumbnail costs roughly $0.04). Turn on auto-recharge if you want it to never run dry.
3. **API Keys** → *Create new secret key* → copy it (starts with `sk-...`).

> 💡 If you ever see *"insufficient_quota"* in the tool, it means this credit balance is empty — top it up here.

### Step 2 — Connect your key

The generator is already built in at `source/scripts/thumbnail-generator/`. You do not need a Claude subscription or a separate skill installation.

**Easy way:** tell your coding agent: "Set up the bundled Thumbnail Studio generator. Install Pillow for Python 3, then tell me how to enter my own OPENAI_API_KEY privately. Do not ask me to paste my key into chat."

The generator reads `OPENAI_API_KEY` from the dashboard's environment, or from `~/.claude/skills/youtube-thumbnails/.env` for existing setups. Keep this file outside the app so updates preserve it. The `.env` file should contain `OPENAI_API_KEY=your_key_here` with your real key entered locally; keep its permissions private to your user account.

For manual setup, install the image library with `python3 -m pip install --user Pillow`, then set your key in your local environment before starting Agent OS. On Windows, use your installed Python command if it is named `python` instead of `python3`. Your AI can help with the setup commands; you enter your own key and handle any billing.

### Step 3 — Use it
1. Open the dashboard → **Thumbnails** in the sidebar.
2. (Optional) Drop in one or more reference images — your current thumbnail, a logo, a screenshot.
3. Type what you want: *"Bigger bolder title, red + black text on a white background, my shocked face on the right, clean and aligned."*
4. Pick how many **Versions** you want (1–4) and hit **Generate better versions**.
5. A stopwatch shows how long it's taking (~1–2 min for all of them — they run in parallel).

Each version is a separate full-frame image. Download the ones you like.

---

## Where everything is saved

Every generation is logged to your Obsidian vault under **`Thumbnails/`**:
- the reference image(s) you uploaded,
- every version it made,
- and your exact instructions + how long it took.

So you always have a record of what you asked for and what came out — open the **Past thumbnails** section in the tool, or browse the `Thumbnails` folder in Obsidian.

---

## Good to know

- **Your instructions guide the image.** The app adds composition guidance; the optional redesign and variation controls change how much it reworks your reference.
- **The "Versions" buttons** are how you get a few options — each one is a separate image. So you don't need to write "give me a few" in your prompt.
- **Cost** is roughly $0.04 per image, billed to your own OpenAI credits.

---

## If it doesn't work

| What you see | Fix |
|---|---|
| *"out of credits / insufficient_quota"* | Add credits at platform.openai.com → Settings → Billing (separate from ChatGPT Plus). |
| *"OpenAI key rejected"* | Re-check the key in `~/.claude/skills/youtube-thumbnails/.env` — no quotes, no spaces. |
| *"No images produced"* | Make sure the bundled `source/scripts/thumbnail-generator/generate.py` exists and Pillow is installed (`python3 -c "import PIL"`). |

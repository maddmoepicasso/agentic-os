# Ad Studio (optional)

Ask your local AI assistant: "Set up Agent OS Ad Studio with my own Codex login and my Hermes/Grok image connection. Check the installed CLI options, run a draft, and ask me to enter any login details myself."

Open **Ad Studio** in the sidebar. Add your offer and audience, choose a format and one to four versions, and optionally add up to three reference images. Generate copy, review it, then render a creative. This prepares assets; it does not publish or buy ads.

Copy uses your installed Codex CLI and its login. Run `codex login` yourself if needed. Use a current CLI with support for `--ignore-user-config`. The default copy model is `gpt-5.6-sol`; optional `AD_STUDIO_COPY_MODEL` selects another model your account supports.

Images use the bundled `scripts/ad-studio-image.py` with Hermes's `tools/xai_http.py` and your own Grok authentication. `AD_STUDIO_PYTHON` must point to the Python interpreter in your Hermes installation (the automatic location is `~/.hermes/hermes-agent/.venv/bin/python`; some installations use `venv` instead). `AD_STUDIO_HERMES_PROFILE` can select the full path of the Hermes profile containing your Grok login. By default the image connection follows your active Hermes profile. Have your AI locate these paths. The Hermes Python environment also needs `httpx` and `Pillow`. Without that optional setup, image rendering is unavailable but the dashboard still opens.

These services use your own account limits and may incur costs. Enter your own credentials; never paste them into chat. Sessions are stored locally under `~/.agentic-os/`. This ZIP contains no personal profiles or logins.

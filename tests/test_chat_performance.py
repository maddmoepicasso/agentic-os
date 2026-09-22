"""Regression tests for responsive, evidence-backed Agent OS chat."""
import json
import sys
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path
from unittest import mock

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import server  # noqa: E402


class ChatPerformanceTests(unittest.TestCase):
    def test_codex_json_parser_collects_message_and_session(self):
        raw = "\n".join([
            json.dumps({"type": "thread.started", "thread_id": "thread-123"}),
            "not-json",
            json.dumps({"type": "item.completed", "item": {"type": "agent_message", "text": "READY"}}),
        ])
        message, session_id = server._parse_codex_json_output(raw)
        self.assertEqual(message, "READY")
        self.assertEqual(session_id, "thread-123")

    def test_hermes_cleaner_removes_terminal_metadata(self):
        raw = "\x1b[32mSession: angelic-os-dashboard\x1b[0m\nREADY\nDuration: 1.2s\n"
        self.assertEqual(server.clean_hermes_output(raw), "READY")

    def test_codex_prompt_is_bounded_and_contains_request(self):
        def fake_read(path):
            name = Path(path).name
            if name == "AGENTS.md":
                return "agent " * 1000
            return "context " * 5000

        history = {"messages": [
            {"role": "user", "agent": "codex", "content": "old " * 1000},
            {"role": "assistant", "agent": "codex", "content": "reply " * 1000},
        ]}
        with mock.patch.object(server, "read_file", side_effect=fake_read), \
             mock.patch.object(server, "load_chat_history", return_value=history), \
             mock.patch.object(server, "_relevant_brain_chunks", return_value=[]):
            prompt = server.build_codex_prompt("Reply exactly BOUNDED_OK")
        self.assertIn("Reply exactly BOUNDED_OK", prompt)
        self.assertLess(len(prompt), 10000)

    def test_old_successful_probe_is_reported_stale(self):
        old = (datetime.now(timezone.utc) - timedelta(hours=25)).isoformat().replace("+00:00", "Z")
        probes = {"agents": {"codex": {
            "verified": True,
            "passed": True,
            "verification": "live_chat",
            "last_verified": old,
            "duration_ms": 100,
            "detail": "old result",
        }}}
        with mock.patch.object(server, "check_agent", return_value={"name": "codex", "status": "online"}), \
             mock.patch.object(server, "load_json_file", return_value=probes):
            health = server.agent_health("codex")
        self.assertEqual(health["status"], "stale")
        self.assertGreater(health["probe_age_seconds"], 24 * 3600)

    def test_chat_turn_records_success_and_latency(self):
        saved = []
        probes = []
        audits = []
        with mock.patch.object(server, "save_chat_message", side_effect=saved.append), \
             mock.patch.object(server, "execute_agent", return_value="TURN_OK"), \
             mock.patch.object(server, "record_agent_probe", side_effect=lambda *args: probes.append(args)), \
             mock.patch.object(server, "append_audit", side_effect=audits.append):
            result = server.complete_chat_turn("codex", "hello")
        self.assertEqual(result["status"], "ok")
        self.assertEqual(result["response"]["content"], "TURN_OK")
        self.assertEqual([m["role"] for m in saved], ["user", "assistant"])
        self.assertTrue(probes[0][1])
        self.assertEqual(audits[0]["result_status"], "ok")
        self.assertGreaterEqual(result["latency_ms"], 0)


if __name__ == "__main__":
    unittest.main()

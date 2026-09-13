#!/usr/bin/env python3
"""Agentic OS â€” Event-Driven Scheduler Engine

File watcher + cron-based scheduler with execution history.
Handles job reloading, webhook triggers, skill execution events.
"""
import json
import os
import subprocess
import urllib.error
import urllib.request
import sys
import threading
import time
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional, Callable

BASE_DIR = Path(__file__).parent.resolve()
JOBS_DIR = BASE_DIR / "jobs"
HISTORY_FILE = BASE_DIR.parent / "data" / "scheduler-history.json"

_event_listeners = []
_on_files_changed = []

def on_event(listener: Callable):
    _event_listeners.append(listener)
    return listener

def on_files_changed(cb: Callable):
    _on_files_changed.append(cb)
    return cb

def emit_event(event: dict):
    event["timestamp"] = datetime.now(timezone.utc).isoformat()
    event["id"] = str(uuid.uuid4())[:8]
    for listener in _event_listeners:
        try:
            listener(event)
        except Exception:
            pass
    _save_history(event)

def _load_history() -> list:
    if not HISTORY_FILE.exists():
        return []
    try:
        data = json.loads(HISTORY_FILE.read_text())
        return data if isinstance(data, list) else []
    except json.JSONDecodeError:
        backup = HISTORY_FILE.with_suffix(HISTORY_FILE.suffix + f".broken-{int(time.time())}.bak")
        try:
            HISTORY_FILE.replace(backup)
        except Exception:
            pass
        return []

def _save_history(event: dict):
    history = _load_history()
    history.append(event)
    if len(history) > 1000:
        history = history[-1000:]
    HISTORY_FILE.write_text(json.dumps(history, indent=2))

def get_history(limit: int = 100) -> list:
    history = _load_history()
    return history[-limit:]

def _load_job_file(path: Path) -> Optional[dict]:
    try:
        raw = path.read_text(encoding="utf-8-sig").strip()
        if not raw:
            return None
        data = json.loads(raw)
        return data if isinstance(data, dict) else None
    except (json.JSONDecodeError, OSError, UnicodeDecodeError):
        return None

def load_job_definitions() -> list:
    jobs = []
    for f in sorted(JOBS_DIR.glob("*.json")):
        data = _load_job_file(f)
        if data is None:
            continue
        data["_file"] = str(f)
        jobs.append(data)
    return jobs

def get_job_by_id(job_id: str) -> Optional[dict]:
    for job in load_job_definitions():
        if job.get("id") == job_id:
            return job
    return None

def get_job_by_name(name: str) -> Optional[dict]:
    for job in load_job_definitions():
        if job.get("name") == name:
            return job
    return None

def run_skill(skill_name: str, trigger: str = "scheduler", input_text: str = ""):
    """Execute a skill through the Agentic OS API using Codex as primary agent."""
    audit_file = BASE_DIR.parent / "audit" / "audit.log"
    timestamp = datetime.now(timezone.utc).isoformat()
    entry = {
        "action": "scheduler_run",
        "skill": skill_name,
        "trigger": trigger,
        "agent": "codex",
        "timestamp": timestamp,
    }
    with open(audit_file, "a") as f:
        f.write(json.dumps(entry) + "\n")

    emit_event({
        "type": "skill_run",
        "skill": skill_name,
        "trigger": trigger,
        "agent": "codex",
        "status": "started",
    })

    payload = json.dumps({"agent": "codex", "input": input_text or f"Triggered by {trigger}."}).encode("utf-8")
    request = urllib.request.Request(
        f"http://127.0.0.1:8080/api/skills/{skill_name}/run",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=240) as response:
            result = json.loads(response.read().decode("utf-8"))
        emit_event({
            "type": "skill_run",
            "skill": skill_name,
            "trigger": trigger,
            "agent": "codex",
            "status": "completed",
            "run_id": result.get("run_id"),
        })
        print(f"[{timestamp}] Skill '{skill_name}' completed by Codex via {trigger}")
        return result
    except Exception as e:
        emit_event({
            "type": "skill_run",
            "skill": skill_name,
            "trigger": trigger,
            "agent": "codex",
            "status": "failed",
            "error": str(e),
        })
        return {"status": "failed", "skill": skill_name, "trigger": trigger, "agent": "codex", "error": str(e)}

# â”€â”€â”€ File Watcher â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

class JobFileWatcher:
    """Watch scheduler/jobs/ for changes and notify listeners."""
    def __init__(self, interval: float = 2.0):
        self.interval = interval
        self._known = {}
        self._running = False
        self._thread = None

    def start(self):
        self._running = True
        self._scan()
        self._thread = threading.Thread(target=self._loop, daemon=True)
        self._thread.start()

    def stop(self):
        self._running = False

    def _scan(self):
        current = {}
        for f in JOBS_DIR.glob("*.json"):
            try:
                mtime = f.stat().st_mtime
                current[str(f)] = mtime
            except OSError:
                pass
        if self._known and current != self._known:
            for cb in _on_files_changed:
                try:
                    cb()
                except Exception:
                    pass
        self._known = current

    def _loop(self):
        while self._running:
            time.sleep(self.interval)
            self._scan()


# â”€â”€â”€ Cron Scheduler â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

class CronScheduler:
    """Simple in-process cron scheduler using APScheduler."""
    def __init__(self):
        self._scheduler = None
        self._watcher = JobFileWatcher()

    def start(self):
        try:
            from apscheduler.schedulers.background import BackgroundScheduler as BS
            from apscheduler.triggers.cron import CronTrigger as CT
        except ImportError:
            print("APScheduler not found â€” auto-installing...")
            try:
                subprocess.check_call(
                    [sys.executable, "-m", "pip", "install", "apscheduler", "--quiet"]
                )
                from apscheduler.schedulers.background import BackgroundScheduler as BS
                from apscheduler.triggers.cron import CronTrigger as CT
            except Exception as e:
                print(f"Auto-install failed ({e}). Run: pip install apscheduler")
                return
        self._scheduler = BS()
        self._reload_jobs()
        self._scheduler.start()
        self._watcher.start()
        _on_files_changed.append(self._reload_jobs)
        print(f"Agentic OS Scheduler running. Jobs loaded from: {JOBS_DIR}")

    def stop(self):
        self._watcher.stop()
        if self._scheduler:
            self._scheduler.shutdown(wait=False)

    def _reload_jobs(self):
        if not self._scheduler:
            return
        from apscheduler.triggers.cron import CronTrigger as CT
        for job in self._scheduler.get_jobs():
            job.remove()
        for data in load_job_definitions():
            if not data.get("enabled", True):
                continue
            try:
                self._scheduler.add_job(
                    run_skill,
                    CT.from_crontab(data["cron"]),
                    args=[data["skill"], "cron"],
                    id=data.get("id", data["name"]),
                    name=data["name"],
                    replace_existing=True,
                    misfire_grace_time=60,
                )
            except Exception as e:
                print(f"  Failed to schedule {data.get('name')}: {e}")
        count = len(self._scheduler.get_jobs())
        print(f"  Scheduled {count} jobs")


# â”€â”€â”€ Standalone Entry â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

def main():
    scheduler = CronScheduler()
    scheduler.start()
    try:
        while True:
            time.sleep(60)
    except KeyboardInterrupt:
        scheduler.stop()
        print("Scheduler stopped.")

if __name__ == "__main__":
    main()





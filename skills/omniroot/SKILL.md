---
name: omniroot
description: Run or prepare OmniRoot Linux rootkit detection from Angelic OS
version: 1.0.0
author: Angelic OS
tags: [security, linux, rootkit, scanner, omniroot]
---

# OmniRoot

OmniRoot is installed at `C:\Angels\tools\OmniRoot` from commit `40019c17d17b462514568a5883453a45091e1a1b`.

## Purpose

Use OmniRoot to scan Linux systems for hidden processes, modules, ports, files, preload hijacks, tampered binaries, writable/executable memory, and deleted/fileless programs.

## Requirements

- Linux environment, preferably WSL Ubuntu on this Windows host or a remote Linux host.
- `gcc`, `make`, and `python3`.
- `sudo` for complete scan coverage.

## Windows Host Status

This Windows host currently has WSL available but no Linux distribution installed, so the skill should not claim OmniRoot can run locally until a distro is installed. If asked to run locally, first check `wsl -l -v` and report the prerequisite if no distro exists.

## Run Commands

From Linux or WSL:

```bash
cd /mnt/c/Angels/tools/OmniRoot
make
sudo ./omniroot --no-color
```

Useful options:

```bash
sudo ./omniroot --deep --no-color
sudo ./omniroot --only pids,ports,preload --json
sudo ./omniroot --save report.txt --no-color
```

## Safety

Do not run OmniRoot against production or remote systems without explicit user approval. Do not install a WSL distribution or Linux packages without explicit user approval.

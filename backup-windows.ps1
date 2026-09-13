$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$destDir = Join-Path $root "backups"
New-Item -ItemType Directory -Force -Path $destDir | Out-Null
$dest = Join-Path $destDir "agentic-os-backup-$stamp.zip"
$items = @(
  "AGENTS.md","README.md","server.py","requirements.txt","package.json","wrangler.jsonc",
  "scheduler","skills","prompts","brain","registry","standards",
  "data\settings.json","data\agent-routes.json","data\goals.json"
) | ForEach-Object { Join-Path $root $_ } | Where-Object { Test-Path -LiteralPath $_ }
Compress-Archive -LiteralPath $items -DestinationPath $dest -Force
Write-Output $dest

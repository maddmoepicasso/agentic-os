param(
  [Parameter(Mandatory=$true)]
  [string]$BackupZip
)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not (Test-Path -LiteralPath $BackupZip)) {
  throw "Backup not found: $BackupZip"
}
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$safety = Join-Path $root "backups\pre-restore-safety-$stamp.zip"
& (Join-Path $root "backup-windows.ps1") | Out-Null
Expand-Archive -LiteralPath $BackupZip -DestinationPath $root -Force
Write-Output "Restored from $BackupZip"

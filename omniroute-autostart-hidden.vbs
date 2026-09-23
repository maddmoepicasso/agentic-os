Option Explicit

Dim shell
Dim command

Set shell = CreateObject("WScript.Shell")
command = "powershell.exe -NoProfile -NonInteractive -ExecutionPolicy Bypass -WindowStyle Hidden -Command ""$env:OMNIROUTE_SERVER_HOST='127.0.0.1'; & 'C:\Users\mauri\AppData\Roaming\npm\omniroute.ps1' serve --no-open --no-tray --port 20128"""
shell.Run command, 0, True

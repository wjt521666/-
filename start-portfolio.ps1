$ErrorActionPreference = 'Stop'

$projectDir = 'C:\Users\Administrator\Documents\个人站'
$nodeExe = 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
$viteCli = Join-Path $projectDir 'node_modules\vite\bin\vite.js'
$siteUrl = 'http://127.0.0.1:5173/'

$isRunning = Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue

if (-not $isRunning) {
    if (-not (Test-Path -LiteralPath $nodeExe)) {
        throw "Node.js runtime not found: $nodeExe"
    }

    if (-not (Test-Path -LiteralPath $viteCli)) {
        throw "Website dependencies are missing: $viteCli"
    }

    Start-Process `
        -FilePath $nodeExe `
        -ArgumentList @($viteCli, '--host', '127.0.0.1', '--port', '5173') `
        -WorkingDirectory $projectDir `
        -WindowStyle Hidden

    for ($attempt = 0; $attempt -lt 30; $attempt++) {
        Start-Sleep -Milliseconds 300
        if (Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue) {
            break
        }
    }
}

Start-Process $siteUrl

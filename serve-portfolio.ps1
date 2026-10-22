$ErrorActionPreference = 'Stop'

$projectDir = 'C:\Users\Administrator\Documents\个人站'
$nodeExe = 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
$viteCli = Join-Path $projectDir 'node_modules\vite\bin\vite.js'

Set-Location -LiteralPath $projectDir
& $nodeExe $viteCli --host 127.0.0.1 --port 5173

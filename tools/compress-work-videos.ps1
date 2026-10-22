$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$sourceRoot = Join-Path $projectRoot 'public\assets\work-library'
$outputRoot = Join-Path $projectRoot 'public\assets\compressed\work-library'
$videos = Get-ChildItem -LiteralPath $sourceRoot -Recurse -File -Filter '*.mp4'
$index = 0

foreach ($video in $videos) {
    $index++
    $relativePath = $video.FullName.Substring($sourceRoot.Length).TrimStart('\')
    $outputPath = Join-Path $outputRoot $relativePath
    $outputDirectory = Split-Path -Parent $outputPath
    New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null

    Write-Output "[$index/$($videos.Count)] $relativePath"
    & ffmpeg -hide_banner -loglevel error -y -i $video.FullName -map '0:v:0' -map '0:a?' -c:v libx264 -preset fast -crf 27 -maxrate 2200k -bufsize 4400k -vf 'scale=min(1920\,iw):-2' -c:a aac -b:a 96k -movflags +faststart $outputPath
    if ($LASTEXITCODE -ne 0) {
        throw "Compression failed for $relativePath; original remains at $($video.FullName)"
    }

    $sourceSize = [math]::Round($video.Length / 1MB, 1)
    $outputSize = [math]::Round((Get-Item -LiteralPath $outputPath).Length / 1MB, 1)
    Write-Output "  ${sourceSize} MB -> ${outputSize} MB"
}

Write-Output "Finished $($videos.Count) videos. Original files remain unchanged."

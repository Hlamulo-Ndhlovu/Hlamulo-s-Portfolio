$NoOpen = $args -contains "-NoOpen"
$port = 5500
$sitePath = Join-Path $PSScriptRoot "index.html"
$siteUrl = "http://localhost:$port/index.html"

if (-not (Test-Path $sitePath)) {
    Write-Error "Could not find index.html in $PSScriptRoot"
    exit 1
}

$serverRunning = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue

if (-not $serverRunning) {
    Start-Process powershell -ArgumentList @(
        "-NoExit",
        "-Command",
        "cd '$PSScriptRoot'; python -m http.server $port"
    )

    Start-Sleep -Seconds 1
}

if (-not $NoOpen) {
    Start-Process $siteUrl
}

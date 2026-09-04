$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$javaHome = 'C:\Program Files\Android\Android Studio\jbr'

if (-not (Test-Path (Join-Path $javaHome 'bin\java.exe'))) {
    throw "JDK Android Studio tidak ditemukan di $javaHome."
}

$env:JAVA_HOME = $javaHome
Push-Location (Join-Path $projectRoot 'android')
try {
    & .\gradlew.bat assembleDebug
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
finally {
    Pop-Location
}

$apk = Join-Path $projectRoot 'android\app\build\outputs\apk\debug\app-debug.apk'
Write-Host "APK berhasil dibuat: $apk"
param(
    [ValidateSet('devices', 'install')]
    [string]$Action = 'devices'
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$adb = Join-Path $env:LOCALAPPDATA 'Android\Sdk\platform-tools\adb.exe'
$apk = Join-Path $projectRoot 'android\app\build\outputs\apk\debug\app-debug.apk'

if (-not (Test-Path $adb)) {
    throw "Android SDK tidak ditemukan. Pastikan Android Studio dan SDK Platform-Tools sudah terpasang."
}

if ($Action -eq 'devices') {
    $deviceOutput = @(& $adb devices)
    $deviceOutput
    $connectedDevices = @($deviceOutput | Select-Object -Skip 1 | Where-Object { $_ -match '\t(device|unauthorized|offline)$' })
    if ($connectedDevices.Count -eq 0) {
        Write-Host ''
        Write-Host 'Belum ada HP Android yang terdeteksi.' -ForegroundColor Yellow
        Write-Host 'Hubungkan HP dengan kabel USB data, aktifkan USB debugging, lalu izinkan komputer di HP.'
    } elseif ($connectedDevices | Where-Object { $_ -match '\tunauthorized$' }) {
        Write-Host ''
        Write-Host 'HP terdeteksi, tetapi belum diizinkan.' -ForegroundColor Yellow
        Write-Host 'Buka layar HP dan tekan Izinkan pada dialog USB debugging, lalu ulangi perintah ini.'
    }
    exit 0
}

if (-not (Test-Path $apk)) {
    throw "APK belum ada. Jalankan 'npm run android:build' terlebih dahulu."
}

$deviceLines = @(& $adb devices | Select-Object -Skip 1 | Where-Object { $_ -match '\tdevice$' })
if ($deviceLines.Count -eq 0) {
    throw "Tidak ada HP Android terdeteksi. Aktifkan USB debugging, hubungkan kabel USB, lalu izinkan komputer pada HP."
}

& $adb install -r $apk
exit $LASTEXITCODE
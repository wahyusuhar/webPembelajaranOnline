# Build aplikasi Android dan iOS

Sumber web tetap berada di root proyek. Folder `www/` dibuat otomatis dari
seluruh halaman, stylesheet, JavaScript, aset, dan vendor saat proses build.

## Sinkronisasi setelah mengubah web

Jika menggunakan offline/bundled assets di dalam APK:
```bash
npm install
npm run cap:copy
```
Perintah tersebut memperbarui folder aset `android` dan `ios` secara instan dari root proyek web.

## Cara Agar APK Otomatis Terupdate Tanpa Build Ulang

Ada 2 cara agar setiap kali Anda mengubah file HTML, CSS, JS, atau gambar, aplikasi APK di HP **otomatis ikut diperbarui tanpa perlu kompilasi/build ulang APK**:

### Metode 1: Menggunakan URL Web Hosting (Untuk Penggunaan Online / Rilis)
Jika web Anda di-upload ke layanan hosting (misalnya Vercel, Netlify, GitHub Pages, Firebase Hosting, atau server domain sendiri):
1. Buka file `capacitor.config.json` di root proyek.
2. Tambahkan pengaturan `server.url`:
```json
{
  "appId": "com.wahyusuhar.webpembelajaran",
  "appName": "Web Pembelajaran Online",
  "webDir": "www",
  "bundledWebRuntime": false,
  "server": {
    "url": "https://nama-web-anda.vercel.app",
    "cleartext": true
  },
  "android": {
    "allowMixedContent": true
  }
}
```
3. Sinkronkan satu kali ke proyek Android:
```bash
npm run cap:copy
```
4. Build dan install APK ke HP **satu kali saja**:
```powershell
npm run android:build
npm run android:install
```
> **Hasil:** Setelah APK terpasang di HP, APK akan memuat website langsung dari URL tersebut. Setiap kali Anda mengubah web dan menguploadnya ke hosting, pengguna yang membuka APK di HP akan **otomatis melihat versi terbaru secara instan tanpa perlu build atau install ulang APK**!

---

### Metode 2: Live Reload via Wi-Fi Lokal (Saat Sedang Coding / Uji Coba di HP)
Jika ingin melihat perubahan langsung di HP saat sedang mengedit kode di laptop:
1. Pastikan laptop dan HP terhubung ke **Wi-Fi yang sama**.
2. Cek alamat IP laptop Anda (buka PowerShell lalu ketik `ipconfig`, cari *IPv4 Address*, misalnya `192.168.1.15`).
3. Jalankan server lokal di laptop:
```bash
npx serve -l 8080
```
4. Di `capacitor.config.json`, masukkan IP laptop Anda:
```json
"server": {
  "url": "http://192.168.1.15:8080",
  "cleartext": true
}
```
5. Jalankan `npm run cap:copy`.
6. Buka aplikasi di HP. Setiap kali Anda menyimpan file di laptop (Ctrl+S), aplikasi di HP akan langsung merefresh dan memperbarui tampilannya secara realtime!


## Android

APK Android ini dibuat sebagai satu APK universal untuk perangkat Android
API 23 (Android 6.0) dan yang lebih baru. Tidak ada APK yang dapat menjamin
semua HP Android karena setiap perangkat memiliki batas versi Android dan
arsitektur yang berbeda.

Buka proyek native dengan Android Studio:

```bash
npm run android:open
```

Untuk membuat APK debug dari terminal Windows, jalankan dari folder proyek:

```powershell
cd android
.\gradlew.bat assembleDebug
```

Cara yang lebih mudah dari root proyek:

```powershell
npm run android:build
npm run android:devices
npm run android:install
```

Script tersebut memakai `adb.exe` langsung dari Android SDK, jadi tidak perlu
menambahkan ADB ke PATH Windows.

Sebelum `npm run android:install`, aktifkan **Opsi pengembang** dan **USB
debugging** pada HP, hubungkan kabel USB, lalu pilih **Izinkan** saat dialog
kepercayaan komputer muncul.

Untuk distribusi ke banyak pengguna, gunakan release APK/AAB yang ditandatangani
dengan keystore developer dan publikasikan melalui Google Play. APK debug untuk
uji lokal dapat memunculkan peringatan Play Protect.

## iOS

Folder iOS sudah disiapkan, tetapi build dan signing iOS membutuhkan macOS,
Xcode, dan CocoaPods. Salin repository ini ke Mac, lalu jalankan:

```bash
npm install
npm run cap:sync
npm run ios:open
```

App ID: `com.wahyusuhar.webpembelajaran`
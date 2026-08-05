# Warkop JM Eiko - Realtime Update via Firebase

Website kini mendukung **sinkronisasi realtime antar-perangkat** menggunakan Firebase Firestore.
Perubahan yang dilakukan melalui halaman admin (komputer) akan langsung tampil di handphone
dalam hitungan detik.

## ⚠️ LANGKAH PENTING: Isi Kredensial Firebase

Karena data disimpan di cloud, Anda **wajib** mengisi file `firebase-config.js` dengan kredensial
project Firebase Anda sendiri. Tanpa ini, website tetap berjalan tapi hanya memakai penyimpanan lokal
(seperti sebelumnya — tidak realtime antar-perangkat).

### Cara Membuat Project Firebase (gratis, ±5 menit)

1. Buka **https://console.firebase.google.com** dan login dengan akun Google Anda.
2. Klik **"Add project"** / **"Buat project"**, beri nama misal `warkop-jm-eiko`, lalu ikuti langkahnya (matikan Google Analytics jika tidak perlu).
3. Setelah project dibuat, klik ikon **`</>` (Web)** untuk menambahkan app web.
4. Beri nama app (misal `warkop-web`), lalu klik **"Register app"**.
5. Firebase akan menampilkan blok `firebaseConfig` seperti ini:
   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "warkop-jm-eiko.firebaseapp.com",
     projectId: "warkop-jm-eiko",
     storageBucket: "warkop-jm-eiko.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef"
   };
   ```
6. **Salin nilai-nilai tersebut** dan tempel ke `firebase-config.js` menggantikan placeholder `YOUR_...`.
7. Aktifkan **Cloud Firestore Database**:
   - Di sidebar konsol, pilih **"Firestore Database"** → **"Create database"**.
   - Pilih mode **Production** (atau test), lalu pilih lokasi terdekat (misal `asia-southeast2` untuk Jakarta).
8. Buat **3 koleksi**: `settings`, `menu`, dan `gallery`.
9. **Atur aturan keamanan (Rules)** agar bisa dibaca publik & ditulis:
   - Tab **Rules** pada Firestore, isi dengan:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
   > ⚠️ Ini memudahkan demo, tapi untuk keamanan produksi sebaiknya gunakan Firebase Authentication agar hanya admin yang bisa menulis.

10. Simpan & deploy. Setelah itu upload/deploy ulang website ke Vercel.

### Bagaimana Data Tersimpan

- Admin menyimpan data → ditulis ke **Firestore** (cloud) + `localStorage` (lokal).
- Halaman publik mendengarkan perubahan Firestore via `onSnapshot` → otomatis re-render.
- Jika belum ada data di Firestore, data `localStorage` admin otomatis di-seed ke cloud saat login pertama kali.

## Struktur File

- `firebase-config.js` — konfigurasi Firebase + helper (WAJIB diisi).
- `admin.html` / `admin.js` — dashboard admin (menulis ke Firestore).
- `index.html` / `app.js` — halaman publik (membaca realtime dari Firestore).

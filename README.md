# Warkop JM Eiko - Web Admin & Publik

Website Warkop JM Eiko dengan dashboard admin untuk mengelola konten halaman
(judul, gambar, menu, dan galeri).

## Cara Kerja

- **Admin** (`admin.html`) digunakan untuk mengubah pengaturan halaman, menu, dan galeri.
- Data disimpan di **`localStorage` browser** tempat admin melakukan perubahan.
- **Halaman publik** (`index.html`) membaca data dari `localStorage` yang sama.

> ⚠️ **Catatan penting:** Karena data disimpan di `localStorage`, perubahan hanya
> berlaku per-browser/per-perangkat. Jika admin mengubah di laptop, perubahan tersebut
> hanya tampil di browser laptop tersebut, bukan di handphone — kecuali browser
> handphone Anda membaca data dari device yang sama.

## Struktur File

- `index.html` / `app.js` — halaman publik website.
- `admin.html` / `admin.js` — dashboard admin.
- `style.css` / `admin.css` — styling.
- `images/` — aset gambar.

## Cara Menjalankan secara Lokal

Buka `index.html` di browser, atau jalankan server lokal:

```bash
npx serve .
```

Akses:
- Website: `http://localhost:3000`
- Admin: `http://localhost:3000/admin.html` (password: `admin123`)
</content>

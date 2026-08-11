# Warkop JM Eiko - Web Admin & Publik

Website Warkop JM Eiko dengan dashboard admin untuk mengelola konten halaman
(judul, gambar, menu, dan galeri), dengan sinkronisasi cloud lintas-perangkat.

## Cara Kerja

- **Admin** (`admin.html`) digunakan untuk mengubah pengaturan halaman, menu, dan galeri.
- Data disimpan di **cloud (Supabase)** sehingga perubahan dari admin tampil di
  **semua perangkat** (laptop, HP, dll) secara real-time.
- **Halaman publik** (`index.html`) membaca data dari cloud dan otomatis terupdate.
- `localStorage` tetap dipakai sebagai **fallback/cache lokal** bila cloud tidak diakses.

## Konfigurasi Cloud (Supabase)

Agar sinkronisasi lintas-perangkat aktif, isi kredensial di **`supabase-config.js`**:

1. Buat project gratis di https://supabase.com
2. Buka **Project Settings → API**, salin **Project URL** dan **anon public key**
3. Isi 2 nilai di `supabase-config.js`:
   ```js
   const SUPABASE_URL = "https://xxxx.supabase.co";
   const SUPABASE_ANON_KEY = "eyJhbGciOi...";
   ```
4. Jalankan SQL berikut di **SQL Editor** Supabase (membuat tabel & seed awal):

```sql
create table if not exists settings (
  id int primary key default 1,
  hero_title text,
  hero_desc text,
  hero_image text,
  about_since text,
  about_title text,
  about_desc1 text,
  about_desc2 text,
  about_image text,
  updated_at timestamptz default now()
);
create table if not exists menu (
  id serial primary key,
  name text, category text, price text,
  "desc" text, image text, sort_order int default 0
);
create table if not exists gallery (
  id serial primary key,
  title text, category text, image text, sort_order int default 0
);
alter table settings enable row level security;
alter table menu enable row level security;
alter table gallery enable row level security;
drop policy if exists "public_settings" on settings;
create policy "public_settings" on settings for all using (true) with check (true);
drop policy if exists "public_menu" on menu;
create policy "public_menu" on menu for all using (true) with check (true);
drop policy if exists "public_gallery" on gallery;
create policy "public_gallery" on gallery for all using (true) with check (true);
insert into settings (id) values (1) on conflict (id) do nothing;
```

> 💡 Tanpa mengisi kredensial, situs tetap berjalan normal memakai `localStorage`
> (perubahan hanya berlaku di perangkat tempat Anda mengedit).

## Struktur File

- `index.html` / `app.js` — halaman publik website.
- `admin.html` / `admin.js` — dashboard admin.
- `supabase-config.js` — kredensial client cloud.
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

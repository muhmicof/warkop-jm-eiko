-- ============================================================
-- SQL SCHEMA FOR SUPABASE WARKOP JM EIKO
-- Jalankan query ini di Supabase SQL Editor:
-- https://supabase.com/dashboard/project/cnhtuttnvopqeearuyii/editor
-- ============================================================

-- 1. Tabel Settings (Pengaturan Halaman Hero & About)
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

-- 2. Tabel Menu (Daftar Makanan & Minuman)
create table if not exists menu (
  id serial primary key,
  name text,
  category text,
  price text,
  "desc" text,
  image text,
  sort_order int default 0
);

-- 3. Tabel Gallery (Galeri Foto Warkop)
create table if not exists gallery (
  id serial primary key,
  title text,
  category text,
  image text,
  sort_order int default 0
);

-- 4. Aktifkan Row Level Security (RLS) pada semua tabel
alter table settings enable row level security;
alter table menu enable row level security;
alter table gallery enable row level security;

-- 5. Buat Kebijakan Akses Publik (Read, Insert, Update, Delete)
drop policy if exists "public_settings" on settings;
create policy "public_settings" on settings for all using (true) with check (true);

drop policy if exists "public_menu" on menu;
create policy "public_menu" on menu for all using (true) with check (true);

drop policy if exists "public_gallery" on gallery;
create policy "public_gallery" on gallery for all using (true) with check (true);

-- 6. Inisialisasi data default baris id=1 pada tabel settings
insert into settings (id, hero_title, hero_desc, hero_image, about_since, about_title, about_desc1, about_desc2, about_image)
values (
  1,
  'Hangatnya Kopi,<br>Kuatnya Persaudaraan.',
  'Lebih dari sekadar tempat ngopi. Warkop JM Eiko adalah ruang persinggahan di mana tawa, cerita, dan semangat gotong royong menyatu dalam setiap seduhan kopi tubruk.',
  'images/hero_kettle_coffee.png',
  '2010',
  'Semangat Gotong Royong dalam Segelas Kopi',
  'Berawal dari sebuah warung sederhana di sudut jalan, Warkop JM Eiko didirikan dengan satu tujuan: menjadi ruang interaksi yang hangat bagi siapa saja. Kami percaya bahwa secangkir kopi tubruk yang diaduk dengan ikhlas mampu mencairkan suasana dan merekatkan persaudaraan.',
  'Di sini, tidak ada sekat. Pekerja kantoran, mahasiswa, hingga warga sekitar duduk bersama, bertukar sapa, dan berbagi cerita. Rasa otentik sajian kami dijaga dengan dedikasi, menggunakan bahan-bahan lokal terbaik yang merakyat namun berkualitas premium.',
  'images/warkop_about.png'
)
on conflict (id) do update set
  hero_title = coalesce(settings.hero_title, excluded.hero_title),
  hero_desc = coalesce(settings.hero_desc, excluded.hero_desc),
  hero_image = coalesce(settings.hero_image, excluded.hero_image),
  about_since = coalesce(settings.about_since, excluded.about_since),
  about_title = coalesce(settings.about_title, excluded.about_title),
  about_desc1 = coalesce(settings.about_desc1, excluded.about_desc1),
  about_desc2 = coalesce(settings.about_desc2, excluded.about_desc2),
  about_image = coalesce(settings.about_image, excluded.about_image);

-- ============================================================
-- 7. Tabel Visitor Daily (Statistik Pengunjung Harian)
-- ============================================================
create table if not exists visitor_daily (
  day date primary key,
  count int4 default 0
);

-- Aktifkan Row Level Security (RLS) pada tabel visitor_daily
alter table visitor_daily enable row level security;

-- Buat Kebijakan Akses Publik (Semua akses)
drop policy if exists "public_visitor_daily" on visitor_daily;
create policy "public_visitor_daily" on visitor_daily for all using (true) with check (true);

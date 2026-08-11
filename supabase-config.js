/* -------------------------------------------------------------
   WARKOP JM EIKO - SUPABASE CLIENT CONFIGURATION
   -------------------------------------------------------------
   ISI 2 NILAI DI BAWAH INI dengan kredensial dari project
   Supabase Anda (https://supabase.com):

   1. SUPABASE_URL        -> Project Settings > API > Project URL
   2. SUPABASE_ANON_KEY   -> Project Settings > API > anon public key

   Setelah diisi, data admin (setting, menu, galeri) akan
   tersimpan di cloud sehingga tampil di SEMUA perangkat
   (laptop, HP, dll) dan perubahan langsung tersinkronisasi.
------------------------------------------------------------- */

// ====== ISI KREDENSIAL DI SINI ======
const SUPABASE_URL = "https://cnhtuttnvopqeearuyii.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_AntKsM16F8oyecx94_R7DQ_5H0Lppj_";
// ======================================

// Helper: true jika kredensial sudah diisi pengguna
function supabaseConfigured() {
    return (
        SUPABASE_URL.indexOf("GANTI-DENGAN") === -1 &&
        SUPABASE_ANON_KEY.indexOf("GANTI-DENGAN") === -1
    );
}

// Helper: buat client Supabase (hanya jika dikonfigurasi)
function getSupabaseClient() {
    if (!supabaseConfigured()) return null;
    try {
        return supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch (e) {
        console.warn("Supabase client gagal dibuat:", e);
        return null;
    }
}
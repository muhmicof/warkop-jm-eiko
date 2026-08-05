/* -------------------------------------------------------------
   WARKOP JM EIKO - FIREBASE CONFIGURATION & HELPER
   -------------------------------------------------------------
   FILE INI WAJIB DIISI DENGAN KREDENSIAL PROJECT FIREBASE ANDA.
   Lihat panduan di file README atau catatan di bawah.

   Cara mengisi:
   1. Buka https://console.firebase.google.com
   2. Tambahkan project baru (misal: warkop-jm-eiko)
   3. Klik ikon </> (Web) untuk mendaftarkan app
   4. Salin nilai firebaseConfig dari SDK setup
   5. Tempel di bawah ini menggantikan placeholder
   6. Aktifkan Firestore Database (mode production) dan buat koleksi:
      - settings
      - menu
      - gallery
------------------------------------------------------------- */

// ==========================================
// KONFIGURASI FIREBASE (ISI DI SINI)
// ==========================================
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// ==========================================
// INISIALISASI FIREBASE (TIDAK PERLU DIUBAH)
// ==========================================
let db = null;

function initFirebase() {
    const isPlaceholder = firebaseConfig.apiKey.startsWith('YOUR_');
    if (isPlaceholder) {
        console.warn('Firebase belum dikonfigurasi. Menggunakan penyimpanan lokal.');
        return false;
    }
    if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        db = firebase.firestore();
        return true;
    }
    return false;
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

// Simpan data ke Firestore (dokumen tunggal bernama "main")
async function saveDataToFirestore(collectionName, data) {
    if (!db) return false;
    try {
        await db.collection(collectionName).doc('main').set(data);
        return true;
    } catch (err) {
        console.error('Gagal menyimpan ke Firestore:', err);
        return false;
    }
}

// Ambil data dari Firestore
async function getDataFromFirestore(collectionName) {
    if (!db) return null;
    try {
        const docRef = await db.collection(collectionName).doc('main').get();
        if (docRef.exists) {
            return docRef.data();
        }
        return null;
    } catch (err) {
        console.error('Gagal mengambil dari Firestore:', err);
        return null;
    }
}

// Mendengarkan perubahan realtime dari Firestore
// onUpdate akan dipanggil setiap ada perubahan data
function listenToFirestore(collectionName, onUpdate) {
    if (!db) return null;
    try {
        return db.collection(collectionName).doc('main').onSnapshot((doc) => {
            if (doc.exists) {
                onUpdate(doc.data());
            }
        }, (err) => {
            console.error('Real-time listener error:', err);
        });
    } catch (err) {
        console.error('Gagal memasang listener:', err);
        return null;
    }
}

// Cek apakah dokumen 'main' sudah ada di Firestore
async function isFirestoreDocExists(collectionName) {
    if (!db) return false;
    try {
        const docRef = await db.collection(collectionName).doc('main').get();
        return docRef.exists;
    } catch (err) {
        console.error('Gagal cek dokumen Firestore:', err);
        return false;
    }
}

// Sinkronkan data localStorage lokal ke Firestore (hanya jika Firestore masih kosong)
// Dipanggil saat admin login agar data awal ikut tersimpan di cloud
async function seedFirestoreFromLocal(storageKey, collectionName) {
    if (!db) return;
    try {
        const exists = await isFirestoreDocExists(collectionName);
        if (!exists) {
            const localData = localStorage.getItem(storageKey);
            if (localData) {
                await saveDataToFirestore(collectionName, JSON.parse(localData));
                console.log(`Firestore di-seed dari localStorage untuk ${collectionName}`);
            }
        }
    } catch (err) {
        console.error('Gagal seed Firestore:', err);
    }
}

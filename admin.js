/* -------------------------------------------------------------
   WARKOP JM EIKO - ADMIN PANELS LOGIC
   Session Security, Canvas Compression, localStorage CRUD Operations
------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // ==========================================
    // 0. SUPABASE CLOUD SYNC
    // ==========================================
    const supabaseClient = (typeof getSupabaseClient === 'function') ? getSupabaseClient() : null;
    const useCloud = !!supabaseClient;

    // ==========================================
    // 1. DEFAULT DATA CONFIGURATION
    // ==========================================
    const defaultSettings = {
        hero_title: 'Hangatnya Kopi,<br>Kuatnya Persaudaraan.',
        hero_desc: 'Lebih dari sekadar tempat ngopi. Warkop JM Eiko adalah ruang persinggahan di mana tawa, cerita, dan semangat gotong royong menyatu dalam setiap seduhan kopi tubruk.',
        hero_image: 'images/hero_kettle_coffee.png',
        about_since: '2010',
        about_title: 'Semangat Gotong Royong dalam Segelas Kopi',
        about_desc1: 'Berawal dari sebuah warung sederhana di sudut jalan, Warkop JM Eiko didirikan dengan satu tujuan: menjadi ruang interaksi yang hangat bagi siapa saja. Kami percaya bahwa secangkir kopi tubruk yang diaduk dengan ikhlas mampu mencairkan suasana dan merekatkan persaudaraan.',
        about_desc2: 'Di sini, tidak ada sekat. Pekerja kantoran, mahasiswa, hingga warga sekitar duduk bersama, bertukar sapa, dan berbagi cerita. Rasa otentik sajian kami dijaga dengan dedikasi, menggunakan bahan-bahan lokal terbaik yang merakyat namun berkualitas premium.',
        about_image: 'images/warkop_about.png'
    };

    const defaultMenu = [
        {
            name: 'Indomie Internet (Indomie Telur Kornet)',
            category: 'makanan',
            price: 'Rp 18.000',
            desc: 'Kenyamanan hakiki dalam semangkok mi instan yang dimasak presisi dengan tambahan telur setengah matang dan kornet gurih.',
            image: 'images/indomie_telur_kornet.png'
        },
        {
            name: 'Kopi Tubruk Original',
            category: 'kopi',
            price: 'Rp 7.000',
            desc: 'Kopi robusta lokal pilihan yang diseduh langsung dengan air panas, menyisakan ampas tebal beraroma kuat.',
            image: 'images/kopi_tubruk_original.png'
        },
        {
            name: 'Pisang Goreng Keju Susu',
            category: 'cemilan',
            price: 'Rp 12.000',
            desc: 'Pisang kepok pilihan digoreng krispi dengan limpahan keju parut gurih dan susu kental manis.',
            image: 'images/pisang_goreng_keju.png'
        },
        {
            name: 'Kopi Susu Tradisional',
            category: 'kopi',
            price: 'Rp 10.000',
            desc: 'Seduhan kopi tubruk pekat yang dipadu manisnya susu kental manis legendaris.',
            image: 'images/hero_kettle_coffee.png'
        },
        {
            name: 'Kopi Joss',
            category: 'kopi',
            price: 'Rp 12.000',
            desc: 'Kopi hitam khas Yogyakarta yang disajikan dengan arang membara langsung di dalam gelas.',
            image: 'images/kopi_tubruk_original.png'
        },
        {
            name: 'Teh Tarik Hangat',
            category: 'minuman',
            price: 'Rp 9.000',
            desc: 'Teh hitam premium dipadu susu kental manis yang ditarik hingga menghasilkan busa lembut melimpah.',
            image: 'images/hero_kettle_coffee.png'
        },
        {
            name: 'Es Jeruk Peras',
            category: 'minuman',
            price: 'Rp 8.000',
            desc: 'Jeruk peras segar alami disajikan dingin untuk menyegarkan hari Anda.',
            image: 'images/hero_kettle_coffee.png'
        },
        {
            name: 'Wedang Jahe Madu',
            category: 'minuman',
            price: 'Rp 12.000',
            desc: 'Rebusan jahe emprit bakar yang digeprek, ditambah madu hutan murni berkhasiat tinggi.',
            image: 'images/warkop_about.png'
        },
        {
            name: 'Nasi Goreng Warkop',
            category: 'makanan',
            price: 'Rp 17.000',
            desc: 'Nasi goreng bumbu kampung pedas manis khas warkop, dilengkapi telur ceplok dan kerupuk.',
            image: 'images/indomie_telur_kornet.png'
        },
        {
            name: 'Magelangan (Nasi Goreng Mawut)',
            category: 'makanan',
            price: 'Rp 19.000',
            desc: 'Perpaduan nasi dan mi goreng instan yang diaduk rata dengan bumbu wajan membara warkop.',
            image: 'images/indomie_telur_kornet.png'
        },
        {
            name: 'Roti Bakar Cokelat Keju',
            category: 'cemilan',
            price: 'Rp 13.000',
            desc: 'Roti tawar tebal dibakar margarin harum, diisi meises cokelat melimpah dan taburan keju.',
            image: 'images/pisang_goreng_keju.png'
        },
        {
            name: 'Tempe Mendoan Hangat',
            category: 'cemilan',
            price: 'Rp 10.000',
            desc: '5 lembar tempe iris tipis digoreng tepung bumbu ketumbar daun bawang setengah matang, disajikan dengan kecap rawit.',
            image: 'images/warkop_about.png'
        }
    ];

    const defaultGallery = [
        {
            title: 'Seni Kopi Tubruk',
            category: 'Aktivitas',
            image: 'images/hero_kettle_coffee.png'
        },
        {
            title: 'Ruang Hangat Komunitas',
            category: 'Suasana',
            image: 'images/warkop_about.png'
        },
        {
            title: 'Indomie Internet Juara',
            category: 'Sajian',
            image: 'images/indomie_telur_kornet.png'
        },
        {
            title: 'Cemilan Sore Gurih',
            category: 'Sajian',
            image: 'images/pisang_goreng_keju.png'
        },
        {
            title: 'Kopi Tubruk Robusta',
            category: 'Produk',
            image: 'images/kopi_tubruk_original.png'
        }
    ];

    // Initialize local storage keys if they don't exist yet
    if (!localStorage.getItem('warkop_settings')) {
        localStorage.setItem('warkop_settings', JSON.stringify(defaultSettings));
    }
    if (!localStorage.getItem('warkop_menu')) {
        localStorage.setItem('warkop_menu', JSON.stringify(defaultMenu));
    }
    if (!localStorage.getItem('warkop_gallery')) {
        localStorage.setItem('warkop_gallery', JSON.stringify(defaultGallery));
    }

// Database Loaders (localStorage = local working copy,
// cloud sync otomatis ke Supabase jika sudah dikonfigurasi)
    const getSettings = () => JSON.parse(localStorage.getItem('warkop_settings'));
    const saveSettings = (data) => {
        localStorage.setItem('warkop_settings', JSON.stringify(data));
        if (useCloud) syncSettingsCloud(data);
    };
    const getMenu = () => JSON.parse(localStorage.getItem('warkop_menu'));
    const saveMenu = (data) => {
        localStorage.setItem('warkop_menu', JSON.stringify(data));
        if (useCloud) syncMenuCloud(data);
    };
    const getGallery = () => JSON.parse(localStorage.getItem('warkop_gallery'));
    const saveGallery = (data) => {
        localStorage.setItem('warkop_gallery', JSON.stringify(data));
        if (useCloud) syncGalleryCloud(data);
    };

    // ==========================================
    // 1B. SUPABASE CLOUD SYNC FUNCTIONS
    // ==========================================
    // Settings: upsert single row (id=1)
    async function syncSettingsCloud(data) {
        try {
            const { id, ...fields } = data;
            const res = await supabaseClient.from('settings').upsert({ id: 1, ...fields });
            if (res.error) throw res.error;
        } catch (e) {
            console.warn('Gagal sinkronisasi settings ke cloud:', e);
            showToast('Data tersimpan lokal, tetapi gagal sinkron ke cloud.', true);
        }
    }

    // Menu: replace all rows (delete + insert) agar urutan sesuai
    async function syncMenuCloud(items) {
        try {
            const { error: delErr } = await supabaseClient.from('menu').delete().neq('id', 0);
            if (delErr) throw delErr;
            if (items.length) {
                const rows = items.map((it, i) => ({
                    name: it.name,
                    category: it.category,
                    price: it.price,
                    desc: it.desc,
                    image: it.image,
                    sort_order: i
                }));
                const { error: insErr } = await supabaseClient.from('menu').insert(rows);
                if (insErr) throw insErr;
            }
        } catch (e) {
            console.warn('Gagal sinkronisasi menu ke cloud:', e);
            showToast('Data tersimpan lokal, tetapi gagal sinkron ke cloud.', true);
        }
    }

    // Gallery: replace all rows (delete + insert)
    async function syncGalleryCloud(items) {
        try {
            const { error: delErr } = await supabaseClient.from('gallery').delete().neq('id', 0);
            if (delErr) throw delErr;
            if (items.length) {
                const rows = items.map((it, i) => ({
                    title: it.title,
                    category: it.category,
                    image: it.image,
                    sort_order: i
                }));
                const { error: insErr } = await supabaseClient.from('gallery').insert(rows);
                if (insErr) throw insErr;
            }
        } catch (e) {
            console.warn('Gagal sinkronisasi galeri ke cloud:', e);
            showToast('Data tersimpan lokal, tetapi gagal sinkron ke cloud.', true);
        }
    }

// Load semua data dari cloud ke localStorage (untuk edit dari perangkat mana pun)
    async function loadCloudData() {
        if (!useCloud) return;
        try {
            const [settingsRes, menuRes, galleryRes] = await Promise.all([
                supabaseClient.from('settings').select('*').limit(1).maybeSingle(),
                supabaseClient.from('menu').select('*').order('sort_order', { ascending: true }),
                supabaseClient.from('gallery').select('*').order('sort_order', { ascending: true })
            ]);

            if (settingsRes.error) throw settingsRes.error;
            if (menuRes.error) throw menuRes.error;
            if (galleryRes.error) throw galleryRes.error;

            // Jika cloud masih kosong atau ada field bernilai null, lengkapi dengan data default
            if (!settingsRes.data || !settingsRes.data.hero_title) {
                const currentLocal = JSON.parse(localStorage.getItem('warkop_settings')) || {};
                const settingsToSync = { ...defaultSettings, ...currentLocal, ...(settingsRes.data || {}) };
                delete settingsToSync.id;
                await syncSettingsCloud(settingsToSync);
                localStorage.setItem('warkop_settings', JSON.stringify({ id: 1, ...settingsToSync }));
            } else {
                localStorage.setItem('warkop_settings', JSON.stringify(settingsRes.data));
            }

            if (!menuRes.data || menuRes.data.length === 0) {
                const currentLocal = JSON.parse(localStorage.getItem('warkop_menu'));
                const menuToSync = (currentLocal && currentLocal.length > 0) ? currentLocal : defaultMenu;
                await syncMenuCloud(menuToSync);
                const fresh = await supabaseClient.from('menu').select('*').order('sort_order', { ascending: true });
                if (fresh.data && fresh.data.length > 0) {
                    localStorage.setItem('warkop_menu', JSON.stringify(fresh.data));
                } else {
                    localStorage.setItem('warkop_menu', JSON.stringify(menuToSync));
                }
            } else {
                localStorage.setItem('warkop_menu', JSON.stringify(menuRes.data));
            }

            if (!galleryRes.data || galleryRes.data.length === 0) {
                const currentLocal = JSON.parse(localStorage.getItem('warkop_gallery'));
                const galleryToSync = (currentLocal && currentLocal.length > 0) ? currentLocal : defaultGallery;
                await syncGalleryCloud(galleryToSync);
                const fresh = await supabaseClient.from('gallery').select('*').order('sort_order', { ascending: true });
                if (fresh.data && fresh.data.length > 0) {
                    localStorage.setItem('warkop_gallery', JSON.stringify(fresh.data));
                } else {
                    localStorage.setItem('warkop_gallery', JSON.stringify(galleryToSync));
                }
            } else {
                localStorage.setItem('warkop_gallery', JSON.stringify(galleryRes.data));
            }

            // Re-render dashboard (if initDashboard already ran)
            if (typeof renderDashboardAll === 'function') {
                renderDashboardAll();
            }
        } catch (e) {
            console.warn('Gagal memuat data dari cloud, memakai data lokal:', e);
        }
    }


    // ==========================================
    // 2. PASSWORD SECURITY ACCESS CONTROL
    // ==========================================
    const loginView = document.getElementById('loginView');
    const dashboardView = document.getElementById('dashboardView');
    const loginForm = document.getElementById('loginForm');
    const adminPasswordInput = document.getElementById('adminPassword');
    const btnTogglePassword = document.getElementById('btnTogglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const loginError = document.getElementById('loginError');
    const btnLogout = document.getElementById('btnLogout');

const checkLoginState = () => {
        if (sessionStorage.getItem('warkop_admin_logged') === 'true') {
            loginView.classList.add('hide');
            dashboardView.classList.remove('hide');
            initDashboard();
            // Muat data terbaru dari cloud (jika dikonfigurasi) agar
            // dashboard menampilkan data yang sama di semua perangkat.
            loadCloudData();
        } else {
            loginView.classList.remove('hide');
            dashboardView.classList.add('hide');
        }
    };

    // Toggle password view
    btnTogglePassword.addEventListener('click', () => {
        const isPassword = adminPasswordInput.type === 'password';
        adminPasswordInput.type = isPassword ? 'text' : 'password';
        eyeIcon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
        lucide.createIcons();
    });

    // Login Form Submit
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pwd = adminPasswordInput.value.trim();
        
        // Match user requested default password: admin123
        if (pwd === 'admin123') {
            sessionStorage.setItem('warkop_admin_logged', 'true');
            loginError.classList.add('hide');
            adminPasswordInput.value = '';
            checkLoginState();
            showToast('Selamat Datang! Login Berhasil.');
        } else {
            loginError.classList.remove('hide');
            setTimeout(() => loginError.classList.add('hide'), 4000);
        }
    });

    // Logout Action
    btnLogout.addEventListener('click', () => {
        sessionStorage.removeItem('warkop_admin_logged');
        checkLoginState();
        showToast('Anda telah keluar dari dashboard.', true);
    });

    // Run Security Check on load
    checkLoginState();


    // ==========================================
    // 3. NAVIGATION & TABS CONTROL
    // ==========================================
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const activeTabTitle = document.getElementById('activeTabTitle');
    const activeTabSubtitle = document.getElementById('activeTabSubtitle');
    const mobileNavSelect = document.getElementById('mobileNavSelect');

    const switchTab = (tabId) => {
        // Toggle Sidebar Nav States
        sidebarItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-tab-trigger') === tabId) {
                item.classList.add('active');
            }
        });

        // Toggle mobile selector option
        mobileNavSelect.value = tabId;

        // Toggle Tab Panes
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });
        document.getElementById(`${tabId}Tab`).classList.add('active');

        // Update Header Titles
        if (tabId === 'settings') {
            activeTabTitle.textContent = 'Pengaturan Halaman';
            activeTabSubtitle.textContent = 'Kelola gambar utama, judul, dan deskripsi halaman utama.';
        } else if (tabId === 'menu') {
            activeTabTitle.textContent = 'Kelola Menu Makanan & Minuman';
            activeTabSubtitle.textContent = 'Tambah, ubah, dan hapus menu makanan, kopi, cemilan, dan minuman.';
        } else if (tabId === 'gallery') {
            activeTabTitle.textContent = 'Kelola Galeri Foto';
            activeTabSubtitle.textContent = 'Atur foto-foto yang dipajang di galeri halaman utama.';
        }
    };

    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = e.currentTarget.getAttribute('data-tab-trigger');
            switchTab(tabId);
        });
    });

    mobileNavSelect.addEventListener('change', (e) => {
        switchTab(e.target.value);
    });


    // ==========================================
    // 4. IMAGE CANVAS COMPRESSION UTILITY
    // ==========================================
    // Converts files to compressed JPEG base64 strings
    const processImageUpload = (fileInput, previewImgElement, callback) => {
        const file = fileInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                const maxDim = 800; // Resize large images down to max 800px width/height

                if (width > maxDim || height > maxDim) {
                    if (width > height) {
                        height = Math.round((height * maxDim) / width);
                        width = maxDim;
                    } else {
                        width = Math.round((width * maxDim) / height);
                        height = maxDim;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Compress quality to 70% to conserve localStorage limit
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                
                if (previewImgElement) {
                    previewImgElement.src = compressedBase64;
                    previewImgElement.classList.remove('hide');
                }
                
                if (callback) callback(compressedBase64);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };


    // ==========================================
    // 5. DASHBOARD MAIN CODE IMPLEMENTATION
    // ==========================================
    function initDashboard() {
        // --- 5A. LOAD STATIC SETTINGS FORM ---
        const settingsForm = document.getElementById('settingsForm');
        const heroTitleInput = document.getElementById('heroTitleInput');
        const heroDescInput = document.getElementById('heroDescInput');
        const heroPreviewImg = document.getElementById('heroPreviewImg');
        const heroImageInput = document.getElementById('heroImageInput');
        
        const aboutSinceInput = document.getElementById('aboutSinceInput');
        const aboutTitleInput = document.getElementById('aboutTitleInput');
        const aboutDesc1Input = document.getElementById('aboutDesc1Input');
        const aboutDesc2Input = document.getElementById('aboutDesc2Input');
        const aboutPreviewImg = document.getElementById('aboutPreviewImg');
        const aboutImageInput = document.getElementById('aboutImageInput');

        let tempHeroBase64 = null;
        let tempAboutBase64 = null;

        // Populate values
        const loadSettingsFormValues = () => {
            const set = getSettings();
            heroTitleInput.value = set.hero_title;
            heroDescInput.value = set.hero_desc;
            heroPreviewImg.src = set.hero_image;
            tempHeroBase64 = set.hero_image;

            aboutSinceInput.value = set.about_since;
            aboutTitleInput.value = set.about_title;
            aboutDesc1Input.value = set.about_desc1;
            aboutDesc2Input.value = set.about_desc2;
            aboutPreviewImg.src = set.about_image;
            tempAboutBase64 = set.about_image;
        };
        loadSettingsFormValues();

        // Bind image inputs
        heroImageInput.addEventListener('change', () => {
            processImageUpload(heroImageInput, heroPreviewImg, (base64) => {
                tempHeroBase64 = base64;
            });
        });

        aboutImageInput.addEventListener('change', () => {
            processImageUpload(aboutImageInput, aboutPreviewImg, (base64) => {
                tempAboutBase64 = base64;
            });
        });

        // Submit Settings
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const setObj = {
                hero_title: heroTitleInput.value.trim(),
                hero_desc: heroDescInput.value.trim(),
                hero_image: tempHeroBase64,
                about_since: aboutSinceInput.value.trim(),
                about_title: aboutTitleInput.value.trim(),
                about_desc1: aboutDesc1Input.value.trim(),
                about_desc2: aboutDesc2Input.value.trim(),
                about_image: tempAboutBase64
            };
            saveSettings(setObj);
            showToast('Pengaturan halaman berhasil diperbarui!');
        });


        // --- 5B. CRUD MENU MANAGEMENT ---
        const adminMenuList = document.getElementById('adminMenuList');
        const menuItemForm = document.getElementById('menuItemForm');
        const menuItemIndex = document.getElementById('menuItemIndex');
        const menuItemName = document.getElementById('menuItemName');
        const menuItemCategory = document.getElementById('menuItemCategory');
        const menuItemPrice = document.getElementById('menuItemPrice');
        const menuItemDesc = document.getElementById('menuItemDesc');
        const menuItemPreviewImg = document.getElementById('menuItemPreviewImg');
        const menuItemImageInput = document.getElementById('menuItemImageInput');
        
        const menuItemModal = document.getElementById('menuItemModal');
        const btnOpenAddMenuModal = document.getElementById('btnOpenAddMenuModal');
        const menuModalTitle = document.getElementById('menuModalTitle');

        let tempMenuBase64 = null;

        const renderAdminMenuTable = () => {
            adminMenuList.innerHTML = '';
            const menu = getMenu();
            
            if (menu.length === 0) {
                adminMenuList.innerHTML = `
                    <tr>
                        <td colspan="6" class="empty-state">
                            <i data-lucide="inbox"></i>
                            <p>Belum ada item menu terdaftar.</p>
                        </td>
                    </tr>
                `;
                lucide.createIcons();
                return;
            }

            menu.forEach((item, index) => {
                const tr = `
                    <tr>
                        <td>
                            <img src="${item.image}" alt="${item.name}" class="table-image">
                        </td>
                        <td class="table-title">${item.name}</td>
                        <td>
                            <span class="table-category">${item.category}</span>
                        </td>
                        <td style="font-weight: 700; color: var(--color-accent-dark);">${item.price}</td>
                        <td class="table-desc">${item.desc}</td>
                        <td>
                            <div class="table-actions">
                                <button class="btn-icon-action btn-edit" onclick="editMenuItem(${index})" title="Edit">
                                    <i data-lucide="edit-3" style="width:16px;"></i>
                                </button>
                                <button class="btn-icon-action btn-delete" onclick="deleteMenuItem(${index})" title="Hapus">
                                    <i data-lucide="trash-2" style="width:16px;"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
                adminMenuList.insertAdjacentHTML('beforeend', tr);
            });
            lucide.createIcons();
        };

        renderAdminMenuTable();

        // Image input upload bind
        menuItemImageInput.addEventListener('change', () => {
            processImageUpload(menuItemImageInput, menuItemPreviewImg, (base64) => {
                tempMenuBase64 = base64;
            });
        });

        // Add menu button click
        btnOpenAddMenuModal.addEventListener('click', () => {
            menuModalTitle.textContent = 'Tambah Menu Baru';
            menuItemIndex.value = ''; // empty means Adding
            menuItemForm.reset();
            menuItemPreviewImg.classList.add('hide');
            menuItemPreviewImg.src = '';
            tempMenuBase64 = null;
            menuItemModal.classList.add('active');
        });

        // Edit menu trigger (declared globally so onclick attributes on buttons can access it)
        window.editMenuItem = (index) => {
            const menu = getMenu();
            const item = menu[index];

            menuModalTitle.textContent = 'Edit Item Menu';
            menuItemIndex.value = index;
            menuItemName.value = item.name;
            menuItemCategory.value = item.category;
            menuItemPrice.value = item.price;
            menuItemDesc.value = item.desc;
            
            menuItemPreviewImg.src = item.image;
            menuItemPreviewImg.classList.remove('hide');
            tempMenuBase64 = item.image;

            menuItemModal.classList.add('active');
        };

        // Delete menu trigger
        window.deleteMenuItem = (index) => {
            const menu = getMenu();
            const item = menu[index];
            if (confirm(`Apakah Anda yakin ingin menghapus "${item.name}" dari menu?`)) {
                menu.splice(index, 1);
                saveMenu(menu);
                renderAdminMenuTable();
                showToast(`"${item.name}" berhasil dihapus.`, true);
            }
        };

        // Form Submit
        menuItemForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = menuItemName.value.trim();
            const category = menuItemCategory.value;
            const price = menuItemPrice.value.trim();
            const desc = menuItemDesc.value.trim();
            const indexVal = menuItemIndex.value;

            if (!tempMenuBase64) {
                alert('Silakan upload gambar untuk item menu ini!');
                return;
            }

            const itemObj = {
                name,
                category,
                price,
                desc,
                image: tempMenuBase64
            };

            const menu = getMenu();

            if (indexVal === '') {
                // ADDING NEW
                menu.push(itemObj);
                showToast(`Menu "${name}" berhasil ditambahkan!`);
            } else {
                // EDITING
                menu[parseInt(indexVal)] = itemObj;
                showToast(`Menu "${name}" berhasil diperbarui!`);
            }

            saveMenu(menu);
            renderAdminMenuTable();
            menuItemModal.classList.remove('active');
        });


        // --- 5C. CRUD GALLERY MANAGEMENT ---
        const adminGalleryList = document.getElementById('adminGalleryList');
        const galleryItemForm = document.getElementById('galleryItemForm');
        const galleryItemIndex = document.getElementById('galleryItemIndex');
        const galleryItemTitle = document.getElementById('galleryItemTitle');
        const galleryItemCategory = document.getElementById('galleryItemCategory');
        const galleryItemPreviewImg = document.getElementById('galleryItemPreviewImg');
        const galleryItemImageInput = document.getElementById('galleryItemImageInput');
        
        const galleryItemModal = document.getElementById('galleryItemModal');
        const btnOpenAddGalleryModal = document.getElementById('btnOpenAddGalleryModal');
        const galleryModalTitle = document.getElementById('galleryModalTitle');

        let tempGalleryBase64 = null;

        const renderAdminGalleryTable = () => {
            adminGalleryList.innerHTML = '';
            const gallery = getGallery();

            if (gallery.length === 0) {
                adminGalleryList.innerHTML = `
                    <tr>
                        <td colspan="4" class="empty-state">
                            <i data-lucide="inbox"></i>
                            <p>Belum ada foto galeri terdaftar.</p>
                        </td>
                    </tr>
                `;
                lucide.createIcons();
                return;
            }

            gallery.forEach((item, index) => {
                const tr = `
                    <tr>
                        <td>
                            <img src="${item.image}" alt="${item.title}" class="table-image" style="width: 80px; height: 60px;">
                        </td>
                        <td class="table-title">${item.title}</td>
                        <td>
                            <span class="table-category" style="background-color: var(--color-sage-light); color: var(--color-sage);">${item.category}</span>
                        </td>
                        <td>
                            <div class="table-actions">
                                <button class="btn-icon-action btn-edit" onclick="editGalleryItem(${index})" title="Edit">
                                    <i data-lucide="edit-3" style="width:16px;"></i>
                                </button>
                                <button class="btn-icon-action btn-delete" onclick="deleteGalleryItem(${index})" title="Hapus">
                                    <i data-lucide="trash-2" style="width:16px;"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
                adminGalleryList.insertAdjacentHTML('beforeend', tr);
            });
            lucide.createIcons();
        };

        renderAdminGalleryTable();

        // Image input upload bind
        galleryItemImageInput.addEventListener('change', () => {
            processImageUpload(galleryItemImageInput, galleryItemPreviewImg, (base64) => {
                tempGalleryBase64 = base64;
            });
        });

        // Add gallery click
        btnOpenAddGalleryModal.addEventListener('click', () => {
            galleryModalTitle.textContent = 'Tambah Foto Baru';
            galleryItemIndex.value = '';
            galleryItemForm.reset();
            galleryItemPreviewImg.classList.add('hide');
            galleryItemPreviewImg.src = '';
            tempGalleryBase64 = null;
            galleryItemModal.classList.add('active');
        });

        // Edit gallery trigger
        window.editGalleryItem = (index) => {
            const gallery = getGallery();
            const item = gallery[index];

            galleryModalTitle.textContent = 'Edit Foto Galeri';
            galleryItemIndex.value = index;
            galleryItemTitle.value = item.title;
            galleryItemCategory.value = item.category;

            galleryItemPreviewImg.src = item.image;
            galleryItemPreviewImg.classList.remove('hide');
            tempGalleryBase64 = item.image;

            galleryItemModal.classList.add('active');
        };

        // Delete gallery trigger
        window.deleteGalleryItem = (index) => {
            const gallery = getGallery();
            const item = gallery[index];
            if (confirm(`Apakah Anda yakin ingin menghapus foto "${item.title}" dari galeri?`)) {
                gallery.splice(index, 1);
                saveGallery(gallery);
                renderAdminGalleryTable();
                showToast(`Foto "${item.title}" berhasil dihapus.`, true);
            }
        };

        // Form Submit
        galleryItemForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = galleryItemTitle.value.trim();
            const category = galleryItemCategory.value;
            const indexVal = galleryItemIndex.value;

            if (!tempGalleryBase64) {
                alert('Silakan upload gambar untuk galeri ini!');
                return;
            }

            const galObj = {
                title,
                category,
                image: tempGalleryBase64
            };

            const gallery = getGallery();

            if (indexVal === '') {
                // ADDING NEW
                gallery.push(galObj);
                showToast(`Foto "${title}" berhasil ditambahkan ke galeri!`);
            } else {
                // EDITING
                gallery[parseInt(indexVal)] = galObj;
                showToast(`Foto "${title}" berhasil diperbarui!`);
            }

            saveGallery(gallery);
            renderAdminGalleryTable();
            galleryItemModal.classList.remove('active');
        });


// --- 5D. BIND MODAL CLOSING ACTIONS ---
        const closeBtnTriggers = document.querySelectorAll('[data-close-modal]');
        closeBtnTriggers.forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.admin-modal').forEach(modal => {
                    modal.classList.remove('active');
                });
            });
        });

        // Ekspos render functions agar `loadCloudData()` dapat
        // memuat ulang dashboard setelah data cloud diambil.
        window.renderDashboardAll = () => {
            loadSettingsFormValues();
            renderAdminMenuTable();
            renderAdminGalleryTable();
        };
    }


    // ==========================================
    // 6. TOAST NOTIFICATIONS UTILITY
    // ==========================================
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    function showToast(message, isDanger = false) {
        toastMessage.textContent = message;
        
        if (isDanger) {
            toast.classList.add('toast-error');
            toastIcon.setAttribute('data-lucide', 'alert-triangle');
        } else {
            toast.classList.remove('toast-error');
            toastIcon.setAttribute('data-lucide', 'check-circle');
        }
        
        lucide.createIcons();

        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});

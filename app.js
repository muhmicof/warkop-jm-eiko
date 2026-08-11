/* -------------------------------------------------------------
   WARKOP JM EIKO - JAVASCRIPT
   Interactivity, Dynamic Rendering, Modals, and Persistence
------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 0. SUPABASE CLOUD SYNC (if configured)
    // ==========================================
    const supabaseClient = (typeof getSupabaseClient === 'function') ? getSupabaseClient() : null;
    const useCloud = !!supabaseClient;
    let cloudState = {
        settings: null,
        menu: null,
        gallery: null
    };

// ==========================================
    // 1. DATA INITIALIZATION & FALLBACKS
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

    // Pre-populate localStorage with default data if empty so renders don't crash
    if (!localStorage.getItem('warkop_settings')) {
        localStorage.setItem('warkop_settings', JSON.stringify(defaultSettings));
    }
    if (!localStorage.getItem('warkop_menu')) {
        localStorage.setItem('warkop_menu', JSON.stringify(defaultMenu));
    }
    if (!localStorage.getItem('warkop_gallery')) {
        localStorage.setItem('warkop_gallery', JSON.stringify(defaultGallery));
    }

    // Fetch all data from Supabase (menu & gallery ordered by sort_order)
    async function fetchAllCloudData() {
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

            // Store into cloudState with null-value protection
            if (settingsRes.data) {
                const mergedSettings = { ...defaultSettings };
                Object.keys(settingsRes.data).forEach(key => {
                    if (settingsRes.data[key] !== null && settingsRes.data[key] !== undefined) {
                        mergedSettings[key] = settingsRes.data[key];
                    }
                });
                cloudState.settings = mergedSettings;
                localStorage.setItem('warkop_settings', JSON.stringify(mergedSettings));
            }

            if (menuRes.data && menuRes.data.length > 0) {
                cloudState.menu = menuRes.data;
                localStorage.setItem('warkop_menu', JSON.stringify(menuRes.data));
            }

            if (galleryRes.data && galleryRes.data.length > 0) {
                cloudState.gallery = galleryRes.data;
                localStorage.setItem('warkop_gallery', JSON.stringify(galleryRes.data));
            }

            // Re-render after data arrives
            renderPageSettings();
            renderFeaturedMenu();
            renderGallery();
            lucide.createIcons();
        } catch (e) {
            console.warn('Gagal memuat data dari cloud, memakai data lokal:', e);
            // Tetap render apa yang ada di localStorage meskipun gagal mengambil dari cloud
            renderPageSettings();
            renderFeaturedMenu();
            renderGallery();
            lucide.createIcons();
        }
    }

    

    // Local Storage Fallbacks
    if (!localStorage.getItem('warkop_settings')) {
        localStorage.setItem('warkop_settings', JSON.stringify(defaultSettings));
    }
    if (!localStorage.getItem('warkop_menu')) {
        localStorage.setItem('warkop_menu', JSON.stringify(defaultMenu));
    }
    if (!localStorage.getItem('warkop_gallery')) {
        localStorage.setItem('warkop_gallery', JSON.stringify(defaultGallery));
    }

const getSettings = () => JSON.parse(localStorage.getItem('warkop_settings'));
    const getMenu = () => JSON.parse(localStorage.getItem('warkop_menu'));
    const getGallery = () => JSON.parse(localStorage.getItem('warkop_gallery'));

    // ==========================================
    // 2. DYNAMIC CONTENT RENDERING
    // ==========================================
    
    // 2A. Render Page Settings (Hero & About)
    const renderPageSettings = () => {
        const settings = getSettings();
        
        // Hero Elements
        document.getElementById('heroTitle').innerHTML = settings.hero_title;
        document.getElementById('heroDesc').textContent = settings.hero_desc;
        document.getElementById('heroImage').src = settings.hero_image;
        
        // About Elements
        document.getElementById('aboutImage').src = settings.about_image;
        document.getElementById('aboutSince').textContent = settings.about_since;
        document.getElementById('aboutTitle').textContent = settings.about_title;
        document.getElementById('aboutDesc1').textContent = settings.about_desc1;
        document.getElementById('aboutDesc2').textContent = settings.about_desc2;
    };

    // 2B. Render Featured Menu (Home Page Grid)
    const renderFeaturedMenu = () => {
        const menuGrid = document.getElementById('featuredMenuGrid');
        if (!menuGrid) return;
        
        menuGrid.innerHTML = '';
        const menu = getMenu();

        if (!menu || !Array.isArray(menu) || menu.length === 0 || !menu[0]) {
            menuGrid.innerHTML = '<p class="text-center w-full" style="grid-column: 1/-1; padding: 40px; color: var(--text-muted);">Belum ada menu unggulan untuk ditampilkan.</p>';
            return;
        }

        try {
            // Render Large Card (Item 1)
            const largeItem = menu[0];
        let largeCardHTML = `
            <div class="menu-card-large animate-scroll">
                <div class="card-image-container">
                    <img src="${largeItem.image}" alt="${largeItem.name}">
                    <span class="card-tag">Paling Laris</span>
                </div>
                <div class="card-body">
                    <div class="card-header-row">
                        <h3 class="card-title">${largeItem.name}</h3>
                        <span class="card-price">${largeItem.price}</span>
                    </div>
                    <p class="card-desc">${largeItem.desc}</p>
                </div>
            </div>
        `;
        menuGrid.insertAdjacentHTML('beforeend', largeCardHTML);

        // Render Stacked Subgrid (Items 2 and 3)
        if (menu.length > 1) {
            let subGridHTML = `<div class="menu-sub-grid">`;
            
            // Loop through indices 1 and 2
            for (let i = 1; i < Math.min(3, menu.length); i++) {
                const item = menu[i];
                const iconName = item.category === 'kopi' ? 'coffee' : (item.category === 'minuman' ? 'cup-soda' : 'utensils-cross');
                const tagText = item.category === 'kopi' ? 'Robusta Lokal' : (item.category === 'makanan' ? 'Kenyang Mantap' : 'Manis & Gurih');
                
                subGridHTML += `
                    <div class="menu-card-small animate-scroll">
                        <div class="card-image-container">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="card-body">
                            <span class="item-tag"><i data-lucide="${iconName}" class="item-tag-icon"></i> ${tagText}</span>
                            <div class="card-header-row">
                                <h3 class="card-title">${item.name}</h3>
                                <span class="card-price">${item.price}</span>
                            </div>
                        </div>
                    </div>
                `;
            }
            subGridHTML += `</div>`;
            menuGrid.insertAdjacentHTML('beforeend', subGridHTML);
        }
        } catch (err) {
            console.error('Error rendering featured menu:', err);
            menuGrid.innerHTML = '<p class="text-center w-full" style="padding: 40px; color: red;">Terjadi kesalahan saat memuat menu.</p>';
        }
    };

    // 2C. Render Gallery Grid
    const renderGallery = () => {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;
        
        galleryGrid.innerHTML = '';
        const gallery = getGallery();

        if (!gallery || !Array.isArray(gallery) || gallery.length === 0) {
            galleryGrid.innerHTML = '<p class="text-center w-full" style="grid-column: 1/-1; padding: 40px; color: var(--text-muted);">Belum ada foto galeri.</p>';
            return;
        }

        try {
            gallery.forEach(item => {
                if (!item) return;
                const itemHTML = `
                    <div class="gallery-item animate-scroll">
                        <img src="${item.image}" alt="${item.title}">
                        <div class="gallery-overlay">
                            <span class="gallery-category">${item.category}</span>
                            <h3 class="gallery-item-title">${item.title}</h3>
                        </div>
                    </div>
                `;
                galleryGrid.insertAdjacentHTML('beforeend', itemHTML);
            });
            // Bind Lightbox click listeners to the newly rendered gallery elements
            bindGalleryLightbox();
        } catch (err) {
            console.error('Error rendering gallery:', err);
            galleryGrid.innerHTML = '<p class="text-center w-full" style="padding: 40px; color: red;">Terjadi kesalahan saat memuat galeri.</p>';
        }
    };

// Execute dynamic content rendering first
    renderPageSettings();
    renderFeaturedMenu();
    renderGallery();

    // Fetch cloud data (if configured) and re-render with server content
    fetchAllCloudData();

    // Call Lucide to parse dynamically added icons
    lucide.createIcons();


    // ==========================================
    // 3. NAVIGATION & SCROLL ACTIVE LINK TRIGGERS
    // ==========================================
    const navbar = document.querySelector('.navbar-container');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    // Sticky Header Scroll
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Nav Item mapping
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Mobile menu toggle click
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close Mobile nav items
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });


    // ==========================================
    // 4. ANIMATION CONTROLLERS (INTERSECTION OBSERVER)
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animElements = document.querySelectorAll('.animate-up, .animate-fade, .animate-scroll');
    animElements.forEach(el => revealObserver.observe(el));

    // Force run animations on top-level home section elements
    document.querySelectorAll('#home .animate-up, #home .animate-fade').forEach(el => {
        el.classList.add('active');
    });


    // ==========================================
    // 5. FULL MENU MODAL POPULATION & FILTERS
    // ==========================================
    const menuModal = document.getElementById('menuModal');
    const btnOpenMenu = document.getElementById('btnOpenMenu');
    const modalMenuList = document.getElementById('modalMenuList');
    const tabButtons = document.querySelectorAll('.tab-btn');

    const renderMenuItems = (category) => {
        modalMenuList.innerHTML = '';
        const menu = getMenu();
        const filteredItems = category === 'all' 
            ? menu 
            : menu.filter(item => item.category === category);
        
        if (filteredItems.length === 0) {
            modalMenuList.innerHTML = '<p style="grid-column: 1/-1; padding: 20px; text-align: center; color: var(--text-muted);">Tidak ada hidangan dalam kategori ini.</p>';
            return;
        }

        filteredItems.forEach(item => {
            const itemHTML = `
                <div class="menu-item-row animate-fade active">
                    <img src="${item.image}" alt="${item.name}" class="menu-item-img">
                    <div class="menu-item-info">
                        <h4 class="menu-item-name">${item.name}</h4>
                        <span class="menu-item-price">${item.price}</span>
                        <p class="menu-item-desc">${item.desc}</p>
                    </div>
                </div>
            `;
            modalMenuList.insertAdjacentHTML('beforeend', itemHTML);
        });
    };

    btnOpenMenu.addEventListener('click', () => {
        menuModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        renderMenuItems('all');
        tabButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-category="all"]').classList.add('active');
    });

    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabButtons.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const category = e.currentTarget.getAttribute('data-category');
            renderMenuItems(category);
        });
    });


    // ==========================================
    // 6. GENERAL MODAL CLOSURE
    // ==========================================
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        const closeButtons = modal.querySelectorAll('[data-close-modal]');
        const backdrop = modal.querySelector('.modal-backdrop');
        
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            if (modal.getAttribute('id') === 'contactModal') {
                setTimeout(() => {
                    document.getElementById('contactForm').classList.remove('hide');
                    document.getElementById('formSuccess').classList.add('hide');
                    document.getElementById('contactForm').reset();
                }, 300);
            }
        };

        closeButtons.forEach(btn => btn.addEventListener('click', closeModal));
        if (backdrop) backdrop.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });







    // ==========================================
    // 8. DYNAMIC LIGHTBOX INJECTION BIND
    // ==========================================
    function bindGalleryLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightboxModal = document.getElementById('lightboxModal');
        const lightboxImg = document.getElementById('lightboxImg');
        const lightboxCaption = document.getElementById('lightboxCaption');

        galleryItems.forEach(item => {
            if (item.querySelector('.gallery-cta')) return;

            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const caption = item.querySelector('.gallery-item-title').textContent;
                
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxCaption.textContent = caption;
                
                lightboxModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }

// Listen for storage changes from the admin tab and instantly update the content
    window.addEventListener('storage', (e) => {
        if (e.key === 'warkop_settings' || e.key === 'warkop_menu' || e.key === 'warkop_gallery') {
            renderPageSettings();
            renderFeaturedMenu();
            renderGallery();
            lucide.createIcons();
        }
    });

    // ==========================================
    // 9. SUPABASE REALTIME SUBSCRIPTION (if configured)
    //    Memperbarui halaman publik otomatis saat admin
    //    mengubah data di perangkat lain (HP/laptop).
    // ==========================================
    function setupRealtime() {
        if (!useCloud) return;

        const channels = supabaseClient
            .channel('warkop-public-sync')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'menu' }, () => fetchAllCloudData())
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'menu' }, () => fetchAllCloudData())
            .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'menu' }, () => fetchAllCloudData())
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'gallery' }, () => fetchAllCloudData())
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'gallery' }, () => fetchAllCloudData())
            .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'gallery' }, () => fetchAllCloudData())
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'settings' }, () => fetchAllCloudData());

        channels.subscribe((status) => {
            if (status === 'SUBSCRIBED') {
                console.info('Real-time sync aktif. Halaman akan terupdate otomatis.');
            }
        });
    }

    setupRealtime();
    // Render local data first for instant UI (no blank screens)
    renderPageSettings();
    renderFeaturedMenu();
    renderGallery();
    lucide.createIcons();

    // Tarik data dari cloud di background
    if (useCloud) {
        fetchAllCloudData();
    }
});

// ===== Event Configuration =====
const EVENT_CONFIG = {
    title: "Manoj & Shalini's 25th Wedding Anniversary",
    date: new Date('2026-01-28T19:00:00+05:30'),
    dateString: '20260128T190000',
    endDateString: '20260128T230000',
    location: 'Hotel Holiday Inn, Kanpur Road, Lucknow, UP 226008',
    description: 'Silver Jubilee Celebration - 25th Wedding Anniversary of Manoj & Shalini. Join us for this special occasion!'
};

// ===== Translations =====
const translations = {
    en: {
        // Hero section
        inviteText: "Thank you for celebrating with us",
        anniversaryTitle: "25 Years of Togetherness",
        subtitle: "Silver Jubilee Celebration",
        heroNote: "Your presence made this milestone truly memorable",
        completedDate: "Celebrated on 28th January 2026",

        // Gallery sections
        eventPhotos: "Event Photos",
        stagePhotos: "Stage Photos",
        eventVideos: "Event Videos",
        eventPhotosIntro: "Moments with family and friends",
        stagePhotosIntro: "Special moments on stage",
        eventVideosIntro: "Highlights and reels from the celebration",
        loadingPhotos: "Loading photos...",
        loadingVideos: "Loading videos...",
        galleryError: "Unable to load media. Please refresh the page.",

        // Event section
        eventDetails: "Event Memories",
        dayWednesday: "Wednesday",
        monthYear: "January 2026",
        celebrationSummary: "An unforgettable evening filled with love, joy, and cherished moments with family and friends.",

        // Venue section
        theVenue: "Where We Celebrated",
        hotelName: "Hotel Holiday Inn",
        venueAddress: "Near Transport Nagar Metro Station<br>& Amausi Airport, Kanpur Road,<br>Lucknow, Uttar Pradesh, Bharat - 226008",
        getDirections: "Get Directions",

        // Family section
        ourFamily: "Our Family",
        theirSons: "Their Sons",
        warmWishesFrom: "With warm wishes from",
        wishesList: "Swatantra Bala, Anil Srivastava, Vishwanath Srivastava, Saloni Srivastava, Anupama Srivastava, Sachin Srivastava, Aayush Srivastava, Virat Srivastava, Hardik Srivastava, Gunav Ray, Raghav Ray & all relatives and friends",

        // Footer
        footerEvent: "25th Wedding Anniversary | Silver Jubilee",
        footerDate: "Celebrated on 28th January 2026",
        footerVenue: "Hotel Holiday Inn, Lucknow",
        madeWithLove: "Made with love by the family",

        // Language toggle
        toggleLabel: "हिंदी"
    },
    hi: {
        // Hero section
        inviteText: "हमारे साथ जश्न मनाने के लिए धन्यवाद",
        anniversaryTitle: "साथ के 25 वर्ष",
        subtitle: "रजत जयंती समारोह",
        heroNote: "आपकी उपस्थिति ने इस उपलब्धि को यादगार बनाया",
        completedDate: "28 जनवरी 2026 को मनाया गया",

        // Gallery sections
        eventPhotos: "कार्यक्रम की तस्वीरें",
        stagePhotos: "मंच की तस्वीरें",
        eventVideos: "कार्यक्रम के वीडियो",
        eventPhotosIntro: "परिवार और दोस्तों के साथ पल",
        stagePhotosIntro: "मंच पर खास पल",
        eventVideosIntro: "समारोह की झलकियां और रील्स",
        loadingPhotos: "फ़ोटो लोड हो रहे हैं...",
        loadingVideos: "वीडियो लोड हो रहे हैं...",
        galleryError: "मीडिया लोड नहीं हो सका। कृपया पेज रिफ्रेश करें।",

        // Event section
        eventDetails: "कार्यक्रम की यादें",
        dayWednesday: "बुधवार",
        monthYear: "जनवरी 2026",
        celebrationSummary: "एक अविस्मरणीय शाम जो प्यार, खुशी और परिवार एवं मित्रों के साथ संजोई गई यादों से भरी रही।",

        // Venue section
        theVenue: "जहाँ हमने जश्न मनाया",
        hotelName: "होटल हॉलिडे इन",
        venueAddress: "ट्रांसपोर्ट नगर मेट्रो स्टेशन<br>एवं अमौसी हवाई अड्डे के निकट, कानपुर रोड,<br>लखनऊ, उत्तर प्रदेश, भारत - 226008",
        getDirections: "दिशा-निर्देश",

        // Family section
        ourFamily: "हमारा परिवार",
        theirSons: "उनके पुत्र",
        warmWishesFrom: "शुभकामनाओं सहित",
        wishesList: "स्वतंत्र बाला, अनिल श्रीवास्तव, विश्वनाथ श्रीवास्तव, सलोनी श्रीवास्तव, अनुपमा श्रीवास्तव, सचिन श्रीवास्तव, आयुष श्रीवास्तव, विराट श्रीवास्तव, हार्दिक श्रीवास्तव, गुणव राय, राघव राय एवं सभी रिश्तेदार व मित्रगण",

        // Footer
        footerEvent: "25वीं शादी की सालगिरह | रजत जयंती",
        footerDate: "28 जनवरी 2026 को मनाया गया",
        footerVenue: "होटल हॉलिडे इन, लखनऊ",
        madeWithLove: "परिवार द्वारा प्रेम से निर्मित",

        // Language toggle
        toggleLabel: "English"
    }
};

// ===== Language Management =====
let currentLanguage = 'en';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);

    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Update elements with HTML content
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Update toggle button label
    const toggleLabel = document.getElementById('toggle-label');
    if (toggleLabel) {
        toggleLabel.textContent = translations[lang].toggleLabel;
    }

    // Update HTML lang attribute
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
}

function initLanguageSelector() {
    const overlay = document.getElementById('language-overlay');
    const toggleBtn = document.getElementById('language-toggle');
    const languageButtons = document.querySelectorAll('.btn-language');

    // Check for saved preference
    const savedLang = localStorage.getItem('preferredLanguage');

    if (savedLang) {
        // User has already selected a language before
        overlay.classList.add('hidden');
        toggleBtn.style.display = 'flex';
        setLanguage(savedLang);
        // Start animations immediately
        setTimeout(() => {
            initFireworks();
            initHeroAnimations();
        }, 100);
    } else {
        // Show language selection overlay
        // Delay showing content animations until language is selected
    }

    // Language button click handlers
    languageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);

            // Hide overlay with animation
            overlay.classList.add('hidden');
            toggleBtn.style.display = 'flex';

            // Start animations after overlay fades
            setTimeout(() => {
                initFireworks();
                initHeroAnimations();
            }, 300);
        });
    });

    // Toggle button click handler
    toggleBtn.addEventListener('click', () => {
        const newLang = currentLanguage === 'en' ? 'hi' : 'en';
        setLanguage(newLang);
    });
}

// ===== Elegant Fireworks =====
function initFireworks() {
    const container = document.getElementById('fireworks-container');
    if (!container || typeof Fireworks === 'undefined') return;

    const fireworks = new Fireworks.default(container, {
        autoresize: true,
        opacity: 0.4,
        acceleration: 1.02,
        friction: 0.97,
        gravity: 1.5,
        particles: 60,
        traceLength: 3,
        traceSpeed: 8,
        explosion: 4,
        intensity: 12,
        flickering: 30,
        lineStyle: 'round',
        hue: {
            min: 0,    // Full color range for variety
            max: 360
        },
        delay: {
            min: 40,
            max: 80
        },
        rocketsPoint: {
            min: 30,
            max: 70
        },
        lineWidth: {
            explosion: {
                min: 1,
                max: 2
            },
            trace: {
                min: 0.5,
                max: 1.5
            }
        },
        brightness: {
            min: 70,   // Higher brightness for pastel look
            max: 90
        },
        decay: {
            min: 0.012,
            max: 0.025
        },
        mouse: {
            click: false,
            move: false,
            max: 1
        },
        // Soft pastel saturation
        saturation: {
            min: 30,
            max: 50
        }
    });

    fireworks.start();

    // Soften further after initial burst
    setTimeout(() => {
        fireworks.updateOptions({
            intensity: 6,
            opacity: 0.3,
            delay: { min: 60, max: 120 }
        });
    }, 5000);
}

// ===== Elegant GSAP Hero Animations =====
function initHeroAnimations() {
    const tl = gsap.timeline({
        defaults: {
            ease: 'power2.out',
            duration: 1
        }
    });

    // Set initial states - everything hidden
    gsap.set('.gsap-fade', { opacity: 0, y: 25 });
    gsap.set('.gsap-names', { opacity: 1 });
    gsap.set('.gsap-names .name', { opacity: 0, y: 30 });
    gsap.set('.gsap-names .ampersand', { opacity: 0, scale: 0.5 });
    gsap.set('.gsap-title', { opacity: 0, y: 20 });

    // Elegant staggered reveal
    tl.to('.shloka.gsap-fade', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.5
    })
    .to('.ornament.gsap-fade', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.4
    }, '-=0.6')
    .to('.hero-text.gsap-fade', {
        opacity: 1,
        y: 0,
        duration: 1
    }, '-=0.4')
    .to('.gsap-title', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
    }, '-=0.8')
    // Names - elegant fade up
    .to('.gsap-names .name:first-child', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
    }, '-=0.5')
    .to('.gsap-names .ampersand', {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.8')
    .to('.gsap-names .name:last-child', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
    }, '-=0.8')
    .to('.hero-note.gsap-fade', {
        opacity: 1,
        y: 0,
        duration: 1
    }, '-=0.5');
}

// ===== Countdown Timer =====
// ===== Scroll Reveal Animation =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        gsap.set(el, { opacity: 0, y: 30 });
        observer.observe(el);
    });
}

// ===== Initialize =====
// ===== GALLERY MANAGEMENT =====

// Generic photo gallery loader
async function loadPhotoGallery(category, galleryId, loaderId, galleryGroupName) {
    const galleryContainer = document.getElementById(galleryId);
    const loader = document.getElementById(loaderId);

    if (!galleryContainer) return;

    try {
        loader.style.display = 'block';

        // Load captions data for this category
        const response = await fetch(`images/${category}/captions.json`);
        if (!response.ok) throw new Error(`Failed to load ${category} captions`);

        const data = await response.json();
        const images = data.images;

        loader.style.display = 'none';

        // Build gallery items
        images.forEach((img, index) => {
            const item = document.createElement('a');
            item.href = `images/${category}/full/${img.id}.jpg`;
            item.className = 'gallery-item glightbox';
            item.setAttribute('data-gallery', galleryGroupName);

            // Build bilingual caption
            const caption = `
                <div class="caption-bilingual">
                    <div class="caption-en">${img.caption.en}</div>
                    <div class="caption-hi">${img.caption.hi}</div>
                </div>
            `;

            item.setAttribute('data-glightbox', `title: ${img.alt[currentLanguage]}; description: ${caption}`);

            const imgEl = document.createElement('img');
            imgEl.src = `images/${category}/thumbnails/${img.id}.jpg`;
            imgEl.alt = img.alt[currentLanguage];
            imgEl.loading = 'lazy';

            const overlay = document.createElement('div');
            overlay.className = 'gallery-overlay';
            overlay.innerHTML = `
                <svg class="zoom-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
            `;

            item.appendChild(imgEl);
            item.appendChild(overlay);
            galleryContainer.appendChild(item);

            // Staggered fade-in animation
            gsap.from(item, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                delay: index * 0.05,
                ease: 'power2.out'
            });
        });

    } catch (error) {
        console.error(`${category} gallery loading error:`, error);
        loader.style.display = 'none';
        // Show error message or gracefully hide section
    }
}

// Video gallery loader
async function loadVideoGallery() {
    const galleryContainer = document.getElementById('event-videos-gallery');
    const loader = document.getElementById('event-videos-loader');

    if (!galleryContainer) return;

    try {
        loader.style.display = 'block';

        const response = await fetch('images/videos/captions.json');
        if (!response.ok) throw new Error('Failed to load video captions');

        const data = await response.json();
        const videos = data.videos;

        loader.style.display = 'none';

        // Build video items
        videos.forEach((video, index) => {
            const item = document.createElement('a');
            item.href = `images/videos/full/${video.id}.mp4`;
            item.className = 'gallery-item video-item glightbox';
            item.setAttribute('data-gallery', 'videos-gallery');

            // Build bilingual caption
            const caption = `
                <div class="caption-bilingual">
                    <div class="caption-en">${video.caption.en}</div>
                    <div class="caption-hi">${video.caption.hi}</div>
                </div>
            `;

            item.setAttribute('data-glightbox', `title: ${video.alt[currentLanguage]}; description: ${caption}`);

            // Video thumbnail with play icon
            const imgEl = document.createElement('img');
            imgEl.src = `images/videos/thumbnails/${video.id}.jpg`;
            imgEl.alt = video.alt[currentLanguage];
            imgEl.loading = 'lazy';

            const overlay = document.createElement('div');
            overlay.className = 'gallery-overlay video-overlay';
            overlay.innerHTML = `
                <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
                ${video.duration ? `<span class="video-duration">${video.duration}</span>` : ''}
            `;

            item.appendChild(imgEl);
            item.appendChild(overlay);
            galleryContainer.appendChild(item);

            // Staggered fade-in animation
            gsap.from(item, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                delay: index * 0.05,
                ease: 'power2.out'
            });
        });

    } catch (error) {
        console.error('Video gallery loading error:', error);
        loader.style.display = 'none';
    }
}

// Initialize all galleries
async function initGalleries() {
    await Promise.all([
        loadPhotoGallery('event-photos', 'event-photos-gallery', 'event-photos-loader', 'event-photos-group'),
        loadPhotoGallery('stage-photos', 'stage-photos-gallery', 'stage-photos-loader', 'stage-photos-group'),
        loadVideoGallery()
    ]);

    // Initialize GLightbox after all galleries loaded
    const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        closeButton: true,
        plyr: {
            config: {
                ratio: '16:9',
                muted: false,
                hideControls: false,
                youtube: {
                    noCookie: true,
                    rel: 0,
                    showinfo: 0,
                    iv_load_policy: 3
                }
            }
        }
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language selector first
    initLanguageSelector();

    // Initialize photo & video galleries
    initGalleries();

    // Initialize scroll reveal
    initScrollReveal();
});

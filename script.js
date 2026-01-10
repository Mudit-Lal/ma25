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
        inviteText: "You are cordially invited to celebrate",
        anniversaryTitle: "25 Years of Togetherness",
        subtitle: "Silver Jubilee Celebration",
        heroNote: "Your presence will make this occasion truly special",
        ourJourney: "Our Journey",
        memoriesTitle: "25 Years of Beautiful Memories",
        memoriesSubtitle: "Photo gallery coming soon",
        eventDetails: "Event Details",
        dayWednesday: "Wednesday",
        monthYear: "January 2026",
        countdownIntro: "Counting down to the celebration",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
        addToCalendar: "Save the Date",
        googleCalendar: "Google Calendar",
        downloadIcs: "Apple / Outlook",
        theVenue: "The Venue",
        hotelName: "Hotel Holiday Inn",
        venueAddress: "Near Transport Nagar Metro Station<br>& Amausi Airport, Kanpur Road,<br>Lucknow, Uttar Pradesh, Bharat - 226008",
        getDirections: "Get Directions",
        ourFamily: "Our Family",
        theirSons: "Their Sons",
        warmWishesFrom: "With warm wishes from",
        wishesList: "Swatantra Bala, Anil Srivastava, Vishwanath Srivastava, Saloni Srivastava, Anupama Srivastava, Sachin Srivastava, Aayush Srivastava, Virat Srivastava, Hardik Srivastava, Gunav Ray, Raghav Ray & all relatives and friends",
        needAssistance: "Need Assistance?",
        forInquiries: "For travel, accommodation, or any queries, contact",
        call: "Call",
        footerEvent: "25th Wedding Anniversary | Silver Jubilee",
        footerDate: "28th January 2026 | 7:00 PM onwards",
        footerVenue: "Hotel Holiday Inn, Lucknow",
        madeWithLove: "Made with love by the family",
        toggleLabel: "हिंदी"
    },
    hi: {
        inviteText: "आप सादर आमंत्रित हैं",
        anniversaryTitle: "साथ के 25 वर्ष",
        subtitle: "रजत जयंती समारोह",
        heroNote: "आपकी उपस्थिति इस अवसर को विशेष बनाएगी",
        ourJourney: "हमारा सफ़र",
        memoriesTitle: "25 वर्षों की सुंदर यादें",
        memoriesSubtitle: "फोटो गैलरी जल्द आ रही है",
        eventDetails: "कार्यक्रम विवरण",
        dayWednesday: "बुधवार",
        monthYear: "जनवरी 2026",
        countdownIntro: "समारोह की उलटी गिनती",
        days: "दिन",
        hours: "घंटे",
        minutes: "मिनट",
        seconds: "सेकंड",
        addToCalendar: "तिथि सहेजें",
        googleCalendar: "गूगल कैलेंडर",
        downloadIcs: "एप्पल / आउटलुक",
        theVenue: "स्थान",
        hotelName: "होटल हॉलिडे इन",
        venueAddress: "ट्रांसपोर्ट नगर मेट्रो स्टेशन<br>एवं अमौसी हवाई अड्डे के निकट, कानपुर रोड,<br>लखनऊ, उत्तर प्रदेश, भारत - 226008",
        getDirections: "दिशा-निर्देश",
        ourFamily: "हमारा परिवार",
        theirSons: "उनके पुत्र",
        warmWishesFrom: "शुभकामनाओं सहित",
        wishesList: "स्वतंत्र बाला, अनिल श्रीवास्तव, विश्वनाथ श्रीवास्तव, सलोनी श्रीवास्तव, अनुपमा श्रीवास्तव, सचिन श्रीवास्तव, आयुष श्रीवास्तव, विराट श्रीवास्तव, हार्दिक श्रीवास्तव, गुणव राय, राघव राय एवं सभी रिश्तेदार व मित्रगण",
        needAssistance: "सहायता चाहिए?",
        forInquiries: "यात्रा, आवास या किसी भी प्रश्न के लिए संपर्क करें",
        call: "कॉल करें",
        footerEvent: "25वीं शादी की सालगिरह | रजत जयंती",
        footerDate: "28 जनवरी 2026 | शाम 7:00 बजे से",
        footerVenue: "होटल हॉलिडे इन, लखनऊ",
        madeWithLove: "परिवार द्वारा प्रेम से निर्मित",
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
function updateCountdown() {
    const now = new Date();
    const diff = EVENT_CONFIG.date - now;

    const elements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    if (diff <= 0) {
        Object.values(elements).forEach(el => {
            if (el) el.textContent = '00';
        });
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (elements.days) elements.days.textContent = String(days).padStart(2, '0');
    if (elements.hours) elements.hours.textContent = String(hours).padStart(2, '0');
    if (elements.minutes) elements.minutes.textContent = String(minutes).padStart(2, '0');
    if (elements.seconds) elements.seconds.textContent = String(seconds).padStart(2, '0');
}

// ===== Google Calendar Link =====
function generateGoogleCalendarUrl() {
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: EVENT_CONFIG.title,
        dates: `${EVENT_CONFIG.dateString}/${EVENT_CONFIG.endDateString}`,
        details: EVENT_CONFIG.description,
        location: EVENT_CONFIG.location,
        ctz: 'Asia/Kolkata'
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// ===== ICS File Generation =====
function generateICSContent() {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Manoj Shalini Anniversary//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART;TZID=Asia/Kolkata:20260128T190000
DTEND;TZID=Asia/Kolkata:20260128T230000
SUMMARY:${EVENT_CONFIG.title}
DESCRIPTION:${EVENT_CONFIG.description}
LOCATION:${EVENT_CONFIG.location}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Reminder: ${EVENT_CONFIG.title} is tomorrow!
END:VALARM
BEGIN:VALARM
TRIGGER:-PT2H
ACTION:DISPLAY
DESCRIPTION:Reminder: ${EVENT_CONFIG.title} starts in 2 hours!
END:VALARM
END:VEVENT
END:VCALENDAR`;

    return icsContent;
}

function downloadICS() {
    const icsContent = generateICSContent();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'manoj-shalini-25th-anniversary.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

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
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language selector first
    initLanguageSelector();

    // Start countdown (works regardless of language)
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Set up Google Calendar link
    const googleCalendarBtn = document.getElementById('google-calendar');
    if (googleCalendarBtn) {
        googleCalendarBtn.href = generateGoogleCalendarUrl();
        googleCalendarBtn.target = '_blank';
        googleCalendarBtn.rel = 'noopener noreferrer';
    }

    // Set up ICS download
    const icsDownloadBtn = document.getElementById('ics-download');
    if (icsDownloadBtn) {
        icsDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadICS();
        });
    }

    // Initialize scroll reveal
    initScrollReveal();
});

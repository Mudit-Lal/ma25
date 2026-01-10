// ===== Event Configuration =====
const EVENT_CONFIG = {
    title: "Manoj & Shalini's 25th Wedding Anniversary",
    date: new Date('2026-01-28T19:00:00+05:30'),
    dateString: '20260128T190000',
    endDateString: '20260128T230000',
    location: 'Hotel Holiday Inn, Kanpur Road, Lucknow, UP 226008',
    description: 'Silver Jubilee Celebration - 25th Wedding Anniversary of Manoj & Shalini. Join us for this special occasion!'
};

// ===== Elegant Fireworks =====
function initFireworks() {
    const container = document.getElementById('fireworks-container');
    if (!container || typeof Fireworks === 'undefined') return;

    const fireworks = new Fireworks.default(container, {
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.02,
        friction: 0.97,
        gravity: 1.5,
        particles: 80,
        traceLength: 3,
        traceSpeed: 10,
        explosion: 5,
        intensity: 15,
        flickering: 50,
        lineStyle: 'round',
        hue: {
            min: 35,  // Gold tones
            max: 55
        },
        delay: {
            min: 30,
            max: 60
        },
        rocketsPoint: {
            min: 30,
            max: 70
        },
        lineWidth: {
            explosion: {
                min: 1,
                max: 3
            },
            trace: {
                min: 1,
                max: 2
            }
        },
        brightness: {
            min: 50,
            max: 80
        },
        decay: {
            min: 0.015,
            max: 0.03
        },
        mouse: {
            click: false,
            move: false,
            max: 1
        }
    });

    fireworks.start();

    // Reduce intensity after initial burst
    setTimeout(() => {
        fireworks.updateOptions({
            intensity: 8,
            delay: { min: 50, max: 100 }
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
    // Initialize fireworks
    initFireworks();

    // Initialize elegant hero animations
    initHeroAnimations();

    // Start countdown
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

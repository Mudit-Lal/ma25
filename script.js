// ===== Event Configuration =====
const EVENT_CONFIG = {
    title: "Manoj & Shalini's 25th Wedding Anniversary",
    date: new Date('2026-01-28T19:00:00+05:30'),
    dateString: '20260128T190000',
    endDateString: '20260128T230000',
    location: 'Hotel Holiday Inn, Kanpur Road, Lucknow, UP 226008',
    description: 'Silver Jubilee Celebration - 25th Wedding Anniversary of Manoj & Shalini. Join us for this special occasion!'
};

// ===== Floating Particles System =====
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.colors = ['#D4AF37', '#C0C0C0', '#B8960C', '#E8E8E8']; // Gold & Silver

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.canvas.parentElement.offsetWidth;
        this.canvas.height = this.canvas.parentElement.offsetHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 4 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5 - 0.3, // Slight upward drift
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                opacity: Math.random() * 0.6 + 0.2,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            // Update position
            p.x += p.speedX;
            p.y += p.speedY;
            p.pulse += p.pulseSpeed;

            // Wrap around edges
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            // Pulsing opacity
            const pulseOpacity = p.opacity * (0.7 + Math.sin(p.pulse) * 0.3);

            // Draw particle with glow
            this.ctx.save();
            this.ctx.globalAlpha = pulseOpacity;

            // Glow effect
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = p.color;

            // Draw circle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();

            this.ctx.restore();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ===== GSAP Hero Animations =====
function initHeroAnimations() {
    // Create main timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Set initial states
    gsap.set('.gsap-fade', { opacity: 0, y: 30 });
    gsap.set('.gsap-names', { opacity: 1 });
    gsap.set('.gsap-names .name', { opacity: 0, y: 50, scale: 0.9 });
    gsap.set('.gsap-names .ampersand', { opacity: 0, scale: 0, rotation: -180 });
    gsap.set('.gsap-title', { opacity: 0, scale: 0.8, letterSpacing: '15px' });

    // Shloka fade in
    tl.to('.shloka.gsap-fade', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3
    })

    // First ornament
    .to('.ornament.gsap-fade', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.3
    }, '-=0.5')

    // Hero text section
    .to('.hero-text.gsap-fade', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.3')

    // Anniversary title with letter spacing animation
    .to('.gsap-title', {
        opacity: 1,
        scale: 1,
        letterSpacing: '3px',
        duration: 1.2,
        ease: 'power2.out'
    }, '-=0.5')

    // Couple names - dramatic entrance
    .to('.gsap-names .name:first-child', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)'
    }, '-=0.3')

    // Ampersand spin in
    .to('.gsap-names .ampersand', {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'back.out(2)'
    }, '-=0.6')

    // Second name
    .to('.gsap-names .name:last-child', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)'
    }, '-=0.6')

    // Hero note
    .to('.hero-note.gsap-fade', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.3')

    // Scroll indicator
    .to('.scroll-indicator.gsap-fade', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.3');

    // Add floating animation to names after entrance
    tl.add(() => {
        gsap.to('.gsap-names .name', {
            y: -5,
            duration: 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            stagger: 0.2
        });
    });
}

// ===== Countdown Timer =====
function updateCountdown() {
    const now = new Date();
    const diff = EVENT_CONFIG.date - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Animate number changes
    animateValue('days', days);
    animateValue('hours', hours);
    animateValue('minutes', minutes);
    animateValue('seconds', seconds);
}

function animateValue(id, newValue) {
    const el = document.getElementById(id);
    const currentValue = el.textContent;
    const newValueStr = String(newValue).padStart(2, '0');

    if (currentValue !== newValueStr) {
        gsap.to(el, {
            scale: 1.1,
            duration: 0.15,
            ease: 'power2.out',
            onComplete: () => {
                el.textContent = newValueStr;
                gsap.to(el, {
                    scale: 1,
                    duration: 0.15,
                    ease: 'power2.in'
                });
            }
        });
    }
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

// ===== Scroll Reveal Animation with GSAP =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        gsap.set(el, { opacity: 0, y: 40 });
        observer.observe(el);
    });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle system
    new ParticleSystem('particles-canvas');

    // Initialize GSAP hero animations
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

    // Initialize scroll reveal animations
    initScrollReveal();
});

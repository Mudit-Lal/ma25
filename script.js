// ===== Event Configuration =====
const EVENT_CONFIG = {
    title: "Manoj & Shalini's 25th Wedding Anniversary",
    date: new Date('2026-01-28T19:00:00+05:30'),
    dateString: '20260128T190000',
    endDateString: '20260128T230000',
    location: 'Hotel Holiday Inn, Kanpur Road, Lucknow, UP 226008',
    description: 'Silver Jubilee Celebration - 25th Wedding Anniversary of Manoj & Shalini. Join us for this special occasion!'
};

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

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
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

// ===== Scroll Animation =====
function initScrollAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', function() {
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

    // Initialize scroll animations (only for elements that already have fade-in class)
    initScrollAnimation();
});

// ===========================
// CONFIGURATION
// ===========================
const GALLERY_CONFIG = {
    eventPhotos: {
        category: 'event-photos',
        galleryId: 'event-photos-gallery',
        galleryGroup: 'event-photos-group'
    },
    stagePhotos: {
        category: 'stage-photos',
        galleryId: 'stage-photos-gallery',
        galleryGroup: 'stage-photos-group'
    },
    videos: {
        category: 'videos',
        galleryId: 'event-videos-gallery',
        galleryGroup: 'videos-group'
    }
};

// ===========================
// MASONRY GALLERY LOADER
// ===========================
async function loadMasonryGallery(category, galleryId, galleryGroup, isVideo = false) {
    const galleryContainer = document.getElementById(galleryId);
    if (!galleryContainer) return;

    try {
        const captionsPath = `images/${category}/captions.json`;
        const response = await fetch(captionsPath);

        if (!response.ok) {
            console.warn(`No captions found for ${category}`);
            return;
        }

        const data = await response.json();
        const items = isVideo ? data.videos : data.images;

        if (!items || items.length === 0) {
            console.warn(`No items found in ${category}`);
            return;
        }

        items.forEach((item) => {
            createMasonryItem(item, category, galleryContainer, galleryGroup, isVideo);
        });

    } catch (error) {
        console.error(`Error loading ${category}:`, error);
    }
}

// ===========================
// CREATE MASONRY ITEM
// ===========================
function createMasonryItem(item, category, container, galleryGroup, isVideo) {
    const anchor = document.createElement('a');
    const fileExt = isVideo ? 'mp4' : 'jpg';
    const thumbExt = 'jpg'; // Thumbnails always JPG

    anchor.href = `images/${category}/full/${item.id}.${fileExt}`;
    anchor.className = isVideo ? 'masonry-item video-item glightbox' : 'masonry-item glightbox';
    anchor.setAttribute('data-gallery', galleryGroup);

    // Caption for lightbox
    anchor.setAttribute('data-glightbox', `title: ${item.caption}; description: ${item.caption}`);

    // Create image element
    const img = document.createElement('img');
    img.src = `images/${category}/thumbnails/${item.id}.${thumbExt}`;
    img.alt = item.alt;
    img.loading = 'lazy';

    // Calculate masonry span on image load
    img.onload = function() {
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        const rowSpan = Math.ceil(aspectRatio * 14); // Adjust multiplier as needed
        anchor.style.gridRowEnd = `span ${rowSpan}`;
    };

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'masonry-overlay';

    if (isVideo) {
        // Add play icon for videos
        overlay.innerHTML = `
            <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
            ${item.duration ? `<span class="video-duration">${item.duration}</span>` : ''}
        `;
    }

    anchor.appendChild(img);
    anchor.appendChild(overlay);
    container.appendChild(anchor);
}

// ===========================
// INITIALIZE GALLERIES
// ===========================
async function initGalleries() {
    await Promise.all([
        loadMasonryGallery(
            GALLERY_CONFIG.eventPhotos.category,
            GALLERY_CONFIG.eventPhotos.galleryId,
            GALLERY_CONFIG.eventPhotos.galleryGroup,
            false
        ),
        loadMasonryGallery(
            GALLERY_CONFIG.stagePhotos.category,
            GALLERY_CONFIG.stagePhotos.galleryId,
            GALLERY_CONFIG.stagePhotos.galleryGroup,
            false
        ),
        loadMasonryGallery(
            GALLERY_CONFIG.videos.category,
            GALLERY_CONFIG.videos.galleryId,
            GALLERY_CONFIG.videos.galleryGroup,
            true
        )
    ]);

    // Initialize GLightbox
    GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        closeButton: true,
        autoplayVideos: false
    });
}

// ===========================
// SMOOTH SCROLL
// ===========================
function initSmoothScroll() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const firstGallery = document.querySelector('.gallery-section');
            if (firstGallery) {
                firstGallery.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initGalleries();
    initSmoothScroll();
});

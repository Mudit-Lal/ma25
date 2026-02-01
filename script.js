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

    // No caption in lightbox
    anchor.setAttribute('data-glightbox', '');

    // Full resolution URL for download (fallback to full/ if no originals/)
    anchor.setAttribute('data-full-url', `images/${category}/originals/${item.id}.${fileExt}`);

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

    // Initialize GLightbox with download button
    const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        closeButton: true,
        autoplayVideos: false,
        descPosition: 'none'
    });

    // Add download functionality
    addDownloadButton(lightbox);
}

// ===========================
// DOWNLOAD FUNCTIONALITY
// ===========================
function addDownloadButton(lightboxInstance) {
    lightboxInstance.on('slide_changed', ({ current }) => {
        const slideNode = current.slideNode;
        if (!slideNode) return;

        // Remove existing download button if any
        const existingBtn = slideNode.querySelector('.download-btn');
        if (existingBtn) existingBtn.remove();

        // Get image URLs
        const trigger = current.trigger;
        const mediaElement = slideNode.querySelector('img, video');
        const optimizedUrl = trigger?.href || mediaElement?.src;
        const fullUrl = trigger?.dataset?.fullUrl || optimizedUrl;

        // Create download button
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'download-btn';
        downloadBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            Download
        `;
        downloadBtn.onclick = (e) => {
            e.stopPropagation();
            showDownloadModal(optimizedUrl, fullUrl);
        };

        // Append to slide media container
        const mediaContainer = slideNode.querySelector('.gslide-media');
        if (mediaContainer) {
            mediaContainer.appendChild(downloadBtn);
        }
    });

    // Also add button on first slide (slide_changed doesn't fire for first)
    lightboxInstance.on('open', () => {
        setTimeout(() => {
            const slideNode = document.querySelector('.gslide.current');
            if (slideNode && !slideNode.querySelector('.download-btn')) {
                const trigger = lightboxInstance.activeSlide?.trigger;
                const mediaElement = slideNode.querySelector('img, video');
                const optimizedUrl = trigger?.href || mediaElement?.src;
                const fullUrl = trigger?.dataset?.fullUrl || optimizedUrl;

                const downloadBtn = document.createElement('button');
                downloadBtn.className = 'download-btn';
                downloadBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                    </svg>
                    Download
                `;
                downloadBtn.onclick = (e) => {
                    e.stopPropagation();
                    showDownloadModal(optimizedUrl, fullUrl);
                };

                const mediaContainer = slideNode.querySelector('.gslide-media');
                if (mediaContainer) {
                    mediaContainer.appendChild(downloadBtn);
                }
            }
        }, 100);
    });
}

function showDownloadModal(optimizedUrl, fullUrl) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.download-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.innerHTML = `
        <div class="download-modal-content">
            <h3>Download Photo</h3>
            <button class="download-option" data-url="${optimizedUrl}">
                <span class="option-title">Web Optimized</span>
                <span class="option-desc">Smaller file, faster download</span>
            </button>
            <button class="download-option" data-url="${fullUrl}">
                <span class="option-title">Full Resolution</span>
                <span class="option-desc">Original quality</span>
            </button>
            <button class="download-close">Cancel</button>
        </div>
    `;
    document.body.appendChild(modal);

    // Handle option clicks
    modal.querySelectorAll('.download-option').forEach(btn => {
        btn.onclick = () => {
            downloadFile(btn.dataset.url);
            modal.remove();
        };
    });

    // Handle close
    modal.querySelector('.download-close').onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

function downloadFile(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = url.split('/').pop();
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// ===========================
// COUPLE CAROUSEL
// ===========================
async function loadCoupleCarousel() {
    const carouselTrack = document.getElementById('couple-carousel');
    if (!carouselTrack) return;

    try {
        const response = await fetch('images/couple-carousel/captions.json');
        if (!response.ok) {
            console.warn('No carousel images found');
            return;
        }

        const data = await response.json();
        const images = data.images;

        if (!images || images.length === 0) {
            console.warn('No carousel images');
            return;
        }

        // Create items twice for seamless infinite scroll
        const createItems = () => {
            images.forEach((img) => {
                const item = document.createElement('div');
                item.className = 'carousel-item';

                const imgEl = document.createElement('img');
                imgEl.src = `images/couple-carousel/${img.id}.jpg`;
                imgEl.alt = img.alt;
                imgEl.loading = 'lazy';

                item.appendChild(imgEl);
                carouselTrack.appendChild(item);
            });
        };

        // Duplicate for infinite scroll effect
        createItems();
        createItems();

    } catch (error) {
        console.error('Error loading carousel:', error);
    }
}

// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    loadCoupleCarousel();
    initGalleries();
});

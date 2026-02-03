// ===========================
// LIGHTBOX SINGLETON
// ===========================
let lightboxInstance = null;

// ===========================
// MASONRY GALLERY LOADER
// ===========================
async function loadMasonryGallery(category, galleryId, galleryGroup, isVideo = false) {
    const galleryContainer = document.getElementById(galleryId);
    if (!galleryContainer) return false;

    try {
        const captionsPath = `images/${category}/captions.json`;
        const response = await fetch(captionsPath);

        if (!response.ok) {
            console.warn(`No captions found for ${category}`);
            return false;
        }

        const data = await response.json();
        const items = isVideo ? data.videos : data.images;

        if (!items || items.length === 0) {
            console.warn(`No items found in ${category}`);
            return false;
        }

        items.forEach((item) => {
            createMasonryItem(item, category, galleryContainer, galleryGroup, isVideo);
        });

        return true;

    } catch (error) {
        console.error(`Error loading ${category}:`, error);
        return false;
    }
}

// ===========================
// CREATE MASONRY ITEM
// ===========================
function createMasonryItem(item, category, container, galleryGroup, isVideo) {
    const anchor = document.createElement('a');
    const fileExt = isVideo ? 'mp4' : 'jpg';
    const thumbExt = 'jpg';

    anchor.href = `images/${category}/full/${item.id}.${fileExt}`;
    anchor.className = isVideo ? 'masonry-item video-item glightbox' : 'masonry-item glightbox';
    anchor.setAttribute('data-gallery', galleryGroup);
    anchor.setAttribute('data-glightbox', '');
    anchor.setAttribute('data-full-url', `images/${category}/originals/${item.id}.${fileExt}`);

    const img = document.createElement('img');
    img.src = `images/${category}/thumbnails/${item.id}.${thumbExt}`;
    img.alt = item.alt;
    img.loading = 'lazy';

    img.onload = function() {
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        const rowSpan = Math.ceil(aspectRatio * 14);
        anchor.style.gridRowEnd = `span ${rowSpan}`;
    };

    const overlay = document.createElement('div');
    overlay.className = 'masonry-overlay';

    if (isVideo) {
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
// INITIALIZE PAGE GALLERY
// ===========================
async function initPageGallery(category, galleryId, emptyStateId, isVideo = false) {
    const loaded = await loadMasonryGallery(category, galleryId, `${category}-group`, isVideo);

    // Show empty state if no photos loaded
    if (!loaded && emptyStateId) {
        const emptyState = document.getElementById(emptyStateId);
        if (emptyState) {
            emptyState.classList.add('visible');
        }
    }

    // Initialize or refresh lightbox
    initLightbox();
}

// ===========================
// INITIALIZE LIGHTBOX (Singleton)
// ===========================
function initLightbox() {
    // Destroy existing instance if any
    if (lightboxInstance) {
        lightboxInstance.destroy();
    }

    // Check if GLightbox is available
    if (typeof GLightbox === 'undefined') return;

    lightboxInstance = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        closeButton: true,
        autoplayVideos: false,
        descPosition: 'none'
    });

    addDownloadButton(lightboxInstance);
}

// ===========================
// DOWNLOAD FUNCTIONALITY
// ===========================
function addDownloadButton(lightboxInstance) {
    lightboxInstance.on('slide_changed', ({ current }) => {
        const slideNode = current.slideNode;
        if (!slideNode) return;

        const existingBtn = slideNode.querySelector('.download-btn');
        if (existingBtn) existingBtn.remove();

        const trigger = current.trigger;
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
    });

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

    modal.querySelectorAll('.download-option').forEach(btn => {
        btn.onclick = () => {
            downloadFile(btn.dataset.url);
            modal.remove();
        };
    });

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
// HERO SLIDESHOW
// ===========================
async function initHeroSlideshow() {
    const slideshowContainer = document.getElementById('hero-slideshow');
    if (!slideshowContainer) return;

    try {
        const response = await fetch('images/hero-slideshow/captions.json');
        if (!response.ok) {
            console.warn('No slideshow images found');
            return;
        }

        const data = await response.json();
        const images = data.images;

        if (!images || images.length === 0) {
            console.warn('No slideshow images');
            return;
        }

        // Create slideshow images
        images.forEach((img, index) => {
            const div = document.createElement('div');
            div.className = 'hero-slideshow-image' + (index === 0 ? ' active' : '');
            div.style.backgroundImage = `url('images/hero-slideshow/${img.id}.jpg')`;
            slideshowContainer.appendChild(div);
        });

        // Only start slideshow if more than one image
        if (images.length > 1) {
            let currentIndex = 0;
            const slides = slideshowContainer.querySelectorAll('.hero-slideshow-image');

            setInterval(() => {
                slides[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % slides.length;
                slides[currentIndex].classList.add('active');
            }, 5000); // Change every 5 seconds
        }

    } catch (error) {
        console.error('Error loading slideshow:', error);
    }
}

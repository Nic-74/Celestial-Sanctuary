// ===================================================================
//  MODULE: GALLERY (js/modules/gallery.js)
// ===================================================================
import {
    $, $$, AppState, EDITABLE_CONFIG, DOM, personalizedContent,
    apiAddItem, apiDeleteItem,
    // Import modal controllers
    openLightbox
} from '../common.js';

// --- Local State ---
let panelContainer = null; // To store the main content element

// --- HTML Template ---

function getGalleryPanelHTML() {
    return `
    <div id="gallery-panel">
        <!-- The h2 and p tags will be populated by render() -->
        <h2 class="panel-header" data-translate-id="gallery_title">Gallery of Ages</h2>
        <p class="panel-subheader" data-translate-id="gallery_subtitle">Our journey through time, captured in precious moments.</p>

        <div class="gallery-controls-container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem; padding: 0 1rem;">
            <div>
                <button class="btn primary" id="upload-photo-btn" data-translate-id="gallery_upload">Upload Photo</button>
                <input type="file" id="photo-upload-input" hidden accept="image/*">
            </div>
            <div class="gallery-view-controls" id="gallery-view-toggle">
                <button class="btn-view" data-view="grid" title="Grid View" data-translate-id="gallery_view_grid">▦ Grid</button>
                <button class="btn-view" data-view="list" title="List View" data-translate-id="gallery_view_list">≡ List</button>
                <div class="view-toggle-glider"></div>
            </div>
        </div>
        <div id="gallery-filters"></div>
        <hr>
        <div id="gallery-grid"></div>
        <div id="gallery-show-more-container" style="text-align: center; margin-top: 2rem;"></div>
    </div>
    `;
}
// --- Module-Specific Logic ---

function getCombinedPhotosData() {
    const visitedDiscoverPhotos = EDITABLE_CONFIG.DISCOVER_DATA
        .filter(item => item.status === 'visited')
        .flatMap(item => 
            (item.photos || []).map(photoSrc => ({
                src: photoSrc,
                caption: item.title,
                year: new Date(item.date).getFullYear(),
                category: 'travel'
            }))
        );
    const mainPhotoSources = new Set(EDITABLE_CONFIG.PHOTOS_DATA.map(p => p.src));
    const uniqueDiscoverPhotos = visitedDiscoverPhotos.filter(p => !mainPhotoSources.has(p.src));
    return [...EDITABLE_CONFIG.PHOTOS_DATA, ...uniqueDiscoverPhotos];
}

/**
 * This is now the primary rendering function for the gallery.
 * It handles filtering, rendering photos, and applying all enhancements.
 * @param {string} category - The category to filter by.
 */
function renderGallery(category = 'all') {
    // If the category is changing, reset the "showAll" state.
    if (AppState.currentGalleryCategory !== category) {
        AppState.gallery.showAll = false;
    }
    AppState.currentGalleryCategory = category;
    const grid = $('gallery-grid');
    if (!grid) return;

    // 1. Get all photos and filter them
    const allPhotos = getCombinedPhotosData();
    const allPhotosInCategory = category === 'all' 
        ? allPhotos 
        : allPhotos.filter(p => p.category === category);
    AppState.gallery.currentPhotoList = allPhotosInCategory;

    // 2. Render category filter buttons
    const filtersContainer = $('gallery-filters');
    if (filtersContainer) {
        let categories = new Set(allPhotos.map(p => p.category));
        let buttonsHTML = '<button class="btn gallery-filter-btn active" data-category="all">All Events</button>';
        for (const key of Array.from(categories).sort()) {
            if (EDITABLE_CONFIG.GALLERY_CATEGORIES[key]) {
                buttonsHTML += `<button class="btn gallery-filter-btn" data-category="${key}">${EDITABLE_CONFIG.GALLERY_CATEGORIES[key]}</button>`;
            }
        }
        filtersContainer.innerHTML = buttonsHTML;
    }

    // 3. Handle "Show More" logic
    const showMoreContainer = $('gallery-show-more-container');
    if(showMoreContainer) showMoreContainer.innerHTML = '';
    const photosToRender = AppState.gallery.showAll || allPhotosInCategory.length <= 10
        ? allPhotosInCategory
        : allPhotosInCategory.slice(0, 10);

    grid.innerHTML = photosToRender.map((p, i) => `
        <div class="polaroid-item" data-index="${i}" data-src="${p.src}">
            <img src="${p.src}" alt="${p.caption}">
            <p class="polaroid-caption">${p.caption}</p>
            <button class="item-delete-btn" data-src="${p.src}" title="Delete">×</button>
        </div>
    `).join('');
    if (showMoreContainer && !AppState.gallery.showAll && allPhotosInCategory.length > 10) {
        showMoreContainer.innerHTML = `<button class="btn primary" id="show-more-gallery-btn" data-translate-id="gallery_show_more">Show More</button>`;
        $('show-more-gallery-btn').addEventListener('click', () => {
            AppState.gallery.showAll = true;
            renderGallery(category); // Re-render with all photos
        });
    }

    // 4. Update active filter button
    $$('.gallery-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });

    // 5. Apply all enhancements to the newly rendered items
    // This replaces the old `renderGalleryEnhanced` function's logic.
    displayGalleryStats();
    addGallerySearch();
    addGallerySorting();
    addYearTimeline();
    addSlideshowButton();
    addMasonryViewButton();
    applyPolaroidEffect();
    addPhotoLikes();
    addDownloadButtons();
    addHoverZoom();
    addPhotoMetadata();
    setGalleryView(localStorage.getItem('galleryView') || 'grid');

    // 6. Apply initial filters
    $$('.polaroid-item').forEach(item => {
        const photo = getCombinedPhotosData().find(p => p.src === item.dataset.src);
        if (!photo) {
            item.style.display = 'none'; return; }
        const categoryMatch = AppState.currentGalleryCategory === 'all' || photo.category === AppState.currentGalleryCategory;
        item.style.display = categoryMatch ? '' : 'none';
    });
    // Reset year filter visually
    $$('.timeline-year').forEach(btn => btn.classList.remove('active'));
    const allYearsBtn = document.querySelector('.timeline-year[data-year="all"]');
    if (allYearsBtn) allYearsBtn.classList.add('active');
}

async function deleteGalleryItem(photoSrc) {
    const itemToDelete = EDITABLE_CONFIG.PHOTOS_DATA.find(p => p.src === photoSrc);
    if (!itemToDelete) {
        console.error("Could not find gallery item to delete with src:", photoSrc);
        return;
    }
    if (confirm(`Are you sure you want to delete the photo "${itemToDelete.caption}"?`)) {
        const success = await apiDeleteItem('gallery', itemToDelete.src); 
        if (success) {
            renderGallery(AppState.currentGalleryCategory);
        }
    }
}

function handleGalleryUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    openUploadCategoryModal(file);
    event.target.value = '';
}

async function openUploadCategoryModal(file) {
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal active';
    modalBackdrop.id = 'upload-category-modal';
    let categoryButtonsHTML = '';
    for (const [key, value] of Object.entries(EDITABLE_CONFIG.GALLERY_CATEGORIES)) {
        categoryButtonsHTML += `<button class="btn gallery-filter-btn" data-category="${key}">${value}</button>`;
    }
    modalBackdrop.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <h3 class="panel-header" style="margin-bottom: 1.5rem;">Upload New Memory</h3>
            <div id="upload-status" style="margin-bottom: 1rem; color: var(--gold-light);">Uploading photo to server...</div>
            <div class="form-group">
                <label>Caption</label>
                <input type="text" id="upload-caption-input" class="text-input" placeholder="A new memory...">
            </div>
            <div class="form-group">
                <label>Category</label>
                <div id="upload-category-buttons" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem; pointer-events: none; opacity: 0.5;">
                    ${categoryButtonsHTML}
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn" id="cancel-upload-btn">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalBackdrop);
    
    const closeModal = () => modalBackdrop.remove();
    modalBackdrop.querySelector('#cancel-upload-btn').addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => { if (e.target === modalBackdrop) closeModal(); });

    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await fetch(`${API_URL}/upload/image`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) throw new Error('Server upload error');
        const result = await response.json();
        if (result.status === 'success') {
            $('upload-status').textContent = 'Upload complete! Please select a category.';
            const categoryButtons = $('upload-category-buttons');
            categoryButtons.style.pointerEvents = 'auto';
            categoryButtons.style.opacity = '1';
            modalBackdrop.querySelectorAll('.gallery-filter-btn').forEach(button => {
                button.addEventListener('click', async () => {
                    const caption = $('upload-caption-input').value || "A new memory";
                    const category = button.dataset.category;
                    const newPhotoData = { 
                        src: result.filepath, 
                        caption: caption, 
                        year: new Date().getFullYear(), 
                        category: category 
                    };
                    const savedItem = await apiAddItem('gallery', newPhotoData);
                    if (savedItem) {
                        closeModal();
                        AppState.gallery.showAll = false;
                        renderGallery(AppState.currentGalleryCategory);
                    }
                });
            });
        } else {
            throw new Error(result.message || 'Failed to get filepath from server.');
        }
    } catch (error) {
        console.error('Upload failed:', error);
        $('upload-status').textContent = `Error: ${error.message}`;
        $('upload-status').style.color = 'var(--crimson)';
    }
}

function handleGalleryClicks(e) {
    const target = e.target;
    const closest = (selector) => target.closest(selector);

    if (closest('.gallery-filter-btn')) { 
        const category = closest('.gallery-filter-btn').dataset.category; 
        renderGallery(category);
    }
    else if (closest('.item-delete-btn')) {
        e.stopPropagation();
        const photoSrc = closest('.item-delete-btn').dataset.src;
        deleteGalleryItem(photoSrc);
    } 
    else if (closest('.polaroid-item')) {
        // Update currentPhotoList based on VISIBLE items before opening lightbox
        AppState.gallery.currentPhotoList = Array.from($$('.polaroid-item'))
            .filter(item => item.style.display !== 'none')
            .map(item => getCombinedPhotosData().find(p => p.src === item.dataset.src));
        const index = AppState.gallery.currentPhotoList.findIndex(p => p.src === closest('.polaroid-item').dataset.src);
        // **FIX:** Call imported function
        openLightbox(index);
    }
    // **FIX**: Consolidated view button handling
    else if (closest('.btn-view')) {
        setGalleryView(closest('.btn-view').dataset.view);
    }
    else if (closest('#gallery-view-grid')) { // Fallback for safety, though .btn-view should catch it
        setGalleryView(closest('#gallery-view-grid').dataset.view);
    }
    else if (closest('#upload-photo-btn')) {
        $('photo-upload-input').click();
    }
    // **NEW**: Handle clicks on the favorites stat box to filter liked photos
    else if (closest('.stat-box[data-filter="favorites"]')) {
        const likes = JSON.parse(localStorage.getItem('photoLikes') || '{}');
        const likedPhotos = Object.keys(likes).filter(key => likes[key]);

        $$('.polaroid-item').forEach(item => {
            const isLiked = likedPhotos.includes(item.dataset.src);
            item.style.display = isLiked ? '' : 'none';
        });

        // Visually deselect other filters to show that the favorites filter is active
        $$('.gallery-filter-btn.active').forEach(btn => btn.classList.remove('active'));
        $$('.timeline-year.active').forEach(btn => btn.classList.remove('active'));
        // Also reset the search input
        const searchInput = $('gallery-search-input');
        if (searchInput) searchInput.value = '';
    }
}

// --- Public Module Functions ---
export function render(mainContent) {
    panelContainer = mainContent;
    panelContainer.innerHTML = getGalleryPanelHTML();
    
    // Initial render of the gallery with all enhancements
    renderGallery('all');
    
    panelContainer.addEventListener('click', handleGalleryClicks);
    $('photo-upload-input').addEventListener('change', handleGalleryUpload);
}

export function cleanup() {
    if (panelContainer) {
        panelContainer.removeEventListener('click', handleGalleryClicks);
    }
    panelContainer = null;
    AppState.gallery.currentPhotoList = [];
}

// ===================================================================
//  ENHANCED GALLERY FEATURES - Add to gallery.js
// ===================================================================

// 1. PHOTO SEARCH FUNCTIONALITY
function addGallerySearch() {
    const searchHTML = `
        <div class="gallery-search-container">
            <span class="gallery-search-icon">🔍</span>
            <input type="text" id="gallery-search-input" class="gallery-search-input" placeholder="Search memories...">
            <button class="gallery-search-clear" id="gallery-search-clear">×</button>
        </div>
    `;
    
    const panel = $('gallery-panel');
    if (panel) {
        // Check if the search container already exists to prevent duplicates
        if (panel.querySelector('.gallery-search-container')) return;

        panel.querySelector('.gallery-controls-container').insertAdjacentHTML('afterend', searchHTML);
        
        // Add translation for placeholder
        const searchInputEl = $('gallery-search-input');
        const placeholderText = personalizedContent.gallery_search_placeholder || 'Search memories...';
        if (searchInputEl) searchInputEl.placeholder = placeholderText;
        
        const searchInput = $('gallery-search-input');
        const clearBtn = $('gallery-search-clear');
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            clearBtn.classList.toggle('visible', query.length > 0);
            
            $$('.polaroid-item').forEach(item => {
                const caption = item.querySelector('.polaroid-caption')?.textContent.toLowerCase() || '';
                const match = caption.includes(query);
                item.style.display = match ? '' : 'none';
            });
        });
        
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearBtn.classList.remove('visible');
            $$('.polaroid-item').forEach(item => item.style.display = '');
        });
    }
}

// 2. PHOTO SORTING
function addGallerySorting() {
    const sortHTML = `
        <div class="gallery-sort-container">
            <label style="color: var(--gold);" data-translate-id="gallery_sort_by">Sort by:</label>
            <select id="gallery-sort-select" class="gallery-sort-select">
                <option value="date-desc" data-translate-id="gallery_sort_newest">Newest First</option>
                <option value="date-asc" data-translate-id="gallery_sort_oldest">Oldest First</option>
                <option value="name-asc" data-translate-id="gallery_sort_name_az">Name A-Z</option>
                <option value="name-desc" data-translate-id="gallery_sort_name_za">Name Z-A</option>
            </select>
        </div>
    `;
    
    const controlsContainer = document.querySelector('.gallery-controls-container');
    if (controlsContainer) {
        // Check if the sort container already exists
        if (controlsContainer.querySelector('.gallery-sort-container')) return;

        controlsContainer.insertAdjacentHTML('beforeend', sortHTML);
        
        $('gallery-sort-select')?.addEventListener('change', (e) => {
            sortGallery(e.target.value);
        });
    }
}

function sortGallery(sortType) {
    const grid = $('gallery-grid');
    if (!grid) return;
    
    const items = Array.from($$('.polaroid-item'));
    
    items.sort((a, b) => {
        const captionA = a.querySelector('.polaroid-caption')?.textContent || '';
        const captionB = b.querySelector('.polaroid-caption')?.textContent || '';
        
        switch(sortType) {
            case 'name-asc':
                return captionA.localeCompare(captionB);
            case 'name-desc':
                return captionB.localeCompare(captionA);
            case 'date-desc':
                return parseInt(b.dataset.index) - parseInt(a.dataset.index);
            case 'date-asc':
                return parseInt(a.dataset.index) - parseInt(b.dataset.index);
            default:
                return 0;
        }
    });
    
    items.forEach(item => grid.appendChild(item));
}

// 3. REALISTIC POLAROID EFFECT WITH RANDOM ROTATIONS
function applyPolaroidEffect() {
    // This effect is now applied conditionally based on the view
    const grid = $('gallery-grid');
    if (grid && grid.classList.contains('masonry-view')) {
        $$('.polaroid-item').forEach((item, index) => {
            const rotation = (Math.random() - 0.5) * 6; // Random rotation between -3 and 3 degrees
            item.classList.add('polaroid-realistic');
            item.style.setProperty('--rotation', `${rotation}deg`);
        });
    } else {
        // If not in masonry view, remove the polaroid effect to keep the grid clean
        $$('.polaroid-item').forEach(item => item.classList.remove('polaroid-realistic'));
    }
}

function updateFavoritesCount() {
    const likes = JSON.parse(localStorage.getItem('photoLikes') || '{}');
    const likedCount = Object.values(likes).filter(v => v).length;
    const banner = document.querySelector('.gallery-stats-banner');
    if (!banner) return;
    const likedStatEl = banner.querySelector('.stat-box:last-child .stat-number');
    if (likedStatEl) {
        likedStatEl.textContent = likedCount;
    }
}
// 4. PHOTO LIKES/HEARTS
function addPhotoLikes() {
    const likes = JSON.parse(localStorage.getItem('photoLikes') || '{}');
    
    $$('.polaroid-item').forEach(item => {
        // **FIX**: Prevent adding duplicate like buttons
        if (item.querySelector('.photo-like-btn')) return;

        const photoSrc = item.dataset.src;
        const isLiked = likes[photoSrc] || false;
        
        const likeBtn = document.createElement('button');
        likeBtn.className = `photo-like-btn ${isLiked ? 'liked' : ''}`;
        likeBtn.innerHTML = isLiked ? '❤️' : '🤍';
        likeBtn.title = 'Like this photo';
        
        likeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const currentlyLiked = likes[photoSrc];
            likes[photoSrc] = !currentlyLiked;
            localStorage.setItem('photoLikes', JSON.stringify(likes));
            
            likeBtn.innerHTML = likes[photoSrc] ? '❤️' : '🤍';
            likeBtn.classList.toggle('liked', likes[photoSrc]);
            updateFavoritesCount();
        });
        
        item.appendChild(likeBtn);
    });
}

// 5. PHOTO DOWNLOAD BUTTON
function addDownloadButtons() {
    $$('.polaroid-item').forEach(item => {
        const photoSrc = item.dataset.src;
        
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'photo-download-btn';
        downloadBtn.innerHTML = '⬇️';
        downloadBtn.title = 'Download photo';
        
        downloadBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            try {
                const response = await fetch(photoSrc);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = photoSrc.split('/').pop() || 'photo.jpg';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Download failed:', error);
            }
        });
        
        item.appendChild(downloadBtn);
    });
}

// 6. GALLERY STATISTICS
function calculateGalleryStats() {
    const allPhotos = getCombinedPhotosData();
    const years = [...new Set(allPhotos.map(p => p.year))];
    const categories = [...new Set(allPhotos.map(p => p.category))];
    const likes = JSON.parse(localStorage.getItem('photoLikes') || '{}');
    const likedCount = Object.values(likes).filter(v => v).length;
    
    return {
        total: allPhotos.length,
        years: years.length,
        categories: categories.length,
        liked: likedCount
    };
}

function displayGalleryStats() {
    const stats = calculateGalleryStats();
    const statsHTML = `
        <div class="gallery-stats-banner">
            <div class="stat-box">
                <span class="stat-number">${stats.total}</span>
                <span class="stat-label">Total Memories</span>
            </div>
            <div class="stat-box">
                <span class="stat-number">${stats.years}</span>
                <span class="stat-label">Years Together</span>
            </div>
            <div class="stat-box">
                <span class="stat-number">${stats.categories}</span>
                <span class="stat-label">Categories</span>
            </div>
            <div class="stat-box" data-filter="favorites">
                <span class="stat-number" data-filter="favorites">${stats.liked}</span>
                <span class="stat-label">❤️ Favorites</span>
            </div>
        </div>
    `;
    
    const filtersElement = $('gallery-filters');
    if (filtersElement) {
        let banner = document.querySelector('.gallery-stats-banner');
        if (banner) {
            // If it exists, just update its content to reflect new stats
            const totalEl = banner.querySelector('.stat-box:nth-child(1) .stat-number');
            const yearsEl = banner.querySelector('.stat-box:nth-child(2) .stat-number');
            const catEl = banner.querySelector('.stat-box:nth-child(3) .stat-number');
            if (totalEl) totalEl.textContent = stats.total;
            if (yearsEl) yearsEl.textContent = stats.years;
            if (catEl) catEl.textContent = stats.categories;
        } else {
            filtersElement.insertAdjacentHTML('beforebegin', statsHTML);
        }
    }
}

// 7. YEAR TIMELINE NAVIGATION
function addYearTimeline() {
    const allPhotos = getCombinedPhotosData();
    const years = [...new Set(allPhotos.map(p => p.year))].sort((a, b) => b - a);
    
    const timelineHTML = `
        <div class="gallery-timeline">
            <div class="timeline-year active" data-year="all" data-translate-id="gallery_timeline_all">All Years</div>
            ${years.map(year => `
                <div class="timeline-year" data-year="${year}">${year}</div>
            `).join('')}
        </div>
    `;
    
    const filtersElement = $('gallery-filters');
    if (filtersElement) {
        // Check if the timeline already exists
        if (document.querySelector('.gallery-timeline')) return;

        filtersElement.insertAdjacentHTML('beforebegin', timelineHTML);
        
        $$('.timeline-year').forEach(yearBtn => {
            yearBtn.addEventListener('click', () => {
                $$('.timeline-year').forEach(btn => btn.classList.remove('active'));
                yearBtn.classList.add('active');
                const selectedYear = yearBtn.dataset.year;
                const selectedCategory = AppState.currentGalleryCategory || 'all';

                // Combined filtering logic
                $$('.polaroid-item').forEach(item => {
                    const photo = getCombinedPhotosData().find(p => p.src === item.dataset.src);
                    if (!photo) { item.style.display = 'none'; return; }

                    const categoryMatch = selectedCategory === 'all' || photo.category === selectedCategory;
                    const yearMatch = selectedYear === 'all' || photo.year.toString() === selectedYear;

                    item.style.display = (categoryMatch && yearMatch) ? '' : 'none';
                });
            });
        });
    }
}

// 8. SLIDESHOW MODE
let slideshowInterval = null;
let currentSlideIndex = 0;

function createSlideshowContainer() {
    const slideshowHTML = `
        <div class="slideshow-container" id="slideshow-container">
            <div class="slideshow-caption" id="slideshow-caption"></div>
            <img class="slideshow-image" id="slideshow-image" src="" alt="Slideshow">
            <div class="slideshow-controls">
                <button class="slideshow-btn" id="slideshow-prev">⏮️</button>
                <button class="slideshow-btn" id="slideshow-play-pause">⏸️</button>
                <button class="slideshow-btn" id="slideshow-next">⏭️</button>
                <button class="slideshow-btn" id="slideshow-close">✖️</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', slideshowHTML);
    
    $('slideshow-prev')?.addEventListener('click', () => navigateSlide(-1));
    $('slideshow-next')?.addEventListener('click', () => navigateSlide(1));
    $('slideshow-play-pause')?.addEventListener('click', toggleSlideshow);
    $('slideshow-close')?.addEventListener('click', closeSlideshow);
}

function startSlideshow(startIndex = 0) {
    currentSlideIndex = startIndex;
    const container = $('slideshow-container');
    
    if (!container) {
        createSlideshowContainer();
    }
    
    $('slideshow-container')?.classList.add('active');
    showSlide(currentSlideIndex);
    
    slideshowInterval = setInterval(() => navigateSlide(1), 3000);
}

function showSlide(index) {
    const photos = AppState.gallery.currentPhotoList || [];
    if (photos.length === 0) return;
    
    currentSlideIndex = ((index % photos.length) + photos.length) % photos.length;
    const photo = photos[currentSlideIndex];
    
    $('slideshow-image').src = photo.src;
    $('slideshow-caption').textContent = photo.caption;
}

function navigateSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

function toggleSlideshow() {
    const btn = $('slideshow-play-pause');
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        btn.textContent = '▶️';
    } else {
        slideshowInterval = setInterval(() => navigateSlide(1), 3000);
        btn.textContent = '⏸️';
    }
}

function closeSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
    $('slideshow-container')?.classList.remove('active');
}

// 9. ADD SLIDESHOW BUTTON TO CONTROLS
function addSlideshowButton() {
    const slideshowBtn = `
        <button class="btn primary" id="start-slideshow-btn" style="margin-left: 0.5rem;">
            <span data-translate-id="gallery_slideshow">🎬 Slideshow</span>
        </button>
    `;
    
    const uploadBtn = $('upload-photo-btn');
    if (uploadBtn) {
        // Check if the slideshow button already exists
        if (document.getElementById('start-slideshow-btn')) return;

        uploadBtn.insertAdjacentHTML('afterend', slideshowBtn);
        
        $('start-slideshow-btn')?.addEventListener('click', () => {
            startSlideshow(0);
        });
    }
}

// 10. **FIXED**: UNIFIED GALLERY VIEW FUNCTION
function setGalleryView(view) {
    const grid = $('gallery-grid');
    if (!grid) return;
    
    // Set the correct class, removing others
    grid.className = 'gallery-grid'; // Reset to base class
    grid.classList.add(`${view}-view`);
    
    localStorage.setItem('galleryView', view);
    // Re-apply polaroid effect conditionally after changing the view
    applyPolaroidEffect();
    updateViewToggle(view);
}

// **FIXED**: Correctly handles the animated glider
function updateViewToggle(view) {
    $$('.btn-view').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.btn-view[data-view="${view}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        const glider = document.querySelector('.view-toggle-glider');
        if (glider) {
            glider.style.width = `${activeBtn.offsetWidth}px`;
            glider.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
        }
    }
}

// 11. ADD MASONRY VIEW BUTTON
function addMasonryViewButton() {
    const masonryBtn = `
        <button class="btn-view" data-view="masonry" title="Masonry View" data-translate-id="gallery_view_masonry">⊞ Masonry</button>
    `;
    
    const viewToggle = $('gallery-view-toggle');
    if (viewToggle) {
        // Check if button already exists before adding
        if (!viewToggle.querySelector('[data-view="masonry"]')) {
            viewToggle.querySelector('[data-view="list"]').insertAdjacentHTML('afterend', masonryBtn);
        }
        
    }
}

// 12. HOVER ZOOM EFFECT
function addHoverZoom() {
    $$('.polaroid-item').forEach(item => {
        item.classList.add('hover-zoom');
    });
}

// 13. PHOTO METADATA OVERLAY
function addPhotoMetadata() {
    const allPhotos = getCombinedPhotosData();
    
    $$('.polaroid-item').forEach(item => {
        const photoSrc = item.dataset.src;
        const photo = allPhotos.find(p => p.src === photoSrc);
        
        if (photo) {
            const metadataHTML = `
                <div class="photo-metadata">
                    <div class="photo-date" data-translate-id="gallery_meta_unknown_year" data-year="${photo.year || 'Unknown'}">📅 ${photo.year || 'Unknown'}</div>
                    <div class="photo-location" data-translate-id="gallery_meta_memory" data-caption="${photo.caption || 'Memory'}">📍 ${photo.caption || 'Memory'}</div>
                </div>
            `;
            
            item.insertAdjacentHTML('beforeend', metadataHTML);
        }
    });
}

// 14. INFINITE SCROLL (Load More)
let isLoadingMore = false;
const PHOTOS_PER_PAGE = 12;
let currentLoadedCount = PHOTOS_PER_PAGE;

function setupInfiniteScroll() {
    window.addEventListener('scroll', () => {
        const grid = $('gallery-grid');
        if (!grid || isLoadingMore) return;
        
        const gridRect = grid.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if we're near the bottom
        if (gridRect.bottom <= windowHeight + 200) {
            loadMorePhotos();
        }
    });
}

function loadMorePhotos() {
    const allPhotos = AppState.gallery.currentPhotoList || [];
    const displayedPhotos = $$('.polaroid-item').length;
    
    if (displayedPhotos >= allPhotos.length) return;
    
    isLoadingMore = true;
    const grid = $('gallery-grid');
    
    // Show loading indicator
    grid.insertAdjacentHTML('beforeend', `
        <div class="gallery-loading-more">
            <div class="loading-spinner"></div>
            <p data-translate-id="gallery_loading_more">Loading more memories...</p>
        </div>
    `);
    
    // Simulate loading delay
    setTimeout(() => {
        const nextBatch = allPhotos.slice(displayedPhotos, displayedPhotos + 6);
        const loadingIndicator = grid.querySelector('.gallery-loading-more');
        
        nextBatch.forEach((photo, index) => {
            const photoHTML = `
                <div class="polaroid-item" data-index="${displayedPhotos + index}" data-src="${photo.src}">
                    <img src="${photo.src}" alt="${photo.caption}">
                    <p class="polaroid-caption">${photo.caption}</p>
                    <button class="item-delete-btn" data-src="${photo.src}" title="Delete">×</button>
                </div>
            `;
            loadingIndicator.insertAdjacentHTML('beforebegin', photoHTML);
        });
        
        loadingIndicator.remove();
        isLoadingMore = false;
        
        // Re-apply enhancements to new items
        addPhotoLikes();
        addDownloadButtons();
        addHoverZoom();
        addPhotoMetadata();
    }, 800);
}

// 15. BULK SELECTION MODE
let bulkSelectionMode = false;
let selectedPhotos = new Set();

function toggleBulkSelection() {
    bulkSelectionMode = !bulkSelectionMode;
    
    if (bulkSelectionMode) {
        $$('.polaroid-item').forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', handleBulkPhotoClick);
        });
        
        showBulkActions();
    } else {
        $$('.polaroid-item').forEach(item => {
            item.classList.remove('selected');
            item.removeEventListener('click', handleBulkPhotoClick);
        });
        selectedPhotos.clear();
        hideBulkActions();
    }
}

function handleBulkPhotoClick(e) {
    e.stopPropagation();
    const item = e.currentTarget;
    const photoSrc = item.dataset.src;
    
    if (selectedPhotos.has(photoSrc)) {
        selectedPhotos.delete(photoSrc);
        item.classList.remove('selected');
    } else {
        selectedPhotos.add(photoSrc);
        item.classList.add('selected');
    }
    
    updateBulkActionsCount();
}

function showBulkActions() {
    const bulkActionsHTML = `
        <div id="bulk-actions-bar" style="position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); background: rgba(17, 12, 31, 0.95); padding: 1rem 2rem; border-radius: 30px; border: 1px solid var(--gold); display: flex; gap: 1rem; align-items: center; z-index: 100;">
            <span id="bulk-count" style="color: var(--gold);">0 selected</span>
            <button class="btn" id="bulk-delete-btn">🗑️ Delete</button>
            <button class="btn" id="bulk-download-btn">⬇️ Download</button>
            <button class="btn" id="bulk-cancel-btn">Cancel</button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', bulkActionsHTML);
    
    $('bulk-cancel-btn')?.addEventListener('click', toggleBulkSelection);
}

function hideBulkActions() {
    document.getElementById('bulk-actions-bar')?.remove();
}

function updateBulkActionsCount() {
    const countElement = $('bulk-count');
    if (countElement) {
        countElement.textContent = `${selectedPhotos.size} selected`;
    }
}
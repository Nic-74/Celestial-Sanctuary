// ===================================================================
//  MODULE: DISCOVER (js/modules/discover.js)
// ===================================================================

import {
    $, $$, AppState, EDITABLE_CONFIG, DOM,
    apiAddItem, apiUpdateItem, apiDeleteItem,
    // Import modal controllers
    openLightbox
} from '../common.js';

// --- Local State ---
let panelContainer = null;
let tempPhotos = [];
let currentFilter = 'all';

// --- HTML Template ---

function getDiscoverPanelHTML() {
    return `
    <div id="discover-panel" class="content-panel active">
        <h2 class="panel-header" data-translate-id="discover_title">Realms of Discovery</h2>
        <p class="panel-subheader" data-translate-id="discover_subtitle">Charting our future adventures and cherishing the paths we've already walked.</p>
        <div class="discover-actions">
            <button class="btn primary" id="add-discover-item-btn" data-translate-id="discover_add">🗺️ Add New Destination</button>
        </div>
        <div class="discover-filters">
            <button class="btn gallery-filter-btn active" data-status="all" data-translate-id="discover_filter_all">All</button>
            <button class="btn gallery-filter-btn" data-status="planned" data-translate-id="discover_filter_planned">PLANNED</button>
            <button class="btn gallery-filter-btn" data-status="wishlist" data-translate-id="discover_filter_wishlist">WISHLIST</button>
            <button class="btn gallery-filter-btn" data-status="visited" data-translate-id="discover_filter_visited">VISITED</button>
        </div>
        <hr>
        <div class="discover-grid" id="discover-grid"></div>
    </div>
    `;
}

// --- Module-Specific Logic ---

function renderGrid(filter = 'all') {
    const grid = $('discover-grid');
    if (!grid) return;
    currentFilter = filter;

    const filteredData = filter === 'all'
        ? EDITABLE_CONFIG.DISCOVER_DATA
        : EDITABLE_CONFIG.DISCOVER_DATA.filter(item => item.status === filter);

    filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));

    grid.innerHTML = filteredData.map(item => `
        <div class="discover-card" data-id="${item.id}">
            <img src="${item.photos && item.photos.length > 0 ? item.photos[0] : 'photos/default_discover.jpg'}" alt="${item.title}" class="discover-card-image" onerror="this.onerror=null; this.src='photos/default_discover.jpg';">
            <div class="discover-card-content">
                <div class="discover-card-header">
                    <h3 class="discover-card-title">${item.title}</h3>
                    <span class="discover-status-badge status-${item.status || 'wishlist'}" data-id="${item.id}" title="Click to change status">${(item.status || 'wishlist').toUpperCase()}</span>
                </div>
                <p class="discover-card-meta">
                    <strong>📍 ${item.location || 'TBD'}</strong> | <strong>🗓️ ${item.date ? new Date(item.date).toLocaleDateString() : 'TBD'}</strong>
                </p>
                <p class="discover-card-description">${item.description || 'No description yet.'}</p>
                <div class="discover-card-actions">
                    <a href="${item.link}" target="_blank" class="btn" ${!item.link ? 'style="display:none;"' : ''}><span class="btn-icon">🔗</span>Link</a>
                    <button class="btn view-photos-btn" data-id="${item.id}"><span class="btn-icon">🖼️</span>Photos</button>
                    <button class="btn edit-discover-btn" data-id="${item.id}"><span class="btn-icon">✏️</span>Edit</button>
                    <button class="btn btn-icon-only delete-discover-btn" data-id="${item.id}" title="Delete"><span class="btn-icon">🗑️</span></button>
                </div>
            </div>
        </div>
    `).join('');

    $$('.discover-filters .btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.status === filter);
    });
}

function openDiscoverModal(itemId = null) {
    const modal = $('discover-item-modal');
    const modalTitle = $('discover-modal-title');
    const editIdInput = $('discover-modal-edit-id');

    $('discover-title-input').value = '';
    $('discover-location-input').value = '';
    $('discover-date-input').value = '';
    $('discover-link-input').value = '';
    $('discover-status-select').value = 'wishlist';
    $('discover-desc-input').value = '';
    editIdInput.value = '';
    tempPhotos = [];

    if (itemId) {
        const item = EDITABLE_CONFIG.DISCOVER_DATA.find(d => d.id === itemId);
        if (item) {
            modalTitle.textContent = 'Edit Destination';
            editIdInput.value = item.id;
            $('discover-title-input').value = item.title;
            $('discover-location-input').value = item.location;
            $('discover-date-input').value = item.date;
            $('discover-link-input').value = item.link;
            $('discover-status-select').value = item.status;
            $('discover-desc-input').value = item.description;
            tempPhotos = item.photos ? [...item.photos] : [];
        }
    } else {
        modalTitle.textContent = 'Add New Destination';
    }
    modal.classList.add('active');
    renderPhotoPreviews();
}

function closeDiscoverModal() {
    $('discover-item-modal').classList.remove('active');
}

async function saveDiscoverItem() {
    const id = $('discover-modal-edit-id').value;
    const newItemData = {
        title: $('discover-title-input').value || 'New Destination',
        location: $('discover-location-input').value,
        date: $('discover-date-input').value,
        link: $('discover-link-input').value,
        status: $('discover-status-select').value,
        description: $('discover-desc-input').value,
        photos: [...tempPhotos]
    };

    let savedItem;
    if (id) {
        savedItem = await apiUpdateItem('discover', id, newItemData);
    } else {
        newItemData.id = `discover_${new Date().getTime()}`;
        savedItem = await apiAddItem('discover', newItemData);
    }

    if (savedItem) {
        closeDiscoverModal();
        renderGrid(currentFilter);
    }
}

async function deleteDiscoverItem(itemId) {
    if (confirm('Are you sure you want to delete this destination? This cannot be undone.')) {
        const success = await apiDeleteItem('discover', itemId);
        if (success) {
            renderGrid(currentFilter);
        }
    }
}

async function cycleDiscoverStatus(event, itemId) {
    event.stopPropagation();
    const item = EDITABLE_CONFIG.DISCOVER_DATA.find(d => d.id === itemId);
    if (!item) return;

    const statuses = ['planned', 'visited', 'wishlist'];
    const currentIndex = statuses.indexOf(item.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    const newStatus = statuses[nextIndex];

    const badge = event.target;
    if (badge) {
        badge.classList.add('cycling');
        badge.className = `discover-status-badge status-${newStatus}`;
        badge.textContent = newStatus.toUpperCase();
        setTimeout(() => badge.classList.remove('cycling'), 500);
    }
    
    const updatedData = { ...item, status: newStatus };
    const savedItem = await apiUpdateItem('discover', itemId, updatedData);
    
    if (savedItem) {
        item.status = newStatus; // Commit change locally
    } else {
        if (badge) { // Revert UI
            badge.className = `discover-status-badge status-${item.status}`;
            badge.textContent = item.status.toUpperCase();
        }
        alert("Failed to update status. Please try again.");
    }
}

function renderPhotoPreviews() {
    const container = $('discover-photo-previews');
    const uploadArea = $('discover-photo-upload-area');
    if (!container || !uploadArea) return;
    container.innerHTML = tempPhotos.map((photoSrc, index) => `
        <div class="discover-preview-item">
            <img src="${photoSrc}" class="discover-preview-img" alt="Preview">
            <button class="discover-preview-delete" data-index="${index}">×</button>
        </div>
    `).join('');
    if (tempPhotos.length > 0) {
        uploadArea.style.backgroundImage = `url('${tempPhotos[0]}')`;
        uploadArea.classList.add('has-photo');
        uploadArea.innerHTML = '<span>Click to add more</span>';
    } else {
        uploadArea.style.backgroundImage = 'none';
        uploadArea.classList.remove('has-photo');
        uploadArea.innerHTML = 'Click here to upload photos';
    }
}

async function handlePhotoUpload(event) {
    const files = event.target.files;
    if (!files) return;
    const uploadArea = $('discover-photo-upload-area');
    uploadArea.innerHTML = `<span>Uploading ${files.length} photo(s)...</span>`;
    for (const file of files) {
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
                tempPhotos.push(result.filepath);
            } else {
                throw new Error(result.message || 'File upload failed');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert(`Error uploading ${file.name}: ${error.message}`);
        }
    }
    renderPhotoPreviews();
}

function viewDiscoverItemPhotos(itemId) {
    const item = EDITABLE_CONFIG.DISCOVER_DATA.find(d => d.id === itemId);
    if (!item || !item.photos || item.photos.length === 0) {
        alert('No photos for this destination yet.');
        return;
    }
    AppState.gallery.currentPhotoList = item.photos.map(p => ({ src: p, caption: item.title }));
    window.openLightbox(0); // Use the globally exposed function
}

function handleDiscoverClicks(e) {
    const target = e.target;
    const closest = (selector) => target.closest(selector);

    if (closest('.discover-filters .btn')) {
        renderGrid(closest('.discover-filters .btn').dataset.status);
    } 
    else if (closest('#add-discover-item-btn')) {
        openDiscoverModal();
    }
    else if (closest('.edit-discover-btn')) {
        openDiscoverModal(closest('.edit-discover-btn').dataset.id);
    }
    else if (closest('.delete-discover-btn')) {
        deleteDiscoverItem(closest('.delete-discover-btn').dataset.id);
    }
    else if (closest('.view-photos-btn')) {
        viewDiscoverItemPhotos(closest('.view-photos-btn').dataset.id);
    }
    else if (closest('.discover-status-badge')) {
        cycleDiscoverStatus(e, closest('.discover-status-badge').dataset.id);
    }
    // Handle preview delete
    else if (closest('.discover-preview-delete')) {
        e.stopPropagation();
        const indexToRemove = parseInt(e.target.dataset.index, 10);
        tempPhotos.splice(indexToRemove, 1);
        renderPhotoPreviews();
    }
}

// --- Public Module Functions ---

export function render(mainContent) {
    panelContainer = mainContent;
    panelContainer.innerHTML = getDiscoverPanelHTML();

    panelContainer.addEventListener('click', handleDiscoverClicks);
    $('discover-modal-cancel').addEventListener('click', closeDiscoverModal);
    $('discover-modal-save').addEventListener('click', saveDiscoverItem);
    $('discover-photo-upload-area').addEventListener('click', () => {
        $('discover-photo-input').click();
    });
    $('discover-photo-input').addEventListener('change', handlePhotoUpload);
    $('discover-item-modal').addEventListener('click', (e) => {
        if (e.target === $('discover-item-modal')) closeDiscoverModal();
    });

    renderGrid('all');
}

export function cleanup() {
    if (panelContainer) {
        panelContainer.removeEventListener('click', handleDiscoverClicks);
    }
    panelContainer = null;
    tempPhotos = [];
    currentFilter = 'all';
}
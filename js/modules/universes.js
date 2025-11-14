// ===================================================================
//  MODULE: UNIVERSES (js/modules/universes.js)
// ===================================================================

import {
    $, $$, AppState, ALTERNATE_UNIVERSES,
    apiAddItem, apiUpdateItem, apiDeleteItem
} from '../common.js';

// --- Local State ---
let panelContainer = null;

// --- HTML Template ---

function getUniversePanelHTML() {
    return `
    <div id="universe-panel" class="content-panel active">
        <h2 class="panel-header">∞ The Alternate Chronicles ∞</h2>
        <p class="panel-subheader">"In every universe, across every timeline, we find each other. Love is the one constant in infinite possibilities."</p>
        
        <div class="universe-hub">
            <div class="universe-portal-viz">
                <div class="central-nexus">∞</div>
                <canvas id="portal-particles"></canvas>
            </div>
            <p style="color: var(--text-secondary); font-style: italic; margin-top: 1rem;">
                Each portal leads to a different version of our story. Some we've written, others wait to be discovered...
            </p>
        </div>

        <div class="universe-actions" style="display: flex; gap: 1rem; justify-content: center; margin: 2rem 0;">
            <button class="btn primary" id="create-universe-btn">🌟 Create New Universe</button>
            <button class="btn" id="filter-all-btn">Show All</button>
            <button class="btn" id="filter-written-btn">Written Stories</button>
            <button class="btn" id="filter-unwritten-btn">Awaiting Creation</button>
        </div>

        <div class="universe-grid" id="universe-grid">
            </div>

        <div id="universe-reading-view" style="display: none;">
            </div>
    </div>
    `;
}

// --- Module-Specific Logic ---

function renderUniverseGrid(filter = 'all') {
    const grid = $('universe-grid');
    if (!grid) return;

    let filteredUniverses = ALTERNATE_UNIVERSES;
    if (filter === 'written') {
        filteredUniverses = ALTERNATE_UNIVERSES.filter(u => u.chapters && u.chapters.length > 0);
    } else if (filter === 'unwritten') {
        filteredUniverses = ALTERNATE_UNIVERSES.filter(u => !u.chapters || u.chapters.length === 0);
    }

    grid.innerHTML = filteredUniverses.map(universe => `
        <div class="universe-card" data-id="${universe.id}">
            <div class="universe-header">
                <div class="universe-card-controls" data-id="${universe.id}">
                    <button class="btn btn-icon-only edit-btn" title="Edit">✏️</button>
                    <button class="btn btn-icon-only delete-btn" title="Delete">🗑️</button>
                </div>
                <div class="universe-icon">${universe.icon}</div>
                <h3 class="universe-title">${universe.title}</h3>
                <div class="universe-era">${universe.era}</div>
            </div>
            <img class="universe-illustration" src="${universe.image}" alt="${universe.title}" onerror="this.style.display='none'">
            <div class="universe-content">
                <p class="universe-premise">${universe.premise}</p>
                <div class="universe-card-footer">
                    <div class="universe-stats">
                        <span>📖 ${(universe.chapters || []).length} chapters</span>
                        <span>📝 ${calculateWordCount(universe)} words</span>
                    </div>
                    <div class="universe-stats" style="margin-top: 0.5rem;">
                        <span style="color: var(--text-secondary); font-size: 0.85rem;">
                            Last updated: ${universe.stats ? universe.stats.lastUpdated : 'N/A'}
                        </span>
                    </div>
                </div>
            </div>
            <div class="universe-actions" style="padding: 0 1.5rem 1.5rem 1.5rem;">
                 <div class="universe-actions">
                    <button class="btn primary read-story-btn" data-id="${universe.id}">
                        ${(universe.chapters && universe.chapters.length > 0) ? '📖 Read Story' : '✍️ Start Writing'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function calculateWordCount(universe) {
    if (!universe || !universe.chapters || universe.chapters.length === 0) return 0;
    return universe.chapters.reduce((sum, chap) => sum + (chap.content.split(/\s+/).length), 0);
}

function openUniverse(universeId) {
    const universe = ALTERNATE_UNIVERSES.find(u => u.id === universeId);
    if (!universe) return;

    const hubElements = panelContainer.querySelectorAll('.universe-hub, .universe-actions, .universe-grid');
    const readingView = $('universe-reading-view');
    if (!readingView || hubElements.length === 0) return;

    hubElements.forEach(el => el.style.display = 'none');
    readingView.style.display = 'block';

    if (!universe.chapters || universe.chapters.length === 0) {
        // No chapters - show premise, character info, and a "Start Writing" button
        readingView.innerHTML = `
            <div class="universe-reading-view">
                <button class="btn" id="back-to-hub-btn" style="margin-bottom: 2rem;">← Back to Multiverse</button>
                <div class="chapter-illustration-container">
                    <img class="chapter-illustration" src="${universe.image}" alt="${universe.title}" onerror="this.style.display='none'"/>
                </div>
                <h2 class="panel-header">${universe.icon} ${universe.title}</h2>
                <h3 style="color: var(--text-secondary); text-align: center; margin-bottom: 2rem;">${universe.era}</h3>
                <div class="universe-premise-full">
                    <h4>The Premise</h4>
                    <p>${universe.premise}</p>
                </div>
                <div class="universe-characters">
                    <div class="character-card">
                        <h4>${universe.characters.nic.name}</h4>
                        <p>${universe.characters.nic.role}</p>
                    </div>
                    <div class="character-card">
                        <h4>${universe.characters.zoya.name}</h4>
                        <p>${universe.characters.zoya.role}</p>
                    </div>
                </div>
                <div class="chapter-content" style="text-align: center; margin-top: 3rem;">
                    <h3 class="chapter-title">This story is yet to be written...</h3>
                    <button class="btn primary" data-action="add-chapter" data-universe-id="${universe.id}" style="margin-top: 1rem;">✍️ Write the First Chapter</button>
                </div>
            </div>`;
    } else {
        // Has chapters - show reading view
        const chaptersHTML = universe.chapters.map((chapter, index) => `
            <div class="chapter-content">
                <div class="chapter-header">
                    <h3 class="chapter-title">${chapter.title}</h3>
                    <button class="btn btn-icon-only" data-action="edit-chapter" data-universe-id="${universe.id}" data-chapter-index="${index}" title="Edit Chapter">✏️</button>
                </div>
                <div class="chapter-text">
                    ${chapter.content.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('')}
                </div>
            </div>
        `).join('<hr>');

        readingView.innerHTML = `
            <div class="universe-reading-view">
                <button class="btn" id="back-to-hub-btn" style="margin-bottom: 2rem;">← Back to Multiverse</button>
                <div class="chapter-illustration-container">
                    <img class="chapter-illustration" src="${universe.image}" alt="${universe.title}" onerror="this.style.display='none'"/>
                </div>
                <h2 class="panel-header">${universe.icon} ${universe.title}</h2>
                <h3 style="color: var(--text-secondary); text-align: center; margin-bottom: 2rem;">${universe.era}</h3>
                <div class="universe-characters">
                    <div class="character-card">
                        <h4>${universe.characters.nic.name}</h4>
                        <p>${universe.characters.nic.role}</p>
                    </div>
                    <div class="character-card">
                        <h4>${universe.characters.zoya.name}</h4>
                        <p>${universe.characters.zoya.role}</p>
                    </div>
                </div>
                ${chaptersHTML}
                <div style="text-align: center; margin-top: 2rem;">
                    <button class="btn primary" data-action="add-chapter" data-universe-id="${universe.id}">✍️ Add New Chapter</button>
                </div>
            </div>`;
    }
    
    // Add listener for the new back button
    $('back-to-hub-btn').addEventListener('click', returnToUniverseHub);
}

function returnToUniverseHub() {
    const hubElements = panelContainer.querySelectorAll('.universe-hub, .universe-actions, .universe-grid');
    const readingView = $('universe-reading-view');
    if (hubElements.length > 0 && readingView) {
        readingView.style.display = 'none';
        readingView.innerHTML = ''; // Clear content
        hubElements.forEach(el => el.style.display = ''); // Restore display
        renderUniverseGrid(); // Re-render to ensure it's up to date
    }
}

function openUniverseEditor(universeId = null) {
    const modal = $('universe-editor-modal');
    const titleEl = $('universe-modal-title');
    
    // Reset form
    $('universe-id-input').value = '';
    $('universe-title-input').value = '';
    $('universe-era-input').value = '';
    $('universe-icon-input').value = '';
    $('universe-image-input').value = '';
    $('universe-premise-input').value = '';
    $('universe-nic-name-input').value = '';
    $('universe-nic-role-input').value = '';
    $('universe-zoya-name-input').value = '';
    $('universe-zoya-role-input').value = '';

    if (universeId) {
        const universe = ALTERNATE_UNIVERSES.find(u => u.id === universeId);
        if (universe) {
            titleEl.textContent = 'Edit Universe';
            $('universe-id-input').value = universe.id;
            $('universe-id-input').readOnly = true; // Don't allow changing ID
            $('universe-title-input').value = universe.title;
            $('universe-era-input').value = universe.era;
            $('universe-icon-input').value = universe.icon;
            $('universe-image-input').value = universe.image;
            $('universe-premise-input').value = universe.premise;
            $('universe-nic-name-input').value = universe.characters.nic.name;
            $('universe-nic-role-input').value = universe.characters.nic.role;
            $('universe-zoya-name-input').value = universe.characters.zoya.name;
            $('universe-zoya-role-input').value = universe.characters.zoya.role;
        }
    } else {
        titleEl.textContent = 'Create New Universe';
        $('universe-id-input').readOnly = false;
    }
    modal.classList.add('active');
}

async function saveUniverse() {
    const id = $('universe-id-input').value;
    const isEditing = ALTERNATE_UNIVERSES.some(u => u.id === id);
    
    const universeData = {
        id: id || `universe_${new Date().getTime()}`,
        title: $('universe-title-input').value,
        era: $('universe-era-input').value,
        icon: $('universe-icon-input').value,
        image: $('universe-image-input').value,
        theme: $('universe-title-input').value.split(' ')[0].toLowerCase(), // Auto-generate theme
        premise: $('universe-premise-input').value,
        characters: {
            nic: { name: $('universe-nic-name-input').value, role: $('universe-nic-role-input').value },
            zoya: { name: $('universe-zoya-name-input').value, role: $('universe-zoya-role-input').value }
        },
        // Preserve chapters and stats if editing
        chapters: isEditing ? ALTERNATE_UNIVERSES.find(u => u.id === id).chapters : [],
        stats: isEditing ? ALTERNATE_UNIVERSES.find(u => u.id === id).stats : { chapters: 0, words: 0, lastUpdated: 'Just now' }
    };
    
    // Update stats for lastUpdated
    universeData.stats.lastUpdated = 'Just now';
    
    let savedItem;
    if (isEditing) {
        savedItem = await apiUpdateItem('universes', id, universeData);
    } else {
        savedItem = await apiAddItem('universes', universeData);
    }

    if (savedItem) {
        $('universe-editor-modal').classList.remove('active');
        renderUniverseGrid(); // Re-render the grid
    }
}

async function deleteUniverse(universeId) {
    if (confirm('Are you sure you want to delete this universe? This cannot be undone.')) {
        const success = await apiDeleteItem('universes', universeId);
        if (success) {
            renderUniverseGrid(); // Re-render the grid
        }
    }
}

function initPortalAnimation() {
    const canvas = $('portal-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // ... (Add your particle animation logic here if you have one) ...
    // Placeholder:
    ctx.fillStyle = 'rgba(255, 215, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleUniverseClicks(e) {
    const target = e.target;
    const closest = (selector) => target.closest(selector);

    if (closest('.edit-btn')) {
        e.stopPropagation();
        openUniverseEditor(closest('.universe-card-controls').dataset.id);
    }
    else if (closest('.delete-btn')) {
        e.stopPropagation();
        deleteUniverse(closest('.universe-card-controls').dataset.id);
    }
    else if (closest('.read-story-btn')) {
        e.stopPropagation();
        openUniverse(closest('.read-story-btn').dataset.id);
    }
    else if (closest('.universe-card')) {
        openUniverse(closest('.universe-card').dataset.id);
    }
    else if (closest('#create-universe-btn')) {
        openUniverseEditor();
    }
    else if (closest('#filter-all-btn')) {
        renderUniverseGrid('all');
    }
    else if (closest('#filter-written-btn')) {
        renderUniverseGrid('written');
    }
    else if (closest('#filter-unwritten-btn')) {
        renderUniverseGrid('unwritten');
    }
    // --- NEW: Handle chapter actions within the reading view ---
    else if (closest('[data-action="edit-chapter"]')) {
        const universeId = closest('[data-action="edit-chapter"]').dataset.universeId;
        const chapterIndex = parseInt(closest('[data-action="edit-chapter"]').dataset.chapterIndex, 10);
        window.openUniverseEditor(universeId, chapterIndex);
    }
    else if (closest('[data-action="add-chapter"]')) {
        const universeId = closest('[data-action="add-chapter"]').dataset.universeId;
        window.openUniverseEditor(universeId, -1); // -1 signifies a new chapter
    }
}

// --- Public Module Functions ---

/**
 * Renders the Universe panel into the main content area.
 * @param {HTMLElement} mainContent - The element to render content into.
 */
export function render(mainContent) {
    panelContainer = mainContent;
    panelContainer.innerHTML = getUniversePanelHTML();
    
    renderUniverseGrid('all');
    initPortalAnimation();
    
    // Add panel-specific event listener
    panelContainer.addEventListener('click', handleUniverseClicks);
    
    // Add modal listeners (since they are in index.html, we can query for them)
    $('universe-editor-modal').querySelector('.modal-actions .btn.primary').onclick = saveUniverse;
    $('universe-editor-modal').querySelector('.modal-actions .btn').onclick = () => $('universe-editor-modal').classList.remove('active');

    // Expose functions to the window so they can be called from other modules/scripts
    window.openUniverse = openUniverse;

}

/**
 * Cleans up intervals and event listeners when the panel is unloaded.
 */
export function cleanup() {
    if (panelContainer) {
        panelContainer.removeEventListener('click', handleUniverseClicks);
    }
    
    // Clean up modal listeners if they were attached
    const saveBtn = $('universe-editor-modal').querySelector('.modal-actions .btn.primary');
    if (saveBtn) saveBtn.onclick = null;
    const cancelBtn = $('universe-editor-modal').querySelector('.modal-actions .btn');
    if (cancelBtn) cancelBtn.onclick = null;

    panelContainer = null;
}
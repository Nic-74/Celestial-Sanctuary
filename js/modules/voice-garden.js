// ===================================================================
//  MODULE: VOICE GARDEN (js/modules/voicegarden.js)
// ===================================================================

import { $, $$, formatTime } from '../common.js';

// --- Local State ---
let panelContainer = null;
let voicePlayer = null; // Our single audio player instance
let currentMsg = null;

const FLOWER_LIBRARY = {
    rose: { emoji: '🌹', color: '#FF1744', meaning: 'Romantic, loving messages' },
    sunflower: { emoji: '🌻', color: '#FFD700', meaning: 'Happy, cheerful messages' },
    lily: { emoji: '🌸', color: '#FFB6C1', meaning: 'Sweet, tender messages' },
    forgetMeNot: { emoji: '💙', color: '#4169E1', meaning: 'Missing you messages' },
    lavender: { emoji: '💜', color: '#9370DB', meaning: 'Peaceful, calming messages' },
    daisy: { emoji: '🌼', color: '#FFFFFF', meaning: 'Playful, fun messages' },
};

// This data will be populated from EDITABLE_CONFIG or server
let voiceMessages = [];
let currentFilter = 'all';

// --- HTML Template ---

function getVoiceGardenHTML() {
    return `
    <div id="voice-garden-panel" class="content-panel active">
        <h2 class="panel-header">🌸 Voice Message Garden 🎤</h2>
        <p class="panel-subheader">"Where words bloom into memories"</p>

        <div class="voice-garden-container">
            <div class="garden-stats-bar">
                <div class="garden-stat">
                    <div id="vg-total-flowers" class="stat-value">0</div>
                    <div class="stat-desc">Total Flowers</div>
                </div>
                <div class="garden-stat">
                    <div id="vg-filter-count" class="stat-value">0</div>
                    <div class="stat-desc">Matching Filter</div>
                </div>
                <div class="garden-stat">
                    <div id="vg-garden-age" class="stat-value">0d</div>
                    <div class="stat-desc">Garden Age</div>
                </div>
                <div class="garden-stat garden-filters">
                    <div class="stat-desc">Show:</div>
                    <div class="filter-buttons">
                        <button id="vg-filter-all" class="vg-filter active">All</button>
                        <button id="vg-filter-en" class="vg-filter">English</button>
                        <button id="vg-filter-zh" class="vg-filter">Chinese</button>
                    </div>
                </div>
            </div>

            <div class="garden-view" id="garden-view">
                <div class="garden-ground"></div>
                </div>
        </div>
    </div>
    `;
    // The playback modal is already in index.html, so we don't need to return it here
}

// --- Module-Specific Logic ---

function loadVoiceMessages() {
    // This mock data is based on your control.js. 
    // In a real scenario, this would come from EDITABLE_CONFIG.SONGS_DATA or a dedicated API endpoint.
    // For now, we'll hardcode the relevant files.
    const allVoiceMessages = [
        { id: 'vm_004', from: 'Zoya', to: 'Nic', audioFile: 'recordings/Zoyareadletter.m4a', duration: 35, flower: { type: 'rose', position: { x: 35, y: 25 } }, textNote: 'To my Baobei...', recordedDate: '2024-05-22T10:00:00Z', transcript: "To my Baobei, you used to be the light, the hope, the future, the strands in my life after I made you, my sky became clear and bright. I wanted so much to tell you outw. Hey, you're too late, and it's so good to meet you. because if you I decided to love deeply without reservation for only once at that time I thought I have countless features with you, so I began to plan our futuring detail. I believe that people will love each other in this world can go to the end. I thought you love as much as I did and you were as brave as I was and appreciated as much as I did. I you sllept. Oh, you finished?", lang: 'en' },
        { id: 'vm_005', from: 'Nini', to: 'Zoya', audioFile: 'recordings/3rd_anniversary.m4a', duration: null, flower: { type: 'lily', position: { x: 60, y: 50 } }, textNote: '3rd anniversary message (Chinese)', recordedDate: '2025-10-26T12:00:00Z', lang: 'zh' },
        { id: 'vm_006', from: 'Zoya', to: 'Nic', audioFile: 'recordings/Zoy_sings.m4a', duration: null, flower: { type: 'daisy', position: { x: 70, y: 30 } }, textNote: '', recordedDate: '2025-10-26T13:00:00Z', lang: 'en' },
        { id: 'vm_007', from: 'Zoya', to: 'Nic', audioFile: 'recordings/The most precios tear.m4a', duration: null, flower: { type: 'lily', position: { x: 25, y: 55 } }, textNote: 'A bedtime story', recordedDate: '2025-10-27T14:00:00Z', transcript: `Actually, I just feel like it's interesting. Can you tell me one more? I should tell you a boring one so that I can feel sleepy. Tell me one more, please... (transcript)... Thank you. You got the story? Of course. Even though it was a little bit long, but I got it. You want me to tell you what you said? Yeah.`, lang: 'zh' },
        { id: 'vm_008', from: 'Zoya', to: 'Nic', audioFile: 'recordings/Zoya sings again.m4a', duration: null, flower: { type: 'daisy', position: { x: 55, y: 40 } }, textNote: 'Another song for you', recordedDate: '2025-10-28T15:00:00Z', lang: 'en' },
    ];

    // Filter only files from the 'recordings/' path
    voiceMessages = allVoiceMessages.filter(m => m.audioFile && m.audioFile.startsWith('recordings/'));
}

function updateStats() {
    $('vg-total-flowers').textContent = voiceMessages.length;
    
    const getFiltered = () => voiceMessages.filter(m => {
        if (currentFilter === 'all') return true;
        return m.lang === currentFilter;
    });
    
    const filtered = getFiltered();
    if ($('vg-filter-count')) $('vg-filter-count').textContent = filtered.length;
    
    const firstMessageDate = voiceMessages.length ? new Date(voiceMessages.reduce((min, p) => p.recordedDate < min ? p.recordedDate : min, voiceMessages[0].recordedDate)) : new Date();
    const gardenAgeDays = Math.floor((new Date() - firstMessageDate) / (1000 * 60 * 60 * 24));
    $('vg-garden-age').textContent = `${gardenAgeDays}d`;
}

function renderFlowers() {
    const gardenView = $('garden-view');
    if (!gardenView) return;
    
    // Clear old flowers
    gardenView.querySelectorAll('.garden-flower').forEach(el => el.remove());

    const getFiltered = () => voiceMessages.filter(m => {
        if (currentFilter === 'all') return true;
        return m.lang === currentFilter;
    });
    
    const filtered = getFiltered();
    filtered.forEach(msg => {
        const flowerData = FLOWER_LIBRARY[msg.flower.type] || { emoji: '🌸', color: '#fff', meaning: 'Message' };
        const flowerEl = document.createElement('div');
        flowerEl.className = 'garden-flower';
        if (!msg.seen) flowerEl.classList.add('flower-unheard');
        flowerEl.style.left = `${msg.flower.position.x}%`;
        flowerEl.style.bottom = `${msg.flower.position.y}%`;
        flowerEl.innerHTML = `
            <div class="flower-icon" style="color: ${flowerData.color}; font-size: 1.6rem;">${flowerData.emoji}</div>
            <div class="flower-stem"></div>
        `;
        
        const derivedNote = (!msg.textNote || msg.textNote.trim() === '') ? deriveNoteFromAudioFile(msg.audioFile) : msg.textNote;
        flowerEl.title = `${flowerData.meaning}\nFrom: ${msg.from} (${msg.lang || 'unknown'})${derivedNote ? '\nNote: ' + derivedNote : ''}`;

        // Add badges
        const favs = loadFavs();
        const emojis = loadEmojis();
        if (favs[msg.id]) {
            const favBadge = document.createElement('div');
            favBadge.className = 'vg-badge vg-fav-badge';
            favBadge.textContent = '★';
            favBadge.title = 'Favorited';
            favBadge.style.cssText = 'position: absolute; top: 6px; right: 8px; font-size: 0.9rem;';
            flowerEl.appendChild(favBadge);
        }
        if (emojis[msg.id]) {
            const emojiBadge = document.createElement('div');
            emojiBadge.className = 'vg-badge vg-emoji-badge';
            emojiBadge.textContent = emojis[msg.id];
            emojiBadge.title = 'Reaction';
            emojiBadge.style.cssText = 'position: absolute; bottom: 8px; right: 8px; font-size: 1rem;';
            flowerEl.appendChild(emojiBadge);
        }

        flowerEl.addEventListener('click', () => openPlaybackModal(msg));
        gardenView.appendChild(flowerEl);
    });
    
    updateStats();
}

function setFilter(filter) {
    currentFilter = filter;
    ['vg-filter-all','vg-filter-en','vg-filter-zh'].forEach(id => { const b = $(id); if (b) b.classList.remove('active'); });
    const map = { all: 'vg-filter-all', en: 'vg-filter-en', zh: 'vg-filter-zh' };
    const btn = $(map[filter]); if (btn) btn.classList.add('active');
    renderFlowers();
}

function openPlaybackModal(msg) {
    currentMsg = msg;
    const modal = $('voice-playback-modal');
    if (!modal) return;
    
    // Populate modal content
    $('playback-title').textContent = FLOWER_LIBRARY[msg.flower.type]?.meaning || 'Message';
    $('playback-from').textContent = msg.from;
    $('playback-date').textContent = new Date(msg.recordedDate).toLocaleString();
    
    const noteEl = $('playback-note');
    const derivedNote = (!msg.textNote || msg.textNote.trim() === '') ? deriveNoteFromAudioFile(msg.audioFile) : msg.textNote;
    noteEl.textContent = derivedNote || '';
    
    // Handle transcript
    const transcriptBtn = $('playback-transcript-btn');
    const existingTranscript = document.getElementById('playback-transcript');
    if (existingTranscript) existingTranscript.remove();
    
    if (msg.transcript) {
        transcriptBtn.style.display = 'inline-block';
        transcriptBtn.textContent = 'Show Transcript';
        
        const transcriptEl = document.createElement('div');
        transcriptEl.id = 'playback-transcript';
        transcriptEl.style.cssText = `
            margin-top: 0.75rem; color: var(--text-secondary); font-size: 0.95rem; 
            max-height: 320px; overflow-y: auto; padding: 0.6rem; 
            border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; 
            display: none;
        `;
        transcriptEl.innerHTML = `<strong>Transcript:</strong><pre style="white-space: pre-wrap; font-family: inherit; font-size: 0.95rem; margin-top:6px;">${escapeHtml(msg.transcript)}</pre>`;
        
        // Find the right place to insert it
        const metadata = modal.querySelector('.playback-metadata');
        if (metadata) metadata.parentElement.appendChild(transcriptEl);
        
        transcriptBtn.onclick = (ev) => {
            ev.stopPropagation();
            const el = document.getElementById('playback-transcript');
            if (!el) return;
            const isHidden = el.style.display === 'none' || !el.style.display;
            el.style.display = isHidden ? 'block' : 'none';
            transcriptBtn.textContent = isHidden ? 'Hide Transcript' : 'Show Transcript';
        };
    } else {
        transcriptBtn.style.display = 'none';
    }

    // Update button states
    updateLikeFavButtons(msg.id);
    
    // Load and play audio
    if (voicePlayer.src && !voicePlayer.src.endsWith(msg.audioFile)) {
        voicePlayer.pause();
    }
    voicePlayer.src = msg.audioFile;
    voicePlayer.load();
    
    // Reset UI
    $('playback-progress-fill').style.width = '0%';
    $('playback-current-time').textContent = '0:00';
    $('playback-total-duration').textContent = '0:00';
    
    voicePlayer.play().then(() => {
        $('playback-play-pause-btn').textContent = '⏸️';
    }).catch(() => {
        $('playback-play-pause-btn').textContent = '▶️';
    });
    
    modal.classList.add('active');
}

function updateLikeFavButtons(msgId) {
    const favs = loadFavs();
    const emojis = loadEmojis();
    const isFav = !!favs[msgId];
    const emoji = emojis[msgId];
    
    const favBtnEl = $('playback-fav-btn');
    const likeBtnEl = $('playback-like-btn');
    
    if (favBtnEl) favBtnEl.textContent = (isFav ? '★ Favorited' : '☆ Favorite');
    if (likeBtnEl) likeBtnEl.textContent = (emoji ? (emoji + ' Like') : '👍 Like');
}

function initAudioPlayer() {
    if (voicePlayer) return; // Already initialized
    
    voicePlayer = new Audio();
    voicePlayer.preload = 'metadata';
    
    const playBtn = $('playback-play-pause-btn');
    const rewindBtn = $('playback-rewind-btn');
    const forwardBtn = $('playback-forward-btn');
    const progressBar = $('playback-progress-bar');
    const currentTimeEl = $('playback-current-time');
    const totalTimeEl = $('playback-total-duration');
    const progressFill = $('playback-progress-fill');

    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!voicePlayer.src) return;
        if (voicePlayer.paused) {
            voicePlayer.play().catch(err => console.error('Playback error', err));
        } else {
            voicePlayer.pause();
        }
    });
    
    voicePlayer.onplay = () => playBtn.textContent = '⏸️';
    voicePlayer.onpause = () => playBtn.textContent = '▶️';

    rewindBtn.addEventListener('click', (e) => { e.stopPropagation(); if (voicePlayer.src) voicePlayer.currentTime = Math.max(0, voicePlayer.currentTime - 10); });
    forwardBtn.addEventListener('click', (e) => { e.stopPropagation(); if (voicePlayer.src) voicePlayer.currentTime = Math.min(voicePlayer.duration || 0, voicePlayer.currentTime + 10); });

    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const pct = clickX / rect.width;
        if (voicePlayer.duration) voicePlayer.currentTime = pct * voicePlayer.duration;
    });

    voicePlayer.addEventListener('timeupdate', () => {
        const dur = voicePlayer.duration || 0;
        const cur = voicePlayer.currentTime || 0;
        const pct = dur ? (cur / dur) * 100 : 0;
        if (progressFill) progressFill.style.width = pct + '%';
        if (currentTimeEl) currentTimeEl.textContent = formatTime(cur);
    });

    voicePlayer.addEventListener('loadedmetadata', () => {
        const dur = voicePlayer.duration || 0;
        if (totalTimeEl) totalTimeEl.textContent = formatTime(dur);
    });

    voicePlayer.addEventListener('ended', () => {
        if (currentMsg) currentMsg.seen = true;
        renderFlowers(); // Re-render to remove 'unheard' glow
    });

    $('playback-close-btn').addEventListener('click', () => {
        $('voice-playback-modal').classList.remove('active');
        voicePlayer.pause();
        currentMsg = null;
    });
    
    // Init like/fav/delete
    initLikeAndFavControls();
}

// --- LocalStorage Helpers ---
const VG_FAVS_KEY = 'vg_favs_v1';
const VG_EMOJIS_KEY = 'vg_emojis_v1';
function loadFavs() { try { return JSON.parse(localStorage.getItem(VG_FAVS_KEY) || '{}'); } catch(e) { return {}; } }
function saveFavs(obj) { try { localStorage.setItem(VG_FAVS_KEY, JSON.stringify(obj)); } catch(e) {} }
function loadEmojis() { try { return JSON.parse(localStorage.getItem(VG_EMOJIS_KEY) || '{}'); } catch(e) { return {}; } }
function saveEmojis(obj) { try { localStorage.setItem(VG_EMOJIS_KEY, JSON.stringify(obj)); } catch(e) {} }

const EMOJI_SET = ['👍','❤️','⭐','🔥','🌸','🎵'];

function initLikeAndFavControls() {
    const likeBtn = $('playback-like-btn');
    const favBtn = $('playback-fav-btn');
    const deleteBtn = $('playback-delete-btn');

    likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!currentMsg) return;
        const emojis = loadEmojis();
        const cur = emojis[currentMsg.id] || null;
        const idx = cur ? (EMOJI_SET.indexOf(cur) + 1) : 0; // Cycle or start at first
        const next = idx >= EMOJI_SET.length ? null : EMOJI_SET[idx]; // If at end, cycle back to null (no emoji)
        
        if (next) {
            emojis[currentMsg.id] = next;
            likeBtn.textContent = next + ' Like';
        } else {
            delete emojis[currentMsg.id];
            likeBtn.textContent = '👍 Like';
        }
        
        saveEmojis(emojis);
        renderFlowers();
    });

    favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!currentMsg) return;
        const favs = loadFavs();
        const isFav = !!favs[currentMsg.id];
        if (isFav) delete favs[currentMsg.id]; else favs[currentMsg.id] = true;
        saveFavs(favs);
        favBtn.textContent = (isFav ? '☆ Favorite' : '★ Favorited');
        renderFlowers();
    });

    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!currentMsg) return;
        if (!confirm("Are you sure you want to delete this voice message?")) return;
        
        // Remove from local array
        voiceMessages = voiceMessages.filter(v => v.id !== currentMsg.id);
        
        // Remove from persistence
        const favs = loadFavs();
        const emojis = loadEmojis();
        delete favs[currentMsg.id];
        delete emojis[currentMsg.id];
        saveFavs(favs);
        saveEmojis(emojis);
        
        // Close modal and re-render
        $('voice-playback-modal').classList.remove('active');
        voicePlayer.pause();
        currentMsg = null;
        renderFlowers();
    });
}

// --- Utility Helpers ---
function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[s]);
}

function deriveNoteFromAudioFile(path) {
    if (!path) return '';
    const name = path.split('/').pop().replace(/\.[^/.]+$/, '');
    const pretty = name.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
    return pretty.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// --- Public Module Functions ---

/**
 * Renders the Voice Garden panel into the main content area.
 * @param {HTMLElement} mainContent - The element to render content into.
 */
export function render(mainContent) {
    panelContainer = mainContent;
    panelContainer.innerHTML = getVoiceGardenHTML();
    
    loadVoiceMessages();
    initAudioPlayer();
    
    // Add filter listeners
    $('vg-filter-all').addEventListener('click', () => setFilter('all'));
    $('vg-filter-en').addEventListener('click', () => setFilter('en'));
    $('vg-filter-zh').addEventListener('click', () => setFilter('zh'));
    
    // Initial render
    setFilter('all');
}

/**
 * Cleans up intervals and event listeners when the panel is unloaded.
 */
export function cleanup() {
    if (voicePlayer) {
        voicePlayer.pause();
        voicePlayer.src = ''; // Clear source
    }
    
    // Remove listeners attached to elements outside this panel
    // (Note: listeners on elements *inside* panelContainer are auto-removed when innerHTML is cleared)
    
    currentMsg = null;
    panelContainer = null;
    voiceMessages = [];
}
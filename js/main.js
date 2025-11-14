// =****************************************************************==
//  MAIN APPLICATION BOOTSTRAP (js/main.js) - CORRECTED & ORGANIZED
// ===================================================================
// This file is the "brain" of the app. It imports shared resources
// and acts as a router to load different panels on demand.
// ===================================================================

import {
    $, $$, DOM, AppState, EDITABLE_CONFIG, CHRONICLE_DATA, ALTERNATE_UNIVERSES, GUIDE_RIDDLES, COMPLIMENTS, personalizedContent,
    API_URL, loadDataFromServer, apiAddItem, apiUpdateItem, apiDeleteItem, THEME_COLORS, THEME_STAR_SHAPES,
    formatTime, closeMenu, applyTheme, applyRandomMixTheme, createThemeButton, loadSavedTheme, initThemeSystem,
    getMoodFromState, mapMoodToPanel, showMoodLoadingAndRedirect, evaluateMoodAndRedirect,
    findImageWithExtension, openUniverseEditor,
    // Import the global modal controllers
    handleBookPasswordAttempt, openNewChapterMeta, handleContinueMeta, openEditor, saveChapter,
    openLightbox, updateLightboxContent, changeLightboxImage
} from './common.js';

// --- Global State for Panel Management ---
let currentPanelModule = null; // To store the currently loaded module for cleanup
// Make this global so modules can access it
window.currentPanelModule = null; 

// ===================================================================
//  PRIMARY INITIALIZATION
// ===================================================================

/**
 * Main entry point for the application.
 * Fired when the DOM is fully loaded.
 */
async function initApp() {
    // Initialize AppState properties that might be used globally
    AppState.landingAudioPlayer = null;

    // 1. Load all dynamic data from the server
    await loadDataFromServer();
    
    // 2. Handle page reloads
    const navigationType = performance.getEntriesByType("navigation")[0].type;
    if (navigationType === 'reload') {
        sessionStorage.removeItem('enteredFromGate');
    }

    // --- FIX: Check session storage to see if book was already unlocked ---
    if (sessionStorage.getItem('bookUnlocked') === 'true') {
        AppState.bookUnlocked = true;
    }

    // 3. Initialize global components
    initQuill();
    addEventListeners();
    initLandingPage();
    initMoodPickers();
    initThemeSystem(); // Initialize the theme system

    // 4. Set up navigation
    window.addEventListener('hashchange', handleHashChange, false);
    
    // 5. Check if we are already in the sanctuary
    if (sessionStorage.getItem('enteredFromGate') === 'true') {
        enterSanctuary(true); // Pass 'true' to skip animation
    }

    // 6. Add scroll listener for the 'scroll to top' button
    const mainContent = DOM.mainContent;
    const scrollToTopBtn = DOM.scrollToTopBtn;
    mainContent.addEventListener('scroll', () => {
        if (mainContent.scrollTop > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    scrollToTopBtn.addEventListener('click', () => {
        mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 7. Make key functions globally accessible for HTML onclick attributes
    window.closeMenu = closeMenu;
    window.applyTheme = applyTheme;
    // Expose API functions that modules might need
    window.apiDeleteItem = apiDeleteItem;
    window.apiAddItem = apiAddItem;
    window.apiUpdateItem = apiUpdateItem;
    // Expose other global helpers
    window.findImageWithExtension = findImageWithExtension;
    // Expose editor modal functions
    window.openLightbox = openLightbox;
    window.openEditor = openEditor;
    window.openNewChapterMeta = openNewChapterMeta;
    window.openUniverseEditor = openUniverseEditor; // Expose the new editor function
}

function closeGame() {
    const modal = $('game-play-modal');
    if (modal) modal.style.display = 'none';
}

// ===================================================================
//  CORE ROUTER & PANEL LOADING
// ===================================================================

function handleHashChange() {
    if (sessionStorage.getItem('enteredFromGate') !== 'true') {
        if(window.location.hash) {
            sessionStorage.setItem('pendingHash', window.location.hash);
        }
        return;
    }
    let panelId = window.location.hash.substring(1) || 'home';
    if (panelId === 'observatory-direct') {
        panelId = 'guide'; 
    }
    if (panelId === 'book') {
        panelId = 'tome'; // Correctly map 'book' hash to 'tome' module
    }
    loadPanel(panelId);
}

async function loadPanel(panelId) {
    if (currentPanelModule && typeof currentPanelModule.cleanup === 'function') {
        currentPanelModule.cleanup();
    }
    currentPanelModule = null;
    window.currentPanelModule = null; 
    // Clear global functions that are module-specific
    if (window.initObservatory) window.initObservatory = undefined;
    
    DOM.mainContent.innerHTML = ''; 

    if (panelId === 'home' || panelId === '') {
        AppState.activePanel = 'home';
        DOM.mainContent.classList.remove('visible');
        if (AppState.solarHideTimeout) { clearTimeout(AppState.solarHideTimeout); }
        if(DOM.solarSystemContainer) {
            DOM.solarSystemContainer.style.display = 'flex';
            DOM.solarSystemContainer.classList.remove('hidden');
        }
        DOM.mainContent.style.backgroundColor = '';
        DOM.mainContent.style.padding = '100px 7vw 50px 7vw';
        
        if (AppState.complimentInterval) { clearInterval(AppState.complimentInterval); }
        AppState.complimentInterval = setInterval(createFloatingCompliment, 7000);
        return;
    }

    if (AppState.complimentInterval) { clearInterval(AppState.complimentInterval); AppState.complimentInterval = null; }
    
    DOM.mainContent.classList.add('visible');
    if(DOM.solarSystemContainer) DOM.solarSystemContainer.classList.add('hidden');
    if (AppState.solarHideTimeout) { clearTimeout(AppState.solarHideTimeout); }
    AppState.solarHideTimeout = setTimeout(() => {
        if(DOM.solarSystemContainer) DOM.solarSystemContainer.style.display = 'none';
    }, 420);

    DOM.mainContent.classList.remove('nebula-active', 'observatory-active');
    DOM.mainContent.style.backgroundColor = '';
    DOM.mainContent.style.padding = '100px 7vw 50px 7vw';

    try {
        const [cssModule, jsModule] = await Promise.all([
            loadCssModule(panelId),
            import(`./modules/${panelId}.js`)
        ]);

        if (jsModule && typeof jsModule.render === 'function') {
            AppState.activePanel = panelId;
            jsModule.render(DOM.mainContent); // Pass the container to the module
            currentPanelModule = jsModule; // Store for cleanup
            window.currentPanelModule = jsModule; // Expose to common.js
            
            // *** ADDED: Expose module functions to window if they exist ***
            if (panelId === 'guide' && typeof jsModule.initObservatory === 'function') {
                window.initObservatory = jsModule.initObservatory;
            }
            // Expose universe-specific functions
            if (panelId === 'universes' && typeof jsModule.openUniverse === 'function') {
                window.openUniverse = jsModule.openUniverse;
            }
            
            DOM.mainContent.scrollTop = 0;
        } else {
            throw new Error(`Module ${panelId}.js did not export a 'render' function.`);
        }

    } catch (error) {
        console.error(`Failed to load panel '${panelId}':`, error);
        DOM.mainContent.innerHTML = `<h2 class="panel-header">Error</h2><p class="panel-subheader">Could not load module: ${panelId}.js. ${error.message}</p>`;
    }
}

function loadCssModule(panelId) {
    return new Promise((resolve, reject) => {
        const cssId = `css-module-${panelId}`;
        if (document.getElementById(cssId)) {
            resolve();
            return;
        }
        const link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.href = `css/modules/${panelId}.css`;
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`Failed to load css/modules/${panelId}.css`));
        document.head.appendChild(link);
    });
}


// ===================================================================
//  GLOBAL INITIALIZATION LOGIC
// ===================================================================

function initLandingPage() {
    // --- MODIFIED: Two-click entry logic ---
    // The first click starts the audio, the second enters the sanctuary.
    const handleLandingGateClick = () => {
        // 1. On the first click, start the audio.
        if (!AppState.landingAudioStarted) {
            // Initialize and play the audio if it doesn't exist.
            if (!AppState.landingAudioPlayer) {
                // This block should ideally not be hit if pre-loading works, but is a good fallback.
                AppState.landingAudioPlayer = new Audio('music/landing.mp3'); 
                AppState.landingAudioPlayer.loop = false; // Ensure audio does not loop
            }
            AppState.landingAudioPlayer.play().catch(e => console.error("Landing audio playback failed:", e));
            AppState.landingAudioStarted = true; // Set the flag

            // Optional: Add a class to provide visual feedback
            DOM.landingGate.classList.add('audio-playing');

            // Add listener for when the audio finishes
            AppState.landingAudioPlayer.addEventListener('ended', () => {
                // Check if we haven't already entered the sanctuary
                if (sessionStorage.getItem('enteredFromGate') !== 'true') {
                    enterSanctuary(false);
                }
            }, { once: true }); // Use { once: true } to ensure it only fires once
        } else {
            // 2. On the second click, enter the sanctuary.
            enterSanctuary(false);
        }
    };

    DOM.landingGate.addEventListener('click', handleLandingGateClick);
    const heartPortal = $('heart-portal');
    if (heartPortal) {
        heartPortal.addEventListener('click', (e) => e.stopPropagation());
    }
    let savedTheme = localStorage.getItem('selectedTheme') || 'mystical';
    if (!THEME_COLORS[savedTheme]) savedTheme = 'mystical';
    applyThemeToLanding(savedTheme);
    initWebBackground('web-canvas-landing', THEME_COLORS[savedTheme]);
    initSpiralAnimation('spiral-canvas-landing', { intensity: 'subtle' });
    
    // --- MODIFIED: Prepare Landing Page Audio ---
    if (sessionStorage.getItem('enteredFromGate') !== 'true' && !window.location.hash) {
        // Pre-load the audio object, but don't play it yet.
        AppState.landingAudioPlayer = new Audio('music/landing.mp3');
        AppState.landingAudioPlayer.loop = false; // Audio should only play once
    }
}

function enterSanctuary(skipAnimation = false) {
    sessionStorage.setItem('enteredFromGate', 'true');
    DOM.celestialSanctuary.style.display = 'block';
    
    if (skipAnimation) {
        // Stop landing page music if it's playing
        if (AppState.landingAudioPlayer) {
            AppState.landingAudioPlayer.pause();
            AppState.landingAudioPlayer.currentTime = 0;
        }
        DOM.landingGate.style.display = 'none';
        DOM.celestialSanctuary.style.opacity = '1';
    } else {
        DOM.celestialSanctuary.style.opacity = '0';
        void DOM.celestialSanctuary.offsetHeight;
        DOM.landingGate.style.transition = 'opacity 0.6s ease-out';
        DOM.celestialSanctuary.style.transition = 'opacity 0.6s ease-in';
        DOM.landingGate.style.opacity = '0';
        // Stop landing page music before the sanctuary becomes visible
        if (AppState.landingAudioPlayer) {
            AppState.landingAudioPlayer.pause();
            AppState.landingAudioPlayer.currentTime = 0;
        }
        DOM.celestialSanctuary.style.opacity = '1';
        setTimeout(() => {
            DOM.landingGate.style.display = 'none';
        }, 650);
    }
    
    initSanctuary();
    
    const pendingHash = sessionStorage.getItem('pendingHash');
    if (pendingHash) {
        window.location.hash = pendingHash;
        sessionStorage.removeItem('pendingHash');
    }
    handleHashChange();
}

function initSanctuary() {
    renderSolarSystemNav();
    initMusicPlayer();
    
    let savedTheme = localStorage.getItem('selectedTheme') || 'mystical';
    if (!THEME_COLORS[savedTheme]) savedTheme = 'mystical';
    initMainParticles(savedTheme);
    initWebBackground('web-canvas-main', THEME_COLORS[savedTheme]);
    initSpiralAnimation('spiral-canvas-main', { intensity: 'moderate' });
    
    // Re-initialize parallax for the main sanctuary view
    initializeParallax();

    addSanctuaryEventListeners();
    evaluateMoodAndRedirect();

    const moodBar = document.getElementById('mood-sync-bar');
    if (moodBar) {
        moodBar.classList.add('collapsed');
    }
}

/**
 * Adds event listeners for GLOBAL components (modals, main menu).
 * These functions are imported from common.js
 */
function addEventListeners() {
    // Book Password
    DOM.unlockBookBtn.addEventListener('click', handleBookPasswordAttempt);
    DOM.bookPasswordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleBookPasswordAttempt();
        }
    });
    DOM.bookPasswordGate.addEventListener('click', (e) => {
        if (e.target === DOM.bookPasswordGate) {
            DOM.bookPasswordGate.classList.remove('active');
            window.location.hash = 'home';
        }
    });

    // Chapter Editor
    $('continue-meta-btn').addEventListener('click', handleContinueMeta);
    $('cancel-meta-btn').addEventListener('click', () => DOM.chapterMetaModal.classList.remove('active'));
    DOM.saveEditBtn.addEventListener('click', saveChapter);
    DOM.cancelEditBtn.addEventListener('click', () => DOM.editorModal.classList.remove('active'));

    // Lightbox
    DOM.lightbox.addEventListener('click', (e) => {
        if (e.target === DOM.lightbox || e.target.classList.contains('lightbox-close')) {
            DOM.lightbox.classList.remove('active');
        }
    });
    DOM.lightboxNext.addEventListener('click', () => changeLightboxImage(1));
    DOM.lightboxPrev.addEventListener('click', () => changeLightboxImage(-1));

    // Mood Bar Toggle
    const moodBar = document.getElementById('mood-sync-bar');
    const visibilityToggle = document.getElementById('mood-sync-visibility-toggle');
    if (moodBar && visibilityToggle) {
       // This listener is now simplified, CSS handles the arrow rotation
       visibilityToggle.addEventListener('click', () => {
            moodBar.classList.toggle('collapsed');
       });
    }

    // Music player sun expand
    document.addEventListener('click', (e) => {
        const musicPlayerSun = $('music-player-sun');
        if (musicPlayerSun && !musicPlayerSun.contains(e.target) && musicPlayerSun.classList.contains('expanded')) {
            musicPlayerSun.classList.remove('expanded');
        }
    });
    
    // Save music state on exit
    window.addEventListener('beforeunload', () => {
        if (AppState.music.player && AppState.music.player.src) {
            const musicState = {
                currentIndex: AppState.music.currentIndex,
                currentTime: AppState.music.player.currentTime,
                isPlaying: !AppState.music.player.paused,
                isShuffled: AppState.music.isShuffled,
                volume: AppState.music.player.volume
            };
            sessionStorage.setItem('musicPlayerState', JSON.stringify(musicState));
            sessionStorage.setItem('songsData', JSON.stringify(EDITABLE_CONFIG.SONGS_DATA));
        }
        if (AppState.music.albumArtInterval) {
            clearInterval(AppState.music.albumArtInterval);
        }
    });

    // Resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            let savedThemeName = localStorage.getItem('selectedTheme') || 'mystical';
            if (!THEME_COLORS[savedThemeName]) savedThemeName = 'mystical';
            const theme = THEME_COLORS[savedThemeName];
            
            applyThemeToLanding(savedThemeName);
            initMainParticles(savedThemeName);
            initWebBackground('web-canvas-landing', theme);
            initWebBackground('web-canvas-main', theme);
            try { initSpiralAnimation('spiral-canvas-landing', { intensity: 'subtle' }); } catch(e) {}
            try { initSpiralAnimation('spiral-canvas-main', { intensity: 'moderate' }); } catch(e) {}
            if (typeof renderSolarSystemNav === 'function') {
                renderSolarSystemNav();
            }
        }, 250);
    });
}

function addSanctuaryEventListeners() {
     const menuButton = document.getElementById('main-menu-button');
     const menuDropdown = document.getElementById('main-menu-dropdown');
     const menuIcon = document.getElementById('menu-icon-img');

     if(menuButton && menuDropdown && menuIcon) {
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = menuDropdown.classList.contains('visible');
            if (isVisible) {
                closeMenu();
                return;
            }
            
            const containerRect = menuButton.parentElement.getBoundingClientRect();
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            menuDropdown.classList.add('measuring');
            const dropdownRect = menuDropdown.getBoundingClientRect();
            menuDropdown.classList.remove('measuring');
            menuDropdown.style.top = ''; menuDropdown.style.bottom = '';
            menuDropdown.style.left = ''; menuDropdown.style.right = '';
            menuDropdown.style.maxWidth = ''; menuDropdown.style.maxHeight = '';
            const margin = 10;
            const spaceBelow = vh - containerRect.bottom - margin;
            const spaceAbove = containerRect.top - margin;
            menuDropdown.classList.remove('opens-up');
            if (spaceBelow >= dropdownRect.height || spaceBelow >= spaceAbove) {
                menuDropdown.style.top = '100%';
                menuDropdown.style.maxHeight = `${spaceBelow}px`;
            } else {
                menuDropdown.classList.add('opens-up');
                menuDropdown.style.bottom = '100%';
                menuDropdown.style.maxHeight = `${spaceAbove}px`;
            }
            const spaceRight = vw - containerRect.left - margin;
            const spaceLeft = containerRect.right - margin;
            if (spaceRight >= dropdownRect.width || spaceRight >= spaceLeft) {
                menuDropdown.style.left = '0';
                menuDropdown.style.maxWidth = `${spaceRight}px`;
            } else {
                menuDropdown.style.right = '0';
                menuDropdown.style.maxWidth = `${spaceLeft}px`;
            }
            menuDropdown.classList.toggle('visible');
            menuIcon.src = menuDropdown.classList.contains('visible') ? 'photos/favicon2.png' : 'photos/favicon1.png';
        });

        document.addEventListener('click', (e) => {
            if (menuDropdown && !menuDropdown.contains(e.target) && !menuButton.contains(e.target)) {
                if (menuDropdown.classList.contains('visible')) {
                    closeMenu();
                }
            }
        });
     }

     document.addEventListener('click', (e) => {
        const moodBar = document.getElementById('mood-sync-bar');
        const moodToggle = document.getElementById('mood-sync-visibility-toggle');
        
        // Check if click is outside mood bar and toggle
        if (moodBar && moodToggle && 
            !moodBar.contains(e.target) && 
            !moodToggle.contains(e.target) &&
            !moodBar.classList.contains('collapsed')) {
            moodBar.classList.add('collapsed');
        }
    });

     document.body.addEventListener('dblclick', (e) => {
         const heart = document.createElement('div');
         heart.className = 'floating-hearts';
         heart.textContent = ['✨', '💫', '🌟', '☄️', '💖'][Math.floor(Math.random() * 5)];
         heart.style.left = e.clientX + 'px';
         heart.style.top = e.clientY + 'px';
         document.body.appendChild(heart);
         setTimeout(() => heart.remove(), 3000);
     });

     makeMenuDraggable();
     window.addEventListener('hashchange', resetMenuButtonPosition);
}

// ===================================================================
//  GLOBAL COMPONENT LOGIC
// ===================================================================

function initMusicPlayer() {
    AppState.music.player = new Audio();
    const musicPlayerSun = $('music-player-sun');
    const playPauseBtn = $('play-pause-btn');
    const nextBtn = $('next-btn');
    const prevBtn = $('prev-btn');
    const shuffleBtn = $('shuffle-btn');
    const progressBarContainer = $('progress-bar-container');
    const volumeSlider = $('volume-slider');
    const tabButtons = $$('.player-tab-btn');
    const uploadBtn = $('upload-music-btn');
    const musicInput = $('music-upload-input');
    
    startAlbumArtSlideshow();

    musicPlayerSun.addEventListener('click', (e) => { if (!musicPlayerSun.classList.contains('expanded')) { musicPlayerSun.classList.add('expanded'); } });
    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); const view = e.currentTarget.dataset.view;
            $$('.player-view').forEach(v => v.classList.remove('active'));
            $$('.player-tab-btn').forEach(b => b.classList.remove('active'));
            $(`player-view-${view}`).classList.add('active');
            e.currentTarget.classList.add('active');
        });
    });
    playPauseBtn.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); changeSong(1); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); changeSong(-1); });
    shuffleBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleShuffle(); });
    volumeSlider.addEventListener('input', (e) => { e.stopPropagation(); AppState.music.player.volume = e.target.value; });
    AppState.music.player.addEventListener('timeupdate', updateProgressBar);
    AppState.music.player.addEventListener('ended', () => changeSong(1));
    progressBarContainer.addEventListener('click', (e) => { e.stopPropagation(); setProgress(e); });
    uploadBtn?.addEventListener('click', (e) => { e.stopPropagation(); musicInput.click(); });
    musicInput?.addEventListener('change', handleMusicUpload);

    const savedStateJSON = sessionStorage.getItem('musicPlayerState');
    if (savedStateJSON) {
        const savedState = JSON.parse(savedStateJSON);
        const savedSongsJSON = sessionStorage.getItem('songsData');
        if (savedSongsJSON) { EDITABLE_CONFIG.SONGS_DATA = JSON.parse(savedSongsJSON); }
        AppState.music.isShuffled = savedState.isShuffled;
        AppState.music.player.volume = savedState.volume;
        $('volume-slider').value = savedState.volume;
        shuffleBtn.classList.toggle('active', savedState.isShuffled);
        const wasPlaying = AppState.music.isPlaying;
        AppState.music.isPlaying = false;
        loadSong(savedState.currentIndex);
        AppState.music.isPlaying = wasPlaying;
        AppState.music.player.addEventListener('loadedmetadata', () => {
            AppState.music.player.currentTime = savedState.currentTime;
            if (savedState.isPlaying) {
                AppState.music.player.play().catch(e => console.error("Autoplay prevented", e));
                AppState.music.isPlaying = true;
                playPauseBtn.textContent = '⸫';
            } else {
                AppState.music.isPlaying = false;
                playPauseBtn.textContent = '▶️';
            }
        }, { once: true });
    } else {
        loadSong(AppState.music.currentIndex);
    }
}

function loadSong(index) {
    if (!EDITABLE_CONFIG.SONGS_DATA[index]) {
        console.warn(`Song at index ${index} not found.`);
        if (EDITABLE_CONFIG.SONGS_DATA.length > 0) {
            loadSong(0); // Fallback to first song
        }
        return;
    }
    const song = EDITABLE_CONFIG.SONGS_DATA[index];
    AppState.music.currentIndex = index;
    $('song-title').textContent = song.title;
    $('song-artist').textContent = song.artist;
    $('sun-album-art').src = song.albumArt;
    $('panel-album-art').src = song.albumArt;
    AppState.music.player.src = song.src;
    if (AppState.music.isPlaying) AppState.music.player.play().catch(e=>console.error(e));
    renderPlaylist();
}

function renderPlaylist() {
    const playlist = $('playlist');
    playlist.innerHTML = EDITABLE_CONFIG.SONGS_DATA.map((song, index) => 
        `<div class="playlist-item ${index === AppState.music.currentIndex ? 'active' : ''}" data-index="${index}">${index + 1}. ${song.title}</div>`
    ).join('');
    $$('.playlist-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation(); AppState.music.isPlaying = true; 
            loadSong(parseInt(e.currentTarget.dataset.index, 10));
            $('play-pause-btn').textContent = '⸫';
        });
    });
}

function togglePlay() { AppState.music.isPlaying = !AppState.music.isPlaying; if (AppState.music.isPlaying) AppState.music.player.play().catch(e=>console.error(e)); else AppState.music.player.pause(); $('play-pause-btn').textContent = AppState.music.isPlaying ? '⸫' : '▶️'; }
function toggleShuffle() { AppState.music.isShuffled = !AppState.music.isShuffled; $('shuffle-btn').classList.toggle('active', AppState.music.isShuffled); }
function changeSong(direction) {
    if (AppState.music.isShuffled && direction > 0) { let newIndex; do { newIndex = Math.floor(Math.random() * EDITABLE_CONFIG.SONGS_DATA.length); } while (newIndex === AppState.music.currentIndex); loadSong(newIndex); return; }
    let newIndex = AppState.music.currentIndex + direction;
    if (newIndex < 0) newIndex = EDITABLE_CONFIG.SONGS_DATA.length - 1;
    if (newIndex >= EDITABLE_CONFIG.SONGS_DATA.length) newIndex = 0;
    loadSong(newIndex);
}
function updateProgressBar() {
    const { duration, currentTime } = AppState.music.player;
    if (duration) {
        $('progress-bar').style.width = `${(currentTime / duration) * 100}%`;
        $('current-time').textContent = formatTime(currentTime);
        $('total-duration').textContent = formatTime(duration);
    }
}
function setProgress(e) { const width = e.currentTarget.clientWidth; const clickX = e.offsetX; if (AppState.music.player.duration) AppState.music.player.currentTime = (clickX / width) * AppState.music.player.duration; }

async function handleMusicUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await fetch(`${API_URL}/upload/audio`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) throw new Error('Server upload error');
        const result = await response.json();
        if (result.status === 'success') {
            const newSongData = { 
                src: result.filepath, 
                title: file.name.replace(/\.[^/.]+$/, "") || "Uploaded Song", 
                artist: "Nini & Zoya", 
                albumArt: `photos/photo${(EDITABLE_CONFIG.SONGS_DATA.length % 20) + 1}.jpg` 
            };
            const savedSong = await apiAddItem('music', newSongData);
            if (savedSong) {
                loadSong(EDITABLE_CONFIG.SONGS_DATA.length - 1);
                if (!AppState.music.isPlaying) { togglePlay(); }
            }
        } else {
            throw new Error(result.message || 'Failed to get filepath from server.');
        }
    } catch (error) {
        console.error('Music upload failed:', error);
        alert(`Error uploading music: ${error.message}`);
    }
    event.target.value = '';
}

function startAlbumArtSlideshow() {
    if (AppState.music.albumArtInterval) {
        clearInterval(AppState.music.albumArtInterval);
    }
    AppState.music.albumArtInterval = setInterval(() => {
        if (EDITABLE_CONFIG.PHOTOS_DATA.length === 0) return;
        AppState.music.albumArtIndex = (AppState.music.albumArtIndex + 1) % EDITABLE_CONFIG.PHOTOS_DATA.length;
        const newArt = EDITABLE_CONFIG.PHOTOS_DATA[AppState.music.albumArtIndex].src;
        const sunArt = $('sun-album-art');
        const panelArt = $('panel-album-art');
        if (sunArt) sunArt.src = newArt;
        if (panelArt) panelArt.src = newArt;
    }, 5000);
}

function initMoodPickers() {
    const MOODS = [
        { key: 'excited', emoji: '🤩', label: 'Excited' },
        { key: 'loving', emoji: '💕', label: 'Loving' },
        { key: 'happy', emoji: '😊', label: 'Happy' },
        { key: 'sad', emoji: '😢', label: 'Sad' },
        { key: 'calm', emoji: '😌', label: 'Calm' },
        { key: 'playful', emoji: '😜', label: 'Playful' },
        { key: 'adventurous', emoji: '🧭', label: 'Adventurous' },
        { key: 'nostalgic', emoji: '🎞️', label: 'Nostalgic' },
        { key: 'neutral', emoji: '✨', label: 'Neutral' }
    ];

    const nicOptions = document.getElementById('nic-mood-options');
    const zoyaOptions = document.getElementById('zoya-mood-options');
    const nicBtn = document.getElementById('nic-current-mood');
    const zoyaBtn = document.getElementById('zoya-current-mood');
    const combinedEl = document.querySelector('.combined-mood-display');
    const popup = document.getElementById('mood-recommendation-popup');
    const popupMessage = popup ? popup.querySelector('.mood-popup-message') : null;
    const popupAction = popup ? popup.querySelector('.mood-popup-action') : null;
    const popupClose = popup ? popup.querySelector('.mood-popup-close') : null;

    function readMood(person) {
        if (person === 'nic') return (window.NICHO_MOOD || localStorage.getItem('nichoMood') || 'neutral').toLowerCase();
        return (window.ZOYA_MOOD || localStorage.getItem('zoyaMood') || 'neutral').toLowerCase();
    }
    function writeMood(person, mood) {
        if (person === 'nic') { window.NICHO_MOOD = mood; localStorage.setItem('nichoMood', mood); } 
        else { window.ZOYA_MOOD = mood; localStorage.setItem('zoyaMood', mood); }
    }
    function renderCurrent(person) {
        const mood = readMood(person) || 'neutral';
        const def = MOODS.find(m => m.key === mood) || MOODS.find(m => m.key === 'neutral');
        const btn = person === 'nic' ? nicBtn : zoyaBtn;
        if (btn && def) {
            btn.querySelector('.mood-emoji').textContent = def.emoji;
            btn.querySelector('.mood-name').textContent = def.label;
        }
        updateCombinedDisplay();
    }
    function updateCombinedDisplay() {
        const nic = readMood('nic');
        const zoya = readMood('zoya');
        const combinedTextEl = combinedEl ? combinedEl.querySelector('.combined-text') : null;
        const combinedIconEl = combinedEl ? combinedEl.querySelector('.combined-icon') : null;
        if (combinedTextEl) combinedTextEl.textContent = `${nic.charAt(0).toUpperCase() + nic.slice(1)} / ${zoya.charAt(0).toUpperCase() + zoya.slice(1)}`;
        const priorityIcon = zoya === 'loving' || nic === 'loving' ? '💕' : (zoya === 'excited' || nic === 'excited' ? '🤩' : (zoya === 'sad' || nic === 'sad' ? '😢' : '💕'));
        if (combinedIconEl) combinedIconEl.textContent = priorityIcon;

        if (popupMessage && popupAction) {
            const suggested = mapMoodToPanel(nic, zoya);
            popupMessage.textContent = `We sense ${nic} and ${zoya}. Would you like to be guided to ${suggested}?`;
            popupAction.dataset.target = suggested;
        }
    }
    function attachOptions(container, person) {
        if (!container) return;
        container.innerHTML = MOODS.map(m => `<button class="mood-option" data-mood="${m.key}" title="${m.label}">${m.emoji} <span class="mood-label-text">${m.label}</span></button>`).join('');
        container.querySelectorAll('.mood-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!AppState || !AppState.moodSyncEnabled) return; const mood = btn.dataset.mood; writeMood(person, mood); renderCurrent(person);
                btn.classList.add('selected');
                setTimeout(() => btn.classList.remove('selected'), 400);
                if (popup) popup.style.display = 'block';
            });
        });
    }
    function wireToggle(btnId, optionsEl) {
        const btn = document.getElementById(btnId);
        if (!btn || !optionsEl) return;

        btn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            if (!AppState || !AppState.moodSyncEnabled) return;

            const isAlreadyActive = optionsEl.classList.contains('active');
            document.querySelectorAll('.mood-options').forEach(el => el.classList.remove('active'));

            if (!isAlreadyActive) {
                optionsEl.classList.add('active');
            }
        });
    }

    attachOptions(nicOptions, 'nic');
    attachOptions(zoyaOptions, 'zoya');
    wireToggle('nic-current-mood', nicOptions);
    wireToggle('zoya-current-mood', zoyaOptions);
    renderCurrent('nic'); renderCurrent('zoya');

    document.addEventListener('click', (e) => {
        const activeDropdown = document.querySelector('.mood-options.active');
        if (activeDropdown && !activeDropdown.parentElement.contains(e.target)) {
            activeDropdown.classList.remove('active');
        }
    });

    const moodToggle = document.getElementById('mood-sync-toggle');
    AppState.moodSyncEnabled = false;
    if (moodToggle) {
        moodToggle.checked = false;
        moodToggle.addEventListener('change', (e) => {
            AppState.moodSyncEnabled = !!moodToggle.checked;
            const bar = document.getElementById('mood-sync-bar');
            if (bar) bar.classList.toggle('mood-sync-disabled', !AppState.moodSyncEnabled);
        });
        const bar = document.getElementById('mood-sync-bar'); if (bar) bar.classList.toggle('mood-sync-disabled', !AppState.moodSyncEnabled);
    }
    
    // This is the one and only listener for the redirect button
    if (popupAction) {
        popupAction.addEventListener('click', (e) => {
            e.preventDefault(); 
            if (!AppState.moodSyncEnabled) { 
                if (popup) popup.style.display = 'none'; 
                return; 
            } 
            const target = popupAction.dataset.target || mapMoodToPanel(readMood('zoya'), readMood('nic')); 
            if (popup) popup.style.display = 'none'; 
            showMoodLoadingAndRedirect(target);
        });
    }

    // This is the one and only listener for the close button
    if (popupClose) {
        popupClose.addEventListener('click', (e) => { 
            e.preventDefault(); 
            const p = document.getElementById('mood-recommendation-popup'); 
            if (p) p.style.display = 'none'; 
        });
    }
}

function initQuill(){ 
    if($('quill-editor') && typeof Quill !== 'undefined') {
        const toolbarOptions = [
            [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }], ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }], [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'header': 1 }, { 'header': 2 }, 'blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }, { 'align': [] }], ['link', 'image', 'video'], ['clean']
        ];
        AppState.quill = new Quill('#quill-editor', { modules: { toolbar: toolbarOptions }, theme: 'snow' });
    }
}

// ===================================================================
//  VISUALS & BACKGROUNDS (Now exposed to common.js)
// ===================================================================

function initWebBackground(canvasId, theme) {
    const canvas = $(canvasId);
    if (!canvas) return;

    // Accessibility: Respect user's motion preferences
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

    const ctx = canvas.getContext('2d');
    if (canvasId === 'web-canvas-landing' && AppState.webAnimationLandingId) { cancelAnimationFrame(AppState.webAnimationLandingId); }
    if (canvasId === 'web-canvas-main' && AppState.webAnimationMainId) { cancelAnimationFrame(AppState.webAnimationMainId); }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let points = [];
    // Performance: Use fewer particles on smaller screens
    const numPoints = Math.min(80, Math.floor(canvas.width / 20));
    const connectDistance = 150;
    const pointColor = theme.colors['--gold'];
    const lineColor = theme.colors['--border-glass'];
    class Point {
        constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.vx = (Math.random() - 0.5) * 0.4; this.vy = (Math.random() - 0.5) * 0.4; this.radius = Math.random() * 1.5 + 1; }
        draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fillStyle = pointColor; ctx.fill(); }
        update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > canvas.width) this.vx *= -1; if (this.y < 0 || this.y > canvas.height) this.vy *= -1; }
    }
    for (let i = 0; i < numPoints; i++) { points.push(new Point()); }
    let animationId;
    function animate() {
        if (!$(canvasId)) return; // Stop animation if canvas is gone
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const dist = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
                if (dist < connectDistance) {
                    ctx.strokeStyle = lineColor; ctx.lineWidth = 1;
                    ctx.beginPath(); ctx.moveTo(points[i].x, points[i].y); ctx.lineTo(points[j].x, points[j].y); ctx.stroke();
                }
            }
        }
        ctx.globalAlpha = 1;
        points.forEach(point => { point.update(); point.draw(); });
        animationId = requestAnimationFrame(animate);
        if (canvasId === 'web-canvas-landing') { AppState.webAnimationLandingId = animationId; } 
        else { AppState.webAnimationMainId = animationId; }
    }
    animate();
}
window.initWebBackground = initWebBackground;

function initSpiralAnimation(canvasId, options = {}) {
    const canvas = $(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const isMain = canvasId.indexOf('main') !== -1;
    if (isMain && AppState.spiralAnimationMainId) cancelAnimationFrame(AppState.spiralAnimationMainId);
    if (!isMain && AppState.spiralAnimationLandingId) cancelAnimationFrame(AppState.spiralAnimationLandingId);
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { ctx.clearRect(0,0,canvas.width,canvas.height); return; }
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.max(1, Math.floor(window.innerWidth * dpr));
        canvas.height = Math.max(1, Math.floor(window.innerHeight * dpr));
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();
    const center = () => ({ x: canvas.width / (window.devicePixelRatio || 1) / 2, y: canvas.height / (window.devicePixelRatio || 1) / 2 });
    let cx = center().x, cy = center().y;
    const intensity = options.intensity || 'subtle';
    const counts = { subtle: 40, moderate: 80, strong: 150 };
    const baseCount = counts[intensity] || 60;
    const colors = options.colors || ['rgba(255,215,0,0.95)', 'rgba(138,43,226,0.9)', 'rgba(100,255,218,0.9)'];
    const particles = [];
    const maxR = Math.hypot(window.innerWidth, window.innerHeight) * 0.6;
    class SpiralParticle {
        constructor() { this.reset(true); }
        reset(initial = false) { this.t = (Math.random() * 6) - 3; this.offset = Math.random() * Math.PI * 2; this.speed = (0.0015 + Math.random() * 0.005) * (initial ? 0.6 : 1); this.size = 0.6 + Math.random() * 3.2; this.color = colors[Math.floor(Math.random() * colors.length)]; this.alpha = 0.06 + Math.random() * 0.6; }
        update(dt) { this.t += this.speed * dt; const a = 2.5; const b = 6.5; this.r = a + b * this.t; this.x = cx + this.r * Math.cos(this.t + this.offset); this.y = cy + this.r * Math.sin(this.t + this.offset); this.lifeAlpha = Math.max(0, 1 - (this.r / maxR)); if (this.r > maxR || isNaN(this.x) || isNaN(this.y)) { this.reset(); } }
        draw() { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = this.color; ctx.globalAlpha = Math.min(0.9, this.alpha * this.lifeAlpha); const s = this.size * (0.6 + this.lifeAlpha); ctx.beginPath(); ctx.arc(this.x, this.y, s, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    }
    for (let i = 0; i < baseCount; i++) particles.push(new SpiralParticle());
    let last = performance.now();
    let animId;
    function animate(now) {
        if (!$(canvasId)) { // Stop animation if canvas is gone
            if (isMain) AppState.spiralAnimationMainId = null;
            else AppState.spiralAnimationLandingId = null;
            return;
        }
        const dt = Math.min(40, now - last); last = now;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(dt); p.draw(); });
        animId = requestAnimationFrame(animate);
        if (isMain) AppState.spiralAnimationMainId = animId; else AppState.spiralAnimationLandingId = animId;
    }
    window.addEventListener('resize', () => { 
        if($(canvasId)) {
            resizeCanvas(); 
            cx = center().x; 
            cy = center().y; 
        }
    });
    animate(performance.now());
}

function applyThemeToLanding(themeName) {
    const canvas = $('landing-particles-canvas');
    if (!canvas) return;
    const theme = THEME_COLORS[themeName];
    const starShape = THEME_STAR_SHAPES[themeName];
    if (!theme || !starShape) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    const particleCount = 40;
    class Particle {
        constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 12 + 8; this.speedX = Math.random() * 0.3 - 0.15; this.speedY = Math.random() * 0.3 - 0.15; this.opacity = Math.random() * 0.4 + 0.2; this.char = starShape.char; this.color = theme.colors['--gold']; }
        update() { this.x += this.speedX; this.y += this.speedY; if (this.x > canvas.width || this.x < 0) this.speedX *= -1; if (this.y > canvas.height || this.y < 0) this.speedY *= -1; }
        draw() { ctx.save(); ctx.globalAlpha = this.opacity; ctx.font = `${this.size}px Arial`; ctx.fillStyle = this.color; ctx.fillText(this.char, this.x, this.y); ctx.restore(); }
    }
    for (let i = 0; i < particleCount; i++) { particles.push(new Particle()); }
    let animId;
    function animateParticles() {
        if (!$(canvas.id)) { // Stop animation if canvas is gone
            cancelAnimationFrame(animId);
            window.landingParticlesAnim = null;
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        animId = requestAnimationFrame(animateParticles);
    }
    if (window.landingParticlesAnim) cancelAnimationFrame(window.landingParticlesAnim);
    animateParticles();
    window.landingParticlesAnim = animId;
}
window.applyThemeToLanding = applyThemeToLanding;

function initMainParticles(themeName) {
    applyThemeToMainParticles(themeName);
}
window.initMainParticles = initMainParticles;

function applyThemeToMainParticles(themeName) {
    const canvas = $('particles-canvas');
    if (!canvas) return;
    const theme = THEME_COLORS[themeName];
    const starShape = THEME_STAR_SHAPES[themeName];
    if (!theme || !starShape) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    const particleCount = 30;
    class Particle {
        constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 12 + 8; this.speedX = Math.random() * 0.3 - 0.15; this.speedY = Math.random() * 0.3 - 0.15; this.opacity = Math.random() * 0.4 + 0.2; this.char = starShape.char; this.color = theme.colors['--gold']; }
        update() { this.x += this.speedX; this.y += this.speedY; if (this.x > canvas.width || this.x < 0) this.speedX *= -1; if (this.y > canvas.height || this.y < 0) this.speedY *= -1; }
        draw() { ctx.save(); ctx.globalAlpha = this.opacity; ctx.font = `${this.size}px Arial`; ctx.fillStyle = this.color; ctx.fillText(this.char, this.x, this.y); ctx.restore(); }
    }
    for (let i = 0; i < particleCount; i++) { particles.push(new Particle()); }
    let animationFrameId;
    function animateParticles() {
        if (!$(canvas.id)) { // Stop animation if canvas is gone
            cancelAnimationFrame(animationFrameId);
            window.mainParticlesAnim = null;
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        animationFrameId = requestAnimationFrame(animateParticles);
    }
    if (window.mainParticlesAnim) cancelAnimationFrame(window.mainParticlesAnim);
    animateParticles();
    window.mainParticlesAnim = animationFrameId;
}


/**
 * *** UPDATED: Renders Solar System Navigation ***
 * This function is now the single source of truth for creating planets.
 * It integrates the bilingual hover logic from chinese_enhancements.js.
 */
function renderSolarSystemNav() {
    // This map provides all display data, including translations
    const planetNameMap = {
        'chronicle': { en: 'Our Chronicle', zh: '时光纪事', pinyin: 'Shíguāng Jìshì' },
        'tome': { en: 'The Stardust Tome', zh: '星尘典籍', pinyin: 'Xīngchén Diǎnjí' },
        'gallery': { en: 'Gallery of Ages', zh: '光影长廊', pinyin: 'Guāngyǐng Chángláng' },
        'guide': { en: 'Constellation Guide', zh: '星图指引', pinyin: 'Xīngtú Zhǐyǐn' },
        'discover': { en: 'Realms of Discovery', zh: '探索之境', pinyin: 'Tànsuǒ zhī Jìng' },
        'games': { en: "Orion's Challenges", zh: '猎户殿堂', pinyin: 'Lièhù Diàntáng' },
        'universes': { en: 'Alternate Chronicles', zh: '平行宇宙', pinyin: 'Píngxíng Yǔzhòu' },
        'voice-garden': { en: 'Voice Garden', zh: '语音花园', pinyin: 'Yǔyīn Huāyuán' },
        'sanctum': { en: 'Inner Sanctum', zh: '心灵圣域', pinyin: 'Xīnlíng Shèngyù' }
    };
    
    const navItems = [
        { id: 'chronicle', color: '#e74c3c', size: 5, orbit: 1, speed: 40 },
        { id: 'tome', color: '#3498db', size: 6, orbit: 2, speed: 60 },
        { id: 'gallery', color: '#9b59b6', size: 6.5, orbit: 3, speed: 85 },
        { id: 'discover', color: '#16a085', size: 5.2, orbit: 4, speed: 70 },
        { id: 'guide', color: '#f1c40f', size: 4.5, orbit: 5, speed: 35 },
        { id: 'games', color: '#e67e22', size: 7, orbit: 6, speed: 110 },
        { id: 'universes', color: '#2ecc71', size: 5.5, orbit: 7, speed: 50 },
        { id: 'voice-garden', color: '#1abc9c', size: 5.2, orbit: 8, speed: 95 },
        { id: 'sanctum', color: '#e0e0e0', size: 4, orbit: 9, speed: 130 }
    ];

    const container = DOM.solarSystemContainer;
    container.querySelectorAll('.orbit, .planet').forEach(el => el.remove());

    // Clear all previously set planet trail intervals
    if (AppState.solarSystem.planetTrailIntervals.length > 0) {
        AppState.solarSystem.planetTrailIntervals.forEach(intervalId => clearInterval(intervalId));
        AppState.solarSystem.planetTrailIntervals = [];
    }

    // Clear any existing shooting star interval
    if (AppState.solarSystem.shootingStarInterval) {
        clearInterval(AppState.solarSystem.shootingStarInterval);
        AppState.solarSystem.shootingStarInterval = null;
    }

    navItems.forEach((item, index) => {
        const orbit = document.createElement('div');
        orbit.className = 'orbit';
        const orbitRadius = [12, 18, 24, 30, 36, 42, 48, 54, 60][index] || 12;
        orbit.style.cssText = `width: ${orbitRadius * 2}vmin; height: ${orbitRadius * 2}vmin; animation-duration: ${item.speed}s;`;
        
        const planet = document.createElement('div');
        planet.className = 'planet';
        planet.dataset.panelId = item.id;
        planet.style.cssText = `width: ${item.size}vmin; height: ${item.size}vmin; background-color: ${item.color};`;
        
        orbit.appendChild(planet);
        container.appendChild(orbit);

        // 1. Add click listener
        planet.addEventListener('click', (e) => { 
            e.stopPropagation(); // Prevent click from bubbling to sun
            createClickRipple(planet); // Add visual feedback
            setTimeout(() => { window.location.hash = item.id; }, 200); // Delay hash change slightly
        });
        
        // 2. Add bilingual mouseover listener
        planet.addEventListener('mouseover', () => {
            const names = planetNameMap[item.id]; // Use item.id as the key
            if (names) {
                DOM.planetNameDisplay.innerHTML = `<span class="text-english">${names.en}</span><span class="text-chinese">${names.zh}</span><span class="text-pinyin">${names.pinyin}</span>`;
                DOM.planetNameDisplay.classList.add('visible');
            }
        });
        
        // 3. Add mouseout listener
        planet.addEventListener('mouseout', () => { 
            DOM.planetNameDisplay.classList.remove('visible'); 
        });

        // 4. Add planet trail interval
        const trailIntervalId = setInterval(() => {
            if (document.body.contains(planet)) {
                createPlanetTrail(planet, item.color);
            } else {
                clearInterval(trailIntervalId);
                AppState.solarSystem.planetTrailIntervals = AppState.solarSystem.planetTrailIntervals.filter(id => id !== trailIntervalId);
            }
        }, 500);
        AppState.solarSystem.planetTrailIntervals.push(trailIntervalId);
    });

    // Start the shooting star interval
    AppState.solarSystem.shootingStarInterval = setInterval(() => {
        createShootingStar(DOM.solarSystemContainer);
    }, 3000);
}

// Create planet trail effect
function createPlanetTrail(planet, color) {
    if (!planet || !document.body.contains(planet)) return; // Defensive check
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: absolute;
        width: ${planet.offsetWidth}px;
        height: ${planet.offsetHeight}px;
        border-radius: 50%;
        background: radial-gradient(circle, ${color} 0%, transparent 70%);
        pointer-events: none;
        animation: planet-trail 1s ease-out forwards;
    `;
    
    const rect = planet.getBoundingClientRect();
    const containerRect = planet.closest('#solar-system-container').getBoundingClientRect();
    trail.style.left = (rect.left - containerRect.left) + 'px';
    trail.style.top = (rect.top - containerRect.top) + 'px';
    
    planet.closest('#solar-system-container').appendChild(trail);
    setTimeout(() => trail.remove(), 1000);
}

// Draw constellation lines between planets
function drawConstellationLines(activeIndex, planets) {
    clearConstellationLines();
    
    // Draw lines to 2-3 nearest planets
    const activePlanet = planets[activeIndex];
    const nearbyIndices = [
        Math.max(0, activeIndex - 1),
        Math.min(planets.length - 1, activeIndex + 1),
        Math.min(planets.length - 1, activeIndex + 2)
    ].filter(i => i !== activeIndex);
    
    nearbyIndices.forEach(targetIndex => {
        const targetPlanet = planets[targetIndex];
        const line = createLineBetweenPlanets(
            activePlanet.element, 
            targetPlanet.element
        );
        if (line) {
            activePlanet.element.closest('#solar-system-container').appendChild(line);
            setTimeout(() => line.classList.add('active'), 50);
        }
    });
}

// Create line between two planets
function createLineBetweenPlanets(planet1, planet2) {
    const container = planet1.closest('#solar-system-container');
    if (!container) return null;
    
    const rect1 = planet1.getBoundingClientRect();
    const rect2 = planet2.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    const x1 = rect1.left - containerRect.left + rect1.width / 2;
    const y1 = rect1.top - containerRect.top + rect1.height / 2;
    const x2 = rect2.left - containerRect.left + rect2.width / 2;
    const y2 = rect2.top - containerRect.top + rect2.height / 2;
    
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    const line = document.createElement('div');
    line.className = 'constellation-line';
    line.style.width = length + 'px';
    line.style.left = x1 + 'px';
    line.style.top = y1 + 'px';
    line.style.transform = `rotate(${angle}deg)`;
    
    return line;
}

// Clear constellation lines
function clearConstellationLines() {
    document.querySelectorAll('.constellation-line').forEach(line => {
        line.classList.remove('active');
        setTimeout(() => line.remove(), 500);
    });
}

// Create shooting star
function createShootingStar(container) {
    if (!container || !document.body.contains(container) || window.location.hash) return; // Defensive check and only on home view
    
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = Math.random() * 50 + '%';
    star.style.top = Math.random() * 50 + '%';
    
    container.appendChild(star);
    setTimeout(() => star.remove(), 2000);
}

// Create click ripple effect with particles
function createClickRipple(planet) {
    if (!planet || !document.body.contains(planet)) return; // Defensive check
    // Main ripple
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        inset: -100%;
        border-radius: 50%;
        border: 3px solid var(--gold);
        opacity: 1;
        animation: ripple-expand 0.8s ease-out forwards;
        pointer-events: none;
    `;
    planet.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
    
    // Particle explosion
    const color = planet.style.backgroundColor;
    for (let i = 0; i < 12; i++) {
        createParticle(planet, color, i);
    }
    
    // Subtle haptic feedback if available
    if ('vibrate' in navigator) {
        navigator.vibrate(20);
    }
}

// Create explosion particles
function createParticle(planet, color, index) {
    if (!planet || !document.body.contains(planet)) return; // Defensive check
    const particle = document.createElement('div');
    particle.className = 'particle'; // *** FIX: Apply the particle class for correct styling ***
    const planetRect = planet.getBoundingClientRect();
    const startX = planetRect.left + planetRect.width / 2;
    const startY = planetRect.top + planetRect.height / 2;

    const angle = (360 / 12) * index;
    const distance = 60 + Math.random() * 40;
    
    particle.style.cssText = `
        width: 4px;
        height: 4px;
        background: ${color};
        border-radius: 50%;
        box-shadow: 0 0 10px ${color};
        left: ${startX}px;
        top: ${startY}px;
        animation: particle-explode-${index} 1s ease-out forwards;
    `;
    
    // Create unique animation for each particle
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes particle-explode-${index} {
            0% {
                transform: translate(-50%, -50%) translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) 
                           translate(${Math.cos(angle * Math.PI / 180) * distance}px, 
                                     ${Math.sin(angle * Math.PI / 180) * distance}px)
                           scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(particle);
    setTimeout(() => {
        particle.remove();
        styleSheet.remove();
    }, 1000);
}

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-expand {
        0% { transform: scale(0.5); opacity: 1; }
        100% { transform: scale(3); opacity: 0; }
    }
`;
document.head.appendChild(style);


function createFloatingCompliment() {
    // Remove any existing compliments first
    const existingCompliments = document.querySelectorAll('.floating-compliment');
    existingCompliments.forEach(c => c.remove());
    
    const complimentEl = document.createElement('div');
    complimentEl.className = 'floating-compliment';
    const compliment = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
    complimentEl.textContent = compliment;
    
    // CSS will handle positioning via nth-child selectors
    const duration = 6;
    complimentEl.style.animationName = 'float-compliment';
    complimentEl.style.animationDuration = `${duration}s`;
    document.body.appendChild(complimentEl);
    
    setTimeout(() => { complimentEl.remove(); }, duration * 1000);
}

// ===================================================================
//  DRAGGABLE MENU LOGIC
// ===================================================================

function resetMenuButtonPosition() {
    const menuContainer = document.getElementById('main-menu-container');
    if (menuContainer) {
        menuContainer.style.left = '';
        menuContainer.style.top = '';
    }
}

function makeMenuDraggable() {
    const menuContainer = document.getElementById('main-menu-container');
    const menuButton = document.getElementById('main-menu-button');
    if (!menuContainer || !menuButton) return;
    let isMenuDragging = false;
    let isReadyToDrag = false;
    let offsetX, offsetY;
    let longPressTimer;
    const onDragStart = (e) => {
        e.preventDefault();
        longPressTimer = setTimeout(() => {
            isReadyToDrag = true;
            menuContainer.classList.add('ready-to-drag');
            const touch = e.touches ? e.touches[0] : e;
            offsetX = touch.clientX - menuContainer.offsetLeft;
            offsetY = touch.clientY - menuContainer.offsetTop;
            menuContainer.classList.add('dragging');
            if ('vibrate' in navigator) { navigator.vibrate(50); }
        }, 1000);
        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('touchmove', onDragMove, { passive: false });
        document.addEventListener('mouseup', onDragEnd);
        document.addEventListener('touchend', onDragEnd);
    };
    const onDragMove = (e) => {
        if (!isReadyToDrag) { clearTimeout(longPressTimer); return; }
        isMenuDragging = true;
        e.stopPropagation();
        const touch = e.touches ? e.touches[0] : e;
        let x = touch.clientX - offsetX;
        let y = touch.clientY - offsetY;
        const containerRect = menuContainer.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        x = Math.max(0, Math.min(x, vw - containerRect.width));
        y = Math.max(0, Math.min(y, vh - containerRect.height));
        menuContainer.style.left = `${x}px`;
        menuContainer.style.top = `${y}px`;
    };
    const onDragEnd = (e) => {
        clearTimeout(longPressTimer);
        if (isMenuDragging) { e.stopPropagation(); }
        isMenuDragging = false;
        isReadyToDrag = false;
        menuContainer.classList.remove('ready-to-drag');
        menuContainer.classList.remove('dragging');
        document.removeEventListener('mousemove', onDragMove);
        document.removeEventListener('touchmove', onDragMove);
        document.removeEventListener('mouseup', onDragEnd);
        document.removeEventListener('touchend', onDragEnd);
    };
    menuButton.addEventListener('mousedown', onDragStart);
    menuButton.addEventListener('touchstart', onDragStart, { passive: false });
}

// ===================================================================
//  MISC HELPERS (Missing from original, but referenced)
// ===================================================================

/**
 * Initializes a parallax effect on the background elements.
 * This function is now the primary implementation, moved from chinese_enhancements.js.
 */
function initializeParallax() {
    const landingGate = document.getElementById('landing-gate');
    const sanctuary = document.getElementById('celestial-sanctuary');
    const starsBg = document.querySelector('.stars-bg');
    const patternBg = document.querySelector('.chinese-pattern');

    // Determine which container is currently active for the parallax effect.
    const parallaxContainer = (landingGate && landingGate.style.display !== 'none') ? landingGate : sanctuary;

    if (!parallaxContainer) return;

    parallaxContainer.addEventListener('mousemove', (e) => {
        // The chinese_enhancements.js file contains a toggle for aesthetics.
        // We will assume it's enabled here, as this effect is part of that aesthetic.
        const { clientWidth, clientHeight } = parallaxContainer;
        const { clientX, clientY } = e;

        // Calculate mouse position from -0.5 to +0.5
        const x = (clientX / clientWidth) - 0.5;
        const y = (clientY / clientHeight) - 0.5;

        // Apply movement. Adjust '20' and '10' to change intensity.
        if (starsBg) starsBg.style.backgroundPosition = `${50 - (x * 20)}% ${50 - (y * 20)}%`;
        if (patternBg) patternBg.style.backgroundPosition = `${50 - (x * 10)}% ${50 - (y * 10)}%`;
    });
}

// ===================================================================
//  START THE APP
// ===================================================================

document.addEventListener('DOMContentLoaded', initApp);
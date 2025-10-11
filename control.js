// --- Google Drive Integration Constants ---
const GOOGLE_CLIENT_ID = '349263845461-cpbk5o9hkjprp7lt07j6icfss0onugad.apps.googleusercontent.com'; // <--- YOUR CLIENT ID
const GOOGLE_SCOPES = 'https://www.googleapis.com/auth/drive';
const DATA_FILE_NAME = 'celestialSanctuaryData.json';
const ASSETS_FOLDER_NAME = 'CelestialSanctuaryAssets';

// --- Google Drive State ---
let gapiInited = false;
let gisInited = false;
let tokenClient;
let gdriveFileId = null;
let isSaving = false;

// --- Holds the original, hardcoded data as a fallback ---
const INITIAL_DATA = {
    PHOTOS_DATA: [
        { src: `photos/photo1.jpg`, caption: 'First Cooking Adventure', year: 2021, category: 'cooking' }, { src: `photos/photo2.jpg`, caption: 'Homemade Pasta Night', year: 2022, category: 'cooking' },
        { src: `photos/photo3.jpg`, caption: 'Baking Together', year: 2023, category: 'cooking' }, { src: `photos/photo4.jpg`, caption: 'Kyoto Temple Visit', year: 2021, category: 'travel' },
        { src: `photos/photo5.jpg`, caption: 'Beach Getaway', year: 2022, category: 'travel' }, { src: `photos/photo6.jpg`, caption: 'Mountain Hiking', year: 2023, category: 'travel' },
        { src: `photos/photo7.jpg`, caption: 'City Exploration', year: 2024, category: 'travel' }, { src: `photos/photo8.jpg`, caption: 'Rainy Day Fun', year: 2021, category: 'random' },
        { src: `photos/photo9.jpg`, caption: 'Game Night', year: 2022, category: 'random' }, { src: `photos/photo10.jpg`, caption: 'Study Session', year: 2023, category: 'random' },
        { src: `photos/photo11.jpg`, caption: 'Quiet Moment', year: 2021, category: 'intimate' }, { src: `photos/photo12.jpg`, caption: 'Sunset Together', year: 2022, category: 'intimate' },
        { src: `photos/photo13.jpg`, caption: 'Anniversary Celebration', year: 2023, category: 'intimate' }, { src: `photos/photo14.jpg`, caption: 'Zoya\'s Art Showcase', year: 2021, category: 'zoya' },
        { src: `photos/photo15.jpg`, caption: 'Zoya Reading', year: 2022, category: 'zoya' }, { src: `photos/photo16.jpg`, caption: 'Nicholas Studying', year: 2021, category: 'nicholas' },
        { src: `photos/photo17.jpg`, caption: 'Nicholas at Library', year: 2022, category: 'nicholas' }, { src: `photos/photo18.jpg`, caption: 'Coffee Date', year: 2024, category: 'random' },
        { src: `photos/photo19.jpg`, caption: 'Movie Night', year: 2024, category: 'random' }, { src: `photos/photo20.jpg`, caption: 'Spring Blossoms', year: 2025, category: 'random' }
    ],
    SONGS_DATA: Array.from({length: 20}, (_, i) => ({ src: `music/song${i+1}.mp3`, title: `Our Song ${i+1}`, artist: 'Nini & Zoya', albumArt: `photos/photo${(i % 20) + 1}.jpg` }))
};


const EDITABLE_CONFIG = { 
    bookPassword: "nini", 
    relationshipStart: new Date('2021-08-25T00:00:00'),
    thenVsNow_ImagePairs: [
        { then: 'then1', now: 'now1' },
        { then: 'then2', now: 'now2' },
        { then: 'then3', now: 'now3' },
        { then: 'then4', now: 'now4' }, 
        { then: 'then5', now: 'now5' }
    ],
    // These will be loaded from Google Drive or INITIAL_DATA
    PHOTOS_DATA: [],
    SONGS_DATA: [], 
    OUR_LEXICON: { "Micro Trip": "A small, spontaneous adventure.", "Panda Cuddle": "The ultimate form of cozy comfort.", "Toast Emergency": "A sudden, urgent need for a snack.", "Silly Goose Time": "Being completely ridiculous together." }, 
    STARLIGHT_REASONS: ["Because you see the world not just for what it is, but for what it could be.", "Because you make me laugh, especially when I don't want to.", "For the way your hand fits perfectly in mine.", "Because you are my greatest adventure and my quietest harbor.", "For your kindness, which radiates like starlight.", "Because you remember the little things.", "Because you challenge me to be a better person.", "For the unwavering strength you show every day.", "Because home is not a place, but a person, and that person is you.", "For every sunset we've watched and every dream we've shared."],
    CONSTELLATION_QUESTIONS: [ { q: "What subject does Nic love most?", a: "mathematics", hint: "It's a subject with numbers and equations..." }, { q: "Where did we first meet?", a: "sports", hint: "It was at a school event outdoors..." }, { q: "What meal did we share on our first date?", a: "chicken", hint: "It's a type of poultry..." }, { q: "What weather event did Nic fly through to see Zoya?", a: "typhoon", hint: "It's a severe tropical storm..." } ],
    TREASURE_HUNT_CLUES: [ { clue: "Where two hearts first collided...", answer: "sports field", treasure: "🏆 You found our first meeting place!" }, { clue: "A place of silence and knowledge...", answer: "library", treasure: "📚 You discovered our sanctuary of learning!" } ],
    GALLERY_CATEGORIES: { 'cooking': '🍳 Food', 'travel': '✈️ Trip', 'random': '🎲 Random', 'intimate': '💕 Intimate', 'zoya': '🌸 Zoya', 'nicholas': '📖 Nic' }
};

const AppState = { bookUnlocked: false, activePanel: 'home', chapters: [], photos: [], songs: [], currentChapterIndex: 0, currentGalleryCategory: 'all', wishes: ["Travel the world together"], riddles: [ { q: "I am taken from a mine, and shut up in a wooden case, from which I am never released, and yet I am used by almost everybody. What am I?", a: "pencil lead", hint: "Think about what's inside a common writing tool." }, { q: "What has an eye, but cannot see?", a: "needle", hint: "It's used for sewing." } ], currentRiddle: 0, currentConstellation: 0, treasureHunt: { foundTreasures: [], currentClueIndex: 0 }, specialDates: { '6-1': 'The Bicycle Incident 🚲', '7-27': 'First Date at Joyful 🍗', '8-25': 'Our Confession Day ❤️', '9-15': 'First Meeting 💕' }, music: { player: null, isPlaying: false, currentIndex: 0, isShuffled: false }, quill: null, editingChapterIndex: -1, chronicleEvents: [], thenNowState: { availableIndices: [], currentIndexInAvailable: 0, lastReveal: null } };

const CHRONICLE_DATA = [
    { year: 'Sep 15, 2019', title: 'First Meeting', desc: 'During the Taiku Taikai (sports festival), two lonely souls from different worlds first crossed paths. A boy with a math book and a girl with a curious heart.', icon: '💕' },
    { year: 'Jan 2020', title: 'Genesis of a Shared Canvas', desc: 'Our first art class together. Nic drew two people dancing, unknowingly sketching the first lines of our shared story.', icon: '🎨' },
    { year: 'Jan 2020', title: 'Navigating a New Nebula', desc: 'Nic officially joined the "Special Course," a cosmic shift that placed him in more classes with Zoya and altered the trajectory of our daily interactions.', icon: '🌌' },
    { year: 'May 2, 2021', title: 'The Distant Supernova', desc: 'Zoya\'s birthday, which Nic wasn\'t invited to. The feeling of being left out sparked a realization of how deeply he already cared.', icon: '💥' },
    { year: 'Jun 2021', title: 'The Comet of Compassion', desc: 'The day Nic fixed Zoya\'s bicycle. A fast-moving event of kindness that brought our orbits significantly closer.', icon: '🚲' },
    { year: 'Jun 2021', title: 'Entering a New Galaxy', desc: 'The first time Nic was welcomed into Zoya\'s family home for a meal, signifying his acceptance into her personal universe.', icon: '🏡' },
    { year: 'Jul 27, 2021', title: 'The Alignment at Joyful', desc: 'Our first intentional meal together at Joyful restaurant. A conscious choice to align our personal orbits and share dedicated time over a chicken steak.', icon: '🍗' },
    { year: 'Jul 28, 2021', title: 'First Light Transmission', desc: 'The night we first exchanged photos of ourselves—a significant leap in vulnerability, like sending the first signals between distant stars.', icon: '📸' },
    { year: 'Aug 10, 2021', title: 'The Celestial Storm', desc: 'Nic\'s journey through a typhoon to get back from Kyoto for the English club event. A pivotal moment of unspoken dedication.', icon: '✈️' },
    { year: 'Aug 25, 2021', title: 'The Unbreakable Vow', desc: 'On a simple sports field in Miyakonojo, a universe of unspoken feelings was finally given a voice, and a new constellation was born.', icon: '💖' },
    { year: 'Aug 25, 2022', title: 'The First Orbital Return', desc: 'Celebrating our first anniversary, marking one full, stable orbit around the sun of our relationship.', icon: '❤️' }
];

const $ = (id) => document.getElementById(id);
const $$ = (selector) => document.querySelectorAll(selector);

// This will be populated after the DOM loads
let DOM = {};

// Helper function to detect image file with any extension
async function findImageWithExtension(basePath) {
    const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'heic'];
    for (const ext of extensions) {
        const testPath = `${basePath}.${ext}`;
        try {
            const response = await fetch(testPath, { method: 'HEAD' });
            if (response.ok) return testPath;
        } catch (e) {
            // Ignore fetch errors (like 404) and continue to the next extension
            continue;
        }
    }
    // As a fallback, return the base path with a default extension if none are found
    return `${basePath}.jpg`;
}

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    // Correctly initialize the DOM object after the document is loaded
    DOM = {
        bookPasswordGate: $('book-password-gate'),
        bookPasswordInput: $('book-password-input'),
        unlockBookBtn: $('unlock-book-btn'),
        solarSystemContainer: $('solar-system-container'),
        mainContent: document.querySelector('.main-content'),
        backToMenuAsteroid: $('back-to-menu-asteroid'),
        planetNameDisplay: $('planet-name-display'),
        chapterMetaModal: $('chapter-meta-modal'),
        editorModal: $('editor-modal'),
        editorTitle: $('editor-title'),
        saveEditBtn: $('save-edit-btn'),
        cancelEditBtn: $('cancel-edit-btn'),
        memoryLaneModal: $('memory-lane-modal'),
        closeMemoryBtn: $('close-memory-btn'),
        lightbox: $('lightbox'),
        lightboxImg: $('lightbox-image'),
        lightboxCaption: $('lightbox-caption'),
        scrollToTopBtn: $('scroll-to-top'),
    };

    initQuill();
    addEventListeners();
    renderSolarSystemNav();
    initMusicPlayer();
    updateRelationshipCounter();
    setInterval(updateRelationshipCounter, 60000);
    renderPanel('home');
}

function addEventListeners() {
    DOM.backToMenuAsteroid.addEventListener('click', () => renderPanel('home'));
    DOM.unlockBookBtn.addEventListener('click', handleBookPasswordAttempt);
    DOM.mainContent.addEventListener('click', handleMainContentClick);
    $('continue-meta-btn').addEventListener('click', handleContinueMeta);
    $('cancel-meta-btn').addEventListener('click', () => DOM.chapterMetaModal.classList.remove('active'));
    DOM.saveEditBtn.addEventListener('click', saveChapter);
    DOM.cancelEditBtn.addEventListener('click', () => DOM.editorModal.classList.remove('active'));
    $('signout-button').addEventListener('click', handleSignoutClick);
    $('add-song-btn').addEventListener('click', () => setupUploadModal('song'));

    DOM.bookPasswordGate.addEventListener('click', (e) => {
        if (e.target === DOM.bookPasswordGate) {
            DOM.bookPasswordGate.classList.remove('active');
            renderPanel('home');
        }
    });

    document.addEventListener('click', (e) => {
        const musicPlayerSun = $('music-player-sun');
        if (musicPlayerSun && !musicPlayerSun.contains(e.target) && musicPlayerSun.classList.contains('expanded')) {
            musicPlayerSun.classList.remove('expanded');
        }
    });
    
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
            if (!sessionStorage.getItem('songsData')) {
                sessionStorage.setItem('songsData', JSON.stringify(EDITABLE_CONFIG.SONGS_DATA));
            }
        }
        sessionStorage.removeItem('enteredFromGate');
    });
}

function renderSolarSystemNav() {
    const navItems = [
        { id: 'timeline', name: 'Our Chronicle', color: '#e74c3c', size: 5, orbit: 1, speed: 40 },
        { id: 'book', name: 'The Stardust Tome', color: '#3498db', size: 6, orbit: 2, speed: 60 },
        { id: 'gallery', name: 'Gallery of Ages', color: '#9b59b6', size: 6.5, orbit: 3, speed: 85 },
        { id: 'guide', name: 'Constellation Guide', color: '#f1c40f', size: 4.5, orbit: 4, speed: 35 },
        { id: 'games', name: 'Orion\'s Challenges', color: '#e67e22', size: 7, orbit: 5, speed: 110 },
        { id: 'calendar', name: 'Nebula of Solitude', color: '#2ecc71', size: 5.5, orbit: 6, speed: 50 },
        { id: 'sanctuary', name: 'Inner Sanctum', color: '#1abc9c', size: 5.2, orbit: 7, speed: 70 }
    ];

    const orbitRadii = [12, 18, 24, 30, 36, 42, 48];
    const container = DOM.solarSystemContainer;
    container.querySelectorAll('.orbit, .planet').forEach(el => el.remove());

    navItems.forEach((item, index) => {
        const orbit = document.createElement('div');
        orbit.className = 'orbit';
        orbit.style.cssText = `width: ${orbitRadii[index] * 2}vmin; height: ${orbitRadii[index] * 2}vmin; animation-duration: ${item.speed}s;`;
        
        const planet = document.createElement('div');
        planet.className = 'planet';
        planet.dataset.panelId = item.id;
        planet.style.cssText = `width: ${item.size}vmin; height: ${item.size}vmin; background-color: ${item.color};`;
        
        orbit.appendChild(planet);
        container.appendChild(orbit);

        planet.addEventListener('click', () => {
            if (item.id === 'games') {
                window.location.href = 'game.html';
            } else {
                renderPanel(item.id);
            }
        });
        
        planet.addEventListener('mouseover', () => {
            DOM.planetNameDisplay.textContent = item.name;
            DOM.planetNameDisplay.classList.add('visible');
        });
        planet.addEventListener('mouseout', () => {
            DOM.planetNameDisplay.classList.remove('visible');
        });
    });
}

function renderPanel(panelId) {
    AppState.activePanel = panelId;
    
    if (window.chronicleCleanup) {
        window.chronicleCleanup();
        window.chronicleCleanup = null;
    }
    if (window.nebulaCleanup) {
        window.nebulaCleanup();
        window.nebulaCleanup = null;
    }

    if (panelId === 'home') {
        DOM.mainContent.classList.remove('visible');
        DOM.solarSystemContainer.classList.remove('hidden');
        DOM.backToMenuAsteroid.classList.remove('visible');
        DOM.mainContent.style.backgroundColor = '';
        DOM.mainContent.innerHTML = '';
        return;
    }
    
    DOM.mainContent.classList.add('visible');
    DOM.solarSystemContainer.classList.add('hidden');
    DOM.backToMenuAsteroid.classList.add('visible');
    
    let content = '';
    switch(panelId) {
        case 'timeline': content = getChronicleOfUsHTML(); break;
        case 'book': content = getBookPanelHTML(); break;
        case 'gallery': content = getGalleryPanelHTML(); break;
        case 'guide': content = getGuidePanelHTML(); break;
        case 'calendar': content = getNebulaOfSolitudeHTML(); break;
        case 'sanctuary': content = getSanctuaryPanelHTML(); break;
    }
    DOM.mainContent.innerHTML = content;
    DOM.mainContent.scrollTop = 0;

    DOM.mainContent.style.backgroundColor = (panelId === 'calendar') ? 'transparent' : '';

    if (panelId === 'book') { if (AppState.bookUnlocked) renderBookUI(); else DOM.bookPasswordGate.classList.add('active'); }
    if (panelId === 'gallery') {
        renderGalleryFilters();
        renderGallery();
        // The listener is now added here, safely after the button is created
        $('add-photo-btn').addEventListener('click', () => setupUploadModal('photo'));
    }
    if (panelId === 'calendar') initNebulaOfSolitudeJS();
    if (panelId === 'timeline') initChroniclePanelJS();
    if (panelId === 'guide') initGuidePanelJS();
    if (panelId === 'sanctuary') initSanctuaryPanelJS();
}

function handleMainContentClick(e) {
    const target = e.target;
    const closest = (selector) => target.closest(selector);

    if (closest('.gallery-filter-btn')) {
        const category = closest('.gallery-filter-btn').dataset.category;
        renderGallery(category);
    }
    else if (closest('[data-edit-index]')) {
        openEditor(parseInt(closest('[data-edit-index]').dataset.editIndex, 10));
    }
    else if (closest('[data-delete-index]')) {
        deleteChapter(parseInt(closest('[data-delete-index]').dataset.deleteIndex, 10));
    }
    else if (closest('#add-chapter-btn')) openNewChapterMeta();
    else if (closest('.chapter-item:not(.chapter-actions)')) {
        AppState.currentChapterIndex = parseInt(closest('.chapter-item').dataset.index, 10);
        renderChapterContent(AppState.currentChapterIndex);
    }
    else if (closest('#add-wish-btn')) addWish();
}

// --- MUSIC PLAYER ---
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

    musicPlayerSun.addEventListener('click', (e) => {
        if (!musicPlayerSun.classList.contains('expanded')) {
            musicPlayerSun.classList.add('expanded');
        }
    });

    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const view = e.currentTarget.dataset.view;
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
    
    const savedStateJSON = sessionStorage.getItem('musicPlayerState');
    if (savedStateJSON) {
        const savedState = JSON.parse(savedStateJSON);
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
    if (EDITABLE_CONFIG.SONGS_DATA.length === 0) return;
    const song = EDITABLE_CONFIG.SONGS_DATA[index];
    if (!song) return;
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
        `<div class="playlist-item ${index === AppState.music.currentIndex ? 'active' : ''}" data-index="${index}">
            ${index + 1}. ${song.title}
        </div>`
    ).join('');
    $$('.playlist-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            AppState.music.isPlaying = true; 
            loadSong(parseInt(e.currentTarget.dataset.index, 10));
            $('play-pause-btn').textContent = '⸫';
        });
    });
}

function togglePlay() {
    if (EDITABLE_CONFIG.SONGS_DATA.length === 0) return;
    AppState.music.isPlaying = !AppState.music.isPlaying;
    if (AppState.music.isPlaying) AppState.music.player.play().catch(e=>console.error(e));
    else AppState.music.player.pause();
    $('play-pause-btn').textContent = AppState.music.isPlaying ? '⸫' : '▶️';
}

function toggleShuffle() {
    AppState.music.isShuffled = !AppState.music.isShuffled;
    $('shuffle-btn').classList.toggle('active', AppState.music.isShuffled);
}

function changeSong(direction) {
    if (EDITABLE_CONFIG.SONGS_DATA.length === 0) return;
    if (AppState.music.isShuffled && direction > 0) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * EDITABLE_CONFIG.SONGS_DATA.length);
        } while (newIndex === AppState.music.currentIndex && EDITABLE_CONFIG.SONGS_DATA.length > 1);
        loadSong(newIndex);
        return;
    }

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

function setProgress(e) {
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;
    if (AppState.music.player.duration) AppState.music.player.currentTime = (clickX / width) * AppState.music.player.duration;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return isNaN(minutes) || isNaN(secs) ? '0:00' : `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// --- NEBULA OF SOLITUDE PANEL ---
const getNebulaOfSolitudeHTML = () => `
<div id="nebula-of-solitude">
    <div class="achievement" id="achievement">
        <div class="achievement-title">Achievement Unlocked! 🏆</div>
        <div class="achievement-text" id="achievementText"></div>
    </div>
    <div class="cosmic-therapist" id="therapist"></div>
    <div id="main-container" class="active">
        <div class="nav-orbit">
            <div class="planet-nav planet-1" data-title="The Meeting" data-chapter="0"></div>
            <div class="planet-nav planet-2" data-title="First Words" data-chapter="1"></div>
            <div class="planet-nav planet-3" data-title="Friendship" data-chapter="2"></div>
            <div class="planet-nav planet-4" data-title="Growing Close" data-chapter="3"></div>
            <div class="planet-nav planet-5" data-title="Confession" data-chapter="4"></div>
            <div class="planet-nav planet-6" data-title="Forever" data-chapter="5"></div>
        </div>
        <div class="chapter active" id="chapter-0"><h1 class="chapter-title floating">✨ The Nebula of Solitude ✨</h1><div class="chapter-content"><p>When every day seems like a year, going back into the past gives the impression of having lived for a thousand years. For so long, Nicholas never knew what love was or how it felt to be loved. He kept up the masquerade, and the so-called strong and tough boy was actually feeble and infirm.</p><div class="overthinking-meter"><div class="meter-fill" id="lonelinessMeter"></div></div><p>In a school in Japan, far from his homeland Uganda, Nicholas felt like a forlorn bird in a foreign land. Being tall, with a hot chocolate complexion and a conspicuous husky voice, he stood out like the Tokyo Tower among students.</p><div class="dialogue-container"><div class="dialogue-right"><div class="dialogue-name">ZOYA</div>Meanwhile, in another corner of the world, Zoya sat in a car, looking indifferently at students passing by. "How do you like this school?" her mom asked with deep concern.</div><div class="dialogue-right"><div class="dialogue-name">ZOYA'S THOUGHTS</div>She shrugged, thinking: "Do I have any other options?" The new school didn't have much to look forward to. All she could feel were pressure and loneliness.</div></div><p>Then came the Taiku Taikai - the sports festival. Nicholas stood at the edge of the field with his mathematics book, having no intentions to merge with anybody or partake in any of the games. Then someone approached him out of nowhere.</p><div class="dialogue-container"><div class="dialogue-left"><div class="dialogue-name">NIC'S PERSPECTIVE</div>He rolled his eyes from the book to the ground, observing her from shoes to face. Her hair was long and shiny black, like the strands of heaven; her face was a pale cream color as if she were coming from snowy mountains. She was indeed the epitome of beauty.</div><div class="dialogue-right"><div class="dialogue-name">ZOYA'S PERSPECTIVE</div>"Who's that?" she found herself whispering. He possessed an aura of mysterious allure, tall and lanky, with skin the color of rich, hot chocolate glistening under the sun. When his deep, husky voice resonated through the air, an indescribable sensation coursed through her being.</div></div><div class="mini-game"><h3>🎮 Cosmic Therapist's Wisdom</h3><p style="color: #c8b8db; margin: 20px 0;">Sometimes the universe places exactly the right person in your path at exactly the right time...</p><button class="game-button" id="showTherapistBtn">Receive Cosmic Wisdom</button></div></div></div>
        <div class="chapter" id="chapter-1"><h1 class="chapter-title floating">💫 The Astral Convergence 💫</h1><div class="chapter-content"><div class="dialogue-container"><div class="dialogue-right"><div class="dialogue-name">ZOYA</div>"My name is Zhang Zoya," she said, breaking the ice.</div><div class="dialogue-left"><div class="dialogue-name">NICHOLAS</div>"I'm Nicholas Lubega, and I love mathematics," he talked back. At that moment, his brain was empty - like space itself.</div></div><p>They began talking to each other intimately, like it wasn't our first time meeting. The Taiku Taikai that Nicholas had thought was going to be just a waste of time turned out to be worth attending as the chicken had laid a golden egg in his pocket.</p><p>They shared the same sentiments. Even though she was not a math person, she told him about the difference between mathematics in Japan and China. Nicholas never thought in his life he would ever meet a girl who listened to him talk about mathematics.</p><div class="mini-game"><h3>🥚 Chicken of Destiny Mini-Game</h3><p>Catch the golden eggs of fate!</p><div class="game-score">Affection Points: <span id="eggScore">0</span></div><button class="game-button" id="playEggGameBtn">Play Game</button></div><p>Time is a monkey that shows you its red butt even when you aren't interested. It just moved so fast, and that day was just a summary in his eyes. After the event, he hesitantly said, "See you again," but his heart had remained with her.</p></div></div>
        <div class="chapter" id="chapter-2"><h1 class="chapter-title floating">🌟 The Constellation of Connection 🌟</h1><div class="chapter-content"><p>For the first time in many years, Nicholas thought of sending a Facebook friend request to someone. He was lying flat on his bed, thinking if it was a good or bad idea.</p><div class="mini-game"><h3>📱 Send or Don't Send Game</h3><p>Should Nicholas send the friend request?</p><div id="friendRequestGame"><button class="game-button" data-action="yes">Send Request</button><button class="game-button" data-action="hesitate">Hesitate More</button></div><p id="requestResult" style="margin-top: 20px; color: #ff6b9d;"></p></div><p>That entire night was filled with "what ifs." Would he seem weird? Would she think of him as a stalker? If he sends a friend request and she accepts it, then what happens next?</p><p>The evening of that day, he went back to the dormitory, sat in his study chair, and continued with his normal reading, and guess what? <strong>Ding!</strong> A friend request message had popped up on his screen from Zoya.</p><p>He never knew with whom he should share the news, because literally speaking, even I never thought I would be so happy just to receive a friend request in this life.</p><p>He quickly responded. Now a big question: should he wait for the message or send one? He recalled the date and time: May 25 at 10:06 p.m., and sent the message "Hi Zoya" with a laughing emoji.</p><p>For as long as I can remember, he waited for a reply while looking at the clock. It soon became 12:00, 1:00, and 2:00 when he was still waiting. Finally, he realized the ding was never going to appear. A feeling of having messed up approached him.</p><p>Early in the morning, shame engulfed him. Later after school, he decided to let it go. As I was lying down scrolling, Ding... a message popped up: "Good night Nico". At the eleventh hour, he felt he was in the seventh heaven.</p></div></div>
        <div class="chapter" id="chapter-3"><h1 class="chapter-title floating">🌸 The Orbit of Affection 🌸</h1><div class="chapter-content"><p>From their birthday messages onwards, Nicholas and Zoya started getting close and more closer to each other without even knowing. "I wish you sweet dreams" messages started being sent without feeling awkward.</p><p>On July 17th, 2021, it was Nicholas's birthday. He had always refused to have his birthday celebrated. But to his surprise, at around 11:35 p.m., a message popped up on his phone screen from Zoya.</p><div class="dialogue-container"><div class="dialogue-right"><div class="dialogue-name">ZOYA'S MESSAGE</div>"Good evening, Nico, I don't know if you can read this message before the end of this day or not, but I hope it won't be too late to say 'happy birthday' to you. And, what's more, I made a sequel of the story..."</div></div><p>Nobody else knew how good his feeling was but him. Just after reading the lines he replied back immediately, hoping the talk could be prolonged a little bit longer.</p><p>They met at Miyakonojo library on July 27th. She had arrived early at 12:00 p.m., and he rushed to meet her. They went to Joyful restaurant, and both ordered the same dish - chicken steak.</p><div class="mini-game"><h3>🍗 Chicken Steak Memory Counter</h3><div class="game-score">Chicken Steaks Shared: <span id="chickenCount">1</span></div><button class="game-button" id="addChickenBtn">Add Another Memory</button></div><p>After getting home, a perfect misunderstanding happened. She thought he passed by her home, which made her ask when he will be coming back. She even requested: "Take some photos in Kyoto, I'd like to see where you will be."</p><p>That very night, he sent her a picture of myself - the first picture he ever sent to her. She even sent her own picture showing her fluffy hair after taking a shower in exchange.</p></div></div>
        <div class="chapter" id="chapter-4"><h1 class="chapter-title floating">💖 The Realm of Revelation 💖</h1><div class="chapter-content"><p>November brought with it a decision Nicholas could no longer postpone. He had spent weeks, months even, wrestling with his feelings. Every logical part of his brain told him to be cautious, but his heart had already decided.</p><div class="overthinking-meter"><div class="meter-fill" style="width: 95%;"></div></div><p style="text-align: center; color: #ff6b9d; margin-top: 10px;"><em>Overthinking Level: Critical</em></p><p>The night before, he barely slept. He rehearsed what I would say a hundred times. When the day arrived, he sent her a message: "Can we meet at the sports field after school? There's something I want to tell you."</p><div class="dialogue-container"><div class="dialogue-left"><div class="dialogue-name">NICHOLAS</div>"Zoya, do you remember the first time we talked? Right here, at this field? Since that day, you've been on my mind constantly. I've realized it's so much more than friendship. Zoya, I've fallen in love with you. Completely, utterly, hopelessly in love with you."</div><div class="dialogue-right"><div class="dialogue-name">ZOYA</div>She smiled. That beautiful, genuine smile. "Nico, I was wondering when you would finally say something."</div><div class="dialogue-right"><div class="dialogue-name">ZOYA</div>"I've been falling for you too. Slowly, surely, unexpectedly. Every conversation, every shared moment. You flew through a typhoon just to be at an event where I would be. How could I not fall in love with you? So yes, Nicholas Lubega. Yes to everything."</div></div><div class="mini-game"><h3>💕 Heart Frequency Sync</h3><p>Click in rhythm with the heartbeat!</p><div class="game-score">Synchronization: <span id="heartSync">0</span>%</div><button class="game-button" id="heartButton">💓 Click</button></div><p>They stood there on that sports field, where it all began, holding hands and smiling at each other like they were the only two people in the world. The autumn sun was setting, painting the sky in beautiful shades of pink and orange.</p><p>"So," he said with a nervous laugh, "what do we do now?"</p><p>She squeezed his hand. "Now? We figure it out together. One step at a time."</p></div></div>
        <div class="chapter" id="chapter-5"><h1 class="chapter-title floating">♾️ The Infinite Cosmos ♾️</h1><div class="chapter-content"><p>The months that followed were the happiest of their lives. Having each other felt like a dream they never wanted to wake up from. They took things slow, learning how to be in a relationship while still maintaining their studies and friendships.</p><p>Their dates were simple but meaningful. Library study sessions that would end with coffee and talking for hours. Walks around campus, holding hands and enjoying the changing seasons. Weekend visits to her home, where her father would always insist on cooking for them.</p><div class="stats-dashboard"><div class="stat-card"><div class="stat-label">Days Since Meeting</div><div class="stat-number" id="daysSinceMeeting">Loading...</div></div><div class="stat-card"><div class="stat-label">Days Since Confession</div><div class="stat-number" id="daysSinceConfession">Loading...</div></div><div class="stat-card"><div class="stat-label">Chicken Steaks Shared</div><div class="stat-number">∞</div></div><div class="stat-card"><div class="stat-label">Overthinking Episodes</div><div class="stat-number">473</div></div><div class="stat-card"><div class="stat-label">Messages Exchanged</div><div class="stat-number">12,847</div></div><div class="stat-card"><div class="stat-label">Stars Witnessing</div><div class="stat-number" id="starCounter">1,000,000</div></div></div><p>Nicholas, the boy who hid behind mathematics books, learned to open his heart. Zoya, the girl who felt alone in a new school, found someone who understood her completely. Together, they built something beautiful.</p><p>This is their love story. Not perfect, but perfectly theirs. And they're still writing it, one day at a time, one memory at a time, one "I love you" at a time.</p><p style="text-align: center; font-size: 28px; color: #ff6b9d; margin: 50px 0;">From the sports field where we met, to the library where we studied, to the bicycle that brought us together, to the typhoon that couldn't keep us apart, to the confessions under the autumn sky - every moment has been a page in our book.</p><p style="text-align: center; font-size: 24px; color: #c06bff; margin: 30px 0;">And the best part? There are so many pages left to write.</p><div style="text-align: center; margin: 60px 0; font-size: 32px; color: #fff;"><p>With all our love,</p><p style="background: linear-gradient(45deg, #ff6b9d, #c06bff); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; font-size: 48px; font-weight: bold; margin: 20px 0;">Nini & Zoya</p><p style="font-size: 18px; font-style: italic; color: #c8b8db; margin-top: 30px;">P.S. He still talks about mathematics, and she still listens with genuine interest. Some things never change, and they wouldn't want them to.</p></div><div class="mini-game" style="margin-top: 80px;"><h3>✨ Find the Hidden Star ✨</h3><p>Click around the screen to find the secret star and unlock a special message...</p><div id="secretMessage" style="display: none; margin-top: 20px; padding: 20px; background: rgba(255, 107, 157, 0.2); border-radius: 15px;"><p style="color: #ff6b9d; font-style: italic;">"In a universe of infinite possibilities, our souls found each other. That's not coincidence - that's destiny."</p></div></div></div></div>
        <div class="scroll-indicator">Scroll to explore</div>
    </div>
</div>
`;

function initNebulaOfSolitudeJS() {
    const nebulaContainer = $('nebula-of-solitude');
    if (!nebulaContainer) return;

    let currentChapter = 0;
    let eggScore = 0;
    let chickenCount = 1;
    let heartClicks = 0;
    let starCounterInterval;
    let therapistInterval;
    let hesitateCount = 0;
    let lastHeartClick = 0;
    let secretStarFound = false;

    const therapistMessages = [ "Remember: Stars don't ghost you. ✨", "Nic, maybe don't send that 3 a.m. message... or do. Love is chaos. 💫", "Overthinking is just love doing mathematics. It's beautiful. 🧮", "The universe aligned for you two. Stop doubting cosmic GPS. 🌌", "Sometimes the best love stories start with a math book. 📚" ];

    const showAchievement = (text) => { const achievement = nebulaContainer.querySelector('#achievement'); nebulaContainer.querySelector('#achievementText').textContent = text; achievement.classList.add('show'); setTimeout(() => achievement.classList.remove('show'), 3000); };
    const showTherapistMessage = () => { const therapist = nebulaContainer.querySelector('#therapist'); const randomMessage = therapistMessages[Math.floor(Math.random() * therapistMessages.length)]; therapist.textContent = randomMessage; therapist.classList.add('active'); setTimeout(() => therapist.classList.remove('active'), 4000); };
    const switchChapter = (num) => { nebulaContainer.querySelectorAll('.chapter').forEach(ch => ch.classList.remove('active')); const chapterEl = nebulaContainer.querySelector('#chapter-' + num); if (chapterEl) { chapterEl.classList.add('active'); currentChapter = num; DOM.mainContent.scrollTo({ top: 0, behavior: 'smooth' }); } };
    const calculateDays = () => { const meetingDate = new Date('2019-09-15'); const confessionDate = new Date('2021-11-01'); const today = new Date(); const daysSinceMeetingEl = nebulaContainer.querySelector('#daysSinceMeeting'); const daysSinceConfessionEl = nebulaContainer.querySelector('#daysSinceConfession'); if (daysSinceMeetingEl) daysSinceMeetingEl.textContent = Math.floor((today - meetingDate) / (1000 * 60 * 60 * 24)).toLocaleString(); if (daysSinceConfessionEl) daysSinceConfessionEl.textContent = Math.floor((today - confessionDate) / (1000 * 60 * 60 * 24)).toLocaleString(); };
    const startStarCounter = () => { let count = 1000000; const starCounterEl = nebulaContainer.querySelector('#starCounter'); if (!starCounterEl) return; starCounterInterval = setInterval(() => { count += Math.floor(Math.random() * 100); starCounterEl.textContent = count.toLocaleString(); }, 2000); };

    const handleNebulaClick = (e) => {
        const target = e.target;
        if (target.closest('.planet-nav')) { switchChapter(target.closest('.planet-nav').getAttribute('data-chapter')); }
        else if (target.id === 'showTherapistBtn') { showTherapistMessage(); }
        else if (target.id === 'playEggGameBtn') { eggScore += Math.floor(Math.random() * 5) + 1; nebulaContainer.querySelector('#eggScore').textContent = eggScore; showAchievement('Golden Egg Caught! +' + eggScore + ' Affection Points'); }
        else if (target.closest('#friendRequestGame button')) { const action = target.dataset.action; const result = nebulaContainer.querySelector('#requestResult'); if (action === 'yes') { result.textContent = '✨ Friend request sent! But wait... she sent one first! 💫'; result.style.color = '#ff6b9d'; } else { hesitateCount++; if (hesitateCount > 3) result.textContent = '☄️ A comet flies by: "You missed your chance... just kidding, she sent one anyway!"'; else result.textContent = '🤔 Still overthinking... (' + (4 - hesitateCount) + ' more clicks to miss)'; } }
        else if (target.id === 'addChickenBtn') { chickenCount++; nebulaContainer.querySelector('#chickenCount').textContent = chickenCount; if (chickenCount === 10) showAchievement('Chicken Steak Connoisseur! 🍗'); }
        else if (target.id === 'heartButton') { const now = Date.now(); if ((now - lastHeartClick) > 500 && (now - lastHeartClick) < 1200) { heartClicks++; const sync = Math.min(heartClicks * 20, 100); nebulaContainer.querySelector('#heartSync').textContent = sync; if (sync === 100) { showAchievement('Perfect Synchronization! 💕'); target.textContent = '💖 Synced!'; } } else { heartClicks = 0; nebulaContainer.querySelector('#heartSync').textContent = '0'; } lastHeartClick = now; }
        else if (currentChapter == 5 && !secretStarFound && Math.random() > 0.8) { secretStarFound = true; nebulaContainer.querySelector('#secretMessage').style.display = 'block'; showAchievement('Secret Star Found! ⭐'); }
    };
    const handleScroll = () => { const indicator = nebulaContainer.querySelector('.scroll-indicator'); if (indicator) indicator.style.opacity = (DOM.mainContent.scrollTop > 100) ? '0' : '1'; };

    nebulaContainer.addEventListener('click', handleNebulaClick);
    DOM.mainContent.addEventListener('scroll', handleScroll);

    setTimeout(() => { const meter = nebulaContainer.querySelector('#lonelinessMeter'); if(meter) meter.style.width = '85%'; }, 1000);
    calculateDays();
    startStarCounter();
    therapistInterval = setInterval(() => { if (Math.random() > 0.7 && currentChapter < 3) showTherapistMessage(); }, 15000);
    
    window.nebulaCleanup = () => { clearInterval(starCounterInterval); clearInterval(therapistInterval); nebulaContainer.removeEventListener('click', handleNebulaClick); DOM.mainContent.removeEventListener('scroll', handleScroll); };
}

// --- ALL OTHER FUNCTIONS ---
const getBookPanelHTML = () => `<div id="book-reader-panel" class="content-panel active"><h2 class="panel-header">The Stardust Tome</h2><p class="panel-subheader">Our complete story, written in the stars.</p><div class="book-actions-sticky"><button class="btn primary" id="add-chapter-btn">✏️ Add New Chapter</button></div><div class="book-layout"><div id="chapter-list-container"></div><div id="chapter-content-container"></div></div></div>`;
const getGalleryPanelHTML = () => `<div id="gallery-panel" class="content-panel active"><h2 class="panel-header">Gallery of Ages</h2><p class="panel-subheader">Our journey through time, captured in precious moments.</p><div id="gallery-filters"></div><div style="text-align: center; margin: 1rem 0;"><button id="add-photo-btn" class="btn primary">🖼️ Add New Photo</button></div><hr><div id="gallery-grid"></div></div>`;

// --- NEW/UPDATED PANEL HTML ---
const getChronicleOfUsHTML = () => `
<style>
    @keyframes pulse-text { 0%, 100% { opacity: 0.8; text-shadow: 0 0 8px var(--gold); } 50% { opacity: 1; text-shadow: 0 0 16px var(--gold); } }
    
    #relationship-counter-detailed { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 20px; background: rgba(17, 12, 31, 0.6); padding: 20px; border-radius: 12px; border: 1px solid rgba(255, 215, 0, 0.2); text-align: center; }
    .counter-unit { font-family: var(--font-body); color: var(--text-secondary); font-size: 1rem; min-width: 90px; }
    .counter-unit span { display: block; font-family: var(--font-display); font-size: 2.2rem; color: var(--gold); text-shadow: 0 0 8px var(--gold); margin-bottom: 5px; }
    .prophecy-container { text-align: center; margin: 2rem 0; font-family: var(--font-handwriting); font-size: 1.8rem; color: var(--gold-light); min-height: 2.5rem; }
    #prophecy-text { animation: pulse-text 4s infinite ease-in-out; transition: opacity 1s ease-in-out; }
    
    .timeline-calendar-container { display: grid; grid-template-columns: 400px 1fr; gap: 30px; background: var(--space-black); padding: 25px; border-radius: 15px; border: 1px solid rgba(255, 215, 0, 0.2); box-shadow: 0 10px 40px rgba(0,0,0,0.5); margin-top: 2rem; }
    .calendar-left-panel, .calendar-right-panel { background: #0a192f; padding: 20px; border-radius: 10px; }
    .calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .calendar-header h3 { font-family: var(--font-display); color: var(--gold-light); font-size: 1.5rem; margin: 0; }
    .calendar-header button { background: none; border: none; color: var(--gold); font-size: 2rem; cursor: pointer; }
    .calendar-grid-header, .calendar-grid-body { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; }
    .calendar-grid-header span { color: var(--text-secondary); font-size: 0.8rem; margin-bottom: 10px; }
    .calendar-day { height: 40px; display: flex; align-items: center; justify-content: center; color: var(--text-primary); border-radius: 50%; transition: var(--transition-fast); }
    .calendar-day.other-month { color: var(--text-secondary); opacity: 0.5; }
    .calendar-day.has-event { font-weight: bold; border: 1px solid var(--soft-violet); cursor: pointer; }
    .calendar-day.has-event:hover { background: var(--soft-violet); color: var(--space-black); }
    .calendar-day.selected-day { background: var(--gold); color: var(--deep-purple); font-weight: bold; box-shadow: 0 0 15px var(--gold); }

    .date-display { display: flex; align-items: flex-start; gap: 20px; border-bottom: 1px solid rgba(255, 215, 0, 0.2); padding-bottom: 20px; margin-bottom: 20px; }
    #cal-selected-day-num { font-family: var(--font-display); font-size: 5rem; line-height: 1; color: var(--text-primary); }
    #cal-selected-day-name { font-size: 1.5rem; color: var(--text-primary); }
    .weather { color: var(--text-secondary); }
    #event-details-container { min-height: 200px; }
    .event-card { background: rgba(2, 4, 27, 0.5); border-radius: 8px; padding: 15px; border-left: 3px solid var(--gold); }
    .event-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .event-card-header h4 { font-family: var(--font-handwriting); font-size: 2rem; color: var(--gold); margin: 0; }
    .event-card-header button { background: none; border: none; color: var(--text-secondary); cursor: pointer; font-size: 1rem; }
    .event-card-header button:hover { color: var(--gold); }
    .event-location { color: var(--text-secondary); margin-bottom: 10px; font-style: italic; }
    .event-description { color: var(--gold-light); line-height: 1.6; }
    .timeline-controls { display: flex; justify-content: space-between; margin-top: 20px; }
    .timeline-actions { margin-top: 20px; text-align: center; }
    #add-timeline-event-btn { background: var(--gold); color: var(--deep-purple); font-family: var(--font-display); }
    
    #timeline-event-modal .text-input { margin-bottom: 1rem; }
    #timeline-event-modal h3 { font-family: var(--font-display); color: var(--gold); margin-bottom: 1rem; }

    .then-now-container { max-width: 500px; margin: 2rem auto 0 auto; }
    .comparison-slider { 
        position: relative; 
        width: 100%; 
        aspect-ratio: 4/3; 
        overflow: hidden; 
        border-radius: 0.75rem; 
        box-shadow: 0 10px 25px rgba(0,0,0,0.4); 
        border: 1px solid var(--gold); 
        user-select: none; 
    }
    .comparison-slider img { 
        position: absolute; 
        width: 100%; 
        height: 100%; 
        object-fit: cover; 
        pointer-events: none; 
        transition: opacity 0.3s ease-in-out; 
    }
    .comparison-slider .img-bottom { filter: grayscale(100%); }
    .comparison-slider .img-top { 
        clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%); 
        transition: clip-path 0.5s cubic-bezier(0.77, 0, 0.175, 1);
    }
    .slider-line {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 100%;
        width: 4px;
        background-color: white;
        pointer-events: none;
        transition: left 0.5s cubic-bezier(0.77, 0, 0.175, 1);
        z-index: 10;
    }
    .slider-buttons {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 1rem;
        z-index: 20;
    }
    .slider-buttons .btn {
        background: rgba(255, 255, 255, 0.8);
        color: var(--deep-purple);
        border: none;
        backdrop-filter: blur(5px);
    }
    
    @media (max-width: 900px) {
        .timeline-calendar-container { grid-template-columns: 1fr; }
        #cal-selected-day-num { font-size: 4rem; }
    }
</style>
<div id="chronicle-panel" class="content-panel active">
    <h2 class="panel-header">The Chronicle of Us</h2>
    <p class="panel-subheader">A living testament to our journey, measured in moments and marked by falling stars.</p>
    
    <div id="relationship-counter-detailed">
        <div class="counter-unit"><span id="rel-years">0</span>Years</div>
        <div class="counter-unit"><span id="rel-months">0</span>Months</div>
        <div class="counter-unit"><span id="rel-weeks">0</span>Weeks</div>
        <div class="counter-unit"><span id="rel-days">0</span>Days</div>
        <div class="counter-unit"><span id="rel-hours">0</span>Hours</div>
        <div class="counter-unit"><span id="rel-minutes">0</span>Minutes</div>
        <div class="counter-unit"><span id="rel-seconds">0</span>Seconds</div>
        <div class="counter-unit"><span id="rel-ms">000</span>Milliseconds</div>
    </div>
    <div class="prophecy-container"><p id="prophecy-text"></p></div>
    <hr>
    <div class="timeline-calendar-container">
        <div class="calendar-left-panel">
            <div class="calendar-header">
                <button id="cal-prev-month">‹</button>
                <h3 id="cal-month-year"></h3>
                <button id="cal-next-month">›</button>
            </div>
            <div class="calendar-grid-header">
                <span>SU</span><span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span>
            </div>
            <div class="calendar-grid-body" id="cal-body"></div>
        </div>
        <div class="calendar-right-panel">
            <div class="date-display">
                <div id="cal-selected-day-num">--</div>
                <div>
                    <span id="cal-selected-day-name">Select a Date</span>
                    <div class="weather">32° ☀️ Sunny</div>
                </div>
            </div>
            <div id="event-details-container"></div>
            <div class="timeline-controls">
                <button id="timeline-prev-event" class="btn">‹ Previous Event</button>
                <button id="timeline-next-event" class="btn">Next Event ›</button>
            </div>
            <div class="timeline-actions">
                <button id="add-timeline-event-btn" class="btn primary">Add New Timeline Event</button>
            </div>
        </div>
    </div>
    <hr>
    <div class="then-now-container">
        <h3 class="panel-header" style="font-size: 2rem; text-align: center;">A Glimpse Through Time</h3>
         <p class="panel-subheader" style="text-align: center;">From past to present, our story unfolds.</p>
        <div class="comparison-slider" id="comparison-slider">
            <img src="" class="img-bottom" alt="Then photo" id="then-vs-now-then-img">
            <img src="" class="img-top" alt="Now photo" id="then-vs-now-now-img">
            <div class="slider-line" id="slider-line"></div>
            <div class="slider-buttons">
                <button id="then-btn" class="btn">THEN</button>
                <button id="now-btn" class="btn">NOW</button>
            </div>
        </div>
    </div>
    
    <div id="timeline-event-modal" class="modal">
        <div class="modal-content" style="max-width:500px">
             <h3 id="timeline-modal-title">New Timeline Event</h3>
             <input type="date" id="timeline-modal-date" class="text-input">
             <input type="text" id="timeline-modal-title-input" class="text-input" placeholder="Event Title">
             <textarea id="timeline-modal-desc" class="text-input" rows="4" placeholder="Description of what happened..."></textarea>
             <input type="hidden" id="timeline-modal-edit-index">
             <div class="modal-actions">
                 <button class="btn" id="timeline-modal-cancel">Cancel</button>
                 <button class="btn primary" id="timeline-modal-save">Save Event</button>
             </div>
        </div>
    </div>
</div>`;

const getGuidePanelHTML = () => `
<div id="guide-panel" class="content-panel active">
    <h2 class="panel-header">Constellation Guide</h2>
    <p class="panel-subheader">A holographic archive containing the core data of our universe. Select a data file to analyze.</p>
    <div class="holodeck-interface">
        <div class="holodeck-tabs">
            <button class="holo-tab active" data-tab="physics">Physics of "Us"</button>
            <button class="holo-tab" data-tab="anatomy">Anatomy of Us</button>
            <button class="holo-tab" data-tab="artifacts">Artifacts</button>
            <button class="holo-tab" data-tab="lexicon">Lexicon</button>
        </div>
        <div class="holodeck-content">
            <div class="holo-pane active" id="tab-physics">
                <h3>File: Relational Physics</h3>
                <p>The fundamental laws governing our interactions.</p>
                <div class="physics-formula">
                    L<sub>love</sub> = <sup>(N<sub>ic</sub> · Z<sub>oya</sub>)<sup>k</sup></sup>⁄<sub>d²</sub>
                </div>
                <ul class="data-list">
                    <li><strong>Law of Emotional Gravity:</strong> The inexplicable force that pulls us together, regardless of distance.</li>
                    <li><strong>The Zoya Constant:</strong> The baseline level of happiness and stability in our shared universe.</li>
                    <li><strong>Atmospheric Phenomena:</strong> Our emotional states often correlate with external weather patterns, linking our inner world to the outer.</li>
                    <li><strong>Parallel Universes Theorem:</strong> A theory suggesting that in every possible timeline, our paths were destined to cross.</li>
                </ul>
            </div>
            <div class="holo-pane" id="tab-anatomy">
                <h3>File: Sentient Analysis</h3>
                <p>A breakdown of our key components and their significance to one another.</p>
                <div class="anatomy-display">
                    <div class="anatomy-figure" id="nic-figure">
                        <h4>Nic</h4>
                        <div class="anatomy-point" data-desc="The mind that sees beauty in logic and finds solutions in chaos.">Mind</div>
                        <div class="anatomy-point" data-desc="The heart that learned to open up, revealing immense warmth and kindness.">Heart</div>
                        <div class="anatomy-point" data-desc="The hands that can fix a bicycle or hold mine with unwavering strength.">Hands</div>
                    </div>
                    <div class="anatomy-figure" id="zoya-figure">
                        <h4>Zoya</h4>
                        <div class="anatomy-point" data-desc="The mind that sees the world as a canvas, full of color, beauty, and potential.">Mind</div>
                        <div class="anatomy-point" data-desc="The heart that is a quiet harbor, offering peace and understanding.">Heart</div>
                        <div class="anatomy-point" data-desc="The hands that create beautiful art and write the next chapter of our story.">Hands</div>
                    </div>
                </div>
                <div id="anatomy-tooltip"></div>
            </div>
            <div class="holo-pane" id="tab-artifacts">
                <h3>File: Significant Artifacts</h3>
                <p>Objects that have gained celestial importance through shared experience.</p>
                 <div class="artifact-grid">
                    <div class="artifact-item" data-title="The Math Book" data-desc="A shield against the world that became a beacon for a new connection.">📖</div>
                    <div class="artifact-item" data-title="The Broken Bicycle" data-desc="A symbol of the first act of selfless kindness that brought our orbits closer.">🚲</div>
                    <div class="artifact-item" data-title="The First Drawing" data-desc="Two people dancing, a sketch of a future neither of us knew we were starting.">🎨</div>
                    <div class="artifact-item" data-title="The Joyful Chicken Steak" data-desc="Our first shared meal, the official dish of our burgeoning love.">🍗</div>
                </div>
                 <div id="artifact-tooltip"></div>
            </div>
            <div class="holo-pane" id="tab-lexicon">
                <h3>File: Shared Language (The Rosetta Stone)</h3>
                <p>A decoder for our unique vocabulary and inside jokes.</p>
                <dl class="lexicon-list">
                    <dt>Micro Trip</dt><dd>A small, spontaneous adventure, usually involving snacks.</dd>
                    <dt>Panda Cuddle</dt><dd>The highest form of cozy comfort, requiring maximum fluffiness.</dd>
                    <dt>Toast Emergency</dt><dd>A sudden, non-negotiable, and urgent need for a snack.</dd>
                    <dt>Silly Goose Time</dt><dd>An official period dedicated to being completely ridiculous together.</dd>
                </dl>
            </div>
        </div>
    </div>
</div>`;

const getSanctuaryPanelHTML = () => `
<div id="sanctuary-panel" class="content-panel active">
    <h2 class="panel-header">Inner Sanctum</h2>
    <p class="panel-subheader">This is the heart of our universe. Each node represents a core aspect of our bond. Interact to explore.</p>
    <div class="sanctuary-container">
        <div class="sanctuary-core">
            <div class="core-pulse"></div>
            <span>Our<br>Heart</span>
        </div>
        <div class="sanctuary-node" data-node="vows" style="--angle: 0deg;">Vows</div>
        <div class="sanctuary-node" data-node="comfort" style="--angle: 51.4deg;">Comfort</div>
        <div class="sanctuary-node" data-node="growth" style="--angle: 102.8deg;">Growth</div>
        <div class="sanctuary-node" data-node="creations" style="--angle: 154.2deg;">Creations</div>
        <div class="sanctuary-node" data-node="future" style="--angle: 205.6deg;">Future</div>
        <div class="sanctuary-node" data-node="protocol" style="--angle: 257deg;">Protocol</div>
        <div class="sanctuary-node" data-node="notes" style="--angle: 308.4deg;">Notes</div>
    </div>
    <div id="sanctuary-modal" class="modal">
        <div class="modal-content">
             <button id="sanctuary-modal-close" class="modal-close-btn">×</button>
            <h3 id="sanctuary-modal-title"></h3>
            <div id="sanctuary-modal-content"></div>
        </div>
    </div>
</div>`;

// --- JS FOR NEW INTERACTIVE PANELS ---
function initChroniclePanelJS() {
    // --- STATE AND HELPERS ---
    let currentEventIndex = 0;
    let displayedDate = new Date();
    const PROPHECIES = [ "In the infinite scroll of the cosmos, our chapter is written in starlight.", "Two souls, one orbit, bound by a gravity stronger than any star.", "Fate whispered your name in the solar winds, and my heart knew to listen.", "Every shared glance is a supernova, birthing new galaxies within us.", "Like twin stars, we dance through the darkness, forever illuminating each other's path." ];
    let currentProphecyIndex = 0;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // --- RENDER & LOGIC FUNCTIONS ---
    const updateProphecy = () => {
        const prophecyEl = $('prophecy-text');
        if (!prophecyEl) return;
        prophecyEl.style.opacity = 0;
        setTimeout(() => {
            currentProphecyIndex = (currentProphecyIndex + 1) % PROPHECIES.length;
            prophecyEl.textContent = `"${PROPHECIES[currentProphecyIndex]}"`;
            prophecyEl.style.opacity = 1;
        }, 1000);
    };

    const parseAndSortEvents = () => {
        AppState.chronicleEvents = CHRONICLE_DATA.map(event => {
             // Treat vague dates like 'Jun 2021' as the 15th of that month
            const dateStr = event.year.split(' ').length === 2 ? `${event.year.split(' ')[0]} 15, ${event.year.split(' ')[1]}` : event.year;
            return { ...event, date: new Date(dateStr) };
        }).sort((a, b) => a.date - b.date);
    };

    const findLocation = (desc) => {
        if (desc.toLowerCase().includes('kyoto')) return 'Kyoto, Japan';
        if (desc.toLowerCase().includes('miyakonojo')) return 'Miyakonojo, Japan';
        return 'Our Memories';
    };

    const renderCalendarGrid = () => {
        const year = displayedDate.getFullYear();
        const month = displayedDate.getMonth();
        $('cal-month-year').textContent = `${monthNames[month]} ${year}`;
        const calBody = $('cal-body');
        calBody.innerHTML = '';
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let i = 0; i < firstDay; i++) { calBody.innerHTML += `<div class="calendar-day other-month"></div>`; }
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.textContent = day;
            const eventOnDay = AppState.chronicleEvents.find(e => e.date.getFullYear() === year && e.date.getMonth() === month && e.date.getDate() === day);
            if (eventOnDay) {
                dayEl.classList.add('has-event');
                dayEl.onclick = () => {
                    const eventIndex = AppState.chronicleEvents.indexOf(eventOnDay);
                    displayEvent(eventIndex);
                };
            }
            if (AppState.chronicleEvents[currentEventIndex] && day === AppState.chronicleEvents[currentEventIndex].date.getDate() && month === AppState.chronicleEvents[currentEventIndex].date.getMonth() && year === AppState.chronicleEvents[currentEventIndex].date.getFullYear()) {
                dayEl.classList.add('selected-day');
            }
            calBody.appendChild(dayEl);
        }
    };

    const renderEventDetails = (event, index) => {
        const date = event.date;
        $('cal-selected-day-num').textContent = date.getDate();
        $('cal-selected-day-name').textContent = dayNames[date.getDay()];
        const container = $('event-details-container');
        container.innerHTML = `
            <div class="event-card">
                <div class="event-card-header">
                    <h4>${event.title}</h4>
                    <div>
                        <button class="edit-event-btn" data-index="${index}" title="Edit">✏️</button>
                        <button class="delete-event-btn" data-index="${index}" title="Delete">🗑️</button>
                    </div>
                </div>
                <p class="event-location">📍 ${findLocation(event.desc)}</p>
                <p class="event-description">${event.desc}</p>
            </div>`;
        container.querySelector('.edit-event-btn').onclick = () => openEventModal(index);
        container.querySelector('.delete-event-btn').onclick = () => deleteEvent(index);
    };

    const displayEvent = (index) => {
        if (index < 0 || index >= AppState.chronicleEvents.length) return;
        currentEventIndex = index;
        const event = AppState.chronicleEvents[index];
        displayedDate = new Date(event.date); 
        renderCalendarGrid();
        renderEventDetails(event, index);
    };

    const openEventModal = (index = -1) => {
        const modal = $('timeline-event-modal');
        const title = $('timeline-modal-title');
        const dateInput = $('timeline-modal-date');
        const titleInput = $('timeline-modal-title-input');
        const descInput = $('timeline-modal-desc');
        const editIndexInput = $('timeline-modal-edit-index');
        if (index !== -1) {
            const event = AppState.chronicleEvents[index];
            title.textContent = 'Edit Timeline Event';
            dateInput.value = event.date.toISOString().split('T')[0];
            titleInput.value = event.title;
            descInput.value = event.desc;
            editIndexInput.value = index;
        } else {
            title.textContent = 'Add New Timeline Event';
            dateInput.value = new Date().toISOString().split('T')[0];
            titleInput.value = '';
            descInput.value = '';
            editIndexInput.value = -1;
        }
        modal.classList.add('active');
    };

    const saveEvent = () => {
        const date = new Date($('timeline-modal-date').value);
        const title = $('timeline-modal-title-input').value;
        const desc = $('timeline-modal-desc').value;
        const index = parseInt($('timeline-modal-edit-index').value, 10);
        if (!title || !desc) { alert('Please fill in all fields.'); return; }
        const newEvent = { date, title, desc, icon: '🌟' };
        if (index !== -1) {
            AppState.chronicleEvents[index] = { ...AppState.chronicleEvents[index], ...newEvent };
        } else {
            AppState.chronicleEvents.push(newEvent);
        }
        AppState.chronicleEvents.sort((a, b) => a.date - b.date);
        const newIndex = AppState.chronicleEvents.findIndex(e => e.title === title && e.date.getTime() === date.getTime());
        $('timeline-event-modal').classList.remove('active');
        displayEvent(newIndex !== -1 ? newIndex : 0);
        saveDataToDrive();
    };
    
    const deleteEvent = (index) => {
        if (confirm(`Are you sure you want to delete "${AppState.chronicleEvents[index].title}"?`)) {
            AppState.chronicleEvents.splice(index, 1);
            currentEventIndex = Math.max(0, Math.min(index, AppState.chronicleEvents.length - 1));
            if (AppState.chronicleEvents.length > 0) {
                displayEvent(currentEventIndex);
            } else {
                renderCalendarGrid();
                $('event-details-container').innerHTML = '<p style="text-align:center; color: var(--text-secondary);">No events in your timeline. Add one!</p>';
                 $('cal-selected-day-num').textContent = '--';
                 $('cal-selected-day-name').textContent = 'No Events';
            }
            saveDataToDrive();
        }
    };
    
    const updateDetailedRelationshipCounter = () => {
        const start = EDITABLE_CONFIG.relationshipStart;
        const now = new Date();
        if(!start || isNaN(start.getTime())) return;

        let tempDate = new Date(start);
        
        let years = now.getFullYear() - tempDate.getFullYear();
        tempDate.setFullYear(tempDate.getFullYear() + years);
        if (tempDate > now) {
            years--;
            tempDate.setFullYear(tempDate.getFullYear() - 1);
        }

        let months = now.getMonth() - tempDate.getMonth();
        if (now.getDate() < start.getDate()) {
            months--;
        }
        if (months < 0) {
            months += 12;
        }
        tempDate.setMonth(start.getMonth() + months);
        
        const remainingDiff = now - tempDate;
        let days = Math.floor(remainingDiff / (1000 * 60 * 60 * 24));
        // This can sometimes be off by one day due to month lengths, so we recalculate days more carefully
        
        let dayCalc = new Date(start);
        dayCalc.setFullYear(dayCalc.getFullYear() + years);
        dayCalc.setMonth(dayCalc.getMonth() + months);

        days = Math.floor((now - dayCalc) / (1000 * 60 * 60 * 24));

        const weeks = Math.floor(days / 7);
        const remainingDays = days % 7;

        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ms = now.getMilliseconds();
        
        $('rel-years').textContent = years; 
        $('rel-months').textContent = months; 
        $('rel-weeks').textContent = weeks; 
        $('rel-days').textContent = remainingDays;
        $('rel-hours').textContent = hours; 
        $('rel-minutes').textContent = minutes; 
        $('rel-seconds').textContent = seconds; 
        $('rel-ms').textContent = ms.toString().padStart(3, '0');
    };

    const initThenNowSlider = () => {
        const slider = $('comparison-slider');
        if (!slider) return;

        const imagePairs = EDITABLE_CONFIG.thenVsNow_ImagePairs;
        if (!imagePairs || imagePairs.length === 0) {
            console.warn("Then/Now slider requires 'thenVsNow_ImagePairs' in EDITABLE_CONFIG.");
            return;
        }
        
        const thenImgEl = $('then-vs-now-then-img');
        const nowImgEl = $('then-vs-now-now-img');
        const topImg = slider.querySelector('.img-top');
        const line = $('slider-line');
        const thenBtn = $('then-btn');
        const nowBtn = $('now-btn');
        
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        };

        const loadPairAtIndex = async (index, sidesToUpdate = 'both') => {
            const pair = imagePairs[index];
            if (!pair) return;
            
            if (sidesToUpdate === 'both' || sidesToUpdate === 'then') {
                thenImgEl.style.opacity = 0;
                const thenSrc = await findImageWithExtension(`photos/thenVsNow/${pair.then}`);
                thenImgEl.src = thenSrc;
                thenImgEl.onload = () => thenImgEl.style.opacity = 1;
            }
            if (sidesToUpdate === 'both' || sidesToUpdate === 'now') {
                 nowImgEl.style.opacity = 0;
                const nowSrc = await findImageWithExtension(`photos/thenVsNow/${pair.now}`);
                nowImgEl.src = nowSrc;
                 nowImgEl.onload = () => nowImgEl.style.opacity = 1;
            }
        };

        const advancePair = () => {
            let nextIndex = AppState.thenNowState.currentIndexInAvailable + 1;
            if (nextIndex >= AppState.thenNowState.availableIndices.length) {
                shuffleArray(AppState.thenNowState.availableIndices);
                nextIndex = 0;
            }
            AppState.thenNowState.currentIndexInAvailable = nextIndex;
            return AppState.thenNowState.availableIndices[nextIndex];
        };
        
        const setSliderPosition = (percentage) => {
            if (!topImg || !line) return;
            line.style.left = `${percentage}%`;
            topImg.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
        };

        // --- Slider Setup ---
        AppState.thenNowState.availableIndices = Array.from(Array(imagePairs.length).keys());
        shuffleArray(AppState.thenNowState.availableIndices);
        AppState.thenNowState.currentIndexInAvailable = 0;
        AppState.thenNowState.lastReveal = null;
        const initialPairIndex = AppState.thenNowState.availableIndices[0];
        loadPairAtIndex(initialPairIndex, 'both');
        setSliderPosition(50);

        nowBtn.addEventListener('click', () => {
            setSliderPosition(100);
            if (AppState.thenNowState.lastReveal !== 'now') {
                AppState.thenNowState.lastReveal = 'now';
                const nextPairIndex = advancePair();
                loadPairAtIndex(nextPairIndex, 'then'); // Preload next 'then'
            }
        });
        
        thenBtn.addEventListener('click', () => {
            setSliderPosition(0);
            if (AppState.thenNowState.lastReveal !== 'then') {
                AppState.thenNowState.lastReveal = 'then';
                const nextPairIndex = advancePair();
                loadPairAtIndex(nextPairIndex, 'now'); // Preload next 'now'
            }
        });
    };

    // --- INITIALIZATION ---
    parseAndSortEvents();
    if (AppState.chronicleEvents.length > 0) displayEvent(0); else { renderCalendarGrid(); }
    updateProphecy();
    initThenNowSlider();
    
    // --- STATIC EVENT LISTENERS ---
    $('cal-prev-month').onclick = () => { displayedDate.setMonth(displayedDate.getMonth() - 1); renderCalendarGrid(); };
    $('cal-next-month').onclick = () => { displayedDate.setMonth(displayedDate.getMonth() + 1); renderCalendarGrid(); };
    $('timeline-prev-event').onclick = () => displayEvent((currentEventIndex - 1 + AppState.chronicleEvents.length) % AppState.chronicleEvents.length);
    $('timeline-next-event').onclick = () => displayEvent((currentEventIndex + 1) % AppState.chronicleEvents.length);
    $('add-timeline-event-btn').onclick = () => openEventModal();
    $('timeline-modal-save').onclick = saveEvent;
    $('timeline-modal-cancel').onclick = () => $('timeline-event-modal').classList.remove('active');

    // --- INTERVALS & CLEANUP ---
    const prophecyInterval = setInterval(updateProphecy, 8000);
    const counterInterval = setInterval(updateDetailedRelationshipCounter, 50);
    updateDetailedRelationshipCounter();
    window.chronicleCleanup = () => {
        clearInterval(counterInterval);
        clearInterval(prophecyInterval);
    };
}


function initGuidePanelJS() {
    const tabs = $$('#guide-panel .holo-tab');
    const panes = $$('#guide-panel .holo-pane');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const targetPane = $(`tab-${tab.dataset.tab}`);
            if (targetPane) targetPane.classList.add('active');
        });
    });

    const anatomyPoints = $$('.anatomy-point');
    const anatomyTooltip = $('anatomy-tooltip');
    if (anatomyTooltip) {
        anatomyPoints.forEach(point => {
            point.addEventListener('mouseover', (e) => {
                anatomyTooltip.textContent = e.target.dataset.desc;
                anatomyTooltip.style.display = 'block';
            });
            point.addEventListener('mousemove', (e) => {
                 const mainContentRect = DOM.mainContent.getBoundingClientRect();
                 anatomyTooltip.style.left = `${e.clientX - mainContentRect.left + 15}px`;
                 anatomyTooltip.style.top = `${e.clientY - mainContentRect.top + 15}px`;
            });
            point.addEventListener('mouseout', () => {
                anatomyTooltip.style.display = 'none';
            });
        });
    }

    const artifactItems = $$('.artifact-item');
    const artifactTooltip = $('artifact-tooltip');
    if (artifactTooltip) {
         artifactItems.forEach(item => {
            item.addEventListener('mouseover', (e) => {
                artifactTooltip.innerHTML = `<strong>${e.target.dataset.title}</strong><p>${e.target.dataset.desc}</p>`;
                artifactTooltip.style.display = 'block';
            });
            item.addEventListener('mousemove', (e) => {
                 const mainContentRect = DOM.mainContent.getBoundingClientRect();
                 artifactTooltip.style.left = `${e.clientX - mainContentRect.left + 15}px`;
                 artifactTooltip.style.top = `${e.clientY - mainContentRect.top + 15}px`;
            });
            item.addEventListener('mouseout', () => {
                artifactTooltip.style.display = 'none';
            });
        });
    }
}

function initSanctuaryPanelJS() {
    const nodes = $$('.sanctuary-node');
    const modal = $('sanctuary-modal');
    const modalTitle = $('sanctuary-modal-title');
    const modalContent = $('sanctuary-modal-content');
    const closeModalBtn = $('sanctuary-modal-close');

    const contentData = {
        vows: {
            title: 'The Unbreakable Vows',
            html: `<p>A place for our most serious promises, protected by a secret key.</p>
                   <div class="vow-gate">
                       <input type="password" id="vow-password" class="text-input" placeholder="Secret Key">
                       <button class="btn" id="unlock-vow-btn">Unlock</button>
                   </div>
                   <div id="vow-content" class="hidden-content">
                       <p>"I promise to always listen when you talk about mathematics." - Zoya</p>
                       <p>"I promise to always make you a 'Toast Emergency' snack." - Nic</p>
                       <p>"I promise to cherish your quiet strength and gentle heart." - Nic</p>
                       <p>"I promise to believe in your dreams, even when you doubt them yourself." - Zoya</p>
                   </div>`
        },
        comfort: {
            title: 'Emergency Comfort Kit',
            html: `<p>For when one of us is having a bad day. Press the button for a dose of comfort.</p>
                   <button class="btn primary" id="comfort-btn">Dispense Comfort</button>
                   <div id="comfort-box" class="hidden-content"></div>`
        },
        growth: {
            title: 'Our Synergy',
            html: `<h4>Gratitude Log</h4><p>A living repository of small kindnesses.</p>
                   <ul class="data-list"><li><strong>Oct 8, 2025:</strong> Thank you for making tea for me without me asking. -Z</li><li><strong>Oct 7, 2025:</strong> Thank you for encouraging me when I was stressed about my project. -N</li></ul>
                   <hr>
                   <h4>How We've Grown Together</h4><p>Reflections on the positive ways we've changed each other.</p>
                   <ul class="data-list"><li>Nic has learned to open his heart and share his feelings more freely.</li><li>Zoya has found a partner who makes her feel completely understood and at home.</li></ul>`
        },
        creations: {
            title: 'Our Collaborative',
            html: `<h4>Blueprint for a Future Home</h4><p>A shared dream board for a life we'll build together.</p>
                   <ul class="data-list"><li>A cozy library corner for Nic's books and Zoya's reading.</li><li>A bright, airy art studio for Zoya's creations.</li><li>A kitchen perfect for making homemade pasta and emergency toast.</li></ul>
                   <hr>
                   <h4>Shared Pantheon</h4><p>A curated list of things we love to enjoy <em>together</em>.</p>
                   <ul class="data-list"><li><strong>Rainy Day Movie:</strong> Spirited Away</li><li><strong>Long Drive Song:</strong> Our Song 5</li></ul>`
        },
        future: {
            title: 'Letters to Our Future Selves',
            html: `<p>Sealed messages to be unlocked on a future anniversary. What will we tell ourselves?</p>
                   <div class="letter-box">
                       <div class="letter-sealed">✉️ Letter for 5th Anniversary (Sealed Until Aug 25, 2026)</div>
                       <div class="letter-sealed">✉️ Letter for 10th Anniversary (Sealed Until Aug 25, 2031)</div>
                   </div>
                   <hr>
                   <h4>The Olfactory Archive</h4><p>A list of scents that trigger powerful memories.</p>
                   <ul class="data-list"><li><strong>Old Books & Dust:</strong> The smell of the library where we studied.</li><li><strong>Petrichor & Wet Asphalt:</strong> The evening we walked home in the rain.</li></ul>`
        },
        protocol: {
            title: 'The "Pause Button" Protocol',
            html: `<p>Our agreed-upon rules for navigating disagreements with love and humor.</p>
                   <ul class="data-list">
                       <li>The right to invoke 'Silly Goose Time' to break tension.</li>
                       <li>A 'Toast Emergency' must be honored, no questions asked.</li>
                       <li>All arguments must end with a Panda Cuddle.</li>
                    </ul>`
        },
        notes: {
            title: 'Leave a Note',
            html: `<p>Share a memory on our digital corkboard!</p>
                   <div id="notes-container-sanctuary">
                       <form id="note-form-sanctuary" class="note-card">
                           <h3 class="font-bold text-xl mb-4 font-serif">Add Your Note...</h3>
                           <input type="text" id="note-name" class="text-input" placeholder="Your Name" required>
                           <textarea id="note-message" class="text-input" rows="3" placeholder="Your message..." required></textarea>
                           <button type="submit" class="btn primary">Pin it!</button>
                       </form>
                       <div class="note-card">
                           <p>"So happy for you two! I still remember seeing you both walking the halls in high school. Cheers to many more years!"</p>
                           <p class="note-author">- A Friend</p>
                       </div>
                   </div>`
        }
    };
    
    nodes.forEach(node => {
        node.addEventListener('click', () => {
            const nodeKey = node.dataset.node;
            const data = contentData[nodeKey];
            if(data) {
                modalTitle.textContent = data.title;
                modalContent.innerHTML = data.html;
                modal.classList.add('active');

                if(nodeKey === 'vows') {
                    $('unlock-vow-btn').addEventListener('click', () => {
                        const passwordInput = $('vow-password');
                        if (passwordInput.value.toLowerCase().replace(/\s/g, '') === EDITABLE_CONFIG.bookPassword) {
                            $('vow-content').classList.remove('hidden-content');
                            passwordInput.parentElement.style.display = 'none';
                        } else {
                            alert('Incorrect Secret Key.');
                        }
                    });
                }
                if(nodeKey === 'comfort') {
                    $('comfort-btn').addEventListener('click', () => {
                        const comforts = [
                            "Baobei, remember that time we laughed so hard we couldn't breathe? Here's a virtual hug. 🤗",
                            "Take a deep breath. Now, listen to our favorite song. Everything will be okay Zoy.",
                            "Here is a digital coupon for one (1) unlimited hug session.",
                            "I may have done wrong but that doesn't mean I love you no more."
                        ];
                        const comfortBox = $('comfort-box');
                        comfortBox.textContent = comforts[Math.floor(Math.random() * comforts.length)];
                        comfortBox.classList.remove('hidden-content');
                    });
                }
                 if(nodeKey === 'notes') {
                    const noteForm = $('note-form-sanctuary');
                    noteForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        const name = this.querySelector('#note-name').value;
                        const message = this.querySelector('#note-message').value;
                        const noteElement = document.createElement('div');
                        noteElement.className = 'note-card';
                        noteElement.innerHTML = `
                            <p>${message.replace(/</g, "<")}</p>
                            <p class="note-author">- ${name.replace(/</g, "<")}</p>
                        `;
                        $('notes-container-sanctuary').appendChild(noteElement);
                        this.reset();
                    });
                }
            }
        });
    });

    closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function handleBookPasswordAttempt() { if (DOM.bookPasswordInput.value.toLowerCase().replace(/\s/g, '') === EDITABLE_CONFIG.bookPassword) { DOM.bookPasswordGate.classList.remove('active'); AppState.bookUnlocked = true; renderBookUI(); } else { alert('Incorrect password.'); }}
function initQuill(){ 
    if($('quill-editor')) {
        const toolbarOptions = [
            [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'header': 1 }, { 'header': 2 }, 'blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }, { 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ];
        AppState.quill = new Quill('#quill-editor', {
            modules: { toolbar: toolbarOptions },
            theme: 'snow'
        });
    }
}
function renderBookUI(){ renderChapterList(); if (AppState.chapters.length > 0) renderChapterContent(AppState.currentChapterIndex); }
function renderChapterList(){ 
    const container = $('chapter-list-container'); 
    if (container) {
        container.innerHTML = AppState.chapters.map((chap, index) => `
            <div class="chapter-item ${index === AppState.currentChapterIndex ? 'active' : ''}" data-index="${index}">
                <div class="chapter-title">${chap.title}</div>
                <div class="chapter-meta">${new Date(chap.date).toLocaleDateString()}</div>
                <div class="chapter-actions">
                    <button class="chapter-action-btn" data-edit-index="${index}" title="Edit">✏️</button>
                    <button class="chapter-action-btn" data-delete-index="${index}" title="Delete">🗑️</button>
                </div>
            </div>`).join('');
    }
}
function renderChapterContent(index) {
    const container = $('chapter-content-container');
    if (container && AppState.chapters[index]) {
        const chapter = AppState.chapters[index];
        const contentHtml = '<p>' + chapter.content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>') + '</p>';
        container.innerHTML = `<h3>${chapter.title}</h3><p><em>By ${chapter.author} on ${new Date(chapter.date).toLocaleDateString()}</em></p><hr><div>${contentHtml}</div>`;
        $$('#chapter-list-container .chapter-item').forEach(el => el.classList.remove('active'));
        const activeItem = $$(`#chapter-list-container .chapter-item`)[index];
        if (activeItem) activeItem.classList.add('active');
    }
}
function openNewChapterMeta(){ DOM.chapterMetaModal.classList.add('active'); }
function handleContinueMeta() { /* Logic for new chapter */ }
function openEditor(index) {
    const chapter = AppState.chapters[index];
    if (!chapter || !AppState.quill) return;
    AppState.editingChapterIndex = index;
    $('editor-title').textContent = `Editing: ${chapter.title}`;
    AppState.quill.root.innerHTML = chapter.content;
    DOM.editorModal.classList.add('active');
}
function saveChapter() {
    if (AppState.editingChapterIndex === -1 || !AppState.quill) return;
    const newContent = AppState.quill.root.innerHTML;
    AppState.chapters[AppState.editingChapterIndex].content = newContent;
    renderChapterContent(AppState.editingChapterIndex);
    renderChapterList();
    DOM.editorModal.classList.remove('active');
    AppState.editingChapterIndex = -1;
    saveDataToDrive();
}
function deleteChapter(index) {
    const chapter = AppState.chapters[index];
    if (!chapter) return;
    if (confirm(`Are you sure you want to permanently delete the chapter "${chapter.title}"?`)) {
        AppState.chapters.splice(index, 1);
        AppState.currentChapterIndex = 0;
        renderBookUI();
        saveDataToDrive();
    }
}
function renderGalleryFilters() { const container = $('gallery-filters'); if (!container) return; let buttonsHTML = '<button class="btn gallery-filter-btn active" data-category="all">All Events</button>'; for (const [key, value] of Object.entries(EDITABLE_CONFIG.GALLERY_CATEGORIES)) { buttonsHTML += `<button class="btn gallery-filter-btn" data-category="${key}">${value}</button>`; } container.innerHTML = buttonsHTML; }
function renderGallery(category = 'all'){ AppState.currentGalleryCategory = category; const grid = $('gallery-grid'); if(!grid) return; const photosToRender = category === 'all' ? EDITABLE_CONFIG.PHOTOS_DATA : EDITABLE_CONFIG.PHOTOS_DATA.filter(p => p.category === category); grid.innerHTML = photosToRender.map((p,i)=>`<div class="polaroid-item" data-index="${i}"><img src="${p.src}" alt="${p.caption}"><p class="polaroid-caption">${p.caption}</p></div>`).join(''); $$('.gallery-filter-btn').forEach(btn => { btn.classList.toggle('active', btn.dataset.category === category); }); }
function renderSanctuaryWidgets(){ const wf = document.querySelector('.wish-fountain'); if (wf) { wf.innerHTML = `<h4>Wish Fountain</h4><ul id="wish-list"></ul><input class="text-input" id="wish-input"><button class="btn" id="add-wish-btn">Add Wish</button>`; renderWishList(); }}
function renderWishList(){ const wl = $('wish-list'); if (wl) wl.innerHTML = AppState.wishes.map(w=>`<li>${w}</li>`).join(''); }
function addWish(){ const input = $('wish-input'); if (input && input.value) { AppState.wishes.push(input.value); renderWishList(); input.value = ''; }}
function updateRelationshipCounter() { const container = $('relationship-counter'); if (container) { const diff = new Date() - EDITABLE_CONFIG.relationshipStart; container.innerHTML = `<h3>Together For</h3><p>${Math.floor(diff / (1000 * 60 * 60 * 24))} days</p>`; }}

// =================================================================
// ---  NEW: GOOGLE DRIVE INTEGRATION & AUTHENTICATION FUNCTIONS ---
// =================================================================

/**
 * Called when the Google API script is loaded.
 */
function gapiLoad() {
    gapi.load('client', initializeGapiClient);
}

/**
 * Initializes the GAPI client.
 */
async function initializeGapiClient() {
    await gapi.client.init({
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    });
    gapiInited = true;
    checkAuthReady();
}

/**
 * Called when the Google Identity Services script is loaded.
 */
function gisLoad() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: GOOGLE_SCOPES,
        callback: gisTokenCallback,
    });
    gisInited = true;
    checkAuthReady();
}

/**
 * Callback function for the GIS token client.
 */
async function gisTokenCallback(tokenResponse) {
    if (tokenResponse && tokenResponse.access_token) {
        gapi.client.setToken(tokenResponse);
        $('auth-status').textContent = 'Signed in';
        $('signout-button').style.display = 'block';
        $('gsi-button').innerHTML = '';
        await loadDataFromDrive();
    }
}

/**
 * Checks if both GAPI and GIS are initialized, then renders the sign-in button.
 */
function checkAuthReady() {
    if (gapiInited && gisInited) {
        $('auth-status').textContent = 'Ready to sign in';
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: () => {}
        });
        google.accounts.id.renderButton(
            document.getElementById('gsi-button'),
            { theme: "outline", size: "large", text: "signin_with", shape: "rectangular" }
        );
    }
}

/**
 * Handles the sign-out process.
 */
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token, () => {
            gapi.client.setToken('');
            gdriveFileId = null;
            $('auth-status').textContent = 'Signed out';
            $('signout-button').style.display = 'none';
            checkAuthReady();
            alert("You have been signed out. The page will now reload with default data.");
            window.location.reload();
        });
    }
}

/**
 * Main function to load data from Drive after authentication.
 */
async function loadDataFromDrive() {
    $('auth-status').textContent = 'Syncing...';
    try {
        const fileId = await findOrCreateDataFile();
        if (fileId) {
            gdriveFileId = fileId;
            const response = await gapi.client.drive.files.get({
                fileId: gdriveFileId,
                alt: 'media',
            });
            const fileContent = response.body;
            if (fileContent) {
                parseAndLoadCloudData(JSON.parse(fileContent));
                $('auth-status').textContent = 'Sync complete!';
            } else {
                loadDefaultData();
                $('auth-status').textContent = 'Sync complete!';
            }
        }
    } catch (err) {
        console.error("Error loading data from Drive:", err);
        $('auth-status').textContent = 'Sync failed!';
        alert("Could not load data from Google Drive. Using default data. Please check console for errors.");
        loadDefaultData();
    }
}

/**
 * Searches for the data file, or creates it if it doesn't exist with initial data.
 */
async function findOrCreateDataFile() {
    try {
        const response = await gapi.client.drive.files.list({
            q: `name='${DATA_FILE_NAME}' and trashed=false`,
            fields: 'files(id, name)',
            spaces: 'drive',
        });

        if (response.result.files.length > 0) {
            console.log("Found existing data file.");
            return response.result.files[0].id;
        } else {
            console.log("No data file found, creating a new one with initial content.");
            const defaultData = {
                chapters: parseRawBook(RAW_BOOK),
                chronicleEvents: CHRONICLE_DATA,
                photos: INITIAL_DATA.PHOTOS_DATA,
                songs: INITIAL_DATA.SONGS_DATA,
            };

            const fileMetadata = { name: DATA_FILE_NAME, mimeType: 'application/json' };
            
            const form = new FormData();
            form.append('metadata', new Blob([JSON.stringify(fileMetadata)], { type: 'application/json' }));
            form.append('file', new Blob([JSON.stringify(defaultData)], { type: 'application/json' }));

            const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
                method: 'POST',
                headers: new Headers({ 'Authorization': `Bearer ${gapi.client.getToken().access_token}` }),
                body: form,
            });
            const newFile = await res.json();
            console.log("New data file created with ID:", newFile.id);
            return newFile.id;
        }
    } catch (err) {
        console.error("Error finding or creating data file:", err);
        return null;
    }
}

/**
 * Saves the current application state to the Google Drive file.
 */
async function saveDataToDrive() {
    if (!gdriveFileId || isSaving) return;
    isSaving = true;
    $('auth-status').textContent = 'Saving...';
    
    try {
        const dataToSave = {
            chapters: AppState.chapters,
            chronicleEvents: AppState.chronicleEvents,
            photos: EDITABLE_CONFIG.PHOTOS_DATA,
            songs: EDITABLE_CONFIG.SONGS_DATA,
        };

        const response = await gapi.client.request({
            path: `/upload/drive/v3/files/${gdriveFileId}?uploadType=media`,
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSave),
        });
        console.log("Save successful:", response);
        $('auth-status').textContent = 'Sync complete!';
    } catch (err) {
        console.error("Error saving data to Drive:", err);
        $('auth-status').textContent = 'Save failed!';
    } finally {
        isSaving = false;
    }
}

/**
 * Helper function to parse raw book string into chapter objects.
 */
function parseRawBook(rawBook){ 
    return rawBook.split('===CHAPTER===').map(s => s.trim()).filter(Boolean).map(chunk => { 
        const lines = chunk.split('\n'); 
        let chapter = {}, contentStartIndex = -1; 
        lines.forEach((line, index) => { 
            if (line.startsWith('TITLE:')) chapter.title = line.substring(6).trim(); 
            else if (line.startsWith('AUTHOR:')) chapter.author = line.substring(7).trim(); 
            else if (line.startsWith('DATE:')) chapter.date = line.substring(5).trim(); 
            else if (line.startsWith('===CONTENT===')) contentStartIndex = index + 1; 
        }); 
        chapter.content = lines.slice(contentStartIndex).join('\n').trim(); 
        return chapter; 
    });
}

/**
 * Loads the application state from the parsed JSON from Google Drive.
 */
function parseAndLoadCloudData(data) {
    if (data) {
        AppState.chapters = data.chapters || parseRawBook(RAW_BOOK);
        EDITABLE_CONFIG.PHOTOS_DATA = data.photos && data.photos.length > 0 ? data.photos : INITIAL_DATA.PHOTOS_DATA;
        EDITABLE_CONFIG.SONGS_DATA = data.songs && data.songs.length > 0 ? data.songs : INITIAL_DATA.SONGS_DATA;

        AppState.chronicleEvents = (data.chronicleEvents || CHRONICLE_DATA).map(event => ({
            ...event,
            date: new Date(event.date) 
        })).sort((a, b) => a.date - b.date);

        console.log("Loaded data from Google Drive.");
        
        if(AppState.activePanel === 'book') renderBookUI();
        if(AppState.activePanel === 'gallery') renderGallery();
        if(AppState.activePanel === 'timeline') renderPanel('timeline');
        renderPlaylist();
        loadSong(AppState.music.currentIndex);
    } else {
        console.warn("Cloud data is malformed. Loading default data.");
        loadDefaultData();
    }
}

/**
 * Loads the default data from the local JS files.
 */
function loadDefaultData() {
    console.log("Loading default local data.");
    AppState.chapters = parseRawBook(RAW_BOOK);
    EDITABLE_CONFIG.PHOTOS_DATA = INITIAL_DATA.PHOTOS_DATA;
    EDITABLE_CONFIG.SONGS_DATA = INITIAL_DATA.SONGS_DATA;
    AppState.chronicleEvents = CHRONICLE_DATA.map(event => {
        const dateStr = event.year.split(' ').length === 2 ? `${event.year.split(' ')[0]} 15, ${event.year.split(' ')[1]}` : event.year;
        return { ...event, date: new Date(dateStr) };
    }).sort((a, b) => a.date - b.date);
}

// =================================================================
// ---          NEW: FILE UPLOAD FUNCTIONS                     ---
// =================================================================

/**
 * Finds a folder by name or creates it if it doesn't exist.
 */
async function findOrCreateFolder() {
    const q = `mimeType='application/vnd.google-apps.folder' and name='${ASSETS_FOLDER_NAME}' and trashed=false`;
    const response = await gapi.client.drive.files.list({ q });
    if (response.result.files && response.result.files.length > 0) {
        return response.result.files[0].id;
    } else {
        const fileMetadata = {
            'name': ASSETS_FOLDER_NAME,
            'mimeType': 'application/vnd.google-apps.folder'
        };
        const createResponse = await gapi.client.drive.files.create({ resource: fileMetadata, fields: 'id' });
        return createResponse.result.id;
    }
}

/**
 * Uploads a file to Google Drive and makes it publicly readable.
 */
async function uploadFileToDrive(file, folderId) {
    const metadata = {
        name: file.name,
        parents: [folderId]
    };
    
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
        method: 'POST',
        headers: new Headers({ 'Authorization': `Bearer ${gapi.client.getToken().access_token}` }),
        body: form,
    });
    
    const newFile = await res.json();
    
    await gapi.client.drive.permissions.create({
        fileId: newFile.id,
        resource: { role: 'reader', type: 'anyone' }
    });
    
    // This is the correct format for a direct, playable link for audio/video/images
    return `https://drive.google.com/uc?export=download&id=${newFile.id}`;
}

function setupUploadModal(type) {
    const modal = $('upload-modal');
    const title = $('upload-modal-title');
    const textLabel = $('upload-text-label');
    const textInput = $('upload-text-input');
    const fileInput = $('upload-file-input');
    const categoryContainer = $('upload-category-container');
    const categorySelect = $('upload-category-select');
    const saveBtn = $('save-upload-btn');
    const cancelBtn = $('cancel-upload-btn');
    const status = $('upload-status');
    
    fileInput.value = '';
    textInput.value = '';
    status.style.display = 'none';

    if (type === 'photo') {
        title.textContent = 'Upload New Photo';
        textLabel.textContent = 'Photo Caption';
        textInput.placeholder = 'Enter a caption...';
        fileInput.accept = 'image/*';
        
        categoryContainer.style.display = 'block';
        categorySelect.innerHTML = '';
        for (const [key, value] of Object.entries(EDITABLE_CONFIG.GALLERY_CATEGORIES)) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = value;
            categorySelect.appendChild(option);
        }
    } else { // song
        title.textContent = 'Upload New Song';
        textLabel.textContent = 'Song Title';
        textInput.placeholder = 'Enter song title...';
        fileInput.accept = 'audio/*';
        categoryContainer.style.display = 'none';
    }

    modal.classList.add('active');

    const handleCancel = () => {
        modal.classList.remove('active');
        saveBtn.onclick = null;
        cancelBtn.onclick = null;
    };

    const handleSave = async () => {
        const file = fileInput.files[0];
        const text = textInput.value;

        if (!file || !text) {
            alert('Please select a file and enter a title/caption.');
            return;
        }
        
        status.textContent = 'Uploading, please wait... This may take a moment.';
        status.style.display = 'block';
        saveBtn.disabled = true;
        cancelBtn.disabled = true;

        try {
            const folderId = await findOrCreateFolder();
            const fileLink = await uploadFileToDrive(file, folderId);
            
            if (type === 'photo') {
                const newPhoto = { 
                    src: fileLink, 
                    caption: text, 
                    year: new Date().getFullYear(), 
                    category: categorySelect.value 
                };
                EDITABLE_CONFIG.PHOTOS_DATA.push(newPhoto);
                renderGallery();
            } else { // song
                const newSong = { src: fileLink, title: text, artist: 'Nini & Zoya', albumArt: 'photos/photo1.jpg' };
                EDITABLE_CONFIG.SONGS_DATA.push(newSong);
                renderPlaylist();
            }

            await saveDataToDrive();
            handleCancel();

        } catch (err) {
            console.error(`Error uploading ${type}:`, err);
            status.textContent = 'Upload failed. Please try again.';
        } finally {
            saveBtn.disabled = false;
            cancelBtn.disabled = false;
        }
    };

    saveBtn.onclick = handleSave;
    cancelBtn.onclick = handleCancel;
}

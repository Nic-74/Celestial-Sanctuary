const EDITABLE_CONFIG = { 
    bookPassword: "nini", 
    relationshipStart: new Date('2021-08-25T00:00:00'),
    thenVsNow_ImagePairs: [
        { then: 'then1', now: 'now1' }, { then: 'then2', now: 'now2' },
        { then: 'then3', now: 'then3' }, { then: 'then4', now: 'now4' }, 
        { then: 'then5', now: 'now5' }
    ],
    PHOTOS_DATA: [
        { src: `photos/photo1.jpg`, caption: 'Day she cooked Kimuchi fried rice', year: 2024, category: 'cooking' }, { src: `photos/photo2.jpg`, caption: 'Fried rice plus', year: 2024, category: 'cooking' },
        { src: `photos/photo3.jpg`, caption: 'Day she cooked Chicken fried wings', year: 2024, category: 'cooking' }, { src: `photos/photo4.jpg`, caption: 'Arashiyama Observation Deck', year: 2021, category: 'travel' },
        { src: `photos/photo5.jpg`, caption: 'Tenryuji temple in Arashiyama', year: 2022, category: 'travel' }, { src: `photos/photo6.jpg`, caption: 'First Onsen trip', year: 2023, category: 'travel' },
        { src: `photos/photo7.jpg`, caption: 'First day of new year at Yasaka Jinja', year: 2024, category: 'travel' }, { src: `photos/photo8.jpg`, caption: 'Little man', year: 2021, category: 'random' },
        { src: `photos/photo9.jpg`, caption: 'Dont know how to call this..hahahaha', year: 2022, category: 'random' }, { src: `photos/photo10.jpg`, caption: 'A chip Heart', year: 2023, category: 'random' },
        { src: `photos/photo11.jpg`, caption: 'A day home', year: 2021, category: 'intimate' }, { src: `photos/photo12.jpg`, caption: 'Ktoto botanical garden', year: 2022, category: 'intimate' },
        { src: `photos/photo13.jpg`, caption: 'The old good good days', year: 2023, category: 'intimate' }, { src: `photos/photo14.jpg`, caption: 'Shez the prettiest!', year: 2021, category: 'zoya' },
        { src: `photos/photo15.jpg`, caption: 'While in China', year: 2022, category: 'zoya' }, { src: `photos/photo16.jpg`, caption: 'Caught me off gaurd', year: 2021, category: 'nicholas' },
        { src: `photos/photo17.jpg`, caption: 'Just Nicholas', year: 2022, category: 'nicholas' }, { src: `photos/photo18.jpg`, caption: 'Bakinggggg', year: 2024, category: 'random' },
        { src: `photos/photo19.jpg`, caption: 'Random Artifact', year: 2024, category: 'random' }, { src: `photos/photo20.jpg`, caption: 'Lost but found', year: 2025, category: 'random' }
    ],
    SONGS_DATA: Array.from({length: 20}, (_, i) => ({ src: `music/song${i+1}.mp3`, title: `Our Song ${i+1}`, artist: 'Nini & Zoya', albumArt: `photos/photo${(i % 20) + 1}.jpg` })), 
    GALLERY_CATEGORIES: { 'cooking': '🍳 Food', 'travel': '✈️ Trip', 'random': '🎲 Random', 'intimate': '💕 Intimate', 'zoya': '🌸 Zoya', 'nicholas': '📖 Nic' }
};

const AppState = { bookUnlocked: false, activePanel: 'home', chapters: [], currentChapterIndex: 0, currentGalleryCategory: 'all', music: { player: null, isPlaying: false, currentIndex: 0, isShuffled: false }, quill: null, editingChapterIndex: -1, chronicleEvents: [], thenNowState: { availableIndices: [], currentIndexInAvailable: 0, lastReveal: null }, complimentInterval: null };

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

const COMPLIMENTS = [
    "You make my world brighter, baobei.", "Thinking of you, Zoy. ❤️", "Every moment with you is a treasure, baobei.",
    "Zoy, your kindness is a gentle magic.", "Our love story is my favorite, baobei.", "You are my calm in the chaos, Zoy.",
    "Just a random 'I love you', baobei.", "Thank you for being you, Zoy.", "My heart is always with you, baobei."
];

const $ = (id) => document.getElementById(id);
const $$ = (selector) => document.querySelectorAll(selector);

const DOM = {
    landingGate: $('landing-gate'),
    celestialSanctuary: $('celestial-sanctuary'),
    bookPasswordGate: $('book-password-gate'),
    bookPasswordInput: $('book-password-input'),
    unlockBookBtn: $('unlock-book-btn'),
    solarSystemContainer: $('solar-system-container'),
    mainContent: document.querySelector('.main-content'),
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

async function findImageWithExtension(basePath) {
    const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'heic'];
    for (const ext of extensions) {
        const testPath = `${basePath}.${ext}`;
        try {
            const response = await fetch(testPath, { method: 'HEAD' });
            if (response.ok) return testPath;
        } catch (e) {
            continue;
        }
    }
    return `${basePath}.jpg`;
}

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    if (typeof RAW_BOOK !== 'undefined') parseBook(RAW_BOOK);
    
    // On refresh, clear the session storage to force a return to the landing page
    const navigationType = performance.getEntriesByType("navigation")[0].type;
    if (navigationType === 'reload') {
        sessionStorage.removeItem('enteredFromGate');
    }

    initQuill();
    addEventListeners();
    initLandingPage();

    // Inject dynamic CSS keyframes and responsive styles (including Chronicle styles)
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float-compliment {
            0% { opacity: 0; transform: translateY(20px) translateX(0) rotate(0); }
            15% { opacity: 1; transform: translateY(0) translateX(0) rotate(0); }
            90% { opacity: 1; }
            100% { opacity: 0; transform: translateY(var(--y-end, -250px)) translateX(var(--x-end, 0)) rotate(var(--rotation-end, 0)); }
        }
        @media (max-width: 640px) {
            #gallery-grid {
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                gap: 1rem;
            }
            .polaroid-item img {
                border-width: 2px;
            }
            .polaroid-caption {
                font-size: 1rem;
            }
        }
        /* CHRONICLE PANEL STYLES - EXTRACTED FROM getChronicleOfUsHTML */
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
        /* END CHRONICLE PANEL STYLES */
    `;
    document.head.appendChild(style);

    const handleHashNavigation = () => {
        const panelId = window.location.hash.substring(1) || 'home';
        if (sessionStorage.getItem('enteredFromGate') === 'true') {
            renderPanel(panelId);
        }
    };

    window.addEventListener('hashchange', handleHashNavigation, false);
    if (sessionStorage.getItem('enteredFromGate') === 'true') {
        enterSanctuary();
    }
}

function initLandingPage() {
    DOM.landingGate.addEventListener('click', enterSanctuary, { once: true });
    // Landing page particle animation
    const canvas = $('landing-particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    const particleCount = 150;
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = `rgba(255, 215, 0, ${this.opacity})`;
        }
        update() {
            this.x += this.speedX; this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
        }
    }
    for (let i = 0; i < particleCount; i++) { particles.push(new Particle()); }
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
}

function enterSanctuary() {
    sessionStorage.setItem('enteredFromGate', 'true');
    DOM.landingGate.style.transition = 'opacity 0.5s ease-out';
    DOM.landingGate.style.opacity = '0';
    setTimeout(() => {
        DOM.landingGate.style.display = 'none';
        DOM.celestialSanctuary.style.display = 'block';
        initSanctuary();
    }, 500);
}

function initSanctuary() {
    renderSolarSystemNav();
    initMusicPlayer();
    updateRelationshipCounter();
    setInterval(updateRelationshipCounter, 60000);
    const panelId = window.location.hash.substring(1) || 'home';
    renderPanel(panelId);
    initMainParticles();
    addSanctuaryEventListeners();
}

function addEventListeners() {
    DOM.unlockBookBtn.addEventListener('click', handleBookPasswordAttempt);
    DOM.mainContent.addEventListener('click', handleMainContentClick);
    $('continue-meta-btn').addEventListener('click', handleContinueMeta);
    $('cancel-meta-btn').addEventListener('click', () => DOM.chapterMetaModal.classList.remove('active'));
    DOM.saveEditBtn.addEventListener('click', saveChapter);
    DOM.cancelEditBtn.addEventListener('click', () => DOM.editorModal.classList.remove('active'));

    DOM.bookPasswordGate.addEventListener('click', (e) => {
        if (e.target === DOM.bookPasswordGate) {
            DOM.bookPasswordGate.classList.remove('active');
            window.location.hash = 'home';
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
            sessionStorage.setItem('songsData', JSON.stringify(EDITABLE_CONFIG.SONGS_DATA));
        }
    });
}

function addSanctuaryEventListeners() {
     // Menu Logic
     const menuButton = document.getElementById('main-menu-button');
     const menuDropdown = document.getElementById('main-menu-dropdown');
     if(menuButton && menuDropdown) {
         menuButton.addEventListener('click', (e) => {
             e.stopPropagation();
             menuDropdown.classList.toggle('visible');
         });
         document.addEventListener('click', (e) => {
             if (!menuDropdown.contains(e.target) && !menuButton.contains(e.target)) {
                 menuDropdown.classList.remove('visible');
             }
         });
     }

     document.body.addEventListener('dblclick', (e) => {
         const heart = document.createElement('div');
         heart.className = 'floating-hearts';
         heart.textContent = ['✨', '💫', '🌟', '☄️', '💖'][Math.floor(Math.random() * 5)];
         heart.style.left = e.clientX + 'px';
         heart.style.top = e.clientY + 'px';
         document.body.appendChild(heart);
         setTimeout(() => heart.remove(), 3000);
     });
     
     $('mystical-portal').addEventListener('click', function() {
         const surprises = [
             { icon: '🌈', msg: 'You found a rainbow! Your positivity brightens everything!' },
             { icon: '⭐', msg: 'A shooting star passes by! Make a wish together!' },
             { icon: '🦋', msg: 'A mystical butterfly appears! Beauty and grace follow you!' },
             { icon: '🔮', msg: 'The crystal ball reveals: Today will be magical!' },
             { icon: '🎁', msg: 'Secret gift unlocked: An extra reason to smile today!' }
         ];
         const surprise = surprises[Math.floor(Math.random() * surprises.length)];
         const achievement = document.createElement('div');
         achievement.className = 'secret-achievement'; // You might need to define this class
         achievement.innerHTML = `<h4>${surprise.icon} Secret Discovery!</h4><p>${surprise.msg}</p>`;
         document.body.appendChild(achievement);
         setTimeout(() => achievement.remove(), 4000);
         this.style.transform = 'scale(1.3) rotate(360deg)';
         setTimeout(() => { this.style.transform = ''; }, 600);
     });
}

function initMainParticles() {
    const canvas = $('particles-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    const particleCount = 80;
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5; this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25; this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.speedX; this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = `rgba(173, 216, 230, ${this.opacity})`;
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
        }
    }
    for (let i = 0; i < particleCount; i++) { particles.push(new Particle()); }
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        if (typeof renderSolarSystemNav === 'function') { renderSolarSystemNav(); }
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

        planet.addEventListener('click', () => { window.location.hash = item.id; });
        planet.addEventListener('mouseover', () => { DOM.planetNameDisplay.textContent = item.name; DOM.planetNameDisplay.classList.add('visible'); });
        planet.addEventListener('mouseout', () => { DOM.planetNameDisplay.classList.remove('visible'); });
    });
}

function createFloatingCompliment() {
    const complimentEl = document.createElement('div');
    complimentEl.className = 'floating-compliment';
    const compliment = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
    complimentEl.textContent = compliment;
    
    complimentEl.style.left = `${Math.random() * 60 + 20}vw`;
    complimentEl.style.top = `${Math.random() * 60 + 20}vh`;

    const xEnd = (Math.random() - 0.5) * 400; // -200px to 200px
    const yEnd = (Math.random() - 0.5) * 400; // -200px to 200px
    const rotation = (Math.random() - 0.5) * 90; // -45deg to 45deg
    const duration = (Math.random() * 2) + 3; // 3s to 5s

    complimentEl.style.setProperty('--x-end', `${xEnd}px`);
    complimentEl.style.setProperty('--y-end', `${yEnd}px`);
    complimentEl.style.setProperty('--rotation-end', `${rotation}deg`);
    
    complimentEl.style.animationName = 'float-compliment';
    complimentEl.style.animationDuration = `${duration}s`;
    
    document.body.appendChild(complimentEl);
    setTimeout(() => {
        complimentEl.remove();
    }, duration * 1000);
}

function renderPanel(panelId) {
    AppState.activePanel = panelId;

    if (AppState.complimentInterval) { clearInterval(AppState.complimentInterval); AppState.complimentInterval = null; }
    if (window.chronicleCleanup) { window.chronicleCleanup(); window.chronicleCleanup = null; }
    if (window.nebulaCleanup) { window.nebulaCleanup(); window.nebulaCleanup = null; }

    if (panelId === 'home') {
        DOM.mainContent.classList.remove('visible');
        DOM.solarSystemContainer.classList.remove('hidden');
        DOM.mainContent.style.backgroundColor = '';
        DOM.mainContent.style.padding = '100px 5vw 50px 120px'; // Reset default padding
        DOM.mainContent.innerHTML = '';
        
        const chantCompliments = () => {
            const chantCount = Math.floor(Math.random() * 4) + 3; // 3 to 6 compliments
            for (let i = 0; i < chantCount; i++) {
                setTimeout(() => {
                    createFloatingCompliment();
                }, i * (Math.random() * 300 + 200)); // Stagger their appearance
            }
        };

        AppState.complimentInterval = setInterval(chantCompliments, 3000);
        return;
    }
    
    DOM.mainContent.classList.add('visible');
    DOM.solarSystemContainer.classList.add('hidden');
    
    let content = '';
    switch(panelId) {
        case 'timeline': content = getChronicleOfUsHTML(); break;
        case 'book': content = getBookPanelHTML(); break;
        case 'gallery': content = getGalleryPanelHTML(); break;
        case 'guide': content = getGuidePanelHTML(); break;
        case 'games': content = getGamesPanelHTML(); break;
        case 'calendar': content = getNebulaOfSolitudeHTML(); break;
        case 'sanctuary': content = getSanctuaryPanelHTML(); break;
    }
    DOM.mainContent.innerHTML = content;
    DOM.mainContent.scrollTop = 0;

    // Set custom styles for specific panels
    if (panelId === 'calendar') {
        DOM.mainContent.style.backgroundColor = 'transparent';
        DOM.mainContent.style.padding = '0'; // Calendar handles its own padding
    } else if (panelId === 'sanctuary') {
        // Set padding to 0 for the iframe to fill the space cleanly
        DOM.mainContent.style.backgroundColor = '';
        DOM.mainContent.style.padding = '0';
    } else {
        // Reset default padding for other panels
        DOM.mainContent.style.backgroundColor = '';
        DOM.mainContent.style.padding = '100px 5vw 50px 120px'; 
    }

    if (panelId === 'book') { if (AppState.bookUnlocked) renderBookUI(); else DOM.bookPasswordGate.classList.add('active'); }
    if (panelId === 'gallery') {
        renderGalleryFilters();
        renderGallery();
        $('upload-photo-btn')?.addEventListener('click', () => $('photo-upload-input').click());
        $('photo-upload-input')?.addEventListener('change', handleGalleryUpload);
    }
    if (panelId === 'calendar') initNebulaOfSolitudeJS();
    if (panelId === 'timeline') initChroniclePanelJS();
    if (panelId === 'guide') initGuidePanelJS();
    // if (panelId === 'sanctuary') initSanctuaryPanelJS(); // REMOVED: Logic is now in oracle.html (iframe)
    if (panelId === 'games') initGamesPanelJS();
}

function handleMainContentClick(e) {
    const target = e.target;
    const closest = (selector) => target.closest(selector);

    if (closest('.gallery-filter-btn')) { const category = closest('.gallery-filter-btn').dataset.category; renderGallery(category); }
    else if (closest('[data-edit-index]')) { openEditor(parseInt(closest('[data-edit-index]').dataset.editIndex, 10)); }
    else if (closest('[data-delete-index]')) { deleteChapter(parseInt(closest('[data-delete-index]').dataset.deleteIndex, 10)); }
    else if (closest('#add-chapter-btn')) openNewChapterMeta();
    else if (closest('.chapter-item:not(.chapter-actions)')) { AppState.currentChapterIndex = parseInt(closest('.chapter-item').dataset.index, 10); renderChapterContent(AppState.currentChapterIndex); }
    else if (closest('#add-wish-btn')) addWish();
    else if (closest('.hall-card')) { showGamesView(closest('.hall-card').dataset.hall); }
    else if (closest('.back-button')) { showHallsView(); }
    else if (closest('.action-button[data-game]')) { startGame(closest('.action-button').dataset.game, target); }
}

function openUploadCategoryModal(fileReaderResult) {
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
            <div class="form-group">
                <label>Caption</label>
                <input type="text" id="upload-caption-input" class="text-input" placeholder="A new memory...">
            </div>
            <div class="form-group">
                <label>Category</label>
                <div id="upload-category-buttons" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
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
    modalBackdrop.querySelectorAll('.gallery-filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            const caption = $('upload-caption-input').value || "A new memory";
            const category = button.dataset.category;
            const newPhoto = { src: fileReaderResult, caption: caption, year: new Date().getFullYear(), category: category };
            EDITABLE_CONFIG.PHOTOS_DATA.unshift(newPhoto);
            renderGallery(AppState.currentGalleryCategory);
            closeModal();
        });
    });
}

function handleGalleryUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        openUploadCategoryModal(e.target.result);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
}

function handleMusicUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const newSong = { src: e.target.result, title: file.name.replace(/\.[^/.]+$/, "") || "Uploaded Song", artist: "Nini & Zoya", albumArt: `photos/photo${(EDITABLE_CONFIG.SONGS_DATA.length % 20) + 1}.jpg` };
        EDITABLE_CONFIG.SONGS_DATA.push(newSong);
        renderPlaylist();
        loadSong(EDITABLE_CONFIG.SONGS_DATA.length - 1);
        if (!AppState.music.isPlaying) { togglePlay(); }
    };
    reader.readAsDataURL(file);
    event.target.value = '';
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
    const uploadBtn = $('upload-music-btn');
    const musicInput = $('music-upload-input');
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
function formatTime(seconds) { const minutes = Math.floor(seconds / 60); const secs = Math.floor(seconds % 60); return isNaN(minutes) || isNaN(secs) ? '0:00' : `${minutes}:${secs < 10 ? '0' : ''}${secs}`; }

// --- PANEL HTML GETTERS ---
const getBookPanelHTML = () => `<div id="book-reader-panel" class="content-panel active"><h2 class="panel-header">The Stardust Tome</h2><p class="panel-subheader">Our complete story, written in the stars.</p><div class="book-actions-sticky"><button class="btn primary" id="add-chapter-btn">✏️ Add New Chapter</button></div><div class="book-layout"><div id="chapter-list-container"></div><div id="chapter-content-container"></div></div></div>`;
const getGalleryPanelHTML = () => `<div id="gallery-panel" class="content-panel active"><h2 class="panel-header">Gallery of Ages</h2><p class="panel-subheader">Our journey through time, captured in precious moments.</p><div class="upload-button-container"><button class="btn primary" id="upload-photo-btn">🖼️ Upload Photo</button><input type="file" id="photo-upload-input" hidden accept="image/*"></div><div id="gallery-filters"></div><hr><div id="gallery-grid"></div></div>`;
const getGamesPanelHTML = () => `<div id="games-panel" class="content-panel active">
    <header class="header" style="text-align:center;">
        <h1 class="panel-header" style="font-family: var(--font-chinese); font-size: clamp(2.5em, 6vw, 4em);">永恆之愛殿堂</h1>
        <p class="panel-subheader">Temple of Eternal Love</p>
    </header>
    <div id="halls-view">
        <div class="halls-grid">
            <div class="hall-card" data-hall="deep-connection"><img src="photos/Hall of Deep Connection.jpg" alt="Hall of Deep Connection"><div class="hall-overlay"><h2>Hall of Deep Connection</h2></div></div>
            <div class="hall-card" data-hall="interplay"><img src="photos/Sanctuary of Interplay.jpg" alt="Sanctuary of Interplay"><div class="hall-overlay"><h2>Sanctuary of Interplay</h2></div></div>
            <div class="hall-card" data-hall="shared-history"><img src="photos/hall of Shared History.jpg" alt="Gallery of Shared History"><div class="hall-overlay"><h2>Hall of Shared History</h2></div></div>
        </div>
    </div>
    <div id="games-view" style="display: none;">
        <button class="action-button back-button">← Back to Halls</button>
        <div id="deep-connection-games" class="games-section">
            <h2 class="section-title">Hall of Deep Connection</h2>
            <main class="games-grid">
                <div class="game-card"><div class="game-card-header"><span class="card-icon">🔮</span><h2>灵魂共鸣<br>Soul Resonance</h2><p>Answer questions from your shared history to test your cosmic alignment.</p></div><button class="action-button" data-game="soul-quiz">Begin Resonance</button><div id="soul-quiz-content" class="game-content"><div id="soul-question" class="question-box"></div><div id="soul-options"></div><div class="score-display">Harmony: <span id="soul-score">0 / 20</span></div></div></div>
                <div class="game-card"><div class="game-card-header"><span class="card-icon">⚡️</span><h2>爱情能量<br>Lightning Round</h2><p>A rapid-fire quiz with a 10-second timer per question. Three mistakes and the storm ends!</p></div><button class="action-button" data-game="love-meter">Summon Storm</button><div id="love-meter-content" class="game-content"><div id="love-meter-stats" style="display: flex; justify-content: space-around; font-size: 1.2em;"><div>Score: <span id="love-score">0</span></div><div>Lives: <span id="love-lives">❤️❤️❤️</span></div></div><div class="timer-bar-container"><div id="love-timer-bar" class="timer-bar"></div></div><div id="love-question" class="question-box"></div><div id="love-options"></div></div></div>
                <div class="game-card"><div class="game-card-header"><span class="card-icon">🌸</span><h2>天界记忆<br>Celestial Memory Nexus</h2><p>Match the sacred symbols of your journey hidden among the stars.</p></div><button class="action-button" data-game="memory">Enter the Nexus</button><div id="memory-content" class="game-content"><div class="score-display">Moves: <span id="memory-moves">0</span> | Matches: <span id="memory-matches">0/8</span></div><div id="memory-grid" class="memory-grid"></div></div></div>
                <div class="game-card"><div class="game-card-header"><span class="card-icon">🎭</span><h2>真假回忆<br>Two Truths, One Lie</h2><p>Three statements about your story are presented. Two are true, one is false. Can you spot the lie?</p></div><button class="action-button" data-game="two-truths">Begin Deception</button><div id="two-truths-content" class="game-content"><div id="two-truths-options"></div><div id="two-truths-feedback" class="result-display" style="display:none; margin-top:20px;"></div><button class="action-button" onclick="initTwoTruths()" style="display:none; margin: 20px auto 0;">Next Round</button></div></div>
            </main>
        </div>
        <div id="interplay-games" class="games-section">
            <h2 class="section-title">Sanctuary of Interplay</h2>
            <main class="games-grid">
                <div class="game-card"><div class="game-card-header"><span class="card-icon">💬</span><h2>心有灵犀<br>Echoes of the Heart</h2><p>Can you tell who's speaking? Guess if the quote belongs to Nic or Zoya. You have two tries!</p></div><button class="action-button" data-game="echoes-quiz">Hear the Echoes</button><div id="echoes-quiz-content" class="game-content"><div id="echoes-quiz-question" class="question-box"></div><div id="echoes-quiz-options"></div><div id="echoes-quiz-feedback" class="result-display" style="display: none; margin-top: 20px;"></div></div></div>
                <div class="game-card"><div class="game-card-header"><span class="card-icon">🧩</span><h2>星辰拼图<br>Celestial Jigsaw</h2><p>A cherished memory has been shattered! Piece it back together against the clock.</p></div><button class="action-button" data-game="jigsaw">Rebuild Memory</button><div id="jigsaw-content" class="game-content"><div id="jigsaw-controls"><button class="action-button" onclick="showJigsawPreview()">Preview</button><button class="action-button" onclick="retryJigsaw()">Retry</button><button class="action-button" onclick="newJigsaw()">New Picture</button></div><div class="score-display">Time: <span id="jigsaw-timer">0s</span> | Lives: <span id="jigsaw-lives">❤️❤️❤️</span></div><div id="jigsaw-container"><div id="jigsaw-pieces-container"></div><div id="jigsaw-board"></div></div></div></div>
                <div class="game-card"><div class="game-card-header"><span class="card-icon">🃏</span><h2>灵魂塔罗<br>Tarot of Souls</h2><p>Draw from the deck of destiny. Will you face a deep truth, a daring challenge, or a prophecy?</p></div><button class="action-button" data-game="tarot">Consult Oracle</button><div id="tarot-content" class="game-content"><select id="tarot-choice" style="margin-bottom: 20px;"><option value="truth">Truth - 揭示真相</option><option value="dare">Dare - 接受挑战</option><option value="prophecy">Prophecy - 预言未来</option></select><div class="tarot-card" id="tarot-card" onclick="this.classList.toggle('flipped')"><div class="tarot-inner"><div class="tarot-face tarot-back">✨</div><div class="tarot-face tarot-front"><div id="tarot-result-icon" style="font-size: 2em; margin-bottom: 10px;"></div><div id="tarot-result-text" style="font-size: 0.9em;"></div></div></div></div><button class="action-button" onclick="drawTarot()" style="margin-top: 20px;">Draw New Card</button></div></div>
                <div class="game-card"><div class="game-card-header"><span class="card-icon">🥠</span><h2>命运之签<br>Fortune Cookie</h2><p>Break open a cookie from the cosmos. What message does the universe have for you?</p></div><button class="action-button" data-game="fortune">Reveal Fortune</button><div id="fortune-content" class="game-content"><div id="fortune-text" class="result-display success"></div></div></div>
            </main>
        </div>
        <div id="shared-history-games" class="games-section">
            <h2 class="section-title">Hall of Shared History</h2>
            <main class="games-grid" style="max-width: 800px; margin: 0 auto;">
                <div class="game-card"><div class="game-card-header"><span class="card-icon">📜</span><h2>过往的回响<br>Echoes of the Past</h2><p>Relive a moment from your story. The cosmos asks you to remember and reflect on the path you've walked together.</p></div><button class="action-button" data-game="echoes">Hear the Echo</button><div id="echoes-content" class="game-content"><div id="echo-quote" class="question-box"></div><p id="echo-question" style="text-align: center; font-size: 1.3em; color: var(--gold);"></p><button class="action-button" onclick="nextEcho()" style="display: block; margin: 20px auto 0;">Next Echo</button></div></div>
            </main>
        </div>
    </div>
</div>`;
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
const getChronicleOfUsHTML = () => `
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
                    L<sub>love</sub> = <sup>(N<sub>ic</sub> &middot; Z<sub>oya</sub>)<sup>k</sup></sup>&frasl;<sub>d&sup2;</sub>
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
/**
 * Replaces the Sanctuary panel content with an iframe loading oracle.html.
 * This ensures the interactive logic remains in oracle.html's own scope.
 */
const getSanctuaryPanelHTML = () => `
    <div id="sanctuary-panel" class="content-panel active" style="padding: 0; background: none;">
        <iframe src="oracle.html" style="width: 100%; height: 100vh; border: none; overflow-y: auto;"></iframe>
    </div>
`;

// --- JS FOR NEW/UPDATED PANELS ---

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
        }
    };
    
    const updateDetailedRelationshipCounter = () => {
        const start = EDITABLE_CONFIG.relationshipStart;
        const now = new Date();
        if(!start || isNaN(start.getTime())) return;
        let tempDate = new Date(start);
        let years = now.getFullYear() - tempDate.getFullYear();
        tempDate.setFullYear(tempDate.getFullYear() + years);
        if (tempDate > now) { years--; tempDate.setFullYear(tempDate.getFullYear() - 1); }
        let months = now.getMonth() - tempDate.getMonth();
        if (now.getDate() < start.getDate()) { months--; }
        if (months < 0) { months += 12; }
        tempDate.setMonth(start.getMonth() + months);
        let dayCalc = new Date(start);
        dayCalc.setFullYear(dayCalc.getFullYear() + years);
        dayCalc.setMonth(dayCalc.getMonth() + months);
        const days = Math.floor((now - dayCalc) / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(days / 7);
        const remainingDays = days % 7;
        const totalMs = now - start;
        const remainingHoursMs = totalMs % (1000 * 60 * 60 * 24);
        const hours = Math.floor(remainingHoursMs / (1000 * 60 * 60));
        const remainingMinutesMs = remainingHoursMs % (1000 * 60 * 60);
        const minutes = Math.floor(remainingMinutesMs / (1000 * 60));
        const remainingSecondsMs = remainingMinutesMs % (1000 * 60);
        const seconds = Math.floor(remainingSecondsMs / 1000);
        const ms = remainingSecondsMs % 1000;

        const yearsEl = $('rel-years'); if(yearsEl) yearsEl.textContent = years;
        const monthsEl = $('rel-months'); if(monthsEl) monthsEl.textContent = months;
        const weeksEl = $('rel-weeks'); if(weeksEl) weeksEl.textContent = weeks;
        const daysEl = $('rel-days'); if(daysEl) daysEl.textContent = remainingDays;
        const hoursEl = $('rel-hours'); if(hoursEl) hoursEl.textContent = hours;
        const minutesEl = $('rel-minutes'); if(minutesEl) minutesEl.textContent = minutes;
        const secondsEl = $('rel-seconds'); if(secondsEl) secondsEl.textContent = seconds;
        const msEl = $('rel-ms'); if(msEl) msEl.textContent = ms.toString().padStart(3, '0');
    };

    const initThenNowSlider = () => {
        const slider = $('comparison-slider');
        if (!slider) return;
        const imagePairs = EDITABLE_CONFIG.thenVsNow_ImagePairs;
        if (!imagePairs || imagePairs.length === 0) { return; }
        const thenImgEl = $('then-vs-now-then-img');
        const nowImgEl = $('then-vs-now-now-img');
        const topImg = slider.querySelector('.img-top');
        const line = $('slider-line');
        const thenBtn = $('then-btn');
        const nowBtn = $('now-btn');
        const shuffleArray = (array) => { for (let i = array.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [array[i], array[j]] = [array[j], array[i]]; } };
        const loadPairAtIndex = async (index, sidesToUpdate = 'both') => {
            const pair = imagePairs[index]; if (!pair) return;
            if (sidesToUpdate === 'both' || sidesToUpdate === 'then') {
                thenImgEl.style.opacity = 0; const thenSrc = await findImageWithExtension(`photos/thenVsNow/${pair.then}`);
                thenImgEl.src = thenSrc; thenImgEl.onload = () => thenImgEl.style.opacity = 1;
            }
            if (sidesToUpdate === 'both' || sidesToUpdate === 'now') {
                 nowImgEl.style.opacity = 0; const nowSrc = await findImageWithExtension(`photos/thenVsNow/${pair.now}`);
                nowImgEl.src = nowSrc; nowImgEl.onload = () => nowImgEl.style.opacity = 1;
            }
        };
        const advancePair = () => {
            let nextIndex = AppState.thenNowState.currentIndexInAvailable + 1;
            if (nextIndex >= AppState.thenNowState.availableIndices.length) { shuffleArray(AppState.thenNowState.availableIndices); nextIndex = 0; }
            AppState.thenNowState.currentIndexInAvailable = nextIndex; return AppState.thenNowState.availableIndices[nextIndex];
        };
        const setSliderPosition = (percentage) => { if (!topImg || !line) return; line.style.left = `${percentage}%`; topImg.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`; };
        AppState.thenNowState.availableIndices = Array.from(Array(imagePairs.length).keys());
        shuffleArray(AppState.thenNowState.availableIndices);
        AppState.thenNowState.currentIndexInAvailable = 0; AppState.thenNowState.lastReveal = null;
        const initialPairIndex = AppState.thenNowState.availableIndices[0];
        loadPairAtIndex(initialPairIndex, 'both');
        setSliderPosition(50);
        nowBtn.addEventListener('click', () => {
            setSliderPosition(100);
            if (AppState.thenNowState.lastReveal !== 'now') { AppState.thenNowState.lastReveal = 'now'; const nextPairIndex = advancePair(); loadPairAtIndex(nextPairIndex, 'then'); }
        });
        thenBtn.addEventListener('click', () => {
            setSliderPosition(0);
            if (AppState.thenNowState.lastReveal !== 'then') { AppState.thenNowState.lastReveal = 'then'; const nextPairIndex = advancePair(); loadPairAtIndex(nextPairIndex, 'now'); }
        });
    };
    parseAndSortEvents();
    if (AppState.chronicleEvents.length > 0) displayEvent(0); else { renderCalendarGrid(); }
    updateProphecy(); initThenNowSlider();
    $('cal-prev-month').onclick = () => { displayedDate.setMonth(displayedDate.getMonth() - 1); renderCalendarGrid(); };
    $('cal-next-month').onclick = () => { displayedDate.setMonth(displayedDate.getMonth() + 1); renderCalendarGrid(); };
    $('timeline-prev-event').onclick = () => displayEvent((currentEventIndex - 1 + AppState.chronicleEvents.length) % AppState.chronicleEvents.length);
    $('timeline-next-event').onclick = () => displayEvent((currentEventIndex + 1) % AppState.chronicleEvents.length);
    $('add-timeline-event-btn').onclick = () => openEventModal();
    $('timeline-modal-save').onclick = saveEvent;
    $('timeline-modal-cancel').onclick = () => $('timeline-event-modal').classList.remove('active');
    const prophecyInterval = setInterval(updateProphecy, 8000);
    const counterInterval = setInterval(updateDetailedRelationshipCounter, 50);
    updateDetailedRelationshipCounter();
    window.chronicleCleanup = () => { clearInterval(counterInterval); clearInterval(prophecyInterval); };
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
            point.addEventListener('mouseover', (e) => { anatomyTooltip.textContent = e.target.dataset.desc; anatomyTooltip.style.display = 'block'; });
            point.addEventListener('mousemove', (e) => { const mainContentRect = DOM.mainContent.getBoundingClientRect(); anatomyTooltip.style.left = `${e.clientX - mainContentRect.left + 15}px`; anatomyTooltip.style.top = `${e.clientY - mainContentRect.top + 15}px`; });
            point.addEventListener('mouseout', () => { anatomyTooltip.style.display = 'none'; });
        });
    }
    const artifactItems = $$('.artifact-item');
    const artifactTooltip = $('artifact-tooltip');
    if (artifactTooltip) {
         artifactItems.forEach(item => {
            item.addEventListener('mouseover', (e) => { artifactTooltip.innerHTML = `<strong>${e.target.dataset.title}</strong><p>${e.target.dataset.desc}</p>`; artifactTooltip.style.display = 'block'; });
            item.addEventListener('mousemove', (e) => { const mainContentRect = DOM.mainContent.getBoundingClientRect(); artifactTooltip.style.left = `${e.clientX - mainContentRect.left + 15}px`; artifactTooltip.style.top = `${e.clientY - mainContentRect.top + 15}px`; });
            item.addEventListener('mouseout', () => { artifactTooltip.style.display = 'none'; });
        });
    }
}

// REMOVED: initSanctuaryPanelJS as its content is now in the separate oracle.html.

function initNebulaOfSolitudeJS() {
    const nebulaContainer = $('nebula-of-solitude'); if (!nebulaContainer) return;
    let currentChapter = 0, eggScore = 0, chickenCount = 1, heartClicks = 0, starCounterInterval, therapistInterval, hesitateCount = 0, lastHeartClick = 0, secretStarFound = false;
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
    calculateDays(); startStarCounter();
    therapistInterval = setInterval(() => { if (Math.random() > 0.7 && currentChapter < 3) showTherapistMessage(); }, 15000);
    window.nebulaCleanup = () => { clearInterval(starCounterInterval); clearInterval(therapistInterval); nebulaContainer.removeEventListener('click', handleNebulaClick); DOM.mainContent.removeEventListener('scroll', handleScroll); };
}

// --- GAME PANEL LOGIC (INTEGRATED) ---
let gameContentOriginalParent = null;
let activeGameId = null;

function showGamesView(hallId) {
    $('halls-view').style.display = 'none';
    $('games-view').style.display = 'block';
    $$('.games-section').forEach(section => section.style.display = 'none');
    $(hallId + '-games').style.display = 'block';
    DOM.mainContent.scrollTo(0, 0);
}

function showHallsView() {
    closeGame();
    $('games-view').style.display = 'none';
    $('halls-view').style.display = 'block';
    DOM.mainContent.scrollTo(0, 0);
}

const SOUL_QUIZ=[{q:"Where did your first conversation happen?",o:["Library","Sports Field","Classroom"],a:1},{q:"What subject does Nic love talking about?",o:["Art","History","Mathematics"],a:2},{q:"What was your first meal on a date together?",o:["Sushi","Chicken Steak","Ramen"],a:1},{q:"What item of Zoya's did Nic fix?",o:["Her Phone","Her Laptop","Her Bicycle"],a:2},{q:"A typhoon delayed Nic's flight from which city?",o:["Tokyo","Kyoto","Osaka"],a:1},{q:"What was the first picture Zoya sent Nic?",o:["A selfie","Her fluffy hair","A drawing"],a:1},{q:"Nic stood out in school like which landmark?",o:["Mt. Fuji","Tokyo Tower","Imperial Palace"],a:1},{q:"What did Nic draw in his first art class with Zoya?",o:["A portrait","An elephant","Two people dancing"],a:2},{q:"Who sent the Facebook friend request first?",o:["Nic","Zoya","A friend added both"],a:1},{q:"Nic is from Uganda, which he calls the 'Pearl of ___'?",o:["The Nile","Africa","The Savannah"],a:1},{q:"What was Nic's original course in school?",o:["Automotive","General","Special"],a:0},{q:"Who got lost with Nic while trying to find Zoya's house?",o:["Reynaldo","Zion","Hans"],a:2},{q:"What is Zoya's younger sister's name?",o:["Reneleene","Zoie","Curly"],a:1},{q:"Who first broke the ice in your first conversation?",o:["Nic","Hans","Zoya"],a:2},{q:"At what time did Nic send his first 'Hi Zoya' message?",o:["11:35 p.m.","10:06 p.m.","2:00 a.m."],a:1},{q:"What was Zoya's simple reply to meeting at the library?",o:["'Okay, see you then.'","'Fine, I will go there tomorrow.'","'I'd love to!'"],a:1},{q:"What did Zoya's father enjoy cooking for guests?",o:["Barbecue","Sushi","Chicken Steak"],a:0},{q:"What did Zoya think Nic was sending instead of a text message during the 'misunderstanding'?",o:["A gift","He passed by her home","A letter"],a:1},{q:"What airport did Nic fly from during the typhoon?",o:["Narita","Haneda","Kansai"],a:2},{q:"What color was Zoya's skirt at the English club event?",o:["Blue","White","Pink"],a:1}];
const LIGHTNING_QUESTIONS=[{q:"Who sent the Facebook friend request first?",o:["Nic","Zoya"],a:1},{q:"What was Nic's original course?",o:["Automotive","Science"],a:0},{q:"What is Zoya's sister's name?",o:["Zoie","Zoe"],a:0},{q:"Who got lost with Nic looking for Zoya's house?",o:["Hans","Zion"],a:0},{q:"What did Zoya's father enjoy cooking?",o:["Barbecue","Curry"],a:0},{q:"What did Nic draw in the first art class?",o:["An elephant","Two people dancing"],a:1},{q:"Who spoke first when you met?",o:["Nic","Zoya"],a:1}];
const MEMORY_SYMBOLS=['📖','🚲','✈️','🎨','🍗','💌','🎂','🤝'];
const TAROT={truth:[{i:'💕',t:"The Lovers: Describe the moment you knew your feelings were more than friendship."},{i:'🌟',t:"The Star: What's a hope for your future you've never said out loud?"},{i:'☀️',t:"The Sun: What is your single happiest memory of just the two of you?"},{i:'🌙',t:"The Moon: What is a secret fear you have about the future that your partner can help soothe?"}],dare:[{i:'🎩',t:"The Magician: Create a 'magic spell' using only three words that describes your love."},{i:'🃏',t:"The Fool: Take a leap of faith: tell your partner a silly, secret dream you have."},{i:'📜',t:"The Hierophant: Create a new tradition (e.g., a special handshake) and perform it now."},{i:'⚔️',t:"The Chariot: Plan your next 'adventure' date, even if it's just a walk to a new place."}],prophecy:[{i:'🔮',t:"The World: Many more journeys await you, hand in hand, across different corners of the world."},{i:'✨',t:"The Empress: A future of shared creativity and building a beautiful home together is foreseen."},{i:'🦁',t:"Strength: You will continue to give each other the courage to overcome any obstacle life presents."}]};
const ECHOES_QUIZ=[{q:"'I just needed someone who could understand me.'",a:"Nic"},{q:"'He possessed an aura of mysterious allure, tall and lanky...'",a:"Zoya"},{q:"'I never thought in my life I would ever meet a girl who listened to me talk about mathematics.'",a:"Nic"},{q:"'I was supposed to enter a Chinese-basis school where I can learn Japanese...'",a:"Zoya"},{q:"'If I send her a friend request and she accepts it, then what happens next?'",a:"Nic"}];
const ECHOES=[{quote:"'My name is Zhang Zoya,' she said, breaking the ice. 'I'm Nicholas Lubega, and I love mathematics,' I talked back.",question:"Do you remember the feeling of that first conversation?"},{quote:"A typhoon happened in Kyoto that made all the flights of that day be cancelled. I wanted to rush home.",question:"What would have happened if the flight wasn't rebooked?"},{quote:"'And if it's possible, take some photos in Kyoto, I'd like to see where you will be.' ... In exchange without me asking, she sent her own picture showing her fluffy hair.",question:"How did this small exchange change your connection?"}];
const TWO_TRUTHS_SETS=[{t1:"Nic's first school course was Automotive.",t2:"The first meal you shared on a date was Chicken Steak.",lie:"Nic sent the first Facebook friend request.",ans:2},{t1:"Zoya's little sister's name is Zoie.",t2:"Nic flew through a typhoon to get to an event Zoya was at.",lie:"The friend who got lost with Nic was named Zion.",ans:2},{t1:"Nic drew two people dancing in his first art class.",t2:"Zoya wore a long white skirt at the English club event.",lie:"You confessed your love for each other at the library.",ans:2}];
const JIGSAW_IMAGES = Array.from({length: 20}, (_, i) => `photos/photo${i + 1}.jpg`);
const FORTUNES=["A broken bicycle leads to an unbreakable bond.","The one who listens to you talk about math is your destiny.","Even a typhoon cannot stop two destined souls.","Your future is as bright as her eyes.","A cheesy goodnight poem becomes a treasured memory.","Like a chicken steak at Joyful, your love is a perfect and reliable choice.","A shared drawing class can illustrate a beautiful future."];
const REWARDS=Array.from({length:10},(_,i)=>({type:'photo',value:`photos/photo${i+1}.jpg`})).concat([{type:'treat',value:'Nic owes Zoya her favorite bubble tea.'},{type:'treat',value:'Zoya has to give Nic a 10-minute shoulder massage.'},{type:'money',value:'Nic owes Zoya ¥1000 for a shopping spree!'},{type:'money',value:'Zoya owes Nic ¥500 for video games.'}]);

function startGame(id, btnElement) {
    if (activeGameId === id) return;
    if (activeGameId !== null) closeGame();
    const modalContentWrapper = document.querySelector('#game-play-modal .game-play-modal-content');
    modalContentWrapper.className = 'game-play-modal-content';
    if (id === 'jigsaw') modalContentWrapper.classList.add('size-large');
    else if (['soul-quiz', 'love-meter', 'memory', 'two-truths', 'echoes-quiz'].includes(id)) modalContentWrapper.classList.add('size-medium');
    else modalContentWrapper.classList.add('size-small');
    const card = btnElement.closest('.game-card');
    const header = card.querySelector('.game-card-header');
    const gameContent = $(`${id}-content`);
    if (!gameContent || !card || !header) return;
    gameContentOriginalParent = gameContent.parentNode;
    const gameArea = $('game-play-area');
    gameArea.appendChild(header.cloneNode(true));
    gameArea.appendChild(gameContent);
    gameContent.style.display = 'block';
    $('game-play-modal').style.display = 'block';
    activeGameId = id;
    if (id === 'soul-quiz') initSoulQuiz();
    if (id === 'love-meter') startLoveMeter();
    if (id === 'memory') initMemory();
    if (id === 'tarot') drawTarot();
    if (id === 'echoes-quiz') initEchoesQuiz();
    if (id === 'fortune') newFortune();
    if (id === 'echoes') initEchoes();
    if (id === 'two-truths') initTwoTruths();
    if (id === 'jigsaw') initJigsaw();
}

function closeGame() {
    const modal = $('game-play-modal');
    const gameArea = $('game-play-area');
    const gameContent = gameArea ? gameArea.querySelector('.game-content') : null;
    if (gameContent && gameContentOriginalParent) {
        gameContent.style.display = 'none';
        gameContentOriginalParent.appendChild(gameContent);
    }
    if (gameArea) gameArea.innerHTML = '';
    gameContentOriginalParent = null;
    if (modal) modal.style.display = 'none';
    activeGameId = null;
}

function triggerReward(title="A Reward from the Cosmos!"){ $('reward-title').textContent=title; const r=REWARDS[Math.floor(Math.random()*REWARDS.length)]; const d=$('reward-display'); if(r.type==='photo') d.innerHTML=`<img src="${r.value}" alt="A cherished memory" onerror="this.alt='Photo not found';">`; else d.innerHTML=`<p>${r.value}</p>`; $('reward-modal').style.display='block'; }
function closeRewardModal(){$('reward-modal').style.display='none';}

let sQNum,sScore;function initSoulQuiz(){sQNum=0;sScore=0;$('soul-score').textContent=`0 / ${SOUL_QUIZ.length}`;displaySoulQuestion()}
function displaySoulQuestion(){if(sQNum>=SOUL_QUIZ.length){let resultText="Resonance test complete!<br><br>";if(sScore>=15){resultText+="A perfect cosmic resonance! Your souls are deeply intertwined.";triggerReward()}else if(sScore>=10){resultText+="A strong connection! Your shared memories shine brightly."}else{resultText+="Our memories are a bit hazy... a perfect excuse to create new ones!"}$('soul-question').innerHTML=resultText;$('soul-options').innerHTML=``;return}const q=SOUL_QUIZ[sQNum];$('soul-question').innerHTML=q.q;$('soul-options').innerHTML=q.o.map((o,i)=>`<button class="choice-btn" onclick="checkSoulAnswer(${i})">${o}</button>`).join('')}
function checkSoulAnswer(selectedIndex){const qData=SOUL_QUIZ[sQNum];const options=$$('#soul-options .choice-btn');options.forEach(btn=>btn.disabled=true);if(selectedIndex===qData.a){sScore++;options[selectedIndex].style.background='var(--jade)'}else{options[selectedIndex].style.background='var(--crimson)';options[qData.a].style.background='var(--jade)'}sQNum++;updateSoulScore();setTimeout(()=>displaySoulQuestion(),1500)}
function updateSoulScore(){$('soul-score').textContent=`${sScore} / ${SOUL_QUIZ.length}`}
let lTimer,lLives,lScore,lCurrentQ,lQuestions;function startLoveMeter(){lLives=3;lScore=0;lQuestions=[...LIGHTNING_QUESTIONS].sort(()=>.5-Math.random()).map(q=>({...q,answered:!1}));$('love-lives').textContent='❤️❤️❤️';$('love-score').textContent='0';nextLoveQuestion()}
function nextLoveQuestion(){if(lCurrentQ)lCurrentQ.answered=!0;lCurrentQ=lQuestions.find(q=>!q.answered);if(!lCurrentQ||lLives<=0){clearInterval(lTimer);$('love-question').innerHTML=`The storm has passed! Final Score: ${lScore}`;$('love-options').innerHTML='';if(lScore>=5)triggerReward();return}const timerBar=$('love-timer-bar');timerBar.style.animation='none';void timerBar.offsetWidth;timerBar.style.animation='timer_drain 10s linear';$('love-question').innerHTML=lCurrentQ.q;$('love-options').innerHTML=lCurrentQ.o.map((o,i)=>`<button class="choice-btn" onclick="checkLoveAnswer(${i})">${o}</button>`).join('');lTimer=setTimeout(()=>handleLoveAnswer(!1),10000)}
function handleLoveAnswer(isCorrect){clearInterval(lTimer);if(isCorrect){lScore++;$('love-score').textContent=lScore}else{lLives--;$('love-lives').textContent='❤️'.repeat(lLives)+'🤍'.repeat(3-lLives)}$$('#love-options .choice-btn').forEach(btn=>btn.disabled=!0);setTimeout(()=>nextLoveQuestion(),1200)}
function checkLoveAnswer(selectedIndex){const correct=selectedIndex===lCurrentQ.a;if(correct){$$('#love-options .choice-btn')[selectedIndex].style.background='var(--jade)'}else{$$('#love-options .choice-btn')[selectedIndex].style.background='var(--crimson)'}handleLoveAnswer(correct)}
let mFlipped,mLock,mMoves,mMatches;function initMemory(){mFlipped=[];mLock=!1;mMoves=0;mMatches=0;updateMemoryScore();const g=$('memory-grid');g.innerHTML='';[...MEMORY_SYMBOLS,...MEMORY_SYMBOLS].sort(()=>.5-Math.random()).forEach(s=>{const c=document.createElement('div');c.className='memory-card';c.dataset.symbol=s;c.innerHTML=`<div class="face back">?</div><div class="face front">${s}</div>`;c.addEventListener('click',()=>flipMemoryCard(c));g.appendChild(c)})}
function flipMemoryCard(c){if(mLock||c.classList.contains('flipped'))return;c.classList.add('flipped');mFlipped.push(c);if(mFlipped.length===2){mLock=!0;mMoves++;if(mFlipped[0].dataset.symbol===mFlipped[1].dataset.symbol){mMatches++;mFlipped.forEach(c=>c.classList.add('matched'));mFlipped=[];mLock=!1;if(mMatches===MEMORY_SYMBOLS.length){let resultText="Nexus Cleared! ";if(mMoves<=12){resultText+="A true cosmic memory master!"}else if(mMoves<=18){resultText+="Stellar recall! Our memories are strong."}else{resultText+="Lost among the stars, but we found our way back together!"}document.querySelector('#memory-content .score-display').innerHTML=`Moves: ${mMoves} | Matches: 8/8 <br><span style='font-size: 0.7em;color:var(--gold)'>${resultText}</span>`;triggerReward()}}else{setTimeout(()=>{mFlipped.forEach(c=>c.classList.remove('flipped'));mFlipped=[];mLock=!1},1200)}updateMemoryScore()}}
function updateMemoryScore(){if(mMatches<MEMORY_SYMBOLS.length)$('memory-moves').textContent=mMoves;$('memory-matches').textContent=`${mMatches}/8`}
function drawTarot(){const cardElement=$('tarot-card');if(cardElement.classList.contains('flipped')){cardElement.classList.remove('flipped')}setTimeout(()=>{const choice=$('tarot-choice').value;const deck=TAROT[choice];const cardData=deck[Math.floor(Math.random()*deck.length)];$('tarot-result-icon').textContent=cardData.i;$('tarot-result-text').innerHTML=cardData.t},400)}
let eQNum,eTries;function initEchoesQuiz(){eQNum=0;displayEchoesQuestion()}
function displayEchoesQuestion(){eTries=2;const feedbackEl=$('echoes-quiz-feedback');feedbackEl.style.display='none';if(eQNum>=ECHOES_QUIZ.length){$('echoes-quiz-question').textContent="You know our hearts well!";$('echoes-quiz-options').innerHTML="";triggerReward();return}const q=ECHOES_QUIZ[eQNum];$('echoes-quiz-question').innerHTML=`"${q.q}"`;$('echoes-quiz-options').innerHTML=`<button class="choice-btn" onclick="checkEchoesAnswer('Nic')">Nic</button><button class="choice-btn" onclick="checkEchoesAnswer('Zoya')">Zoya</button>`}
function checkEchoesAnswer(choice){const feedbackEl=$('echoes-quiz-feedback');const qData=ECHOES_QUIZ[eQNum];if(choice===qData.a){feedbackEl.textContent="Correct! You heard the echo truly.";feedbackEl.className='result-display success';feedbackEl.style.display='block';$$('#echoes-quiz-options .choice-btn').forEach(btn=>btn.disabled=!0);eQNum++;setTimeout(()=>displayEchoesQuestion(),1500)}else{eTries--;if(eTries>0){feedbackEl.textContent=`Not quite. ${eTries} try remaining.`;feedbackEl.className='result-display fail';feedbackEl.style.display='block'}else{feedbackEl.textContent=`That was from ${qData.a}'s heart. Moving on...`;feedbackEl.className='result-display';feedbackEl.style.display='block';$$('#echoes-quiz-options .choice-btn').forEach(btn=>btn.disabled=!0);eQNum++;setTimeout(()=>displayEchoesQuestion(),2500)}}}
function initEchoes(){nextEcho()}
function nextEcho(){const echo=ECHOES[Math.floor(Math.random()*ECHOES.length)];$('echo-quote').textContent=`"${echo.quote}"`;$('echo-question').textContent=echo.question}
function initTwoTruths(){const set=TWO_TRUTHS_SETS[Math.floor(Math.random()*TWO_TRUTHS_SETS.length)];const options=[{text:set.t1,isLie:!1},{text:set.t2,isLie:!1},{text:set.lie,isLie:!0}].sort(()=>.5-Math.random());$('two-truths-options').innerHTML=options.map((opt,i)=>`<button class="choice-btn" onclick="checkLie(${opt.isLie}, this)">${opt.text}</button>`).join('');$('two-truths-feedback').style.display='none';document.querySelector('#two-truths-content button[onclick="initTwoTruths()"]').style.display='none'}
function checkLie(isLie,btn){$$('#two-truths-options .choice-btn').forEach(b=>b.disabled=!0);const feedbackEl=$('two-truths-feedback');if(isLie){feedbackEl.textContent="You found the lie! Your memory is sharp.";feedbackEl.className='result-display success';triggerReward()}else{feedbackEl.textContent="That was a truth! The lie is still hiding.";feedbackEl.className='result-display fail';btn.style.background='var(--crimson)'}feedbackEl.style.display='block';document.querySelector('#two-truths-content button[onclick="initTwoTruths()"]').style.display='block'}
let jigsawTimerInterval,jigsawSeconds,jigsawLives,jigsawCurrentImage,jigsawPiecesCount,highlightedSlotIndex=null;
function checkJigsawMove(pieceElement,slotElement){const pieceIndex=pieceElement.dataset.index;const slotIndex=slotElement.dataset.index;const board=$('jigsaw-board');if(pieceIndex==slotIndex){slotElement.innerHTML='';slotElement.appendChild(pieceElement);pieceElement.draggable=false;pieceElement.style.cursor='default';if(board.querySelectorAll('.jigsaw-piece').length===jigsawPiecesCount){clearInterval(jigsawTimerInterval);triggerReward(`Puzzle Solved in ${jigsawSeconds}s!`)}}else{jigsawLives--;updateJigsawLives();board.classList.add('shake-error');setTimeout(()=>board.classList.remove('shake-error'),300);if(jigsawLives<=0){clearInterval(jigsawTimerInterval);alert("Out of lives! The memory fades... Try again.")}}const currentlyHighlighted=document.querySelector('.jigsaw-slot.highlighted');if(currentlyHighlighted){currentlyHighlighted.classList.remove('highlighted')}highlightedSlotIndex=null}
function handleSlotClick(slotElement,index){if(slotElement.hasChildNodes()&&slotElement.textContent.trim()==='')return;const currentlyHighlighted=document.querySelector('.jigsaw-slot.highlighted');if(currentlyHighlighted){currentlyHighlighted.classList.remove('highlighted')}if(highlightedSlotIndex===index){highlightedSlotIndex=null;return}slotElement.classList.add('highlighted');highlightedSlotIndex=index}
function handlePieceClick(pieceElement){if(pieceElement.parentNode.id!=='jigsaw-pieces-container')return;if(highlightedSlotIndex!==null){const targetSlot=document.querySelector(`.jigsaw-slot[data-index='${highlightedSlotIndex}']`);if(targetSlot){checkJigsawMove(pieceElement,targetSlot)}}}
function handleJigsawDrop(e){e.preventDefault();const slotElement=e.currentTarget;if(slotElement.hasChildNodes()&&slotElement.textContent.trim()==='')return;const pieceIndex=e.dataTransfer.getData('text');const pieceElement=document.querySelector(`#jigsaw-pieces-container .jigsaw-piece[data-index='${pieceIndex}']`);if(pieceElement){checkJigsawMove(pieceElement,slotElement)}}
function initJigsaw(newImage=!0){clearInterval(jigsawTimerInterval);highlightedSlotIndex=null;jigsawSeconds=0;jigsawLives=3;let piecesX=4,piecesY=4;const board=$('jigsaw-board');if(newImage||!jigsawCurrentImage)jigsawCurrentImage=JIGSAW_IMAGES[Math.floor(Math.random()*JIGSAW_IMAGES.length)];const img=new Image();img.onload=()=>{const boardSize=Math.min(400,window.innerWidth-300);const pieceWidth=boardSize/piecesX;const pieceHeight=boardSize/piecesY;jigsawPiecesCount=piecesX*piecesY;board.innerHTML='';$('jigsaw-pieces-container').innerHTML='';board.style.width=`${boardSize}px`;board.style.height=`${boardSize}px`;board.style.gridTemplateColumns=`repeat(${piecesX},1fr)`;let pieces=[];for(let i=0;i<jigsawPiecesCount;i++){const row=Math.floor(i/piecesX),col=i%piecesX;const piece=document.createElement('div');piece.className='jigsaw-piece';piece.draggable=true;piece.dataset.index=i;piece.style.width=`${pieceWidth}px`;piece.style.height=`${pieceHeight}px`;piece.style.backgroundImage=`url(${jigsawCurrentImage})`;piece.style.backgroundSize=`${boardSize}px ${boardSize}px`;piece.style.backgroundPosition=`-${col*pieceWidth}px -${row*pieceHeight}px`;piece.addEventListener('dragstart',e=>e.dataTransfer.setData('text/plain',i));piece.addEventListener('click',()=>handlePieceClick(piece));pieces.push(piece);const slot=document.createElement('div');slot.className='jigsaw-slot';slot.dataset.index=i;slot.textContent=i+1;slot.addEventListener('dragover',e=>e.preventDefault());slot.addEventListener('drop',handleJigsawDrop);slot.addEventListener('click',()=>handleSlotClick(slot,i));board.appendChild(slot)}pieces.sort(()=>.5-Math.random()).forEach(p=>$('jigsaw-pieces-container').appendChild(p));startJigsawTimer();updateJigsawLives()};img.src=jigsawCurrentImage}
function startJigsawTimer(){jigsawTimerInterval=setInterval(()=>{jigsawSeconds++;$('jigsaw-timer').textContent=`${jigsawSeconds}s`},1000)}
function updateJigsawLives(){$('jigsaw-lives').textContent='❤️'.repeat(jigsawLives)+'🤍'.repeat(3-jigsawLives)}
function retryJigsaw(){initJigsaw(!1)}function newJigsaw(){initJigsaw(!0)}
function showJigsawPreview(){$('reward-title').textContent="Memory Preview";$('reward-display').innerHTML=`<img src="${jigsawCurrentImage}" alt="Jigsaw Preview">`;$('reward-modal').style.display='block'}
function newFortune(){$('fortune-text').textContent=FORTUNES[Math.floor(Math.random()*FORTUNES.length)];triggerReward()}

function initGamesPanelJS() {}

// --- ALL OTHER FUNCTIONS ---
function handleBookPasswordAttempt() { if (DOM.bookPasswordInput.value.toLowerCase().replace(/\s/g, '') === EDITABLE_CONFIG.bookPassword) { DOM.bookPasswordGate.classList.remove('active'); AppState.bookUnlocked = true; renderBookUI(); } else { alert('Incorrect password.'); }}
function parseBook(rawBook){ AppState.chapters = rawBook.split('===CHAPTER===').map(s => s.trim()).filter(Boolean).map(chunk => { const lines = chunk.split('\n'); let chapter = {}, contentStartIndex = -1; lines.forEach((line, index) => { if (line.startsWith('TITLE:')) chapter.title = line.substring(6).trim(); else if (line.startsWith('AUTHOR:')) chapter.author = line.substring(7).trim(); else if (line.startsWith('DATE:')) chapter.date = line.substring(5).trim(); else if (line.startsWith('===CONTENT===')) contentStartIndex = index + 1; }); chapter.content = lines.slice(contentStartIndex).join('\n').trim(); return chapter; });}
function initQuill(){ 
    if($('quill-editor')) {
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
function renderBookUI(){ renderChapterList(); if (AppState.chapters.length > 0) renderChapterContent(AppState.currentChapterIndex); }
function renderChapterList(){ 
    const container = $('chapter-list-container'); 
    if (container) {
        container.innerHTML = AppState.chapters.map((chap, index) => `
            <div class="chapter-item ${index === AppState.currentChapterIndex ? 'active' : ''}" data-index="${index}">
                <div class="chapter-title">${chap.title}</div><div class="chapter-meta">${new Date(chap.date).toLocaleDateString()}</div>
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
}
function deleteChapter(index) {
    const chapter = AppState.chapters[index];
    if (!chapter) return;
    if (confirm(`Are you sure you want to permanently delete the chapter "${chapter.title}"?`)) {
        AppState.chapters.splice(index, 1);
        AppState.currentChapterIndex = 0;
        renderBookUI();
    }
}
function renderGalleryFilters() { const container = $('gallery-filters'); if (!container) return; let buttonsHTML = '<button class="btn gallery-filter-btn active" data-category="all">All Events</button>'; for (const [key, value] of Object.entries(EDITABLE_CONFIG.GALLERY_CATEGORIES)) { buttonsHTML += `<button class="btn gallery-filter-btn" data-category="${key}">${value}</button>`; } container.innerHTML = buttonsHTML; }
function renderGallery(category = 'all'){ AppState.currentGalleryCategory = category; const grid = $('gallery-grid'); if(!grid) return; const photosToRender = category === 'all' ? EDITABLE_CONFIG.PHOTOS_DATA : EDITABLE_CONFIG.PHOTOS_DATA.filter(p => p.category === category); grid.innerHTML = photosToRender.map((p,i)=>`<div class="polaroid-item" data-index="${i}"><img src="${p.src}" alt="${p.caption}"><p class="polaroid-caption">${p.caption}</p></div>`).join(''); $$('.gallery-filter-btn').forEach(btn => { btn.classList.toggle('active', btn.dataset.category === category); }); }
function updateRelationshipCounter() { /* Placeholder */ }

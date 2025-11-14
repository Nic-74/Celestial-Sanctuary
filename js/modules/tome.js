// ===================================================================
//  MODULE: TOME (js/modules/tome.js)
// ===================================================================

import {
    $, $$, AppState,
    apiDeleteItem
} from '../common.js';

let panelContainer = null;
let availableVoices = []; // Stores the list of available voices

// --- NEW TTS STATE VARIABLES ---
let speechQueue = [];         // Array of text chunks (now { elements: [<p>...], text: "..." })
let currentSpeechIndex = 0;   // The index of the chunk we are on
let isSpeaking = false;       // True if the queue is active (playing)
let isPaused = false;         // True if window.speechSynthesis.paused is true
let currentHighlightEls = []; // The <p> elements currently being spoken

function getTomeHTML() {
    return `
        <div id="tome-panel">
            <div class="book-actions-sticky">
                <button class="btn primary" id="add-chapter-btn">New Chapter</button>
            </div>
            <div class="tome-body">
                <div id="chapter-list-container">
                    <!-- Chapter list will be rendered here by JS -->
                </div>
                <div id="chapter-content-container">
                    <!-- Chapter content will be rendered here by JS -->
                </div>
            </div>
        </div>
    `;
}

// ===================================================================
//  NEW ROBUST TEXT-TO-SPEECH (TTS) LOGIC
// ===================================================================

/**
 * Populates the voice dropdown list.
 * Called when voices are loaded by the browser.
 */
function populateVoiceList() {
    if (!('speechSynthesis' in window)) return;
    
    availableVoices = window.speechSynthesis.getVoices();
    const voiceSelect = $('tts-voice-select');
    
    if (availableVoices.length === 0) {
        console.warn("TTS: populateVoiceList called, but voices array is empty. Waiting for 'onvoiceschanged'.");
        return; // Will be called again by the 'onvoiceschanged' event
    }

    console.log(`TTS: Voices loaded. Found ${availableVoices.length} voices.`);

    if (voiceSelect) { 
        voiceSelect.innerHTML = ''; // Clear "loading..."

        availableVoices.forEach(voice => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.value = voice.name;
            option.setAttribute('data-lang', voice.lang);
            option.setAttribute('data-name', voice.name);
            voiceSelect.appendChild(option);
        });

        const defaultVoice = availableVoices.find(voice => voice.lang === 'en-US' || voice.lang === 'en_US' || voice.lang.startsWith('en-'));
        if (defaultVoice) {
            voiceSelect.value = defaultVoice.name;
        } else if (availableVoices.length > 0) {
            voiceSelect.value = availableVoices[0].name;
        }
    }
}

/**
 * Initializes the TTS system and voice loading.
 * Called *once* when the module renders.
 */
function initTextToSpeech() {
    if ('speechSynthesis' in window) {
        console.log("TTS: Initializing speech system...");
        
        window.speechSynthesis.onvoiceschanged = populateVoiceList;
        
        const dummyUtterance = new SpeechSynthesisUtterance('');
        dummyUtterance.volume = 0;
        window.speechSynthesis.speak(dummyUtterance);

        availableVoices = window.speechSynthesis.getVoices();
        
        if (availableVoices.length > 0) {
            console.log("TTS: Voices were already loaded.");
            populateVoiceList();
        }

    } else {
        console.error("TTS: Speech Synthesis not supported in this browser.");
    }
}

/**
 * Creates the speech queue and starts speaking the first chunk.
 */
function startSpeakingQueue() {
    if (isSpeaking) {
        console.warn("TTS: startSpeakingQueue called, but isSpeaking is true.");
        return; // Already running
    }

    const contentBody = document.querySelector('#chapter-content-container .tome-content-body');
    if (!contentBody) {
        console.error("TTS: Cannot find .tome-content-body element.");
        return;
    }

    // --- FIXED: Simplified Queue Builder ---
    const allParagraphs = Array.from(contentBody.querySelectorAll('p'));
    speechQueue = [];

    allParagraphs.forEach(p => {
        const text = p.textContent.trim();
        if (text.length > 0) {
            // Each paragraph is its own chunk.
            speechQueue.push({ elements: [p], text: text });
        }
    });
    // --- End of Fix ---

    if (speechQueue.length === 0) {
        console.warn("TTS: No text found to speak.");
        return;
    }
    
    console.log(`TTS: Created speech queue with ${speechQueue.length} chunks.`);

    // 2. Reset state and start
    window.speechSynthesis.cancel(); // Clear any old speech
    isSpeaking = true;
    isPaused = false;
    currentSpeechIndex = 0;
    $('tts-play-pause-btn').textContent = 'Pause ⏸️';
    
    // 3. Speak the first chunk
    speakChunk(currentSpeechIndex);
}

/**
 * Speaks a single chunk from the speechQueue.
 * This function is called recursively by the 'onend' event.
 */
function speakChunk(index) {
    if (!isSpeaking || index >= speechQueue.length) {
        console.log("TTS: Queue finished or stopped.");
        handleStop();
        return;
    }

    const chunk = speechQueue[index];
    const text = chunk.text;

    // --- NEW: Highlight and Scroll ---
    if (currentHighlightEls.length > 0) {
        currentHighlightEls.forEach(el => el.classList.remove('tts-highlight'));
    }
    currentHighlightEls = chunk.elements; // Get the array of elements
    
    currentHighlightEls.forEach(el => el.classList.add('tts-highlight'));
    
    // Scroll to the first element in the group
    currentHighlightEls[0].scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center'
    });
    // ---------------------------------

    const rate = $('tts-speed-slider')?.value || 1;
    const selectedVoiceName = $('tts-voice-select')?.value;

    const chunkUtterance = new SpeechSynthesisUtterance(text);

    // Set voice
    if (selectedVoiceName && availableVoices.length > 0) {
        const selectedVoice = availableVoices.find(v => v.name === selectedVoiceName);
        chunkUtterance.voice = selectedVoice || availableVoices[0];
    } else if (availableVoices.length > 0) {
        chunkUtterance.voice = availableVoices[0];
    }
    
    chunkUtterance.rate = parseFloat(rate);
    
    console.log(`TTS: Speaking chunk ${index + 1}/${speechQueue.length}: "${text.substring(0, 30)}..."`);

    chunkUtterance.onend = () => {
        if (isSpeaking) {
            // Remove highlight from all
            if (currentHighlightEls) {
                currentHighlightEls.forEach(el => el.classList.remove('tts-highlight'));
            }
            currentSpeechIndex++;
            speakChunk(currentSpeechIndex);
        }
    };

    chunkUtterance.onerror = (event) => {
        console.error('SpeechSynthesisUtterance.onerror', event);
        handleStop(); // Stop on error
    };

    window.speechSynthesis.speak(chunkUtterance);
}

/**
 * Handles the logic for the Play/Pause/Resume button.
 */
function handlePlayPause() {
    const playBtn = $('tts-play-pause-btn');
    if (!playBtn) return;
    
    console.log(`TTS: Play/Pause clicked. isSpeaking: ${isSpeaking}, isPaused: ${isPaused}`);

    if (!isSpeaking) {
        // Queue is not running, so start it
        startSpeakingQueue();
    } else {
        // Queue is running
        if (isPaused) {
            // It's paused, so resume
            window.speechSynthesis.resume();
            isPaused = false;
            playBtn.textContent = 'Pause ⏸️';
        } else {
            // It's playing, so pause
            window.speechSynthesis.pause();
            isPaused = true;
            playBtn.textContent = 'Resume ▶️';
        }
    }
}

/**
 * Stops speech completely and clears the queue.
 */
function handleStop() {
    console.log("TTS: Stop requested.");
    speechQueue = [];
    currentSpeechIndex = 0;
    isSpeaking = false;
    isPaused = false;
    
    if (currentHighlightEls.length > 0) {
        currentHighlightEls.forEach(el => el.classList.remove('tts-highlight'));
        currentHighlightEls = [];
    }
    
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
    
    const playBtn = $('tts-play-pause-btn');
    if (playBtn) playBtn.textContent = 'Play ▶️';
}

// ===================================================================
//  ENHANCED TOME FEATURES
// ===================================================================

// 1. READING PROGRESS TRACKER
function trackReadingProgress() {
    const container = $('chapter-content-container');
    if (!container) return;
    
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-container';
    progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
    container.prepend(progressBar);
    
    container.addEventListener('scroll', () => {
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight - container.clientHeight;
        const progress = (scrollHeight > 0) ? (scrollTop / scrollHeight) * 100 : 0;
        const bar = container.querySelector('.reading-progress-bar');
        if (bar) bar.style.width = `${progress}%`;
    });
}

// 2. CHAPTER BOOKMARKING
function toggleBookmark(chapterId) {
    const bookmarks = JSON.parse(localStorage.getItem('chapterBookmarks') || '[]');
    const index = bookmarks.indexOf(chapterId);
    
    if (index > -1) {
        bookmarks.splice(index, 1);
    } else {
        bookmarks.push(chapterId);
    }
    
    localStorage.setItem('chapterBookmarks', JSON.stringify(bookmarks));
    renderChapterList(); // Re-render to update bookmark icons
}

// 3. READING MODE CONTROLS (NOW INCLUDES TTS)
function addReadingModeControls() {
    // --- UPDATED: Added new color themes ---
    const controls = `
        <div class="reading-mode-controls">
            <div class="font-size-control">
                <button class="font-btn" id="decrease-font">A-</button>
                <span>Font Size</span>
                <button class="font-btn" id="increase-font">A+</button>
            </div>
            <select id="reading-mode-select" class="text-input" style="width: auto;">
                <option value="default">Default</option>
                <option value="dark">Night Mode</option>
                <option value="sepia">Sepia</option>
                <option value="mint">Mint Garden</option>
                <option value="sakura">Sakura Dream</option>
                <option value="parchment">Parchment</option>
            </select>
            
            <div class="tts-controls">
                <button class="tts-btn" id="tts-play-pause-btn">Play ▶️</button>
                <button class="tts-btn" id="tts-stop-btn">Stop ⏹️</button>
                
                <div class="tts-speed-control">
                    <label for="tts-speed-slider">Speed:</label>
                    <input type="range" id="tts-speed-slider" min="0.5" max="2" step="0.1" value="1">
                    <span id="tts-speed-value">1.0x</span>
                </div>

                <div class="tts-voice-control">
                    <label for="tts-voice-select">Voice:</label>
                    <select id="tts-voice-select" class="text-input">
                        <option value="">Loading voices...</option>
                    </select>
                </div>
            </div>
        </div>
    `;
    
    const container = $('chapter-content-container');
    if (container) {
        container.insertAdjacentHTML('afterbegin', controls);
        
        populateVoiceList();

        let fontSize = parseInt(localStorage.getItem('tomeFontSize') || '16');
        container.style.fontSize = `${fontSize}px`;
        
        $('increase-font')?.addEventListener('click', () => {
            fontSize = Math.min(fontSize + 2, 24);
            container.style.fontSize = `${fontSize}px`;
            localStorage.setItem('tomeFontSize', fontSize);
        });
        
        $('decrease-font')?.addEventListener('click', () => {
            fontSize = Math.max(fontSize - 2, 12);
            container.style.fontSize = `${fontSize}px`;
            localStorage.setItem('tomeFontSize', fontSize);
        });
        
        // --- UPDATED: Added new color classes ---
        $('reading-mode-select')?.addEventListener('change', (e) => {
            container.classList.remove(
                'reading-mode-sepia', 
                'reading-mode-dark', 
                'reading-mode-parchment', 
                'reading-mode-mint', 
                'reading-mode-sakura'
            );
            if (e.target.value !== 'default') {
                container.classList.add('reading-mode-' + e.target.value);
            }
            localStorage.setItem('readingMode', e.target.value);
        });
        
        const savedMode = localStorage.getItem('readingMode');
        if (savedMode) {
            $('reading-mode-select').value = savedMode;
            if (savedMode !== 'default') {
                container.classList.add('reading-mode-' + savedMode);
            }
        }

        // --- Add TTS Event Listeners ---
        $('tts-play-pause-btn')?.addEventListener('click', handlePlayPause);
        $('tts-stop-btn')?.addEventListener('click', handleStop);

        const speedSlider = $('tts-speed-slider');
        const speedValue = $('tts-speed-value');

        speedSlider?.addEventListener('input', (e) => {
            const rate = parseFloat(e.target.value).toFixed(1);
            if (speedValue) speedValue.textContent = `${rate}x`;
        });
    }
}

// 4. CHAPTER STATISTICS
function getChapterStats(chapter) {
    const text = chapter.content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed
    const characters = text.length;
    
    return { words, readingTime, characters };
}

function displayChapterStats(chapter) {
    const stats = getChapterStats(chapter);
    return `
        <div class="chapter-stats">
            <div class="stat-item">
                <span class="stat-icon">📝</span>
                <span class="stat-value">${stats.words}</span>
                <span>words</span>
            </div>
            <div class="stat-item">
                <span class="stat-icon">⏱️</span>
                <span class="stat-value">${stats.readingTime}</span>
                <span>min read</span>
            </div>
            <div class="stat-item">
                <span class="stat-icon">🔤</span>
                <span class="stat-value">${stats.characters}</span>
                <span>characters</span>
            </div>
        </div>
    `;
}

// 5. CHAPTER SEARCH FUNCTIONALITY
function addChapterSearch() {
    const searchHTML = `
        <div style="margin-bottom: 1rem;">
            <input type="text" id="chapter-search-input" class="text-input" 
                   placeholder="🔍 Search chapters..." 
                   style="width: 100%; padding: 0.75rem;">
        </div>
    `;
    
    const listContainer = $('chapter-list-container');
    if (listContainer) {
        listContainer.insertAdjacentHTML('afterbegin', searchHTML);
        
        $('chapter-search-input')?.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const items = $$('.chapter-item');
            
            items.forEach(item => {
                const title = item.querySelector('.chapter-title')?.textContent.toLowerCase() || '';
                const match = title.includes(query);
                item.style.display = match ? 'block' : 'none';
            });
        });
    }
}

// 6. PAGE TURN ANIMATION
function animatePageTurn() {
    const container = $('chapter-content-container');
    if (container) {
        container.classList.add('page-turning');
        setTimeout(() => container.classList.remove('page-turning'), 600);
    }
}

// 7. CHAPTER PREVIEW ON HOVER
function addChapterPreview(chapterElement, chapter) {
    const preview = document.createElement('div');
    preview.className = 'chapter-preview';
    
    const text = chapter.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
    preview.innerHTML = `<div class="chapter-preview-text">${text}</div>`;
    
    chapterElement.appendChild(preview);
}

// 8. FLOATING ACTION BUTTONS
function addFloatingActions() {
    const fabsHTML = `
        <div class="tome-floating-actions">
            <button class="tome-fab" id="fab-bookmark" title="Bookmark Current">🔖</button>
            <button class="tome-fab" id="fab-share" title="Share Chapter">📤</button>
            <button class="tome-fab" id="fab-print" title="Print Chapter">🖨️</button>
            <button class="tome-fab" id="fab-top" title="Scroll to Top">⬆️</button>
        </div>
    `;
    
    document.querySelector('.main-content')?.insertAdjacentHTML('beforeend', fabsHTML);
    
    $('fab-bookmark')?.addEventListener('click', () => {
        const currentChapter = AppState.chapters[AppState.currentChapterIndex];
        if (currentChapter) toggleBookmark(currentChapter.id);
    });
    
    $('fab-share')?.addEventListener('click', () => {
        const currentChapter = AppState.chapters[AppState.currentChapterIndex];
        if (currentChapter && navigator.share) {
            navigator.share({
                title: currentChapter.title,
                text: `Check out this chapter from our tome: ${currentChapter.title}`
            });
        }
    });
    
    $('fab-print')?.addEventListener('click', () => window.print());
    
    $('fab-top')?.addEventListener('click', () => {
        $('chapter-content-container')?.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 9. CHAPTER FILTERS BY YEAR/MONTH
function addChapterFilters() {
    const years = [...new Set(AppState.chapters.map(c => 
        new Date(c.date).getFullYear()
    ))].sort((a, b) => b - a);
    
    const filtersHTML = `
        <div class="chapter-filters">
            <div class="filter-chip active" data-filter="all">All Chapters</div>
            ${years.map(year => 
                `<div class="filter-chip" data-filter="${year}">${year}</div>`
            ).join('')}
            <div class="filter-chip" data-filter="bookmarked">⭐ Bookmarked</div>
        </div>
    `;
    
    const listContainer = $('chapter-list-container');
    if (listContainer) {
        listContainer.insertAdjacentHTML('afterbegin', filtersHTML);
        
        $$('.filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                $$('.filter-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                
                const filter = chip.dataset.filter;
                filterChapters(filter);
            });
        });
    }
}

function filterChapters(filter) {
    const bookmarks = JSON.parse(localStorage.getItem('chapterBookmarks') || '[]');
    
    $$('.chapter-item').forEach(item => {
        const chapterId = item.dataset.id;
        const chapter = AppState.chapters.find(c => c.id === chapterId);
        
        if (!chapter) return;
        
        let show = false;
        
        if (filter === 'all') {
            show = true;
        } else if (filter === 'bookmarked') {
            show = bookmarks.includes(chapterId);
        } else {
            const year = new Date(chapter.date).getFullYear().toString();
            show = year === filter;
        }
        
        item.style.display = show ? 'block' : 'none';
    });
}

// 10. AUTO-SAVE READING POSITION
function saveReadingPosition() {
    const container = $('chapter-content-container');
    if (container && AppState.currentChapterIndex !== undefined) {
        const position = container.scrollTop;
        localStorage.setItem(`readingPos_${AppState.currentChapterIndex}`, position);
    }
}

function restoreReadingPosition() {
    const container = $('chapter-content-container');
    if (container && AppState.currentChapterIndex !== undefined) {
        const position = localStorage.getItem(`readingPos_${AppState.currentChapterIndex}`);
        if (position) {
            setTimeout(() => container.scrollTop = parseInt(position), 100);
        }
    }
}

function renderChapterList() {
    const container = $('chapter-list-container');
    const bookmarks = JSON.parse(localStorage.getItem('chapterBookmarks') || '[]');
    
    if (container) {
        const existingFilters = container.querySelector('.chapter-filters');
        const existingSearch = container.querySelector('#chapter-search-input');
        
        container.innerHTML = AppState.chapters.map((chap, index) => {
            const stats = getChapterStats(chap);
            const isBookmarked = bookmarks.includes(chap.id);
            
            return `
            <div class="chapter-item ${index === AppState.currentChapterIndex ? 'active' : ''} ${isBookmarked ? 'bookmarked' : ''}" 
                 data-index="${index}" 
                 data-id="${chap.id}">
                <div class="chapter-mood ${chap.mood || 'reflective'}"></div>
                <div class="chapter-title">${chap.title}</div>
                <div class="chapter-meta">${new Date(chap.date).toLocaleDateString()}</div>
                <div class="chapter-meta-extended">
                    <span>📖 ${stats.words} words</span>
                    <span>⏱️ ${stats.readingTime} min</span>
                </div>
                <span class="bookmark-icon" data-bookmark-id="${chap.id}">🔖</span>
                <div class="chapter-actions">
                    <button class="chapter-action-btn" data-edit-id="${chap.id}" title="Edit">✏️</button>
                    <button class="chapter-action-btn" data-delete-id="${chap.id}" title="Delete">🗑️</button>
                </div>
            </div>`
        }).join('');

        if (existingFilters) container.prepend(existingFilters);
        if (existingSearch) container.prepend(existingSearch.parentElement);
        
        AppState.chapters.forEach((chap, index) => {
            const item = container.querySelector(`[data-index="${index}"]`);
            if (item) addChapterPreview(item, chap);
        });
    }
}

function renderChapterContent(index) {
    // *** Stop speech when changing chapters ***
    handleStop();

    const container = $('chapter-content-container');
    if (container && AppState.chapters[index]) {
        const chapter = AppState.chapters[index];
        AppState.currentChapterIndex = index;
        const formattedContent = chapter.content;
        const stats = displayChapterStats(chapter);
        
        container.innerHTML = `
            <h3>${chapter.title}</h3>
            ${stats}
            <div class="tome-content-body">${formattedContent}</div>
        `;
        
        // This now adds TTS controls *and* populates the voice list
        addReadingModeControls(); 
        trackReadingProgress();
        
        $$('#chapter-list-container .chapter-item').forEach(el => el.classList.remove('active'));
        const activeItem = $(`#chapter-list-container .chapter-item[data-index="${index}"]`);
        if (activeItem) activeItem.classList.add('active');

        animatePageTurn();
        restoreReadingPosition();
        container.addEventListener('scroll', saveReadingPosition);
    }
}

async function deleteChapter(chapterId) {
    const chapter = AppState.chapters.find(c => c.id === chapterId);
    if (chapter && confirm(`Are you sure you want to delete "${chapter.title}"?`)) {
        const success = await apiDeleteItem('tome', chapterId);
        if (success) {
            AppState.chapters = AppState.chapters.filter(c => c.id !== chapterId);
            renderChapterList();
            if (AppState.chapters.length > 0) {
                renderChapterContent(0);
            } else {
                $('chapter-content-container').innerHTML = '<p>The tome is empty. Write the first chapter.</p>';
            }
        }
    }
}

function addEventListeners() {
    panelContainer.addEventListener('click', (e) => {
        const chapterItem = e.target.closest('.chapter-item');
        const editBtn = e.target.closest('[data-edit-id]');
        const deleteBtn = e.target.closest('[data-delete-id]');
        const bookmarkBtn = e.target.closest('[data-bookmark-id]');

        if (editBtn) {
            e.stopPropagation();
            window.openEditor(editBtn.dataset.editId);
        } else if (deleteBtn) {
            e.stopPropagation();
            deleteChapter(deleteBtn.dataset.deleteId);
        } else if (bookmarkBtn) {
            e.stopPropagation();
            toggleBookmark(bookmarkBtn.dataset.bookmarkId);
        } else if (chapterItem) {
            const index = parseInt(chapterItem.dataset.index, 10);
            renderChapterContent(index);
        }
    });

    $('add-chapter-btn').addEventListener('click', () => {
        if (AppState.bookUnlocked) {
            window.openNewChapterMeta();
        } else {
            $('book-password-gate').classList.add('active');
        }
    });
}

export function render(mainContent) {
    panelContainer = mainContent;
    panelContainer.innerHTML = getTomeHTML();

    initTextToSpeech();

    if (!AppState.bookUnlocked) {
        $('book-password-gate').classList.add('active');
        return;
    }
    
    // --- FIX: Ensure content renders on refresh if book is already unlocked ---
    // This block handles the initial rendering of the chapter list and content
    // when the tome panel is loaded.
    if (AppState.chapters.length > 0) {
        renderChapterList();
        renderChapterContent(AppState.currentChapterIndex || 0);
    } else {
        renderChapterList(); // Render empty list to show search/filters
        $('chapter-content-container').innerHTML = '<p>The tome is empty. Write the first chapter.</p>';
    }

    addEventListeners(); // Add main click listeners
    addFloatingActions(); // Add floating buttons
    addChapterSearch(); 
    addChapterFilters(); 
}

export function cleanup() {
    // *** UPDATED: Clean up TTS listeners and state ***
    handleStop();
    // Remove the global listener when the module is torn down
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null; 
    }
    availableVoices = []; // Clear array
    isSpeaking = false;
    isPaused = false;
    speechQueue = [];
    currentSpeechIndex = 0;
    currentHighlightEls = [];

    const fabs = document.querySelector('.tome-floating-actions');
    if (fabs) fabs.remove();
    panelContainer = null;
}

window.renderChapterContent = renderChapterContent;
window.renderChapterList = renderChapterList;
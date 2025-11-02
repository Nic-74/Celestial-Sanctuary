// --- chinese_enhancements.js ---

// ===================================================================
// COMPREHENSIVE CHINESE ENHANCEMENTS
// 全面中文增强脚本
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎋 Initializing Chinese Aesthetics Module...');

    // --- NEW: Toggle Logic ---
    let aestheticsEnabled = true;
    const toggleStyleSheet = document.createElement('style');
    toggleStyleSheet.id = 'chinese-aesthetics-toggle-sheet';
    document.head.appendChild(toggleStyleSheet);

    // CSS rules to hide all aesthetic elements when toggled off
    // MODIFIED: This list no longer hides the left lantern, only the right one.
    const AESTHETICS_OFF_CSS = `
        .chinese-subtitle,
        .portal-character,
        .chinese-poetry-box,
        .red-thread-divider,
        .panel-chinese-accent,
        #lantern-toggle-right, /* <-- Specifically hide the RIGHT lantern */
        .chinese-pattern,
        .tome-lock-icon::after,
        .event-card::before,
        #loading::after {
            display: none !important;
            opacity: 0 !important;
            pointer-events: none !important;
        }
    `;

    /**
     * NEW: Toggles all Chinese aesthetics on or off
     */
    function toggleChineseAesthetics() {
        aestheticsEnabled = !aestheticsEnabled;
        
        // Find the icon spans inside both lanterns
        const leftIconSpan = document.querySelector('#lantern-toggle-left .chinese-lantern');
        const rightIconSpan = document.querySelector('#lantern-toggle-right .chinese-lantern');

        if (aestheticsEnabled) {
            // Turn ON
            toggleStyleSheet.innerHTML = "";
            if (leftIconSpan) leftIconSpan.innerHTML = '🏮'; // Change back to lantern
            if (rightIconSpan) rightIconSpan.innerHTML = '🏮';
            console.log('🎨 Chinese Aesthetics ON');
        } else {
            // Turn OFF
            toggleStyleSheet.innerHTML = AESTHETICS_OFF_CSS;
            if (leftIconSpan) leftIconSpan.innerHTML = '✨'; // Change to a "magic" icon
            console.log('🎨 Chinese Aesthetics OFF');
        }
    }
    // --- End of New Toggle Logic ---


    // Complete Translation Dictionary
    const translations = {
        // Landing Page
        sanctuary: "星空圣所",
        names: "Nini & 卓雅", 
        prophecy: "在无限可能的宇宙中，我们的灵魂找到了彼此。这不是巧合——这是命运。",
        countries: "乌干达共和国 <span class='portal-character'>缘</span> ❤ <span class='portal-character'>爱</span> 中国",
        prompt: "点击任意处进入圣所...",

        // Main Navigation
        menu_home: "星系首页",
        menu_challenges: "猎户殿堂",
        menu_chronicle: "时光纪事",
        menu_tome: "星尘典籍",
        menu_gallery: "光影长廊",
        menu_guide: "星图指引",
        menu_universes: "平行宇宙",
        menu_voicegarden: "语音花园",
        menu_sanctum: "心灵圣域",

        // Book Password Gate
        book_gate_subtitle: "此圣典需密匙方可开启",
        book_gate_label: "颂念密语",
        book_gate_hint: "提示：定义我们爱情的四个词，全小写，无空格。",

        // Gallery Filters
        gallery_cat_cooking: "烹饪时光",
        gallery_cat_travel: "旅行足迹",
        gallery_cat_random: "随机瞬间",
        gallery_cat_intimate: "亲密时刻",
        gallery_cat_zoya: "关于卓雅",
        gallery_cat_nicholas: "关于尼克",
        
        // Timeline Panel
        timeline_years: "年",
        timeline_months: "月",
        timeline_weeks: "周",
        timeline_days: "天",
        timeline_hours: "时",
        timeline_minutes: "分",
        timeline_seconds: "秒",
        timeline_ms: "毫秒",
        timeline_select_date: "选择日期",
        timeline_prev_event: "上一个事件",
        timeline_next_event: "下一个事件",
        timeline_add_event: "添加新事件",

        // Guide Hub Buttons
        guide_hub_observatory: "宇宙观测台",
        guide_hub_physics: "关系物理学",
        guide_hub_anatomy: "我们的构造",
        guide_hub_artifacts: "圣物典藏",
        guide_hub_lexicon: "爱之密语",
        
        // Voice Garden
        vg_total_flowers: "花朵总数",
        vg_filter_count: "筛选结果",
        vg_garden_age: "花园年龄",
        vg_show: "显示:",
        vg_all: "全部",
        vg_en: "英文",
        vg_zh: "中文",

        // Panel-Specific
        timeline_title: "时光编年史",
        timeline_subtitle: "我们的星辰之旅，以分秒为证",
        timeline_counter: "相守时光",
        timeline_add: "添加回忆",
        
        book_title: "星尘典籍",
        book_subtitle: "用文字铭刻，以星辰见证",
        book_protected: "守护的记忆之库",
        book_unlock: "解锁典籍",
        book_add: "添加新章",
        
        gallery_title: "光影长廊",
        gallery_subtitle: "定格的永恒，珍藏的瞬间",
        gallery_upload: "上传照片",
        gallery_all: "全部",
        
        guide_title: "星图指引",
        guide_subtitle: "宇宙的智慧，关系的奥秘",
        
        games_title: "永恒之爱殿堂",
        games_subtitle: "在游戏中重温我们的故事",
        
        universes_title: "平行时空",
        universes_subtitle: "每个宇宙中，我们都会找到彼此",
        
        voicegarden_title: "语音花园",
        voicegarden_subtitle: "声音绽放成记忆之花",
        
        sanctuary_title: "心灵圣域",
        sanctuary_subtitle: "慰藉、庆祝、疗愈与指引之所",

        // --- NEW: Games Panel Internal Titles ---
        games_hall_deep: "深刻连接的大厅",
        games_hall_interplay: "互动的圣所",
        games_hall_history: "共享历史的长廊",
        games_soul_resonance: "灵魂共鸣",
        games_lightning_round: "爱情能量",
        games_star_match: "星辰配對",
        games_two_truths: "真假回忆",
        games_echoes_heart: "心有灵犀",
        games_jigsaw: "星辰拼图",
        games_tarot: "灵魂塔罗",
        games_fortune: "命运之签",
        games_echoes_past: "过往的回响",

        // Mood States
        mood_excited: "兴奋",
        mood_loving: "深情",
        mood_happy: "快乐",
        mood_sad: "悲伤",
        mood_calm: "平静",
        mood_playful: "俏皮",
        mood_adventurous: "冒险",
        mood_nostalgic: "怀旧",
        mood_neutral: "平和",

        // UI Elements
        ui_save: "保存",
        ui_cancel: "取消",
        ui_edit: "编辑",
        ui_delete: "删除",
        ui_back: "返回",
        ui_next: "下一个",
        ui_previous: "上一个",
        ui_close: "关闭",
        ui_loading: "加载中..."
    };

    // Chinese Poetry for Different Sections
    const poetry = {
        landing: {
            zh: '山无陵，江水为竭，乃敢与君绝',
            en: 'Until mountains crumble and rivers run dry, only then dare I part from you',
            source: '《上邪》汉乐府'
        },
        timeline: {
            zh: '但愿人长久，千里共婵娟',
            en: 'May we live long and share the moon\'s beauty, though thousands of miles apart',
            source: '苏轼《水调歌头》'
        },
        gallery: {
            zh: '此情可待成追忆，只是当时已惘然',
            en: 'These feelings could become cherished memories, though we were lost in the moment',
            source: '李商隐《锦瑟》'
        },
        sanctuary: {
            zh: '在天愿作比翼鸟，在地愿为连理枝',
            en: 'In heaven, lovebirds flying wing to wing; on earth, branches forever intertwined',
            source: '白居易《长恨歌》'
        }
    };

    /**
     * Create Chinese subtitle element
     */
    function createSubtitle(text, isPoetry = false) {
        const subtitle = document.createElement('span');
        subtitle.className = isPoetry ? 'poetry-zh' : 'chinese-subtitle';
        subtitle.innerHTML = text;
        return subtitle;
    }

    /**
     * NEW Helper: Safely translates an element by appending a subtitle
     */
    function translateElement(selector, translationKey) {
        try {
            const element = document.querySelector(selector);
            const text = translations[translationKey];
            if (element && text && !element.querySelector('.chinese-subtitle')) {
                // Keep original English text and append subtitle
                const originalText = element.textContent.trim();
                element.innerHTML = originalText; // Clear any existing nodes
                element.appendChild(createSubtitle(text));
            }
        } catch (e) {
            console.warn(`Failed to translate element: ${selector}`, e);
        }
    }

    /**
     * Apply translations to landing page
     */
    function enhanceLandingPage() {
        // Add subtitle to "THE CELESTIAL SANCTUARY"
        const subtitle = document.querySelector('#landing-gate .subtitle');
        if (subtitle && !subtitle.querySelector('.chinese-subtitle')) {
            subtitle.appendChild(createSubtitle(translations.sanctuary));
        }
        
        // --- THIS BLOCK IS MODIFIED ---
        // Re-style "NINI & 卓雅" by wrapping them in spans
        const mainTitle = document.querySelector('#landing-gate .main-title');
        if (mainTitle && !mainTitle.querySelector('.name-en')) { // Check if already processed
            // Original HTML is "NINI & 卓雅"
            mainTitle.innerHTML = `
                <span class="name-en">NINI</span>
                <span class="name-amp">&</span>
                <span class="name-zh">卓雅</span>
            `;
        }

        // Add subtitle to prophecy
        const prophecy = document.querySelector('#landing-gate .prophecy');
        if (prophecy && !prophecy.querySelector('.chinese-subtitle')) {
            prophecy.appendChild(createSubtitle(translations.prophecy));
        }
        
        // Enhance countries line with Chinese characters
        const countries = document.querySelector('#landing-gate .countries');
        if (countries && !countries.querySelector('.portal-character')) {
            const heartLink = countries.querySelector('a');
            if (heartLink) {
                const heartHTML = heartLink.outerHTML;
                countries.innerHTML = `乌干达共和国 <span class='portal-character'>缘</span> ${heartHTML} <span class='portal-character'>爱</span> <span style="white-space: nowrap;">中国</span>`;
            }
        }

        // Add subtitle to prompt
        const prompt = document.querySelector('#landing-gate .prompt');
        if (prompt && !prompt.querySelector('.chinese-subtitle')) {
            prompt.appendChild(createSubtitle(translations.prompt));
        }

        // Add poetry box to landing
        if (!document.querySelector('#landing-gate .chinese-poetry-box')) {
            const poetryBox = document.createElement('div');
            poetryBox.className = 'chinese-poetry-box';
            poetryBox.innerHTML = `
                <div class="poetry-zh">${poetry.landing.zh}</div>
                <div class="poetry-en">${poetry.landing.en}</div>
                <div class="poetry-source">—— ${poetry.landing.source}</div>
            `;
            const gateContent = document.querySelector('#landing-gate .gate-content');
            if (gateContent) {
                gateContent.appendChild(poetryBox);
            }
        }
    }

    /**
     * Apply translations to main menu
     */
    function enhanceMainMenu() {
        const menuLinks = {
            '#home': translations.menu_home,
            '#games': translations.menu_challenges,
            '#timeline': translations.menu_chronicle,
            '#book': translations.menu_tome,
            '#gallery': translations.menu_gallery,
            '#guide': translations.menu_guide,
            '#universes': translations.menu_universes,
            '#voicegarden': translations.menu_voicegarden,
            '#sanctuary': translations.menu_sanctum
        };

        Object.entries(menuLinks).forEach(([href, chineseText]) => {
            const link = document.querySelector(`a[href="${href}"]`);
            if (link && !link.querySelector('.chinese-subtitle')) {
                const originalText = link.textContent.trim(); // Get text only
                link.innerHTML = originalText; // Clear existing content
                link.appendChild(createSubtitle(chineseText));
            }
        });
    }

    /**
     * NEW: Apply translations to Mood Bar
     */
    function enhanceMoodBar() {
        // Translate mood labels
        const labels = document.querySelectorAll('.mood-label');
        if (labels[0] && !labels[0].querySelector('.chinese-subtitle')) {
            labels[0].innerHTML = `Nic's Mood ${createSubtitle('尼克的心情').outerHTML}`;
        }
        if (labels[1] && !labels[1].querySelector('.chinese-subtitle')) {
            labels[1].innerHTML = `Zoya's Mood ${createSubtitle('卓雅的心情').outerHTML}`;
        }

        // Translate mood options
        const moodOptions = document.querySelectorAll('.mood-option');
        moodOptions.forEach(option => {
            const key = option.dataset.mood;
            const translation = translations[`mood_${key}`];
            if (translation && !option.querySelector('.chinese-subtitle')) {
                const emoji = option.querySelector('.mood-emoji') ? option.querySelector('.mood-emoji').outerHTML : '';
                const label = option.querySelector('.mood-label-text');
                if (label) {
                    label.innerHTML = `${label.textContent.trim()} ${createSubtitle(translation).outerHTML}`;
                }
            }
        });
    }

    /**
     * NEW: Apply translations to static modals
     */
    function enhanceModals() {
        // Book Password Gate
        translateElement('#book-password-gate .tome-title', 'book_protected');
        translateElement('#book-password-gate .tome-subtitle', 'book_gate_subtitle');
        translateElement('#book-password-gate .speak-words-label', 'book_gate_label');
        translateElement('#book-password-gate .hint-text', 'book_gate_hint');
        
        // Enhance Unlock Button
        const unlockBtn = document.querySelector('#unlock-book-btn');
        if (unlockBtn && !unlockBtn.querySelector('.chinese-subtitle')) {
            // The button text is in a span, but let's just rebuild it
            const originalText = unlockBtn.textContent.trim().replace('🔑', '').trim();
            unlockBtn.innerHTML = `<span class="btn-icon">🔑</span> ${originalText}`;
            unlockBtn.appendChild(createSubtitle(translations.book_unlock));
        }
    }

    /**
     * NEW: Apply bilingual hover to solar system planets
     */
    function enhanceSolarSystem() {
        const planets = document.querySelectorAll('#solar-system-container .planet');
        const planetNameDisplay = document.getElementById('planet-name-display');
        if (!planetNameDisplay || planets.length === 0) return;

        const planetNameMap = {
            'timeline': { en: 'Our Chronicle', zh: translations.menu_chronicle },
            'book': { en: 'The Stardust Tome', zh: translations.menu_tome },
            'gallery': { en: 'Gallery of Ages', zh: translations.menu_gallery },
            'guide': { en: 'Constellation Guide', zh: translations.menu_guide },
            'games': { en: "Orion's Challenges", zh: translations.menu_challenges },
            'universes': { en: 'Alternate Chronicles', zh: translations.menu_universes },
            'voicegarden': { en: 'Voice Garden', zh: translations.menu_voicegarden },
            'sanctuary': { en: 'Inner Sanctum', zh: translations.menu_sanctum }
        };

        planets.forEach(planet => {
            // Remove existing listeners from control.js to replace them
            const newPlanet = planet.cloneNode(true);
            planet.parentNode.replaceChild(newPlanet, planet);

            // Add new bilingual listeners
            newPlanet.addEventListener('mouseover', () => {
                const panelId = newPlanet.dataset.panelId;
                const names = planetNameMap[panelId];
                if (names) {
                    planetNameDisplay.innerHTML = `<span class="text-english">${names.en}</span><span class="text-chinese">${names.zh}</span>`;
                    planetNameDisplay.classList.add('visible');
                }
            });
            newPlanet.addEventListener('mouseout', () => {
                planetNameDisplay.classList.remove('visible');
            });
            // Re-add click listener from control.js
            newPlanet.addEventListener('click', () => { window.location.hash = newPlanet.dataset.panelId; });
        });
    }

    /**
     * UPDATED: Enhance active panel with Chinese elements
     */
    function enhanceActivePanel() {
        const hash = window.location.hash.substring(1) || 'home';
        
        // --- 1. Panel Header Accents ---
        const panelHeader = document.querySelector('.main-content .panel-header');
        if (panelHeader && !panelHeader.querySelector('.panel-chinese-accent')) {
            const accent1 = document.createElement('span');
            accent1.className = 'panel-chinese-accent';
            accent1.textContent = '◆';
            const accent2 = accent1.cloneNode(true);
            panelHeader.insertBefore(accent1, panelHeader.firstChild);
            panelHeader.appendChild(accent2);
        }

        // --- 2. Panel Header & Subheader Translation ---
        const headerMap = {
            'timeline': 'timeline_title',
            'book': 'book_title',
            'gallery': 'gallery_title',
            'guide': 'guide_title',
            'games': 'games_title', // Will be skipped if already Chinese
            'universes': 'universes_title',
            'voicegarden': 'voicegarden_title',
            'sanctuary': 'sanctuary_title'
        };
        
        const subtitleMap = {
            'timeline': 'timeline_subtitle',
            'book': 'book_subtitle',
            'gallery': 'gallery_subtitle',
            'guide': 'guide_subtitle',
            'games': 'games_subtitle',
            'universes': 'universes_subtitle',
            'voicegarden': 'voicegarden_subtitle',
            'sanctuary': 'sanctuary_subtitle'
        };

        // Translate Main Header
        if (panelHeader && headerMap[hash] && !panelHeader.querySelector('.chinese-subtitle')) {
            // Special case for 'games' which is already Chinese in the HTML
            if (hash !== 'games') {
                const originalText = panelHeader.textContent.replace(/◆/g, '').trim();
                panelHeader.innerHTML = `<span class="panel-chinese-accent">◆</span> ${originalText} <span class="panel-chinese-accent">◆</span>`;
                panelHeader.appendChild(createSubtitle(translations[headerMap[hash]]));
            }
        }

        // --- MODIFICATION: Use combined selector ---
        let panelSubheader = document.querySelector('.main-content .panel-subheader, .main-content .hub-subtitle');
        
        if (panelSubheader && subtitleMap[hash] && !panelSubheader.querySelector('.chinese-subtitle')) {
            const originalText = panelSubheader.textContent.trim();
            panelSubheader.innerHTML = originalText; // Clear existing
            panelSubheader.appendChild(createSubtitle(translations[subtitleMap[hash]]));
        }

        // --- 3. Panel-Specific Button/Element Translation ---
        if (hash === 'timeline') {
            translateElement('#add-timeline-event-btn', 'timeline_add_event');
            const selDate = document.querySelector('#cal-selected-day-name');
            if (selDate && selDate.textContent.trim() === 'Select a Date') {
                 translateElement('#cal-selected-day-name', 'timeline_select_date');
            }
            translateElement('#timeline-prev-event', 'timeline_prev_event');
            translateElement('#timeline-next-event', 'timeline_next_event');

            // Translate counter labels
            const counter = document.querySelector('#relationship-counter-detailed');
            if (counter && !counter.dataset.translated) {
                counter.dataset.translated = 'true'; // Prevent re-translating
                const units = {
                    'Years': translations.timeline_years,
                    'Months': translations.timeline_months,
                    'Weeks': translations.timeline_weeks,
                    'Days': translations.timeline_days,
                    'Hours': translations.timeline_hours,
                    'Minutes': translations.timeline_minutes,
                    'Seconds': translations.timeline_seconds,
                    'Milliseconds': translations.timeline_ms,
                };
                counter.querySelectorAll('.counter-unit').forEach(unitEl => {
                    const originalText = unitEl.textContent.replace(/[\d\s]/g, ''); // Get just the text
                    if (units[originalText]) {
                        unitEl.innerHTML = unitEl.innerHTML.replace(originalText, originalText + createSubtitle(units[originalText]).outerHTML);
                    }
                });
            }
        } else if (hash === 'book') {
            translateElement('#add-chapter-btn', 'book_add');
            translateElement('#unlock-book-btn', 'book_unlock');
        } else if (hash === 'gallery') {
            translateElement('#upload-photo-btn', 'gallery_upload');
            translateElement('.gallery-filter-btn[data-category="all"]', 'gallery_all');
            translateElement('.gallery-filter-btn[data-category="cooking"]', 'gallery_cat_cooking');
            translateElement('.gallery-filter-btn[data-category="travel"]', 'gallery_cat_travel');
            translateElement('.gallery-filter-btn[data-category="random"]', 'gallery_cat_random');
            translateElement('.gallery-filter-btn[data-category="intimate"]', 'gallery_cat_intimate');
            translateElement('.gallery-filter-btn[data-category="zoya"]', 'gallery_cat_zoya');
            translateElement('.gallery-filter-btn[data-category="nicholas"]', 'gallery_cat_nicholas');
        }
        // --- NEW: Translate Games Panel Internal Content ---
        else if (hash === 'games') {
            // This uses a lookup map to match the English text to the translation key
            const gameTitleMap = {
                "Hall of Deep Connection": "games_hall_deep",
                "Sanctuary of Interplay": "games_hall_interplay",
                "Hall of Shared History": "games_hall_history",
                "Soul Resonance": "games_soul_resonance",
                "Lightning Round": "games_lightning_round",
                "Celestial Star Match": "games_star_match",
                "Two Truths, One Lie": "games_two_truths",
                "Echoes of the Heart": "games_echoes_heart",
                "Celestial Jigsaw": "games_jigsaw",
                "Tarot of Souls": "games_tarot",
                "Fortune Cookie": "games_fortune",
                "Echoes of the Past": "games_echoes_past"
            };

            // Find all <h2> titles within hall and game cards
            const titles = document.querySelectorAll('.hall-card h2, .game-card h2');
            titles.forEach(titleEl => {
                if (titleEl.querySelector('.chinese-subtitle')) return; // Already translated

                const originalText = titleEl.textContent.trim();
                const translationKey = gameTitleMap[originalText];
                
                if (translationKey && translations[translationKey]) {
                    titleEl.innerHTML = originalText; // Clear existing
                    titleEl.appendChild(createSubtitle(translations[translationKey]));
                }
            });
        }
        else if (hash === 'guide') {
            // This targets the hub buttons in the guide panel
            translateElement('.hub-choice-btn[onclick*="observatory"]', 'guide_hub_observatory');
            translateElement('.hub-choice-btn[onclick*="physics"]', 'guide_hub_physics');
            translateElement('.hub-choice-btn[onclick*="anatomy"]', 'guide_hub_anatomy');
            translateElement('.hub-choice-btn[onclick*="artifacts"]', 'guide_hub_artifacts');
            translateElement('.hub-choice-btn[onclick*="lexicon"]', 'guide_hub_lexicon');
        }
        else if (hash === 'voicegarden') {
            translateElement('#vg-total-flowers + .stat-desc', 'vg_total_flowers');
            translateElement('#vg-filter-count + .stat-desc', 'vg_filter_count');
            translateElement('#vg-garden-age + .stat-desc', 'vg_garden_age');
            translateElement('.garden-filters .stat-desc', 'vg_show');
            translateElement('#vg-filter-all', 'vg_all');
            translateElement('#vg-filter-en', 'vg_en');
            translateElement('#vg-filter-zh', 'vg_zh');
        }
        
        // --- 4. Add Poetry Box ---
        if (poetry[hash] && !document.querySelector('.main-content .chinese-poetry-box')) {
            const poetryBox = document.createElement('div');
            poetryBox.className = 'chinese-poetry-box';
            poetryBox.innerHTML = `
                <div class="poetry-zh">${poetry[hash].zh}</div>
                <div class="poetry-en">${poetry[hash].en}</div>
                <div class="poetry-source">—— ${poetry[hash].source}</div>
            `;
            
            const mainContent = document.querySelector('.main-content');
            const insertAfterElement = panelSubheader || panelHeader;

            if (mainContent && insertAfterElement) {
                insertAfterElement.parentNode.insertBefore(poetryBox, insertAfterElement.nextSibling);
            } else if (mainContent && mainContent.firstChild) {
                mainContent.insertBefore(poetryBox, mainContent.firstChild.nextSibling);
            }
        }

        // --- 5. Add Red Thread Divider ---
        const mainContent = document.querySelector('.main-content');
        if (mainContent && !mainContent.querySelector('.red-thread-divider')) {
            const divider = document.createElement('div');
            divider.className = 'red-thread-divider';
            
            const firstHr = mainContent.querySelector('hr');
            if (firstHr) {
                firstHr.replaceWith(divider);
            }
        }
    }

    /**
     * MODIFIED: Add Chinese lanterns decoration AND make them buttons
     */
    function addLanternDecoration() {
        if (!document.querySelector('#lantern-toggle-left')) {
            const lanterns = document.createElement('div');
            lanterns.className = 'lantern-decoration';
            lanterns.id = 'lantern-toggle-left';
            // Make it clickable
            lanterns.style.cssText = 'position: fixed; top: 20px; left: 20px; z-index: 1001; cursor: pointer; pointer-events: all;';
            lanterns.innerHTML = '<span class="chinese-lantern">🏮</span>';
            lanterns.title = 'Toggle Chinese Aesthetics';
            
            const lanterns2 = lanterns.cloneNode(true);
            lanterns2.id = 'lantern-toggle-right';
            lanterns2.style.left = 'auto';
            lanterns2.style.right = '20px';
            
            // Add click event to toggle
            lanterns.addEventListener('click', toggleChineseAesthetics);
            lanterns2.addEventListener('click', toggleChineseAesthetics);

            document.body.appendChild(lanterns);
            document.body.appendChild(lanterns2);
        }
    }

    // Initialize all enhancements
    enhanceLandingPage();
    enhanceMainMenu();
    enhanceMoodBar();
    addLanternDecoration();
    enhanceModals();
    enhanceSolarSystem();

    // Watch for panel changes
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                // If childList changes (panel added)
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    enhanceActivePanel();
                    return;
                }
                // If attributes change (e.g., 'class' toggles visibility)
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (!mainContent.classList.contains('visible')) {
                        // Main content is hidden, so we are on the 'home' panel.
                        // Re-run solar system enhancement in case it was just rendered.
                        enhanceSolarSystem();
                    }
                }
            }
        });
        observer.observe(mainContent, { childList: true, attributes: true });
    }

    // Initial panel enhancement (for case where page loads with a hash)
    if (sessionStorage.getItem('enteredFromGate') === 'true') {
        setTimeout(() => {
            enhanceActivePanel();
            enhanceSolarSystem(); // Also run this
        }, 500);
    } else {
        // Page just loaded on landing gate
        enhanceSolarSystem(); // Run this to prep planets
    }
    
    console.log('✨ Chinese Aesthetics Module Initialized Successfully');
});
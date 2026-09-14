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
    const AESTHETICS_OFF_CSS = `
        .chinese-subtitle,
        .portal-character,
        .chinese-poetry-box,
        .red-thread-divider,
        .panel-chinese-accent,
        .chinese-pattern,
        .tome-lock-icon::after,
        .event-card::before,
        #loading::after,
        .magpie-bridge {
            display: none !important;
            opacity: 0 !important;
            pointer-events: none !important;
        }
        /* --- NEW: Hide Magpie bridge container if aesthetics are off --- */
        .countries-container {
             display: none !important;
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
            if (rightIconSpan) rightIconSpan.innerHTML = '✨';
            console.log('🎨 Chinese Aesthetics OFF');
        }
    }
    
    function animateTextWrite(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            // Check if already animated
            if (el.dataset.animated) return;
            el.dataset.animated = 'true';

            const text = el.innerText;
            el.innerHTML = ''; // Clear the text
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.opacity = '0';
                span.style.animation = `fade-in-char 0.3s ease-out ${index * 0.1}s forwards`;
                el.appendChild(span);
            });
        });
    }
    function createMagpieBridge() {
        const svg = document.querySelector('.magpie-bridge');
        const magpieDef = document.getElementById('magpie');
        // Check if already populated
        if (!svg || !magpieDef || svg.querySelector('.magpie-clone')) return;

        const numMagpies = 10; // Number of magpies in the bridge
        for (let i = 0; i < numMagpies; i++) {
            // Use <use> tag for better performance and to reference the <defs>
            let useTag = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            useTag.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#magpie');
            useTag.classList.add('magpie-clone');
            useTag.style.animationDelay = `${i * 0.15}s`;
            svg.appendChild(useTag);
        }
    }

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
        menu_discover: "探索之境",
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
        gallery_view_grid: "网格",
        gallery_view_list: "列表",
        gallery_view_masonry: "瀑布流",
        gallery_show_more: "显示更多",
        gallery_search_placeholder: "搜索回忆...",
        gallery_sort_by: "排序方式:",
        gallery_sort_newest: "最新",
        gallery_sort_oldest: "最旧",
        gallery_sort_name_az: "名称 A-Z",
        gallery_sort_name_za: "名称 Z-A",
        gallery_timeline_all: "所有年份",
        gallery_slideshow: "幻灯片",
        gallery_meta_unknown_year: "未知年份",
        gallery_meta_memory: "一段回忆",
        gallery_loading_more: "加载更多回忆...",

        
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

        // --- NEW: Sanctum Realms ---
        sanctum_comfort_title: "慰藉之境",
        sanctum_celebrate_title: "凯旋之境",
        sanctum_hurt_title: "疗愈之境",
        sanctuary_guidance_title: "指引之境",
        sanctuary_fortune_title: "命运之境",
        
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

        discover_title: "探索之境",
        discover_subtitle: "规划我们未来的冒险，珍藏我们走过的路。",
        discover_add: "🗺️ 添加新目的地",
        discover_filter_all: "全部",
        discover_filter_planned: "计划中",
        discover_filter_wishlist: "心愿单",
        discover_filter_visited: "已探访",
        
        games_title: "永恒之爱殿堂",
        games_subtitle: "在游戏中重温我们的故事",
        
        universes_title: "平行时空",
        universes_subtitle: "每个宇宙中，我们都会找到彼此",
        
        voicegarden_title: "语音花园",
        voicegarden_subtitle: "声音绽放成记忆之花",
        
        sanctuary_title: "心灵圣域",
        sanctuary_subtitle: "慰藉、庆祝、疗愈与指引之所",
        sanctuary_hub_title: "✧ 心灵圣域 ✧",
        sanctuary_hub_subtitle: "在此，星辰之力治愈一切创伤",
        sanctuary_hub_prompt: "此刻你的灵魂感觉如何？",
        sanctuary_realm_comfort: "我寻求慰藉",
        sanctuary_realm_celebrate: "我有所成就",
        sanctuary_realm_hurt: "我心有伤痕",
        sanctuary_realm_guidance: "我需要指引",
        sanctuary_realm_fortune: "命运的游戏",

        // --- NEW: Games Hall Titles ---
        games_hall_deep_connection: "深刻连接的大厅",
        games_hall_interplay: "互动的圣所",
        games_hall_shared_history: "共享历史的长廊",


        guide_hub_title: "✧ 星体图书馆 ✧",
        guide_hub_subtitle: "你故事中的星座栖息之所",
        guide_hub_prompt: "选择一个书翼进行探索",
        guide_wing_observatory: "宇宙观测台",
        guide_wing_physics: "关系物理学",
        guide_wing_anatomy: "我们的构造",
        guide_wing_artifacts: "圣物典藏",
        guide_wing_lexicon: "我们的语言",

        // --- NEW: Guide Riddle/Threshold ---
        guide_threshold_intro: "你面前的是星体图书馆，一个存放着你们羁绊的宇宙真理的宝库。它的大门被一个简单而又深刻的内心问题所封印...",
        guide_riddle_prompt_1: "要进入星体图书馆，请回答守护者的问题...",
        guide_riddle_question_1: "定义我们快乐的常数，以美味为单位来衡量的是什么？",
        guide_riddle_choice_1a: "鸡排",
        guide_riddle_choice_1b: "珍珠奶茶",
        guide_riddle_choice_1c: "韩式泡菜炒饭",
        guide_riddle_prompt_2: "古老的文本要求一个真理。什么牢不可破的纽带能超越距离？",
        guide_riddle_question_2: "尼克为卓雅修好了什么物品，象征着他的关心？",
        guide_riddle_choice_2a: "她的手机",
        guide_riddle_choice_2b: "她的自行车",
        guide_riddle_choice_2c: "她的笔记本电脑",
        guide_riddle_prompt_3: "宇宙中的一声低语，询问一段记忆。哪个事件证明了尼克坚定不移的决心？",
        guide_riddle_question_3: "尼克穿越了哪种自然灾害去见卓雅？",
        guide_riddle_choice_3a: "地震",
        guide_riddle_choice_3b: "台风",

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
        ui_loading: "加载中...",

        // --- ADDED THIS LINE ---
        menu_themes: "切换主题",
    };

    // --- NEW: Translations for Alternate Universes ---
    const universeTranslations = {
        'ancient_china': { title: '书生与画师', era: '中国汉代 (公元前206年)' },
        'space_explorers': { title: '星海远航', era: '太空时代 (公元2847年)' },
        'renaissance_italy': { title: '画家的缪斯', era: '文艺复兴时期 (1502年)' },
        'medieval_fantasy': { title: '骑士与女巫', era: '中世纪幻想 (无特定年代)' },
        'studio_ghibli': { title: '庭院里的精灵', era: '现代幻想 (现代)' },
        'steampunk': { title: '蒸汽之心', era: '蒸汽朋克时代 (1888年)' },
        'modern_au': { title: '咖啡店纪事', era: '现代AU (架空2019年)' },
        'jazz_age': { title: '夜上海', era: '爵士时代 (1925年)' },
        'wild_west': { title: '尘土与命运', era: '西部拓荒 (1875年)' },
        'pirates': { title: '命运之潮', era: '大航海时代 (未知)' }
    };

    // Merge universe translations into the main dictionary for easier lookup
    for (const [id, trans] of Object.entries(universeTranslations)) {
        translations[`universe-title-${id}`] = trans.title;
        translations[`universe-era-${id}`] = trans.era;
    }
    // --- END NEW ---

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
        },
        guide: {
            zh: '曾经沧海难为水，除却巫山不是云',
            en: 'Once you have seen the great ocean, no other water is worth seeing; after experiencing the clouds of Mount Wu, no other clouds can compare',
            source: '元稹《离思五首·其四》'
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
        if (!element || !text || element.dataset.translated === 'true') {
            return; // Skip if no element, no text, or already processed
        }

        // Mark as translated
        element.dataset.translated = 'true';

        // Case 1: This is a new Hub Button (Sanctuary or Guide)
        if (element.classList.contains('realm-title')) {
            const originalText = element.textContent.trim();
            // FIX: Don't clear the element. Append the subtitle to preserve the icon.
            // The icon is a sibling to this element, but clearing innerHTML of the parent
            // was the issue in a previous incorrect approach. This is safer.
            element.innerHTML = `<span class="english-title">${originalText}</span>`;
            element.appendChild(createSubtitle(translations[translationKey]));
            // Add a class to the parent to signify it's translated, for styling
            const parentPortal = element.closest('.realm-portal');
            if (parentPortal) {
                parentPortal.classList.add('is-translated');
            }
        }
        // Case 2: This is a Game Card Title
        else if (element.closest('.game-card') && element.tagName === 'H2') {
            const originalText = element.textContent.trim();
            element.innerHTML = originalText;
            element.appendChild(document.createElement('br'));
            element.appendChild(createSubtitle(translations[translationKey]));
        }
        // Case 3: All other elements
        else {
            const originalText = element.textContent.trim();
            element.innerHTML = originalText;
            element.appendChild(createSubtitle(translations[translationKey]));
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
        
        // --- NEW: Call Magpie Bridge generator ---
        // This function will check if the bridge exists and populate it
        createMagpieBridge();

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
                
                // --- NEW: Animate the poetry text ---
                animateTextWrite('#landing-gate .poetry-zh');
            }
        }
    }

    /**
     * Apply translations to main menu
     */
    function enhanceMainMenu() {
        // --- MODIFICATION: Delay this function to allow dynamic buttons to render ---
        setTimeout(() => {
            const menuLinks = {
                '#home': translations.menu_home,
                '#games': translations.menu_challenges,
                
                // --- FIX: Corrected the hrefs to match your index.html ---
                '#chronicle': translations.menu_chronicle,
                '#tome': translations.menu_tome,
                // --- END FIX ---
    
                '#gallery': translations.menu_gallery,
                '#discover': translations.menu_discover,
                '#guide': translations.menu_guide,
                '#universes': translations.menu_universes,
                '#voice-garden': translations.menu_voicegarden,
                '#sanctum': translations.menu_sanctum
            };
    
            Object.entries(menuLinks).forEach(([href, chineseText]) => {
                const link = document.querySelector(`#main-menu-dropdown a[href="${href}"]`);
                if (link && !link.querySelector('.chinese-subtitle')) {
                    const originalText = link.textContent.trim(); // Get text only
                    link.innerHTML = originalText; // Clear existing content
                    link.appendChild(createSubtitle(chineseText));
                }
            });
    
            // --- NEW: Add translation for the Themes button ---
            try {
                const themeBtn = document.querySelector('.theme-toggle-btn');
                if (themeBtn && !themeBtn.dataset.translated) {
                    const originalText = themeBtn.textContent.trim().replace('🎨', '').trim();
                    themeBtn.innerHTML = `🎨 ${originalText}`; // Rebuild with emoji
                    themeBtn.appendChild(createSubtitle(translations.menu_themes));
                    themeBtn.dataset.translated = 'true'; // Mark as translated
                }
            } catch (e) {
                console.warn('Could not translate theme button yet.', e);
            }
        }, 250); // <-- A small delay to wait for the theme button to be created
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
            'chronicle': { en: 'Our Chronicle', zh: translations.menu_chronicle, pinyin: 'Shíguāng Jìshì' },
            'tome': { en: 'The Stardust Tome', zh: translations.menu_tome, pinyin: 'Xīngchén Diǎnjí' },
            'gallery': { en: 'Gallery of Ages', zh: translations.menu_gallery, pinyin: 'Guāngyǐng Chángláng' },
            'guide': { en: 'Constellation Guide', zh: translations.menu_guide, pinyin: 'Xīngtú Zhǐyǐn' },
            'discover': { en: 'Realms of Discovery', zh: translations.menu_discover, pinyin: 'Tànsuǒ zhī Jìng' },
            'games': { en: "Orion's Challenges", zh: translations.menu_challenges, pinyin: 'Lièhù Diàntáng' },
            'universes': { en: 'Alternate Chronicles', zh: translations.menu_universes, pinyin: 'Píngxíng Yǔzhòu' },
            'voice-garden': { en: 'Voice Garden', zh: translations.menu_voicegarden, pinyin: 'Yǔyīn Huāyuán' },
            'sanctum': { en: 'Inner Sanctum', zh: translations.menu_sanctum, pinyin: 'Xīnlíng Shèngyù' }
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
                    planetNameDisplay.innerHTML = `<span class="text-english">${names.en}</span><span class="text-chinese">${names.zh}</span><span class="text-pinyin">${names.pinyin}</span>`;
                    planetNameDisplay.classList.add('visible');
                }
            });
            newPlanet.addEventListener('mouseout', () => {
                planetNameDisplay.classList.remove('visible');
            });
            // Re-add click listener from main.js
            newPlanet.addEventListener('click', () => { window.location.hash = newPlanet.dataset.panelId; });
        });
    }

    /**
     * UPDATED: Enhance active panel with Chinese elements
     */
    function enhanceActivePanel() {
        const hash = window.location.hash.substring(1) || 'home';
        const panelHeader = document.querySelector('.main-content .panel-header, .main-content .section-title');
        
        // --- 1. Panel Header Accents ---
        if (panelHeader && !panelHeader.querySelector('.panel-chinese-accent')) {
            const accentLeft = document.createElement('span');
            accentLeft.className = 'panel-chinese-accent';
           
            const accentRight = accentLeft.cloneNode(true);
            
            panelHeader.insertBefore(accentLeft, panelHeader.firstChild);
            panelHeader.appendChild(accentRight);
        }

        // --- 2. Panel Header & Subheader Translation ---
        const elementsToTranslate = document.querySelectorAll('.main-content [data-translate-id]');
        elementsToTranslate.forEach(el => {
            const key = el.dataset.translateId;
            if (el.dataset.translated === 'true') return;
            if (translations[key] && !el.querySelector('.chinese-subtitle')) {

                // --- NEW FIX: Find the first text node to avoid destroying child HTML ---
                let textNode = null;
                for (const node of el.childNodes) {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
                        textNode = node;
                        break;
                    }
                }

                if (textNode) {
                    // If we found a text node, insert the subtitle right after it.
                    const subtitle = createSubtitle(translations[key]);
                    textNode.parentNode.insertBefore(subtitle, textNode.nextSibling);
                } else if (el.children.length > 0) {
                    // If there's no main text but there are children, just append to the end.
                    el.appendChild(createSubtitle(translations[key]));
                } else {
                    // Fallback for simple elements with no children (old behavior)
                    const originalText = el.textContent.trim();
                    el.innerHTML = originalText; // Clear it first
                    el.appendChild(createSubtitle(translations[key]));
                }
                el.dataset.translated = 'true';
                // --- END NEW FIX ---
            }
        });
        
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
        } else if (hash === 'discover') {
            translateElement('#add-discover-item-btn', 'discover_add');
            translateElement('.discover-filters .btn[data-status="all"]', 'discover_filter_all');
            translateElement('.discover-filters .btn[data-status="planned"]', 'discover_filter_planned');
            translateElement('.discover-filters .btn[data-status="wishlist"]', 'discover_filter_wishlist');
            translateElement('.discover-filters .btn[data-status="visited"]', 'discover_filter_visited');
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
            translateElement('.realm-portal[data-section="observatory"] .realm-title', 'guide_wing_observatory');
            translateElement('.realm-portal[data-section="physics"] .realm-title', 'guide_wing_physics');
            translateElement('.realm-portal[data-section="anatomy"] .realm-title', 'guide_wing_anatomy');
            translateElement('.realm-portal[data-section="artifacts"] .realm-title', 'guide_wing_artifacts');
            translateElement('.realm-portal[data-section="lexicon"] .realm-title', 'guide_wing_lexicon');
        } else if (hash === 'voice-garden') {
            translateElement('#vg-total-flowers + .stat-desc', 'vg_total_flowers');
            translateElement('#vg-filter-count + .stat-desc', 'vg_filter_count');
            translateElement('#vg-garden-age + .stat-desc', 'vg_garden_age');
            translateElement('.garden-filters .stat-desc', 'vg_show');
            translateElement('#vg-filter-all', 'vg_all');
            translateElement('#vg-filter-en', 'vg_en');
            translateElement('#vg-filter-zh', 'vg_zh');
        } else if (hash === 'sanctum') {
            // Titles for the realms once you enter them
            translateElement('#comfortRealm .section-title', 'sanctum_comfort_title');
            translateElement('#celebrateRealm .section-title', 'sanctum_celebrate_title');
            translateElement('#hurtRealm .section-title', 'sanctum_hurt_title');
            translateElement('#guidanceRealm .section-title', 'sanctuary_guidance_title');
            translateElement('#fortuneRealm .section-title', 'sanctuary_fortune_title');
        }
        // --- NEW: Translate Alternate Universe Cards ---
        else if (hash === 'universes') {
            const universeCards = document.querySelectorAll('.universe-card');
            universeCards.forEach(card => {
                const titleEl = card.querySelector('.universe-title');
                const eraEl = card.querySelector('.universe-era');
                if (titleEl) translateElement(`[data-translate-id="${titleEl.dataset.translateId}"]`, titleEl.dataset.translateId);
                if (eraEl) translateElement(`[data-translate-id="${eraEl.dataset.translateId}"]`, eraEl.dataset.translateId);
            });
        }
        // --- END NEW ---
        
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
            const panelSubheader = document.querySelector('.main-content .panel-subheader');
            const insertAfterElement = panelSubheader || panelHeader;

            if (mainContent && insertAfterElement) {
                insertAfterElement.parentNode.insertBefore(poetryBox, insertAfterElement.nextSibling);
            } else if (mainContent && mainContent.firstChild) {
                mainContent.insertBefore(poetryBox, mainContent.firstChild.nextSibling);
            }
            
            // --- NEW: Animate the poetry text ---
            animateTextWrite('.main-content .poetry-zh');
        }

        // --- 5. Add Red Thread Divider ---
        const mainContent = document.querySelector('.main-content');
        if (mainContent && !mainContent.querySelector('.red-thread-divider')) {
            const redThread = document.createElement('div');
            redThread.className = 'red-thread-divider';
            
            const firstHr = mainContent.querySelector('hr');
            if (firstHr) {
                firstHr.replaceWith(redThread);
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
            lanterns.id = 'lantern-toggle-left'; // This is the left button
            // Styles are now controlled by common.css
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
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Panel content was added, enhance it
                    enhanceActivePanel();
                }
                else if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
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
    if (window.location.hash && window.location.hash !== '#home') {
        // We need to wait for control.js to render the panel
        setTimeout(enhanceActivePanel, 500); // Give it half a second
    }
    
    // --- NEW: Add Blooming Cursor listener ---
    document.addEventListener('click', function(e) {
        if (!aestheticsEnabled) return; // Check if aesthetics are toggled off

        // *** FIX: Do not create a bloom if the click is on a planet ***
        if (e.target.closest('.planet')) return;

        let bloom = document.createElement('div');
        bloom.className = 'click-bloom'; // The class for the animation
        bloom.textContent = '🌸';
        bloom.style.left = e.clientX + 'px';
        bloom.style.top = e.clientY + 'px';
        bloom.style.transform = `scale(${Math.random() * 0.5 + 0.7}) rotate(${Math.random() * 360}deg)`;
        bloom.style.opacity = Math.random() * 0.5 + 0.5;
        document.body.appendChild(bloom);
        
        // Remove the element after the animation finishes
        setTimeout(() => {
            bloom.remove();
        }, 500);
    });

    console.log('✨ Chinese Aesthetics Module Initialized Successfully');
});

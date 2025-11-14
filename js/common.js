// ===================================================================
//  COMMON CONFIGURATION & DATA
// ===================================================================

import { RAW_BOOK } from './book_content.js';

/**
 * Editable configuration data.
 * This is exported so main.js can load it from the server.
 */
export let EDITABLE_CONFIG = {
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
    GALLERY_CATEGORIES: { 'cooking': '🍳 Food', 'travel': '✈️ Trip', 'random': '🎲 Random', 'intimate': '💕 Intimate', 'zoya': '🌸 Zoya', 'nicholas': '📖 Nic' },
    DISCOVER_DATA: [
        {
            id: 'discover_001',
            title: 'Fushimi Inari Shrine at Night',
            location: 'Kyoto, Japan',
            date: '2024-01-01',
            status: 'visited',
            description: 'Our first adventure of the new year, visiting the iconic Fushimi Inari Shrine after dark. The lanterns cast a magical glow on the thousands of torii gates, creating an unforgettable, mystical atmosphere. It felt like stepping into another world with you.',
            link: 'https://www.google.com/maps/place/Fushimi+Inari+Taisha/@34.9671402,135.7726717,17z',
            photos: ['photos/photo7.jpg', 'photos/photo4.jpg']
        },
        {
            id: 'discover_002',
            title: 'Arashiyama Bamboo Grove & Observation Deck',
            location: 'Kyoto, Japan',
            date: '2021-11-20',
            status: 'visited',
            description: 'One of our earliest and most cherished memories. We explored the towering bamboo grove, feeling so small and serene among the giant stalks. The view from the observation deck was breathtaking, but not as breathtaking as the view of you. This day solidified so much of what we were becoming.',
            link: 'https://www.google.com/maps/place/Arashiyama+Bamboo+Grove/',
            photos: ['photos/photo4.jpg']
        },
        {
            id: 'discover_003',
            title: 'Tenryu-ji Temple Gardens',
            location: 'Arashiyama, Kyoto, Japan',
            date: '2022-05-15',
            status: 'visited',
            description: 'A peaceful day spent wandering through the stunning gardens of Tenryu-ji. The vibrant colors of the flowers and the calm of the pond were a perfect reflection of the beauty and peace I feel with you. We sat for a long time, just enjoying the quiet company.',
            link: 'https://www.google.com/maps/place/Tenryu-ji+Temple/',
            photos: ['photos/photo5.jpg']
        },
        {
            id: 'discover_004',
            title: 'First Onsen Trip Together',
            location: 'Hakone, Japan',
            date: '2023-02-10',
            status: 'visited',
            description: 'A huge step in our journey! Our first onsen trip was filled with laughter, relaxation, and the quiet intimacy of sharing such a traditional and peaceful experience. It was a weekend of pure bliss and connection, away from the rest of the world.',
            link: 'https://www.google.com/maps/place/Hakone/',
            photos: ['photos/photo6.jpg']
        },
        {
            id: 'discover_005',
            title: 'Future Trip to Okinawa',
            location: 'Okinawa, Japan',
            date: '2026-08-15',
            status: 'wishlist',
            description: 'A dream for the future: a beach getaway to the beautiful islands of Okinawa. We can go snorkeling in the clear blue waters, explore the unique Ryukyuan culture, and relax on the white sandy beaches. It will be our perfect summer escape.',
            link: 'https://www.google.com/maps/place/Okinawa+Prefecture,+Japan/',
            photos: []
        }
    ]
};

/**
 * Global application state.
 */
export const AppState = { 
    bookUnlocked: false, 
    activePanel: 'home', 
    chapters: [], 
    currentChapterIndex: 0, 
    currentGalleryCategory: 'all', 
    gallery: { showAll: false, lightboxIndex: 0, currentPhotoList: [] }, 
    music: { player: null, isPlaying: false, currentIndex: 0, isShuffled: false, albumArtInterval: null, albumArtIndex: 0 }, 
    quill: null, 
    editingChapterId: null,
    chronicleEvents: [], 
    editingUniverseId: null, // To track which universe is being edited
    editingChapterIndex: null, // To track which chapter index is being edited
    thenNowState: { availableIndices: [], currentIndexInAvailable: 0, lastReveal: null }, 
    complimentInterval: null, 
    webAnimationLandingId: null, 
    webAnimationMainId: null, 
    spiralAnimationLandingId: null, 
    spiralAnimationMainId: null,
    passwordsTemporarilyBypassed: false,
    moodLoading: false,
    moodSyncEnabled: false,
    solarSystem: { // New object to manage solar system related intervals
        planetTrailIntervals: [],
        shootingStarInterval: null,
    }
};

/**
 * Shared data arrays.
 */
export let CHRONICLE_DATA = [
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
    // --- NEW: Added recent events for heatmap visibility ---
    , { year: 'Jan 15, 2024', title: 'Winter Wonderland Trip', desc: 'Explored snowy landscapes and cozy cafes.', icon: '❄️' }
    , { year: 'Mar 08, 2024', title: 'Cherry Blossom Picnic', desc: 'Enjoyed the beautiful sakura blooms together.', icon: '🌸' }
    , { year: 'May 20, 2024', title: 'Beach Day Getaway', desc: 'Sun, sand, and sea. Perfect escape.', icon: '🏖️' }
    , { year: 'Aug 25, 2024', title: 'Third Anniversary Celebration', desc: 'Another year, stronger than ever.', icon: '💖' }
    , { year: 'Oct 31, 2024', title: 'Halloween Fun', desc: 'Costumes and spooky movie night.', icon: '🎃' }
    , { year: 'Nov 10, 2024', title: 'Cozy Autumn Evening', desc: 'Warm drinks and good conversation.', icon: '☕' } // Within the last year
    , { year: 'Dec 25, 2024', title: 'Christmas Magic', desc: 'Exchanged gifts and shared joy.', icon: '🎄' }
    , { year: 'Jan 01, 2025', title: 'New Year, New Adventures', desc: 'Welcomed the new year with hopes and dreams.', icon: '✨' }
    , { year: 'Feb 14, 2025', title: 'Valentine\'s Day Surprise', desc: 'Romantic dinner and heartfelt gifts.', icon: '💘' }
    , { year: 'Apr 05, 2025', title: 'Spring Festival', desc: 'Celebrated with traditional food and festivities.', icon: '🏮' }
    , { year: 'Jun 12, 2025', title: 'Summer Road Trip', desc: 'Explored new towns and made new memories.', icon: '🚗' }
    , { year: 'Aug 25, 2025', title: 'Fourth Anniversary', desc: 'Four years of incredible journey.', icon: '💞' }
    , { year: 'Sep 28, 2025', title: 'Autumn Hike', desc: 'Enjoyed the fall foliage.', icon: '🍂' }
    , { year: 'Oct 20, 2025', title: 'Movie Marathon Night', desc: 'Popcorn and our favorite films.', icon: '🎬' }
    , { year: 'Nov 05, 2025', title: 'Cooking Together', desc: 'Experimented with a new recipe.', icon: '🍳' } // Very recent
];

export const COMPLIMENTS = [
    "You make my world brighter, baobei.", "Thinking of you, Zoy. ❤️", "Every moment with you is a treasure, baobei.",
    "Zoy, your kindness is a gentle magic.", "Our love story is my favorite, baobei.", "You are my calm in the chaos, Zoy.",
    "Just a random 'I love you', baobei.", "Thank you for being you, Zoy.", "My heart is always with you, baobei."
];

export let ALTERNATE_UNIVERSES = [
    {
        id: 'ancient_china',
        title: 'The Scholar & The Artist',
        era: 'Ancient China (206 BCE)',
        icon: '🏛️',
        image: 'photos/alternate universe/Ancient China (206 BCE).png',
        theme: 'Historical Romance',
        setting: 'Han Dynasty, along the ancient Silk Road',
        premise: 'In the bustling trading post of the Silk Road, a traveling scholar from distant Uganda lands (Nicholai of the West) encounters Zhang Zoya, an imperial calligrapher whose brush captures the stars themselves. Their forbidden love blooms amidst political intrigue, poetry exchanges, and secret meetings under the willow trees.',
        characters: {
            nic: { name: 'Nicholai of the West', role: 'Scholar & Mathematician from distant lands' },
            zoya: { name: 'Zhang Zoya', role: 'Imperial Calligrapher & Poet' }
        },
        chapters: [
            {
                title: 'The Silk Road Encounter',
                content: `The dust of a thousand miles clung to Nicholai's robes as he approached the trading post at dawn. He had traveled far from his homeland, carrying scrolls of mathematics unknown in these eastern lands. The foreign equations danced in his mind like mystical spells.

Through the morning mist, he saw her for the first time. Zhang Zoya sat beneath a willow tree, brush in hand, painting characters onto silk with such grace that even the birds seemed to pause and watch. Her hair was bound with jade pins, and her robes whispered secrets of the imperial court.

"What are you writing?" he asked in broken Mandarin, his deep voice carrying the accent of distant deserts.

She looked up, eyes like dark pools reflecting starlight. "I am not writing," she replied softly. "I am dreaming with ink. Each stroke carries the weight of heaven."

He knelt beside her, captivated. "In my land, we dream with numbers. May I show you?"

From his leather satchel, he produced a scroll covered in geometric patterns and mathematical proofs. Her eyes widened with wonder at the foreign symbols that somehow spoke of universal truths.

"Your numbers... they dance like my characters," she whispered, tracing a finger along an equation. "Perhaps all languages eventually speak the same truth."

And so began their unlikely friendship, two souls from opposite ends of the world, united by the belief that beauty transcends borders—whether captured in ink or calculated in stars.`
            },
            {
                title: 'Lessons in Calligraphy',
                content: `"Your hand is too rigid," Zoya laughed softly, guiding Nicholai's grip on the brush. "Let the characters flow like water, not march like soldiers."

They sat in her father's garden, hidden from the eyes of the court. Each meeting was a risk—fraternizing with foreigners was discouraged, even dangerous. But neither could resist the pull between them.

"In my homeland," Nicholai said, struggling with the brush, "we value precision. Every line must be exact, measured."

"Here," Zoya countered, her hand gently correcting his posture, "we value the spirit within the line. See?" She demonstrated, her brush creating a character that seemed to breathe with life. "This is 'yuan'—fate, destiny. The character itself must feel destined."

Nicholai watched her, mesmerized not by the calligraphy but by the artist herself. "Teach me to write 'love,'" he said quietly.

She paused, meeting his gaze. The air between them changed, charged with unspoken emotion. Slowly, she guided his hand, their fingers touching as they formed the character together.

"'Ai,'" she whispered. "It means love. But also, it means to cherish, to hold precious."

"Zhang Zoya," he began, but she placed a finger to his lips.

"The walls have ears, Scholar. And hearts have eyes that see too much."

But they both knew—it was already too late. Their hearts had seen everything.`
            },
            {
                title: 'The Imperial Summons',
                content: `The summons arrived on a morning painted with frost. Zoya was called to the Forbidden City to create a commemorative scroll for the Emperor's birthday. It was the highest honor a calligrapher could receive—and a gilded cage from which she might never return.

"Three months," she told Nicholai during their final stolen meeting before her departure. "Perhaps longer. The court is... complicated."

"Then I will wait three months," he said firmly. "I have crossed deserts and mountains to reach this place. What are a few more months?"

She pressed a folded silk into his hands. "I wrote something for you. Read it when the moon is full, and know that I am looking at the same moon, thinking of you."

The scroll contained a poem, each character a testament to her feelings:

*"Across the silk roads we found each other,  
Two stars from different skies,  
Yet governed by the same celestial laws.  
Distance is but illusion,  
For in my ink, you live eternal."*

As her carriage disappeared into the morning mist, Nicholai clutched the silk scroll, his mathematical mind trying to calculate the probability of their reunion. But the heart, he was learning, operated by different mathematics entirely—the mathematics of faith.`
            }
        ],
        stats: { chapters: 3, words: 1847, lastUpdated: '3 days ago' }
    },
    {
        id: 'space_explorers',
        title: 'Across the Stars',
        era: 'Space Age (2847 CE)',
        icon: '🚀',
        image: 'photos/alternate universe/Space Explorers (2847 CE).png',
        theme: 'Sci-Fi Adventure',
        setting: 'Deep space, aboard rival colony ships',
        premise: 'Captain Nicholas Lubega of the Earth Fleet encounters Navigator Zhang Zoya of the Chinese Space Coalition during a critical first-contact mission with an alien civilization. As their two factions teeter on the brink of interstellar war, Nic and Zoya must work together to save both their peoples—and discover that love can bloom even in the vacuum of space.',
        characters: {
            nic: { name: 'Captain Nicholas Lubega', role: 'Earth Fleet Commander & Tactical Genius' },
            zoya: { name: 'Navigator Zhang Zoya', role: 'Stellar Cartographer & Linguist' }
        },
        chapters: [
            {
                title: 'First Contact',
                content: `"Unknown vessel detected, Captain. Configuration matches Chinese Coalition design."

Captain Nicholas Lubega stared at the holographic display suspended before his command chair. After six months of deep space isolation, encountering another human ship should have been a relief. Instead, protocol demanded caution. The Earth Fleet and Chinese Coalition maintained an uneasy truce, but out here in uncharted space, allegiances were... flexible.

"Hail them," he commanded, his Ugandan accent carrying the weight of authority earned across a dozen star systems. "Open channels."

The viewscreen flickered to life, and Nicholas found himself staring at the most striking woman he'd ever seen. Her uniform bore the insignia of a Coalition Navigator—the elite cartographers who mapped the galaxy's infinite mysteries.

"Captain Lubega," she greeted, her voice crisp and professional. "I am Navigator Zhang Zoya of the Stellar Pathfinder. Before we engage in the traditional territorial posturing, you should know: we're both in danger."

He leaned forward, intrigued. "Explain."

"Thirty minutes ago, we detected an anomaly. Not natural. Not human. Something else." Her dark eyes met his through the screen, and he felt an unexpected jolt. "Whatever it is, it's heading for both our ships. And I calculate we have approximately four hours before it arrives."

"Four hours," Nicholas repeated. "Just enough time to either run away separately... or figure this out together."

Zoya smiled, and despite the cosmic distances between their vessels, Nicholas felt the universe shift slightly on its axis. "I was hoping you'd say that, Captain."

"Call me Nic. If we're going to save the galaxy, we might as well be on a first-name basis."

"Zoya," she replied. "And Nic? Welcome to first contact. Try not to start an interstellar incident."

"No promises, Navigator."

And so began the strangest alliance in human space history—one that would change everything.`
            },
            {
                title: 'The Anomaly',
                content: `The thing defied all known physics.

Nicholas watched the sensor data scroll across his neural implant, numbers that made no sense, readings that contradicted themselves. Beside him on the holographic bridge—beamed from her own ship—Zoya manipulated three-dimensional star charts with graceful gestures.

"It's not traveling through space," she explained, her hands painting constellations in the air. "It's folding space around itself. Look." She highlighted the distortions. "Traditional physics says this is impossible."

"Traditional physics," Nic countered, pulling up his own calculations, "hasn't accounted for mathematics from my homeland. Ancient equations that modern science dismissed as mysticism." He layered his holographic data over hers, and they gasped in unison.

The patterns matched. Her Eastern star charts aligned perfectly with his African mathematical models—two halves of a cosmic equation that humanity had never thought to combine.

"We need to work together," Zoya said softly. "Not just our ships. Us. Directly."

"You mean dock the ships? That violates a dozen treaties."

"I mean," she met his eyes through the hologram, "I need to come aboard your vessel. Physical proximity for neural synchronization. If we're going to calculate a defense, our minds need to work in concert."

The political implications were staggering. But the alternative was annihilation.

"Docking port alpha. Thirty minutes. Bring your star charts."

"And Nic?" She smiled. "Bring that brilliant mathematical mind. I have a feeling we're about to revolutionize human understanding of the universe."

"No pressure then."

As her ship maneuvered into position, Nicholas found himself wondering what was more dangerous—the alien anomaly approaching, or the way his heart raced at the thought of meeting her in person.

In space, no one can hear you fall in love. But the universe finds a way.`
            }
        ],
        stats: { chapters: 2, words: 1234, lastUpdated: '1 week ago' }
    },
    {
        id: 'renaissance_italy',
        title: 'The Painter\'s Muse',
        era: 'Renaissance Italy (1502)',
        icon: '🎨',
        image: 'photos/alternate universe/Renaissance Italy (1502).png',
        theme: 'Artistic Romance',
        setting: 'Florence, during the height of Renaissance art',
        premise: 'Struggling artist Niccolo di Lubega meets Lady Zoya, daughter of a visiting Chinese silk merchant. She becomes his muse, he teaches her perspective drawing. As their lessons evolve into love, they must navigate the rigid social hierarchies and prejudices of Renaissance Florence. Their love story becomes immortalized in paintings that will survive centuries.',
        characters: {
            nic: { name: 'Niccolo di Lubega', role: 'Painter & Sculptor' },
            zoya: { name: 'Lady Zoya Chen', role: 'Merchant\'s Daughter & Secret Artist' }
        },
        chapters: [
            {
                title: 'The Commission',
                content: `Niccolo's studio smelled of linseed oil and desperation. Three months behind on rent, his last commission a disaster, he was one failed painting away from abandoning art forever. The mathematics of survival were merciless—even a talented painter needed patrons, and his dark skin made many Florentine nobles... uncomfortable.

The bell above his door chimed. He looked up from mixing pigments to see an impossibility: a Chinese woman in silk robes, accompanied by an older merchant who could only be her father.

"You are Niccolo di Lubega?" the merchant asked in accented Italian. "The painter who studied under the African masters of perspective?"

"I am," Niccolo confirmed, setting down his palette. "Though I doubt many here appreciate those techniques."

"I am Chen Wei, silk merchant from the East. This is my daughter, Zoya. I have heard you paint with mathematical precision—that your understanding of space and light comes from distant knowledge."

Zoya stepped forward, and Niccolo's artist's eye catalogued her automatically: the grace of her movement, the intelligence in her gaze, the way light caught her features. She would be magnificent to paint.

"I wish to learn," she said in flawless Italian, her voice surprising him. "Not to be painted—to paint. My father says you can teach me perspective, the Western techniques. I can teach you in return—Eastern approaches to composition, the philosophy of the brush, the way ink captures spirit."

"You want to trade knowledge?" Niccolo asked, intrigued despite his circumstances.

"I want to learn from the best," she corrected. "And in Florence, you are the only one who might understand that beauty has no borders, that art transcends the color of one's skin or the land of one's birth."

Chen Wei placed a heavy purse on the table. "Three months of lessons. If my daughter shows talent, we extend. If not..." he shrugged.

But Niccolo was already nodding, not for the money (though he desperately needed it), but because he saw in Zoya's eyes something he'd been searching for in every model, every commission, every desperate painting: inspiration.

"When do we begin?"

"Now," Zoya smiled, already reaching for his brushes. "Teach me to see the world as you do, Niccolo di Lubega. And I will show you wonders."`
            }
        ],
        stats: { chapters: 1, words: 892, lastUpdated: '2 weeks ago' }
    },
    {
        id: 'medieval_fantasy',
        title: 'The Knight & The Sorceress',
        era: 'Medieval Fantasy (Timeless)',
        icon: '⚔️',
        image: 'photos/alternate universe/Medieval Fantasy (Timeless).png',
        theme: 'Fantasy Adventure',
        setting: 'Kingdom of Valoris, age of magic and steel',
        premise: 'Sir Nicholas the Brave, a knight from the distant Ugandan kingdoms, is sent on a quest to escort the mysterious Eastern sorceress Zhang Zoya to the Crystal Mountains. As they face dragons, dark magic, and their own growing feelings, they discover that true magic lies not in spells, but in the connection between two souls.',
        characters: {
            nic: { name: 'Sir Nicholas the Brave', role: 'Royal Knight & Dragon Slayer' },
            zoya: { name: 'Zoya the Enchantress', role: 'Sorceress of the Eastern Isles' }
        },
        chapters: [
            {
                title: 'The Whispering Woods',
                content: `Sir Nicholas the Brave rode through the Whispering Woods, his armor gleaming like a lone star in the twilight. His quest was simple, yet daunting: escort the sorceress from the East to the Crystal Mountains. He expected a fearsome crone, a wielder of dark and terrible powers.

He found her by a moonlit pond, not chanting incantations, but sketching the reflection of the stars in a small leather-bound book. Zoya the Enchantress was young, her eyes holding the depth of the night sky, her robes the color of twilight.

"You are the knight sent to guard me?" she asked, her voice like the gentle chime of bells.

Nicholas dismounted, taken aback. "I am Sir Nicholas. I am to escort you."

"Escort, or imprison?" she countered, a small, knowing smile on her lips. "My magic is not a weapon to be feared, Sir Knight. It is a language. It speaks with the earth, the sky, the water."

He watched as she dipped her finger in the pond, and the water glowed, showing them a vision of the treacherous path ahead. "In my homeland," he said, his voice softer than he intended, "we trust in steel and strength."

"And here," she replied, her gaze meeting his, "we trust in the connections between things. Perhaps your steel and my starlight can find a common path." In that moment, Nicholas knew this quest would be far more than a simple escort.`
            },
            {
                title: 'The Dragon\'s Pass',
                content: `The path ahead was blocked by a slumbering mountain dragon, its scales shimmering like obsidian in the afternoon sun. Its snores were like distant thunder. "We must turn back," Nicholas stated, his hand resting on the hilt of his sword. "No knight has ever passed this way and lived."

Zoya shook her head. "Fighting is not the only way, Sir Nicholas. This creature is ancient and wise, not merely a beast. It is grieving. Can't you feel its sorrow?"

Nicholas felt only the heat radiating from the dragon's hide. "I feel a threat."

"Then let me show you what I feel," she whispered. Zoya placed her hand on his armored chest, and a wave of cool, calming energy flowed through him. He suddenly felt a profound sadness that was not his own—a loneliness that echoed through the ages.

Zoya stepped forward, humming a soft, ancient lullaby from her homeland. The dragon's rumbling snores softened. She wove a spell of starlight, not to bind, but to comfort, creating a shimmering blanket of constellations over the great beast. The dragon stirred, opened one massive, molten-gold eye, and looked at her not with malice, but with understanding. It gave a low, mournful sigh, and then shifted its great bulk, clearing the path.

"How...?" Nicholas stammered, his sword forgotten.

"Magic is not about power, Sir Knight," Zoya said, turning back to him, her face illuminated by the magical light. "It is about empathy. You cannot slay a sorrow. You can only soothe it." Nicholas looked at his sword, then at her, and realized he had much to learn about the nature of true strength.`
            }
        ],
        stats: { chapters: 2, words: 1055, lastUpdated: '4 days ago' }
    },
    {
        id: 'studio_ghibli',
        title: 'Spirits of the Garden',
        era: 'Modern Fantasy (Present)',
        icon: '🌸',
        image: 'photos/alternate universe/Studio Ghibli (Present).png',
        theme: 'Magical Realism',
        setting: 'Rural Japan, where spirits still walk',
        premise: 'When Nicholas moves to rural Japan for work, he discovers an enchanted garden where Zoya can communicate with nature spirits. Together, they must protect the sacred garden from developers while learning that magic exists in the modern world for those willing to believe.',
        characters: {
            nic: { name: 'Nicholas (Nico)', role: 'City boy learning to see' },
            zoya: { name: 'Zoya', role: 'Guardian of the Spirit Garden' }
        },
        chapters: [
            {
                title: 'The Hidden Gate',
                content: `Nicholas sighed, the city noise still ringing in his ears even here, in the quiet countryside of Japan. He was a programmer, sent here for a six-month project, and he felt utterly out of place. His world was code and concrete, not cicadas and cedar trees.

One evening, chasing a cat that had stolen his sandwich, he stumbled upon a moss-covered gate he'd never noticed before. Pushing it open, he found himself in a garden that seemed to hum with a life of its own. Flowers glowed with a soft, internal light, and the air smelled of rain and honey.

A girl with a watering can looked up, startled. "You found the gate," she said, her voice as soft as moss. It was Zoya, the quiet librarian from the village.

"I... the cat..." Nicholas stammered, feeling foolish.

Zoya smiled. "The spirits led you here. They must think you need this place." She pointed to a small, fuzzy creature peeking from behind a stone lantern. "This is a Makkuro Kurosuke. A soot sprite. They like people who are a little bit lost."

Nicholas stared, his logical mind trying to process the impossible. "Spirits?"

"They're everywhere," Zoya said, her eyes sparkling. "You just have to learn how to see." She offered him a strange, luminous fruit. "Try this. It helps." And as he took a bite, the world around him shimmered, and for the first time, he saw the magic hiding in plain sight.`
            },
            {
                title: 'The Whispers of the Trees',
                content: `The next day, Nicholas returned to the garden, the taste of the luminous fruit still a memory on his tongue. The soot sprites now danced around his feet, and he could almost hear the ancient cedar tree sighing in the breeze.

Zoya was speaking to a cluster of tiny, frog-like spirits by the pond. "They're worried," she said as Nicholas approached. "They can feel the machines." She pointed towards the edge of the forest, where the distant sound of construction could be heard. "The developers. They want to build a shopping mall here. They don't know this garden is sacred."

Nicholas, the programmer, immediately thought of a logical solution. "We can file a petition. Check the zoning laws. I can build a website to raise awareness."

Zoya smiled sadly. "Their laws don't recognize the spirits, Nico. We can't fight their world with their rules. We have to remind the land of its own magic, make it too wild, too alive for them to tame."

That night, she took him to the heart of the garden. She taught him how to listen to the whispers of the trees, to feel the pulse of the earth beneath his feet. He watched, mesmerized, as she coaxed the vines to grow, weaving them into a living, thorny barrier at the garden's edge. He, in turn, used his phone's flashlight to create dancing patterns of light, which the spirits seemed to love, their chirps and clicks growing stronger and more joyful. He was a city boy, used to solving problems with code. But here, in Zoya's world, he was learning a new kind of logic—the logic of the heart, of nature, of magic.`
            }
        ],
        stats: { chapters: 2, words: 1018, lastUpdated: '4 days ago' }
    },
    {
        id: 'steampunk',
        title: 'Clockwork Hearts',
        era: 'Steampunk Victorian (1888)',
        icon: '⚙️',
        image: 'photos/alternate universe/Steampunk Inventors (1888).png',
        theme: 'Steampunk Romance',
        setting: 'Neo-London, age of steam and gears',
        premise: 'Inventor Nicholas Gearwright creates mechanical wonders in his workshop. When Lady Zoya Chen arrives from the Eastern Confederation with revolutionary clockwork blueprints, their collaboration sparks both innovation and romance in a world of brass, steam, and endless possibilities.',
        characters: {
            nic: { name: 'Nicholas Gearwright', role: 'Master Inventor & Engineer' },
            zoya: { name: 'Lady Zoya Chen', role: 'Clockwork Specialist from the East' }
        },
        chapters: [
            {
                title: 'The Eastern Blueprints',
                content: `Nicholas Gearwright’s workshop was a symphony of ticking clocks, hissing steam, and the scent of hot oil and ozone. His latest creation, a clockwork bird, refused to fly. Its gears were perfect, the math was sound, but it lacked... a soul.

The bell above his door chimed, announcing a client. But it was no ordinary Londoner. Lady Zoya Chen, from the Eastern Clockwork Confederation, stood there, holding a lacquered box. Her attire was a fusion of Victorian silk and intricate brass fittings.

"Mr. Gearwright," she said, her English precise, with a hint of a faraway accent. "I am told you are the finest inventor in Neo-London. I have a proposal."

She opened the box, revealing not gears and cogs, but delicate, paper-thin blueprints made of woven silk. They depicted a 'heart-drive', a mechanism that didn't just power a machine, but gave it a semblance of life, of purpose.

"This is... revolutionary," Nicholas breathed, his fingers tracing the elegant lines. "The mathematics are unlike anything I've ever seen. It's almost... poetic."

"In my homeland, we believe engineering is a form of poetry," Zoya replied. "But we lack your mastery of micro-servos and steam compression. I propose a collaboration. Your mechanics, and my heart-drive. Together, we could make our automatons not just move, but live."

Nicholas looked from the impossible blueprints to the brilliant woman who had brought them. He knew, with the certainty of a perfectly balanced gear, that his life was about to change forever.`
            },
            {
                title: 'The First Spark',
                content: `Their first week working together was a whirlwind of clashing philosophies. Nicholas, with his precise calipers and mathematical calculations, argued for efficiency and power. Zoya, with her delicate tools and focus on balance and flow, argued for grace and elegance.

"The power-to-weight ratio is all wrong!" Nicholas would exclaim, pointing at a diagram with a grease-stained finger.

"You are trying to force it," Zoya would counter softly, adjusting a tiny gear with a pair of tweezers. "A clockwork heart does not want to be a hammer. It wants to be a hummingbird."

The breakthrough came late one night. They were working on a prototype, a small, metallic spider. Nicholas had designed the legs for maximum speed, but they moved jerkily, unnaturally. Frustrated, he slumped over his workbench.

Zoya gently pushed his diagrams aside. "Stop thinking like an engineer for a moment, Nicholas. Think like a poet. What does a spider feel?" She took his hand and placed it on the cool metal casing. "It feels the vibrations of the web. It is patient. It is deliberate."

She began to hum, a low, melodic tune, as she made micro-adjustments to the heart-drive, synchronizing its rhythm with her song. Nicholas watched, fascinated, as he realized her "poetic" adjustments were actually a form of intuitive, complex wave-form analysis his own rigid mathematics had missed. He grabbed a new sheet of paper and began to scribble equations, not of force, but of resonance and harmony.

He layered his new math over her design. Suddenly, the spider's legs twitched. They moved, not with jerky speed, but with a silent, fluid grace. It took a step, then another, moving across the workbench with an eerie, lifelike quality.

They looked at each other, their faces illuminated by the gaslight, the smell of hot metal and ozone filling the air. In that moment, they weren't just inventors. They were creators. And in the shared spark of their creation, another, more dangerous spark had been ignited between them.`
            }
        ],
        stats: { chapters: 2, words: 1120, lastUpdated: '4 days ago' }
    },
    {
        id: 'modern_au',
        title: 'Coffee Shop Chronicles',
        era: 'Modern AU (Alternate 2019)',
        icon: '☕',
        image: 'photos/alternate universe/Modern AU (Alternate 2019).png',
        theme: 'Contemporary Romance',
        setting: 'University town, modern Japan',
        premise: 'What if things went differently? In this alternate 2019, Nicholas and Zoya meet at the same sports festival but become friends immediately—no overthinking, no hesitation. A lighter, fluffier take on your real story where everything comes easy, but the connection is just as real.',
        characters: {
            nic: { name: 'Nic', role: 'Engineering Student & Coffee Addict' },
            zoya: { name: 'Zoya', role: 'Art Student & Dreamer' }
        },
        chapters: [
            {
                title: 'The Sports Festival',
                content: `It was hot. Unbearably hot. Nic, an engineering student, had found refuge under the shade of a large oak tree, pretending to be engrossed in a textbook on thermodynamics. In reality, he was just trying to avoid being roped into the three-legged race at the university's sports festival.

Suddenly, a shadow fell over his book. "Is this seat taken?" a voice asked. He looked up and saw a girl with a sketchbook and a kind smile. It was Zoya, an art student from his elective Japanese history class.

"Uh, no, it's all yours," he managed, trying not to sound as flustered as he felt.

She sat down with a grateful sigh. "Thanks. I'm hiding from the cheerleading squad. They're trying to recruit me again." She opened her sketchbook, revealing a beautiful, half-finished drawing of the very tree they were sitting under.

"Wow, that's amazing," Nic said, genuinely impressed. "You really capture the... uh... the leafy-ness." He cringed internally. 'Leafy-ness'?

Zoya laughed, a bright, clear sound. "The 'leafy-ness'? I'll take it. Better than my professor, who just says my perspective is 'sub-optimal'." She glanced at his textbook. "Thermodynamics, huh? Trying to calculate the optimal way to avoid social interaction?"

Nic grinned. "You have no idea. But I have a feeling my calculations are about to be disrupted." He closed his book. "I'm Nic, by the way."

"Zoya," she replied, her eyes sparkling. "So, Nic the thermodynamics expert, what's the probability of two people hiding from a sports festival ending up under the same tree?"

"Given the current variables," he said, leaning in conspiratorially, "I'd say it's approaching 100%." And just like that, with no overthinking and no hesitation, their story began.`
            }
        ],
        stats: { chapters: 1, words: 1089, lastUpdated: '4 days ago' }
    },
    {
        id: 'jazz_age',
        title: 'Midnight in Shanghai',
        era: 'Jazz Age (1925)',
        icon: '🎷',
        image: 'photos/alternate universe/Jazz Age (1925).png',
        theme: 'Historical Romance',
        setting: 'Shanghai, during the Roaring Twenties',
        premise: 'Jazz pianist Nicholas "Nic" Lubega arrives in Shanghai\'s International Settlement seeking fame. At the Paradise Club, he meets Zoya, a singer whose voice captures the spirit of the age. Together, they navigate the glamorous and dangerous world of 1920s Shanghai, where music brings souls together across any divide.',
        characters: {
            nic: { name: 'Nicholas "Nic" Lubega', role: 'Jazz Pianist from New Orleans' },
            zoya: { name: 'Zoya Zhang', role: 'Jazz Singer & Shanghai Rose' }
        },
        chapters: [
            {
                title: 'The Paradise Club',
                content: `The air in Shanghai's Paradise Club was thick with smoke, perfume, and the intoxicating sound of jazz. Nicholas "Nic" Lubega, fresh off the boat from New Orleans, let his fingers dance across the ivory keys of the house piano. He was playing for his supper, a stranger in a strange land, his only companions the blues and a dream of making a name for himself.

Then, she stepped onto the stage. The spotlight found her, and the rowdy club fell silent. She was Zoya Zhang, known to the patrons as the "Shanghai Rose." Dressed in a shimmering, beaded cheongsam, she was a vision of modern elegance and ancient grace.

She began to sing. Her voice wasn't loud, but it cut through the haze, a soulful, melancholic melody that spoke of heartbreak and hope. It was a language Nic didn't understand, but a feeling he knew in his bones. He found his fingers moving on their own, weaving a counter-melody, his New Orleans blues wrapping around her Shanghai sorrow.

Her eyes found his across the stage. A flicker of surprise, then a small, appreciative nod. For the rest of the song, they were in their own world. Her voice and his piano, a conversation between two souls who had never met but had known each other forever.

When the song ended, the club erupted in applause. Zoya took her bow and walked directly to the piano. "I have never heard anyone play like that," she said in perfect, lilting English. "It was like you knew what my heart was trying to say."

"And I've never heard a voice that could tell a story in any language," Nic replied, his own voice rough with emotion. "My name is Nic."

"Zoya," she smiled. "It seems the Paradise Club has found its new sound." In the heart of the Roaring Twenties, in the most international city in the world, two different melodies had just become a single, unforgettable song.`
            }
        ],
        stats: { chapters: 1, words: 1042, lastUpdated: '4 days ago' }
    },
    {
        id: 'wild_west',
        title: 'Dust & Destiny',
        era: 'Wild West (1875)',
        icon: '🤠',
        image: 'photos/alternate universe/Wild West (1875).png',
        theme: 'Western Romance',
        setting: 'Arizona Territory, frontier town',
        premise: 'Sheriff Nicholas protects a small frontier town. When Zoya Zhang arrives with her family on the transcontinental railroad, prejudice threatens them both. Together, they must face outlaws, discrimination, and the harsh desert—discovering that love is the strongest force in the Wild West.',
        characters: {
            nic: { name: 'Sheriff Nicholas', role: 'Town Lawman & Protector' },
            zoya: { name: 'Zoya Zhang', role: 'Railroad Worker\'s Daughter' }
        },
        chapters: [
            {
                title: 'The Iron Horse Arrives',
                content: `The dust of the Arizona Territory was a permanent part of Sheriff Nicholas's life. It coated his boots, settled on his hat, and seemed to live in the lines on his face. He was the law in the small, burgeoning town of Redemption, a town that was about to change forever.

The clang of the hammer on steel announced the arrival of the transcontinental railroad. With it came a flood of new faces, including a group of Chinese workers and their families. Among them was Zoya Zhang, daughter of the crew's foreman. She was quiet and observant, her hands, though calloused from work, moved with a delicate grace.

Prejudice arrived in town right alongside the railroad. Whispers and suspicious glances followed Zoya and her family wherever they went. One afternoon, a group of rowdy cowboys began harassing her father in the general store.

Before it could escalate, the door swung open. Sheriff Nicholas stood there, his presence filling the doorway. He didn't draw his gun. He didn't raise his voice. He just looked at the cowboys with a calm, steady gaze. "This man is under the protection of the law in this town," he said, his voice a low rumble. "Which means he's under my protection. Is that going to be a problem?"

The cowboys, grumbling, shuffled out of the store. Zoya's father gave Nicholas a grateful, respectful bow. But it was Zoya's eyes that held him. They were filled not with fear, but with a quiet, fierce strength.

"Thank you, Sheriff," she said, her voice clear and steady.

"Just doing my job, ma'am," he replied, tipping his hat. But as he walked out into the dusty street, he knew his job in Redemption had just become a lot more personal. He wasn't just protecting a town anymore; he was protecting her.`
            }
        ],
        stats: { chapters: 1, words: 1029, lastUpdated: '4 days ago' }
    },
    {
        id: 'pirates',
        title: 'Tides of Fortune',
        era: 'Age of Sail (Unknown)',
        icon: '🏴‍☠️',
        image: 'photos/alternate universe/Sea Pirates (unknown).png',
        theme: 'Pirate Adventure',
        setting: 'South China Sea, pirate havens and hidden islands',
        premise: 'Captain Nicholas "Blackheart," a pirate with a code of honor, captures a merchant ship. Among the prisoners is Zoya Zhang, actually a disguised navigator with her own secrets. As they sail dangerous waters together, they discover that treasure comes in unexpected forms—and the greatest riches are the connections we forge.',
        characters: {
            nic: { name: 'Captain Nicholas "Blackheart"', role: 'Pirate Captain with a Code' },
            zoya: { name: 'Zoya Zhang', role: 'Navigator in Disguise' }
        },
        chapters: [
            {
                title: 'The Captured Cargo',
                content: `The merchant ship surrendered without much of a fight. Captain Nicholas "Blackheart," a name whispered in fear across the South China Sea, was known for his swift attacks and his unusual code of honor: he took the cargo, but never a life.

As his crew plundered the silks and spices, Nicholas inspected the ship's log. That's when he saw him—a young, slender boy huddled in the corner of the captain's cabin, clutching a collection of star charts.

"And who are you, lad?" Nicholas asked, his voice surprisingly gentle for a pirate.

"I am... a cabin boy," the youth replied, his voice higher than expected.

Nicholas raised an eyebrow. He'd been at sea long enough to know a lie when he heard one. He picked up one of the charts. The calculations were complex, the handwriting elegant. "A cabin boy who reads the stars better than my own navigator," he mused. "You're no cabin boy. You're the real treasure on this ship, aren't you?"

He reached out and gently pulled the oversized cap from the "boy's" head. A cascade of long, black hair fell free. It was a woman. Zoya Zhang. She met his gaze, her eyes defiant. "I am the navigator," she said, her chin held high. "And my charts are not for pirates."

Nicholas laughed, a deep, booming sound. "That's where you're wrong, my clever navigator. You and your charts are the only cargo I'm interested in today. You're going to guide my ship to the legendary Isle of Whispering Winds." He grinned. "Welcome aboard The Serpent's Kiss. Your new life as a pirate begins now." Zoya glared at him, but for the first time in years, Nicholas felt the thrill of a true adventure, one that had nothing to do with gold or jewels.`
            }
        ],
        stats: { chapters: 1, words: 1036, lastUpdated: '4 days ago' }
    }
];

export const GUIDE_RIDDLES = [
    {
        prompt: "To access the Astral Library, answer the keeper's question...",
        question: "What is the constant that defines our joy, measured in units of deliciousness?",
        choices: [
            { text: "Chicken Steak", isCorrect: true },
            { text: "Bubble Tea", isCorrect: false },
            { text: "Kimuchi Fried Rice", isCorrect: false }
        ]
    },
    {
        prompt: "The ancient texts demand a truth. What is the unbreakable bond that transcends distance?",
        question: "What was the item Nic fixed for Zoya, symbolizing his care?",
        choices: [
            { text: "Her phone", isCorrect: false },
            { text: "Her bicycle", isCorrect: true },
            { text: "Her laptop", isCorrect: false }
        ]
    },
    {
        prompt: "A whisper from the cosmos asks for a memory. What event proved Nic's unwavering determination?",
        question: "What natural disaster did Nic travel through to be with Zoya?",
        choices: [
            { text: "Earthquake", isCorrect: false },
            { text: "Typhoon", isCorrect: true },
            { text: "Blizzard", isCorrect: false }
        ]
    }
];

export const personalizedContent = {
    apology: [
        "My Zoya (我的宝贝), I'm sorry if I ever get lost in my own world, like I did with that mathematics book on the day we met. You broke through my shyness then, and you deserve all my attention now. 对不起.",
        "I'm sorry if my quietness ever makes you feel distant. Sometimes I'm still that boy who was scared to send a Facebook message, afraid of saying the wrong thing. But my heart is always talking to you.",
        "Forgive me if I ever seem clumsy with my feelings. I'm better at fixing bicycles than expressing what's in my heart, but I promise I'm always trying my best for you.",
        "对不起, my love. I'm sorry if I ever get too focused on my own plans, like when I wanted to rush back from Kyoto. It was only to see you, but your feelings should always come first.",
        "I apologize for any time I've made you feel unseen. You saw me when I felt invisible at the sports festival, and I promise to always see you, the true you.",
        "Sometimes my overthinking gets the best of me, and I'm sorry if that ever causes you worry. You are the calm to my storm, the answer to all my 'what ifs'.",
        "I'm sorry if I'm not always as expressive as I should be. You once called my goodnight message a 'sweet poem', and it meant the world to me. I'll try to write more poems for you.",
        "Forgive my shyness. Remember how I couldn't approach you in art class? I'm so glad we moved past that, and I'm sorry if my hesitation ever made you doubt my feelings.",
        "I'm sorry for being a silly boy who thought girls were 'complicated'. You taught me that love is the simplest, most beautiful thing in the world. Thank you for your patience.",
        "对不起. I'm sorry if my husky voice ever speaks a sharp word. It was the first thing you noticed about me, and I only ever want it to speak words of love and kindness to you."
    ],
    promise: [
        "To make it up to you, I promise to put my world on pause and listen, just like you always listen to me talk about mathematics.",
        "I promise to always come to your home, just like I did when I worried about your dream, to make sure you're okay and see your beautiful smile.",
        "I promise to take you on a date to Joyful, just us, for chicken steak and to remember how our story began.",
        "As compensation, let's have an art date. We can draw together, and I'll sketch your face like I promised, as if you're the first and only person I've ever drawn.",
        "I promise a full day of your favorite Chinese dramas, and I won't complain once. I'll even try to learn some phrases!",
        "To make it right, I'll cook for you, just like your father cooked for me. It's my turn to welcome you with a warm meal and a full heart.",
        "I promise to hold you and never let go, a cuddle more powerful than the typhoon that couldn't keep me away from you."
    ],
    comfort: [
        "Remember when we were two 'forlorn birds in a foreign land'? No matter how lonely the world feels, you are not alone. I'm here, and my heart is your home.",
        "Let my love be like the blanket that covers you when you sleep, chasing away all the worries and pains, just like in the goodnight message I sent.",
        "You are the girl with hair like 'strands of heaven'. Let me gently stroke your hair until all your sadness melts away.",
        "The world saw a boy with a book; you saw me. When you feel down, remember that I will always see the incredible, beautiful you. 我爱你."
    ],
    sweet: [
        "You deserve all the sweet things in the cosmos. Let's get your favorite dessert, find a quiet place, and just be together.",
        "My love for you is sweeter than any cake. But a cake would be nice too, right? Your wish is my command."
    ],
    pamper: [
        "You once appeared in my dreams looking unhappy, and it made me rush to your side. Let me erase all your worries with a day of pure relaxation. You deserve to be treated like the queen you are.",
        "Let me take care of you. A full spa day, a massage, anything you need to feel refreshed and cherished."
    ],
    qualityTime: [
        "Remember our first real 'date' at the library? Let's go back. We don't have to talk, we can just exist in the same space, together. That's all I need.",
        "No phones, no distractions. Just you and me, like that first conversation at the sports festival where the whole world disappeared."
    ],
    dinner: [
        "Let's celebrate your victory! How about we go to Joyful for our special chicken steak? A tribute to the day our journey really began.",
        "Your achievement deserves a feast worthy of your family's hospitality. I'll find the best place to honor you tonight."
    ],
    shopping: [
        "You are a treasure. For this great accomplishment, you deserve a material treasure of your choice. Let's go find something as beautiful as you are.",
    ],
    adventure: [
        "Let's go on a spontaneous adventure! Maybe not as dramatic as me jogging to your house to fix a bicycle, but just as memorable.",
        "You deserve a victory trip. Maybe we can finally take some cityscape photos in Kyoto together."
    ],
    queen: [
        "For the next 24 hours, you are the absolute ruler. Your every wish is my command. No task too great, no request too small for my queen.",
    ],
    amends: [
        "To balance the scales, you can choose your compensation: a trip to the restaurant of your choice, a shopping spree for something that makes you smile, or an adventure to create a new happy memory.",
        "The cosmos demands balance. Therefore, I offer a 'Customized Coupon' just like the one Zoya wanted. You can redeem it for absolutely anything your heart desires."
    ],
    burden: [
        "For one full week, all your chores are mine. No dishes, no worries. Your only job is to rest and feel loved.",
        "Tell me the heaviest thing on your mind. For the next three days, I will carry that worry for you so you can be peace."
    ]
};

// ===================================================================
//  COMMON DOM SELECTORS
// ===================================================================

export const $ = (id) => document.getElementById(id);
export const $$ = (selector) => document.querySelectorAll(selector);

// We define DOM elements here that are *always* present in index.html
export const DOM = {
    landingGate: $('landing-gate'),
    celestialSanctuary: $('celestial-sanctuary'),
    bookPasswordGate: $('book-password-gate'),
    bookPasswordInput: $('book-password-input'),
    unlockBookBtn: $('unlock-book-btn'),
    solarSystemContainer: $('solar-system-container'),
    mainContent: document.querySelector('.main-content'), // Corrected from main.main-content
    planetNameDisplay: $('planet-name-display'),
    chapterMetaModal: $('chapter-meta-modal'),
    editorModal: $('editor-modal'),
    editorTitle: $('editor-title'),
    saveEditBtn: $('save-edit-btn'),
    cancelEditBtn: $('cancel-edit-btn'),
    lightbox: $('lightbox'),
    lightboxImg: $('lightbox-img'),
    lightboxCaption: $('lightbox-caption'),
    scrollToTopBtn: $('scroll-to-top'),
    lightboxPrev: document.querySelector('.lightbox-prev'),
    lightboxNext: document.querySelector('.lightbox-next'),
};

// ===================================================================
//  API & DATA HELPERS
// ===================================================================

export const API_URL = 'http://127.0.0.1:5000/api'; // The base URL of your server

export async function loadDataFromServer() {
    // ===================================================================
    //  NO-PYTHON MODE: Force the app to use local data.
    // ===================================================================
    // This function now exclusively loads data from the local JS files,
    // ensuring the site works perfectly without a Python backend. The API
    // functions (apiAddItem, etc.) will still attempt to contact the server
    // if called, but the initial data load is now self-contained.
    
    console.log("Static Mode: Loading all data from local JS files.");
    
    // The other data arrays are already populated. We just need to parse the Tome.
    AppState.chapters = parseRawBookContent();
    console.log(`Successfully parsed ${AppState.chapters.length} chapters from local book_content.js.`);
}

// Function to parse the RAW_BOOK string into structured chapter objects
function parseRawBookContent() {
    const chapters = [];
    const chapterBlocks = RAW_BOOK.split('===CHAPTER===').filter(block => block.trim() !== '');

    chapterBlocks.forEach((block, index) => {
        const titleMatch = block.match(/TITLE:\s*(.*)/);
        const authorMatch = block.match(/AUTHOR:\s*(.*)/);
        const dateMatch = block.match(/DATE:\s*(.*)/);
        const contentMatch = block.match(/===CONTENT===\s*([\s\S]*)/);

        if (titleMatch && authorMatch && dateMatch && contentMatch) {
            const title = titleMatch[1].trim();
            const author = authorMatch[1].trim();
            const dateStr = dateMatch[1].trim();
            let content = contentMatch[1].trim();

            // --- REWRITTEN PARSER ---
            // 1. Split by double newlines to get all paragraphs/speaker tags
            const paragraphs = content.split(/\n\s*\n/);
            
            // 2. Map them to <p> tags
            content = paragraphs
                .map(p => p.trim()) // Clean up whitespace
                .filter(p => p.length > 0) // Remove empty lines
                .map(p => {
                    if (p === '[NIC]' || p === '[ZOY]') {
                        // This is a speaker tag
                        return `<p class="speaker-tag"><strong>${p}</strong></p>`;
                    }
                    // This is a normal paragraph
                    return `<p>${p}</p>`;
                })
                .join(''); // Join them back together
            // --- END REWRITTEN PARSER ---

            chapters.push({
                id: `local_chapter_${index}`, // Assign a local ID for local chapters
                title: title,
                author: author,
                date: new Date(dateStr),
                content: content
            });
        }
    });
    return chapters;
}

export async function apiAddItem(dataType, itemData) {
    try {
        const response = await fetch(`${API_URL}/${dataType}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemData),
        });
        if (!response.ok) throw new Error('Server error');
        const savedItem = await response.json();
        const dataMap = {
            'gallery': EDITABLE_CONFIG.PHOTOS_DATA,
            'music': EDITABLE_CONFIG.SONGS_DATA,
            'discover': EDITABLE_CONFIG.DISCOVER_DATA,
            'timeline': CHRONICLE_DATA,
            'universes': ALTERNATE_UNIVERSES,
            'tome': AppState.chapters
        };
        if (dataMap[dataType]) {
            dataMap[dataType].push(savedItem);
        }
        return savedItem;
    } catch (error) {
        console.error(`Failed to add item to ${dataType}:`, error);
        alert(`Error: Could not add new ${dataType} item.`);
        return null;
    }
}

export async function apiUpdateItem(dataType, itemId, itemData) {
    try {
        const response = await fetch(`${API_URL}/${dataType}/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemData),
        });
        if (!response.ok) throw new Error('Server error');
        const savedItem = await response.json();
        const dataMap = { 'gallery': EDITABLE_CONFIG.PHOTOS_DATA, 'music': EDITABLE_CONFIG.SONGS_DATA, 'discover': EDITABLE_CONFIG.DISCOVER_DATA, 'timeline': CHRONICLE_DATA, 'universes': ALTERNATE_UNIVERSES, 'tome': AppState.chapters };
        if (dataMap[dataType]) {
            const index = dataMap[dataType].findIndex(item => item.id === itemId);
            if (index !== -1) {
                dataMap[dataType][index] = savedItem;
            }
        }
        return savedItem;
    } catch (error) {
        console.error(`Failed to update item in ${dataType}:`, error);
        alert(`Error: Could not update ${dataType} item.`);
        return null;
    }
}

export async function apiDeleteItem(dataType, itemId) {
    if (!itemId) return;
    try {
        const response = await fetch(`${API_URL}/${dataType}/${itemId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Server error');
        const dataMap = { 'gallery': 'PHOTOS_DATA', 'music': 'SONGS_DATA', 'discover': 'DISCOVER_DATA', 'timeline': null, 'universes': null, 'tome': null };
        const configKey = dataMap[dataType];
        if (configKey) {
            EDITABLE_CONFIG[configKey] = EDITABLE_CONFIG[configKey].filter(item => item.id !== itemId && item.src !== itemId);
        } else if (dataType === 'timeline') {
            CHRONICLE_DATA = CHRONICLE_DATA.filter(item => item.id !== itemId);
        } else if (dataType === 'universes') {
            ALTERNATE_UNIVERSES = ALTERNATE_UNIVERSES.filter(item => item.id !== itemId);
        } else if (dataType === 'tome') {
            AppState.chapters = AppState.chapters.filter(item => item.id !== itemId);
        }
        return true;
    } catch (error) {
        console.error(`Failed to delete item from ${dataType}:`, error);
        alert(`Error: Could not delete the ${dataType} item.`);
        return false;
    }
}

// ===================================================================
//  GLOBAL MODAL CONTROLLERS (MOVED FROM MAIN.JS)
// ===================================================================

// --- Book Password ---
export function handleBookPasswordAttempt() {
    const entered = (DOM.bookPasswordInput.value || '').toLowerCase().replace(/\s/g, '');
    if (AppState.passwordsTemporarilyBypassed) {
        DOM.bookPasswordGate.classList.remove('active');
        AppState.bookUnlocked = true;
        window.location.hash = 'book'; // Trigger hash change to load the panel
        return;
    }
    if (entered === (EDITABLE_CONFIG.bookPassword || 'nini').toLowerCase()) {
        DOM.bookPasswordGate.classList.remove('active');
        AppState.bookUnlocked = true;
        window.location.hash = 'book'; // Trigger hash change to load the panel
    } else {
        DOM.bookPasswordInput.classList.add('shake-error'); 
        setTimeout(() => DOM.bookPasswordInput.classList.remove('shake-error'), 500);
    }
}

// --- Chapter Editor ---
export function openNewChapterMeta() {
    $('new-chapter-title').value = '';
    $('new-chapter-author').value = 'Nini & Zoya';
    $('new-chapter-date').value = new Date().toISOString().split('T')[0];
    DOM.chapterMetaModal.classList.add('active');
}

export async function handleContinueMeta() {
    const title = $('new-chapter-title').value;
    const author = $('new-chapter-author').value;
    const date = $('new-chapter-date').value;
    if (!title || !author || !date) { alert("Please fill out all fields."); return; }
    
    const newChapterData = { title: title, author: author, date: date, content: "<p>This is a new chapter. Start writing...</p>" };
    DOM.chapterMetaModal.classList.remove('active');
    
    const savedChapter = await apiAddItem('tome', newChapterData);
    if(savedChapter) {
        AppState.currentChapterIndex = AppState.chapters.length - 1;
        // If we are on the book page, re-render it
        if(AppState.activePanel === 'book') {
            window.location.hash = 'book'; // Re-triggering hash is easiest way
        }
        openEditor(savedChapter.id);
    }
}

export function openEditor(chapterId) {
    const chapter = AppState.chapters.find(chap => chap.id === chapterId);
    if (!chapter || !AppState.quill) return;
    AppState.editingUniverseId = null; // Clear universe editing state
    AppState.editingChapterIndex = null; // Clear universe editing state
    AppState.editingChapterId = chapterId; 
    $('editor-title').textContent = `Editing: ${chapter.title}`;
    const delta = AppState.quill.clipboard.convert(chapter.content);
    AppState.quill.setContents(delta, 'silent');
    DOM.editorModal.classList.add('active');
}

export function openUniverseEditor(universeId, chapterIndex) {
    const universe = ALTERNATE_UNIVERSES.find(u => u.id === universeId);
    if (!universe || !AppState.quill) return;

    AppState.editingChapterId = null; // Clear tome editing state
    AppState.editingUniverseId = universeId;
    AppState.editingChapterIndex = chapterIndex;

    const isNewChapter = chapterIndex === -1;
    const chapter = isNewChapter ? null : universe.chapters[chapterIndex];

    $('editor-title').textContent = isNewChapter
        ? `New Chapter for: ${universe.title}`
        : `Editing: ${chapter.title}`;
    
    $('universe-chapter-title-group').style.display = isNewChapter ? 'block' : 'none';
    $('universe-new-chapter-title').value = '';

    const content = isNewChapter ? "<p>Start writing your new chapter...</p>" : chapter.content;
    AppState.quill.setContents(AppState.quill.clipboard.convert(content), 'silent');
    DOM.editorModal.classList.add('active');
}

export async function saveChapter() {
    if (AppState.editingChapterId) {
        // --- Saving a Tome Chapter ---
        const chapterId = AppState.editingChapterId;
        const chapter = AppState.chapters.find(chap => chap.id === chapterId);
        if (!chapter) return;
        const newContent = AppState.quill.root.innerHTML;
        const updatedData = { ...chapter, content: newContent };
        
        const savedChapter = await apiUpdateItem('tome', chapterId, updatedData);
        if(savedChapter) {
            DOM.editorModal.classList.remove('active');
            AppState.editingChapterId = null;
            const index = AppState.chapters.findIndex(c => c.id === chapterId);
            if (index !== -1) AppState.chapters[index] = savedChapter;
            
            if(AppState.activePanel === 'tome' && window.renderChapterContent) {
                window.renderChapterContent(index);
                window.renderChapterList();
            }
        }
    } else if (AppState.editingUniverseId) {
        // --- Saving a Universe Chapter ---
        const universeId = AppState.editingUniverseId;
        const chapterIndex = AppState.editingChapterIndex;
        const universe = ALTERNATE_UNIVERSES.find(u => u.id === universeId);
        if (!universe) return;

        const newContent = AppState.quill.root.innerHTML;

        if (chapterIndex === -1) {
            // New Chapter
            const newTitle = $('universe-new-chapter-title').value;
            if (!newTitle) { alert("Please enter a title for the new chapter."); return; }
            const newChapter = { title: newTitle, content: newContent };
            universe.chapters.push(newChapter);
        } else {
            // Existing Chapter
            universe.chapters[chapterIndex].content = newContent;
        }

        // Update stats
        universe.stats.lastUpdated = 'Just now';

        const savedUniverse = await apiUpdateItem('universes', universeId, universe);
        if (savedUniverse) {
            DOM.editorModal.classList.remove('active');
            AppState.editingUniverseId = null;
            AppState.editingChapterIndex = null;

            // Update local data
            const index = ALTERNATE_UNIVERSES.findIndex(u => u.id === universeId);
            if (index !== -1) ALTERNATE_UNIVERSES[index] = savedUniverse;

            // Re-render the universe reading view
            if (AppState.activePanel === 'universes' && window.openUniverse) {
                window.openUniverse(universeId);
            }
        }
    }
}

// --- Lightbox ---
export function openLightbox(index) {
    DOM.lightbox.classList.add('active');
    updateLightboxContent(index);
}

export function updateLightboxContent(index) {
    if (index < 0 || index >= AppState.gallery.currentPhotoList.length) {
        return;
    }
    const photo = AppState.gallery.currentPhotoList[index];
    DOM.lightboxImg.src = photo.src;
    DOM.lightboxCaption.textContent = photo.caption;
    AppState.gallery.lightboxIndex = index;
}

export function changeLightboxImage(direction) {
    let newIndex = AppState.gallery.lightboxIndex + direction;
    const total = AppState.gallery.currentPhotoList.length;
    if (newIndex < 0) { newIndex = total - 1; } 
    else if (newIndex >= total) { newIndex = 0; }
    updateLightboxContent(newIndex);
}


// ===================================================================
//  COMMON UTILITY HELPERS
// ===================================================================

export async function findImageWithExtension(basePath) {
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

export function formatTime(seconds) { 
    const minutes = Math.floor(seconds / 60); 
    const secs = Math.floor(seconds % 60); 
    return isNaN(minutes) || isNaN(secs) ? '0:00' : `${minutes}:${secs < 10 ? '0' : ''}${secs}`; 
}

export function closeMenu() {
  const menuDropdown = document.getElementById('main-menu-dropdown');
  const menuIcon = document.getElementById('menu-icon-img');
  if (menuDropdown) menuDropdown.classList.remove('visible');
  if (menuIcon) menuIcon.src = 'photos/favicon1.png';
  const themeContainer = document.querySelector('.theme-colors-grid');
  const themeToggleBtn = document.querySelector('.theme-toggle-btn');
  const menuLinks = menuDropdown ? menuDropdown.querySelectorAll('a') : [];
  const separator = menuDropdown ? menuDropdown.querySelector('hr') : null;
  if (themeContainer) themeContainer.style.display = 'none';
  if (themeToggleBtn) themeToggleBtn.classList.remove('active');
  menuLinks.forEach(link => link.style.display = 'block');
  if (separator) separator.style.display = 'block';
}

// ===================================================================
//  THEME SYSTEM
// ===================================================================

export const THEME_COLORS = {
  mystical: {
    name: 'Mystical (Default)',
    icon: '✨',
    colors: {
      '--space-black': '#02041b',
      '--deep-purple': '#4a0e4e',
      '--gold': '#ffd700',
      '--gold-light': '#fff3c4',
      '--soft-violet': '#8a2be2',
      '--crimson': '#dc143c',
      '--jade': '#00a86b',
      '--text-primary': '#e6f1ff',
      '--text-secondary': '#8892b0',
      '--holoscreen-bg': 'rgba(10, 25, 47, 0.85)',
      '--highlight-glass': 'rgba(4, 24, 61, 0.6)',
      '--border-glass': 'rgba(100, 255, 218, 0.1)',
      '--glow-cyan': '#64ffda',
      '--glow-magenta': '#f779dd',
      '--shadow-color': 'rgba(0, 0, 0, 0.7)'
    },
    bgGradient: 'radial-gradient(ellipse at center, #1a2a45 0%, #0d152b 50%, #02041b 100%)',
    bodyBg: '#02041b'
  },
  ethereal: {
    name: 'Ethereal Blue',
    icon: '❄️',
    colors: {
      '--space-black': '#0a1628',
      '--deep-purple': '#0a2540',
      '--gold': '#64ffda',
      '--gold-light': '#a8ffff',
      '--soft-violet': '#5a7dbf',
      '--crimson': '#ff6b9d',
      '--jade': '#4ecdc4',
      '--text-primary': '#d4f1f9',
      '--text-secondary': '#7fb3d5',
      '--holoscreen-bg': 'rgba(10, 37, 64, 0.85)',
      '--highlight-glass': 'rgba(10, 60, 100, 0.6)',
      '--border-glass': 'rgba(100, 255, 218, 0.15)',
      '--glow-cyan': '#64ffda',
      '--glow-magenta': '#ff6b9d',
      '--shadow-color': 'rgba(0, 10, 20, 0.8)'
    },
    bgGradient: 'radial-gradient(ellipse at center, #1a4a6b 0%, #0d2b45 50%, #0a1628 100%)',
    bodyBg: '#0a1628'
  },
  sunset: {
    name: 'Sunset',
    icon: '🍁',
    colors: {
      '--space-black': '#2c1810',
      '--deep-purple': '#2c1e3e',
      '--gold': '#ff9f43',
      '--gold-light': '#ffc857',
      '--soft-violet': '#d94369',
      '--crimson': '#ff6348',
      '--jade': '#ffa500',
      '--text-primary': '#ffe8cc',
      '--text-secondary': '#d4a574',
      '--holoscreen-bg': 'rgba(44, 30, 62, 0.85)',
      '--highlight-glass': 'rgba(90, 40, 60, 0.6)',
      '--border-glass': 'rgba(255, 159, 67, 0.15)',
      '--glow-cyan': '#ffb347',
      '--glow-magenta': '#ff6b9d',
      '--shadow-color': 'rgba(0, 0, 0, 0.9)'
    },
    bgGradient: 'radial-gradient(ellipse at center, #5c3a2a 0%, #3d2817 50%, #2c1810 100%)',
    bodyBg: '#2c1810'
  },
  forest: {
    name: 'Enchanted Forest',
    icon: '🍀',
    colors: {
      '--space-black': '#0d1f16',
      '--deep-purple': '#1a3a2a',
      '--gold': '#2ecc71',
      '--gold-light': '#58d68d',
      '--soft-violet': '#27ae60',
      '--crimson': '#e74c3c',
      '--jade': '#16a085',
      '--text-primary': '#b8e6d5',
      '--text-secondary': '#7fb3a0',
      '--holoscreen-bg': 'rgba(26, 58, 42, 0.85)',
      '--highlight-glass': 'rgba(22, 80, 60, 0.6)',
      '--border-glass': 'rgba(46, 204, 113, 0.15)',
      '--glow-cyan': '#58d68d',
      '--glow-magenta': '#e74c3c',
      '--shadow-color': 'rgba(0, 0, 0, 0.85)'
    },
    bgGradient: 'radial-gradient(ellipse at center, #1a4a35 0%, #0f2917 50%, #0d1f16 100%)',
    bodyBg: '#0d1f16'
  },
  midnight: {
    name: 'Midnight',
    icon: '🌙',
    colors: {
      '--space-black': '#0f0f1e',
      '--deep-purple': '#1a1a2e',
      '--gold': '#e0e0e0',
      '--gold-light': '#ffffff',
      '--soft-violet': '#6b5b95',
      '--crimson': '#c91f16',
      '--jade': '#88c540',
      '--text-primary': '#f0f0f0',
      '--text-secondary': '#b0b0b0',
      '--holoscreen-bg': 'rgba(26, 26, 46, 0.85)',
      '--highlight-glass': 'rgba(30, 30, 60, 0.6)',
      '--border-glass': 'rgba(200, 200, 200, 0.1)',
      '--glow-cyan': '#e0e0e0',
      '--glow-magenta': '#ff6b9d',
      '--shadow-color': 'rgba(0, 0, 0, 0.95)'
    },
    bgGradient: 'radial-gradient(ellipse at center, #1a1a35 0%, #0f0f25 50%, #0f0f1e 100%)',
    bodyBg: '#0f0f1e'
  },
  coral: {
    name: 'Coral Dream',
    icon: '🪸',
    colors: {
      '--space-black': '#2d1b24',
      '--deep-purple': '#2d1b3d',
      '--gold': '#ff7b54',
      '--gold-light': '#ffa270',
      '--soft-violet': '#ff6b9d',
      '--crimson': '#c0392b',
      '--jade': '#26c281',
      '--text-primary': '#ffd9c9',
      '--text-secondary': '#d4a5a0',
      '--holoscreen-bg': 'rgba(45, 27, 45, 0.85)',
      '--highlight-glass': 'rgba(70, 30, 50, 0.6)',
      '--border-glass': 'rgba(255, 123, 84, 0.15)',
      '--glow-cyan': '#ffa270',
      '--glow-magenta': '#ff6b9d',
      '--shadow-color': 'rgba(0, 0, 0, 0.9)'
    },
    bgGradient: 'radial-gradient(ellipse at center, #5c2a35 0%, #3d1b24 50%, #2d1b24 100%)',
    bodyBg: '#2d1b24'
  },
  royal: {
    name: 'Royal Amethyst',
    icon: '🔮',
    colors: {
      '--space-black': '#21182F',
      '--deep-purple': '#402A50',
      '--gold': '#FFD700',
      '--gold-light': '#FFF0B3',
      '--soft-violet': '#A978D0',
      '--crimson': '#e74c3c',
      '--jade': '#50C878',
      '--text-primary': '#EADCF8',
      '--text-secondary': '#A090B0',
      '--holoscreen-bg': 'rgba(33, 24, 47, 0.85)',
      '--highlight-glass': 'rgba(64, 42, 80, 0.6)',
      '--border-glass': 'rgba(255, 215, 0, 0.15)',
      '--glow-cyan': '#FFD700',
      '--glow-magenta': '#A978D0',
      '--shadow-color': 'rgba(0, 0, 0, 0.85)'
    },
    bgGradient: 'radial-gradient(ellipse at center, #402A50 0%, #2F2040 50%, #21182F 100%)',
    bodyBg: '#21182F'
  },
  ocean: {
    name: 'Ocean Deep',
    icon: '🪼',
    colors: {
      '--space-black': '#001a33',
      '--deep-purple': '#003d66',
      '--gold': '#00d9ff',
      '--gold-light': '#66f2ff',
      '--soft-violet': '#0099cc',
      '--crimson': '#ff3366',
      '--jade': '#00cc99',
      '--text-primary': '#ccf2ff',
      '--text-secondary': '#66b3cc',
      '--holoscreen-bg': 'rgba(0, 61, 102, 0.85)',
      '--highlight-glass': 'rgba(0, 100, 150, 0.6)',
      '--border-glass': 'rgba(0, 217, 255, 0.15)',
      '--glow-cyan': '#00d9ff',
      '--glow-magenta': '#ff3366',
      '--shadow-color': 'rgba(0, 0, 0, 0.9)'
    },
    bgGradient: 'radial-gradient(ellipse at center, #1a4a6b 0%, #0d2b4a 50%, #001a33 100%)',
    bodyBg: '#001a33'
  },
  dragon: {
    name: 'Dragon\'s Breath',
    icon: '🐉',
    colors: {
      '--space-black': '#1a100b',
      '--deep-purple': '#3c1818',
      '--gold': '#f9a602',
      '--gold-light': '#ffc940',
      '--soft-violet': '#d95802',
      '--crimson': '#d12c2c',
      '--jade': '#02c39a',
      '--text-primary': '#ffe8d6',
      '--text-secondary': '#b89a8a',
      '--holoscreen-bg': 'rgba(40, 20, 15, 0.85)',
      '--highlight-glass': 'rgba(60, 24, 24, 0.6)',
      '--border-glass': 'rgba(249, 166, 2, 0.15)',
      '--glow-cyan': '#02c39a',
      '--glow-magenta': '#d12c2c',
      '--shadow-color': 'rgba(0, 0, 0, 0.8)'
    },
    bgGradient: 'radial-gradient(ellipse at center, #3c1818 0%, #2a140f 50%, #1a100b 100%)',
    bodyBg: '#1a100b'
  },
  jade: {
    name: 'Jade Serenity',
    icon: '玉',
    colors: {
      '--space-black': '#181a19', '--deep-purple': '#2a302e', '--gold': '#a4b5a1', '--gold-light': '#d9e0d7', '--soft-violet': '#837a99', '--crimson': '#e56b6f', '--jade': '#52b788', '--text-primary': '#e8f0e9', '--text-secondary': '#9ba9a3', '--holoscreen-bg': 'rgba(30, 35, 33, 0.85)', '--highlight-glass': 'rgba(42, 48, 46, 0.6)', '--border-glass': 'rgba(164, 181, 161, 0.15)', '--glow-cyan': '#52b788', '--glow-magenta': '#837a99', '--shadow-color': 'rgba(5, 10, 8, 0.85)'
    },
    bgGradient: 'radial-gradient(ellipse at center, #2a302e 0%, #1f2422 50%, #181a19 100%)',
    bodyBg: '#181a19'
  }
};

export const THEME_STAR_SHAPES = {
  mystical: { char: '✦', shadowColor: '#ffd700' },
  ethereal: { char: '❄️', shadowColor: '#64ffda' },
  sunset: { char: '₊˚⊹⋆🍁⋆⊹˚ ₊', shadowColor: '#ff9f43' },
  forest: { char: '🍀', shadowColor: '#2ecc71' },
  midnight: { char: '✨', shadowColor: '#e0e0e0' },
  coral: { char: '🪸', shadowColor: '#ff7b54' },
  royal: { char: '🔮', shadowColor: '#b59fc4ff' },
  ocean: { char: '🪼 ⋆‧🫧', shadowColor: '#00d9ff' },
  dragon: { char: '⊹₊𐦍⟡⋆', shadowColor: '#f9a602' },
  jade: { char: '⋆｡˚ ☁︎ ˚｡⋆｡˚☽˚｡⋆', shadowColor: '#a4b5a1' }
};

export function applyTheme(themeName) {
  const theme = THEME_COLORS[themeName];
  if (!theme) return;
  const root = document.documentElement;
  if (root && theme.colors) {
      for (const [key, value] of Object.entries(theme.colors)) {
          root.style.setProperty(key, value);
      }
  }
  const bgContainers = document.querySelectorAll('.background-container');
  bgContainers.forEach(container => {
    container.style.background = theme.bgGradient;
  });
    if (window.initWebBackground && themeName !== 'random') {
        window.initWebBackground('web-canvas-landing', theme);
        window.initWebBackground('web-canvas-main', theme);
    }
    if (window.createFloatingGlyphs) {
        window.createFloatingGlyphs('landing-particles-canvas', themeName);
        window.createFloatingGlyphs('particles-canvas', themeName);
    }
  localStorage.setItem('selectedTheme', themeName);
  const themeButtons = document.querySelectorAll('.theme-color-btn');
  themeButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === themeName);
  });
  if (document.getElementById('tab-observatory') && window.initObservatory) {
      window.initObservatory();
  }
  closeMenu();
}

export function applyRandomMixTheme() {
    const themeKeys = Object.keys(THEME_COLORS).filter(key => key !== 'random');
    const themesToMix = 3;
    const shuffledKeys = themeKeys.sort(() => 0.5 - Math.random());
    const selectedThemeKeys = shuffledKeys.slice(0, themesToMix);
    const randomThemes = selectedThemeKeys.map(key => THEME_COLORS[key]);
    const root = document.documentElement;
    const colorKeys = Object.keys(THEME_COLORS.mystical.colors);
    const newTheme = { name: 'Random Mix', icon: '🎲', colors: {}, bgGradient: '', bodyBg: '' };
    for (const key of colorKeys) {
        const randomTheme = randomThemes[Math.floor(Math.random() * randomThemes.length)];
        const colorValue = randomTheme.colors ? randomTheme.colors[key] : undefined;
        if (colorValue) {
            root.style.setProperty(key, colorValue);
            newTheme.colors[key] = colorValue;
        }
    }
    const gradientColorCandidates = ['--gold', '--soft-violet', '--glow-magenta', '--glow-cyan', '--crimson'];
    let gradientColors = [];
    for (let i = 0; i < 4; i++) {
        const randomTheme = randomThemes[Math.floor(Math.random() * randomThemes.length)];
        const randomColorName = gradientColorCandidates[Math.floor(Math.random() * gradientColorCandidates.length)];
        if (randomTheme.colors) gradientColors.push(randomTheme.colors[randomColorName]);
    }
    const randomAngle = Math.floor(Math.random() * 360);
    const newGradient = `linear-gradient(${randomAngle}deg, ${gradientColors.join(', ')})`;
    newTheme.bgGradient = newGradient;
    newTheme.bodyBg = newTheme.colors['--space-black'];
    const bgContainers = document.querySelectorAll('.background-container');
    bgContainers.forEach(container => {
        container.style.background = newGradient;
    });
    return newTheme;
}

export function createThemeButton(key, theme) {
    const btn = document.createElement('button');
    btn.className = 'theme-color-btn';
    btn.dataset.theme = key;
    btn.title = theme.name;
    const primaryColor = theme.colors['--deep-purple'];
    const secondaryColor = theme.colors['--soft-violet'];
    const accentColor = theme.colors['--gold'];
    btn.style.background = `radial-gradient(circle at 30% 30%, ${accentColor} -20%, ${secondaryColor} 50%, ${primaryColor} 110%)`;
    btn.style.color = accentColor;
    btn.innerHTML = `<span class="theme-orb-icon">${theme.icon}</span><span class="theme-orb-name">${theme.name}</span>`;
    btn.addEventListener('click', (e) => { e.preventDefault(); applyTheme(key); });
    return btn;
}

export function loadSavedTheme() {
  const savedTheme = localStorage.getItem('selectedTheme') || 'mystical';
  applyTheme(savedTheme);
}

export function initThemeSystem() {
  const menuDropdown = document.getElementById('main-menu-dropdown');
  if (!menuDropdown || document.querySelector('.theme-toggle-btn')) return;
  const themeSeparator = document.createElement('hr');
  const themeToggleBtn = document.createElement('button');
  themeToggleBtn.className = 'theme-toggle-btn';
  themeToggleBtn.textContent = '🎨 Themes';
  const themeContainer = document.createElement('div');
  themeContainer.className = 'theme-colors-grid';
  themeContainer.style.display = 'none';
  themeToggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const menuLinks = menuDropdown.querySelectorAll('a');
    const separator = menuDropdown.querySelector('hr');
    const isVisible = themeContainer.style.display === 'grid';
    if (isVisible) {
        themeContainer.style.display = 'none';
        themeToggleBtn.classList.remove('active');
        menuLinks.forEach(link => link.style.display = 'block');
        if (separator) separator.style.display = 'block';
    } else {
        themeContainer.style.display = 'grid';
        themeToggleBtn.classList.add('active');
        menuLinks.forEach(link => link.style.display = 'none');
        if (separator) separator.style.display = 'none';
    }
  });
  Object.entries(THEME_COLORS).forEach(([key, theme]) => themeContainer.appendChild(createThemeButton(key, theme)));
  const randomBtn = document.createElement('button');
  randomBtn.className = 'theme-color-btn';
  randomBtn.title = 'Random Mix';
  randomBtn.style.background = `conic-gradient(from 90deg, #8a2be2, #ffd700, #64ffda, #ff6b9d, #8a2be2)`;
  randomBtn.innerHTML = `<span class="theme-orb-icon">🎲</span><span class="theme-orb-name">Random</span>`;
  randomBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const randomThemeObject = applyRandomMixTheme();
      if (window.initWebBackground) {
        window.initWebBackground('web-canvas-landing', randomThemeObject);
        window.initWebBackground('web-canvas-main', randomThemeObject);
      }
      if (document.getElementById('tab-observatory') && window.initObservatory) {
          window.initObservatory(randomThemeObject);
      }
      localStorage.setItem('selectedTheme', 'random');
  });
  themeContainer.appendChild(randomBtn);
  menuDropdown.appendChild(themeSeparator);
  menuDropdown.appendChild(themeToggleBtn);
  menuDropdown.appendChild(themeContainer);
  loadSavedTheme();
}

// ===================================================================
//  MOOD SYNC SYSTEM
// ===================================================================

export function getMoodFromState() {
    const zoya = (window.ZOYA_MOOD || localStorage.getItem('zoyaMood') || 'neutral').toString().toLowerCase().trim();
    const nicho = (window.NICHO_MOOD || localStorage.getItem('nichoMood') || 'neutral').toString().toLowerCase().trim();
    return { zoya: zoya || 'neutral', nicho: nicho || 'neutral' };
}

export function mapMoodToPanel(zoyaMood, nichoMood) {
    const a = zoyaMood;
    const b = nichoMood;
    if (a === 'excited' && b === 'excited') return 'games';
    if (a === 'loving' && b === 'loving') return 'sanctuary';
    if (a === 'nostalgic' && b === 'nostalgic') return 'gallery';
    if (a === 'calm' && b === 'calm') return 'guide';
    if ((a === 'excited' && b === 'adventurous') || (b === 'excited' && a === 'adventurous')) return 'universes';
    if ((a === 'excited' && b === 'playful') || (b === 'excited' && a === 'playful')) return 'games';
    if ((a === 'playful' && b === 'playful')) return 'voicegarden';
    if ((a === 'sad' && b === 'loving') || (b === 'sad' && a === 'loving')) return 'sanctuary';
    if (a === 'sad' && b === 'sad') return 'sanctuary';
    if (a === 'sad' || b === 'sad') return 'guide';
    if (a === 'adventurous' || b === 'adventurous') return 'universes';
    if (a === 'nostalgic' || b === 'nostalgic') return 'gallery';
    if (a === 'playful' || b === 'playful') return 'voicegarden';
    if (a === 'excited' || b === 'excited') return 'games';
    if (a === 'loving' || b === 'loving') return 'sanctuary';
    return 'home';
}

export function showMoodLoadingAndRedirect(targetPanel, opts = {}) {
    let overlay = document.getElementById('mood-loading-overlay');
    if (overlay) overlay.remove();
    overlay = document.createElement('div');
    overlay.id = 'mood-loading-overlay';
    overlay.style.cssText = `
        position: fixed; inset: 0; display: flex; align-items: center; 
        justify-content: center; 
        background: radial-gradient(ellipse at center, rgba(0,0,0,0.6), rgba(0,0,0,0.9)); 
        z-index: 9999;
    `;
    overlay.innerHTML = `
        <div style="max-width: 800px; padding: 30px; text-align:center; color:var(--gold-light); font-family:var(--font-handwriting);">
            <div id="mood-typewriter" style="font-size:1.35rem; line-height:1.4; min-height:3.2rem;"></div>
            <div style="margin-top:18px; opacity:0.9; font-size:0.9rem; color:var(--text-secondary);">(for a moment, passwords are hushed by the cosmos)</div>
        </div>
    `;
    document.body.appendChild(overlay);
    AppState.passwordsTemporarilyBypassed = true;
    AppState.moodLoading = true;
    const el = document.getElementById('mood-typewriter');
    let i = 0;
    function typewriterLoop(text, cb) {
        el.innerHTML = '';
        const id = setInterval(() => {
            if (i < text.length) {
                el.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(id);
                if (cb) cb();
            }
        }, 45);
    }
    const prettyName = { games: 'a wild, exciting place', sanctuary: 'the Inner Sanctum of comfort', guide: 'a quiet guide', voicegarden: 'a blooming voice garden', universes: 'a place of adventurous chronicles', gallery: 'a warm gallery of memories', home: 'home' }[targetPanel] || targetPanel;
    const typeText = `Hush... The constellations whisper of ${prettyName}. Follow.`;
    i = 0;
    typewriterLoop(typeText, () => {
        setTimeout(() => {
            const main = DOM.mainContent || document.querySelector('.main-content');
            const solar = DOM.solarSystemContainer || document.getElementById('solar-system-container');
            try {
                if (main) { main.style.transition = 'opacity 600ms ease'; main.style.opacity = '0'; }
                if (solar) { solar.style.transition = 'opacity 600ms ease'; solar.style.opacity = '0'; }
            } catch (e) {}
            setTimeout(() => {
                AppState.passwordsTemporarilyBypassed = false;
                AppState.moodLoading = false;
                const ov = document.getElementById('mood-loading-overlay'); if (ov) ov.remove();
                window.location.hash = targetPanel;
                setTimeout(() => {
                    try { if (main) main.style.opacity = '1'; if (solar) solar.style.opacity = '1'; } catch (e) {}
                }, 120);
            }, 650);
        }, 900);
    });
}

export function evaluateMoodAndRedirect() {
    try {
        if (!AppState.moodSyncEnabled) return; const { zoya, nicho } = getMoodFromState();
        const target = mapMoodToPanel(zoya, nicho);
        const current = window.location.hash.substring(1) || 'home';
        if (target && target !== current) {
            showMoodLoadingAndRedirect(target);
        }
    } catch (e) {
        console.error('Mood redirect failed', e);
    }
}

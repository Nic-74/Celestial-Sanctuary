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

const AppState = { bookUnlocked: false, activePanel: 'home', chapters: [], currentChapterIndex: 0, currentGalleryCategory: 'all', gallery: { showAll: false, lightboxIndex: 0, currentPhotoList: [] }, music: { player: null, isPlaying: false, currentIndex: 0, isShuffled: false, albumArtInterval: null, albumArtIndex: 0 }, quill: null, editingChapterIndex: -1, chronicleEvents: [], thenNowState: { availableIndices: [], currentIndexInAvailable: 0, lastReveal: null }, complimentInterval: null, webAnimationLandingId: null, webAnimationMainId: null, spiralAnimationLandingId: null, spiralAnimationMainId: null };

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

// ===================================================================
// ALTERNATE UNIVERSE CHRONICLES - COMPLETE IMPLEMENTATION
// ===================================================================

const ALTERNATE_UNIVERSES = [
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
    }
];

// Add more universe data for other images...
ALTERNATE_UNIVERSES.push(
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
);

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
    lightbox: $('lightbox'),
    scrollToTopBtn: $('scroll-to-top'),
    lightboxImg: $('lightbox-image'),
    lightboxCaption: $('lightbox-caption'),
    scrollToTopBtn: $('scroll-to-top'),
    lightboxPrev: document.querySelector('.lightbox-prev'),
    lightboxNext: document.querySelector('.lightbox-next'),
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
    
    const navigationType = performance.getEntriesByType("navigation")[0].type;
    if (navigationType === 'reload') {
        sessionStorage.removeItem('enteredFromGate');
    }

    initQuill();
    addEventListeners();
    initLandingPage();
    initMoodPickers();

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
            .halls-grid {
                gap: 20px;
            }
            .hall-card {
                width: 100%;
                max-width: 400px;
                margin: 0 auto;
            }
            #chapter-meta-modal .modal-content {
                text-align: center;
            }
            .form-group {
                text-align: left;
            }
        }
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
        .calendar-header button:active { transform: scale(0.95); }
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
            .counter-unit { min-width: 80px; }
        }

        /* NEW GUIDE STYLES */
        .constellation-map-container { position: relative; width: 100%; max-width: 900px; margin: 0 auto; padding-top: 62.5%; /* 8:5 Aspect Ratio */ background: rgba(0,0,0,0.2); border-radius: 8px; border: 1px solid var(--border-glass); }
        #constellation-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; cursor: crosshair; }
        #constellation-legend { position: absolute; bottom: 10px; right: 10px; display: flex; flex-direction: column; gap: 5px; background: rgba(0,0,0,0.5); padding: 8px; border-radius: 4px; font-size: 0.8rem; }
        .legend-item { display: flex; align-items: center; gap: 8px; }
        .legend-dot { width: 10px; height: 10px; border-radius: 50%; }
        .memory-display-card { margin-top: 1.5rem; background: var(--highlight-glass); border: 1px solid var(--border-glass); border-left-width: 4px; padding: 1rem 1.5rem; border-radius: 4px; transition: border-color 0.5s; text-align: center; }
        .memory-display-card h4 { font-family: var(--font-display); color: var(--gold-light); }
        .memory-display-card p { color: var(--text-secondary); }
        .memory-icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
        
        .physics-simulator { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        .physics-formula-main { background: var(--highlight-glass); padding: 1.5rem; border-radius: 8px; text-align: center; border: 1px solid var(--border-glass); }
        .formula-title { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-secondary); margin-bottom: 1rem; }
        .formula-content { font-family: 'Times New Roman', serif; font-size: 2.5rem; color: var(--glow-cyan); text-shadow: 0 0 10px var(--glow-cyan); margin-bottom: 1rem; }
        .formula-explanation { font-style: italic; color: var(--text-secondary); }
        .physics-laws-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }
        .physics-law-card { background: var(--highlight-glass); padding: 1rem; border-radius: 4px; }
        .law-icon { font-size: 1.5rem; }
        .physics-law-card h4 { color: var(--gold-light); font-size: 1.1rem; margin: 0.5rem 0; }
        .physics-law-card p { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; }
        .law-equation { font-family: monospace; color: var(--glow-cyan); margin-top: 0.5rem; font-size: 0.9rem; }
        #gravity-canvas { background: #02041b; border: 1px solid var(--border-glass); border-radius: 4px; width: 100%; height: auto; }
        .physics-controls { display: flex; justify-content: center; gap: 1rem; margin-top: 1rem; }
        
        .anatomy-visualization { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
        .anatomy-profiles { display: flex; justify-content: space-around; width: 100%; align-items: flex-start; }
        .anatomy-profile { flex: 1; text-align: center; max-width: 300px; }
        .profile-avatar { position: relative; width: 100px; height: 100px; margin: 0 auto 1rem; }
        .avatar-circle { width: 100%; height: 100%; border: 2px solid var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem; font-family: var(--font-display); color: var(--gold); background: var(--deep-purple); }
        .avatar-glow { position: absolute; inset: -10px; border-radius: 50%; background: radial-gradient(circle, var(--soft-violet) 0%, transparent 70%); animation: pulse-glow 3s infinite; }
        .profile-subtitle { font-style: italic; color: var(--text-secondary); margin-bottom: 1rem; }
        .anatomy-point-enhanced { display: flex; align-items: center; text-align: left; padding: 0.75rem; border-radius: 4px; margin-bottom: 0.5rem; cursor: pointer; transition: background 0.3s; }
        .anatomy-point-enhanced:hover { background: var(--highlight-glass); }
        .point-icon { font-size: 1.5rem; margin-right: 1rem; }
        .point-label { color: var(--gold-light); }
        #anatomy-tooltip-enhanced { position: fixed; background: rgba(17, 12, 31, 0.95); padding: 0.8rem 1.2rem; border-radius: 8px; border: 1px solid var(--gold); display: none; z-index: 100; max-width: 280px; pointer-events: none; box-shadow: 0 0 20px rgba(255, 215, 0, 0.3); color: var(--gold-light); line-height: 1.5; }
        .connection-bridge { display: flex; align-items: center; justify-content: center; position: relative; height: 50px; }
        .bridge-heart { color: #f779dd; font-size: 2rem; animation: pulse-glow 2s infinite; }
        .compatibility-meter { width: 100%; max-width: 600px; margin-top: 2rem; background: var(--highlight-glass); padding: 1.5rem; border-radius: 8px; }
        .compatibility-meter h4 { text-align: center; color: var(--gold); margin-bottom: 1rem; }
        .compatibility-bar-item { margin-bottom: 0.75rem; }
        .bar-label { font-size: 0.9rem; color: var(--text-secondary); }
        .bar-track { background: #02041b; height: 10px; border-radius: 5px; overflow: hidden; }
        .bar-fill { height: 100%; background: linear-gradient(90deg, var(--soft-violet), var(--glow-cyan)); position: relative; }
        .bar-fill::after { content: attr(data-value); position: absolute; right: 5px; top: -1px; font-size: 0.7rem; color: black; }
        
        .artifacts-showcase { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; }
        .artifact-card { background: var(--highlight-glass); border: 1px solid var(--border-glass); border-radius: 8px; padding: 1rem; text-align: center; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s; }
        .artifact-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
        .artifact-icon { font-size: 3rem; }
        .artifact-name { font-weight: bold; color: var(--gold-light); }
        .artifact-rarity { font-size: 0.8rem; color: #FFD700; }
        .artifact-detail-modal { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); z-index: 101; }
        .artifact-detail-modal.active { display: flex; align-items: center; justify-content: center; }
        .artifact-modal-content { background: var(--deep-purple); padding: 2rem; border-radius: 12px; border: 2px solid var(--gold); max-width: 500px; text-align: center; position: relative; }
        .artifact-modal-close { position: absolute; top: 10px; right: 15px; font-size: 1.5rem; cursor: pointer; }
        .artifact-modal-icon { font-size: 4rem; }
        .artifact-modal-story { color: var(--text-secondary); margin: 1rem 0; }
        .acquisition-label { color: var(--gold); }
        
        .lexicon-search { margin-bottom: 1rem; }
        .lexicon-categories { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
        .lexicon-cat-btn { background: transparent; border: 1px solid var(--text-secondary); color: var(--text-secondary); padding: 5px 10px; border-radius: 20px; cursor: pointer; }
        .lexicon-cat-btn.active { border-color: var(--gold); color: var(--gold); }
        .lexicon-list-enhanced .lexicon-entry { background: var(--highlight-glass); padding: 1rem; border-radius: 4px; margin-bottom: 1rem; }
        .lexicon-list-enhanced dt { font-family: var(--font-display); color: var(--gold); font-size: 1.3rem; }
        .lexicon-list-enhanced dd { color: var(--text-secondary); margin-left: 1rem; }
        .lexicon-usage { font-style: italic; color: var(--glow-cyan); margin-left: 1rem; margin-top: 0.5rem; border-left: 2px solid var(--glow-cyan); padding-left: 0.5rem; }
        
        .time-weaver-container { display: grid; grid-template-columns: 1fr 250px; gap: 2rem; align-items: center; }
        .timeline-spiral { position: relative; width: 100%; }
        #spiral-svg { width: 100%; height: auto; }
        .timeline-event-dot { cursor: pointer; transition: r 0.3s; }
        .timeline-controls-panel, .timeline-event-details { background: var(--highlight-glass); padding: 1rem; border-radius: 8px; }
        .timeline-controls-panel h4, .timeline-event-details h4 { color: var(--gold); margin-bottom: 1rem; }
        .timeline-controls-panel .btn { display: block; width: 100%; margin-bottom: 0.5rem; }
        .timeline-speed-control { margin-top: 1rem; font-size: 0.9rem; }
        .timeline-event-details p { color: var(--text-secondary); }
        .timeline-event-details span { font-size: 0.8rem; color: var(--gold-light); display: block; margin-top: 0.5rem; }

        @media (max-width: 900px) {
            .time-weaver-container { grid-template-columns: 1fr; }
            .anatomy-profiles { flex-direction: column; align-items: center; gap: 2rem; }
        }
    `;
    document.head.appendChild(style);

    const handleHashNavigation = () => {
        const panelId = window.location.hash.substring(1) || 'home';
        if (sessionStorage.getItem('enteredFromGate') === 'true') {
            renderPanel(panelId);
        }
        const menuDropdown = document.getElementById('main-menu-dropdown');
        if (menuDropdown) {
            menuDropdown.classList.remove('visible');
        }
    };

    window.addEventListener('hashchange', handleHashNavigation, false);
    if (sessionStorage.getItem('enteredFromGate') === 'true') {
        enterSanctuary();
    }

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
}

function initLandingPage() {
    DOM.landingGate.addEventListener('click', enterSanctuary, { once: true });
    
    const savedTheme = localStorage.getItem('selectedTheme') || 'mystical';
    applyThemeToLanding(savedTheme);
    initWebBackground('web-canvas-landing', THEME_COLORS[savedTheme]);
    // start a subtle spiral overlay on the landing gate
    initSpiralAnimation('spiral-canvas-landing', { intensity: 'subtle' });
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
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 12 + 8;
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * 0.3 - 0.15;
            this.opacity = Math.random() * 0.4 + 0.2;
            this.char = starShape.char;
            this.color = theme.colors['--gold'];
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.font = `${this.size}px Arial`;
            ctx.fillStyle = this.color;
            ctx.fillText(this.char, this.x, this.y);
            ctx.restore();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

function enterSanctuary() {
    sessionStorage.setItem('enteredFromGate', 'true');
    DOM.celestialSanctuary.style.display = 'block';
    DOM.celestialSanctuary.style.opacity = '0';
    void DOM.celestialSanctuary.offsetHeight;
    DOM.landingGate.style.transition = 'opacity 0.6s ease-out';
    DOM.celestialSanctuary.style.transition = 'opacity 0.6s ease-in';
    DOM.landingGate.style.opacity = '0';
    DOM.celestialSanctuary.style.opacity = '1';
    setTimeout(() => {
        DOM.landingGate.style.display = 'none';
    }, 650);
    initSanctuary();
}


function initSanctuary() {
    renderSolarSystemNav();
    initMusicPlayer();
    updateRelationshipCounter();
    setInterval(updateRelationshipCounter, 60000);
    const panelId = window.location.hash.substring(1) || 'home';
    renderPanel(panelId);
    
    const savedTheme = localStorage.getItem('selectedTheme') || 'mystical';
    initMainParticles(savedTheme);
    initWebBackground('web-canvas-main', THEME_COLORS[savedTheme]);
    // creative spiral overlay for the main sanctuary
    initSpiralAnimation('spiral-canvas-main', { intensity: 'moderate' });
    
    addSanctuaryEventListeners();
    // Evaluate mood sync and optionally redirect on entry
    if (typeof evaluateMoodAndRedirect === 'function') evaluateMoodAndRedirect();
}

function addEventListeners() {
    DOM.unlockBookBtn.addEventListener('click', handleBookPasswordAttempt);
    DOM.bookPasswordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleBookPasswordAttempt();
        }
    });

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

    // Mood bar visibility toggle
    const moodBar = document.getElementById('mood-sync-bar');
    const visibilityToggle = document.getElementById('mood-sync-visibility-toggle');
    if (moodBar && visibilityToggle) {
       // Start collapsed
       moodBar.classList.add('collapsed');
       visibilityToggle.querySelector('span').style.transform = 'rotate(180deg)';

       visibilityToggle.addEventListener('click', () => {
           const isCollapsed = moodBar.classList.toggle('collapsed');
           const arrow = visibilityToggle.querySelector('span');
           arrow.style.transform = isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
       });
    }


    document.addEventListener('click', (e) => {
        const musicPlayerSun = $('music-player-sun');
        if (musicPlayerSun && !musicPlayerSun.contains(e.target) && musicPlayerSun.classList.contains('expanded')) {
            musicPlayerSun.classList.remove('expanded');
        }
    });
    
    DOM.lightbox.addEventListener('click', (e) => {
        if (e.target === DOM.lightbox || e.target.classList.contains('lightbox-close')) {
            DOM.lightbox.classList.remove('active');
        }
    });
    DOM.lightboxNext.addEventListener('click', () => changeLightboxImage(1));
    DOM.lightboxPrev.addEventListener('click', () => changeLightboxImage(-1));

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

    // Centralized Resize Handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const savedThemeName = localStorage.getItem('selectedTheme') || 'mystical';
            const theme = THEME_COLORS[savedThemeName];
            
            // Re-initialize all background canvases
            applyThemeToLanding(savedThemeName);
            initMainParticles(savedThemeName);
            initWebBackground('web-canvas-landing', theme);
            initWebBackground('web-canvas-main', theme);
            // Reinitialize spiral overlays to match new sizes
            try { initSpiralAnimation('spiral-canvas-landing', { intensity: 'subtle' }); } catch(e) {}
            try { initSpiralAnimation('spiral-canvas-main', { intensity: 'moderate' }); } catch(e) {}
            
            if (typeof renderSolarSystemNav === 'function') {
                renderSolarSystemNav();
            }
        }, 250); // Debounce for 250ms
    });
}

function addSanctuaryEventListeners() {
     const menuButton = document.getElementById('main-menu-button');
     const menuDropdown = document.getElementById('main-menu-dropdown');
     const menuIcon = document.getElementById('menu-icon-img');

     if(menuButton && menuDropdown && menuIcon) {
        // This handles the main click on the button itself
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = menuDropdown.classList.toggle('visible');
            menuIcon.src = isVisible ? 'photos/favicon2.png' : 'photos/favicon1.png';
        });

        // The link clicks inside the menu are handled by the global closeMenu() in index.html

        // This handles closing the menu by clicking outside of it
        document.addEventListener('click', (e) => {
            if (!menuDropdown.contains(e.target) && !menuButton.contains(e.target)) {
                if (menuDropdown.classList.contains('visible')) {
                    closeMenu(); // Use the global closeMenu() to reset icon and hide menu
                }
            }
        });
     }

     // Mood ribbon (if present) should trigger mood-evaluation and redirect
     const moodRibbon = document.getElementById('mood-ribbon');
     if (moodRibbon) {
         moodRibbon.addEventListener('click', (e) => { e.preventDefault(); if (!AppState.moodSyncEnabled) return; try { evaluateMoodAndRedirect(); } catch (err) { console.error('Mood ribbon handler error', err); } });
     }
    // Combined mood display (center area) should also trigger evaluation
    const combinedMood = document.querySelector('.combined-mood-display');
    if (combinedMood) {
        combinedMood.addEventListener('click', (e) => { e.preventDefault(); if (!AppState.moodSyncEnabled) return; try { evaluateMoodAndRedirect(); } catch (err) { console.error(err); } });
    }

    // Mood recommendation popup actions
    const moodPopupAction = document.querySelector('.mood-popup-action');
    const moodPopupClose = document.querySelector('.mood-popup-close');
    if (moodPopupAction) {
        moodPopupAction.addEventListener('click', (e) => {
            e.preventDefault(); if (!AppState.moodSyncEnabled) { const p = document.getElementById('mood-recommendation-popup'); if (p) p.style.display = 'none'; return; } try { evaluateMoodAndRedirect(); } catch (err) { console.error(err); }
            const p = document.getElementById('mood-recommendation-popup'); if (p) p.style.display = 'none';
        });
    }
    if (moodPopupClose) {
        moodPopupClose.addEventListener('click', (e) => { e.preventDefault(); const p = document.getElementById('mood-recommendation-popup'); if (p) p.style.display = 'none'; });
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
}

function initWebBackground(canvasId, theme) {
    const canvas = $(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (canvasId === 'web-canvas-landing' && AppState.webAnimationLandingId) {
        cancelAnimationFrame(AppState.webAnimationLandingId);
    }
    if (canvasId === 'web-canvas-main' && AppState.webAnimationMainId) {
        cancelAnimationFrame(AppState.webAnimationMainId);
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let points = [];
    const numPoints = window.innerWidth > 768 ? 80 : 40;
    const connectDistance = 150;
    const pointColor = theme.colors['--gold'];
    const lineColor = theme.colors['--border-glass'];

    class Point {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 1.5 + 1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = pointColor;
            ctx.fill();
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
    }

    for (let i = 0; i < numPoints; i++) {
        points.push(new Point());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const dist = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
                if (dist < connectDistance) {
                    ctx.strokeStyle = lineColor;
                  //  ctx.globalAlpha = (1 - (dist / connectDistance)) * 1; // Make lines subtle
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(points[j].x, points[j].y);
                    ctx.stroke();
                }
            }
        }
        ctx.globalAlpha = 1;

        points.forEach(point => {
            point.update();
            point.draw();
        });

        const animationId = requestAnimationFrame(animate);
        if (canvasId === 'web-canvas-landing') {
            AppState.webAnimationLandingId = animationId;
        } else {
            AppState.webAnimationMainId = animationId;
        }
    }
    animate();
}

// Initialize mood pickers and interactions
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

    function readMood(person) {
        if (person === 'nic') return (window.NICHO_MOOD || localStorage.getItem('nichoMood') || 'neutral').toLowerCase();
        return (window.ZOYA_MOOD || localStorage.getItem('zoyaMood') || 'neutral').toLowerCase();
    }

    function writeMood(person, mood) {
        if (person === 'nic') {
            window.NICHO_MOOD = mood; localStorage.setItem('nichoMood', mood);
        } else {
            window.ZOYA_MOOD = mood; localStorage.setItem('zoyaMood', mood);
        }
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
        // pick icon with priority: loving -> 💕, excited -> 🤩, sad -> 😢, default ✨
        const priorityIcon = zoya === 'loving' || nic === 'loving' ? '💕' : (zoya === 'excited' || nic === 'excited' ? '🤩' : (zoya === 'sad' || nic === 'sad' ? '😢' : '💕'));
        if (combinedIconEl) combinedIconEl.textContent = priorityIcon;

        // Prepare popup suggestion
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
                // brief visual feedback
                btn.classList.add('selected');
                setTimeout(() => btn.classList.remove('selected'), 400);
                // show recommendation popup
                if (popup) popup.style.display = 'block';
            });
        });
    }

    // Toggle dropdown behavior for current-mood buttons
    // NOTE: CSS uses `.mood-options.active` to show the dropdown, so toggle that class here.
    function wireToggle(btnId, optionsEl) {
        const btn = document.getElementById(btnId);
        if (!btn || !optionsEl) return;
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); if (!AppState || !AppState.moodSyncEnabled) return;
            optionsEl.classList.toggle('active');
        });
        // Close when clicking elsewhere
        document.addEventListener('click', () => { optionsEl.classList.remove('active'); });
    }

    attachOptions(nicOptions, 'nic');
    attachOptions(zoyaOptions, 'zoya');
    wireToggle('nic-current-mood', nicOptions);
    wireToggle('zoya-current-mood', zoyaOptions);
    renderCurrent('nic'); renderCurrent('zoya');

    // Initialize Mood Sync toggle (persisted)
    const moodToggle = document.getElementById('mood-sync-toggle');
    // Always start with mood sync disabled.
    AppState.moodSyncEnabled = false;
    if (moodToggle) {
        moodToggle.checked = false;
        moodToggle.addEventListener('change', (e) => {
            AppState.moodSyncEnabled = !!moodToggle.checked;
            // small visual affordance: toggle a disabled class
            const bar = document.getElementById('mood-sync-bar');
            if (bar) bar.classList.toggle('mood-sync-disabled', !AppState.moodSyncEnabled);
        });
        // apply initial visual state
        const bar = document.getElementById('mood-sync-bar'); if (bar) bar.classList.toggle('mood-sync-disabled', !AppState.moodSyncEnabled);
    }

    // Popup action triggers redirect (respect toggle)
    if (popupAction) {
        popupAction.addEventListener('click', (e) => {
            e.preventDefault(); if (!AppState.moodSyncEnabled) { if (popup) popup.style.display = 'none'; return; } const target = popupAction.dataset.target || mapMoodToPanel(readMood('zoya'), readMood('nic')); if (popup) popup.style.display = 'none'; showMoodLoadingAndRedirect(target);
        });
    }

    // Close popup when clicking outside or on close button handled elsewhere
}


function initMainParticles(themeName) {
    applyThemeToMainParticles(themeName);
}

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
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 12 + 8;
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * 0.3 - 0.15;
            this.opacity = Math.random() * 0.4 + 0.2;
            this.char = starShape.char;
            this.color = theme.colors['--gold'];
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.font = `${this.size}px Arial`;
            ctx.fillStyle = this.color;
            ctx.fillText(this.char, this.x, this.y);
            ctx.restore();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    let animationFrameId;
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        animationFrameId = requestAnimationFrame(animateParticles);
    }
    
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animateParticles();
}

// Spiral particle animation (creative overlay)
function initSpiralAnimation(canvasId, options = {}) {
    const canvas = $(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Cancel any existing animation for this canvas
    const isMain = canvasId.indexOf('main') !== -1;
    if (isMain && AppState.spiralAnimationMainId) cancelAnimationFrame(AppState.spiralAnimationMainId);
    if (!isMain && AppState.spiralAnimationLandingId) cancelAnimationFrame(AppState.spiralAnimationLandingId);

    // Respect reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        return;
    }

    // High-DPI support
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
    const counts = { subtle: 60, moderate: 110, strong: 180 };
    const baseCount = counts[intensity] || 60;

    const colors = options.colors || ['rgba(255,215,0,0.95)', 'rgba(138,43,226,0.9)', 'rgba(100,255,218,0.9)'];

    const particles = [];
    const maxR = Math.hypot(window.innerWidth, window.innerHeight) * 0.6;

    class SpiralParticle {
        constructor() {
            this.reset(true);
        }
        reset(initial = false) {
            this.t = (Math.random() * 6) - 3; // parameter along spiral
            this.offset = Math.random() * Math.PI * 2;
            this.speed = (0.002 + Math.random() * 0.006) * (initial ? 0.6 : 1);
            this.size = 0.6 + Math.random() * 3.2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = 0.06 + Math.random() * 0.6;
        }
        update(dt) {
            this.t += this.speed * dt;
            const a = 2.5; // spiral tightness
            const b = 6.5; // growth per revolution
            this.r = a + b * this.t;
            this.x = cx + this.r * Math.cos(this.t + this.offset);
            this.y = cy + this.r * Math.sin(this.t + this.offset);
            // fade as it moves out
            this.lifeAlpha = Math.max(0, 1 - (this.r / maxR));
            if (this.r > maxR || isNaN(this.x) || isNaN(this.y)) {
                this.reset();
            }
        }
        draw() {
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillStyle = this.color;
            ctx.globalAlpha = Math.min(0.9, this.alpha * this.lifeAlpha);
            const s = this.size * (0.6 + this.lifeAlpha);
            ctx.beginPath();
            ctx.arc(this.x, this.y, s, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < baseCount; i++) particles.push(new SpiralParticle());

    let last = performance.now();
    function animate(now) {
        const dt = Math.min(40, now - last); last = now;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // subtle radial vignette to soften edges
        const grad = ctx.createRadialGradient(cx, cy, Math.min(cx, cy) * 0.2, cx, cy, Math.max(cx, cy));
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, 'rgba(0,0,0,0.35)');
        ctx.fillStyle = grad;
        ctx.fillRect(0,0,canvas.width,canvas.height);

        particles.forEach(p => { p.update(dt); p.draw(); });

        const id = requestAnimationFrame(animate);
        if (isMain) AppState.spiralAnimationMainId = id; else AppState.spiralAnimationLandingId = id;
    }

    // Recompute center and maxR on resize
    const handleResize = () => { resizeCanvas(); cx = center().x; cy = center().y; };
    window.addEventListener('resize', handleResize);

    animate(performance.now());
}


function renderSolarSystemNav() {
    const navItems = [
        { id: 'timeline', name: 'Our Chronicle', color: '#e74c3c', size: 5, orbit: 1, speed: 40 },
        { id: 'book', name: 'The Stardust Tome', color: '#3498db', size: 6, orbit: 2, speed: 60 }, // Existing
        { id: 'gallery', name: 'Gallery of Ages', color: '#9b59b6', size: 6.5, orbit: 3, speed: 85 }, // Existing
        { id: 'guide', name: 'Constellation Guide', color: '#f1c40f', size: 4.5, orbit: 4, speed: 35 }, // Existing
        { id: 'games', name: 'Orion\'s Challenges', color: '#e67e22', size: 7, orbit: 5, speed: 110 }, // Existing
        { id: 'universes', name: 'Alternate Chronicles', color: '#2ecc71', size: 5.5, orbit: 6, speed: 50 }, // Replaces Calendar
        { id: 'voicegarden', name: 'Voice Garden', color: '#1abc9c', size: 5.2, orbit: 7, speed: 70 }, // New
        { id: 'sanctuary', name: 'Inner Sanctum', color: '#e0e0e0', size: 4, orbit: 8, speed: 130 } // Existing, new orbit
    ];

    const orbitRadii = [12, 18, 24, 30, 36, 42, 48, 54];
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

    const xEnd = (Math.random() - 0.5) * 400;
    const yEnd = (Math.random() - 0.5) * 400;
    const rotation = (Math.random() - 0.5) * 90;
    const duration = (Math.random() * 2) + 3;

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
        // Ensure main content is hidden and solar system is visible
        DOM.mainContent.classList.remove('visible');
        // If we previously scheduled hiding the solar system, clear it
        if (AppState.solarHideTimeout) { clearTimeout(AppState.solarHideTimeout); AppState.solarHideTimeout = null; }
        // Make sure container is displayed (flex) before removing the .hidden class so transitions work
        if (DOM.solarSystemContainer) DOM.solarSystemContainer.style.display = 'flex';
        DOM.solarSystemContainer.classList.remove('hidden');
        DOM.mainContent.style.backgroundColor = '';
        DOM.mainContent.style.padding = '100px 7vw 50px 7vw';
        DOM.mainContent.innerHTML = '';
        
        const chantCompliments = () => {
            const chantCount = Math.floor(Math.random() * 4) + 3;
            for (let i = 0; i < chantCount; i++) {
                setTimeout(() => {
                    createFloatingCompliment();
                }, i * (Math.random() * 300 + 200));
            }
        };

        AppState.complimentInterval = setInterval(chantCompliments, 3000);
        return;
    }
    
    DOM.mainContent.classList.add('visible');
    // Hide the solar system container completely for non-home panels. Add hidden class for transition
    if (DOM.solarSystemContainer) {
        DOM.solarSystemContainer.classList.add('hidden');
        // After the opacity transition, remove it from layout so it can't be seen through transparent panels
        if (AppState.solarHideTimeout) clearTimeout(AppState.solarHideTimeout);
        AppState.solarHideTimeout = setTimeout(() => {
            try { DOM.solarSystemContainer.style.display = 'none'; } catch (e) {}
            AppState.solarHideTimeout = null;
        }, 420);
    }
    
    let content = '';
    switch(panelId) {
        case 'timeline': content = getChronicleOfUsHTML(); break;
        case 'book': content = getBookPanelHTML(); break;
        case 'gallery': content = getGalleryPanelHTML(); break;
        case 'guide': content = getGuidePanelHTML(); break;
        case 'games': content = getGamesPanelHTML(); break;
        case 'voicegarden': content = getVoiceGardenHTML(); break;
        case 'calendar': content = getNebulaOfSolitudeHTML(); break;
        case 'universes': content = getUniversePanelHTML(); break;
        case 'sanctuary': content = getSanctuaryPanelHTML(); break;
    }
    DOM.mainContent.innerHTML = content;
    DOM.mainContent.scrollTop = 0;

    // Apply specific full-page styling only for Nebula of Solitude
    if (panelId === 'calendar') {
        DOM.mainContent.style.backgroundColor = 'transparent';
        DOM.mainContent.style.padding = '0';
    } else {
        // All other panels, including the sanctuary, now use the default padding
        DOM.mainContent.style.backgroundColor = '';
        DOM.mainContent.style.padding = '100px 7vw 50px 7vw'; 
    }

    if (panelId === 'book') { if (AppState.bookUnlocked) renderBookUI(); else DOM.bookPasswordGate.classList.add('active'); }
    if (panelId === 'gallery') {
        AppState.gallery.showAll = false;
        renderGalleryFilters();
        renderGallery();
        $('upload-photo-btn')?.addEventListener('click', () => $('photo-upload-input').click());
        $('photo-upload-input')?.addEventListener('change', handleGalleryUpload);
    }
    if (panelId === 'calendar') initNebulaOfSolitudeJS();
    if (panelId === 'timeline') initChroniclePanelJS();
    if (panelId === 'guide') initGuidePanelJS();
    if (panelId === 'games') initGamesPanelJS();
    if (panelId === 'voicegarden') initVoiceGardenPanelJS();
    if (panelId === 'sanctuary') initSanctuaryPanelJS();
    if (panelId === 'universes') initUniversePanel();
}

function handleMainContentClick(e) {
    const target = e.target;
    const closest = (selector) => target.closest(selector);

    if (closest('.gallery-filter-btn')) { 
        const category = closest('.gallery-filter-btn').dataset.category; 
        AppState.gallery.showAll = false;
        renderGallery(category); 
    } else if (closest('.polaroid-item')) {
        const index = parseInt(closest('.polaroid-item').dataset.index, 10);
        openLightbox(index);
    }
    else if (closest('[data-edit-index]')) { openEditor(parseInt(closest('[data-edit-index]').dataset.editIndex, 10)); }
    else if (closest('[data-delete-index]')) { deleteChapter(parseInt(closest('[data-delete-index]').dataset.deleteIndex, 10)); }
    else if (closest('#add-chapter-btn')) openNewChapterMeta();
    else if (closest('.chapter-item:not(.chapter-actions)')) { AppState.currentChapterIndex = parseInt(closest('.chapter-item').dataset.index, 10); renderChapterContent(AppState.currentChapterIndex); }
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

function startAlbumArtSlideshow() {
    if (AppState.music.albumArtInterval) {
        clearInterval(AppState.music.albumArtInterval);
    }
    
    AppState.music.albumArtInterval = setInterval(() => {
        AppState.music.albumArtIndex = (AppState.music.albumArtIndex + 1) % EDITABLE_CONFIG.PHOTOS_DATA.length;
        const newArt = EDITABLE_CONFIG.PHOTOS_DATA[AppState.music.albumArtIndex].src;
        
        const sunArt = $('sun-album-art');
        const panelArt = $('panel-album-art');
        
        if (sunArt) sunArt.src = newArt;
        if (panelArt) panelArt.src = newArt;
    }, 5000);
}

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

// ===================================================================
// START: CODE INTEGRATED FROM ORACLE.HTML
// ===================================================================

const personalizedContent = {
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

function createOracleStarfield(themeName) {
    const starfield = document.getElementById('starfield');
    if (!starfield) return;
    const theme = THEME_COLORS[themeName];
    const starShape = THEME_STAR_SHAPES[themeName];
    if (!theme || !starShape) return;
    starfield.innerHTML = '';
    starfield.style.background = theme.bgGradient;
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = starShape.char;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.fontSize = (Math.random() * 10 + 6) + 'px';
        star.style.color = theme.colors['--gold'];
        star.style.filter = `drop-shadow(0 0 ${Math.random() * 2 + 1}px ${starShape.shadowColor})`;
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (2 + Math.random() * 3) + 's';
        star.style.opacity = (Math.random() * 0.4 + 0.3);
        starfield.appendChild(star);
    }
    for (let i = 0; i < 2; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.textContent = starShape.char;
        shootingStar.style.left = Math.random() * 100 + '%';
        shootingStar.style.top = Math.random() * 50 + '%';
        shootingStar.style.color = theme.colors['--gold'];
        shootingStar.style.filter = `drop-shadow(0 0 8px ${starShape.shadowColor})`;
        shootingStar.style.animationDelay = Math.random() * 10 + 's';
        shootingStar.style.fontSize = '14px';
        starfield.appendChild(shootingStar);
    }
    const nebulae = [{ left: '10%', top: '20%' }, { left: '70%', top: '60%' }, { left: '40%', top: '80%' }];
    nebulae.forEach(neb => {
        const nebula = document.createElement('div');
        nebula.className = 'nebula';
        nebula.style.background = theme.colors['--soft-violet'];
        nebula.style.left = neb.left;
        nebula.style.top = neb.top;
        nebula.style.opacity = '0.2';
        starfield.appendChild(nebula);
    });
}




function switchSanctuaryView(viewIdToShow) {
    const mainContainer = document.getElementById('sanctuary-main-container');
    if (mainContainer) {
        mainContainer.querySelectorAll('.sanctuary-view').forEach(view => {
            view.classList.remove('active');
        });
        const viewToShow = document.getElementById(viewIdToShow);
        if (viewToShow) {
            viewToShow.classList.add('active');
        }
    }
}

// UPDATED: This now uses the new helper function
function showWelcomeQuestion() {
    switchSanctuaryView('welcomeQuestion');
}

// UPDATED: This now correctly shows the realms container before activating a specific realm
function showRealm(realmId) {
    switchSanctuaryView('sanctuary-realms-view');
    const realmsContainer = document.getElementById('sanctuary-realms-view');
    realmsContainer.querySelectorAll('.realm.active').forEach(realm => realm.classList.remove('active'));
    const realmToShow = document.getElementById(realmId + 'Realm');
    if (realmToShow) {
        realmToShow.classList.add('active');
        // Scroll to the top of the realms container
        document.getElementById('sanctuary-main-container').scrollTop = 0;
    }
    // Initialize realm-specific JS
    if (realmId === 'guidance') createConstellation();
    if (realmId === 'fortune') initScratchCard();
}
// UPDATED: This now correctly returns to the main hub
function returnToHub() {
    switchSanctuaryView('sanctuary-hub');
}

function revealBlessing(icon, title, message) {
    $('modalIcon').textContent = icon;
    $('modalTitle').textContent = title;
    $('modalMessage').innerHTML = message;
    $('blessingModal').classList.add('active');
}

function revealDynamicBlessing(category, icon, title) {
    const mainContentArray = personalizedContent[category];
    let message = mainContentArray[Math.floor(Math.random() * mainContentArray.length)];
    if (category === 'apology') {
        const promiseArray = personalizedContent['promise'];
        const randomPromise = promiseArray[Math.floor(Math.random() * promiseArray.length)];
        message += `<span class="promise"><strong>Promise of Compensation:</strong><br>${randomPromise}</span>`;
    }
    revealBlessing(icon, title, message);
}

function readBook(type, title, content) {
    $('bookTitle').textContent = title;
    $('bookContent').textContent = content;
    $('bookModal').classList.add('active');
}

function closeModal(modalId) { $(modalId).classList.remove('active'); }

const wisdoms = [
    "The cosmos whispers: Every storm passes, every wound heals. You are loved beyond the capacity of words to express.",
    "Ancient prophecy reveals: The strongest bonds are forged in the fires of challenge, tempered by time, unbreakable.",
    "The stars align to say: Your happiness is the universe's greatest priority, written in celestial law.",
    "Celestial wisdom speaks: In every ending lies a new beginning, in every tear, the seed of future joy.",
    "The void echoes: You are cherished, valued, and irreplaceable in this cosmic dance of existence.",
    "Oracle of ages declares: Bad days fade like morning mist before the eternal sun of unconditional love."
];

function revealWisdom() {
    const wisdom = wisdoms[Math.floor(Math.random() * wisdoms.length)];
    const oracleText = $('oracleText');
    oracleText.style.opacity = '0';
    setTimeout(() => {
        oracleText.textContent = wisdom;
        oracleText.style.transition = 'opacity 1s';
        oracleText.style.opacity = '1';
    }, 500);
}

function createConstellation() {
    const canvas = $('constellationCanvas');
    if (!canvas) return;
    canvas.innerHTML = '';
    const memories = [
        { text: "The First Smile", x: 15, y: 20 }, { text: "First Laugh Together", x: 35, y: 15 },
        { text: "That Perfect Day", x: 55, y: 25 }, { text: "When I Knew", x: 70, y: 20 },
        { text: "Your Favorite Moment", x: 85, y: 30 }, { text: "Our Inside Joke", x: 25, y: 50 },
        { text: "The Comfort We Share", x: 45, y: 55 }, { text: "Dancing in the Kitchen", x: 65, y: 60 },
        { text: "Late Night Talks", x: 80, y: 55 }, { text: "Future Adventures", x: 20, y: 80 },
        { text: "Forever Promise", x: 50, y: 85 }, { text: "Every Day After", x: 75, y: 75 }
    ];
    memories.forEach(memory => {
        const point = document.createElement('div');
        point.className = 'astral-point';
        point.style.left = memory.x + '%';
        point.style.top = memory.y + '%';
        point.title = memory.text;
        canvas.appendChild(point);
    });
    for (let i = 0; i < memories.length - 1; i++) {
        const line = document.createElement('div');
        line.className = 'astral-line';
        const p1 = memories[i], p2 = (i % 4 === 3) ? memories[i - 2] : memories[i + 1];
        const canvasWidth = canvas.offsetWidth, canvasHeight = canvas.offsetHeight;
        if (canvasWidth > 0 && canvasHeight > 0) {
            const p1x = p1.x / 100 * canvasWidth, p1y = p1.y / 100 * canvasHeight;
            const p2x = p2.x / 100 * canvasWidth, p2y = p2.y / 100 * canvasHeight;
            const length = Math.hypot(p2x - p1x, p2y - p1y);
            const angle = Math.atan2(p2y - p1y, p2x - p1x) * 180 / Math.PI;
            line.style.width = length + 'px';
            line.style.left = p1.x + '%';
            line.style.top = p1.y + '%';
            line.style.transform = `rotate(${angle}deg)`;
            canvas.appendChild(line);
        }
    }
}

let litCandles = 0;
const totalCandles = 7;
function lightCandle(candle) {
    if (!candle.classList.contains('lit')) {
        candle.classList.add('lit');
        litCandles++;
        if (litCandles === totalCandles) {
            $('ritualComplete').style.display = 'block';
            setTimeout(() => {
                revealBlessing('◈', 'The Ritual is Complete', 'Ancient forces smile upon you. Harmony has been restored. All is forgiven, all is renewed, all is well.');
                setTimeout(resetCandles, 2000);
            }, 1500);
        }
    }
}

function resetCandles() {
    $$('#sanctuary-panel .candle.lit').forEach(c => c.classList.remove('lit'));
    $('ritualComplete').style.display = 'none';
    litCandles = 0;
}

const winPrizes = [
    { title: "Cosmic Coupon: Weekend Getaway!", description: "Claim a weekend away to a destination of your choice." },
    { title: "Cosmic Coupon: No Dishes For a Week!", description: "You are exempt from all dish-related duties for 7 days." },
    { title: "Cosmic Coupon: Sunset Dinner!", description: "A romantic dinner and drinks at a beautiful scenic spot." },
    { title: "Cosmic Coupon: Breakfast in Bed!", description: "A delicious, royal breakfast served to you in bed." },
    { title: "Cosmic Coupon: Relaxing Massage!", description: "A full, professional-tier massage with luxurious oils." },
    { title: "Cosmic Coupon: Movie Marathon!", description: "Your choice of movie or show, with all your favorite snacks." },
    { title: "Cosmic Coupon: A Giant Cuddle!", description: "Redeemable for one enormous, soul-recharging cuddle, anytime." },
    { title: "Cosmic Coupon: Customized!", description: "This coupon can be whatever you want it to be. Your wish is my command!" }
];
const losePrize = { title: "A Whisper from the Void...", description: "The stars weren't aligned this time. But my love for you is constant! Try again." };
let scratchCtx;

function initScratchCard() {
    const isWin = Math.random() < 0.1;
    const prize = isWin ? winPrizes[Math.floor(Math.random() * winPrizes.length)] : losePrize;
    $('prizeTitle').textContent = prize.title;
    $('prizeDescription').textContent = prize.description;
    setupCanvas();
}

function setupCanvas() {
    const scratchCanvas = $('scratchCanvas');
    if (!scratchCanvas) return;
    scratchCtx = scratchCanvas.getContext('2d');
    scratchCanvas.width = scratchCanvas.parentElement.offsetWidth;
    scratchCanvas.height = scratchCanvas.parentElement.offsetHeight;
    const gradient = scratchCtx.createLinearGradient(0, 0, scratchCanvas.width, scratchCanvas.height);
    gradient.addColorStop(0, '#d4af37');
    gradient.addColorStop(1, '#ffd700');
    scratchCtx.fillStyle = gradient;
    scratchCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
    scratchCtx.fillStyle = '#4a2c0f';
    scratchCtx.font = 'bold 30px Cinzel';
    scratchCtx.textAlign = 'center';
    scratchCtx.textBaseline = 'middle';
    scratchCtx.fillText('Scratch to Reveal Your Prize', scratchCanvas.width / 2, scratchCanvas.height / 2);
    scratchCtx.font = '20px Cinzel';
    scratchCtx.fillText('✧', scratchCanvas.width / 2, scratchCanvas.height / 2 + 40);
    let isDrawing = false;
    const start = (e) => { e.preventDefault(); isDrawing = true; };
    const end = (e) => { e.preventDefault(); isDrawing = false; };
    const draw = (e) => {
        if (!isDrawing) return;
        e.preventDefault();
        const rect = scratchCanvas.getBoundingClientRect();
        const touch = e.touches ? e.touches[0] : e;
        scratch(touch.clientX - rect.left, touch.clientY - rect.top);
    };
    scratchCanvas.addEventListener('mousedown', start);
    scratchCanvas.addEventListener('mouseup', end);
    scratchCanvas.addEventListener('mousemove', draw);
    scratchCanvas.addEventListener('touchstart', start, { passive: false });
    scratchCanvas.addEventListener('touchend', end, { passive: false });
    scratchCanvas.addEventListener('touchmove', draw, { passive: false });
}

function scratch(x, y) {
    if (!scratchCtx) return;
    scratchCtx.globalCompositeOperation = 'destination-out';
    scratchCtx.beginPath();
    scratchCtx.arc(x, y, 25, 0, Math.PI * 2, true);
    scratchCtx.fill();
}

function applyThemeToOracle(themeName) {
    const themeStars = {
      mystical: { char: '✦', color: '#ffd700' }, ethereal: { char: '💧', color: '#64ffda' },
      sunset: { char: '🔥', color: '#ff9f43' }, forest: { char: '🍃', color: '#2ecc71' },
      midnight: { char: '✨', color: '#e0e0e0' }, coral: { char: '🪸', color: '#ff7b54' },
      royal: { char: '💎', color: '#c4af9f' }, ocean: { char: '🌊', color: '#00d9ff' }
    };
    const starShape = themeStars[themeName];
    if (!starShape) return;
    const sanctuaryPanel = $('sanctuary-panel');
    if (!sanctuaryPanel) return;
    sanctuaryPanel.querySelectorAll('.star, .shooting-star').forEach(star => {
      star.textContent = starShape.char;
      star.style.color = starShape.color;
    });
}

function initSanctuaryPanelJS() {
    const typeTextElement = document.getElementById('typing-text');
    const riddleElement = document.getElementById('sanctuary-riddle');
    const passwordInput = document.getElementById('riddle-password');
    const choiceButtons = document.querySelectorAll('.riddle-choice-btn');
    const feedbackElement = document.getElementById('riddle-feedback');

    const textToType = `Halt, traveler... You approach a sacred space, woven from stardust and memory... This Inner Sanctum was forged by Nicholas... a celestial architect who shaped this reality to comfort his beloved, Zoya... Only she may enter freely...`;
    let hasAttempted = false;

    function typewriter(element, text, callback) {
        let i = 0;
        element.innerHTML = '';
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                if (callback) callback();
            }
        }, 50);
    }

    function showClosedDoorFailure(message) {
        hasAttempted = true;
        document.getElementById('sanctuary-main-container').style.display = 'none';
        const failureOverlay = document.createElement('div');
        failureOverlay.id = 'sanctuary-failure-overlay';
        failureOverlay.innerHTML = `
            <div class="failure-header">
                <div class="failure-skulls">
                    <span>💀</span>
                    <span>💀</span>
                    <span>💀</span>
                </div>
                <h2 class="failure-title">ACCESS DENIED</h2>
            </div>
            <div class="failure-content-grid">
                <div class="failure-message-column left-column">
                    <p class="failure-message rune-text-left">${message.left}</p>
                </div>
                <div class="failure-image-container">
                    <img src="photos/closed_nebula.png" alt="Sealed cosmic door">
                </div>
                <div class="failure-message-column right-column">
                    <p class="failure-message rune-text-right">${message.right}</p>
                </div>
            </div>
            <p class="failure-prompt">The cosmos has judged you. Begone.</p>`;
        document.body.appendChild(failureOverlay);
    }

    function handleCorrectAnswer() {
        riddleElement.style.display = 'none';
        typeTextElement.style.display = 'none';
        const doorAnimationView = document.getElementById('sanctuary-entrance-animation');
        switchSanctuaryView('sanctuary-entrance-animation');
        doorAnimationView.classList.add('is-opening');
        setTimeout(() => switchSanctuaryView('sanctuary-hub'), 2000); // 2 second animation
    }

    function checkAnswer(isPassword = false, value = '') {
        if (hasAttempted) return;
        // Allow temporary bypass if mood-based loading is in progress
        if (AppState.passwordsTemporarilyBypassed) {
            feedbackElement.textContent = "The gates sense a special alignment. Entry granted.";
            feedbackElement.style.color = 'var(--jade)';
            feedbackElement.style.display = 'block';
            setTimeout(handleCorrectAnswer, 800);
            return;
        }

        const correctPassword = "nini";
        const correctFood = "tomato ramen";
        let isCorrect = isPassword ? value.toLowerCase().trim() === correctPassword : value.toLowerCase().trim() === correctFood;

        if (isCorrect) {
            feedbackElement.textContent = "The Sanctum recognizes you... The way is opened.";
            feedbackElement.style.color = 'var(--jade)';
            setTimeout(handleCorrectAnswer, 1000);
        } else {
            const failureMessagePairs = [
                {
                    left: "A chilling void answers your call. The sacred geometry of this space contorts in disgust at your presence. You are an anomaly, a dissonance in a symphony of starlight, and the cosmos itself recoils from your touch.",
                    right: "The path is not merely closed; for you, it has been erased from existence. Your trespass has angered forces beyond mortal comprehension, sealing this realm forever against your unworthy spirit. Turn back, for only ruin awaits those who defy the cosmic will."
                },
                {
                    left: "Your whisper is a scream in the silence of this sanctuary. The memories enshrined here curdle at your approach, and the starlight dims, refusing to illuminate one so unworthy. This is a holy place, and you are a trespasser.",
                    right: "You are not welcome here. You will never be welcome here. The very air you breathe within these bounds is an insult, and the ancient wards now hum with a malevolent energy, eager to repel and punish your audacious intrusion."
                },
                {
                    left: "The guardians of this realm stir from their slumber, awakened by the impurity of your attempt. They see the shadows in your heart that you try to hide and find you wanting. The door does not simply remain shut; it judges you, finds you lacking.",
                    right: "And casts you out into the cold, empty void from whence you came. Hope withers at the touch of your unworthiness. This portal, once a beacon, now stands as an impenetrable barrier, mocking your futile efforts to enter its sacred depths."
                },
                {
                    left: "You speak a word of profane ignorance into a space built of pure love. The very fabric of this reality rejects your intrusion, treating you as a virus to be purged. The warmth you sought is now an inferno that scorns you.",
                    right: "There is no comfort for you here, only the cold, hard finality of absolute rejection. May your journey be one of endless wandering, for the grace of this sanctuary will forever elude your grasping hands. Leave this place, and remember your folly."
                }
            ];
            const chosenMessages = failureMessagePairs[Math.floor(Math.random() * failureMessagePairs.length)];
            showClosedDoorFailure(chosenMessages);
        }
        feedbackElement.style.display = 'block';
    }
    
    // Initial setup
    switchSanctuaryView('sanctuary-threshold'); // Start at the threshold
    typewriter(typeTextElement, textToType, () => { if (riddleElement) riddleElement.style.display = 'block'; });

    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkAnswer(true, passwordInput.value); });
    }
    choiceButtons.forEach(button => {
        button.addEventListener('click', () => checkAnswer(false, button.dataset.answer));
    });
}

// ===================================================================
// END: CODE INTEGRATED FROM ORACLE.HTML
// ===================================================================


// ===================================================================
// START: VOICE GARDEN IMPLEMENTATION
// ===================================================================

const getVoiceGardenHTML = () => `
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
            <!-- Flowers will be populated by JS -->
        </div>

        <div class="voice-playback-modal" id="voice-playback-modal">
            <div class="playback-header">
                <h4 id="playback-title">Playing Message...</h4>
                <button class="playback-close" id="playback-close-btn">&times;</button>
            </div>
            <div class="waveform-container" id="playback-waveform"></div>
            <div class="playback-progress" id="playback-progress-bar">
                <div class="playback-progress-fill" id="playback-progress-fill"></div>
            </div>
            <div class="playback-time">
                <span id="playback-current-time">0:00</span>
                <span id="playback-total-duration">0:00</span>
            </div>
            <div class="playback-controls">
                <button class="playback-btn" id="playback-rewind-btn">⏮️</button>
                <button class="playback-btn" id="playback-play-pause-btn">▶️</button>
                <button class="playback-btn" id="playback-forward-btn">⏭️</button>
            </div>
            <div class="playback-metadata">
                <div class="metadata-row">
                    <span class="metadata-label">From:</span>
                    <span id="playback-from" class="metadata-value"></span>
                </div>
                <div class="metadata-row">
                    <span class="metadata-label">Date:</span>
                    <span id="playback-date" class="metadata-value"></span>
                </div>
                <div class="metadata-row">
                    <span class="metadata-label">Note:</span>
                    <span id="playback-note" class="metadata-value"></span>
                </div>
                <div class="metadata-row">
                    <button class="voice-action-btn" id="playback-transcript-btn" style="display:none; padding:6px 10px;">Transcript</button>
                </div>
            </div>
            <div class="voice-actions">
                <button class="voice-action-btn" id="playback-like-btn">👍 Like</button>
                <button class="voice-action-btn" id="playback-fav-btn">☆ Favorite</button>
                <button class="voice-action-btn" id="playback-delete-btn">🗑️ Delete</button>
            </div>
        </div>
    </div>
</div>
`;

function initVoiceGardenPanelJS() {
    const FLOWER_LIBRARY = {
        rose: { emoji: '🌹', color: '#FF1744', meaning: 'Romantic, loving messages' },
        sunflower: { emoji: '🌻', color: '#FFD700', meaning: 'Happy, cheerful messages' },
        lily: { emoji: '🌸', color: '#FFB6C1', meaning: 'Sweet, tender messages' },
        forgetMeNot: { emoji: '💙', color: '#4169E1', meaning: 'Missing you messages' },
        lavender: { emoji: '💜', color: '#9370DB', meaning: 'Peaceful, calming messages' },
        daisy: { emoji: '🌼', color: '#FFFFFF', meaning: 'Playful, fun messages' },
    };

    // Mock data for demonstration; include only files from recordings/ for the Voice Garden
    const allVoiceMessages = [
        // legacy music entries are kept in repo but WILL NOT be shown in the Voice Garden (only recordings/ are allowed)
        // user's English recording (kept)
        { id: 'vm_004', from: 'Zoya', to: 'Nic', audioFile: 'recordings/Zoyareadletter.m4a', duration: 35, flower: { type: 'rose', position: { x: 35, y: 25 } }, textNote: 'To my Baobei...', recordedDate: '2024-05-22T10:00:00Z', transcript: "To my Baobei, you used to be the light, the hope, the future, the strands in my life after I made you, my sky became clear and bright. I wanted so much to tell you outw. Hey, you're too late, and it's so good to meet you. because if you I decided to love deeply without reservation for only once at that time I thought I have countless features with you, so I began to plan our futuring detail. I believe that people will love each other in this world can go to the end. I thought you love as much as I did and you were as brave as I was and appreciated as much as I did. I you sllept. Oh, you finished?", lang: 'en' },
        // NEW: Nini's Chinese anniversary message (no transcript provided)
        { id: 'vm_005', from: 'Nini', to: 'Zoya', audioFile: 'recordings/3rd_anniversary.m4a', duration: null, flower: { type: 'lily', position: { x: 60, y: 50 } }, textNote: '3rd anniversary message (Chinese)', recordedDate: '2025-10-26T12:00:00Z', lang: 'zh' },
        // User-added: Zoya's sung piece (English, no transcript)
        { id: 'vm_006', from: 'Zoya', to: 'Nic', audioFile: 'recordings/Zoy_sings.m4a', duration: null, flower: { type: 'daisy', position: { x: 70, y: 30 } }, textNote: '', recordedDate: '2025-10-26T13:00:00Z', lang: 'en' },
    ];

    // Keep only recordings/* files for the Voice Garden
    // Ensure user-provided VM (vm_007) is present with its transcript (add if missing)
    if (!allVoiceMessages.find(m => m.id === 'vm_007')) {
        allVoiceMessages.push({
            id: 'vm_007',
            from: 'Zoya',
            to: 'Nic',
            audioFile: 'recordings/The most precios tear.m4a',
            duration: null,
            flower: { type: 'lily', position: { x: 25, y: 55 } },
            textNote: '',
            recordedDate: '2025-10-26T14:00:00Z',
            transcript: `Actually, I just feel like it's interesting. Can you tell me one more? I should tell you a boring one so that I can feel sleepy. Tell me one more, please. The title is called The Most Precious Tear. 最珍贵的眼泪 I don't know if you've heard this before.
Not yet.
在很久以前有一个国王。

Okay, it's a story happened in a kingdom between a king and his three daughters and their husbands.
在很久很久以前，有一个国王，他把他的国家治理得非常好。国家不大，但百姓们丰衣足食，安居乐业，十分幸福。国王有三位美丽可爱的小公主。

三位小公主从生下来就拥有一种神奇的魔力。她们哭泣的时候，落下的眼泪会化作一颗颗晶莹剔透的钻石，价值连城。
有一天，国王发现自己年事已高，国家还没有可以托付的人，而公主们也还没有人照顾，于是昭告天下：

“众所周知，我有三位公主，她们每人都拥有举世无双的美貌，而且她们的眼泪可以化作昂贵的钻石。一个月后，我将召集所有优秀的男人，让她们挑选自己心仪的丈夫。被选中的人将有机会继承我的国家和财富。”

一个月后，国王的城堡里聚满了来自世界各地的王子、骑士和富豪之子。
每个人都英俊优雅，自信满满，围绕着城堡等待公主们的到来。中午，国王带着三位公主来到大厅。为了欢迎远道而来的客人，长公主为大家唱了一首歌，声音清澈如天空。二公主为大家跳舞，步伐轻盈，身段美妙。

而最年幼的小公主，对着众人浅浅一笑，就躲在国王身后，再也不肯出来。
国王尴尬地解释道，请大家不要介意。小公主自从生下来之后就没有说过话，而且很怕生人。为了博取公主们的青睐，大家纷纷展示自己的长处，有的当场写诗作画送给大公主，有的表演骑士和射箭技艺给二公主，有的拿出世上稀有的棋艺珍宝送给小公主。

大公主和二公主都很开心，逐渐做出了自己的选择，只有小公主静静地躲在国王身后。
最终，长公主选择了一位英俊的王子，他承诺会为她征服世界。
二公主选择了富豪之子，那位聪明的男孩承诺會賺很多的钱，为她建立一座世界上最华丽的宫殿，里面摆满美丽的奇珍异宝。

而小公主平静地摇了摇头。当国王准备宣布结果的时候，一位年轻的牧羊人从人群中走出，走到小公主面前，轻轻在她耳边说了一句话。小公主突然绽放出灿烂的笑容，轻轻握住牧羊人的手。

就这样，三位公主都有了自己的伴侣。五年过去了。
长公主的丈夫用泪水变成钻石，他带着士兵四处征战，每征服一座城堡都以公主的名字命名。长公主感到非常幸福。
二公主的丈夫同样用泪水變成鑽石，生意越做越大。她确实天生是商人的女儿，很快積累了大量财富。虽然她们没有建成世界上最豪华的宫殿，但二公主感到满足，也非常幸福。

自从小公主和牧羊人离开城堡开始，她们环游世界，后来找到一片群山环绕、绿意盎然的天堂，决定定居下来。
他们花半个月時間伐木、搭建房屋，制作家具，在房后种植蔬菜，并在菜地周围搭建篱笆。小公主把美丽的小花移到花园里，虽然不知道它们叫什么名字，但每天看到都会很开心。

傍晚，他们会坐在湖边钓鱼，或数星星。他们一直很穷，但生活非常开心。小公主渐渐开口说话，只对牧羊人一个人说，天上的云彩、河里的鱼、路上的鸟窝、头上的蝴蝶，她滔滔不绝地讲个不停。牧羊人常常安静地坐在湖边听她讲故事，直到小公主累了睡着，把她抱回房间。

国王病危，派人找回三位公主和她们的丈夫。他惊讶地发现，小公主夫婦穿着整齐却打满补丁的衣服。他好奇地问为什么如此贫穷，毕竟小公主随便一滴眼泪就足够买一家服装店。
牧羊人說：“因为我从不让她哭。”

国王立即决定将王位传给牧羊人。也许每个人对幸福的理解不同，答案永远不止一个。但只有牧羊人知道什么是珍惜。
国王問小公主：“那年牧羊人对你说了什么？”
小公主說：“他说，‘即使你的泪水能化作最珍贵的钻石，我也宁愿贫穷流泪，也不让你哭。’”

That's all.
Thank you.
You got the story?
Of course. Even though it was a little bit long, but I got it.
You want me to tell you what you said?
Yeah.
`,
            lang: 'zh'
        });
    }

    // Ensure user-provided VM (vm_008) is present (Zoya's new recording, no transcript)
    if (!allVoiceMessages.find(m => m.id === 'vm_008')) {
        allVoiceMessages.push({
            id: 'vm_008',
            from: 'Zoya',
            to: 'Nic',
            audioFile: 'recordings/Zoya sings again.m4a',
            duration: null,
            flower: { type: 'daisy', position: { x: 55, y: 40 } },
            textNote: '',
            recordedDate: '2025-10-26T15:00:00Z',
            lang: 'zh'
        });
    }
    const voiceMessages = allVoiceMessages.filter(m => m.audioFile && m.audioFile.startsWith('recordings/'));

    // Ensure user-provided VM (vm_007) is present with its transcript (add if missing)
    if (!allVoiceMessages.find(m => m.id === 'vm_007')) {
        allVoiceMessages.push({
            id: 'vm_007',
            from: 'Zoya',
            to: 'Nic',
            audioFile: 'recordings/The most precios tear.m4a',
            duration: null,
            flower: { type: 'lily', position: { x: 25, y: 55 } },
            textNote: '',
            recordedDate: '2025-10-26T14:00:00Z',
            transcript: `Actually, I just feel like it's interesting. Can you tell me one more? I should tell you a boring one so that I can feel sleepy. Tell me one more, please. The title is called The Most Precious Tear. 最珍贵的眼泪 I don't know if you've heard this before.
Not yet.
在很久以前有一个国王。

Okay, it's a story happened in a kingdom between a king and his three daughters and their husbands.
在很久很久以前，有一个国王，他把他的国家治理得非常好。国家不大，但百姓们丰衣足食，安居乐业，十分幸福。国王有三位美丽可爱的小公主。

三位小公主从生下来就拥有一种神奇的魔力。她们哭泣的时候，落下的眼泪会化作一颗颗晶莹剔透的钻石，价值连城。
有一天，国王发现自己年事已高，国家还没有可以托付的人，而公主们也还没有人照顾，于是昭告天下：

“众所周知，我有三位公主，她们每人都拥有举世无双的美貌，而且她们的眼泪可以化作昂贵的钻石。一个月后，我将召集所有优秀的男人，让她们挑选自己心仪的丈夫。被选中的人将有机会继承我的国家和财富。”

一个月后，国王的城堡里聚满了来自世界各地的王子、骑士和富豪之子。
每个人都英俊优雅，自信满满，围绕着城堡等待公主们的到来。中午，国王带着三位公主来到大厅。为了欢迎远道而来的客人，长公主为大家唱了一首歌，声音清澈如天空。二公主为大家跳舞，步伐轻盈，身段美妙。

而最年幼的小公主，对着众人浅浅一笑，就躲在国王身后，再也不肯出来。
国王尴尬地解释道，请大家不要介意。小公主自从生下来之后就没有说过话，而且很怕生人。为了博取公主们的青睐，大家纷纷展示自己的长处，有的当场写诗作画送给大公主，有的表演骑士和射箭技艺给二公主，有的拿出世上稀有的棋艺珍宝送给小公主。

大公主和二公主都很开心，逐渐做出了自己的选择，只有小公主静静地躲在国王身后。
最终，长公主选择了一位英俊的王子，他承诺会为她征服世界。
二公主选择了富豪之子，那位聪明的男孩承诺會賺很多的钱，为她建立一座世界上最华丽的宫殿，里面摆满美丽的奇珍异宝。

而小公主平静地摇了摇头。当国王准备宣布结果的时候，一位年轻的牧羊人从人群中走出，走到小公主面前，轻轻在她耳边说了一句话。小公主突然绽放出灿烂的笑容，轻轻握住牧羊人的手。

就这样，三位公主都有了自己的伴侣。五年过去了。
长公主的丈夫用泪水变成钻石，他带着士兵四处征战，每征服一座城堡都以公主的名字命名。长公主感到非常幸福。
二公主的丈夫同样用泪水變成鑽石，生意越做越大。她确实天生是商人的女儿，很快積累了大量财富。虽然她们没有建成世界上最豪华的宫殿，但二公主感到满足，也非常幸福。

自从小公主和牧羊人离开城堡开始，她们环游世界，后来找到一片群山环绕、绿意盎然的天堂，决定定居下来。
他们花半个月時間伐木、搭建房屋，制作家具，在房后种植蔬菜，并在菜地周围搭建篱笆。小公主把美丽的小花移到花园里，虽然不知道它们叫什么名字，但每天看到都会很开心。

傍晚，他们会坐在湖边钓鱼，或数星星。他们一直很穷，但生活非常开心。小公主渐渐开口说话，只对牧羊人一个人说，天上的云彩、河里的鱼、路上的鸟窝、头上的蝴蝶，她滔滔不绝地讲个不停。牧羊人常常安静地坐在湖边听她讲故事，直到小公主累了睡着，把她抱回房间。

国王病危，派人找回三位公主和她们的丈夫。他惊讶地发现，小公主夫婦穿着整齐却打满补丁的衣服。他好奇地问为什么如此贫穷，毕竟小公主随便一滴眼泪就足够买一家服装店。
牧羊人說：“因为我从不让她哭。”

国王立即决定将王位传给牧羊人。也许每个人对幸福的理解不同，答案永远不止一个。但只有牧羊人知道什么是珍惜。
国王問小公主：“那年牧羊人对你说了什么？”
小公主說：“他说，‘即使你的泪水能化作最珍贵的钻石，我也宁愿贫穷流泪，也不让你哭。’”

That's all.
Thank you.
You got the story?
Of course. Even though it was a little bit long, but I got it.
You want me to tell you what you said?
Yeah.
`,
            lang: 'zh'
        });
    }

    const gardenView = $('garden-view');
    if (!gardenView) return;

    // Clear existing garden (if re-initialized)
    gardenView.innerHTML = '';

    // Stats
    $('vg-total-flowers').textContent = voiceMessages.length;
    // initial filter is 'all'
    let currentFilter = 'all';
    const getFiltered = () => voiceMessages.filter(m => {
        if (currentFilter === 'all') return true;
        return m.lang === currentFilter;
    });
    const updateFilterCount = () => { const filtered = getFiltered(); const el = $('vg-filter-count'); if (el) el.textContent = filtered.length; };
    updateFilterCount();
    const firstMessageDate = voiceMessages.length ? new Date(voiceMessages.reduce((min, p) => p.recordedDate < min ? p.recordedDate : min, voiceMessages[0].recordedDate)) : new Date();
    const gardenAgeDays = Math.floor((new Date() - firstMessageDate) / (1000 * 60 * 60 * 24));
    $('vg-garden-age').textContent = `${gardenAgeDays}d`;

    // Audio player for playback (single instance)
    if (!initVoiceGardenPanelJS._player) {
        initVoiceGardenPanelJS._player = new Audio();
        initVoiceGardenPanelJS._player.preload = 'metadata';
    }
    const voicePlayer = initVoiceGardenPanelJS._player;
    let currentMsg = null;

    // Attach UI controls once
    if (!initVoiceGardenPanelJS._controlsAttached) {
        const playBtn = $('playback-play-pause-btn');
        const rewindBtn = $('playback-rewind-btn');
        const forwardBtn = $('playback-forward-btn');
        const progressFill = $('playback-progress-fill');
        const progressBar = $('playback-progress');
        const currentTimeEl = $('playback-current-time');
        const totalTimeEl = $('playback-total-duration');

        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!voicePlayer.src) return;
            if (voicePlayer.paused) {
                voicePlayer.play().catch(err => console.error('Playback error', err));
                playBtn.textContent = '⏸️';
            } else {
                voicePlayer.pause();
                playBtn.textContent = '▶️';
            }
        });

        rewindBtn.addEventListener('click', (e) => { e.stopPropagation(); if (voicePlayer.src) voicePlayer.currentTime = Math.max(0, voicePlayer.currentTime - 10); });
        forwardBtn.addEventListener('click', (e) => { e.stopPropagation(); if (voicePlayer.src) voicePlayer.currentTime = Math.min(voicePlayer.duration || 0, voicePlayer.currentTime + 10); });

        // Seek
        const progressContainer = $('playback-progress-bar');
        progressContainer?.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const pct = clickX / rect.width;
            if (voicePlayer.duration) voicePlayer.currentTime = pct * voicePlayer.duration;
        });

        // Update time/progress
        voicePlayer.addEventListener('timeupdate', () => {
            const dur = voicePlayer.duration || 0;
            const cur = voicePlayer.currentTime || 0;
            const pct = dur ? (cur / dur) * 100 : 0;
            const fill = $('playback-progress-fill');
            if (fill) fill.style.width = pct + '%';
            if (currentTimeEl) currentTimeEl.textContent = formatTime(cur);
            if (totalTimeEl && !isNaN(dur) && dur > 0) totalTimeEl.textContent = formatTime(dur);
        });

        voicePlayer.addEventListener('loadedmetadata', () => {
            const dur = voicePlayer.duration || 0;
            if ($('playback-total-duration')) $('playback-total-duration').textContent = formatTime(dur);
        });

        voicePlayer.addEventListener('ended', () => {
            const playBtnEl = $('playback-play-pause-btn');
            if (playBtnEl) playBtnEl.textContent = '▶️';
            if (currentMsg) {
                // mark as seen (optional flag) — categories are based on language rather than heard/unheard
                currentMsg.seen = true;
            }
        });

        // Close modal handler
        $('playback-close-btn')?.addEventListener('click', () => {
            const modalEl = $('voice-playback-modal');
            if (modalEl) {
                modalEl.classList.remove('active');
                modalEl.style.display = '';
                if (modalEl._voiceOverlayHandler) { modalEl.removeEventListener('click', modalEl._voiceOverlayHandler); modalEl._voiceOverlayHandler = null; }
            }
            try { voicePlayer.pause(); } catch (e) {}
            const playBtnEl = $('playback-play-pause-btn'); if (playBtnEl) playBtnEl.textContent = '▶️';
        });

        // initialize like/fav controls (idempotent)
        try { initLikeAndFavControls(); } catch (e) { /* will be available after function declaration */ }

        initVoiceGardenPanelJS._controlsAttached = true;
    }

    // Render flowers (respecting current filter: only recordings/* messages are considered)
    const renderFlowers = () => {
        gardenView.innerHTML = '';
        const filtered = getFiltered();
        filtered.forEach(msg => {
            const flowerData = FLOWER_LIBRARY[msg.flower.type] || { emoji: '🌸', color: '#fff', meaning: 'Message' };
            const flowerEl = document.createElement('div');
            flowerEl.className = 'garden-flower';
            if (!msg.seen) flowerEl.classList.add('flower-unheard');
            flowerEl.style.left = `${msg.flower.position.x}%`;
            flowerEl.style.bottom = `${msg.flower.position.y}%`;
            // base flower icon
            flowerEl.innerHTML = `
                <div class="flower-icon" style="color: ${flowerData.color}; font-size: 1.6rem;">${flowerData.emoji}</div>
                <div class="flower-stem"></div>
            `;
            // title shows meaning, from and optional derived note
            const derivedNote = (!msg.textNote || msg.textNote.trim() === '') ? deriveNoteFromAudioFile(msg.audioFile) : msg.textNote;
            flowerEl.title = `${flowerData.meaning}\nFrom: ${msg.from} (${msg.lang || 'unknown'})${derivedNote ? '\nNote: ' + derivedNote : ''}`;

            // badges: favorite and emoji
            try {
                const favs = loadFavs();
                const emojis = loadEmojis();
                const fav = favs[msg.id];
                const emoji = emojis[msg.id];
                if (fav) {
                    const favBadge = document.createElement('div');
                    favBadge.className = 'vg-badge vg-fav-badge';
                    favBadge.textContent = '★';
                    favBadge.title = 'Favorited';
                    favBadge.style.position = 'absolute';
                    favBadge.style.top = '6px';
                    favBadge.style.right = '8px';
                    favBadge.style.fontSize = '0.9rem';
                    flowerEl.appendChild(favBadge);
                }
                if (emoji) {
                    const emojiBadge = document.createElement('div');
                    emojiBadge.className = 'vg-badge vg-emoji-badge';
                    emojiBadge.textContent = emoji;
                    emojiBadge.title = 'Reaction';
                    emojiBadge.style.position = 'absolute';
                    emojiBadge.style.bottom = '8px';
                    emojiBadge.style.right = '8px';
                    emojiBadge.style.fontSize = '1rem';
                    flowerEl.appendChild(emojiBadge);
                }
            } catch (e) { /* ignore storage errors */ }

            flowerEl.addEventListener('click', () => openPlaybackModal(msg));
            gardenView.appendChild(flowerEl);
        });
        updateFilterCount();
    };
    renderFlowers();

    // Filter button handlers
    const setFilter = (f) => {
        currentFilter = f;
        ['vg-filter-all','vg-filter-en','vg-filter-zh'].forEach(id => { const b = $(id); if (b) b.classList.remove('active'); });
        const map = { all: 'vg-filter-all', en: 'vg-filter-en', zh: 'vg-filter-zh' };
        const btn = $(map[f]); if (btn) btn.classList.add('active');
        renderFlowers();
    };
    $('vg-filter-all')?.addEventListener('click', () => setFilter('all'));
    $('vg-filter-en')?.addEventListener('click', () => setFilter('en'));
    $('vg-filter-zh')?.addEventListener('click', () => setFilter('zh'));

    function openPlaybackModal(msg) {
        currentMsg = msg;
        const modal = $('voice-playback-modal');
        
        if (!modal) return;

        // Move modal to body so it becomes a full-screen overlay (if not already)
        if (modal.parentElement !== document.body) document.body.appendChild(modal);

        // Wrap inner content for consistent centering/styling if not already wrapped
        if (!modal.querySelector('.voice-playback-inner')) {
            const inner = document.createElement('div');
            inner.className = 'voice-playback-inner';
            inner.style.cssText = 'background: var(--deep-purple); padding: 1.2rem; border-radius: 12px; max-width:720px; width: calc(100% - 48px); box-shadow: 0 10px 40px rgba(0,0,0,0.6); color: var(--text-primary);';
            while (modal.firstChild) inner.appendChild(modal.firstChild);
            modal.appendChild(inner);
        }

        // Style the overlay to cover the viewport and center the inner card
        modal.style.position = 'fixed';
        modal.style.inset = '0';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.background = 'rgba(0,0,0,0.6)';
        modal.style.zIndex = '1200';
        modal.classList.add('active');

        // Populate header/metadata
        $('playback-title').textContent = FLOWER_LIBRARY[msg.flower.type]?.meaning || 'Message';
        $('playback-from').textContent = msg.from;
        $('playback-date').textContent = new Date(msg.recordedDate).toLocaleString();

        // Show short note and transcript (if available)
        const noteEl = $('playback-note');
        if (noteEl) {
            const derivedNote = (!msg.textNote || msg.textNote.trim() === '') ? deriveNoteFromAudioFile(msg.audioFile) : msg.textNote;
            noteEl.textContent = derivedNote || '';
            // remove any existing transcript node
            const existing = document.getElementById('playback-transcript');
            if (existing) existing.remove();
            // transcript button (created in markup) - show if transcript exists
            const transcriptBtn = $('playback-transcript-btn');
            if (transcriptBtn) {
                if (msg.transcript) {
                    transcriptBtn.style.display = 'inline-block';
                    transcriptBtn.textContent = 'Show Transcript';
                } else {
                    transcriptBtn.style.display = 'none';
                }
            }
            if (msg.transcript) {
                const transcriptEl = document.createElement('div');
                transcriptEl.id = 'playback-transcript';
                transcriptEl.style.marginTop = '0.75rem';
                transcriptEl.style.color = 'var(--text-secondary)';
                transcriptEl.style.fontSize = '0.95rem';
                transcriptEl.style.maxHeight = '320px';
                transcriptEl.style.overflowY = 'auto';
                transcriptEl.style.padding = '0.6rem';
                transcriptEl.style.border = '1px solid rgba(255,255,255,0.06)';
                transcriptEl.style.borderRadius = '6px';
                transcriptEl.style.display = 'none'; // hidden until user clicks button
                transcriptEl.innerHTML = `<strong>Transcript:</strong><pre style="white-space: pre-wrap; font-family: inherit; font-size: 0.95rem; margin-top:6px;">${escapeHtml(msg.transcript)}</pre>`;
                const metadata = modal.querySelector('.playback-metadata');
                if (metadata) metadata.parentElement.appendChild(transcriptEl);
                else noteEl.parentElement.appendChild(transcriptEl);

                // wire transcript toggle
                if (transcriptBtn) {
                    transcriptBtn.onclick = (ev) => {
                        ev.stopPropagation();
                        const el = document.getElementById('playback-transcript');
                        if (!el) return;
                        if (el.style.display === 'none' || !el.style.display) {
                            el.style.display = 'block';
                            transcriptBtn.textContent = 'Hide Transcript';
                        } else {
                            el.style.display = 'none';
                            transcriptBtn.textContent = 'Show Transcript';
                        }
                    };
                }
            }
        }

        // update like/fav button UI to reflect persisted state
        try {
            const favs = loadFavs(); const emojis = loadEmojis();
            const fav = !!favs[msg.id]; const emoji = emojis[msg.id];
            const favBtnEl = $('playback-fav-btn');
            const likeBtnEl = $('playback-like-btn');
            if (favBtnEl) favBtnEl.textContent = (fav ? '★ Favorited' : '☆ Favorite');
            if (likeBtnEl) likeBtnEl.textContent = (emoji ? (emoji + ' Like') : '👍 Like');
        } catch (e) {}

        // ensure like/fav listeners are initialized
        try { initLikeAndFavControls(); } catch (e) {}

        // Load audio into player — enforce recordings/ only
        try {
            if (!msg.audioFile || !msg.audioFile.startsWith('recordings/')) {
                alert('Voice Garden only plays audio files from the recordings/ folder.');
                return;
            }
            if (voicePlayer.src && !voicePlayer.src.endsWith(msg.audioFile)) {
                voicePlayer.pause();
            }
        } catch (e) {}
        voicePlayer.src = msg.audioFile;
        voicePlayer.load();
        // reset progress UI
        const fill = $('playback-progress-fill'); if (fill) fill.style.width = '0%';
        $('playback-current-time').textContent = '0:00';
        $('playback-total-duration').textContent = '0:00';
        // Auto-play when modal opens
        voicePlayer.play().then(() => {
            const playBtnEl = $('playback-play-pause-btn'); if (playBtnEl) playBtnEl.textContent = '⏸️';
        }).catch(() => { const playBtnEl = $('playback-play-pause-btn'); if (playBtnEl) playBtnEl.textContent = '▶️'; });

        // Ensure overlay click closes the modal (and make handler removable)
        if (modal._voiceOverlayHandler) modal.removeEventListener('click', modal._voiceOverlayHandler);
        modal._voiceOverlayHandler = (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                modal.style.display = '';
                try { voicePlayer.pause(); } catch (er) {}
                const playBtnEl = $('playback-play-pause-btn'); if (playBtnEl) playBtnEl.textContent = '▶️';
            }
        };
        modal.addEventListener('click', modal._voiceOverlayHandler);
    }

    // Utility: escape HTML for transcript
    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, function (s) {
            return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[s];
        });
    }

    // Utility: derive a friendly note from the audio filename if no textNote provided
    function deriveNoteFromAudioFile(path) {
        if (!path) return '';
        const name = path.split('/').pop().replace(/\.[^/.]+$/, ''); // remove extension
        const pretty = name.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
        return pretty.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }

    // Persistent state helpers (localStorage)
    const VG_FAVS_KEY = 'vg_favs_v1';
    const VG_EMOJIS_KEY = 'vg_emojis_v1';
    function loadFavs() { try { return JSON.parse(localStorage.getItem(VG_FAVS_KEY) || '{}'); } catch(e) { return {}; } }
    function saveFavs(obj) { try { localStorage.setItem(VG_FAVS_KEY, JSON.stringify(obj)); } catch(e) {} }
    function loadEmojis() { try { return JSON.parse(localStorage.getItem(VG_EMOJIS_KEY) || '{}'); } catch(e) { return {}; } }
    function saveEmojis(obj) { try { localStorage.setItem(VG_EMOJIS_KEY, JSON.stringify(obj)); } catch(e) {} }

    // Emoji set for cycling
    const EMOJI_SET = ['👍','❤️','⭐','🔥','🌸','🎵'];

    // Wire up like / favorite buttons to be persistent
    function initLikeAndFavControls() {
        if (initLikeAndFavControls._inited) return;
        initLikeAndFavControls._inited = true;
        const likeBtn = $('playback-like-btn');
        const favBtn = $('playback-fav-btn');
        const deleteBtn = $('playback-delete-btn');
        if (!likeBtn || !favBtn) return;

        likeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!currentMsg) return;
            const emojis = loadEmojis();
            const cur = emojis[currentMsg.id] || null;
            // cycle to next emoji (null -> first)
            const idx = cur ? (EMOJI_SET.indexOf(cur) + 1) % EMOJI_SET.length : 0;
            const next = EMOJI_SET[idx];
            emojis[currentMsg.id] = next;
            saveEmojis(emojis);
            // update UI
            likeBtn.textContent = next + ' Like';
            // update flower badges
            renderFlowers();
        });

        favBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!currentMsg) return;
            const favs = loadFavs();
            const cur = !!favs[currentMsg.id];
            if (cur) delete favs[currentMsg.id]; else favs[currentMsg.id] = true;
            saveFavs(favs);
            favBtn.textContent = (cur ? '☆ Favorite' : '★ Favorited');
            renderFlowers();
        });

        // Delete (keeps persistence clear for that id)
        deleteBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!currentMsg) return;
            // remove persisted state
            const favs = loadFavs(); const emojis = loadEmojis();
            delete favs[currentMsg.id]; delete emojis[currentMsg.id];
            saveFavs(favs); saveEmojis(emojis);
            // remove from voiceMessages array (soft remove)
            const idx = voiceMessages.findIndex(v => v.id === currentMsg.id);
            if (idx >= 0) voiceMessages.splice(idx, 1);
            // close modal
            const modal = $('voice-playback-modal'); if (modal) { modal.classList.remove('active'); modal.style.display = ''; if (modal._voiceOverlayHandler) { modal.removeEventListener('click', modal._voiceOverlayHandler); modal._voiceOverlayHandler = null; } }
            try { voicePlayer.pause(); } catch(e) {}
            renderFlowers(); updateFilterCount();
        });
    }

    // Try to initialize like/fav controls after DOM is attached; called when controls first attached and each time modal opens
    // Note: initVoiceGardenPanelJS._controlsAttached block will call this once

}
// ===================================================================
// END: VOICE GARDEN IMPLEMENTATION
// ===================================================================


const getBookPanelHTML = () => `<div id="book-reader-panel" class="content-panel active"><h2 class="panel-header">The Stardust Tome</h2><p class="panel-subheader">Our complete story, written in the stars.</p><div class="book-actions-sticky"><button class="btn primary" id="add-chapter-btn">✏️ Add New Chapter</button></div><div class="book-layout"><div id="chapter-list-container"></div><div id="chapter-content-container"></div></div></div>`;
const getGalleryPanelHTML = () => `<div id="gallery-panel" class="content-panel active"><h2 class="panel-header">Gallery of Ages</h2><p class="panel-subheader">Our journey through time, captured in precious moments.</p><div class="upload-button-container"><button class="btn primary" id="upload-photo-btn">🖼️ Upload Photo</button><input type="file" id="photo-upload-input" hidden accept="image/*"></div><div id="gallery-filters"></div><hr><div id="gallery-grid"></div><div id="gallery-show-more-container" style="text-align: center; margin-top: 2rem;"></div></div>`;
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
                <div class="game-card"><div class="game-card-header"><span class="card-icon">🌸</span><h2>星辰配對<br>Celestial Star Match</h2><p>Match the sacred symbols of your journey hidden among the stars.</p></div><button class="action-button" data-game="star-match">Enter the Nexus</button><div id="star-match-content" class="game-content"><div class="score-display">Moves: <span id="star-match-moves">0</span> | Matches: <span id="star-match-matches">0/8</span></div><div id="star-match-grid" class="memory-grid"></div></div></div>
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
        <div class="chapter" id="chapter-1"><h1 class="chapter-title floating">💫 The Astral Convergence 💫</h1><div class="chapter-content"><div class="dialogue-container"><div class="dialogue-right"><div class="dialogue-name">ZOYA</div>"My name is Zhang Zoya," she said, breaking the ice.</div><div class="dialogue-left"><div class="dialogue-name">NICHOLAS</div>"I'm Nicholas Lubega, and I love mathematics," he talked back. At that moment, his brain was empty - like space itself.</div></div><p>They began talking to each other intimately, like it wasn't our first time meeting. The Taiku Taikai that Nicholas had thought was going to be just a waste of time turned out to be worth attending as the chicken had laid a golden egg in his pocket.</p><p>They shared the same sentiments. Even though she was not a math person, she told him about the difference between mathematics in Japan and China. Nicholas never thought in his life he would ever meet a girl who listened to him talk about mathematics.</p><div class="mini-game"><h3>🥚 Chicken of Destiny Mini-Game</h3><p>Catch the golden eggs of fate!</p><div class="game-score">Affection Points: <span id="eggScore">0</span></div><button class="game-button" id="playEggGameBtn">Play Game</button></div><p>Time is a monkey that shows you its red butt even when you aren't interested. It just moved so fast, and that day was just a summary in his eyes. After the event, he hesitantly said, "See you again," but my heart had remained with her.</p></div></div>
        <div class="chapter" id="chapter-2"><h1 class="chapter-title floating">🌟 The Constellation of Connection 🌟</h1><div class="chapter-content"><p>For the first time in many years, Nicholas thought of sending a Facebook friend request to someone. He was lying flat on his bed, thinking if it was a good or bad idea.</p><div class="mini-game"><h3>📱 Send or Don't Send Game</h3><p>Should Nicholas send the friend request?</p><div id="friendRequestGame"><button class="game-button" data-action="yes">Send Request</button><button class="game-button" data-action="hesitate">Hesitate More</button></div><p id="requestResult" style="margin-top: 20px; color: #ff6b9d;"></p></div><p>That entire night was filled with "what ifs." Would he seem weird? Would she think of him as a stalker? If he sends a friend request and she accepts it, then what happens next?</p><p>The evening of that day, he went back to the dormitory, sat in his study chair, and continued with his normal reading, and guess what? <strong>Ding!</strong> A friend request message had popped up on his screen from Zoya.</p><p>He never knew with whom I should share the news, because literally speaking, even I never thought I would be so happy just to receive a friend request in this life.</p><p>He quickly responded. Now a big question: should he wait for the message or send one? He recalled the date and time: May 25 at 10:06 p.m., and sent the message "Hi Zoya" with a laughing emoji.</p><p>For as long as I can remember, he waited for a reply while looking at the clock. It soon became 12:00, 1:00, and 2:00 when he was still waiting. Finally, he realized the ding was never going to appear. A feeling of having messed up approached him.</p><p>Early in the morning, shame engulfed him. Later after school, he decided to let it go. As I was lying down scrolling, Ding... a message popped up: "Good night Nico". At the eleventh hour, he felt he was in the seventh heaven.</p></div></div>
        <div class="chapter" id="chapter-3"><h1 class="chapter-title floating">🌸 The Orbit of Affection 🌸</h1><div class="chapter-content"><p>From their birthday messages onwards, Nicholas and Zoya started getting close and more closer to each other without even knowing. "I wish you sweet dreams" messages started being sent without feeling awkward.</p><p>On July 17th, 2021, it was Nicholas's birthday. He had always refused to have his birthday celebrated. But to his surprise, at around 11:35 p.m., a message popped up on his phone screen from Zoya.</p><div class="dialogue-container"><div class="dialogue-right"><div class="dialogue-name">ZOYA'S MESSAGE</div>"Good evening, Nico, I don't know if you can read this message before the end of this day or not, but I hope it won't be too late to say 'happy birthday' to you. And, what's more, I made a sequel of the story..."</div></div><p>Nobody else knew how good his feeling was but him. Just after reading the lines he replied back immediately, hoping the talk could be prolonged a little bit longer.</p><p>They met at Miyakonojo library on July 27th. She had arrived early at 12:00 p.m., and he rushed to meet her. They went to Joyful restaurant, and both ordered the same dish - chicken steak.</p><div class="mini-game"><h3>🍗 Chicken Steak Memory Counter</h3><div class="game-score">Chicken Steaks Shared: <span id="chickenCount">1</span></div><button class="game-button" id="addChickenBtn">Add Another Memory</button></div><p>After getting home, a perfect misunderstanding happened. She thought he passed by her home, which made her ask when he will be coming back. She even requested: "Take some photos in Kyoto, I'd like to see where you will be."</p><p>That very night, he sent her a picture of myself - the first picture he ever sent to her. She even sent her own picture showing her fluffy hair after taking a shower in exchange.</p></div></div>
        <div class="chapter" id="chapter-4"><h1 class="chapter-title floating">💖 The Realm of Revelation 💖</h1><div class="chapter-content"><p>November brought with it a decision Nicholas could no longer postpone. He had spent weeks, months even, wrestling with his feelings. Every logical part of his brain told him to be cautious, but his heart had already decided.</p><div class="overthinking-meter"><div class="meter-fill" style="width: 95%;"></div></div><p style="text-align: center; color: #ff6b9d; margin-top: 10px;"><em>Overthinking Level: Critical</em></p><p>The night before, he barely slept. He rehearsed what I would say a hundred times. When the day arrived, he sent her a message: "Can we meet at the sports field after school? There's something I want to tell you."</p><div class="dialogue-container"><div class="dialogue-left"><div class="dialogue-name">NICHOLAS</div>"Zoya, do you remember the first time we talked? Right here, at this field? Since that day, you've been on my mind constantly. I've realized it's so much more than friendship. Zoya, I've fallen in love with you. Completely, utterly, hopelessly in love with you."</div><div class="dialogue-right"><div class="dialogue-name">ZOYA</div>She smiled. That beautiful, genuine smile. "Nico, I was wondering when you would finally say something."</div><div class="dialogue-right"><div class="dialogue-name">ZOYA</div>"I've been falling for you too. Slowly, surely, unexpectedly. Every conversation, every shared moment. You flew through a typhoon just to be at an event where I would be. How could I not fall in love with you? So yes, Nicholas Lubega. Yes to everything."</div></div><div class="mini-game"><h3>💕 Heart Frequency Sync</h3><p>Click in rhythm with the heartbeat!</p><div class="game-score">Synchronization: <span id="heartSync">0</span>%</div><button class="game-button" id="heartButton">💓 Click</button></div><p>They stood there on that sports field, where it all began, holding hands and smiling at each other like they were the only two people in the world. The autumn sun was setting, painting the sky in beautiful shades of pink and orange.</p><p>"So," he said with a nervous laugh, "what do we do now?"</p><p>She squeezed his hand. "Now? We figure it out together. One step at a time."</p></div></div>
        <div class="chapter" id="chapter-5"><h1 class="chapter-title floating">♾️ The Infinite Cosmos ♾️</h1><div class="chapter-content"><p>The months that followed were the happiest of their lives. Having each other felt like a dream they never wanted to wake up from. They took things slow, learning how to be in a relationship while still maintaining their studies and friendships.</p><p>Their dates were simple but meaningful. Library study sessions that would end with coffee and talking for hours. Walks around campus, holding hands and enjoying the changing seasons. Weekend visits to her home, where her father would always insist on cooking for them.</p><div class="stats-dashboard"><div class="stat-card"><div class="stat-label">Days Since Meeting</div><div class="stat-number" id="daysSinceMeeting">Loading...</div></div><div class="stat-card"><div class="stat-label">Days Since Confession</div><div class="stat-number" id="daysSinceConfession">Loading...</div></div><div class="stat-card"><div class="stat-label">Chicken Steaks Shared</div><div class="stat-number">∞</div></div><div class="stat-card"><div class="stat-label">Overthinking Episodes</div><div class="stat-number">473</div></div><div class="stat-card"><div class="stat-label">Messages Exchanged</div><div class="stat-number">12,847</div></div><div class="stat-card"><div class="stat-label">Stars Witnessing</div><div class="stat-number" id="starCounter">1,000,000</div></div></div><p>Nicholas, the boy who hid behind mathematics books, learned to open his heart. Zoya, the girl who felt alone in a new school, found someone who understood her completely. Together, they built something beautiful.</p><p>This is their love story. Not perfect, but perfectly ours. And they're still writing it, one day at a time, one memory at a time, one "I love you" at a time.</p><p style="text-align: center; font-size: 28px; color: #ff6b9d; margin: 50px 0;">From the sports field where we met, to the library where we studied, to the bicycle that brought us together, to the typhoon that couldn't keep us apart, to the confessions under the autumn sky - every moment has been a page in our book.</p><p style="text-align: center; font-size: 24px; color: #c06bff; margin: 30px 0;">And the best part? There are so many pages left to write.</p><div style="text-align: center; margin: 60px 0; font-size: 32px; color: #fff;"><p>With all our love,</p><p style="background: linear-gradient(45deg, #ff6b9d, #c06bff); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; font-size: 48px; font-weight: bold; margin: 20px 0;">Nini & Zoya</p><p style="font-size: 18px; font-style: italic; color: #c8b8db; margin-top: 30px;">P.S. He still talks about mathematics, and she still listens with genuine interest. Some things never change, and they wouldn't want them to.</p></div><div class="mini-game" style="margin-top: 80px;"><h3>✨ Find the Hidden Star ✨</h3><p>Click around the screen to find the secret star and unlock a special message...</p><div id="secretMessage" style="display: none; margin-top: 20px; padding: 20px; background: rgba(255, 107, 157, 0.2); border-radius: 15px;"><p style="color: #ff6b9d; font-style: italic;">"In a universe of infinite possibilities, our souls found each other. That's not coincidence - that's destiny."</p></div></div></div></div>
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
    <p class="panel-subheader">Navigate the cosmic architecture of our shared universe. Each star, each connection, tells a story written in the language of the cosmos.</p>
    
    <div class="holodeck-interface">
        <div class="holodeck-tabs">
            <button class="holo-tab active" data-tab="constellation">⭐ Our Constellation</button>
            <button class="holo-tab" data-tab="physics">⚛️ Relational Physics</button>
            <button class="holo-tab" data-tab="anatomy">🫀 Anatomy of Us</button>
            <button class="holo-tab" data-tab="artifacts">📿 Sacred Artifacts</button>
            <button class="holo-tab" data-tab="lexicon">📖 Our Language</button>
            <button class="holo-tab" data-tab="timeline-viz">🌌 Time Weaver</button>
        </div>
        
        <div class="holodeck-content">
            <div class="holo-pane active" id="tab-constellation">
                <h3>The Constellation of Our Love</h3>
                <p style="text-align: center; color: var(--text-secondary); font-style: italic; margin-bottom: 2rem;">
                    Click any star to reveal the memory it holds. Watch how our moments connect across time and space.
                </p>
                
                <div class="constellation-map-container">
                    <canvas id="constellation-canvas"></canvas>
                    <div id="constellation-legend">
                        <div class="legend-item">
                            <span class="legend-dot" style="background: #FFD700;"></span>
                            <span>First Encounters</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-dot" style="background: #FF69B4;"></span>
                            <span>Romantic Moments</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-dot" style="background: #87CEEB;"></span>
                            <span>Shared Dreams</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-dot" style="background: #98FB98;"></span>
                            <span>Daily Magic</span>
                        </div>
                    </div>
                </div>
                
                <div id="constellation-memory-display" class="memory-display-card">
                    <div class="memory-icon">✨</div>
                    <h4 id="memory-title">Select a star to begin your journey</h4>
                    <p id="memory-description">Each point of light holds a precious moment from our story...</p>
                    <div id="memory-date"></div>
                </div>
            </div>
            
            <div class="holo-pane" id="tab-physics">
                <div class="love-calculator-container">
                    <h3 class="calc-title">MATHEMATICAL LOVE CALCULATOR 📐💕</h3>
                    <p class="calc-subtitle">"Proving our love through mathematics" - By Nic, the mathematician who fell in love with more than just numbers.</p>

                    <div class="calc-section">
                        <h4 class="calc-sub-header">THE GRAND UNIFIED THEORY OF US</h4>
                        <div class="calc-formula-box">
                            <div class="calc-formula">
                                L<sub>∞</sub> = <frac><span class="numerator">(N ⊗ Z)<sup>∞</sup></span><span class="denominator">d<sup>0</sup></span></frac> × Σ(moments) × e<sup>time</sup>
                            </div>
                            <ul class="calc-formula-vars">
                                <li>L∞ = Infinite Love (our constant)</li>
                                <li>N = Nicholas (mathematician)</li>
                                <li>Z = Zoya (the artist)</li>
                                <li>⊗ = Tensor product (deep connection)</li>
                                <li>d = Distance (approaches 0)</li>
                                <li>Σ(moments) = Sum of shared memories</li>
                                <li>e^(time) = Exponential growth</li>
                            </ul>
                            <hr class="calc-divider">
                            <div class="calc-result">Current Value: L∞ = ∞ (As predicted by the equation)</div>
                        </div>
                        <div class="calc-nav">
                            Navigate: <a href="#comp-analysis">Compatibility</a> | <a href="#love-timeline">Timeline</a> | <a href="#love-theorems">Theorems</a> | <a href="#love-probability">Probability</a>
                        </div>
                    </div>

                    <div id="comp-analysis" class="calc-section">
                        <h4 class="calc-sub-header">🎯 Comprehensive Compatibility Analysis</h4>
                        <div class="calc-compatibility-score">
                            <div class="score">98.7%</div>
                            <div>COSMICALLY DESTINED</div>
                        </div>
                        <p style="text-align:center; font-style:italic;">"Statistically impossible to find a better match. Trust the math."</p>
                        <hr class="calc-divider">
                        <pre>
BREAKDOWN BY CATEGORY:

1. EMOTIONAL RESONANCE                
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ 98.3%          
Based on: Mood sync rate, voice message sentiment, time capsule tone
Calculation: ER = (Σ mood_matches / total_days) × sentiment_analysis_score
             ER = (267/365) × 1.34 = 98.3%

─────────────────────────────────

2. INTELLECTUAL COMPATIBILITY         
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░ 92.7%          
Based on: Conversation depth, shared interests, learning together
Factors:
• Different strengths that complement 
• Nic teaches math, Zoya teaches art  
• Both curious learners               
• Recipe creation collaboration       

─────────────────────────────────

3. COMMUNICATION EFFICIENCY           
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 99.1%          
Based on: Response times, message frequency, voice garden activity
Average Response Time: 14.3 minutes   
Message Balance: 51% Nic / 49% Zoya   
Perfectly balanced communication! ✓   

─────────────────────────────────

4. ADVENTURE COMPATIBILITY            
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░ 87.4%          
Based on: Travel memories, world map heat signatures, spontaneity score
Shared Adventures: 23 locations       
Spontaneous Dates: 67% of outings     
Bucket List Overlap: 78%              

─────────────────────────────────

5. CULINARY HARMONY                   
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%           
Based on: Recipe ratings, cooking together frequency, food preferences
Nic's Avg Rating: 4.8/5 stars         
Times "Life or Death": 12             
Dishes Cooked Together: 47            
Food Fights: 0 (surprisingly!)        

─────────────────────────────────

6. DESTINY QUOTIENT                   
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%           
Based on: Probability analysis, multiverse constant, fate algorithms
Probability of meeting: 0.000047%     
Probability of connecting: 0.12%      
Probability of falling in love: ???   

Yet here we are. Mathematics proves some things transcend probability.
DQ = lim (fate → ∞) P(us) = 1.0 (100%) - It was meant to be.
                        </pre>
                    </div>

                    <div id="love-timeline" class="calc-section">
                        <h4 class="calc-sub-header">📈 Relationship Trajectory Analysis</h4>
                        <pre>
Love │                                  
  ∞ │                        ╱──────    
    │                     ╱─╱           
    │                  ╱─╱              
 100│               ╱─╱                 
    │            ╱─╱                    
    │         ╱─╱                       
  50│      ╱─╱        *Confession       
    │   ╱─╱          (Aug 25, 2021)     
    │╱─╱                                
   0│───────────────────────────────>   
    2019  2020  2021  2022  2023  2024  
    Sep   Jan   Aug   Aug   Now   Future

KEY MOMENTS PLOTTED:                  
○ First Meeting (Sep 15, 2019)        
○ Friend Request (May 25, 2021)       
○ First Date (Jul 27, 2021)           
● Confession (Aug 25, 2021) ⚡ SPIKE  
○ First Anniversary (Aug 25, 2022)    
○ Today (Jan 15, 2025)                

GROWTH RATE ANALYSIS:                 
• Phase 1 (2019-2021): Exponential    
  Growth rate: dL/dt = 2.3 units/mo   
• Phase 2 (2021-2023): Rapid Rise     
  Growth rate: dL/dt = 5.7 units/mo   
• Phase 3 (2023-Now): Stable Infinity 
  Growth rate: dL/dt → ∞              

PREDICTION MODEL:                     
Based on current trajectory, your love will continue to approach infinity asymptotically.
Mathematical proof that love has no upper bound when it's real. ✓
                        </pre>
                    </div>

                    <div id="love-theorems" class="calc-section">
                        <h4 class="calc-sub-header">📜 Proven Mathematical Theorems of Love</h4>
                        <pre>
THEOREM 1: The Bicycle Axiom
Statement: If Person A fixes Person B's bicycle, the probability of falling in love increases by a factor of e^π.
Proof: Given the events of June 2021, the subsequent confession occurred 71 days later.
P(love | bicycle_fixed) / P(love | no_bicycle) = 0.94 / 0.04 ≈ 23.5 ≈ e^π. Q.E.D. ✓

─────────────────────────────────

THEOREM 2: The Chicken Steak Constant
Statement: There exists a universal constant K ≈ 47.3 joy_units per steak, where K = happiness_increase / chicken_steak_consumed.
Empirical evidence shows the constant holds across all measurements. Q.E.D. ✓

─────────────────────────────────

THEOREM 3: Typhoon Determination Law
Statement: The force of love (F_love) is greater than any natural disaster force (F_typhoon) when properly motivated.
Case Study (Aug 10, 2021): F_love was unmeasurable (∞) while F_typhoon was finite. Nic flew successfully. Q.E.D. ✓

─────────────────────────────────

THEOREM 4: The Overthinking Paradox
Statement: The amount of overthinking (O) is inversely proportional to confidence (C), but directly proportional to how much you care (H). O = H / C.
Corollary: High overthinking is not a bug, it's a feature indicating deep care. Q.E.D. ✓

─────────────────────────────────

THEOREM 5: Voice Message Garden Law
Statement: Emotional closeness (E) correlates with the number of voice messages (V) by E = log(V) × authenticity_factor.
The more we communicate, the closer we become. The scale has no limit. Q.E.D. ✓
                        </pre>
                    </div>

                    <div id="love-probability" class="calc-section">
                        <h4 class="calc-sub-header">🎲 What Are The Odds?</h4>
                        <pre>
SCENARIO 1: Meeting Each Other
P(meeting) = 0.0000057% or 1 in 17,543,860. Yet it happened. Destiny > Math. ✓

─────────────────────────────────

SCENARIO 2: Both Being Single
P(both_ready) = 3.0%. A 97% chance we'd have missed each other. But we didn't. ✓

─────────────────────────────────

SCENARIO 3: Language Barrier
Traditional probability: 23%. Actual outcome: Connected deeply.
Conclusion: Love translates all languages. Probability irrelevant. ✓

─────────────────────────────────

SCENARIO 4: The Friend Request
Without Zoya making the first move, there was only a 16.9% chance of connection.
Conclusion: Sometimes the bravest person wins. ✓

─────────────────────────────────

MASTER PROBABILITY:
P(us existing exactly as we do) = 0.0000000047% or 1 in 21,276,595,745.

Twenty-one BILLION to one odds.

♥️ Some things transcend probability.
                        </pre>
                    </div>

                </div>
            </div>
            
            <div class="holo-pane" id="tab-anatomy">
                <h3>The Anatomy of Our Connection</h3>
                <p style="text-align: center; color: var(--text-secondary); margin-bottom: 2rem;">
                    A deeper look at what makes us, us. Every part plays a role in our cosmic dance.
                </p>
                
                <div class="anatomy-visualization">
                    <div class="anatomy-profiles">
                        <div class="anatomy-profile" data-person="nic">
                            <div class="profile-avatar">
                                <div class="avatar-circle">
                                    <span class="avatar-initial">N</span>
                                </div>
                                <div class="avatar-glow"></div>
                            </div>
                            <h4>Nicholas</h4>
                            <p class="profile-subtitle">The Mathematician's Heart</p>
                            
                            <div class="anatomy-points-list">
                                <div class="anatomy-point-enhanced" data-desc="A mind that finds beauty in equations and patterns, now learning to see beauty in the unpredictable magic of love.">
                                    <span class="point-icon">🧠</span>
                                    <span class="point-label">Analytical Mind</span>
                                </div>
                                <div class="anatomy-point-enhanced" data-desc="Once guarded and careful, now open and vulnerable. A heart that beats in rhythm with yours.">
                                    <span class="point-icon">❤️</span>
                                    <span class="point-label">Devoted Heart</span>
                                </div>
                                <div class="anatomy-point-enhanced" data-desc="Hands that can solve complex problems and fix bicycles, but most importantly, hold yours with infinite gentleness.">
                                    <span class="point-icon">🤲</span>
                                    <span class="point-label">Steady Hands</span>
                                </div>
                                <div class="anatomy-point-enhanced" data-desc="The deep, husky voice that first caught your attention - now speaks only words of love and understanding.">
                                    <span class="point-icon">🗣️</span>
                                    <span class="point-label">Resonant Voice</span>
                                </div>
                                <div class="anatomy-point-enhanced" data-desc="A spirit that traveled far from home and found its true home in you.">
                                    <span class="point-icon">✨</span>
                                    <span class="point-label">Wandering Soul</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="connection-bridge">
                            <div class="bridge-line"></div>
                            <div class="bridge-heart">💕</div>
                            <div class="bridge-particles">
                                <span>✨</span><span>💫</span><span>⭐</span>
                            </div>
                        </div>
                        
                        <div class="anatomy-profile" data-person="zoya">
                            <div class="profile-avatar">
                                <div class="avatar-circle">
                                    <span class="avatar-initial">Z</span>
                                </div>
                                <div class="avatar-glow"></div>
                            </div>
                            <h4>Zoya</h4>
                            <p class="profile-subtitle">The Artist's Grace</p>
                            
                            <div class="anatomy-points-list">
                                <div class="anatomy-point-enhanced" data-desc="A creative mind that sees the world as a canvas of possibilities, painting our story with every moment.">
                                    <span class="point-icon">🎨</span>
                                    <span class="point-label">Creative Vision</span>
                                </div>
                                <div class="anatomy-point-enhanced" data-desc="A heart that is a quiet harbor - offering peace, understanding, and unconditional love in life's storms.">
                                    <span class="point-icon">💖</span>
                                    <span class="point-label">Compassionate Heart</span>
                                </div>
                                <div class="anatomy-point-enhanced" data-desc="Hands that create beautiful art and write the chapters of our story with grace and intention.">
                                    <span class="point-icon">✍️</span>
                                    <span class="point-label">Gentle Hands</span>
                                </div>
                                <div class="anatomy-point-enhanced" data-desc="Eyes like windows to heaven - oval and bright, showing kindness that saw through my shyness to the real me.">
                                    <span class="point-icon">👁️</span>
                                    <span class="point-label">Perceptive Eyes</span>
                                </div>
                                <div class="anatomy-point-enhanced" data-desc="A spirit that bridges cultures and languages, making every place feel like home.">
                                    <span class="point-icon">🌸</span>
                                    <span class="point-label">Bridging Spirit</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="compatibility-meter">
                    <h4>Cosmic Compatibility Analysis</h4>
                    <div class="compatibility-bars">
                        <div class="compatibility-bar-item">
                            <span class="bar-label">Emotional Resonance</span>
                            <div class="bar-track">
                                <div class="bar-fill" style="width: 98%;" data-value="98%"></div>
                            </div>
                        </div>
                        <div class="compatibility-bar-item">
                            <span class="bar-label">Intellectual Sync</span>
                            <div class="bar-track">
                                <div class="bar-fill" style="width: 95%;" data-value="95%"></div>
                            </div>
                        </div>
                        <div class="compatibility-bar-item">
                            <span class="bar-label">Spiritual Alignment</span>
                            <div class="bar-track">
                                <div class="bar-fill" style="width: 99%;" data-value="99%"></div>
                            </div>
                        </div>
                        <div class="compatibility-bar-item">
                            <span class="bar-label">Adventure Compatibility</span>
                            <div class="bar-track">
                                <div class="bar-fill" style="width: 92%;" data-value="92%"></div>
                            </div>
                        </div>
                        <div class="compatibility-bar-item">
                            <span class="bar-label">Destiny Quotient</span>
                            <div class="bar-track">
                                <div class="bar-fill" style="width: 100%;" data-value="100%"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="anatomy-tooltip-enhanced"></div>
            </div>
            
            <div class="holo-pane" id="tab-artifacts">
                <h3>Sacred Artifacts of Our Journey</h3>
                <p style="text-align: center; color: var(--text-secondary); margin-bottom: 2rem;">
                    Objects that have gained celestial significance through the moments we've shared.
                </p>
                
                <div class="artifacts-showcase">
                    <div class="artifact-card" data-title="The Mathematics Book" data-story="A shield against loneliness that became a conversation starter. The book I held on September 15, 2019, unknowingly waiting for you to approach and change everything." data-icon="📖">
                        <div class="artifact-icon">📖</div>
                        <div class="artifact-name">The Mathematics Book</div>
                        <div class="artifact-rarity">★★★★★ Legendary</div>
                    </div>
                    
                    <div class="artifact-card" data-title="The Broken Bicycle" data-story="Your bicycle that broke in June 2021, giving me the chance to show I cared through action. The first of many times I'd try to fix what was broken in your world." data-icon="🚲">
                        <div class="artifact-icon">🚲</div>
                        <div class="artifact-name">The Broken Bicycle</div>
                        <div class="artifact-rarity">★★★★★ Legendary</div>
                    </div>
                    
                    <div class="artifact-card" data-title="The Dancing Drawing" data-story="Two people dancing - my first art class creation in January 2020. A prophecy drawn in pencil before we knew what we'd become." data-icon="🎨">
                        <div class="artifact-icon">🎨</div>
                        <div class="artifact-name">The Dancing Drawing</div>
                        <div class="artifact-rarity">★★★★☆ Epic</div>
                    </div>
                    
                    <div class="artifact-card" data-title="The Joyful Chicken Steak" data-story="Our first meal together on July 27, 2021. Simple food that tasted like possibility. Now our tradition, our taste of beginnings." data-icon="🍗">
                        <div class="artifact-icon">🍗</div>
                        <div class="artifact-name">Joyful Chicken Steak</div>
                        <div class="artifact-rarity">★★★★★ Legendary</div>
                    </div>
                    
                    <div class="artifact-card" data-title="The Typhoon Flight" data-story="August 10, 2021 - when nature itself couldn't stop me from reaching you. A journey through storms that proved the strength of my feelings." data-icon="✈️">
                        <div class="artifact-icon">✈️</div>
                        <div class="artifact-name">The Typhoon Flight</div>
                        <div class="artifact-rarity">★★★★★ Legendary</div>
                    </div>
                    
                    <div class="artifact-card" data-title="The First Photo" data-story="The night of July, 2021, when I sent you my first picture. Digital pixels that carried vulnerability and hope across the night." data-icon="📸">
                        <div class="artifact-icon">📸</div>
                        <div class="artifact-name">The First Photo</div>
                        <div class="artifact-rarity">★★★★☆ Epic</div>
                    </div>
                    
                    <div class="artifact-card" data-title="The Sports Field" data-story="Where it all began. Sacred ground where two lonely souls found each other during the Taiku Taikai. Our genesis point." data-icon="⚽">
                        <div class="artifact-icon">⚽</div>
                        <div class="artifact-name">The Sports Field</div>
                        <div class="artifact-rarity">★★★★★ Mythic</div>
                    </div>
                    
                    <div class="artifact-card" data-title="The Birthday Poem" data-story="Your message at 11:35pm on July 17, 2021. Sweet words that made me realize I was remembered, cherished, seen." data-icon="💌">
                        <div class="artifact-icon">💌</div>
                        <div class="artifact-name">The Birthday Poem</div>
                        <div class="artifact-rarity">★★★★☆ Epic</div>
                    </div>
                </div>
                
                <div id="artifact-modal" class="artifact-detail-modal">
                    <div class="artifact-modal-content">
                        <span class="artifact-modal-close">&times;</span>
                        <div class="artifact-modal-icon" id="modal-artifact-icon">📖</div>
                        <h3 id="modal-artifact-title">Artifact Name</h3>
                        <div class="artifact-modal-story" id="modal-artifact-story">Story goes here...</div>
                        <div class="artifact-acquisition">
                            <span class="acquisition-label">Acquired:</span>
                            <span class="acquisition-date" id="modal-artifact-date">2019 - 2021</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="holo-pane" id="tab-lexicon">
                <h3>Our Shared Language</h3>
                <p style="text-align: center; color: var(--text-secondary); margin-bottom: 2rem;">
                    Every relationship creates its own dialect - words and phrases that carry meaning only we understand.
                </p>
                
                <div class="lexicon-search">
                    <input type="text" id="lexicon-search-input" class="text-input" placeholder="🔍 Search our dictionary...">
                </div>
                
                <div class="lexicon-categories">
                    <button class="lexicon-cat-btn active" data-category="all">All Terms</button>
                    <button class="lexicon-cat-btn" data-category="food">Food & Treats</button>
                    <button class="lexicon-cat-btn" data-category="activities">Activities</button>
                    <button class="lexicon-cat-btn" data-category="emotions">Emotions</button>
                    <button class="lexicon-cat-btn" data-category="places">Places</button>
                </div>
                
                <dl class="lexicon-list-enhanced" id="lexicon-entries">
                    <div class="lexicon-entry" data-category="activities">
                        <dt>Night walk</dt>
                        <dd>A small, spontaneous adventure, usually involving snacks and discovery. Examples: Exploring a random street, going to コンビニー.</dd>
                        <div class="lexicon-usage">"Wanna go for a walk?"</div>
                    </div>
                    
                    <div class="lexicon-entry" data-category="emotions">
                        <dt>Hug</dt>
                        <dd>The highest form of cozy comfort, requiring maximum fluffiness and zero movement for extended periods(octopus Nic). Saying no to a hug is a federal offense.</dd>
                        <div class="lexicon-usage">"I wanna hug you."</div>
                    </div>
                    
                    <div class="lexicon-entry" data-category="food">
                        <dt>Life or death</dt>
                        <dd>A sudden, non-negotiable, and urgent need for a Tomato ramen. Must be addressed immediately or mood will deteriorate rapidly.</dd>
                        <div class="lexicon-usage">"Code red: Life or death! 🚨"</div>
                    </div>
                    
                    <div class="lexicon-entry" data-category="emotions">
                        <dt>Silly Goose Time</dt>
                        <dd>An official period dedicated to being completely ridiculous together. All dignity suspended. Maximum goofiness encouraged.</dd>
                        <div class="lexicon-usage">"What if someone comes and see's you like this!"</div>
                    </div>
                    
                    <div class="lexicon-entry" data-category="food">
                        <dt>Chicken Steak Moment</dt>
                        <dd>A callback to our first date. Any situation where something simple becomes unexpectedly perfect and meaningful.</dd>
                        <div class="lexicon-usage">"It was all i could eat."</div>
                    </div>
                    
                    <div class="lexicon-entry" data-category="emotions">
                        <dt>Sports Field Feeling</dt>
                        <dd>That nervous excitement mixed with fate and possibility. The feeling of standing at the edge of something life-changing.</dd>
                        <div class="lexicon-usage">"I've got that sports field feeling about this..."</div>
                    </div>
                    
                    <div class="lexicon-entry" data-category="places">
                        <dt>The Library Mode</dt>
                        <dd>Quality time spent in comfortable silence, each doing our own thing but together.</dd>
                        <div class="lexicon-usage">"Jokeeee, did we even ever studied?"</div>
                    </div>
                    
                    <div class="lexicon-entry" data-category="emotions">
                        <dt>Typhoon Level Determination</dt>
                        <dd>Extreme commitment to a goal despite obstacles. From that August day when weather couldn't stop the journey.</dd>
                        <div class="lexicon-usage">"I have typhoon level determination to finish this!"</div>
                    </div>
                    
                    <div class="lexicon-entry" data-category="activities">
                        <dt>Bicycle Fixing</dt>
                        <dd>A metaphor for solving any problem for your partner. Not just physical repairs but emotional support and care.</dd>
                        <div class="lexicon-usage">"Need me to bicycle fix this situation?"</div>
                    </div>
                    
                    <div class="lexicon-entry" data-category="emotions">
                        <dt>Baobei</dt>
                        <dd>Chinese term of endearment meaning "precious treasure" or "baby". The sweetest way to say "you mean everything."</dd>
                        <div class="lexicon-usage">"Good morning, baobei ❤️"</div>
                    </div>
                </dl>
            </div>
            
            <div class="holo-pane" id="tab-timeline-viz">
                <h3>The Time Weaver</h3>
                <p style="text-align: center; color: var(--text-secondary); margin-bottom: 2rem;">
                    A living visualization of our journey through time. Watch our story unfold like a cosmic tapestry.
                </p>
                
                <div class="time-weaver-container">
                    <div class="timeline-spiral">
                        <svg id="spiral-svg" viewBox="0 0 800 800">
                            </svg>
                    </div>
                    
                    <div class="timeline-controls-panel">
                        <h4>Journey Controls</h4>
                        <button class="btn" id="animate-timeline">▶️ Play Our Story</button>
                        <button class="btn" id="reset-timeline">🔄 Reset</button>
                        <div class="timeline-speed-control">
                            <label>Animation Speed:</label>
                            <input type="range" id="timeline-speed" min="1" max="10" value="5">
                        </div>
                    </div>
                    
                    <div class="timeline-event-details" id="timeline-detail-card">
                        <h4>Select a moment on the spiral</h4>
                        <p>Our story begins at the center and spirals outward through time...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

function initGuidePanelJS() {
    const tabs = $$('#guide-panel .holo-tab');
    const panes = $$('#guide-panel .holo-pane');
    
    if (window.physicsAnimationId) cancelAnimationFrame(window.physicsAnimationId);
    if (window.constellationAnimationId) cancelAnimationFrame(window.constellationAnimationId);

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (window.physicsAnimationId) cancelAnimationFrame(window.physicsAnimationId);
            if (window.constellationAnimationId) cancelAnimationFrame(window.constellationAnimationId);
            
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const targetPane = $(`tab-${tab.dataset.tab}`);
            if (targetPane) {
                targetPane.classList.add('active');
                
                if (tab.dataset.tab === 'constellation') initConstellationMap();
                if (tab.dataset.tab === 'physics') initPhysicsSimulator();
                if (tab.dataset.tab === 'timeline-viz') initTimeWeaver();
            }
        });
    });
    
    initConstellationMap();
    initAnatomyEnhanced();
    initArtifactsEnhanced();
    initLexiconEnhanced();
}

function initConstellationMap() {
    const canvas = $('constellation-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    
    let scale = window.devicePixelRatio || 1;
    canvas.width = container.offsetWidth * scale;
    canvas.height = 500 * scale;
    canvas.style.width = container.offsetWidth + 'px';
    canvas.style.height = '500px';
    ctx.scale(scale, scale);

    const memories = [
        { x: 100, y: 250, title: "First Meeting", desc: "Sports field, September 2019. You approached me while I held my math book.", date: "Sep 15, 2019", color: "#FFD700", size: 8 },
        { x: 200, y: 200, title: "First Conversation", desc: "We talked like old friends, mathematics and dreams intertwining.", date: "Sep 15, 2019", color: "#FFD700", size: 6 },
        { x: 300, y: 230, title: "Friend Request", desc: "You sent it first. My heart soared at 10:06 PM.", date: "May 25, 2021", color: "#FF69B4", size: 7 },
        { x: 250, y: 330, title: "The Bicycle", desc: "I fixed your bicycle and found my purpose - taking care of you.", date: "Jun 2021", color: "#98FB98", size: 6 },
        { x: 400, y: 170, title: "Birthday Message", desc: "Your sweet poem at 11:35 PM made me feel remembered.", date: "Jul 17, 2021", color: "#FF69B4", size: 7 },
        { x: 500, y: 250, title: "Library Date", desc: "Our first intentional meeting. Chicken steak and new beginnings.", date: "Jul 27, 2021", color: "#FFD700", size: 8 },
        { x: 450, y: 350, title: "First Photo", desc: "I sent you my picture. Vulnerability shared across digital space.", date: "Jul, 2021", color: "#87CEEB", size: 6 },
        { x: 600, y: 200, title: "Typhoon Journey", desc: "I flew through a storm to be where you were.", date: "Aug 10, 2021", color: "#FFD700", size: 9 },
        { x: 700, y: 270, title: "The Confession", desc: "Hahahahaha, I am laughing as I write this. You know what I am talking about (I think I have the same feeling Nicho). Anyway, that's one story so vivid in my head, just let me know any time you wanna hear it again.", date: "August 25th, 2021", color: "#FF69B4", size: 10 },
        { x: 650, y: 370, title: "Two lost sheet", desc: "Now what's next after confession......I dont know if its normal but ours was followed by a series of restaurants.(10kg in one month!!!!) .", date: "Nov 2021", color: "#FF69B4", size: 10 },
        { x: 800, y: 230, title: "First Anniversary", desc: "One year of us. Countless moments of magic.", date: "Aug 25, 2022", color: "#FFD700", size: 8 },
        { x: 850, y: 300, title: "Today & Forever", desc: "Every moment since, every moment to come.", date: "Present", color: "#87CEEB", size: 12 }
    ];

    let mouse = { x: undefined, y: undefined };
    let selectedStar = null;

    function draw() {
        ctx.clearRect(0, 0, canvas.width / scale, canvas.height / scale);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < memories.length; i++) {
            for (let j = i + 1; j < memories.length; j++) {
                const dist = Math.hypot(memories[i].x - memories[j].x, memories[i].y - memories[j].y);
                if (dist < 200) {
                    ctx.moveTo(memories[i].x, memories[i].y);
                    ctx.lineTo(memories[j].x, memories[j].y);
                }
            }
        }
        ctx.stroke();

        memories.forEach((star, index) => {
            const dist = Math.hypot(mouse.x - star.x, mouse.y - star.y);
            const isHovered = dist < star.size + 5;
            const isSelected = selectedStar === index;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.globalAlpha = isHovered || isSelected ? 1 : 0.7;
            ctx.fill();
            if (isHovered || isSelected) {
                ctx.strokeStyle = star.color;
                ctx.lineWidth = 2;
                ctx.globalAlpha = 0.5;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size + 5 + Math.sin(Date.now() / 200) * 2, 0, Math.PI * 2);
                ctx.stroke();
            }
        });
        ctx.globalAlpha = 1;
    }

    function animate() {
        draw();
        window.constellationAnimationId = requestAnimationFrame(animate);
    }
    animate();

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = (e.clientX - rect.left);
        mouse.y = (e.clientY - rect.top);
    });

    canvas.addEventListener('click', () => {
        let starClicked = false;
        memories.forEach((star, index) => {
            const dist = Math.hypot(mouse.x - star.x, mouse.y - star.y);
            if (dist < star.size + 5) {
                selectedStar = index;
                const memory = memories[index];
                $('memory-title').textContent = memory.title;
                $('memory-description').textContent = memory.desc;
                $('memory-date').textContent = `Date: ${memory.date}`;
                const displayCard = $('constellation-memory-display');
                displayCard.style.borderColor = memory.color;
                displayCard.querySelector('.memory-icon').style.color = memory.color;
                starClicked = true;
            }
        });
        if (!starClicked) {
            selectedStar = null;
        }
    });
}

function initPhysicsSimulator() {
    const canvas = $('gravity-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;
    let gravityEnabled = true;
    let nic, zoya;
    class Particle {
        constructor(x, y, radius, color, name) {
            this.x = x; this.y = y; this.radius = radius; this.color = color; this.name = name;
            this.vx = (Math.random() - 0.5) * 4;
            this.vy = (Math.random() - 0.5) * 4;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText(this.name, this.x, this.y + this.radius + 12);
        }
        update() {
            if (gravityEnabled) {
                const dx = canvas.width / 2 - this.x;
                const dy = canvas.height / 2 - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const force = 50 / (dist * dist);
                this.vx += force * (dx / dist);
                this.vy += force * (dy / dist);
            }
            this.x += this.vx;
            this.y += this.vy;
            this.vx *= 0.99;
            this.vy *= 0.99;
            if (this.x < this.radius || this.x > canvas.width - this.radius) this.vx *= -1;
            if (this.y < this.radius || this.y > canvas.height - this.radius) this.vy *= -1;
        }
    }
    function reset() {
        nic = new Particle(100, 200, 10, '#3498db', 'Nic');
        zoya = new Particle(500, 200, 10, '#f779dd', 'Zoya');
    }
    function animatePhysics() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
        ctx.fill();
        nic.update();
        zoya.update();
        nic.draw();
        zoya.draw();
        window.physicsAnimationId = requestAnimationFrame(animatePhysics);
    }
    reset();
    animatePhysics();
    $('reset-gravity').addEventListener('click', reset);
    $('toggle-gravity').addEventListener('click', () => {
        gravityEnabled = !gravityEnabled;
        $('toggle-gravity').textContent = gravityEnabled ? 'Toggle Gravity Off' : 'Toggle Gravity On';
    });
}

function initAnatomyEnhanced() {
    const points = $$('.anatomy-point-enhanced');
    const tooltip = $('anatomy-tooltip-enhanced');
    points.forEach(point => {
        point.addEventListener('mouseover', (e) => {
            const target = e.currentTarget;
            tooltip.textContent = target.dataset.desc;
            tooltip.style.display = 'block';
        });
        point.addEventListener('mousemove', (e) => {
            const mainContentRect = DOM.mainContent.getBoundingClientRect();
            tooltip.style.left = `${e.clientX - mainContentRect.left + 20}px`;
            tooltip.style.top = `${e.clientY - mainContentRect.top + 20}px`;
        });
        point.addEventListener('mouseout', () => {
            tooltip.style.display = 'none';
        });
    });
}

function initArtifactsEnhanced() {
    const cards = $$('.artifact-card');
    const modal = $('artifact-modal');
    const closeBtn = modal.querySelector('.artifact-modal-close');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            $('modal-artifact-icon').textContent = card.dataset.icon;
            $('modal-artifact-title').textContent = card.dataset.title;
            $('modal-artifact-story').textContent = card.dataset.story;
            modal.classList.add('active');
        });
    });
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function initLexiconEnhanced() {
    const searchInput = $('lexicon-search-input');
    const catBtns = $$('.lexicon-cat-btn');
    const entries = $$('.lexicon-entry');
    function filterEntries() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategory = document.querySelector('.lexicon-cat-btn.active').dataset.category;
        entries.forEach(entry => {
            const textContent = entry.textContent.toLowerCase();
            const category = entry.dataset.category;
            const matchesSearch = textContent.includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || category === activeCategory;
            if (matchesSearch && matchesCategory) {
                entry.style.display = 'block';
            } else {
                entry.style.display = 'none';
            }
        });
    }
    searchInput.addEventListener('keyup', filterEntries);
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterEntries();
        });
    });
}

function initTimeWeaver() {
    const svg = $('spiral-svg');
    if (!svg) return;
    
    const events = CHRONICLE_DATA.map(e => ({...e, dateObj: new Date(e.year)})).sort((a,b) => a.dateObj - b.dateObj);
    const startDate = events[0].dateObj;
    const endDate = new Date();
    const totalDuration = endDate - startDate;
    const width = 800, height = 800;
    const cx = width / 2, cy = height / 2;
    const turns = 5;
    const radius = 350;
    let pathString = `M ${cx},${cy} `;
    let points = [];
    for (let i = 0; i < 360 * turns; i++) {
        const angle = i * Math.PI / 180;
        const r = (radius / (360 * turns)) * i;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        pathString += `L ${x},${y} `;
        points.push({x, y});
    }
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute('d', pathString);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'rgba(255, 215, 0, 0.2)');
    path.setAttribute('stroke-width', '2');
    path.id = 'timeline-spiral-path';
    svg.appendChild(path);
    const detailCard = $('timeline-detail-card');
    events.forEach(event => {
        const eventDuration = event.dateObj - startDate;
        const progress = eventDuration / totalDuration;
        const pointIndex = Math.floor(progress * (points.length - 1));
        const point = points[pointIndex];
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute('cx', point.x);
        circle.setAttribute('cy', point.y);
        circle.setAttribute('r', 6);
        circle.setAttribute('fill', 'var(--gold)');
        circle.classList.add('timeline-event-dot');
        svg.appendChild(circle);
        circle.addEventListener('mouseover', () => {
            circle.setAttribute('r', 12);
            detailCard.innerHTML = `<h4>${event.icon} ${event.title}</h4><p>${event.desc}</p><span>${event.year}</span>`;
        });
        circle.addEventListener('mouseout', () => {
            circle.setAttribute('r', 6);
        });
    });
    const animateBtn = $('animate-timeline');
    animateBtn.addEventListener('click', () => {
        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;
        const speed = 11 - $('timeline-speed').value;
        path.style.transition = `stroke-dashoffset ${events.length * (speed / 10)}s linear`;
        setTimeout(() => { path.style.strokeDashoffset = 0; }, 100);
    });
    $('reset-timeline').addEventListener('click', () => {
        path.style.transition = 'none';
        path.style.strokeDashoffset = path.getTotalLength();
    });
}


function getSanctuaryPanelHTML() {
    return `
    <div id="sanctuary-panel">
        <div id="sanctuary-main-container">

            <div id="sanctuary-threshold" class="sanctuary-view active">
                <div class="threshold-content">
                    <p id="typing-text" class="typing-text"></p>
                    <div id="sanctuary-riddle" class="sanctuary-riddle" style="display: none;">
                        <p class="riddle-prompt">If you are not the intended soul, speak a secret word, or prove your heart's knowledge to pass...</p>
                        <input type="password" id="riddle-password" class="text-input riddle-input" placeholder="Whisper the secret word...">
                        <div class="riddle-divider">OR</div>
                        <p class="riddle-question">What is Nicholas's favorite food made by Zoya?</p>
                        <div class="riddle-choices">
                            <button class="riddle-choice-btn btn" data-answer="kimuchi fried rice">Kimuchi Fried Rice</button>
                            <button class="riddle-choice-btn btn" data-answer="chicken fried wings">Chicken Fried Wings</button>
                            <button class="riddle-choice-btn btn" data-answer="tomato ramen">Tomato Ramen</button>
                        </div>
                        <p id="riddle-feedback" class="riddle-feedback"></p>
                    </div>
                </div>
            </div>
            
            <div id="sanctuary-entrance-animation" class="sanctuary-view">
                 <img src="photos/open_nebula.png" class="door-image" alt="Nebula Door opening">
            </div>

            <div id="sanctuary-hub" class="sanctuary-view sanctuary-hub-view">
                <h2 class="hub-title">WELCOME, PRECIOUS SOUL</h2>
                <p class="hub-subtitle">The cosmos has guided you here. This sanctuary was crafted by ancient forces and boundless love, a place where comfort awaits, where achievements are celebrated, where understanding flows freely, and where wisdom whispers through the stars.</p>
                <div class="hub-question-box">
                    <h3>HOW DOES YOUR SPIRIT FEEL IN THIS MOMENT?</h3>
                    <div class="hub-choices">
                        <button class="hub-choice-btn" onclick="showRealm('comfort')"><span>🔮</span> I seek comfort</button>
                        <button class="hub-choice-btn" onclick="showRealm('celebrate')"><span>✨</span> I achieved something</button>
                        <button class="hub-choice-btn" onclick="showRealm('hurt')"><span>🌙</span> Something hurt me</button>
                        <button class="hub-choice-btn" onclick="showRealm('guidance')"><span>🧭</span> I need guidance</button>
                        <button class="hub-choice-btn" onclick="showRealm('fortune')"><span>🎲</span> A Game of Fortune</button>
                    </div>
                </div>
            </div>

            <div id="sanctuary-realms-view" class="sanctuary-view sanctuary-realms-view">
                <section id="comfortRealm" class="realm">
                    <h2 class="section-title">✧ The Realm of Comfort ✧</h2>
                    <p class="realm-subheader">"When sadness weighs heavy, these portals and texts open to ease your burden"</p>
                    <div class="book-shelf">
                        <div class="sacred-scroll" onclick="readBook('solace', 'Scrolls of Solace', 'This scroll contains ancient words of comfort, reminding you that every storm passes and you are loved beyond measure. You are my calm in every chaos.')">
                            <div class="scroll-icon">📜</div><div class="scroll-text"><h3>Scrolls of Solace</h3><p>Words to heal the weary heart</p></div>
                        </div>
                        <div class="sacred-scroll" onclick="readBook('miracles', 'The Grimoire of Daily Miracles', 'This grimoire is filled with small wonders: the memory of a shared laugh, the warmth of a quiet hug, the taste of a favorite meal. These are the true spells of happiness.')">
                             <div class="scroll-icon">✨</div><div class="scroll-text"><h3>The Grimoire of Daily Miracles</h3><p>Finding magic in everyday moments</p></div>
                        </div>
                    </div>
                    <div class="realm-grid">
                        <div class="realm-portal" onclick="revealDynamicBlessing('comfort', '🫂', 'Warmth & Presence')"><div class="realm-icon">🫂</div><h3 class="realm-title">Warmth & Presence</h3><p class="realm-description">For when you need to feel held</p></div>
                        <div class="realm-portal" onclick="revealDynamicBlessing('sweet', '🍰', 'Sweet Solace')"><div class="realm-icon">🍰</div><h3 class="realm-title">Sweet Comfort</h3><p class="realm-description">For when you crave sweetness</p></div>
                        <div class="realm-portal" onclick="revealDynamicBlessing('pamper', '🌸', 'Sacred Restoration')"><div class="realm-icon">🌸</div><h3 class="realm-title">Rejuvenation</h3><p class="realm-description">For when you need renewal</p></div>
                        <div class="realm-portal" onclick="revealDynamicBlessing('qualityTime', '⏳', 'Timeless Together')"><div class="realm-icon">⏳</div><h3 class="realm-title">Quality Time</h3><p class="realm-description">For when you need connection</p></div>
                    </div>
                    <button class="back-to-hub-btn btn" onclick="returnToHub()">Return to Sanctuary Entrance</button>
                </section>

                <section id="celebrateRealm" class="realm">
                    <h2 class="section-title">✧ The Realm of Triumph ✧</h2>
                    <p class="realm-subheader">"Your achievements deserve cosmic celebration"</p>
                    <div class="realm-grid">
                        <div class="realm-portal" onclick="revealDynamicBlessing('dinner', '🎉', 'Victory Feast')"><div class="realm-icon">🎉</div><h3 class="realm-title">Celebration Dinner</h3><p class="realm-description">For worthy accomplishments</p></div>
                        <div class="realm-portal" onclick="revealDynamicBlessing('shopping', '✨', 'Reward of Stars')"><div class="realm-icon">✨</div><h3 class="realm-title">Material Reward</h3><p class="realm-description">For exceptional achievements</p></div>
                        <div class="realm-portal" onclick="revealDynamicBlessing('adventure', '🗺️', 'Victory Quest')"><div class="realm-icon">🗺️</div><h3 class="realm-title">Adventure Reward</h3><p class="realm-description">For brave accomplishments</p></div>
                        <div class="realm-portal" onclick="revealDynamicBlessing('queen', '👑', 'Day of Glory')"><div class="realm-icon">👑</div><h3 class="realm-title">Total Authority</h3><p class="realm-description">For legendary achievements</p></div>
                    </div>
                    <button class="back-to-hub-btn btn" onclick="returnToHub()">Return to Sanctuary Entrance</button>
                </section>

                <section id="hurtRealm" class="realm">
                    <h2 class="section-title">✧ The Realm of Healing ✧</h2>
                    <p class="realm-subheader">"When wrongs must be righted, these pathways and rituals open"</p>
                    <div class="realm-grid">
                        <div class="realm-portal" onclick="revealDynamicBlessing('apology', '🔮', 'The Sacred Apology')"><div class="realm-icon">🔮</div><h3 class="realm-title">Truth & Apology</h3><p class="realm-description">When I have wronged you</p></div>
                        <div class="realm-portal" onclick="revealDynamicBlessing('amends', '💝', 'Making Amends')"><div class="realm-icon">💝</div><h3 class="realm-title">Making Amends</h3><p class="realm-description">To balance the scales</p></div>
                        <div class="realm-portal" onclick="revealDynamicBlessing('burden', '⚡', 'Lifting Your Load')"><div class="realm-icon">⚡</div><h3 class="realm-title">Lifting Your Load</h3><p class="realm-description">When life is too heavy</p></div>
                        <div class="realm-portal" onclick="revealBlessing('🌟', 'The Ultimate Wish', 'Anything. Whatever you need to feel whole again. No limits, no restrictions. The full power of the cosmos bends to make things right for my one and only love.')"><div class="realm-icon">🌟</div><h3 class="realm-title">Cosmic Restoration</h3><p class="realm-description">When only everything will do</p></div>
                    </div>
                    <div class="ritual-altar"><p class="ritual-instructions">"Light each of the seven sacred candles to complete the ancient ritual.<br>With each flame, a burden lifts and harmony returns."</p><div class="candles"><div class="candle" onclick="lightCandle(this)" title="Candle of Understanding"></div><div class="candle" onclick="lightCandle(this)" title="Candle of Forgiveness"></div><div class="candle" onclick="lightCandle(this)" title="Candle of Love"></div><div class="candle" onclick="lightCandle(this)" title="Candle of Joy"></div><div class="candle" onclick="lightCandle(this)" title="Candle of Peace"></div><div class="candle" onclick="lightCandle(this)" title="Candle of Renewal"></div><div class="candle" onclick="lightCandle(this)" title="Candle of Eternity"></div></div><p class="ritual-complete" id="ritualComplete">✧ The Ritual is Complete ✧<br>All is forgiven, all is renewed, all is well.</p></div>
                    <button class="back-to-hub-btn btn" onclick="returnToHub()">Return to Sanctuary Entrance</button>
                </section>

                <section id="guidanceRealm" class="realm">
                    <h2 class="section-title">✧ The Realm of Guidance ✧</h2>
                    <p class="realm-subheader">"Wisdom flows through ancient channels to guide your path"</p>
                    <div class="oracle-chamber"><div class="crystal-ball" onclick="revealWisdom()"></div><p class="oracle-prompt">Click the crystal to receive guidance from the cosmos</p><p class="oracle-text" id="oracleText">The oracle awaits your question...</p></div>
                    <div class="astral-map"><h3 class="astral-map-title">The Constellation of Our Love</h3><div id="constellationCanvas" class="constellation-canvas"></div></div>
                    <button class="back-to-hub-btn btn" onclick="returnToHub()">Return to Sanctuary Entrance</button>
                </section>

                <section id="fortuneRealm" class="realm">
                    <h2 class="section-title">✧ The Realm of Fortune ✧</h2>
                    <p class="realm-subheader">"Scratch the cosmic tablet to reveal your fate. Will the stars align in your favor?"</p>
                    <div class="scratch-card-container"><div id="prizeDiv" class="prize-div"><h3 id="prizeTitle" class="prize-title"></h3><p id="prizeDescription" class="prize-description"></p></div><canvas id="scratchCanvas" class="scratch-canvas"></canvas></div>
                    <div class="realm-actions"><button class="btn primary" onclick="initScratchCard()">Play Again</button></div>
                    <button class="back-to-hub-btn btn" onclick="returnToHub()">Return to Sanctuary Entrance</button>
                </section>
            </div>
        </div>
        
        <div class="modal" id="blessingModal"><div class="modal-content"><span class="modal-icon" id="modalIcon"></span><h2 class="modal-title" id="modalTitle"></h2><div class="modal-message" id="modalMessage"></div><div class="modal-seal"></div><button class="btn primary accept-button" onclick="closeModal('blessingModal')">✧ ACCEPT BLESSING ✧</button></div></div>
        <div class="modal" id="bookModal"><div class="modal-content"><h2 class="modal-title" id="bookTitle" style="font-size: 2.2em;"></h2><div class="book-modal-content"><p id="bookContent"></p></div><button class="btn primary accept-button" onclick="closeModal('bookModal')">✧ CLOSE TOME ✧</button></div></div>
    </div>`;
}

function initChroniclePanelJS() {
    let currentEventIndex = 0;
    let displayedDate = new Date();
    const PROPHECIES = [ "In the infinite scroll of the cosmos, our chapter is written in starlight.", "Two souls, one orbit, bound by a gravity stronger than any star.", "Fate whispered your name in the solar winds, and my heart knew to listen.", "Every shared glance is a supernova, birthing new galaxies within us.", "Like twin stars, we dance through the darkness, forever illuminating each other's path." ];
    let currentProphecyIndex = 0;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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

function initNebulaOfSolitudeJS() {
    const nebulaContainer = $('nebula-of-solitude'); if (!nebulaContainer) return;
    const mainContentContainer = nebulaContainer.querySelector('#main-container'); if (!mainContentContainer) return;
    
    let currentChapter = 0, eggScore = 0, chickenCount = 1, heartClicks = 0, starCounterInterval, therapistInterval, hesitateCount = 0, lastHeartClick = 0, secretStarFound = false;
    
    // --- NEW & EXPANDED WISDOM ---
    const therapistMessages = [ 
        "Remember: Stars don't ghost you. ✨", 
        "Nic, maybe don't send that 3 a.m. message... or do. Love is chaos. 💫", 
        "Overthinking is just love doing mathematics. It's beautiful. 🧮", 
        "The universe aligned for you two. Stop doubting cosmic GPS. 🌌", 
        "Sometimes the best love stories start with a math book. 📚",
        "A love that can fly through a typhoon isn't subject to the normal laws of physics. ✈️",
        "The universe doesn't mind shyness. It just arranges things so the right person breaks through it.",
        "Even in a crowd, two souls can create their own quiet universe. All it takes is a book and a curious heart.",
        "The probability of you two meeting was low, but destiny doesn't care about statistics. 🎲",
        "Pro-tip from the cosmos: True love often involves chicken steak. 🍗",
        "Don't worry about the future. You two are a fixed constellation in a sky of changing stars.",
        "A heart that loves mathematics just needed to find the one variable that made everything make sense. ❤️",
        "Sometimes the biggest 'what ifs' have the simplest, most beautiful answers.",
        "Distance is just a test from the universe to see if your emotional gravity is strong enough. Spoiler: it is. 🌍",
        "Sometimes a broken bicycle isn't a problem, it's a cosmic excuse for two orbits to intersect. 🚲",
        "You are both stardust, but together you're a supernova. 💥",
        "Remember, a cheesy 'good night' message can be a treasured memory. The cosmos grades on a curve.",
        "One person's 'awkward silence' is another person's 'comfortable library date'. It's all about perspective."
    ];
    
    const showAchievement = (text) => { const achievement = nebulaContainer.querySelector('#achievement'); nebulaContainer.querySelector('#achievementText').textContent = text; achievement.classList.add('show'); setTimeout(() => achievement.classList.remove('show'), 3000); };
    const showTherapistMessage = () => { const therapist = nebulaContainer.querySelector('#therapist'); const randomMessage = therapistMessages[Math.floor(Math.random() * therapistMessages.length)]; therapist.textContent = randomMessage; therapist.classList.add('active'); setTimeout(() => therapist.classList.remove('active'), 4000); };
    
    const switchChapter = (num) => {
        currentChapter = parseInt(num, 10);
        nebulaContainer.querySelectorAll('.chapter').forEach(ch => ch.classList.remove('active')); 
        const chapterEl = nebulaContainer.querySelector('#chapter-' + num); 
        if (chapterEl) { 
            chapterEl.classList.add('active'); 
            DOM.mainContent.scrollTo({ top: 0, behavior: 'smooth' }); 
        } 
    };

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
    
    mainContentContainer.addEventListener('click', handleNebulaClick);
    DOM.mainContent.addEventListener('scroll', handleScroll);
    
    setTimeout(() => { const meter = nebulaContainer.querySelector('#lonelinessMeter'); if(meter) meter.style.width = '85%'; }, 1000);
    calculateDays(); startStarCounter();
    therapistInterval = setInterval(() => { if (Math.random() > 0.7 && currentChapter < 3) showTherapistMessage(); }, 15000);
    
    window.nebulaCleanup = () => { 
        clearInterval(starCounterInterval); 
        clearInterval(therapistInterval); 
        mainContentContainer.removeEventListener('click', handleNebulaClick); 
        DOM.mainContent.removeEventListener('scroll', handleScroll); 
    };
}

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
const STAR_MATCH_SYMBOLS=['📖','🚲','✈️','🎨','🍗','💌','🎂','🤝'];
const TAROT={truth:[{i:'💕',t:"The Lovers: Describe the moment you knew your feelings were more than friendship."},{i:'🌟',t:"The Star: What's a hope for your future you've never said out loud?"},{i:'☀️',t:"The Sun: What is your single happiest moment of just the two of you?"},{i:'🌙',t:"The Moon: What is a secret fear you have about the future that your partner can help soothe?"}],dare:[{i:'🎩',t:"The Magician: Create a 'magic spell' using only three words that describes your love."},{i:'🃏',t:"The Fool: Take a leap of faith: tell your partner a silly, secret dream you have."},{i:'📜',t:"The Hierophant: Create a new tradition (e.g., a special handshake) and perform it now."},{i:'⚔️',t:"The Chariot: Plan your next 'adventure' date, even if it's just a walk to a new place."}],prophecy:[{i:'🔮',t:"The World: Many more journeys await you, hand in hand, across different corners of the world."},{i:'✨',t:"The Empress: A future of shared creativity and building a beautiful home together is foreseen."},{i:'🦁',t:"Strength: You will continue to give each other the courage to overcome any obstacle life presents."}]};
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
    else if (['soul-quiz', 'love-meter', 'star-match', 'two-truths', 'echoes-quiz'].includes(id)) modalContentWrapper.classList.add('size-medium');
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
    if (id === 'star-match') initStarMatch();
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
let sMFlipped,sMLock,sMMoves,sMMatches; function initStarMatch(){sMFlipped=[];sMLock=!1;sMMoves=0;sMMatches=0;updateStarMatchScore();const g=$('star-match-grid');g.innerHTML='';[...STAR_MATCH_SYMBOLS,...STAR_MATCH_SYMBOLS].sort(()=>.5-Math.random()).forEach(s=>{const c=document.createElement('div');c.className='memory-card';c.dataset.symbol=s;c.innerHTML=`<div class="face back">?</div><div class="face front">${s}</div>`;c.addEventListener('click',()=>flipStarMatchCard(c));g.appendChild(c)})}
function flipStarMatchCard(c){if(sMLock||c.classList.contains('flipped'))return;c.classList.add('flipped');sMFlipped.push(c);if(sMFlipped.length===2){sMLock=!0;sMMoves++;if(sMFlipped[0].dataset.symbol===sMFlipped[1].dataset.symbol){sMMatches++;sMFlipped.forEach(c=>c.classList.add('matched'));sMFlipped=[];sMLock=!1;if(sMMatches===STAR_MATCH_SYMBOLS.length){let resultText="Nexus Cleared! ";if(sMMoves<=12){resultText+="A true cosmic memory master!"}else if(sMMoves<=18){resultText+="Stellar recall! Our memories are strong."}else{resultText+="Lost among the stars, but we found our way back together!"}document.querySelector('#star-match-content .score-display').innerHTML=`Moves: ${sMMoves} | Matches: 8/8 <br><span style='font-size: 0.7em;color:var(--gold)'>${resultText}</span>`;triggerReward()}}else{setTimeout(()=>{sMFlipped.forEach(c=>c.classList.remove('flipped'));sMFlipped=[];sMLock=!1},1200)}updateStarMatchScore()}}
function updateStarMatchScore(){if(sMMatches<STAR_MATCH_SYMBOLS.length)$('star-match-moves').textContent=sMMoves;$('star-match-matches').textContent=`${sMMatches}/8`}
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

// --- Mood-sync helpers and guarded password bypass ---
function getMoodFromState() {
    // Try multiple sources: explicit globals, localStorage, or defaults
    const zoya = (window.ZOYA_MOOD || localStorage.getItem('zoyaMood') || 'neutral').toString().toLowerCase().trim();
    const nicho = (window.NICHO_MOOD || localStorage.getItem('nichoMood') || 'neutral').toString().toLowerCase().trim();
    return { zoya: zoya || 'neutral', nicho: nicho || 'neutral' };
}

function mapMoodToPanel(zoyaMood, nichoMood) {
    // Expanded mapping logic with prioritized rules
    const a = zoyaMood;
    const b = nichoMood;

    // Strong mutual moods
    if (a === 'excited' && b === 'excited') return 'games';
    if (a === 'loving' && b === 'loving') return 'sanctuary';
    if (a === 'nostalgic' && b === 'nostalgic') return 'gallery';
    if (a === 'calm' && b === 'calm') return 'guide';

    // Mixed high-energy combos
    if ((a === 'excited' && b === 'adventurous') || (b === 'excited' && a === 'adventurous')) return 'universes';
    if ((a === 'excited' && b === 'playful') || (b === 'excited' && a === 'playful')) return 'games';
    if ((a === 'playful' && b === 'playful')) return 'voicegarden';

    // Comforting / supportive combos
    if ((a === 'sad' && b === 'loving') || (b === 'sad' && a === 'loving')) return 'sanctuary';
    if (a === 'sad' && b === 'sad') return 'sanctuary';
    if (a === 'sad' || b === 'sad') return 'guide';

    // Single-person inclinations
    if (a === 'adventurous' || b === 'adventurous') return 'universes';
    if (a === 'nostalgic' || b === 'nostalgic') return 'gallery';
    if (a === 'playful' || b === 'playful') return 'voicegarden';
    if (a === 'excited' || b === 'excited') return 'games';
    if (a === 'loving' || b === 'loving') return 'sanctuary';

    // default fallback
    return 'home';
}

function showMoodLoadingAndRedirect(targetPanel, opts = {}) {
    const message = opts.message || `The stars conspire... We are being guided toward a place of ${targetPanel}...`;
    // Create overlay
    let overlay = document.getElementById('mood-loading-overlay');
    if (overlay) overlay.remove();
    overlay = document.createElement('div');
    overlay.id = 'mood-loading-overlay';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.background = 'radial-gradient(ellipse at center, rgba(0,0,0,0.6), rgba(0,0,0,0.9))';
    overlay.style.zIndex = '9999';
    overlay.innerHTML = `
        <div style="max-width: 800px; padding: 30px; text-align:center; color:var(--gold-light); font-family:var(--font-handwriting);">
            <div id="mood-typewriter" style="font-size:1.35rem; line-height:1.4; min-height:3.2rem;"></div>
            <div style="margin-top:18px; opacity:0.9; font-size:0.9rem; color:var(--text-secondary);">(for a moment, passwords are hushed by the cosmos)</div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Activate temporary password bypass while the overlay is present
    AppState.passwordsTemporarilyBypassed = true;
    AppState.moodLoading = true;

    // Simple typewriter
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

    // Compose a slightly mysterious message referencing the panel
    const prettyName = { games: 'a wild, exciting place', sanctuary: 'the Inner Sanctum of comfort', guide: 'a quiet guide', voicegarden: 'a blooming voice garden', universes: 'a place of adventurous chronicles', gallery: 'a warm gallery of memories', home: 'home' }[targetPanel] || targetPanel;
    const typeText = `Hush... The constellations whisper of ${prettyName}. Follow.`;
    i = 0;
    typewriterLoop(typeText, () => {
        // after typing, wait a moment then animate transition and redirect
        setTimeout(() => {
            // prepare fade-out animation
            const main = DOM.mainContent || document.querySelector('.main-content');
            const solar = DOM.solarSystemContainer || document.getElementById('solar-system-container');
            try {
                if (main) { main.style.transition = 'opacity 600ms ease'; main.style.opacity = '0'; }
                if (solar) { solar.style.transition = 'opacity 600ms ease'; solar.style.opacity = '0'; }
            } catch (e) { /* ignore */ }

            setTimeout(() => {
                // remove overlay and reset bypass
                AppState.passwordsTemporarilyBypassed = false;
                AppState.moodLoading = false;
                const ov = document.getElementById('mood-loading-overlay'); if (ov) ov.remove();
                // navigate to panel
                window.location.hash = targetPanel;

                // fade back in after panel change (give render a short moment)
                setTimeout(() => {
                    try { if (main) main.style.opacity = '1'; if (solar) solar.style.opacity = '1'; } catch (e) {}
                }, 120);
            }, 650);
        }, 900);
    });
}

function evaluateMoodAndRedirect() {
    try {
        if (!AppState.moodSyncEnabled) return; const { zoya, nicho } = getMoodFromState();
        const target = mapMoodToPanel(zoya, nicho);
        // If target is home or same panel, do nothing
        const current = window.location.hash.substring(1) || 'home';
        if (target && target !== current) {
            showMoodLoadingAndRedirect(target);
        }
    } catch (e) {
        console.error('Mood redirect failed', e);
    }
}

// Enhanced book password handler: respects temporary bypass and still does normal check
function handleBookPasswordAttempt() {
    const entered = (DOM.bookPasswordInput.value || '').toLowerCase().replace(/\s/g, '');
    if (AppState.passwordsTemporarilyBypassed) {
        // allow entry only during the special loading window
        DOM.bookPasswordGate.classList.remove('active');
        AppState.bookUnlocked = true;
        renderBookUI();
        return;
    }

    if (entered === (EDITABLE_CONFIG.bookPassword || '').toLowerCase()) {
        DOM.bookPasswordGate.classList.remove('active');
        AppState.bookUnlocked = true;
        renderBookUI();
    } else {
        alert('Incorrect password.');
    }
}
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
function renderGallery(category = 'all') {
    AppState.currentGalleryCategory = category;
    const grid = $('gallery-grid');
    if (!grid) return;

    const allPhotosInCategory = category === 'all'
        ? EDITABLE_CONFIG.PHOTOS_DATA
        : EDITABLE_CONFIG.PHOTOS_DATA.filter(p => p.category === category);

    AppState.gallery.currentPhotoList = allPhotosInCategory;

    const showMoreContainer = $('gallery-show-more-container');
    if(showMoreContainer) showMoreContainer.innerHTML = '';

    const photosToRender = AppState.gallery.showAll || allPhotosInCategory.length <= 6
        ? allPhotosInCategory
        : allPhotosInCategory.slice(0, 6);

    grid.innerHTML = photosToRender.map((p, i) =>
        `<div class="polaroid-item" data-index="${i}"><img src="${p.src}" alt="${p.caption}"><p class="polaroid-caption">${p.caption}</p></div>`
    ).join('');

    if (showMoreContainer && !AppState.gallery.showAll && allPhotosInCategory.length > 6) {
        showMoreContainer.innerHTML = `<button class="btn primary" id="show-more-gallery-btn">Show More</button>`;
        $('show-more-gallery-btn').addEventListener('click', () => {
            AppState.gallery.showAll = true;
            renderGallery(category);
        });
    }

    $$('.gallery-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
}
function updateRelationshipCounter() { /* Placeholder */ }

function openLightbox(index) {
    DOM.lightbox.classList.add('active');
    updateLightboxContent(index);
}

function updateLightboxContent(index) {
    if (index < 0 || index >= AppState.gallery.currentPhotoList.length) {
        return;
    }
    const photo = AppState.gallery.currentPhotoList[index];
    DOM.lightboxImg.src = photo.src;
    DOM.lightboxCaption.textContent = photo.caption;
    AppState.gallery.lightboxIndex = index;
}

function changeLightboxImage(direction) {
    let newIndex = AppState.gallery.lightboxIndex + direction;
    const total = AppState.gallery.currentPhotoList.length;

    if (newIndex < 0) {
        newIndex = total - 1;
    } else if (newIndex >= total) {
        newIndex = 0;
    }
    updateLightboxContent(newIndex);
}


const THEME_COLORS = {
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
  }
};

const THEME_STAR_SHAPES = {
  mystical: { char: '✦', shadowColor: '#ffd700' },
  ethereal: { char: '❄️', shadowColor: '#64ffda' },
  sunset: { char: '₊˚⊹⋆🍁⋆⊹˚ ₊', shadowColor: '#ff9f43' },
  forest: { char: '🍀', shadowColor: '#2ecc71' },
  midnight: { char: '✨', shadowColor: '#e0e0e0' },
  coral: { char: '🪸', shadowColor: '#ff7b54' },
  royal: { char: '🔮', shadowColor: '#b59fc4ff' },
  ocean: { char: '🪼 ⋆‧🫧', shadowColor: '#00d9ff' }
};

function createThemedStarfield(themeName) {
  const starfield = document.getElementById('starfield');
  if (!starfield) return;
  
  const theme = THEME_COLORS[themeName];
  const starShape = THEME_STAR_SHAPES[themeName];
  if (!theme || !starShape) return;

  starfield.innerHTML = '';
  starfield.style.background = theme.bgGradient;
  
  for (let i = 0; i < 300; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.textContent = starShape.char;
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.fontSize = (Math.random() * 12 + 8) + 'px';
    star.style.color = theme.colors['--gold'];
    star.style.filter = `drop-shadow(0 0 ${Math.random() * 3 + 2}px ${starShape.shadowColor})`;
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (2 + Math.random() * 3) + 's';
    starfield.appendChild(star);
  }
  
  for (let i = 0; i < 5; i++) {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.textContent = starShape.char;
    shootingStar.style.left = Math.random() * 100 + '%';
    shootingStar.style.top = Math.random() * 50 + '%';
    shootingStar.style.color = theme.colors['--gold'];
    shootingStar.style.filter = `drop-shadow(0 0 10px ${starShape.shadowColor})`;
    shootingStar.style.animationDelay = Math.random() * 10 + 's';
    starfield.appendChild(shootingStar);
  }
  
  const nebulae = [ { left: '10%', top: '20%' }, { left: '70%', top: '60%' }, { left: '40%', top: '80%' } ];
  
  nebulae.forEach(neb => {
    const nebula = document.createElement('div');
    nebula.className = 'nebula';
    nebula.style.background = theme.colors['--soft-violet'];
    nebula.style.left = neb.left;
    nebula.style.top = neb.top;
    nebula.style.opacity = '0.3';
    starfield.appendChild(nebula);
  });
}

function applyTheme(themeName) {
  const theme = THEME_COLORS[themeName];
  if (!theme) return;

  Object.entries(theme.colors).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value, 'important');
  });

  const bgContainers = document.querySelectorAll('.background-container');
  bgContainers.forEach(container => {
    container.style.background = theme.bgGradient;
  });

  // Re-initialize all backgrounds with new theme
  initWebBackground('web-canvas-landing', theme);
  initWebBackground('web-canvas-main', theme);
  applyThemeToLanding(themeName);
  initMainParticles(themeName);
  
  localStorage.setItem('selectedTheme', themeName);

  const themeButtons = document.querySelectorAll('.theme-color-btn');
  themeButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === themeName);
  });
  
  // Notify iframe of theme change
  const iframe = document.querySelector('#sanctuary-panel iframe');
  if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'THEME_CHANGED', theme: themeName }, '*');
  }
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem('selectedTheme') || 'mystical';
  applyTheme(savedTheme);
}

function initThemeSystem() {
  const menuDropdown = document.getElementById('main-menu-dropdown');
  if (!menuDropdown || document.querySelector('.theme-colors-grid')) return;

  const themeSeparator = document.createElement('hr');
  const themeLabel = document.createElement('div');
  themeLabel.className = 'theme-label';
  themeLabel.textContent = '🎨 Themes';
  const themeContainer = document.createElement('div');
  themeContainer.className = 'theme-colors-grid';

  Object.entries(THEME_COLORS).forEach(([key, theme]) => {
    const btn = document.createElement('button');
    btn.className = 'theme-color-btn';
    btn.dataset.theme = key;
    btn.title = theme.name;
    const primaryColor = theme.colors['--deep-purple'];
    const secondaryColor = theme.colors['--soft-violet'];
    const accentColor = theme.colors['--gold'];
    btn.style.background = `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`;
    btn.style.color = accentColor;
    btn.addEventListener('click', (e) => { e.preventDefault(); applyTheme(key); });
    btn.innerHTML = `<span style="font-size: 1.4rem;">${theme.icon}</span><span style="font-size: 0.7rem; line-height: 1.1;">${theme.name}</span>`;
    themeContainer.appendChild(btn);
  });

  menuDropdown.appendChild(themeSeparator);
  menuDropdown.appendChild(themeLabel);
  menuDropdown.appendChild(themeContainer);
  loadSavedTheme();
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initThemeSystem, 100);
});

const themeStyles = `
.theme-label { padding: 10px 15px; color: var(--gold); font-family: var(--font-display); font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; margin-top: 5px; text-align: center; }
.theme-colors-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; padding: 10px; }
.theme-color-btn { padding: 10px; border: 2px solid rgba(255, 215, 0, 0.3); border-radius: 8px; cursor: pointer; transition: all 0.3s ease; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 6px; flex-direction: column; text-align: center; font-size: 0.7rem; font-family: var(--font-body); }
.theme-color-btn:hover { transform: scale(1.05); border-color: var(--gold); box-shadow: 0 0 15px var(--gold); }
.theme-color-btn.active { border-color: var(--gold) !important; box-shadow: 0 0 20px var(--gold), 0 0 30px var(--soft-violet) !important; transform: scale(1.1); position: relative; }
.theme-color-btn.active::after { content: '✓'; position: absolute; top: -8px; right: -8px; background: var(--gold); color: var(--deep-purple); width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; }
`;

if (!document.querySelector('style[data-theme-system]')) {
  const styleSheet = document.createElement('style');
  styleSheet.setAttribute('data-theme-system', 'true');
  styleSheet.textContent = themeStyles;
  document.head.appendChild(styleSheet);
}

// ===================================================================
// ALTERNATE UNIVERSE CHRONICLES - COMPLETE IMPLEMENTATION
// ===================================================================

// Universe Panel HTML Generator
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
            <button class="btn primary" onclick="showCreateUniverse()">🌟 Create New Universe</button>
            <button class="btn" onclick="filterUniverses('all')">Show All</button>
            <button class="btn" onclick="filterUniverses('written')">Written Stories</button>
            <button class="btn" onclick="filterUniverses('unwritten')">Awaiting Creation</button>
        </div>

        <div class="universe-grid" id="universe-grid">
            <!-- Universe cards populated by JS -->
        </div>
    </div>
    `;
}

// Initialize Universe Panel
function initUniversePanel() {
    renderUniverseGrid();
    initPortalAnimation();
}

// Render Universe Grid
function renderUniverseGrid(filter = 'all') {
    const grid = document.getElementById('universe-grid');
    if (!grid) return;

    let filteredUniverses = ALTERNATE_UNIVERSES;
    if (filter === 'written') {
        filteredUniverses = ALTERNATE_UNIVERSES.filter(u => u.chapters.length > 0);
    } else if (filter === 'unwritten') {
        filteredUniverses = ALTERNATE_UNIVERSES.filter(u => u.chapters.length === 0);
    }

    grid.innerHTML = filteredUniverses.map(universe => `
        <div class="universe-card" onclick="openUniverse('${universe.id}')">
            <div class="universe-header">
                <div class="universe-icon">${universe.icon}</div>
                <h3 class="universe-title">${universe.title}</h3>
                <div class="universe-era">${universe.era}</div>
            </div>
            <img class="universe-illustration" src="${universe.image}" alt="${universe.title}" onerror="this.style.display='none'">
            <div class="universe-content">
                <p class="universe-premise">${universe.premise}</p>
                <div class="universe-stats">
                    <span>📖 ${universe.stats.chapters} chapters</span>
                    <span>📝 ${universe.stats.words} words</span>
                </div>
                <div class="universe-stats" style="margin-top: 0.5rem;">
                    <span style="color: var(--text-secondary); font-size: 0.85rem;">
                        Last updated: ${universe.stats.lastUpdated}
                    </span>
                </div>
                <div class="universe-actions">
                    <button class="btn primary" onclick="event.stopPropagation(); openUniverse('${universe.id}')">
                        ${universe.chapters.length > 0 ? '📖 Read Story' : '✍️ Start Writing'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Open Universe Reading View
function openUniverse(universeId) {
    const universe = ALTERNATE_UNIVERSES.find(u => u.id === universeId);
    if (!universe) return;

    const panel = document.querySelector('#universe-panel');
    if (!panel) return;

    if (universe.chapters.length === 0) {
        // No chapters yet - show creation prompt
        panel.innerHTML = `
            <div class="universe-reading-view">
                <button class="btn" onclick="returnToUniverseHub()" style="margin-bottom: 2rem;">← Back to Multiverse</button>
                
                <div class="chapter-illustration-container" style="text-align: center; margin-bottom: 2rem;">
                    <img class="chapter-illustration" src="${universe.image}" alt="${universe.title}" onerror="this.style.display='none'">
                </div>

                <h2 class="panel-header">${universe.icon} ${universe.title}</h2>
                <h3 style="color: var(--text-secondary); text-align: center; margin-bottom: 2rem;">${universe.era}</h3>
                
                <div class="universe-premise-full" style="background: var(--highlight-glass); padding: 2rem; border-radius: 12px; border-left: 4px solid var(--gold); margin-bottom: 2rem;">
                    <h4 style="color: var(--gold); margin-bottom: 1rem;">The Premise</h4>
                    <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-primary);">${universe.premise}</p>
                </div>

                <div class="universe-characters" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                    <div style="background: var(--highlight-glass); padding: 1.5rem; border-radius: 8px;">
                        <h4 style="color: var(--gold); margin-bottom: 0.5rem;">${universe.characters.nic.name}</h4>
                        <p style="color: var(--text-secondary);">${universe.characters.nic.role}</p>
                    </div>
                    <div style="background: var(--highlight-glass); padding: 1.5rem; border-radius: 8px;">
                        <h4 style="color: var(--gold); margin-bottom: 0.5rem;">${universe.characters.zoya.name}</h4>
                        <p style="color: var(--text-secondary);">${universe.characters.zoya.role}</p>
                    </div>
                </div>
            </div>`;
    } else {
        // Has chapters - show reading view
        const chaptersHTML = universe.chapters.map(chapter => `
            <div class="chapter-content">
                <h3 class="chapter-title">${chapter.title}</h3>
                <div class="chapter-text">
                    ${chapter.content.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('')}
                </div>
            </div>
        `).join('<hr>');

        panel.innerHTML = `
            <div class="universe-reading-view">
                <button class="btn" onclick="returnToUniverseHub()" style="margin-bottom: 2rem;">← Back to Multiverse</button>
                
                <div class="chapter-illustration-container" style="text-align: center; margin-bottom: 2rem;">
                    <img class="chapter-illustration" src="${universe.image}" alt="${universe.title}" onerror="this.style.display='none'">
                </div>

                <h2 class="panel-header">${universe.icon} ${universe.title}</h2>
                <h3 style="color: var(--text-secondary); text-align: center; margin-bottom: 2rem;">${universe.era}</h3>

                <div class="universe-characters" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                    <div style="background: var(--highlight-glass); padding: 1.5rem; border-radius: 8px;">
                        <h4 style="color: var(--gold); margin-bottom: 0.5rem;">${universe.characters.nic.name}</h4>
                        <p style="color: var(--text-secondary);">${universe.characters.nic.role}</p>
                    </div>
                    <div style="background: var(--highlight-glass); padding: 1.5rem; border-radius: 8px;">
                        <h4 style="color: var(--gold); margin-bottom: 0.5rem;">${universe.characters.zoya.name}</h4>
                        <p style="color: var(--text-secondary);">${universe.characters.zoya.role}</p>
                    </div>
                </div>

                ${chaptersHTML}
            </div>`;
    }
}

function returnToUniverseHub() { renderPanel('universes'); }
function showCreateUniverse() { alert('Universe creation interface coming soon!'); }
function filterUniverses(filter) { renderUniverseGrid(filter); }
function initPortalAnimation() { /* Placeholder for portal canvas animation */ }
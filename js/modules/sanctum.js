// ===================================================================
//  MODULE: SANCTUARY (js/modules/sanctuary.js) - ENHANCED
// ===================================================================
import { $, $$, AppState, personalizedContent } from '../common.js';

// --- Local State ---
let panelContainer = null;
let litCandles = 0;
const totalCandles = 7;
let scratchCtx;
let constellationPoints = [];
let constellationLines = [];

// --- Enhanced HTML Template ---

function getSanctuaryPanelHTML() {
    return `
    <div id="sanctuary-panel">
        <div id="sanctuary-main-container">
            <div id="sanctuary-threshold" class="sanctuary-view active">
                <div class="threshold-content">
                    <p id="typing-text" class="typing-text"></p>
                    <div class="chinese-poetry-box" style="display: none;">
                        <div class="poetry-zh">在天愿作比翼鸟，在地愿为连理枝</div>
                        <div class="poetry-en">In heaven, lovebirds flying wing to wing; on earth, branches forever intertwined</div>
                        <div class="poetry-source">—— 白居易《长恨歌》</div>
                    </div>
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
                <div class="content-container">
                    <header class="header">
                        <div class="ancient-seal"></div>
                        <h1 class="title" data-translate-id="sanctuary_hub_title">✧ INNER SANCTUM ✧</h1>
                        <p class="subtitle" data-translate-id="sanctuary_hub_subtitle">Where Celestial Powers Heal All Wounds</p>
                        <p class="ancient-text">~ Forged in the First Light of Creation ~</p>
                    </header>
                    
                    <h2 class="section-title" data-translate-id="sanctuary_hub_prompt">How does your spirit feel in this moment?</h2>
                    
                    <div class="portal-grid-layout">
                        <div class="realm-portal" data-realm="comfort">
                            <div class="realm-icon">🫂</div>
                            <h3 class="realm-title" data-translate-id="sanctuary_realm_comfort">I Seek Comfort</h3>
                            <p class="realm-description">When you feel sad or alone.</p>
                        </div>
                        <div class="realm-portal" data-realm="celebrate">
                            <div class="realm-icon">🎉</div>
                            <h3 class="realm-title" data-translate-id="sanctuary_realm_celebrate">I Wish to Celebrate</h3>
                            <p class="realm-description">For moments of joy and triumph.</p>
                        </div>
                        <div class="realm-portal" data-realm="hurt">
                            <div class="realm-icon">💔</div>
                            <h3 class="realm-title" data-translate-id="sanctuary_realm_hurt">I Am Hurting</h3>
                            <p class="realm-description">To find healing and make amends.</p>
                        </div>
                        <div class="portal-span-3">
                            <div class="realm-portal" data-realm="guidance">
                                <div class="realm-icon">🔮</div>
                                <h3 class="realm-title" data-translate-id="sanctuary_realm_guidance">I Need Guidance</h3>
                                <p class="realm-description">When you feel lost or uncertain.</p>
                            </div>
                            <div class="realm-portal" data-realm="fortune">
                                <div class="realm-icon">🥠</div>
                                <h3 class="realm-title" data-translate-id="sanctuary_realm_fortune">A Game of Fortune</h3>
                                <p class="realm-description">Test your luck with the cosmos.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="sanctuary-realms-view" class="sanctuary-view">
                <!-- Realm content will be dynamically inserted here -->
            </div>
        </div>
    </div>
    `;
}

function getRealmHTML(realmId) {
    switch (realmId) {
        case 'comfort':
            return `
            <section id="comfortRealm" class="realm active">
                <div class="content-container section-container">
                    <button class="back-to-hub-btn btn" data-action="returnToHub">← Back to Sanctum Hub</button>
                    <h2 class="section-title">✧ The Realm of Comfort ✧</h2>
                    <p class="realm-subheader">"When sadness weighs heavy, these portals and texts open to ease your burden"</p>
                    
                    <div class="book-shelf">
                        <div class="sacred-scroll" data-action="readBook" data-type="solace" data-title="Scrolls of Solace" data-content="My Dearest Zoya, let these words be a sanctuary for your heart. Remember when we were two 'forlorn birds in a foreign land'? No matter how lonely the world feels, you are not alone. I'm here, and my heart is your home. When you feel down, remember that I will always see the incredible, beautiful you. The world saw a boy with a book; you saw me. Let my love be like the blanket that covers you when you sleep, chasing away all the worries and pains, just like in the goodnight message I sent. You are the girl with hair like 'strands of heaven'. Let me gently stroke your hair until all your sadness melts away. I love you.">
                            <div class="scroll-icon">📜</div>
                            <div class="scroll-text">
                                <h3>Scrolls of Solace</h3>
                                <p>Words to heal the weary heart</p>
                            </div>
                        </div>
                        <div class="sacred-scroll" data-action="readBook" data-type="miracles" data-title="The Grimoire of Daily Miracles" data-content="This tome does not contain grand sorceries, but the most potent magic of all: the small, everyday miracles of our life together. It's the miracle of a broken bicycle leading to a fixed heart. The miracle of a shared chicken steak tasting like destiny. The miracle of a typhoon failing to keep us apart. The miracle of a simple 'hi' on Facebook changing our entire universe. These are the true spells that bind us, more powerful than any incantation.">
                             <div class="scroll-icon">✨</div>
                             <div class="scroll-text">
                                 <h3>The Grimoire of Daily Miracles</h3>
                                 <p>Finding magic in everyday moments</p>
                             </div>
                        </div>
                    </div>
                    
                    <div class="realm-grid">
                        <div class="realm-portal" data-action="revealDynamic" data-category="comfort" data-icon="🫂" data-title="Warmth & Presence">
                            <div class="realm-icon">🫂</div>
                            <h3 class="realm-title">Warmth & Presence</h3>
                        </div>
                        <div class="realm-portal" data-action="revealDynamic" data-category="sweet" data-icon="🍰" data-title="Sweet Solace">
                            <div class="realm-icon">🍰</div>
                            <h3 class="realm-title">Sweet Comfort</h3>
                        </div>
                        <div class="realm-portal" data-action="revealDynamic" data-category="pamper" data-icon="🌸" data-title="Sacred Restoration">
                            <div class="realm-icon">🌸</div>
                            <h3 class="realm-title">Rejuvenation</h3>
                        </div>
                        <div class="realm-portal" data-action="revealDynamic" data-category="qualityTime" data-icon="⏳" data-title="Timeless Together">
                            <div class="realm-icon">⏳</div>
                            <h3 class="realm-title">Quality Time</h3>
                        </div>
                    </div>
                </div>
            </section>`;
        case 'celebrate':
            return `
            <section id="celebrateRealm" class="realm active">
                <div class="content-container section-container">
                    <button class="back-to-hub-btn btn" data-action="returnToHub">← Back to Sanctum Hub</button>
                    <h2 class="section-title">✧ The Realm of Triumph ✧</h2>
                    <p class="realm-subheader">"Your achievements deserve cosmic celebration"</p>
                    
                    <div class="realm-grid">
                        <div class="realm-portal" data-action="revealDynamic" data-category="dinner" data-icon="🎉" data-title="Victory Feast">
                            <div class="realm-icon">🎉</div>
                            <h3 class="realm-title">Celebration Dinner</h3>
                        </div>
                        <div class="realm-portal" data-action="revealDynamic" data-category="shopping" data-icon="✨" data-title="Reward of Stars">
                            <div class="realm-icon">✨</div>
                            <h3 class="realm-title">Material Reward</h3>
                        </div>
                        <div class="realm-portal" data-action="revealDynamic" data-category="adventure" data-icon="🗺️" data-title="Victory Quest">
                            <div class="realm-icon">🗺️</div>
                            <h3 class="realm-title">Adventure Reward</h3>
                        </div>
                        <div class="realm-portal" data-action="revealDynamic" data-category="queen" data-icon="👑" data-title="Day of Glory">
                            <div class="realm-icon">👑</div>
                            <h3 class="realm-title">Total Authority</h3>
                        </div>
                    </div>
                </div>
            </section>`;
        case 'hurt':
            return `
            <section id="hurtRealm" class="realm active">
                <div class="content-container section-container">
                    <button class="back-to-hub-btn btn" data-action="returnToHub">← Back to Sanctum Hub</button>
                    <h2 class="section-title">✧ The Realm of Healing ✧</h2>
                    <p class="realm-subheader">"When wrongs must be righted, these pathways and rituals open"</p>
                    
                    <div class="realm-grid">
                        <div class="realm-portal" data-action="revealDynamic" data-category="apology" data-icon="🔮" data-title="The Sacred Apology">
                            <div class="realm-icon">🔮</div>
                            <h3 class="realm-title">Truth & Apology</h3>
                        </div>
                        <div class="realm-portal" data-action="revealDynamic" data-category="amends" data-icon="💝" data-title="Making Amends">
                            <div class="realm-icon">💝</div>
                            <h3 class="realm-title">Making Amends</h3>
                        </div>
                        <div class="realm-portal" data-action="revealDynamic" data-category="burden" data-icon="⚡" data-title="Lifting Your Load">
                            <div class="realm-icon">⚡</div>
                            <h3 class="realm-title">Lifting Your Load</h3>
                        </div>
                        <div class="realm-portal" data-action="revealBlessing" data-icon="🌟" data-title="The Ultimate Wish" data-content="Anything. Whatever you need to feel whole again. No limits, no restrictions...">
                            <div class="realm-icon">🌟</div>
                            <h3 class="realm-title">Cosmic Restoration</h3>
                        </div>
                    </div>
                    
                    <div class="ritual-altar">
                        <p class="ritual-instructions">Light each of the seven sacred candles to complete the ancient ritual...</p>
                        <div class="candles">
                            <div class="candle" data-action="lightCandle"></div>
                            <div class="candle" data-action="lightCandle"></div>
                            <div class="candle" data-action="lightCandle"></div>
                            <div class="candle" data-action="lightCandle"></div>
                            <div class="candle" data-action="lightCandle"></div>
                            <div class="candle" data-action="lightCandle"></div>
                            <div class="candle" data-action="lightCandle"></div>
                        </div>
                        <p class="ritual-complete" id="ritualComplete">
                            ✧ The Ritual is Complete ✧<br>
                            All is forgiven, all is renewed, all is well.
                        </p>
                    </div>
                </div>
            </section>`;
        case 'guidance':
            return `
            <section id="guidanceRealm" class="realm active">
                <div class="content-container section-container">
                    <button class="back-to-hub-btn btn" data-action="returnToHub">← Back to Sanctum Hub</button>
                    <h2 class="section-title">✧ The Realm of Guidance ✧</h2>
                    <p class="realm-subheader">"Wisdom flows through ancient channels to guide your path"</p>
                    
                    <div class="oracle-chamber">
                        <div class="crystal-ball" data-action="revealWisdom"></div>
                        <p class="oracle-prompt">Click the crystal to receive guidance from the cosmos</p>
                        <p class="oracle-text" id="oracleText">The oracle awaits your question...</p>
                    </div>
                    
                    <div class="astral-map">
                        <h3 class="astral-map-title">The Constellation of Our Love</h3>
                        <div id="constellationCanvas" class="constellation-canvas"></div>
                    </div>
                </div>
            </section>`;
        case 'fortune':
            return `
            <section id="fortuneRealm" class="realm active">
                <div class="content-container section-container">
                    <button class="back-to-hub-btn btn" data-action="returnToHub">← Back to Sanctum Hub</button>
                    <h2 class="section-title">✧ The Realm of Fortune ✧</h2>
                    <p class="realm-subheader">"Scratch the cosmic tablet to reveal your fate. Will the stars align in your favor?"</p>
                    
                    <div class="scratch-card-container">
                        <div id="prizeDiv" class="prize-div">
                            <h3 id="prizeTitle" class="prize-title"></h3>
                            <p id="prizeDescription" class="prize-description"></p>
                        </div>
                        <canvas id="scratchCanvas" class="scratch-canvas"></canvas>
                    </div>
                    
                    <div class="realm-actions" style="text-align: center; margin-top: 2rem;">
                        <button class="btn primary" data-action="initScratch">Play Again</button>
                    </div>
                </div>
            </section>`;
        default:
            return `<p>Error: Realm not found.</p><button class="back-to-hub-btn btn" data-action="returnToHub">← Back</button>`;
    }
}

// --- Enhanced Module-Specific Logic ---

function switchSanctuaryView(viewIdToShow) {
    panelContainer.querySelectorAll('.sanctuary-view').forEach(view => {
        view.classList.remove('active');
    });
    const viewToShow = document.getElementById(viewIdToShow);
    if (viewToShow) {
        viewToShow.classList.add('active');
        // Add entrance animation
        viewToShow.style.animation = 'none';
        setTimeout(() => {
            viewToShow.style.animation = 'bounce-in 0.8s ease-out';
        }, 10);
    }
}

function showRealm(realmId) {
    const realmContainer = $('sanctuary-realms-view');
    realmContainer.innerHTML = getRealmHTML(realmId);
    switchSanctuaryView('sanctuary-realms-view');
    
    // Initialize realm-specific JS
    if (realmId === 'guidance') {
        createEnhancedConstellation();
        // Add pulsing effect to crystal ball
        const crystalBall = $('.crystal-ball');
        if (crystalBall) {
            crystalBall.style.animation = 'portal-pulse 3s infinite';
        }
    }
    if (realmId === 'fortune') initScratchCard();
    if (realmId === 'hurt') resetCandles(); // Ensure candles are reset when entering hurt realm
}

function returnToHub() {
    switchSanctuaryView('sanctuary-hub');
    const realmContainer = $('sanctuary-realms-view');
    realmContainer.innerHTML = ''; // Clear old realm content
}

function revealBlessing(icon, title, message) {
    $('modalIcon').textContent = icon;
    $('modalTitle').textContent = title;
    $('modalMessage').innerHTML = message;
    
    // Add entrance effect to modal
    const modal = $('blessingModal');
    modal.classList.add('active');
    modal.style.animation = 'bounce-in 0.6s ease-out';
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
    
    // Add entrance effect to modal
    const modal = $('bookModal');
    modal.classList.add('active');
    modal.style.animation = 'bounce-in 0.6s ease-out';
}

function closeModal(modalId) { 
    const modal = $(modalId);
    modal.style.animation = 'fade-out 0.5s ease-out';
    setTimeout(() => {
        modal.classList.remove('active');
        modal.style.animation = '';
    }, 500);
}

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
    
    // Add shimmer effect to crystal ball when revealing wisdom
    const crystalBall = $('.crystal-ball');
    if (crystalBall) {
        crystalBall.style.animation = 'portal-pulse 0.5s ease-in-out 3';
    }
    
    oracleText.style.opacity = '0';
    setTimeout(() => {
        oracleText.textContent = wisdom;
        oracleText.style.transition = 'opacity 1s';
        oracleText.style.opacity = '1';
    }, 500);
}

function createEnhancedConstellation() {
    const canvas = $('constellationCanvas');
    if (!canvas) return;
    
    canvas.innerHTML = '';
    constellationPoints = [];
    constellationLines = [];
    
    const memories = [
        { text: "The First Smile", x: 15, y: 20 }, 
        { text: "First Laugh Together", x: 35, y: 15 },
        { text: "That Perfect Day", x: 55, y: 25 }, 
        { text: "When I Knew", x: 70, y: 20 },
        { text: "Your Favorite Moment", x: 85, y: 30 }, 
        { text: "Our Inside Joke", x: 25, y: 50 },
        { text: "The Comfort We Share", x: 45, y: 55 }, 
        { text: "Dancing in the Kitchen", x: 65, y: 60 },
        { text: "Late Night Talks", x: 80, y: 55 }, 
        { text: "Future Adventures", x: 20, y: 80 },
        { text: "Forever Promise", x: 50, y: 85 }, 
        { text: "Every Day After", x: 75, y: 75 }
    ];
    
    // Create points
    memories.forEach(memory => {
        const point = document.createElement('div');
        point.className = 'astral-point';
        point.style.left = memory.x + '%';
        point.style.top = memory.y + '%';
        point.title = memory.text;
        point.dataset.text = memory.text;
        
        // Add click effect
        point.addEventListener('click', function() {
            const oracleText = $('oracleText');
            oracleText.textContent = `"${memory.text}" - A cherished memory in our constellation`;
            oracleText.style.animation = 'none';
            setTimeout(() => {
                oracleText.style.animation = 'sanctuary-glow 2s';
            }, 10);
        });
        
        canvas.appendChild(point);
        constellationPoints.push({
            element: point,
            x: memory.x,
            y: memory.y
        });
    });
    
    // Create connections between points (simplified)
    createConstellationLines();
}

function createConstellationLines() {
    const canvas = $('constellationCanvas');
    
    // Simple algorithm to connect nearby points
    for (let i = 0; i < constellationPoints.length; i++) {
        for (let j = i + 1; j < constellationPoints.length; j++) {
            const pointA = constellationPoints[i];
            const pointB = constellationPoints[j];
            
            // Calculate distance
            const dx = pointA.x - pointB.x;
            const dy = pointA.y - pointB.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Connect points that are close enough
            if (distance < 40) {
                const line = document.createElement('div');
                line.className = 'astral-line';
                
                // Calculate line properties
                const length = distance;
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                
                line.style.width = length + '%';
                line.style.left = pointA.x + '%';
                line.style.top = pointA.y + '%';
                line.style.transform = `rotate(${angle}deg)`;
                
                canvas.appendChild(line);
                constellationLines.push(line);
            }
        }
    }
}

function lightCandle(candle) {
    if (!candle.classList.contains('lit')) {
        // Add lighting animation
        candle.style.animation = 'bounce-in 0.5s ease-out';
        
        setTimeout(() => {
            candle.classList.add('lit');
            litCandles++;
            
            // Play subtle sound effect if available
            if (typeof window.playSound === 'function') {
                window.playSound('candle');
            }
            
            if (litCandles === totalCandles) {
                $('ritualComplete').style.display = 'block';
                $('ritualComplete').style.animation = 'bounce-in 0.8s ease-out';
                
                setTimeout(() => {
                    revealBlessing('◈', 'The Ritual is Complete', 'Ancient forces smile upon you. Harmony has been restored. All is forgiven, all is renewed, all is well.');
                    setTimeout(resetCandles, 2000);
                }, 1500);
            }
        }, 300);
    }
}

function resetCandles() {
    $$('#sanctuary-panel .candle.lit').forEach(c => {
        c.classList.remove('lit');
        c.style.animation = '';
    });
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

function initScratchCard() {
    const isWin = Math.random() < 0.1; // 10% win chance
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
    
    // Create more elaborate scratch card design
    const gradient = scratchCtx.createLinearGradient(0, 0, scratchCanvas.width, scratchCanvas.height);
    gradient.addColorStop(0, '#d4af37');
    gradient.addColorStop(0.5, '#ffd700');
    gradient.addColorStop(1, '#f0e68c');
    
    scratchCtx.fillStyle = gradient;
    scratchCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
    
    // Add decorative elements
    scratchCtx.fillStyle = 'rgba(74, 44, 15, 0.3)';
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * scratchCanvas.width;
        const y = Math.random() * scratchCanvas.height;
        const radius = Math.random() * 3 + 1;
        scratchCtx.beginPath();
        scratchCtx.arc(x, y, radius, 0, Math.PI * 2);
        scratchCtx.fill();
    }
    
    // Add text
    scratchCtx.fillStyle = '#4a2c0f';
    scratchCtx.font = 'bold 24px Cinzel';
    scratchCtx.textAlign = 'center';
    scratchCtx.textBaseline = 'middle';
    scratchCtx.fillText('Scratch to Reveal', scratchCanvas.width / 2, scratchCanvas.height / 2);
    
    scratchCtx.font = '16px Cinzel';
    scratchCtx.fillText('Your cosmic fortune awaits...', scratchCanvas.width / 2, scratchCanvas.height / 2 + 30);
    
    let isDrawing = false;
    let isScratched = false;
    
    const start = (e) => { 
        e.preventDefault(); 
        isDrawing = true; 
        if (!isScratched) {
            scratch(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
        }
    };
    
    const end = (e) => { 
        e.preventDefault(); 
        isDrawing = false; 
        
        // Check if enough is scratched to reveal
        if (!isScratched) {
            checkScratchCompletion();
        }
    };
    
    const draw = (e) => {
        if (!isDrawing || isScratched) return;
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
    if (!scratchCtx || isScratched) return;
    
    scratchCtx.globalCompositeOperation = 'destination-out';
    scratchCtx.beginPath();
    scratchCtx.arc(x, y, 25, 0, Math.PI * 2, true);
    scratchCtx.fill();
}

function checkScratchCompletion() {
    // Simplified completion check - in a real implementation you'd analyze pixel data
    setTimeout(() => {
        isScratched = true;
        // Add celebration effect for wins
        const prizeTitle = $('prizeTitle').textContent;
        if (!prizeTitle.includes('Whisper from the Void')) {
            $('prizeDiv').style.animation = 'sanctuary-glow 2s infinite';
        }
    }, 100);
}

// --- Enhanced Riddle & Threshold Logic ---
let hasAttempted = false;

function typewriter(element, text, callback) {
    if (!element) return;
    
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
    $('sanctuary-main-container').style.display = 'none';
    
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
    
    // Add interactive elements to the failure screen
    setTimeout(() => {
        const skulls = failureOverlay.querySelectorAll('.failure-skulls span');
        skulls.forEach((skull, index) => {
            setTimeout(() => {
                skull.style.animation = 'skull-wobble 0.5s ease-in-out';
                setTimeout(() => {
                    skull.style.animation = '';
                }, 500);
            }, index * 300);
        });
    }, 1000);
}

function handleCorrectAnswer() {
    $('sanctuary-riddle').style.display = 'none';
    $('typing-text').style.display = 'none';
    
    const doorAnimationView = document.getElementById('sanctuary-entrance-animation');
    switchSanctuaryView('sanctuary-entrance-animation');
    
    // Add celebration effects
    doorAnimationView.classList.add('is-opening');
    
    // Play success sound if available
    if (typeof window.playSound === 'function') {
        window.playSound('success');
    }
    
    setTimeout(() => switchSanctuaryView('sanctuary-hub'), 2000);
}

function checkAnswer(isPassword = false, value = '') {
    if (hasAttempted) return;
    
    if (AppState.passwordsTemporarilyBypassed) {
        $('riddle-feedback').textContent = "The gates sense a special alignment. Entry granted.";
        $('riddle-feedback').style.color = 'var(--jade)';
        $('riddle-feedback').style.display = 'block';
        setTimeout(handleCorrectAnswer, 800);
        return;
    }

    const correctPassword = "nini";
    const correctFood = "tomato ramen";
    let isCorrect = isPassword ? value.toLowerCase().trim() === correctPassword : value.toLowerCase().trim() === correctFood;

    if (isCorrect) {
        $('riddle-feedback').textContent = "The Sanctum recognizes you... The way is opened.";
        $('riddle-feedback').style.color = 'var(--jade)';
        $('riddle-feedback').style.animation = 'sanctuary-glow 1s infinite';
        setTimeout(handleCorrectAnswer, 1000);
    } else {
        const failureMessagePairs = [
            { left: "A chilling void answers your call...", right: "The path is not merely closed..." },
            { left: "Your whisper is a scream...", right: "You are not welcome here..." },
            { left: "The guardians of this realm stir...", right: "And casts you out into the cold..." },
            { left: "You speak a word of profane ignorance...", right: "There is no comfort for you here..." }
        ];
        const chosenMessages = failureMessagePairs[Math.floor(Math.random() * failureMessagePairs.length)];
        showClosedDoorFailure(chosenMessages);
    }
    $('riddle-feedback').style.display = 'block';
}

function handleSanctuaryClicks(e) {
    const target = e.target;
    const actionElement = target.closest('[data-action]');
    const action = actionElement?.dataset.action;
    
    if (action) {
        e.stopPropagation();
        
        switch (action) {
            case 'returnToHub': 
                returnToHub(); 
                break;
            case 'readBook': 
                readBook(actionElement.dataset.type, actionElement.dataset.title, actionElement.dataset.content); 
                break;
            case 'revealDynamic': 
                revealDynamicBlessing(actionElement.dataset.category, actionElement.dataset.icon, actionElement.dataset.title); 
                break;
            case 'revealBlessing': 
                revealBlessing(actionElement.dataset.icon, actionElement.dataset.title, actionElement.dataset.content); 
                break;
            case 'revealWisdom': 
                revealWisdom(); 
                break;
            case 'lightCandle': 
                lightCandle(actionElement); 
                break;
            case 'initScratch': 
                initScratchCard(); 
                break;
        }
    }
    
    // Portal hub clicks (using data-realm)
    const portal = target.closest('.realm-portal[data-realm]');
    if (portal) {
        e.stopPropagation();
        showRealm(portal.dataset.realm);
        
        // Add portal transition effect
        portal.style.animation = 'bounce-in 0.6s ease-out';
        setTimeout(() => {
            portal.style.animation = '';
        }, 600);
    }
}

// --- Enhanced Public Module Functions ---

/**
 * Renders the Sanctuary panel into the main content area.
 * @param {HTMLElement} mainContent - The element to render content into.
 */
export function render(mainContent) {
    panelContainer = mainContent;
    panelContainer.innerHTML = getSanctuaryPanelHTML();
    hasAttempted = false; // Reset failure state
    
    // Attach event listeners for the panel
    panelContainer.addEventListener('click', handleSanctuaryClicks);
    
    // Enhanced riddle input with visual feedback
    const riddlePassword = $('riddle-password');
    if (riddlePassword) {
        riddlePassword.addEventListener('keypress', (e) => { 
            if (e.key === 'Enter') checkAnswer(true, e.target.value); 
        });
        
        riddlePassword.addEventListener('input', (e) => {
            if (e.target.value.length > 0) {
                e.target.style.boxShadow = '0 0 10px rgba(138, 43, 226, 0.5)';
            } else {
                e.target.style.boxShadow = '';
            }
        });
    }
    
    // Enhanced choice buttons
    $$('.riddle-choice-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            // Add visual feedback
            e.target.style.animation = 'bounce-in 0.3s ease-out';
            setTimeout(() => {
                e.target.style.animation = '';
            }, 300);
            
            checkAnswer(false, button.dataset.answer);
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
            button.style.boxShadow = '';
        });
    });

    // --- FIX: Add listeners for modal close buttons ---
    const acceptBlessingBtn = $('accept-blessing-btn');
    if (acceptBlessingBtn) {
        acceptBlessingBtn.addEventListener('click', () => closeModal('blessingModal'));
    }
    const closeTomeBtn = $('close-tome-btn');
    if (closeTomeBtn) {
        closeTomeBtn.addEventListener('click', () => closeModal('bookModal'));
    }

    // Make modal functions globally accessible
    window.closeModal = closeModal;
    
    // Check for bypass
    if (AppState.passwordsTemporarilyBypassed) {
        switchSanctuaryView('sanctuary-hub');
    } else {
        // Start typing intro with enhanced effects
        const typeTextElement = document.getElementById('typing-text');
        const riddleElement = document.getElementById('sanctuary-riddle');
        const textToType = `Halt, traveler... You approach a sacred space, woven from stardust and memory... This Inner Sanctum was forged by Nicholas... a celestial architect who shaped this reality to comfort his beloved, Zoya... Only she may enter freely...`;
        
        switchSanctuaryView('sanctuary-threshold');
        typewriter(typeTextElement, textToType, () => { 
            if (riddleElement) {
                riddleElement.style.display = 'block';
                riddleElement.style.animation = 'bounce-in 0.8s ease-out';
            }
            // --- ENHANCEMENT: Show the poetry box along with the riddle ---
            const poetryBox = document.querySelector('#sanctuary-threshold .chinese-poetry-box');
            if (poetryBox) {
                poetryBox.style.display = 'block';
                // Add a slight delay to the animation to appear after the riddle
                poetryBox.style.animation = 'bounce-in 0.8s ease-out 0.3s forwards';
                poetryBox.style.animationFillMode = 'forwards'; // Ensure it stays visible
            }
        });
    }
}

/**
 * Cleans up intervals and event listeners when the panel is unloaded.
 */
export function cleanup() {
    if (panelContainer) {
        panelContainer.removeEventListener('click', handleSanctuaryClicks);
    }
    
    // Clean up global modal function
    delete window.closeModal;
    
    // Remove any failure overlay
    const failureOverlay = document.getElementById('sanctuary-failure-overlay');
    if (failureOverlay) {
        failureOverlay.remove();
    }
    
    panelContainer = null;
    litCandles = 0;
    scratchCtx = null;
    constellationPoints = [];
    constellationLines = [];
}
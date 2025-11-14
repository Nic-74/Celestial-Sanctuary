// ===================================================================
//  MODULE: GUIDE (js/modules/guide.js) - CREATIVE ENTRANCE UPDATE
// ===================================================================

import {
    $, $$, DOM, AppState, EDITABLE_CONFIG, CHRONICLE_DATA, GUIDE_RIDDLES,
    findImageWithExtension, THEME_COLORS, THEME_STAR_SHAPES
} from '../common.js';

// --- Local State ---
let panelContainer = null;
let observatoryAnimationFrameId = null; // To cancel the 3D animation
let currentRiddleIndex = 0;
let riddleAttempts = 0;
let ambientAudio = null;
let soundEnabled = false;

// Add to AppState for progress tracking
if (!AppState.guideProgress) {
    AppState.guideProgress = {
        visitedSections: new Set(),
        completionPercentage: 0
    };
}

// ===================================================================
//  HTML TEMPLATES
// ===================================================================

/** The main shell for the entire Guide panel, including all views. */
function getGuidePanelHTML() {
    // This is the main shell for the Guide panel
    return `
    <div id="guide-panel" class="guide-panel-styles">
        <div id="guide-main-container">

            <div id="guide-threshold" class="sanctuary-view active">
                
                <div class="astral-gate-container">
                    <div class="astral-gate">
                        <span class="gate-rune" style="--i:0;">✧</span>
                        <span class="gate-rune" style="--i:1;">✨</span>
                        <span class="gate-rune" style="--i:2;">۞</span>
                        <span class="gate-rune" style="--i:3;">✦</span>
                        <span class="gate-rune" style="--i:4;">✵</span>
                        <span class="gate-rune" style="--i:5;">·</span>
                        
                        <div class="gate-core">
                            <div class="gate-content">
                                <h2 class="gate-title">The Astral Library</h2>
                                <p id="guide-typing-text" class="gate-subtitle"></p>
                                
                                <div id="gate-keyhole-container">
                                    </div>
                                
                                <div id="guide-riddle-container" class="sanctuary-riddle" style="display: none;">
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            
            <div id="guide-entrance-animation" class="sanctuary-view">
                 <img src="photos/open_nebula.png" class="door-image" alt="Astral Library Door opening">
            </div>

            <div id="guide-hub" class="sanctuary-view sanctuary-hub-view">
                <div class="content-container section-container">
                    <header class="header" data-translate-id="guide_title">
                        <div class="ancient-seal"></div>
                        <h1 class="title" data-translate-id="guide_hub_title">
                            ✧ Astral Library ✧
                            <span class="subtitle" data-translate-id="guide_hub_subtitle">Where the Constellations of Your Story Reside</span>
                            <span class="ancient-text">~ Cataloged by the Celestial Architects ~</span>
                        </h1>
                    </header>
                    <h2 class="section-title" data-translate-id="guide_hub_prompt">Choose a Wing to Explore</h2>
                    <div class="portal-grid-layout">
                        <div class="realm-portal" data-section="observatory">
                            <div class="realm-icon">🔭</div><h3 class="realm-title" data-translate-id="guide_wing_observatory">Cosmic Observatory</h3>
                            <div class="portal-preview">
                                <div class="preview-title">Cosmic Observatory</div>
                                <div class="preview-description">View a 3D map of our memories and explore the galaxy of our relationship.</div>
                            </div>
                        </div>
                        <div class="realm-portal" data-section="physics">
                            <div class="realm-icon">⚛️</div><h3 class="realm-title" data-translate-id="guide_wing_physics">Relational Physics</h3>
                            <div class="portal-preview">
                                <div class="preview-title">Physics of Us</div>
                                <div class="preview-description">Mathematical proof of infinite love through interactive equations.</div>
                            </div>
                        </div>
                        <div class="realm-portal" data-section="anatomy">
                            <div class="realm-icon">🫀</div><h3 class="realm-title" data-translate-id="guide_wing_anatomy">Anatomy of Us</h3>
                            <div class="portal-preview">
                                <div class="preview-title">Anatomy of Us</div>
                                <div class="preview-description">Explore the components that make us 'Us' in this interactive diagram.</div>
                            </div>
                        </div>
                        <div class="portal-span-3">
                            <div class="realm-portal" data-section="artifacts">
                                <div class="realm-icon">📿</div><h3 class="realm-title" data-translate-id="guide_wing_artifacts">Sacred Artifacts</h3>
                                <div class="portal-preview">
                                    <div class="preview-title">Sacred Artifacts</div>
                                    <div class="preview-description">A sacred gallery of objects and memories that tell our story.</div>
                                </div>
                            </div>
                            <div class="realm-portal" data-section="lexicon">
                                <div class="realm-icon">📖</div><h3 class="realm-title" data-translate-id="guide_wing_lexicon">Our Language</h3>
                                <div class="portal-preview">
                                    <div class="preview-title">Our Language</div>
                                    <div class="preview-description">Discover the unique words and phrases that define our shared language.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button id="ambient-sound-toggle" class="sound-orb" title="Toggle Ambient Sounds">
                        <span class="sound-icon">🔇</span>
                    </button>
                </div>
            </div>

            <div id="guide-sections-view" class="sanctuary-view">
            </div>
        </div>
    </div>
    `;
}

/** Returns the complete HTML for a specific section wing. */
function getSectionHTML(sectionId) {
    const backButton = `<button class="btn" id="guide-back-to-hub-btn" style="margin-bottom: 2rem;">← Back to Library Hub</button>`;
    let content = '';

    switch(sectionId) {
        case 'observatory': 
            return getObservatorySectionHTML(); // Observatory is full-screen and has its own back button
        case 'physics': 
            content = getPhysicsSectionHTML(); 
            break;
        case 'anatomy': 
            content = getAnatomySectionHTML(); 
            break;
        case 'artifacts': 
            content = getArtifactsSectionHTML(); 
            break;
        case 'lexicon': 
            content = getLexiconSectionHTML(); 
            break;
        default: 
            content = '<p>Section not found.</p>';
    }

    // Wrap content sections in the standard container
    return `
    <div class="content-container section-container">
        ${backButton}
        ${content}
    </div>`;
}

// --- Individual Section HTML Generators (Complete) ---

function getObservatorySectionHTML() {
    return `
    <div id="tab-observatory">
        <div id="loading">
            <div class="loader">Initializing Cosmic Observatory...<br><small style="font-size: 12px; margin-top: 10px; display: block; opacity: 0.7;">Calibrating telescope...</small></div>
        </div>
        <div id="canvas-container"></div>
        <div id="telescope-frame">
            <img src="photos/telescope.jpg" alt="Telescope" id="telescope-image">
        </div>
        <div id="controls">
            <h3>OBSERVATORY</h3>
            <div class="control-section">
                <span class="control-label">Navigation</span>
                <div class="control-grid">
                    <button class="control-btn" disabled></button>
                    <button class="control-btn" id="btn-up" title="Pan Up">↑</button>
                    <button class="control-btn" disabled></button>
                    <button class="control-btn" id="btn-left" title="Pan Left">←</button>
                    <button class="control-btn" id="btn-reset" title="Reset View">⊙</button>
                    <button class="control-btn" id="btn-right" title="Pan Right">→</button>
                    <button class="control-btn" disabled></button>
                    <button class="control-btn" id="btn-down" title="Pan Down">↓</button>
                    <button class="control-btn" disabled></button>
                </div>
            </div>
            <div class="control-section">
                <span class="control-label">Zoom Level</span>
                <input type="range" id="zoom-slider" min="10" max="3000" value="1200" step="10">
            </div>
            <div class="control-section">
                <span class="control-label">Galaxy Rotation</span>
                <input type="range" id="rotation-slider" min="0" max="200" value="1" step="1">
            </div>
            <div class="control-section hud-info">
                <div><span class="hud-label">STARS:</span><span class="hud-value" id="star-count">350,000</span></div>
                <div><span class="hud-label">MEMORIES:</span><span class="hud-value" id="memory-count">10</span></div>
                <div><span class="hud-label">ZOOM:</span><span class="hud-value" id="zoom-level">1200</span></div>
            </div>
        </div>
        <div id="story-modal" class="modal"> 
            <div class="modal-content">
                <button class="close-btn" id="story-close-btn">×</button>
                <h2 id="story-title"></h2>
                <div class="story-date" id="story-date"></div>
                <div class="story-content" id="story-text"></div>
            </div>
        </div>
        <button class="btn back-button" id="observatory-back-btn">
            ← Back to Library
        </button>
    </div>
    `;
}

function getPhysicsSectionHTML() {
    return `
    <div class="holo-pane active" id="tab-physics">
        <div class="love-calculator-container">
            <h3 class="calc-title">RELATIONAL PHYSICS ANALYSIS // N.Z. v.1.0</h3>
            <p class="calc-subtitle">"Proving our love through mathematics" - By Nic, the mathematician who fell in love with more than just numbers.</p>
            <div class="calc-section" style="grid-column: 1 / -1;">
                <h4 class="calc-sub-header">THE GRAND UNIFIED THEORY OF US</h4>
                <div class="calc-formula-box">
                    <div class="calc-formula">L<sub>∞</sub> = <frac><span class="numerator">(N ⊗ Z)<sup>∞</sup></span><span class="denominator">d<sup>0</sup></span></frac> × Σ(moments) × e<sup>time</sup></div>
                    <ul class="calc-formula-vars">
                        <li>L∞ = Infinite Love (our constant)</li><li>N = Nicholas (mathematician)</li><li>Z = Zoya (the artist)</li><li>⊗ = Tensor product (deep connection)</li><li>d = Distance (approaches 0)</li><li>Σ(moments) = Sum of shared memories</li><li>e^(time) = Exponential growth</li>
                    </ul>
                    <hr class="calc-divider"><div class="calc-result" id="live-data-result">Current Value: L∞ = ∞ (As predicted by the equation)</div>
                </div>
                <div class="calc-nav"><span>Navigate:</span> <a href="#comp-analysis">Compatibility Matrix</a> | <a href="#love-timeline">Trajectory</a> | <a href="#love-theorems">Axioms</a> | <a href="#love-probability">Quantum Probability</a></div>
            </div>
            
            <div class="calc-section interactive-calc">
                <h4 class="calc-sub-header">🎛️ LOVE STRENGTH SIMULATOR</h4>
                <p class="calc-subtitle" style="font-size: 0.8rem; margin-bottom: 1rem;">Adjust the core variables of our universe and observe the exponential growth of our connection.</p>
                <div class="slider-control"><label for="memories-slider">Σ(moments) - Shared Memories</label><input type="range" id="memories-slider" min="1" max="1000" value="500" class="love-slider"></div>
                <div class="slider-control"><label for="time-slider">e<sup>time</sup> - Time Together</label><input type="range" id="time-slider" min="1" max="100" value="50" class="love-slider"></div>
                <div class="interactive-result-box"><div class="result-label">CALCULATED LOVE STRENGTH:</div><div class="result-value" id="love-value-display">Calculating...</div><div class="result-sub-label">Approaching Infinity...</div></div>
            </div>

            <div id="comp-analysis" class="calc-section">
                <h4 class="calc-sub-header">🎯 Comprehensive Compatibility Analysis</h4>
                <div class="radar-chart-container"><canvas id="radar-chart"></canvas><div class="radar-center-score">98.7%</div></div>
                <div class="analysis-summary"><div class="summary-item-tech"><strong>STATUS:</strong> <span class="status-ok">STABLE & OPTIMAL</span></div><div class="summary-item-tech"><strong>DATA SOURCE:</strong> Voice Garden sentiment, Time Capsule entries, message frequency, shared memories.</div><div class="summary-item-tech"><strong>ANALYSIS:</strong> Cross-spectrum analysis indicates a resonance match exceeding 98.7th percentile of all known pairings.</div><div class="summary-item-tech"><strong>CONCLUSION:</strong> <span class="status-destined">COSMICALLY DESTINED</span></div></div>
            </div>
            <div id="love-timeline" class="calc-section">
                <h4 class="calc-sub-header">📈 Relationship Trajectory Analysis</h4>
                <div class="trajectory-container">
                    <svg id="trajectory-svg" viewBox="0 0 500 250"><path d="M 50 20 L 50 220 M 50 220 L 480 220" stroke="#8892b0" stroke-width="0.5" stroke-dasharray="2 2"/><text x="40" y="25" fill="#8892b0" font-size="10" text-anchor="end">∞</text><text x="40" y="125" fill="#8892b0" font-size="10" text-anchor="end">100</text><text x="40" y="225" fill="#8892b0" font-size="10" text-anchor="end">0</text><text x="80" y="235" fill="#8892b0" font-size="10" text-anchor="middle">2019</text><text x="200" y="235" fill="#8892b0" font-size="10" text-anchor="middle">2021</text><text x="450" y="235" fill="#8892b0" font-size="10" text-anchor="middle">Now</text><path id="trajectory-path" d="M 50 220 C 100 200, 150 180, 200 120 C 250 60, 300 40, 480 20" stroke="#30d5c8" stroke-width="2" fill="none"/></svg>
                    <div class="trajectory-summary"><div class="summary-item" id="phase-analysis-table"><div class="summary-title">PHASE ANALYSIS</div><div class="summary-detail"><strong>Phase 1 (2019-2021):</strong> Exponential Growth (dL/dt = 2.3/mo)</div><div class="summary-detail"><strong>Phase 2 (2021-2023):</strong> Rapid Ascension (dL/dt = 5.7/mo)</div><div class="summary-detail"><strong>Phase 3 (2023-Now):</strong> Stable Infinity (dL/dt → ∞)</div></div><div class="summary-item" id="prediction-model-summary"><div class="summary-title">PREDICTION MODEL</div><div class="summary-detail">Trajectory approaches infinity asymptotically. Love has no upper bound. <span class="item-check">✓</span></div></div></div>
                </div>
            </div>
            <div id="love-theorems" class="calc-section">
                <h4 class="calc-sub-header">📜 Proven Mathematical Theorems of Love</h4>
                <div class="theorem-grid-tech"><div class="theorem-card-tech"><div class="theorem-title-tech">AXIOM-01: The Bicycle Axiom</div><div class="theorem-equation-tech">P(L|B) / P(L) ≈ e<sup>π</sup></div><div class="theorem-desc-tech">The act of fixing a bicycle (B) increases the probability of love (L) by a factor of approximately e<sup>π</sup>. Confirmed June 2021.</div></div><div class="theorem-card-tech"><div class="theorem-title-tech">AXIOM-02: The Typhoon Determination Law</div><div class="theorem-equation-tech">F<sub>love</sub> > Σ F<sub>natural</sub></div><div class="theorem-desc-tech">The force of love (F<sub>love</sub>) is greater than the sum of all natural disaster forces when properly motivated. Confirmed Aug 10, 2021.</div></div><div class="theorem-card-tech"><div class="theorem-title-tech">CONSTANT-K: Chicken Steak</div><div class="theorem-equation-tech">K<sub>cs</sub> ≈ 47.3 J/u</div><div class="theorem-desc-tech">A universal constant defining joy-units (J) per unit of chicken steak consumed (u). Holds true across all measurements.</div></div></div>
            </div>
            <div id="love-probability" class="calc-section" style="grid-column: 1 / -1;">
                <h4 class="calc-sub-header">🎲 Quantum Probability Analysis</h4>
                <div class="probability-display">
                    <div id="quantum-result-display" style="display:none;">
                        <div class="prob-main-value">100%</div>
                        <div class="prob-label">Probability of Our Souls Finding Each Other</div>
                        <div class="prob-conclusion">♥️ Inevitable.</div>
                    </div>
                    <button class="btn primary" id="calculate-destiny-btn">Calculate Quantum Probability</button>
                </div>
            </div>
            <div class="calc-section" style="grid-column: 1 / -1;">
                <h4 class="calc-sub-header">🌊 Emotional Resonance Waveform</h4><canvas id="waveform-canvas" height="120"></canvas>
                <div class="simulator-controls"><button class="btn" id="introduce-dissonance">Introduce Dissonance</button><button class="btn primary" id="re-harmonize">Re-Harmonize</button></div>
            </div>
        </div>
    </div>
    `;
}

function getAnatomySectionHTML() {
    return `
    <div class="holo-pane active" id="tab-anatomy">
        <h3 class="panel-header">The Anatomy of Our Connection</h3>
        <p class="panel-subheader">A deeper look at what makes us, us. Every part plays a role in our cosmic dance.</p>
        <div class="anatomy-visualization">
            <div class="anatomy-profiles">
                <div class="anatomy-profile" data-person="nic">
                    <div class="profile-avatar"><div class="avatar-circle"><span class="avatar-initial">N</span></div><div class="avatar-glow"></div></div><h4>Nicholas</h4><p class="profile-subtitle">The Mathematician's Heart</p>
                    <div class="anatomy-points-list"><div class="anatomy-point-enhanced" data-desc="A mind that finds beauty in equations and patterns, now learning to see beauty in the unpredictable magic of love."><span class="point-icon">🧠</span><span class="point-label">Analytical Mind</span></div><div class="anatomy-point-enhanced" data-desc="Once guarded and careful, now open and vulnerable. A heart that beats in rhythm with yours."><span class="point-icon">❤️</span><span class="point-label">Devoted Heart</span></div><div class="anatomy-point-enhanced" data-desc="Hands that can solve complex problems and fix bicycles, but most importantly, hold yours with infinite gentleness."><span class="point-icon">🤲</span><span class="point-label">Steady Hands</span></div><div class="anatomy-point-enhanced" data-desc="The deep, husky voice that first caught your attention - now speaks only words of love and understanding."><span class="point-icon">🗣️</span><span class="point-label">Resonant Voice</span></div><div class="anatomy-point-enhanced" data-desc="A spirit that traveled far from home and found its true home in you."><span class="point-icon">✨</span><span class="point-label">Wandering Soul</span></div></div>
                </div>
                <div class="connection-bridge"><div class="bridge-line"></div><div class="bridge-heart">💕</div><div class="bridge-particles"><span>✨</span><span>💫</span><span>⭐</span></div></div>
                <div class="anatomy-profile" data-person="zoya">
                    <div class="profile-avatar"><div class="avatar-circle"><span class="avatar-initial">Z</span></div><div class="avatar-glow"></div></div><h4>Zoya</h4><p class="profile-subtitle">The Artist's Grace</p>
                    <div class="anatomy-points-list"><div class="anatomy-point-enhanced" data-desc="A creative mind that sees the world as a canvas of possibilities, painting our story with every moment."><span class="point-icon">🎨</span><span class="point-label">Creative Vision</span></div><div class="anatomy-point-enhanced" data-desc="A heart that is a quiet harbor - offering peace, understanding, and unconditional love in life's storms."><span class="point-icon">💖</span><span class="point-label">Compassionate Heart</span></div><div class="anatomy-point-enhanced" data-desc="Hands that create beautiful art and write the chapters of our story with grace and intention."><span class="point-icon">✍️</span><span class="point-label">Gentle Hands</span></div><div class="anatomy-point-enhanced" data-desc="Eyes like windows to heaven - oval and bright, showing kindness that saw through my shyness to the real me."><span class="point-icon">👁️</span><span class="point-label">Perceptive Eyes</span></div><div class="anatomy-point-enhanced" data-desc="A spirit that bridges cultures and languages, making every place feel like home."><span class="point-icon">🌸</span><span class="point-label">Bridging Spirit</span></div></div>
                </div>
            </div>
        </div>
        <div class="compatibility-meter">
            <h4>Cosmic Compatibility Analysis</h4>
            <div class="compatibility-bars">
                <div class="compatibility-bar-item"><span class="bar-label">Emotional Resonance</span><div class="bar-track"><div class="bar-fill" style="width: 98%;" data-value="98%"></div></div></div>
                <div class="compatibility-bar-item"><span class="bar-label">Intellectual Sync</span><div class="bar-track"><div class="bar-fill" style="width: 95%;" data-value="95%"></div></div></div>
                <div class="compatibility-bar-item"><span class="bar-label">Spiritual Alignment</span><div class="bar-track"><div class="bar-fill" style="width: 99%;" data-value="99%"></div></div></div>
                <div class="compatibility-bar-item"><span class="bar-label">Adventure Compatibility</span><div class="bar-track"><div class="bar-fill" style="width: 92%;" data-value="92%"></div></div></div>
                <div class="compatibility-bar-item"><span class="bar-label">Destiny Quotient</span><div class="bar-track"><div class="bar-fill" style="width: 100%;" data-value="100%"></div></div></div>
            </div>
        </div>
        <div id="anatomy-tooltip-enhanced"></div>
    </div>
    `;
}

function getArtifactsSectionHTML() {
    // The modals are in index.html, so we only need to render the pane
    return `
    <div class="holo-pane active" id="tab-artifacts">
        <h3 class="panel-header">Sacred Artifacts of Our Journey</h3>
        <p class="panel-subheader">Objects that have gained celestial significance through the moments we've shared.</p>
        <div style="text-align: center; margin-bottom: 2rem;"><button class="btn primary" id="add-artifact-btn">✨ Add New Artifact</button></div>
        <div class="artifacts-showcase">
            <div class="artifact-card" data-title="The Mathematics Book" data-story="A shield against loneliness that became a conversation starter. The book I held on September 15, 2019, unknowingly waiting for you to approach and change everything." data-icon="📖"><div class="artifact-icon">📖</div><div class="artifact-name">The Mathematics Book</div><div class="artifact-rarity legendary">★★★★★ Legendary</div></div>
            <div class="artifact-card" data-title="The Broken Bicycle" data-story="Your bicycle that broke in June 2021, giving me the chance to show I cared through action. The first of many times I'd try to fix what was broken in your world." data-icon="🚲"><div class="artifact-icon">🚲</div><div class="artifact-name">The Broken Bicycle</div><div class="artifact-rarity legendary">★★★★★ Legendary</div></div>
            <div class="artifact-card" data-title="The Dancing Drawing" data-story="Two people dancing - my first art class creation in January 2020. A prophecy drawn in pencil before we knew what we'd become." data-icon="🎨"><div class="artifact-icon">🎨</div><div class="artifact-name">The Dancing Drawing</div><div class="artifact-rarity epic">★★★★☆ Epic</div></div>
            <div class="artifact-card" data-title="The Joyful Chicken Steak" data-story="Our first meal together on July 27, 2021. Simple food that tasted like possibility. Now our tradition, our taste of beginnings." data-icon="🍗"><div class="artifact-icon">🍗</div><div class="artifact-name">Joyful Chicken Steak</div><div class="artifact-rarity legendary">★★★★★ Legendary</div></div>
            <div class="artifact-card" data-title="The Typhoon Flight" data-story="August 10, 2021 - when nature itself couldn't stop me from reaching you. A journey through storms that proved the strength of my feelings." data-icon="✈️"><div class="artifact-icon">✈️</div><div class="artifact-name">The Typhoon Flight</div><div class="artifact-rarity legendary">★★★★★ Legendary</div></div>
            <div class="artifact-card" data-title="The First Photo" data-story="The night of July, 2021, when I sent you my first picture. Digital pixels that carried vulnerability and hope across the night." data-icon="📸"><div class="artifact-icon">📸</div><div class="artifact-name">The First Photo</div><div class="artifact-rarity epic">★★★★☆ Epic</div></div>
            <div class="artifact-card" data-title="The Sports Field" data-story="Where it all began. Sacred ground where two lonely souls found each other during the Taiku Taikai. Our genesis point." data-icon="⚽"><div class="artifact-icon">⚽</div><div class="artifact-name">The Sports Field</div><div class="artifact-rarity mythic">★★★★★ Mythic</div></div>
            <div class="artifact-card" data-title="The Birthday Poem" data-story="Your message at 11:35pm on July 17, 2021. Sweet words that made me realize I was remembered, cherished, seen." data-icon="💌"><div class="artifact-icon">💌</div><div class="artifact-name">The Birthday Poem</div><div class="artifact-rarity epic">★★★★☆ Epic</div></div>
        </div>
    </div>
    `;
}

function getLexiconSectionHTML() {
    return `
    <div class="holo-pane active" id="tab-lexicon">
        <h3 class="panel-header">Our Shared Language</h3>
        <p class="panel-subheader">Every relationship creates its own dialect - words and phrases that carry meaning only we understand.</p>
        <div class="lexicon-search"><input type="text" id="lexicon-search-input" class="text-input" placeholder="🔍 Search our dictionary..."></div>
        <div class="lexicon-categories"><button class="lexicon-cat-btn active" data-category="all">All Terms</button><button class="lexicon-cat-btn" data-category="food">Food & Treats</button><button class="lexicon-cat-btn" data-category="activities">Activities</button><button class="lexicon-cat-btn" data-category="emotions">Emotions</button><button class="lexicon-cat-btn" data-category="places">Places</button></div>
        <dl class="lexicon-list-enhanced" id="lexicon-entries">
            <div class="lexicon-entry" data-category="activities"><dt>Night walk</dt><dd>A small, spontaneous adventure, usually involving snacks and discovery. Examples: Exploring a random street, going to コンビニー.</dd><div class="lexicon-usage">"Wanna go for a walk?"</div></div>
            <div class="lexicon-entry" data-category="emotions"><dt>Hug</dt><dd>The highest form of cozy comfort, requiring maximum fluffiness and zero movement for extended periods(octopus Nic). Saying no to a hug is a federal offense.</dd><div class="lexicon-usage">"I wanna hug you."</div></div>
            <div class="lexicon-entry" data-category="food"><dt>Life or death</dt><dd>A sudden, non-negotiable, and urgent need for a Tomato ramen. Must be addressed immediately or mood will deteriorate rapidly.</dd><div class="lexicon-usage">"Code red: Life or death! 🚨"</div></div>
            <div class="lexicon-entry" data-category="emotions"><dt>Silly Goose Time</dt><dd>An official period dedicated to being completely ridiculous together. All dignity suspended. Maximum goofiness encouraged.</dd><div class="lexicon-usage">"What if someone comes and see's you like this!"</div></div>
            <div class="lexicon-entry" data-category="food"><dt>Chicken Steak Moment</dt><dd>A callback to our first date. Any situation where something simple becomes unexpectedly perfect and meaningful.</dd><div class="lexicon-usage">"It was all i could eat."</div></div>
            <div class="lexicon-entry" data-category="emotions"><dt>Sports Field Feeling</dt><dd>That nervous excitement mixed with fate and possibility. The feeling of standing at the edge of something life-changing.</dd><div class="lexicon-usage">"I've got that sports field feeling about this..."</div></div>
            <div class="lexicon-entry" data-category="places"><dt>The Library Mode</dt><dd>Quality time spent in comfortable silence, each doing our own thing but together.</dd><div class="lexicon-usage">"Jokeeee, did we even ever studied?"</div></div>
            <div class="lexicon-entry" data-category="emotions"><dt>Typhoon Level Determination</dt><dd>Extreme commitment to a goal despite obstacles. From that August day when weather couldn't stop the journey.</dd><div class="lexicon-usage">"I have typhoon level determination to finish this!"</div></div>
            <div class="lexicon-entry" data-category="activities"><dt>Bicycle Fixing</dt><dd>A metaphor for solving any problem for your partner. Not just physical repairs but emotional support and care.</dd><div class="lexicon-usage">"Need me to bicycle fix this situation?"</div></div>
            <div class="lexicon-entry" data-category="emotions"><dt>Baobei</dt><dd>Chinese term of endearment meaning "precious treasure" or "baby". The sweetest way to say "you mean everything."</dd><div class="lexicon-usage">"Good morning, baobei ❤️"</div></div>
        </dl>
    </div>
    `;
}

// ===================================================================
//  GUIDE PANEL NAVIGATION & VIEW SWITCHING (ENHANCED)
// ===================================================================

/** Switches the currently visible view with a page-turn animation. */
function switchGuideView(viewId) {
    const container = $('guide-main-container');
    if (!container) return;
    
    const currentView = container.querySelector('.sanctuary-view.active');
    const nextView = $(viewId);
    
    if (currentView && nextView && currentView !== nextView) {
        // Prevent double-clicking
        if (currentView.classList.contains('page-turn-exit') || nextView.classList.contains('page-turn-enter')) {
            return;
        }

        currentView.classList.add('page-turn-exit');
        
        // Update progress bar if returning to hub
        if (viewId === 'guide-hub') {
            updateProgressIndicator();
        }

        setTimeout(() => {
            currentView.classList.remove('active', 'page-turn-exit');
            nextView.classList.add('page-turn-enter', 'active');
            
            setTimeout(() => {
                nextView.classList.remove('page-turn-enter');
            }, 800);
        }, 400); // Wait for the first half of the animation
    } else if (nextView) {
        container.querySelectorAll('.sanctuary-view').forEach(v => v.classList.remove('active'));
        nextView.classList.add('active');
        // Update progress bar if loading hub first time
        if (viewId === 'guide-hub') {
            updateProgressIndicator();
        }
    }
}

/** Renders a specific section wing (Observatory, Physics, etc.). */
function showGuideSection(sectionId) {
    const mainContent = DOM.mainContent;
    const sectionsView = $('guide-sections-view');
    if (!mainContent || !sectionsView) return;

    // Handle special layout for the full-screen observatory
    if (sectionId === 'observatory') {
        mainContent.classList.add('observatory-active');
    } else {
        mainContent.classList.remove('observatory-active');
    }

    sectionsView.innerHTML = getSectionHTML(sectionId);
    switchGuideView('guide-sections-view');

    // Add back button listener
    const backBtn = sectionsView.querySelector('#guide-back-to-hub-btn, #observatory-back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', returnToGuideHub);
    }
    
    // --- ENHANCEMENT CALLS ---
    trackSectionVisit(sectionId);
    setAmbientSound(sectionId);
    initSectionStars(sectionId);
    // -------------------------

    // Initialize the JavaScript for the specific section
    if (sectionId === 'observatory') {
        initObservatory();
    } else if (sectionId === 'physics') {
        initPhysicsDashboard();
    } else if (sectionId === 'anatomy') {
        initAnatomyEnhanced();
    } else if (sectionId === 'artifacts') {
        initArtifactsEnhanced();
    } else if (sectionId === 'lexicon') {
        initLexiconEnhanced();
    }
}

/** Returns the user to the main guide hub view. */
function returnToGuideHub() {
    if (observatoryAnimationFrameId) {
        cancelAnimationFrame(observatoryAnimationFrameId);
        observatoryAnimationFrameId = null;
    }
    if (ambientAudio) {
        ambientAudio.pause();
    }
    // Remove section stars
    document.querySelectorAll('.section-star').forEach(s => s.remove());

    if(DOM.mainContent) DOM.mainContent.classList.remove('observatory-active');
    switchGuideView('guide-hub');
}

// ===================================================================
//  ENHANCEMENT: PROGRESS TRACKING
// ===================================================================

function loadGuideProgress() {
    // This function is now called from render()
    if (!AppState.guideProgress) {
        AppState.guideProgress = {
            visitedSections: new Set(),
            completionPercentage: 0
        };
    }
    const saved = localStorage.getItem('guideProgress');
    if (saved) {
        try {
            AppState.guideProgress.visitedSections = new Set(JSON.parse(saved));
            const totalSections = 5;
            const visited = AppState.guideProgress.visitedSections.size;
            AppState.guideProgress.completionPercentage = Math.round((visited / totalSections) * 100);
        } catch (e) {
            console.error("Could not parse guide progress.", e);
            AppState.guideProgress.visitedSections = new Set();
            AppState.guideProgress.completionPercentage = 0;
        }
    }
    updateProgressIndicator();
}

function trackSectionVisit(sectionId) {
    if (sectionId === 'hub' || !sectionId) return;
    
    AppState.guideProgress.visitedSections.add(sectionId);
    const totalSections = 5; // physics, anatomy, artifacts, lexicon, observatory
    const visited = AppState.guideProgress.visitedSections.size;
    AppState.guideProgress.completionPercentage = Math.round((visited / totalSections) * 100);
    
    updateProgressIndicator(); // Update on visit
    localStorage.setItem('guideProgress', JSON.stringify([...AppState.guideProgress.visitedSections]));
}

function updateProgressIndicator() {
    let indicator = document.querySelector('.guide-progress-indicator');
    if (!indicator && $('guide-hub')) { // Only create if we are on the hub
        indicator = document.createElement('div');
        indicator.className = 'guide-progress-indicator';
        indicator.innerHTML = `
            <div class="progress-label">Library Exploration</div>
            <div class="progress-bar-track">
                <div class="progress-bar-fill"></div>
            </div>
            <div class="progress-percentage">0%</div>
        `;
        document.querySelector('#guide-hub .content-container')?.prepend(indicator);
    }
    
    if (!indicator) return; // Exit if still no indicator

    const fill = indicator.querySelector('.progress-bar-fill');
    const percentage = indicator.querySelector('.progress-percentage');
    const percent = AppState.guideProgress.completionPercentage;
    
    if (fill && percentage) {
        fill.style.width = `${percent}%`;
        percentage.textContent = `${percent}%`;
    }
}


// ===================================================================
//  ENHANCEMENT: AMBIENT SOUND
// ===================================================================

function initAmbientSound() {
    const toggle = document.getElementById('ambient-sound-toggle');
    if (!toggle) return;
    
    // Create audio element if it doesn't exist
    if (!ambientAudio) {
        ambientAudio = new Audio();
        ambientAudio.loop = true;
        ambientAudio.volume = 0.3;
    }
    
    toggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        const icon = toggle.querySelector('.sound-icon');
        
        if (soundEnabled) {
            icon.textContent = '🔊';
            if (ambientAudio.src) ambientAudio.play().catch(e => console.warn("Audio play interrupted"));
        } else {
            icon.textContent = '🔇';
            ambientAudio.pause();
        }
    });
}

function setAmbientSound(sectionId) {
    if (!ambientAudio) return;
    
    // Using placeholder sounds - you will need to add these files
    const sounds = {
        physics: 'sounds/cosmic_hum.mp3',
        anatomy: 'sounds/heartbeat.mp3',
        artifacts: 'sounds/mystical_chimes.mp3',
        lexicon: 'sounds/paper_rustle.mp3',
        observatory: 'sounds/space_ambient.mp3'
    };
    
    const soundFile = sounds[sectionId];
    
    if (soundFile && !ambientAudio.src.endsWith(soundFile)) {
        ambientAudio.src = soundFile;
        if (soundEnabled) {
            ambientAudio.play().catch(e => console.warn("Audio play interrupted"));
        }
    } else if (!soundFile) {
        ambientAudio.pause(); // Pause if no sound for this section
    }
}

// ===================================================================
//  ENHANCEMENT: PORTAL CONSTELLATION LINES
// ===================================================================

function initPortalConnections() {
    const portalGrid = document.querySelector('.portal-grid-layout');
    if (!portalGrid) return;
    
    // Check if SVG already exists
    if (portalGrid.querySelector('.portal-connections')) return;

    const portals = portalGrid.querySelectorAll('.realm-portal');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'portal-connections');
    svg.style.cssText = 'position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: visible;';
    portalGrid.appendChild(svg);
    
    portals.forEach((portal, index) => {
        portal.addEventListener('mouseenter', () => {
            svg.innerHTML = ''; // Clear previous lines
            const adjacentIndices = [index - 1, index + 1].filter(i => i >= 0 && i < portals.length);
            
            // Connect to adjacent portals
            adjacentIndices.forEach(adjIndex => {
                drawLine(portal, portals[adjIndex], svg);
            });

            // Special: Connect 0 to 2, 3 to 4
            if (index === 0) drawLine(portal, portals[2], svg);
            if (index === 2) drawLine(portal, portals[0], svg);
            if (index === 3) drawLine(portal, portals[4], svg);
            if (index === 4) drawLine(portal, portals[3], svg);

        });
        
        portal.addEventListener('mouseleave', () => {
            svg.innerHTML = ''; // Clear lines
        });
    });
}

function drawLine(portal1, portal2, svg) {
    const rect1 = portal1.getBoundingClientRect();
    const rect2 = portal2.getBoundingClientRect();
    const container = svg.getBoundingClientRect();
    
    const x1 = rect1.left - container.left + rect1.width / 2;
    const y1 = rect1.top - container.top + rect1.height / 2;
    const x2 = rect2.left - container.left + rect2.width / 2;
    const y2 = rect2.top - container.top + rect2.height / 2;
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', 'rgba(255, 215, 0, 0.4)');
    line.setAttribute('stroke-width', '2');
    line.style.animation = 'fadeIn 0.3s ease';
    svg.appendChild(line);
}


// ===================================================================
//  RIDDLE & ENTRY LOGIC
// ===================================================================

function renderRiddle() {
    const riddleContainer = $('guide-riddle-container');
    if (!riddleContainer) return;

    let currentRiddleIndex = parseInt(localStorage.getItem('currentGuideRiddleIndex') || '0', 10);
    if (currentRiddleIndex >= GUIDE_RIDDLES.length) {
        currentRiddleIndex = 0;
        localStorage.setItem('currentGuideRiddleIndex', '0');
    }
    const currentRiddle = GUIDE_RIDDLES[currentRiddleIndex];

    const choicesHtml = currentRiddle.choices.map((choice, index) => {
        const translationKey = `guide_riddle_choice_${currentRiddleIndex + 1}${String.fromCharCode(97 + index)}`;
        return `<button class="btn" data-answer="${choice.text}" data-translate-id="${translationKey}">${choice.text}</button>`;
    }
    ).join('');
    
    riddleContainer.innerHTML = `
        <p class="riddle-prompt" data-translate-id="guide_riddle_prompt_${currentRiddleIndex + 1}">${currentRiddle.prompt}</p>
        <p class="riddle-question" style="margin-bottom: 1.5rem;" data-translate-id="guide_riddle_question_${currentRiddleIndex + 1}">${currentRiddle.question}</p>
        <div class="riddle-choices">${choicesHtml}</div>
        <p id="guide-riddle-feedback" class="riddle-feedback"></p>
    `;

    // Manually trigger translation for the newly rendered content
    if (window.chineseEnhancements && typeof window.chineseEnhancements.enhanceActivePanel === 'function') {
        window.chineseEnhancements.enhanceActivePanel();
    }

    riddleContainer.querySelectorAll('.riddle-choices .btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
             checkRiddleAnswer(GUIDE_RIDDLES[currentRiddleIndex].choices[index].isCorrect);
        });
    });
}

function checkRiddleAnswer(isCorrect) {
    const feedbackEl = $('guide-riddle-feedback');
    const choices = $$('.riddle-choices .btn');
    if (!feedbackEl) return;

    choices.forEach(btn => btn.disabled = true); // Disable buttons after an answer

    if (isCorrect) {
        feedbackEl.innerHTML = `
            <span class="feedback-line-1">The memory resonates true.</span>
            <span class="feedback-line-2">The Astral Gates shimmer and consent.</span>
        `;
        feedbackEl.className = 'riddle-feedback correct';
        setTimeout(handleRiddleSuccess, 1000);
    } else {
        riddleAttempts++;
        if (riddleAttempts >= 2) {
            feedbackEl.innerHTML = `
                <span class="feedback-line-1">The bond weakens... the memory fades.</span>
                <span class="feedback-line-2">The Library seals its knowledge from you.</span>
            `;
            feedbackEl.className = 'riddle-feedback incorrect';
            setTimeout(showFailureScreen, 1500);
        } else {
            feedbackEl.innerHTML = `
                <span class="feedback-line-1">An echo of a different past.</span>
                <span class="feedback-line-2">The stars ask you to remember again.</span>
            `;
            feedbackEl.className = 'riddle-feedback incorrect';
            
            // Move to the next riddle
            let currentRiddleIndex = parseInt(localStorage.getItem('currentGuideRiddleIndex') || '0', 10);
            let nextRiddleIndex = (currentRiddleIndex + 1) % GUIDE_RIDDLES.length;
            localStorage.setItem('currentGuideRiddleIndex', nextRiddleIndex.toString());
            setTimeout(renderRiddle, 1500);
        }
    }
}

function handleRiddleSuccess() {
    switchGuideView('guide-entrance-animation');
    const entrance = $('guide-entrance-animation');
    if(entrance) entrance.classList.add('is-opening');
    setTimeout(() => switchGuideView('guide-hub'), 1700); // 1.7s for animation
}

function showFailureScreen() {
    const overlay = document.createElement('div');
    overlay.id = 'sanctuary-failure-overlay';
    // More thematic failure screen
    overlay.innerHTML = `
        <div class="failure-content">
            <h2 class="failure-title">A MEMORY LOST IN THE VOID</h2>
            <p class="failure-prompt">The unbreakable bond has fractured. The path to the Astral Library is now hidden among silent, uncaring stars. You must return and remember the truth to try again.</p>
        <button class="btn primary" id="failure-return-btn" style="margin-top: 2rem;">Return to Sanctuary</button>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#failure-return-btn').addEventListener('click', () => {
        overlay.remove();
        window.location.hash = 'home';
    });
}

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

// ===================================================================
//  SUB-SECTION INITIALIZERS
// ===================================================================

function initPhysicsDashboard() {
    initInteractivePhysics();
    const waveformCanvas = $('waveform-canvas');
    if (waveformCanvas) {
        const ctx = waveformCanvas.getContext('2d');
        let dissonance = 0;
        let time = 0;
        let waveAnimationId;
        const drawWaveform = () => {
            if(!($('waveform-canvas'))) { // Check if canvas still exists
                if(waveAnimationId) cancelAnimationFrame(waveAnimationId);
                return;
            }
            const w = waveformCanvas.width;
            const h = waveformCanvas.height;
            ctx.clearRect(0, 0, w, h);
            ctx.strokeStyle = 'rgba(48, 213, 200, 0.5)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let x = 0; x < w; x++) {
                const angle = (x / w) * Math.PI * 4 + time;
                const y = h / 2 + Math.sin(angle) * (h / 4) + (Math.random() - 0.5) * dissonance;
                if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.strokeStyle = 'rgba(247, 121, 221, 0.5)';
            ctx.beginPath();
            for (let x = 0; x < w; x++) {
                const angle = (x / w) * Math.PI * 4 + time + 0.1;
                const y = h / 2 + Math.sin(angle) * (h / 4) + (Math.random() - 0.5) * dissonance;
                if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();
            time += 0.05;
            waveAnimationId = requestAnimationFrame(drawWaveform);
        };
        drawWaveform();
        $('introduce-dissonance').addEventListener('click', () => dissonance = 30);
        $('re-harmonize').addEventListener('click', () => dissonance = 0);
        window.guideWaveformCleanup = () => cancelAnimationFrame(waveAnimationId);
    }

    const radarCanvas = $('radar-chart');
    if (radarCanvas) {
        const ctx = radarCanvas.getContext('2d');
        const size = 300;
        radarCanvas.width = size;
        radarCanvas.height = size;
        const data = {
            labels: ['EMOTIONAL', 'INTELLECTUAL', 'COMMUNICATION', 'ADVENTURE', 'CULINARY', 'DESTINY'],
            values: [0.983, 0.927, 0.991, 0.874, 1.0, 1.0]
        };
        const center = size / 2;
        const radius = size * 0.4;
        ctx.clearRect(0, 0, size, size);
        ctx.strokeStyle = 'rgba(48, 213, 200, 0.2)';
        ctx.fillStyle = 'rgba(48, 213, 200, 0.3)';
        for (let i = 0; i < data.labels.length; i++) {
            const angle = (i / data.labels.length) * Math.PI * 2 - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            ctx.beginPath(); ctx.moveTo(center, center); ctx.lineTo(x, y); ctx.stroke();
            ctx.fillStyle = '#8892b0'; ctx.font = '10px Courier New';
            ctx.fillText(data.labels[i], x + (x > center ? 5 : -50), y + (y > center ? 10 : -5));
        }
        ctx.beginPath();
        for (let i = 0; i < data.values.length; i++) {
            const value = data.values[i];
            const angle = (i / data.values.length) * Math.PI * 2 - Math.PI / 2;
            const x = center + radius * value * Math.cos(angle);
            const y = center + radius * value * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(48, 213, 200, 0.4)'; ctx.fill();
        ctx.strokeStyle = '#30d5c8'; ctx.stroke();
    }
}

function initInteractivePhysics() {
    const memoriesSlider = $('memories-slider');
    const timeSlider = $('time-slider');
    const loveValueDisplay = $('love-value-display');
    const liveDataResult = $('live-data-result');
    if (liveDataResult) {
        const photoCount = (EDITABLE_CONFIG.PHOTOS_DATA || []).length;
        const chapterCount = (AppState.chapters || []).length;
        const songCount = (EDITABLE_CONFIG.SONGS_DATA || []).length;
        const totalMoments = photoCount + chapterCount + songCount;
        liveDataResult.innerHTML = `Current Value: L∞ = ∞ (Calculated with <strong>${totalMoments}</strong> total moments)`;
    }
    if (!memoriesSlider || !timeSlider || !loveValueDisplay) return;
    const calculateLove = () => {
        const memories = parseFloat(memoriesSlider.value);
        const time = parseFloat(timeSlider.value);
        const infiniteBondFactor = 1000; 
        const loveStrength = infiniteBondFactor * (memories * 10) * Math.exp(time / 20);
        let displayText;
        if (loveStrength > 1e9) displayText = '∞ (Infinite)';
        else if (loveStrength > 1e6) displayText = `${(loveStrength / 1e6).toFixed(2)} Million`;
        else if (loveStrength > 1e3) displayText = `${(loveStrength / 1e3).toFixed(2)} Thousand`;
        else displayText = Math.round(loveStrength).toLocaleString();
        loveValueDisplay.textContent = displayText;
        loveValueDisplay.classList.add('updated');
        setTimeout(() => loveValueDisplay.classList.remove('updated'), 300);
    };
    memoriesSlider.addEventListener('input', calculateLove);
    timeSlider.addEventListener('input', calculateLove);
    calculateLove();
    const destinyBtn = $('calculate-destiny-btn');
    if (destinyBtn) {
        destinyBtn.addEventListener('click', () => {
            const resultDisplay = $('quantum-result-display');
            destinyBtn.style.display = 'none';
            resultDisplay.style.display = 'block';
            resultDisplay.classList.add('updated');
            setTimeout(() => resultDisplay.classList.remove('updated'), 1000);
        });
    }
}

function initAnatomyEnhanced() {
    const points = $$('.anatomy-point-enhanced');
    const tooltip = $('anatomy-tooltip-enhanced');
    const bridge = document.querySelector('.connection-bridge');
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
        point.addEventListener('mouseenter', () => {
            if (!bridge) return;
            const pulse = document.createElement('div');
            pulse.className = 'bridge-pulse';
            const person = point.closest('.anatomy-profile').dataset.person;
            pulse.style.animationName = person === 'nic' ? 'pulse-right' : 'pulse-left';
            bridge.appendChild(pulse);
            setTimeout(() => pulse.remove(), 1000);
        });
    });
}

/**
 * *** BUG FIX ***
 * This function now finds the modals in index.html instead of creating new ones.
 * It attaches all necessary listeners for opening and closing both modals.
 */
function initArtifactsEnhanced() {
    // Find Modals from index.html
    const modal = $('artifact-modal');
    const uploadModal = $('artifact-upload-modal');
    
    // Find Buttons in the section HTML
    const cards = $$('.artifact-card');
    const addBtn = $('add-artifact-btn');
    
    if (!modal || !uploadModal || !addBtn) {
        console.error("Artifacts section failed to initialize: Modals or buttons not found in DOM.");
        return;
    }
    
    // Find close/save buttons from the modals in index.html
    const closeBtn = modal.querySelector('.artifact-modal-close');
    const uploadCloseBtn = uploadModal.querySelector('.artifact-modal-close');
    const saveArtifactBtn = $('save-artifact-btn');
    const showcase = document.querySelector('.artifacts-showcase');

    // --- Detail Modal Listeners ---
    const openArtifactModal = (icon, title, story) => {
        $('modal-artifact-icon').textContent = icon;
        $('modal-artifact-title').textContent = title;
        $('modal-artifact-story').textContent = story;
        modal.classList.add('active');
    };
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            openArtifactModal(card.dataset.icon, card.dataset.title, card.dataset.story);
        });
    });

    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

    // --- Upload Modal Listeners ---
    addBtn.addEventListener('click', () => uploadModal.classList.add('active'));
    uploadCloseBtn.addEventListener('click', () => uploadModal.classList.remove('active'));
    uploadModal.addEventListener('click', (e) => { if (e.target === uploadModal) uploadModal.classList.remove('active'); });
    
    saveArtifactBtn.addEventListener('click', () => {
        const icon = $('artifact-icon-input').value || '❓';
        const title = $('artifact-title-input').value || 'New Artifact';
        const story = $('artifact-story-input').value || 'A newly discovered memory.';
        const rarity = 'common'; // Use a class for rarity
        
        const newCard = document.createElement('div');
        newCard.className = 'artifact-card';
        newCard.dataset.icon = icon;
        newCard.dataset.title = title;
        newCard.dataset.story = story;
        newCard.innerHTML = `
            <div class="artifact-icon">${icon}</div>
            <div class="artifact-name">${title}</div>
            <div class="artifact-rarity ${rarity}">★★★☆☆ Common</div>
        `;
        // Add listener to the new card
        newCard.addEventListener('click', () => openArtifactModal(icon, title, story));
        
        showcase.appendChild(newCard);
        uploadModal.classList.remove('active');
        
        // Clear input fields
        $('artifact-icon-input').value = '';
        $('artifact-title-input').value = '';
        $('artifact-story-input').value = '';
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
            entry.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
        });
    }
    searchInput.addEventListener('input', filterEntries); // Use 'input' for real-time
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterEntries();
        });
    });
}

// ===================================================================
//  OBSERVATORY (THREE.JS) - COMPLETE
// ===================================================================

function initObservatory(themeOverride = null) {
    const observatoryContainer = $('tab-observatory');
    if (!observatoryContainer || typeof THREE === 'undefined') {
        $('guide-sections-view').innerHTML = `
            <div class="content-container section-container">
                <button class="btn" id="guide-back-to-hub-btn" style="margin-bottom: 2rem;">← Back to Library Hub</button>
                <h2 class="panel-header">Error</h2>
                <p class="panel-subheader">Observatory failed to load. THREE.js library not found.<br>Please check your internet connection or the script tag in index.html.</p>
            </div>`;
         $('guide-back-to-hub-btn').addEventListener('click', returnToGuideHub);
         return;
    }

    const memories = [
        { position: { x: -300, y: 80, z: 200 }, title: "First Meeting", date: "September 15, 2019", text: "When every day seems like a year, going back into the past gives the impression of having lived for a thousand years. For so long, I never knew what love was or how it felt to be loved." },
        { position: { x: 250, y: -100, z: 300 }, title: "The Sports Festival", date: "Sports Day", text: "Her hair was long and shiny black, like the strands of heaven; her face was a pale cream colour as if she were coming from snowy mountains. She was indeed the epitome of beauty." },
        { position: { x: -150, y: 180, z: -250 }, title: "First Conversation", date: "That Day", text: "My name is Zhang Zoya. I'm Nicholas Lubega, and I love mathematics. We began talking to each other intimately, like it wasn't our first time meeting." },
        { position: { x: 350, y: -80, z: -150 }, title: "The Bicycle", date: "June 2021", text: "I am good at fixing bicycles and it will be an honour to me if I could help. We finished the work that had brought us and then started chatting." },
        { position: { x: -280, y: -150, z: 350 }, title: "Birthday Wishes", date: "July 17, 2021", text: "Good evening, Nico, I hope it won't be too late to say 'happy birthday' to you. Nobody else knew how good my feeling was but me." },
        { position: { x: 180, y: 200, z: -300 }, title: "Library Meeting", date: "July 27, 2021", text: "We ate while talking till going back home. It was the first picture of myself that I sent to her." },
        { position: { x: -350, y: 120, z: -100 }, title: "The Typhoon", date: "August 10, 2021", text: "A typhoon happened in Kyoto that made all the flights of that day be cancelled. I wanted to rush home. The only reason I rushed all the way from Kansai." },
        { position: { x: 300, y: -180, z: 250 }, title: "Growing Closer", date: "August 2021", text: "I wish you sweet dreams. That's the sweetest poem for good night. The glowing moon, the twinkling stars will bless you." },
        { position: { x: -200, y: -200, z: -280 }, title: "The Confession", date: "August 25 2021", text: "Zoya, I've fallen in love with you. Completely, utterly, hopelessly in love with you. You make me want to be better." },
        { position: { x: 0, y: 150, z: 0 }, title: "Forever", date: "August 25 2021~~", text: "Yes to everything you're asking. Yes to being more than friends. This is our love story. Not perfect, but perfectly ours." }
    ];

    let scene, camera, renderer, galaxyParticles;
    let cameraOffset = { x: 0, y: 400, z: 1200 };
    let rotationSpeed = 1;
    let memoryParticles, galaxyGroup, raycaster, mouse;
    let telescopeFrame = $('telescope-frame'); 

    function init() {
        if (observatoryAnimationFrameId) {
            cancelAnimationFrame(observatoryAnimationFrameId);
            observatoryAnimationFrameId = null;
        }

        const container = $('canvas-container');
        if (!container) return; // Exit if container not found
        while (container.firstChild) { container.removeChild(container.firstChild); }
        
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.0001); 

        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 6000);
        camera.position.set(cameraOffset.x, cameraOffset.y, cameraOffset.z);
        camera.lookAt(0, 0, 0);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setClearColor(0x000000, 1); 
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        
        telescopeFrame = $('telescope-frame');

        raycaster = new THREE.Raycaster();
        raycaster.params.Points.threshold = 15;
        mouse = new THREE.Vector2();

        galaxyGroup = new THREE.Group();
        scene.add(galaxyGroup);

        createGalaxy(); 
        createMemoryMarkers(memories); 
        setupControls();
        
        window.addEventListener('resize', onWindowResize);

        setTimeout(() => {
            if($('loading')) $('loading').classList.add('hidden');
        }, 1500);

        animate(); 
    }

    function createGalaxy() {
        const particleCount = 350000; 
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const themeToUse = themeOverride || THEME_COLORS[localStorage.getItem('selectedTheme') || 'mystical'] || THEME_COLORS.mystical;
        const theme = themeToUse;
        const colorCenter = new THREE.Color(theme.colors['--gold']);
        const colorMid = new THREE.Color(theme.colors['--soft-violet']);
        const colorOuter = new THREE.Color(theme.colors['--glow-magenta'] || theme.colors['--crimson']); 
        const colorDust = new THREE.Color(theme.colors['--glow-cyan'] || theme.colors['--jade']); 
        const branchCount = 5;
        const galaxyRadius = 2500; 

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const radius = Math.pow(Math.random(), 1.5) * galaxyRadius;
            const branch = ((i % branchCount) / branchCount) * Math.PI * 2;
            const spin = radius * 0.003;
            const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * radius * 0.35;
            const randomY = Math.pow(Math.random(), 5) * (Math.random() < 0.5 ? 1 : -1) * radius * 0.06;
            const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * radius * 0.35;
            positions[i3] = Math.cos(branch + spin) * radius + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] = Math.sin(branch + spin) * radius + randomZ;
            const mixedColor = colorCenter.clone();
            const lerpFactor = radius / galaxyRadius;
            if (lerpFactor < 0.5) mixedColor.lerp(colorMid, lerpFactor * 2);
            else mixedColor.copy(colorMid).lerp(colorOuter, (lerpFactor - 0.5) * 2);
            if (Math.random() > 0.95) mixedColor.lerp(colorDust, Math.random() - 0.9);
            colors[i3] = mixedColor.r; colors[i3 + 1] = mixedColor.g; colors[i3 + 2] = mixedColor.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        const material = new THREE.PointsMaterial({ size: 3.0, sizeAttenuation: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true, transparent: true });
        galaxyParticles = new THREE.Points(geometry, material);
        galaxyGroup.add(galaxyParticles);
    }

    function createMemoryMarkers(memories) {
        if (memoryParticles) {
            galaxyGroup.remove(memoryParticles);
            memoryParticles.geometry.dispose();
            memoryParticles.material.dispose();
        }
        const particleCount = memories.length;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const themeToUse = themeOverride || THEME_COLORS[localStorage.getItem('selectedTheme') || 'mystical'] || THEME_COLORS.mystical;
        const theme = themeToUse;
        const memColor = new THREE.Color(theme.colors['--glow-magenta'] || '#f779dd'); 
        for (let i = 0; i < particleCount; i++) {
            const memory = memories[i];
            positions[i * 3] = memory.position.x;
            positions[i * 3 + 1] = memory.position.y;
            positions[i * 3 + 2] = memory.position.z;
            colors[i * 3] = memColor.r; colors[i * 3 + 1] = memColor.g; colors[i * 3 + 2] = memColor.b;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        const material = new THREE.PointsMaterial({ size: 12.0, sizeAttenuation: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true, transparent: true, opacity: 0.85 });
        memoryParticles = new THREE.Points(geometry, material);
        memoryParticles.userData.memories = memories;
        galaxyGroup.add(memoryParticles); 
    }

    function onCanvasClick(event) {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(memoryParticles);
        if (intersects.length > 0) {
            intersects.sort((a, b) => a.distanceToRay - b.distanceToRay);
            const particleIndex = intersects[0].index;
            const memoryData = memoryParticles.userData.memories[particleIndex];
            if (memoryData) showStory(memoryData);
        }
    }

    function showStory(memory) {
        $('story-title').textContent = memory.title;
        $('story-date').textContent = memory.date;
        $('story-text').textContent = memory.text;
        $('story-modal').classList.add('active');
    }

    function closeStory() {
        $('story-modal').classList.remove('active');
    }

    function setupControls() {
        const panSpeed = 150;
        $('btn-left').addEventListener('click', () => { cameraOffset.x -= panSpeed; });
        $('btn-right').addEventListener('click', () => { cameraOffset.x += panSpeed; });
        $('btn-up').addEventListener('click', () => { cameraOffset.y += panSpeed; });
        $('btn-down').addEventListener('click', () => { cameraOffset.y -= panSpeed; });
        $('btn-reset').addEventListener('click', () => {
            cameraOffset = { x: 0, y: 400, z: 1200 };
            $('zoom-slider').value = 1200;
            $('rotation-slider').value = 1;
            rotationSpeed = 1;
        });
        $('zoom-slider').addEventListener('input', (e) => {
            cameraOffset.z = parseFloat(e.target.value);
            $('zoom-level').textContent = Math.round(cameraOffset.z);
        });
        $('rotation-slider').addEventListener('input', (e) => { rotationSpeed = parseFloat(e.target.value); });

        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        const domElement = renderer.domElement;
        domElement.addEventListener('click', onCanvasClick);
        domElement.addEventListener('mousedown', (e) => { isDragging = true; previousMousePosition = { x: e.clientX, y: e.clientY }; });
        domElement.addEventListener('mouseup', () => { isDragging = false; });
        domElement.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - previousMousePosition.x;
                const deltaY = e.clientY - previousMousePosition.y;
                cameraOffset.x += deltaX * 2;
                cameraOffset.y -= deltaY * 2;
                previousMousePosition = { x: e.clientX, y: e.clientY };
            }
        });
        domElement.addEventListener('wheel', (e) => {
            e.preventDefault();
            cameraOffset.z = Math.max(10, Math.min(3000, cameraOffset.z + e.deltaY * 0.8));
            $('zoom-slider').value = cameraOffset.z;
            $('zoom-level').textContent = Math.round(cameraOffset.z);
        }, { passive: false });

        $('story-close-btn').addEventListener('click', closeStory);
        $('story-modal').addEventListener('click', (e) => { if (e.target.id === 'story-modal') closeStory(); });

        const controlsContainer = $('controls');
        const canvasContainer = $('canvas-container');
        if (telescopeFrame) {
            telescopeFrame.addEventListener('click', (e) => { e.stopPropagation(); controlsContainer.classList.toggle('visible'); });
        }
        canvasContainer.addEventListener('click', (e) => {
            setTimeout(() => {
                if (!$('story-modal').classList.contains('active')) {
                     controlsContainer.classList.remove('visible');
                }
            }, 50); 
        });
    }

    function animate() {
        observatoryAnimationFrameId = requestAnimationFrame(animate);
        if (galaxyGroup) galaxyGroup.rotation.y += 0.0005 * rotationSpeed;
        if (telescopeFrame) {
            const maxTiltY = 30, maxTiltX = 25, maxPanX = 1000, maxPanY = 800, baseCameraY = 400, baseTiltX = 5;
            const panPercentX = Math.max(-1, Math.min(1, cameraOffset.x / maxPanX));
            const tiltY = panPercentX * maxTiltY; 
            const panPercentY = Math.max(-1, Math.min(1, (cameraOffset.y - baseCameraY) / maxPanY));
            const tiltX = baseTiltX + (panPercentY * -maxTiltX); 
            telescopeFrame.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        }
        camera.position.x += (cameraOffset.x - camera.position.x) * 0.08;
        camera.position.y += (cameraOffset.y - camera.position.y) * 0.08;
        camera.position.z += (cameraOffset.z - camera.position.z) * 0.08;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
    }

    function onWindowResize() {
        if (!renderer || !camera) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    init();
}

// ===================================================================
//  ENHANCEMENT: ANIMATED STAR PARTICLES
// ===================================================================

function initSectionStars(sectionId) {
    const container = document.querySelector('.main-content');
    if (!container) return;
    
    // Remove existing stars
    document.querySelectorAll('.section-star').forEach(s => s.remove());
    
    const starCount = 15;
    const sectionColors = {
        physics: ['#30d5c8', '#f779dd'],
        anatomy: ['#ff6b9d', '#ffd700'],
        artifacts: ['#ffd700', '#8a2be2'],
        lexicon: ['#64ffda', '#f779dd'],
        observatory: ['#ffd700', '#30d5c8']
    };
    
    const colors = sectionColors[sectionId] || ['#ffd700', '#8a2be2'];
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'section-star';
        star.textContent = '✦';
        star.style.cssText = `
            position: fixed;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            font-size: ${Math.random() * 20 + 10}px;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            pointer-events: none;
            z-index: 1;
            animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
            opacity: 0;
        `;
        // Append to main-content so it's contained within the scrolling area
        container.appendChild(star);
    }
}


// ===================================================================
//  PUBLIC RENDER & CLEANUP
// ===================================================================

/**
 * Renders the Guide panel into the main content area.
 * @param {HTMLElement} mainContent - The element to render content into.
 */
export function render(mainContent) {
    panelContainer = mainContent;
    panelContainer.innerHTML = getGuidePanelHTML();

    // --- ENHANCEMENT 1: Add Twinkle Animation CSS ---
    const twinkleStyle = document.getElementById('twinkle-animation-style');
    if (!twinkleStyle) {
        const style = document.createElement('style');
        style.id = 'twinkle-animation-style';
        style.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: 0; transform: scale(0.8) rotate(0deg); }
                50% { opacity: 0.8; transform: scale(1.2) rotate(180deg); }
            }
            .section-star {
                /* Base styles from initSectionStars for safety */
                position: fixed;
                pointer-events: none;
                z-index: 1; /* Ensure it's behind UI but visible */
            }
        `;
        document.head.appendChild(style);
    }

    // --- ENHANCEMENT 4: Load Progress ---
    loadGuideProgress();

    // --- ENHANCEMENT 5: Init Sound ---
    initAmbientSound();
    
    // *** FIX: USE EVENT DELEGATION FOR HUB CLICKS ***
    const hub = $('guide-hub');
    if (hub) {
        hub.addEventListener('click', (e) => {
            // Find the closest ancestor that is a realm-portal
            const portal = e.target.closest('.realm-portal');
            if (portal && portal.dataset.section) {
                // If we found a portal and it has a data-section, show it
                showGuideSection(portal.dataset.section);
            }
        });

        // --- ENHANCEMENT 7: Init Portal Lines (after hub is found) ---
        initPortalConnections();
    }

    const typeTextElement = $('guide-typing-text');
    const riddleContainer = $('guide-riddle-container');
    const textToType = `A repository of cosmic truths, sealed by a question of the heart...`;

    // Handle direct entry to observatory
    if (window.location.hash === '#observatory-direct') {
        showGuideSection('observatory');
        return;
    }

    // Handle mood sync bypass
    if (AppState.passwordsTemporarilyBypassed) {
        switchGuideView('guide-hub');
    } else {
        // Normal entry: show the riddle
        switchGuideView('guide-threshold');
        
        // Add data-translate-id for the typewriter text
        if (typeTextElement) {
            typeTextElement.dataset.translateId = 'guide_threshold_intro';
        }

        // The typewriter will type the English text, then the enhancement script will add the Chinese subtitle
        typewriter(typeTextElement, textToType, () => {
            const keyholeContainer = $('gate-keyhole-container');
            if (keyholeContainer) {
                keyholeContainer.innerHTML = `<button id="reveal-riddle-btn" class="btn primary">Reveal the Question</button>`;
                const revealBtn = $('reveal-riddle-btn');
                if (revealBtn) {
                    revealBtn.addEventListener('click', () => {
                        keyholeContainer.style.display = 'none';
                        if (riddleContainer) riddleContainer.style.display = 'block';
                        renderRiddle();
                    }, { once: true });
                }
            }
        });
    }
}

/**
 * Cleans up intervals and event listeners when the panel is unloaded.
 */
export function cleanup() {
    // CRITICAL: Stop the Three.js animation loop
    if (observatoryAnimationFrameId) {
        cancelAnimationFrame(observatoryAnimationFrameId);
        observatoryAnimationFrameId = null;
    }
    
    // Clean up any other intervals (e.g., from physics sim)
    if (window.guideWaveformCleanup) {
        window.guideWaveformCleanup();
        delete window.guideWaveformCleanup;
    }

    // --- ENHANCEMENT 1: Remove stars ---
    document.querySelectorAll('.section-star').forEach(s => s.remove());

    // --- ENHANCEMENT 5: Stop sound ---
    if (ambientAudio) {
        ambientAudio.pause();
        ambientAudio.src = ''; // Release file
    }

    panelContainer = null;
}
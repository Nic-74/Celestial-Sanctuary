import { EXTRA_CONTENT } from '../extra-data.js?v=20260919-audit3';
// ===================================================================
//  MODULE: GAMES (js/modules/games.js)
// ===================================================================

import { $, $$, DOM } from '../common.js?v=20260919-audit3';

// --- Local State ---
let panelContainer = null;
let gameContentOriginalParent = null;
let activeGameId = null;

// Game-specific state variables
let sQNum, sScore;
let lTimer, lLives, lScore, lCurrentQ, lQuestions;
let sMFlipped, sMLock, sMMoves, sMMatches;
let eQNum, eTries;
let jigsawTimerInterval, jigsawSeconds, jigsawLives, jigsawCurrentImage, jigsawPiecesCount, highlightedSlotIndex = null;


// --- Game Data ---
const SOUL_QUIZ = EXTRA_CONTENT.find(item=>item.id === 'games-SOUL_QUIZ').data;
const LIGHTNING_QUESTIONS = EXTRA_CONTENT.find(item=>item.id === 'games-LIGHTNING_QUESTIONS').data;
const STAR_MATCH_SYMBOLS = EXTRA_CONTENT.find(item=>item.id === 'games-STAR_MATCH_SYMBOLS').data;
const TAROT = EXTRA_CONTENT.find(item=>item.id === 'games-TAROT').data;
const ECHOES_QUIZ = EXTRA_CONTENT.find(item=>item.id === 'games-ECHOES_QUIZ').data;
const ECHOES = EXTRA_CONTENT.find(item=>item.id === 'games-ECHOES').data;
const TWO_TRUTHS_SETS = EXTRA_CONTENT.find(item=>item.id === 'games-TWO_TRUTHS_SETS').data;
const JIGSAW_IMAGES = EXTRA_CONTENT.find(item=>item.id === 'games-JIGSAW_IMAGES').data;
const FORTUNES = EXTRA_CONTENT.find(item=>item.id === 'games-FORTUNES').data;
const REWARDS = EXTRA_CONTENT.find(item=>item.id === 'games-REWARDS').data;


// --- HTML Template ---

function getGamesPanelHTML() {
    return `
    <div id="games-panel" class="content-panel active">
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
                    <div class="game-card"><div class="game-card-header"><span class="card-icon">🎭</span><h2>真假回忆<br>Two Truths, One Lie</h2><p>Three statements about your story are presented. Two are true, one is false. Can you spot the lie?</p></div><button class="action-button" data-game="two-truths">Begin Deception</button><div id="two-truths-content" class="game-content"><div id="two-truths-options"></div><div id="two-truths-feedback" class="result-display" style="display:none; margin-top:20px;"></div><button class="action-button" id="two-truths-next" style="display:none; margin: 20px auto 0;">Next Round</button></div></div>
                </main>
            </div>
            <div id="interplay-games" class="games-section">
                <h2 class="section-title">Sanctuary of Interplay</h2>
                <main class="games-grid">
                    <div class="game-card"><div class="game-card-header"><span class="card-icon">💬</span><h2>心有灵犀<br>Echoes of the Heart</h2><p>Can you tell who's speaking? Guess if the quote belongs to Nic or Zoya. You have two tries!</p></div><button class="action-button" data-game="echoes-quiz">Hear the Echoes</button><div id="echoes-quiz-content" class="game-content"><div id="echoes-quiz-question" class="question-box"></div><div id="echoes-quiz-options"></div><div id="echoes-quiz-feedback" class="result-display" style="display: none; margin-top: 20px;"></div></div></div>
                    <div class="game-card"><div class="game-card-header"><span class="card-icon">🧩</span><h2>星辰拼图<br>Celestial Jigsaw</h2><p>A cherished memory has been shattered! Piece it back together against the clock.</p></div><button class="action-button" data-game="jigsaw">Rebuild Memory</button><div id="jigsaw-content" class="game-content"><div id="jigsaw-controls"><button class="action-button" id="jigsaw-preview">Preview</button><button class="action-button" id="jigsaw-retry">Retry</button><button class="action-button" id="jigsaw-new">New Picture</button></div><div class="score-display">Time: <span id="jigsaw-timer">0s</span> | Lives: <span id="jigsaw-lives">❤️❤️❤️</span></div><div id="jigsaw-container"><div id="jigsaw-pieces-container"></div><div id="jigsaw-board"></div></div></div></div>
                    <div class="game-card"><div class="game-card-header"><span class="card-icon">🃏</span><h2>灵魂塔罗<br>Tarot of Souls</h2><p>Draw from the deck of destiny. Will you face a deep truth, a daring challenge, or a prophecy?</p></div><button class="action-button" data-game="tarot">Consult Oracle</button><div id="tarot-content" class="game-content"><select id="tarot-choice" style="margin-bottom: 20px;"><option value="truth">Truth - 揭示真相</option><option value="dare">Dare - 接受挑战</option><option value="prophecy">Prophecy - 预言未来</option></select><div class="tarot-card" id="tarot-card"><div class="tarot-inner"><div class="tarot-face tarot-back">✨</div><div class="tarot-face tarot-front"><div id="tarot-result-icon" style="font-size: 2em; margin-bottom: 10px;"></div><div id="tarot-result-text" style="font-size: 0.9em;"></div></div></div></div><button class="action-button" id="tarot-draw-new" style="margin-top: 20px;">Draw New Card</button></div></div>
                    <div class="game-card"><div class="game-card-header"><span class="card-icon">🥠</span><h2>命运之签<br>Fortune Cookie</h2><p>Break open a cookie from the cosmos. What message does the universe have for you?</p></div><button class="action-button" data-game="fortune">Reveal Fortune</button><div id="fortune-content" class="game-content"><div id="fortune-text" class="result-display success"></div></div></div>
                </main>
            </div>
            <div id="shared-history-games" class="games-section">
                <h2 class="section-title">Hall of Shared History</h2>
                <main class="games-grid" style="max-width: 800px; margin: 0 auto;">
                    <div class="game-card"><div class="game-card-header"><span class="card-icon">📜</span><h2>过往的回响<br>Echoes of the Past</h2><p>Relive a moment from your story. The cosmos asks you to remember and reflect on the path you've walked together.</p></div><button class="action-button" data-game="echoes">Hear the Echo</button><div id="echoes-content" class="game-content"><div id="echo-quote" class="question-box"></div><p id="echo-question" style="text-align: center; font-size: 1.3em; color: var(--gold);"></p><button class="action-button" id="echoes-next" style="display: block; margin: 20px auto 0;">Next Echo</button></div></div>
                </main>
            </div>
        </div>
    </div>
    `;
}

// --- Module-Specific Logic ---

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

function startGame(id, btnElement) {
    if (activeGameId === id) return;
    if (activeGameId !== null) closeGame();
    
    const modalContentWrapper = document.querySelector('#game-play-modal .game-play-modal-content');
    modalContentWrapper.className = 'game-play-modal-content'; // Reset classes
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

    // Attach a dedicated listener to the modal for in-game actions
    $('game-play-modal').addEventListener('click', handleInGameClicks);
    
    // Initialize the specific game
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
    
    // Stop any running timers
    // --- FIX: Add listener removal ---
    modal.removeEventListener('click', handleInGameClicks);

    if (lTimer) clearInterval(lTimer);
    if (jigsawTimerInterval) clearInterval(jigsawTimerInterval);

    if (gameContent && gameContentOriginalParent) {
        gameContent.style.display = 'none';
        gameContentOriginalParent.appendChild(gameContent);
    }
    if (gameArea) gameArea.innerHTML = '';
    gameContentOriginalParent = null;
    if (modal) modal.style.display = 'none';
    activeGameId = null;
}

function triggerReward(title="A Reward from the Cosmos!"){ 
    if ($('reward-title')) $('reward-title').textContent = title; 
    const r = REWARDS[Math.floor(Math.random()*REWARDS.length)]; 
    const d = $('reward-display'); 
    if (d) {
        if(r.type==='photo') d.innerHTML=`<img src="${r.value}" alt="A cherished memory" onerror="this.alt='Photo not found';">`; 
        else d.innerHTML=`<p>${r.value}</p>`; 
    }
    if ($('reward-modal')) $('reward-modal').style.display='block'; 
}
function closeRewardModal(){ if ($('reward-modal')) $('reward-modal').style.display='none'; }

function initSoulQuiz(){ sQNum=0; sScore=0; $('soul-score').textContent=`0 / ${SOUL_QUIZ.length}`; displaySoulQuestion(); }
function displaySoulQuestion(){
    if(sQNum >= SOUL_QUIZ.length){
        let resultText="Resonance test complete!<br><br>";
        if(sScore >= 15){ resultText+="A perfect cosmic resonance! Your souls are deeply intertwined."; triggerReward(); }
        else if(sScore >= 10){ resultText+="A strong connection! Your shared memories shine brightly." }
        else { resultText+="Our memories are a bit hazy... a perfect excuse to create new ones!" }
        $('soul-question').innerHTML = resultText;
        $('soul-options').innerHTML = ``;
        return;
    }
    const q = SOUL_QUIZ[sQNum];
    $('soul-question').innerHTML = q.q;
    $('soul-options').innerHTML = q.o.map((o,i) => `<button class="choice-btn" data-index="${i}">${o}</button>`).join('');
}
function checkSoulAnswer(selectedIndex){
    const qData = SOUL_QUIZ[sQNum];
    const options = $$('#soul-options .choice-btn');
    options.forEach(btn => btn.disabled = true);
    if(selectedIndex === qData.a){ sScore++; options[selectedIndex].style.background = 'var(--jade)'; }
    else { options[selectedIndex].style.background = 'var(--crimson)'; options[qData.a].style.background = 'var(--jade)'; }
    sQNum++;
    updateSoulScore();
    setTimeout(() => displaySoulQuestion(), 1500);
}
function updateSoulScore(){ $('soul-score').textContent = `${sScore} / ${SOUL_QUIZ.length}`; }

function startLoveMeter(){ lLives=3; lScore=0; lQuestions=[...LIGHTNING_QUESTIONS].sort(()=>.5-Math.random()).map(q=>({...q,answered:!1})); $('love-lives').textContent='❤️❤️❤️'; $('love-score').textContent='0'; nextLoveQuestion(); }
function nextLoveQuestion(){
    if(lCurrentQ) lCurrentQ.answered = true;
    lCurrentQ = lQuestions.find(q => !q.answered);
    if(!lCurrentQ || lLives <= 0){
        clearInterval(lTimer);
        $('love-question').innerHTML = `The storm has passed! Final Score: ${lScore}`;
        $('love-options').innerHTML = '';
        if(lScore >= 5) triggerReward();
        return;
    }
    const timerBar = $('love-timer-bar');
    timerBar.style.animation = 'none';
    void timerBar.offsetWidth; // Trigger reflow
    timerBar.style.animation = 'timer_drain 10s linear';
    $('love-question').innerHTML = lCurrentQ.q;
    $('love-options').innerHTML = lCurrentQ.o.map((o,i) => `<button class="choice-btn" data-index="${i}">${o}</button>`).join('');
    lTimer = setTimeout(() => handleLoveAnswer(false), 10000);
}
function handleLoveAnswer(isCorrect){
    clearInterval(lTimer);
    if(isCorrect){ lScore++; $('love-score').textContent = lScore; }
    else { lLives--; $('love-lives').textContent = '❤️'.repeat(lLives) + '🤍'.repeat(3 - lLives); }
    $$('#love-options .choice-btn').forEach(btn => btn.disabled = true);
    setTimeout(() => nextLoveQuestion(), 1200);
}
function checkLoveAnswer(selectedIndex){
    const correct = selectedIndex === lCurrentQ.a;
    if(correct){ $$('#love-options .choice-btn')[selectedIndex].style.background = 'var(--jade)'; }
    else { $$('#love-options .choice-btn')[selectedIndex].style.background = 'var(--crimson)'; }
    handleLoveAnswer(correct);
}

function initStarMatch(){ sMFlipped=[]; sMLock=false; sMMoves=0; sMMatches=0; updateStarMatchScore(); const g=$('star-match-grid'); g.innerHTML=''; [...STAR_MATCH_SYMBOLS,...STAR_MATCH_SYMBOLS].sort(()=>.5-Math.random()).forEach(s=>{ const c=document.createElement('div'); c.className='memory-card'; c.dataset.symbol=s; c.innerHTML=`<div class="face back">?</div><div class="face front">${s}</div>`; c.addEventListener('click',()=>flipStarMatchCard(c)); g.appendChild(c); }); }
function flipStarMatchCard(c){
    if(sMLock || c.classList.contains('flipped')) return;
    c.classList.add('flipped');
    sMFlipped.push(c);
    if(sMFlipped.length === 2){
        sMLock = true;
        sMMoves++;
        if(sMFlipped[0].dataset.symbol === sMFlipped[1].dataset.symbol){
            sMMatches++;
            sMFlipped.forEach(c => c.classList.add('matched'));
            sMFlipped = [];
            sMLock = false;
            if(sMMatches === STAR_MATCH_SYMBOLS.length){
                let resultText="Nexus Cleared! ";
                if(sMMoves <= 12){ resultText+="A true cosmic memory master!" }
                else if(sMMoves <= 18){ resultText+="Stellar recall! Our memories are strong." }
                else { resultText+="Lost among the stars, but we found our way back together!" }
                document.querySelector('#star-match-content .score-display').innerHTML=`Moves: ${sMMoves} | Matches: 8/8 <br><span style='font-size: 0.7em;color:var(--gold)'>${resultText}</span>`;
                triggerReward();
            }
        } else {
            setTimeout(()=>{ sMFlipped.forEach(c => c.classList.remove('flipped')); sMFlipped = []; sMLock = false; }, 1200);
        }
        updateStarMatchScore();
    }
}
function updateStarMatchScore(){ if(sMMatches < STAR_MATCH_SYMBOLS.length) $('star-match-moves').textContent = sMMoves; $('star-match-matches').textContent = `${sMMatches}/8`; }

function drawTarot(){ const cardElement=$('tarot-card'); if(cardElement.classList.contains('flipped')){ cardElement.classList.remove('flipped'); } setTimeout(()=>{ const choice=$('tarot-choice').value; const deck=TAROT[choice]; const cardData=deck[Math.floor(Math.random()*deck.length)]; $('tarot-result-icon').textContent=cardData.i; $('tarot-result-text').innerHTML=cardData.t; cardElement.classList.add('flipped'); }, 400); }

function initEchoesQuiz(){ eQNum=0; displayEchoesQuestion(); }
function displayEchoesQuestion(){
    eTries = 2;
    const feedbackEl = $('echoes-quiz-feedback');
    feedbackEl.style.display = 'none';
    if(eQNum >= ECHOES_QUIZ.length){
        $('echoes-quiz-question').textContent="You know our hearts well!";
        $('echoes-quiz-options').innerHTML="";
        triggerReward();
        return;
    }
    const q = ECHOES_QUIZ[eQNum];
    $('echoes-quiz-question').innerHTML = `"${q.q}"`;
    $('echoes-quiz-options').innerHTML = `<button class="choice-btn" data-choice="Nic">Nic</button><button class="choice-btn" data-choice="Zoya">Zoya</button>`;
}
function checkEchoesAnswer(choice){
    const feedbackEl = $('echoes-quiz-feedback');
    const qData = ECHOES_QUIZ[eQNum];
    if(choice === qData.a){
        feedbackEl.textContent="Correct! You heard the echo truly.";
        feedbackEl.className='result-display success';
        feedbackEl.style.display='block';
        $$('#echoes-quiz-options .choice-btn').forEach(btn => btn.disabled = true);
        eQNum++;
        setTimeout(() => displayEchoesQuestion(), 1500);
    } else {
        eTries--;
        if(eTries > 0){
            feedbackEl.textContent = `Not quite. ${eTries} try remaining.`;
            feedbackEl.className = 'result-display fail';
            feedbackEl.style.display = 'block';
        } else {
            feedbackEl.textContent = `That was from ${qData.a}'s heart. Moving on...`;
            feedbackEl.className = 'result-display';
            feedbackEl.style.display = 'block';
            $$('#echoes-quiz-options .choice-btn').forEach(btn => btn.disabled = true);
            eQNum++;
            setTimeout(() => displayEchoesQuestion(), 2500);
        }
    }
}

function initEchoes(){ nextEcho(); }
function nextEcho(){ const echo=ECHOES[Math.floor(Math.random()*ECHOES.length)]; $('echo-quote').textContent=`"${echo.quote}"`; $('echo-question').textContent=echo.question; }

function initTwoTruths(){ const set=TWO_TRUTHS_SETS[Math.floor(Math.random()*TWO_TRUTHS_SETS.length)]; const options=[{text:set.t1,isLie:!1},{text:set.t2,isLie:!1},{text:set.lie,isLie:!0}].sort(()=>.5-Math.random()); $('two-truths-options').innerHTML=options.map((opt,i)=>`<button class="choice-btn" data-lie="${opt.isLie}">${opt.text}</button>`).join(''); $('two-truths-feedback').style.display='none'; $('two-truths-next').style.display='none'; }
function checkLie(isLie, btn){
    $$('#two-truths-options .choice-btn').forEach(b => b.disabled = true);
    const feedbackEl = $('two-truths-feedback');
    if(isLie){
        feedbackEl.textContent="You found the lie! Your memory is sharp.";
        feedbackEl.className='result-display success';
        triggerReward();
    } else {
        feedbackEl.textContent="That was a truth! The lie is still hiding.";
        feedbackEl.className='result-display fail';
        btn.style.background='var(--crimson)';
    }
    feedbackEl.style.display='block';
    $('two-truths-next').style.display='block';
}

function initJigsaw(newImage=true){
    clearInterval(jigsawTimerInterval);
    highlightedSlotIndex = null;
    jigsawSeconds = 0;
    jigsawLives = 3;
    let piecesX = 4, piecesY = 4;
    const board = $('jigsaw-board');
    if(newImage || !jigsawCurrentImage) jigsawCurrentImage = JIGSAW_IMAGES[Math.floor(Math.random() * JIGSAW_IMAGES.length)];
    const img = new Image();
    img.onload = () => { // This onload function is key. Code inside only runs when the image is ready.
        const boardSize = Math.min(400, window.innerWidth - 300);
        const pieceWidth = boardSize / piecesX;
        const pieceHeight = boardSize / piecesY;
        jigsawPiecesCount = piecesX * piecesY;
        board.innerHTML = '';
        $('jigsaw-pieces-container').innerHTML = '';
        board.style.width = `${boardSize}px`;
        board.style.height = `${boardSize}px`;
        board.style.gridTemplateColumns = `repeat(${piecesX}, 1fr)`;
        let pieces = [];
        for(let i = 0; i < jigsawPiecesCount; i++){
            const row = Math.floor(i / piecesX), col = i % piecesX;
            const piece = document.createElement('div');
            piece.className = 'jigsaw-piece';
            piece.draggable = true;
            piece.dataset.index = i;
            piece.style.width = `${pieceWidth}px`;
            piece.style.height = `${pieceHeight}px`;
            piece.style.backgroundImage = `url(${jigsawCurrentImage})`;
            piece.style.backgroundSize = `${boardSize}px ${boardSize}px`;
            piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;
            piece.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', i));
            piece.addEventListener('click', () => handlePieceClick(piece));
            pieces.push(piece);
            
            const slot = document.createElement('div');
            slot.className = 'jigsaw-slot';
            slot.dataset.index = i;
            slot.textContent = i + 1;
            slot.addEventListener('dragover', e => e.preventDefault());
            slot.addEventListener('drop', handleJigsawDrop);
            slot.addEventListener('click', () => handleSlotClick(slot, i));
            board.appendChild(slot);
        }
        pieces.sort(() => .5 - Math.random()).forEach(p => $('jigsaw-pieces-container').appendChild(p));
        startJigsawTimer();
        updateJigsawLives();
    };
    img.src = jigsawCurrentImage;
}
function checkJigsawMove(pieceElement, slotElement){
    const pieceIndex = pieceElement.dataset.index;
    const slotIndex = slotElement.dataset.index;
    const board = $('jigsaw-board');
    if(pieceIndex == slotIndex){
        slotElement.innerHTML = '';
        slotElement.appendChild(pieceElement);
        pieceElement.draggable = false;
        pieceElement.style.cursor = 'default';
        if(board.querySelectorAll('.jigsaw-piece').length === jigsawPiecesCount){
            clearInterval(jigsawTimerInterval);
            triggerReward(`Puzzle Solved in ${jigsawSeconds}s!`);
        }
    } else {
        jigsawLives--;
        updateJigsawLives();
        board.classList.add('shake-error');
        setTimeout(() => board.classList.remove('shake-error'), 300);
        if(jigsawLives <= 0){
            clearInterval(jigsawTimerInterval);
            alert("Out of lives! The memory fades... Try again.");
        }
    }
    const currentlyHighlighted = document.querySelector('.jigsaw-slot.highlighted');
    if(currentlyHighlighted){ currentlyHighlighted.classList.remove('highlighted'); }
    highlightedSlotIndex = null;
}
function handleSlotClick(slotElement, index){
    if(slotElement.hasChildNodes() && slotElement.textContent.trim() === '') return;
    const currentlyHighlighted = document.querySelector('.jigsaw-slot.highlighted');
    if(currentlyHighlighted){ currentlyHighlighted.classList.remove('highlighted'); }
    if(highlightedSlotIndex === index){ highlightedSlotIndex = null; return; }
    slotElement.classList.add('highlighted');
    highlightedSlotIndex = index;
}
function handlePieceClick(pieceElement){
    if(pieceElement.parentNode.id !== 'jigsaw-pieces-container') return;
    if(highlightedSlotIndex !== null){
        const targetSlot = document.querySelector(`.jigsaw-slot[data-index='${highlightedSlotIndex}']`);
        if(targetSlot){ checkJigsawMove(pieceElement, targetSlot); }
    }
}
function handleJigsawDrop(e){
    e.preventDefault();
    const slotElement = e.currentTarget;
    if(slotElement.hasChildNodes() && slotElement.textContent.trim() === '') return;
    const pieceIndex = e.dataTransfer.getData('text');
    const pieceElement = document.querySelector(`#jigsaw-pieces-container .jigsaw-piece[data-index='${pieceIndex}']`);
    if(pieceElement){ checkJigsawMove(pieceElement, slotElement); }
}
function startJigsawTimer(){ jigsawTimerInterval=setInterval(()=>{ jigsawSeconds++; $('jigsaw-timer').textContent=`${jigsawSeconds}s` },1000); }
function updateJigsawLives(){ $('jigsaw-lives').textContent='❤️'.repeat(jigsawLives)+'🤍'.repeat(3-jigsawLives); }
function retryJigsaw(){ initJigsaw(false); }
function newJigsaw(){ initJigsaw(true); }
function showJigsawPreview(){ if($('reward-title')) $('reward-title').textContent="Memory Preview"; if($('reward-display')) $('reward-display').innerHTML=`<img src="${jigsawCurrentImage}" alt="Jigsaw Preview">`; if($('reward-modal')) $('reward-modal').style.display='block'; }

function newFortune(){ $('fortune-text').textContent=FORTUNES[Math.floor(Math.random()*FORTUNES.length)]; triggerReward(); }

// --- Event Handlers ---

function handleInGameClicks(e) {
    const target = e.target;
    const closest = (selector) => target.closest(selector);

    // Soul Quiz
    if (closest('#soul-options .choice-btn')) {
        checkSoulAnswer(parseInt(closest('#soul-options .choice-btn').dataset.index, 10));
    }
    // Love Meter
    else if (closest('#love-options .choice-btn')) {
        checkLoveAnswer(parseInt(closest('#love-options .choice-btn').dataset.index, 10));
    }
    // Two Truths
    else if (closest('#two-truths-options .choice-btn')) {
        checkLie(closest('#two-truths-options .choice-btn').dataset.lie === 'true', target);
    }
    else if (closest('#two-truths-next')) {
        initTwoTruths();
    }
    // Echoes Quiz
    else if (closest('#echoes-quiz-options .choice-btn')) {
        checkEchoesAnswer(closest('#echoes-quiz-options .choice-btn').dataset.choice);
    }
    // Jigsaw
    else if (closest('#jigsaw-preview')) { showJigsawPreview(); }
    else if (closest('#jigsaw-retry')) { retryJigsaw(); }
    else if (closest('#jigsaw-new')) { newJigsaw(); }
    // Tarot
    else if (closest('#tarot-card')) { target.closest('.tarot-card').classList.toggle('flipped'); }
    else if (closest('#tarot-draw-new')) { drawTarot(); }
    // Echoes
    else if (closest('#echoes-next')) { nextEcho(); }
}

function handleGameClicks(e) {
    const target = e.target;
    const closest = (selector) => target.closest(selector);

    if (closest('.hall-card')) { 
        showGamesView(closest('.hall-card').dataset.hall); 
    }
    else if (closest('.back-button')) { 
        showHallsView(); 
    }
    else if (closest('.action-button[data-game]')) { 
        startGame(closest('.action-button').dataset.game, target); 
    }
}


// --- Public Module Functions ---

/**
 * Renders the Games panel into the main content area.
 * @param {HTMLElement} mainContent - The element to render content into.
 */
export function render(mainContent) {
    panelContainer = mainContent;
    panelContainer.innerHTML = getGamesPanelHTML();
    
    // Attach listeners
    panelContainer.addEventListener('click', handleGameClicks);
    $('game-play-modal').querySelector('.close-button').addEventListener('click', closeGame);
    $('reward-modal').querySelector('.close-button').addEventListener('click', closeRewardModal);

    // Expose functions to global scope for HTML onclick attributes
    window.closeGame = closeGame;
    window.closeRewardModal = closeRewardModal;
    window.triggerReward = triggerReward; // Expose for other modules if needed
}

/**
 * Cleans up intervals and event listeners when the panel is unloaded.
 */
export function cleanup() {
    if (panelContainer) {
        panelContainer.removeEventListener('click', handleGameClicks);
    }
    
    // Clean up any active game timers
    if (lTimer) clearInterval(lTimer);
    if (jigsawTimerInterval) clearInterval(jigsawTimerInterval);
    
    // Close any open modals
    closeGame();
    closeRewardModal();

    panelContainer = null;
    activeGameId = null;
}
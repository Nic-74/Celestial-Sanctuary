// ===================================================================
//  MODULE: A LETTER TO ZOYA (js/modules/letter.js)
// ===================================================================

import { EDITABLE_CONFIG } from '../common.js?v=20260917-vault';


let typewriterTimeout = null;

function getLetter() {
    return (EDITABLE_CONFIG.LETTERS_DATA.find(item => item.id === 'original-letter')?.text || '').split('\n');
}

function getLetterHTML() {
    return `
    <div id="letter-panel" class="content-panel active">
        <div class="letter-outer">
            <div class="letter-petal-layer" id="letter-petals" aria-hidden="true"></div>

            <div class="letter-envelope-seal">💌</div>

            <h2 class="letter-heading">A Letter to Zoya</h2>
            <p class="letter-subheading">
                <span class="chinese-subtitle">致最爱的紫娅</span>
            </p>

            <div class="letter-parchment">
                <div class="letter-parchment-corner tl"></div>
                <div class="letter-parchment-corner tr"></div>
                <div class="letter-parchment-corner bl"></div>
                <div class="letter-parchment-corner br"></div>
                <div id="letter-body" class="letter-body"></div>
                <div id="letter-cursor" class="letter-cursor">|</div>
            </div>

            <div class="letter-replay-wrap">
                <button id="letter-replay-btn" class="btn letter-replay-btn" title="Read the letter again">
                    ↺ Read Again
                </button>
            </div>
        </div>
    </div>
    `;
}

function spawnPetals() {
    const layer = document.getElementById('letter-petals');
    if (!layer) return;
    layer.innerHTML = '';
    const petals = ['🌸', '🌷', '🌺', '✿', '❀'];
    for (let i = 0; i < 18; i++) {
        const petal = document.createElement('span');
        petal.className = 'letter-petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${6 + Math.random() * 8}s`;
        petal.style.animationDelay = `${Math.random() * 6}s`;
        petal.style.fontSize = `${0.8 + Math.random() * 1.2}rem`;
        layer.appendChild(petal);
    }
}

function typewriteLetter(lines, onDone) {
    const body = document.getElementById('letter-body');
    const cursor = document.getElementById('letter-cursor');
    if (!body) return;
    body.innerHTML = '';

    let lineIdx = 0;
    let charIdx = 0;
    let para = null;

    function nextChar() {
        if (lineIdx >= lines.length) {
            if (cursor) cursor.style.display = 'none';
            if (onDone) onDone();
            return;
        }

        const line = lines[lineIdx];

        // Start a new paragraph for each line
        if (charIdx === 0) {
            para = document.createElement('p');
            para.className = 'letter-line';
            if (line === '') para.classList.add('letter-spacer');
            body.appendChild(para);
            // Move cursor after new para
            if (cursor) body.parentElement.appendChild(cursor);
        }

        if (line === '') {
            // Empty line — just advance
            lineIdx++;
            charIdx = 0;
            typewriterTimeout = setTimeout(nextChar, 80);
            return;
        }

        if (charIdx < line.length) {
            para.textContent += line[charIdx];
            charIdx++;
            typewriterTimeout = setTimeout(nextChar, 28);
        } else {
            lineIdx++;
            charIdx = 0;
            typewriterTimeout = setTimeout(nextChar, 120);
        }
    }

    nextChar();
}

export function render(container) {
    container.innerHTML = getLetterHTML();
    spawnPetals();

    const alreadySeen = sessionStorage.getItem('letter-seen');

    if (alreadySeen) {
        // Just display full letter instantly
        const body = document.getElementById('letter-body');
        const cursor = document.getElementById('letter-cursor');
        if (body) {
            body.innerHTML = getLetter().map(line =>
                line === ''
                    ? `<p class="letter-line letter-spacer"></p>`
                    : `<p class="letter-line">${line}</p>`
            ).join('');
        }
        if (cursor) cursor.style.display = 'none';
    } else {
        sessionStorage.setItem('letter-seen', 'true');
        // Small delay before starting typewriter
        typewriterTimeout = setTimeout(() => {
            typewriteLetter(getLetter());
        }, 600);
    }

    const replayBtn = document.getElementById('letter-replay-btn');
    if (replayBtn) {
        replayBtn.addEventListener('click', () => {
            if (typewriterTimeout) clearTimeout(typewriterTimeout);
            const cursor = document.getElementById('letter-cursor');
            if (cursor) cursor.style.display = '';
            typewriteLetter(getLetter());
        });
    }
}

export function cleanup() {
    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
        typewriterTimeout = null;
    }
}

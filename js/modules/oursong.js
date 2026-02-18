// ===================================================================
//  MODULE: OUR SONG (js/modules/oursong.js)
// ===================================================================

import { AppState, EDITABLE_CONFIG } from '../common.js';

// The song index to feature (0 = song1.mp3). Change this to any index.
const FEATURED_SONG_INDEX = 0;

const DEDICATION_TEXT = `
    There is a song that carries every version of us inside it.
    I heard it and thought of you before I even knew your name properly —
    something in the melody felt like the feeling of standing near you.

    Every time it plays, I am back in every moment we have shared.
    The quiet ones. The loud ones. The ones where we said nothing at all
    and still understood each other perfectly.

    This one is for you, Zoya. Always.
`;

// Fill these in with real lyrics or leave as placeholders
const LYRICS = [
    { en: "[ Fill in the lyrics here ]", zh: "「 在这里填写歌词 」" },
    { en: "[ Every line a memory ]", zh: "「 每一行都是回忆 」" },
    { en: "[ Every note a promise ]", zh: "「 每一音符都是承诺 」" },
];

function getOurSongHTML(song) {
    const title = song ? song.title : 'Our Song';
    const artist = song ? song.artist : 'Nini & Zoya';
    return `
    <div id="oursong-panel" class="content-panel active">
        <div class="oursong-outer">

            <div class="oursong-vinyl-wrap">
                <div class="oursong-vinyl" id="oursong-vinyl">
                    <div class="oursong-vinyl-label">
                        <span class="oursong-vinyl-title">${title}</span>
                        <span class="oursong-vinyl-artist">${artist}</span>
                    </div>
                </div>
                <div class="oursong-needle" id="oursong-needle"></div>
            </div>

            <div class="oursong-info">
                <h2 class="oursong-title">${title}</h2>
                <p class="oursong-artist">${artist}</p>
                <p class="oursong-subtitle"><span class="chinese-subtitle">我们的歌</span></p>
            </div>

            <div class="oursong-controls">
                <button id="oursong-play-btn" class="oursong-play-btn" title="Play / Pause">
                    ▶
                </button>
            </div>

            <div class="oursong-dedication">
                <div class="oursong-dedication-inner">
                    ${DEDICATION_TEXT.trim().split('\n').map(l => `<p>${l.trim()}</p>`).join('')}
                </div>
            </div>

            <div class="oursong-lyrics">
                <h3 class="oursong-lyrics-heading">✦ Lyrics ✦</h3>
                <div class="oursong-lyrics-body">
                    ${LYRICS.map(line => `
                        <div class="oursong-lyric-line">
                            <span class="lyric-en">${line.en}</span>
                            <span class="lyric-zh">${line.zh}</span>
                        </div>
                    `).join('')}
                </div>
                <p class="oursong-lyrics-note">
                    ✎ To add real lyrics, edit <code>LYRICS</code> in <code>js/modules/oursong.js</code>
                </p>
            </div>

        </div>
    </div>
    `;
}

let songAudio = null;
let isPlaying = false;

function togglePlay(song) {
    const btn = document.getElementById('oursong-play-btn');
    const vinyl = document.getElementById('oursong-vinyl');
    const needle = document.getElementById('oursong-needle');

    if (!songAudio) {
        const src = song ? song.src : 'music/song1.mp3';
        songAudio = new Audio(src);
        songAudio.volume = 0.8;
        songAudio.addEventListener('ended', () => {
            isPlaying = false;
            if (btn) btn.textContent = '▶';
            if (vinyl) vinyl.classList.remove('spinning');
            if (needle) needle.classList.remove('dropped');
        });
    }

    if (isPlaying) {
        songAudio.pause();
        isPlaying = false;
        if (btn) btn.textContent = '▶';
        if (vinyl) vinyl.classList.remove('spinning');
        if (needle) needle.classList.remove('dropped');
    } else {
        songAudio.play().catch(e => console.warn('Audio play blocked:', e));
        isPlaying = true;
        if (btn) btn.textContent = '⏸';
        if (vinyl) vinyl.classList.add('spinning');
        if (needle) needle.classList.add('dropped');
    }
}

export function render(container) {
    const song = EDITABLE_CONFIG.SONGS_DATA[FEATURED_SONG_INDEX] || null;
    container.innerHTML = getOurSongHTML(song);

    const playBtn = document.getElementById('oursong-play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', () => togglePlay(song));
    }
}

export function cleanup() {
    if (songAudio) {
        songAudio.pause();
        songAudio = null;
    }
    isPlaying = false;
}

import { createListeningRoom } from '../listening-room.js?v=20260917-vault';
import { ALL_TRACKS } from '../music-catalog.js?v=20260917-vault';
// ===================================================================
//  MODULE: OUR SONG (js/modules/oursong.js)
// ===================================================================

import { AppState, EDITABLE_CONFIG } from '../common.js?v=20260917-vault';

import { openDanceMemory } from '../dance-memory.js?v=20260917-vault';

// The song index to feature (0 = song1.mp3). Change this to any index.
const FEATURED_SONG_INDEX = 0;

const DEDICATION_TEXT = `
    On 22 August, in our secret place, we danced.
    These were the songs that sparked something between us,
    before we found the words for our confession.

    This playlist holds that memory for us.
    Whenever you press play, there is another dance waiting here.

    For you, Zoya. Always.
`;

function getOurSongHTML(song) {
    const title = song ? song.title : 'Our Song';
    const artist = song ? song.artist : 'Nini & Zoya';
    return `
    <div id="oursong-panel" class="content-panel active">
        <div class="oursong-outer">
            <section class="oursong-dance-keepsake">
                <span class="dance-date">22 AUGUST · OUR SECRET PLACE</span>
                <h3>Before we said it, we danced.</h3>
                <p>The playlist that turned our sparks into a confession.</p>
                <button id="oursong-dance-button" class="dance-play">♡ Dance with me again</button>
            </section>

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
                <button id="oursong-play-btn" class="oursong-play-btn" title="Play / Pause" aria-label="Play or pause our recording">
                    ▶
                </button>
            </div>

            <p id="oursong-status" role="status"></p>
            <div class="oursong-dedication">
                <div class="oursong-dedication-inner">
                    ${DEDICATION_TEXT.trim().split('\n').map(l => `<p>${l.trim()}</p>`).join('')}
                </div>
            </div>

            <section id="oursong-songbook" aria-label="Our songbook"></section>

        </div>
    </div>
    `;
}

let room;
let songAudio = null;
let isPlaying = false;

async function togglePlay(song) {
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
        room?.stop();
    document.getElementById('oursong-video-slot')?.replaceChildren();
        document.querySelectorAll('.oursong-track').forEach(button => button.setAttribute('aria-pressed', 'false'));
        pauseBackgroundMusic();
        try {
            await songAudio.play();
        } catch (error) {
            const status = document.getElementById('oursong-status');
            if (status) status.textContent = 'This recording could not play. Try a song below.';
            return;
        }
        if (!document.getElementById('oursong-play-btn')) return;
        isPlaying = true;
        if (btn) btn.textContent = '⏸';
        if (vinyl) vinyl.classList.add('spinning');
        if (needle) needle.classList.add('dropped');
    }
}

function pauseBackgroundMusic() {
    AppState.music.player?.pause();
    AppState.music.isPlaying = false;
    const globalButton = document.getElementById('play-pause-btn');
    if (globalButton) globalButton.textContent = '▶️';
    AppState.landingAudioPlayer?.pause();
}

function stopForDance() {
    songAudio?.pause();
    isPlaying = false;
    room?.stop();
    document.getElementById('oursong-video-slot')?.replaceChildren();
    const button = document.getElementById('oursong-play-btn');
    if (button) button.textContent = '▶';
    document.getElementById('oursong-vinyl')?.classList.remove('spinning');
    document.getElementById('oursong-needle')?.classList.remove('dropped');
}

export function render(container) {
    const song = EDITABLE_CONFIG.SONGS_DATA[FEATURED_SONG_INDEX] || null;
    container.innerHTML = getOurSongHTML(song);
    container.querySelector('#oursong-dance-button').addEventListener('click', openDanceMemory);
    document.addEventListener('sanctuary:dance-open', stopForDance);

    room = createListeningRoom(container.querySelector('#oursong-songbook'), [...ALL_TRACKS, ...EDITABLE_CONFIG.SONGS_DATA], () => {
        songAudio?.pause(); isPlaying = false;
        document.getElementById('oursong-play-btn').textContent = '▶';
        document.getElementById('oursong-vinyl').classList.remove('spinning');
        document.getElementById('oursong-needle').classList.remove('dropped');
        pauseBackgroundMusic();
    });
    const playBtn = document.getElementById('oursong-play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', () => togglePlay(song));
    }
}

export function cleanup() {
    document.removeEventListener('sanctuary:dance-open', stopForDance);
    room?.destroy();
    room = null;
    document.getElementById('oursong-video-slot')?.replaceChildren();
    if (songAudio) {
        songAudio.pause();
        songAudio = null;
    }
    isPlaying = false;
}

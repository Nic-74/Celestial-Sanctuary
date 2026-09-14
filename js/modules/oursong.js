// ===================================================================
//  MODULE: OUR SONG (js/modules/oursong.js)
// ===================================================================

import { AppState, EDITABLE_CONFIG } from '../common.js?v=20260914b';

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

// Official artist videos; loaded only when a visitor chooses a song.
const LISTENING_ROOM = [
    { title: 'Let Me Down Slowly', artist: 'Alec Benjamin', videoId: '50VNCymT-Cs' },
    { title: 'Perfect', artist: 'Ed Sheeran', videoId: '2Vv-BfVoq4g' },
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

            <section class="oursong-listening-room" aria-labelledby="listening-room-title">
                <p class="oursong-eyebrow">THE SOUNDTRACK OF US</p>
                <h3 id="listening-room-title">Stay for one more song</h3>
                <p>For the quiet evenings, the distance, and every dance still to come.</p>
                <div class="oursong-track-list">
                    ${LISTENING_ROOM.map((track, index) => `
                        <button class="oursong-track" data-track="${index}" aria-pressed="false">
                            <span class="oursong-track-number">0${index + 1}</span>
                            <span><strong>${track.title}</strong><small>${track.artist}</small></span>
                            <span aria-hidden="true">↗</span>
                        </button>
                    `).join('')}
                </div>
                <div id="oursong-video-slot"></div>
                <p class="oursong-listening-note">Choose a song to load its official YouTube player, then press play. Availability may vary by region.</p>
            </section>

        </div>
    </div>
    `;
}

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

function selectTrack(index) {
    const track = LISTENING_ROOM[index];
    if (!track) return;
    songAudio?.pause();
    isPlaying = false;
    document.getElementById('oursong-play-btn').textContent = '▶';
    document.getElementById('oursong-vinyl').classList.remove('spinning');
    document.getElementById('oursong-needle').classList.remove('dropped');
    pauseBackgroundMusic();
    document.querySelectorAll('.oursong-track').forEach(button => {
        button.setAttribute('aria-pressed', String(Number(button.dataset.track) === index));
    });
    const slot = document.getElementById('oursong-video-slot');
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${track.videoId}`;
    frame.title = `${track.title} — ${track.artist}, official music video`;
    frame.allow = 'encrypted-media; fullscreen; picture-in-picture';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    const fallback = document.createElement('a');
    fallback.href = `https://www.youtube.com/watch?v=${track.videoId}`;
    fallback.target = '_blank';
    fallback.rel = 'noopener noreferrer';
    fallback.textContent = `Open ${track.title} on YouTube ↗`;
    slot.replaceChildren(frame, fallback);
}

export function render(container) {
    const song = EDITABLE_CONFIG.SONGS_DATA[FEATURED_SONG_INDEX] || null;
    container.innerHTML = getOurSongHTML(song);

    container.querySelectorAll('.oursong-track').forEach(button => {
        button.addEventListener('click', () => selectTrack(Number(button.dataset.track)));
    });
    const playBtn = document.getElementById('oursong-play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', () => togglePlay(song));
    }
}

export function cleanup() {
    document.getElementById('oursong-video-slot')?.replaceChildren();
    if (songAudio) {
        songAudio.pause();
        songAudio = null;
    }
    isPlaying = false;
}

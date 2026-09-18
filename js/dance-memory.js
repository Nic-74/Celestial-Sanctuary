import { createListeningRoom } from './listening-room.js?v=20260919-audit3';
import { DANCE_TRACKS } from './music-catalog.js?v=20260919-audit3';
import { AppState } from './common.js?v=20260919-audit3';

const PLAYLIST_ID = 'PLbRstMs51Aq7Cd1QfnlRr0y8pzEJqTIsf';
const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;
let dialog;
let previousFocus;
let room;

export function openDanceMemory() {
    if (!dialog || dialog.open) return;
    previousFocus = document.activeElement;
    AppState.music.player?.pause();
    AppState.music.isPlaying = false;
    AppState.landingAudioPlayer?.pause();
    const button = document.getElementById('play-pause-btn');
    if (button) button.textContent = '▶️';
    // Each panel stops its own audio before the shared playlist opens.
    document.dispatchEvent(new Event('sanctuary:dance-open'));
    room = createListeningRoom(dialog.querySelector('#dance-player'), DANCE_TRACKS);
    dialog.showModal();
    document.body.classList.add('dance-memory-open');
}

export function initDanceMemory() {
    dialog = document.getElementById('dance-memory');
    dialog.innerHTML = `
        <button class="dance-close" aria-label="Close our dance memory">×</button>
        <div class="dance-illustration" aria-hidden="true">
            <svg viewBox="0 0 400 200"><defs><linearGradient id="dance-gold"><stop stop-color="#f5dca6"/><stop offset="1" stop-color="#e9a8c7"/></linearGradient></defs>
            <ellipse cx="200" cy="174" rx="128" ry="16" fill="none" stroke="#d9b98a" opacity=".2"/>
            <g fill="none" stroke="url(#dance-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="174" cy="62" r="10"/><path d="M172 73 Q157 99 169 124 L151 164 M169 124 L188 164 M165 86 L200 98 L222 80 M172 83 L203 54 L220 42"/>
                <circle cx="227" cy="65" r="9"/><path d="M224 74 Q234 93 223 112 Q224 128 259 147 Q223 161 195 143 Q213 124 216 105 L219 83 M217 85 L201 75 L220 42 M225 87 L203 99 M218 150 L217 173 M235 153 L244 172"/>
                <path d="M113 51 l3 -10 3 10 10 3 -10 3 -3 10 -3 -10 -10 -3Z M285 89 l3 -8 3 8 8 3 -8 3 -3 8 -3 -8 -8 -3Z"/>
            </g><g fill="#ecd3a9"><circle cx="93" cy="108" r="1.5"/><circle cx="306" cy="45" r="2"/><circle cx="149" cy="26" r="1.5"/><circle cx="269" cy="27" r="1.5"/></g></svg>
        </div>
        <p class="dance-date">22 AUGUST 2021 · OUR SECRET PLACE</p>
        <h2 id="dance-title">Before we said it,<br>we <em>danced.</em></h2>
        <p class="dance-intro">The songs we moved to. The sparks we carried home.<br>The little world that led us to our confession.</p>
        <div id="dance-player"></div>
        <a class="dance-youtube" href="${PLAYLIST_URL}" target="_blank" rel="noopener noreferrer">Open our original playlist on YouTube ↗</a>
        <p class="dance-signature">One more dance, with you.</p>`;
    dialog.querySelector('.dance-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
        const bounds = dialog.getBoundingClientRect();
        if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => {
        document.body.classList.remove('dance-memory-open');
        room?.destroy(); room = null;
        if (previousFocus?.isConnected) previousFocus.focus();
    });
    document.querySelector('#open-dance-memory').addEventListener('click', openDanceMemory);
    window.addEventListener('hashchange', () => { if (dialog.open) dialog.close(); });
}

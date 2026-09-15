import { AppState } from './common.js?v=20260915';

const PLAYLIST_ID = 'PLbRstMs51Aq7Cd1QfnlRr0y8pzEJqTIsf';
const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;
const DANCE_TRACKS = [
    { id: 'vjYo87hc51c', title: 'Moonlight', artist: 'The Romance of Tiger and Rose OST' },
    { id: 'waK_iZVSJX0', title: '安静 · Silence', artist: 'Jay Chou' },
    { id: '0LHmevWVvpc', title: 'I Wanna Grow Old With You', artist: 'Westlife' },
    { id: 'bqIxCtEveG8', title: 'Beneath Your Beautiful', artist: 'Labrinth feat. Emeli Sandé' },
    { id: 'DHhG0m35TSM', title: 'I Guess I’m in Love', artist: 'Clinton Kane' },
    { id: 'jbLW2FtCliA', title: 'Can’t Help Falling in Love', artist: 'Alyssa Baker cover' },
    { id: 'rRCKcsjrsMI', title: 'My Heart Will Go On', artist: 'Chinese version' },
    { id: 'GYQ1I0-TcTI', title: 'Slowly', artist: 'Meddy' },
];
let dialog;
let previousFocus;

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
        <div id="dance-player"><button id="load-dance-playlist" class="dance-play">▶ &nbsp; Play the songs we danced to</button></div>
        <a class="dance-youtube" href="${PLAYLIST_URL}" target="_blank" rel="noopener noreferrer">Open our complete playlist on YouTube ↗</a>
        <p class="dance-note">Press play in the YouTube player. If a song cannot play here, our playlist opens on YouTube.</p>
        <details class="dance-tracklist"><summary>The eight songs you chose <span>＋</span></summary><ol>${DANCE_TRACKS.map((track,index) => `<li><button data-dance-track="${index}"><span>${String(index+1).padStart(2,'0')}</span><span><strong>${track.title}</strong><small>${track.artist}</small></span><span aria-hidden="true">▶</span></button></li>`).join('')}</ol></details>
        <p class="dance-signature">One more dance, with you.</p>`;
    dialog.querySelector('.dance-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
        const bounds = dialog.getBoundingClientRect();
        if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    });
    const loadPlaylist = (index = null) => {
        const frame = document.createElement('iframe');
        frame.src = `https://www.youtube-nocookie.com/embed/${Number.isInteger(index) ? DANCE_TRACKS[index].id : 'videoseries'}?list=${PLAYLIST_ID}`;
        frame.title = 'Our August 22 dance playlist';
        frame.allow = 'encrypted-media; fullscreen; picture-in-picture';
        frame.allowFullscreen = true;
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        dialog.querySelector('#dance-player').replaceChildren(frame);
    };
    dialog.querySelector('#load-dance-playlist').addEventListener('click', () => loadPlaylist());
    dialog.querySelectorAll('[data-dance-track]').forEach(button => button.addEventListener('click', () => {
        loadPlaylist(Number(button.dataset.danceTrack));
        dialog.querySelector('#dance-player').scrollIntoView({ block: 'center', behavior: 'auto' });
    }));
    dialog.addEventListener('close', () => {
        document.body.classList.remove('dance-memory-open');
        const loadButton = document.createElement('button');
        loadButton.id = 'load-dance-playlist';
        loadButton.className = 'dance-play';
        loadButton.textContent = '▶ Play the songs we danced to';
        loadButton.addEventListener('click', () => loadPlaylist());
        dialog.querySelector('#dance-player').replaceChildren(loadButton);
        if (previousFocus?.isConnected) previousFocus.focus();
    });
    document.querySelector('#open-dance-memory').addEventListener('click', openDanceMemory);
    window.addEventListener('hashchange', () => { if (dialog.open) dialog.close(); });
}

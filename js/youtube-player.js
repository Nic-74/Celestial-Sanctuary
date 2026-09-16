// Shared player: explicit identity, observable errors, and deterministic cleanup.
let apiPromise;
function loadAPI() {
    if (window.YT?.Player) return Promise.resolve(window.YT);
    if (!apiPromise) apiPromise = new Promise((resolve, reject) => {
        const previous = window.onYouTubeIframeAPIReady;
        const timer = setTimeout(() => reject(new Error('YouTube did not respond.')), 15000);
        window.onYouTubeIframeAPIReady = () => {
            clearTimeout(timer);
            previous?.();
            resolve(window.YT);
        };
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.onerror = () => { clearTimeout(timer); reject(new Error('YouTube could not load.')); };
        document.head.append(script);
    }).catch(error => { apiPromise = null; throw error; });
    return apiPromise;
}
export function mountYouTube(slot, { id, title, playlist, onEnded, onTime, onState, onError }) {
    let disposed = false;
    let player;
    let clock;
    const frame = document.createElement('iframe');
    const params = new URLSearchParams({ enablejsapi: '1', origin: location.origin, playsinline: '1', autoplay: '1', rel: '0', cc_load_policy: '1' });
    if (playlist) params.set('list', playlist);
    frame.src = `https://www.youtube.com/embed/${id}?${params}`;
    frame.title = title;
    frame.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    const status = document.createElement('p');
    status.className = 'youtube-playback-status';
    status.setAttribute('role', 'status');
    status.textContent = 'Connecting to YouTube…';
    const link = document.createElement('a');
    const watch = new URL('https://www.youtube.com/watch');
    watch.searchParams.set('v', id);
    if (playlist) watch.searchParams.set('list', playlist);
    link.href = watch.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = `Play ${title} on YouTube ↗`;
    slot.replaceChildren(frame, status, link);
    const timer = setTimeout(() => {
        if (!disposed) status.textContent = 'YouTube has not started. Try its play button, or open this exact song on YouTube below.';
    }, 18000);
    loadAPI().then(YT => {
        if (disposed) return;
        player = new YT.Player(frame, { events: {
            onReady: () => { if (!disposed) { status.textContent = 'Press play if playback does not start automatically.'; clock = setInterval(() => { if (!disposed) onTime?.(player.getCurrentTime?.() || 0); }, 250); } },
            onStateChange: event => {
                if (disposed) return;
                onState?.(event.data);
                if (event.data === 1) { clearTimeout(timer); status.textContent = 'Playing'; }
                if (event.data === 2) status.textContent = 'Paused';
                if (event.data === 0) { status.textContent = 'Song finished'; onEnded?.(); }
            },
            onAutoplayBlocked: () => { if (!disposed) status.textContent = 'Press play in the player to start the music.'; },
            onError: event => {
                if (disposed) return;
                clearTimeout(timer);
                const messages = {
                    100: 'This recording is unavailable or private on YouTube.',
                    101: 'The uploader does not allow this recording to play inside another website.',
                    150: 'The uploader does not allow this recording to play inside another website.',
                    153: 'YouTube could not verify this browser’s player identity.',
                    5: 'YouTube could not play this recording in this browser.',
                    2: 'YouTube could not load this song.'
                };
                onError?.(event.data);
                status.textContent = `${messages[event.data] || 'YouTube could not start playback.'} Open the song below. (YouTube ${event.data})`;
            }
        }});
    }).catch(error => { if (!disposed) { clearTimeout(timer); status.textContent = `${error.message} Open the song below.`; } });
    const dispose = () => { disposed = true; clearTimeout(timer); clearInterval(clock); player?.destroy(); frame.remove(); };
    dispose.load = track => {
        if (disposed || !player?.loadVideoById) return false;
        frame.title = track.title;
        link.href = `https://www.youtube.com/watch?v=${track.id}`;
        link.textContent = `Play ${track.title} on YouTube ↗`;
        status.textContent = 'Loading next song…';
        player.loadVideoById(track.id);
        return true;
    };
    return dispose;
}

import { EDITABLE_CONFIG, CHRONICLE_DATA, AppState } from '../common.js?v=20260916';

let clockInterval;
let voice;
let observer;
const memories = [
    { photo: 4, title: 'A little closer to the sky', place: 'Arashiyama · 2021', note: 'Some views stay with us. Some people become the view.', x: 16, y: 54 },
    { photo: 5, title: 'The quiet between us', place: 'Tenryuji temple · 2022', note: 'A place to slow down. A moment to keep.', x: 39, y: 27 },
    { photo: 7, title: 'Another beginning, together', place: 'Yasaka Jinja · 2024', note: 'A new year, and the same wish: more days with you.', x: 62, y: 63 },
    { photo: 12, title: 'Where ordinary becomes forever', place: 'Kyoto botanical garden · 2022', note: 'The small afternoons make the biggest memories.', x: 85, y: 34 },
];
const places = [
    { name: 'Uganda · Kampala', zone: 'Africa/Kampala' },
    { name: 'China · Beijing', zone: 'Asia/Shanghai' },
    { name: 'Japan · Tokyo', zone: 'Asia/Tokyo' },
];
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function placeOptions(selected) {
    return places.map((p, i) => `<option value="${i}" ${i === selected ? 'selected' : ''}>${p.name}</option>`).join('');
}
function savedPlace(key, fallback) {
    try { const value = localStorage.getItem(key); return value !== null && places[Number(value)] ? Number(value) : fallback; } catch { return fallback; }
}
function pauseOtherAudio() {
    AppState.music.player?.pause();
    AppState.music.isPlaying = false;
    const button = document.getElementById('play-pause-btn');
    if (button) button.textContent = '▶️';
}

export function render(container) {
    const days = Math.max(0, Math.floor((Date.now() - EDITABLE_CONFIG.relationshipStart.getTime()) / 86400000));
    const beginning = CHRONICLE_DATA[0];
    container.innerHTML = `
    <div class="journey" id="journey-top">
        <section class="journey-hero">
            <div class="journey-hero-copy">
                <p class="j-eyebrow">A LIVING ARCHIVE OF US · EST. 2021</p>
                <h1>Of all the stars,<br>I found <em>you.</em></h1>
                <p class="j-intro">Two worlds. One beautiful orbit.<br>A collection of the places, little moments, and quiet promises that became our universe.</p>
                <button class="j-button" data-scroll="memory-sky">Explore our constellation <span>↗</span></button>
                <div class="j-days"><strong>${days.toLocaleString()}</strong><span>days of choosing each other<br><small>since 25 August 2021</small></span></div>
            </div>
            <figure class="journey-portrait">
                <img src="photos/web/memory-4.jpg" alt="Nic and Zoya together at Arashiyama" width="900" height="1200" fetchpriority="high">
                <figcaption><span>01 / A MOMENT, KEPT FOREVER</span><span>Arashiyama, Japan</span></figcaption>
                <span class="j-photo-star" aria-hidden="true">✧</span>
            </figure>
            <div class="j-hero-footer"><span>UGANDA &nbsp; · &nbsp; CHINA &nbsp; · &nbsp; OUR SHARED WORLD</span><button data-scroll="memory-sky" aria-label="Scroll to memories">SCROLL TO WANDER ↓</button></div>
        </section>

        <section id="memory-sky" class="j-section j-reveal">
            <div class="j-section-heading"><div><p class="j-eyebrow">01 / THE CONSTELLATION</p><h2>Every memory.<br>Another point of <em>light.</em></h2></div><p>Pick a star. Revisit a moment.<br>This is what our universe is made of.</p></div>
            <div class="j-constellation" aria-label="Choose one of four memories">
                <svg viewBox="0 0 1000 240" preserveAspectRatio="none" aria-hidden="true"><path d="M160 130 L390 65 L620 151 L850 82"/></svg>
                ${memories.map((m,i) => `<button class="j-star" style="--x:${m.x}%;--y:${m.y}%" data-memory="${i}" aria-pressed="${i===0}" aria-controls="memory-detail"><span aria-hidden="true">✦</span><small>0${i+1}</small><b>${m.place.split(' · ')[0]}</b></button>`).join('')}
            </div>
            <div id="memory-detail" class="j-memory-detail" aria-live="polite"></div>
        </section>

        <section id="story-path" class="j-section j-reveal">
            <div class="j-section-heading"><div><p class="j-eyebrow">02 / FOLLOW THE THREAD</p><h2>A story only <em>we</em><br>could have written.</h2></div><p>No need to rush.<br>Start at the beginning. Stay a little longer.</p></div>
            <div class="j-chapters">
                <a href="#chronicle" class="j-chapter"><span class="j-eyebrow">CHAPTER I · THE BEGINNING</span><span class="j-chapter-icon">✧</span><h3>When our orbits crossed</h3><p>${escapeHTML(beginning.desc)}</p><span class="j-chapter-link">Walk through our story ↗</span></a>
                <a href="#gallery" class="j-chapter"><span class="j-eyebrow">CHAPTER II · THE LITTLE THINGS</span><span class="j-chapter-icon">❋</span><h3>A thousand ordinary miracles</h3><p>Temple visits, meals at home, and the photographs that bring an entire day back.</p><span class="j-chapter-link">Open the memory album ↗</span></a>
                <a href="#voice-garden" class="j-chapter"><span class="j-eyebrow">CHAPTER III · CLOSE YOUR EYES</span><span class="j-chapter-icon">≋</span><h3>The sound of being loved</h3><p>Some things are best kept in the voice that first said them. A song. A story. A little tenderness.</p><span class="j-chapter-link">Wander into the voice garden ↗</span></a>
            </div>
        </section>

        <section class="j-sound-section j-reveal">
            <div class="j-record" aria-hidden="true"><span>N & Z<br><small>our soundtrack</small></span></div>
            <div><p class="j-eyebrow">03 / PRESS PLAY. STAY AWHILE.</p><h2>Some feelings<br>sound like <em>a song.</em></h2><p>“Perfect.” “Let Me Down Slowly.”<br>And the voice that feels like home.</p><div class="j-sound-actions"><a class="j-button" href="#oursong">Open our listening room ↗</a><button class="j-text-button" id="j-voice-button" aria-pressed="false">▶ A song from Zoya</button></div><p id="j-voice-status" role="status" class="j-voice-status"></p></div>
        </section>

        <section class="j-section j-farewell j-reveal" id="shared-sky">
            <p class="j-eyebrow">04 / UNDER THE SAME SKY</p>
            <h2>Wherever we are,<br>there is always <em>us.</em></h2>
            <p>Two places on the map. One place to come back to.<br>Choose the places you want to keep close.</p>
            <div class="j-skies">
                <div class="j-sky"><span class="j-sky-orbit" aria-hidden="true">☾</span><label for="nic-sky">NIC'S SKY</label><select id="nic-sky">${placeOptions(savedPlace('nic-sky',0))}</select><time id="nic-time"></time><small id="nic-date"></small></div>
                <span class="j-sky-bridge" aria-hidden="true">✧ · · · ♡ · · · ✧</span>
                <div class="j-sky"><span class="j-sky-orbit" aria-hidden="true">☾</span><label for="zoya-sky">ZOYA'S SKY</label><select id="zoya-sky">${placeOptions(savedPlace('zoya-sky',1))}</select><time id="zoya-time"></time><small id="zoya-date"></small></div>
            </div>
            <p class="j-sky-note">Illustrated skies · local times for your selected places</p>
            <div class="j-closing-letter"><span aria-hidden="true">✧</span><blockquote>“You are seen. You are known. You are treasured beyond what I have words for.”</blockquote><p>All my stars, Nic</p><a class="j-button" href="#letter">Read the letter to Zoya ↗</a></div>
            <footer class="j-footer"><a href="#home">Nini <em>&</em> Zoya</a><span>A universe worth coming back to.</span><button data-scroll="journey-top">Back to the stars ↑</button></footer>
        </section>
    </div>`;
    const selectMemory = index => {
        const m = memories[index];
        container.querySelectorAll('[data-memory]').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.memory) === index)));
        container.querySelector('#memory-detail').innerHTML = `<img src="photos/web/memory-${m.photo}.jpg" alt="${escapeHTML(m.place)} — a photograph from our album" width="900" height="1200" loading="lazy" decoding="async"><div><p class="j-eyebrow">${m.place}</p><h3>${m.title}</h3><p>${m.note}</p><a class="j-text-button" href="#gallery">See more from our album ↗</a></div>`;
    };
    selectMemory(0);
    container.querySelectorAll('[data-memory]').forEach(b => b.addEventListener('click', () => selectMemory(Number(b.dataset.memory))));
    container.querySelectorAll('[data-scroll]').forEach(b => b.addEventListener('click', () => {
        container.querySelector(`#${b.dataset.scroll}`).scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    }));
    const updateClocks = () => ['nic','zoya'].forEach(person => {
        const zone = places[Number(container.querySelector(`#${person}-sky`).value)].zone;
        const now = new Date();
        container.querySelector(`#${person}-time`).textContent = new Intl.DateTimeFormat('en-GB',{timeZone:zone,hour:'2-digit',minute:'2-digit'}).format(now);
        container.querySelector(`#${person}-date`).textContent = new Intl.DateTimeFormat('en-GB',{timeZone:zone,weekday:'long',day:'numeric',month:'long'}).format(now);
    });
    ['nic','zoya'].forEach(person => container.querySelector(`#${person}-sky`).addEventListener('change', event => {
        try { localStorage.setItem(`${person}-sky`, event.target.value); } catch {}
        updateClocks();
    }));
    updateClocks();
    clockInterval = setInterval(updateClocks, 30000);
    const voiceButton = container.querySelector('#j-voice-button');
    const status = container.querySelector('#j-voice-status');
    voice = new Audio('recordings/Zoy_sings.m4a');
    voice.preload = 'none';
    const resetVoice = () => { voiceButton.textContent = '▶ A song from Zoya'; voiceButton.setAttribute('aria-pressed','false'); };
    voice.addEventListener('ended', resetVoice);
    voiceButton.addEventListener('click', async () => {
        if (!voice.paused) { voice.pause(); resetVoice(); return; }
        pauseOtherAudio();
        status.textContent = '';
        try { await voice.play(); voiceButton.textContent = 'Ⅱ Pause Zoya’s song'; voiceButton.setAttribute('aria-pressed','true'); }
        catch { status.textContent = 'The recording could not play. You can try again in the Voice Garden.'; resetVoice(); }
    });
    if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('j-in-view'); observer.unobserve(entry.target); } }), {root:container, threshold:0.08});
        container.querySelectorAll('.j-reveal').forEach(section => { section.classList.add('j-will-reveal'); observer.observe(section); });
    }
}
export function cleanup() {
    clearInterval(clockInterval);
    observer?.disconnect();
    voice?.pause();
    voice = null;
}

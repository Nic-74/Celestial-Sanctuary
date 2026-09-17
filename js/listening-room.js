import { saveSongLyrics } from './content-vault.js?v=20260917-savefix';
import { mountYouTube } from './youtube-player.js?v=20260917-savefix';

export function parseLyrics(source) {
    const lines = [];
    for (const line of source.split(/\r?\n/)) {
        const stamps = [...line.matchAll(/\[(\d+):(\d{2})(?:[.:](\d{1,3}))?\]/g)];
        const text = line.replace(/\[[^\]]*\]/g, '').trim();
        if (!text) continue;
        for (const stamp of stamps) lines.push({time:Number(stamp[1])*60+Number(stamp[2])+Number(`0.${stamp[3] || 0}`),text});
    }
    return lines.sort((a,b)=>a.time-b.time);
}
export function createListeningRoom(root, tracks, beforePlay = () => {}) {
    let queue = tracks.map(track=>({...track}));
    let index = -1, disposePlayer, audio, destroyed = false, activeLine = -1, playing = false;
    const lyrics = new Map(), urls = new Set();
    root.classList.add('listening-room');
    root.innerHTML = `<div class="listening-marquee"><span>THE SOUNDTRACK OF US</span><span class="listening-count"></span></div>
        <div class="listening-now"><span class="listening-orbit" aria-hidden="true">✦</span><div><small>ONE MORE DANCE</small><h3>Some songs feel like home.</h3><p>Start with a song. Stay for the whole story.</p></div></div>
        <div class="listening-stage"></div>
        <div class="listening-transport"><button type="button" data-previous aria-label="Previous song">←</button><button type="button" data-start>▶ Play our playlist</button><button type="button" data-next aria-label="Next song">→</button><label><input type="checkbox" data-auto checked> Auto-next</label><label><input type="checkbox" data-repeat> Repeat</label></div>
        <p class="listening-notice" role="status">Your songs, in their original order. Press play to begin.</p>
        <div class="listening-columns"><section class="listening-queue"><h4>Our songbook <span>CHOOSE A MOMENT</span></h4><ol></ol></section>
        <section class="listening-lyrics"><h4>Words to stay with <span>LYRICS & CAPTIONS</span></h4><div class="lyrics-lines"><p>Captions are requested in the video when available. Use its CC control to choose a language.</p><p>Add your own lyrics file for this space. Timed .lrc lyrics follow the song; .txt lyrics stay readable beside it.</p></div><label class="lyrics-import">Add lyrics for the selected song<input type="file" accept=".lrc,.txt,text/plain" data-lyrics></label><button type="button" data-save-lyrics hidden>Save lyrics to Drive</button><small>Imported lyrics stay in this tab until you save them to Drive.</small></section></div>
        <details class="listening-files"><summary>Your own recordings</summary><p>Choose multiple audio files to play them in sequence. They stay on your device.</p><input type="file" multiple accept="audio/*,.mp3,.m4a,.wav,.ogg" aria-label="Choose audio files"></details>`;
    const $ = selector => root.querySelector(selector);
    const notice = text => { $('.listening-notice').textContent = text; };
    function renderQueue() {
        const list = $('.listening-queue ol'); list.replaceChildren();
        queue.forEach((track,i)=>{
            const li=document.createElement('li'), button=document.createElement('button'); button.type='button';
            button.dataset.index=i; button.setAttribute('aria-pressed',String(i===index));
            const number=document.createElement('span');number.textContent=String(i+1).padStart(2,'0');
            const details=document.createElement('span'),title=document.createElement('strong'),artist=document.createElement('small');
            title.textContent=track.title;artist.textContent=track.artist;details.append(title,artist);button.append(number,details);
            button.addEventListener('click',()=>{select(i);$('.listening-stage').scrollIntoView({block:'center',behavior:'auto'});});li.append(button);list.append(li);
        });
        $('.listening-count').textContent=`${queue.length} SONGS · ONE STORY`;
    }
    function renderLyrics() {
        activeLine=-1;
        const track=queue[index];if(!lyrics.has(track?.id)&&track?.lyrics)lyrics.set(track.id,{text:track.lyrics,timed:parseLyrics(track.lyrics)});
        const saved=lyrics.get(track?.id);$('[data-save-lyrics]').hidden=!saved;const box=$('.lyrics-lines');box.replaceChildren();
        if (!saved) {
            const p=document.createElement('p');p.textContent='Turn on CC in the video for available captions, or add your lyrics file below.';box.append(p);return;
        }
        const entries=saved.timed.length?saved.timed:saved.text.split(/\r?\n/).map(text=>({text}));
        entries.forEach(line=>{const p=document.createElement('p');p.textContent=line.text;box.append(p);});
    }
    function sync(time) {
        const timed=lyrics.get(queue[index]?.id)?.timed;
        if (!timed?.length) return;
        let current=-1;
        for(let i=0;i<timed.length && timed[i].time<=time;i++) current=i;
        if(current===activeLine)return;
        activeLine=current;
        const lines=$('.lyrics-lines');
        [...lines.children].forEach((line,i)=>{line.classList.toggle('current',i===current);if(i===current) { line.setAttribute('aria-current','true'); lines.scrollTop=line.offsetTop-lines.offsetTop-lines.clientHeight/2+line.clientHeight/2; } else line.removeAttribute('aria-current');});
    }
    function updateState(state) { playing=state===1;root.classList.toggle('is-playing',playing); }
    function advance() {
        if(!$('.listening-transport [data-auto]').checked) {notice('Song finished. Choose another moment when you are ready.');return;}
        if(index+1<queue.length) select(index+1);
        else if($('[data-repeat]').checked) select(0);
        else {updateState(0);notice('The last song, but never the last dance. Play again whenever you like.');}
    }
    function select(i) {
        if(destroyed||!queue[i])return;
        beforePlay();audio?.pause();audio=null; index=i;const track=queue[index];
        $('.listening-now h3').textContent=track.title;$('.listening-now p').textContent=track.artist;
        $('[data-start]').textContent='↺ Start again';notice(`Song ${index+1} of ${queue.length} · ${track.title}`);
        renderQueue();renderLyrics();updateState(0);
        if(track.src) {
            disposePlayer?.();disposePlayer=null;audio=document.createElement('audio');audio.controls=true;audio.src=track.src;
            audio.addEventListener('ended',advance);audio.addEventListener('timeupdate',()=>sync(audio?.currentTime||0));
            audio.addEventListener('play',()=>updateState(1));audio.addEventListener('pause',()=>updateState(2));
            audio.addEventListener('error',()=>notice('This recording could not play. Use Next to continue.'));
            $('.listening-stage').replaceChildren(audio);audio.play().catch(()=>notice('Press play in the audio controls to start.'));
        } else if(!disposePlayer?.load(track)) {
            disposePlayer?.();
            disposePlayer=mountYouTube($('.listening-stage'),{id:track.id,title:track.title,onEnded:advance,onTime:sync,onState:updateState,onError:()=>notice('This recording cannot play here. Use Next or open the original on YouTube.')});
        }
    }
    $('[data-start]').addEventListener('click',()=>select(0));
    $('[data-next]').addEventListener('click',()=>select(index+1<queue.length?index+1:0));
    $('[data-previous]').addEventListener('click',()=>select(index>0?index-1:0));
    $('[data-lyrics]').addEventListener('change',async event=>{
        const file=event.target.files?.[0],track=queue[index];
        if(!file)return;
        if(!track){notice('Choose a song first, then add its lyrics.');event.target.value='';return;}
        if(file.size>200000){notice('Choose a lyrics file smaller than 200 KB.');return;}
        try {const text=await file.text();if(destroyed)return;lyrics.set(track.id,{text,timed:parseLyrics(text)});if(queue[index]?.id===track.id)renderLyrics();notice(`Lyrics added for ${track.title}.`);}catch {notice('That lyrics file could not be read.');}
        event.target.value='';
    });
    $('[data-save-lyrics]').addEventListener('click',async()=>{const track=queue[index],saved=lyrics.get(track?.id);if(!saved)return;try{await saveSongLyrics(track,saved.text);notice('Lyrics saved to Drive.');}catch(error){notice(error.message);}});
    $('.listening-files input').addEventListener('change',event=>{
        const files=[...event.target.files];if(!files.length)return;
        audio?.pause();disposePlayer?.();disposePlayer=null;
        urls.forEach(url=>URL.revokeObjectURL(url));urls.clear();
        queue=files.map((file,i)=>{const src=URL.createObjectURL(file);urls.add(src);return{id:`local-${Date.now()}-${i}`,title:file.name.replace(/\.[^.]+$/,''),artist:'Your own recording',src};});
        index=-1;renderQueue();select(0);event.target.value='';
    });
    renderQueue();
    return {stop(){audio?.pause();disposePlayer?.();disposePlayer=null;$('.listening-stage').replaceChildren();updateState(0);},destroy(){destroyed=true;audio?.pause();disposePlayer?.();urls.forEach(url=>URL.revokeObjectURL(url));lyrics.clear();root.replaceChildren();root.classList.remove('is-playing');},select};
}

// Google access tokens and private content exist only in this tab's memory.
const CLIENT_ID = '690422772790-id9snpi35tci6n9lrreu4682vo6p438b.apps.googleusercontent.com';
const PROJECT_NUMBER = '690422772790';
const FOLDER_ID = '1gj1UqHb38XoCKwTXrUNUN1-D5BkXsYOE';
const SCOPE = 'https://www.googleapis.com/auth/drive.file';
// Browser key: restricted to the live website and Google Picker API by the owner.
const PICKER_KEY = 'AIzaSyC7FArEaXXz_2036X_SQ0CUK1jKKZu7Dn4';
let dialog, token, expiry, client, picker, generation = 0, refreshVersion = 0;
let abort = new AbortController();
const mediaURLs = new Set();
const scripts = new Map();
function script(src) {
    if (!scripts.has(src)) scripts.set(src, new Promise((resolve, reject) => {
        const node = document.createElement('script'); node.src = src;
        node.onload = resolve; node.onerror = () => { scripts.delete(src); reject(new Error('Google could not load. Check your connection and try again.')); };
        document.head.append(node);
    }));
    return scripts.get(src);
}
function status(text) { dialog.querySelector('[role=status]').textContent = text; }
function clearPrivate() {
    generation++; refreshVersion++; abort.abort(); abort = new AbortController();
    clearTimeout(expiry); token = null;
    dialog.querySelectorAll('audio,video').forEach(media => media.pause());
    mediaURLs.forEach(url => URL.revokeObjectURL(url)); mediaURLs.clear();
    picker?.setVisible(false); picker = null;
    dialog.querySelector('form').reset();
    dialog.querySelector('#private-list').replaceChildren();
    dialog.querySelector('#private-signed-in').hidden = true;
    dialog.querySelector('#private-connect').hidden = false;
}
async function request(path, options = {}) {
    if (!token) throw new Error('Sign in with Google to continue.');
    const response = await fetch(`https://www.googleapis.com/${path}`, {
        ...options, signal: abort.signal,
        headers: { ...options.headers, Authorization: `Bearer ${token}` }
    });
    if (response.status === 401) { clearPrivate(); throw new Error('Your Google session expired. Sign in again.'); }
    if (!response.ok) throw new Error(response.status === 403 || response.status === 404
        ? 'Google has not granted access to this folder or file. Choose it with “Authorize folder”, and check its sharing settings.'
        : `Google could not complete the request (${response.status}). Your draft has been kept.`);
    return response;
}
async function verifyFolder() {
    const response = await request(`drive/v3/files/${FOLDER_ID}?fields=id,mimeType,capabilities(canAddChildren),permissions(type,role)`);
    const folder = await response.json();
    if (folder.mimeType !== 'application/vnd.google-apps.folder') throw new Error('The configured memory destination is not a folder.');
    if (!folder.permissions?.length) throw new Error('Unable to verify folder privacy. Check its sharing settings in Google Drive.');
    if (folder.permissions.some(p => p.type !== 'user')) throw new Error('This folder has public or organization access. Set General access to Restricted before saving private memories.');
    if (!folder.capabilities?.canAddChildren) throw new Error('This Google account needs Editor access to contribute memories.');
}
async function connect() {
    const button = dialog.querySelector('#private-connect'); button.disabled = true;
    try {
        await script('https://accounts.google.com/gsi/client');
        client = google.accounts.oauth2.initTokenClient({ client_id: CLIENT_ID, scope: SCOPE,
            callback: async response => {
                button.disabled = false;
                if (response.error || !response.access_token) { status('Google sign-in was not completed. You can try again.'); return; }
                clearPrivate(); token = response.access_token;
                expiry = setTimeout(() => { clearPrivate(); status('Your Google session expired. Sign in again.'); }, Math.max(1, response.expires_in - 60) * 1000);
                dialog.querySelector('#private-connect').hidden = true;
                dialog.querySelector('#private-signed-in').hidden = false;
                status('Signed in. Authorize the private folder on first use.');
                await refresh();
            },
            error_callback: () => { button.disabled = false; status('Google sign-in was closed or blocked. Try again and allow the Google sign-in popup.'); }
        });
        client.requestAccessToken({ prompt: 'select_account' });
    } catch (error) { button.disabled = false; status(error.message); }
}
async function authorizeFolder() {
    if (!PICKER_KEY) { status('Google Picker configuration is awaiting API-key restrictions. Nothing has been uploaded.'); return; }
    try {
        await script('https://apis.google.com/js/api.js');
        await new Promise(resolve => gapi.load('picker', resolve));
        if (!token) return;
        const pickerGeneration = generation;
        const view = new google.picker.DocsView(google.picker.ViewId.FOLDERS)
            .setIncludeFolders(true).setSelectFolderEnabled(true);
        picker = new google.picker.PickerBuilder().setAppId(PROJECT_NUMBER).setDeveloperKey(PICKER_KEY)
            .setOAuthToken(token).setOrigin(location.origin).addView(view)
            .setTitle('Select Celestial Sanctuary — Private Memories')
            .setCallback(async data => {
                if (!token || generation !== pickerGeneration) return;
                if (data.action === google.picker.Action.CANCEL) { if (!dialog.open) dialog.showModal(); return; }
                if (data.action !== google.picker.Action.PICKED) return;
                if (!dialog.open) dialog.showModal();
                if (data.docs?.[0]?.id !== FOLDER_ID) { status('Please select the sanctuary’s designated private folder.'); return; }
                await refresh();
            }).build();
        // Picker is a separate Google dialog; close the native modal so it can receive focus.
        dialog.close(); picker.setVisible(true);
    } catch (error) { status(error.message); }
}
async function refresh() {
    const current = generation;
    const version = ++refreshVersion;
    try {
        await verifyFolder();
        const params = new URLSearchParams({q:`'${FOLDER_ID}' in parents and trashed = false and appProperties has { key='sanctuaryMemory' and value='1' }`,fields:'nextPageToken,files(id,name)',pageSize:'100',orderBy:'createdTime desc'});
        const records = [];
        let page;
        do {
            if (page) params.set('pageToken', page);
            const result = await (await request(`drive/v3/files?${params}`)).json();
            records.push(...result.files); page = result.nextPageToken;
        } while (page);
        if (current !== generation || version !== refreshVersion) return;
        dialog.querySelectorAll('#private-list audio').forEach(audio => audio.pause());
        mediaURLs.forEach(url => URL.revokeObjectURL(url)); mediaURLs.clear();
        const list = dialog.querySelector('#private-list'); list.replaceChildren();
        for (const file of records) {
            const response = await request(`drive/v3/files/${file.id}?alt=media`);
            const record = await response.json();
            if (current !== generation || version !== refreshVersion) return;
            if (record.schema !== 1 || typeof record.text !== 'string') continue;
            const card = document.createElement('article');
            const title = document.createElement('h3'); title.textContent = record.title || 'A moment to keep';
            const date = document.createElement('small'); date.textContent = record.date || '';
            const text = document.createElement('p'); text.textContent = record.text;
            card.append(date, title, text);
            if (record.attachment?.id) {
                const show = document.createElement('button'); show.type = 'button'; show.textContent = 'Open attachment';
                show.addEventListener('click', async () => {
                    show.disabled = true;
                    try {
                        const blob = await (await request(`drive/v3/files/${encodeURIComponent(record.attachment.id)}?alt=media`)).blob();
                        if (current !== generation || version !== refreshVersion) return;
                        const url = URL.createObjectURL(blob); mediaURLs.add(url);
                        const kind = blob.type.startsWith('image/') ? 'img' : blob.type.startsWith('audio/') ? 'audio' : null;
                        if (!kind) { URL.revokeObjectURL(url); mediaURLs.delete(url); throw new Error('This attachment is not a supported photo or audio recording.'); }
                        const media = document.createElement(kind); media.src = url;
                        if (kind === 'img') media.alt = record.title || 'Private memory'; else media.controls = true;
                        show.replaceWith(media);
                    } catch (error) { show.disabled = false; if (error.name !== 'AbortError') status(error.message); }
                }); card.append(show);
            }
            list.append(card);
        }
        status(records.length ? 'Your private memories are ready.' : 'Your private collection is ready. Keep your first moment below.');
    } catch (error) { if (error.name !== 'AbortError') status(error.message); }
}
async function upload(metadata, blob) {
    if (blob.size > 5 * 1024 * 1024) {
        const session = await request('upload/drive/v3/files?uploadType=resumable&fields=id', {
            method:'POST', headers:{'Content-Type':'application/json','X-Upload-Content-Type':blob.type || 'application/octet-stream'},
            body:JSON.stringify(metadata)
        });
        const destination = new URL(session.headers.get('Location'));
        if (destination.origin !== 'https://www.googleapis.com' || !destination.pathname.startsWith('/upload/drive/')) throw new Error('Google returned an unexpected upload destination.');
        return (await request(destination.pathname.slice(1) + destination.search, {method:'PUT',body:blob})).json();
    }
    const boundary = `sanctuary_${crypto.randomUUID()}`;
    const body = new Blob([
        `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n`,
        JSON.stringify(metadata),
        `\r\n--${boundary}\r\nContent-Type: ${blob.type || 'application/octet-stream'}\r\n\r\n`,
        blob, `\r\n--${boundary}--`
    ], {type:`multipart/related; boundary=${boundary}`});
    return (await request('upload/drive/v3/files?uploadType=multipart&fields=id', { method:'POST', body })).json();
}
async function save(event) {
    event.preventDefault();
    const form = event.currentTarget, button = form.querySelector('[type=submit]');
    const data = new FormData(form); const file = data.get('attachment');
    if (file?.size && (!/^(image\/(jpeg|png|webp|gif)|audio\/)/.test(file.type) || file.size > 20*1024*1024)) { status('Choose a photo or audio file up to 20 MB.'); return; }
    const current = generation; button.disabled = true;
    let attachment;
    try {
        await verifyFolder(); status('Saving privately to Google Drive…');
        if (file?.size) attachment = await upload({name:file.name,parents:[FOLDER_ID]}, file);
        if (current !== generation) return;
        const record = {schema:1,title:String(data.get('title')).trim(),date:data.get('date'),text:String(data.get('text')).trim(),attachment};
        await upload({name:`memory-${crypto.randomUUID()}.json`,parents:[FOLDER_ID],appProperties:{sanctuaryMemory:'1'}},new Blob([JSON.stringify(record)],{type:'application/json'}));
        if (current !== generation) return;
        form.reset(); await refresh(); status('Memory saved in your private Drive folder.');
    } catch (error) { if (error.name !== 'AbortError') status(`${error.message}${attachment ? ' The attachment was uploaded, but its memory was not saved. It remains in your private folder.' : ''}`); }
    finally { button.disabled = false; }
}
export function initPrivateMemories() {
    dialog = document.createElement('dialog'); dialog.id = 'private-memories';
    dialog.setAttribute('aria-labelledby','private-title');
    dialog.innerHTML = `<button class="private-close" aria-label="Close private memories">×</button><p class="private-eyebrow">A LITTLE WORLD, JUST FOR TWO</p><h2 id="private-title">Keep this moment.</h2><p>Photos, words, and voices. Saved in your private Google Drive folder.</p><p role="status" aria-live="polite">Sign in to open your private collection.</p><button id="private-connect">Sign in with Google</button><div id="private-signed-in" hidden><div class="private-actions"><button id="private-authorize">Authorize folder</button><button id="private-refresh">Refresh</button><button id="private-signout">Sign out</button></div><form><label>A name for this moment<input name="title" maxlength="120" required></label><label>When it happened<input type="date" name="date" required></label><label>What you want to remember<textarea name="text" rows="4" maxlength="10000" required></textarea></label><label>A photo or recording (optional, up to 20 MB)<input type="file" name="attachment" accept="image/jpeg,image/png,image/webp,image/gif,audio/*"></label><button type="submit">Save our memory ♡</button></form><div id="private-list"></div></div>`;
    document.body.append(dialog);
    const button = document.createElement('button'); button.id = 'open-private-memories'; button.textContent = '♡ Private memories';
    document.querySelector('#main-menu-dropdown').append(button);
    button.addEventListener('click', () => dialog.showModal());
    dialog.querySelector('.private-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => dialog.querySelectorAll('audio').forEach(audio => audio.pause()));
    dialog.querySelector('#private-connect').addEventListener('click',connect);
    dialog.querySelector('#private-authorize').addEventListener('click',authorizeFolder);
    dialog.querySelector('#private-refresh').addEventListener('click',refresh);
    dialog.querySelector('#private-signout').addEventListener('click', () => { const old = token; clearPrivate(); status('Signed out. Private content has been cleared from this tab.'); if (old) google.accounts.oauth2.revoke(old,()=>{}); });
    dialog.querySelector('form').addEventListener('submit',save);
}

import { initializeVault, loadVault, resetVault } from './content-vault.js?v=20260918-direct';
// Google access tokens and private content exist only in this tab's memory.
const CLIENT_ID = '690422772790-id9snpi35tci6n9lrreu4682vo6p438b.apps.googleusercontent.com';
const FOLDER_ID = '1gj1UqHb38XoCKwTXrUNUN1-D5BkXsYOE';
// Direct Drive scope approved by the owner; file operations remain folder-bound below.
const SCOPE = 'https://www.googleapis.com/auth/drive';
let storageReady = false;
let dialog, token, expiry, client, generation = 0, refreshVersion = 0;
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
    storageReady = false;
    resetVault();
    generation++; refreshVersion++; abort.abort(); abort = new AbortController();
    clearTimeout(expiry); token = null;
    dialog.querySelectorAll('audio,video').forEach(media => media.pause());
    mediaURLs.forEach(url => URL.revokeObjectURL(url)); mediaURLs.clear();
    dialog.querySelector('form').reset();
    dialog.querySelector('#private-list').replaceChildren();
    dialog.querySelector('#private-signed-in').hidden = true;
    dialog.querySelector('#private-connect').hidden = false;
    dialog.querySelector('#private-connect').textContent = 'Connect Google Drive';
}
async function transport(path, options = {}) {
    if (!token) throw new Error('Sign in with Google to continue.');
    const response = await fetch(`https://www.googleapis.com/${path}`, {
        ...options, signal: abort.signal,
        headers: { ...options.headers, Authorization: `Bearer ${token}` }
    });
    if (response.status === 401) { clearPrivate(); throw new Error('Your Google session expired. Sign in again.'); }
    if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        const detail = payload.error?.message || 'No additional details returned.';
        const reason = payload.error?.errors?.[0]?.reason || payload.error?.status || '';
        // Keep quota, disabled API, permissions and malformed uploads distinct.
        const error = new Error(`Google Drive ${response.status}${reason ? ` (${reason})` : ''}: ${detail}`);
        error.httpStatus = response.status; throw error;
    }
    return response;
}
// The broader Google permission is not a folder-scoped OAuth grant. Enforce the
// sanctuary boundary on every read and write performed by this application.
async function request(path, options = {}) {
    if(options.method && options.method !== 'GET') throw new Error('Use the sanctuary upload action to save content.');
    const url = new URL(path, 'https://www.googleapis.com/');
    if(url.origin !== 'https://www.googleapis.com') throw new Error('Invalid Drive destination.');
    const match = url.pathname.match(/^\/drive\/v3\/files(?:\/([A-Za-z0-9_-]+))?$/);
    if(!match) throw new Error('This Drive operation is outside sanctuary storage.');
    const id = match[1];
    if(!id) {
        const q = url.searchParams.get('q');
        const expected = `'${FOLDER_ID}' in parents and trashed = false and appProperties has { key='sanctuaryMemory' and value='1' }`;
        if(q !== expected) throw new Error('Only sanctuary content can be listed.');
    } else if(id !== FOLDER_ID) {
        const file = await (await transport(`drive/v3/files/${id}?fields=id,parents`)).json();
        if(!file.parents?.includes(FOLDER_ID)) throw new Error('This file is not in your sanctuary folder.');
    }
    return transport(url.pathname.slice(1)+url.search, options);
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
                status('Checking your sanctuary storage…');
                if(await refresh()) dialog.close();
            },
            error_callback: () => { button.disabled = false; status('Google sign-in was closed or blocked. Try again and allow the Google sign-in popup.'); }
        });
        client.requestAccessToken({ prompt: 'select_account', include_granted_scopes: true });
    } catch (error) { button.disabled = false; status(error.message); }
}
async function refresh() {
    try {
        await loadVault(); storageReady = true;
        dialog.querySelector('#private-connect').hidden = true;
        dialog.querySelector('#private-signed-in').hidden = false;
        status('Connected. You can now save using the forms on each page.');
        return true;
    } catch(error) {
        storageReady = false;
        dialog.querySelector('#private-signed-in').hidden = true;
        dialog.querySelector('#private-connect').hidden = false;
        dialog.querySelector('#private-connect').textContent = 'Connect Google Drive';
        if(error.name !== 'AbortError') status(error.httpStatus === 404
            ? 'This Google account cannot access the sanctuary folder. Connect with Nicholas’s or Zoya’s shared account and approve Drive access.'
            : error.message);
        return false;
    }
}
async function upload(metadata, blob) {
    if(metadata.parents?.length !== 1 || metadata.parents[0] !== FOLDER_ID) throw new Error('Uploads must stay in your sanctuary folder.');
    if (blob.size > 5 * 1024 * 1024) {
        const session = await transport('upload/drive/v3/files?uploadType=resumable&fields=id', {
            method:'POST', headers:{'Content-Type':'application/json','X-Upload-Content-Type':blob.type || 'application/octet-stream'},
            body:JSON.stringify(metadata)
        });
        const destination = new URL(session.headers.get('Location'));
        if (destination.origin !== 'https://www.googleapis.com' || !destination.pathname.startsWith('/upload/drive/')) throw new Error('Google returned an unexpected upload destination.');
        return (await transport(destination.pathname.slice(1) + destination.search, {method:'PUT',body:blob})).json();
    }
    const boundary = `sanctuary_${crypto.randomUUID()}`;
    const body = new Blob([
        `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n`,
        JSON.stringify(metadata),
        `\r\n--${boundary}\r\nContent-Type: ${blob.type || 'application/octet-stream'}\r\n\r\n`,
        blob, `\r\n--${boundary}--`
    ], {type:`multipart/related; boundary=${boundary}`});
    return (await transport('upload/drive/v3/files?uploadType=multipart&fields=id', { method:'POST', body })).json();
}
export function initPrivateMemories() {
    dialog = document.createElement('dialog'); dialog.id = 'private-memories';
    dialog.setAttribute('aria-labelledby','private-title');
    dialog.innerHTML = `<button class="private-close" aria-label="Close">×</button><h2 id="private-title">Save to Google Drive</h2><p>Sign in once for this visit. Your photos, writing, letters and recordings save to your sanctuary folder automatically.</p><p class="private-permission-note">Google asks for full Drive permission. This website limits its file operations to your sanctuary folder.</p><p role="status" aria-live="polite">Connect once for this visit, then use the upload or writing form on your page.</p><button id="private-connect">Connect Google Drive</button><div id="private-signed-in" hidden><button class="private-return">Return to my page</button><details><summary>Content library &amp; connection settings</summary><div class="private-actions"><button id="private-refresh">Refresh saved content</button><button id="private-signout">Sign out</button></div><label>Content section<select id="vault-type"></select></label><button id="vault-add">Add a new entry</button><div id="private-list"></div></details><form id="vault-form" hidden></form></div>`;
    document.body.append(dialog);
    const button = document.createElement('button'); button.id = 'open-private-memories'; button.textContent = 'Google Drive';
    document.querySelector('#main-menu-dropdown').append(button);
    button.addEventListener('click', async () => {
        dialog.showModal();
        const connectButton = dialog.querySelector('#private-connect');
        connectButton.disabled = true;
        try { await script('https://accounts.google.com/gsi/client'); }
        catch (error) { status(error.message); }
        finally { connectButton.disabled = false; }
    });
    dialog.querySelector('.private-return').addEventListener('click',()=>dialog.close());
    dialog.querySelector('.private-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => dialog.querySelectorAll('audio').forEach(audio => audio.pause()));
    dialog.querySelector('#private-connect').addEventListener('click',connect);
    dialog.querySelector('#private-refresh').addEventListener('click',refresh);
    dialog.querySelector('#private-signout').addEventListener('click', () => { const old = token; clearPrivate(); status('Signed out. Private content has been cleared from this tab.'); if (old) google.accounts.oauth2.revoke(old,()=>{}); });
    document.querySelector('#gate-keeper')?.addEventListener('click',()=>button.click());
    initializeVault({request,upload,verifyFolder,folder:FOLDER_ID,status,signedIn:()=>!!token && storageReady,open:()=>button.click()});
}

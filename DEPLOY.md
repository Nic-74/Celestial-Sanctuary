# Deploying Celestial Sanctuary to Render.com

This guide deploys the Flask backend (`server.py`) to Render.com so your app works online — not just on your laptop.

---

## Step 1 — Push latest code to GitHub

Make sure all your changes are committed and pushed to `main`:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

---

## Step 2 — Create a Render account

Go to [https://render.com](https://render.com) and sign up for free. Sign in with your GitHub account — this makes Step 3 much easier.

---

## Step 3 — Create a new Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub account if not already connected
3. Find and select **Celestial-Sanctuary**
4. Fill in the settings:

| Field | Value |
|---|---|
| **Name** | `celestial-sanctuary` |
| **Runtime** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `gunicorn server:app` |
| **Instance Type** | `Free` |

5. Click **"Create Web Service"**

Render will start building — takes about 2 minutes.

---

## Step 4 — Get your public URL

Once the build says **"Live"**, Render gives you a URL like:
```
https://celestial-sanctuary.onrender.com
```

Copy it.

---

## Step 5 — Update `API_URL` in the frontend

Open `js/common.js` and find this line (search for `IMPORTANT: UPDATE THIS URL`):

```js
: 'https://YOUR-APP.railway.app/api';
```

Replace it with your Render URL:

```js
: 'https://celestial-sanctuary.onrender.com/api';
```

Then commit and push:

```bash
git add js/common.js
git commit -m "Update API_URL to Render deployment"
git push origin main
```

---

## Step 6 — Enable GitHub Pages for the frontend

1. Go to your repo on GitHub → **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / root
4. Save

Your frontend will be live at:
```
https://nic-74.github.io/Celestial-Sanctuary/
```

The frontend (HTML/CSS/JS) runs on GitHub Pages.
The backend (Flask/Python) runs on Render.com.
They talk to each other via the `API_URL`.

---

## ⚠️ Important note about Render's free tier

On the free tier, your service **spins down after 15 minutes of inactivity**. The first request after inactivity takes ~30 seconds to wake up. After that it's fast.

If you want it always-on, upgrade to Render's Starter plan ($7/month) — or keep the free tier and just know uploads/saves take a moment to wake up.

---

## Updating content in the future

| What you want to do | How |
|---|---|
| Add photos or music | Use the "Upload Photo" / "Upload Song" buttons in the app |
| Edit the letter | Open `js/modules/letter.js`, change the `LETTER_LINES` array, push to GitHub |
| Edit listening room | Open `js/modules/oursong.js`, update `LISTENING_ROOM` with official video IDs, push to GitHub |
| Add a chronicle event | Use the "Add Timeline Event" button in the Chronicle section |
| Change the featured song | In `js/modules/oursong.js`, change `FEATURED_SONG_INDEX` to 0 or 1 |

---

## Troubleshooting

**"Cannot connect to server"** — Check that your Render URL in `common.js` is correct and that the Render service shows "Live" in the dashboard.

**"Upload not working"** — Render's free tier has an ephemeral filesystem — files uploaded are lost on redeploy. For persistent uploads, add a Render Disk (Storage → Disks, $0.25/GB/month).

**"CORS error"** — The `flask-cors` package is already installed and active. Make sure your Render URL in `common.js` has no trailing slash.

**Service sleeping** — First request after inactivity takes ~30 seconds. This is normal on the free tier.

## September 2026 story redesign

The default home route preserves the original rotating planet navigation (`#home` or `#orbit`). The new story page is available at `#journey`, rendered by `js/modules/journey.js` and styled by `css/modules/journey.css`. The entrance and persistent navigation use `css/editorial.css`.

Update the four constellation memories in the `memories` array. Optimized copies of existing photographs live in `photos/web/`; original photographs are unchanged. Location clock selections are stored only in the visitor's browser. The skies are illustrations, not astronomical forecasts or live location tracking.

Music videos use official YouTube embeds with direct YouTube fallback links. Availability depends on YouTube and the visitor's region/browser. Existing personal recordings remain locally hosted.

For this release, module and stylesheet URLs carry a shared version query to refresh cached assets. If changing the shared module version in future, update all imports together so every panel uses the same AppState instance.

## August 22 dance keepsake

The existing planet view and Our Song panel now open the same native dialog, implemented in `js/dance-memory.js` and `css/dance-memory.css`. No new route is added. It features Nic’s `22nd august 2021` YouTube playlist, with the eight tracks observed on 15 September 2026 in their original order. The playlist embed follows live playlist changes; update `DANCE_TRACKS` if you later change the visible eight-song keepsake list. Closing the dialog removes the embedded player and restores keyboard focus.

Falling stars render in `#romantic-sky` even at `#home`; the original animated sky canvases are restored. Reduced-motion preferences suppress the sky animation.

### Playback update — 16 September 2026
The dance playlist and listening-room tracks share an origin-aware YouTube IFrame API player. It reports provider errors, autoplay blocks and connection timeouts, and links to the exact original song. Browser/provider restrictions may still prevent embedding; this is not a promise that all YouTube recordings are embeddable.

The dance dialog also plays user-selected audio through native HTML audio controls. Files stay on the device, are not uploaded, and are forgotten when the dialog closes. This is separate from future private Drive storage. Google OAuth setup is required before private Drive editing can be released.

### Private Drive editor — initial integration
The existing menu now opens a Private memories dialog for Google sign-in, text entries, and optional photos/audio up to 20 MB. The browser uses `drive.file`, an owner-configured web OAuth client, a referrer/API-restricted Picker key, and the designated private folder. No OAuth client secret is used. Tokens are in memory only; sign-out and expiry clear rendered private content. Folder privacy and write permissions are checked before saving. Small files use multipart/related; larger files use a resumable-upload session with a single body transfer (automatic resume/retry is not yet implemented).

Configuration verified through Drive metadata: folder restricted to the owner and Zoya as writer. API key restrictions confirmed by the owner. Local checks cover signed-out UI, folder privacy rejection, upload formatting and destination validation. Real Google consent, saving/reopening, and cross-account visibility still require end-to-end verification; do not represent those as passed. OAuth currently permits the live GitHub origin, not a local preview origin. Google OAuth should be tested in a normal browser.

With `drive.file`, selecting a folder must not be assumed to authorize all pre-existing children. Verify both accounts can see each other's app-created records before treating the collection as fully shared. Existing public repository media remains public.

### Shared songbook — sequential playback and lyrics
Both the listening panel (ten tracks) and August 22 dialog (the original eight in order) now use the same songbook. A single YouTube player advances via its ended event and `loadVideoById`, with previous/next, auto-next and repeat controls. Playback starts only after a visitor chooses a song. Videos blocked by YouTube retain their original link and a manual Next control.

Captions are requested with `cc_load_policy=1`; availability and languages depend on each video. The separate lyrics panel imports user-supplied TXT/LRC, renders text safely, and highlights timed LRC lines using player time. Lyrics remain in the current component session and are not uploaded. Multiple local audio files can also play in sequence. Closing/changing panels destroys players and revokes local file URLs.

Verification: unit checks for YouTube lifecycle/error handling, queue end/advance/repeat/auto-next off, and LRC timestamps. Browser test confirmed native audio advanced from one file to the next and selected the expected timed-lyrics line. Mobile dialog fit verified at 390px; nine planets retained. YouTube playback for every recording and provider-controlled caption availability cannot be guaranteed by these checks.

## Living archive (September 2026)

Use **Manage all content** or a section's **Add / edit** button after Google sign-in. The category menu covers gallery, chronicles, letters, alternate universes, voice recordings, tome chapters, discoveries, music, games/guide/sanctuary collections, and entrance words. Expand nested collections to add or edit their items. Media uploads are limited to 20 MB each.

Content edits are private overlays on the original site data. Each save creates a JSON revision in the configured restricted Drive folder; media are separate files. Archive hides an entry and Restore recovers it. Original repository content remains public and is not migrated or deleted. Sign-out restores the public defaults and clears private content from the tab. Google Drive folder permissions enforce access; the OAuth client secret is never needed by this static site.

New letters require an unlock phrase. Their bodies are encrypted in the browser with PBKDF2 and AES-GCM before upload. Titles and dates remain visible to both folder members. Keep the phrase: the site cannot recover it. Dates label letters; they do not enforce a time lock.

With drive.file, a second account may need **Authorize shared entries** to select existing shared files. Revisions preserve prior saves, but simultaneous editing is not a transactional merge: refresh before editing shared content. Do not remove files from Drive unless you intend to remove their history or media.

Validation: JavaScript syntax, simulated Drive add/update/reload/archive and sign-out, letter encryption/wrong-phrase tests, playlist progression/repeat and timed lyrics, and local browser layout checks. The new integration still needs a real Google-account save/reload check on the deployed origin.

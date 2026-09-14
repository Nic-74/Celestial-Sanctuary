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

# Deploying Celestial Sanctuary to Railway.app

This guide deploys the Flask backend (`server.py`) to Railway so your app works online — not just on your laptop.

---

## Step 1 — Push latest code to GitHub

Make sure all your changes are committed and pushed to `main`:

```bash
git add .
git commit -m "Add Railway deployment config"
git push origin main
```

---

## Step 2 — Create a Railway account

Go to [https://railway.app](https://railway.app) and sign up (free). You can sign in with your GitHub account — that makes Step 3 much easier.

---

## Step 3 — Deploy from GitHub

1. Click **"New Project"**
2. Choose **"Deploy from GitHub repo"**
3. Select **Celestial-Sanctuary**
4. Railway will auto-detect Python and use the `Procfile` you added

Railway will start building. This takes about 1–2 minutes.

---

## Step 4 — Add a persistent volume for `database.json`

Your `database.json` stores all uploaded photos, voice messages, and chapters. Railway's filesystem resets on redeploy, so you need a volume:

1. In your Railway project, click your service → **"Volumes"**
2. Click **"New Volume"**
3. Set mount path to `/app` (or wherever Railway runs your app)
4. This keeps `database.json` safe between deployments

---

## Step 5 — Get your public URL

1. In your Railway service, go to **"Settings" → "Networking"**
2. Click **"Generate Domain"**
3. You'll get a URL like: `https://celestial-sanctuary-production.up.railway.app`

---

## Step 6 — Update `API_URL` in the frontend

Open `js/common.js` and find this line (search for `IMPORTANT: UPDATE THIS URL`):

```js
// IMPORTANT: UPDATE THIS URL after deploying to Railway
: 'https://YOUR-APP.railway.app';
```

Replace `YOUR-APP.railway.app` with your actual Railway URL from Step 5:

```js
: 'https://celestial-sanctuary-production.up.railway.app';
```

Then commit and push:

```bash
git add js/common.js
git commit -m "Update API_URL to Railway deployment"
git push origin main
```

---

## Step 7 — Enable GitHub Pages for the frontend

1. Go to your repo on GitHub → **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / root
4. Save — your frontend will be live at `https://nic-74.github.io/Celestial-Sanctuary/`

The frontend (HTML/CSS/JS) lives on GitHub Pages.
The backend (Flask/Python) lives on Railway.
They talk to each other via the `API_URL`.

---

## Updating content in the future

| What you want to do | How |
|---|---|
| Add photos or music | Use the "Upload Photo" / "Upload Song" buttons in the app — they go through the Flask API and are saved in `database.json` on Railway |
| Edit the letter | Open `js/modules/letter.js`, change the `LETTER_LINES` array, push to GitHub |
| Edit song lyrics | Open `js/modules/oursong.js`, change the `LYRICS` array, push to GitHub |
| Add a chronicle event | Use the "Add Timeline Event" button in the Chronicle section |
| Change the featured song | In `js/modules/oursong.js`, change `FEATURED_SONG_INDEX` to any number 0–19 |

---

## Troubleshooting

**"Cannot connect to server"** — Check that your Railway URL in `common.js` is correct and that the Railway service is running (green dot in dashboard).

**"Upload not working"** — Make sure the Railway volume is mounted at the correct path. Check Railway logs under "Deployments → View Logs".

**"CORS error"** — The `flask-cors` package is already installed via `requirements.txt` and active in `server.py`. If you still see CORS errors, check that your Railway URL exactly matches what's in `common.js` (no trailing slash).

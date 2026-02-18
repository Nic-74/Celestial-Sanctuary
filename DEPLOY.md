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
| Edit song lyrics | Open `js/modules/oursong.js`, change the `LYRICS` array, push to GitHub |
| Add a chronicle event | Use the "Add Timeline Event" button in the Chronicle section |
| Change the featured song | In `js/modules/oursong.js`, change `FEATURED_SONG_INDEX` to any number 0–19 |

---

## Troubleshooting

**"Cannot connect to server"** — Check that your Render URL in `common.js` is correct and that the Render service shows "Live" in the dashboard.

**"Upload not working"** — Render's free tier has an ephemeral filesystem — files uploaded are lost on redeploy. For persistent uploads, add a Render Disk (Storage → Disks, $0.25/GB/month).

**"CORS error"** — The `flask-cors` package is already installed and active. Make sure your Render URL in `common.js` has no trailing slash.

**Service sleeping** — First request after inactivity takes ~30 seconds. This is normal on the free tier.

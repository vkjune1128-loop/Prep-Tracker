# Interview Prep Tracker — standalone app

A self-contained web app version of your prep tracker. No build tools, no
backend, no account needed. Data saves to your browser's local storage on
whichever device you use it on.

## Files
- `index.html` — the whole app
- `manifest.json` — makes it installable as an app icon
- `service-worker.js` — enables offline use once loaded once
- `icon-192.png`, `icon-512.png` — app icons

## Fastest way to get it online (free, ~2 minutes)

**Option 1: Netlify Drop**
1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page
3. You'll get a live URL instantly (e.g. `random-name.netlify.app`) — that's it, no signup required for a basic drop deploy

**Option 2: GitHub Pages**
1. Create a new GitHub repo, upload these files
2. Repo Settings → Pages → deploy from the `main` branch, root folder
3. Your app will be live at `https://yourusername.github.io/reponame/`

## Installing it as an app

**On your phone (Chrome/Safari):**
1. Open the hosted URL
2. Tap the browser menu → "Add to Home Screen" (iOS Safari) or "Install app" (Android Chrome)
3. It'll appear as a normal app icon and open full-screen, no browser bar

**On Mac Chrome:**
1. Open the hosted URL
2. Click the install icon in the address bar (or menu → "Install Interview Prep Tracker...")
3. It opens as its own app window from then on

## About your data
- Saves automatically to that browser's local storage — private to you, no server involved
- Because it's local-only, phone and Mac won't share data with each other
- Use the **⬇ Backup** button (top right) periodically to download a JSON snapshot, and **⬆ Restore** to load it back in — useful before clearing browser data, switching browsers, or if you ever want to manually move progress from one device to another

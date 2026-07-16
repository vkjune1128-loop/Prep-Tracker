# Interview Prep Tracker — standalone app

A self-contained web app version of your prep tracker. No build tools
required. Sign in with Google to sync your progress across every device.

## Files
- `index.html` — the whole app
- `manifest.json` — makes it installable as an app icon
- `service-worker.js` — enables offline use once loaded once
- `icon-192.png`, `icon-512.png` — app icons

## One-time setup: connect a free Firebase project (~10 minutes)

Your progress syncs through **Firebase** (a free Google Cloud product) —
you need your own project so your data is private to you.

### 1. Create the project
1. Go to **console.firebase.google.com** and sign in with your Google account
2. Click **Add project**, give it any name (e.g. "prep-tracker"), and finish the wizard (you can decline Google Analytics — not needed)

### 2. Enable Google Sign-In
1. In your new project, go to **Build → Authentication → Get started**
2. Click **Google** in the sign-in providers list → toggle **Enable** → pick a support email → **Save**

### 3. Create the database
1. Go to **Build → Firestore Database → Create database**
2. Choose any region close to you
3. Start in **production mode** (we'll add proper security rules below)

### 4. Lock down the security rules
Go to the **Rules** tab in Firestore and replace the contents with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /prepTrackerUsers/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Click **Publish**. This ensures only you (signed in) can read or write your own data — nobody else's.

### 5. Get your config and add it to the app
1. Go to **Project settings** (gear icon, top left) → scroll to **Your apps** → click the **</> (Web)** icon to register a new web app
2. Give it any nickname, skip Firebase Hosting, click **Register app**
3. You'll see a `firebaseConfig` object — copy it
4. Open `index.html` in this folder, find the `FIREBASE_CONFIG` object near the top (search for `YOUR_API_KEY`), and paste your real values in

That's it — deploy as usual (see below) and you'll see a "Sign in with Google" screen.

## Authorize your domain
Firebase only allows sign-in from domains you've approved:
1. **Authentication → Settings → Authorized domains**
2. Add your GitHub Pages domain (e.g. `yourusername.github.io`) if it's not already listed — `localhost` is included by default for local testing

## Deploying (same as before)

**Netlify Drop**: go to app.netlify.com/drop, drag this folder in, get a live URL instantly.

**GitHub Pages**: push these files to a repo, enable Pages in repo Settings, deploy from the branch root.

## Installing as an app
- **Phone**: open the URL → browser menu → "Add to Home Screen" (iOS) / "Install app" (Android)
- **Mac Chrome**: open the URL → click the install icon in the address bar

## About your data
- Once signed in, your progress lives in Firestore under your account and syncs automatically across any device where you sign in with the same Google account
- Firestore also caches data locally, so the app keeps working offline and syncs once you're back online
- If you were using the app before setting this up, your existing local progress is automatically copied into your account the first time you sign in
- The **⬇ Backup / ⬆ Restore** buttons still work exactly as before — useful as a manual snapshot regardless of cloud sync

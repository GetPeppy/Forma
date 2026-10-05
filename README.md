# Forma Hub

A two-page website for Autodesk Forma:

- **Products** (`/`): role picker, core modules, bundles, and a "what's in each bundle" table
- **Training & support** (`/training`): courses by product, the BuildingConnected Pro path, and help links

Plain HTML/CSS/JS with a tiny Node server. No dependencies, no build step.

## Project structure

```
forma-hub/
├── public/
│   ├── index.html      # Products page
│   └── training.html   # Training & support page
├── server.js           # Static server (uses Railway's PORT)
├── package.json
└── README.md
```

## Run it locally

Requires Node.js 18 or newer.

```bash
npm start
```

Then open http://localhost:3000

## Put it on GitHub

1. Create a new, empty repository on GitHub (no README).
2. In this folder, run:

```bash
git init
git add .
git commit -m "Initial commit: Forma Hub"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/forma-hub.git
git push -u origin main
```

Or upload the files through GitHub's web interface: open the new repo, choose **Add file → Upload files**, and drag in everything from this folder (keep the `public` folder intact).

## Deploy on Railway

1. In Railway, choose **New Project → Deploy from GitHub repo** and pick this repository.
2. Railway detects Node.js and runs `npm start` automatically. No settings needed.
3. Open the service's **Settings → Networking** and click **Generate Domain** to get a public URL.

Every push to `main` redeploys the site.

Optional: set the health check path to `/health` in the service settings.

## Editing content

All content lives in `public/index.html` and `public/training.html`. The role picker's recommendations are in the `ROLES` object near the bottom of `index.html`.

Autodesk, Forma and related product names are trademarks of Autodesk, Inc.

# Interview Prep Tracker — Project Guidelines

This file outlines the architectural constraints and development patterns for the PrepTracker project.

## Project Architecture
- **Standalone Web App**: This project is a single-page application built entirely within `index.html`. It has no backend and no build step.
- **Tech Stack**:
  - HTML5 & Vanilla CSS (inlined or in JS objects).
  - React 18 & ReactDOM 18 (loaded via CDN).
  - Service Worker (`service-worker.js`) for offline capabilities.
  - Web App Manifest (`manifest.json`) for PWA installation (Progressive Web App).
- **Zero Build Tools**: There is no `package.json`, Node.js, Webpack, Vite, or Tailwind. The React code is written in raw `React.createElement` syntax (the compiled form of JSX) directly inside the `<script>` tag in `index.html`. Do not introduce any build systems.
- **State Management**: All user data is persisted entirely in the browser's `localStorage` via a custom `window.storage` shim. No server database is involved.

## Development Rules
1. **No Build Pipeline**: Do not add `package.json` or any build tooling.
2. **No External Dependencies (npm)**: Do not suggest or install npm packages. If an external library is strictly necessary, it must be loaded via a CDN (e.g., unpkg) in `index.html`.
3. **React Syntax without JSX**: Because there is no JSX compiler in the browser, all React components must be written using `React.createElement(...)`. Do not write JSX in `index.html`.
4. **Styling**: Styles are defined via JavaScript objects and passed to the `style` prop (inline styling), or placed in the `<style>` block at the top of `index.html`. Do not use TailwindCSS, CSS modules, or external CSS frameworks.
5. **Offline Support**: The app is designed to be used offline. Any new static assets must be cached in `service-worker.js`.

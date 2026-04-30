# Awarder Electron App

This folder contains the plain Electron desktop version of Awarder App.

## Stack

- Electron
- Vanilla HTML/CSS/JavaScript (no Vite, no React)

## What Matches The Original App

- Same UI styling, fonts, spacing, animations, and component sizing.
- Same form behavior, shortcut buttons, score updates, preview, final score view, and localStorage persistence.
- Same image/audio assets reused from `../src/assets`.
- Home screen keeps `Launch App` and intentionally has no popup/open-window command.

## Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm

## Install

From this folder:

```bash
npm install
```

## Run

```bash
npm run start
```

## Build Windows EXE

From `electron_app`, install the packager first:

```bash
npm install -D electron-builder
```

Then build the Windows installer/exe:

```bash
npm run build:win
```

Build output will be created in:

- `electron_app/release`

Notes:

- The app window icon is set to the original favicon image from `../public/smile 1.png`.
- If you want a custom installer/taskbar icon in Windows, add a `.ico` file and configure it in the `build.win.icon` field in `package.json`.

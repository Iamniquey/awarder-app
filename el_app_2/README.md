# Awarder Electron App

This folder contains the plain Electron desktop version of Awarder App.

## Stack

- Electron
- Vanilla HTML/CSS/JavaScript

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

From this folder, install the packager first:

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

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
const { app, BrowserWindow, ipcMain, clipboard, Menu, nativeImage } = require("electron");
const path = require("path");

const { electron, hardResetMethod } = require("process");
const isDev = process.env.NODE_ENV === "development";

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
    hardResetMethod: "exit",
  });
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 420,
    height: 300,
    icon: path.join(__dirname, "renderer", "assets", "images", "icon.ico"),
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.setMenuBarVisibility(false)
  win.removeMenu()
  
  win.loadFile("./renderer/index.html");

  win.webContents.on("context-menu", (_, params) => {
    const template = [
      {
        label: "Always on Top",
        type: "checkbox",
        checked: win.isAlwaysOnTop(),
        click: (menuItem) => {
          win.setAlwaysOnTop(menuItem.checked);
        },
      },
      { type: "separator" },
      { role: "reload" },
      { role: "forceReload" },
      { role: "toggleDevTools" },
      {
        label: "Inspect",
        click: () => {
          win.webContents.inspectElement(params.x, params.y);
        },
      },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "selectAll" },
      { type: "separator" },
      { role: "resetZoom" },
      { role: "zoomIn" },
      { role: "zoomOut" },
    ];

    const menu = Menu.buildFromTemplate(template);
    menu.popup({ window: win });
  });

};

app.whenReady().then(() => {
  ipcMain.handle("clipboard:read-text", () => clipboard.readText());
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

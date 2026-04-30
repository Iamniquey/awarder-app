const path = require("path");
const { app, BrowserWindow, Menu, ipcMain, clipboard } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 420,
    height: 350,
    icon: path.join(__dirname, "..", "..", "public", "smile 1.png"),
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  win.setMenuBarVisibility(false);
  win.removeMenu();
  win.loadFile(path.join(__dirname, "..", "renderer", "index.html"));

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
}

app.whenReady().then(() => {
  ipcMain.handle("clipboard:read-text", () => clipboard.readText());
  Menu.setApplicationMenu(null);
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

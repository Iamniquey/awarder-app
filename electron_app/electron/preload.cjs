const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  readClipboardText: () => ipcRenderer.invoke("clipboard:read-text"),
});

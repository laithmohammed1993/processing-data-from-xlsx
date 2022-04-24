const electron        = require("electron/main");
const app             = electron.app;
const BrowserWindow   = electron.BrowserWindow;
const path            = require("path");
const isDev           = false //require("electron-is-dev");

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      autoHideMenuBar: true,
    },
  });
  mainWindow.removeMenu()
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // mainWindow.webContents.openDevTools()
  mainWindow.on("closed", () => (mainWindow = null));
  // mainWindow.setIcon('')
  mainWindow.setTitle('Data Formater')
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
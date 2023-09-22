const { app, BrowserWindow, Menu } = require('electron')
const path = require('path');
const isDev = require('electron-is-dev');
// const os = require("os")
const mainProcessEvents = require('./events/mainProcessEvents')
const { getMenuTemplate } = require('./mainApi/menu')

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 780,
    minWidth: 900,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js")
    }
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);

  // Initialize the menu
  const menu = Menu.buildFromTemplate(getMenuTemplate())
  Menu.setApplicationMenu(menu)

  // Initialize the renderer message handlers
  mainProcessEvents.initIpcMainReceiver();
}
if (process.platform === 'linux') {
  app.commandLine.appendSwitch('no-sandbox');
}

// load react devtools if dev and on linux
// TODO: add other platform config paths

// if (isDev && process.platform === 'linux' && process.env.REACT_DEV_TOOLS_PATH) {
//   console.log(`loading react dev tools extension from path: ${process.env.REACT_DEV_TOOLS_PATH}`)
//   const reactDevToolsPath = path.join(
//     os.homedir(), process.env.REACT_DEV_TOOLS_PATH
//   )
//   app.whenReady().then(async () => {
//     await session.defaultSession.loadExtension(reactDevToolsPath)
//   })


// }

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

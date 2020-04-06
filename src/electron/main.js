const {app, BrowserWindow} = require('electron');

/**
 * Create a window for the angular application.
 */
function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight:  300,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL(`file://${__dirname}/../../dist/notes-ng/index.html`).catch((reason => {
    console.error('Could not load window: ' + reason);
  }));

  win.on('closed', () => {
    win = null;
  });
}

/**
 * Entry point for the desktop application.
 */
function start() {
  app.whenReady().then(createWindow);
}

start();

import { app, BrowserWindow, ipcMain, contextBridge, ipcRenderer } from 'electron';
import path from 'node:path';

process.env.DIST = path.join(__dirname, '../dist');
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;

const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
    },
  });

  ipcMain.on('exec-command', (event, command) => {
    const { exec } = require('child_process');
    exec(command, (error, stdout, stderr) => {
      event.reply('exec-command-response', { error, stdout, stderr });
    });
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'));
  }
}

app.on('window-all-closed', () => {
  win = null;
});

app.whenReady().then(() => {
  createWindow();
  contextBridge.exposeInMainWorld(
    'electron',
    {
      doThing: () => ipcRenderer.send('do-a-thing')
    }
  )
});

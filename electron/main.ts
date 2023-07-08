import { app, BrowserWindow, ipcMain, contextBridge } from 'electron';
import path from 'node:path';
import sudo from 'sudo-prompt';
import { exec } from 'child_process';

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
    },
  });

  ipcMain.on('exec-command', (event, { id, data, useSudo }) => {
    const options = {
      name: 'Electron',
    };

    const execFunc = useSudo ? sudo.exec : exec;

    execFunc(data, options, (error, stdout, stderr) => {
      if (error) {
        event.reply('exec-command-response', { id, error, stdout, stderr });
      } else {
        event.reply('exec-command-response', { id, error: null, stdout, stderr });
      }
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
      doThing: () => win?.webContents.send('do-a-thing')
    }
  )
});

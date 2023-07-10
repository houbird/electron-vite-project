import { app, BrowserWindow, ipcMain, contextBridge, Menu, globalShortcut } from 'electron';
import path from 'node:path';
import sudo from 'sudo-prompt';
import { exec } from 'child_process';
import fs from 'fs';

process.env.DIST = path.join(__dirname, '../dist');
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');

let win: BrowserWindow;

const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false, // 隱藏工具欄
    resizable: false, // 禁止調整視窗大小
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

  // 監聽來自渲染階段的關閉窗口請求
  ipcMain.on('close-window', () => {
    win.close();
  });

  // 註冊全域快捷鍵
  globalShortcut.register('CommandOrControl+Q', () => {
    win.close();
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'));
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(() => {
  createWindow();
  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
  ]);
  contextBridge.exposeInMainWorld(
    'electron',
    {
      doThing: () => win?.webContents.send('do-a-thing')
    }
  );
});

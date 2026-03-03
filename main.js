const { app, BrowserWindow, clipboard, shell, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'renderer.js')
        },
        frame: true,
        show: false,
        backgroundColor: '#1e3c72'
    });

    mainWindow.loadFile('index.html');
   
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Copier l'IP
ipcMain.on('copy-ip', (event) => {
    clipboard.writeText('147.185.221.17:12971');
    event.reply('copied');
});

// Lancer Minecraft
ipcMain.on('launch-minecraft', (event) => {
    clipboard.writeText('147.185.221.17:12971');
   
    // Essaie de lancer Minecraft
    exec('minecraft-launcher', (error) => {
        if (error) {
            exec('xdg-open minecraft://');
        }
    });
    event.reply('minecraft-launched');
});

// Ouvrir Discord
ipcMain.on('open-discord', (event) => {
    shell.openExternal('https://discord.gg/UACRdsmMu');
    event.reply('discord-opened');
}); 

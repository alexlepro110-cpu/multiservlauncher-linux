// main.js
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
        backgroundColor: '#1e3c72',
        icon: path.join(__dirname, 'assets/icon.png')
    });

    mainWindow.loadFile('index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // DevTools en mode développement
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// IPC Handlers
ipcMain.on('copy-to-clipboard', (event, text) => {
    clipboard.writeText(text);
    event.reply('copy-success');
});

ipcMain.on('launch-minecraft', (event) => {
    const command = process.platform === 'linux' ? 'minecraft-launcher' : 'minecraft';
   
    exec(command, (error, stdout, stderr) => {
        if (error) {
            // Si la commande directe échoue, essaie avec le protocole
            exec('xdg-open minecraft://', (err) => {
                if (err) {
                    event.reply('minecraft-error', 'Minecraft non trouvé. Installe-le d\'abord.');
                } else {
                    event.reply('minecraft-launched');
                }
            });
        } else {
            event.reply('minecraft-launched');
        }
    });
});

ipcMain.on('open-discord', () => {
    shell.openExternal('https://discord.gg/UACRdsmMu');
}); 
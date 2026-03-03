// renderer.js
const { ipcRenderer } = require('electron');

const IP = '147.185.221.17';
const PORT = '12971';
const FULL_IP = `${IP}:${PORT}`;

// Éléments DOM
const minecraftBtn = document.getElementById('minecraftBtn');
const discordBtn = document.getElementById('discordBtn');
const statusDiv = document.getElementById('status');
const ipBox = document.getElementById('ipAddress');

// Copie dans le presse-papiers (via le main process)
function copyToClipboard(text) {
    ipcRenderer.send('copy-to-clipboard', text);
}

// Affiche un message de statut
function showStatus(message, type = 'success') {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    setTimeout(() => {
        statusDiv.textContent = '';
        statusDiv.className = 'status';
    }, 3000);
}

// Bouton Minecraft
minecraftBtn.addEventListener('click', () => {
    // Copie l'IP
    copyToClipboard(FULL_IP);
   
    // Affiche le message
    showStatus('? IP copiée ! Lancement de Minecraft...');
   
    // Lance Minecraft
    ipcRenderer.send('launch-minecraft');
});

// Bouton Discord
discordBtn.addEventListener('click', () => {
    ipcRenderer.send('open-discord');
    showStatus('? Discord ouvert !');
});

// Animation de copie
ipBox.addEventListener('click', () => {
    copyToClipboard(FULL_IP);
    showStatus('? IP copiée !');
});

// Messages du main process
ipcRenderer.on('copy-success', () => {
    showStatus('? IP copiée !');
});

ipcRenderer.on('minecraft-launched', () => {
    console.log('Minecraft lancé');
});

ipcRenderer.on('minecraft-error', (event, error) => {
    showStatus('? ' + error, 'error');
});    
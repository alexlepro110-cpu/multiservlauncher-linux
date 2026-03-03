const { ipcRenderer } = require('electron');

// Éléments DOM
const copyBtn = document.getElementById('copyBtn');
const minecraftBtn = document.getElementById('minecraftBtn');
const discordBtn = document.getElementById('discordBtn');
const statusDiv = document.getElementById('status');

// Copier IP
copyBtn.addEventListener('click', () => {
    ipcRenderer.send('copy-ip');
    showStatus('📋 IP copiée !');
});

// Lancer Minecraft
minecraftBtn.addEventListener('click', () => {
    ipcRenderer.send('launch-minecraft');
    showStatus('⛏️ IP copiée ! Lancement de Minecraft...');
});

// Ouvrir Discord
discordBtn.addEventListener('click', () => {
    ipcRenderer.send('open-discord');
    showStatus('💬 Discord ouvert !');
});

// Réponses
ipcRenderer.on('copied', () => {
    showStatus('✅ IP copiée !');
});

ipcRenderer.on('minecraft-launched', () => {
    // Déjà géré
});

ipcRenderer.on('discord-opened', () => {
    // Déjà géré
});

function showStatus(message) {
    statusDiv.textContent = message;
    statusDiv.style.display = 'block';
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 2000);
}    

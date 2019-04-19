'use strict';

const electron = require('electron');
const Window = require('./Window');
const { app } = electron;

//Standard Window
let mainWindow;

function createWindow() {
    mainWindow = new Window({ url: 'http://localhost:3000', config: { title: 'FFVideo', webPreferences: { backgroundThrottling: false } } });
    mainWindow.on('closed', () => mainWindow = null);
};

app.on('ready', () => {
    createWindow();
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

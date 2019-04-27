'use strict';

const electron = require('electron');
const Window = require('./Window');
const { app, ipcMain } = electron;
const ffmpeg = require('fluent-ffmpeg');

let mainWindow;

function createWindow() {
    mainWindow = new Window({ url: 'http://localhost:4680', config: { title: 'FFVideo', webPreferences: { backgroundThrottling: false } } });
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

ipcMain.on('onFilesAdded', (event, files) => {
    const promises = files.map(file => {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(file.path, (err, meta) => {
                resolve(meta);
            });
        });

    });
    Promise.all(promises)
        .then((res) => console.log(res));
});

ipcMain.on('onFilesRemoved', (event, files) => {

});

ipcMain.on('onFilesConverted', (event, files) => {

});

ipcMain.on('onFilePreview', (event, file) => {

});
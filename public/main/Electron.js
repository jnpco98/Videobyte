'use strict';

const electron = require('electron');
const Window = require('./Window');
const { app, ipcMain } = electron;
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

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
                resolve({ ...file, meta });
            });
        });
    });
    Promise.all(promises)
        .then(res => mainWindow.webContents.send('onFetchMetaDataComplete', res));
});

ipcMain.on('onFilesConvertStart', (event, files, { saveLocation, saveToCurrentDirectory }, { prefix, suffix }) => {
    const file = files[0];
    const outputDir = saveToCurrentDirectory ? path.dirname(file.path) : saveLocation;
    if (!fs.existsSync(outputDir)) {
        console.log('Invalid Location: ', outputDir);
    }
    else {
        console.log('outputDirectory: ', outputDir, ' || outputFilename: ', prefix + path.basename(file.path).split('.')[0] + suffix + '.mov');
    }
});

ipcMain.on('onFilePreview', (event, file) => {

});
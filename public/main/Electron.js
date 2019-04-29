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

// Check if file exists in directory - overwrite.
ipcMain.on('onFilesConvertStart', (event, files, { saveLocation, saveToCurrentDirectory }, { outputFormat }, { prefix, suffix }) => {
    const file = files[0];
    const outputDirectory = saveToCurrentDirectory ? path.dirname(file.path) : saveLocation;
    const outputFilename = prefix + path.parse(file.name).name + suffix + outputFormat.extension;

    if (!fs.existsSync(outputDirectory)) {
        console.log('Invalid Location: ', outputDirectory);
    }
    else {
        const outputPath = path.join(outputDirectory, outputFilename)
        console.log(`${file.name} -> ${outputPath} complete.`)
        // ffmpeg(file.path)
        //     .output(outputPath)
        //     .on('end', () => console.log(`${file.name} -> ${outputPath} complete.`))
        //     .run();
    }
});

ipcMain.on('onFilePreview', (event, file) => {

});
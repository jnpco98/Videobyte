'use strict';

const electron = require('electron');
const Window = require('./Window');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

const { app, Menu, ipcMain, shell } = electron;
const MenuTemplate = require('./assets/MenuTemplate');

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

ipcMain.on('displayAppMenu', (event, { x, y }) => {
    const menuTemplate = Menu.buildFromTemplate(MenuTemplate);
    if (mainWindow) {
        menuTemplate.popup(x, y);
    }
});

ipcMain.on('onFilesAdded', (event, files) => {
    if (mainWindow) {
        Promise.all(files.map(file => {
            return new Promise((resolve, reject) => {
                ffmpeg.ffprobe(file.path, (err, meta) => {
                    resolve({ ...file, meta });
                });
            });
        })).then(filesWithMetadata => {
            mainWindow.webContents.send('onFetchMetadataComplete', filesWithMetadata)
        });
    };
});

ipcMain.on('onFilesConvertStart', (event, files, { prefix, suffix, outputFormat, saveLocation, saveToCurrentDirectory, size }) => {
    if (mainWindow) {
        files.forEach(file => {
            const outputDirectory = saveToCurrentDirectory ? path.dirname(file.path) : saveLocation;
            const outputFilename = prefix + path.parse(file.name).name + suffix + outputFormat.extension;

            if (!fs.existsSync(outputDirectory)) {
                console.log('Invalid Location: ', outputDirectory);
            }
            else {
                const outputPath = fs.existsSync(path.join(outputDirectory, outputFilename)) ?
                    path.join(outputDirectory, 'converted_' + outputFilename) :
                    path.join(outputDirectory, outputFilename);

                let ffmpegCommand = ffmpeg(file.path)
                    .on('progress', ({ percent }) => mainWindow.webContents.send('onFileConvertProgress', { id: file.id, percent }))
                    .on('end', () => mainWindow.webContents.send('onFileConvertEnd', { id: file.id, outputPath }));

                if (size) ffmpegCommand = ffmpegCommand.size(size);
                ffmpegCommand.save(outputPath);
            }
        });
    }

});

ipcMain.on('onDirectoryOpened', (event, outputPath) => {
    shell.showItemInFolder(outputPath);
});

ipcMain.on('onFilePreview', (event, file) => {

});
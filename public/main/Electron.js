'use strict';

const electron = require('electron');
const Window = require('./Window');
const { app, ipcMain } = electron;
const ffmpeg = require('fluent-ffmpeg');

let mainWindow;
let prevSize;

function createWindow() {
    mainWindow = new Window({ url: 'http://localhost:4680', config: { title: 'FFVideo', webPreferences: { backgroundThrottling: false } } });
    setInterval(() => { if (mainWindow) prevSize = mainWindow.getSize(); }, 10);

    mainWindow.on('closed', () => mainWindow = null);
    mainWindow.on('resize', () => handleResize());
};

function handleResize() {
    if (mainWindow !== null) {
        let size = mainWindow.getSize();
        const ratio = 600 / 800; // Height, Width
        prevSize[0] != size[0] ? mainWindow.setSize(size[0], parseInt((size[0] * ratio).toString())) : mainWindow.setSize(parseInt((size[1] / ratio).toString()), size[1]);
    }
}

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

ipcMain.on('onFilesConvertStart', (event, files) => {

});

ipcMain.on('onFilePreview', (event, file) => {

});
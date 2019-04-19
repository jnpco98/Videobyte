'use strict';

const { BrowserWindow, Menu } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

const defaultConfig = { width: 800, height: 600, minWidth: 800, minHeight: 600, show: false };

const defaultMenu = [
    {
        label: 'File',
        submenu: [
            { role: 'minimize' },
            { role: 'quit' }
        ]
    }
];

if (process.platform === 'darwin') {
    defaultMenu.unshift({});
};

if (process.env.NODE_ENV !== 'production') {
    defaultMenu.push({
        'label': 'Help',
        submenu: [
            { role: 'toggleDevTools' },
            { role: 'reload' }
        ]
    });
};

class Window extends BrowserWindow {
    constructor({ url, config, menu, hidden }) {
        super({ ...defaultConfig, ...config });
        this.loadURL(isDev ? url : `file://${path.join(__dirname, '../build/index.html')}`);

        if (!hidden) this.once('ready-to-show', () => this.show());

        Menu.setApplicationMenu(Menu.buildFromTemplate(menu ? menu : defaultMenu));
    }
}

module.exports = Window;
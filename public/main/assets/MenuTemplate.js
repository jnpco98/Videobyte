const MenuTemplate = [
    {
        role: 'minimize',
        role: 'quit'
    }
]

if (process.platform === 'darwin') {
    menuTemplate.unshift({});
}

module.exports = MenuTemplate;
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title),
    getTitle: () => ipcRenderer.send('get-title'),
    convert: (from_curr, to_curr, amount) => ipcRenderer.send('convert', from_curr, to_curr, amount),
    on: (channel, func) => {
        const validChannels = ['converted']
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args))
        }
    }
})
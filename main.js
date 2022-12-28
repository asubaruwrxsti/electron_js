const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow() {

  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })

  ipcMain.on('get-title', (event) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    const title = win.getTitle()
    console.log(title)
  })

  ipcMain.on('convert', (event, from_curr, to_curr, amount) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)

    const rates = {
      USD: 1,
      EUR: 0.9,
      GBP: 0.8
    }

    const converted = amount * rates[to_curr] / rates[from_curr]
    // send converted value to renderer.js
    win.webContents.send('converted', converted)
  })

  mainWindow.webContents.openDevTools()
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
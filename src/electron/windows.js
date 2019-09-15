// import path from 'path'
import { ipcMain, Menu, app, BrowserWindow } from 'electron'
import queryString from 'query-string'

//   if (process.env.WEBPACK_DEV_SERVER_URL) {
//     // Load the url of the dev server if in development mode
//     win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
//     if (!process.env.IS_TEST) win.webContents.openDevTools()
//   } else {
//     createProtocol('app')
//     // Load the index.html when not in development
//     win.loadURL('app://./index.html')
//   }

export function generateUrl() {
  return process.env.NODE_ENV === 'development'
    ? process.env.WEBPACK_DEV_SERVER_URL
    : 'app://./index.html'
}

function getOffsetedWindowPosition() {
  const focused = BrowserWindow.getFocusedWindow()
  const offset = 40
  return focused
    ? {
        x: focused.getPosition()[0] + offset,
        y: focused.getPosition()[1] + offset
      }
    : {}
}

function createWindow(data, options) {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    fullscreenable: false,
    titleBarStyle: 'hidden',
    frame: false,
    resizable: true,
    icon: path.join(__dirname, '/icons/512x512.png'),
    ...options
  })

  const query = queryString.stringify(data.query)
  win.loadURL(generateUrl(data.path, query))

  return win
}

export function showTrackerEditor() {
  createWindow(
    { path: 'settings/tracker-editor' },
    { width: 760, height: 880, ...getOffsetedWindowPosition() }
  )
}

export function showSettings() {
  createWindow({ path: 'settings/trackers' }, { width: 600, height: 480 })
}

app.on('ready', () => {
  Menu.setApplicationMenu(null)
})

ipcMain.on('showTrackerEditor', (e, data) => showTrackerEditor(data))
ipcMain.on('showSettings', () => showSettings())

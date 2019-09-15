import path from 'path'
import { app } from 'electron'
import { Menubar } from 'menubar'
import { differenceInSeconds } from 'date-fns'
import { fromS } from 'hh-mm-ss'
import { generateUrl } from './windows'
// import store from '../store'

function getTrayIcon() {
  switch (process.platform) {
    case 'darwin':
      return '/logo.png'
    case 'win32':
      return '/icon-tray.ico'
    default:
      return '/logo.png'
  }
}

const menubar = new Menubar(app, {
  index: generateUrl(),
  icon: path.join(__static, getTrayIcon()),
  tooltip: 'Open App',
  preloadWindow: true,
  browserWindow: {
    width: 485,
    height: 630,
    webPreferences: {
      nodeIntegration: true
    }
  }
})

function getTrayTitle() {
  // const startedAt = (store.getters['activities/working'] || {}).startedAt
  // return startedAt ? fromS(differenceInSeconds(new Date(), startedAt)) : ''
}

menubar.on('ready', () => {
  setInterval(() => menubar.tray.setTitle(getTrayTitle()), 500)
})

export default menubar

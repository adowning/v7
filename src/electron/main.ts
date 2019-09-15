import { ipcMain } from 'electron'
import { AndrewsDesktop } from './andrews-desktop'
import { Log } from './log'

/**
 * Application entry point.
 */
export default class Main {
  /**
   * Main entry point for the application.
   *
   * @static
   * @param {App} application  The native application.
   * @param {typeof BrowserWindow} window
   * @memberof Main
   */
  public static application;
  public static andrewsApp;

  static main(application) {
    Log.info('Application ')
    console.log('Application createApp')
    // Initialize.
    Main.application = application
    Main.application.on('activate', Main.onActivate)
    Main.application.on('ready', Main.onReady)
    Main.application.on('window-all-closed', Main.onWindowAllClosed)
    Main.application.setName(AndrewsDesktop.AppName)
    // Wire IPC.
    // Unread inbox count changes.
    ipcMain.on('unread-count-changed', (e, ...args) => {
      // Get number of messages.
      const count = args[0] ? args[0] : 0
      if (Main.andrewsApp) {
        Main.andrewsApp.setUnreadMessages(count)
      }
    })
    ipcMain.on('new-mail', (e, ...args) => {
      // Get number of messages.
      const count = args[0] ? args[0] : 0
      if (Main.andrewsApp) {
        Main.andrewsApp.setUnreadMessages(count)
      }
    })
    // Gmail has been connected.
    ipcMain.on('gmail-initialized', (e, ...args) => {
      // Do some initial setup.
      const userEmail = args[0] ? args[0] : '<unknown>'
      if (Main.andrewsApp) {
        Main.andrewsApp.setUserEmail(userEmail)
      }
    })
  }
  /**
   * Factory method for the main window.
   *
   * @private
   * @static
   * @returns {BrowserWindow}
   * @memberof Main
   */
  static createApp() {
    Log.info('Application createApp')
    console.log('Application createApp')

    const mainApp = new AndrewsDesktop()
    mainApp.on('closed', Main.onClosed)
    Log.info('Application startup. main.js createapp')

    mainApp.openWindow()
    return mainApp
  }
  /**
   * Handles the app's 'activate' event. Emitted when the application is activated (macOS only).
   *
   * @private
   * @static
   * @memberof Main
   */
  static onActivate() {
    Log.info('Application onActivate')
    console.log('Application onActivate')
    if (Main.andrewsApp == null) {
      Main.andrewsApp = Main.createApp()
    }
  }
  /**
   * Handles the window's 'close' event. Emitted when the window is going to be closed.
   *
   * @private
   * @static
   * @memberof Main
   */
  static onClosed() {
    Main.andrewsApp = null
  }
  /**
   * Handles the app's 'ready' event. Emitted when Electron has finished initializing.
   *
   * @private
   * @static
   * @memberof Main
   */
  static onReady() {
    Log.info('Application onReady')
    console.log('Application onReady')

    Main.andrewsApp = Main.createApp()
  }
  /**
   * Handles the app's 'window-all-closed' event. Emitted when all windows have been closed.
   *
   * @private
   * @static
   * @memberof Main
   */
  static onWindowAllClosed() {
    // On macOS it is common for applications to stay open until the user explicitly quits.
    if (process.platform !== 'darwin') {
      Main.application.quit()
    }
  }
}

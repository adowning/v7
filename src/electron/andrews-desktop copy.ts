import { app, BrowserWindow, screen } from 'electron'
import { EventEmitter } from 'events'
import * as path from 'path'
import * as url from 'url'
import * as util from 'util'
import { ApplicationMenu } from './application-menu'
import { ApplicationTray } from './application-tray'
import { Config } from './config'
import { Log } from './log'
import { Notifier } from './notifier'
import { ToastMessenger } from './toast-messenger'
import { Updater } from './updater'
import Store from 'electron-store'

import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
/**
 * Main application class.
 *
 * @export
 * @class AndrewsDesktop
 */
const isDevelopment = process.env.NODE_ENV !== 'production'

export class AndrewsDesktop extends EventEmitter {
  /**
   * Creates an instance of AndrewsDesktop.
   *
   * @memberof AndrewsDesktop
   */
  public config;
  public forceQuit;
  public unreadMessages;
  public userEmail;
  public window;
  public notifier;
  public tray;
  public updater;
  public messenger;
  public AppName;
  public __static;
  public loadingWindow;

  constructor() {
    super()
    /** The application config. */
    this.config = new Config()
    /** Indicates wether to force quitting or simpliy minimizing the application. */
    this.forceQuit = false
    /** The number of unread messages. */
    this.unreadMessages = 0
    /** The logged in user's email address. */
    this.userEmail = '<unknown>'
    // Hello, world.
    Log.info('Application startup.')
    // Create and initialize the main window.
    this.window = this.createWindow()
    this.notifier = new Notifier()
    this.tray = new ApplicationTray(this.window)
    this.messenger = new ToastMessenger(this.window.webContents)
    //TODO here
    this.updater = new Updater(this.messenger);
    // Wire up app and window events.
    // 'before-quit' is emitted when Electron receives the signal to exit and wants to start closing windows.
    app.on('before-quit', () => (this.forceQuit = true))
    this.window.on('close', this.onClose.bind(this))
    this.window.on('closed', this.onClosed.bind(this))
    this.window.on('ready-to-show', this.onReadyToShow.bind(this))
  }
  /**
   * Gets the app configuration object.
   *
   * @returns {Config} The app configuration.
   * @memberof AndrewsDesktop
   */
  getConfig() {
    return this.config
  }
  /**
   * Gets the main window.
   *
   * @returns {BrowserWindow} The application's main window.
   * @memberof AndrewsDesktop
   */
  getMainWindow() {
    return this.window
  }
  /**
   * Gets the updater object.
   *
   * @returns {Updater}
   * @memberof AndrewsDesktop
   */
  getUpdater() {
    return this.updater
  }


  /**
   * Opens the browser window.
   *
   * @memberof AndrewsDesktop
   */
  async openWindow(user) {
    new ApplicationMenu(this)

    // andrewsApp = Main.createApp();
    if (isDevelopment && !process.env.IS_TEST) {
      // Install Vue Devtools
      try {
        //   await installVueDevtools()
        const settingsStore = new Store<any>({ name: 'settings' })

        const position = settingsStore.get('window', {})

        this.window = new BrowserWindow({
          width: 1200,
          height: 755,
          x: position.x,
          y: position.y,
          maximizable: false,
          // frame: false,
          darkTheme: true,
          backgroundColor: '#111',
          webPreferences: {
            webSecurity: false,
            allowRunningInsecureContent: false,
            nodeIntegration: true,
          },
        })
        if (process.env.WEBPACK_DEV_SERVER_URL) {
          // Load the url of the dev server if in development mode
          this.window.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
          if (!process.env.IS_TEST) this.window.webContents.openDevTools()
        } else {
          createProtocol('app')
          // Load the index.html when not in development
          this.window.loadURL('app://./index.html')
        }

        // this.window.on('closed', () => {
        //   console.log('CLOSED!')
        //   this.window = null
        // })
      } catch (e) {
        console.error('Vue Devtools failed to install:', e.toString())
      }
    }
    // tslint:disable-next-line:no-unused-expression
    // if (process.env.WEBPACK_DEV_SERVER_URL) {
    //     console.log('is dev')
    //     console.log(process.env.WEBPACK_DEV_SERVER_URL)
    //     // Load the url of the dev server if in development mode
    //     this.window.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    //      this.window.webContents.openDevTools()
    //   } else {
    //     console.log('is not dev')

    //     createProtocol('app')
    //     // Load the index.html when not in development
    //     this.window.loadURL('app://./index.html')
    //   }
    // if (AndrewsDesktop.IsDevelopment) {
    //     this.window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
    // }
    // else {
    //     this.window.loadURL(url.format({
    //         pathname: path.join(__dirname, 'index.html'),
    //         protocol: 'file',
    //         slashes: true,
    //     }));
    // }
  }

  /**
   * Sets the number of currently unread messages.
   *
   * @param {number} unreadMessages The number of unread messages.
   * @returns {AndrewsDesktop}
   * @memberof AndrewsDesktop
   */
  setUnreadMessages(unreadMessages) {
    this.unreadMessages = unreadMessages
    this.tray.markUnread(this.unreadMessages > 0)
    // Done.
    return this
  }
  /**
   * Informs the application about a new email.
   *
   * @returns {AndrewsDesktop}
   * @memberof AndrewsDesktop
   */
  setHasNewMail() {
    const isEnabled = this.getConfig().getIsNotificationsEnabled()
    if (isEnabled) this.notifier.notifyUnread(this.unreadMessages)
    // Done.
    return this
  }

  // 4tsEITXrE7u1aITRn79yADJMADlfKFyJACAknOUI
  // ZJPsYASGon23OiIVPrvS4mwynRiL2cZvx1AtF97y
  /**
   * Sets the logged in user's email address.
   *
   * @param {string} userEmail The email address.
   * @returns {AndrewsDesktop}
   * @memberof AndrewsDesktop
   */
  setUserEmail(userEmail) {
    this.userEmail = userEmail
    this.window.setTitle(
      // util.format('%s | %s', this.userEmail, AndrewsDesktop.AppName)
    )
    this.tray.setUserEmail(this.userEmail)
    // Done.
    return this
  }
  /**
   * Creates, initializes and returns the main browser window.
   *
   * @private
   * @returns {BrowserWindow}
   * @memberof AndrewsDesktop
   */
  createWindow() {
    // Create a window instance ...
    const options = this.createWindowOptions()
    const window = new BrowserWindow(options)
    // ... and return the result.
    return window
  }


  /**
   * Creates and returns the options for the main window.
   *
   * @private
   * @returns {BrowserWindowConstructorOptions}
   * @memberof AndrewsDesktop
   */
  createWindowOptions() {
    // Create window configuration.
    console.log('createing options')
    const config = {
      icon: path.join(__static, 'icon.png'),
      nodeIntegration: true,
      show: false,
      title: 'Andrews App'
    }
    this.config.addMainWindowConfiguration(config)
    // Done.
    return config
  }
  /**
   * Handles the 'close' event of the main window.
   *
   * @private
   * @param {Event} e The source event.
   * @returns {void}
   * @memberof AndrewsDesktop
   */
  onClose(e) {
    // Update user configuration.
    console.log('closing window')
    const windowBounds = this.window.getBounds()
    this.config.setWindowBounds(windowBounds)
    // Stop here if quitting the application is intended.
    if (this.forceQuit) {
      return
    }
    // Stop the event; hide main window.
    e.preventDefault()
    this.window.hide()
  }
  onClosed(e) {
    this.emit('closed')
  }
  /**
   * Handles the main window's 'ready-to-show' event.
   *
   * @private
   * @param {Event} e
   * @memberof AndrewsDesktop
   */
  async onReadyToShow(e) {
    // Display the window eventually.
    const showWindow = !this.config.get('startMinimized')
    if (showWindow) this.window.show()
    // Trigger updater.
    //TODO here2
    // this.updater.check();
    await installVueDevtools()
  }
}
// AndrewsDesktop.AppHomepage = 'http://ashdevtools.com'
// AndrewsDesktop.AppName = 'Andrews Admin'
// AndrewsDesktop.AppVersion = '1.0.0'
// AndrewsDesktop.IsDevelopment = process.env.NODE_ENV !== 'production'

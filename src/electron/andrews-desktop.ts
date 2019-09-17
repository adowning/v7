import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { EventEmitter } from 'events';
import * as path from 'path';
import * as url from 'url';
import * as util from 'util';
import { ApplicationMenu } from './application-menu';
import { ApplicationTray } from './application-tray';
import { Config } from './config';
import { Log } from './log';
import { Notifier } from './notifier';
import { ToastMessenger } from './toast-messenger';
import { Updater } from './updater';
import Store from 'electron-store'

import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const APP_HOMEPAGE = "http://ashdevtools.com"
const APP_PRODUCTNAME = "andrews-app"
const APP_VERSION = "1.1.1"

/**
 * Main application class.
 *
 * @export
 * @class AndrewsDesktop
 */
export class AndrewsDesktop extends EventEmitter {

  public static AppHomepage: string = `${APP_HOMEPAGE}`;

  public static AppName: string = `${APP_PRODUCTNAME}`;

  public static AppVersion: string = `${APP_VERSION}`;

  public static IsDevelopment: boolean = process.env.NODE_ENV !== 'production';

  /** The application config. */
  private config: Config = new Config();

  /** Indicates wether to force quitting or simpliy minimizing the application. */
  private forceQuit: boolean = false;

  /** The window messenger. */
  private messenger: ToastMessenger;

  /** The notifier. */
  private notifier: Notifier;

  /** The tray icon. */
  private tray: ApplicationTray;

  /** The number of unread messages. */
  private unreadMessages: number = 0;

  private updater: Updater;

  /** The logged in user's email address. */
  private userEmail: string = '<unknown>';

  /** The main window. */
  private window: BrowserWindow;

  /**
   * Creates an instance of AndrewsDesktop.
   *
   * @memberof AndrewsDesktop
   */
  constructor() {
    super();

    // Hello, world.
    Log.info('Application startup.');

    // Create and initialize the main window.
    this.window = this.createWindow();
    this.notifier = new Notifier();
    this.tray = new ApplicationTray(this.window);
    this.messenger = new ToastMessenger(this.window.webContents);
    this.updater = new Updater(this.messenger);

    // Wire up app and window events.
    // 'before-quit' is emitted when Electron receives the signal to exit and wants to start closing windows.
    app.on('before-quit', () => this.forceQuit = true);
    this.window.on('close', this.onClose.bind(this));
    this.window.on('closed', this.onClosed.bind(this));
    this.window.on('ready-to-show', this.onReadyToShow.bind(this));

  }

  /**
   * Gets the app configuration object.
   *
   * @returns {Config} The app configuration.
   * @memberof AndrewsDesktop
   */
  public getConfig(): Config {
    return this.config;
  }

  /**
   * Gets the main window.
   *
   * @returns {BrowserWindow} The application's main window.
   * @memberof AndrewsDesktop
   */
  public getMainWindow(): BrowserWindow {
    return this.window;
  }

  /**
   * Gets the updater object.
   *
   * @returns {Updater}
   * @memberof AndrewsDesktop
   */
  public getUpdater(): Updater {
    return this.updater;
  }

  /**
   * Opens the browser window.
   *
   * @memberof AndrewsDesktop
   */
  public async openWindow(): Promise<void> {

    // tslint:disable-next-line:no-unused-expression
    new ApplicationMenu(this);
    const settingsStore = new Store<any>({ name: 'settings' })

    const position = settingsStore.get('window', {})
    // this.window = new BrowserWindow({
    //   width: 1200,
    //   height: 755,
    //   x: position.x,
    //   y: position.y,
    //   maximizable: false,
    //   // frame: false,
    //   darkTheme: true,
    //   backgroundColor: '#111',
    //   webPreferences: {
    //     webSecurity: false,
    //     allowRunningInsecureContent: false,
    //     nodeIntegration: true,
    //   },
    // })
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      await installVueDevtools()

      // Load the url of the dev server if in development mode
      console.log(process.env.WEBPACK_DEV_SERVER_URL)
      this.window.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
      if (!process.env.IS_TEST) this.window.webContents.openDevTools()
    } else {
      createProtocol('app')
      // Load the index.html when not in development
      this.window.loadURL('app://./index.html')
    }

  }
  // async openWindow(user) {
  //   new ApplicationMenu(this)

  //   // andrewsApp = Main.createApp();
  //   if (process.env.WEBPACK_DEV_SERVER_URL && !process.env.IS_TEST) {
  //     // Install Vue Devtools
  //     try {
  //       //   await installVueDevtools()
  //       const settingsStore = new Store<any>({ name: 'settings' })

  //       const position = settingsStore.get('window', {})

  //       this.window = new BrowserWindow({
  //         width: 1200,
  //         height: 755,
  //         x: position.x,
  //         y: position.y,
  //         maximizable: false,
  //         frame: false,
  //         darkTheme: true,
  //         backgroundColor: '#111',
  //         webPreferences: {
  //           webSecurity: false,
  //           allowRunningInsecureContent: false,
  //           nodeIntegration: true,
  //         },
  //       })
  //       if (process.env.WEBPACK_DEV_SERVER_URL) {
  //         // Load the url of the dev server if in development mode
  //         this.window.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  //         if (!process.env.IS_TEST) this.window.webContents.openDevTools()
  //       } else {
  //         createProtocol('app')
  //         // Load the index.html when not in development
  //         this.window.loadURL('app://./index.html')
  //       }

  //       // this.window.on('closed', () => {
  //       //   console.log('CLOSED!')
  //       //   this.window = null
  //       // })
  //     } catch (e) {
  //       console.error('Vue Devtools failed to install:', e.toString())
  //     }
  //   }
  //   // tslint:disable-next-line:no-unused-expression
  //   // if (process.env.WEBPACK_DEV_SERVER_URL) {
  //   //     console.log('is dev')
  //   //     console.log(process.env.WEBPACK_DEV_SERVER_URL)
  //   //     // Load the url of the dev server if in development mode
  //   //     this.window.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  //   //      this.window.webContents.openDevTools()
  //   //   } else {
  //   //     console.log('is not dev')

  //   //     createProtocol('app')
  //   //     // Load the index.html when not in development
  //   //     this.window.loadURL('app://./index.html')
  //   //   }
  //   // if (AndrewsDesktop.IsDevelopment) {
  //   //     this.window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  //   // }
  //   // else {
  //   //     this.window.loadURL(url.format({
  //   //         pathname: path.join(__dirname, 'index.html'),
  //   //         protocol: 'file',
  //   //         slashes: true,
  //   //     }));
  //   // }
  // }
  /**
   * Sets the number of currently unread messages.
   *
   * @param {number} unreadMessages The number of unread messages.
   * @returns {AndrewsDesktop}
   * @memberof AndrewsDesktop
   */
  public setUnreadMessages(unreadMessages: number): AndrewsDesktop {

    this.unreadMessages = unreadMessages;
    this.tray.markUnread(this.unreadMessages > 0);

    // Done.
    return this;

  }

  /**
   * Informs the application about a new email.
   *
   * @returns {AndrewsDesktop}
   * @memberof AndrewsDesktop
   */
  public setHasNewMail(): AndrewsDesktop {

    const isEnabled = this.getConfig().getIsNotificationsEnabled();
    if (isEnabled) this.notifier.notifyUnread(this.unreadMessages);

    // Done.
    return this;

  }

  /**
   * Sets the logged in user's email address.
   *
   * @param {string} userEmail The email address.
   * @returns {AndrewsDesktop}
   * @memberof AndrewsDesktop
   */
  public setUserEmail(userEmail: string): AndrewsDesktop {

    this.userEmail = userEmail;
    this.window.setTitle(util.format('%s | %s', this.userEmail, AndrewsDesktop.AppName));
    this.tray.setUserEmail(this.userEmail);

    // Done.
    return this;

  }

  /**
   * Creates, initializes and returns the main browser window.
   *
   * @private
   * @returns {BrowserWindow}
   * @memberof AndrewsDesktop
   */
  private createWindow(): BrowserWindow {

    // Create a window instance ...
    const options = this.createWindowOptions();
    const window = new BrowserWindow(options);

    // ... and return the result.
    return window;

  }

  /**
   * Creates and returns the options for the main window.
   *
   * @private
   * @returns {BrowserWindowConstructorOptions}
   * @memberof AndrewsDesktop
   */
  private createWindowOptions(): BrowserWindowConstructorOptions {

    const settingsStore = new Store<any>({ name: 'settings' })
    const position = settingsStore.get('window', {})
    // Create window configuration.
    const config: BrowserWindowConstructorOptions = {
      width: 1200,
      height: 755,
      x: position.x,
      y: position.y,
      maximizable: false,
      frame: false,
      darkTheme: true,
      backgroundColor: '#111',
      webPreferences: {
        webSecurity: false,
        allowRunningInsecureContent: false,
        nodeIntegration: true,
      },
      icon: path.join(__static, 'tray-icon-default.png'),
      show: true,
      title: `${APP_PRODUCTNAME}`,
    };
    this.config.addMainWindowConfiguration(config);

    // Done.
    return config;

  }

  /**
   * Handles the 'close' event of the main window.
   *
   * @private
   * @param {Event} e The source event.
   * @returns {void}
   * @memberof AndrewsDesktop
   */
  private onClose(e: Event): void {
    console.log('andrews-desktop.js onclose')
    // Update user configuration.
    const windowBounds = this.window.getBounds();
    this.config.setWindowBounds(windowBounds);

    // Stop here if quitting the application is intended.
    if (this.forceQuit) { return; }

    // Stop the event; hide main window.
    e.preventDefault();
    this.window.hide();

  }

  private onClosed(e: Event): void {
    console.log('andrews-desktop.js onclosed')

    this.emit('closed');
  }

  /**
   * Handles the main window's 'ready-to-show' event.
   *
   * @private
   * @param {Event} e
   * @memberof AndrewsDesktop
   */
  private onReadyToShow(e: Event): void {

    // Display the window eventually.
    const showWindow = !this.config.get('startMinimized');
    if (showWindow) this.window.show();

    // Trigger updater.
    this.updater.check();
  }

}
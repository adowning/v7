import { App, ipcMain, IpcMainEvent } from 'electron';
import { AndrewsDesktop } from './andrews-desktop';

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
  public static main(application: App): void {

    // Initialize.
    Main.application = application;
    Main.application.on('activate', Main.onActivate);
    Main.application.on('ready', Main.onReady);
    Main.application.on('window-all-closed', Main.onWindowAllClosed);
    Main.application.setName(AndrewsDesktop.AppName);

    // Wire IPC.
    // Unread inbox count changes.
    ipcMain.on('unread-count-changed', (e: IpcMainEvent, ...args: any[]): void => {

      // Get number of messages.
      const count: number = args[0] ? args[0] : 0;
      if (Main.andrewsApp) { Main.andrewsApp.setUnreadMessages(count); }

    });

    ipcMain.on('new-mail', (e: IpcMainEvent, ...args: any[]): void => {

      // Get number of messages.
      const count: number = args[0] ? args[0] : 0;
      if (Main.andrewsApp) { Main.andrewsApp.setUnreadMessages(count); }

    });

    // Andrews has been connected.
    ipcMain.on('andrews-initialized', (e: IpcMainEvent, ...args: any[]): void => {

      // Do some initial setup.
      const userEmail: string = args[0] ? args[0] : '<unknown>';
      if (Main.andrewsApp) { Main.andrewsApp.setUserEmail(userEmail); }

    });

  }

  /** The electron application, */
  private static application: App;

  /** The andrews application. */
  private static andrewsApp: AndrewsDesktop | null;

  /**
   * Factory method for the main window.
   *
   * @private
   * @static
   * @returns {BrowserWindow}
   * @memberof Main
   */
  private static createApp(): AndrewsDesktop {

    const mainApp = new AndrewsDesktop();
    mainApp.on('closed', Main.onClosed);
    // mainApp.openWindow();
    return mainApp;

  }

  /**
   * Handles the app's 'activate' event. Emitted when the application is activated (macOS only).
   *
   * @private
   * @static
   * @memberof Main
   */
  private static onActivate(): void {

    if (Main.andrewsApp == null) {
      Main.andrewsApp = Main.createApp();
    }

  }

  /**
   * Handles the window's 'close' event. Emitted when the window is going to be closed.
   *
   * @private
   * @static
   * @memberof Main
   */
  private static onClosed(): void {

    Main.andrewsApp = null;

  }

  /**
   * Handles the app's 'ready' event. Emitted when Electron has finished initializing.
   *
   * @private
   * @static
   * @memberof Main
   */
  private static onReady(): void {

    Main.andrewsApp = Main.createApp();

  }

  /**
   * Handles the app's 'window-all-closed' event. Emitted when all windows have been closed.
   *
   * @private
   * @static
   * @memberof Main
   */
  private static onWindowAllClosed(): void {

    // On macOS it is common for applications to stay open until the user explicitly quits.
    if (process.platform !== 'darwin') {
      Main.application.quit();
    }

  }

}
import { app, Menu, Tray } from 'electron'
import * as path from 'path'
import * as util from 'util'
/**
 * Application tray.
 */
export class ApplicationTray {
  /**
   * Creates an instance of ApplicationTray.
   *
   * @param {BrowserWindow} win The associated browser window.
   * @memberof ApplicationTray
   */
  constructor(win) {
    this.win = win
    this.trayIcon = new Tray(ApplicationTray.defaultTrayIcon)
    this.trayIcon.setTitle(app.getName())
    this.trayIcon.setToolTip(app.getName())
    this.trayIcon.setContextMenu(
      Menu.buildFromTemplate(ApplicationTray.createContextMenu(this.win))
    )
    // Events.
    this.trayIcon.on('click', () => ApplicationTray.toggleWindow(this.win))
  }
  /**
   * Creates, initializes and returns a tray context menu.
   *
   * @param win The browser window.
   */
  static createContextMenu(win) {
    const appNameAndVersion = util.format('%s %s', 'Andrews Admin', '1.0.0')
    return [
      {
        enabled: false,
        label: appNameAndVersion
      },
      { type: 'separator' },
      {
        click: () => {
          ApplicationTray.toggleWindow(win)
        },
        label: 'Toggle Window'
      },
      { role: 'quit' }
    ]
  }
  /**
   * Toggles specified window's visibility state.
   *
   * @param win The browser window.
   */
  static toggleWindow(win) {
    win.isVisible() ? win.hide() : win.show()
  }
  /**
   * Marks the tray icon having unread emails.
   *
   * @param {boolean} [isUnread] Whether there are unread emails.
   * @memberof ApplicationTray
   */
  markUnread(isUnread) {
    const hasUnreadMails = isUnread || false
    this.trayIcon.setImage(
      hasUnreadMails
        ? ApplicationTray.unreadTrayIcon
        : ApplicationTray.defaultTrayIcon
    )
  }
  /**
   * Sets the user's email address. Updates the tray icon's title.
   *
   * @param {string} userEmail The email address associated with current account.
   * @memberof ApplicationTray
   */
  setUserEmail(userEmail) {
    const trayTitle = util.format('%s | %s', userEmail, app.getName())
    this.trayIcon.setTitle(trayTitle)
    this.trayIcon.setToolTip(trayTitle)
  }
}
/**
 * The default tray icon image.
 *
 * @private
 * @static
 * @type {string}
 * @memberof ApplicationTray
 */
ApplicationTray.defaultTrayIcon = path.join(__static, 'icon.png')
/**
 * The tray icon image indicating unread mails.
 *
 * @private
 * @static
 * @type {string}
 * @memberof ApplicationTray
 */
ApplicationTray.unreadTrayIcon = path.join(__static, 'logo.png')

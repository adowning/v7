import { app, Menu, shell } from 'electron'
import * as util from 'util'
import { AndrewsDesktop } from './andrews-desktop'
import { ToastMessenger } from './toast-messenger'
/**
 * Application menu.
 *
 * @export
 * @class ApplicationMenu
 */
export class ApplicationMenu {
  constructor(andrewsApp) {
    this.andrewsApp = andrewsApp
    const mainWindow = andrewsApp.getMainWindow()
    this.messenger = new ToastMessenger(mainWindow.webContents)
    this.initialize(mainWindow)
  }
  /**
   * Applies the application menu to specified window.
   *
   * @static
   * @param {BrowserWindow} win The browser window instance.
   * @memberof MenuUtility
   */
  initialize(win) {
    const template = this.createTemplate()
    const menu = Menu.buildFromTemplate(template)
    win.setMenu(menu)
  }
  /**
   * Creates the menu template.
   *
   * @private
   * @returns {MenuItemConstructorOptions[]}
   * @memberof MenuUtility
   */

  createTemplate() {
    // Create a very basic menue.
    const appNameAndVersion = util.format('%s %s', 'Andrews Admin', '1.0.0')
    const homepage = 'http://ashdevtools.com'
    const isAutostartEnabled =
      !AndrewsDesktop.IsDevelopment &&
      this.andrewsApp.getConfig().get('autostart')
    const isNotificationsEnabled = this.andrewsApp
      .getConfig()
      .get('enableNotifications')
    const isStartingMinimized = this.andrewsApp
      .getConfig()
      .get('startMinimized')
    const messenger = this.messenger
    const template = [
      {
        label: 'File',
        submenu: [{ role: 'quit' }]
      },
      {
        label: 'Options',
        submenu: [
          {
            checked: isNotificationsEnabled,
            click: this.handleEnableNotificationsClick.bind(this),
            label: 'Enable Notifications',
            type: 'checkbox'
          },
          {
            checked: isAutostartEnabled,
            click: this.handleAutostartClick.bind(this),
            enabled: !AndrewsDesktop.IsDevelopment,
            label: 'Enable Autostart',
            type: 'checkbox'
          },
          {
            checked: isStartingMinimized,
            click: this.handleStartMinimizedClick.bind(this),
            label: 'Start minimized',
            type: 'checkbox'
          }
        ]
      },
      {
        label: 'Development',
        submenu: [
          {
            accelerator: 'CmdOrCtrl+R',
            click(item, focusedWindow) {
              if (focusedWindow) focusedWindow.reload()
            },
            label: 'Reload'
          },
          {
            accelerator: 'CmdOrCtrl+M',
            click(item, focusedWindow) {
              messenger.confirm('Foo bar.')
            },
            label: 'Confirmation Toast'
          },
          {
            accelerator: 'CmdOrCtrl+M',
            click(item, focusedWindow) {
              messenger.info('Foo bar.')
            },
            label: 'Information Toast'
          }
        ]
      },
      {
        label: 'Help',
        submenu: [
          {
            enabled: false,
            label: appNameAndVersion
          },
          { type: 'separator' },
          {
            accelerator: process.platform === 'darwin' ? 'Option+Cmd+I' : 'F12',
            click(item, focusedWindow) {
              focusedWindow.webContents.toggleDevTools()
            },
            label: 'Developer Tools'
          },
          {
            accelerator:
              process.platform === 'darwin' ? 'Option+Cmd+J' : 'Ctrl+F12',
            click(item, focusedWindow) {
              focusedWindow.webContents.send('open-wrapper-devtools')
            },
            label: 'Content Developer Tools'
          },
          {
            click(item, focusedWindow) {
              shell.openExternal(homepage)
            },
            label: 'Website'
          }
        ]
      }
    ]
    return template
  }
  /**
   * Handles the Options > Enable Autostart menu item click.
   *
   * @private
   * @param {MenuItem} item The source menu item.
   * @param {BrowserWindow} focusedWindow The currently focused window.
   * @memberof ApplicationMenu
   */
  handleAutostartClick(item, focusedWindow) {
    // @see https://electronjs.org/docs/api/app#appsetloginitemsettingssettings-macos-windows
    app.setLoginItemSettings({
      openAsHidden: false,
      openAtLogin: item.checked
    })
    // Update configuration.
    this.andrewsApp.getConfig().set('autostart', item.checked)
  }
  /**
   * Handles the Options > Enable Notifications menu item click.
   *
   * @private
   * @param {MenuItem} item The source menu item.
   * @param {BrowserWindow} focusedWindow The currently focused window.
   * @memberof ApplicationMenu
   */
  handleEnableNotificationsClick(item, focusedWindow) {
    // Update configuration.
    this.andrewsApp.getConfig().set('enableNotifications', item.checked)
  }
  /**
   * Handles the Options > Enable Autostart menu item click.
   *
   * @private
   * @param {MenuItem} item The source menu item.
   * @param {BrowserWindow} focusedWindow The currently focused window.
   * @memberof ApplicationMenu
   */
  handleStartMinimizedClick(item, focusedWindow) {
    // Update configuration.
    this.andrewsApp.getConfig().set('startMinimized', item.checked)
  }
}

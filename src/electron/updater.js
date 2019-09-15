import { autoUpdater } from 'electron-updater'
import * as path from 'path'
import { Log } from './log'
// Attach logger.
const logger = Log.getLogger('updater')
autoUpdater.logger = logger
if (process.env.NODE_ENV !== 'production') {
  autoUpdater.updateConfigPath = path.join(
    __dirname,
    '..',
    'dev-app-update.yml'
  )
}
/**
 * Auto updater class.
 *
 * @export
 * @class Updater
 */
export class Updater {
  /**
   * Creates an instance of Updater.
   * @memberof Updater
   */
  constructor(messenger) {
    // Initialize.
    this.autoUpdater = autoUpdater
    this.messenger = messenger
    // Wire events.
    // @see https://www.electron.build/auto-update
    console.log('asdf')
    this.autoUpdater.on('checking-for-update', (e, i) => {
      this.messenger.info('Checking for update.')
    })
    this.autoUpdater.on('download-progress', (e, i) => {
      // tslint:disable-next-line:no-console
      console.log('autoUpdater: download-progress: ', e, i)
    })
    this.autoUpdater.on('update-available', (e, i) => {
      // tslint:disable-next-line:no-console
      console.log('autoUpdater: update-available: ', e, i)
      this.messenger.info(
        'A new version is available. Downloading in background.'
      )
    })
    this.autoUpdater.on('update-not-available', (e, i) => {
      // tslint:disable-next-line:no-console
      console.log('autoUpdater: update-not-available: ', e, i)
      this.messenger.info('Your application is up to date.')
    })
    this.autoUpdater.on('update-downloaded', (e, i) => {
      this.messenger.info('An update was downloaded.')
      this.quitAndInstall()
    })
  }
  /**
   * Checks for updates.
   *
   * @memberof Updater
   */
  check() {
    this.autoUpdater.checkForUpdates()
  }
  /**
   * Quits the application and installs the update.
   *
   * @private
   * @memberof Updater
   */
  quitAndInstall() {
    setTimeout(() => {
      this.autoUpdater.quitAndInstall()
    }, 5000)
  }
}

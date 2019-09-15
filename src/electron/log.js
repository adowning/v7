import { app } from 'electron'
import { configure, getLogger } from 'log4js'
import * as path from 'path'
/**
 * Application logger.
 *
 * @export
 * @class Logger
 * @see https://github.com/log4js-node/log4js-node
 */
export class Log {
  /**
   * Logs a debug message.
   *
   * @static
   * @param {string} message The message
   * @param {...any[]} params The message parameters.
   * @memberof Logger
   */
  static debug(message, ...params) {
    Log.getLogger().debug(message, ...params)
  }
  /**
   * Logs an error message.
   *
   * @static
   * @param {string} message The message
   * @param {...any[]} params The message parameters.
   * @memberof Logger
   */
  static error(message, ...params) {
    Log.getLogger().error(message, ...params)
  }
  /**
   * Logs an information message.
   *
   * @static
   * @param {string} message The message
   * @param {...any[]} params The message parameters.
   * @memberof Logger
   */
  static info(message, ...params) {
    Log.getLogger().info(message, ...params)
  }
  /**
   * Logs a warning message.
   *
   * @static
   * @param {string} message The message
   * @param {...any[]} params The message parameters.
   * @memberof Logger
   */
  static warn(message, ...params) {
    Log.getLogger().warn(message, ...params)
  }
  /**
   * Static ctor.
   *
   * @static
   * @memberof Logger
   * @see https://github.com/Microsoft/TypeScript/issues/265#issuecomment-50255298
   */
  static initialize() {
    // Stop here if already invoked.
    if (Log.isInitialized) return
    Log.isInitialized = true
    // Configure logger.
    const userPath = app.getPath('userData')
    const defaultFilePath = path.resolve(userPath, 'andrews-desktop.log')
    const updaterFilePath = path.resolve(userPath, 'andrews-desktop-update.log')
    configure({
      appenders: {
        defaultConsole: { type: 'console' },
        defaultFile: {
          backups: 2,
          compress: true,
          filename: defaultFilePath,
          maxLogSize: 1048576,
          type: 'file'
        },
        uppdateFile: {
          backups: 1,
          compress: true,
          filename: updaterFilePath,
          maxLogSize: 1048576,
          type: 'file'
        }
      },
      categories: {
        default: {
          appenders: ['defaultFile', 'defaultConsole'],
          level: 'info'
        },
        updater: { appenders: ['uppdateFile', 'defaultConsole'], level: 'info' }
      }
    })
  }
  /**
   * Gets the wrapped logger instance.
   *
   * @static
   * @returns {log4js.Logger}
   * @memberof Log
   */
  static getLogger(category) {
    return getLogger(category)
  }
}
/** Whether this class is already initialized. */
Log.isInitialized = false
// Initialilize logging.
Log.initialize()

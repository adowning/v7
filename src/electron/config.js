import ElectronStore from 'electron-store'
/**
 * Application configuration.
 *
 * @export
 * @class Config
 */
export class Config {
  /**
   * Creates an instance of Config.
   * @memberof Config
   */
  constructor() {
    /** Name of the storage file (without extension). */
    this.storeFileName = 'andrews-desktop-config'
    // Initialize store.
    this.store = new ElectronStore({
      defaults: Config.defaultOptions,
      name: this.storeFileName
    })
  }
  /**
   * Updates specified config with last used window dimensions.
   *
   * @param {BrowserWindowConstructorOptions} config The window configuration.
   * @memberof Config
   */
  addMainWindowConfiguration(config) {
    config.height = this.get('window.height')
    config.width = this.get('window.width')
    // config.show = !this.get('startMinimized');
  }
  /**
   * Gets the value stored for specified key.
   *
   * @param {string} key The desired value's key.
   * @returns {*} The value stored for specified key.
   * @memberof Config
   */
  get(key) {
    return this.store.get(key)
  }
  /**
   * Sets specified key / value pair.
   *
   * @param {string} key The key.
   * @param {*} value The value.
   * @returns {Config} This instance.
   * @memberof Config
   */
  set(key, value) {
    this.store.set(key, value)
    return this
  }
  /**
   * Gets a value indicating whether notifications are enabled.
   *
   * @returns {boolean} True if the application should notify.
   * @memberof Config
   */
  getIsNotificationsEnabled() {
    return this.get('enableNotifications')
  }
  /**
   * Stores the main window's bounds.
   *
   * @param {Rectangle} bounds The window bounds.
   * @returns {Config} This instance.
   * @memberof Config
   */
  setWindowBounds(bounds) {
    return this.set('window.height', bounds.height).set(
      'window.width',
      bounds.width
    )
  }
}
/** Default options object. */
Config.defaultOptions = {
  autostart: false,
  enableNotifications: false,
  startMinimized: false,
  window: {
    height: 600,
    width: 800
  }
}

import { app } from 'electron'
import is from 'electron-is'
import Store from 'electron-store'
import { getLogPath, getSessionPath, getUserDownloadsPath } from '../utils/index'

export default class ConfigManager {
	public userConfig;
	public systemConfig;

	constructor() {
		this.systemConfig = {}
		this.userConfig = {}

		this.init()
	}

	init() {
		this.initSystemConfig()
		this.initUserConfig()
	}

	initSystemConfig() {
		this.systemConfig = new Store({
			name: 'system',
			defaults: {
				'all-proxy': '',
				username: '',
				password: '',
				'allow-overwrite': true,
				'auto-file-renaming': true,
				dir: getUserDownloadsPath(),
				'rpc-listen-port': 16800,
				'rpc-secret': '',
			},
		})
	}

	initUserConfig() {
		this.userConfig = new Store({
			name: 'user',
			// Schema need electron-store upgrade to 3.x.x,
			// but it will cause the application build to fail.
			// schema: {
			//   theme: {
			//     type: 'string',
			//     enum: ['auto', 'light', 'dark']
			//   }
			// },
			defaults: {
				'all-proxy-backup': '',
				username: '',
				password: '',
				last_page: '',
				'auto-check-update': is.macOS(),
				'hide-app-menu': is.windows() || is.linux(),
				'last-check-update-time': 0,
				locale: app.getLocale(),
				'log-path': getLogPath(),
				'new-task-show-downloading': true,
				'open-at-login': false,
				'resume-all-when-app-launched': false,
				'keep-window-state': false,
				'session-path': getSessionPath(),
				'task-notification': true,
				theme: 'auto',
				'update-channel': 'latest',
				'use-proxy': false,
				'window-state': {},
			},
		})
		this.fixUserConfig()
	}

	fixUserConfig() {
		// Fix the value of open-at-login when the user delete
		// the Motrix self-starting item through startup management.
		const openAtLogin = app.getLoginItemSettings().openAtLogin
		if (this.getUserConfig('open-at-login', null) !== openAtLogin) {
			this.setUserConfig('open-at-login', openAtLogin)
		}
	}

	getSystemConfig(key, defaultValue) {
		if (typeof key === 'undefined' && typeof defaultValue === 'undefined') {
			return this.systemConfig.store
		}

		return this.systemConfig.get(key, defaultValue)
	}

	getUserConfig(key, defaultValue) {
		if (typeof key === 'undefined' && typeof defaultValue === 'undefined') {
			return this.userConfig.store
		}

		return this.userConfig.get(key, defaultValue)
	}

	getLocale() {
		return this.getUserConfig('locale', null) || app.getLocale()
	}

	setSystemConfig(...args) {
		this.systemConfig.set(...args)
	}

	setUserConfig(...args) {
		this.userConfig.set(...args)
	}

	reset() {
		this.systemConfig.clear()
		this.userConfig.clear()
	}
}

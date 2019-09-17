import { EventEmitter } from 'events'
import { app, session } from 'electron'
import is from 'electron-is'

import ExceptionHandler from './core/ExceptionHandler'
import logger from './core/Logger'
import Application from './Application'
import { splitArgv, parseArgvAsUrl, parseArgvAsFile } from './utils'
const path = require('path')
const global: any = this;

// global.application; 

const EMPTY_STRING = ''

export default class Launcher extends EventEmitter {
    public  url: string = ''
    public  file: string = ''
    public  openedAtLogin: boolean;
	public exceptionHandler;
	

    constructor() {
		super()
		this.url = EMPTY_STRING
		this.file = EMPTY_STRING

		this.makeSingleInstance(() => {
			this.init()
		})
	}

	makeSingleInstance(callback) {
		// Mac App Store Sandboxed App not support requestSingleInstanceLock
		// if (is.mas()) {
		// 	callback()
		// 	return
		// }

		const gotSingleLock = app.requestSingleInstanceLock()

		if (!gotSingleLock) {
			app.quit()
		} else {
			app.on('second-instance', (event, argv, workingDirectory) => {
				logger.warn('second-instance====>', argv, workingDirectory)
            global.
                global.application.showPage('index')
				if (!is.macOS() && argv.length > 1) {
					this.handleAppLaunchArgv(argv)
				}
			})

			callback()
		}
	}

	init() {
		this.exceptionHandler = new ExceptionHandler(null)

		this.openedAtLogin = is.macOS() ? app.getLoginItemSettings().wasOpenedAtLogin : false

		if (process.argv.length > 1) {
			this.handleAppLaunchArgv(process.argv)
		}

		logger.warn('openedAtLogin===>', this.openedAtLogin)

		this.handleAppEvents()
	}

	handleAppEvents() {
		this.handleOpenUrl()
		this.handleOpenFile()

		this.handelAppReady()
		this.handleAppWillQuit()
	}

	/**
	 * handleOpenUrl
	 * Event 'open-url' macOS only
	 * "name": "Motrix Protocol",
	 * "schemes": ["mo", "motrix"]
	 */
	handleOpenUrl() {
		if (is.mas() || !is.macOS()) {
			return
		}
		app.on('open-url', (event, url) => {
			logger.info(`[Motrix] open-url: ${url}`)
			event.preventDefault()
			this.url = url
			// this.sendUrlToApplication()
		})
	}

	/**
	 * handleOpenFile
	 * Event 'open-file' macOS only
	 * handle open torrent file
	 */
	handleOpenFile() {
		if (!is.macOS()) {
			return
		}
		app.on('open-file', (event, path) => {
			logger.info(`[Motrix] open-file: ${path}`)
			event.preventDefault()
			this.file = path
			this.sendFileToApplication()
		})
	}

	/**
	 * handleAppLaunchArgv
	 * For Windows, Linux
	 * @param {array} argv
	 */
	handleAppLaunchArgv(argv) {
		logger.info('handleAppLaunchArgv===>', argv)

		// args: array, extra: map
		const { args, extra } = splitArgv(argv)
		logger.info('splitArgv.args===>', args)
		logger.info('splitArgv.extra===>', extra)
		if (extra['--opened-at-login'] === '1') {
			this.openedAtLogin = true
		}

		const file = parseArgvAsFile(args)
		if (file) {
			this.file = file
			this.sendFileToApplication()
		}

		const url: string = parseArgvAsUrl(args)
		if (url) {
			this.url = url
			this.sendUrlToApplication()
		}
	}

	sendUrlToApplication() {
		this.url = EMPTY_STRING
		// if (this.url && global.application && global.application.isReady) {
		// 	if (this.url.startsWith('tel')) {
		// 		global.application.handleProtocolTel(this.url)
		// 	} else {
		// 		global.application.handleProtocol(this.url)
		// 	}

		// 	this.url = EMPTY_STRING
		// }
	}

	sendFileToApplication() {
		// if (this.file && global.application && global.application.isReady) {
			console.log(this.file)
			// global.application.handleFile(this.file)
			this.file = EMPTY_STRING
		// }
	}

	handelAppReady() {
		app.on('ready', () => {
			const partition = 'persist:example'
			const ses = session.fromPartition(partition)
			global.application = new Application({ partion: partition })
			const { openedAtLogin } = this
			global.application.start('index', {
				openedAtLogin,
			})

			global.application.on('ready', () => {
				// ses.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
				// 	details.requestHeaders['User-Agent'] = 'SuperDuperAgent'
				// 	callback({ cancel: false, requestHeaders: details.requestHeaders })
				// })
				// ses.protocol.registerHttpProtocol(
				// 	'tel',
				// 	(request, callback) => {
				// 		const url = request.url.substr(7)
				// 		// callback({ path: path.normalize(`${__dirname}/${url}`) })
				// 	},
				// 	error => {
				// 		if (error) console.error('Failed to register protocol')
				// 	},
				// )

				// this.sendUrlToApplication()

				this.sendFileToApplication()
			})
		})

		app.on('activate', () => {
			if (global.application) {
				logger.info('[Andrews] activate')
				global.application.showPage('index')
			}
		})
	}

	handleAppWillQuit() {
		app.on('will-quit', () => {
			logger.info('[Motrix] will-quit')
			if (global.application) {
				global.application.stop()
			}
		})
	}
}
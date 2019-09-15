 
 
import './electron'
// import { app } from 'electron'
// import Launcher from './main/Launcher'
// // Prepare the application.
// Main.main(app)
// import { app } from 'electron'
// import is from 'electron-is'

// import Launcher from './main/Launcher'
// // const global: any = this;

// if (process.env.NODE_ENV !== 'development') {
//   // global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
// }

// /**
//  * Fix Windows notification func
//  * appId defined in .electron-vue/webpack.main.config.js
//  */
// if (is.windows()) {
//   app.setAppUserModelId('andrewsapp')
// }

// const launcher = new Launcher()
// global.launcher = new Launcher()

// 'use strict'

// import { app, protocol, BrowserWindow } from 'electron'
// import {
//   createProtocol,
//   installVueDevtools
// } from 'vue-cli-plugin-electron-builder/lib'
// const isDevelopment = process.env.NODE_ENV !== 'production'
// import { autoUpdater } from "electron-updater";

// // Keep a global reference of the window object, if you don't, the window will
// // be closed automatically when the JavaScript object is garbage collected.
// let win: BrowserWindow | null

// // Scheme must be registered before the app is ready
// protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])

// function createWindow () {
//   // Create the browser window.
//   win = new BrowserWindow({ width: 800, height: 600, webPreferences: {
//     nodeIntegration: true
//   } })

//   if (process.env.WEBPACK_DEV_SERVER_URL) {
//     // Load the url of the dev server if in development mode
//     win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
//     if (!process.env.IS_TEST) win.webContents.openDevTools()
//   } else {
//     autoUpdater.checkForUpdates();

//     createProtocol('app')
//     // Load the index.html when not in development
//     win.loadURL('app://./index.html')
//   }

//   win.on('closed', () => {
//     win = null
//   })
// }

// // Quit when all windows are closed.
// app.on('window-all-closed', () => {
//   // On macOS it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('activate', () => {
//   // On macOS it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (win === null) {
//     createWindow()
//   }
// })

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', async () => {
//   if (isDevelopment && !process.env.IS_TEST) {
//     // Install Vue Devtools
//     // Devtools extensions are broken in Electron 6.0.0 and greater
//     // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
//     // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
//     // If you are not using Windows 10 dark mode, you may uncomment these lines
//     // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
//     // try {
//     //   await installVueDevtools()
//     // } catch (e) {
//     //   console.error('Vue Devtools failed to install:', e.toString())
//     // }

//   }
//   createWindow()
// })

// // Exit cleanly on request from parent process in development mode.
// if (isDevelopment) {
//   if (process.platform === 'win32') {
//     process.on('message', data => {
//       if (data === 'graceful-exit') {
//         app.quit()
//       }
//     })
//   } else {
//     process.on('SIGTERM', () => {
//       app.quit()
//     })
//   }
// }
// //向主窗口发送文本
// function sendStatusToWindow(text) {
//   console.log(text);
//   win.webContents.send("message", text);
// }
// autoUpdater.on("checking-for-update", () => {
//   sendStatusToWindow("Checking for update...");
// });
// autoUpdater.on("update-available", (ev, info) => {
//   sendStatusToWindow("Update available.");
// });
// autoUpdater.on("update-not-available", (ev, info) => {
//   sendStatusToWindow("Update not available.");
// });
// autoUpdater.on("error", (ev, err) => {
//   sendStatusToWindow("Error in auto-updater.");
// });
// autoUpdater.on("download-progress", (ev, progressObj) => {
//   sendStatusToWindow("Download progress...");
// });

// autoUpdater.on("update-downloaded", (ev, info) => {
//   // Wait 5 seconds, then quit and install
//   // In your application, you don't need to wait 5 seconds.
//   // You could call autoUpdater.quitAndInstall(); immediately
//   sendStatusToWindow("Update downloaded; will install in 5 seconds");
//   setTimeout(function() {
//     autoUpdater.quitAndInstall();
//   }, 5000);
// });
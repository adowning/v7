/**
 * Wraps the main window's webContents and sends messages to be displayed in the snackbar.
 *
 * @export
 * @class SnackbarMessenger
 */
export class ToastMessenger {
  constructor(target) {
    this.target = target
  }
  confirm(message, title) {
    this.sendMessage('confirm', message, title)
  }
  info(message, title) {
    this.sendMessage('info', message, title)
  }
  sendMessage(type, message, title) {
    this.target.send('toast-message', { type, message, title })
  }
}

import { app, Notification } from 'electron'
import * as path from 'path'
import * as util from 'util'
/**
 * Notification handling.
 *
 * @export
 * @class Notifier
 */
export class Notifier {
  /**
   * Creates and shows a notification.
   *
   * @static
   * @param {string} message The notification message.
   * @param {string} [icon] The notification icon.
   * @returns {void}
   * @memberof Notifier
   */
  static notify(message, icon) {
    // Skip if notifications aren't supported.
    if (!Notifier.isSupported) {
      return
    }
    const n = new Notification({
      body: message,
      icon: icon || Notifier.defaultMessageIcon,
      title: app.getName()
    })
    n.show()
  }
  /**
   * Creates and shows a notifications about unread messages.
   *
   * @static
   * @param {number} count The number of unread messages.
   * @returns {void}
   * @memberof Notifier
   */
  notifyUnread(count) {
    // No message if
    // - there is nothing unread
    if (count <= 0) {
      return
    }
    // Prepare message and go.
    const message = util.format(
      count > 1 ? '%d unread messages.' : '%d unread message.',
      count
    )
    const icon = Notifier.unreadMessagesIcon
    Notifier.notify(message, icon)
  }
}
Notifier.isSupported = Notification.isSupported()
Notifier.defaultMessageIcon = path.join(
  __static,
  'notification-icon-default.png'
)
Notifier.unreadMessagesIcon = path.join(
  __static,
  'notification-icon-unread.png'
)

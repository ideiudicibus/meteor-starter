/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const notificationClass = function() {
  if (!this.read) { return 'unread-notification'; } else { return ''; }
};

const readNotification = function() {
  return Notifications.read(this._id);
};

Template.notificationsDropdown.helpers({
  notificationClass,
  dropdownIcon() {
    if (this.icon) { return this.icon; } else { return 'bell'; }
  },
  dropdownIconEmpty() {
    if (this.iconEmpty) { return this.iconEmpty; } else { return 'bell-o'; }
  },
  hasNotifications() {
    return Notifications.find().count() > 0;
  }
});

Template.notificationsDropdown.events({
  'click .notification': readNotification});

Template.notifications.helpers({
  notificationClass,
  ago() {
    return moment(this.date).fromNow();
  }
});

Template.notifications.events({
  'click .notification': readNotification});

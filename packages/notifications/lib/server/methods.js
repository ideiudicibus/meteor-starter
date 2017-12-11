/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Meteor.methods({
  readAllNotifications() {
    return Notifications.update({read: false}, {$set: {read: true}}, {multi: true});
  }});

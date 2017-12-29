/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Meteor.publish('notificationsByUser', function() {
  return Notifications.find({owner: Meteor.userId()});
});

Meteor.publish('notifications', function() {
  return Notifications.find({});
});


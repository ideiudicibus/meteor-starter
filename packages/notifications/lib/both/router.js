/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Router.map(function() {
  this.route('notifications', {
    path: '/notifications',
    waitOn() {
      return [
        Meteor.subscribe('notifications')
      ];
    }
  });
  return this.route('messages', {
    path: '/messages/:_id',
    layout: 'notifications'
  }
  );
});

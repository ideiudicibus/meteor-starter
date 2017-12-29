/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Deps.autorun(function(){

    Meteor.subscribe('notifications');
    Meteor.subscribe('notificationsByUser');

});

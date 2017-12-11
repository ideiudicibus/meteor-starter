/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// You'll want to replace these functions. They publish the whole
// collection which is problematic after your app grows

Meteor.publish('posts', () => Posts.find());

Meteor.publish('attachments', () => Attachments.find());
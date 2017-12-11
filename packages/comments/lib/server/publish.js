/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Meteor.publish('comments', () => Comments.find());

Meteor.publish('commentsByDoc', _id => Comments.find({doc: _id}));

Meteor.publish('commentsByUser', _id => Favorites.find({owner: _id}));
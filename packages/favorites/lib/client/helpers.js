/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Template.registerHelper('favoritesByDoc', _id=> Favorites.find({doc: _id}));

Template.registerHelper('myFavorites', () => Favorites.find({owner: Meteor.userId()}));
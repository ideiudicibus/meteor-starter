/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Template.favoriteButton.helpers({
	isFavorite(_id) {
		return Favorites.findOne({
			doc: _id,
			owner: Meteor.userId()
		});
	}
});

Template.favoriteButtonNotFavorited.events({
	'click .js-favorite-button'(e,t) {
		return Favorites.insert({
			doc: $(e.currentTarget).attr('doc'),
			owner: Meteor.userId()
		});
	}
});

Template.favoriteButtonFavorited.events({
	'click .js-favorite-button'(e,t) {
		const favorite = Favorites.findOne({
			owner: Meteor.userId(),
			doc: $(e.currentTarget).attr('doc')
		});
		return Favorites.remove({
			_id: favorite._id});
	}
});
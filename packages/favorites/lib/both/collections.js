/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
this.Favorites = new Meteor.Collection('favorites');

const FavoritesSchemas = new SimpleSchema({
	doc: {
		type:String,
		regEx: SimpleSchema.RegEx.Id
	},

	owner: {
		type: String,
		autoValue() {
			if (this.isInsert) {
				return Meteor.userId();
			}
		}
	},

	createdAt: { 
		type: Date,
		autoValue() {
			if (this.isInsert) {
				return new Date();
			}
		}
	}
});

Favorites.attachSchema(FavoritesSchemas);
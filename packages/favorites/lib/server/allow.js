/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Favorites.allow({
	insert(userId, doc) {
		return doc.owner === userId;
	},
	remove(userId, doc) {
		return doc.owner === userId;
	}
});
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Meteor.methods({
	deleteAccount(userId) {
		if (this.userId === userId) {
			return Meteor.users.remove({_id: this.userId});
		}
	}
});
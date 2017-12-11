/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
AutoForm.hooks({
	updateProfile: {
		onSuccess(operation, result, template) {
			return sAlert.success('Profile updated');
		},
		onError(operation, error, template) {
			return sAlert.error(error);
		}
	},

	updatePicture: {
		onSuccess(operation, result, template) {
			return sAlert.success('Picture Updated');
		},
		onError(operation, error, template) {
			return sAlert.error(error);
		}
	}
});

// Autoupdate form
// Autoform's autosave="true" wasn't working
Template.profile.events({
	'change form#updatePicture input'(e,t) {
		return Meteor.setTimeout(() => $('form#updatePicture').submit()
		, 10);
	}
});
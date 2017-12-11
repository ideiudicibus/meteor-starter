/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
AutoForm.hooks({updatePassword: {
	onSubmit(insertDoc, updateDoc, currentDoc){
		if (insertDoc.new !== insertDoc.confirm) {
			sAlert.error('Passwords do not match');
			return false;
		}
		Accounts.changePassword(insertDoc.old, insertDoc.new, function(e){
			$('.btn-primary').attr('disabled',null);
			if (e) {
				return sAlert.error(e.message);
			} else {
				return sAlert.success('Password Updated');
			}
		});

		return false;
	}
}
});

Template.account.events({
	'click .js-delete-account'() {
		return Meteor.call('deleteAccount', Meteor.userId());
	}
});

Template.setUserName.helpers({
	user() {
		return Meteor.user();
	}
});
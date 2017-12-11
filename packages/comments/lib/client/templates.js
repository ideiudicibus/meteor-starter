/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Template.commentFormToggle.events({
	'click .btn-comment'(e,t) {
		return Session.set('commentingOn', $(e.currentTarget).attr('doc'));
	},
	'click .btn-cancel-comment'(e,t){
		return Session.set('commentingOn', null);
	}
});

Template.commentFormToggle.destroyed = () => Session.set('commentingOn', null);

AutoForm.hooks({commentForm: {

	onSuccess(operation, result, template) {
		return Session.set('commentingOn', null);
	}
}
});
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const getUserInitial = function(user){
	if (!user) {
		return '<i class="fa fa-user"></i>';
	} else {
		if (user.username) {
			return user.username.charAt(0).toUpperCase();
		} else if (user.profile && user.profile.firstName) {
			return user.profile.firstName.charAt(0).toUpperCase();
		} else if (user.emails[0].address) {
			return user.emails[0].address.charAt(0).toUpperCase();
		} else {
			return '<i class="fa fa-user"></i>';
		}
	}
};

const getUserColor = function(_id){
	if (_id) {
		const index = _id.charCodeAt(0) - 48;
		return UserHelpers.colorPalette[index];
	}
};

Template.profileThumb.helpers({
	profileThumbInitial(_id) {
		if (typeof Meteor.users !== 'undefined') {
			const user = Meteor.users.findOne({_id});
			const html = getUserInitial(user);
			return {
				html,
				color: 'white',
				backgroundColor: getUserColor(_id)
			};
		}
	}});
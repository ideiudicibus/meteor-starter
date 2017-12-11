/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Template.registerHelper('niceName', function(_id){
	let user;
	if (_id) {
		user = Meteor.users.findOne(_id);
	}

	if (user) {
		if (user.username) {
			return user.username;
		} else if ((typeof user.profile !== 'undefined') && user.profile.firstName) {
			return user.profile.firstName;
		} else if (user.emails[0].address) {
			return user.emails[0].address;
		} else {
			return 'A user';
		}
	}
});

Template.registerHelper('niceUsername', function(_id) {
	let user;
	if (_id) {
		user =Meteor.users.findOne(_id);
	}
	if (user) {
		return JSON.stringify(user);
	}
});

Template.registerHelper('profileThumbSrc', function(_id) {
	if (typeof Meteor.users !== 'undefined') {
		if (Meteor.users.findOne(_id)) {
			const user = Meteor.users.findOne({_id});
			if ((typeof user.profile !== 'undefined') && (typeof user.profile.picture !== 'undefined')) {
				let { picture } = user.profile;

				if (picture.indexOf('/') > -1) {
					return picture;
				} else {
					if ((typeof ProfilePictures !== 'undefined') && ProfilePictures.findOne(user.profile.picture)) {
						picture = ProfilePictures.findOne(picture);
						return picture.url({store: 'thumbs'});
					}
				}
			}
		}
	}
});

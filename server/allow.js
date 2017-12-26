/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
ProfilePictures.allow({
	insert(userId, doc) {
		return true;
	},
	update(userId, doc, fieldNames, modifier) {
		return true;
	},
	download(userId){
		return true;
	}
});

Posts.allow({
	insert(userId, doc) {
		return userId === doc.owner;
	},
	update(userId, doc, fields, modifier) {
		return userId === doc.owner;
	},
	remove(userId, doc) {
		return userId === doc.owner;
	}
});

Attachments.allow({
	insert(userId, doc) {
		return true;
	},
	update(userId, doc, fieldNames, modifier) {
		return true;
	},
	download(userId){
		return true;
	}
});

Meteor.users.allow({
	update(userId, doc, fieldNames, modifier) {
		if ((userId === doc._id) && !doc.username && (fieldNames.length === 1) && (fieldNames[0] === 'username')) {
			return true;
		} else {
			return false;
		}
	}
});



Players.allow({
	insert: function(userId, doc) {
	  return userId === doc.owner;
	},
	update: function(userId, doc, fields, modifier) {
	  return userId === doc.owner;
	},
	remove: function(userId, doc) {
	  return userId === doc.owner;
	}
  });
  
  
  Orders.allow({
	insert: function(userId, doc) {
	  return userId === doc.issuer;
	},
	update: function(userId, doc, fields, modifier) {
	  return userId === doc.issuer;
	},
	remove: function(userId, doc) {
	  return userId === doc.issuer;
	}
  });
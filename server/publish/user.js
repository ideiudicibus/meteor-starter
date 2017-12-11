/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Meteor.publishComposite('user', function() {
  return {
    find() {
      return Meteor.users.find({_id: this.userId});
    },
    children: [{
      find(user) {
        const _id = (user.profile != null ? user.profile.picture : undefined) || null;
        return ProfilePictures.find({_id});
      }
    }
      ]
  };
});

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Comments.helpers({
  docTitle() {
    return __guard__(Posts.findOne(this.doc), x => x.title);
  },
  author() {
    const user = Meteor.users.findOne(this.owner);
    if ((__guard__(user != null ? user.profile : undefined, x => x.firstName) != null) && __guard__(user != null ? user.profile : undefined, x1 => x1.lastName)) {
      return user.profile.firstName + ' ' + user.profile.lastName;
    } else {
      return __guard__(user != null ? user.emails : undefined, x2 => x2[0].address);
    }
  }
});

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
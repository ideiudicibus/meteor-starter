/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

Router.route("profile",
  { path: "/profile" });

Router.route("account",
  { path: "/account" });

Router.route("setUserName", {
  path: "/setUserName",
  onBeforeAction() {
    if (!Config.username || (Meteor.userId() && Meteor.user().username)) {
      this.redirect('/dashboard');
    }
    return this.next();
  }
}
);

Router.route('signOut', {
  path: '/sign-out',
  onBeforeAction() {
    Meteor.logout(function () { });
    this.redirect('/');
    return this.next();
  }
}
);

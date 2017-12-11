/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

Router.route("home", {
  path: "/",
  layoutTemplate: "homeLayout"
}
);

Router.route("dashboard", {
  path: "/dashboard",
  waitOn() {
    return [
      subs.subscribe('posts'),
      subs.subscribe('comments'),
      subs.subscribe('attachments')
    ];
  },
  data() {
    return { posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch() };
  }
}
);

Router.route("verificationConsoleHome",{
layoutTemplate: "verificationConsoleLayout",
path:"/verificationConsole/home/"
});

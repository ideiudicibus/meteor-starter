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

Router.route("postDashboard", {
  path: "/posts-dashboard",
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

Router.route("singlePost",{
path:"/post/:_id",
waitOn() {
  return [
    subs.subscribe('posts'),
    subs.subscribe('comments'),
    subs.subscribe('attachments')
  ];
},
data() {
  return { post: Posts.findOne({_id:this.params._id}) };
}

})


Router.route(this.Config.createAdminBackdoorUrl, function(){
  let self = this;
  Meteor.call("createAdminBackdoor", function(error, result){  
      self.redirect('/profile');
  });
 
});

this.subs = new SubsManager();

Router.configure({
  layoutTemplate: "masterLayout",
  loadingTemplate: "loading",
  notFoundTemplate: "notFound",
  routeControllerNameConverter: "camelCase",

  onBeforeAction() {
  	// Redirect to set username if required
    if (Config.username && Meteor.userId() && !Meteor.user().username) {
      this.redirect('/setUserName');
    }
    return this.next();
  }
});

Router.waitOn(() => subs.subscribe('user'));

const onAfterAction = function() {
  if (Meteor.isClient) {
    window.scrollTo(0,0);

    // Remove modal
    const $bd =  $('.modal-backdrop');
    $bd.removeClass('in');
    return setTimeout(() => $bd.remove()
    , 300);
  }
};

Router.onAfterAction(onAfterAction);

//To allow non-logged in users to access more routes, add it in the _config.coffee file
const publicRoutes = _.union(Config.publicRoutes || [], [
  'home',
  'atSignIn',
  'atSignUp',
  'atForgotPassword',
  'atSignOut'
]);

Router.plugin('ensureSignedIn', {except: publicRoutes});


Router.waitOn((function () {
  Meteor.subscribe('clubs');
  Meteor.subscribe('transfers');
  Meteor.subscribe('players');
  Meteor.subscribe('posts');
}), {
    only: ['adminDashboard',
      'adminDashboardPricesHistoryView',
      'adminDashboardPricesHistoryNew',
      'adminDashboardPricesHistoryEdit',
      'adminDashboardOrdersView',
      'adminDashboardOrdersNew',
      'adminDashboardOrdersEdit',
      'adminDashboardPostsView',
      'adminDashboardPostsNew',
      'adminDashboardPostsEdit',
      'adminDashboardPlayersNew',
      'adminDashboardPlayersEdit',
      'adminDashboardTransfers',
      'adminDashboardTransfersNew',
      'adminDashboardTransfersView',
      'adminDashboardTransfersEdit',
      'adminDashboardPlayerStats',
      'adminDashboardPlayerStatsNew',
      'adminDashboardPlayerStatsView',
      'adminDashboardPlayerStatsEdit']
  });
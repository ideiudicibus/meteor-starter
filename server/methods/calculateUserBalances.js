Meteor.methods({
  /*
    'calculateUserBalancesFromLastOrder':function(){
      

      try{
        let order= Orders.find({}, { sort: { createdAt: -1 } }).fetch()[0];
        let currentValorization = (0.1 * (order.price));
        let ratio = Orders.find({ ticker: order.ticker, _id: { $ne: order._id } }).count();
    
        let nextPrize = 0.0;
        let increment = 0.0;
        
        if (ratio == 0) {
          increment = 0.0;
          nextPrize = order.price;
    
          UserPlayerBalances.insert({ owner: order.issuer, ticker: order.ticker, prize: nextPrize, lastPrize: order.price });
        }
        else {
          increment = currentValorization / ratio;
          let updated = UserPlayerBalances.update({ ticker: order.ticker }, { $inc: { prize: increment } }, { multi: true });
          nextPrize = order.price - currentValorization;
          UserPlayerBalances.insert({ owner: order.issuer, ticker: order.ticker, prize: nextPrize, lastPrize: order.price });
    
        }
        
       
      }
      catch(e){
        console.log(e); 
        throw new Meteor.Error(JSON.stringify(e), " can't update the user balance");

      }
      return true;

    },*/

    'calculateUserBalances':function(order){
        try{
        var currentValorization = (0.1 * (order.price));
        
        var ratio = Orders.find({ ticker: order.ticker, _id: { $ne: order._id },issuer:{$ne:order.issuer} }).count();
    
        var nextPrize = 0.0;
        var increment = 0.0;
        
        if (ratio == 0) {
          increment = 0.0;
          nextPrize = order.price;
    
          UserPlayerBalances.insert({ owner: order.issuer, ticker: order.ticker, prize: nextPrize, lastPrize: order.price });
        }
        else {
          increment = currentValorization / ratio;
          var updated = UserPlayerBalances.update({ ticker: order.ticker, owner: {$ne:order.issuer} }, { $inc: { prize: increment } }, { multi: true });
          nextPrize = order.price - currentValorization;
          UserPlayerBalances.insert({ owner: order.issuer, ticker: order.ticker, prize: nextPrize, lastPrize: order.price });
    
        }
        
       
      }
      catch(e){

        throw new Meteor.Error(JSON.stringify(e), "can't update the user balance");

      }
      return true;
    },

    'calculateUserBalancesAlways':function(){
      return false;      
    },

    'updatePlayerCapitalization':function(ticker){
     
      let groupOrders = [{ $match: { ticker: ticker } }, { $group: { _id: "$ticker", totalPrice: { $sum: "$price" } } }]
      let newCapitalization = Orders.aggregate(groupOrders)[0];
      
      let updateQuerySelector={ ticker: ticker };
      let updateQuery= { $set: { capitalization: newCapitalization.totalPrice } };
     
      Players.update(updateQuerySelector,updateQuery);
     
    
    return true;
    }
})
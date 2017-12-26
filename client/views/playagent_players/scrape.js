


Template.scrapeFromTM.onCreated(function(){

  this.scrapedPlayerStats = new ReactiveVar(  );
  this.scrapedPlayerProfile = new ReactiveVar(  );
  this.transferHistory = new ReactiveVar(  );
});
Template.scrapeFromTM.helpers({
  scrapedPlayerStats: function() {

    return Template.instance().scrapedPlayerStats.get();
  },
   scrapedPlayerProfile: function() {

    return Template.instance().scrapedPlayerProfile.get();
  },
   transferHistory: function() {
 
    return Template.instance().transferHistory.get();
  }
});

Template.scrapeFromTM.events({

   'click [tmsscrapePlayerStats-by-PlayerId]': function ( event, template ) {
 	var scrapeId=template.find('[tmsscrapeStats-by-id]').value;

 	  Meteor.call( 'scrapePlayerStatsFromTranferMarkt',scrapeId,function(error,result){
 	  		
 	  	template.scrapedPlayerStats.set(result);

 	  })
 	},
 	'click [tmsscrapePlayerProfile-by-PlayerId]': function ( event, template ) {
 	var scrapeId=template.find('[tmsscrapeProfile-by-id]').value;
     console.log(scrapeId);
 	  Meteor.call( 'scrapePlayerProfileFromTranferMarkt',scrapeId,function(error,result){
 	  		
 	  	template.scrapedPlayerProfile.set(result.profileMetadata);
      template.transferHistory.set(result.transferHistory);
 	  })
 	}
 }
);


AutoForm.hooks({
    importPlayerForm: {
        onSuccess: function(formType, result) {
          sAlert.success('Player inserted id: '+result);
        },
        onError: function(formType, error) {
           sAlert.error('Player insertion error: '+error);
        }
    },
       importTransferHistory: {
        onSuccess: function(formType, result) {
          sAlert.success('transfer history inserted: '+result);
        },
        onError: function(formType, error) {
           sAlert.error('transfer history insertion error: '+error);
        }
    },

      importPlayerStats: {
        onSuccess: function(formType, result) {
         
          sAlert.success('player stats inserted: '+result);
        },
        onError: function(formType, error) {
           sAlert.error('player stats insertion error: '+error);
        }
    }

});

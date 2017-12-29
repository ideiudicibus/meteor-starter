/**
 * helpers and clicks
 */


AutoForm.hooks({'commentForm': {
    onSuccess: function(formType, result) {
        Meteor.call('notifyUserCommentActivity',result,function(error,result){

        })
    },
    onError(operation, error, template) {
        return sAlert.error(error);
  },
  
    formToDoc(doc, ss, formId) {
        doc.doc = Template.instance().data.commentDocId;
        doc.owner = Meteor.userId();
        return doc;
  }
  }
  });


Template.transfersByPlayerCollectionTable.helpers({

    transfersByPlayerSettings:
    function () {
        return {
            rowsPerPage: 10,
            showFilter: false,
            showColumnToggles: false,
            showNavigationRowsPerPage: false,
            fields: [
                { key: 'season', label: 'Season' },
                {
                    key: 'date',
                    label: 'Date',
                   
                    fn: function (value, object, key) { return Utils.prettyDate(value) }
                },
                {
                    key: 'sellerClubRef.name',
                    label: 'Seller Club',
                   
                    fn: function (value, object, key) { return value }
                },
                {  key:'market_value',
                    label:'Market Value',
                fn:function(value,object,key){ return Utils.formatMoney(value,2); }
                },
                {  key:'fee',
                label:'Transfer Fee',
            fn:function(value,object,key){ return Utils.formatMoney(value,2); }
            }
            ]
        };
    }


});

Template.statsByPlayerCollectionTable.helpers({

    statsByPlayerSettings:
    function(){
        return {
            rowsPerPage: 10,
            showFilter: false,
            showColumnToggles: false,
            showNavigationRowsPerPage: false,
            fields: [
                { key: 'season', label: 'Season' },
                {key:'played_minutes', label:'Played Minutes'},
                {key:'competition', label:'Competiion'},
                {key:'clubRef.name', label:'Club'},
                {key:'matches', label:'Matches'},
                {key:'points_per_match', label:'Points per match'},
                {key:'goals', label:'Goals'},
                {key:'assists', label:'Assists'}
                
            ]
        };


    }
})
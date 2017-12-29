
Template.playagentPlayersDashboard.helpers({
    cashColour: function () {
        var cash = Meteor.user().profile.cashDeposit;
        if (cash > 0) return "widget-cash-green";
        return "widget-cash-red";

    },
   
   
    playersCollectionSettings: function () {
        return {
            rowsPerPage: 10,
            showFilter: true,
            showColumnToggles: false,
            showNavigationRowsPerPage: false,
            fields: [{
                key: 'actions', label: 'Actions',
                fn: function (value, object, key) {
                    
                    return Spacebars.SafeString('<a href="' +
                        Router.path("singlePlayer", { '_id': object._id}) +
                        '"><i class="glyphicon glyphicon-zoom-in"></i></a>');
                }
            }, 'ticker', 'fullName', 'age', 'position', 'value', 'capitalization', {
                key: 'currentClub',
                label: 'Current Club'
                ,
                headerClass: function (value, object) {
                    var css = 'col-lg-4';

                    return css;
                }

            }
            ]
        };
    }
              
});






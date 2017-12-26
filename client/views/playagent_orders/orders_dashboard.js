



Template.ordersDashboard.helpers({
    cashColour: function () {
        var cash = Meteor.user().profile.playagentProfile.cashDeposit;
        if (cash > 0) return "widget-cash-green";
        return "widget-cash-red";

    },
    balancesTotals: function () {
        return BalancesTotal.find().fetch();
    },
    balanceTotalsCollectionSettings:
    function () {
        return {
            rowsPerPage: 10,
            showFilter: false,
            showColumnToggles: false,
            showNavigationRowsPerPage: false,
            fields: [
                { key: '_id', label: 'Ticker' }, {
                    key: 'totalPrize',
                    label: 'total Prize',
                    fn: function (value, object, key) { return Utils.formatMoneyEuro(value) },


                }
                , {
                    key: 'totalBuy',
                    label: 'Total Buy',
                    fn: function (value, object, key) { return Utils.formatMoneyEuro(value) }
                },
                {
                    key: 'capitalGain',
                    label: 'capital Gain',
                    fn: function (value, object, key) { return Utils.calculateAndFormatCapitalGain(object) + '%' }
                }
            ]
        };
    }

    ,
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
                        Router.path("fullPlayerProfile", { '_id': object._id }) +
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
    },
    ordersCollectionSettings: function () {
        return {
            showNavigationRowsPerPage: false,
            rowsPerPage: 10,
            showFilter: true,
            showColumnToggles: false,
            multiColumnSort:false,
            fields: [
                {
                    key: 'type',
                    label: 'Type'
                }
                ,
                {
                    key: 'ticker',
                    label: 'Ticker',
                
                },
                {
                    key: 'price',
                    label: 'Price',
                    sortOrder: 0, sortDirection: 1,
                    fn: function (value, object, key) { return Utils.formatMoneyEuro(value) }
                },
                {
                    key: 'createdAt',
                    label: 'Creation Date',
                    //sortOrder: 1, sortDirection: 'descending',
                    fn: function (value, object, key) { return Utils.prettyDate(value) }
                },
                {
                    key: 'since',
                    label: 'Since',
                    //sortOrder: 2, sortDirection: 'descending',
                    fn: function (value, object, key) { return Utils.timeSince(object.createdAt); }
                }


            ]
        };
    }
});




Template.pricesHistoryDashboard.onCreated(() => {
    var template = Template.instance();
    template.ticker = new ReactiveVar();
    template.ticker.set(Router.current().params.ticker);
}
);


Template.pricesHistoryDashboard.onRendered(() => {

    Tracker.autorun(function () {
        drawPriceChart();
    });

}
);


AutoForm.hooks({
    issueNewOrderForm: {
        onError: function (formType, error) {

            $('#afModal').modal('hide');
            sAlert.error('cannot issue new player order reason:' + error.reason);

        },
        onSuccess: function (formType, result) {

        }

    }

})




function drawPriceChart() {

    let instance = Template.instance();

    let history = PricesHistory.findOne();
    var tickerValue = instance.get('ticker').curValue;

    if (!history) {
        console.log("history not yet loaded");
        return;
    }

    let prices = history.prices;

    instance.chart = $(".pricesHistoryChart").highcharts("StockChart", {
        rangeSelector: {
            selected: 1
        },

        title: {
            text: tickerValue + " Price History"
        },

        series: [{
            name: tickerValue,
            data: prices,
            tooltip: {
                valueDecimals: 2
            }
        }]
    });
}

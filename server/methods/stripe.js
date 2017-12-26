/*
* Methods: Stripe
* Methods for interacting with the Stripe API. Because we'll interact with the
* Stripe API in a number of different ways, we want to break up the various
* functions into multiple methods. This will allow us to define each function
* once, while reusing them multiple times in our application. Sweet!
*/

// Grab our testSecretKey from /settings.json. Note: we're using our TEST secret
// because we're in TEST mode in the Stripe dashboard (that little LIVE <=> TEST
// toggle at the top left). Note: this is a bit confusing. Toggling this switch
// the first time activates "Live" mode on your account, however, this does NOT
// disable TEST mode. Further, toggling back to TEST once you're in production
// does NOT disable LIVE mode. Rather, each side (LIVE or TEST) shows the data
// generated associated with your test and/or live keys. So, you can still do
// tests locally and see that data in the dashboard before going into production.
var secret = Meteor.settings.private.stripe;
var Stripe = StripeAPI(secret);
var Future = Npm.require('fibers/future');
var Fiber = Npm.require('fibers');

Meteor.methods({



    stripeCreateCustomer: function (params) {
        // Check our arguments against their expected patterns. This is especially
        // important here because we're dealing with sensitive customer information.
        check(params, Object);
        check(params.token.id, String);
        check(params.email, String);

        // Because Stripe's API is asynchronous (meaning it doesn't block our function
        // from running once it's started), we need to make use of the Fibers/Future
        // library. This allows us to create a return object that "waits" for us to
        // return a value to it.
        var stripeCustomer = new Future();
        // If all is well, call to the Stripe API to create our customer!
        Stripe.customers.create({
            source: params.token.id,
            email: params.email
        }, function (error, customer) {
            if (error) {
                stripeCustomer.return(error);
            } else {
                stripeCustomer.return(customer);
            }
        });

        return stripeCustomer.wait();
    },

    stripeChargeCustomer: function (charge) {
        var payment = new Future();

        Stripe.charges.create(charge, (error, response) => {
            if (error) {
                payment.return(error);
            }
            else {

                payment.return(response);
            }

        })
        var tx = payment.wait();
        var user = Meteor.user();
        var stripeCustomerId = user.profile.playagentProfile.stripeCustomerId;

        var amount = tx.amount;
        if (amount) { amount = amount / 100; }

        Meteor.users.update({ _id: user._id }, { $inc: { 'profile.playagentProfile.cashDeposit': amount } });

        return tx;
    },

    getAllCharges: function (options) {
        var user = Meteor.user();

        check(user.profile.playagentProfile.stripeCustomerId, String);

        var future = new Future();
        var opts = { limit: 10 };
        if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
            opts = _.extend(opts, { customer: user.profile.playagentProfile.stripeCustomerId });
        }

        opts = _.extend(opts, options);

        var currentUserCharges = Stripe.charges.list(opts, function (error, response) {
            if (error) {
                future.return(error);
            } else {
                future.return(response);
            }
        });

        var retValue = future.wait();

        return retValue;

    },

    getCurrentCustomerCharges: function (options) {
        var user = Meteor.user();

        check(user.profile.playagentProfile.stripeCustomerId, String);

        var future = new Future();
        var opts = { limit: 10 };

        opts = _.extend(opts, { customer: user.profile.playagentProfile.stripeCustomerId });


        opts = _.extend(opts, options);

        var currentUserCharges = Stripe.charges.list(opts, function (error, response) {
            if (error) {
                future.return(error);
            } else {
                future.return(response);
            }
        });

        var retValue = future.wait();

        return retValue;
    },
    getCurrentStripeCustomer: function () {
        check(Meteor.user().emails, Array);
        var userEmail = Meteor.user().emails[0].address;
        var future = new Future();
        var handleListCustomers = Stripe.customers.list(function (error, response) {

            if (error) {
                future.return(error);
            } else {

                future.return(response);
            }
        });


        var retValue = future.wait();

        retValue = _.where(retValue.data, { email: userEmail });

        return retValue;


    }

}

);
import { Template } from 'meteor/templating'



Template.playagentCashDepositDashboard.helpers({
    currentUserCharges() {
        return Template.instance().currentUserCharges.get();
    },
    currentUser() {
        return Template.instance().currentUser.get();
    },
    processing() {
        return Template.instance().processing.get();
    },
    paymentSucceeded() {
        return Template.instance().paymentSucceeded.get();
    }

})


Template.playagentCashDepositDashboard.onCreated(function () {
    var template = Template.instance();
    template.processing = new ReactiveVar(false);
    template.currentUserCharges = new ReactiveVar();
    template.currentUser = new ReactiveVar();
    template.checkoutParams = new ReactiveVar();
    var currentCustomer = Meteor.call('getCurrentStripeCustomer', {}, (error, response) => {
        if (error) {

            sAlert.error(' ' + error.reason);
        }
        return template.currentUser.set(response);

    }
    );

    var currentCustomerCharges = Meteor.call('getCurrentCustomerCharges', {}, (error, response) => {

        if (error) {

            sAlert.error('Error in fetching cash transfer history.....' + error.reason);
        }

        return template.currentUserCharges.set(response);
    }
    );




    template.checkout = StripeCheckout.configure({
        key: Meteor.settings.public.stripe,
        image: '',
        locale: 'auto',
        token(token) {

            var checkoutParams = template.checkoutParams.get();

            if (Meteor.user().stripeCustomerId) {
                var charge = {
                    amount: checkoutParams.amount,
                    currency: checkoutParams.currency || "eur",
                    description: checkoutParams.description,
                    customer: Meteor.user().stripeCustomerId
                };
                Meteor.call('stripeChargeCustomer', charge, (error, response) => {
                    template.processing.set(false);
                    if (response.type == 'StripeInvalidRequestError') {
                        var invalidRequestError = retVaresponselue.rawType + ': ' + response.message;
                        sAlert.error(invalidRequestError);
                    }
                    if (error) {

                        sAlert.error(error.reason);
                    } else {

                        sAlert.info('payment succeded');

                    }
                })

            }
            else {


                var customer = {
                    email: Meteor.user().emails[0].address,
                    token: token
                };
                Meteor.call('stripeCreateCustomer', customer, (error, response) => {
                    var createdCustomer = response;

                    if (error) {

                        sAlert.error(error.reason);
                    } else {

                        var charge = {
                            amount: checkoutParams.amount,
                            currency: checkoutParams.currency || "eur",
                            customer: createdCustomer.id,
                            description: checkoutParams.description || "NO_GIVEN_DESCRIPTION"
                        }

                        Meteor.call('stripeChargeCustomer', charge, (error, response) => {

                            if (error) {

                                sAlert.error(error.reason);
                            } else {

                                sAlert.error('payment succeed');

                            }
                        });
                    }
                }
                )
            }
        },
        closed() {
           
            template.processing.set(false);
            $('#amountCash').val('')
        }
    });
})

Template.playagentCashDepositDashboard.events({

    'click #previous'(evt) {

        var template = Template.instance();
        var charges = template.currentUserCharges.get();
        template.currentUserCharges.set(null);

        if (_.first(charges.data)) {

            var endingBefore = (_.first(charges.data)).id;

            Meteor.call('getCurrentCustomerCharges', { ending_before: endingBefore }, (error, response) => {
                if (error) {

                    sAlert.error('Error in fetching cash transfer history.....' + error.reason);
                }
                template.currentUserCharges.set(response);

            });
        }
        else {
            Meteor.call('getCurrentCustomerCharges', {}, (error, response) => {
                if (error) {

                    sAlert.error('Error in fetching cash transfer history.....' + error.reason);
                }
                template.currentUserCharges.set(response);
            }
            );


        }



    },
    'click #next'(evt) {

        var template = Template.instance();
        var charges = template.currentUserCharges.get();
        template.currentUserCharges.set(null);

        if (_.last(charges.data)) {
            var startingAfter = (_.last(charges.data)).id;

            Meteor.call('getCurrentCustomerCharges', { starting_after: startingAfter }, (error, response) => {
                if (error) {

                    sAlert.error('Error in fetching cash transfer history.....' + error.reason);
                }

                template.currentUserCharges.set(response);
            });

        }
        else {
            Meteor.call('getCurrentCustomerCharges', {}, (error, response) => {
                if (error) {

                    sAlert.error('Error in fetching cash transfer history.....' + error.reason);
                }
                template.currentUserCharges.set(response);

            }
            );


        }



    },

    'click #reload'(evt) {
        var template = Template.instance();
        template.currentUserCharges.set(null);
        Meteor.call('getCurrentCustomerCharges', {}, (error, response) => {

            template.currentUserCharges.set(response);

        });

    },

    'click #createCustomer'(evt) {
        var template = Template.instance();
        Meteor.call('createCustomer', {}, (error, response) => {

        })

    },

    'click #depositCash'(evt) {
        var template = Template.instance();
        var amount = $('#amountCash').val();

        if (amount) {
            amountInCents = Math.floor(amount * 100);
            var displayAmount = parseFloat(Math.floor(amount * 100) / 100).toFixed(2);
            var checkoutParams = {
                name: 'PlayAgent Cash Deposit Service',
                description: 'deposit  ' + displayAmount,
                amount: amountInCents,
                bitcoin: false,
                currency: "eur",
                email: Meteor.user().emails[0].address
            };
            template.checkoutParams.set(checkoutParams);

            template.processing.set(true);
            template.checkout.open(checkoutParams);

        }
        else {

            sAlert.error('cannot process void  payment');
        }

    }
})
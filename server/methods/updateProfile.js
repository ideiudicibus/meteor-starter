Metheor.methods({


    'updateUserStripeProfile': (customer)=>{

        let userId=Meteor.userId();
        let stripeCustomerId=customer.id;
        try{
        Meteor.user.update({_id:userId},{$set:{"profile.playagentProfile.stripeCustomerId":stripeCustomerId}})
        }
        catch(e){
            throw new Meteor.Error(e);
        }
    }
})
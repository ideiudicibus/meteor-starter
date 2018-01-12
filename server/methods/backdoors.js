
Meteor.methods({
  createAdminBackdoor() {
      try {
      
      let email=AdminConfig.adminEmails[0];
      var user=  Accounts.findUserByEmail(email);
      
      if(!Roles.userIsInRole(user,'admin')){
        Roles.addUsersToRoles([user._id],['admin']);
      }
     
      return user;
      }catch(e){
        console.log(e);
        throw new Meteor.Error(e);
      }
    },
    addSomeCashBackdoor(num) {
      try {
      
       Meteor.users.update({},{$set:{"profile.playagentProfile.cashDeposit":num}},{multi:true});
      }catch(e){
        
        throw new Meteor.Error(e);
      }
    }
  }
);
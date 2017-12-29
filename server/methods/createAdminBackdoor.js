
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
    addSomeCashBackdoor(userId,num) {
      try {
      
      console.log(userId,num);
      }catch(e){
        
        throw new Meteor.Error(e);
      }
    }
  });
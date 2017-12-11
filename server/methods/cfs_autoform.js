
/*AutoForm.addHooks(
	["add"],
	{
	  before   : {
		method: CfsAutoForm.Hooks.beforeInsert
	  },
	  after    : {
		method: CfsAutoForm.Hooks.afterInsert
	  }
	}
  );
*/


Meteor.methods({
    postInsertMethod: function(doc) {
      try {
       console.log(doc);
      }catch(e){
        throw new Meteor.Error(e);
      }
  
      //do some stuff here and throw a new Meteor.Error if there is a problem
    }});
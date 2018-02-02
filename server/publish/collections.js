
import { publishComposite } from 'meteor/reywood:publish-composite';


Meteor.publish('posts', function() {
    return Posts.find();
  });
  
  
  Meteor.publish('post', function(id) {
    return Posts.find({_id:id});
  });
  
  Meteor.publish('attachments', function() {
    return Attachments.find();
  });



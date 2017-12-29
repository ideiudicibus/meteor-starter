
Meteor.methods({

    'notifyUserCommentActivity': function (commentId) {
        try{
            let comment = Comments.findOne({ _id: commentId });
            let commentedPost = Posts.findOne({ _id: comment.doc });
            let user = Meteor.users.findOne({ _id: commentedPost.owner });
    
            Notifications.new({ title: "" + Utils.prettyDateTime(comment.createdAt) + "  " + user.emails[0].address + +"commented on " + commentedPost.title });
           
        }
      catch(e){
          new Meteor.Error(JSON.stringify(e),"can't notify user comment");
      }
      return true;
    }
    ,

    'notifyUserOrderActivity': function (order) {


        let user = Meteor.users.findOne({ _id: order.issuer });

        try {
            Notifications.new({ title: "" + Utils.prettyDateTime(order.createdAt) + " " + user.emails[0].address + " issue an order of " + order.price + " for this player ticker: " + order.ticker });
        }
        catch (ex) {
            console.log(ex)
        }
        return true;
    }

})
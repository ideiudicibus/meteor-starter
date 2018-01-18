Meteor.methods({
    removeFromCollection(file) {
        
      var collectionName=file.collectionName;
      var collection = FS._collections[collectionName] || global[collectionName];
      return collection.remove(file._id);
      
    }});
Meteor.methods({
    removeFromCollection(file) {
        
      let collectionName=file.collectionName;
      const collection = FS._collections[collectionName] || global[collectionName];
      return collection.remove(file._id);
      
    }});
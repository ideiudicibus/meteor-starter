/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Meteor.publish('autoformFileDoc', function(collectionName, docId) {
  check(collectionName, String);
  check(docId, String);

  const collection = FS._collections[collectionName] || global[collectionName];
  if (collection) {
    return collection.find({
      _id: docId,
      'metadata.owner': this.userId
    });
  }
});

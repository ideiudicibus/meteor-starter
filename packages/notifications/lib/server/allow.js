/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Notifications.allow({
  insert(userId, doc) {
    return doc.owner === userId;
  },
  update(userId, doc, fieldNames, modifier) {
    return (doc.owner === userId) && (fieldNames.length === 1) && (fieldNames[0] === 'read');
  },
  remove(userId, doc) {
    return doc.owner === userId;
  }
});

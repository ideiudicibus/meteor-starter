/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
AutoForm.hooks({commentForm: {
  onError(operation, error, template) {
  	return sAlert.error(error);
},

  formToDoc(doc, ss, formId) {
  	doc.doc = Template.instance().data.commentDocId;
  	doc.owner = Meteor.userId();
  	return doc;
}
}
});
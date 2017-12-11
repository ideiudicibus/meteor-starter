/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
if (Meteor.isClient) {
  Template.registerHelper('momentumIRTransition', () =>
    (from, to, element) => "fade"
  );
}
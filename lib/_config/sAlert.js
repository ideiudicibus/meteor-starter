/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Meteor.startup(function() {
  if (Meteor.isClient) {
    return sAlert.config({
      effect: "stackslide",
      position: "bottom-right",
      timeout: 3000,
      html: false
    });
  }
});
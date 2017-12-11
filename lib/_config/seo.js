/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Meteor.startup(function() {
  if (Meteor.isClient) {
    return SEO.config({
      title: Config.name,
      meta: {
        title: Config.name,
        description:  Config.subtitle
      }
    });
  }
});
        
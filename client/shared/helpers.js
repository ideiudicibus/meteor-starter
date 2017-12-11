/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Template.registerHelper('Config', () => Config);

Template.registerHelper('Schemas', () => Schemas);

Template.registerHelper('Utils', () => Utils);

Template.registerHelper('socialMedia', () =>
  _.map(Config.socialMedia, obj=> obj)
);

Template.registerHelper('currentRoute', function() {
  if (Router && Router.current && Router.current()) {
    return Router.current();
  }
});

Template.registerHelper('isRouteReady', () => Router && Router.current && Router.current() && (Router.current()._waitlist._notReadyCount === 0));
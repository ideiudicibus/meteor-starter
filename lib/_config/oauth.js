/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
if (Meteor.isServer) {
  Meteor.startup(function() {
    // Set the social login credentials credentials
    // See /private/settings/dev.json for an example
    if (Meteor.settings && Meteor.settings.serviceConfigurations) {
      return _.each(Meteor.settings.serviceConfigurations, (config, service) =>
        ServiceConfiguration.configurations.upsert({ service }, { $set:
          config
      }
        )
      );
    }
  });
}
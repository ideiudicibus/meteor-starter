/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
if (Meteor.isServer) {
  const options =
    {siteName: Config.name};

  if (Config.socialMedia) {
    _.each(Config.socialMedia, (v,k) => options[k] = v.url);
  }

  if (Config.legal) {
    options.companyAddress = Config.legal.address;
    options.companyName = Config.legal.name;
    options.companyUrl = Config.legal.url;
  }

  PrettyEmail.options = options;
}
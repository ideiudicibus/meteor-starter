/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Template.registerHelper('Notifications', function(options) {
  if (typeof window['Notifications'] !== 'undefined') {
    let limit, order;
    if (options instanceof Spacebars.kw && options.hash) {
      if (options.hash.limit != null) { ({ limit } = options.hash); }
      if (options.hash.unreadFirst != null) { order = {read: 1, date: -1}; }
    } else {
      limit = 0;
      order = {date: -1};
    }

    return Notifications.find({}, {limit, sort: order}).fetch();
  }
});

Template.registerHelper('notificationCount', function() {
  if (typeof window['Notifications'] !== 'undefined') {
    return Notifications.find({read: false}).count();
  }
});

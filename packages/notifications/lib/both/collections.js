/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
this.Notifications = new Meteor.Collection('notifications');

Notifications.new = function(doc) {
  if (typeof doc.owner === 'undefined') {
    doc.owner = Meteor.userId();
  }

  return Notifications.insert(doc);
};

Notifications.readAll = () => Meteor.call('readAllNotifications');

Notifications.read = _id => Notifications.update(_id, {$set: {read: true}});

const NotificationsSchema = new SimpleSchema({
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },

  link: {
    type: String,
    optional: true
  },

  title: { 
    type: String
  },

  read: {
    type: Boolean,
    defaultValue:  false
  },

  date: { 
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },

  icon: {
    type: String,
    defaultValue:  'circle-o'
  },

  class: {
    type: String,
    defaultValue:  'default'
  }
});

Notifications.attachSchema(NotificationsSchema);

/*
 * decaffeinate suggestions:
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
this.Schemas = {};

// Non collection Schemas
Schemas.updatePassword = new SimpleSchema({
  old: {
    type: String,
    label: "Current Password",
    max: 50
  },

  new: {
    type: String,
    min: 6,
    max: 20,
    label: "New Password"
  },

  confirm: {
    type: String,
    min: 6,
    max: 20,
    label: "Confirm new Password"
  }
});
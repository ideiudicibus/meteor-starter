/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

Schemas.PlayagentProfile=new SimpleSchema({
 
  stripeCustomerId:{
    type: String,
    optional: true
  },
  
  cashDeposit:{
    type:Number,
    optional:true,
    defaultValue:0,
    label:"Cash deposit",
    autoform: {
      disabled:true,
      readonly:true
    }
  },
  accountBalance:{
    type:Number,
    optional:true,
    defaultValue:0,
    label:"Account Balance",
    autoform: {
      disabled:true,
      readonly:true
    }
  }

});

Schemas.UserProfile = new SimpleSchema({

  playagentProfile: {
    type: Schemas.PlayagentProfile,
    optional: true
  },

  picture: {
    type: String,
    optional:true,
    label: 'Profile picture',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'ProfilePictures'
      }
    }
  },

  firstName: {
    type: String,
    optional: true
  },

  lastName: {
    type: String,
    optional: true
  },

  birthday: {
    type: Date,
    optional: true
  },

  bio: {
    type: String,
    optional: true,
    autoform: {
      rows: 4
    }
  },

  location: {
    type: String,
    optional: true,
    autoform: {
      type: 'map',
      geolocation: true,
      searchBox: true,
      autolocate: true,
      zoom:10
    }
  },

  country: {
    type: String,
    label: 'Nationality',
    allowedValues: Utils.countryList,
    optional: true
  }
});

Schemas.User = new SimpleSchema({

  username: {
    type: String,
    regEx: /^[a-z0-9A-Z_]{3,15}$/,
    optional: true
  },


  emails: {
    type: [Object],
    optional: true
  },

  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },

  "emails.$.verified": {
    type: Boolean
  },

  createdAt: {
    type: Date
  },

  profile: {
    type: Schemas.UserProfile,
    optional: true
  },

  services: {
    type: Object,
    optional: true,
    blackbox: true
  },

  roles: {
    type: [String],
    blackbox: true,
    optional: true
  }
});

Meteor.users.attachSchema(Schemas.User);

// Export schemas
this.StarterSchemas = Schemas;

Meteor.users.helpers({
  hasRole(role) {
    return (this.roles != null ? this.roles.indexOf(role) : undefined) > -1;
  }
});
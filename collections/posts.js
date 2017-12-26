/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS207: Consider shorter variations of null checks
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
this.Posts = new Meteor.Collection('posts');

Schemas.Posts = new SimpleSchema({
	title: {
		type:String,
		max: 60
	},
	content: {
		type: String,
		label: "Write your post here",
		autoform: {
		  type: 'tinyMCE',
		  data: {
						  
			  height: 300,
			  statusbar: true,
			  menubar: true,
			  toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
			  plugins: [
				"advlist autolink lists link image charmap print preview anchor",
				"visualblocks code",
				"insertdatetime media table contextmenu paste"
			],
			  media_live_embeds: true
		  }
	  }
	  },
/*
	content: {
		type: String,
		autoform: {
			rows: 5
		}
	},

	*/
	createdAt: {
		type: Date,
		autoValue() {
			if (this.isInsert) {
				return new Date();
			}
		}
	},

	updatedAt: {
		type:Date,
		optional:true,
		autoValue() {
			if (this.isUpdate) {
				return new Date();
			}
		}
	},

	picture: {
		type: String,
		optional: true,

		autoform: {
			afFieldInput: {
				type: "fileUpload",
				collection: 'Attachments',
				  uploadProgressTemplate: 'customSpinner'
			}
		}
	},

	owner: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		autoValue() {
			if (this.isInsert) {
				return Meteor.userId();
			}
		},
		autoform: {
			options() {
				return _.map(Meteor.users.find().fetch(), user=>
					({
						label: user.emails[0].address,
						value: user._id
					})
				);
			}
		}
	},
	tags:{
		type:[String],
		autoform: {
		  type: 'tags'
		},
		optional: true
	  }
});

Posts.attachSchema(Schemas.Posts);

Posts.helpers({
	author() {
		const user = Meteor.users.findOne(this.owner);
		if ((__guard__(user != null ? user.profile : undefined, x => x.firstName) != null) && __guard__(user != null ? user.profile : undefined, x1 => x1.lastName)) {
			return user.profile.firstName + ' ' + user.profile.lastName;
		} else {
			return __guard__(user != null ? user.emails : undefined, x2 => x2[0].address);
		}
	}
});

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
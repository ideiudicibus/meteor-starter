/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
this.Comments = new Meteor.Collection('comments');

const CommentsSchema = new SimpleSchema({
	doc: {
		type:String,
		regEx: SimpleSchema.RegEx.Id
	},

	owner: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
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

	createdAt: { 
		type: Date,
		autoValue() {
			if (this.isInsert) {
				return new Date();
			}
		}
	},

	content: {
		type: String,
		label: 'Comment'
	}
});


Comments.attachSchema(CommentsSchema);
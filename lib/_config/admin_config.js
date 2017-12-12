/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
this.AdminConfig = {
	name: Config.name,
	adminEmails: ['i.deiudicibus@gmail.com'],
	collections: {
		Posts: {
			color: 'red',
			icon: 'pencil',
			extraFields: ['owner'],
			tableColumns: [
				{ label: 'Title', name: 'title' },
				{ label: 'User', name: 'author()', template: 'adminUserCell' }
			]
		},
		Comments: {
			color: 'green',
			icon: 'comments',
			extraFields: ['doc', 'owner'],
			tableColumns: [
				{ label: 'Content', name: 'content' },
				{ label: 'Post', name: 'docTitle()', template: 'adminPostCell' },
				{ label: 'User', name: 'author()', template: 'adminUserCell' }
			],
			children: [
				{
					find(comment) {
						return Posts.find(comment.doc, {limit: 1});
					}
				},
				{
					find(comment) {
						return Meteor.users.find(comment.owner, {limit: 1});
					}
				}
			]
		}
	},
	dashboard: {
		homeUrl: '/dashboard'
	},
	autoForm: {
		omitFields: ['createdAt', 'updatedAt']
	}
};

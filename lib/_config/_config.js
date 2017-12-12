/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// These values get propagated through the app
// E.g. The 'name' and 'subtitle' are used in seo.coffee

this.Config = {

	// Basic Details
	name: 'My App',
	title() {
			return TAPi18n.__('configTitle');
		},
	subtitle() {
			return TAPi18n.__('configSubtitle');
		},
	logo() {
		return `<b>${this.name}</b>`;
	},
	footer() {
		return this.name + ' - Copyright ' + new Date().getFullYear();
	},

	// Emails
	emails: {
		from: `no-reply@${Meteor.absoluteUrl()}`,
		contact: `hello${Meteor.absoluteUrl()}`
	},

	// Username - if true, users are forced to set a username
	username: false,
	
	// Localisation
	defaultLanguage: 'en',
	dateFormat: 'D/M/YYYY',

	// Meta / Extenrnal content
	privacyUrl: 'http://meteorfactory.io',
	termsUrl: 'http://meteorfactory.io',

	// For email footers
	legal: {
		address: 'Jessnerstrasse 18, 12047 Berlin',
		name: 'Meteor Factory',
		url: 'http://benjaminpeterjones.com'
	},

	about: 'http://meteorfactory.io',
	blog: 'http://learn.meteorfactory.io',

	socialMedia: {
		facebook: {
			url: 'http://facebook.com/benjaminpeterjones',
			icon: 'facebook'
		},
		twitter: {
			url: 'http://twitter.com/BenPeterJones',
			icon: 'twitter'
		},
		github: {
			url: 'http://github.com/yogiben',
			icon: 'github'
		},
		info: {
			url: 'http://meteorfactory.io',
			icon: 'link'
		}
	},

	//Routes
	homeRoute: '/',
	publicRoutes: ['home'],
	dashboardRoute: '/posts-dashboard',
	/**configure this path as need ie:uuid or random */
	createAdminBackdoorUrl:'/createAdminBackdoorUrl'
};
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
	name: 'PlayAgent',
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
	privacyUrl: 'privacy url',
	termsUrl: 'terms of use url',

	// For email footers
	legal: {
		address: 'legal address',
		name: 'PlayAgent',
		url: 'playagent url'
	},

	about: 'play agent url about',
	blog: 'play agent blog url',

	socialMedia: {
		facebook: {
			url: '',
			icon: 'facebook'
		},
		twitter: {
			url: '',
			icon: 'twitter'
		},
		github: {
			url: '',
			icon: 'github'
		},
		info: {
			url: '',
			icon: 'link'
		}
	},

	//Routes
	homeRoute: '/',
	publicRoutes: ['home'],
	dashboardRoute: '/dashboard-home',
	/**configure this path as need ie:uuid or random */
	createAdminBackdoorUrl:'/createAdminBackdoorUrl',
	addSomeCashBackdoorUrl:'/addSomeCashBackdoorUrl'
};
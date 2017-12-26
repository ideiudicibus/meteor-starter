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
		'Meteor.roles':{
			color:'green',
			icon:'users',
			tableColumns:[
				{
					label:'Name',
					name:'name'
				}
			]
		},
		Players: {
		  color: 'red',
		  icon: 'soccer-ball-o',
		  extraFields: ['owner'],
		  tableColumns: [
			{
			  label: 'Full name',
			  name: 'fullName'
			}, {
			  label: 'Nationality',
			  name: 'nationality'
			}
		  ]
		},
		Orders: {
		  color: 'red',
		  icon: 'soccer-ball-o',
		  extraFields: ['issuer'],
		  tableColumns: [
			{
			  label: 'Ticker',
			  name: 'ticker'
			}, {
			  label: 'Date',
			  name: 'createdAt'
			}
		  ]
		},
		PricesHistory: {
		  color: 'red',
		  icon: 'soccer-ball-o',
	   
		  tableColumns: [
			{
			  label: 'Ticker',
			  name: 'ticker'
			}, {
			  label: 'last price',
			  name: 'last'
			}
		  ]
		},
		Agents: {
		  color: 'red',
		  icon: 'soccer-ball-o',
		  extraFields: ['owner'],
		  tableColumns: [
			{
			  label: 'Full name',
			  name: 'fullName'
			}
		  ]
		},
		PlayerStats:{
		  color: 'green',
		  icon:'group',
		  tableColumns:[
				/*
			{label:'Player',name:'playerRef()',template:'playerNameCell'},
			 {label:'Season',name:'season'},
			 {label:'Club',name:'clubRef()',template:'clubNameCell'},
			 {label:'goals',name:'goals'}
	*/
		  ],
		   extraFields: ['player','club']
		},
		Clubs:{
		  color: 'yellow',
		  icon:'group',
		  tableColumns:[
			  {label:'name',name:'name'},
			  {label:'nationality',name:'nationality'}
		  ]
		},
		Transfers:{
		  color: 'green',
		  icon:'exchange',
		  tableColumns:[
				/*
			  {label:'Date',name:'date',template:'formattedDateCell'},
			  
			  {label:'Buyer Club',name:'buyerClubRef()',template:'buyerClubNameCell'},
			  {label:'Seller Club',name:'sellerClubRef()',template:'sellerClubNameCell'},
			  {label:'Value',name:'market_value'},
			  {label:'Payback',name:'payback_value'},
				{label:'Player',name:'playerRef()',template:'playerNameCell'}
				*/
		  ],
		  extraFields: ['player','buyer_club','seller_club']
		},
		Posts: {
		  color: 'red',
		  icon: 'pencil',
		  extraFields: ['owner'],
		  tableColumns: [
			{
			  label: 'Title',
			  name: 'title'
			}, {
			  label: 'User',
			  name: 'author()',
			  template: 'adminUserCell'
			}
		  ]
		},
		Comments: {
		  color: 'green',
		  icon: 'comments',
		  extraFields: ['doc', 'owner'],
		  tableColumns: [
			{
			  label: 'Content',
			  name: 'content'
			}, {
			  label: 'Post',
			  name: 'docTitle()',
			  template: 'adminPostCell'
			}, {
			  label: 'User',
			  name: 'author()',
			  template: 'adminUserCell'
			}
		  ],
		  children: [
			{
			  find: function(comment) {
				return Posts.find(comment.doc, {
				  limit: 1
				});
			  }
			}, {
			  find: function(comment) {
				return Meteor.users.find(comment.owner, {
				  limit: 1
				});
			  }
			}
		  ]
		}
	  },
	dashboard: {
		homeUrl: '/'
	},
	autoForm: {
		omitFields: ['createdAt', 'updatedAt']
	}
};

import '../../_schemas.js';

this.Verifications = new Meteor.Collection('verifications');

this.VerificationRecords = new Meteor.Collection('verificationRecords');

Schemas.Verification = new SimpleSchema({
	RagioneSocialeBeneficiario: {
		type: String,
		max: 60
	}

})


Schemas.VerificationRecord = new SimpleSchema({
	RagioneSocialeBeneficiario: {
		type: String,
		max: 60
	}


})


VerificationRecords.attachSchema(this.Schemas.VerificationRecord);

Verifications.attachSchema(this.Schemas.Verification);
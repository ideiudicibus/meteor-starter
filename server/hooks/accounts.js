Accounts.onCreateUser((options, user) => {
    if (user.services.google) {

        var service = user.services.google;
        var profile = {};
        profile.firstName = service.given_name;
        profile.lastName = service.family_name;
        user.profile = profile;
    }
    return user;

});
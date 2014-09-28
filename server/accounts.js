/**
 * Created by ragnar on 28/09/14.
 */
(function (Meteor) {

    Meteor.methods({
        'newUser': function (user) {
            options = {
                username : user.usrEmail,
                password : user.usrPassword,
                email    : user.usrEmail,
                profile  : {
                    name     : user.usrFirstName + ' ' + user.usrLastName,
                    birthYear: user.usrBirth,
                    phone    : user.usrPhone
                }
            }
            addUser(options);
        }
    });

    Meteor.users.allow({
        insert: function(userID, doc) {
            // Check if admin
           // return true
        },

        update: function() {

        },

        remove: function() {

        },

        fetch:[]
    });

    Meteor.users.deny({
        insert: function() {

        },

        update: function() {

        },

        remove: function() {

        },

        fetch: []
    });


    function validateUser(user) {}

    function addUser(user) {
        //validateUser(options)
        var id = Accounts.createUser(user);
        console.log('User created ' + id + ' ' + user.profile.name);
        Roles.addUsersToRoles(id, ['Awsom', 'Deltaker', 'Redneck']);
    }

}(Meteor));
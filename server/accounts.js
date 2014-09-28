/**
 * Created by ragnar on 28/09/14.
 */
(function (Meteor, Accounts) {

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
        },

        'loginUser': function (user) {
            console.log(user);
            login(user.username, user.password);
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

    function changePassword(user) {
        Accounts.changePassword()
    }

    function login(username, password) {
        var t = Meteor.loginWithPassword(username, password, function (error) {
            if (error) {
                console.log(error);
            }
        });
        console.log(t);
    }

}(Meteor, Accounts));
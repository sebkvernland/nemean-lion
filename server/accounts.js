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
            };
            return addUser(options);
        },

        'loginUser': function (user) {
            console.log(user);
            login(user.username, user.password);
        },

        'deleteUser': function(user) {
            console.log(user.username + "deleted!");
            Meteor.users.remove({_id: user});
        },

        'deleteAll': function(userId) {
           if( Roles.userIsInRole(userId, ['Admin'])) {
                Meteor.users.remove( {roles:{ $not: /Admin/}});
                console.log("All non admins deleted!");
           }
           else {
               console.log("Permission denied!");
           }
        },
        'authenticateUser': function(pwd) {
            if (this.userId) {
                var user = Meteor.user(),
                password = {digest: pwd, algorithm: 'sha-256'},
                result = Accounts._checkPassword(user, password);
                return result;
            }
            return false;
        }
    });

    /*Meteor.users.allow({
        insert: function(userID, doc) {
            // Check if admin
           // return true
        },

        update: function() {

        },

        remove: function() {

        }
    });

    Meteor.users.deny({
        insert: function() {

        },

        update: function() {

        },

        remove: function() {

        }
    });*/


    function validateUser(user) {}

    function addUser(user) {
        //validateUser(options)
        var id = Accounts.createUser(user);
        if(id) {
            console.log('User created ' + id + ' ' + user.profile.name);
            Roles.addUsersToRoles(id, ['User']);
            return true;
        }
        return false;
    }

    function changePassword(user) {
        Accounts.changePassword();
    }

    function login(username, password) {
        var t = Meteor.loginWithPassword(username, password, function (error) {
            if (error) {
                console.log(error);
            }
        });
        console.log(t);
    }

    Meteor.publish("userData", function(userId) {
        if (Roles.userIsInRole(userId, ['Admin'])) {
            console.log('Fetching users');
            return Meteor.users.find({});
        }
    });
}(Meteor, Accounts));
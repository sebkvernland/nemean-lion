/**
 * Created by ragnar on 28/09/14.
 */
(function (Meteor) {

    Template.header.helpers({
        stateClass: function(event, template) {
            return (loggedIn()) ? 'logout' : 'register';
        },

        viewLogin: function(event, template) {
            return Session.get('viewLoginState');
        },

        viewLoginClass: function(event, template) {
            return (Session.get('viewLoginState') && !Meteor.user())
                ? 'headerLogin' : 'header tile-text';
        },

        mapLink: function(event, template) {
            return (loggedIn()) ? 'map' : 'login';
        }

    });


    Template.header.events({
        'click .login': function(event, template) {
            if (Meteor.user()) {
                Router.go("/map");
            }
            else {
                Session.set('viewLoginState', true);
            }
        },

        'click .cancel': function(event, template) {
            Session.set('viewLoginState', false);
            event.preventDefault();
        },

        'submit form': function(event, template) {
            console.log('testing');
            var user = Meteor.nemean.getFormData("#loginForm");
            Meteor.loginWithPassword(user.usrUsername, user.usrPassword, function(error){
                if (error) {
                    console.log(error);
                }
            });
            event.preventDefault();
        }
    });


    loggedIn = function() {
        return (Meteor.user());
    }

}(Meteor));
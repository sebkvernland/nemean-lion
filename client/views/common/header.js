/**
 * Created by ragnar on 28/09/14.
 */
(function (Meteor) {

    Template.header.helpers({
        stateClass: function(event, template) {
            return (loggedIn()) ? 'myPage' : 'register';
        },

        viewLogin: function(event, template) {
            return Session.get('viewLoginState');
        },

        viewLoginClass: function(event, template) {
            return (Session.get('viewLoginState') && !Meteor.user())
                ? 'headerLogin' : 'header tile-text';
        },

        mapLink: function(event, template) {
            if (loggedIn()) {
                return 'map';
            }
            else if (Session.get('viewLoginState')) {
                return '';
            }
            else {
                return 'login';
            }
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
            var user = Meteor.nemean.getFormData("#loginForm");
            Meteor.loginWithPassword(user.usrUsername, user.usrPassword, function(error){
                if (error) {
                    console.log(error);
                    return;
                }
                Session.set('viewLoginState', false);
            });
            event.preventDefault();
        },

        'click .myPage': function(event, template) {
            Router.go("/user/userPage");
        },

        'click .logo': function(event, template) {
            Router.go("/");
        }
    });


    loggedIn = function() {
        return (Meteor.user());
    }

}(Meteor));
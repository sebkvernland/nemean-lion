/**
 * Created by ragnar on 28/09/14.
 */
(function (Meteor) {

    Template.userPage.helpers({
        'isAdmin': function(event, template) {
            console.log('hey');
            return (Roles.userIsInRole(Meteor.userId(), ['Admin']));
        }
    });

    Template.R1Step1.events({
        'submit form': function(event, template) {
            var user = Meteor.nemean.getFormData('#R1Step1');

            Meteor.call('newUser', user, function(error) {
                if (error) {
                    console.log(error);
                    return;
                }
                Meteor.loginWithPassword(user.usrEmail, user.usrPassword, function(error) {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    Router.go("/");
                });
            });
            event.preventDefault();
        }
    });

    Template.userPage.events({
        'click .deleteUser': function(){
            Meteor.call('deleteUser', Meteor.userId(), function(error) {
                if (error) {
                    console.log(error);
                    return;
                }
            })
        }
    });

}(Meteor));
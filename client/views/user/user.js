/**
 * Created by ragnar on 28/09/14.
 */
(function (Meteor) {

    Template.R1Step1.helpers({

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

}(Meteor));
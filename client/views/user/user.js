/**
 * Created by ragnar on 28/09/14.
 */
(function (Meteor) {

   Meteor.subscribe("userData", Meteor.userId());

    Template.userPage.helpers({

    });

    Template.userAdministration.helpers({
        'users': function(event, template) {
            return Meteor.users.find({}).fetch();
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

    Template.deleteMember.helpers({
       'usrPasswordInput': function() {
           return (Session.get('usrPasswordClass'));
       }
    });

    Template.deleteMember.events({
        'submit form': function(event, template){
            var pwd = Package.sha.SHA256($('#usrPassword').val());
            Meteor.call('authenticateUser', pwd, function(error, result) {
                if (error) {
                    console.log(error);
                }

                if (result) {
                    Meteor.call('deleteUser', Meteor.userId(), function(error) {
                        if (error) {
                            console.log(error);
                        }
                        Router.go("/");
                        Session.set('usrPasswordClass', '');
                    });
                }
                else {
                    Session.set('usrPasswordClass', 'has-error');
                }
            });
            event.preventDefault();
        }
    });

    Template.userAdministration.events({
        'click .deleteUsers': function(){
            Meteor.call('deleteAll', Meteor.userId(), function(error) {
                if (error) {
                    console.log(error);
                    return;
                }
            })
        }
    });

    Template.adminPage.events({
        'click .userAdministration': function(event, template) {
            Router.go("/userAdministration");
        }
    });

    function verifyUser(pwd) {
        var retVal;

        console.log('retval2: ' + retVal);
    }

}(Meteor));
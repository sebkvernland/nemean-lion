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

            Meteor.call('newUser', user, function(error, result) {
                if (error) {
                    console.log(error);
                    return;
                }

                if (result){
                    console.log("Logging in!");
                    Meteor.loginWithPassword(user.usrEmail, user.usrPassword, function(error) {
                        if (error) {
                            console.log(error);
                            return;
                        }
                        Router.go("/");
                        Meteor.nemean.redneckShout(ALERT.S, "Gratulerer! Du er nå den lykkelige eier av din egen Nemean-konto :-)");
                    });
                }else {console.log("No result, and most cetanly no error!");}
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
                    });
                }
                else {
                    Session.set('usrPasswordClass', 'has-error');
                }
            });
            event.preventDefault();
        }
    });

        Template.changePassword.events({
        'submit form': function(event, template){

            var pwd = Package.sha.SHA256($('#oldPassword').val());
            Meteor.call('authenticateUser', pwd, function(error, result) {
                if (result.error) {
                    console.log(result.error);
                    Meteor.nemean.redneckShout(ALERT.E, Meteor.nemean.getErrorMessage(result.error.error));
                    return;
                }

                if (result) {
                        var newPwd = $('#newPassword').val();
                        var newPwdRepeat = $('#passwordRepeat').val();
                        if(newPwd === newPwdRepeat) {
                            Accounts.changePassword($('#oldPassword').val(), newPwd, function(error){

                                if(error) {
                                    console.log(error);
                                    Meteor.nemean.redneckShout(ALERT.E, Meteor.nemean.getErrorMessage(error.error));
                                    return;
                                }
                                Router.go("userPage");
                                Meteor.nemean.redneckShout(ALERT.I,"Ditt passord er nå endret!");
                            });
                        }
                        else {
                            Meteor.nemean.redneckShout(ALERT.E, Meteor.nemean.getErrorMessage(900));
                            return;
                        }
                    }

                else {
                    Session.set('usrPasswordClass', 'has-error');
                }
            });
            event.preventDefault();
        }
    });

    Template.deleteMember.destroyed = function(){
         Session.set('usrPasswordClass', '');
    };

    Template.userAdministration.events({
        'click .deleteUsers': function(){
            Meteor.call('deleteAll', Meteor.userId(), function(error) {
                if (error) {
                    console.log(error);
                    return;
                }
            });
        }
    });

    Template.adminPage.events({
        'click .userAdministration': function(event, template) {
            Router.go("/userAdministration");
        }
    });

}(Meteor));
/**
 * Created by ragnar on 04/10/14.
 */
(function(Meteor, _){

    Handlebars.registerHelper('isAdmin', function(){
        return (Roles.userIsInRole(Meteor.userId(), ['Admin']));
    });

}(Meteor, _));
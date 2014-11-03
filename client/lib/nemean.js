/**
 * Created by ragnar on 28/09/14.
 */


ALERT = {
        S : "alert-success",
        I : "alert-info",
        W : "alert-warning",
        E : "alert-danger"
    },

Meteor.nemean = {

    getFormData: function (formID) {
        var form = {};
        _.each($(formID).serializeArray(), function(input) {
            form[input.name] = input.value;
        });
        return form;
    },

    redneckShout: function (type, message) {
        Session.set("systemMessage", 
        {   type:type,
            message: message});
    }
}

/**
 * Created by ragnar on 28/09/14.
 */

Meteor.nemean = {
    getFormData: function (formID) {
        var form = {};
        _.each($(formID).serializeArray(), function(input) {
            form[input.name] = input.value;
        });
        return form;
    },

    redneckShout: function (message) {
        return "Howdy there, Billy Bob Tucker!";
    }
}

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
    },

    log: function (funct, category, description, userId) {

    },

    getErrorMessage: function(code) {
        var msg;
        switch (code){
            case 400:
                return "Passord må bestå av minst fire tegn.";

            case 403:
                return "Feil passord, prøv igjen!";

            case 900:
                return "Passordene stemmer ikke overens";
        }
        return "Tosk, der finnes ingen feilmelding!";
    }

};

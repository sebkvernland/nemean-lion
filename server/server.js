
(function(Meteor){

    Reservations = new Meteor.Collection('reservations');


Meteor.startup(function () {
    
    console.log("Raaaaaaaawr! Lion is up!");
});

Reservations.allow({

    insert: function(seat) {
        return true;
    },

    remove: function() {
        return true;
    },

    update: function(seat) {
        return true;
    }
});

Meteor.publish("reservations", function() {
    return Reservations.find({});
});


Meteor.methods({
    methodName: function () {
        // ...
    }
});
}(Meteor));
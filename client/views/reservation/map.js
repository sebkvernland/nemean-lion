
(function(Meteor, _){

Reservations = new Meteor.Collection('reservations');

    Template.map.created = function() {
        Meteor.subscribe('reservations');
    };


    Template.map.helpers({
        rowEven: function() {
            return (this % 2) === 0;
        },

        map: function() {
            var mapConfig = {
                title: 'Hemnehallen',
                hasIle: true,
                sections: [1, 2],
                rows: [
                    {name: 'A'},
                    {name: 'B'},
                    {name: 'C'},
                    {name: 'D'},
                    {name: 'E'},
                    {name: 'F'},
                    {name: 'G'},
                    {name: 'H'},
                    {name: 'I'},
                    {name: 'J'}],
                seats: [1,2,3,4,5,6,7,8]
            };

            return createMap(mapConfig);
        }
    });

    Template.map.events({
       
        'click #reserveSeat': function(event, template) {
            var seated = isSeated(Meteor.userId());
            if(!seated && this.status === "available") {
                Session.set("clickedSeat", this.id);
                Router.go("reserveSeat");
            }
        },

        'click .currentUser': function() {
            Session.set("clickedSeat", this);
            console.log(this);
                Router.go("deleteReservation");
        }

    });

    Template.reserveSeat.events({
       'submit form': function(event, template){

            var pwd = Package.sha.SHA256($('#usrPassword').val());
            Meteor.call('authenticateUser', pwd, function(error, result) {
                if (result.error) {
                    Meteor.nemean.redneckShout(ALERT.E, Meteor.nemean.getErrorMessage(result.error.error));
                    return;
                }

                if (result) {
                    Session.set("systemMessage", undefined);
                    var seat = Session.get("clickedSeat");
                    reserveSeat(Meteor.userId(), seat);
                    Router.go("map");
                }
                
            });
            event.preventDefault();
        }
    });

    Template.deleteReservation.events({
       'submit form': function(event, template){

            var pwd = Package.sha.SHA256($('#usrPassword').val());
            Meteor.call('authenticateUser', pwd, function(error, result) {
                if (result.error) {
                    Meteor.nemean.redneckShout(ALERT.E, Meteor.nemean.getErrorMessage(result.error.error));
                    return;
                }

                if (result) {
                    Session.set("systemMessage", undefined);
                    var clickedSeat = Session.get("clickedSeat"),
                    seat = findSeat(clickedSeat.id);
                    Reservations.remove({_id: seat._id});
                    Router.go("map");
                }
                
            });
            event.preventDefault();
        }
    });


    function createMap(mapConfig) {
        var map = {};
        var sections = [];
        map.title = mapConfig.title;
        _.each(mapConfig.sections, function(sect){
            var rows = [],
            section = {};
           _.each(mapConfig.rows, function(r){
                var seats = [],
                row = {};

                _.each(mapConfig.seats, function(s){
                    var seatId = r.name + sect + "-" +s,
                    seat = Reservations.findOne({reservationId: seatId}),
                    status = "";

                    if(seat) {
                        status = "unavailable";
                    }
                    if(seat && seat.userId === Meteor.userId()){
                        status = "currentUser";
                    }

                    if(!seat) {
                        status = "available";
                    }
                    seat = {id: seatId, status: status};
                    seats.push(seat);
                });
                row.name = r.name;
                row.seats = seats;
                rows.push(row);
            });
           section.rows = rows;
           sections.push(section);
        });

        map.sections = sections;
        return map;
    }

    function reserveSeat(uId, sId) {
        var seat = {
                reservationId: sId,
                status: 'unavailable',
                userId: uId
            };

        return Reservations.insert(seat);
    }

    function findSeat(seatId) {
        return Reservations.findOne({reservationId: seatId});
    }

    function isSeated(userId) {
        return Reservations.findOne({userId: userId});

    }

}(Meteor, _));
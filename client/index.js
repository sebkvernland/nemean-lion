(function (Meteor) {


    $(document).ready(function() {
        $("body").on('click', '.isParent', function(e){
            $(this).next('.submenu').slideToggle();
        });
    });


    Meteor.startup(function() {
        console.log("Nemean-lion is running at client!");
    });

    Router.configure({
        layoutTemplate: 'index',
        notFoundTemplate: 'notFound'
    });

    Router.map(function() {
        this.route('startPage', {path: '/'});
        this.route('about', {path: '/about'});
        this.route('registration', {path: '/user/registration'});
        this.route('R1Step1', {path:'/user/registration/R1Step1'});
        this.route('R1Step2', {path:'/user/registration/R1Step2'});
        this.route('map');
        this.route('seat', {path:'/map/seat' });
        this.route('article');
        this.route('info');
        this.route('compos');
        this.route('userPage',  {path: '/user/userPage'});
        this.route('userAdministration', {path:'/admin/userAdministration'});
        this.route('deleteMember', {path:'/user/deleteMember'});
        this.route('changePassword', {path: '/user/changePassword'});
        this.route('not_found');

    });



    Template.index.events({
        /** Hide displayMessage from view **/
        'click .register': function(event, template) {
            Router.go("user/registration");
        },

        'click .map': function(event, template) {
            Router.go("/map");
        },

        'click .info': function(event, template) {
            Router.go("/info");
        },

        'click .facebook': function(event, template) {
            Router.go("https://www.facebook.com/nemeanlan");
        },

        'click .clickable': function(event, templates) {
            var link = event.currentTarget.attributes.id.value;
            try { 
                Router.go(link);
              }
            catch(Error) {
                console.log(Error);
                Router.go("not_found");
              }
        }
    });

    Template.systemMessage.systemMessage =function () { return Session.get("systemMessage")};

    Template.systemMessage.visible = function () { 
        return Session.get("systemMessage") != null;
        };

// Dummy data
    Template.map.seats = [
        {status: "available"},
        {status: "unavailable"},
        {status: "available"},
        {status: "available"},
        {status: "available"},
        {status: "available"},
        {status: "available"},
        {status: "available"}
    ];


    Template.map.rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    Template.nav.menuItems = [
        {title: "Informasjon", link: "/info", menu: [
            {title: "Utstyrsliste", link: "/compos/cs"},
            {title: "Til foreldre", link: "/compos/sc2"},
            {title: "Reglement", link: "/compos/sc2"},
            {title: "Kontakt", link: "/compos/sc2"},
            {title: "Om oss", link: "/compos/sc2"}
        ]},
        {title: "Compo", link: "/compos", menu: [
            {title: "CS", link: "/compos/cs"},
            {title: "Starcraft", link: "/compos/sc2"},
            {title: "LoL", link: "/compos/sc2"}
        ]},
        {title: "Plasskart", link: "/map" },
        {title: "Til foreldre", link: "/parents" },
        {title: "Om oss", link: "/about" }
    ];

}(Meteor));
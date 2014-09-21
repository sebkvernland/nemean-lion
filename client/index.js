
(function (Meteor) {
	
	Meteor.startup(function() {
		console.log("Nemean-lion is running at client!");
	});
	
	Router.configure({
		layoutTemplate: 'main_template',
		notFoundTemplate: 'not_found'
	});

	Router.map(function() {
		this.route('start_page', {path: '/'});
		this.route('about', {path: '/about'});
		this.route('registration');
		this.route('R1Step1');
		this.route('R1Step2');
		this.route('R2Step1');
        this.route('map');
        this.route('seat');
		this.route('about');
		this.route('map');
		});

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

}(Meteor));
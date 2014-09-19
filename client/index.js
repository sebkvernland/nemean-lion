
(function (Meteor) {
	
	Meteor.startup(function() {
		console.log("Nemean Kiosk is running at client!");
	});
	
	Router.configure({
		layoutTemplate: 'main_template',
		notFoundTemplate: 'not_found'
	});

	Router.map(function() {
		this.route('start_page', {path: '/'});
		this.route('about', {path: '/about'});
		
		});


}(Meteor));
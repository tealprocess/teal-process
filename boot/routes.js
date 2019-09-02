
module.exports = function(app){

	app.get('/', function(req, res) {
		res.render('gassed');
	});

	app.get('/29-09', function(req, res) {
		res.render('29-09');
	});

	app.get('/new-home', function(req, res) {
		res.render('new-home');
	});

	// 404
	// always have this route last
	app.get('*', function(req, res){
	  	res.render('404');
	});

}

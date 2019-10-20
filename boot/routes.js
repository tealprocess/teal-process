
module.exports = function(app){

	app.get('/', function(req, res) {
		res.render('home');
	});

	app.get('/29-09', function(req, res) {
		res.render('29-09');
	});

	app.get('/gassed-up', function(req, res) {
		res.render('gassed-up');
	});

	// 404
	// always have this route last
	app.get('*', function(req, res){
	  	res.render('404');
	});

}

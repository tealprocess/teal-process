var request = require('request');
var logfmt = require('logfmt');
var bodyParser = require('body-parser');
var redirect = require('express-redirect');
var compression = require('compression');

module.exports = function(app){
	redirect(app); // just mounting the redirect plugin
	app.set('views', __dirname + '/../views');
	app.set('view engine', 'pug');
	app.locals.pretty = true;

	// logger
	app.use(logfmt.requestLogger());
	// for routing and rendering
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
	  extended: true
	}));

	app.use(compression());

	// setup static routes
	app.use("/public", app.express.static(__dirname + '/../public'));
	app.use("/js", app.express.static(__dirname + '/../public/js'));
	app.use("/css", app.express.static(__dirname + '/../public/css'));
	app.use("/img", app.express.static(__dirname + '/../public/img'));
	app.use("/fonts", app.express.static(__dirname + '/../public/fonts'));
	app.use("/audio", app.express.static(__dirname + '/../public/audio'));
}
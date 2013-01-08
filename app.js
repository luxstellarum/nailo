
/**
 * Module dependencies.
 */
/****
	by Team  Ilowa Nailo
	Min Jung Lee, Jun Hong Son, Yong Su Ahn, Hee Su Park
****/ 	
var express = require('express')
	, routes = require('./routes')
	, user = require('./routes/user')
	, http = require('http')
	, path = require('path')
	, mongoose = require('mongoose');

var api = require('./routes/api.js');
var adr = require('./routes/address.js');

var app = express();

mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/nailo');

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', { layout: false });
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	
	//session용
  app.use(express.cookieParser('mjjhyshs123151251201'));
  app.use(express.session());
  
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});



// app.get('/', routes.index);
app.get('/users', user.list);

adr(app);
api(app);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});

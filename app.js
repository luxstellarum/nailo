
/**
 * Module dependencies.
 */
 	
var express = require('express')
	, routes = require('./routes')
	, user = require('./routes/user')
	, http = require('http')
	, path = require('path');

var api = require('./routes/api.js');

var app = express();

var mongoose = require('mongoose'); //mongoose module 사용
mongoose.connect('mongodb://localhost/nailo'); //nailo db connect


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

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/mypage', routes.my);


api(app);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});

var jsdom = require('jsdom');
var MD5 = require('MD5');
var content;

module.exports = {
	me2day_get_url : function(req, res) {
		var url = "http://me2day.net/api/get_auth_url.xml?akey=6c85d3e6d8b2351f0db4a649aaf56c47";
		content = req.query.text_share;
		jsdom.env({
			html : url,
			scripts : ['https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js'],
			encoding : 'binary',
			done : function(err, window){ 	
				var $ = window.$;
				res.json( { url: $('url').text() } );
			}//end of done
		})//end of jsdom env
	}//end of me2day_get_url
	
	, me2day_get_callback : function(req,res){
		var result = req.query.result;
		var user_id = req.query.user_id;
		var user_key = req.query.user_key;

		if( result == "true"){
			var tmp = '25623798';
			var u_key = tmp + MD5(tmp + user_key);
			var akey= '6c85d3e6d8b2351f0db4a649aaf56c47';
			
			var new_url = 'http://me2day.net/api/create_post.xml?post[body]='+content+'&uid='+user_id+'&ukey='+u_key+'&akey='+akey;
			console.log(new_url);
			jsdom.env({
				html : new_url,
				scripts : ['https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js'],
				encoding : 'binary',
				done : function(err, window){ 	
					var $ = window.$;
					res.redirect('/');
				}//end of done
			})//end of jsdom env
		}
		else {
			
		}
	}	// end of me2day_get_callback
			
}		// end of module exports
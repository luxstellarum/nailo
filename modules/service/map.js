var jsdom = require('jsdom');

module.exports = {
	get_point : function(req, res) {
		var url = "http://openapi.map.naver.com/api/geocode.php?key=d6ebc311beeac40f91914fb491c7cb95&encoding=utf-8&coord=latlng&query=";
		url = url + req.body.location;
//		data['query'] = '경기도성남시정자1동25-1';

		jsdom.env({
			html : url,
			scripts : ['https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js'],
			encoding : 'binary',
			done : function(err, window){ 	
				var $ = window.$;
				res.json( { x : $('x').text(), y : $('y').text() });
			}//end of done
		})//end of jsdom env
	}//end of get_point
}
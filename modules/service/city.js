var city_db = require('../database/city.js');

module.exports = {
	add : function(req, res) {
		city_db.add(req.body, function(result){
			if(result == true) {
				res.json({result:true});
			}
			else {
				res.json({result:false});
			}
		});
	} // and of add	
	,remove : function(req, res) {
		city_db.remove(req.body.index, function(result){
			if(result == true) {
				res.json({result : true});
			}
			else {
				res.json({result : false});
			}
		});
	}//end of remove
	
	,modify : function(req, res) {
		var tmp = req.body;
		var update = {};
	
		update[city_name] = tmp.city_name;
		update[do_name] = tmp.do_name;
		update[station_names] = tmp.station_names;
		update[extra] = tmp.extra;
				
		city_db.update(tmp.index, update, function(result){
			if(result == true) {
				res.json({result: true});
			}
			else {
				res.json({result: false});
			}
		});
		
	}//end of modify
	
	,
	
}
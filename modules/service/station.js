var station_db = require('../database/station.js');

module.exports = {

	write : function (req, res) {
		station_db.add(req.body, function(result){
			if(result == true) {
				console.log('service/station.js, write success');
				res.json({result:true});
			}
			else {
				console.log('service/station.js, write fail');
				res.json({result:false});
			}
		});
	}//end of write

	,list : function(req, res) {
		var condition = {};
		condition[city_index] = req.body.city_index;
		station_db.get_list(condition, function(result){
			if(result != false) {
				console.log('service/station.js, list success');
				res.json(result);
			}
			else {
				console.log('service/station.js, list fail');
				res.json({result:false});
			}
		});//end of get_list
	}//end of list
	
	
	//city의 내용을 database에서 받아와서 결과에 따라 JSON형식으로 return
	,view : function(req, res) {
		var condition = {};
		condition[index] = req.body.index;
		
		station_db.get(condition, function(result){
			if(result != false) {
				console.log('service/station.js, view success');
				res.json(result);
			}//end of if
			else {
				console.log('service/station.js, view fail');
				res.json({result:false});
			}
		}); //end of get
	}//end of view

	,remove : function(req, res) {
		station_db.remove(req.body.index, function(result) {
			if(result == true) {
				console.log('service/station.js, remove success');
				res.json({result:true});
			}
			else {
				console.log('service/station.js, remove fail');
				res.json({result:false});
			}

		});
	}

	
}

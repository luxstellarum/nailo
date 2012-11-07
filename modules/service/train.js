var train_db = require('../database/train.js');

module.exports = {
	add : function(req, res) {
		train_db.add(req.body, function(result){
			if(result == true) {
				res.json({result:true});
			}
			else {
				res.json({result:false});
			}
		});
	} // and of add	
	,remove : function(req, res) {
		train_db.remove(req.body.index, function(result){
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
		
		update[url] = tmp.url;
		update[dept_station] = tmp.dept_station;
		update[arrv_station] = tmp.arrv_station;
		update[dept_time] = tmp.dept_time;
		update[arrv_time] = tmp.arrv_time;
		update[update_date] = new Date();
		
		train_db.update(tmp.index, update, function(result){
			if(result == true) {
				res.json({result: true});
			}
			else {
				res.json({result: false});
			}
		});
		
	}//end of modify
	
	/* 기차 시간 검색 등의 로직	파트 */
	
}
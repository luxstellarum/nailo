var train_db = require('../database/train.js');

module.exports = {
	write : function(req, res) {
		train_db.add(req.body, function(result){
			if(result == true) {
				res.json({result:true});
			}
			else {
				res.json({result:false});
			}
		});
	} // end of write	
	
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

	,view : function(req, res) {
		var condition = {};
		condition[index] = req.body.index;
		
		train_db.get(condition, function(result){
			if(result != false) {
				console.log('service/train.js, view success');
				res.json(result);
			}//end of if
			else {
				console.log('service/train.js, view fail');
				res.json({result:false});
			}
		}); //end of get
	}//end of view



	,list : function(req, res) {
		var condition = {};
		//condition[]; 추후 필요에 따라 추가
		train_db.get_list(condition, function(result){
			if(result != false) {
				console.log('service/train.js, list success');
				res.json(result);
			}
			else {
				console.log('service/train.js, list fail');
				res.json({result:false});
			}
		});//end of get_list
	}//end of list
	
	
	/* 기차 시간 검색 등의 로직	파트 */
	
}
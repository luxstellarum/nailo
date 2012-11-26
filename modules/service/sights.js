var sights_db = require('../database/sights.js');

var self = module.exports = {
	
	//관광지 작성
	write : function (req, res) {
		self.get_extra_to_array(req, function(req){
			sights_db.add(req.body, function(result){
				if(result == true) {
					console.log('service/sights.js, write success');
					res.json({result:true});
				}
				else {
					console.log('service/sights.js, write fail');
					res.json({result:false});
				}
			}); 		// end of add
		}); 		// end of get_extra_to_array
	}//end of write
	

	// city_extra -> array
	,get_extra_to_array : function(req, callback){
		var arr=[];
		arr = req.body.sights_extra.split(',');
		req.body.sights_extra = [];
		req.body.sights_extra = arr;
		callback(req);
	}


	//sights전체 목록을 받는다.
	,list : function(req, res) {
		var condition = {};
		condition[city_index] = req.body.city_index;
		board_db.get_list(condition, function(result){
			if(result != false) {
				console.log('service/sights.js, list success');
				res.json(result);
			}
			else {
				console.log('service/sights.js, list fail');
				res.json({result:false});
			}
		});//end of get_list
	}//end of list
	
	//sights 수정
	,modify : function(req, res) {
		var tmp = req.body;
		var update = {};
		
		update[name] = tmp.name;
		update[city_name] = tmp.city_name;
		update[times] = tmp.times;
		update[extra] = tmp.extra;

		sights_db.update(tmp.index, update, function(result){
			if(result == true) {
				console.log('service/sights.js, modify success');
				res.json({result:true});
			}
			else {
				console.log('service/sights.js, modify fail');
				res.json({result:false});
			}
		}); //end of update
	}//end of modify
	
	//sights의 내용을 database에서 받아와서 결과에 따라 JSON형식으로 return
	,view : function(req, res) {
		var condition = {};
		condition[index] = req.body.index;
		
		board_db.get(condition, function(result){
			if(result != false) {
				console.log('service/sights.js, view success');
				res.json(result);
			}//end of if
			else {
				console.log('service/sights.js, view fail');
				res.json({result:false});
			}
		}); //end of get
	}//end of view

	,remove : function(req, res) {
		board_db.remove(req.body.index, function(result) {
			if(result == true) {
				console.log('service/sights.js, remove success');
				res.json({result:true});
			}
			else {
				console.log('service/sights.js, remove fail');
				res.json({result:false});
			}

		});
	}
}
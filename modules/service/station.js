var station_db = require('../database/station.js');

module.exports = {

	add : function (req, res) {
		station_db.add(req.body, function(result){
			if(result == true) {
				console.log('service/board.js, write success');
				res.json({result:true});
			}
			else {
				console.log('service/board.js, write fail');
				res.json({result:false});
			}
		});
	}//end of write

	,list : function(req, res) {
		var condition = {};
		condition[city_index] = req.city_index;
		station_db.get_list(condition, function(result){
			if(result != false) {
				console.log('service/board.js, list success');
				res.json(result);
			}
			else {
				console.log('service/board.js, list fail');
				res.json({result:false});
			}
		});//end of get_list
	}//end of list
	
	//게시물 수정
	,modify : function(req, res) {
		var tmp = req.body;
		var update = {};

		update[station_name] = tmp.station_name;
		update[city_name] = tmp.city_name;
		update[city_index] = tmp.city_index;
		update[extra] = tmp.extra;
		update[website] = tmp.website;
		update[telephone] = tmp.telephone;
		update[train_type] = tmp.train_type;

		station_db.update(tmp.index, update, function(result){
			if(result == true) {
				console.log('service/board.js, modify success');
				res.json({result:true});
			}
			else {
				console.log('service/board.js, modify fail');
				res.json({result:false});
			}
		}); //end of update
	}//end of modify
	
	//게시물의 내용을 database에서 받아와서 결과에 따라 JSON형식으로 return
	,view : function(req, res) {
		var condition = {};
		condition[index] = req.body.index;
		
		station_db.get(condition, function(result){
			if(result != false) {
				console.log('service/board.js, view success');
				res.json(result);
			}//end of if
			else {
				console.log('service/board.js, view fail');
				res.json({result:false});
			}
		}); //end of get
	}//end of view

	,remove : function(req, res) {
		station_db.remove(req.body.index, function(result) {
			if(result == true) {
				console.log('service/board.js, remove success');
				res.json({result:true});
			}
			else {
				console.log('service/board.js, remove fail');
				res.json({result:false});
			}

		});
	}

	
}

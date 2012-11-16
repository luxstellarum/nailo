var board_db = require('../database/board.js');

module.exports = {
	//게시물 작성
	write : function (req, res) {
		board_db.add(req.body, function(result){
			if(result != false) {
				console.log('service/board.js, write success');
				res.json({result:true, index:result.index});
			}
			else {
				console.log('service/board.js, write fail');
				res.json({result:false});
			}
		});
	}//end of write
	
	//게시물 전체 목록을 받는다.
	,list : function(req, res) {
		var current_page = req.body.current_page || 1;
		var paging_size = 10;
		board_db.get_list(current_page, paging_size, function(result){
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
		
		update[province] = tmp.province;
		update[city] = tmp.city;
		update[time_start] = tmp.time_start;
		update[time_end] = tmp.time_end;
		update[location] = tmp.location;
		update[what] = tmp.what;
		update[population] = tmp.population;
		update[subject] = tmp.subject;
		update[date] = tmp.date;

		board_db.update(tmp.index, update, function(result){
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
		condition['index'] = req.body.index;
		
		board_db.get(condition, function(result){
			if(result != false) {
				console.log('service/board.js, view success');
				result['result'] = true;
				res.json(result);
			}//end of if
			else {
				console.log('service/board.js, view fail');
				res.json({result:false});
			}
		}); //end of get
	}//end of view

	,remove : function(req, res) {
		board_db.remove(req.body.index, function(result) {
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
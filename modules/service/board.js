var board_db = require('../database/board.js');

module.exports = {
	write : function (req, res) {
		board_db.add(req.body, function(result){
			if(result == true) {
				console.log('service/board.js, write success');
				res.render({result:true});
			}
			else {
				console.log('service/board.js, write fail');
				res.render({result:false});
			}
		});
	}//end of write
	
	,list : function(req, res) {
		var current_page = req.body.current_page | 1;
		var paging_size = 10;
		board_db.get_list(current_page, paging_size, function(result){
			if(result != false) {
				console.log('service/board.js, list success');
				res.render(result);
			}
			else {
				console.log('service/board.js, list fail');
				res.render({result:false});
			}
		});//end of get_list
	}//end of list
	
	,modify : function(req, res) {
		
	}//end of modify
	
	//게시물의 내용을 database에서 받아와서 결과에 따라 JSON형식으로 return
	,view : function(req, res) {
		var condition = {};
		condition[index] = req.body.index;
		
		board_db.get(condition, function(result){
			if(result != false) {
				console.log('service/board.js, view success');
				res.render(result);
			}//end of if
			else {
				console.log('service/board.js, view fail');
				res.render({result:false});
			}
		}); //end of get
	}//end of view
	
	,
	
}
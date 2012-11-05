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
	
	,list : function() {
		
	}//end of list
	
	,modify : function() {
		
	}//end of modify
	
	//게시물의 내용을 database에서 받아와서 결과에 따라 JSON형식으로 return
	,view : function(req, res) {
		var condition = {};
		condition[index] = req.body.index;
		
		board_db.get(condition, function(result){
			if(result != false) {
				res.render(result);
			}//end of if
			else {
				res.render({result:false});
			}
		}); //end of get
	}//end of view
	
	,
	
}
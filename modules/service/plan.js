var plan_db = require('../database/plan.js');

module.exports = {
	
	// 플랜 작성
	write: function(req, res){
		if(req.body.index==0) {
			plan_db.add(req, function(result){
				if(result.result == true){
					console.log('service/plan.js, write_success');
					res.json(result);
				}
				else{
					console.log('service/plan.js, write._fail');
					res.json({result:false});
				}
			}); 	// end of add
		}//end of if

		else {
			var update = {};
			update['subject'] = req.body.subject;
			update['data'] = req.body.data;
			plan_db.update( req.body.index, update, function(result) {
				if(result.result == true){
					console.log('service/plan.js, write_success');
					res.json(result);
				}
				else{
					console.log('service/plan.js, write._fail');
					res.json({result:false, index : req.body.index});
				}
			});
		}
			
	}	// end of write
	
	
	// 플랜 전체 목록 받기
	,list: function(req, res){
		var current_page = req.body.current_page || 1;
		var paging_size = 10;
		var condition = {};
		condition['id'] = req.session.userid;
		plan_db.get_list(condition, current_page, paging_size, function(result){
			if(result != false){
				console.log('service/plan.js, list_success');
				res.json(result);
			}
			else{
				console.log('service/plan.js, list_fail');
				res.json({result:false});
			}
		}); 	// end of get_list
	}		// end of list
	
	
	// 플랜 수정
	,modify: function(req,res){
		var tmp = req.body;
		var update = {};
		
		update['id']=tmp.id;
		update['subject']=tmp.subject;
		update['date']=tmp.date;
		
		plan_db.update(tmp.index, update, function(result){
			if(result == true){
				console.log('service/plan.js, modify_success');
				res.json({result:true});
			}
			else {
				console.log('service/plan.js, modify_fail');
				res.json({result:false});
			}
		}); 	// end of update
	}		// end of modify것

	// 플랜 보기, 플랜의 내용을 database 에서 받아와서 결과에 따라 JSON으로 리턴
	,view: function(req, res){
		var condition = {};
		condition['index'] = req.body.index ;
		console.log('call view');
		plan_db.get(condition, function(result){
			if(result != false){
				console.log('service/plan.js, view_success');
				res.json(result);
			}
			else {
				console.log('service/plan.js, view_fail');
				res.json({result:false});
			}
		});		// end of get
	}		// end of view
	
	// 플랜 삭재
	,remove: function(req, res){
		plan_db.remove(req.body.index, function(result){
			if(result == true){
				console.log('service/plan.js, remove_succeess');
				res.json({result:true});
			}
			else{
				console.log('serviec/plan.js, remove_fail');
				res.json({result:false});
			}
		}); // end of remove
	}		// end of remove
	
	
}	// end of module exports

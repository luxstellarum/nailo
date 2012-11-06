var member_db = requie('../database/member.js');

module.exports = {
	
	// 회원 등록
	join : function(req, res){
		member_db.add(req.body, function(result){
			if(result == true){
				console.log('service/member.js, join_success');
				res.json({result:true});
			}
			else {
				console.log('service/board.js, join_fail');
				res.json({result:false});
			}
		}); 	// end of add
	}		// end of join
	
	
	// 회원 정보 수정
	,modify : function(req, res) {
		var tmp = req.body;
		var update = {};
		
		update[name] = tmp.name;
		update[sex] = tmp.sex;
		update[pw] = tmp.pw;
		
		member_db.update(tmp.id, update, function(result){
			if(result == true) {
				console.log('service/member.js, modify_success');
				res.json({result:true});
			}
			else {
				console.log('service/member.js, modify_fail');
				res.json({result:false});
			}
		});		// end of update
	}		// end of modify


	// 히원 정보 삭제
	,remove : function(req, res){
		member_db.remove(req.body.id, function(result){
			if(result == true){
				console.log('service/member.js, remove_success');
				res.json({result:true});
			}
			else {
				console.log('service/member.js, remove_fail');
				res.json({result:false});
			}
		});  // end of remove		
	}		// end of remove
		
		
}

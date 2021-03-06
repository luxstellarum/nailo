var member_db = require('../database/member.js');

module.exports = {
	
	// 회원 등록
	join : function(req, res){
		member_db.add(req.body, function(result){
			req.session.userid = req.body.id;
			req.session.name = req.body.name;
			req.session.sex = req.body.sex;

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
		update[bookmark] = tmp.bookmark;
		
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
	
	
	// 로그인 기능
	,login: function(req, res){
		member_db.get({id: req.body.id}, function(member){
			if(member){
				if(req.body.pw == member.pw){
					req.session.userid = member.id;
					req.session.name = member.name;
					req.session.sex = member.sex;
					res.json({result: true, user: member});					
				}
				else {
					res.json({result: false, message: "패스워드가 일치하지 않습니다."});
				}
			}
			else {
				res.json({result: false, message: "존재하지 않는 회원입니다."});
			}
		}); 	// end of get
	}	// end of login
	

	,logout: function(req, res){
		req.session.userid = null;
		res.json({result:true, message: "정상적으로 로그아웃 되었습니다."});	
	}

	,get_login_information : function(req, res) {
		if(req.session.userid != null ) {
			res.json({ user_id : req.session.userid,
						nickname : req.session.name,
						sex: req.session.sex,
						message : "로그인 정보를 반환합니다."});
		}
		else {
			res.json({message : "로그인 정보가 없습니다."});
		}
	}


}		// end of module exports


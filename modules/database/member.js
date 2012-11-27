// Mongoose DB
var mongoose = require('mongoose');		// mongoose module 사용
var Schema = mongoose.Schema;				// mongoose.Schema 객체 선언

// member schema 의 정의
var member_schema = new Schema({
	id: String,
	name: String,
	sex: Boolean,
	pw: String	,
	bookmark: Array
}); 		// end of member_schema 

var documents = mongoose.model('members', member_schema);	// db 삽입을 위한 모델 선언

module.exports = {
	// member 를 생성하여 DB 에 넣는다.
	// 성공하면 true, 실패하면 false 반환
	add: function(member, callback)  {
		var self = this;	
		var doc = new documents();
		
		// 값 넣기
		doc.id = member.id;
		doc.name = member.name;
		doc.sex = member.sex;
		doc.pw = member.pw;
		doc.bookmark = member.bookmark;
		
		doc.save(function(err){
			if(!err){
				console.log('member_save_success');
				callback(true);
			}	// end of if
			else {
				console.log('member_save_fail');
				callback(false);
			}	// end of else
		});	// end of save
	}	// end of add 
	
	
	// 회원의 id 를 받아와서 데이터베이스에서 해당 id와 일치하는 멤버의 정보를 획득.
	// 성공시, 결과값(JSON) 반환, 실패하면 null 반환
	,get: function(condition, callback) {		
		console.log('member.js get : ', condition);
		documents.findOne(condition, function(err, result){
			if(result) {
				console.log('member_get_success');
				callback(result);
			} // end of if
			else {
				console.log('member_get_fail');
				callback(false);
			}	// end of else			
		}); // end of findOne		
	} // end of get
	
	// 회원 id에 맞는 값을 수정한다.
	// 성공시, true, 실패시, false 반환
	,modify: function(id, modify, callback){
		var condition = {id: id};
		console.log(id, modify);
		documents.update(condition, modify, null, function(err){
			if(!err){
				console.log('member_modify_success');
				callback(true);
			}	// end of if
			else {
				console.log('member_modify_fail');
				callback(false);
			} 	// end of else	
		}); // end of update
	}	// end of modify
	
	// 회원 id 중복체크. 중복인 경우 false 를 리턴, 아닌 경우, true 리턴
	,check_id: function(id, callback){
		documents.count({id: id}, function(result){
			if( 0 == result){
				callback(true);
			}	// end of if
			else {
				callback(false);
			}	// end of elsㅈe
		}); 	// end of count
	}	// end of check_id
	
	
	//회원삭제를 한다.
	// 성공시, true 리턴, 실패시, false 리턴
	,remove: function(id, callback){
		var condition = {id: id};
		documents.remove(condition, function(err){
			if(!err){
				console.log('member_remove_success');
				callback(true);
			}	//end of if
			else {
				console.log('member_remove_fail');
				callback(false);
			} // end of else
		})	// end of remove
	} // end of remove
	
	
	

}	// end of module export


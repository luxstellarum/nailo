
var mongoose = require('mongoose'); //mongoose module 사용
var schema = mongoose.Schema; // mongoose.schema 획득

//community board schema 정의
var board_schema = new schema({
	id : String,
	province : String,
	city : String,
	event_month : Number,
	event_day : Number,
	start_hour : Number,
	end_hour : Number,
	start_minute : Number,
	end_minute : Number,
	location : String,
	what : String,
	population : Number,
	subject : String,
	contents : String,
	index : Number,
	date : Date
});//end of board_schema

var documents = mongoose.model('board', board_schema);//DB 삽입위한 모델 생성

module.exports = {

	//board를 생성하여 DB에 넣는다. 성공하면 true, 실패하면 false 반환
	add : function(board, callback) {
		var self = this;
		var doc = new documents();		
		//값 넣기
		self.get_index(function(result){
			if(result != false) {
				doc.index = result;
				doc.id = board.id;
				doc.province = board.province;
				doc.city = board.city;
				doc.event_month = board.event_month;
				doc.event_day = board.event_day;
				doc.start_hour = board.start_hour;
				doc.end_hour = board.end_hour;
				doc.start_minute = board.start_minute;
				doc.end_minute = board.end_minute;
				doc.location = board.location;
				doc.what = board.what;
				doc.population = board.population;
				doc.subject = board.subject;
				doc.contents = board.contents;
				doc.date = new Date();

				doc.save(function(err){
					if(!err){
						callback({result:true, index:doc.index});
					}//end of if
					else {
						callback(false);
					}//end of else
				}); //end of save
			}
		});
		
	}//end of add_board
	
	//새 글이 가질 index를 반환해준다.
	,get_index : function(callback) {
		documents.findOne({}, function(err, result){
			if(!err) {
				console.log('result : ', result);
				if(result != null) {
					callback(result.index + 1);
				}
				else {
					callback(1); 
				}
			}
			else {
				console.log('get_index : error(01)');
				callback(false);
			}
		});
	}
	
	//게시판 id를 받아와서 해당 id와 일치하는 게시판의 정보를 획득한다.
	//성공하면 결과값(JSON) 반환, 실패하면 null 반환
	,get : function(condition, callback) {
		documents.findOne(condition, function(err, result) {
			if(result) {
				callback(result);
			}//end of if
			else {
				console.log('dao.boards.get_board : get_board fail');
				callback(false);
			}//end of else
		});//end of findOne
	}//end of get_board
	
	//게시판 전체를 삭제한다.
	//성공하면 true, 실패하면 false 반환
	,remove : function(index, callback) {
		var condition = { index : index };
		documents.remove(condition, function(err){
			if(!err) {
				console.log('dao.boards.del_board : del_board success');
				callback(true);
			}//end of if
			else {
				console.log('dao.boards.del_board : del_board fail');
				callback(false);
			}//end of else
		});//end of remove
	}//end of remove
	
	//게시판의 설정값들을 업데이트한다.
	//성공하면 true, 실패하면 false 반환
	,update : function(index, update, callback) {
		var condition = { index : index };

		documents.update(condition, update, null, function(err) {
			if(!err){
				console.log('dao.boards.update_board : update_board success', condition, update);
				callback(true);
			}//end of if
			else{
				console.log('dao.boards.update_board : update_board fail', condition, update, err);
				callback(false);
			}//end of else
		});//end of update
	}//end of update_board
	
	,get_list : function(current_page, paging_size, callback) {
		var skip_size = (current_page * paging_size) - paging_size;
		
		documents.find({}).sort('date -1').skip(skip_size).limit(paging_size).exec(function(err, docs){
			if(!err) {
				callback(docs);
			}//end of if
			else {
				console.log('dao.boards.get_board_list : fail');
				callback(false);
			}//end of else
		});//end of find
	}//end of get_board_list
	
	/*
		유효성 검사 등등의 로직들
	*/
	
	//게시판 id 중복체크. 중복인 경우  false를 리턴. 아닌 경우 true리턴
	,check_overlap : function(id, callback) {
		documents.count({id : id}, function(result){
			if(0 === result) {
				callback(true);
			}
			else {
				callback(false);
			}
		}); //end of count
	}//end of check_overlap
}//end of module export

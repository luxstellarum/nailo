// Mongoose DB
var mongoose = require('mongoose');		// mongoose module 사용
var schema = mongoose.Schema;				// mongoose.Schema 객체선언

//  comment schema 의 정의
var comment_schema = new schema({
	name: String,
	content: String,
	index_board: Number,
	index: Number,
	date: Date
});		// end of comment_schema

var documents = mongoose.model('comments', comment_schema);		// DB 삽입 위한 모델

module.exports = {


	// comment 를 생성하여 DB 에 넣는다.
	// 성공하면 true, 실패하면, false 반환
	add: function(comment, callback){
		var self = this;
		var doc = new documents();
		
		// 값 넣기
		self.get_index(function(result){
			if(result != false) {
				doc.name = comment.name;
				doc.content = comment.content;
				doc.index_board = comment.index_board;
				doc.date = comment.date;
				doc.index = result;
				
				doc.save(function(err){
					if(!err){
						console.log('comment_add_success');
						callback(true);
					}	// end of if
					else {
						console.log('comment_add_fail');
						callback(false);
					}	// end of else
				}); // end of save
			}
		});
		
	}	// end of add
	
	// 새로운 댓글이 가지 index를 부여한다.
	,get_index : function(callback) {
		documents.findOne({}).sort('-index').exec(function(err, result){
			if(!err) {
				if(result != null) {
					callback(parseInt(result.index,10) + 1);
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
	}	// end of get_index
	
	
	// 게시물 id에 맞는 데이터베이스에서 해당 id 와 일치하는 댓글의 정보를 획득
	// 성공시, 결과값 (JSON) 반환, 실패하면 null 반환
	,get: function(condition, callback) {
		documents.findOne(condition, function(err, result){
			if(result){
				console.log('comment_get_success');
				callback(result);
			} 	// end of if
			else {
				console.log('comment_get_fail_');
				callback(false);
			}	// end of else
		}); 	// end of findOne
	} // end of get
	
	
	// 댓글 삭제를 한다.
	// 성공시, true 리턴, 실패시 false 리턴
	,remove: function(index, callback){
		var condition = { index: index};
		documents.remove(condition, function(err){
			if(!err){
				console.log('comment_remove_success');
				callback(true);
			}
			else {
				console.log('comment_remove_fail');
				callback(false);
			}
		})	// end of remove
	}	// end of remove
	
	
	// 댓글을 수정한다.
	// 성공시, true, 실패시 false 반환
	,modify: function(index, modify, callback){
		var condition = {index : index};
		console.log(index, modify);
		documents.update(condition, modify, null, function(err){
			if(!err){
				console.log('comment_modify_success');
				callback(true);
			}
			else{
				console.log('comment_modify_fail');
				callback(false);
			}
		});	// end of update
	}	// end of modify
	
	
	// 게시물 index 에 맞는 댓글 목록을 가져온다.
	// 성공시, docs, 실패시 false 반환
	,get_list: function(index_board, current_page, paging_size, callback){
		var skip_size = (current_page * paging_size) - paging_size;
		
		documents.find({index_board : index_board}).sort('-index').skip(skip_size).limit(paging_size).exec(function(err,docs){
			if(!err){
				callback(docs);
			}
			else {
				console.log('get_list : fail');
				callback(false);
			}
		}); 		// end of find
	}		// end of get_list
	
	
}	// end of module export

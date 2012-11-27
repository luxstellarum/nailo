// mongoose db
var mongoose = require('mongoose');	// mongoose module 사용
var Schema = mongoose.Schema;			// mongoose.Schema 객체 선언


/*
	[ { type : train / sights,
		name : train name / sights name,
		period : NUMBER,
		start_time : NUMBER },
	
		{ type : train / sights,
		name : train name / sights name,
		period : NUMBER,
		start_time : NUMBER },
		...
	 ]
*/
// plan Schema 정의
var plan_schema = new Schema({
	id : String,		// 사용자  id
	index : Number,
	subject: String, // plan이름
	data : Array,		// 이차원 배열로 데이터는 JSON으로 담긴다, 나의 여행 정보
						// type 으로 기차/도시/관광지/메모 구분

});		// end of plan_schema


var documents = mongoose.model('schedules', plan_schema);
// db 삽입을 위한 모델 선언

module.exports = {
	
	// plan 생성하여 db 에 넣는다.
	add : function(plan, callback){
		var self = this;
		var doc = new documents();
		
		self.get_index(function(result){
			if(result != false) {
				// 값 넣기
				doc.id = plan.id;
				doc.index = result;
				doc.subject = plan.subject;
				doc.data = plan.data;
				
				doc.save(function(err){
					if(!err){
						callback(true);
					}
					else{
						callback(false);
					}
				}); 	// end of save
			}
		});
		
	}	// end of add


	// 새 plan 이 가질 index를 부여한다.
	,get_index : function(callback) {
		documents.findOne({}, function(err, result){
			if(!err) {
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
	}	// end of get_index
	
	
	// 각 plan 의 index 를 받아아서 해당 id와 일치하는 plan 의 정보를 획득한다.
	,get: function(condition, callback){
			var condition = { index: index};
			documnets.find(condition, function(err, result){
				if(result){
					callback(result);
				}
				else {
					console.log('plan.js : get_fail');
					callback(false);
				}
			}); 	// end of findOne
	}	// end of get
	
	
	// plan을 삭제
	,remove: function(index, callback){
		var condition = {index : index};
		documents.remove(condition, function(err){
			if(!err){
				console.log('plan.js : remove_success');
				callback(true);
			}
			else {
				console.log('plan.js : remove_fail');
				callback(false);
			}
		}); 	// end of remove
	}	// end of remove
	
		
	// plan 정보를 업데이한다.
	,update: function(index, update, callback){
		var condition = {index: index};
		
		documents.update(condition, update, null, function(err){
			if(!err){
				console.log('plan.js : update_success');
				callback(true);
			}
			else{
				console.log('plan.js : update_fail');
				callback(false);
			}
		}); 	// end of update
	}	// end of update
	
	
	// plan의 목록에 대한 정보를 획득한다.
	,get_list: function(current_page, paging_size, callback){
		var skip_size = (current_page * paging_size) - paging_size;
		
		documents.find({}).sort('-index').skip(skip_size).limit(paging_size).exec(function(err, docs){
			if(!err){
				callback(docs);
			}
			else {
				console.log('plan.js : get_list_fail');
				callback(false);
			}
		}); 	// end of find
	}	// end of get_list
	
	
	// plan 의 subject 중복 체크,
	// 중복이면 false 리턴, 아니면 true 리턴.
	,check_overlap: function(id, callback){
		documents.count({subject:subject}, function(result){
			if( 0 == result){
				callback(true);
			}
			else{
				callback(false);
			}
		}); 	// end of count
	}	// end of check_overlap
}	// end of module exports

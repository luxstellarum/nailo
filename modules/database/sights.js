var mongoose = require('mongoose'); //mongoose module 사용
var schema = mongoose.Schema; // mongoose.schema 획득

var sights_schema = new schema({
	index : Number,
	sights_name : String,
	city_name : String,
	city_index : Number,
	sights_extra : Array
});//end of sights_schema

var documents = mongoose.model('sights', sights_schema);//DB 삽입위한 모델 생성

module.exports = {

	add : function(sights, callback) {
		var self = this;
		var doc = new documents();		
		//값 넣기
		self.get_index(function(result){
			if(result != false) {
				doc.index = result;
				doc.sights_name = sights.sights_name;
				doc.city_name = sights.city_name;
				doc.city_index = sights.city_index;
				doc.sights_extra = sights.sights_extra;

				doc.save(function(err){
					if(!err){
						callback(true);
					}//end of if
					else {
						callback(false);
					}//end of else
				}); //end of save
			}
		});
		
	}//end of add_sights
	
	,get_index : function(callback) {
		documents.findOne({}).sort('-date').exec(function(err, result){
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
	}
	
	,get : function(condition, callback) {
		documents.find(condition, function(err, result) {
			if(result) {
				callback(result);
			}//end of if
			else {
				console.log('database/sights.js : get fail');
				callback(false);
			}//end of else
		});//end of findOne
	}//end of get_sights
	
	//게시판 전체를 삭제한다.
	//성공하면 true, 실패하면 false 반환
	,remove : function(index, callback) {
		var condition = { index : index };
		documents.update(condition, update, null, function(err){
			if(!err) {
				console.log('database/sights.js : remove success');
				callback(true);
			}//end of if
			else {
				console.log('database/sights.js : remove fail');
				callback(false);
			}//end of else
		});//end of update
	}//end of del_sights
	
	//게시판의 설정값들을 업데이트한다.
	//성공하면 true, 실패하면 false 반환
	,update : function(index, update, callback) {
		var condition = { index : index };

		documents.update(condition, update, null, function(err) {
			if(!err){
				console.log('database/sights.js : update_sights success', condition, update);
				callback(true);
			}//end of if
			else{
				console.log('database/sights.js : update_sights fail', condition, update, err);
				callback(false);
			}//end of else
		});//end of update
	}//end of update_sights
	
	,get_list : function(condition, callback) {
		
		documents.find(condition, function(err, docs){
			if(!err) {
				callback(docs);
			}//end of if
			else {
				console.log('database/sights.js : fail');
				callback(false);
			}//end of else
		});//end of find
	}//end of get_sights_list
}//end of module export

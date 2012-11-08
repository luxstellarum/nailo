var mongoose = require('mongoose'); //mongoose module 사용
var schema = mongoose.Schema; // mongoose.schema 획득

var station_schema = new schema({
	index : Number,
	name : String,
	location : String,
	extra : String
});//end of station_schema

var documents = mongoose.model('station', station_schema);//DB 삽입위한 모델 생성

module.exports = {

	add : function(station, callback) {
		var self = this;
		var doc = new documents();		
		//값 넣기
		doc.index = self.get_index();
		doc.name = station.name;
		doc.location = station.location;
		doc.extra = station.extra;
						
		doc.save(function(err){
			if(!err){
				callback(true);
			}//end of if
			else {
				callback(false);
			}//end of else
		}); //end of save
	}//end of add_station
	
	,get_index : function() {
		documents.findOne({}).sort('index','-1').exec(function(err, result){
			if(!err) {
				if(result != null) {
					return (result.index + 1);
				}
				else {
					return 1; 
				}
			}
			else {
				console.log('get_index : error(01)');
				return false;
			}
		});
	}
	
	,get : function(condition, callback) {
		documents.find(condition, function(err, result) {
			if(result) {
				callback(result);
			}//end of if
			else {
				console.log('database/station.js : get fail');
				callback(false);
			}//end of else
		});//end of findOne
	}//end of get_station
	
	//게시판 전체를 삭제한다.
	//성공하면 true, 실패하면 false 반환
	,remove : function(index, callback) {
		var condition = { index : index };
		documents.update(condition, update, null, function(err){
			if(!err) {
				console.log('database/station.js : del_station success');
				callback(true);
			}//end of if
			else {
				console.log('database/station.js : del_station fail');
				callback(false);
			}//end of else
		});//end of update
	}//end of del_station
	
	//게시판의 설정값들을 업데이트한다.
	//성공하면 true, 실패하면 false 반환
	,update : function(index, update, callback) {
		var condition = { index : index };

		documents.update(condition, update, null, function(err) {
			if(!err){
				console.log('database/station.js : update_station success', condition, update);
				callback(true);
			}//end of if
			else{
				console.log('database/station.js : update_station fail', condition, update, err);
				callback(false);
			}//end of else
		});//end of update
	}//end of update_station
	
	,get_list : function(current_page, paging_size, callback) {
		var skip_size = (current_page * paging_size) - paging_size;
		
		documents.find({}).sort('date', -1).skip(skip_size).limit(paging_size).exec(function(err, docs){
			if(!err) {
				callback(docs);
			}//end of if
			else {
				console.log('database/station.js : fail');
				callback(false);
			}//end of else
		});//end of find
	}//end of get_station_list
}//end of module export

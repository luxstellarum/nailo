var mongoose = require('mongoose'); //mongoose module 사용
var schema = mongoose.Schema; // mongoose.schema 획득

var station_schema = new schema({
	index : Number, 
	station_name : String,
	city_name : String,
	city_index : Number,
	station_homepage : String,
	station_phone : String,
	train_type : String
});//end of station_schema

var documents = mongoose.model('station', station_schema);//DB 삽입위한 모델 생성

module.exports = {
	add : function(station, callback) {
		var self = this;
		var doc = new documents();		
		//값 넣기
		self.get_index(function(result){
			self.get_city_index({city_name : station.city_name}, function(result2){

			if(result !== false) {

				console.log(result, result2);
				if(result !== false) {

					doc.index = result;
					doc.station_name = station.station_name;
					doc.city_name = station.city_name;
					doc.city_index = result2;
					doc.station_homepage = station.station_homepage;
					doc.station_phone = station.station_phone;
					doc.train_type = station.train_type;
					
									
					doc.save(function(err){
						if(!err){
							callback(true);
						}//end of if
						else {
							callback(false);
						}//end of else
					}); //end of save

				}
			}
			
			});		// end of get_city_index
		});// end of get_index

	}//end of add_station
	
	,get_index: function(callback) {
		documents.findOne({}).sort('-index').exec(function(err, result){
			if(!err) {
				if(result !== null) {
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
	
	
	,get_city_index : function(condition, callback){
		var city_db = require('./city.js');
		console.log('city_db : ', city_db);
		city_db.get(condition, function(result){
			if(result){
				callback(result.index);
			}
			else{
				callback(false);
			}
		});// end of city.get
	}
	
	,get : function(condition, callback) {
		documents.findOne(condition, function(err, result) {
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
		documents.remove(condition, function(err){
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
	
	,get_list : function(condition, callback) {
		documents.find(condition, function(err, docs){
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

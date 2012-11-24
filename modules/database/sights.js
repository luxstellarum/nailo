var mongoose = require('mongoose'); //mongoose module 사용
var schema = mongoose.Schema; // mongoose.schema 획득
var city = require('./city.js');
var event_emitter = require('events').EventEmitter;

var sights_schema = new schema({
	index : Number,
	sights_name : String,
	city_name : String,
	city_index : Number,
	sights_extra : Array,
	station_name : String
});//end of sights_schema

var documents = mongoose.model('sights', sights_schema);//DB 삽입위한 모델 생성

module.exports = {

	add : function(sights, callback) {
		var self = this;
		var doc = new documents();		
		var evt = new event_emitter();
		
		//값 넣기
		self.get_index(function(result){
					
			self.get_city_index({city_name : sights.city_name}, function(result2){

				if(result != false) {
					doc.index = result;
					doc.sights_name = sights.sights_name;
					doc.city_name = sights.city_name;
					doc.city_index = result2;
					doc.sights_extra = sights.sights_extra;
					doc.station_name = sights.station_name;
	
					evt.on('set_search_db', function(evt, i){
						if(i<sights_extra.length){
							search_db.add(sights_extra[i], city_name);
							evt.emit('set_search_db', evt, ++i);
						}
						else{
							doc.save(function(err){
								if(!err){
									callback(true);
								}//end of if
								else {
									callback(false);
								}//end of else
							}); //end of save						
						}
					}); 		// end of evt.on
					evt.emit('set_search_db',evt, 0);
				} 		// end of if
			});		// end of get_city_index
		}); 	// end of get_index	
	}//end of add_sights


	,get_city_index : function(condition, callback){
		city.get(condition, function(result){
			if(result){
				callback(result.index);
			}
			else{
				callback(false);
			}		
		}); 		// end of city.get
	}	
		
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
		documents.findOne(condition, function(err, result) {
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

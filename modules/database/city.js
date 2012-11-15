var mongoose = require('mongoose'); //mongoose module 사용
var schema = mongoose.Schema; // mongoose.schema 획득

var city_schema = new schema({
	index : Number,
	city_name : String,
	do_name : String,
	station_names : String,
	extra : String
});//end of city_schema

var documents = mongoose.model('city', city_schema);//DB 삽입위한 모델 생성

module.exports = {

	add : function(city, callback) {
		var self = this;
		var doc = new documents();		
		//값 넣기
		self.get_index(function(result){
			if(result != false) {
				doc.index = result;
				doc.city_name = city.city_name;
				doc.do_name = city.do_name;
				doc.station_names = city.station_names;
				doc.extra = city.extra;
				
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
		
	}//end of add
	

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
	
	,get : function(condition, callback) {
		documents.findOne(condition, function(err, result) {
			if(result) {
				callback(result);
			}//end of if
			else {
				console.log('database/city.js : get fail');
				callback(false);
			}//end of else
		});//end of findOne
	}//end of get_city
	
	
	,remove : function(index, callback) {
		var condition = { index : index };
		documents.remove(condition, function(err){
			if(!err) {
				console.log('database/city.js : del_city success');
				callback(true);
			}//end of if
			else {
				console.log('database/city.js : del_city fail');
				callback(false);
			}//end of else
		});//end of update
	}//end of del_city
	
	
	,update : function(index, update, callback) {
		var condition = { index : index };

		documents.update(condition, update, null, function(err) {
			if(!err){
				console.log('database/city.js : update_city success', condition, update);
				callback(true);
			}//end of if
			else{
				console.log('database/city.js : update_city fail', condition, update, err);
				callback(false);
			}//end of else
		});//end of update
	}//end of update_city
	
	,get_list : function(condition, callback) {
		documents.find(condition, function(err, docs){
			if(!err) {
				callback(docs);
			}//end of if
			else {
				console.log('database/city.js : fail');
				callback(false);
			}//end of else
		});//end of find
	}//end of get_city_list
}//end of module export

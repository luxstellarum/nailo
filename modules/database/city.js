var mongoose = require('mongoose'); //mongoose module 사용
var schema = mongoose.Schema; // mongoose.schema 획득
var search_db = require('./search.js');
var event_emitter = require('events').EventEmitter;

var city_schema = new schema({
	index : Number,
	city_name : String,
	do_name : String,
	city_extra : Array
});//end of city_schema

var documents = mongoose.model('city', city_schema);//DB 삽입위한 모델 생성



module.exports ={

	add : function(city, callback) {
		var self = this;
		var doc = new documents();		
		var evt = new event_emitter();
		
		//값 넣기
		self.get_index(function(result){
			if(result != false) {
				doc.index = result;
				doc.city_name = city.city_name;
				doc.do_name = city.do_name;
				doc.city_extra = city.city_extra;
				
				console.log('haha',city);
				
				evt.on('set_search_db', function(evt, i){	
					if(i<city_extra.length){
						search_db.add(city_extra[i], city_name);
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
					
				}); 	// end of evt.on
				
				evt.emit('set_search_db', evt, 0);
			}
		});	// end of get_index
	}//end of add
	

	,get_index : function(callback) {
		documents.findOne({}).sort('-index').exec(function(err, result){
			if(!err) {
				if(result != null) {
					callback(result.index + 1);
				}//end of if
				else {
					callback(1); 
				}//end of else
			}//emd of if
			else {
				console.log('get_index : error(01)');
				callback(false);
			}//end of else
		});//end of findOne
	}//end of get_index
	
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

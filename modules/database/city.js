var mongoose = require('mongoose'); //mongoose module 사용
var schema = mongoose.Schema; // mongoose.schema 획득
mongoose.connect('mongodb://localhost/nailo'); //nailo db connect

var city_schema = new schema({
	index : Number,
	city_name : String,
	do_name : String,
	stations : String,
	extra : String
});//end of city_schema

var documents = mongoose.model('city', city_schema);//DB 삽입위한 모델 생성

module.exports = {

	add : function(city, callback) {
		var self = this;
		var doc = new documents();		
		//값 넣기
		doc.index = self.get_index();
		doc.city_name = city.city_name;
		doc.do_name = city.do_name;
		doc.stations = city.stations;
		doc.extra = city.extra;
		
		doc.save(function(err){
			if(!err){
				callback(true);
			}//end of if
			else {
				callback(false);
			}//end of else
		}); //end of save
	}//end of add_city
	

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
		documents.update(condition, update, null, function(err){
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
	
	,get_list : function(current_page, paging_size, callback) {
		var skip_size = (current_page * paging_size) - paging_size;
		
		documents.find({}).sort('date', -1).skip(skip_size).limit(paging_size).exec(function(err, docs){
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

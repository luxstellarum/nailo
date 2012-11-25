var mongoose = require('mongoose'); //mongoose module 사용
var schema = mongoose.Schema; // mongoose.schema 획득
var event_emitter = require('events').EventEmitter;

var graph_schema = new schema({
	station_1 : String, 
	station_2 : String
});//end of train_schema

var documents = mongoose.model('train_graph', train_schema);//DB 삽입위한 모델 생성

module.exports = {
	add : function (node, callback) {
		var doc = new documents();

		doc.station_1 = node.station_1;
		doc.station_2 = node.station_2;

		doc.save(function(err){
			if(!err) {
				callback(true);
			}
			else {
				callback(false);
			}
		})
	}//end of add

	,get : function (condition, callback ) {
		documents.find(condition,function(result) {
			if(result) {
				callback(result);
			}
			else {
				callback(false);
			}
		});//end of findOne
	}//end of get

	,remove : function(condition, callback) {
		//ToDo
	}

	,update : function(condition, callback) {
		//ToDo
	}
}//end of module.exports

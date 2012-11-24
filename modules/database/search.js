var mongoose = require('mongoose'); //mongoose module 사용
var schema = mongoose.Schema;	// mongoose.schema 획득
var event_emitter = require('events').EventEmitter;
var station_db = require('./station.js');
var sights_db = require('./sight.js');
var city_db = require('./city.js');



var search_schema = new schema({
	key: String,
	value: String
}); 	// end of search_schema

var documents = mongoose.model('search', search_schema);	// DB 삽입 위한 모델 생성

module.exports = {
	
	
	// 데이터베이스의 key: value를 추가해주는 함수
	add : function(key, value){
		documents.find({key: key, value: value}, function(err, result){
			if(!result){
				var doc = new documents();
				
				doc.key = key;
				doc.value = value;
				
				doc.save(function(err){
					if(!err){
						callback(true);
					}		// end of if
					else {
						callback(false);
					}		// end of else
				}); 	// end of save	
			}
			else{
				callback(false);
			}
		}); 		// end of find
	}		// end of add
	
	
	, seek : function(key, callback){

		var final_result={ };
		
			// city_name 를 검색하는 경우
			city_call({city_name : key}, function(tmp){
				
				final_result[city_extra] = tmp.city_extra;	
							
				station_call({city_name : key}, function(tmp){
					final_result[station_name] = tmp.station_name;
						
					sights_call({city_name: key}, function(tmp){
						final_result[sights_name] = tmp.sights_name;
						
						callback(final_result);
					}); 		// end of sights_call
				}); 	// end of station_call
			}); 	// end of city_call				
					
					
			// station_name 를 검색하는 경우
				station_call( {station_name : key}, function(tmp){
					final_result[city_name] = tmp.city_name;
					
					city_call( {station_name : key}, function(tmp){
						final_result[city_extra] = tmp.city_extra;
						
						sights_call( {station_name : key}, function(tmp){
							final_result[sights_name] = tmp.sights_name;
							
							callback(final_result);
						});		// end of sights_call
					}); 	// end of city_call
				}); 	// end of station_call			
			

			// sights_name를 검색한 경우
				sights_call( {sights_name: key}, function(tmp){
					final_result[city_name] = tmp.city_name;
					final_result[station_name] = tmp.station_name;
					final_result[sights_extra] = tmp.sights_extra;
					
					callback(final_result);
				}); 	// end of sights_call


			// extra 를 검색한경우
				documents.find({sights_extra: key}, function(err, final_result){
					if(result) {
						callback(final_result);
					}
					else{
						callback(false);
					}
				}); 	// end of fiind
				
	}	// end of seek
	
	, city_call : function(key, callback){
		city_db.get_list(condition, function(result){
			var tmp = {};
			tmp[city_extra] = [];
			evt.on('city_db_get_list', function(evt, i){
				if(i< result.length){
					if(i== 0){
						tmp[city_extra] = result[i].city_extra;
					}
					else {
						tmp[city_extra] += result[i].city_extra;
					}
					evt.emit('city_db_get_list', evt, ++i);
				}
				else { 
					callbakc(tmp);
				}
			});	 // end of evt.on
			evt.emit('city_db_get_list', evt, 0);
		});	 	// end of get_list
	} 		// end of city_call
	
	
	, station_call : function(key, callback){
		station_db.get_list( condition, function(result){
			var tmp = {};
			tmp[station_name] = [];
			evt.on('station_db_get_list', function(evt, i){
				if(i< result.length){
					if(i =0){
						tmp[station_name] = result[i].station_name;
						tmp[city_name]= result[i].city_name;
					}
					else {
						tmp[station_name] += result[i].station_name;
						tmp[city_name] += result[i].city_name;
					}
					evt.emit('station_db_get_list', evt, ++i);
				}
				else{
					callback(tmp);
				}	
			}); 	// end of evt.on
			evit.emit('station_db_get_list', evt, 0);
		}); 		// end of get_list
	}		// end of station_call
	
	, sights_call : function(key, callback){
		sights_db.get_list( condition, function(result){
			var tmp = {};
			tmp[sights_extra]= [];
			tmp[city_name] = [];
			tmp[sights_name] = [];
			evt.on('sights_db_get_list', function(evt, i){
				if(i < result.length){
					if(i=0){
						tmp[sights_extra] = result[i].sights_extra;
						tmp[city_name] = result[i].city_name;
						tmp[sights_name] = result[i].sights_name;
					}
					else {
						tmp += result[i].sights_extra;
						tmp += result[i].city_name;
						tmp += result[i].sights_name;

					}
					evt.emit('sights_db_get_list', evt, ++i);
				}
				else{
					callback(tmp);
				}
			}); 		// end of evt.on
		}); 	// end of get_list
	}		// end of sights_call
	
}

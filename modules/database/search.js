var mongoose = require('mongoose'); //mongoose module 사용
var schema = mongoose.Schema;	// mongoose.schema 획득
var event_emitter = require('events').EventEmitter;
// var station_db = require('./station.js');
// var sights_db = require('./sights.js');
// var city_db = require('./city.js');



var search_schema = new schema({
	key: String,
	value: String
}); 	// end of search_schema

var documents = mongoose.model('search', search_schema);	// DB 삽입 위한 모델 생성

var self = module.exports = {
	
	
	// 데이터베이스의 key: value를 추가해주는 함수
	add : function(key, value, callback){
		documents.find({key: key, value: value}, function(err, result){
			if(result.length == 0){
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
				console.log(result);
				callback(false);
			}
		}); 		// end of find
	}		// end of add
	
	

	, seek_keyword_type : function(key, callback){
		var station_db = require('./station.js');
		var sights_db = require('./sights.js');
		var city_db = require('./city.js');

		city_db.get({city_name : key}, function(result){
			console.log('database, search.js  :', result ,key);	
			if(result){
				console.log('database, search.js  :', result ,key);
				callback('f_city');
			}
			else{
				station_db.get( {station_name: key}, function(result){
				if(result){
						callback('f_station');
					}
					else{
						sights_db.get( {sights_name: key}, function(result){
							if(result){
								callback('f_sights');
							}
							else{
								callback('f_extra');
							}
						}); 	// end of sights_get
					}
				}); 	// end of station_get
			}
		}); 	// end of city_get
	}		// end of seek_keyword_type
	
	
	, seek : function(key, callback){
		var final_result={ };
		var self = this;
		self.seek_keyword_type(key, function(flag){

			console.log(flag);

			if(flag == 'f_city'){
				// city_name 를 검색하는 경우 flag='f_city'
				self.city_call(key, function(tmp){
					final_result['city_extra'] = [];
					final_result['city_extra'] = tmp.city_extra;
					console.log('in search js, seek, final_result city_extra', final_result, tmp);	
								
					self.station_call(key, function(tmp){
						final_result['station_name'] = [];
						final_result['station_name'] = tmp.station_name;
							
						self.sights_call(key, function(tmp){
							final_result['sights_name'] = [];
							final_result['sights_name'] = tmp.sights_name;
							
							callback(final_result);
						}); 		// end of sights_call
					}); 	// end of station_call
				}); 	// end of city_call				
			}		// end of flag f_city
			
			else if (flag == 'f_station'){
				// station_name 를 검색하는 경우 flag = 'station'
				self.station_call(key, function(tmp){
					final_result['city_name'] = [];
					final_result['city_extra'] = [];
					final_result['sights_name'] = [];

					final_result['city_name'] = tmp.city_name;
					
					self.city_call(key, function(tmp){
						final_result['city_extra'] = tmp.city_extra;
						
						self.sights_call( key, function(tmp){
							final_result['sights_name'] = tmp.sights_name;
							
							callback(final_result);
						});		// end of sights_call
					}); 	// end of city_call
				}); 	// end of station_call					
			}	// end of flag f_station
			
			else if (flag == 'f_sights'){
				// sights_name를 검색한 경우
				self.sights_call( key, function(tmp){
					final_result['city_name'] = [];
					final_result['station_name'] = [];
					final_result['sights_extra'] = [];
					final_result['city_name'] = tmp.city_name;
					final_result['station_name'] = tmp.station_name;
					final_result['sights_extra'] = tmp.sights_extra;
					
					callback(final_result);
				}); 	// end of sights_call

			}		// end of flag f_sights
			
			else if(flag == 'f_extra'){
				// extra 를 검색한경우
				documents.find({key: key}, function(err, final_result){
					console.log('final_result :', final_result);

					if(final_result) {
						console.log('abc__', final_result);
						callback(final_result);
					}
					else{
						callback(false);
					}
				}); 	// end of find
			}	// end of flag f_extra
			
			else {
				callback(false);
			}		// 검색결과 없음.
				
		});		// end of seek_keyword_type
		
	}	// end of seek
	
	
	
	// city database 에서의 검색
	, city_call : function(key, callback){
		var city_db = require('./city.js');
		var evt = new event_emitter();
		city_db.get_list({'city_name':key}, function(result){
			var tmp = {};
			
			tmp['city_extra'] = [];
			evt.on('city_db_get_list', function(evt, i){
				if(i < result.length){

					tmp['city_extra'] = tmp['city_extra'].concat(result[i].city_extra);
					console.log('in search js city_call', tmp);
					evt.emit('city_db_get_list', evt, ++i);
				}
				else { 
					callback(tmp);
				}
			});	 // end of evt.on
			evt.emit('city_db_get_list', evt, 0);
		});	 	// end of get_list
	} 		// end of city_call
	
	
	// station database 에서의 검색
	, station_call : function(key, callback){
		var station_db = require('./station.js');
		var evt = new event_emitter();
		console.log('station call', key);
		station_db.get_list({'station_name':key}, function(result){
			console.log('station call, result', result);
			var tmp = {};
			tmp['station_name'] = [];
			tmp['city_name'] = [];
			evt.on('station_db_get_list', function(evt, i){
				if(i< result.length){
					result[i].station_name += '역';
					if(i =0){
						tmp['station_name'] = result[i].station_name;
						tmp['city_name']= result[i].city_name;
					}
					else {
						tmp['station_name'] = tmp['station_name'].concat(result[i].station_name);
						tmp['city_name'] = tmp['city_name'].concat(result[i].city_name);
					}
					evt.emit('station_db_get_list', evt, ++i);
				}
				else{
					console.log('station call, tmp', tmp);
					callback(tmp);
				}	
			}); 	// end of evt.on
			evt.emit('station_db_get_list', evt, 0);
		}); 		// end of get_list
	}		// end of station_call


	// sights database 에서의 검색
	, sights_call : function(key, callback){
		var sights_db = require('./sights.js');
		var evt = new event_emitter();

		sights_db.get_list({'sights_name':key}, function(result){
			var tmp = {};
			tmp['sights_extra']= [];
			tmp['city_name'] = [];
			tmp['sights_name'] = [];
			evt.on('sights_db_get_list', function(evt, i){
				if(i < result.length){
					if(i=0){
						tmp['sights_extra'] = result[i].sights_extra;
						tmp['city_name'] = result[i].city_name;
						tmp['sights_name'] = result[i].sights_name;
					}
					else {
						tmp['sights_extra'] = tmp['sights_extra'].concat(result[i].sights_extra);
						tmp['city_name'] = tmp['city_name'].concat(result[i].city_name);
						tmp['sights_name'] = tmp['sights_name'].concat(result[i].sights_name);
					}
					evt.emit('sights_db_get_list', evt, ++i);
				}
				else{
					callback(tmp);
				}
			}); 		// end of evt.on
			evt.emit('sights_db_get_list', evt, 0);
		}); 	// end of get_list
	}		// end of sights_call
	
}

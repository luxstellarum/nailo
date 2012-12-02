var jsdom = require('jsdom');
var fs = require('fs');
var jquery_lib = fs.readFileSync("public/lib/jquery/jquery-1.8.3.js").toString();
var Iconv = require('iconv').Iconv;
var iconv = new Iconv('EUC-KR', 'UTF-8//TRANSLIT//IGNORE');
var train_db = require('../database/train.js');
var strlib = require('../lib/string.js');
var event_emitter = require('events').EventEmitter;
var station_db = require('../database/station.js');

module.exports = {
	write : function(data) {
		train_db.add(data, function(result){
			if(result != true) {
				console.log('error');
			}
		});
	} // end of write	
	
	,remove : function(req, res) {
		train_db.remove(req.body.index, function(result){
			if(result == true) {
				res.json({result : true});
			}
			else {
				res.json({result : false});				
			}
		});
	}//end of remove
	
	,modify : function(req, res) {
		var tmp = req.body;
		var update = {};
		
		update[url] = tmp.url;
		update[dept_station] = tmp.dept_station;
		update[arrv_station] = tmp.arrv_station;
		update[dept_time] = tmp.dept_time;
		update[arrv_time] = tmp.arrv_time;
		update[update_date] = new Date();
		
		train_db.update(tmp.index, update, function(result){
			if(result == true) {
				res.json({result: true});
			}
			else {
				res.json({result: false});
			}
		});
	}//end of modify

	,view : function(req, res) {
		var condition = {};
		condition[index] = req.body.index;
		
		train_db.get(condition, function(result){
			if(result != false) {
				console.log('service/train.js, view success');
				res.json(result);
			}//end of if
			else {
				console.log('service/train.js, view fail');
				res.json({result:false});
			}
		}); //end of get
	}//end of view



	,list : function(req, res) {
		var condition = {};
		//condition[]; 추후 필요에 따라 추가
		train_db.get_list(condition, function(result){
			if(result != false) {
				console.log('service/train.js, list success');
				res.json(result);
			}
			else {
				console.log('service/train.js, list fail');
				res.json({result:false});
			}
		});//end of get_list
	}//end of list
	
	/*************************************
		KTX : 301~316
		새마을 : 1001~1010, 1021~
	**************************************/
	/* 기차 시간 검색 등의 로직 파트 */
	,get_html : function(req, res) {
		var self = this;
		var uri_form = "http://www.korail.com/servlets/pr.pr11100.sw_pr11131_i1Svt?txtRunDt=20121107&txtTrnNo=";
		var train_number = 265;
		var evt = new event_emitter();
		var i = 0;
		
		evt.on('get_train_info', function(evt, uri, count){
			console.log(uri);
			var train_info = {};
			jsdom.env({
				html : uri,
				scripts : ['https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js'],
				encoding : 'binary',
				done : function(err, window){
					var $ = window.$;
					/***********차량 번호 따내기************/
					train_info['id'] = train_number + count;
					/***********************************/

					/***********차종 따내기****************/
					var tmp = strlib.trim($('thead tr:first').find('td').text());
					var buf = new Buffer(tmp.length);
					buf.write(tmp, 0, tmp.length, 'binary');
					tmp = iconv.convert(buf).toString();

					var split_str = tmp.split('[');
					
					tmp = strlib.trim(split_str[1]);
					split_str = tmp.split(']');

					train_info['type'] = strlib.trim(split_str[0]);
					/***********************************/
					
					/************출발시각 및 도착시각 따내기********************/
					$('tr[bgcolor="#FFFFFF"]').each(function(){
						self.make_train_contents(this, $, function(result){
							train_info['dept_station'] = result.dept_station;
							train_info['arrv_station'] = result.arrv_station;
							train_info['dept_time'] = result.dept_time;
							train_info['arrv_time'] = result.arrv_time;
							self.write(train_info);
						})
					});
					/****************************************************/
					if( (train_number + count) < 999) {
						evt.emit('get_train_info', evt, uri_form + "00" + (train_number+ (++count)), count);
					}
					else if ( train_number + count < 2000 ){
						evt.emit('get_train_info', evt, uri_form + "0" + (train_number+ (++count)), count);
					}
					else {
						res.json({result : true});
					}				
				}//end of done function
			});//end of jsdon.env
		});//end of evt.on

		evt.emit('get_train_info', evt, (uri_form + "00" + train_number) ,i);			
	}//end of get_html

	,make_train_contents : function(target, $, callback) {
		var tmp = '',
			buf,
			result = {};

		//출발역
		tmp = strlib.trim($(target).find('td:first').text());
		if(tmp!="") {
			buf = new Buffer(tmp.length);
			buf.write(tmp, 0, tmp.length, 'binary');
			result['dept_station'] = iconv.convert(buf).toString();

			tmp = strlib.trim($(target).find('td:first').parent().next().find('td:first').text());
			
			if(tmp!="") {
				buf = new Buffer(tmp.length);
				buf.write(tmp, 0, tmp.length, 'binary');
				result['arrv_station'] = iconv.convert(buf).toString();
				result['dept_time'] = strlib.trim($(target).find('td:first').next().next().text());
				result['arrv_time'] = strlib.trim($(target).find('td:first').parent().next().find('td:first').next().text());
			}
			else {
				result['arrv_station'] = "";
				result['arrv_time'] = "";
				result['dept_time'] = "";
			}
		}
		else {
			result['dept_station'] = "";	
		}

		callback(result);
	}

	,get_time_table : function(req, res) {
		var dept_station = req.body.dept_station;
		var arrv_station = req.body.arrv_station;
		var require_dept_time = req.body.dept_time || 0; //원하는 출발 시각 선택, 그럼 그 이후로 나옴
		var condition_1 = {};
		var time_table = [];
		var evt = new event_emitter();

		condition_1['dept_station'] = dept_station;
		console.log('get_time_table_ start', dept_station, arrv_station);

		train_db.get(condition_1, function(result){
			evt.on('get_time_table', function(evt, i, j){
				if(i < result.length) {
					//00시가 넘어가는건 다음날 검색으로 넘깁시다. 하
					if( parseInt( result[i].dept_time.split(':')[0], 10 ) >= require_dept_time ){
						var condition = {};
						condition['id'] = result[i].id;
						condition['arrv_station'] = arrv_station;
						train_db.get( condition, function(result2) {
							//그 기차 번호의 노선을 다 따와서 비교
							if( result2 != false) {
								console.log('1. result[i] : ', i, result[i]);
								console.log('2. result[0] : ', result2[0]);
								time_table[j] = {};
								time_table[j]['dept_time'] = result[i].dept_time;
								time_table[j]['arrv_time'] = result2[0].arrv_time;
								
								evt.emit('get_time_table', evt, ++i, ++j);
							}//end of if
							else {
								evt.emit('get_time_table', evt, ++i, j);
							}
						});//end of get
					}//end of if
				}//end of if
				else {
					console.log('table :', time_table);
					res.json(time_table);
				}
			});//end of evt.on
			evt.emit('get_time_table', evt, 0, 0);
		});//end of get
	}//end of get_time_table	

	,get_specific_time : function(dept_station, arrv_station, require_dept_time, callback) {
		var condition_1 = {};
		var time_table = {};
		var evt = new event_emitter();

		condition_1['dept_station'] = dept_station;
		console.log('in get_specific time, condition_1', condition_1);
		//출발 역이 dept station인 시간표를 DB에서 긁어온다. 
		train_db.get(condition_1, function(result){

			evt.on('get_specific_time_table', function(evt, i, j){
				if(i < result.length) {
					console.log('get specific time, in if', result[i]);
					if( (result[i].dept_time != '') && (parseInt( result[i].dept_time.split(':')[0], 10 ) >= require_dept_time) ){
						
						//출발 역이 일치하는 결과물의 '기차번호'를 획득하여 해당 노선에 도착역이 존재하는지를 체크
						var condition = {};
						condition['id'] = result[i].id;
						condition['arrv_station'] = arrv_station;
						console.log('service train.js condition ', condition);
						train_db.get( condition, function(result2) {
							//근데 왜 결과가 안나오는 것 같지? -__ㅠ
							console.log('get_specific_time', result2);
						//그 기차 번호의 노선을 다 따와서 비교
							if( result2.length > 0) {
								time_table['dept_station'] = dept_station;
								time_table['arrv_station'] = arrv_station;
								time_table['dept_time'] = result[i].dept_time;
								time_table['arrv_time'] = result2[0].arrv_time;
								time_table['time_required'] = parseInt(time_table.arrv_time.split(':')[0], 10 ) - parseInt(time_table.dept_time.split(':')[0], 10 );
								//evt.emit('get_specific_time_table', evt, ++i, ++j);
								callback(time_table);
							}//end of if
							else {
								evt.emit('get_specific_time_table', evt, ++i, j);
							}
						});//end of get
					}//end of if
					else {
						evt.emit('get_specific_time_table', evt, ++i, j);
					}
				}
				else {
					callback(false);
				}
			});//end of evt.on

			evt.emit('get_specific_time_table', evt, 0, 0);
		});//end of get
	}//end of get_time_table	



	,direct_way_recommend_time : function(req, res) {
		var self = this;
		var evt = new event_emitter();
		//string으로 넘어온 train_plan을 JSON형식으로 파싱해줌
		var train_plan = [];
		train_plan = req.body.train_plan;
		console.log(train_plan);
		var length = train_plan.length -1 ;
		var recommendation = {};
		//기차시간 추천 이벤트 바인딩
		self.get_station_info(train_plan[length-1].city_name, train_plan[length].city_name, function(result){
			console.log('train.js result : ', result);
			if(result != false ) {
				evt.on('get_way', function(evt, ret1, ret2, i, j){
					self.get_specific_time(ret1[i].station_name, ret2[j].station_name, 9, function(result2) {
						console.log('train.js result2 : ', result2);
						if(result2 != false) {
							recommendation['dept_station'] = result2.dept_station;
							recommendation['arrv_station'] = result2.arrv_station;
							recommendation['dept_time'] = result2.dept_time;
							recommendation['arrv_time'] = result2.arrv_time;
							recommendation['time_required'] = result2.time_required;
							recommendation['valid'] = true;
							console.log('rec : ',recommendation);
							res.json(recommendation);
						}//end of if
						else if(j < ret2.length-1){
							evt.emit('get_way', evt, ret1, ret2, i, ++j);
						}//end of else
						else if(i < ret1.length-1){
							evt.emit('get_way', evt, ret1, ret2, ++i, 0);
						}
						else {
							res.json({result : false});
						}
					});//end of get_specific_time	
				});//end of evt.on get_way

				evt.emit('get_way',evt, result.city1, result.city2, 0, 0);
				
			}//end of if
			else {
				res.json({result : false});
			}
		});//end of compare_station
	}//end of direct_way_recommend_time

	,get_station_info : function(city1, city2, callback) {
		//ToDo
		var self = this;
		var evt = new event_emitter();
		var ret = {};

		station_db.get_list({city_name : city1}, function(result1){
			if(result1 != false) {
				station_db.get_list({city_name : city2}, function(result2) {
					if(result2 != false) {
						ret['city1'] = [];
						ret['city2'] = [];
						ret['city1'] = result1;
						ret['city2'] = result2;
						callback(ret);
					}//end of if
					else {
						callback(false);
					}
				});//end of inner get_list
			}//end of if
			else {
				callback(false);
			}
		});//end of outer get_list
	}//end of get_station_info






///////추후 재활용 예정

	//기차 시간 자동 추천
	/*
		무조건 sequential하게 열차 시간이 들어온다고 가정. 
		train_plan[0] = { day : 1, city_name : ABC };
		train_plan[1] = { day : 1, city_name : BCD };
		....

		반환은
		[ {day : 1, valid:true, dept_station : ABC, dept_time : 00:00, arrv_station : BCD, arrv_time : 11:11, time_required : 00}, 
		   ... ]
		여기서 time_required는 '시간'단위로 보여준다. 분단위는 무조건 올림.
		
	*/
	,recommend_time : function(req, res) {
		var self = this;
		console.log('in train.js / recommned_time');
		console.log('in train.js, req.body.train_plan : ', req.body.train_plan);
		//string으로 넘어온 train_plan을 JSON형식으로 파싱해줌
		var train_plan = [];
		train_plan = req.body.train_plan;
		console.log(train_plan);
		var length = train_plan.length -1 ;
		var recommendation = {};
		console.log('recommend_time ....!');
		//기차시간 추천 이벤트 바인딩
		self.compare_station(train_plan[length-1].city_name, train_plan[length].city_name, function(result){
			console.log('train.js result : ', result);
			if(result != false ) {
				self.get_specific_time(result.dept_station, result.arrv_station, 9, function(result2) {
					console.log('train.js result2 : ', result2);
					if(result2 != false) {
						recommendation['day'] = train_plan[length].day;
						recommendation['dept_station'] = result.dept_station;
						recommendation['arrv_station'] = result.arrv_station;
						recommendation['dept_time'] = result2.dept_time;
						recommendation['arrv_time'] = result2.arrv_time;
						recommendation['time_required'] = result2.time_required;
						recommendation['valid'] = true;
						console.log('rec : ',recommendation);
						res.json(recommendation);
					}//end of if
					else{
						res.json({result:false});
					}
					
				})//end of get_specific_time
			}//end of if
			else {
				res.json({result : false});
			}
		});//end of compare_station
	}//end of recommend_time

	//각 도시 별로 존재하는 모든 역에 대해 두 도시간을 이동할 수 있는 역이 있는가 조회
	,compare_station : function(city1, city2, callback) {
		//ToDo
		var self = this;
		var evt = new event_emitter();
		var ret = {};

		evt.on('compare_station', function(evt, ret1, ret2, i, j) {
			self.get_valid_route(ret1[i].station_name, ret2[j].station_name, function(result) {
				console.log('compare station, result : ', result);
				if(result) {
					ret['dept_station'] = ret1[i].station_name;
					ret['arrv_station'] = ret2[j].station_name;
					ret['result'] = true;
					callback(result);
				}//end of if
				else if(j < ret2.length){
					evt.emit('compare_station', evt, ret1, ret2, i, ++j);
				}//end of else
				else if(i < ret1.length){
					evt.emit('compare_station', evt, ret1, ret2, ++i, 0);
				}
				else {
					callback(false);
				}
			});//end of get_valid_route 
		});//end of evt on

		station_db.get_list({city_name : city1}, function(result1){
			if(result1 != false) {
				station_db.get_list({city_name : city2}, function(result2) {
					if(result2 != false) {
						evt.emit('compare_station', evt, result1, result2, 0, 0);
						console.log('compare_station, get_list', result1, result2);
					}//end of if
					else {
						callback(false);
					}
				});//end of inner get_list
			}//end of if
			else {
				callback(false);
			}
		});//end of outer get_list
	}//end of compare_station

	//두 역간에 유효한 루트가 존재하는가 체크. train_graph.js에 구현되어있음.
	,get_valid_route : function(station1, station2, callback) {
		console.log('get_valid_route , station1, station2', station1, station2);
		//ToDo
		var graph = require('./train_graph.js');
		graph.find_path(station1, station2, function(result){
			console.log('find_path result : ', result);
			callback(result);
		});
	}
}

	/*** old code

	,recommend_time : function (req, res) {
		var self = this;
		var evt = new event_emitter();
		//string으로 넘어온 train_plan을 JSON형식으로 파싱해줌
		var train_plan = JSON.parse(req.body.train_plan);
		var recommendation = [];
		//기차시간 추천 이벤트 바인딩
		evt.on('make_recommendation', function(evt, i) {
			self.compare_station(train_plan[i].city_name, train_plan[i+1].city_name, function(result){
				if(result != false ) {
					self.get_specific_time(result.dept_station, result.arrv_station, 9, function(result2) {
						if(result2 != false) {
							recommendation[i] = {};
							recommendation[i]['day'] = train_plan[i+1].day;
							recommendation[i]['dept_station'] = result.dept_station;
							recommendation[i]['arrv_station'] = result.arrv_station;
							recommendation[i]['dept_time'] = result2.dept_time;
							recommendation[i]['arrv_time'] = result2.arrv_time;
							recommendation[i]['time_required'] = result2.time_required;
							recommendation[i]['valid'] = true;

							if( ++i < train_plan.length ) {
								evt.emit('make_recommendation', evt, i);
							}//end of if
							else {
								res.json(recommendation);
							}
						}//end of if
					})//end of get_specific_time
				}//end of if
			});//end of compare_station
		});//end of evt on

		evt.emit('make_recommendation', evt, 0);
	}//end of recommend_time
	***/

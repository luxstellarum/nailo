var jsdom = require('jsdom');
var fs = require('fs');
var jquery_lib = fs.readFileSync("public/lib/jquery/jquery-1.8.3.js").toString();
var Iconv = require('iconv').Iconv;
var iconv = new Iconv('EUC-KR', 'UTF-8//TRANSLIT//IGNORE');
var train_db = require('../database/train.js');
var strlib = require('../lib/string.js');
var event_emitter = require('events').EventEmitter;

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
		var train_number = 3360; //1003번 다시 받기
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
					if( (train_number + count) < 1000) {
						evt.emit('get_train_info', evt, uri_form + "00" + (train_number+ (++count)), count);
					}
					else if ( train_number + count < 10000 ){
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
				result['arrv_time'] = strlib.trim($(target).find('td:first').next().next().text());
				result['dept_time'] = strlib.trim($(target).find('td:first').parent().next().find('td:first').next().text());
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
	
}
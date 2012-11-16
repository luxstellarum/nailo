var jsdom = require('jsdom');
var Iconv = require('iconv').Iconv;
var iconv = new Iconv('EUC-KR', 'UTF-8//TRANSLIT//IGNORE');
var train_db = require('../database/train.js');
var strlib = require('../lib/string.js');

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
		var train_number = "00301";
		var uri = uri_form + train_number;
		var train_info = {};
		
		for(var i=0; i<10; i++) {
			jsdom.env({
				html : uri,
				scripts : ['http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'],
				encoding : 'binary',
				done : function(err, window){
					var $ = window.jQuery;
					/***********차량 번호 따내기************/
					train_info['id'] = parseInt(train_number);
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
				}//end of function
			});//end of jsdon.env
			train_number = parseInt('train_number') + 1;
			train_number = "00" + train_number;
			uri = uri_form + train_number;

		}//end of for
		//res.json({result : true});
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
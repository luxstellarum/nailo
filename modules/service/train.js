var jsdom = require('jsdom');
var Iconv = require('iconv').Iconv;
var iconv = new Iconv('CP949', 'UTF-8//TRANSLIT//IGNORE');//'UTF-8//TRANSLIT//IGNORE');
//CP949, EUC-KR, UTF-8, ISO-8859-1
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
	
	
	/* 기차 시간 검색 등의 로직 파트 */
	,get_html : function(req, res) {
		var self = this;
		var uri_form = "http://www.korail.com/servlets/pr.pr11100.sw_pr11131_i1Svt?txtRunDt=20121107&txtTrnNo=";
		var train_number = "00302";
		var uri = uri_form + train_number;
		var train_info = {};
		
		jsdom.env({
			html : uri,
			//encoding : 'CP949',
			setEncoding : 'CP949',
			scripts : ['http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'],
			done : function(err, window){
				var $ = window.jQuery;
				
				/***********차량 번호 따내기************/
				train_info['id'] = parseInt(train_number);
				/***********************************/

				/***********차종 따내기****************/
				var tmp = strlib.trim($('thead tr:first').find('td').text());
				var split_str = tmp.split('[');
				
				tmp = strlib.trim(split_str[1]);
				split_str = tmp.split(']');

				train_info['type'] = strlib.trim(split_str[0]);
				/***********************************/
				
				/************출발시각 및 도착시각 따내기********************/
				$('tr[bgcolor="#FFFFFF"]').each(function(){
					tmp = strlib.trim($(this).find('td:first').text());
					if(tmp!="") {
						var buf = new Buffer(tmp.length);
						buf.write(tmp, 0, tmp.length, 'binary');
						console.log('buf', buf);
						train_info['dept_station'] = iconv.convert(tmp).toString();
						
					}
					train_info['arrv_time'] = strlib.trim($(this).find('td:first').next().next().text());
					train_info['dept_time'] = strlib.trim($(this).find('td:first').parent().next().find('td:first').next().text());
					train_info['arrv_station'] = strlib.trim($(this).find('td:first').parent().next().find('td:first').text());
					console.log(train_info);
					//self.write(train_info);
				});
				/****************************************************/

				res.json({'result' : true});
			}//end of function
		});//end of jsdon.env

	}//end of get_html
	
}
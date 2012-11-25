var city_db = require('../database/city.js');
console.log(city_db);
module.exports = {
	
	// 도시 추가
	write : function(req, res) {
		city_db.add(req.body, function(result){
			if(result == true) {
				console.log('service/city.js, write success');				
				res.json({result:true});
			}
			else {
				console.log('service/city.js, write fail');				
				res.json({result:false});
			}
		});		// end of add
	} // end of wirte
	
	
	// 도시 삭제	
	,remove : function(req, res) {
		city_db.remove(req.body.index, function(result){
			if(result == true) {
				console.log('service/city.js, remove success');
				res.json({result : true});
			}
			else {
				console.log('service/city.js, remove fail');
				res.json({result : false});
			}
		});
	}//end of remove

	
	//도시 전체 목록을 받는다.
	,list : function(req, res) {
		var condition = {};
		condition[do_name] = req.body.do_name;
		city_db.get_list(condition, function(result){
			if(result != false) {
				console.log('service/city.js, list success');
				res.json(result);
			}
			else {
				console.log('service/city.js, list fail');
			}
		});
	}//end of list
	
	//도시 수정
	,modify : function(req, res) {
		var tmp = req.body;
		var update = {};
		update[city_name] = tmp.city_name;
		update[do_name] = tmp.do_name;
		update[station_names] = tmp.station_names;
		update[extra] = tmp.extra;

		city_db.update(tmp.index, update, function(result){
			if(result == true) {
				console.log('service/city.js, modify success');
				res.json({result:true});
			}
			else {
				console.log('service/city.js, modify fail');
				res.json({result:false});
			}
		}); //end of update
	}//end of modify


	
	//도시를 database에서 받아와서 결과에 따라 JSON형식으로 return
	,view : function(req, res) {
		var condition = {};
		condition[index] = req.body.index;
		
		city_db.get(condition, function(result){
			if(result != false) {
				console.log('service/city.js, view success');
				res.json(result);
			}//end of if
			else {
				console.log('service/city.js, view fail');
				res.json({result:false});
			}
		}); //end of get
	}//end of view

	
	
	
}
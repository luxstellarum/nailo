var city_db = require('../database/city.js');

var self = module.exports = {
	

	// 도시 추가
	write : function(req, res) {
		self.get_extra_to_array(req, function(req){
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
		});		// end of get_extra_to_array
	} // end of wirte
	

	// city_extra -> array
	,get_extra_to_array :function(req, callback) {
		var arr = [];
		arr = req.body.city_extra.split(',');
		req.body.city_extra = [];
		req.body.city_extra = arr;
		callback(req);
	}
	
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
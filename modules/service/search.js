var search_db = require('../database/search.js');

var self = module.exports = {
		
	// key:value 추가
	write : function(req, res){
		search_db.add(req.body, function(result){
			if(result == true){
				console.log('service/search.js, write success');
				res.json({result:true});
			}
			else {
				console.log('service/search.js, write fail');
			}
		}); 		// end of add
	} 		// end of write

	,remove : function(req, res){
		search_db.remove(req.body.key, req.body.value, function(result){
			if(result == true) {
				console.log('service/search.js, remove success');
				res.json({result: true});
			}
			else {
				console.log('service/search.js, remove fail');
				res.json({result: false});
			}
		});
	} 		// end of remove
	
	,search : function(req, res){
		search_db.seek(req.body.key, function(result){

			console.log('result :', result);
			if(result != false) {
				console.log('service/search.js, search success');
				self.various_to_keyword(req.body.key, result, function(keyword_arr){
					res.json(keyword_arr);				
				});		// end of various_to_keyword
			}
			else {
				console.log('service/search.js, search fail');
				res.json({result: false});
			}
		}); 		// end of find
	}	// end of search
	


	// The key of final_result -> only one 
	, various_to_keyword : function(key, final_result, callback){
		var keyword_arr = [];
		search_db.seek_keyword_type(key, function(flag){
			if(flag == 'f_city'){
				keyword_arr = keyword_arr.concat(final_result['city_extra'], final_result['station_name'], final_result['sights_name']);
			} else if(flag == 'f_station'){
				keyword_arr = keyword_arr.concat(final_result['city_name'], final_result['city_extra'],final_result['sights_name']);
			} else if(flag == 'f_sights'){
				keyword_arr = keyword_arr.concat(final_result['city_name'],final_result['station_name'],final_result['sights_extra']);
			} else if(flag == 'f_extra'){
				keyword_arr = final_result;
				console.log(final_result);	
			} else {

			}	// end of if _all
			callback(keyword_arr);
		}); 			// end of seek_keyword_type
	}	// end of various_to_keyword
		
	
}

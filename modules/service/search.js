var search_db = require('../database/search.js');

module.exports = {
		
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
			if(result == true) {
				console.log('service/search.js, search success');
				res.json({result: true});
			}
			else {
				console.log('service/search.js, search fail');
				res.json({result: false});
			}
		}); 		// end of find
	}	// end of search
	
		
	
}

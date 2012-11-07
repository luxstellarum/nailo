var train_db = require('../database/train.js');

module.exports = {
	add : function(req, res) {
		train_db.add(req.body, function(result){
			if(result == true) {
				res.json({result:true});
			}
			else {
				res.json({result:false});
			}
		});
	}
	
	,remove : function(req, res) {
		train_db.remove(req.body.index, function(result){
			if(result == true) {
				res.json({result : true});
			}
			else {
				res.json({result : false});				
			}
		});
	}
	
	,modify : function(req, res) {
		
	}
	
}
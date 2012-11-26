var train_graph_db = require('../database/train_graph.js');
var event_emitter = require('events').EventEmiiter;

module.exports = {
	write : function(req, res) {
		var node = {};
		node['station_1'] = req.body.station_1;
		node['station_2'] = req.body.station_2;

		train_graph_db.add(node, function(result){
			if(result != false) {
				res.json({result : true});
			}//end of if
			else{
				res.json({result : false});
			}
		})
	}

	//길..길찾자...
	//스택이라도 하나 만들어야되나.....
	,find_path : function(dept, arrv, callback) {
		var evt = new event_emitter();
		var transfer = []; //환승역 정보
		var transfer_num = 0;
		evt.on('find_path_1', function(evt, current, prev, i){
			//순방향
			train_graph_db.get({station_1 : current}, prev, function(result) {
				//해당 역에서 바로 갈 수 있는 역이 하나밖에 없는 경우
				if(result != false && result.length <= 1) {
					if(result.station_2 == arrv) { 
						callback({result : true, transfer : false});
					}
					else {
						evt.emit('find_path_1', evt, result.station_2, current, i)
					}
				}
				//두 개 이상인 경우 환승역 정보를 저장한 후 길이만큼 재수행
				else if(result == false){
					callback({result : false});
				}
				else{
					transfer[transfer_num] = {};
					transfer[transfer_num]['station'] = result[0].station_1;
					//ToDo
				}
			});//end of graph_db
		});//end of evt on


		evt.emit('find_path_1', evt, dept, "", 0);
	}//end of find_path
}//end of module.exports
var train_graph_db = require('../database/train_graph.js');
var event_emitter = require('events').EventEmitter;

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
		var transfer_stack = []; //환승역 정보
		var top = -1;
		var is_visited = false;
		var index = -1;
		var visited = [];
		console.log('find_path, dept and arrv : ', dept, arrv);
		evt.on('find_path_1', function(evt, current, prev, i){
			train_graph_db.get({station_1 : current}, prev, function(result) {
				//해당 역에서 바로 갈 수 있는 역이 하나밖에 없는 경우
				if(result != false && result.length <= 1) {
					console.log('find_path, case 1');
					if(result[0].station_2 == arrv) { 
						callback({result : true, dept_station : dept, arrv_station : arrv});
					}
					else {
						evt.emit('find_path_1', evt, result[0].station_2, current, i)
					}
				}
				//해당 역에서 갈 수 있는 역이 두 개 이상
				else if(result != false && result.length > 1 ) {
					console.log('find_path, case 2');
					console.log(result);
					for(var i =0; i < visited.length; i++) {
						if(result[0].station_1 == visited[i])
						{
							is_visited = true;
							break;
						}
					}

					if( is_visited == false) {
						visited[visited.length] = result[0].station_1;
						console.log('not_visited');
						top++;
						transfer_stack[top] = [];
						transfer_stack[top] = result;
						console.log('case2, stack  : ', transfer_stack);
			
						index = transfer_stack[top].length-1;

						if(transfer_stack[top][index].station_2 != arrv) {
							evt.emit('find_path_1', evt, transfer_stack[top][index].station_2, transfer_stack[top][index].station_1, index);
							transfer_stack[top].pop();
						}
						else {
							callback({result : true, dept_station : dept, arrv_station : arrv});
						}
					}
					else {
						is_visited = false;
						console.log('visited' , transfer_stack[top]);
						transfer_stack[top].pop();
						index = transfer_stack[top].length-1;
						if(index != -1 ) {
							evt.emit('find_path_1', evt, transfer_stack[top][index].station_2, transfer_stack[top][index].station_1, index);		
						}
						else {
							top--;
							index = transfer_stack[top].length-1;
							evt.emit('find_path_1', evt, transfer_stack[top][index].station_2, transfer_stack[top][index].station_1, index);		
						}
					

					}
					
					
					
				}
				//더 이상 갈 수 있는 역이 없을때, stack에 아무것도 없다면
				else if(result == false && top == -1){
					console.log('find_path, case 3');
					callback({result : false});
				}
				else if(result == false && top > -1 ) {
					index = transfer_stack[top].length-1;
					console.log('find_path, case 4');
					
					if( index > -1 ) {
						console.log('find_path, case 4_1');

						
						if(transfer_stack[top][index].station_2 != arrv) {
							evt.emit('find_path_1', evt, transfer_stack[top][index].station_2, transfer_stack[top][index].station_1, index);
							
							transfer_stack[top].pop();	
							if(transfer_stack[top].length == 0) {
								top--;
							}
						}
						else {
							callback({result : true, dept_station : dept, arrv_station : arrv});
						}
					}
					else {
						console.log('find_path, case 4_2');
						console.log(transfer_stack);
						transfer_stack.pop();
						top--;

						if(top != -1 ) {
							index = transfer_stack[top].length-1;
							console.log('in 4_2, stack', transfer_stack[top]);
							if(transfer_stack[top][index].station_2 != arrv) {
								evt.emit('find_path_1', evt, transfer_stack[top][index].station_2, transfer_stack[top][index].station_1, index);
								transfer_stack[top].pop();
							}
							else {
								callback({result : true, dept_station : dept, arrv_station : arrv});
							}
						}
						else {
							callback({result : false});
						}	
					}
				}
				/*======================================================================================
					1. 출발역과 도착역이 담긴 JSON object를 스택에 담습니다.
					2. key = result[i].station_1; value = result.length; 그리고 array에 push!
					3. 0번 루트를 따라가다가 값이 없으면 빽! 이때 i값이 0보다 크면 해당 포인트에서 갈 길이 남았다는 이야기.
					4. 다 돌고나면 스택에서 빠집니다.팝팝팝.
					5. 이런식으로 반복반복.
				======================================================================================*/
			});//end of graph_db
		});//end of evt on


		evt.emit('find_path_1', evt, dept, "", 0);
	}//end of find_path
}//end of module.exports
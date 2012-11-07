var mongoose = require('mongoose'); //mongoose module 사용
var schema = mongoose.Schema; // mongoose.schema 획득
mongoose.connect('mongodb://localhost/nailo'); //nailo db connect

var train_schema = new schema({
	index : Number,
	id : String,
	type : String,
	url : String,
	dept_station : String,
	arrv_station : String,
	dept_time : String,
	arrv_time : String
});//end of train_schema

var documents = mongoose.model('train', train_schema);//DB 삽입위한 모델 생성

module.exports = {

	add : function(train, callback) {
		var self = this;
		var doc = new documents();		
		//값 넣기
		doc.index = self.get_index();
		doc.id = train.id;
		doc.type = train.type;
		doc.url = train.url;
		doc.dept_station = train.dept_station;
		doc.arrv_station = train.arrv_station;
		doc.dept_time = train.dept_time;
		doc.arrv_time = trian.arrv_time;
				
		doc.save(function(err){
			if(!err){
				callback(true);
			}//end of if
			else {
				callback(false);
			}//end of else
		}); //end of save
	}//end of add_train
	
	,get_index : function() {
		documents.findOne({}).sort('index','-1').exec(function(err, result){
			if(!err) {
				if(result != null) {
					return (result.index + 1);
				}
				else {
					return 1; 
				}
			}
			else {
				console.log('get_index : error(01)');
				return false;
			}
		});
	}
	
	,get : function(condition, callback) {
		documents.find(condition, function(err, result) {
			if(result) {
				callback(result);
			}//end of if
			else {
				console.log('database/train.js : get fail');
				callback(false);
			}//end of else
		});//end of findOne
	}//end of get_train
	
	//게시판 전체를 삭제한다.
	//성공하면 true, 실패하면 false 반환
	,remove : function(index, callback) {
		var condition = { index : index };
		documents.update(condition, update, null, function(err){
			if(!err) {
				console.log('database/train.js : del_train success');
				callback(true);
			}//end of if
			else {
				console.log('database/train.js : del_train fail');
				callback(false);
			}//end of else
		});//end of update
	}//end of del_train
	
	//게시판의 설정값들을 업데이트한다.
	//성공하면 true, 실패하면 false 반환
	,update : function(index, update, callback) {
		var condition = { index : index };

		documents.update(condition, update, null, function(err) {
			if(!err){
				console.log('database/train.js : update_train success', condition, update);
				callback(true);
			}//end of if
			else{
				console.log('database/train.js : update_train fail', condition, update, err);
				callback(false);
			}//end of else
		});//end of update
	}//end of update_train
	
	,get_list : function(current_page, paging_size, callback) {
		var skip_size = (current_page * paging_size) - paging_size;
		
		documents.find({}).sort('date', -1).skip(skip_size).limit(paging_size).exec(function(err, docs){
			if(!err) {
				callback(docs);
			}//end of if
			else {
				console.log('database/train.js : fail');
				callback(false);
			}//end of else
		});//end of find
	}//end of get_train_list
}//end of module export

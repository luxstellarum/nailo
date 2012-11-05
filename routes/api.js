var board = require('../modules/service/board.js');

module.exports = function(app){
	/*******************************
		게시물관련
		******************************/
		
	//글 쓰기
	app.post('/board/write', function(req, res) {
		board.write(req, res);
	});
	//글 목록 보기
	app.post('/board/list', function(req, res) {
		board.list(req, res);
	});
	//글 내용 보기
	app.post('/board/view', function(req, res) {
		board.view(req, res);
	});
	//글 수정
	app.post('/board/modify', function(req, res) {
		board.modify(req, res);
	});
}
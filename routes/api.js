var board = require('../modules/service/board.js');
var member = require('../modules/service/member.js');
var city = require('../modules/service/city.js');
var comment = require('../modules/service/comment.js');
var sights = require('../modules/service/sights.js');
var station = require('../modules/service/station.js');
var train = require('../modules/service/train.js');



module.exports = function(app){


	/*******************************
		/service/board.js
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
	// 글 삭제
	app.post('/board/remove', function(req,res) {
		board.remove(req,res);
	});
	
	

	/*******************************
		/service/member.js
		******************************/
		
	// 회원 정보 등록
	app.post('/member/join', function(req, res) {
		member.join(req, res);
	});
	// 회원 정보 수정
	app.post('/member/modify', function(req, res) {
		member.modify(req, res);
	});
	// 회원 정보 삭제
	app.post('/member/remove', function(req, res) {
		member.remove(req, res);
	});
	// 로그인
	app.post('/member/login', function(req, res) {
		member.login(req, res);
	});
	


	/*******************************
		/service/comment.js
		******************************/
		
	// 댓글 등록
	app.post('/comment/write', function(req, res) {
		comment.write(req, res기);
	});
	// 댓글 삭제
	app.post('/comment/remove', function(req, res) {
		comment.remove(req, res);
	});
	// 댓글 수정
	app.post('/comment/modify', function(req, res) {
		comment.modify(req, res);
	});
	// 댓글 목록 보기
	app.post('/comment/list', function(req, res) {
		comment.list(req, res);
	});


	
	/*******************************
		/service/city.js
		******************************/


	
	/*******************************
		/service/sights.js
		******************************/


	
	/*******************************
		/service/station.js
		******************************/


	
	/*******************************
		/service/train.js
		******************************/
		
		
		
			
	
}
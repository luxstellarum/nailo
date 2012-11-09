var board = require('../modules/service/board.js');
var member = require('../modules/service/member.js');
var city = require('../modules/service/city.js');
var comment = require('../modules/service/comment.js');
var sights = require('../modules/service/sights.js');
var station = require('../modules/service/station.js');
var train = require('../modules/service/train.js');
var plan = require('../modules/service/plan.js');


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

	// 도시 등록
	app.post('/city/write', function(req, res) {
		city.write(req, res기);
	});
	// 도시 삭제
	app.post('/city/remove', function(req, res) {
		city.remove(req, res);
	});
	// 도시 수정
	app.post('/city/modify', function(req, res) {
		city.modify(req, res);
	});
	// 도시 목록 보기
	app.post('/city/list', function(req, res) {
		city.list(req, res);
	});
	// 도시 정보 보기
	app.post('/city/view', function(req, res) {
		city.view(req, res);
	});



	
	/*******************************
		/service/sights.js
		******************************/
	// 관광지 등록
	app.post('/sights/write', function(req, res) {
		sights.write(req, res기);
	});
	// 관광지 삭제
	app.post('/sights/remove', function(req, res) {
		sights.remove(req, res);
	});
	// 관광지 수정
	app.post('/sights/modify', function(req, res) {
		sights.modify(req, res);
	});
	// 관광지 목록 보기
	app.post('/sights/list', function(req, res) {
		sights.list(req, res);
	});
	// 관광지 정보 보기
	app.post('/sights/view', function(req, res) {
		sights.view(req, res);
	});




	
	/*******************************
		/service/station.js
		******************************/
	// 역 등록
	app.post('/station/write', function(req, res) {
		station.write(req, res기);
	});
	// 역 삭제
	app.post('/station/remove', function(req, res) {
		station.remove(req, res);
	});
	// 역 수정
	app.post('/station/modify', function(req, res) {
		station.modify(req, res);
	});
	// 역 목록 보기
	app.post('/station/list', function(req, res) {
		station.list(req, res);
	});
	// 역 정보 보기
	app.post('/station/view', function(req, res) {
		station.view(req, res);
	});



	
	/*******************************
		/service/train.js
		******************************/
		
	// 기차 등록
	app.post('/train/write', function(req, res) {
		train.write(req, res기);
	});
	// 기차 삭제
	app.post('/train/remove', function(req, res) {
		train.remove(req, res);
	});
	// 기차수정
	app.post('/train/modify', function(req, res) {
		train.modify(req, res);
	});
	// 기차목록 보기
	app.post('/train/list', function(req, res) {
		train.list(req, res);
	});
	// 기차정보 보기
	app.post('/train/view', function(req, res) {
		train.view(req, res);
	});

		
		
	
	/*******************************
		/service/plan.js
		******************************/			
		
	// plan 등록
	app.post('/plan/write', function(req, res) {
		plan.write(req, res기);
	});
	// plan 삭제
	app.post('/plan/remove', function(req, res) {
		plan.remove(req, res);
	});
	// plan수정
	app.post('/plan/modify', function(req, res) {
		plan.modify(req, res);
	});
	// plan목록 보기
	app.post('/plan/list', function(req, res) {
		plan.list(req, res);
	});
	// plan정보 보기
	app.post('/plan/view', function(req, res) {
		plan.view(req, res);
	});
}
module.exports = function(app){
	
	app.get('/', function(req, res){
		res.render('mypage/mypage', {title:'index'});
	});

	// mypage 카테고리 라우팅
	app.get('/mypage/mypage', function(req, res){
		res.render('mypage/mypage', {title:'/my/mypage'});
	});

	app.get('/mypage/bookmark', function(req, res){
		res.render('mypage/bookmark', {title:'/my/bookmark'});
	});

	app.get('/mypage/my_nailo', function(req, res){
		res.render('mypage/my_nailo', {title:'/my/my_nailo'});
	});

	app.get('/mypage/my_community', function(req, res){
		res.render('mypage/my_community', {title:'/my/my_community'});

	});
	app.get('/mypage/share', function(req, res){
		res.render('mypage/share', {title:'/my/share'});
	});

	app.get('/mypage/login', function(req, res){
		res.render('mypage/login', {title:'/my/login'});
	});

	app.get('/mypage/phone_auth', function(req, res){
		res.render('mypage/phone_auth', {title:'/my/phone_auth'});
	});


	// community 카테고리 라우팅
	app.get('/community/community', function(req, res){
		res.render('community/community', {title:'/community/community'});
	});	

	app.get('/community/bun_make', function(req, res){
		res.render('community/bun_make', {title:'/community/bun_make'});
	});	

	app.get('/community/bun_show', function(req, res){
		res.render('community/bun_show', {title:'/community/bun_show'});
	});	
	
	
	// plan 카테고리 라우팅
	app.get('/plan/plan', function(req, res){
		res.render('plan/plan', {title:'/plan/plan'});
	});	

	// 이후 plan 1~3 합체
	app.get('/plan/plan2', function(req, res){
		res.render('plan/plan2', {title:'/plan/plan2'});
	});	
	app.get('/plan/plan3', function(req, res){
		res.render('plan/plan3', {title:'/plan/plan3'});
	});	

	app.get('/plan/see', function(req, res){
		res.render('plan/see', {title:'/plan/see'});
	});	
	
	
	// etc 카테고리 라우팅
	app.get('/etc/notice', function(req, res){
		res.render('etc/notice', {title:'/etc/notice'});
	});	
	app.get('/etc/setting', function(req, res){
		res.render('etc/setting', {title:'/etc/setting'});
	});	
	app.get('/etc/tip', function(req, res){
		res.render('etc/tip', {title:'/etc/tip'});
	});	
	
}
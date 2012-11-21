module.exports = function(app){
	
	app.get('/', function(req, res){
		res.render('share/share', {title:'index'});
	});

	// mypage 카테고리 라우팅
	app.get('/mypage/mypage', function(req, res){
		if(!req.session.userid){
			res.render('mypage/login', {title:'/mypage/login'});	
		}	
		else {
			res.render('mypage/mypage', {title:'/mypage/mypage'});
		}
	});

	app.get('/mypage/bookmark', function(req, res){
		if(!req.session.userid){
			res.render('mypage/login', {title:'/mypage/login'});	
		}	
		else {			
			res.render('mypage/bookmark', {title:'/mypage/bookmark'});
		}
	});

	app.get('/mypage/my_nailo', function(req, res){
		if(!req.session.userid){
			res.render('mypage/login', {title:'/mypage/login'});	
		}	
		else {			
			res.render('mypage/my_nailo', {title:'/mypage/my_nailo'});
		}
	});

	app.get('/mypage/my_community', function(req, res){
		if(!req.session.userid){
			res.render('mypage/login', {title:'/mypage/login'});	
		}	
		else {
			res.render('mypage/my_community', {title:'/mypage/my_community'});
		}
	});
	
	app.get('/mypage/share', function(req, res){
		if(!req.session.userid){
			res.render('mypage/login', {title:'/mypage/login'});	
		}	
		else {
			res.render('mypage/share', {title:'/mypage/share'});
		}
	});
	app.get('/mypage/login', function(req, res){
		// session 이 있는 경우
		if(!req.session.userid){
			res.render('mypage/login', {title:'/mypage/login'});	
		}	
		else {
			res.render('mypage/mypage', {title:'/mypage/mypage'});		
		}
	});
	app.get('/mypage/phone_auth', function(req, res){
		res.render('mypage/phone_auth', {title:'/mypage/phone_auth'});
	});
	app.get('/mypage/join', function(req, res){
		res.render('mypage/join', {title:'/mypage/join'});
	});


	// community 카테고리 라우팅
	app.get('/community/community', function(req, res){
		res.render('community/community', {title:'/community/community'});
	});	
	
		app.get('/community/community#community_2', function(req, res){
		res.render('community/community#community_2',{title:'/community/community'});
	});
	
	app.get('/community/community#community_3', function(req, res){
		res.render('community/community#community_3',{title:'/community/community'});
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
	
	app.get('/plan/plan#plan_2', function(req, res){
		res.render('plan/plan#plan_2', {title:'/plan/plan#plan_2'});
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

	//train
	app.get('/train/get_time_table', function(req, res){
		res.render('train/get_time_table', {title:'tt'});
	});	

	
}
module.exports = function(app){
	
	app.get('/', function(req, res){
<<<<<<< HEAD
		res.render('mypage', {title:'index'});
=======
		res.render('myPage', { title: 'IlowaNailo' });
>>>>>>> bd443f47bf36e3ec2d66b269049d430d92737408
	});

	// mypage 카테고리 라우팅
	app.get('/mypage/mypage', function(req, res){
		res.render('mypage', {title:'/my/mypage'});
	});
	app.get('/mypage/bookmark', function(req, res){
		res.render('bookmark', {title:'/my/bookmark'});
	});
	app.get('/mypage/my_nailo', function(req, res){
		res.render('my_nailo', {title:'/my/my_nailo'});
	});
	app.get('/mypage/my_community', function(req, res){
		res.render('my_community', {title:'/my/my_community'});
	});
	app.get('/mypage/share', function(req, res){
		res.render('share', {title:'/my/share'});
	});
	app.get('/mypage/login', function(req, res){
		res.render('login', {title:'/my/login'});
	});
	app.get('/mypage/phone_auth', function(req, res){
		res.render('phone_auth', {title:'/my/phone_auth'});
	});


	// community 카테고리 라우팅
	app.get('/community/community', function(req, res){
		res.render('community', {title:'/community/community'});
	});	
	app.get('/community/bun_make', function(req, res){
		res.render('bun_make', {title:'/community/bun_make'});
	});	
	app.get('/community/bun_show', function(req, res){
		res.render('bun_show', {title:'/community/bun_show'});
	});	
	
	
	// plan 카테고리 라우팅
	app.get('/plan/plan', function(req, res){
		res.render('plan', {title:'/plan/plan'});
	});	
	app.get('/plan/see', function(req, res){
		res.render('see', {title:'/plan/see'});
	});	
	
	
	// etc 카테고리 라우팅
	app.get('/etc/notice', function(req, res){
		res.render('notice', {title:'/etc/notice'});
	});	
	app.get('/etc/setting', function(req, res){
		res.render('setting', {title:'/etc/setting'});
	});	
	app.get('/etc/notice', function(req, res){
		res.render('tip', {title:'/etc/tip'});
	});	
	

<<<<<<< HEAD
=======
	app.get('/plan3', function(req,res){
		res.render('plan3', { title: 'Plan3' });
	});

	app.get('/untitled', function(req,res){
		res.render('untitled', { title: 'Plan3' });
	});

}
>>>>>>> bd443f47bf36e3ec2d66b269049d430d92737408

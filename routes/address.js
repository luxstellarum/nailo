module.exports = function(app){

	app.get('/', function(req, res){
	  res.render('mypage', { title: 'IlowaNailo' });
	});
	
	app.get('/mypage/share', function(req,res){
		res.render('share',{title:'IlowaNailo'});
	});
	
	app.get('/mypage/bookmark', function(req,res){
		res.render('bookmark',{title:'IlowaNailo'});
	});
	
	app.get('/mypage/mynailo', function(req, res){
		res.render('mynailo',{title:'IlowaNailo'});
	});
	
	app.get('/mypage/my_community', function(req, res){
		res.render('my_community',{title:'IlowaNailo'});
	});
	
	app.get('/community', function(req, res){
		res.render('community',{title:'IlowaNailo'});
	});
	
	app.get('/community#community_2', function(req, res){
		res.render('/community#community_2',{title:'IlowaNailo'});
	});
	
	app.get('/community#community_3', function(req, res){
		res.render('/community#community_3',{title:'IlowaNailo'});
	
	app.get('/community/bun_make', function(req, res){
		res.render('bun_make',{title:'IlowaNailo'});
	});
	
	app.get('/mypage/bun_show', function(req, res){
		res.render('bun_show',{title:'IlowaNailo'});
	});
	
	app.get('/etc/notice', function(req, res){
	  res.render('notice', { title: 'IlowaNailo' });
	});
	
	app.get('/etc/setting', function(req, res){
	  res.render('setting', { title: 'IlowaNailo' });
	});
	
	app.get('/etc/tip', function(req, res){
	  res.render('tip', { title: 'IlowaNailo' });
	});
	
	app.get('/plan', function(req,res){
		res.render('plan', { title: 'Plan' });
	});
	
	app.get('/plan2', function(req,res){
		res.render('plan2', { title: 'Plan2' });
	});

}
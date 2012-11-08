module.exports = function(app){

	app.get('/', function(req, res){
	  res.render('myPage', { title: 'IlowaNailo' });
	});
	
	app.get('/share', function(req,res){
		res.render('share',{title:'IlowaNailo'});
	});
	
	app.get('/mypage/bookmark', function(req,res){
		res.render('bookmark',{title:'IlowaNailo'});
	});
	
	app.get('/mypage/mynailo', function(req, res){
		res.render('mynailo',{title:'IlowaNailo'});
	});
	
	app.get('/mypage', function(req, res){
		res.render('mynailo',{title:'IlowaNailo'});
	});
	
	app.get('/plan', function(req,res){
		res.render('plan', { title: 'Plan' });
	});
	
	app.get('/plan2', function(req,res){
		res.render('plan2', { title: 'Plan2' });
	});

}
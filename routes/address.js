<<<<<<< HEAD

module.exports = function(app){

app.get('/', function(req, res){
	res.render('mypage', {title:'index_page'});
});


app.get('/mypage', function(req,res){
	res.render('mypage',{title:'IlowaNailo'});
});

app.get('/mypage/bookmark', function(req,res){
	res.render('bookmark',{title:'IlowaNailo'});
});


app.get('/share', function(req,res){});
app.get('/bookmark', routes.book);
app.get('/mynailo', routes.my);

<<<<<<< HEAD
=======
exports.index = function(req, res){
  res.render('myPage', { title: 'IlowaNailo' });
};

exports.share = function(req,res){
	res.render('share',{title:'IlowaNailo'});
};

exports.book = function(req,res){
	res.render('bookmark',{title:'IlowaNailo'});
};

exports.my = function(req, res){
	res.render('mynailo',{title:'IlowaNailo'});
};
>>>>>>> a49364a3225a01944f413b8d49548e35542dac0c




=======
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
>>>>>>> 90fc0f29b16ca43ae48a386e1508fde0b7426722

	app.get('/plan3', function(req,res){
		res.render('plan3', { title: 'Plan3' });
	});

	app.get('/untitled', function(req,res){
		res.render('untitled', { title: 'Plan3' });
	});

}

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





}
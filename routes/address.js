
module.exports = function(app){

app.get('/', function(req, res){
	res.render('mypage', {title:'index_page'});
});


app.get('/mypage', function(req,res){
	res.render('share',{title:'IlowaNailo'});
});
	




}
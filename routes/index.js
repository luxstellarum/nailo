
/*
 * GET home page.
 */

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

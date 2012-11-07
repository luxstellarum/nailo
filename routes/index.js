
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('commun_bun', { title: 'IlowaNailo' });
};

exports.my = function(req,res){
	res.render('share',{title:'IlowaNailo'});
};

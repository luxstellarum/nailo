$(document).unbind().bind('pagecreate',function(){

	$('.btn1').click(function(){  	
		var nextPage = "#plan_1";
    	var effect = "slide";
    	changePage($(nextPage),effect);	

   });
   
   	$('.btn2').click(function(){  	
		var nextPage = "#plan_kangneung";
    	var effect = "slide";
    	
    	changePage($(nextPage),effect);
    });	

});

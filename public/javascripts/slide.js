console.log("slide.js");

function changePage($next,effect){
	$before = $('.current');
	console.log($before.attr('class'));
	
	$next.addClass('current '+effect+'-in');
	$before.addClass(effect+'-out');
	
	console.log($next.attr('class'));
	
	$next.one("webkitAnimationEnd",function(){
		$before.removeClass("current "+effect+"-out");
		$next.removeClass(effect+'-in');
		console.log('done');
	})
}

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
function setHead(area_head,area_name){
	while(area_head.firstChild)
		area_head.removeChild(area_head.firstChild);

	if(area_name=='kangwondo')
		area_head.append(document.createTextNode("강원도"));
	else if(area_name=='kyunggido')
		area_head.append(document.createTextNode("경기도"));
	else if(area_name=='chungcheongdo')
		area_head.append(document.createTextNode("충청도"));
	else if(area_name=='jeollado')
		area_head.append(document.createTextNode("전라도"));
	else if(area_name=='kyungsangdo')
		area_head.append(document.createTextNode("경상도"));
}

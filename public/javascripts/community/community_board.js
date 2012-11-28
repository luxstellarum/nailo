$(document).unbind().bind('pagecreate',function(){
	var tmp = location.href.split('//')[1];
	var city = tmp.split('/')[3];
	setCity(city)
	
	var community_board = {};
	community_board['city']=city;
	
	$.ajax({
		type: 'post',
		url: '/board/list',
		data: community_board,
		success:function(data){
			
		}
	});

	
});

function setCity(city_name){
	
	var name;
	
	if(city_name=="seoul")	name="서울";
	if(city_name=="boryeong")	name="보령";
	if(city_name=="jecheon")	name="제천";
	if(city_name=="pyungchang")	name="평창";
	if(city_name=="kangneung")	name="강릉";
	if(city_name=="damyang")	name="담양";
	if(city_name=="boseong")	name="보성";
	if(city_name=="jeongup")	name="정읍";
	if(city_name=="jinju")	name="진주";
	if(city_name=="gyeongju")	name="경주";
	if(city_name=="busan")	name="부산";
	
	$('#selected_city').append(document.createTextNode(name));
	
};

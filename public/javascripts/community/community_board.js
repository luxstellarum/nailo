$(document).unbind().bind('pagecreate',function(){
	var tmp = location.href.split('//')[1];
	var city = tmp.split('/')[3];
	city_p=setCity(city)
	
	var community_board = {};
	//community_board['city']="test2";	//테스트용 실제는 아래 코드 ㅎ
	community_board['city']=city_p;
	
	$.ajax({
		type: 'post',
		url: '/board/get_cityboard',
		data: community_board,
		success:function(data){
			if(data.result != false)
			{
				$.each(data,function(i,item){
					var tr = document.createElement('tr');
					var td1 = document.createElement('td');
					var td2 = document.createElement('td');
					var td3 = document.createElement('td');
					var td4 = document.createElement('td');
					
					item.event_month=SetZeros(item.event_month,2);
					item.event_day=SetZeros(item.event_day,2);
					item.start_hour=SetZeros(item.start_hour,2);
					item.start_minute=SetZeros(item.start_minute,2);
					
					td1.appendChild(document.createTextNode(item.event_month+"."+item.event_day+"\n"+item.start_hour+":"+item.start_minute));
					td2.appendChild(document.createTextNode(item.location));
					td3.appendChild(document.createTextNode(item.subject));
					td4.appendChild(document.createTextNode(item.population+"명"));
					
					td1.style.fontSize="7pt";
					
					tr.appendChild(td1);
					tr.appendChild(td2);
					tr.appendChild(td3);
					tr.appendChild(td4);
					
					$('#board_field').append(tr);
				});	
			}
			else
			{
			}
		}
	});
	
	$('.btn_bunmake').click(function(){
		$.ajax({
			type: 'post',
			dataType: 'json',
			url: '/member/get_login_inform',
			success:function(data){
				console.log(data);
				if(!data.user_id)
				{
					alert("로그인이 필요한 기능입니다.");
					location.href="/mypage/login";
				}
				else
					location.href="/community/bun_make?city="+city;
			}
		});
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
	return name;
};


function SetZeros(num, digits) {
	var Zeros = '';
	num = num.toString();
	if (num.length < digits) {
		for (i = 0; i < digits - num.length; i++)
		Zeros += '0';
	}
	return Zeros + num;
}

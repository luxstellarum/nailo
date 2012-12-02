
$(document).ready(function(){
	$('#mypage').click(function(){
		location.href='/mypage/mypage';
	});
	$('#plan').click(function(){
		location.href='/plan/plan';
	});
	$('.btn_beongae').click(function(){
		location.href='/community/community';
	});
	$('.popup_beongae li').click(function(){
		if($(this).attr("id")=="make_beongae")
			location.href='/community/bun_make';
		if($(this).attr("id")=="my_beongae")
			location.href='/mypage/my_community';
	});

});


//page 로딩이 끝난 후에 각종 이벤트 및 함수를 로딩 
$(document).bind('pagecreate',function(){
	// section 높이를 구한다
	var window_height = $(window).height();
	var section_height = window_height - 140 - 60;	// section 높이는 header, footer을 뺸 나머지
	$(".section").css("height", section_height);
});//end of bind
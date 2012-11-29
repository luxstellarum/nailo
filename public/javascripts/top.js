/**********************************************
	global variables
**********************************************/
var selected_cities = []; //선택한 도시 정보 저장
var train_plan = [];
var train_plan_flag = 0;

$(document).ready(function(){
	displayRandom();
	var plan_city_cnt = 0; // plan bar에 추가된 계획영역개수

	$('.slide a').bind("touchstart mousedown",function(e){
		e.preventDefault();
		

		var nextPage = $(this).get(0).hash;
		var area_name = $(this).attr("id");
		
		console.log(nextPage);
		var area_head = $("#selected_area");
		
		
		if(!nextPage)
			return;
		if(nextPage==undefined)
			return;
		if(nextPage=='#community_2')
		{
			console.log(nextPage+' > #'+area_name+'_map');
			$(nextPage+' > #'+area_name+'_map').css("display","block");

			var city_name = $(".city2");
			
			for(var s=0; s<=100; s++){
				if($(".city2:eq("+s+")").attr("province_name")==area_name)
					{

						$(".city2:eq("+s+")").css("display", "block"); }
					}
			setHead(area_head,area_name);
		}
		
		if(nextPage==undefined)
		{
			console.log(nextPage+' > #'+area_name+'_map');
			$(nextPage+' > #'+area_name+'_map').css("display","block");
			
			setHead(area_head,area_name);
		}
		
		if(nextPage=='#plan_2')
		{
			$('#selected_area').empty();
			$(nextPage+' > #'+area_name+'_map').css("display","block");
			
			var city_name = $(".city2");
			
			for(var s=0; s<=100; s++){
				if($(".city2:eq("+s+")").attr("province_name")==area_name)
					{

						$(".city2:eq("+s+")").css("display", "block"); }
					}
			setHead(area_head,area_name);
		}

		var effect = $(this).attr("data-effect");
				
		changePage($(nextPage),effect);
	});

	$('#paneltoggle').bind("click",function(e){
		var check = $(this).is(":checked");
		if(check)
		{
			$('.header').css("display","none");
			$('.section').css("display","none");
			$('#searchbrowser').css("height","350px");
			$('#searchbrowser').css("overflow","auto");
			$('#searchbrowser').focus().select();
		}
		else
		{
			$('.header').css("display","block");
			$('.section').css("display","block");
			$('#searchbrowser').css("height","10px");
			$('#searchbrowser').css("overflow","hidden");
		}
	});

	// plan_bar day="1" div 너비를 윈도우 너비만큼 준다
	var window_width = $(window).width();
	$(".plan_bar").css("width", window_width);
	//$(".plan_bar").css("height", "80px");

	// plan.jade가 시작되면 날짜선택창이 슬라이드다운된다
	$("#periodpicker").slideDown();

	

	// bottom.jade: + 버튼을 클릭하면 추가메뉴를 선택할 수 있다
	$("input.btn_more").click(function(){
		var submenu = $(".popup_othermenu");

		// submenu 가 화면상에 보일때는 위로 보드랍게 접고 아니면 아래로 보드랍게 펼치기
		if( submenu.is(":visible") ){
			submenu.slideUp();
		}else{
			submenu.slideDown();
		}
		if( $(".popup_beongae").is(":visible")){
			$(".popup_beongae").css("display", "none");
		}
	});
	$("input.btn_beongae").click(function(){
		var submenu = $(".popup_beongae");

		// submenu 가 화면상에 보일때는 위로 보드랍게 접고 아니면 아래로 보드랍게 펼치기
		if( submenu.is(":visible") ){
			submenu.slideUp();
		}else{
			submenu.slideDown();
		}
		if( $(".popup_othermenu").is(":visible")){
			$(".popup_othermenu").css("display", "none");
		}
	});
});



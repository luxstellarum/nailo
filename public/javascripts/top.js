/**********************************************
	global variables
**********************************************/
var selected_cities = []; //선택한 도시 정보 저장
var train_plan = [];
var train_plan_flag = 0;

$(document).ready(function(){


	var plan_city_cnt = 0; // plan bar에 추가된 계획영역개수

	$('.slide a,#back').bind("touchstart mousedown",function(e){
		e.preventDefault();
		

		var nextPage = $(this).attr("name");
		var area_name = $(this).attr("id");
		
		console.log(nextPage);
		var area_head = $("#selected_area");
		
		if(nextPage==undefined)
			return;
		if(area_name=='back')
		{
			
			if(nextPage=='#plan_1'){
				$('.city2').each(function(){
					$(this).css("display","none");
				});
			}
			if(nextPage=='#plan_2')
			{			
				console.log(area_head.text());
				if(area_head.text()=='강원도')
					area_name='kangwondo';
				else if(area_head.text()=='경기도')
					area_name='kyunggido';
				else if(area_head.text()=='충청도')
					area_name='chungcheongdo';
				else if(area_head.text()=='전라도')
					area_name='jeollado';
				else if(area_head.text()=='경상도')
					area_name='kyungsangdo';
					
				var city_name = $(".city2");

				for(var s=0; s<=100; s++){
					if($(".city2:eq("+s+")").attr("province_name")==area_name)
						{
	
							$(".city2:eq("+s+")").css("display", "block"); }
						}
			}
			
			var effect ="slide";
			changePage($(nextPage),effect);
			return;		
		}
		if(nextPage=='#community_2')
		{
			$('#selected_area').empty();
			$(nextPage+' > '+'[id$=_map]').css("display","none");
			$(nextPage+' > #'+area_name+'_map').css("display","block");

			var city_name = $(".city2");
			
			for(var s=0; s<=100; s++){
				if($(".city2:eq("+s+")").attr("province_name")==area_name)
					{

						$(".city2:eq("+s+")").css("display", "block"); }
					}
			setHead(area_head,area_name);
		}
		
		if(nextPage=='#plan_2')
		{
			$('#selected_area').empty();
			$(nextPage+' > '+'[id$=_map]').css("display","none");
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
			$('#header').css("display","none");
			$('#container').css("display","none");
			$('.slide').css("opacity","0");
			$('#searchbrowser').css("height","350px");
			$('#searchbrowser').css("overflow","auto");
			$('#searchbrowser').focus().select();
		}
		else
		{

			$('#header').css("display","block");
			$('#container').css("display","block");
			$('.slide').css("opacity","1");
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
	$(".btn_more").click(function(){
		var submenu = $(".popup_othermenu");
		// submenu 가 화면상에 보일때는 위로 보드랍게 접고 아니면 아래로 보드랍게 펼치기
		if( submenu.is(":visible") ){
			submenu.slideUp();

		}else{
			submenu.slideDown();
		}
	});
	$('.othermenu').click(function(){
		if($(this).attr('id')=='notice')
			location.href="/etc/notice";
		else if($(this).attr('id')=='setting')
			location.href="/etc/setting";				
	});

});



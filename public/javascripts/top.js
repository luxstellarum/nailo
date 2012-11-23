$(document).ready(function(){
	displayRandom();
	var window_width = $(window).width();
	var window_height = $(window).height();
	var plan_bar_offset_left = [];
	var plan_bar_offset_right = [];
	
	var plan_city_cnt = 0; // plan bar에 추가된 계획영역개수

	$('.slide a').bind("touchstart mousedown",function(e){
		e.preventDefault();
		

		var nextPage = $(this).get(0).hash;
		var area_name = $(this).attr("id");
		
		console.log(nextPage);
		var area_head = $("#selected_area");
		if(!nextPage)
			return;
		if(nextPage=='#community_2')
		{
			console.log(nextPage+' > #'+area_name+'_map');
			$(nextPage+' > #'+area_name+'_map').css("display","block");
			
			
			setHead(area_head,area_name);
		}
		
		if(nextPage=='#plan_2')
		{
			console.log(nextPage+' > #'+area_name+'_map');
			$(nextPage+' > #'+area_name+'_map').css("display","block");
			
			var city_name = $(".city2");
			
			console.log($(".city2").attr("province_name"));
			console.log(area_name);

			for(var s=0; s<=100; s++){
				console.log($(".city2:eq("+s+")").attr("province_name"));
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


	// bottom.jade: + 버튼을 클릭하면 추가메뉴를 선택할 수 있다
	$("input.btn_more").click(function(){
		var submenu = $(".popup_othermenu");

		// submenu 가 화면상에 보일때는 위로 보드랍게 접고 아니면 아래로 보드랍게 펼치기
		if( submenu.is(":visible") ){
			submenu.slideUp();
		}else{
			submenu.slideDown();
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
	});

	// 드래그 앤 드랍 기능
	$(".city2").draggable({
		revert: "invalid",
		helper: "clone"
	});

	$(".plan_bar_wrapper").find(".plan_bar_1st").droppable({
		tolerance: "pointer",
		dropOnEmpty: true,
		drop: function(event, ui){
			var x = event.clientX;
			var y = event.clientY;
			console.log(x);
			console.log(y);
			if( $(this).is("li") ){
				plan_city_cnt = $(this).children().last().attr("plan_city_cnt");
				alert("dd");
			}
			else{
				plan_city_cnt = 0;
				alert("ddd");
			}
			$(this).append("<li>");
			$(this).children().addClass(".plan_city");
			$(this).children().last().attr("plan_city_cnt", plan_city_cnt + 1);
			var city_name = ui.draggable.attr("city_name");
			console.log(city_name);

			var new_plan_city = $($(this).find("li").last());

			new_plan_city.addClass(city_name);
			new_plan_city.css({
				"position": "absolute",
				"width": "80px",
				"height": "40px",
				"top": y - (window_height - 60),
				"left": x,
				"background-color": "yellow",
				"list-style":"none",
				"display": "inline-block",
				"z-index": "200"
			});
			dragcity(ui.draggable);
		}
	});

	function dragcity( item) {
		item.fadeOut(function() {
			item.fadeIn(function() {
				item
					.animate({
						width: "48px"
					});
			});
		});
	}

	// bottom.jade: next day button
	var timeoutId = 0;

	function next_day_scroll(amount){
		$('#plan_bar').scrollLeft($("#plan_bar").scrollLeft() + amount);
	}

	$(".next_day").mousedown(function() {
		timeoutId = setTimeout(next_day_scroll(window_width), 100);
			}).bind('mouseleave', function() {
		clearTimeout(timeoutId);
	});
	/*
	$(".next_day").bind("click", function() {
		$("#plan_bar").animate({
			scrollLeft: window_width
		}, 500);
		$("#plan_bar").scrollLeft = 0;
	});
	*/

	// bottom.jade: 시간표의 위치 선정
	var span_width = $(".12").width();
	$(".12").css("left", (window_width/2) - span_width);
	$(".24").css("left", window_width - span_width*3);

	// test!!! 플랜바 안에 시간구분을 위한 영역
	var hour_width = $(".plan_bar_1st").width()/24;

	$(".droppable_hover").css({
		"position":"absolute",
		"width": $(this).width()/24,
		"height": "50px"
	});
	$(".plan_bar_hour").css({
		"width": $(".plan_bar_1st").width()/24,
		"height": "50px",
		"display": "inline-block"
	});

		// plan이 짜여졌는지 아닌지...
	$(".plan_bar_hour").droppable({
		hoverClass: "droppable_hover",
		drop: function(event, ui){
			$(this).css({
				"background-color": "yellow"
			});
			$(this).attr("occupied", 1);
			$(this).attr("hour");
			plan_bar_hour_left = $(this).position().left;
		}
	});

	//for(var r=1; r<=24; r++){
	//	plan_bar_offset_left[r] = $(".plan_bar_hour:eq("+r+")").position().left;
	//	plan_bar_offset_right[r] = $(".plan_bar_hour:eq("+r+")").position().left + $(".plan_bar_hour:eq("+r+")").width();
	//}

	var maxwidth = 0;	// 리사이즈 시에 영역끼리 맞닿을 경우 너비를 제한하기 위한 변수
	$(".plan_bar_hour").resizable({
		handles: 'e, w',
		grid: [window_width/24, 20],
		helper: "droppable_hover",
		resize: function(event, ui){
			var enlarged_width = ui.size.width - ui.originalSize.width;
			var shrinken_width = ui.originalSize.width - ui.size.width;
			var original_right = ui.originalSize.width + ui.originalPosition.left;
			var right = ui.size.width + ui.position.left;
			var original_right_offset = $(this).attr("hour");
			/*
			if( (right - original_right) > 0 ){
				for(var m=$(this).attr("hour")+1; m<=24; m++){
					if( $(".plan_bar_hour:eq("+m+")").attr("occupied") == 1 ){

						maxwidth = ui.originalSize.width + right - original-right;
						for(var n=m; n>$(this).attr("hour"); n--){
							$(".plan_bar_hour:eq("+n+")").attr("occupied", 1);
						}
					}
					else
						maxwidth = ui.size.width;
				}
			}
			else if( (right - original_right) < 0 ){

				for(var p=1; p<=24; p++){
					if(right == plan_bar_offset_right[p]){
						var right_offset = p;
					}
				}
				for(var q=original_right_offset; q>right; q--;){
					$(".plan_bar_hour:eq("+q+")").attr("occupied", 1);
				}

			}
			*/
		}
	});
		//resize: function(event, ui){};
			/*
			// 확장하는 칸 만큼 요소 삭제
			// 현재 사이즈 - 원래 사이즈 가 한칸의 몇배냐에 따라 삭제할 요소 개수 결정
			// 줄어드는만큼 요소 추가
			
			var enlarged_width = ui.size.width - ui.originalSize.width;
			var shrinken_width = ui.originalSize.width - ui.size.width;
			var original_right = ui.originalSize.width + ui.originalPosition.left;
			var right = ui.size.width + ui.position.left;


			var enlarged_li_cnt = enlarged_width / hour_width;	// 요소를 몇 개 삭제 또는 추가해야 하는가
			var shrinken_li_cnt = shrinken_width / hour_width;
			
			if(ui.originalPosition.left-ui.position.left < 0)
			for(var k= $(this).attr("hour"); k >=1; k--;){

			}
			*/

		
			/*
			for(var k=0; k<=23; k++){
				if($(".plan_bar_hour:eq("+k+")").attr("occupied")==1){
					if($(".plan_bar_hour:eq("+k+")").offset().left + $(".plan_bar_hour:eq("+k+")").width() == ui.position.left){
						maxwidth = ui.originalSize.width + (ui.originalPosition.left - ui.position.left);
					}
					else if($(".plan_bar_hour:eq("+k+")").offset().left == ui.position.left + ui.size.width){
						maxwidth = ui.size.width;
					}
				}
			}
			*/
		//maxWidth: maxwidth

	// bottom.jade: 날짜를 지정하면 하단 plan bar에 스케줄이 뜬다
	$('.btn_set').bind('click',function() {
		$('.plan_bar_1st').append('<li>');
		$($('.plan_bar_1st').find('li')).addClass('plan_city');

		var window_width = $(window).width();	//창의 너비를 구한다
		var plan_start = window_width/12*3;
		var plan_length = window_width/12*6;
		var plan_city_cnt = 0;
		alert(plan_start);
		$('.plan_city').attr('plan_city_cnt', plan_city_cnt++);
		$('.plan_city').css('width', plan_length);
		$('.plan_city').css('height', '50px');
		$(".plan_city").css("display", "inline-block");
		$('.plan_city').css('left', plan_start);
		$('.plan_city').css('background-color', 'Red');
		$(".plan_city").draggable({
			axis: "x",
			containment: "parent",	// 움직이는 영역을 부모영역으로 한정시킨다
			grid: [window_width/24, 20]	//x, y 축으로 지정된 길이만큼씩 움직인다
		});
		$(".plan_city").resizable({
			handles: 'e, w',
			grid: [window_width/24, 20]
		});

	});

});



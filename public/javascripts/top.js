$(document).ready(function(){
	displayRandom();
	var window_width = $(window).width();

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
			if(city_name.attr("province_name")==area_name)
				{
					console.log(area_name);
					city_name.css("display", "block"); }
			
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
	var plan_city_cnt = 0; // plan bar에 추가된 계획영역개수
	$(".plan_bar_1th").droppable({
		//cursor: pointer,
		drop: function(event, ui){
			//alert("in droppable");
			if( $(this).is("div") ){
				plan_city_cnt = $(this).children().last().attr("plan_city_cnt");
			}
			else{
				plan_city_cnt = 0;
			}
			$(this).append("<li>");
			$(this).children().addClass(".plan_city");
			$(this).children().last().attr("plan_city_cnt", plan_city_cnt + 1);
			var city_name = ui.draggable.attr("city_name");
			console.log(city_name);

			var new_plan_city = $($(this).find("li").last());

			new_plan_city.addClass(city_name);
			new_plan_city.css({
				"background-color": "yellow",
				"list-style":"none",
				"display": "inline-block"
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



$(document).ready(function(){
	displayRandom();
	
	$('.slide a').bind("touchstart mousedown",function(e){
		e.preventDefault();
		

		var nextPage = $(this).get(0).hash;
		var area_name = $(this).attr("id");
		alert(nextPage);
		alert(area_name);
		
		console.log(nextPage);
		
		if(nextPage=='#community_2')
		{
			console.log(nextPage+' > #'+area_name+'_map');
			$(nextPage+' > #'+area_name+'_map').css("display","block");
			
			var area_head = $("#selected_area");
			setHead(area_head,area_name);	
		}
		
		if(nextPage=='#plan_2')
		{
			console.log(nextPage+' > #'+area_name+'_map');
			$(nextPage+' > #'+area_name+'_map').css("display","block");
			
			var area_head = $("#selected_area");
			setHead(area_head,area_name);	
		}
		
		if(nextPage=="#plan_3")
		{	 
			var startX=	$('.header').position();
			console.log($('.header').offset());
			console.log(startX.top);
		}
		var effect = $(this).attr("data-effect");
				
		changePage($(nextPage),effect);
	});	

	$('#paneltoggle').on("click",function(e){
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

	var window_width = $(window).width();
	var window_width_3 = window_width * 3;
	$('#plan_bar').css('width', window_width);
	$('.plan_bar_wrapper').css('width', window_width_3);
	//$('.plan_bar_wrapper').children().css('height', '60px');
	$('.plan_bar_1st').css('width', window_width);
	$('.plan_bar_2nd').css('width', window_width);
	$('.plan_bar_3rd').css('width', window_width);

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

	// 날짜를 지정하면 하단 plan bar에 스케줄이 뜬다
	$('.submit').bind('click',function() {
		var plan_bar_offset = $('.plan_bar_1st').offset();

		$('.plan_bar_1st').append('<div>');
		$($('.plan_bar_1st').find('div')).addClass('plan_1');
		$('.plan_1').css('width', '100px');
		$('.plan_1').css('height', '100px');
		$('.plan_1').css('background-color', 'Red');

		$(".plan2").draggable();
		$(".plan_1").draggable({
			axis: "x",
			containment: ".plan_bar_1st"
		});
		$('.plan_1').resizable();
	});

	var size = $(".plan_1").position.width;
	alert(size);

	$('.plan_1').bind('mousedown', function(e) {
		var width = me.height();
		var y = e.clientY;
		var movehandler = function(e) {
		    me.height(Math.max(40, e.clientY + h - y));
		};
		var uphandler = function(e) {
		    jQuery('html').unbind('mousemove',movehandler)
		          .unbind('mouseup',uphandler);
		};
		jQuery('html') .bind('mousemove', movehandler)
		    .bind('mouseup', uphandler);
	});

});


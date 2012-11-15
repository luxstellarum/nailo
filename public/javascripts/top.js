$(document).ready(function(){
	displayRandom()
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
<<<<<<< HEAD
		
=======
>>>>>>> d16017d2e1dbce4673758b7503c6d4e2d2c71a9a
		
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
	var window_width_4 = window_width * 4;
	$('#plan_bar').css('width', window_width);
	$('#plan_bar .plan_bar_wrapper').css('width', window_width_4);

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
});
$(document).ready(function() {
	var periodpicker = $("#periodpicker");
	$.loadPopup(periodpicker);
	//$.centerPopup(periodpicker);

	// plan2.jade: datepicker
	$(".btn_set_period").click(function(){
		var periodpicker = $("#periodpicker");
		$.disablePopup(periodpicker);

		// 여행기간을 센다

		var start_year = $(".start_year").val();
		var start_month = $(".start_month").val();
		var start_day = $(".start_day").val();
		var end_year = $(".end_year").val();
		var end_month = $(".end_month").val();
		var end_day = $(".end_day").val();

		var input1 = start_year + '/' + start_month + '/' + start_day;
		var input2 = end_year + '/' + end_month + '/' + end_day;
		var date1 = new Date(input1);
		var date2 = new Date(input2);

		var minutes = 1000*60;
		var hours = minutes*60;
		var days = hours*24;

		var diff = Math.abs(date1.getTime() - date2.getTime());

		var period = Math.round(diff / days);
		
		/**** 여행기간을 입력받으면 다음 3가지 업무를 수행한다 ****/

		// (1) 플랜바의 전체영역을 생성한다. (창의너비) x (여행기간)
		var window_width = $(window).width();
		var window_width_wrapper = window_width * period;	// 여행기간만큼 plan bar를 늘린다
		$('#plan_bar').css('width', window_width);
		$('.plan_bar_wrapper').css('width', window_width_wrapper);

		// (2) 플랜바 전체영역 내에 날짜별 영역을 생성한다
		for(var j = 1; j<=period; j++){
			$(".plan_bar_wrapper").append("<ul>");
			$($(".plan_bar_wrapper").find("ul")).last().addClass("plan_bar_" + j);
			$($(".plan_bar_wrapper").find("ul")).last().css("width", window_width);
		}

		// (3) 날짜정보를 띄워주는 영역을 생성한다
		var day_width = window_width / period;
		for(var i = 1; i<=period; i++){
			$(".plan_date").append("<div>");
			$($(".plan_date").find("div")).addClass("plan_date" + i);
			$(".plan_date" + i).css({
				"width": day_width,
				"background-color": "Purple"
			});
			$(".plan_date" + i).text(i + "일차");
		}
	});

	$(".btn_cancel_period").click(function(){
		var periodpicker = $("#periodpicker");
		$.disablePopup(periodpicker);
	});
});
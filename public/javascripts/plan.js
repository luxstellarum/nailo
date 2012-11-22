$(document).ready(function() {

	// plan.jade: 도를 누르면, 도의 이름을 다음 '도시선택페이지' 상단에 뿌려준다
	/*a.province').click(function() {
		$.get('plan.js', function(data) {
			var province = $(data).find('a.province').text();
			alert(province);
			$('.province_name').text(province);
		});
	});*/

	// datepicker


	var popupStatus = 0;


	$.loadPopup = function(popup){
		//팝업은 popupStatus 가 비활성화되어 있을때만 불러진다. / loads popup only if it is disabled
		if(popupStatus===0){
		$("#page").css({
			"opacity": "0.7"
		});
		$("#plan2").fadeIn("slow");
		popup.fadeIn("slow");
			popupStatus = 1;
		}
	};

	$.disablePopup = function(popup){
	//popupStatus 가 활성화 되어 있다면 비활성화 시키기 / disables popup only if it is enabled
		if(popupStatus==1){
			//$("#plan2").fadeOut("slow");
			popup.fadeOut("slow");
			popupStatus = 0;
		}
	};

	$.centerPopup = function(popup){
		//화면 중앙에 자리잡게 하기 위한 요청 / request data for centering
		var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;
		var popupHeight = popup.height();
		var popupWidth = popup.width();
		//중앙에 위치시키기 / centering
		popup.css({
			"position": "absolute",
			"top": windowHeight/2-popupHeight/2,
			"left": windowWidth/2-popupWidth/2
		});
		//IE6 을 위한 핵 / only need force for IE6
	};


	// plan2.jade: datepicker
	$(".city2").bind("click", function(){
		var datepicker = $("#datepicker");
		$.loadPopup(datepicker);
		$.centerPopup(datepicker);
	});

	// plan2.jade: datepicker
	$(".btn_set").click(function(){
		var datepicker = $("#datepicker");
		$.disablePopup(datepicker);
	});

	$(".btn_cancel").click(function(){
		var datepicker = $("#datepicker");
		$.disablePopup(datepicker);
	});

	// plan.jade: 맵의 크기를 동적으로 지정한다
	var window_width = $(window).width();
	$('.wrapper_map').css('width', window_width);
	var map_width = $('.wrapper_map').width();
	var map_height = map_width * 1.5;
	$('.wrapper_map').css('padding-bottom', map_height);
	

	// datepicker
	var day = 1;
	var hour = 12;
	var cd = new Date();
	$('#dStr').html(dateFormat(cd, "fullDate"));
	$('#starthour').val(hour);
	$('#endhour').val(hour);
	$('#day').val(day + "일차");
	$('#pday').click(function () {
		updateF();
	});
	$('#pstarthour').click(function () {
		cd.setMonth(cd.getMonth() + 1);
		updateF();
	});
	$('#pendhour').click(function () {
		cd.setDate(cd.getDate() + 1);
		updateF();
	});
	$('#mday').click(function () {
		cd.setYear(cd.getFullYear() - 1);
		updateF();
	});
	$('#mstarthour').click(function () {
		cd.setMonth(cd.getMonth() - 1);
		updateF();
	});
	$('#mendhour').click(function () {
		cd.setDate(cd.getDate() - 1);
		updateF();
	});
	function updateF() {
		day += 1;
		$('#day').val(day + "일차");
		$('#starthour').val(dateFormat(cd, "mmm"));
		$('#endhour').val(dateFormat(cd, "dd"));
		$('#dStr').html(dateFormat(cd, "fullDate"));

		create_plan_bar(day);
	}
});
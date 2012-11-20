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


	$.loadPopup = function(){
		//팝업은 popupStatus 가 비활성화되어 있을때만 불러진다. / loads popup only if it is disabled
		if(popupStatus===0){
		$("#page").css({
			"opacity": "0.7"
		});
		$("#plan2").fadeIn("slow");
		$("#datepicker").fadeIn("slow");
			popupStatus = 1;
		}
	};

	$.disablePopup = function(){
	//popupStatus 가 활성화 되어 있다면 비활성화 시키기 / disables popup only if it is enabled
		if(popupStatus==1){
			//$("#plan2").fadeOut("slow");
			$("#datepicker").fadeOut("slow");
			popupStatus = 0;
		}
	};

	$.centerPopup = function(){
		//화면 중앙에 자리잡게 하기 위한 요청 / request data for centering
		var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;
		var popupHeight = $("#datepicker").height();
		var popupWidth = $("#datepicker").width();
		//중앙에 위치시키기 / centering
		$("#datepicker").css({
			"position": "absolute",
			"top": windowHeight/2-popupHeight/2,
			"left": windowWidth/2-popupWidth/2
		});
		//IE6 을 위한 핵 / only need force for IE6
	};


	// datepicker
	$(".city2").bind("click", function(){
		$.loadPopup();
		$.centerPopup();
	});

	$(".btn_cancel").click(function(){
		$.disablePopup();
	});

	// plan.jade: 맵의 크기를 동적으로 지정한다
	var window_width = $(window).width();
	$('.wrapper_map').css('width', window_width);
	var map_width = $('.wrapper_map').width();
	var map_height = map_width * 1.5;
	$('.wrapper_map').css('padding-bottom', map_height);
	

	// datepicker
	var cd = new Date();
	$('#dStr').html(dateFormat(cd, "fullDate"));
	$('#mon').val(dateFormat(cd, "mmm"));
	$('#day').val(dateFormat(cd, "dd"));
	$('#year').val(dateFormat(cd, "yyyy"));
	$('#pyear').click(function () {
		cd.setYear(cd.getFullYear() + 1);
		updateF();
	});
	$('#pmon').click(function () {
		cd.setMonth(cd.getMonth() + 1);
		updateF();
	});
	$('#pday').click(function () {
		cd.setDate(cd.getDate() + 1);
		updateF();
	});
	$('#myear').click(function () {
		cd.setYear(cd.getFullYear() - 1);
		updateF();
	});
	$('#mmon').click(function () {
		cd.setMonth(cd.getMonth() - 1);
		updateF();
	});
	$('#mday').click(function () {
		cd.setDate(cd.getDate() - 1);
		updateF();
	});
	function updateF() {
		$('#year').val(dateFormat(cd, "yyyy"));
		$('#mon').val(dateFormat(cd, "mmm"));
		$('#day').val(dateFormat(cd, "dd"));
		$('#dStr').html(dateFormat(cd, "fullDate"));
	}
});
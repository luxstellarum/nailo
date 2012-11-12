$(document).ready(function() {
	$(".gangwon").bind('touchend', function(e){

	});

	// plan.jade: 도를 누르면, 도의 이름을 다음 '도시선택페이지' 상단에 뿌려준다
	$('a.province').click(function() {
		var text = '';
		text += $(this).text();
		alert(text);
		$('p. province_name').append(text);
		});

	$('.city').bind('click', function(e) {
		//var event = e.originalEvent;
		//var a = '<div class="datepicker"></div>';
		$(this).append('<div>');
		$($(this).find('div')).attr('id','datepicker');
		$('#datepicker').css('position', 'absolute');
		$('#datepicker').css('width', '100px');
		$('#datepicker').css('height', '100px');
		$('#datepicker').css('left', '-100px');
		$('#datepicker').css('top', '-100px');

		var picker = $( "div[id='datepicker']", this );
    	picker.mobipick();
		//e.preventDefault();
	});

	$('#plan3').live( "pagecreate", function() {
    var picker = $( "input[type='text']", this );
    picker.mobipick();
});

	// plan.jade: 맵의 크기를 동적으로 지정한다
	var window_width = $(window).width();
	$('.wrapper_map').css('width', window_width);
	var map_width = $('.wrapper_map').width();
	var map_height = map_width * 1.5;
	$('.wrapper_map').css('padding-bottom', map_height);
	
	//
	// plan2.jade: 도시를 누르면 날짜를 선택할 수 있다
	/*$('.city').live('click', function (e) {
		// var div = "div#datepicker";
		$(this).css('color', 'Red');
		$('div').appendTo(this).attr('id','datepicker');
		var offset = $(this).offset();	
		$('#datepicker').css('position', 'absolute');
		$('#datepicker').css('left', offset.left);
		$('#datepicker').css('top', offset.top);
		$('#datepicker').css('width', '100px');
		$('#datepicker').css('height', '100px');
	});*/
});
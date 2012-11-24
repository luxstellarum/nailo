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


function next_day_scroll(amount){
	$('#plan_bar').scrollLeft($("#plan_bar").scrollLeft() + amount);
}

function set_hours(target, period, target_place) {
	target = target.parent().find('[place='+target_place+']:first');
	var remove_targets = $(target).parent().find('[place='+target_place+']').not('[occupied=1]');
	remove_targets.each(function(){
		$(this).attr("place", "");
		$(this).text($(this).attr("hour"));
		$(this).css({
			"background-color" : "red"
		});
		$(this).attr("occupied", 0);
		$(this).removeClass("filled");
	});

	for(var i=1; i<period; i++) {
		target = target.next();

		console.log('target :', target);
		target.css({
			"background-color" : "yellow"
		});
		target.attr("place", target_place);
		target.text(target_place);
		target.attr("occupied", 2);
		target.addClass("filled"); 
	}
}

function remove_place (target) {
	target_place = target.attr("place");
	var remove_targets = target.parent().find('[place='+target_place+']');

	remove_targets.each(function(){
		$(this).attr("place", "");
		$(this).text($(this).attr("hour"));
		$(this).css({
			"background-color" : "red"
		});
		$(this).attr("occupied", 0);
		$(this).removeClass("filled");
	});
}

$(document).ready(function(){
	var window_width = $(window).width();
	var window_height = $(window).height();
	var timeoutId = 0;
	var maxwidth = 0;	// 리사이즈 시에 영역끼리 맞닿을 경우 너비를 제한하기 위한 변수

	// 드래그 앤 드랍 기능
	$(".city2").draggable({
		revert: "invalid",
		helper: "clone"
	});

	$(".next_day").mousedown(function() {
		timeoutId = setTimeout(next_day_scroll(window_width), 100);
			}).bind('mouseleave', function() {
		clearTimeout(timeoutId);
	});

	// bottom.jade: 시간표의 위치 선정
	var span_width = $(".12").width();
	$(".12").css("left", (window_width/2) - span_width);
	$(".24").css("left", window_width - span_width*3);

	// test!!! 플랜바 안에 시간구분을 위한 영역
	var hour_width = $(".plan_bar_1st").width()/24;

	$(".droppable_hover").css({
		"position":"relative",
		"display":"none",
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
			var target = $(this);
			var target_place = ui.draggable.context.innerText;
			$(this).css({
				"background-color": "yellow"
			});
			$(this).attr("place", target_place);
			$(this).text(target_place);
			$(this).attr("occupied", 1);
			$(this).attr("hour");
			$(this).addClass("filled");
			//plan_bar_hour_left = $(this).position().left;
			$.loadPopup($('#hourpicker'));

			$(".set_hour_btn").unbind().bind('click', function(){
				var period = $(this).parent().find('.hours').val();
				set_hours(target, period, target_place);
				$.disablePopup($('#hourpicker'));
			});//end of bind

			$(".hour_set_cancel_btn").unbind().bind('click', function(){
				$.disablePopup($('#hourpicker'));
			});//end of bind


		}
	});

	$(".filled").live('click', function(){
		var target = $(this);
		var target_place = target.attr("place");
		$.loadPopup($('#hourpicker'));

		$(".set_hour_btn").unbind().bind('click', function(){
			var period = $(this).parent().find('.hours').val();
			set_hours(target, period, target_place);
			$.disablePopup($('#hourpicker'));
		});//end of bind

		$(".hour_set_cancel_btn").unbind().bind('click', function(){
			$.disablePopup($('#hourpicker'));
		});//end of bind

	});

	$(".filled").bind('taphold', function(){
		alert(">_<");
		remove_place($(this));
	});

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
	});

});//end of document ready
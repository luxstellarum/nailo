/****************

occupied
0 : 아무것도 없음
1 : 최초로 관광지가 들어간 자리
2 : 관광지의 확장공간
3 : 기차 시간 자

*****************/

var drop_option = {
	hoverClass: "droppable_hover",
	live : true,
	drop: function(event, ui){
		var target = $(this);
		var target_place = ui.draggable.context.innerText;
		$(this).css({
			"background-color" : "black",
			"opacity" : 0.5
		});
		$(this).attr("place", target_place);
		$(this).text(target_place);
		$(this).attr("occupied", 1);
		$(this).attr("hour");
		$(this).addClass("filled");
		//plan_bar_hour_left = $(this).position().left;
		$.loadPopup($('#hourpicker'));

		$(".set_hour_btn").unbind('click').bind('click', function(){
			var period = $(this).parent().find('.hours').val();
			set_hours(target, period, target_place);
			$.disablePopup($('#hourpicker'));
		});//end of bind

		$(".hour_set_cancel_btn").unbind('click').bind('click', function(){
			$.disablePopup($('#hourpicker'));
		});//end of bind

		$(".hour_delete").hide();
	}//end of drop
}//end of drop_option

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
	console.log('set_hours', target, period, target_place);
	target = target.parent().find('[place="'+target_place+'"]:first');
	var remove_targets = $(target).parent().find('[place="'+target_place+'"]').not('[occupied=1]');
	remove_targets.each(function(){
		$(this).attr("place", "");
		$(this).text($(this).attr("hour"));
		$(this).css({
			"background-color" : "white",
			"opacity" : 0.1
		});
		$(this).attr("occupied", 0);
		$(this).removeClass("filled");
	});

	target.attr('period', period);
	
	for(var i=1; i<period; i++) {
		target = target.next();

		console.log('target :', target);
		target.css({
			"background-color" : "black",
			"opacity" : 0.5
		});
		target.attr("place", target_place);
		//target.text(target_place);
		target.attr("occupied", 2);
		target.addClass("filled"); 
	}

}

function remove_place (target) {
	target_place = target.attr("place");
	var remove_targets = target.parent().find('[place="'+target_place+'"]');

	remove_targets.each(function(){
		$(this).attr("place", "");
		$(this).text($(this).attr("hour"));
		$(this).css({
			"background-color" : "white",
			"opacity" : 0.5
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
	var hour_width = $(".plan_bar").width()/24;

	$(".droppable_hover").css({
		"position":"relative",
		"display":"none",
		"width": $(this).width()/24,
		"height": "50px"
	});

	$(".plan_bar_hour").css({
		"width": $(".plan_bar").width()/24,
		"height": "80px",
		"display": "inline-block"
	});

		// plan이 짜여졌는지 아닌지...
	$(".plan_bar_hour").droppable( drop_option );//end of droppbable

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
		
		$(".hour_delete").show();
		$(".hour_delete").unbind().bind('click', function(){
			remove_place(target);
			$.disablePopup($('#hourpicker'));
		});//end of bind


	});

	$(".plan_bar_hour").droppable( drop_option );

	$(".filled").bind('taphold', function(){
		alert(">_<");
		remove_place($(this));
	});

	//관광지로 넘어가는 파~트
	$(".train_set").live('click', function(){
		var city = $(this).attr('city_name');
		var nextPage = "#plan_" + city;
			
		var effect = "slide";
				
		changePage($(nextPage),effect);
	});

	// bottom.jade: 날짜를 지정하면 하단 plan bar에 스케줄이 뜬다
	$('.btn_set').bind('click',function() {
		$('.plan_bar').append('<li>');
		$($('.plan_bar').find('li')).addClass('plan_city');

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


	//완전히 저장
	$(".btn_save").live("click",function(){
		//ToDo. 제목을 저장 할 수 있는 패널이 필요

		var data = [];
		var i=0, j=0;
		$('.plan_bar').each(function(){
			var parent = this;
			data[i] = []
			$(parent).find('.plan_bar_hour').not('[occupied=2]').each(function(){
				if($(this).attr('occupied') == 3) {
					data[i][j] = {};
					data[i][j]['occupied'] = $(this).attr('occupied');
					data[i][j]['dept_station'] = $(this).attr('dept_station');
					data[i][j]['arrv_station'] = $(this).attr('arrv_station');
					data[i][j]['text'] = $(this).text();
					data[i][j]['start_time'] = $(this).attr('hour');
					data[i][j]['period'] = $(this).attr('period');
					j++;
				}
				else if($(this).attr('occupied') == 1) {
					data[i][j] = {};
					data[i][j]['occupied'] = $(this).attr('occupied');
					data[i][j]['place'] = $(this).attr('place');
					data[i][j]['text'] = $(this).text();
					data[i][j]['start_time'] = $(this).attr('hour');
					data[i][j]['period'] = $(this).attr('period');
					j++;
				}					
			});
			i++;
		});
		var index = $(".plan_index").attr('index');
		var final_data = {};
		final_data['subject']; //ToDo
		final_data['data'] = [];
		final_data['index'] = index;
		final_data.data = data;


		//ToDo
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : '/plan/write',
			data : final_data, 
			success : function(result) {
				console.log('result', result);
			
			},
			error : function() {
				alert('error!!!');
			}
		});
	}); //end of live


	$("#sortable").sortable({
		update : function() {
			set_sortable();
		}
	});

});//end of document ready

function set_sortable(){
	$("#sortable").sortable({
		update : function() {
			set_sortable();
		}
	});	
}

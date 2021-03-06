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
	console.log('amount :', amount);
	$('#plan_bar').scrollLeft($("#plan_bar").scrollLeft() + amount);
	var next_day_offset = parseInt($(".next_day").css('left').split('px')[0], 10) + amount;
	var prev_day_offset = parseInt($(".prev_day").css('left').split('px')[0], 10) + amount;
	
	$(".next_day").css({
		'left' : next_day_offset
	});

	$(".prev_day").css({
		'left' : prev_day_offset
	});
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
		if( target.attr('occupied') != 3 ) {
			target.css({
				"background-color" : "black",
				"opacity" : 0.5
			});
			target.attr("place", target_place);
			//target.text(target_place);
			target.attr("occupied", 2);
			target.addClass("filled"); 
		}
		else {
			i=period;
		}
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

	$("#plan_bar .plan_bar").sortable({
		'disabled' : true
	});
	$("#plan_bar .plan_bar").draggable({
		'disabled' : true
	});

	$("#plan_bar .plan_bar li").sortable({
		'disabled' : true
	});

	$("#plan_bar .plan_bar li").draggable({
		'disabled' : true
	});
	
	$(".next_day").css({
		'width' : $('.plan_bar').width()/24,
		'height' : '80px',
		'position' : 'absolute',
		'left' : $(window).width() - ($('.plan_bar').width()/24),
		'opacity' : 0.5,
		'top' : '0px',
		'background-color' : 'black',
		'z-index' : 99999,

	});

	$(".prev_day").css({
		'width' : $('.plan_bar').width()/24,
		'height' : '80px',
		'position' : 'absolute',
		'left' : '0px',
		'opacity' : 0.5,
		'top' : '0px',
		'background-color' : 'black',
		'z-index' : 99999,
	});

	$(".next_day").live('click', function(){
		next_day_scroll( window_width );
	});	
	
	$(".prev_day").live('click', function(){
		next_day_scroll( -window_width );
	});
	// });	

	// // $(".next_day").mousedown(function() {
	// // 	timeoutId = setTimeout(next_day_scroll(window_width), 100);
	// // 	set_plan_bar_controller();
	// // 		}).bind('mouseleave', function() {
	// // 	clearTimeout(timeoutId);
	// // });

	// // $(".prev_day").mousedown(function() {
	// // 	timeoutId = setTimeout(next_day_scroll(-window_width), 100);
	// // 	set_plan_bar_controller();
	// // 		}).bind('mouseleave', function() {
	// // 	clearTimeout(timeoutId);
	// // });
	// // bottom.jade: 시간표의 위치 선정
	// var span_width = $(".12").width();
	// $(".12").css("left", (window_width/2) - span_width);
	// $(".24").css("left", window_width - span_width*3);

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

	$(".filled:not(.train_set)").live('click', function(){
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

/*
	//관광지로 넘어가는 파~트
	$(".train_set").live('click', function(){
		var city = $(this).attr('city_name');
		var nextPage = "#plan_" + city;
			
		var effect = "slide";
				
		changePage($(nextPage),effect);
	});
*/
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
		var subject_panel = $("#subject_panel");
		$.loadPopup(subject_panel);
		// $(".confirm_plan").live('click', function(event){
		// 	$.disablePopup(subject_panel);
		// 	var target = $(this);
		// 	var data = [];
		// 	//var i, j;
		// 	//$('.plan_bar').each(function(){

		// 	// i=0;

		// 	// while($(".plan_bar")[i] != undefined) {
		// 	// 	console.log($(".plan_bar")[i], 'i :', i);
		// 	// 	var parent = $(".plan_bar")[i];
		// 	// 	data[i] = []
		// 	// 	var plans = [];
		// 	// 	plans = $(parent).find('.plan_bar_hour').not('[occupied=2]').not('[occupied=0]');
		// 	// 	j=0;
		// 	// 	for(j=0; j<plans.length; j++) {
		// 	// 		console.log('plan_bar_j : ', j);
		// 	// 		if($(plans[j]).attr('occupied') == 3) {
		// 	// 			data[i][j] = {};
		// 	// 			data[i][j]['occupied'] = $(plans[j]).attr('occupied');
		// 	// 			data[i][j]['dept_station'] = $(plans[j]).attr('dept_station');
		// 	// 			data[i][j]['arrv_station'] = $(plans[j]).attr('arrv_station');
		// 	// 			data[i][j]['text'] = $(plans[j]).text();
		// 	// 			data[i][j]['start_time'] = $(plans[j]).attr('hour');
		// 	// 			data[i][j]['period'] = $(plans[j]).attr('period');
		// 	// 			console.log('첫번째 이프문은 되나?');
		// 	// 		}
		// 	// 		else if($(plans[j]).attr('occupied') == 1) {
		// 	// 			data[i][j] = {};
		// 	// 			data[i][j]['occupied'] = $(plans[j]).attr('occupied');
		// 	// 			data[i][j]['place'] = $(plans[j]).attr('place');
		// 	// 			data[i][j]['text'] = $(plans[j]).text();
		// 	// 			data[i][j]['start_time'] = $(plans[j]).attr('hour');
		// 	// 			data[i][j]['period'] = $(plans[j]).attr('period');
		// 	// 			console.log('두번째 이프문은 되나?');
		// 	// 		}
		// 	// 		console.log('여긴 나오니?');					
		// 	// 	}
		// 	// 	i++;
		// 	// 	console.log($(".plan_bar")[i], 'i++', i);
		// 	// }

		// 	for(var m=0; m< $(".plan_bar").length; m++) {
		// 		(function(i) {
		// 			var parent = $(".plan_bar")[i];
		// 			data[i] = []
		// 			var plans = [];
		// 			var n=0;
		// 			$(parent).find('.plan_bar_hour').not('[occupied=2]').not('[occupied=0]').each(function(){
		// 				var self = this;
		// 				(function(j){
		// 					if($(plans[j]).attr('occupied') == 3) {
		// 						data[i][j] = {};
		// 						data[i][j]['occupied'] = $(self).attr('occupied');
		// 						data[i][j]['dept_station'] = $(self).attr('dept_station');
		// 						data[i][j]['arrv_station'] = $(self).attr('arrv_station');
		// 						data[i][j]['text'] = $(self).text();
		// 						data[i][j]['start_time'] = $(self).attr('hour');
		// 						data[i][j]['period'] = $(self).attr('period');
		// 					}
		// 					else if($(plans[j]).attr('occupied') == 1) {
		// 						data[i][j] = {};
		// 						data[i][j]['occupied'] = $(self).attr('occupied');
		// 						data[i][j]['place'] = $(self).attr('place');
		// 						data[i][j]['text'] = $(self).text();
		// 						data[i][j]['start_time'] = $(self).attr('hour');
		// 						data[i][j]['period'] = $(self).attr('period');
		// 					}
		// 				})(n);
		// 				n++;
		// 			});

		// 		// 	plans = $(parent).find('.plan_bar_hour').not('[occupied=2]').not('[occupied=0]');
		// 		// 	for(var n=0; n< plans.length; n++) {
		// 		// 		(function(j){
		// 		// 			console.log('plan_bar_j : ', j);
		// 		// 			if($(plans[j]).attr('occupied') == 3) {
		// 		// 				data[i][j] = {};
		// 		// 				data[i][j]['occupied'] = $(plans[j]).attr('occupied');
		// 		// 				data[i][j]['dept_station'] = $(plans[j]).attr('dept_station');
		// 		// 				data[i][j]['arrv_station'] = $(plans[j]).attr('arrv_station');
		// 		// 				data[i][j]['text'] = $(plans[j]).text();
		// 		// 				data[i][j]['start_time'] = $(plans[j]).attr('hour');
		// 		// 				data[i][j]['period'] = $(plans[j]).attr('period');
		// 		// 			}
		// 		// 			else if($(plans[j]).attr('occupied') == 1) {
		// 		// 				data[i][j] = {};
		// 		// 				data[i][j]['occupied'] = $(plans[j]).attr('occupied');
		// 		// 				data[i][j]['place'] = $(plans[j]).attr('place');
		// 		// 				data[i][j]['text'] = $(plans[j]).text();
		// 		// 				data[i][j]['start_time'] = $(plans[j]).attr('hour');
		// 		// 				data[i][j]['period'] = $(plans[j]).attr('period');
		// 		// 			}
		// 		// 		})(n);				
		// 		// 	}
		// 			console.log(i, ":", data);
		// 		})(m);
		// 	}

		$(".confirm_plan").live('click', function(event){
			$.disablePopup(subject_panel);
			var target = $(this);
			var data = [];
			var i=0, j=0;
			$('.plan_bar').each(function(){
				j=0;
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
			}); // end of each
			var index = $(".plan_index").attr('index');
			var final_data = {};
			final_data['subject'] = target.parent().find('.plan_subject').val(); //ToDo
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
					alert('저장하였습니다.');
					$(".plan_index").attr('index', result.index);			
				},
				error : function() {
					alert('error!!!');
				}
			});//end of ajax
		});//end of live
	}); //end of live

	//로드!!
	$(".btn_load").live("click",function(){
		$("#plan_bar li").each(function(){
			target = $(this);
			target.removeClass();
			target.text();
			target.attr('city_name', '');
			target.attr('city_name_kor', '');
			target.attr('occupied', 0);
			target.css({
				'background-color' : 'white',
				'opacity' : 0.1
			})
		});
		//ToDo
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : '/plan/write',
			data : final_data, 
			success : function(result) {
				console.log('result', result);
				alert('저장하였습니다.');
				$(".plan_index").attr('index', result.index);			
			},
			error : function() {
				alert('error!!!');
			}
		});

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

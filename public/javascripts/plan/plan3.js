 function set_train_time (dept, arrv, period, day, dept_time) {	
	console.log('set_train_time');
	var ori_target = $('.plan_bar[day=' + day + ']').find('[hour=' + dept_time + ']');
	var target = ori_target;
	target.css({
		"background-color": "yellow"
	});
	target.attr("dept_station", dept);
	target.attr("arrv_station", arrv);
	target.text(dept + '~' + arrv);
	target.attr("occupied", 3);
	target.addClass("filled");
	
	target.addClass("train_set");	

	target = target.next();

	for ( var i=1; i<period; i++) {
		target.css({
			"background-color": "yellow"
		});
		target.attr("dept_station", dept);
		target.attr("arrv_station", arrv);
		target.attr("occupied", 2);
		target.addClass("filled");
		target.addClass("train_set");	

		target = target.next();
	}
	
	target = ori_target;
	while(target.prev().attr("occupied") < 3) {
		target = target.prev();
		target.attr('city', dept);
		target.addClass("train_set");
	}
		
}

function get_train_time (train_plan) {
	console.log('get_train_time');
	$.ajax({
		type : 'POST',
		dataType : 'json',
		url : '/train/recommend',
		data : { 'train_plan' : train_plan },
		success : function(result) {
			console.log('result', result);
			if(result.result == true) {
				train_time_table[train_time_table.length] = {};
				train_time_table[train_time_table.length] = result;
				var dept_time = parseInt(train_time_table[train_time_table.length].dept_time.split(':')[0], 10);
				var arrv_time = parseInt(train_time_table[train_time_table.length].arrv_time.split(':')[0],10);
				var period = arrv_time - dept_time;
				if( dept_time > arrv_time ) {
					period = (24 + arrv_time) - dept_time;
				}
				set_train_time ( 
					train_time_table[train_time_table.length].dept_station,
					train_time_table[train_time_table.length].arrv_station,
					period,
					train_time_table[train_time_table.length].dept_station,
					train_time_table[train_time_table.length].dept_time
				);		
			}
		},
		error : function() {
			alert('error!!!');
		}
	});
}

$(document).ready(function() {
	var train_time_table = [];

	$('.btn_continue').live('click', function() {
		//ToDo
		var nextPage = "#plan_1";
			
		var effect = "slide";

		changePage($(nextPage),effect);
		$("#periodpicker").css("display", "none"); //plan1로 돌아가면 기간선택창은 나올 필요 없다.
	});

	$('.btn_confirm').live('click', function() {
		//ToDo
		$("#sortable").sortable({
			disabled : true
		});

		$("#sortable li").each(function (){
			$(this).unbind('click').bind('click', function() {
				var nextPage = "#plan_" + $(this).attr('city_name');
				changePage($(nextPage),'slide');
			});
		})		
			

		/*
		var first_place = $('#sortable li:first').attr('city_name');
		var nextPage = "#plan_" + first_place;
			
		var effect = "slide";
			
		changePage($(nextPage),effect);
		*/

	});
});
$(document).ready(function(){
	$('.time_table_search').bind('click', function(){
		var dept_station = $('.dept_station').val();
		var arrv_station = $('.arrv_station').val();
		var data = {};
		data['dept_station'] = dept_station;
		data['arrv_station'] = arrv_station;

		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : '/train/get_time_table',
			data : data,
			success : function(data) {
				console.log(data);
			}
		});//end of ajax
	})//end of bind
});//end of ready
$(document).ready(function(){
	var url = $(location).attr('href');
	var arr = url.split("schedule/");
	var index = arr[1];
	$.ajax({
		url: "/plan/view"
		, dataType : "json"
		, data : { 'index' : index }
		, type : "post"
		, success : function(list) {
			var j,k;
			console.log(list);
			$(".title").text(list.subject);

			for(j=0; j< list.data.length; j++) {
				//일차 붙이기
				var day = "<li class=day>" + "[ " + (j+1) + "일차 ] " + "</li>";
				$(".schedule_form").append(day);

				for(k=0; k< list.data[j].length; k++) {
					var contents = "<li type=contents>" + parseInt(list.data[j][k].start_time,10) + "시 부터 " 
								+ ( parseInt(list.data[j][k].start_time,10) + 
									parseInt(list.data[j][k].period,10) ) + "시 까지" + " : ";
					contents += list.data[j][k].text + "</li>";
					$(".schedule_form").append(contents);
				}// end of for
			} // end of for
		}
		, error : function() {

		}
	});
});
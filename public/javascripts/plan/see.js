
var drag_option = {
	revert: "invalid",
	helper: "clone"
}


//page 로딩이 끝난 후에 각종 이벤트 및 함수를 로딩 
$(document).unbind().bind('pagecreate',function(){
	console.log("see.js");
	$(".tour input").bind("click",function(event){
		
		var eventObj = checkDevice(event);
		touchX=eventObj.pageX-150;
		touchY=eventObj.pageY-60;
		$('#board').empty();
		console.log($(this).is(':checked'));
		if($(this).is(':checked')){
			var name = $(this).attr('id');
			var img = document.createElement('img'); // 이미지 객체 생성
		
			img.src = '/images/tour_image/' + name + '.jpg'; // 이미지 경로 설정
			img.width = '50';
			img.height = '50';
			$('#board').append(img); // board DIV 에 이미지 동적 추가
	
	        $('#board').css("position","absolute");
	        $('#board').css("top", touchY);
	        $('#board').css("left", touchX);
	        $('#board').css("display", "block");
       }
       else{
       		$('#board').empty();
       		$('#board').css("display","none");
       }
		
		
	});

	$(".province").draggable( drag_option );
	
	//완전히 저장
	$(".save").live("click",function(){
		//ToDo. 제목을 저장 할 수 있는 패널이 필요

		var data = [];
		var i=0, j=0;
		$('.plan_bar').each(function(){
			var parent = this;
			data[i] = []
			parent.find('.plan_bar_hour').not('[occupied=2]').each(function(){
				data[i][j] = {};
				data[i][j]['occupied'] = $(this).attr('occupied');
				if(data[i][j]['occupied'] == 3) {
					data[i][j]['dept_station'] = $(this).attr('dept_station');
					data[i][j]['arrv_station'] = $(this).attr('arrv_station');
					data[i][j]['text'] = $(this).text();
					data[i][j]['start_time'] = $(this).attr('hour');
					data[i][j]['period'] = $(this).attr('period');
				}
				else {
					data[i][j]['place'] = $(this).attr('place');
					data[i][j]['text'] = $(this).text();
					data[i][j]['start_time'] = $(this).attr('hour');
					data[i][j]['period'] = $(this).attr('period');
				}
				j++;
					
			});

		});
		var final_data = {};
		final_data['subject']; //ToDo
		final_data['data'] = [];
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
});//end of bind

function checkDevice(event){

	if(event.pageX){
		return event;
	}
	if(event.originalEvent.targetTouches){
		return event.originalEvent.targetTouches[0];
	}
	
}



var drag_option = {
	revert: "invalid",
	helper: "clone"
};


//page 로딩이 끝난 후에 각종 이벤트 및 함수를 로딩 
$(document).ready(function(){
	console.log("see.js");
	$(".tour input").bind("click",function(event){
		
		console.log("og");
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
	
});//end of bind

function checkDevice(event){

	if(event.pageX){
		return event;
	}
	if(event.originalEvent.targetTouches){
		return event.originalEvent.targetTouches[0];
	}
	
}


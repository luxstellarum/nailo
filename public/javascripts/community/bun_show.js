//page 로딩이 끝난 후에 각종 이벤트 및 함수를 로딩 
$(document).unbind().bind('pagecreate',function(){
	
	if(location.search){
		
		var tmp = location.search.split("?")[1];
		var index = tmp.split("val=")[1];
		console.log(index);
	}
	
	var output_data={};
	output_data['index'] = index;
	

	$.ajax({ 
			//1. 어떤 type으로 request를 보낼지 결정
			type : 'post',
			//2. 어떤 data type으로 보낼지 결정
			dataType : 'json',
			//3. 요청할 url
			url : '/board/view',
			//4. 보낼 data를 위에 선언한 type에 맞춰서 넣어줌
			data : output_data,
			//request
			
			//response
			//5. 성공했을때 처리할 함수
			success : function(data) {
				console.log(data);
				if(data.result != false ) {
					alert('success');
					$('.output_form').each(function(){
						$(this).append(output_data[$(this).attr('name')]);
					});//end of each
				}
				else {
					alert('fail');
				}
			},//end of success
			//6. 실패해을 때 처리할 함
			error : function(data, status, err) {
				}//end of error
		});//end of ajax
		
});//end of bind
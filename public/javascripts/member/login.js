

$(document).unbind().bind('pagecreate',function(){
	$('#btn_signup').live('click',function(){
		location.href='/mypage/join';
	});
	
	$('#login_btn').live('click', function(){
		var input_data = {};
			
		$('.input_form').each(function(){
			if($(this).val() != "") {
				input_data[$(this).attr('name')] = $(this).val();
			}		// end of if
		}); 	// end of each
			
	
		$.ajax({
			type: 'post',
			dataType: 'json',
			url: '/member/login',		// url 을 타고 라우팅하고 api 랑 접신
			data: input_data,				// 요청한 부분
			success: function(data){
				console.log(data);				
				if(data.result == true){
					alert('success');
					$(location).attr('href', '/mypage/mypage');
				}
				else{
					alert('fail');
				}
			},		// end of success
			
			error: function(data, stauts, err){
		
			}		// end of error
		}); 	// end of ajax
		
	}); 	// end of live


	
}); 	// end of bind

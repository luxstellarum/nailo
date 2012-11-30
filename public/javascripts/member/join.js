
$(document).unbind().bind('pagecreate',function(){
	$('#submit_btn').live('click', function(){
		var input_data = {};
	
		if($("input[name='id']").val()==""){
			alert('아이디를 입력하세요.');
			return;
		}
		// check pw
		else if($("input[name='pw']").val()==""){
			alert('비밀번호를 입력하세요.');
			return;
		}
		else if($("input[name='pw2']").val()==""){
			alert('비밀번호를 확인해주세요.');
			return;
		}		
		else if($("input[name='pw']").val()!= $('input[name=pw2]').val()) {
			alert('비밀번호가 같지 않습니다.');
			return;
		}
		else if($("input[name='name']").val()==""){
			alert('닉네임을 입력하세요.');
			return;
		}	
		else{
			
			$('.input_form').each(function(){
				if($(this).val() != "") {
					input_data[$(this).attr('name')] = $(this).val();
				}		// end of if

			}); 	// end of each
	
	
			$.ajax({
				type: 'post',
				dataType: 'json',
				url: '/member/join',
				data: input_data,
				success: function(data){
					console.log(data);
					if(data.result == true){
						location.href='/mypage/mypage';
					}
					else{
						alert('fail');
					}
				},		// end of success
				
				error: function(data, stauts, err){
			
				}		// end of error
			}); 	// end of ajax
		}		// end of else
		
	}); 	// end of live
	
}); 	// end of bind

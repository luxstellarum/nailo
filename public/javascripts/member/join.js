
$(document).unbind().bind('pagecreate',function(){
	$('#submit_btn').live('click', function(){
		var input_data = {};
	
		// check pw
		if($('input[name=pw]').val()!= $('input[name=pw2]').val()) {
			alert('password error! Retype the password! ');
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
						alert('success');
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

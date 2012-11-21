$(document).unbind().bind('pagecreate',function(){
	
	var output_data={};
	
	$.ajax({
		type:'post',
		dataType: 'json',
		url:'/member/get_login_inform',
		data: output_data,
		success:function(data){
			if(data.user_id){
				console.log(output_data['usr_id']);
				$.ajax({
					type: 'post',
					dataType: 'json',
					url:'/board/list',
					data:output_data
				});				
			}
			else
			{
				alert('fail');
			}
		}
	});
});

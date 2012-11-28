$(document).bind('pagecreate',function(){
	
	var nickname ={};
	
	$.ajax({
		type: 'post',
		dataType: 'json',
		url: '/member/get_login_inform',
		data: nickname,
		success:function(data){
			console.log(data);
			$('#nickname').append(document.createTextNode(data.nickname));
		}
	});
});

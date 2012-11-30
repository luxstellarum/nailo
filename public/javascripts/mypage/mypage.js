$(document).bind('pagecreate',function(){
	
	var nickname ={};
	
	$.ajax({
		type: 'post',
		dataType: 'json',
		url: '/member/get_login_inform',
		data: nickname,
		success:function(data){
			console.log(data);
			if(data.nickname!=undefined)
				$('#nickname').append(document.createTextNode(data.nickname));
			else
				$('#nickname').append(document.createTextNode("로그인이 필요합니다."));
		}
	});
});

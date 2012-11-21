$(document).unbind().bind('pagecreate',function(){
	
	$.ajax({
		type:'post',
		url:'/board/list',
		data: ''
	});
});

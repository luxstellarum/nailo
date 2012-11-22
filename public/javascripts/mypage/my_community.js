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
					url:'/board/list_specified',
					data:output_data,
					success:function(data){
						if(data.result != false){
								$.each(data,function(i,item){
									var div = document.createElement('div');
									div.innerHTML = document.getElementById('pre_set').innerHTML;
									div.style.marginTop="0px";
									div.setAttribute("name",item.index);
									div.firstChild.style.overflow="hidden";
									item.start_hour=SetZeros(item.start_hour,2);
									item.start_minute=SetZeros(item.start_minute,2);
									item.event_month=SetZeros(item.event_month,2);
									item.event_day = SetZeros(item.event_day,2);									
									div.firstChild.appendChild(
										document.createTextNode(" ["+item.city+"/"+item.event_month+"."+item.event_day+"/"
																+item.start_hour+":"+item.start_minute+"] "+item.subject));
									
									$('#field').append(div);
								});
							}
							else{
								alert('fail');
							}
					}
				});				
			}
			else
			{
				alert('fail');
			}
		}
	});
});

function SetZeros(num, digits) {
	var Zeros = '';
	num = num.toString();
	if (num.length < digits) {
		for (i = 0; i < digits - num.length; i++)
		Zeros += '0';
	}
	return Zeros + num;
}

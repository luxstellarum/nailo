$(document).ready(function(){
	
	var output_data={};
	
	$.ajax({	
		type: 'post',
		dataType: 'json',
		url:'/plan/list',
		data:output_data,
		success:function(data){
			if(data.result != false){
					$.each(data,function(i,item){
						var div = document.createElement('div');
						console.log('pre_set'+i%4);
						div.innerHTML = document.getElementById('pre_set'+i%4).innerHTML;
						
						div.firstChild.appendChild(document.createTextNode(item.date+"년 "+item.subject));
						$('#nailo_record').append(div);
					});
				}
				else{
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

//page 로딩이 끝난 후에 각종 이벤트 및 함수를 로딩 
$(document).unbind().bind('pagecreate',function(){
	
	if(location.search){
		
		var tmp = location.search.split("?")[1];
		var index = tmp.split("val=")[1];
	}
	var board_data={};
	board_data['index']=index;
	
	var comment_data={};
	comment_data['index_board']=index;
	

	$.ajax({ 
			//1. 어떤 type으로 request를 보낼지 결정
			type : 'post',
			//2. 어떤 data type으로 보낼지 결정
			dataType : 'json',
			//3. 요청할 url
			url : '/board/view',
			//4. 보낼 data를 위에 선언한 type에 맞춰서 넣어줌
			data : board_data,
			//request
			
			//response
			//5. 성공했을때 처리할 함수
			success : function(data) {
				if(data.result != false ) {
					$('.output_form').each(function(){
							if($(this).attr('name')=='end_hour'||$(this).attr('name')=='end_minute'){
							data[$(this).attr('name')]=SetZeros(data[$(this).attr('name')],2);
						}
						$(this).append(document.createTextNode(data[$(this).attr('name')]));

					});//end of each
					$.ajax({
						type:'post',
						dataType:'json',
						url:'/comment/list',
						data: comment_data,
						
						success:function(data){

							if(data.result != false){
								$.each(data,function(i,item){
									var div = document.createElement('div');
									div.innerHTML = document.getElementById('pre_set').innerHTML;
									div.style.margin = "15px 20px";
									div.setAttribute("name",item.index);
									console.log(item.name);
									div.firstChild.appendChild(document.createTextNode(item.name+" > "+item.content));
									
									$('#field').append(div);
								});
							}
							else{
								console.log("no list");
							}
						}	
					});
				}
				else {
					alert('fail');
				}
			},//end of success
			//6. 실패해을 때 처리할 함
			error : function(data, status, err) {
				}//end of error
		});//end of ajax
		
		$('#comment_button').live('click',function(event){
			
			if($('#comment_text').val()){
				comment_data['content']=$('#comment_text').val();
				$.ajax({
					type:'post',
					dataType: 'json',
					url:'/comment/write',
					data: comment_data,
					success:function(data){
						location.reload();
					}	
				});
			}
		});
		
		$('#remove_board').live('click',function(event){
			
			$.ajax({
				type:'post',
				dataType: 'json',
				url:'/board/remove',
				data: board_data,
				success:function(data){
					location.href="/community/community";
				}	
			});
			
		});
				
});//end of bind

function SetZeros(num, digits) {
	var Zeros = '';
	num = num.toString();
	if (num.length < digits) {
		for (i = 0; i < digits - num.length; i++)
		Zeros += '0';
	}
	return Zeros + num;
}

function remove_item(obj){
	var remove_comment={};
	
	remove_comment['index']=obj.parentNode.getAttribute('name');

	$.ajax({
		type:'post',
		dataType: 'json',
		url:'/comment/remove',
		data: remove_comment,
		success:function(data){
			console.log(data.content);
			location.reload();
		}	
	});
};

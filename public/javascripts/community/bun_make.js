
//page 로딩이 끝난 후에 각종 이벤트 및 함수를 로딩 
//$(document).unbind().bind('pagecreate',function(){
$(document).ready(function(){
	var tmp = location.href.split('?')[1];
	var city = tmp.split('city=')[1];
	city =setCity(city)
	console.log('binding success');
	//write button을 클릭했을 때 동작할 함수
	$('.write_button').live('click', function(){
		console.log('click');
		var input_data = {}; //json object로 선언
		input_data['city']=city;
		//예외 처리
		if($("input[name='subject']").val()==""){
			alert("제목을 입력하세요.");
			return;
		}
		else if($("input[name='event_month']").val()=="" || $("input[name='event_day']").val()==""  ){
			alert("해당 날짜를 입력하세요.");
			return;
		}
		else if($("input[name='start_hour']").val()=="" || $("input[name='start_minte']").val()==""){
			alert("시작 시간을 입력하세요.");
			return;
		}
		else if($("input[name='end_hour']").val()=="" || $("input[name='end_minte']").val()==""){
			alert("끝나는 시간을 입력하세요");
			return;
		}
		else if($("input[name='location']").val()==""){
			alert("장소를 입력하세요.");
			return;
		}
		else if($("input[name='population']").val()==""){
			alert("원하는 인원을 입력하세요.");
			return;
		}
		else if($("textarea[name='content']").val()==""){
			alert("내용을 입력하세요.");
			return;
		}
		//페이지에 존재하는 모든 input_form class 들을 찾아서
		//차례대로 하나씩 아래 함수를 수행
		$('.input_form').each(function(){
			//각각의 input이 가지고 있는 name이 key가 되고 value가 value가 된다.
			if($(this).val() != "") {
				input_data[$(this).attr('name')] = $(this).val();
			} // end of if

			//jquery ajax 시작
		});//end of each
		
		$.ajax({
				//1. 어떤 type으로 request를 보낼지 결정
				type : 'post',
				//2. 어떤 data type으로 보낼지 결정
				dataType : 'json',
				//3. 요청할 url
				url : '/board/write',
				//4. 보낼 data를 위에 선언한 type에 맞춰서 넣어줌
				data : input_data,
				//5. 성공했을때 처리할 함수
				success : function(data) {
					console.log(data);
					if(data.result == true ) {
						location.href = "/community/bun_show?val="+data.index;
					}
					else {
						alert('fail');
					}
				},//end of success
				//6. 실패해을 때 처리할 함
				error : function(data, status, err) {

				}//end of error
			});//end of ajax
		});//end of live
	
/*	
	//mobi pick
	var picker = $('.datepicker', this);
	picker.mobipick();

	picker.bind("change", function(){
		var date = $(this).val();
		alert(date);

		var dateObject = $(this).mobipick("option", "date");
	});
*/
});//end of bind


function setCity(city_name){
	
	var name;
	
	if(city_name=="seoul")	name="서울";
	if(city_name=="boryeong")	name="보령";
	if(city_name=="jecheon")	name="제천";
	if(city_name=="pyungchang")	name="평창";
	if(city_name=="kangneung")	name="강릉";
	if(city_name=="damyang")	name="담양";
	if(city_name=="boseong")	name="보성";
	if(city_name=="jeongup")	name="정읍";
	if(city_name=="jinju")	name="진주";
	if(city_name=="gyeongju")	name="경주";
	if(city_name=="busan")	name="부산";
	
	return name;
	
};

$(document).ready(function(){
	//공유할 목록 불러오기
	$.ajax({
		url: "/plan/list"
		, dataType : "json"
		, type : "post"
		, success : function(list) {
			var i,j,k;
			for(i=0; i < list.length; i++ ) {
				// console.log(list[i]);
				// for(j=0; j< list[i].data.length; j++) {
				// 	var contents = "[ " + (j+1) + "일차 ] ";
				// 	contents = encodeURI(contents) + "%0D";
				// 	for(k=0; k< list[i].data[j].length; k++) {
				// 		if(list[i].data[j][k].occupied === '1') {
				// 			contents += 
				// 					encodeURI(parseInt(list[i].data[j][k].start_time,10) + "시 부터 " 
				// 					+ ( parseInt(list[i].data[j][k].start_time,10) + 
				// 						parseInt(list[i].data[j][k].period,10) ) + "시 까지") + "%0D";
				// 			contents += encodeURI(" * 관광지명 : " + list[i].data[j][k].text) + "%0D";
				// 		} // end of if
				// 		else if (list[i].data[j][k].occupied === '3') {
				// 			contents += 
				// 					encodeURI(parseInt(list[i].data[j][k].start_time,10) + "시 부터 " 
				// 					+ ( parseInt(list[i].data[j][k].start_time,10) + 
				// 						parseInt(list[i].data[j][k].period,10) ) + "시 까지") + "%0D";
				// 			contents += encodeURI(" * 기차 : " + list[i].data[j][k].text) + "%0D";
				// 		} //end of else if
				// 	}// end of for
				// } // end of for
				var option = "<option index=";
				option += list[i].index + ">"; 
				// option += " contents='"; 
				// option += contents + "'>"; 
				option += list[i].subject + "</option>";
				$('#share_plan option:last').after(option);
			}//end of for
		}
		, error : function() {

		}
	})


	// me2day
	$('#me2_btn_share').click(function(){
		var me2_text_share = encodeURI("http://nailo.herokuapp.com/schedule/" + 
							$('#share_plan option:selected').attr("index"));
		
		$.ajax({
			url: "/share/me2day_get_url"
			, dataType :"json"
			, type:'GET'
			, data: { "me2_text_share" : me2_text_share}
			, success: function(url){
				location.href=url.url;
			}
			, error : function (jqXHR, textStatus, errorThrown) {
				alert( textStatus + ", " + errorThrown );
			}
		}); // end of ajax
	});		// end of click
	
	//kakao
	$('#kakao_btn_share').click(function(){
		var msg = $('#share_plan option:selected').attr("contents");
		var url = "http://nailo.herokuapp.com/schedule/" + $('#share_plan option:selected').attr("index");   
		var appid = "Ilowa Nailo";  
		var appver = "1.0";    
		var appname = "일로와 내일로";   
		var link = new com.kakao.talk.KakaoLink(msg, url, appid, appver, appname);
		link.execute();
	});		// end of click
	

	//twitter
	$('#twitter_btn_share').click(function(){
			var url="http://nailo.herokuapp.com/schedule/" + $('#share_plan option:selected').attr("index");
			url = encodeURI(url);
			var appname="일로와 내일로";
			var text = $('#share_plan').val();
			location.href="https://twitter.com/intent/tweet?original referer="+url+"&text="+text+"&url="+url+"&via="+appname;

    	});		// end of click
	
	// facebook
	$('#fb_btn_share').click(function(){
		var cite="http://nailo.herokuapp.com/schedule/" + $('#share_plan option:selected').attr("index");
		cite = encodeURI(cite);
		var fb_text_share = $('#share_plan').val();
		var new_cite = "http://www.facebook.com/sharer/sharer.php?u="+cite;

		location.href= new_cite;
	});	// end of click
	
});		// end of ready
	

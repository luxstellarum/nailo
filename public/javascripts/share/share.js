$(document).ready(function(){
	
	// me2day
	$('#btn_share').click(function(){
		var text_share = $('#text_share').val();
		$.ajax({
			url: "/share/me2day_get_url"
			, dataType :"json"
			, type:'GET'
			, data: { "text_share" : text_share}
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
		var msg = $('#kakao_text_share').val();
		var url = "#";   
		var appid = "Ilowa Nailo";  
		var appver = "1.0";    
		var appname = "일로와 내일로";   
		var link = new com.kakao.talk.KakaoLink(msg, url, appid, appver, appname);
		link.execute();
	});		// end of click
	
	//twitter
	$('#twitter_btn_share').click(function(){
			var url="https%3A%2F%2Ftestlink.com";
			var appname="일로와 내일로";
			var text = $('#twitter_text_share').val();
			location.href="https://twitter.com/intent/tweet?original referer="+url+"&text="+text+"&url="+url+"&via="+appname;

    	});		// end of click
	
});		// end of ready
	

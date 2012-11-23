$(document).ready(function(){
	
	// me2day
	$('#me2_btn_share').click(function(){
		var me2_text_share = $('#share_plan').val();
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
		var msg = $('#share_plan').val();
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
			var text = $('#share_plan').val();
			location.href="https://twitter.com/intent/tweet?original referer="+url+"&text="+text+"&url="+url+"&via="+appname;

    	});		// end of click
	
	// facebook
	$('#fb_btn_share').click(function(){
		var cite="http://blacky512.blog.me"
		var fb_text_share = $('#share_plan').val();
		var new_cite = "http://www.facebook.com/sharer/sharer.php?u="+cite

		location.href= new_cite;
	});	// end of click
	
});		// end of ready
	

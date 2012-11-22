// me2day

$(document).ready(function(){
	var text_share = $('#text_share').val();
	$('#btn_share').click(function(){
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
});		// end of ready
	


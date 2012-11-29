$(document).ready(function(){
	$('.search_btn').live('click', function(){
		var input_data = {};
		
		$.ajax({
			type : 'post'
			, dataType: 'json'
			, url: '/search/search' 	// keyword_arr 
			, data: search_text
			, success: function(data){
				console.log(data);
				if(data.result != false){
					var search_div;
					$("#searchbrowser #wrapper").append(search_div);

					for(i=0; i<data.length; i++){
						search_div = "<div class=''>"+data[i]+"</div>";
						$('#wrapper').append(search_div);
					}

					alert('success');
				}
				else{
					alert('fail');
				}
			} 	// end of success
			
			, error: function(data, status, err){
				
			}	// end of error
		}); 		// end of ajax
	
	});	// end of live
}); 	// end of ready

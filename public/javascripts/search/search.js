$(document).ready(function(){
	$('.search_btn').live('click', function(){	
		$.ajax({
			type : 'post'
			, dataType: 'json'
			, url: '/search/search' 	// keyword_arr 
			, data: { 'key' : $('.search_text').val() }
			, success: function(data){
				if(data.result != false){
				console.log('data:', data);
					var search_div;
					$("#searchbrowser #wrapper").html(" ");
					for(i=0; i<data.length; i++){
						search_div = "<div>"+data[i]+"</div>";
						$("#searchbrowser #wrapper").append(search_div);
						displayRandom();
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

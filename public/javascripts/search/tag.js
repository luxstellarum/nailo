
$(document).ready(function(){
	$('#city_btn').live('click', function(){
		var input_data = {};
		
		$('.city_form').each(function(){
			if($(this).val() != ""){
				input_data[$(this).attr('name')] = $(this).val();
			}	// end of if
		}); 	// end of each
		
		$.ajax({
			type : 'post'
			, dataType: 'json'
			, url: '/city/write'
			, data: input_data
			, success: function(data){
				console.log(data);
				if(data.result == true){
					alert('success');
					$(location).attr('href', '/')
				}
				else{
					alert('fail');
				}
			}, 		// end of success
			
			error: function(data, status, err){
				
			}	// end of error
		}); 		// end of ajax
	
	});	// end of live
	
	$('#station_btn').live('click', function(){
		var input_data = {};
		
		$('.station_form').each(function(){
			if($(this).val() != ""){
				input_data[$(this).attr('name')] = $(this).val();
			}	// end of if
		}); 	// end of each
		
		console.log(input_data);
		
		$.ajax({
			type : 'post'
			, dataType: 'json'
			, url: '/station/write'
			, data: input_data
			, success: function(data){
				console.log(data);
				if(data.result == true){
					alert('success');
					$(location).attr('href', '/search/tag')
				}
				else{
					alert('fail');
				}
			}, 		// end of success
			
			error: function(data, status, err){
				
			}	// end of error
		}); 		// end of ajax
	
	});	// end of live
	
	$('#sights_btn').live('click', function(){
		var input_data = {};
		
		$('.sights_form').each(function(){
			if($(this).val() != ""){
				input_data[$(this).attr('name')] = $(this).val();
			}	// end of if
		}); 	// end of each
		
		$.ajax({
			type : 'post'
			, dataType: 'json'
			, url: '/sights/write'
			, data: input_data
			, success: function(data){
				console.log(data);
				if(data.result == true){
					alert('success');
					$(location).attr('href', '/search/tag')
				}
				else{
					alert('fail');
				}
			}, 		// end of success
			
			error: function(data, status, err){
				
			}	// end of error
		}); 		// end of ajax
	
	});	// end of live
	

	
});			 // end of ready

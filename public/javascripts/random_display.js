function displayRandom(){
	
	if(document.getElementById("wrapper")){
		tags=document.querySelectorAll("#wrapper div");
		for(var i=0; i<tags.length; i++){
			tags[i].className = "s"+(i+1);
		}	
	}
	
	if(document.getElementById("wrapper2")){
		tags2=document.querySelectorAll("#wrapper2 div");
		for(var i=0; i<tags.length; i++){
			tags2[i].className = "s"+(i+1);
		}	
	}
		
	if(document.getElementById("nailo_record")){
		board=document.querySelectorAll("#nailo_record div");
		for(var i=0; i<board.length; i++){
			board[i].className = "color"+(i+1);
			console.log(tags[i].className);
		}	
	}
};
function displayRandom(){
	var tags=document.querySelectorAll("#wrapper span");
	console.log(tags.length);
	for(var i=0; i<tags.length; i++){
		divs[i].className = "s"+(i+1);
	}
	if(document.getElementById("wrapper2")){
		tags2=document.querySelectorAll("#wrapper2 div");
		for(var i=0; i<tags.length; i++){
			tags2[i].className = "s"+(i+1);
		}	
	}	
};
			

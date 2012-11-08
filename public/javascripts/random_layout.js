function displayRandom(){
	var tags=document.querySelectorAll("#wrapper span");
	console.log(tags.length);
	for(var i=0; i<tags.length; i++){
		divs[i].className = "s"+(i+1);
	}
};
			

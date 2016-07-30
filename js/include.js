function includeHTML(){
	var allTags = document.getElementsByTagName("*");
	var tagNum = allTags.length;
	var node, htmlFile, xhttp;
	for (i = 0; i < tagNum; i++){
		if (allTags[i].getAttribute("include-html")){
			node = allTags[i].cloneNode(false);
			htmlFile = allTags[i].getAttribute("include-html");
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.status == 200) {
					node.removeAttribute("include-html");
					node.innerHTML = xhttp.responseText;
					allTags[i].parentNode.replaceChild(node, allTags[i]);
					includeHTML();
        		}
      		}      
      		xhttp.open("GET", htmlFile, true);
      		xhttp.send();
      		return;
    	}
  	}
}
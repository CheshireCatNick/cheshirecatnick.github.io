var timer;
function addWidth(C, J, P, H, CDelta, JDelta, PDelta, HDelta, maxC){
	var	CWidth = parseFloat(C.style.width);
	var	JWidth = parseFloat(J.style.width);
	var	PWidth = parseFloat(P.style.width);
	var	HWidth = parseFloat(H.style.width);
	if (CWidth >= maxC){
		clearInterval(timer);
		return;
	}
	C.style.width = CWidth + CDelta + "%";
	J.style.width = JWidth + JDelta + "%";
	P.style.width = PWidth + PDelta + "%";
	H.style.width = HWidth + HDelta + "%";
}

function moveProgressBar(){
	var C = document.getElementById("C");
	var J = document.getElementById("java");
	var P = document.getElementById("python");
	var H = document.getElementById("html");

	var maxC = 90, maxJ = 90, maxP = 80, maxH = 70;
	
	var animationTime = 5000;
	var addWidthPeriod = 30;
	var addWidthNum = animationTime / addWidthPeriod;
	var CDelta = maxC / addWidthNum;
	var JDelta = maxJ / addWidthNum;
	var PDelta = maxP / addWidthNum;
	var HDelta = maxH / addWidthNum;

	C.style.width = "1%";
	J.style.width = "1%";
	P.style.width = "1%";
	H.style.width = "1%";
	timer = setInterval(function(){addWidth(C, J, P, H, CDelta, JDelta, PDelta, HDelta, maxC);}, addWidthPeriod);
}
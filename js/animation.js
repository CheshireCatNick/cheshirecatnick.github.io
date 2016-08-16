// animation for progress bar
var progressBarTimer;
function addWidth(C, J, P, H, CDelta, JDelta, PDelta, HDelta, maxC){
	var	CWidth = parseFloat(C.style.width);
	var	JWidth = parseFloat(J.style.width);
	var	PWidth = parseFloat(P.style.width);
	var	HWidth = parseFloat(H.style.width);
	if (CWidth >= maxC){
		clearInterval(progressBarTimer);
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
	progressBarTimer = setInterval(function(){
				addWidth(C, J, P, H, CDelta, JDelta, PDelta, HDelta, maxC);
			}, addWidthPeriod);
}

function startProgressBar(){
	moveProgressBar();
	var timePeriod = 10000;
	setInterval(moveProgressBar, timePeriod);
}

// animation for show notification
function showNotification(msg, type){
	var notification = document.getElementById("notification");
	notification.className = "show";
	notification.innerHTML = msg;
	var backgroundColor, fontColor;
	if (type == "success"){
		backgroundColor = "#0077B5";
		fontColor = "white";
	}
	else if (type == "warning"){
		backgroundColor = "#BD362F";
		fontColor = "white";
	}
	notification.style.backgroundColor = backgroundColor;
	notification.style.color = fontColor;
	setTimeout(function(){
		notification.className = "";
	}, 11000);
}

// animation for typing
var stringIndex = 0, wordIndex = 0, blinkCount = 0;
var typeTimer, backTimer, stayTimer;
var strings = ["this is string1", "this is string2"];
var charArray;
var typeDisplayer;
var addWordPeriod = 300, removeWordPeriod = 100, blinkPeriod = 500;
var blinkTime = 8
function removeWord(){
	if (wordIndex == 0){
		typeDisplayer.innerHTML = "";
		stringIndex++;
		if (stringIndex == strings.length)
			stringIndex = 0;
		clearInterval(backTimer);
		type();
	}
	else {
		var tmp = typeDisplayer.innerHTML;
		// remove the last char and '|'
		tmp = tmp.substring(0, tmp.length - 2);
		// add '|'
		tmp += "|";
		typeDisplayer.innerHTML = tmp;
		wordIndex--;
	}
}
function stay(){
	var tmp = typeDisplayer.innerHTML;
	var len = tmp.length;
	if (blinkCount == blinkTime){
		// assert it ends with '|'
		if (tmp.charAt(len - 1) != '|'){
			tmp += "|";
			typeDisplayer.innerHTML = tmp;
		}
		blinkCount = 0;
		backTimer = setInterval(removeWord, removeWordPeriod);
		clearInterval(stayTimer);
	}
	else {
		// string ends with '|'
		if (tmp.charAt(len - 1) == '|')
			tmp = tmp.substring(0, len - 1);
		else
			tmp += "|";
		typeDisplayer.innerHTML = tmp;
		blinkCount++;
	}
}
function addWord(){
	if (wordIndex == charArray.length){
		stayTimer = setInterval(stay, blinkPeriod);
		clearInterval(typeTimer);
	}
	else {
		var tmp = typeDisplayer.innerHTML;
		// remove '|'
		tmp = tmp.substring(0, tmp.length - 1);
		// add a char and '|'
		tmp += charArray[wordIndex] + "|";
		// put back
		typeDisplayer.innerHTML = tmp;
		wordIndex++;
	}
}
function type(){
	charArray = strings[stringIndex].split("");
	wordIndex = 0;
	typeTimer = setInterval(addWord, addWordPeriod);
}
function startType(){
	typeDisplayer = document.getElementById("typeDisplayer");
	type();
}

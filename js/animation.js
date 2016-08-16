// animation for progress bar
var progressBarTimer;
var C, J, P, H, Js;
var maxC = 90, maxJ = 90, maxP = 80, maxH = 75, maxJs = 65;
var animationTime = 4000;
var addWidthPeriod = 40;
var addWidthNum = animationTime / addWidthPeriod;
var CDelta = maxC / addWidthNum;
var JDelta = maxJ / addWidthNum;
var PDelta = maxP / addWidthNum;
var HDelta = maxH / addWidthNum;
var JsDelta = maxJs / addWidthNum;
var animationPeriod = 5000;

function addWidth(){
	var	CWidth = parseFloat(C.style.width);
	var	JWidth = parseFloat(J.style.width);
	var	PWidth = parseFloat(P.style.width);
	var	HWidth = parseFloat(H.style.width);
	var	JsWidth = parseFloat(Js.style.width);
	if (CWidth >= maxC){
		clearInterval(progressBarTimer);
		setTimeout(moveProgressBar, animationPeriod);
		return;
	}
	C.style.width = CWidth + CDelta + "%";
	J.style.width = JWidth + JDelta + "%";
	P.style.width = PWidth + PDelta + "%";
	H.style.width = HWidth + HDelta + "%";
	Js.style.width = JsWidth + JsDelta + "%";
}
function moveProgressBar(){
	C.style.width = "1%";
	J.style.width = "1%";
	P.style.width = "1%";
	H.style.width = "1%";
	Js.style.width = "1%";
	progressBarTimer = setInterval(addWidth, addWidthPeriod);
}
function startProgressBar(){
	C = document.getElementById("C");
	J = document.getElementById("java");
	P = document.getElementById("python");
	H = document.getElementById("html");
	Js = document.getElementById("js");
	moveProgressBar();
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
var strings = ["this is my typing animation ｡:.ﾟヽ(*´∀`)ﾉﾟ.:｡",
				"spent me a whole afternoon working on it (#`Д´)ﾉ",
				"better use others package next time...(๑•́ ₃ •̀๑)"];
var charArray;
var typeDisplayer;
var addWordPeriod = 150, removeWordPeriod = 80, blinkPeriod = 500;
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
}/*
implement if needed
function stayStart(){
	var tmp = typeDisplayer.innerHTML;
	var len = tmp.length;
	if (blinkCount == blinkTime){
		// assert it ends with nothing
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
}*/
function stayEnd(){
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
		stayTimer = setInterval(stayEnd, blinkPeriod);
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

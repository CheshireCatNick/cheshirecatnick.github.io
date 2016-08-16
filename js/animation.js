// animation for progress bar
var progressBarTimer;
var animationTime = 4000;
var addWidthPeriod = 40;
var totalFrameNum = animationTime / addWidthPeriod;
var animationPeriod = 5000;
var frameCount = 0;
var bars = [];
function Bar(name, max){
	this.name = name;
	this.element = document.getElementById(name);
	this.maxWidth = max;
	this.delta = this.maxWidth / totalFrameNum;
	this.width = parseFloat(this.element.style.width);
	this.setWidth = function(w){
		this.element.style.width = w + "%";
		this.width = w;
	};
	this.addWidth = function(delta){
		this.width += delta;
		this.setWidth(this.width);
	};
	this.isFinish = function(){
		return (this.width >= this.maxWidth);
	}
}
function addWidth(){
	frameCount++;
	var completion = frameCount / totalFrameNum;
	if (bars[0].isFinish()){
		clearInterval(progressBarTimer);
		setTimeout(moveProgressBar, animationPeriod);
		return;
	}
	var ratio = (completion <= 0.5) ? completion : (1 - completion);
	for (var i = 0; i < bars.length; i++){
		var delta = 4 * ratio * bars[i].delta;
		bars[i].addWidth(delta);
	}
}
function moveProgressBar(){
	for (var i = 0; i < bars.length; i++)
		bars[i].setWidth(1);
	frameCount = 0;
	progressBarTimer = setInterval(addWidth, addWidthPeriod);
}
function startProgressBar(){
	bars.push(new Bar("C", 90));
	bars.push(new Bar("java", 90));
	bars.push(new Bar("python", 80));
	bars.push(new Bar("html", 75));
	bars.push(new Bar("js", 65));
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

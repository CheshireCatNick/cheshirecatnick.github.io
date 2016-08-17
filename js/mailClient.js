var ip = "140.112.30.34";
var port = 2147;
var socket;
function connectToMailSender(){
	socket = io.connect("http://" + ip + ":" + port);
	socket.on("sendResult", function(result){
		if (result == "success"){
			showNotification("Your message has been sent. I'll reply ASAP. Thanks for your contact!",
								"success");
			document.getElementById("name").value = "";
			document.getElementById("emailAddress").value = "";
			document.getElementById("content").value = "";
		}
		else
			showNotification("You sent too many emails today. Come back tomorrow : )",
								"warning");
		});
}

function send(){
	var name = document.getElementById("name").value;
	var emailAddress = document.getElementById("emailAddress").value;
	var content = document.getElementById("content").value;
	var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	/*	note for this regular expression
		/:  	start and end of a regular expression in js
		^: 		beginning of a string
		\w: 	word char and _; equivalent to [A-Za-z0-9_]
		+: 		last expression repeat for one or more times
		\: 		next char is just a char, not some kind of special expression
		?: 		last expression repeat for zero or one time
		*: 		last expression repeat for zero or more times
		{2, 3}: last expression repeat 2 or 3 times, e.g. .com, .tw, .org...
		$: ending of a string
	*/
	if (!reg.test(emailAddress)){
		showNotification("Sorry. I won't be able to reply if your email address is invalid.",
							"warning");
		return;
	}
	if (socket.connected)
		socket.emit("sendEmail", name, emailAddress, content);
	else
		showNotification("Sorry. My mail sender is down : (<br/>Please send your message to CheshireCatNick@gmail.com",
							"warning");
}
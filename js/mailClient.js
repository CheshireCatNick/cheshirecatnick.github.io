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
	if (socket.connected)
		socket.emit("sendEmail", name, emailAddress, content);
	else
		showNotification("Sorry. My mail sender is down : (<br/>Please send your message to CheshireCatNick@gmail.com",
							"warning");
}
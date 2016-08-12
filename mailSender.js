var ip = "140.112.30.34";
var port = 2147;

var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport("smtps://cheshirecatnick%40gmail.com:st55330066@smtp.gmail.com");
/*
// for https
var fs = require("fs");
var options = {
			key: fs.readFileSync("./httpsFiles/privateKey.pem"),
			cert: fs.readFileSync("./httpsFiles/cert.pem")
		};

var server = require("https").createServer(options, function(req, res){
	res.writeHead(200);
	res.end("Hello world\n");
});
*/
var server = require("http").createServer();
server.listen(port, ip);
var io = require("socket.io").listen(server);
console.log("server is running on " + ip + ":" + port);
io.sockets.on("connection", function(socket){
	socket.on("sendEmail", function(name, emailAddress, content){
		var info = "from " + name + " <" + emailAddress + ">";
		var email = {
			to: "cheshirecatnick@gmail.com",
			subject: "You got an email from your websites!",
			text: info + "\n\n" + content
		};
		transporter.sendMail(email, function(err, errInfo){
			if (err)
				console.log("err");
			else {
				console.log("Receive an email " + info);
				console.log(content);
				console.log("Email was sent to CheshireCatNick");
			}
		});
	});
});


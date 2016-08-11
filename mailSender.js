var ip = "127.0.0.1";
var port = 2147;

var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport("smtps://cheshirecatnick%40gmail.com:st55330066@smtp.gmail.com");
var email = {
	from: '"Nicky" <st945306@gmail.com>',
	to: 'cheshirecatnick@gmail.com',
	text: 'succeed!'
};
/*
transporter.sendMail(email, function(err, info){
	if (err)
		console.log("err");
	else
		console.log("email sent!");
});
*/
var server = require("http").createServer();
server.listen(port, ip);
var io = require("socket.io").listen(server);
console.log("server is running on " + ip + ":" + port);
io.sockets.on("connection", function(socket){
	socket.on("sendEmail", function(email){
		console.log("got a mail");		
	
	});
});


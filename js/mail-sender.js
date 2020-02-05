const config = require('../config');
const account = config.account;
const password = config.password;
const fs = require('fs');
const https = require('https');

var ip = config.host;
var port = config.port;

var nodemailer = require("nodemailer");
var http = require("http");
var socketIO = require("socket.io");

var server;
var transporter;
var blacklist;

function createHttpsServer() {
	const options = {
		key: fs.readFileSync(config.certFile),
		cert: fs.readFileSync(config.privateKeyFile)
	};
	server = https.createServer(options, function(req, res){
		res.writeHead(200);
		res.end("Server is alive!\n");
	});
	server.listen(port, ip);
	console.log("https server is running on " + ip + ":" + port);
}

// this api needs to be updated
function getIPInfo(ip){
	var option = {
		host: "www.ipgeni.com",
		port: 80,
		path: "/api/" + ip,
		method: "GET"
	}
	var req	= http.request(option, function(res){
		var result = "";
		res.on("data", function(data){
			result += data;	
		});
		res.on("end", function(){
			console.log(result);
			var resultObj = JSON.parse(result);
			console.log(resultObj);
		});

	});
	req.end();
}
function createSocketIO(){
	var io = socketIO.listen(server);
	io.sockets.on("connection", function(socket){
		socket.on("sendEmail", function(name, emailAddress, content){
			var ip = socket.handshake.address;
			var info = "from " + ip + " " + name + " <" + emailAddress + ">";	
			if (ip in blacklist)
				blacklist[ip]++;
			else
				blacklist[ip] = 1;
			console.log(blacklist);
			if (blacklist[ip] > 10){
				console.log("ip " + ip + " is blocked");
				socket.emit("sendResult", "failed");
			}
			else {
				var email = {
					to: "cheshirecatnick@gmail.com",
					subject: "You got an email from your websites!",
					text: info + "\n\n" + content
				};
				transporter.sendMail(email, function(err, errInfo){
					if (err)
						console.log("err");
					else {
						console.log("receive an email " + info);
						console.log(content);
						console.log("email was sent to CheshireCatNick");
						socket.emit("sendResult", "success");
					}
				});
			}
		});
		socket.on("checkAlive", function(){
			console.log("client check alive");
			socket.emit("replyCheckAlive", "alive");	
		});
	});
	console.log("socket.io is created");
}
function resetBlacklist(){
	var keys = Object.keys(blacklist);
	for (var i in keys)
		blacklist[keys[i]] = 1;
	console.log("blacklist reset");
}
function createBlacklist() {
	blacklist = {};
	setInterval(resetBlacklist, 86400 * 1000);
	console.log("blacklist is created");
}
function createMailSender() {
	transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: account,
			pass: password
		}
	});
	transporter.verify(function(error, success) {
		if (error) {
			console.log(error);
		} 
		else {
			console.log('Mail sender is created');
		}
	});
}
function createHttpServer(){
	server = http.createServer();
	server.listen(port, ip);
	console.log("http server is running on " + ip + ":" + port);
}
createHttpsServer();
//createHttpServer();
createMailSender();
createBlacklist();
createSocketIO();
//getIPInfo("140.112.30.34");

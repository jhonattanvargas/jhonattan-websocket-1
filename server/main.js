var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = 14113 //process.env.PORT || 5000


var messages=[{
		id:1,
		text:"Hola soy un mensaje",
		author: "Jhonattan Vargas"
	}];

app.use(express.static('public'));

app.get('/hello',function(req,res){
	res.status(200).send("Holi Mundo!");
});

io.on('connection',function(socket){
	console.log('Alguien se ha conectado con Socket');
	socket.emit('messages',messages);
	
	socket.on('new-message',function(data){
		messages.push(data);

		io.sockets.emit('messages',messages);
	});
})

server.listen(port,function(){
	console.log("Servidor corriendo en ");
	console.log(port);
});
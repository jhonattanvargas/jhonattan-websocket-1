
var socket = io.connect('https://jhonattan-websocket-1.herokuapp.com:14113',{'forceNew':true});

socket.on('messages',function(data){
	console.log(data);
	render(data);
})

function render(data){
	var html = data.map(function(elem,index){
		return(`<div>
					<strong>${elem.author}</strong>:
					<en>${elem.text}</en>
				</div>`);
	}).join(" ");
	document.getElementById('messages').innerHTML = html;
}

function addMessage(e){
	var payload ={
		author: document.getElementById('username').value,
		text: document.getElementById('texto').value
	};
	socket.emit('new-message',payload);
	return false;
}
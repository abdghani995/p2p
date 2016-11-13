
var getUserMedia = require('getusermedia')

getUserMedia({video:true,audio:true},function(err,stream){
	

	var Peer = require('simple-peer');
	var peer = new Peer({
		initiator: location.hash === '#init',
		trickle: false,
		stream:stream
	})

	document.getElementById('connect').addEventListener('click',function(){
		var otherId = JSON.parse(document.getElementById('otherId').value);
		peer.signal(otherId);
		var myvideo = document.createElement('video');
		document.body.appendChild(myvideo);
		myvideo.src = window.URL.createObjectURL(stream)
	})


	peer.on('signal',function(data){
		document.getElementById('yourId').value = JSON.stringify(data);
	})

	
	document.getElementById('send').addEventListener('click',function(){
		var message = document.getElementById('message').value;
		document.getElementById('messages').textContent += 'You :'+ message + '\n'
		peer.send(message)
	})

	peer.on('data',function(data){
		document.getElementById('messages').textContent += 'Other Client : '+data + '\n' 
	})

	peer.on('stream',function(streamData){
		var video = document.createElement('video');
		document.body.appendChild(video);
		video.src = window.URL.createObjectURL(streamData)
		video.play()
	})

})
	
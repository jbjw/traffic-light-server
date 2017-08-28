var socketioClient = require('socket.io-client')
var socket = socketioClient('http://localhost:5000')
socket.on('connect', function() {
	console.log('connect')
})

socket.on('event', function(data) {
	console.log(`event`, data)
})

socket.on('disconnect', function() {

	console.log('disconnect')
})

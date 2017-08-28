'use strict'

const url = require('url')

const io = require('socket.io')
const server = io(80)

server.on('connection', function( socket ) {
	console.log( `a user connected ${socket.id}` )

	server.emit( 'user_joined', { msg: 'blah blah joined', } )
	// socket.broadcast.emit( 'hi' )

	socket.on( 'message', function( msg ) {
		console.log( `message from ${socket.id}: ${msg}` )
		// io.emit( 'chat message', x )
	} )

	socket.on( 'disconnect', function( ) {
		console.log( `${socket.id} disconnected` )
	} )
} )

// path.resolve(APP_DIR, 'main.jsx'),
// app.use('/static', express.static(path.join(__dirname, 'public')))
// app.use(express.static('dist'))
//
// app.use(function (req, res) {
// 	console.log('req')
// 	res.send({ msg: "hello" })
// });

// server.on('request', app);

// const SocketIO = require('socket.io')
// const socketServer = SocketIO()
// const nsp = SocketIO('/test')

// io.emit vs io.sockets.emit
// list all sockets
// io.sockets

// nsp.on('connection', function(socket) {
//
// 	nsp.emit('message', {msg: 'welcome to da server'})
//
// 	socket.on('direct message', function (from, msg) {
// 		console.log('I received a private message by ', from, ' saying ', msg);
// 	})
//
// 	socket.on('disconnect', function () {
// 		console.log(`{socket} disconnected`)
// 		nsp.emit('user disconnected');
// 	})
// })

// socketServer.on('connection', function(socket) {
//
// 	socketServer.emit('message', {msg: 'welcome to da server'})
//
// 	socket.on('direct message', function (from, msg) {
// 		console.log('I received a private message by ', from, ' saying ', msg);
// 	})
//
// 	socket.on('disconnect', function () {
// 		console.log(`{socket} disconnected`)
// 		socketServer.emit('user disconnected');
// 	})
// })

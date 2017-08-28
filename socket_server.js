'use strict';

const util = require( 'util' );
// util.inspect()

const ws = require( 'ws' );

// consider using existing server, check docs

const port = 80;
const server = new ws.Server( { port: port }, function () {
	console.log( 'server started on port ' + port );
} );

server.broadcast = function ( data ) {
	server.clients.forEach( function ( client ) {
		client.send( data );
	} );
};

// wss.handleUpgrade( request, socket, upgradeHead, function( socket ) {

let id = 1;
let count = 0;

server.on( 'connection', function ( socket ) {
	socket.id = id++
	console.log( `connection from: ${socket.id} ${socket.upgradeReq.connection.remoteAddress}` )
	// server.broadcast( JSON.stringify( { type: 'message', message: socket.id + ' has joined' } ) )
	server.broadcast( `connection from: ${socket.id} ${socket.upgradeReq.connection.remoteAddress}` )
	socket.send( 'welcome' )

	// update();

	// console.log( wss.clients );
	// console.log( 'headers.host: ' + socket.upgradeReq.headers.host );
	// console.log( '.url: ' + socket.upgradeReq.url );

	socket.on( 'message', function ( message, flags ) {
		socket.send( 'server got your message' )
		console.log( 'received message from: ', socket.id, message )
		// console.log( 'with flags: ', flags )
		const msgObj = JSON.parse( message )
		if ( msgObj.type == 'click' ) {
			count++
			update()
		}
	} )

	socket.on( 'close', function () {
		console.log( 'closed ' + socket.id );
		server.broadcast( JSON.stringify( { type: 'message', message: socket.id + ' has left' } ) )
	} )
} )

function update() {
	const updateObj = {
		type: 'update',
		value: count
	};
	server.broadcast( JSON.stringify( updateObj ) );
}

// server.close

// socket.close
// socket.pause, .resume
// socket.ping, .pong
// .terminate
// .stream

// what is websocket mask

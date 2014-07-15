/**
 *	socket.js
 */

var Emitter = require('events').EventEmitter;
var debug = require('debug')('ROA: ## SOCKET ##');

module.exports = exports = Socket;

// basic event status..
exports.events = [
	'error',
	'connect',
	'disconnect',
	'teardown',
	'ready',
	'newClient'
];

var emit = Emitter.prototype.emit;

function Socket (arena, client) {
	this._arena = arena;
	this._server = arena.server;
	this._protocol = arena.protocol;

	this._id = client.id;
	this._connect = client.connect;
	this._request = client.request;

	this._spaces = [];
	this._acks = {};
	this._isConnected = true;
	this._isDisconnected = false;
}

Socket.prototype.__proto__ = Emitter.prototype;

Socket.prototype.exchange = function(client, srv, ev) {
	if (~exports.events.indexOf(ev)) {
		emit.apply(this, arguments);
	} else {
		// otherwise broadcast message and get callbacks..
	}
};
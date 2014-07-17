/**
 *	socket.js
 */

var Emitter = require('events').EventEmitter;
var debug = require('debug')('ROA: ## SOCKET ##');

module.exports = exports = Unit;

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

function Unit (arena, client) {
	this._arena = arena;
	this._server = arena.server;
	this._protocol = arena.protocol;
	this._client = client;

	this._id = client.id;
	this._connect = client.connect;
	this._request = client.request;

	this._spaces = [];
	this._acks = {};
	this._isConnected = true;
	this._isDisconnected = false;
	this._asleep = false;

	this._awakePeriod = 0;
}

Unit.prototype.__proto__ = Emitter.prototype;

Unit.prototype.exchange = function(client, srv, ev) {
	if (~exports.events.indexOf(ev)) {
		emit.apply(this, arguments);
	} else {
		// otherwise broadcast message and get callbacks..
	}
};

Unit.prototype.onSleep = function(period, reason) {
	if (!this._isConnected) {
		return this;
	}

	this.sleep();
	this._arena.nap(this);
	this._client.nap(this);
	this._isConnected = false;
	this._asleep = true;

	this.emit('asleep', period, reason);
}

Unit.prototype.onClose = function(reason) {
	if (!this._isConnected) {
		return this;
	}

	this.closeAll(this._id);
	this._arena.leave(this);
	this._client.leave(this);
	this._isConnected = false;
	this._isDisconnected = true;

	this.emit('disconnect', reason);
}

Unit.prototype.sleep = function() {

};

Unit.prototype.awake = function() {

};

Unit.prototype.closeAll = function(id) {
	this.emit('close', id);
};



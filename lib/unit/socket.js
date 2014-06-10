
/*
	Author : Daniel Q. Kim
	Date : 2014.4.25

	Socket does the following :
	 - packet construction, configurations
	 - has base packets' status
	 - fundamental class for interacting with things and server
	 - belongs to name fields or arena
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

var dataTypes = [
	'json',
	'broadcast',
	'unicast'
];

var connTypes = [
	'web',
	'mobile',
	'thing',
	'service'
];

var emittee = Emitter.prototype.emit;

function Socket (arena, client) {

	this._arena = arena;

	this._id = client.id;
	this._connect = client.connect;
	this._request = client.request;

	this._type = client.connTypes;
	this._space = [];
	this._acks = {};
	this._isConnected = true;
	this._isDisconnected = false;

	this.onInit();
}

Socket.prototype.__proto__ = eventEmitter.prototype;
Socket.prototype.__defineGetter__('request', function() {
	return this._connect.request;
});


Socket.prototype.onInit = function() {
	this.agentState = 'init';
	debug('Socket On Init ');
	console.log('%s', this.agentState);
};

Socket.prototype.manageAgentState = function(status) {

	debug('status now');
	switch (this.status) {
		case 'ready':
			break;
		case 'open':
			break;
		case 'init':
			break;
		case 'teardown':
			break;
		case 'connect':
			break;
		case 'disconnect':
			break;
		case 'close':
	    debug('packet received with closed socket');
			break;
	}
};

Socket.prototype.send =
Socket.prototype.write = function(){
  var msgs = Array.prototype.slice.call(messages);
  
  msgs.unshift('message');
  this.emit.apply(this, msgs);
  return this;
};

Socket.prototype.leaveArena = function(arena, fn) {
	var self = this;

	self.chrome.del(this.id, arena, function(err) {
		if (err) {
			return fn && fn(err);
		}
		self._space.splice(self._space.indexOf(arena, 1));
		fn && fn(null);
	});
	return this;
};

Socket.prototype.joinArena = function(arena, fn) {
	var self = this;

	if (~this._space.indexOf(arena)) return this;
  this.chrome.add(this.id, arena, function(err){
  	if (err) return fn && fn(err);

    self._space.push(arena);
    fn && fn(null);
  });
  return this;
};

/**
 *	merge arenas so that communication among platforms are possible
 *	@api private
 */
Socket.prototype.mergeArena = function(client, target, fn) {
	var self = this;
	var flag = client._type;

	if (this._space) {

		switch (flag) {
			case this.connTypes.thing: // CoAP to target.. need to use CoAP's RESTful property
				// get target server type and automatically join them to arena

				break;
			case this.connTypes.web:
			case this.connTypes.mobile:
				break;
			case this.connTypes.service:
				break;
			default:
				break;
		}
	}
};

Socket.prototype.registerArena = function(arena, fn) {

};

Socket.prototype.onClose = function () {

};

Socket.prototype.onOpen = function () {

};

Socket.prototype.onTeardown = function () {

};

Socket.prototype.onReady = function () {

};

Socket.prototype.onConnect = function () {

};


// sends message packets ..
Socket.prototype.sendPacket = function (type, data, callback) {

};


// sends data packets ..
Socket.prototype.sendData = function (data, callback) {

};


Socket.prototype.close = function() {

};



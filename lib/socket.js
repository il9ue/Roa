
/*
	Author : Daniel Q. Kim
	Date : 2014.4.25
 */

var events = require('events');
var eventEmitter = events.EventEmitter;
var debug = require('debug')('ROA: ## SOCKET ##');

module.exports = exports = Socket;

// basic event status..
exports.eventStates = [
	'error',
	'connect',
	'disconnect',
	'teardown',
	'ready'
];

function Socket (field, agent) {

	this.field = field;
	this.id = agent.id;
	this.space = [];
	this.acks = {};
	this.isConnected = true;
	this.isDisconnected = false;

	this.onInit();
}

//util.inherits(Socket, events.EventEmitter);
Socket.prototype.__proto__ = eventEmitter.prototype;

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

Socket.prototype.onPackets = function (packet) {
	debug('received packets %j', packet);

	if (packet) {
		switch (packet.type) {
		}
	}
};

Socket.prototype.onClose = function () {

	if (this.agentState != 'close') {

	} else {
		debug('socket already closed.');
	}
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
	if (this.agentState != 'teardown') {

	}

};


// sends data packets ..
Socket.prototype.sendData = function (data, callback) {

};


Socket.prototype.close = function() {
	if (this.agentState == 'open') {
		this.agentState = 'teardown';

	}
};



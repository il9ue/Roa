
/*
	Author : Daniel Q. Kim
	Date : 2014.4.25
 */

var events = require('events');
var eventEmitter = events.EventEmitter;
var debug = require('debug')('ROA:SOCKET');

module.exports = Socket;

function Socket (id, server, protocol, request, category) {

	this.id = id;
	this.server = server;
	this.agentState = 'initiating';
	this.writeBuffer = [];
	this.request = request;

	// timeout check..
	this.ackTimeoutTimer = null;
	this.updateTimeoutTimer = null;
	this.rttTimeoutTimer = null;

	this.onInit();
}

//util.inherits(Socket, events.EventEmitter);
Socket.prototype.__proto__ = eventEmitter.prototype;

Socket.prototype.onInit = function() {
	this.agentState = 'init';

};

Socket.prototype.onPacket = function(packet) {

	if (this.agentState == 'open') {
		this.emit('packet', packet);

		switch (packet.type) {
			case 'error':
				break;
			case 'message':
				break;
			case 'ping':
				break;
			case 'heartbeat':
				break;

		}
	} else {
		
	}
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



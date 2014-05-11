// observer.js

var events = require('events');
var eventEmitter = events.EventEmitter;
var debug = require('debug')('ROA: ## OBSERVER ##');

module.exports = exports = Observer;

// basic event status..
exports.observeStates = [
	'error',
	'discovered',
	'not_found',
	'not_available',
	'connectable',
];

exports.connectivity = [
	'no_internet_connection',
	'bluetooth_connection',
	'internet_connection',
	'no_bluetooth_connection',
	'error'
];

exports.observability = [
	'bluetooth',
	'internet',
	'both',
	'none'
];

function Observer (socket) {

	this.socket = socket;
	this.id = socket.id;
	this.acks = {};
	this.isConnected = true;
	this.isDisconnected = false;

	this.onInit();
}

//util.inherits(Observer, events.EventEmitter);
Observer.prototype.__proto__ = eventEmitter.prototype;

// dummy property
Observer.prototype.onInit = function() {
	this.observeStates = 'init';
	debug('Observer On Initiation ');
	console.log('%s', this.observeStates);
};

Observer.prototype.onDiscovered = function() {

};

Observer.prototype.sendPing = function() {
	
};

Observer.prototype.handleError = function() {
	
};

Observer.prototype.reportDiscoveries = function() {
	
};





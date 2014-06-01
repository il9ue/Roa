// observer.js

var events = require('events');
var eventEmitter = events.EventEmitter;
var debug = require('debug')('ROA: ## OBSERVER ##');

module.exports = exports = Observer;

// basic event status..
exports.observeStates = [
	'error',
	'discovered',
	'ready',
	'timeout',
	'revealed',
	'newListener'
];

exports.connectivity = [
	'error',
	'connected',
	'connect',
	'disconnect',
	'closed',
	'open'
];


// parameter should be replaced with more specific arguments..
function Observer (server, socket, conns) {

	this.server = server;
	this.socket = socket;
	this.id = socket.id;
	this.acks = {};
	this.isConnected = true;
	this.isDisconnected = false;

	this.sockets = []; // unknown yet on usage..
	this.clients = []; // added to manage firstly observed clients..

	this.nameFields = {};
	this.connection = connection;
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

Observer.prototype.onData = function(data) {

};

Observer.prototype.onClose = function(why) {
	this.destruct();

	this.sockets.forEach(function(sock) {
		sock.onClose(why);
	});

	// should clean up every alive objects..
};

Observer.prototype.setup = function() {
	this.connection.on('data', this.onData);
	this.connection.on('close', this.onClose);
	this.connection.on('discovered', this.onDiscovered); // need to check
};

Observer.prototype.destruct = function() {
	this.connection.removeListener('data', this.onData);
	this.connection.removeListener('close', this.onClose);
};

/**
	public api
	- add discovered client to namefield using socket class..
**/
Observer.prototype.add = function(opts) {
	
	var nameField = new Namefield(opts);
	var self = this;

	process.nextTick(function() {
	});
};

Observer.prototype.connect = function(name) {

	var nfld = this.server.of(name);

	var self = this;

	var sock = nfld.add(this, function() {
		self.sockets.push(sock);
		self.nameFields[nfld.name] = sock;

		if ('/' == nfld.name) {
			// delete all the connections .. 
		}
	})
};

Observer.prototype.handleError = function() {
	
};

Observer.prototype.reportDiscoveries = function() {
	
};





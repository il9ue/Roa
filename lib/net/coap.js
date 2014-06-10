/**
 *	CoAP.js
 */

var dgram = require('dgram');
var events = require('events');
var coap_parse = require('coap-packet').parse;
var coap_gen = require('coap-packet').generate;
var util = require('util');

// custom modules
var Render = require('./render.js');
var Router = require('./router.js');
var Streamer = require('./streamer.js');

// constants
const COAP_PORT_DEFAULT = 5683;
const COAP_SERVER_MAX_NUM = 5;

function CoapServer(conn, unit, opts) {
	if (!(this instanceof CoapServer)) {
		return new CoapServer(conn, unit, opts);
	}

	if (typeof opts === 'function') {
		opts = null;
	}
	if (!opts) opts = {};

	this._port = 0;
	this._address = null;
	this._coapUnit = null;

	this._coapUnits = [];
	this._unitCount = 0;
	this._leastUnits = [];
	this._mostUnits = [];
	this._ids = 0;
	this._connected = [];

	this.initiate(this, conn, opts);
}

function MostRecent(conn) {
	this._rate = 0;
	this._mrIds = 0;
	this._lastConnected = Date.now();
}

CoapServer.prototype.__proto__ = Emitter.prototype;
//til.inherits(CoapServer, events.EventEmitter)

CoapServer.prototype.initiate = function(self, conn, opts) {
	if (!opts.type) {
		opts.type = 'udp4';
	}

	if (!conn) {
		this._coapUnit = dgram.createSocket(opts.type);
		this.on('request', conn);
	}
};

/**
 *	setup to manage server list by deviding between most used and least used
 */
CoapServer.prototype.setup = function(self, opts){
	// set coap list..
	this._unitCount = this._coapUnits.length;

	if (self._coapUnits.slice(0, COAP_SERVER_MAX_NUM).length > COAP_SERVER_MAX_NUM) {
		var leastUnit;
		var len;
		len = self._coapUnits.length;
		leastUnit = self._coapUnits.slice(len - 1, len + 1);
		this._leastUnits.push(leastUnit);
		self._coapUnits.pop(leastUnit);
		this._unitCount--;
	}

	if (self._coapUnit) {
		this._coapUnits.push(self._coapUnit);
		this._unitCount++;

		// put meaningful meta data to Route.js, and in Route, requests are tracked..
		var route = new Router(this, this._coapUnit, this._connected[this._unitCount]);

	}
};

/**
 *	try next available client unit, retry logic
 */
CoapServer.prototype.next = function () {
	var len = self._coapUnits.length;
	var luLen = self._leastUnits.length;
	var muLen = self._mostUnits.length;

	// compute most popular unit from renderer..
	var mUnit = self._coapUnits.slice()
	var popular = new MostRecent()

};

CoapServer.prototype.run = function(port, address, fn) {
	if (typeof port === 'function') {
		fn = port;
		port = COAP_PORT_DEFAULT; // default
	}

	if (typeof address === 'function') {
		fn = address;
		address = null;
	}

	this._coapUnit.bind(port, address, fn);
	this._port = port;
	this._address = address;

	this.setup(this);
	return this;
};

CoapServer.prototype.teardown = function(fn) {

	this._coapUnit.close();
	if (fn) {
		setImmedeiate(fn);
	}

	this._coapUnit = null;
	return this;
};

CoapServer.prototype.describe = function(packet, field) {

};

/**
 *	exchange either synchronous/asynchronous messages
 */
CoapServer.prototype.exchange = function(type, field, options) {
	var sock = this._coapUnit;
	var port = this._port;
	var address = this._address;

	var streamer = new Streamer(sock, port, address);
	var message = generate(/* some packets */);
	streamer.send(message);

	
};




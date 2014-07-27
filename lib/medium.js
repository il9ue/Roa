/**
 *	medium.js
 *	- medium is called from Roa.js
 */

var http = require('http');
var read = require('fs').readFileSync;
var parse = require('url').parse;
var url = require('url');
var Arena = require('./arena');
var Observer = require('./Observer');
var Server = require('./server');
var Client = require('./client');

module.exports = Server;

function Medium(srv, client, opts) {
	if (!(this instanceof Medium)) {
		return new Medium(srv, opts);
	}

	opts = opts || {};
	this.arenas = {};
	this._observer(opts.observer || Observer);

	if (srv) {
		this.routeTask(srv, client, opts);
	}
};

Medium.prototype.inside = function(name, fn){
  if (!this.arenas[name]) {
    var arna = new Arena(this, name);
    this.arenas[name] = arna;
  }
  if (fn) this.arenas[name].on('connect', fn);
  return this.arenas[name];
};

Medium.prototype.onConnect = function(conn) {
	var client = new Client(this, conn);

	return this;
};

Medium.prototype.bind = function(server){
  this.server = server;
  this.server.on('connection', this.onConnect.bind(this));
  return this;
};

Medium.prototype.routeTask = function(srv, client, opts) {
	if (('function' == typeof srv) || ('function'  == typeof client)) {
		var msg = "Please pass correct server or client instances"
		throw new Error(msg);
	}

	if (client) {
		this.makeConnection(client);
	}

	if (srv) {
		opts = opts || {};
		opts.path = opts.path || 'roa';
		opts.allowAccess = this.parseRequest.bind(this);
		this.makeAttach(srv, opts);
	}

	return this;
};

Medium.prototype.parseRequest = function(req, fn) {
	var referrer = req.headers.origin || req.headers.referer;

	// referer is significant tool to draw interaction-topology
	if (referrer == 'null') {

	}

	if (referrer) {
		try {
			// parse the whole url.
			this.splitRequest(referrer);

		} catch (ex) {

		}
	}
};

Medium.prototype.splitRequest = function(req) {
	var parts = url.parse(req);
	var server;

	if (parts !== 'null') {
		server = new Server(this, this.opts);
		var allowed = server.allowRequest(parts);

		if (allowed) {
			if (parts.protocol == 'coap:') {
				// i.e) coap://example.se:5683/~sensors./temp1.xml
				parts.port = parts.port || 5683;
				server.bindAs(parts);

			} else if (parts.protocol == 'http:') {
				parts.port = parts.port || 80;
				server.bindAs(parts);

			} else if (parts.protocol == 'roa:') {
				// for configurations
				parts.port = parts.port || 4000;
				server.bindAs(parts);
			} else {
				// i don't know all the cases..
			}
		}
	}
};

Medium.prototype.makeConnection = function(conn) {
	var client = new Client(this, conn);
	client.connect('/init');
	return this;
};

Medium.prototype.makeAttach = function(srv, opts) {
	var server = new Server(this, opts);
	server.attach(this, opts);
};

Medium.prototype.close = function(arena) {
	// close based on arena sets
	var exist;
	this.arenas.every(function(element, index, array) {
		if (element === arena) {
			exist = true;
			return false;	
		} else {
			exist = false;
			return true;
		}
	});

	if (exist) {
		this.arenas[arena].units.forEach(function(unit) {
			unit.onClose();
		});
	}

	this.server.close(arena);
};	

Medium.prototype.quit = function() {

};



/** 
 *	server.js	
 */

var http = require('http');
var read = require('fs').readFileSync;
var parse = require('url').parse;
var url = require('url');
var Client = require('./client');
var Arena = require('./arena');
var events = require('events');
var Util = require('./utility');
var includeBin = require('has-binary-data');

var emit = Emitter.prototype.emit;

module.exports = Server;

function Server(medium, opts) {
	if (!(this instanceof Server)) {
		return new Server(medium, opts);
	}

  if ('object' == typeof medium && !medium.listen) {
    opts = medium;
    medium = null;
  }

  opts = opts || {};

  this._arenas = {};
  this._clients = [];
  
  this._coapServer = []
  this._httpServer = []
  this._confServer = []

  this._units = this.inside('/');
}

Server.prototype.__proto__ = Emitter.prototype;

Server.prototype.allowAccess = function() {
	// only with proper url requests are accessed..
};

Server.prototype.attach = function(srv, opts) {
	// attach server after binding.
};

Server.prototype.allowRequest = function(parts) {
	if(parts) {
		try {
			var ok =
	    	~this._origins.indexOf(parts.hostname + ':' + parts.port) ||
	    	~this._origins.indexOf(parts.hostname + ':*') ||
	    	~this._origins.indexOf('*:' + parts.port);

	  	return !!ok;
		} catch (ex) {

		}
	}
};

Server.prototype.emit = function(ev) {
	if (~exports.events.indexOf(ev)) {
    emit.apply(this, arguments);
  } else { 
  	// broadcast events based on arena elements
    var args = Array.prototype.slice.call(arguments);
    var eventData = {
    	// init
    };

    eventData.type = includeBin(args)? Util.BIN_EVENT : Util.EVENT;
    
	}
};

Server.prototype.Get = function() {

};

Server.prototype.Post = function() {

};

Server.prototype.Update = function() {

};

Server.prototype.Delete = function() {

};

/**
 *	@api : completeParts
 *	@private : insert initial uri & queries
 */
Server.prototype.completeParts = function(parts) {
	try {
		this._pathname = parts.pathname;
		this._path = parts.path;
		this._query = parts.query || [];
		this._search = parts.search || [];

	} catch (ex) {
		console.log("exception : " + ex)
	}
};

Server.prototype.bindAs = function(parts) {
	
	if (parts.protocol == 'coap:') {
		if (this._coapServer.id && this._coapServer.engine) {

		} else {
			this.bindDatagram(parts);
		}
	} else if (parts.protocol == 'http:') {
		this.bindWeb(parts);
	} else if (parts.protocol == 'roa:') {
		// "roa://..." is for configurations purpose..
	}
};

/**
 *	@api : bindDatagram
 *	@private : do the server setting before running
 */
Server.prototype.bindDatagram = function(parts) {
	// complete parts, parse details of the path, initial arena,
	// allocate server and client into arena, 
	this.completeParts(parts);

};


Server.prototype.bindWeb = function(parts) {
	this.completeParts(parts);
};

Server.prototype.bindConfig = function(parts) {

}; 

Server.prototype.enterArena = function(name, fn) {
	if (!this._arenas[name]) {
		var arena = new Arena(this, name);
		this._arenas[name] = arena;
	}

	if (fn) {
		this._arenas[name].on('connect', fn);
	}
	return this._arenas[name];
};

Server.prototype.close = function(arena) {
	if (this._nodes.id > 0) {
		var server = this._nodes.engine;
		if (server == 'http') {
			emit.emit('teardown', this._httpServer);
			this._httpServer.close();
		} else if (server == 'udp') {
			Emitter.emit('teardown', this._coapServer);
			this._coapServer.close();
		} else if (server == 'roa') {
			Emitter.emit('teardown', this._confServer);
			this._confServer.close();
		}	
	} else {
		console.log('no node is running..');
	}
};


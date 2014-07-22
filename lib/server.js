/** 
 *	server.js	
 */

var http = require('http');
var read = require('fs').readFileSync;
var parse = require('url').parse;
var url = require('url');
var Client = require('./client');

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
  this._units = this.inside('/');
}

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

Server.prototype.Get = function() {

};

Server.prototype.Post = function() {

};

Server.prototype.Update = function() {

};

Server.prototype.Delete = function() {

};

Server.prototype.bindUDP = function(parts) {
	try {
		var src = parts.pathname;
		var src_path = parts.path;
		var src_query = parts.quert || [];
		var src_search = parts.search || [];


	} catch (ex) {

	}
};

Server.prototype.bindHTTP = function(parts) {
	try {
		var src = parts.pathname;
		var src_path = parts.path;
		var src_query = parts.quert || [];
		var src_search = parts.search || [];

	} catch (ex) {

	}
};


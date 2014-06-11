/**
 *	Roa.js
 */

var urls = require('url');
var net = require('net');
var dgram = require('dgram');
var read = require('fs').readFileSync;


module.exports = Roa;

function Roa(srv, opts){
  if (!(this instanceof Roa)) return new Roa(srv, opts);
  if ('object' == typeof srv && !srv.listen) {
    opts = srv;
    srv = null;
  }

  opts = opts || {};
  this.path(opts.path || '/roa');
  this.serveClient(false !== opts.serveClient);
  this.origins(opts.origins || '*:*');
  if (srv) this.attach(srv, opts);
}






Roa.prototype.OnUrlRequest = function(protocols){

	var errorMsg = '';
	if ('function' == typeof protocols) {
		errorMsg = 'Only http or udp server instance is required..';
		throw new Error(errorMsg);
	}

	if ('number' == typeof protocols) {
		errorMsg = 'Only protocol instances are required..';
		throw new Error(errorMsg);
	}

	if ('string' == typeof protocols) {
		protocols = urls.parse(protocols); // now all the url informations instantiated..
		this.OnUrlParsing(protocols.hostname, protocols.port);
	}
};


/**
	OnUrlParsing >> private api
	- 2nd private api that parses url from client request
	- parses hostname & port of the firstly passed url
**/
Roa.prototype.OnUrlParsing = function(host, port){

	var errorMsg = '';

};

/**
	attatch >> private api
 routing the request to either coap or http server.
 **/
Roa.prototype.attach = function(protocols, server, options){

	if ('function' == typeof server) {
		var errorMsg = 'Only http or udp server instance is required..';
		throw new Error(errorMsg);
	}

	if (Number(server) == server) {
		server = Number(server);  
	}

	if ('number' == typeof server) {
		// make server to work
		var port = server;
		
		if (protocols.protocol === 'coap:') {

		}	else if (protocols.protocol === 'http:') {

		}
	}

	// set server path to '/roa'..
	options = options || {};
	options.path = options.path || '/roa';
	this.roa = 
};

// binding the agent to service
Roa.prototype.bind = function (agent) {
	this.agent = agent;

	// what else..
};
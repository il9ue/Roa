// index.js

var read = require('fs').readFileSync;
var urls = require('url');
var net = require('net');
var servers = require('./server');

module.exports = exports = Router;

function Router(protocols, server, options){
  if (!(this instanceof Router)) 
  	return new Router(server, options);
  
  if ('object' == typeof server && !server.listen) {
    options = server;
    server = null;
  }
  options = options || {};
  this.field = {};
  this.origins(options.origins || '*:*');
  this.sockets = this.of('/');
  this.protocols = protocols;
  this.server = server;
  this.options = options;

  if (server) this.OnUrlRequest(protocols);
  //if (server) this.attach(domain, server, options);
}

Router.prototype.__proto__ = eventEmitter.prototype;

Router.prototype.OnUrlRequest = function(protocols){

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
Router.prototype.OnUrlParsing = function(host, port){

	var errorMsg = '';

};

/**
	attatch >> private api
 routing the request to either coap or http server.
 **/
Router.prototype.attach = function(protocols, server, options){

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

		// by the type of the protocol, generate repective server..
		switch (protocols.protocol) {
			case 'coap:': 
				var coapServer = new servers(this.server, this.options, protocols.protocol);
				break;
			case 'http:':
				var httpServer = new servers(this.server, this.options, protocols.protocol);
				break;
		}
	}

};

// binding the agent to service
Router.prototype.bind = function (agent) {
	this.agent = agent;

	// what else..
};
// server.js 

var read = require('fs').readFileSync;
var debug = require('debug')('socket.io:server');
var url = require('url');

module.exports = exports = Server;

function Server(server, options, agent) {

	if (!(this instanceof Server)) {
		return new Server(options);
	}

	if (typeof options === 'function') {
		options = null;
	}

	if (!options) options = {};

	options = options || {};
	this.nameFields = {};
  this.serveClient(false !== opts.serveClient);
  this.generateServer(server, agent);
}

Server.prototype.__proto__ = eventEmitter.prototype;


Server.prototype.serveClient = function(v){
  if (!arguments.length) 
  	return this._serveClient;
  
  this._serveClient = v;
  return this;
};

Server.prototype.adapter = function(v){
  if (!arguments.length) return this._adapter;
  this._adapter = v;
  for (var i in this.nameFields) {
    this.nameFields[i].initAdapter();
  }
  return this;
};

Server.prototype.generateServer = function(srv, agent) {

  // ToDo :: separate the following code as a module..
  switch (agent) {
    case 'coap:': 
      var that = this;
      this._sock = dgram.createSocket(options.type, function(msg, rsinfo) {
        var packet;
        try {
          packet = parse(msg)
        } catch(err) {
          return that._sendError(new Buffer('Unable to parse packet'), rsinfo)
        }
        that._handle(packet, rsinfo)
      })
      break;
    case 'http:':
      if ('number' == typeof srv) {
        var port = srv;
        srv = http.Server(function(req, res){
          res.writeHead(404);
          res.end();
        });
        srv.listen(port);
      }
      break;
  }
};

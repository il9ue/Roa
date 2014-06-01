// server.js 

var read = require('fs').readFileSync;
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

Server.prototype.generate = function(srv, agent) {

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

/*
  private api : called from generate
 */
Server.prototype.listen =
Server.prototype.attach = function(serv, opts) {

  var url = this._path + '/roa.js';
  var subs = serv.listeners('request').slice(0); // get all listeners

  var self = this;
  serv.removeAllListeners('request');

  serv.on('request', function(req, res) {
    handleRequest(req, res, self, url, subs);
  });
};

function handleRequest(req, res, self, url, subs) {
  if (0 == req.url.indexOf(url) {

  }) else {

  }
}

Server.prototype.handleCache = function(req, res) {
  if (req.headers.etag) {
    res.writeHead(304);
    res.end();
    return;
  } else {
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('ETag', clientVersion);
    res.writeHead(200);
  }
};


Server.prototype.bind = function() {

};

Server.prototype.onConnect = function(connection) {

  // create instance to connect, generate Observer for the first time..
  var observer = new Observer(this, connection, opts); 
  observer.route();
  observer.connect('/');
  return this;
};

Server.prototype.from = function(name) {
  if (!this.nameFields[name]) {

    var nfld = new Namefield(this, name);
    this.nfld[name] = nfld;
  }

  return this.nfld[name];
};



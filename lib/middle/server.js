// medium.js 

var read = require('fs').readFileSync;
var url = require('url');

module.exports = exports = Medium;

function Medium(medium, options, agent) {

	if (!(this instanceof medium)) {
		return new Medium(options);
	}

	if (typeof options === 'function') {
		options = null;
	}

	if (!options) options = {};

	options = options || {};
	this.nameFields = {};
  this.serveClient(false !== opts.serveClient);
  this.generatemedium(medium, agent);
}

Medium.prototype.__proto__ = eventEmitter.prototype;


Medium.prototype.serveClient = function(v){
  if (!arguments.length) 
  	return this._serveClient;
  
  this._serveClient = v;
  return this;
};

Medium.prototype.generate = function(srv, agent) {

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
        srv = http.createServer(function(req, res){
          res.writeHead(404);
          res.end();
        });
        srv.listen(port);
      }
      break;
  }
};

Medium.prototype.listen = function (port, options, fn) {
  if ('function' == typeof options) {
    fn = options;
    options = {};
  }

  var Medium = http.createServer(function (req, res) {
    res.writeHead(501);
    res.end('Not Implemented');
  });

  Medium.listen(port, fn);

  var roa = exports.attach(Medium, options);
  roa.httpServer = Medium;

  return roa;
};

Medium.prototype.attach = function (Medium, options) {

  return roa;
};



Medium.prototype.handleCache = function(req, res) {
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


Medium.prototype.bind = function() {

};

Medium.prototype.onConnect = function(connection) {

  // create instance to connect, generate Obmedium for the first time..
  var observer= new Observer(this, connection, opts); 
  observer.route();
  observer.connect('/');
  return this;
};

Medium.prototype.from = function(name) {
  if (!this.nameFields[name]) {

    var nfld = new Namefield(this, name);
    this.nfld[name] = nfld;
  }

  return this.nfld[name];
};



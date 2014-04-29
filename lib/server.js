
var util 	= require('util'),
	events 	= require('events'),
	dgram 	= require('dgram');


module.exports = MainServer

function MainServer() {
    events.EventEmitter.call(this);
}

function MainServer(configs, listener) {
  if (!(this instanceof MainServer)) {
  	return new MainServer(configs);
  }

  if (!configs) configs = {};

}

util.inherits(MainServer, events.EventEmitter);


/*
MainServer.prototype._init = function(data) {
    this.emit("init", data);
}

MainServer.prototype._teardown = function(data) {
    this.emit("teardown", data);
}

MainServer.prototype._send = function(data) {
    this.emit("sent", data);
}

MainServer.prototype._close = function(data) {
    this.emit("close", data);
}

MainServer.prototype._select = function(data) {
    this.emit("select", data);
}

MainServer.prototype._accept = function(data) {
    this.emit("accept", data);
}

MainServer.prototype._write = function(data) {
    this.emit("data", data);
}
*/

MainServer.prototype._setReady = function(request) {

};

MainServer.prototype._onWebsocket = function(req, socket) {

};

MainServer.prototype._onCoAP = function(req, socket) {

};







/*
	first written : Daniel Q. Kim, 20140427
	
	field.js : works as namespace/room in socket.io
	- Multiple namespaces and multiple rooms share the same (Light WebSocket, CoAP, or other) connection
	- server will transmit messages over the wire only to those clients that connected to / joined a fields
*/

var read = require('fs').readFileSync;
var debug = require('debug')('socket.io:server');
var urls = require('url');
var net = require('net');

module.exports = exports = Namefield;

function Namefield(opts) {
  if (!(this instanceof Namefield))
    return new Namefield();

  if (!opts) opts = {};

  if (!opts.type) opts.type = 'udp4'

  this._opts = opts;

  this._init()
}

Namefield.prototype.__proto__ = eventEmitter.prototype;

Namefield.prototype.OnInit = function () {

};
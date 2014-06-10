/*
	first written : Daniel Q. Kim, 20140427
	
	field.js : works as namespace/room in socket.io
	- Multiple namespaces and multiple rooms share the same (Light WebSocket, CoAP, or other) connection
	- server will transmit messages over the wire only to those clients that connected to / joined a fields
*/

var read = require('fs').readFileSync;
var urls = require('url');
var net = require('net');

module.exports = exports = Arena;

function Arena(opts) {
  if (!(this instanceof Arena))
    return new Arena();

  if (!opts) opts = {};

  if (!opts.type) opts.type = 'udp4'

  this._opts = opts;

  this._init()
}

Arena.prototype.__proto__ = eventEmitter.prototype;

Arena.prototype.OnInit = function () {

};

Arena.prototype.add = function(client, fn){

  var socket = new Socket(this, client);
  var self = this;
  this.run(socket, function(err){
    process.nextTick(function(){
      if ('open' == client.conn.readyState) {
        if (err) return socket.error(err.data || err.message);

        self.sockets.push(socket);

        socket.onconnect();
        if (fn) fn();

        // fire user-set events
        self.emit('connect', socket);
        self.emit('connection', socket);
      } else {
      }
    });
  });
  return socket;
};

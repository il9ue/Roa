/**
 *	arena.js
 */


var read = require('fs').readFileSync;
var urls = require('url');
var net = require('net');

module.exports = exports = Arena;
var emit = Emitter.prototype.emit;


function Arena(server, opts) {
  this._name = server.name;
  this._server = server;
  this._protocol = server.protocol;
  this.sockets = [];
  this.connected = {};
  this.fns = [];
  this.ids = 0;
  this.acks = {};
}

Arena.prototype.__proto__ = eventEmitter.prototype;

Arena.prototype.add = function(client, medium, fn){

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

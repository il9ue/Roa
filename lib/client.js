// client.js

var debug = require('debug')('Roa : Client ##');

module.exports = Client;

function Client(service, connection) {

	this.fields = {};
}

Client.prototype._connect = function(name) {
	debug('connecting to namespace %s', name);
  var field = this.service.of(name);
  
  if ('/' != name && !this.fields['/']) {
    this.connectBuffer.push(name);
    return;
  }

  var self = this;
  var socket = field.add(this, function(){
    self.sockets.push(socket);
    self.fields[field.name] = socket;

    if ('/' == field.name) {
      self.connectBuffer.forEach(self.connect, self);
      delete self.connectBuffer;
    }
  });
};

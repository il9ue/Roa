/**
 *	client.js
 */


function Client(medium, conn){
  this.medium = medium;
  this.conn = conn;

  this.id = conn.id;
  this.request = conn.request;
  this.setup();
  this.sockets = [];
  this.arenas = {};
  this.connectBuffer = [];
}

Client.prototype.connect = function(name, proxy) {
	var arena = this.medium.Lookup(name, proxy);

	var self = this;
	var sock = arena.add(this, function() {

	});
};

// member.js

  
module.exports = Streamer;    

function Streamer(server, conn){
  this.server = server;
  this.conn = conn;
  this.id = conn.id;
  this.request = conn.request;
  this.setup();
  this.sockets = [];
  this.connectBuffer = [];
}

Streamer.prototype.setup = function(){
  this.onclose = this.onclose.bind(this);
  this.ondata = this.ondata.bind(this);

  this.conn.on('data', this.ondata);
  this.conn.on('close', this.onclose);
};

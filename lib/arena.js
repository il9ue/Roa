/**
 *	arena.js
 */


var read = require('fs').readFileSync;
var urls = require('url');
var net = require('net');
var Unit = require('./unit');
var Observer = require('./bserver');

module.exports = exports = Arena;
var emit = Emitter.prototype.emit;


function Arena(server, opts) {
  this._name = server.name;
  this._server = server;
  this._protocol = server.protocol;
  this.unitList = [];
  this.connected = {};
  this.fns = [];
  this.ids = 0;
  this.acks = {};
  this.initObserver();
}

Arena.prototype.__proto__ = eventEmitter.prototype;

Arena.prototype.add = function(client, medium, fn){

  var unit = new Unit(this, client);
  var middle = new Medium(medium);

  var self = this;
  this.runClient(unit, function(err){
    process.nextTick(function(){
      if ('open' == client.conn.readyState) {
        if (err) return unit.error(err.data || err.message);

        self.unitList.push(unit);

        unit.onconnect();
        if (fn) fn();

        // fire user-set events
        self.emit('connect', unit);
        self.emit('connection', unit);
      } else {
      }
    });
  });
  return unit;
};

Arena.prototype.runClient = function(unit, fn) {
	var fns = this.fns.slice(0);
	  if (!fns.length) return fn(null);

	  function run(i){
	    fns[i](unit, function(err){
	      if (err) return fn(err);
	      if (!fns[i + 1]) return fn(null);

	      // go on to next
	      run(i + 1);
	    });
	  }

	  run(0);
	};
};

Arena.prototype.runMiddle = function(middle, fn) {

};

Arena.prototype.remove = function(unit) {
	var i = this.unitList.indexOf(unit);
	if (~i) {
		this.unitList.splice(i,1)
	} else {
		// debug
	}
};

Arena.prototype.initObserver = function() {
	this._observer = new (this.server.observer())(this);
};

Arena.prototype.emits = function(evt) {
	if (~exports.events.indexOf(evt)) {
		emit.apply(this, arguments);
	} else {
		var args = Array.prototype.slice.call(arguments);
		// set parse data type
		var packet = {
			type: parseType,
			data: args
		};

		this._observer.broadcast(packet, {

		});
		delete this._spaces;
	}
	return this;
};

Arena.prototype.targets = function(space) {
	this._spaces = this._spaces || [];
	if (!~this._spaces.indexOf[space]) {
		this._spaces.push(space);
	} else {

	}
	return this;
};

Arena.prototype.send = function() {
	var args = Array.prototype.slice.call(arguments);

	args.unshift('message');
	this.emit.apply(this, args);
	return this;
};





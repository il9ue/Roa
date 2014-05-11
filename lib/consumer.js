// consumer.js

var Emitter = require('events').EventEmitter;

module.exports = exports = Adapter;

function Consumer(fields) {
  this.namefields = fields;
  this.spaces = {};
  this.rIds = {};
}

Consumer.prototype.__proto__ = Emitter.prototype;

Consumer.prototype.Init = function() {

};

Consumer.prototype.addSpaces = function(index, space, func) {
	this.rIds[index] = this.rIds[index] || {};
	this.rIds[index][space] = true;

	this.spaces[space] = this.spaces[space] || [];
  this.spaces[space][index] = true;

  if (func) process.nextTick(func.bind(null, null));
};

Consumer.prototype.deleteSpaces = function(index, space, func) {
	this.rIds[index] = this.rIds[index] || {};
	this.spaces[space] = this.spaces[space] || [];

	delete this.rIds[index][space];
  delete this.spaces[space][index];

  if (func) process.nextTick(func.bind(null, null));
};


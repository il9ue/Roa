/**
 *	chrome.js
 */

var Emitter = require('events').EventEmitter;

module.exports = exports = Chrome;

function Chrome (arena) {
	this._arena = arena;

	this._space = {};
	this._ids = {};
	this._types = arena.connType;

	this._typeArrays = {};
	this.onInit();
}

Chrome.prototype.__proto__ = Emitter.prototype;

Chrome.prototype.add = function(id, _arena, fn){
  this._ids[id] = this._ids[id] || {};
  this._ids[id][_arena] = true;
  this._space[_arena] = this._space[_arena] || [];
  this._space[_arena][id] = true;

  if (fn) process.nextTick(fn.bind(null, null));
};

/**
 * Removes a socket from a _arena.
 *
 * @param {String} socket id
 * @param {String} _arena name
 * @param {Function} callback
 * @api public
 */

Chrome.prototype.del = function(id, _arena, fn){
  this._ids[id] = this._ids[id] || {};
  this._space[_arena] = this._space[_arena] || {};
  delete this._ids[id][_arena];
  delete this._space[_arena][id];

  if (fn) process.nextTick(fn.bind(null, null));
};

/**
 *	Find the specific arena and return result
 *	@api public
 *	
 */
Chrome.prototype.getType = function(id, _type, fn) {
	var self = this;
	var lists = self._typeArrays
	
	//self._typeArrays.indexOf(_type, 1);

	if (fn) process.nextTick(fn.bind(null, null));
	return lists;
};

/**
 *	@api private
 */
Chrome.prototype.copyConntypes = function() {
	self._space.forEach(copyConnectionTypes);
};


function copyConnectionTypes(index, element) {
	if (element.connType == this._types) {
		this._typeArrays.call.push(element);
	}
}


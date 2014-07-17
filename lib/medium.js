/**
 *	medium.js
 */

var http = require('http');
var read = require('fs').readFileSync;
var parse = require('url').parse;
var url = require('url');
var Arena = require('./arena');

module.exports = Server;

function Medium(srv, opts) {
	this.arenas = {};
};

Medium.prototype.of = function(name, fn){
  if (!this.arenas[name]) {
    var arna = new Arena(this, name);
    this.arenas[name] = arna;
  }
  if (fn) this.arenas[name].on('connect', fn);
  return this.arenas[name];
};

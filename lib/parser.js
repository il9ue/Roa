
var debug = require('debug')('parser');
var json = require('json3');
var isArray = require('isarray');
var Emitter = require('emitter');

exports.protocol = 1;

/* lists all possible cases connecting
  ..iot client/server, web/mobile server
 */
exports.types = [
  'EVENT',
  'CONNECT',
  'DISCONNECT',
  'TEARDOWN',
  'ERROR',
  'ACK',
  'BINARY_EVENT'
];

exports.CONNECT = 0;
exports.DISCONNECT = 1;
exports.EVENT = 2;
exports.TEARDOWN = 3;
exports.ERROR = 4;
exports.ACK = 5;
exports.BINARY_EVENT = 6;
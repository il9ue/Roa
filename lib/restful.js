
var debug = require('debug')('rest');
var isArray = require('isarray');
var Emitter = require('emitter');

exports.protocol = 1;

/* lists all possible cases connecting
	..iot client/server, web/mobile server
 */
exports.restful = [
	'GET',
	'POST',
	'PUT',
	'DELETE'
];

exports.GET = 0;
exports.POST = 1;
exports.PUT = 2;
exports.DELETE = 3;

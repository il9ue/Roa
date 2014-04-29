
var dgram = require('dgram'),
	util = require('util'),
	read = require('fs').readFileSync,
	url = require('url'),
	client = require('./client');

var debug = require('debug')('Roa : Service ##');


module.exports = Service;


function Service (server, configs) {

	if (!(this.instanceof Service))
		return new Service(server, configs);
	if ('object' == typeof server && !server.listen) {
		configs = server;
		server = null;
	}

}

Service.prototype._listen = function (server, configs) {

};

Service.prototype._bind = function (agent) {
	this.agent = agent;
	this.agent.on(
		'connection',
		this._onConnect.bind(this));

	return this;
};

Service.prototype._onConnect = function (connection) {
	debug('possible connection request received : %s', connection.id);

	var client = new Client(this, connection);
	client._connect('/');
	return this;
};
/**
 *	task.js
 */

var Emitter = require('events').EventEmitter;

// system states
var CURRENT_STATE = [
	DEFAULT : "default",
	READY : "ready",
	DOOMED : "done",
	NEXT : "next",
	COMPLETE : "completed"
];

var CURRENT_TASKS = [
	SERVER_RUNNING : "server",
	PROXY_FORWARD : "forward_proxy",
	PROXY_REVERSE : "reverse_proxy",
	PROXY_INTERCEPT : "intercept_proxy",
	RESOURCE_PARSE : "parse_resource",
	RESOURCE_ACCESS : "access_resource",
	NEW_LISTENER : "listener",
	SERVER_MERGE : "merge_servers",
	RESOURCE_SHARE : "share_resource",
	DEFAULT : "default"
];

module.exports = exports = Task;

function Task (unit, opts) {
	this._taskName = unit.name;
	this._taskId = unit.id;
	this._taskState = unit.state;
	this._prevTaskId = unit.prevTaskId;
	this._prevState = unit.prevState;
	this._updateTime = 0;

	this._accessors = {};
	this._taskList = [];
}

Task.prototype.__proto__ = Emitter.prototype;

Task.prototype.RegisterNewTask = function(task, opts, fn) {
	var id = task.id;
	var name = task.name;
	var state = task.state;

	var exist;
	this._taskList.every(function(element, index, array) {
		if (element === name) {
			exist = true;
			return false;	
		} else {
			exist = false;
			return true;
		}
	});

	if (!exist) {
	  this._taskList.push(task);
	  this._accessors.id = id;
	  this._accessors.name = name;
	  this._accessors.state = state;
	  this._updateTime = Date.now();
	}
  if (fn) process.nextTick(fn.bind(null, null));
};


/**
 *	Core system APIs, shared by most modules to efficient resources/system useage
 */
Task.prototype.GetCurrentState = function(fn) {
	var state = {};

	if (this._currentTask === CURRENT_TASKS.DEFAULT) {
		state.name = CURRENT_STATE.DEFAULT;
		return state;
	} else {
		state.name = this._currentState;
		state.id = this._currentStateId;
		state.prevId = this._prevStateId;
		state.task = this._currentTask;
		return state;
	}
};


Task.prototype.ProceedNextTask = function() {

};

Task.prototype.UpdateTask = function(opts, fn) {
	var state = opts;

	// first check & track if current task is ongoing.


	if (state.name !== this._currentState) {
		this._currentState = state.name;
	} else if (state.id !== this._currentStateId) {
		this._currentStateId = state.id;
	} else if (state.prevId !== this._prevStateId) {
		this._prevStateId = state.prevId;
	}
};

Task.prototype.RemoveTask = function(opts, fn) {

};

Task.prototype.ReportError = function() {

};

Task.prototype.onStateChange = function() {

};

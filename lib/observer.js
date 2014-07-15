/**
 *	task.js
 */

var Emitter = require('events').EventEmitter;
var Socket = require('./socket');
var Arena = require('./arena');

// system states
var CURRENT_STATE = [
	DEFAULT : "default",
	LISTENTER : "listener",
	READY : "ready",
	DOOMED : "done",
	NEXT : "next",
	COMPLETE : "completed",
	REQUEST : "request",
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

var IDENTITY = [
	NONE : "none",
	CLIENT : "client",
	SERVER : "server"
];

module.exports = exports = Observer;

var emit = Emitter.prototype.emit;


function Observer (unit, opts) {
	this._taskName = unit.name;
	this._taskId = unit.id;
	this._taskState = unit.state;
	this._prevObserverId = unit.prevObserverId;
	this._prevState = unit.prevState;
	this._updateTime = 0;

	this._accessors = {};
	this._taskList = [];
	this._identity = 
}

Observer.prototype.__proto__ = Emitter.prototype;

Observer.prototype.RegisterNewObserver = function(task, opts, fn) {
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

Observer.prototype.RemoveObserver = function(task, opts, fn) {
	var exist;
	var tasks = this._taskList;
	var removee = task.name;
	var removeeIndex = tasks.indexOf(removee);

	tasks.every(function(element, index, array) {
		if (element === removee) {
			if (removeeIndex > -1) {
				tasks.splice(removeeIndex, 1);
			}
			exist = true;
			return false;
		} else {
			exist = false;
			return true;
		}
	});

	if (fn) process.nextTick(fn.bind(null, null));
};


/**
 *	Core system APIs, shared by most modules to efficient resources/system useage
 */
Observer.prototype.GetCurrentState = function(fn) {
	var state = {};

	if (this._currentObserver === CURRENT_TASKS.DEFAULT) {
		state.name = CURRENT_STATE.DEFAULT;
		return state;
	} else {
		state.name = this._currentState;
		state.id = this._currentStateId;
		state.prevId = this._prevStateId;
		state.task = this._currentObserver;
		return state;
	}
};

// set initial state of the anonymous tasks
Observer.prototype.setObserverState = function(task, opts, fn) {
	var exist;
	var tasks = this._taskList;
	var changee = task.name;
	var changeeIndex = tasks.indexOf(changee);

	tasks.every(function(element, index, array) {
		if (element === changee) {
			element.state = task.state;
			exist = true;
			return false;
		} else {
			exist = false;
			return true;
		}
	});
};

/**
 *	MapObserverStates sync-up tasks state, protocol-state, 
 *	 in order to exchange packets among clients..
 *	i.e) if client is coap and it wants to exchange msg to http client/server,
 *		using this fn make such task possible.
 */
Observer.prototype.MapObserverState = function(src, dest, fn) {
	var exist;
	var tasks = this._taskList;
	var mappee = src.name;
	var mappeeIndex = tasks.indexOf(mappee);
	var desteeState = dest.state;

	tasks.every(function(element, index, array) {
		if (element === mappee) {
			exist = true;
			if (element.state === desteeState) {
				// do the protocol swift thing..				
				// from protocol's state, figure out whos client/server..
				this.ResolveIdentity(src);
				var unit = this._identity;
				if (unit === IDENTITY.CLIENT) {
					var arena = new Arena(src);
					var sock = new Socket(arena, src);

					arena.add(src, dest);	// add both client and server to arena..
					sock.exchange(src, dest, ev); // exchange handshake or packets

				} else {
					var sock = new Socket(arena, dest);
				}
			}
			return false;
		} else {
			exist = false;
			return true;
		}
	});
};

/**
 *	figure out whos client & server via state
 */
Observer.prototype.ResolveIdentity = function(src, fn) {
	var state = src.state;

	switch (state) {
		case CURRENT_STATE.REQUEST:
		case CURRENT_STATE.DOOMED:
		case CURRENT_STATE.NEXT:
			this._identity = IDENTITY.CLIENT;
		case CURRENT_STATE.DEFAULT:
		case CURRENT_STATE.LISTENTER:
		case CURRENT_STATE.COMPLETE:
			this._identity = IDENTITY.SERVER;
	}
};

Observer.prototype.MapAllStates = function() {

};

Observer.prototype.ProceedNextObserver = function() {

};

Observer.prototype.UpdateObserver = function(opts, fn) {
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



Observer.prototype.ReportError = function() {

};

Observer.prototype.onStateChange = function() {

};

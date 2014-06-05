// render.js

/**
  Render.js does the following :
  - Cache Control & Memory Control for constrained network and normal one.
  - Session Management, and share caching resources by IPC
  - Network rendering decision making
  - Manage Socket pool to monitor connections & Profiles
  - Saves connections for later use
**/

var Emitter = require('events').EventEmitter;

var COAP_CACHE = {
  UNSPECIFIED_MAX_AGE = 60,
  INFREQUENT_AGE = Infinity,
  FREQUENT_AGE =  1
};

var GENERAL_CACHE = {
  MAX_AGE = 100,
};

module.exports = exports = Render;

function Render(fld, options, desc) {

  if (!(this instanceof Render))
    return new Render(fld, options);

  if (typeof options === 'number') {
    options = {
      max : options
    };
  }

  if (!options) options = {};
  else options = options || {};

  this.namefields = fld;
  this.spaces = {};
  this.rIds = {};
  this.descs = descs || {};

  this.initCache();
  this.initRestful();
}

function Item (key, value, ctnt, length, dscr) {
  this.key = key;
  this.value = value;
  this.length = length;
  this.dscr = dscr;
  this.ctnt = ctnt;
}


Render.prototype.__proto__ = Emitter.prototype;

Object.defineProperty(Render.prototype, "length",
  { 
    get : function () { 
      return this._length 
    }, enumerable : true
  }
)

Object.defineProperty(Render.prototype, "itemCount",
  { 
    get : function () { 
      return this._itemCount 
    }, enumerable : true
  }
)

Object.defineProperty(Render.prototype, "itemDescription",
  { 
    get : function () { 
      return this._description 
    }, enumerable : true
  }
)

Object.defineProperty(Render.prototype, "max",
  { 
    set : function (mLen) {
      if (!mLen || !(typeof mLen === "number") || mLen <= 0 ) {
        mLen = Infinity;
      } 

      if (!mLen || (typeof mLen === "number") || mLen <= 0 ) {
        mLen = COAP_CACHE.UNSPECIFIED_MAX_AGE;
      } 
 
      this._maxRange = mLen;
      if (this._length > this._maxRange) {
        trim(this)
      }
    },
    get : function () { 
      return this._maxRange 
    }
  , enumerable : true
  }
)

Render.prototype.clearAll = function() {
  if (this._cache) {
    for (var i in this._cache) {

    }
  }

  this._cache = 0;
  this._cacheList = 0;
  this._itemCount = 0;
};

Render.prototype.initCache = function() {
  this._maxRange = options.max;
  
  if (!this._maxRange || 
      !(typeof this._maxRange === "number")
      this._maxRange <= 0) {
    this._maxRange = UNSPECIFIED_MAX_AGE; // 
  }

  this._maxAge = options.maxAge || {};
  this._cache = Object.create(null);
  this._minorCache = 0;
  this._majorCache = 0;
  this._cacheList = Object.create(null);
  this._itemCount = 0;
  this._description = DESCRIPTION_CODE.DEFAULT;
  this._refreshTimeout = 0;
};

Render.prototype.initRestful = function(){

  this._response = RESTFUL_RES_CODE.DEFAULT; // for the init 
  this._reqCount = 0;
  this._restfulList = Object.create(null);
  this._reqDescribe = RESTFUL_DESCRIBE.DEFAULT_CODE;
  this._reqAck = 0;
  this._resList = Object.create(null);
};

Render.prototype.addSpaces = function(index, space, func) {
	this.rIds[index] = this.rIds[index] || {};
	this.rIds[index][space] = true;

	this.spaces[space] = this.spaces[space] || [];
  this.spaces[space][index] = true;

  if (func) process.nextTick(func.bind(null, null));
};

Render.prototype.deleteSpaces = function(index, space, func) {
	this.rIds[index] = this.rIds[index] || {};
	this.spaces[space] = this.spaces[space] || [];

	delete this.rIds[index][space];
  delete this.spaces[space][index];

  if (func) process.nextTick(func.bind(null, null));
};





/****************************************************
  private apis 
****************************************************/

function push (self, key, value, opts) {

}

function delItem (self, that) {
  self._length -= that.length;
  self._itemCount --;
  delete self._cache[that.key];
}

function shiftItems (self, ctnt) {
  delete self._cacheList[ctnt.ctnt];

  while ((self._minorCache < self._majorCache) 
      && !(self._cacheList[self._cache])) {
    self._cache ++;
  }
}

function trim (self) {
  while (self._cache < self._majorCache 
      && self._length > self._max) {
    del(self, self._cacheList[self._cache]);
  }
}






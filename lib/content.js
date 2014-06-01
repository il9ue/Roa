// content.js

/**
  Cache Control & Memory Control for constrained network and 
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

var RESTFUL_RES_CODE = {
  DEFAULT = 700,
  SUCCESS = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  REDIRECTION_WITH_NOCHANGE = 304
};

var DESCRIPTION_CODE = {
  UNSPECIFIED = 0.
  HTTP = 1,
  COAP = 2,
  MOBILE = 3,
  SERVICE = 4
};


module.exports = exports = Adapter;

function Content(fld, options, desc) {

  if (!(this instanceof Content))
    return new Content(fld, options);

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
  this.key;
  this.value = value;
  this.length = length;
  this.dscr = dscr;
  this.ctnt = ctnt;
}

Content.prototype.__proto__ = Emitter.prototype;


Object.defineProperty(Content.prototype, "length",
  { 
    get : function () { 
      return this._length 
    }, enumerable : true
  }
)


Object.defineProperty(Content.prototype, "itemCount",
  { 
    get : function () { 
      return this._itemCount 
    }, enumerable : true
  }
)

Object.defineProperty(Content.prototype, "itemDescription",
  { 
    get : function () { 
      return this._description 
    }, enumerable : true
  }
)

Object.defineProperty(LRUCache.prototype, "max",
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
    }
  , get : function () { 
      return this._maxRange 
    }
  , enumerable : true
  }
)


Content.prototype.initCache = function() {
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
};

Content.prototype.initRestful = function(){

  this._response = RESTFUL_RES_CODE.DEFAULT; // for the init 

};

Content.prototype.addSpaces = function(index, space, func) {
	this.rIds[index] = this.rIds[index] || {};
	this.rIds[index][space] = true;

	this.spaces[space] = this.spaces[space] || [];
  this.spaces[space][index] = true;

  if (func) process.nextTick(func.bind(null, null));
};

Content.prototype.deleteSpaces = function(index, space, func) {
	this.rIds[index] = this.rIds[index] || {};
	this.spaces[space] = this.spaces[space] || [];

	delete this.rIds[index][space];
  delete this.spaces[space][index];

  if (func) process.nextTick(func.bind(null, null));
};

/**
  private apis
**/

function delItem (self, that) {
  self._length -= that.length;
  self._itemCount --;
  delete self._cache[that.key];
}

function shiftItems (self, ctnt) {
  delete self._cacheList[ctnt.ctnt];

  while (self._minorCache < self._majorCache 
      && !self._cacheList[self._cache]) {
    self._cache ++;
  }
}

function trim (self) {
  while (self._cache < self._majorCache 
      && self._length > self._max) {
    del(self, self._cacheList[self._cache]);
  }
}






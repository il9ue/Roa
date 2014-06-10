/**
 *	router.js does the following :
 *  - handles RESTful interface
 *  - manages RESTful-using socket sessions to provide
 *     or reproduce efficient restful connection
 */

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

var RESTFUL_DESCRIBE = {
  DEFAULT_CODE = 100,
  GET_CODE = 101,
  POST_CODE = 102,
  UPDATE_CODE = 103,
  DELETE_CODE = 104
};

const MAX_RESTFUL_REQUEST = 10;

function Router (server, client, conn, options) {
  if (!(this instanceof Router))
    return new Router(server, client, conn, options);

  this.key = key;
  this.value = value;
  this.nameField = nameField;
  this.id = conn.id;
  this.client = client;
  this.request = client.request || {};
  this.opts = opts || {};

  this._session = 0;
  this._dispose = opts.dispose;
  this._MRSCount = 0;
  this._LRSCount = 0;
  this._mrsList = Object.create(null);
  this._lrsList = Object.create(null);
  this._lifetime = 0;
  this._itemCount = 0;

  this.reset();
  this.describe(client, opts);
}

Router.prototype.__proto__ = Emitter.prototype;

Object.defineProperty(LRUCache.prototype, "lifetime",
  { 
    set : function (num) {
      if (!num || !(typeof num === "number") || num <= 0 ) 
        num = Infinity;

      this._lifetime = num;
    },
    get : function () { return this._lifetime }
  , enumerable : true
  }
);

Router.prototype.forEach = function (fn, self) {
  self = self || this;
  var i = 0;
  for (var k = this._MRSCount - 1; k >= 0 && i < this._itemCount; k--) {
    if (this._lrsList[k]) {
      i++;
      var get = this._lrsList[k]
      if (this._maxAge && (Date.now() - get.now > this._maxAge)) {
        del(this, get)
      }
      if (get) {
        fn.call(thisp, get.value, get.key, this)
      }
    }
  }
}


/**
 *  @api : fetch
 *  @what : parse data on restful request
 *  @for : saves the possible request parsing resource
 */
Router.prototype.fetch = function() {

};

/**
 *  @api : setup
 *  @what : check and set most/least used session lists
 *  @for : saves the possible request parsing resource
 *  @return 
 *    - success : 
 *    - failure : 
 */
Router.prototype.setup = function(client) {

  var age = this._lifetime ? Date.now() : 0;
  var req = client.request;
  var reqLen = this._itemCount;

  if (!req || !(typeof req === "number")) {
    return false;
  }

  if (reqLen > MAX_RESTFUL_REQUEST) {
    // pop request and delete
    return false;
  }

  // need condition statements..
  this._mrsList[client.request.uid] = this._session[key];
  this._itemCount++;

  // restful request is handled by the following rule:
  //  - any requests are pushed to rest_queue
  //  - every requests pushed in queues are moved to either mrsList or lrsList, 
  //   based on the frequent use.. bacause certain clients are just for a type of restful request..
  
  return true;
};

function initLifetime() {
  if (this._lifetime) {
    this.request.now = Date.now();
  }

}

/**
 *  @api : describe
 *  @what : distinguish and identify the request description
 *  @for : saves the possible request parsing resource
 */
Router.prototype.describe = function(client, opts) {
  if (!client) client = {};
  if (!opts) opts = {};

  if (typeof client.request === 'number') {
    switch (client.request) {
      case RESTFUL_DESCRIBE.GET_CODE:
        makeDescription(RESTFUL_DESCRIBE.GET_CODE);
        break;
      case RESTFUL_DESCRIBE.POST_CODE:
        makeDescription(RESTFUL_DESCRIBE.POST_CODE);
        break;
      case RESTFUL_DESCRIBE.DELETE_CODE:
        makeDescription(RESTFUL_DESCRIBE.DELETE_CODE);
        break;
      case RESTFUL_DESCRIBE.UPDATE_CODE:
        makeDescription(RESTFUL_DESCRIBE.UPDATE_CODE);
        break;
      case RESTFUL_DESCRIBE.DEFAULT_CODE:
        makeDescription(RESTFUL_DESCRIBE.DEFAULT_CODE);
        break;
      default:
        break;
    }
    // what about options..??
    this.setup(client);
  }
};


function makeDescription(describe) {
  if (this.client._description)
    delete this.client._description;

  this.client._description = describe;
}

/**
 *  @api : reset
 */
Router.prototype.reset = function() {
  if (this._session && this._dispose) {
    for (var j in this._session) {

    }
  }

  this._session = Object.create(null);
  this._mrsList = Object.create(null);
  this._lrsList = Object.create(null);
  this._MRSCount = 0;
  this._LRSCount = 0;
};

/****************************************************
  private fields : Restful Content
****************************************************/

Router.prototype.Get = function(keys) {


};

Router.prototype.Post = function(value) {

};

Router.prototype.Update = function(keys, value) {

};

Router.prototype.Remove = function(keys) {

};

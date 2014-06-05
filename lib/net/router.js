/**
 *	router.js does the following :
 *  - handles RESTful interface
 *  - manages RESTful-using socket sessions
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


function Router (server, client, conn, options) {
  this.key = key;
  this.value = value;
  this.nameField = nameField;
  this.id = conn.id;
  this.client = client;
  this.length = length;
  this.prop = prop;
  this.dscr = dscr || {};
  this.opts = opts || {};
}

Router.prototype.__proto__ = Emitter.prototype;

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

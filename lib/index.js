

/**
 * Module dependencies.
 */

var Roa = require('./roa');


exports = module.exports = function() {
  return Roa.attach.apply(this, arguments);
};


for (var k in Roa) exports[k] = Roa[k];

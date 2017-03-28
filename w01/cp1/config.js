var 
  config = require('config')
  ,assert = require('assert')
  ;

const 
  HOST = 'dbConfig.host';
  PORT = 'dbConfig.port';
  NAME = 'dbConfig.dbName';

assert(config.has(HOST),'Missing Database host');
assert(config.has(PORT),'Missing Database port');
assert(config.has(NAME),'Missing Database name');

var getDBUrl = function() { 
  return 'mongodb://' +
         config.get(HOST) + ':' +
         config.get(PORT) + '/' +
         config.get(NAME);
 };

 exports.getDBUrl = getDBUrl;
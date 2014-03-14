'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');
var appPath = path.normalize(rootPath + '/../client/app');
module.exports = {
  root: rootPath,
  port: process.env.PORT || 15301,
  appPath: appPath,
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
};
//console.log(module.exports)
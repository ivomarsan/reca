(() => {
  'use strict';

  //const angular = require('angular');

  // Create my new module
  angular.module('angularDatetimeLite', []);

  // Include my dependencies
  //require('./config');
  require('./filters');
  require('./services');
  require('./directives');
  require('./controllers');

})();

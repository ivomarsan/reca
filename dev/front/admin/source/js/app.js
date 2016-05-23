(() => {
  'use strict';

  let angular = require('angular')
    , ngRoute = require('angular-route')
    , ngResrc = require('angular-resource')
  ;

  let app = angular.module('admin', [ngRoute, ngResrc]);


  // Services, Controllers and Directives (index.js)
  require('./config');
  require('./filters');
  require('./services');
  require('./controllers');

})();

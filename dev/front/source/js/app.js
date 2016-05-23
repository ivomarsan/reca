let angular = require('angular')
  , ngRoute = require('angular-route')
  , ngResrc = require('angular-resource')
  , ngMasks = require('angular-input-masks')
  , ngDateT = require('./angular-datetime-lite/')
;

let app = angular.module('myApp', [ngRoute, ngResrc, ngMasks, ngDateT]);


// Services, Controllers and Directives (index.js)
require('./config');
require('./filters');
require('./services');
require('./controllers');

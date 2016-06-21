let app = angular.module('admin');

app.config(['$routeProvider', function($routeProvider) {
  'use strict';

  $routeProvider
    .when('/',
      { templateUrl: 'admin.html'
      , controller: 'AdminController'
      }
    )
    .when('/login',
      { templateUrl: 'index.html'
      , controller: 'LoginController'
      }
    )
    .when('/print/:_id',
      { templateUrl: 'print.html'
      , controller: 'PrintController'
      }
    )
    .otherwise({
      redirectTo: '/login'
    })
  ;
}]);

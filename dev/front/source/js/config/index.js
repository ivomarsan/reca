var app = require('angular').module('myApp');

app.config(['$routeProvider', function($routeProvider) {
  'use strict';

  $routeProvider
    .when('/1',
      { templateUrl: 'identificacao.html'
      , controller: 'PedidoController'
      }
    )
    .when('/2',
      { templateUrl: 'viagem.html'
      , controller: 'PedidoController'
      }
    )
    .when('/3',
      { templateUrl: 'horarios.html'
      , controller: 'PedidoController'
      }
    )
    .when('/4',
      { templateUrl: 'passageiros.html'
      , controller: 'PedidoController'
      }
    )
    .otherwise({
      redirectTo: '/1'
    })
  ;
}]);

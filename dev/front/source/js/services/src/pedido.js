module.exports = ['$resource',
function($resource) {
  'use strict';

  // Rota do lado servidor
	return $resource('/reca/pedido/');

}];

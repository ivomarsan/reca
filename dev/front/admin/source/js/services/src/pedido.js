module.exports = ['$resource',
($resource) => {
  'use strict';

  // Rota do lado servidor
	return $resource('/reca/pedido/:id');

}];

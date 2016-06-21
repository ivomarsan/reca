module.exports = ['$scope', '$http', 'Login',
function($scope, $http, Login) {
  'use strict';

  $scope.pedidos = [];
  $scope.qtd = 0;

  const getPedidos = () => {
    $http(
      { method: 'GET'
      , url: 'http://localhost/reca/api/pedido/'
      , headers: {'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NzY5OTBmYTM4Mzk1MzQ4MTQ3NjYxMjEiLCJleHAiOjE0NjcxNDQ4NTQyODl9._DQnDGGgsK3Y5RfHUanlN-PN-4LzmIz0w2UzP944YYc'}
      })
      .success((data) => {
        const array = data.filter(ped => ped.status === 0);
        $scope.pedidos = array;
        $scope.qtd = array.length;
      })
      .error(err => console.error('Não foi possível obter a lista de Pedidos\nErro:', err) )
    ;
  };

  $scope.sendStatus = (status, pedidoId, justificativa) => {
    const pedido = $scope.pedidos.filter(ped => ped._id === pedidoId)[0];

    if(justificativa)
      pedido.justificativa = justificativa;
    pedido.status = status;

    $http.post('http://localhost/reca/api/pedido/', pedido)
      .success(() => {
        console.log('Status Alterado com Sucesso');
        getPedidos();
        console.log(pedido._id+'('+pedido.REQ_SOLICITANTE+') -> '+(pedido.status === 1 ? 'Aprovado' : 'Reprovado'));
      })
      .error(err => console.error('Não foi possível alterar o status\nErro:', err) )
    ;
  };



  const init = () => {
// Checa se o Login foi Feito corretamente
    if( Login.check() === false )
      window.location.href = '/admin/#/login';
// Se Sim :)
    getPedidos();
  };
  init();
  // setInterval(() => init(), 10000);

}];

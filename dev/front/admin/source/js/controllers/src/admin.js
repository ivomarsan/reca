module.exports = ['$scope', '$http', 'Login',
function($scope, $http, Login) {
  'use strict';

  $scope.pedidos = [];
  $scope.qtd = 0;

  const getPedidos = () => {
    $http(
      { method: 'GET'
      , url: '/reca/api/pedido/'
      , headers: {'Authorization': Login.getToken() }
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

    $http.post('/reca/api/pedido/', pedido)
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
      window.location.href = '/reca/admin/#/login';
// Se Sim :)
    getPedidos();
  };
  init();
  // setInterval(() => init(), 10000);

}];

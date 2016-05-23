module.exports = ['$scope', '$http', 'Login', 'Pedido',
function($scope, $http, Login, Pedido) {
  'use strict';

  $scope.pedidos = [];
  $scope.qtd = 0;

  const getPedidos = () => {
    Pedido.query(
      (data) => {
        const array = data.filter(ped => ped.status === 0);
        $scope.pedidos = array;
        $scope.qtd = array.length;
      },
      (err) => {
        console.error('Não foi possível obter a lista de Pedidos');
        console.error(err);
      }
    );
  };

  $scope.sendStatus = (status, pedidoId, justificativa) => {
    const pedido = $scope.pedidos.filter(ped => ped._id === pedidoId)[0];

    if(justificativa)
      pedido.justificativa = justificativa;
    pedido.status = status;

    $http.post('/pedido', pedido)
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

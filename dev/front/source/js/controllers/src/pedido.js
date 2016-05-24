module.exports = ['$scope', '$http', '$routeParams', 'Scopes', 'Pedido',
function($scope, $http, $routeParams, Scopes, Pedido) {
  'use strict';

  if($routeParams._id)
    getPedido();
  else
    $scope.pedido = new Pedido();

  $scope.passageiros = {};

  function getPedido() {
    Pedido.get({ id: $routeParams._id }
    , (data) => {
        $scope.pedido = data;
      }
    , (err) => {
        console.error('Não foi possível obter o pedido');
        console.error(err);
      }
    );
  }

  $scope.sendData = () => {
    // Insere os Passageiros no Objeto $scope.pedido
    $scope.pedido.passageiros = [];
    let _o_ = $scope.passageiros;
    let count = 0;
    for(let each in _o_.NOME)
      count = (+each)+1;
    for(let i=0; i<count; i++)
      $scope.pedido.passageiros.push(
        { NOME: _o_.NOME[i]
        , MATRICULA: _o_.MATRICULA[i]
        , CPF: _o_.CPF[i]
        , CELULAR: _o_.CELULAR[i]
        }
      );

    $http.post('/pedido', $scope.pedido)
      .success(() => {
        // Limpa o Formulário
        $scope.pedido = new Pedido();
        window.location.href = '/ok';
      })
      .error(err => console.error('Não foi possível salvar o pedido\nErro:', err) )
    ;
  };

// //////
// Entre Telas
// //////
  $scope.setData = () => {
    Scopes.set('reca', $scope.pedido);
  };

  $scope.getData = () => {
    $scope.pedido = Scopes.get('reca') || {};
  };

  $scope.getData();

}];

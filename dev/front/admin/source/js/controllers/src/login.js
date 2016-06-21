module.exports = ['$scope', 'Login',
function($scope, Login) {
  'use strict';


// //////
// Fazer Login
// //////
  $scope.enter = () => {
    Login.do($scope.login);

    if( Login.check() === true )
      window.location.href = '/admin/#/';
  };

}];

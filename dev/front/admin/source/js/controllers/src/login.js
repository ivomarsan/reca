module.exports = ['$scope', 'Login',
function($scope, Login) {
  'use strict';


// //////
// Fazer Login
// //////
  $scope.enter = () => {
    Login.do($scope.login, (ok) => {
      if(ok) window.location.href = '/reca/admin/#/';
    });

    // if( Login.check() === true )
    //   window.location.href = '/admin/#/';
  };

}];

module.exports = ['$http',
($http) => {
  'use strict';

  let status = false;

  return {
    do(obj) {
      $http.post('/reca/authenticate', { user: obj.user, pass: obj.pass })
        .success((data) => {
          if(data.success)
            status = true;
          else
            console.error(data.message);
        })
        .error(err => status = false )
      ;
    },
    check() {
      return status;
    }
  };

}];

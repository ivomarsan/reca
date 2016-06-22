module.exports = ['$http',
function($http) {
  'use strict';

  let status = false;
  let token = '';

  return {
    do: function(obj, cb) {
      if( !obj.user || !obj.pass )
        status = false;
      else
        $http.post('/reca/api/auth/', obj)
          .success((data) => {
            token = data.token;
            status = true;
            cb(status);
          })
          .error(err => console.error(err) )
        ;
    },
    check: function() {
      return status;
    },
    getToken: function() {
      return token;
    }
  };

}];

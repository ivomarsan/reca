module.exports = ['$http',
function($http) {
  'use strict';

  let status = false;

  return {
    do: function(obj, cb) {
      if( !obj.user || !obj.pass )
        status = false;
      else
        $http.post('http://localhost/reca/api/auth/', obj)
          .success((data) => {
            console.log(data);
            status = true;
            cb(status);
          })
          .error(err => console.error(err) )
        ;
    },
    check: function() {
      return status;
    }
  };

}];

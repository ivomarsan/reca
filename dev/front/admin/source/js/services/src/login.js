module.exports = function() {
  'use strict';

  let status = false;

  const login = {
    u: 'rep',
    p: 'laraifce',
  };
  login.user = (u) => login.u === u;
  login.pass = (p) => login.p === p;

  return {
    do: function(obj) {
      if( login.user(obj.user) && login.pass(obj.pass) )
        status = true;
      else
        status = false;
    },
    check: function() {
      return status;
    }
  };

};

module.exports = ['$compile', '$document','$controller',
function($compile, $document, $controller) {
  'use strict';

  // Directive Controller
  const Ctrl = $controller('datetimeLite');
  let mem = {}
    , lang =
      { 'pt-br':
        { day: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado'.split('_')
        , month: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_')
        }
      }
  ;

  return {
    open: function(o) { // o = Options
      Ctrl.openDatetimeLite(o);
    },
    close: function() {
      Ctrl.closeDatetimeLite();
    },
    set: function(key, value) {
      mem[key] = value;
    },
    get: function(key) {
      return mem[key];
    },
    lang: function(key) {
      return lang[mem.lang];
    }
  };

}];

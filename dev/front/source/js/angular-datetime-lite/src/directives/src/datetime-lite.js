module.exports = ['$filter', 'DatetimeLite',
function($filter, DatetimeLite) {
  'use strict';

  // Set Language
  DatetimeLite.set('lang', 'pt-br');


  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      // Attach validation watcher
      scope.$watch(attrs.ngModel, function(value) {
        if( !value || value === '' ) return;

        // The value has already been cleaned by the above code
        let date = +new Date(value);
        ctrl.$setValidity('date', !date ? false : true);
      });

      ctrl.$formatters.push(function(value) {
        let format = attrs.format || '#, DD/MM/AAAA às HH:II';

        return $filter('dateFormat')(format, value);
      });


      element[0].addEventListener('click', function() {
        DatetimeLite.open({
          triggerEl: element[0],
          ngModel: attrs.ngModel,
          year: attrs.year,
          month: attrs.month,
          day: attrs.day,
          hour: attrs.hour,
          min: attrs.min,
          date: attrs.date, // Date Only
          time: attrs.time, // Time Only
          future: attrs.future // Future Only
        });
      });

    }
  };

}];

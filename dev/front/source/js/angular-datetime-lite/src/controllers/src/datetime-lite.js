module.exports = function($compile, $document) {
  'use strict';

/*
 Remove the current Calendar Element
*/
  const removeEl = (el) => {
    el && el.remove();
    $document[0].body.removeEventListener('click', this.closeDatetimeLite);
  };
/*
 Show the Calendar
 below of your trigger
*/
  const getPos = {};
    getPos.y = (el) => (el.offsetParent.offsetTop + (el.offsetTop+el.offsetHeight));
    getPos.x = (el) => (el.offsetParent.offsetLeft + el.offsetLeft);
  const positionCalendar = (el) => {
    if(el.triggerEl) {
    	el.style.left = getPos.x(el.triggerEl)+ 'px';
    	el.style.top  = getPos.y(el.triggerEl)+ 'px';
    } else
      console.error('triggerEl Não Encontrado');
  };

  this.openDatetimeLite = (options) => {
    this.closeDatetimeLite();
    let div = angular.element('<datetime-lite-popup ng-cloak></datetime-lite-popup>');
    options.ngModel  &&  div.attr('ng-model', options.ngModel );
    options.year     &&  div.attr('year',    +options.year    );
    options.month    &&  div.attr('month',   +options.month   );
    options.day      &&  div.attr('day',     +options.day     );
    options.hour     &&  div.attr('hour',    +options.hour    );
    options.min      &&  div.attr('min',     +options.min     );
    // Date Only and Time Only
    options.date     &&  div.attr('date',     options.date    );
    options.time     &&  div.attr('time',     options.time    );
    options.future   &&  div.attr('future',   options.future  );

    options.scope = options.scope || angular.element( options.triggerEl ).scope();
    let calendar = $compile(div)(options.scope)[0];
        calendar.triggerEl = options.triggerEl;
        calendar.addEventListener('click', function(e) {
    			e.stopPropagation();
    		});
    positionCalendar(calendar);
    options.scope.$apply();
    $document[0].body.appendChild(calendar);
    $document[0].body.addEventListener('click', this.closeDatetimeLite);
  };

  this.closeDatetimeLite = (evt) => {
    let target = evt && evt.target
      , popupEl = $document[0].querySelector('div[id="angular-datetime-lite"]')
    ;
    if (evt && target) {
      if (target.hasAttribute('datetime-lite')) {  // element with DatetimeLite behaviour
        // do nothing
      } else if(popupEl && popupEl.contains(target)) { // DatetimeLite itself
        // do nothing
      } else {
        removeEl(popupEl);
      }
    } else {
      removeEl(popupEl);
    }
  };

};

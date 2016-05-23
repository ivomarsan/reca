module.exports = ['$compile', '$filter', 'dateFilter', 'DatetimeLite',
function($compile, $filter, dateFilter, DatetimeLite) {
  'use strict';

  // Set Language
  DatetimeLite.set('lang', 'pt-br');
  // Use Language
  let lang = DatetimeLite.lang();


  let tmplYear = [
    '<div id="angular-datetime-lite">' ,
    '  <header>',
    '    <button ng-click="add.year(-1)">⇐</button>',
    '    <span>{{mv.year}}</span>',
    '    <button ng-click="add.year(1)">⇒</button>',
    '  </header>',
    '  <section class="year">',
    '    <div ng-repeat="m in months" ng-click="set.year(m.value)">{{m.shortName}}</div>',
    '  </section>',
    '</div>'].join("\n");
  let tmplMonth = [
    '<div id="angular-datetime-lite">' ,
    '  <header>',
    '    <button ng-click="add.month(-1)">⇐</button>',
    '    <span ng-click="useView(\'year\')">{{months[mv.month].fullName}} de {{mv.year}}</span>',
    '    <button ng-click="add.month(1)">⇒</button>',
    '  </header>',
    '  <section class="month">',
    '    <span ng-repeat="d in daysOfWeek" title="{{d.fullName}}">{{d.shortName}}</span>',
    '  </section>',
    '  <section class="month" ng-click="set.month($event)">',
    '    <div ng-repeat="d in mv.leadingDays">{{d}}</div>',
    '    <div class="curr" ng-repeat="d in mv.days" ',
    '      ng-class="{selected: (d == selectedDay)}">{{d}}</div>',
    '    <div ng-repeat="d in mv.trailingDays">{{d}}</div>',
    '  </section>',
    '</div>'].join("\n");
  let tmplDay = [
    '<div id="angular-datetime-lite">' ,
    '  <header>',
    '    <button ng-click="add.day(-1)">⇐</button>',
    '    <span ng-click="useView(\'month\')">{{selectedDay}} de {{months[mv.month].shortName}} de {{mv.year}}</span>',
    '    <button ng-click="add.day(1)">⇒</button>',
    '  </header>',
    '  <section class="day" ng-click="set.day($event)">',
    '    <div ng-repeat="i in [] | range:24">{{i<10 ? \'0\'+i : i}}:00</div>',
    '  </section>',
    '</div>'].join("\n");
  let tmplHour = [
    '<div id="angular-datetime-lite">' ,
    '  <header>',
    '    <button ng-click="add.hour(-1)">⇐</button>',
    '    <span ng-click="useView(\'day\')">{{selectedDay}} de {{months[mv.month].shortName}} de {{mv.year}}</span>',
    '    <button ng-click="add.hour(1)">⇒</button>',
    '  </header>',
    '  <section class="hour" ng-click="set.hour($event)">',
    '    <div ng-repeat="i in [] | range:60:5">{{selectedHour<10?\'0\'+selectedHour:selectedHour}}:{{i<10 ? \'0\'+i : i}}</div>',
    '  </section>',
    '</div>'].join("\n");
/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/
/*
 Change the current template (view)
*/
  const useView = (view) => {
    const _ = {
      'hour'  : tmplHour,
      'day'   : tmplDay,
      'month' : tmplMonth,
      'year'  : tmplYear
    };
    return _[view || 'month'];
  };


// //////
// Entre Telas
// //////
  const setData = (view) => DatetimeLite.set('view', view);
  const getData = () => DatetimeLite.get('view');
/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/

  let days, months, daysOfWeek;

  const getTimezoneOffset = (date) => {
    (typeof date == 'string') && (date = new Date(date));

    let jan = new Date(date.getFullYear(), 0, 1)
      , jul = new Date(date.getFullYear(), 6, 1)
      , stdTimezoneOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
      , isDST = date.getTimezoneOffset() < stdTimezoneOffset
      , offset = isDST ? stdTimezoneOffset - 60 : stdTimezoneOffset
      , diff = offset >=0 ? '-' : '+'
    ;

    return diff +
      ("0"+ (offset / 60)).slice(-2) + ':' +
      ("0"+ (offset % 60)).slice(-2);
  };

  const initVars = () => {
    days =[], months=[]; daysOfWeek=[];
    const month = (i) => lang.month[i];
    const day = (i) => lang.day[i % 7];

    for (let i = 1; i <= 31; i++)
      days.push(i);

    for (let j = 0; j < 12; j++)
      months.push({
        value: j,
        fullName: month(j),
        shortName: month(j).substr(0, 3)
      });

    for (var i = 0; i < 7; i++)
      daysOfWeek.push({
        fullName: day(i),
        shortName: day(i).substr(0, 3)
      });
  };

  const getMonthView = (year, month) => {
    year = month>11 ? ++year : month<0 ? --year : year;
    month = (month + 12) % 12;
    var a = new Date(year, month, 1)      // First Day Of Month
      , b = new Date(year, month + 1, 0)  // Last Day Of Current Month
      , c = new Date(year, month, 0)      // Last Day Of Last Month
      , d = a.getDay()    // Day Of Week
      , e = b.getDate()   // Days In Month
      , f = c.getDate()   // Days In Last Month
      , g = (d + 7) % 7 || 7 // Ensure there are always leading days to give context
      , h = days.slice(0, 6 * 7 - (g + e))
    ;

    return { year: year
           , month: month
           , days: days.slice(0, e)
           , leadingDays: days.slice(- g - (31 - f), f)
           , trailingDays: h
    };
  };

  const linker = (scope, element, attrs, ctrl) => {
    initVars(); //initialize days, months and daysOfWeek
    scope.months = months;
    scope.daysOfWeek = daysOfWeek;

    scope.$applyAsync(function() {
      ctrl.triggerEl = angular.element(element[0].triggerEl);
      if (attrs.ngModel) // need to parse date string
        scope.d = new Date(+ctrl.triggerEl.scope().$eval(attrs.ngModel));

      if (!scope.d || isNaN(scope.d.getTime())) { // no predefined date
        let t = new Date()
          , year  = scope.year || t.getFullYear()
          , month = scope.month ? (scope.month-1) : t.getMonth()
          , day   = scope.day  || t.getDate()
          , hour  = scope.hour || t.getHours()
          , min   = scope.min  || t.getMinutes()
        ;
        scope.d = new Date(year, month, day, hour, min);
        scope.selectedHour = scope.d.getHours();
      }

      // Default to current year and month
      scope.mv = getMonthView(scope.d.getFullYear(), scope.d.getMonth());
      if (scope.mv.year === scope.d.getFullYear() && scope.mv.month === scope.d.getMonth())
        scope.selectedDay = scope.d.getDate();
      else
        scope.selectedDay = null;
    });


    scope.add = () => 'This is a Function';
    scope.add.year  = (n) => scope.mv = getMonthView(scope.mv.year+ n, scope.mv.month);
    scope.add.month = (n) => scope.mv = getMonthView(scope.mv.year, scope.mv.month+ n);
    scope.add.day   = (n) => {
      let lastDayOfThisMonth = getMonthView(scope.mv.year, scope.mv.month).days.slice(-1)[0]
        , lastDayOfLastMonth = getMonthView(scope.mv.year, scope.mv.month- 1).days.slice(-1)[0]
      ;
      if (scope.selectedDay+ n > lastDayOfThisMonth) {
        scope.selectedDay = 1;
        scope.mv = getMonthView(scope.mv.year, +scope.mv.month +1);
      } else if (scope.selectedDay+ n < 1) {
        scope.selectedDay = lastDayOfLastMonth;
        scope.mv = getMonthView(scope.mv.year, +scope.mv.month -1);
      } else
        scope.selectedDay = n > 0 ? scope.selectedDay+1 : scope.selectedDay-1;
    };
    scope.add.hour  = (n) => {
      if (scope.selectedHour+ n > 23) {
        scope.selectedHour = 0;
        scope.add.day(1);
      } else if (scope.selectedHour+ n < 0) {
        scope.selectedHour = 23;
        scope.add.day(-1);
      } else
        scope.selectedHour = n > 0 ? scope.selectedHour+1 : scope.selectedHour-1;
    };

    scope.set = () => 'This is a Function';
    scope.set.year = (m) => {
      scope.mv.month = m;
      scope.mv = getMonthView(scope.mv.year, scope.mv.month);
      scope.useView('month');
    };
    scope.set.month = (evt) => {
      let target = angular.element(evt.target)[0];
      if (target.className.indexOf('selectable'))
        scope.updateNgModel(parseInt(target.innerHTML));
      // IF ONLY DATE DO IT
      //ctrl.closeDatetimeLite();
      scope.useView('day');
    };
    scope.set.day = (evt) => {
      let target = angular.element(evt.target)[0];
      scope.updateNgModel(scope.selectedDay, parseInt(target.innerHTML));
      scope.useView('hour');
    };
    scope.set.hour = (evt) => {
      let target = angular.element(evt.target)[0]
        , value = (target.innerHTML).split(':');
      scope.updateNgModel(scope.selectedDay, scope.selectedHour, parseInt(value[1]));
      ctrl.closeDatetimeLite();
    };

    scope.updateNgModel = (day, hour, minute) => {
      scope.selectedDay=(day = day ? day : scope.d.getDate());
      scope.selectedHour=(hour = hour ? hour : scope.d.getHours());
      minute = minute ? minute : scope.d.getMinutes();
      scope.d = new Date(scope.mv.year, scope.mv.month, day, hour, minute);
      if(attrs.ngModel) {
        let dateValue = +scope.d
          , elScope = ctrl.triggerEl.scope()
        ;

      // Future Only
        if( attrs.hasOwnProperty('future') ) {
          let date = attrs.future ? +attrs.future : +new Date();
          let isValid = (dateValue < date ? false : true);
          dateValue = isValid ? dateValue : date;
        }
        if( dateValue === null ) ctrl.closeDatetimeLite();
      //

        elScope.$eval(attrs.ngModel + '= date', {date: dateValue});
      }
    };


    scope.useView = (v) => {
      !getData() && setData( useView(attrs.content || v) );
          v      && setData( useView(         v        ) );

      element.html( getData() );
      $compile(element.contents())(scope);
    };

    //scope.$on('$destroy', ctrl.closeDatetimeLite);
  };

  return {
    restrict: 'E',
    template: tmplMonth,// DatetimeLite.get('view') == 'time' ? tmplDay : tmplMonth,
    controller: 'datetimeLite',
    replace: true,
    scope: {
      year: '=',
      month: '=',
      day: '=',
      hour: '=',
      min: '=',
      content:'=',
      future: '='
    },
    link: linker
  };

}];

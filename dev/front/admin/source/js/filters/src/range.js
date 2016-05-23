module.exports = () => {
  'use strict';

  const filter = (arr, max, step) => {
    if (!max && !step)
      return arr;

    let t  = +max
      , s = step ? +step : 1
    ;

    for(let i=0; i<t; i+=s)
      arr.push(i);

    return arr;
  };

  return filter;

};

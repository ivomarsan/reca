module.exports = () => {
  'use strict';

  const uno = (n,i) => (n.toString()).slice(i,i+1);

  const filter = (number, format) => {
    if(!number) return '';
    let total = (number.toString()).length
      , i=0
    ;
    format = format ? format : total===11 ? 'xxx.xxx.xxx-xx' : console.error('Format CPF Invalid!');

    for(i=0; i<total; i++)
      format = format.replace('x', uno(number, i));

    return format;
  };
  return filter;

};

module.exports = (DatetimeLite) => {
  'use strict';

  // Use Language
  let lang = DatetimeLite.lang();

  //*** This code is copyright 2002-2003 by Gavin Kistner, !@phrogz.net
  //*** It is covered under the license viewable at http://phrogz.net/JS/_ReuseLicense.txt
  // Adapter by @ivomarsan
  const filter = (format, milliseconds) => {
    if(!milliseconds) return '';

    let YYYY,YY,MMMM,MMM,MM,DDDD,DDD,DD,m,d,h,i,s,dMod,th
    , now = new Date(+milliseconds)
    ;
    format = format.replace('MM', (m=now.getMonth()+1) <10 ? ('0'+m) : m );
    format = format.replace('DD', (d=now.getDate())    <10 ? ('0'+d) : d );
    format = format.replace('HH', (h=now.getHours())   <10 ? ('0'+h) : h );
    format = format.replace('II', (i=now.getMinutes()) <10 ? ('0'+i) : i );
    format = format.replace('SS', (s=now.getSeconds()) <10 ? ('0'+s) : s );
    if (i===0) i=24;
    YY = ((YYYY=now.getFullYear())+'').slice(-2);
    MMM = (MMMM=lang.month[m-1]).substr(0,3);
    DDD = (DDDD=lang.day[now.getDay()]).substr(0,3);
    format = format.replace('AAAA',YYYY).replace('AA',YY).replace('MMMM',MMMM).replace('MMM',MMM).replace('DDDD',DDDD).replace('#',DDD);
    //return [format, h<12 ? ' AM' : ''].join('');
    return format;
  };
  return filter;

};

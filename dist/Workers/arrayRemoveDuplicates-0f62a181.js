define(["exports","./Check-d18af7c4","./when-208fe5b0","./Math-4e53b694"],(function(e,t,r,n){"use strict";var f=n.CesiumMath.EPSILON10;e.arrayRemoveDuplicates=function(e,t,n){if(r.defined(e)){n=r.defaultValue(n,!1);var i,a,u,h=e.length;if(h<2)return e;for(i=1;i<h&&!t(a=e[i-1],u=e[i],f);++i);if(i===h)return n&&t(e[0],e[e.length-1],f)?e.slice(1):e;for(var l=e.slice(0,i);i<h;++i)t(a,u=e[i],f)||(l.push(u),a=u);return n&&1<l.length&&t(l[0],l[l.length-1],f)&&l.shift(),l}}}));
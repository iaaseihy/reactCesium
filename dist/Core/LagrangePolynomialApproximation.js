import defined from"./defined.js";var LagrangePolynomialApproximation={type:"Lagrange",getRequiredDataPoints:function(r){return Math.max(r+1,2)},interpolateOrderZero:function(r,e,a,n,o){var t,i;defined(o)||(o=new Array(n));var f=e.length;for(t=0;t<n;t++)o[t]=0;for(t=0;t<f;t++){var d=1;for(i=0;i<f;i++)if(i!==t){var g=e[t]-e[i];d*=(r-e[i])/g}for(i=0;i<n;i++)o[i]+=d*a[t*n+i]}return o}};export default LagrangePolynomialApproximation;
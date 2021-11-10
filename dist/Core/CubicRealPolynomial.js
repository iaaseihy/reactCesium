import DeveloperError from"./DeveloperError.js";import QuadraticRealPolynomial from"./QuadraticRealPolynomial.js";var CubicRealPolynomial={};function computeRealRoots(r,e,o,a){var t,i,n=r,u=e/3,l=o/3,m=a,p=n*l,s=u*m,h=u*u,f=l*l,c=n*l-h,b=n*m-u*l,R=u*m-f,v=4*c*R-b*b;if(v<0){var w,M,y;h*s>=p*f?(w=n,M=c,y=-2*u*c+n*b):(w=m,M=R,y=-m*b+2*l*R);var d=-(y<0?-1:1)*Math.abs(w)*Math.sqrt(-v),q=(i=-y+d)/2,D=q<0?-Math.pow(-q,1/3):Math.pow(q,1/3),E=i===d?-D:-M/D;return t=M<=0?D+E:-y/(D*D+E*E+M),h*s>=p*f?[(t-u)/n]:[-m/(t+l)]}var P=c,Q=-2*u*c+n*b,C=R,g=-m*b+2*l*R,j=Math.sqrt(v),x=Math.sqrt(3)/2,L=Math.abs(Math.atan2(n*j,-Q)/3);t=2*Math.sqrt(-P);var k=Math.cos(L);i=t*k;var z=t*(-k/2-x*Math.sin(L)),A=i+z>2*u?i-u:z-u,B=n,F=A/B;L=Math.abs(Math.atan2(m*j,-g)/3);var G=-m,H=(i=(t=2*Math.sqrt(-C))*(k=Math.cos(L)))+(z=t*(-k/2-x*Math.sin(L)))<2*l?i+l:z+l,I=G/H,J=-A*H-B*G,K=(l*J-u*(A*G))/(-u*J+l*(B*H));return F<=K?F<=I?K<=I?[F,K,I]:[F,I,K]:[I,F,K]:F<=I?[K,F,I]:K<=I?[K,I,F]:[I,K,F]}CubicRealPolynomial.computeDiscriminant=function(r,e,o,a){if("number"!==typeof r)throw new DeveloperError("a is a required number.");if("number"!==typeof e)throw new DeveloperError("b is a required number.");if("number"!==typeof o)throw new DeveloperError("c is a required number.");if("number"!==typeof a)throw new DeveloperError("d is a required number.");var t=e*e,i=o*o;return 18*r*e*o*a+t*i-27*(r*r)*(a*a)-4*(r*i*o+t*e*a)},CubicRealPolynomial.computeRealRoots=function(r,e,o,a){if("number"!==typeof r)throw new DeveloperError("a is a required number.");if("number"!==typeof e)throw new DeveloperError("b is a required number.");if("number"!==typeof o)throw new DeveloperError("c is a required number.");if("number"!==typeof a)throw new DeveloperError("d is a required number.");var t,i;if(0===r)return QuadraticRealPolynomial.computeRealRoots(e,o,a);if(0===e){if(0===o){if(0===a)return[0,0,0];var n=(i=-a/r)<0?-Math.pow(-i,1/3):Math.pow(i,1/3);return[n,n,n]}return 0===a?0===(t=QuadraticRealPolynomial.computeRealRoots(r,0,o)).Length?[0]:[t[0],0,t[1]]:computeRealRoots(r,0,o,a)}return 0===o?0===a?(i=-e/r)<0?[i,0,0]:[0,0,i]:computeRealRoots(r,e,0,a):0===a?0===(t=QuadraticRealPolynomial.computeRealRoots(r,e,o)).length?[0]:t[1]<=0?[t[0],t[1],0]:t[0]>=0?[0,t[0],t[1]]:[t[0],0,t[1]]:computeRealRoots(r,e,o,a)};export default CubicRealPolynomial;
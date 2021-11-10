import DeveloperError from"./DeveloperError.js";import CesiumMath from"./Math.js";var QuadraticRealPolynomial={};function addWithCancellationCheck(r,e,a){var t=r+e;return CesiumMath.sign(r)!==CesiumMath.sign(e)&&Math.abs(t/Math.max(Math.abs(r),Math.abs(e)))<a?0:t}QuadraticRealPolynomial.computeDiscriminant=function(r,e,a){if("number"!==typeof r)throw new DeveloperError("a is a required number.");if("number"!==typeof e)throw new DeveloperError("b is a required number.");if("number"!==typeof a)throw new DeveloperError("c is a required number.");return e*e-4*r*a},QuadraticRealPolynomial.computeRealRoots=function(r,e,a){if("number"!==typeof r)throw new DeveloperError("a is a required number.");if("number"!==typeof e)throw new DeveloperError("b is a required number.");if("number"!==typeof a)throw new DeveloperError("c is a required number.");var t;if(0===r)return 0===e?[]:[-a/e];if(0===e){if(0===a)return[0,0];var i=Math.abs(a),o=Math.abs(r);if(i<o&&i/o<CesiumMath.EPSILON14)return[0,0];if(i>o&&o/i<CesiumMath.EPSILON14)return[];if((t=-a/r)<0)return[];var n=Math.sqrt(t);return[-n,n]}if(0===a)return(t=-e/r)<0?[t,0]:[0,t];var u=addWithCancellationCheck(e*e,-(4*r*a),CesiumMath.EPSILON14);if(u<0)return[];var m=-.5*addWithCancellationCheck(e,CesiumMath.sign(e)*Math.sqrt(u),CesiumMath.EPSILON14);return e>0?[m/r,a/m]:[a/m,m/r]};export default QuadraticRealPolynomial;
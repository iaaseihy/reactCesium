import Uri from"../ThirdParty/Uri.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import DeveloperError from"./DeveloperError.js";function getAbsoluteUri(e,r){var t;return"undefined"!==typeof document&&(t=document),getAbsoluteUri._implementation(e,r,t)}getAbsoluteUri._implementation=function(e,r,t){if(!defined(e))throw new DeveloperError("relative uri is required.");if(!defined(r)){if("undefined"===typeof t)return e;r=defaultValue(t.baseURI,t.location.href)}var i=new Uri(r);return new Uri(e).resolve(i).toString()};export default getAbsoluteUri;
import Check from"./Check.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import DeveloperError from"./DeveloperError.js";import CesiumMath from"./Math.js";import OrthographicOffCenterFrustum from"./OrthographicOffCenterFrustum.js";function OrthographicFrustum(t){t=defaultValue(t,defaultValue.EMPTY_OBJECT),this._offCenterFrustum=new OrthographicOffCenterFrustum,this.width=t.width,this._width=void 0,this.aspectRatio=t.aspectRatio,this._aspectRatio=void 0,this.near=defaultValue(t.near,1),this._near=this.near,this.far=defaultValue(t.far,5e8),this._far=this.far}function update(t){if(!defined(t.width)||!defined(t.aspectRatio)||!defined(t.near)||!defined(t.far))throw new DeveloperError("width, aspectRatio, near, or far parameters are not set.");var e=t._offCenterFrustum;if(t.width!==t._width||t.aspectRatio!==t._aspectRatio||t.near!==t._near||t.far!==t._far){if(t.aspectRatio<0)throw new DeveloperError("aspectRatio must be positive.");if(t.near<0||t.near>t.far)throw new DeveloperError("near must be greater than zero and less than far.");t._aspectRatio=t.aspectRatio,t._width=t.width,t._near=t.near,t._far=t.far;var r=1/t.aspectRatio;e.right=.5*t.width,e.left=-e.right,e.top=r*e.right,e.bottom=-e.top,e.near=t.near,e.far=t.far}}OrthographicFrustum.packedLength=4,OrthographicFrustum.pack=function(t,e,r){return Check.typeOf.object("value",t),Check.defined("array",e),r=defaultValue(r,0),e[r++]=t.width,e[r++]=t.aspectRatio,e[r++]=t.near,e[r]=t.far,e},OrthographicFrustum.unpack=function(t,e,r){return Check.defined("array",t),e=defaultValue(e,0),defined(r)||(r=new OrthographicFrustum),r.width=t[e++],r.aspectRatio=t[e++],r.near=t[e++],r.far=t[e],r},Object.defineProperties(OrthographicFrustum.prototype,{projectionMatrix:{get:function(){return update(this),this._offCenterFrustum.projectionMatrix}}}),OrthographicFrustum.prototype.computeCullingVolume=function(t,e,r){return update(this),this._offCenterFrustum.computeCullingVolume(t,e,r)},OrthographicFrustum.prototype.getPixelDimensions=function(t,e,r,a,i){return update(this),this._offCenterFrustum.getPixelDimensions(t,e,r,a,i)},OrthographicFrustum.prototype.clone=function(t){return defined(t)||(t=new OrthographicFrustum),t.aspectRatio=this.aspectRatio,t.width=this.width,t.near=this.near,t.far=this.far,t._aspectRatio=void 0,t._width=void 0,t._near=void 0,t._far=void 0,this._offCenterFrustum.clone(t._offCenterFrustum),t},OrthographicFrustum.prototype.equals=function(t){return!!(defined(t)&&t instanceof OrthographicFrustum)&&(update(this),update(t),this.width===t.width&&this.aspectRatio===t.aspectRatio&&this._offCenterFrustum.equals(t._offCenterFrustum))},OrthographicFrustum.prototype.equalsEpsilon=function(t,e,r){return!!(defined(t)&&t instanceof OrthographicFrustum)&&(update(this),update(t),CesiumMath.equalsEpsilon(this.width,t.width,e,r)&&CesiumMath.equalsEpsilon(this.aspectRatio,t.aspectRatio,e,r)&&this._offCenterFrustum.equalsEpsilon(t._offCenterFrustum,e,r))};export default OrthographicFrustum;
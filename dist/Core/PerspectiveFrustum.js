import Check from"./Check.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import DeveloperError from"./DeveloperError.js";import CesiumMath from"./Math.js";import PerspectiveOffCenterFrustum from"./PerspectiveOffCenterFrustum.js";function PerspectiveFrustum(e){e=defaultValue(e,defaultValue.EMPTY_OBJECT),this._offCenterFrustum=new PerspectiveOffCenterFrustum,this.fov=e.fov,this._fov=void 0,this._fovy=void 0,this._sseDenominator=void 0,this.aspectRatio=e.aspectRatio,this._aspectRatio=void 0,this.near=defaultValue(e.near,1),this._near=this.near,this.far=defaultValue(e.far,5e8),this._far=this.far,this.xOffset=defaultValue(e.xOffset,0),this._xOffset=this.xOffset,this.yOffset=defaultValue(e.yOffset,0),this._yOffset=this.yOffset}function update(e){if(!defined(e.fov)||!defined(e.aspectRatio)||!defined(e.near)||!defined(e.far))throw new DeveloperError("fov, aspectRatio, near, or far parameters are not set.");var t=e._offCenterFrustum;if(e.fov!==e._fov||e.aspectRatio!==e._aspectRatio||e.near!==e._near||e.far!==e._far||e.xOffset!==e._xOffset||e.yOffset!==e._yOffset){if(e.fov<0||e.fov>=Math.PI)throw new DeveloperError("fov must be in the range [0, PI).");if(e.aspectRatio<0)throw new DeveloperError("aspectRatio must be positive.");if(e.near<0||e.near>e.far)throw new DeveloperError("near must be greater than zero and less than far.");e._aspectRatio=e.aspectRatio,e._fov=e.fov,e._fovy=e.aspectRatio<=1?e.fov:2*Math.atan(Math.tan(.5*e.fov)/e.aspectRatio),e._near=e.near,e._far=e.far,e._sseDenominator=2*Math.tan(.5*e._fovy),e._xOffset=e.xOffset,e._yOffset=e.yOffset,t.top=e.near*Math.tan(.5*e._fovy),t.bottom=-t.top,t.right=e.aspectRatio*t.top,t.left=-t.right,t.near=e.near,t.far=e.far,t.right+=e.xOffset,t.left+=e.xOffset,t.top+=e.yOffset,t.bottom+=e.yOffset}}PerspectiveFrustum.packedLength=6,PerspectiveFrustum.pack=function(e,t,r){return Check.typeOf.object("value",e),Check.defined("array",t),r=defaultValue(r,0),t[r++]=e.fov,t[r++]=e.aspectRatio,t[r++]=e.near,t[r++]=e.far,t[r++]=e.xOffset,t[r]=e.yOffset,t},PerspectiveFrustum.unpack=function(e,t,r){return Check.defined("array",e),t=defaultValue(t,0),defined(r)||(r=new PerspectiveFrustum),r.fov=e[t++],r.aspectRatio=e[t++],r.near=e[t++],r.far=e[t++],r.xOffset=e[t++],r.yOffset=e[t],r},Object.defineProperties(PerspectiveFrustum.prototype,{projectionMatrix:{get:function(){return update(this),this._offCenterFrustum.projectionMatrix}},infiniteProjectionMatrix:{get:function(){return update(this),this._offCenterFrustum.infiniteProjectionMatrix}},fovy:{get:function(){return update(this),this._fovy}},sseDenominator:{get:function(){return update(this),this._sseDenominator}}}),PerspectiveFrustum.prototype.computeCullingVolume=function(e,t,r){return update(this),this._offCenterFrustum.computeCullingVolume(e,t,r)},PerspectiveFrustum.prototype.getPixelDimensions=function(e,t,r,f,s){return update(this),this._offCenterFrustum.getPixelDimensions(e,t,r,f,s)},PerspectiveFrustum.prototype.clone=function(e){return defined(e)||(e=new PerspectiveFrustum),e.aspectRatio=this.aspectRatio,e.fov=this.fov,e.near=this.near,e.far=this.far,e._aspectRatio=void 0,e._fov=void 0,e._near=void 0,e._far=void 0,this._offCenterFrustum.clone(e._offCenterFrustum),e},PerspectiveFrustum.prototype.equals=function(e){return!!(defined(e)&&e instanceof PerspectiveFrustum)&&(update(this),update(e),this.fov===e.fov&&this.aspectRatio===e.aspectRatio&&this._offCenterFrustum.equals(e._offCenterFrustum))},PerspectiveFrustum.prototype.equalsEpsilon=function(e,t,r){return!!(defined(e)&&e instanceof PerspectiveFrustum)&&(update(this),update(e),CesiumMath.equalsEpsilon(this.fov,e.fov,t,r)&&CesiumMath.equalsEpsilon(this.aspectRatio,e.aspectRatio,t,r)&&this._offCenterFrustum.equalsEpsilon(e._offCenterFrustum,t,r))};export default PerspectiveFrustum;
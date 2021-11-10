import Check from"./Check.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import DeveloperError from"./DeveloperError.js";import CesiumMath from"./Math.js";function Cartesian4(e,t,a,r){this.x=defaultValue(e,0),this.y=defaultValue(t,0),this.z=defaultValue(a,0),this.w=defaultValue(r,0)}Cartesian4.fromElements=function(e,t,a,r,n){return defined(n)?(n.x=e,n.y=t,n.z=a,n.w=r,n):new Cartesian4(e,t,a,r)},Cartesian4.fromColor=function(e,t){return Check.typeOf.object("color",e),defined(t)?(t.x=e.red,t.y=e.green,t.z=e.blue,t.w=e.alpha,t):new Cartesian4(e.red,e.green,e.blue,e.alpha)},Cartesian4.clone=function(e,t){if(defined(e))return defined(t)?(t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t):new Cartesian4(e.x,e.y,e.z,e.w)},Cartesian4.packedLength=4,Cartesian4.pack=function(e,t,a){return Check.typeOf.object("value",e),Check.defined("array",t),a=defaultValue(a,0),t[a++]=e.x,t[a++]=e.y,t[a++]=e.z,t[a]=e.w,t},Cartesian4.unpack=function(e,t,a){return Check.defined("array",e),t=defaultValue(t,0),defined(a)||(a=new Cartesian4),a.x=e[t++],a.y=e[t++],a.z=e[t++],a.w=e[t],a},Cartesian4.packArray=function(e,t){Check.defined("array",e);var a=e.length,r=4*a;if(defined(t)){if(!Array.isArray(t)&&t.length!==r)throw new DeveloperError("If result is a typed array, it must have exactly array.length * 4 elements");t.length!==r&&(t.length=r)}else t=new Array(r);for(var n=0;n<a;++n)Cartesian4.pack(e[n],t,4*n);return t},Cartesian4.unpackArray=function(e,t){if(Check.defined("array",e),Check.typeOf.number.greaterThanOrEquals("array.length",e.length,4),e.length%4!==0)throw new DeveloperError("array length must be a multiple of 4.");var a=e.length;defined(t)?t.length=a/4:t=new Array(a/4);for(var r=0;r<a;r+=4){var n=r/4;t[n]=Cartesian4.unpack(e,r,t[n])}return t},Cartesian4.fromArray=Cartesian4.unpack,Cartesian4.maximumComponent=function(e){return Check.typeOf.object("cartesian",e),Math.max(e.x,e.y,e.z,e.w)},Cartesian4.minimumComponent=function(e){return Check.typeOf.object("cartesian",e),Math.min(e.x,e.y,e.z,e.w)},Cartesian4.minimumByComponent=function(e,t,a){return Check.typeOf.object("first",e),Check.typeOf.object("second",t),Check.typeOf.object("result",a),a.x=Math.min(e.x,t.x),a.y=Math.min(e.y,t.y),a.z=Math.min(e.z,t.z),a.w=Math.min(e.w,t.w),a},Cartesian4.maximumByComponent=function(e,t,a){return Check.typeOf.object("first",e),Check.typeOf.object("second",t),Check.typeOf.object("result",a),a.x=Math.max(e.x,t.x),a.y=Math.max(e.y,t.y),a.z=Math.max(e.z,t.z),a.w=Math.max(e.w,t.w),a},Cartesian4.magnitudeSquared=function(e){return Check.typeOf.object("cartesian",e),e.x*e.x+e.y*e.y+e.z*e.z+e.w*e.w},Cartesian4.magnitude=function(e){return Math.sqrt(Cartesian4.magnitudeSquared(e))};var distanceScratch=new Cartesian4;Cartesian4.distance=function(e,t){return Check.typeOf.object("left",e),Check.typeOf.object("right",t),Cartesian4.subtract(e,t,distanceScratch),Cartesian4.magnitude(distanceScratch)},Cartesian4.distanceSquared=function(e,t){return Check.typeOf.object("left",e),Check.typeOf.object("right",t),Cartesian4.subtract(e,t,distanceScratch),Cartesian4.magnitudeSquared(distanceScratch)},Cartesian4.normalize=function(e,t){Check.typeOf.object("cartesian",e),Check.typeOf.object("result",t);var a=Cartesian4.magnitude(e);if(t.x=e.x/a,t.y=e.y/a,t.z=e.z/a,t.w=e.w/a,isNaN(t.x)||isNaN(t.y)||isNaN(t.z)||isNaN(t.w))throw new DeveloperError("normalized result is not a number");return t},Cartesian4.dot=function(e,t){return Check.typeOf.object("left",e),Check.typeOf.object("right",t),e.x*t.x+e.y*t.y+e.z*t.z+e.w*t.w},Cartesian4.multiplyComponents=function(e,t,a){return Check.typeOf.object("left",e),Check.typeOf.object("right",t),Check.typeOf.object("result",a),a.x=e.x*t.x,a.y=e.y*t.y,a.z=e.z*t.z,a.w=e.w*t.w,a},Cartesian4.divideComponents=function(e,t,a){return Check.typeOf.object("left",e),Check.typeOf.object("right",t),Check.typeOf.object("result",a),a.x=e.x/t.x,a.y=e.y/t.y,a.z=e.z/t.z,a.w=e.w/t.w,a},Cartesian4.add=function(e,t,a){return Check.typeOf.object("left",e),Check.typeOf.object("right",t),Check.typeOf.object("result",a),a.x=e.x+t.x,a.y=e.y+t.y,a.z=e.z+t.z,a.w=e.w+t.w,a},Cartesian4.subtract=function(e,t,a){return Check.typeOf.object("left",e),Check.typeOf.object("right",t),Check.typeOf.object("result",a),a.x=e.x-t.x,a.y=e.y-t.y,a.z=e.z-t.z,a.w=e.w-t.w,a},Cartesian4.multiplyByScalar=function(e,t,a){return Check.typeOf.object("cartesian",e),Check.typeOf.number("scalar",t),Check.typeOf.object("result",a),a.x=e.x*t,a.y=e.y*t,a.z=e.z*t,a.w=e.w*t,a},Cartesian4.divideByScalar=function(e,t,a){return Check.typeOf.object("cartesian",e),Check.typeOf.number("scalar",t),Check.typeOf.object("result",a),a.x=e.x/t,a.y=e.y/t,a.z=e.z/t,a.w=e.w/t,a},Cartesian4.negate=function(e,t){return Check.typeOf.object("cartesian",e),Check.typeOf.object("result",t),t.x=-e.x,t.y=-e.y,t.z=-e.z,t.w=-e.w,t},Cartesian4.abs=function(e,t){return Check.typeOf.object("cartesian",e),Check.typeOf.object("result",t),t.x=Math.abs(e.x),t.y=Math.abs(e.y),t.z=Math.abs(e.z),t.w=Math.abs(e.w),t};var lerpScratch=new Cartesian4;Cartesian4.lerp=function(e,t,a,r){return Check.typeOf.object("start",e),Check.typeOf.object("end",t),Check.typeOf.number("t",a),Check.typeOf.object("result",r),Cartesian4.multiplyByScalar(t,a,lerpScratch),r=Cartesian4.multiplyByScalar(e,1-a,r),Cartesian4.add(lerpScratch,r,r)};var mostOrthogonalAxisScratch=new Cartesian4;Cartesian4.mostOrthogonalAxis=function(e,t){Check.typeOf.object("cartesian",e),Check.typeOf.object("result",t);var a=Cartesian4.normalize(e,mostOrthogonalAxisScratch);return Cartesian4.abs(a,a),t=a.x<=a.y?a.x<=a.z?a.x<=a.w?Cartesian4.clone(Cartesian4.UNIT_X,t):Cartesian4.clone(Cartesian4.UNIT_W,t):a.z<=a.w?Cartesian4.clone(Cartesian4.UNIT_Z,t):Cartesian4.clone(Cartesian4.UNIT_W,t):a.y<=a.z?a.y<=a.w?Cartesian4.clone(Cartesian4.UNIT_Y,t):Cartesian4.clone(Cartesian4.UNIT_W,t):a.z<=a.w?Cartesian4.clone(Cartesian4.UNIT_Z,t):Cartesian4.clone(Cartesian4.UNIT_W,t)},Cartesian4.equals=function(e,t){return e===t||defined(e)&&defined(t)&&e.x===t.x&&e.y===t.y&&e.z===t.z&&e.w===t.w},Cartesian4.equalsArray=function(e,t,a){return e.x===t[a]&&e.y===t[a+1]&&e.z===t[a+2]&&e.w===t[a+3]},Cartesian4.equalsEpsilon=function(e,t,a,r){return e===t||defined(e)&&defined(t)&&CesiumMath.equalsEpsilon(e.x,t.x,a,r)&&CesiumMath.equalsEpsilon(e.y,t.y,a,r)&&CesiumMath.equalsEpsilon(e.z,t.z,a,r)&&CesiumMath.equalsEpsilon(e.w,t.w,a,r)},Cartesian4.ZERO=Object.freeze(new Cartesian4(0,0,0,0)),Cartesian4.UNIT_X=Object.freeze(new Cartesian4(1,0,0,0)),Cartesian4.UNIT_Y=Object.freeze(new Cartesian4(0,1,0,0)),Cartesian4.UNIT_Z=Object.freeze(new Cartesian4(0,0,1,0)),Cartesian4.UNIT_W=Object.freeze(new Cartesian4(0,0,0,1)),Cartesian4.prototype.clone=function(e){return Cartesian4.clone(this,e)},Cartesian4.prototype.equals=function(e){return Cartesian4.equals(this,e)},Cartesian4.prototype.equalsEpsilon=function(e,t,a){return Cartesian4.equalsEpsilon(this,e,t,a)},Cartesian4.prototype.toString=function(){return"("+this.x+", "+this.y+", "+this.z+", "+this.w+")"};var scratchF32Array=new Float32Array(1),scratchU8Array=new Uint8Array(scratchF32Array.buffer),testU32=new Uint32Array([287454020]),testU8=new Uint8Array(testU32.buffer),littleEndian=68===testU8[0];Cartesian4.packFloat=function(e,t){return Check.typeOf.number("value",e),defined(t)||(t=new Cartesian4),scratchF32Array[0]=e,littleEndian?(t.x=scratchU8Array[0],t.y=scratchU8Array[1],t.z=scratchU8Array[2],t.w=scratchU8Array[3]):(t.x=scratchU8Array[3],t.y=scratchU8Array[2],t.z=scratchU8Array[1],t.w=scratchU8Array[0]),t},Cartesian4.unpackFloat=function(e){return Check.typeOf.object("packedFloat",e),littleEndian?(scratchU8Array[0]=e.x,scratchU8Array[1]=e.y,scratchU8Array[2]=e.z,scratchU8Array[3]=e.w):(scratchU8Array[0]=e.w,scratchU8Array[1]=e.z,scratchU8Array[2]=e.y,scratchU8Array[3]=e.x),scratchF32Array[0]};export default Cartesian4;
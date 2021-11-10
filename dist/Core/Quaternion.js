import Cartesian3 from"./Cartesian3.js";import Check from"./Check.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import FeatureDetection from"./FeatureDetection.js";import CesiumMath from"./Math.js";import Matrix3 from"./Matrix3.js";function Quaternion(e,t,n,a){this.x=defaultValue(e,0),this.y=defaultValue(t,0),this.z=defaultValue(n,0),this.w=defaultValue(a,0)}var fromAxisAngleScratch=new Cartesian3;Quaternion.fromAxisAngle=function(e,t,n){Check.typeOf.object("axis",e),Check.typeOf.number("angle",t);var a=t/2,r=Math.sin(a),i=(fromAxisAngleScratch=Cartesian3.normalize(e,fromAxisAngleScratch)).x*r,u=fromAxisAngleScratch.y*r,o=fromAxisAngleScratch.z*r,c=Math.cos(a);return defined(n)?(n.x=i,n.y=u,n.z=o,n.w=c,n):new Quaternion(i,u,o,c)};var fromRotationMatrixNext=[1,2,0],fromRotationMatrixQuat=new Array(3);Quaternion.fromRotationMatrix=function(e,t){var n,a,r,i,u;Check.typeOf.object("matrix",e);var o=e[Matrix3.COLUMN0ROW0],c=e[Matrix3.COLUMN1ROW1],s=e[Matrix3.COLUMN2ROW2],l=o+c+s;if(l>0)u=.5*(n=Math.sqrt(l+1)),n=.5/n,a=(e[Matrix3.COLUMN1ROW2]-e[Matrix3.COLUMN2ROW1])*n,r=(e[Matrix3.COLUMN2ROW0]-e[Matrix3.COLUMN0ROW2])*n,i=(e[Matrix3.COLUMN0ROW1]-e[Matrix3.COLUMN1ROW0])*n;else{var p=fromRotationMatrixNext,Q=0;c>o&&(Q=1),s>o&&s>c&&(Q=2);var f=p[Q],h=p[f];n=Math.sqrt(e[Matrix3.getElementIndex(Q,Q)]-e[Matrix3.getElementIndex(f,f)]-e[Matrix3.getElementIndex(h,h)]+1);var y=fromRotationMatrixQuat;y[Q]=.5*n,n=.5/n,u=(e[Matrix3.getElementIndex(h,f)]-e[Matrix3.getElementIndex(f,h)])*n,y[f]=(e[Matrix3.getElementIndex(f,Q)]+e[Matrix3.getElementIndex(Q,f)])*n,y[h]=(e[Matrix3.getElementIndex(h,Q)]+e[Matrix3.getElementIndex(Q,h)])*n,a=-y[0],r=-y[1],i=-y[2]}return defined(t)?(t.x=a,t.y=r,t.z=i,t.w=u,t):new Quaternion(a,r,i,u)};var scratchHPRQuaternion=new Quaternion,scratchHeadingQuaternion=new Quaternion,scratchPitchQuaternion=new Quaternion,scratchRollQuaternion=new Quaternion;Quaternion.fromHeadingPitchRoll=function(e,t){return Check.typeOf.object("headingPitchRoll",e),scratchRollQuaternion=Quaternion.fromAxisAngle(Cartesian3.UNIT_X,e.roll,scratchHPRQuaternion),scratchPitchQuaternion=Quaternion.fromAxisAngle(Cartesian3.UNIT_Y,-e.pitch,t),t=Quaternion.multiply(scratchPitchQuaternion,scratchRollQuaternion,scratchPitchQuaternion),scratchHeadingQuaternion=Quaternion.fromAxisAngle(Cartesian3.UNIT_Z,-e.heading,scratchHPRQuaternion),Quaternion.multiply(scratchHeadingQuaternion,t,t)};var sampledQuaternionAxis=new Cartesian3,sampledQuaternionRotation=new Cartesian3,sampledQuaternionTempQuaternion=new Quaternion,sampledQuaternionQuaternion0=new Quaternion,sampledQuaternionQuaternion0Conjugate=new Quaternion;Quaternion.packedLength=4,Quaternion.pack=function(e,t,n){return Check.typeOf.object("value",e),Check.defined("array",t),n=defaultValue(n,0),t[n++]=e.x,t[n++]=e.y,t[n++]=e.z,t[n]=e.w,t},Quaternion.unpack=function(e,t,n){return Check.defined("array",e),t=defaultValue(t,0),defined(n)||(n=new Quaternion),n.x=e[t],n.y=e[t+1],n.z=e[t+2],n.w=e[t+3],n},Quaternion.packedInterpolationLength=3,Quaternion.convertPackedArrayForInterpolation=function(e,t,n,a){Quaternion.unpack(e,4*n,sampledQuaternionQuaternion0Conjugate),Quaternion.conjugate(sampledQuaternionQuaternion0Conjugate,sampledQuaternionQuaternion0Conjugate);for(var r=0,i=n-t+1;r<i;r++){var u=3*r;Quaternion.unpack(e,4*(t+r),sampledQuaternionTempQuaternion),Quaternion.multiply(sampledQuaternionTempQuaternion,sampledQuaternionQuaternion0Conjugate,sampledQuaternionTempQuaternion),sampledQuaternionTempQuaternion.w<0&&Quaternion.negate(sampledQuaternionTempQuaternion,sampledQuaternionTempQuaternion),Quaternion.computeAxis(sampledQuaternionTempQuaternion,sampledQuaternionAxis);var o=Quaternion.computeAngle(sampledQuaternionTempQuaternion);defined(a)||(a=[]),a[u]=sampledQuaternionAxis.x*o,a[u+1]=sampledQuaternionAxis.y*o,a[u+2]=sampledQuaternionAxis.z*o}},Quaternion.unpackInterpolationResult=function(e,t,n,a,r){defined(r)||(r=new Quaternion),Cartesian3.fromArray(e,0,sampledQuaternionRotation);var i=Cartesian3.magnitude(sampledQuaternionRotation);return Quaternion.unpack(t,4*a,sampledQuaternionQuaternion0),0===i?Quaternion.clone(Quaternion.IDENTITY,sampledQuaternionTempQuaternion):Quaternion.fromAxisAngle(sampledQuaternionRotation,i,sampledQuaternionTempQuaternion),Quaternion.multiply(sampledQuaternionTempQuaternion,sampledQuaternionQuaternion0,r)},Quaternion.clone=function(e,t){if(defined(e))return defined(t)?(t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t):new Quaternion(e.x,e.y,e.z,e.w)},Quaternion.conjugate=function(e,t){return Check.typeOf.object("quaternion",e),Check.typeOf.object("result",t),t.x=-e.x,t.y=-e.y,t.z=-e.z,t.w=e.w,t},Quaternion.magnitudeSquared=function(e){return Check.typeOf.object("quaternion",e),e.x*e.x+e.y*e.y+e.z*e.z+e.w*e.w},Quaternion.magnitude=function(e){return Math.sqrt(Quaternion.magnitudeSquared(e))},Quaternion.normalize=function(e,t){Check.typeOf.object("result",t);var n=1/Quaternion.magnitude(e),a=e.x*n,r=e.y*n,i=e.z*n,u=e.w*n;return t.x=a,t.y=r,t.z=i,t.w=u,t},Quaternion.inverse=function(e,t){Check.typeOf.object("result",t);var n=Quaternion.magnitudeSquared(e);return t=Quaternion.conjugate(e,t),Quaternion.multiplyByScalar(t,1/n,t)},Quaternion.add=function(e,t,n){return Check.typeOf.object("left",e),Check.typeOf.object("right",t),Check.typeOf.object("result",n),n.x=e.x+t.x,n.y=e.y+t.y,n.z=e.z+t.z,n.w=e.w+t.w,n},Quaternion.subtract=function(e,t,n){return Check.typeOf.object("left",e),Check.typeOf.object("right",t),Check.typeOf.object("result",n),n.x=e.x-t.x,n.y=e.y-t.y,n.z=e.z-t.z,n.w=e.w-t.w,n},Quaternion.negate=function(e,t){return Check.typeOf.object("quaternion",e),Check.typeOf.object("result",t),t.x=-e.x,t.y=-e.y,t.z=-e.z,t.w=-e.w,t},Quaternion.dot=function(e,t){return Check.typeOf.object("left",e),Check.typeOf.object("right",t),e.x*t.x+e.y*t.y+e.z*t.z+e.w*t.w},Quaternion.multiply=function(e,t,n){Check.typeOf.object("left",e),Check.typeOf.object("right",t),Check.typeOf.object("result",n);var a=e.x,r=e.y,i=e.z,u=e.w,o=t.x,c=t.y,s=t.z,l=t.w,p=u*o+a*l+r*s-i*c,Q=u*c-a*s+r*l+i*o,f=u*s+a*c-r*o+i*l,h=u*l-a*o-r*c-i*s;return n.x=p,n.y=Q,n.z=f,n.w=h,n},Quaternion.multiplyByScalar=function(e,t,n){return Check.typeOf.object("quaternion",e),Check.typeOf.number("scalar",t),Check.typeOf.object("result",n),n.x=e.x*t,n.y=e.y*t,n.z=e.z*t,n.w=e.w*t,n},Quaternion.divideByScalar=function(e,t,n){return Check.typeOf.object("quaternion",e),Check.typeOf.number("scalar",t),Check.typeOf.object("result",n),n.x=e.x/t,n.y=e.y/t,n.z=e.z/t,n.w=e.w/t,n},Quaternion.computeAxis=function(e,t){Check.typeOf.object("quaternion",e),Check.typeOf.object("result",t);var n=e.w;if(Math.abs(n-1)<CesiumMath.EPSILON6)return t.x=t.y=t.z=0,t;var a=1/Math.sqrt(1-n*n);return t.x=e.x*a,t.y=e.y*a,t.z=e.z*a,t},Quaternion.computeAngle=function(e){return Check.typeOf.object("quaternion",e),Math.abs(e.w-1)<CesiumMath.EPSILON6?0:2*Math.acos(e.w)};var lerpScratch=new Quaternion;Quaternion.lerp=function(e,t,n,a){return Check.typeOf.object("start",e),Check.typeOf.object("end",t),Check.typeOf.number("t",n),Check.typeOf.object("result",a),lerpScratch=Quaternion.multiplyByScalar(t,n,lerpScratch),a=Quaternion.multiplyByScalar(e,1-n,a),Quaternion.add(lerpScratch,a,a)};var slerpEndNegated=new Quaternion,slerpScaledP=new Quaternion,slerpScaledR=new Quaternion;Quaternion.slerp=function(e,t,n,a){Check.typeOf.object("start",e),Check.typeOf.object("end",t),Check.typeOf.number("t",n),Check.typeOf.object("result",a);var r=Quaternion.dot(e,t),i=t;if(r<0&&(r=-r,i=slerpEndNegated=Quaternion.negate(t,slerpEndNegated)),1-r<CesiumMath.EPSILON6)return Quaternion.lerp(e,i,n,a);var u=Math.acos(r);return slerpScaledP=Quaternion.multiplyByScalar(e,Math.sin((1-n)*u),slerpScaledP),slerpScaledR=Quaternion.multiplyByScalar(i,Math.sin(n*u),slerpScaledR),a=Quaternion.add(slerpScaledP,slerpScaledR,a),Quaternion.multiplyByScalar(a,1/Math.sin(u),a)},Quaternion.log=function(e,t){Check.typeOf.object("quaternion",e),Check.typeOf.object("result",t);var n=CesiumMath.acosClamped(e.w),a=0;return 0!==n&&(a=n/Math.sin(n)),Cartesian3.multiplyByScalar(e,a,t)},Quaternion.exp=function(e,t){Check.typeOf.object("cartesian",e),Check.typeOf.object("result",t);var n=Cartesian3.magnitude(e),a=0;return 0!==n&&(a=Math.sin(n)/n),t.x=e.x*a,t.y=e.y*a,t.z=e.z*a,t.w=Math.cos(n),t};var squadScratchCartesian0=new Cartesian3,squadScratchCartesian1=new Cartesian3,squadScratchQuaternion0=new Quaternion,squadScratchQuaternion1=new Quaternion;Quaternion.computeInnerQuadrangle=function(e,t,n,a){Check.typeOf.object("q0",e),Check.typeOf.object("q1",t),Check.typeOf.object("q2",n),Check.typeOf.object("result",a);var r=Quaternion.conjugate(t,squadScratchQuaternion0);Quaternion.multiply(r,n,squadScratchQuaternion1);var i=Quaternion.log(squadScratchQuaternion1,squadScratchCartesian0);Quaternion.multiply(r,e,squadScratchQuaternion1);var u=Quaternion.log(squadScratchQuaternion1,squadScratchCartesian1);return Cartesian3.add(i,u,i),Cartesian3.multiplyByScalar(i,.25,i),Cartesian3.negate(i,i),Quaternion.exp(i,squadScratchQuaternion0),Quaternion.multiply(t,squadScratchQuaternion0,a)},Quaternion.squad=function(e,t,n,a,r,i){Check.typeOf.object("q0",e),Check.typeOf.object("q1",t),Check.typeOf.object("s0",n),Check.typeOf.object("s1",a),Check.typeOf.number("t",r),Check.typeOf.object("result",i);var u=Quaternion.slerp(e,t,r,squadScratchQuaternion0),o=Quaternion.slerp(n,a,r,squadScratchQuaternion1);return Quaternion.slerp(u,o,2*r*(1-r),i)};for(var fastSlerpScratchQuaternion=new Quaternion,opmu=1.9011074535173003,u=FeatureDetection.supportsTypedArrays()?new Float32Array(8):[],v=FeatureDetection.supportsTypedArrays()?new Float32Array(8):[],bT=FeatureDetection.supportsTypedArrays()?new Float32Array(8):[],bD=FeatureDetection.supportsTypedArrays()?new Float32Array(8):[],i=0;i<7;++i){var s=i+1,t=2*s+1;u[i]=1/(s*t),v[i]=s/t}u[7]=opmu/136,v[7]=8*opmu/17,Quaternion.fastSlerp=function(e,t,n,a){Check.typeOf.object("start",e),Check.typeOf.object("end",t),Check.typeOf.number("t",n),Check.typeOf.object("result",a);var r,i=Quaternion.dot(e,t);i>=0?r=1:(r=-1,i=-i);for(var o=i-1,c=1-n,s=n*n,l=c*c,p=7;p>=0;--p)bT[p]=(u[p]*s-v[p])*o,bD[p]=(u[p]*l-v[p])*o;var Q=r*n*(1+bT[0]*(1+bT[1]*(1+bT[2]*(1+bT[3]*(1+bT[4]*(1+bT[5]*(1+bT[6]*(1+bT[7])))))))),f=c*(1+bD[0]*(1+bD[1]*(1+bD[2]*(1+bD[3]*(1+bD[4]*(1+bD[5]*(1+bD[6]*(1+bD[7])))))))),h=Quaternion.multiplyByScalar(e,f,fastSlerpScratchQuaternion);return Quaternion.multiplyByScalar(t,Q,a),Quaternion.add(h,a,a)},Quaternion.fastSquad=function(e,t,n,a,r,i){Check.typeOf.object("q0",e),Check.typeOf.object("q1",t),Check.typeOf.object("s0",n),Check.typeOf.object("s1",a),Check.typeOf.number("t",r),Check.typeOf.object("result",i);var u=Quaternion.fastSlerp(e,t,r,squadScratchQuaternion0),o=Quaternion.fastSlerp(n,a,r,squadScratchQuaternion1);return Quaternion.fastSlerp(u,o,2*r*(1-r),i)},Quaternion.equals=function(e,t){return e===t||defined(e)&&defined(t)&&e.x===t.x&&e.y===t.y&&e.z===t.z&&e.w===t.w},Quaternion.equalsEpsilon=function(e,t,n){return n=defaultValue(n,0),e===t||defined(e)&&defined(t)&&Math.abs(e.x-t.x)<=n&&Math.abs(e.y-t.y)<=n&&Math.abs(e.z-t.z)<=n&&Math.abs(e.w-t.w)<=n},Quaternion.ZERO=Object.freeze(new Quaternion(0,0,0,0)),Quaternion.IDENTITY=Object.freeze(new Quaternion(0,0,0,1)),Quaternion.prototype.clone=function(e){return Quaternion.clone(this,e)},Quaternion.prototype.equals=function(e){return Quaternion.equals(this,e)},Quaternion.prototype.equalsEpsilon=function(e,t){return Quaternion.equalsEpsilon(this,e,t)},Quaternion.prototype.toString=function(){return"("+this.x+", "+this.y+", "+this.z+", "+this.w+")"};export default Quaternion;
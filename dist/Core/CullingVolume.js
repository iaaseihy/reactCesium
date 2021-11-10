import Cartesian3 from"./Cartesian3.js";import Cartesian4 from"./Cartesian4.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import DeveloperError from"./DeveloperError.js";import Intersect from"./Intersect.js";import Plane from"./Plane.js";function CullingVolume(e){this.planes=defaultValue(e,[])}var faces=[new Cartesian3,new Cartesian3,new Cartesian3];Cartesian3.clone(Cartesian3.UNIT_X,faces[0]),Cartesian3.clone(Cartesian3.UNIT_Y,faces[1]),Cartesian3.clone(Cartesian3.UNIT_Z,faces[2]);var scratchPlaneCenter=new Cartesian3,scratchPlaneNormal=new Cartesian3,scratchPlane=new Plane(new Cartesian3(1,0,0),0);CullingVolume.fromBoundingSphere=function(e,r){if(!defined(e))throw new DeveloperError("boundingSphere is required.");defined(r)||(r=new CullingVolume);var n=faces.length,a=r.planes;a.length=2*n;for(var t=e.center,l=e.radius,i=0,s=0;s<n;++s){var o=faces[s],u=a[i],c=a[i+1];defined(u)||(u=a[i]=new Cartesian4),defined(c)||(c=a[i+1]=new Cartesian4),Cartesian3.multiplyByScalar(o,-l,scratchPlaneCenter),Cartesian3.add(t,scratchPlaneCenter,scratchPlaneCenter),u.x=o.x,u.y=o.y,u.z=o.z,u.w=-Cartesian3.dot(o,scratchPlaneCenter),Cartesian3.multiplyByScalar(o,l,scratchPlaneCenter),Cartesian3.add(t,scratchPlaneCenter,scratchPlaneCenter),c.x=-o.x,c.y=-o.y,c.z=-o.z,c.w=-Cartesian3.dot(Cartesian3.negate(o,scratchPlaneNormal),scratchPlaneCenter),i+=2}return r},CullingVolume.prototype.computeVisibility=function(e){if(!defined(e))throw new DeveloperError("boundingVolume is required.");for(var r=this.planes,n=!1,a=0,t=r.length;a<t;++a){var l=e.intersectPlane(Plane.fromCartesian4(r[a],scratchPlane));if(l===Intersect.OUTSIDE)return Intersect.OUTSIDE;l===Intersect.INTERSECTING&&(n=!0)}return n?Intersect.INTERSECTING:Intersect.INSIDE},CullingVolume.prototype.computeVisibilityWithPlaneMask=function(e,r){if(!defined(e))throw new DeveloperError("boundingVolume is required.");if(!defined(r))throw new DeveloperError("parentPlaneMask is required.");if(r===CullingVolume.MASK_OUTSIDE||r===CullingVolume.MASK_INSIDE)return r;for(var n=CullingVolume.MASK_INSIDE,a=this.planes,t=0,l=a.length;t<l;++t){var i=t<31?1<<t:0;if(!(t<31&&0===(r&i))){var s=e.intersectPlane(Plane.fromCartesian4(a[t],scratchPlane));if(s===Intersect.OUTSIDE)return CullingVolume.MASK_OUTSIDE;s===Intersect.INTERSECTING&&(n|=i)}}return n},CullingVolume.MASK_OUTSIDE=4294967295,CullingVolume.MASK_INSIDE=0,CullingVolume.MASK_INDETERMINATE=2147483647;export default CullingVolume;
import arrayFill from"./arrayFill.js";import BoundingSphere from"./BoundingSphere.js";import Cartesian2 from"./Cartesian2.js";import Cartesian3 from"./Cartesian3.js";import Check from"./Check.js";import ComponentDatatype from"./ComponentDatatype.js";import CylinderGeometryLibrary from"./CylinderGeometryLibrary.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import DeveloperError from"./DeveloperError.js";import Geometry from"./Geometry.js";import GeometryAttribute from"./GeometryAttribute.js";import GeometryAttributes from"./GeometryAttributes.js";import GeometryOffsetAttribute from"./GeometryOffsetAttribute.js";import IndexDatatype from"./IndexDatatype.js";import PrimitiveType from"./PrimitiveType.js";var radiusScratch=new Cartesian2;function CylinderOutlineGeometry(t){var e=(t=defaultValue(t,defaultValue.EMPTY_OBJECT)).length,r=t.topRadius,i=t.bottomRadius,o=defaultValue(t.slices,128),a=Math.max(defaultValue(t.numberOfVerticalLines,16),0);if(Check.typeOf.number("options.positions",e),Check.typeOf.number("options.topRadius",r),Check.typeOf.number("options.bottomRadius",i),Check.typeOf.number.greaterThanOrEquals("options.slices",o,3),defined(t.offsetAttribute)&&t.offsetAttribute===GeometryOffsetAttribute.TOP)throw new DeveloperError("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");this._length=e,this._topRadius=r,this._bottomRadius=i,this._slices=o,this._numberOfVerticalLines=a,this._offsetAttribute=t.offsetAttribute,this._workerName="createCylinderOutlineGeometry"}CylinderOutlineGeometry.packedLength=6,CylinderOutlineGeometry.pack=function(t,e,r){return Check.typeOf.object("value",t),Check.defined("array",e),r=defaultValue(r,0),e[r++]=t._length,e[r++]=t._topRadius,e[r++]=t._bottomRadius,e[r++]=t._slices,e[r++]=t._numberOfVerticalLines,e[r]=defaultValue(t._offsetAttribute,-1),e};var scratchOptions={length:void 0,topRadius:void 0,bottomRadius:void 0,slices:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};CylinderOutlineGeometry.unpack=function(t,e,r){Check.defined("array",t),e=defaultValue(e,0);var i=t[e++],o=t[e++],a=t[e++],n=t[e++],s=t[e++],u=t[e];return defined(r)?(r._length=i,r._topRadius=o,r._bottomRadius=a,r._slices=n,r._numberOfVerticalLines=s,r._offsetAttribute=-1===u?void 0:u,r):(scratchOptions.length=i,scratchOptions.topRadius=o,scratchOptions.bottomRadius=a,scratchOptions.slices=n,scratchOptions.numberOfVerticalLines=s,scratchOptions.offsetAttribute=-1===u?void 0:u,new CylinderOutlineGeometry(scratchOptions))},CylinderOutlineGeometry.createGeometry=function(t){var e=t._length,r=t._topRadius,i=t._bottomRadius,o=t._slices,a=t._numberOfVerticalLines;if(!(e<=0||r<0||i<0||0===r&&0===i)){var n,s=2*o,u=CylinderGeometryLibrary.computePositions(e,r,i,o,!1),m=2*o;if(a>0){var f=Math.min(a,o);n=Math.round(o/f),m+=f}var p,d=IndexDatatype.createTypedArray(s,2*m),l=0;for(p=0;p<o-1;p++)d[l++]=p,d[l++]=p+1,d[l++]=p+o,d[l++]=p+1+o;if(d[l++]=o-1,d[l++]=0,d[l++]=o+o-1,d[l++]=o,a>0)for(p=0;p<o;p+=n)d[l++]=p,d[l++]=p+o;var y=new GeometryAttributes;y.position=new GeometryAttribute({componentDatatype:ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:u}),radiusScratch.x=.5*e,radiusScratch.y=Math.max(i,r);var c=new BoundingSphere(Cartesian3.ZERO,Cartesian2.magnitude(radiusScratch));if(defined(t._offsetAttribute)){e=u.length;var b=new Uint8Array(e/3),h=t._offsetAttribute===GeometryOffsetAttribute.NONE?0:1;arrayFill(b,h),y.applyOffset=new GeometryAttribute({componentDatatype:ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:b})}return new Geometry({attributes:y,indices:d,primitiveType:PrimitiveType.LINES,boundingSphere:c,offsetAttribute:t._offsetAttribute})}};export default CylinderOutlineGeometry;
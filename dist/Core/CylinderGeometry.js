import arrayFill from"./arrayFill.js";import BoundingSphere from"./BoundingSphere.js";import Cartesian2 from"./Cartesian2.js";import Cartesian3 from"./Cartesian3.js";import ComponentDatatype from"./ComponentDatatype.js";import CylinderGeometryLibrary from"./CylinderGeometryLibrary.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import DeveloperError from"./DeveloperError.js";import Geometry from"./Geometry.js";import GeometryAttribute from"./GeometryAttribute.js";import GeometryAttributes from"./GeometryAttributes.js";import GeometryOffsetAttribute from"./GeometryOffsetAttribute.js";import IndexDatatype from"./IndexDatatype.js";import CesiumMath from"./Math.js";import PrimitiveType from"./PrimitiveType.js";import VertexFormat from"./VertexFormat.js";var radiusScratch=new Cartesian2,normalScratch=new Cartesian3,bitangentScratch=new Cartesian3,tangentScratch=new Cartesian3,positionScratch=new Cartesian3;function CylinderGeometry(t){var e=(t=defaultValue(t,defaultValue.EMPTY_OBJECT)).length,r=t.topRadius,o=t.bottomRadius,a=defaultValue(t.vertexFormat,VertexFormat.DEFAULT),i=defaultValue(t.slices,128);if(!defined(e))throw new DeveloperError("options.length must be defined.");if(!defined(r))throw new DeveloperError("options.topRadius must be defined.");if(!defined(o))throw new DeveloperError("options.bottomRadius must be defined.");if(i<3)throw new DeveloperError("options.slices must be greater than or equal to 3.");if(defined(t.offsetAttribute)&&t.offsetAttribute===GeometryOffsetAttribute.TOP)throw new DeveloperError("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");this._length=e,this._topRadius=r,this._bottomRadius=o,this._vertexFormat=VertexFormat.clone(a),this._slices=i,this._offsetAttribute=t.offsetAttribute,this._workerName="createCylinderGeometry"}CylinderGeometry.packedLength=VertexFormat.packedLength+5,CylinderGeometry.pack=function(t,e,r){if(!defined(t))throw new DeveloperError("value is required");if(!defined(e))throw new DeveloperError("array is required");return r=defaultValue(r,0),VertexFormat.pack(t._vertexFormat,e,r),r+=VertexFormat.packedLength,e[r++]=t._length,e[r++]=t._topRadius,e[r++]=t._bottomRadius,e[r++]=t._slices,e[r]=defaultValue(t._offsetAttribute,-1),e};var unitCylinderGeometry,scratchVertexFormat=new VertexFormat,scratchOptions={vertexFormat:scratchVertexFormat,length:void 0,topRadius:void 0,bottomRadius:void 0,slices:void 0,offsetAttribute:void 0};CylinderGeometry.unpack=function(t,e,r){if(!defined(t))throw new DeveloperError("array is required");e=defaultValue(e,0);var o=VertexFormat.unpack(t,e,scratchVertexFormat);e+=VertexFormat.packedLength;var a=t[e++],i=t[e++],n=t[e++],s=t[e++],m=t[e];return defined(r)?(r._vertexFormat=VertexFormat.clone(o,r._vertexFormat),r._length=a,r._topRadius=i,r._bottomRadius=n,r._slices=s,r._offsetAttribute=-1===m?void 0:m,r):(scratchOptions.length=a,scratchOptions.topRadius=i,scratchOptions.bottomRadius=n,scratchOptions.slices=s,scratchOptions.offsetAttribute=-1===m?void 0:m,new CylinderGeometry(scratchOptions))},CylinderGeometry.createGeometry=function(t){var e=t._length,r=t._topRadius,o=t._bottomRadius,a=t._vertexFormat,i=t._slices;if(!(e<=0||r<0||o<0||0===r&&0===o)){var n,s=i+i,m=i+s,u=s+s,p=CylinderGeometryLibrary.computePositions(e,r,o,i,!0),d=a.st?new Float32Array(2*u):void 0,f=a.normal?new Float32Array(3*u):void 0,y=a.tangent?new Float32Array(3*u):void 0,l=a.bitangent?new Float32Array(3*u):void 0,c=a.normal||a.tangent||a.bitangent;if(c){var h=a.tangent||a.bitangent,b=0,v=0,A=0,C=Math.atan2(o-r,e),g=normalScratch;g.z=Math.sin(C);var G=Math.cos(C),w=tangentScratch,x=bitangentScratch;for(n=0;n<i;n++){var F=n/i*CesiumMath.TWO_PI,_=G*Math.cos(F),D=G*Math.sin(F);c&&(g.x=_,g.y=D,h&&(w=Cartesian3.normalize(Cartesian3.cross(Cartesian3.UNIT_Z,g,w),w)),a.normal&&(f[b++]=g.x,f[b++]=g.y,f[b++]=g.z,f[b++]=g.x,f[b++]=g.y,f[b++]=g.z),a.tangent&&(y[v++]=w.x,y[v++]=w.y,y[v++]=w.z,y[v++]=w.x,y[v++]=w.y,y[v++]=w.z),a.bitangent&&(x=Cartesian3.normalize(Cartesian3.cross(g,w,x),x),l[A++]=x.x,l[A++]=x.y,l[A++]=x.z,l[A++]=x.x,l[A++]=x.y,l[A++]=x.z))}for(n=0;n<i;n++)a.normal&&(f[b++]=0,f[b++]=0,f[b++]=-1),a.tangent&&(y[v++]=1,y[v++]=0,y[v++]=0),a.bitangent&&(l[A++]=0,l[A++]=-1,l[A++]=0);for(n=0;n<i;n++)a.normal&&(f[b++]=0,f[b++]=0,f[b++]=1),a.tangent&&(y[v++]=1,y[v++]=0,y[v++]=0),a.bitangent&&(l[A++]=0,l[A++]=1,l[A++]=0)}var O=12*i-12,V=IndexDatatype.createTypedArray(u,O),R=0,E=0;for(n=0;n<i-1;n++)V[R++]=E,V[R++]=E+2,V[R++]=E+3,V[R++]=E,V[R++]=E+3,V[R++]=E+1,E+=2;for(V[R++]=s-2,V[R++]=0,V[R++]=1,V[R++]=s-2,V[R++]=1,V[R++]=s-1,n=1;n<i-1;n++)V[R++]=s+n+1,V[R++]=s+n,V[R++]=s;for(n=1;n<i-1;n++)V[R++]=m,V[R++]=m+n,V[R++]=m+n+1;var S=0;if(a.st){var T=Math.max(r,o);for(n=0;n<u;n++){var j=Cartesian3.fromArray(p,3*n,positionScratch);d[S++]=(j.x+T)/(2*T),d[S++]=(j.y+T)/(2*T)}}var L=new GeometryAttributes;a.position&&(L.position=new GeometryAttribute({componentDatatype:ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:p})),a.normal&&(L.normal=new GeometryAttribute({componentDatatype:ComponentDatatype.FLOAT,componentsPerAttribute:3,values:f})),a.tangent&&(L.tangent=new GeometryAttribute({componentDatatype:ComponentDatatype.FLOAT,componentsPerAttribute:3,values:y})),a.bitangent&&(L.bitangent=new GeometryAttribute({componentDatatype:ComponentDatatype.FLOAT,componentsPerAttribute:3,values:l})),a.st&&(L.st=new GeometryAttribute({componentDatatype:ComponentDatatype.FLOAT,componentsPerAttribute:2,values:d})),radiusScratch.x=.5*e,radiusScratch.y=Math.max(o,r);var P=new BoundingSphere(Cartesian3.ZERO,Cartesian2.magnitude(radiusScratch));if(defined(t._offsetAttribute)){e=p.length;var M=new Uint8Array(e/3),k=t._offsetAttribute===GeometryOffsetAttribute.NONE?0:1;arrayFill(M,k),L.applyOffset=new GeometryAttribute({componentDatatype:ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:M})}return new Geometry({attributes:L,indices:V,primitiveType:PrimitiveType.TRIANGLES,boundingSphere:P,offsetAttribute:t._offsetAttribute})}},CylinderGeometry.getUnitCylinder=function(){return defined(unitCylinderGeometry)||(unitCylinderGeometry=CylinderGeometry.createGeometry(new CylinderGeometry({topRadius:1,bottomRadius:1,length:1,vertexFormat:VertexFormat.POSITION_ONLY}))),unitCylinderGeometry};export default CylinderGeometry;
import arrayRemoveDuplicates from"./arrayRemoveDuplicates.js";import BoundingRectangle from"./BoundingRectangle.js";import BoundingSphere from"./BoundingSphere.js";import Cartesian2 from"./Cartesian2.js";import Cartesian3 from"./Cartesian3.js";import Check from"./Check.js";import ComponentDatatype from"./ComponentDatatype.js";import CoplanarPolygonGeometryLibrary from"./CoplanarPolygonGeometryLibrary.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import Ellipsoid from"./Ellipsoid.js";import Geometry from"./Geometry.js";import GeometryAttribute from"./GeometryAttribute.js";import GeometryAttributes from"./GeometryAttributes.js";import GeometryInstance from"./GeometryInstance.js";import GeometryPipeline from"./GeometryPipeline.js";import IndexDatatype from"./IndexDatatype.js";import CesiumMath from"./Math.js";import Matrix3 from"./Matrix3.js";import PolygonGeometryLibrary from"./PolygonGeometryLibrary.js";import PolygonPipeline from"./PolygonPipeline.js";import PrimitiveType from"./PrimitiveType.js";import Quaternion from"./Quaternion.js";import VertexFormat from"./VertexFormat.js";var scratchPosition=new Cartesian3,scratchBR=new BoundingRectangle,stScratch=new Cartesian2,textureCoordinatesOrigin=new Cartesian2,scratchNormal=new Cartesian3,scratchTangent=new Cartesian3,scratchBitangent=new Cartesian3,centerScratch=new Cartesian3,axis1Scratch=new Cartesian3,axis2Scratch=new Cartesian3,quaternionScratch=new Quaternion,textureMatrixScratch=new Matrix3,tangentRotationScratch=new Matrix3,surfaceNormalScratch=new Cartesian3;function createGeometryFromPolygon(e,t,r,o,a,n,i,s){var l=e.positions,c=PolygonPipeline.triangulate(e.positions2D,e.holes);c.length<3&&(c=[0,1,2]);var m=IndexDatatype.createTypedArray(l.length,c.length);m.set(c);var p=textureMatrixScratch;if(0!==o){var y=Quaternion.fromAxisAngle(n,o,quaternionScratch);if(p=Matrix3.fromQuaternion(y,p),t.tangent||t.bitangent){y=Quaternion.fromAxisAngle(n,-o,quaternionScratch);var u=Matrix3.fromQuaternion(y,tangentRotationScratch);i=Cartesian3.normalize(Matrix3.multiplyByVector(u,i,i),i),t.bitangent&&(s=Cartesian3.normalize(Cartesian3.cross(n,i,s),s))}}else p=Matrix3.clone(Matrix3.IDENTITY,p);var g=textureCoordinatesOrigin;t.st&&(g.x=r.x,g.y=r.y);for(var h=l.length,d=3*h,f=new Float64Array(d),C=t.normal?new Float32Array(d):void 0,v=t.tangent?new Float32Array(d):void 0,x=t.bitangent?new Float32Array(d):void 0,P=t.st?new Float32Array(2*h):void 0,G=0,b=0,F=0,w=0,A=0,L=0;L<h;L++){var S=l[L];if(f[G++]=S.x,f[G++]=S.y,f[G++]=S.z,t.st){var j=a(Matrix3.multiplyByVector(p,S,scratchPosition),stScratch);Cartesian2.subtract(j,g,j);var E=CesiumMath.clamp(j.x/r.width,0,1),k=CesiumMath.clamp(j.y/r.height,0,1);P[A++]=E,P[A++]=k}t.normal&&(C[b++]=n.x,C[b++]=n.y,C[b++]=n.z),t.tangent&&(v[w++]=i.x,v[w++]=i.y,v[w++]=i.z),t.bitangent&&(x[F++]=s.x,x[F++]=s.y,x[F++]=s.z)}var D=new GeometryAttributes;return t.position&&(D.position=new GeometryAttribute({componentDatatype:ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:f})),t.normal&&(D.normal=new GeometryAttribute({componentDatatype:ComponentDatatype.FLOAT,componentsPerAttribute:3,values:C})),t.tangent&&(D.tangent=new GeometryAttribute({componentDatatype:ComponentDatatype.FLOAT,componentsPerAttribute:3,values:v})),t.bitangent&&(D.bitangent=new GeometryAttribute({componentDatatype:ComponentDatatype.FLOAT,componentsPerAttribute:3,values:x})),t.st&&(D.st=new GeometryAttribute({componentDatatype:ComponentDatatype.FLOAT,componentsPerAttribute:2,values:P})),new Geometry({attributes:D,indices:m,primitiveType:PrimitiveType.TRIANGLES})}function CoplanarPolygonGeometry(e){var t=(e=defaultValue(e,defaultValue.EMPTY_OBJECT)).polygonHierarchy;Check.defined("options.polygonHierarchy",t);var r=defaultValue(e.vertexFormat,VertexFormat.DEFAULT);this._vertexFormat=VertexFormat.clone(r),this._polygonHierarchy=t,this._stRotation=defaultValue(e.stRotation,0),this._ellipsoid=Ellipsoid.clone(defaultValue(e.ellipsoid,Ellipsoid.WGS84)),this._workerName="createCoplanarPolygonGeometry",this.packedLength=PolygonGeometryLibrary.computeHierarchyPackedLength(t)+VertexFormat.packedLength+Ellipsoid.packedLength+2}CoplanarPolygonGeometry.fromPositions=function(e){return e=defaultValue(e,defaultValue.EMPTY_OBJECT),Check.defined("options.positions",e.positions),new CoplanarPolygonGeometry({polygonHierarchy:{positions:e.positions},vertexFormat:e.vertexFormat,stRotation:e.stRotation,ellipsoid:e.ellipsoid})},CoplanarPolygonGeometry.pack=function(e,t,r){return Check.typeOf.object("value",e),Check.defined("array",t),r=defaultValue(r,0),r=PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,r),Ellipsoid.pack(e._ellipsoid,t,r),r+=Ellipsoid.packedLength,VertexFormat.pack(e._vertexFormat,t,r),r+=VertexFormat.packedLength,t[r++]=e._stRotation,t[r]=e.packedLength,t};var scratchEllipsoid=Ellipsoid.clone(Ellipsoid.UNIT_SPHERE),scratchVertexFormat=new VertexFormat,scratchOptions={polygonHierarchy:{}};CoplanarPolygonGeometry.unpack=function(e,t,r){Check.defined("array",e),t=defaultValue(t,0);var o=PolygonGeometryLibrary.unpackPolygonHierarchy(e,t);t=o.startingIndex,delete o.startingIndex;var a=Ellipsoid.unpack(e,t,scratchEllipsoid);t+=Ellipsoid.packedLength;var n=VertexFormat.unpack(e,t,scratchVertexFormat);t+=VertexFormat.packedLength;var i=e[t++],s=e[t];return defined(r)||(r=new CoplanarPolygonGeometry(scratchOptions)),r._polygonHierarchy=o,r._ellipsoid=Ellipsoid.clone(a,r._ellipsoid),r._vertexFormat=VertexFormat.clone(n,r._vertexFormat),r._stRotation=i,r.packedLength=s,r},CoplanarPolygonGeometry.createGeometry=function(e){var t=e._vertexFormat,r=e._polygonHierarchy,o=e._stRotation,a=r.positions;if(!((a=arrayRemoveDuplicates(a,Cartesian3.equalsEpsilon,!0)).length<3)){var n=scratchNormal,i=scratchTangent,s=scratchBitangent,l=axis1Scratch,c=axis2Scratch;if(CoplanarPolygonGeometryLibrary.computeProjectTo2DArguments(a,centerScratch,l,c)){if(n=Cartesian3.cross(l,c,n),n=Cartesian3.normalize(n,n),!Cartesian3.equalsEpsilon(centerScratch,Cartesian3.ZERO,CesiumMath.EPSILON6)){var m=e._ellipsoid.geodeticSurfaceNormal(centerScratch,surfaceNormalScratch);Cartesian3.dot(n,m)<0&&(n=Cartesian3.negate(n,n),l=Cartesian3.negate(l,l))}var p=CoplanarPolygonGeometryLibrary.createProjectPointsTo2DFunction(centerScratch,l,c),y=CoplanarPolygonGeometryLibrary.createProjectPointTo2DFunction(centerScratch,l,c);t.tangent&&(i=Cartesian3.clone(l,i)),t.bitangent&&(s=Cartesian3.clone(c,s));var u=PolygonGeometryLibrary.polygonsFromHierarchy(r,p,!1),g=u.hierarchy,h=u.polygons;if(0!==g.length){a=g[0].outerRing;for(var d=BoundingSphere.fromPoints(a),f=PolygonGeometryLibrary.computeBoundingRectangle(n,y,a,o,scratchBR),C=[],v=0;v<h.length;v++){var x=new GeometryInstance({geometry:createGeometryFromPolygon(h[v],t,f,o,y,n,i,s)});C.push(x)}var P=GeometryPipeline.combineInstances(C)[0];P.attributes.position.values=new Float64Array(P.attributes.position.values),P.indices=IndexDatatype.createTypedArray(P.attributes.position.values.length/3,P.indices);var G=P.attributes;return t.position||delete G.position,new Geometry({attributes:G,indices:P.indices,primitiveType:P.primitiveType,boundingSphere:d})}}}};export default CoplanarPolygonGeometry;
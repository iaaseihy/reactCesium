import arrayRemoveDuplicates from"./arrayRemoveDuplicates.js";import BoundingSphere from"./BoundingSphere.js";import Cartesian3 from"./Cartesian3.js";import Check from"./Check.js";import ComponentDatatype from"./ComponentDatatype.js";import CoplanarPolygonGeometryLibrary from"./CoplanarPolygonGeometryLibrary.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import Geometry from"./Geometry.js";import GeometryAttribute from"./GeometryAttribute.js";import GeometryAttributes from"./GeometryAttributes.js";import GeometryInstance from"./GeometryInstance.js";import GeometryPipeline from"./GeometryPipeline.js";import IndexDatatype from"./IndexDatatype.js";import PolygonGeometryLibrary from"./PolygonGeometryLibrary.js";import PrimitiveType from"./PrimitiveType.js";function createGeometryFromPositions(e){for(var o=e.length,r=new Float64Array(3*o),t=IndexDatatype.createTypedArray(o,2*o),n=0,i=0,a=0;a<o;a++){var y=e[a];r[n++]=y.x,r[n++]=y.y,r[n++]=y.z,t[i++]=a,t[i++]=(a+1)%o}var m=new GeometryAttributes({position:new GeometryAttribute({componentDatatype:ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:r})});return new Geometry({attributes:m,indices:t,primitiveType:PrimitiveType.LINES})}function CoplanarPolygonOutlineGeometry(e){var o=(e=defaultValue(e,defaultValue.EMPTY_OBJECT)).polygonHierarchy;Check.defined("options.polygonHierarchy",o),this._polygonHierarchy=o,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=PolygonGeometryLibrary.computeHierarchyPackedLength(o)+1}CoplanarPolygonOutlineGeometry.fromPositions=function(e){return e=defaultValue(e,defaultValue.EMPTY_OBJECT),Check.defined("options.positions",e.positions),new CoplanarPolygonOutlineGeometry({polygonHierarchy:{positions:e.positions}})},CoplanarPolygonOutlineGeometry.pack=function(e,o,r){return Check.typeOf.object("value",e),Check.defined("array",o),r=defaultValue(r,0),o[r=PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,o,r)]=e.packedLength,o};var scratchOptions={polygonHierarchy:{}};CoplanarPolygonOutlineGeometry.unpack=function(e,o,r){Check.defined("array",e),o=defaultValue(o,0);var t=PolygonGeometryLibrary.unpackPolygonHierarchy(e,o);o=t.startingIndex,delete t.startingIndex;var n=e[o];return defined(r)||(r=new CoplanarPolygonOutlineGeometry(scratchOptions)),r._polygonHierarchy=t,r.packedLength=n,r},CoplanarPolygonOutlineGeometry.createGeometry=function(e){var o=e._polygonHierarchy,r=o.positions;if(!((r=arrayRemoveDuplicates(r,Cartesian3.equalsEpsilon,!0)).length<3)&&CoplanarPolygonGeometryLibrary.validOutline(r)){var t=PolygonGeometryLibrary.polygonOutlinesFromHierarchy(o,!1);if(0!==t.length){for(var n=[],i=0;i<t.length;i++){var a=new GeometryInstance({geometry:createGeometryFromPositions(t[i])});n.push(a)}var y=GeometryPipeline.combineInstances(n)[0],m=BoundingSphere.fromPoints(o.positions);return new Geometry({attributes:y.attributes,indices:y.indices,primitiveType:y.primitiveType,boundingSphere:m})}}};export default CoplanarPolygonOutlineGeometry;
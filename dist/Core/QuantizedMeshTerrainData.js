import when from"../ThirdParty/when.js";import BoundingSphere from"./BoundingSphere.js";import Cartesian2 from"./Cartesian2.js";import Cartesian3 from"./Cartesian3.js";import Check from"./Check.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import DeveloperError from"./DeveloperError.js";import IndexDatatype from"./IndexDatatype.js";import Intersections2D from"./Intersections2D.js";import CesiumMath from"./Math.js";import OrientedBoundingBox from"./OrientedBoundingBox.js";import TaskProcessor from"./TaskProcessor.js";import TerrainData from"./TerrainData.js";import TerrainEncoding from"./TerrainEncoding.js";import TerrainMesh from"./TerrainMesh.js";function QuantizedMeshTerrainData(e){if(!defined(e)||!defined(e.quantizedVertices))throw new DeveloperError("options.quantizedVertices is required.");if(!defined(e.indices))throw new DeveloperError("options.indices is required.");if(!defined(e.minimumHeight))throw new DeveloperError("options.minimumHeight is required.");if(!defined(e.maximumHeight))throw new DeveloperError("options.maximumHeight is required.");if(!defined(e.maximumHeight))throw new DeveloperError("options.maximumHeight is required.");if(!defined(e.boundingSphere))throw new DeveloperError("options.boundingSphere is required.");if(!defined(e.horizonOcclusionPoint))throw new DeveloperError("options.horizonOcclusionPoint is required.");if(!defined(e.westIndices))throw new DeveloperError("options.westIndices is required.");if(!defined(e.southIndices))throw new DeveloperError("options.southIndices is required.");if(!defined(e.eastIndices))throw new DeveloperError("options.eastIndices is required.");if(!defined(e.northIndices))throw new DeveloperError("options.northIndices is required.");if(!defined(e.westSkirtHeight))throw new DeveloperError("options.westSkirtHeight is required.");if(!defined(e.southSkirtHeight))throw new DeveloperError("options.southSkirtHeight is required.");if(!defined(e.eastSkirtHeight))throw new DeveloperError("options.eastSkirtHeight is required.");if(!defined(e.northSkirtHeight))throw new DeveloperError("options.northSkirtHeight is required.");this._quantizedVertices=e.quantizedVertices,this._encodedNormals=e.encodedNormals,this._indices=e.indices,this._minimumHeight=e.minimumHeight,this._maximumHeight=e.maximumHeight,this._boundingSphere=e.boundingSphere,this._orientedBoundingBox=e.orientedBoundingBox,this._horizonOcclusionPoint=e.horizonOcclusionPoint,this._credits=e.credits;var i=this._quantizedVertices.length/3,t=this._uValues=this._quantizedVertices.subarray(0,i),r=this._vValues=this._quantizedVertices.subarray(i,2*i);function n(e,i){return r[e]-r[i]}function o(e,i){return t[e]-t[i]}this._heightValues=this._quantizedVertices.subarray(2*i,3*i),this._westIndices=sortIndicesIfNecessary(e.westIndices,n,i),this._southIndices=sortIndicesIfNecessary(e.southIndices,o,i),this._eastIndices=sortIndicesIfNecessary(e.eastIndices,n,i),this._northIndices=sortIndicesIfNecessary(e.northIndices,o,i),this._westSkirtHeight=e.westSkirtHeight,this._southSkirtHeight=e.southSkirtHeight,this._eastSkirtHeight=e.eastSkirtHeight,this._northSkirtHeight=e.northSkirtHeight,this._childTileMask=defaultValue(e.childTileMask,15),this._createdByUpsampling=defaultValue(e.createdByUpsampling,!1),this._waterMask=e.waterMask,this._mesh=void 0}Object.defineProperties(QuantizedMeshTerrainData.prototype,{credits:{get:function(){return this._credits}},waterMask:{get:function(){return this._waterMask}},childTileMask:{get:function(){return this._childTileMask}},canUpsample:{get:function(){return defined(this._mesh)}}});var arrayScratch=[];function sortIndicesIfNecessary(e,i,t){arrayScratch.length=e.length;for(var r=!1,n=0,o=e.length;n<o;++n)arrayScratch[n]=e[n],r=r||n>0&&i(e[n-1],e[n])>0;return r?(arrayScratch.sort(i),IndexDatatype.createTypedArray(t,arrayScratch)):e}var createMeshTaskName="createVerticesFromQuantizedTerrainMesh",createMeshTaskProcessorNoThrottle=new TaskProcessor(createMeshTaskName),createMeshTaskProcessorThrottle=new TaskProcessor(createMeshTaskName,TerrainData.maximumAsynchronousTasks);QuantizedMeshTerrainData.prototype.createMesh=function(e){e=defaultValue(e,defaultValue.EMPTY_OBJECT),Check.typeOf.object("options.tilingScheme",e.tilingScheme),Check.typeOf.number("options.x",e.x),Check.typeOf.number("options.y",e.y),Check.typeOf.number("options.level",e.level);var i=e.tilingScheme,t=e.x,r=e.y,n=e.level,o=defaultValue(e.exaggeration,1),s=defaultValue(e.throttle,!0),a=i.ellipsoid,h=i.tileXYToRectangle(t,r,n),d=(s?createMeshTaskProcessorThrottle:createMeshTaskProcessorNoThrottle).scheduleTask({minimumHeight:this._minimumHeight,maximumHeight:this._maximumHeight,quantizedVertices:this._quantizedVertices,octEncodedNormals:this._encodedNormals,includeWebMercatorT:!0,indices:this._indices,westIndices:this._westIndices,southIndices:this._southIndices,eastIndices:this._eastIndices,northIndices:this._northIndices,westSkirtHeight:this._westSkirtHeight,southSkirtHeight:this._southSkirtHeight,eastSkirtHeight:this._eastSkirtHeight,northSkirtHeight:this._northSkirtHeight,rectangle:h,relativeToCenter:this._boundingSphere.center,ellipsoid:a,exaggeration:o});if(defined(d)){var c=this;return when(d,(function(e){var i=c._quantizedVertices.length/3,t=i+c._westIndices.length+c._southIndices.length+c._eastIndices.length+c._northIndices.length,r=IndexDatatype.createTypedArray(t,e.indices),n=new Float32Array(e.vertices),s=e.center,a=e.minimumHeight,h=e.maximumHeight,d=defaultValue(BoundingSphere.clone(e.boundingSphere),c._boundingSphere),u=defaultValue(OrientedBoundingBox.clone(e.orientedBoundingBox),c._orientedBoundingBox),l=defaultValue(Cartesian3.clone(e.occludeePointInScaledSpace),c._horizonOcclusionPoint),m=e.vertexStride,g=TerrainEncoding.clone(e.encoding);return c._mesh=new TerrainMesh(s,n,r,e.indexCountWithoutSkirts,i,a,h,d,l,m,u,g,o,e.westIndicesSouthToNorth,e.southIndicesEastToWest,e.eastIndicesNorthToSouth,e.northIndicesWestToEast),c._quantizedVertices=void 0,c._encodedNormals=void 0,c._indices=void 0,c._uValues=void 0,c._vValues=void 0,c._heightValues=void 0,c._westIndices=void 0,c._southIndices=void 0,c._eastIndices=void 0,c._northIndices=void 0,c._mesh}))}};var upsampleTaskProcessor=new TaskProcessor("upsampleQuantizedTerrainMesh",TerrainData.maximumAsynchronousTasks);QuantizedMeshTerrainData.prototype.upsample=function(e,i,t,r,n,o,s){if(!defined(e))throw new DeveloperError("tilingScheme is required.");if(!defined(i))throw new DeveloperError("thisX is required.");if(!defined(t))throw new DeveloperError("thisY is required.");if(!defined(r))throw new DeveloperError("thisLevel is required.");if(!defined(n))throw new DeveloperError("descendantX is required.");if(!defined(o))throw new DeveloperError("descendantY is required.");if(!defined(s))throw new DeveloperError("descendantLevel is required.");if(s-r>1)throw new DeveloperError("Upsampling through more than one level at a time is not currently supported.");var a=this._mesh;if(defined(this._mesh)){var h=2*i!==n,d=2*t===o,c=e.ellipsoid,u=e.tileXYToRectangle(n,o,s),l=upsampleTaskProcessor.scheduleTask({vertices:a.vertices,vertexCountWithoutSkirts:a.vertexCountWithoutSkirts,indices:a.indices,indexCountWithoutSkirts:a.indexCountWithoutSkirts,encoding:a.encoding,minimumHeight:this._minimumHeight,maximumHeight:this._maximumHeight,isEastChild:h,isNorthChild:d,childRectangle:u,ellipsoid:c,exaggeration:a.exaggeration});if(defined(l)){var m=Math.min(this._westSkirtHeight,this._eastSkirtHeight);m=Math.min(m,this._southSkirtHeight),m=Math.min(m,this._northSkirtHeight);var g=h?.5*m:this._westSkirtHeight,p=d?.5*m:this._southSkirtHeight,f=h?this._eastSkirtHeight:.5*m,w=d?this._northSkirtHeight:.5*m,_=this._credits;return when(l).then((function(e){var i,t=new Uint16Array(e.vertices),r=IndexDatatype.createTypedArray(t.length/3,e.indices);return defined(e.encodedNormals)&&(i=new Uint8Array(e.encodedNormals)),new QuantizedMeshTerrainData({quantizedVertices:t,indices:r,encodedNormals:i,minimumHeight:e.minimumHeight,maximumHeight:e.maximumHeight,boundingSphere:BoundingSphere.clone(e.boundingSphere),orientedBoundingBox:OrientedBoundingBox.clone(e.orientedBoundingBox),horizonOcclusionPoint:Cartesian3.clone(e.horizonOcclusionPoint),westIndices:e.westIndices,southIndices:e.southIndices,eastIndices:e.eastIndices,northIndices:e.northIndices,westSkirtHeight:g,southSkirtHeight:p,eastSkirtHeight:f,northSkirtHeight:w,childTileMask:0,credits:_,createdByUpsampling:!0})}))}}};var maxShort=32767,barycentricCoordinateScratch=new Cartesian3;function pointInBoundingBox(e,i,t,r,n,o,s,a){var h=Math.min(t,n,s),d=Math.max(t,n,s),c=Math.min(r,o,a),u=Math.max(r,o,a);return e>=h&&e<=d&&i>=c&&i<=u}QuantizedMeshTerrainData.prototype.interpolateHeight=function(e,i,t){var r=CesiumMath.clamp((i-e.west)/e.width,0,1);r*=maxShort;var n=CesiumMath.clamp((t-e.south)/e.height,0,1);return n*=maxShort,defined(this._mesh)?interpolateMeshHeight(this,r,n):interpolateHeight(this,r,n)};var texCoordScratch0=new Cartesian2,texCoordScratch1=new Cartesian2,texCoordScratch2=new Cartesian2;function interpolateMeshHeight(e,i,t){for(var r=e._mesh,n=r.vertices,o=r.encoding,s=r.indices,a=0,h=s.length;a<h;a+=3){var d=s[a],c=s[a+1],u=s[a+2],l=o.decodeTextureCoordinates(n,d,texCoordScratch0),m=o.decodeTextureCoordinates(n,c,texCoordScratch1),g=o.decodeTextureCoordinates(n,u,texCoordScratch2);if(pointInBoundingBox(i,t,l.x,l.y,m.x,m.y,g.x,g.y)){var p=Intersections2D.computeBarycentricCoordinates(i,t,l.x,l.y,m.x,m.y,g.x,g.y,barycentricCoordinateScratch);if(p.x>=-1e-15&&p.y>=-1e-15&&p.z>=-1e-15){var f=o.decodeHeight(n,d),w=o.decodeHeight(n,c),_=o.decodeHeight(n,u);return p.x*f+p.y*w+p.z*_}}}}function interpolateHeight(e,i,t){for(var r=e._uValues,n=e._vValues,o=e._heightValues,s=e._indices,a=0,h=s.length;a<h;a+=3){var d=s[a],c=s[a+1],u=s[a+2],l=r[d],m=r[c],g=r[u],p=n[d],f=n[c],w=n[u];if(pointInBoundingBox(i,t,l,p,m,f,g,w)){var _=Intersections2D.computeBarycentricCoordinates(i,t,l,p,m,f,g,w,barycentricCoordinateScratch);if(_.x>=-1e-15&&_.y>=-1e-15&&_.z>=-1e-15){var v=_.x*o[d]+_.y*o[c]+_.z*o[u];return CesiumMath.lerp(e._minimumHeight,e._maximumHeight,v/maxShort)}}}}QuantizedMeshTerrainData.prototype.isChildAvailable=function(e,i,t,r){if(!defined(e))throw new DeveloperError("thisX is required.");if(!defined(i))throw new DeveloperError("thisY is required.");if(!defined(t))throw new DeveloperError("childX is required.");if(!defined(r))throw new DeveloperError("childY is required.");var n=2;return t!==2*e&&++n,r!==2*i&&(n-=2),0!==(this._childTileMask&1<<n)},QuantizedMeshTerrainData.prototype.wasCreatedByUpsampling=function(){return this._createdByUpsampling};export default QuantizedMeshTerrainData;
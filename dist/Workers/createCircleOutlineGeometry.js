define(["./Cartesian2-8417ca3d","./Check-d18af7c4","./when-208fe5b0","./EllipseOutlineGeometry-ab13c628","./Math-4e53b694","./GeometryOffsetAttribute-def3b741","./Transforms-a73b3b3b","./RuntimeError-7f634f5d","./ComponentDatatype-9204e9f6","./WebGLConstants-76bb35d1","./EllipseGeometryLibrary-2412418f","./GeometryAttribute-04a19cfe","./GeometryAttributes-b0b294d8","./IndexDatatype-d47ad6f6"],(function(e,i,t,r,l,n,s,o,a,d,u,m,c,p){"use strict";function y(e){var i=(e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT)).radius;e={center:e.center,semiMajorAxis:i,semiMinorAxis:i,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,numberOfVerticalLines:e.numberOfVerticalLines};this._ellipseGeometry=new r.EllipseOutlineGeometry(e),this._workerName="createCircleOutlineGeometry"}y.packedLength=r.EllipseOutlineGeometry.packedLength,y.pack=function(e,i,t){return r.EllipseOutlineGeometry.pack(e._ellipseGeometry,i,t)};var f=new r.EllipseOutlineGeometry({center:new e.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),G={center:new e.Cartesian3,radius:void 0,ellipsoid:e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,numberOfVerticalLines:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0};return y.unpack=function(i,l,n){return l=r.EllipseOutlineGeometry.unpack(i,l,f),G.center=e.Cartesian3.clone(l._center,G.center),G.ellipsoid=e.Ellipsoid.clone(l._ellipsoid,G.ellipsoid),G.height=l._height,G.extrudedHeight=l._extrudedHeight,G.granularity=l._granularity,G.numberOfVerticalLines=l._numberOfVerticalLines,t.defined(n)?(G.semiMajorAxis=l._semiMajorAxis,G.semiMinorAxis=l._semiMinorAxis,n._ellipseGeometry=new r.EllipseOutlineGeometry(G),n):(G.radius=l._semiMajorAxis,new y(G))},y.createGeometry=function(e){return r.EllipseOutlineGeometry.createGeometry(e._ellipseGeometry)},function(i,r){return(i=t.defined(r)?y.unpack(i,r):i)._ellipseGeometry._center=e.Cartesian3.clone(i._ellipseGeometry._center),i._ellipseGeometry._ellipsoid=e.Ellipsoid.clone(i._ellipseGeometry._ellipsoid),y.createGeometry(i)}}));
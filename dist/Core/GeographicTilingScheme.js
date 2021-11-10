import Cartesian2 from"./Cartesian2.js";import Check from"./Check.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import Ellipsoid from"./Ellipsoid.js";import GeographicProjection from"./GeographicProjection.js";import CesiumMath from"./Math.js";import Rectangle from"./Rectangle.js";function GeographicTilingScheme(e){e=defaultValue(e,defaultValue.EMPTY_OBJECT),this._ellipsoid=defaultValue(e.ellipsoid,Ellipsoid.WGS84),this._rectangle=defaultValue(e.rectangle,Rectangle.MAX_VALUE),this._projection=new GeographicProjection(this._ellipsoid),this._numberOfLevelZeroTilesX=defaultValue(e.numberOfLevelZeroTilesX,2),this._numberOfLevelZeroTilesY=defaultValue(e.numberOfLevelZeroTilesY,1)}Object.defineProperties(GeographicTilingScheme.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},rectangle:{get:function(){return this._rectangle}},projection:{get:function(){return this._projection}}}),GeographicTilingScheme.prototype.getNumberOfXTilesAtLevel=function(e){return this._numberOfLevelZeroTilesX<<e},GeographicTilingScheme.prototype.getNumberOfYTilesAtLevel=function(e){return this._numberOfLevelZeroTilesY<<e},GeographicTilingScheme.prototype.rectangleToNativeRectangle=function(e,t){Check.defined("rectangle",e);var i=CesiumMath.toDegrees(e.west),r=CesiumMath.toDegrees(e.south),o=CesiumMath.toDegrees(e.east),n=CesiumMath.toDegrees(e.north);return defined(t)?(t.west=i,t.south=r,t.east=o,t.north=n,t):new Rectangle(i,r,o,n)},GeographicTilingScheme.prototype.tileXYToNativeRectangle=function(e,t,i,r){var o=this.tileXYToRectangle(e,t,i,r);return o.west=CesiumMath.toDegrees(o.west),o.south=CesiumMath.toDegrees(o.south),o.east=CesiumMath.toDegrees(o.east),o.north=CesiumMath.toDegrees(o.north),o},GeographicTilingScheme.prototype.tileXYToRectangle=function(e,t,i,r){var o=this._rectangle,n=this.getNumberOfXTilesAtLevel(i),l=this.getNumberOfYTilesAtLevel(i),s=o.width/n,a=e*s+o.west,h=(e+1)*s+o.west,u=o.height/l,c=o.north-t*u,g=o.north-(t+1)*u;return defined(r)||(r=new Rectangle(a,g,h,c)),r.west=a,r.south=g,r.east=h,r.north=c,r},GeographicTilingScheme.prototype.positionToTileXY=function(e,t,i){var r=this._rectangle;if(Rectangle.contains(r,e)){var o=this.getNumberOfXTilesAtLevel(t),n=this.getNumberOfYTilesAtLevel(t),l=r.width/o,s=r.height/n,a=e.longitude;r.east<r.west&&(a+=CesiumMath.TWO_PI);var h=(a-r.west)/l|0;h>=o&&(h=o-1);var u=(r.north-e.latitude)/s|0;return u>=n&&(u=n-1),defined(i)?(i.x=h,i.y=u,i):new Cartesian2(h,u)}};export default GeographicTilingScheme;
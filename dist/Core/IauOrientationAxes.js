import Cartesian3 from"./Cartesian3.js";import defined from"./defined.js";import Iau2000Orientation from"./Iau2000Orientation.js";import JulianDate from"./JulianDate.js";import CesiumMath from"./Math.js";import Matrix3 from"./Matrix3.js";import Quaternion from"./Quaternion.js";function IauOrientationAxes(t){defined(t)&&"function"===typeof t||(t=Iau2000Orientation.ComputeMoon),this._computeFunction=t}var xAxisScratch=new Cartesian3,yAxisScratch=new Cartesian3,zAxisScratch=new Cartesian3;function computeRotationMatrix(t,a,i){var n=xAxisScratch;n.x=Math.cos(t+CesiumMath.PI_OVER_TWO),n.y=Math.sin(t+CesiumMath.PI_OVER_TWO),n.z=0;var r=Math.cos(a),o=zAxisScratch;o.x=r*Math.cos(t),o.y=r*Math.sin(t),o.z=Math.sin(a);var e=Cartesian3.cross(o,n,yAxisScratch);return defined(i)||(i=new Matrix3),i[0]=n.x,i[1]=e.x,i[2]=o.x,i[3]=n.y,i[4]=e.y,i[5]=o.y,i[6]=n.z,i[7]=e.z,i[8]=o.z,i}var rotMtxScratch=new Matrix3,quatScratch=new Quaternion;IauOrientationAxes.prototype.evaluate=function(t,a){defined(t)||(t=JulianDate.now());var i=this._computeFunction(t),n=computeRotationMatrix(i.rightAscension,i.declination,a),r=CesiumMath.zeroToTwoPi(i.rotation),o=Quaternion.fromAxisAngle(Cartesian3.UNIT_Z,r,quatScratch),e=Matrix3.fromQuaternion(Quaternion.conjugate(o,o),rotMtxScratch);return Matrix3.multiply(e,n,n)};export default IauOrientationAxes;
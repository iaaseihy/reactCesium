define(["exports","./AttributeCompression-f02ec82f","./Cartesian2-8417ca3d","./Check-d18af7c4","./when-208fe5b0","./Math-4e53b694","./Transforms-a73b3b3b","./ComponentDatatype-9204e9f6","./EncodedCartesian3-874933de","./GeometryAttribute-04a19cfe","./IndexDatatype-d47ad6f6","./IntersectionTests-7d224a2f","./Plane-4aa8974d"],(function(e,t,r,a,n,i,s,o,u,p,d,l,y){"use strict";var f=new r.Cartesian3,v=new r.Cartesian3,c=new r.Cartesian3,m={calculateACMR:function(e){var t=(e=n.defaultValue(e,n.defaultValue.EMPTY_OBJECT)).indices,r=e.maximumIndex,a=n.defaultValue(e.cacheSize,24),i=t.length;if(!n.defined(r)){r=0;for(var s=0,o=t[s];s<i;)r<o&&(r=o),o=t[++s]}for(var u=[],p=0;p<r+1;p++)u[p]=0;for(var d=a+1,l=0;l<i;++l)d-u[t[l]]>a&&(u[t[l]]=d,++d);return(d-a+1)/(i/3)},tipsify:function(e){var t=(e=n.defaultValue(e,n.defaultValue.EMPTY_OBJECT)).indices,r=e.maximumIndex,a=n.defaultValue(e.cacheSize,24);function i(e,t,r,a,n,i,s){for(var o,u=-1,p=-1,d=0;d<r.length;){var l=r[d];a[l].numLiveTriangles&&(o=0,(p<(o=n-a[l].timeStamp+2*a[l].numLiveTriangles<=t?n-a[l].timeStamp:o)||-1===p)&&(p=o,u=l)),++d}return-1===u?function(e,t,r){for(;1<=t.length;){var a=t[t.length-1];if(t.splice(t.length-1,1),0<e[a].numLiveTriangles)return a}for(;c<r;){if(0<e[c].numLiveTriangles)return++c-1;++c}return-1}(a,i,s):u}e=t.length;var s=0,o=t[w=0],u=e;if(n.defined(r))s=r+1;else{for(;w<u;)s<o&&(s=o),o=t[++w];if(-1===s)return 0;++s}for(var p=[],d=0;d<s;d++)p[d]={numLiveTriangles:0,timeStamp:0,vertexTriangles:[]};for(var l=w=0;w<u;)p[t[w]].vertexTriangles.push(l),++p[t[w]].numLiveTriangles,p[t[w+1]].vertexTriangles.push(l),++p[t[w+1]].numLiveTriangles,p[t[w+2]].vertexTriangles.push(l),++p[t[w+2]].numLiveTriangles,++l,w+=3;var y,f=0,v=a+1,c=1,m=[],C=[],h=0,b=[],g=e/3,A=[];for(d=0;d<g;d++)A[d]=!1;for(;-1!==f;){m=[];for(var T,x=(T=p[f]).vertexTriangles.length,P=0;P<x;++P)if(!A[l=T.vertexTriangles[P]]){A[l]=!0;for(var w=l+l+l,S=0;S<3;++S)y=t[w],m.push(y),C.push(y),b[h]=y,++h,--(y=p[y]).numLiveTriangles,v-y.timeStamp>a&&(y.timeStamp=v,++v),++w}f=i(0,a,m,p,v,C,s)}return b}},C={};function h(e,t,r,a,n){e[t++]=r,e[t++]=a,e[t++]=a,e[t++]=n,e[t++]=n,e[t]=r}function b(e){var t,r,a={};for(t in e)e.hasOwnProperty(t)&&n.defined(e[t])&&n.defined(e[t].values)&&(r=e[t],a[t]=new p.GeometryAttribute({componentDatatype:r.componentDatatype,componentsPerAttribute:r.componentsPerAttribute,normalize:r.normalize,values:[]}));return a}C.toWireframe=function(e){var t=e.indices;if(n.defined(t)){switch(e.primitiveType){case p.PrimitiveType.TRIANGLES:e.indices=function(e){for(var t=e.length,r=t/3*6,a=d.IndexDatatype.createTypedArray(t,r),n=0,i=0;i<t;i+=3,n+=6)h(a,n,e[i],e[i+1],e[i+2]);return a}(t);break;case p.PrimitiveType.TRIANGLE_STRIP:e.indices=function(e){var t=e.length;if(3<=t){var r=6*(t-2),a=d.IndexDatatype.createTypedArray(t,r);h(a,0,e[0],e[1],e[2]);for(var n=6,i=3;i<t;++i,n+=6)h(a,n,e[i-1],e[i],e[i-2]);return a}return new Uint16Array}(t);break;case p.PrimitiveType.TRIANGLE_FAN:e.indices=function(e){if(0<e.length){for(var t=e.length-1,r=6*(t-1),a=d.IndexDatatype.createTypedArray(t,r),n=e[0],i=0,s=1;s<t;++s,i+=6)h(a,i,n,e[s],e[s+1]);return a}return new Uint16Array}(t)}e.primitiveType=p.PrimitiveType.LINES}return e},C.createLineSegmentsForVectors=function(e,t,r){t=n.defaultValue(t,"normal"),r=n.defaultValue(r,1e4);for(var a,i=e.attributes.position.values,u=e.attributes[t].values,d=i.length,l=new Float64Array(2*d),y=0,f=0;f<d;f+=3)l[y++]=i[f],l[y++]=i[f+1],l[y++]=i[f+2],l[y++]=i[f]+u[f]*r,l[y++]=i[f+1]+u[f+1]*r,l[y++]=i[f+2]+u[f+2]*r;return e=e.boundingSphere,n.defined(e)&&(a=new s.BoundingSphere(e.center,e.radius+r)),new p.Geometry({attributes:{position:new p.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:l})},primitiveType:p.PrimitiveType.LINES,boundingSphere:a})},C.createAttributeLocations=function(e){for(var t,r=["position","positionHigh","positionLow","position3DHigh","position3DLow","position2DHigh","position2DLow","pickColor","normal","st","tangent","bitangent","extrudeDirection","compressedAttributes"],a=e.attributes,i={},s=0,o=r.length,u=0;u<o;++u){var p=r[u];n.defined(a[p])&&(i[p]=s++)}for(t in a)a.hasOwnProperty(t)&&!n.defined(i[t])&&(i[t]=s++);return i},C.reorderForPreVertexCache=function(e){var t=p.Geometry.computeNumberOfVertices(e),r=e.indices;if(n.defined(r)){for(var a=new Int32Array(t),i=0;i<t;i++)a[i]=-1;for(var s,u=r,l=u.length,y=d.IndexDatatype.createTypedArray(t,l),f=0,v=0,c=0;f<l;)-1!==(s=a[u[f]])?y[v]=s:(a[s=u[f]]=c,y[v]=c,++c),++f,++v;e.indices=y;var m,C=e.attributes;for(m in C)if(C.hasOwnProperty(m)&&n.defined(C[m])&&n.defined(C[m].values)){for(var h=C[m],b=h.values,g=0,A=h.componentsPerAttribute,T=o.ComponentDatatype.createTypedArray(h.componentDatatype,c*A);g<t;){var x=a[g];if(-1!==x)for(var P=0;P<A;P++)T[A*x+P]=b[A*g+P];++g}h.values=T}}return e},C.reorderForPostVertexCache=function(e,t){var r=e.indices;if(e.primitiveType===p.PrimitiveType.TRIANGLES&&n.defined(r)){for(var a=r.length,i=0,s=0;s<a;s++)r[s]>i&&(i=r[s]);e.indices=m.tipsify({indices:r,maximumIndex:i,cacheSize:t})}return e},C.fitToUnsignedShortIndices=function(e){var t=[],r=p.Geometry.computeNumberOfVertices(e);if(n.defined(e.indices)&&r>=i.CesiumMath.SIXTY_FOUR_KILOBYTES){var a,s=[],o=[],u=0,d=b(e.attributes),l=e.indices,y=l.length;e.primitiveType===p.PrimitiveType.TRIANGLES?a=3:e.primitiveType===p.PrimitiveType.LINES?a=2:e.primitiveType===p.PrimitiveType.POINTS&&(a=1);for(var f=0;f<y;f+=a){for(var v=0;v<a;++v){var c=l[f+v],m=s[c];n.defined(m)||(m=u++,s[c]=m,function(e,t,r){for(var a in t)if(t.hasOwnProperty(a)&&n.defined(t[a])&&n.defined(t[a].values))for(var i=t[a],s=0;s<i.componentsPerAttribute;++s)e[a].values.push(i.values[r*i.componentsPerAttribute+s])}(d,e.attributes,c)),o.push(m)}u+a>=i.CesiumMath.SIXTY_FOUR_KILOBYTES&&(t.push(new p.Geometry({attributes:d,indices:o,primitiveType:e.primitiveType,boundingSphere:e.boundingSphere,boundingSphereCV:e.boundingSphereCV})),s=[],o=[],u=0,d=b(e.attributes))}0!==o.length&&t.push(new p.Geometry({attributes:d,indices:o,primitiveType:e.primitiveType,boundingSphere:e.boundingSphere,boundingSphereCV:e.boundingSphereCV}))}else t.push(e);return t};var g=new r.Cartesian3,A=new r.Cartographic;C.projectTo2D=function(e,t,a,i,u){for(var d=e.attributes[t],l=(u=n.defined(u)?u:new s.GeographicProjection).ellipsoid,y=d.values,f=new Float64Array(y.length),v=0,c=0;c<y.length;c+=3){var m=r.Cartesian3.fromArray(y,c,g);m=l.cartesianToCartographic(m,A),m=u.project(m,g);f[v++]=m.x,f[v++]=m.y,f[v++]=m.z}return e.attributes[a]=d,e.attributes[i]=new p.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:f}),delete e.attributes[t],e};var T={high:0,low:0};C.encodeAttribute=function(e,t,r,a){for(var n=e.attributes[t],i=n.values,s=i.length,d=new Float32Array(s),l=new Float32Array(s),y=0;y<s;++y)u.EncodedCartesian3.encode(i[y],T),d[y]=T.high,l[y]=T.low;return n=n.componentsPerAttribute,e.attributes[r]=new p.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:n,values:d}),e.attributes[a]=new p.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:n,values:l}),delete e.attributes[t],e};var x=new r.Cartesian3;function P(e,t){if(n.defined(t))for(var a=t.values,i=a.length,o=0;o<i;o+=3)r.Cartesian3.unpack(a,o,x),s.Matrix4.multiplyByPoint(e,x,x),r.Cartesian3.pack(x,a,o)}function w(e,t){if(n.defined(t))for(var a=t.values,i=a.length,o=0;o<i;o+=3)r.Cartesian3.unpack(a,o,x),s.Matrix3.multiplyByVector(e,x,x),x=r.Cartesian3.normalize(x,x),r.Cartesian3.pack(x,a,o)}var S=new s.Matrix4,I=new s.Matrix3;C.transformToWorldCoordinates=function(e){var t=e.modelMatrix;if(s.Matrix4.equals(t,s.Matrix4.IDENTITY))return e;var r=e.geometry.attributes;return P(t,r.position),P(t,r.prevPosition),P(t,r.nextPosition),(n.defined(r.normal)||n.defined(r.tangent)||n.defined(r.bitangent))&&(s.Matrix4.inverse(t,S),s.Matrix4.transpose(S,S),s.Matrix4.getMatrix3(S,I),w(I,r.normal),w(I,r.tangent),w(I,r.bitangent)),r=e.geometry.boundingSphere,n.defined(r)&&(e.geometry.boundingSphere=s.BoundingSphere.transform(r,t,r)),e.modelMatrix=s.Matrix4.clone(s.Matrix4.IDENTITY),e};var O=new r.Cartesian3;function E(e,t){var a,i,u=e.length;e[0].modelMatrix;var l,y,f,v=n.defined(e[0][t].indices),c=e[0][t].primitiveType,m=function(e,t){var r,a=e.length,i={},s=e[0][t].attributes;for(r in s)if(s.hasOwnProperty(r)&&n.defined(s[r])&&n.defined(s[r].values)){for(var u=s[r],d=u.values.length,l=!0,y=1;y<a;++y){var f=e[y][t].attributes[r];if(!n.defined(f)||u.componentDatatype!==f.componentDatatype||u.componentsPerAttribute!==f.componentsPerAttribute||u.normalize!==f.normalize){l=!1;break}d+=f.values.length}l&&(i[r]=new p.GeometryAttribute({componentDatatype:u.componentDatatype,componentsPerAttribute:u.componentsPerAttribute,normalize:u.normalize,values:o.ComponentDatatype.createTypedArray(u.componentDatatype,d)}))}return i}(e,t);for(a in m)if(m.hasOwnProperty(a))for(l=m[a].values,h=w=0;h<u;++h)for(f=(y=e[h][t].attributes[a].values).length,i=0;i<f;++i)l[w++]=y[i];if(v){for(var C=0,h=0;h<u;++h)C+=e[h][t].indices.length;var b=p.Geometry.computeNumberOfVertices(new p.Geometry({attributes:m,primitiveType:p.PrimitiveType.POINTS})),g=d.IndexDatatype.createTypedArray(b,C),A=0,T=0;for(h=0;h<u;++h){for(var x=e[h][t].indices,P=x.length,w=0;w<P;++w)g[A++]=T+x[w];T+=p.Geometry.computeNumberOfVertices(e[h][t])}b=g}var S=new r.Cartesian3,I=0;for(h=0;h<u;++h){if(E=e[h][t].boundingSphere,!n.defined(E)){S=void 0;break}r.Cartesian3.add(E.center,S,S)}if(n.defined(S))for(r.Cartesian3.divideByScalar(S,u,S),h=0;h<u;++h){var E=e[h][t].boundingSphere,N=r.Cartesian3.magnitude(r.Cartesian3.subtract(E.center,S,O))+E.radius;I<N&&(I=N)}return new p.Geometry({attributes:m,indices:b,primitiveType:c,boundingSphere:n.defined(S)?new s.BoundingSphere(S,I):void 0})}C.combineInstances=function(e){for(var t=[],r=[],a=e.length,i=0;i<a;++i){var s=e[i];n.defined(s.geometry)?t.push(s):n.defined(s.westHemisphereGeometry)&&n.defined(s.eastHemisphereGeometry)&&r.push(s)}var o=[];return 0<t.length&&o.push(E(t,"geometry")),0<r.length&&(o.push(E(r,"westHemisphereGeometry")),o.push(E(r,"eastHemisphereGeometry"))),o};var N=new r.Cartesian3,L=new r.Cartesian3,z=new r.Cartesian3,D=new r.Cartesian3;C.computeNormal=function(e){for(var t=e.indices,a=e.attributes,n=a.position.values,s=a.position.values.length/3,u=t.length,d=new Array(s),l=new Array(u/3),y=new Array(u),f=0;f<s;f++)d[f]={indexOffset:0,count:0,currentCount:0};var v=0;for(f=0;f<u;f+=3){var c=t[f],m=t[f+1],C=t[f+2],h=3*c,b=3*m,g=3*C;L.x=n[h],L.y=n[1+h],L.z=n[2+h],z.x=n[b],z.y=n[1+b],z.z=n[2+b],D.x=n[g],D.y=n[1+g],D.z=n[2+g],d[c].count++,d[m].count++,d[C].count++,r.Cartesian3.subtract(z,L,z),r.Cartesian3.subtract(D,L,D),l[v]=r.Cartesian3.cross(z,D,new r.Cartesian3),v++}var A=0;for(f=0;f<s;f++)d[f].indexOffset+=A,A+=d[f].count;for(f=v=0;f<u;f+=3){var T;y[(T=d[t[f]]).indexOffset+T.currentCount]=v,T.currentCount++,y[(T=d[t[f+1]]).indexOffset+T.currentCount]=v,T.currentCount++,y[(T=d[t[f+2]]).indexOffset+T.currentCount]=v,T.currentCount++,v++}var x=new Float32Array(3*s);for(f=0;f<s;f++){var P=3*f;if(T=d[f],r.Cartesian3.clone(r.Cartesian3.ZERO,N),0<T.count){for(v=0;v<T.count;v++)r.Cartesian3.add(N,l[y[T.indexOffset+v]],N);r.Cartesian3.equalsEpsilon(r.Cartesian3.ZERO,N,i.CesiumMath.EPSILON10)&&r.Cartesian3.clone(l[y[T.indexOffset]],N)}r.Cartesian3.equalsEpsilon(r.Cartesian3.ZERO,N,i.CesiumMath.EPSILON10)&&(N.z=1),r.Cartesian3.normalize(N,N),x[P]=N.x,x[1+P]=N.y,x[2+P]=N.z}return e.attributes.normal=new p.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:x}),e};var M=new r.Cartesian3,G=new r.Cartesian3,R=new r.Cartesian3;C.computeTangentAndBitangent=function(e){e.attributes;for(var t=e.indices,a=e.attributes.position.values,n=e.attributes.normal.values,i=e.attributes.st.values,s=e.attributes.position.values.length/3,u=t.length,d=new Array(3*s),l=0;l<d.length;l++)d[l]=0;for(l=0;l<u;l+=3){var y,f=t[l],v=3*(A=t[l+1]),c=3*(T=t[l+2]),m=2*f,C=2*A,h=2*T,b=a[y=3*f],g=a[y+1],A=a[y+2],T=i[m];f=i[1+m],m=i[1+C]-f,f=i[1+h]-f,T=1/((i[C]-T)*f-(i[h]-T)*m),b=(f*(a[v]-b)-m*(a[c]-b))*T,g=(f*(a[v+1]-g)-m*(a[c+1]-g))*T,T=(f*(a[v+2]-A)-m*(a[c+2]-A))*T;d[y]+=b,d[y+1]+=g,d[y+2]+=T,d[v]+=b,d[v+1]+=g,d[v+2]+=T,d[c]+=b,d[c+1]+=g,d[c+2]+=T}var x=new Float32Array(3*s),P=new Float32Array(3*s);for(l=0;l<s;l++){v=1+(y=3*l),c=y+2;var w=r.Cartesian3.fromArray(n,y,M),S=r.Cartesian3.fromArray(d,y,R),I=r.Cartesian3.dot(w,S);r.Cartesian3.multiplyByScalar(w,I,G),r.Cartesian3.normalize(r.Cartesian3.subtract(S,G,S),S),x[y]=S.x,x[v]=S.y,x[c]=S.z,r.Cartesian3.normalize(r.Cartesian3.cross(w,S,S),S),P[y]=S.x,P[v]=S.y,P[c]=S.z}return e.attributes.tangent=new p.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:x}),e.attributes.bitangent=new p.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:P}),e};var V=new r.Cartesian2,F=new r.Cartesian3,B=new r.Cartesian3,k=new r.Cartesian3,_=new r.Cartesian2;function q(e,t){Math.abs(e.y)<i.CesiumMath.EPSILON6&&(e.y=t?-i.CesiumMath.EPSILON6:i.CesiumMath.EPSILON6)}C.compressVertices=function(e){var a=e.attributes.extrudeDirection;if(n.defined(a)){for(var i=a.values,s=i.length/3,u=new Float32Array(2*s),d=0,l=0;l<s;++l)r.Cartesian3.fromArray(i,3*l,F),r.Cartesian3.equals(F,r.Cartesian3.ZERO)?d+=2:(_=t.AttributeCompression.octEncodeInRange(F,65535,_),u[d++]=_.x,u[d++]=_.y);return e.attributes.compressedAttributes=new p.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:u}),delete e.attributes.extrudeDirection,e}var y=e.attributes.normal,f=e.attributes.st,v=n.defined(y),c=n.defined(f);if(!v&&!c)return e;var m,C,h,b,g=e.attributes.tangent,A=(a=e.attributes.bitangent,n.defined(g)),T=n.defined(a);v&&(m=y.values),c&&(C=f.values),A&&(h=g.values),T&&(b=a.values),g=s=(v?m:C).length/(v?3:2),a=c&&v?2:1,g*=a+=A||T?1:0;var x=new Float32Array(g),P=0;for(l=0;l<s;++l){c&&(r.Cartesian2.fromArray(C,2*l,V),x[P++]=t.AttributeCompression.compressTextureCoordinates(V));var w=3*l;v&&n.defined(h)&&n.defined(b)?(r.Cartesian3.fromArray(m,w,F),r.Cartesian3.fromArray(h,w,B),r.Cartesian3.fromArray(b,w,k),t.AttributeCompression.octPack(F,B,k,V),x[P++]=V.x,x[P++]=V.y):(v&&(r.Cartesian3.fromArray(m,w,F),x[P++]=t.AttributeCompression.octEncodeFloat(F)),A&&(r.Cartesian3.fromArray(h,w,F),x[P++]=t.AttributeCompression.octEncodeFloat(F)),T&&(r.Cartesian3.fromArray(b,w,F),x[P++]=t.AttributeCompression.octEncodeFloat(F)))}return e.attributes.compressedAttributes=new p.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:a,values:x}),v&&delete e.attributes.normal,c&&delete e.attributes.st,T&&delete e.attributes.bitangent,A&&delete e.attributes.tangent,e};var U=new r.Cartesian3;function Y(e,t,a,n){r.Cartesian3.add(e,r.Cartesian3.multiplyByScalar(r.Cartesian3.subtract(t,e,U),e.y/(e.y-t.y),U),a),r.Cartesian3.clone(a,n),q(a,!0),q(n,!1)}var Z=new r.Cartesian3,H=new r.Cartesian3,W=new r.Cartesian3,X=new r.Cartesian3,j={positions:new Array(7),indices:new Array(9)};function J(e,t,r){if(!(0<=e.x||0<=t.x||0<=r.x)){!function(e,t,r){if(0!==e.y&&0!==t.y&&0!==r.y)return q(e,e.y<0),q(t,t.y<0),q(r,r.y<0);var a=Math.abs(e.y),n=Math.abs(t.y),s=Math.abs(r.y);q(e,n=(n=n<a?s<a?i.CesiumMath.sign(e.y):i.CesiumMath.sign(r.y):s<n?i.CesiumMath.sign(t.y):i.CesiumMath.sign(r.y))<0),q(t,n),q(r,n)}(e,t,r);var a=e.y<0,n=t.y<0,s=r.y<0,o=0;o+=a?1:0,o+=n?1:0;var u=j.indices;return 1==(o+=s?1:0)?(u[1]=3,u[2]=4,u[5]=6,u[7]=6,u[8]=5,a?(Y(e,t,Z,W),Y(e,r,H,X),u[0]=0,u[3]=1,u[4]=2,u[6]=1):n?(Y(t,r,Z,W),Y(t,e,H,X),u[0]=1,u[3]=2,u[4]=0,u[6]=2):s&&(Y(r,e,Z,W),Y(r,t,H,X),u[0]=2,u[3]=0,u[4]=1,u[6]=0)):2==o&&(u[2]=4,u[4]=4,u[5]=3,u[7]=5,u[8]=6,a?n?s||(Y(r,e,Z,W),Y(r,t,H,X),u[0]=0,u[1]=1,u[3]=0,u[6]=2):(Y(t,r,Z,W),Y(t,e,H,X),u[0]=2,u[1]=0,u[3]=2,u[6]=1):(Y(e,t,Z,W),Y(e,r,H,X),u[0]=1,u[1]=2,u[3]=1,u[6]=0)),(u=j.positions)[0]=e,u[1]=t,u[2]=r,u.length=3,1!=o&&2!=o||(u[3]=Z,u[4]=H,u[5]=W,u[6]=X,u.length=7),j}}function K(e,t){var r=e.attributes;if(0!==r.position.values.length){for(var a in r)r.hasOwnProperty(a)&&n.defined(r[a])&&n.defined(r[a].values)&&((a=r[a]).values=o.ComponentDatatype.createTypedArray(a.componentDatatype,a.values));var i=p.Geometry.computeNumberOfVertices(e);return e.indices=d.IndexDatatype.createTypedArray(i,e.indices),t&&(e.boundingSphere=s.BoundingSphere.fromVertices(r.position.values)),e}}function Q(e){var t,r,a=e.attributes,i={};for(t in a)a.hasOwnProperty(t)&&n.defined(a[t])&&n.defined(a[t].values)&&(r=a[t],i[t]=new p.GeometryAttribute({componentDatatype:r.componentDatatype,componentsPerAttribute:r.componentsPerAttribute,normalize:r.normalize,values:[]}));return new p.Geometry({attributes:i,indices:[],primitiveType:e.primitiveType})}function $(e,t,r){var a=n.defined(e.geometry.boundingSphere);t=K(t,a),r=K(r,a),n.defined(r)&&!n.defined(t)?e.geometry=r:!n.defined(r)&&n.defined(t)?e.geometry=t:(e.westHemisphereGeometry=t,e.eastHemisphereGeometry=r,e.geometry=void 0)}function ee(e,t){var r=new e,a=new e,n=new e;return function(i,s,o,u,p,d,l,y){i=e.fromArray(p,i*t,r),s=e.fromArray(p,s*t,a),o=e.fromArray(p,o*t,n),e.multiplyByScalar(i,u.x,i),e.multiplyByScalar(s,u.y,s),e.multiplyByScalar(o,u.z,o),i=e.add(i,s,i),e.add(i,o,i),y&&e.normalize(i,i),e.pack(i,d,l*t)}}var te=ee(s.Cartesian4,4),re=ee(r.Cartesian3,3),ae=ee(r.Cartesian2,2),ne=new r.Cartesian3,ie=new r.Cartesian3,se=new r.Cartesian3,oe=new r.Cartesian3;function ue(e,t,a,s,o,u,p,d,l,y,m,C,h,b,g,A){if(n.defined(u)||n.defined(p)||n.defined(d)||n.defined(l)||n.defined(y)||0!==b){var T,x=function(e,t,a,s,o){var u,p,d,l,y,m,C;if(n.defined(o)||(o=new r.Cartesian3),n.defined(t.z)){if(r.Cartesian3.equalsEpsilon(e,t,i.CesiumMath.EPSILON14))return r.Cartesian3.clone(r.Cartesian3.UNIT_X,o);if(r.Cartesian3.equalsEpsilon(e,a,i.CesiumMath.EPSILON14))return r.Cartesian3.clone(r.Cartesian3.UNIT_Y,o);if(r.Cartesian3.equalsEpsilon(e,s,i.CesiumMath.EPSILON14))return r.Cartesian3.clone(r.Cartesian3.UNIT_Z,o);u=r.Cartesian3.subtract(a,t,f),p=r.Cartesian3.subtract(s,t,v),d=r.Cartesian3.subtract(e,t,c),l=r.Cartesian3.dot(u,u),h=r.Cartesian3.dot(u,p),y=r.Cartesian3.dot(u,d),m=r.Cartesian3.dot(p,p),C=r.Cartesian3.dot(p,d)}else{if(r.Cartesian2.equalsEpsilon(e,t,i.CesiumMath.EPSILON14))return r.Cartesian3.clone(r.Cartesian3.UNIT_X,o);if(r.Cartesian2.equalsEpsilon(e,a,i.CesiumMath.EPSILON14))return r.Cartesian3.clone(r.Cartesian3.UNIT_Y,o);if(r.Cartesian2.equalsEpsilon(e,s,i.CesiumMath.EPSILON14))return r.Cartesian3.clone(r.Cartesian3.UNIT_Z,o);u=r.Cartesian2.subtract(a,t,f),p=r.Cartesian2.subtract(s,t,v),d=r.Cartesian2.subtract(e,t,c),l=r.Cartesian2.dot(u,u),h=r.Cartesian2.dot(u,p),y=r.Cartesian2.dot(u,d),m=r.Cartesian2.dot(p,p),C=r.Cartesian2.dot(p,d)}o.y=m*y-h*C,o.z=l*C-h*y;var h=l*m-h*h;return 0!==o.y&&(o.y/=h),0!==o.z&&(o.z/=h),o.x=1-o.y-o.z,o}(s,r.Cartesian3.fromArray(o,3*e,ne),r.Cartesian3.fromArray(o,3*t,ie),r.Cartesian3.fromArray(o,3*a,se),oe);if(n.defined(u)&&re(e,t,a,x,u,C.normal.values,A,!0),n.defined(y)&&(o=r.Cartesian3.fromArray(y,3*e,ne),u=r.Cartesian3.fromArray(y,3*t,ie),y=r.Cartesian3.fromArray(y,3*a,se),r.Cartesian3.multiplyByScalar(o,x.x,o),r.Cartesian3.multiplyByScalar(u,x.y,u),r.Cartesian3.multiplyByScalar(y,x.z,y),r.Cartesian3.equals(o,r.Cartesian3.ZERO)&&r.Cartesian3.equals(u,r.Cartesian3.ZERO)&&r.Cartesian3.equals(y,r.Cartesian3.ZERO)?((T=ne).x=0,T.y=0,T.z=0):(T=r.Cartesian3.add(o,u,o),r.Cartesian3.add(T,y,T),r.Cartesian3.normalize(T,T)),r.Cartesian3.pack(T,C.extrudeDirection.values,3*A)),n.defined(m)&&function(e,t,r,a,n,s,o){e=n[e]*a.x,t=n[t]*a.y,a=n[r]*a.z,s[o]=e+t+a>i.CesiumMath.EPSILON6?1:0}(e,t,a,x,m,C.applyOffset.values,A),n.defined(p)&&re(e,t,a,x,p,C.tangent.values,A,!0),n.defined(d)&&re(e,t,a,x,d,C.bitangent.values,A,!0),n.defined(l)&&ae(e,t,a,x,l,C.st.values,A),0<b)for(var P=0;P<b;P++){var w=h[P];!function(e,t,r,a,n,i,s){var o=i.componentsPerAttribute,u=i.values,p=s.values;switch(o){case 4:te(e,t,r,a,u,p,n,!1);break;case 3:re(e,t,r,a,u,p,n,!1);break;case 2:ae(e,t,r,a,u,p,n,!1);break;default:p[n]=u[e]*a.x+u[t]*a.y+u[r]*a.z}}(e,t,a,x,A,g[w],C[w])}}}function pe(e,t,r,a,n,i){var s=e.position.values.length/3;return-1===n?(e.position.values.push(i.x,i.y,i.z),t.push(s),s):-1===(n=r[a=a[n]])?(r[a]=s,e.position.values.push(i.x,i.y,i.z),t.push(s),s):(t.push(n),n)}var de={position:!0,normal:!0,bitangent:!0,tangent:!0,st:!0,extrudeDirection:!0,applyOffset:!0};function le(e){var t,a=e.geometry,i=a.attributes,s=i.position.values,o=n.defined(i.normal)?i.normal.values:void 0,u=n.defined(i.bitangent)?i.bitangent.values:void 0,p=n.defined(i.tangent)?i.tangent.values:void 0,d=n.defined(i.st)?i.st.values:void 0,l=n.defined(i.extrudeDirection)?i.extrudeDirection.values:void 0,y=n.defined(i.applyOffset)?i.applyOffset.values:void 0,f=a.indices,v=[];for(t in i)i.hasOwnProperty(t)&&!de[t]&&n.defined(i[t])&&v.push(t);var c,m,C=v.length,h=Q(a),b=Q(a),g=[];g.length=s.length/3;var A=[];for(A.length=s.length/3,x=0;x<g.length;++x)g[x]=-1,A[x]=-1;for(var T=f.length,x=0;x<T;x+=3){var P=f[x],w=f[x+1],S=f[x+2],I=r.Cartesian3.fromArray(s,3*P),O=r.Cartesian3.fromArray(s,3*w),E=r.Cartesian3.fromArray(s,3*S),N=J(I,O,E);if(n.defined(N)&&3<N.positions.length)for(var L=N.positions,z=N.indices,D=z.length,M=0;M<D;++M){var G=z[M],R=L[G],V=R.y<0?(c=b.attributes,m=b.indices,g):(c=h.attributes,m=h.indices,A);ue(P,w,S,R,s,o,p,u,d,l,y,c,v,C,i,pe(c,m,V,f,G<3?x+G:-1,R))}else n.defined(N)&&(I=N.positions[0],O=N.positions[1],E=N.positions[2]),V=I.y<0?(c=b.attributes,m=b.indices,g):(c=h.attributes,m=h.indices,A),ue(P,w,S,I,s,o,p,u,d,l,y,c,v,C,i,pe(c,m,V,f,x,I)),ue(P,w,S,O,s,o,p,u,d,l,y,c,v,C,i,pe(c,m,V,f,x+1,O)),ue(P,w,S,E,s,o,p,u,d,l,y,c,v,C,i,pe(c,m,V,f,x+2,E))}$(e,b,h)}var ye=y.Plane.fromPointNormal(r.Cartesian3.ZERO,r.Cartesian3.UNIT_Y),fe=new r.Cartesian3,ve=new r.Cartesian3;function ce(e,t,a,s,o,u,p){n.defined(p)&&(s=r.Cartesian3.fromArray(s,3*e,ne),r.Cartesian3.equalsEpsilon(s,a,i.CesiumMath.EPSILON10)?u.applyOffset.values[o]=p[e]:u.applyOffset.values[o]=p[t])}function me(e){var t,a=e.geometry,s=a.attributes,o=s.position.values,u=n.defined(s.applyOffset)?s.applyOffset.values:void 0,p=a.indices,d=Q(a),y=Q(a),f=p.length,v=[];v.length=o.length/3;var c=[];for(c.length=o.length/3,t=0;t<v.length;++t)v[t]=-1,c[t]=-1;for(t=0;t<f;t+=2){var m=p[t],C=p[t+1],h=r.Cartesian3.fromArray(o,3*m,ne),b=r.Cartesian3.fromArray(o,3*C,ie);Math.abs(h.y)<i.CesiumMath.EPSILON6&&(h.y<0?h.y=-i.CesiumMath.EPSILON6:h.y=i.CesiumMath.EPSILON6),Math.abs(b.y)<i.CesiumMath.EPSILON6&&(b.y<0?b.y=-i.CesiumMath.EPSILON6:b.y=i.CesiumMath.EPSILON6);var g,A,T,x,P=d.attributes,w=d.indices,S=c,I=y.attributes,O=y.indices,E=v,N=l.IntersectionTests.lineSegmentPlane(h,b,ye,se);n.defined(N)?(g=r.Cartesian3.multiplyByScalar(r.Cartesian3.UNIT_Y,5*i.CesiumMath.EPSILON9,fe),h.y<0&&(r.Cartesian3.negate(g,g),P=y.attributes,w=y.indices,S=v,I=d.attributes,O=d.indices,E=c),A=r.Cartesian3.add(N,g,ve),ce(m,C,h,o,pe(P,w,S,p,t,h),P,u),ce(m,C,A,o,pe(P,w,S,p,-1,A),P,u),r.Cartesian3.negate(g,g),r.Cartesian3.add(N,g,A),ce(m,C,A,o,pe(I,O,E,p,-1,A),I,u),ce(m,C,b,o,pe(I,O,E,p,t+1,b),I,u)):(I=h.y<0?(T=y.attributes,x=y.indices,v):(T=d.attributes,x=d.indices,c),ce(m,C,h,o,pe(T,x,I,p,t,h),T,u),ce(m,C,b,o,pe(T,x,I,p,t+1,b),T,u))}$(e,y,d)}var Ce=new r.Cartesian2,he=new r.Cartesian2,be=new r.Cartesian3,ge=new r.Cartesian3,Ae=new r.Cartesian3,Te=new r.Cartesian3,xe=new r.Cartesian3,Pe=new r.Cartesian3,we=new s.Cartesian4;function Se(e){for(var t=(e=e.attributes).position.values,a=e.prevPosition.values,n=e.nextPosition.values,i=t.length,s=0;s<i;s+=3){var o,u=r.Cartesian3.unpack(t,s,be);0<u.x||(o=r.Cartesian3.unpack(a,s,ge),(u.y<0&&0<o.y||0<u.y&&o.y<0)&&(0<s-3?(a[s]=t[s-3],a[s+1]=t[s-2],a[s+2]=t[s-1]):r.Cartesian3.pack(u,a,s)),o=r.Cartesian3.unpack(n,s,Ae),(u.y<0&&0<o.y||0<u.y&&o.y<0)&&(s+3<i?(n[s]=t[s+3],n[s+1]=t[s+4],n[s+2]=t[s+5]):r.Cartesian3.pack(u,n,s)))}}var Ie=5*i.CesiumMath.EPSILON9,Oe=i.CesiumMath.EPSILON6;C.splitLongitude=function(e){var t=e.geometry,a=t.boundingSphere;if(n.defined(a)&&(0<a.center.x-a.radius||s.BoundingSphere.intersectPlane(a,y.Plane.ORIGIN_ZX_PLANE)!==s.Intersect.INTERSECTING))return e;if(t.geometryType!==p.GeometryType.NONE)switch(t.geometryType){case p.GeometryType.POLYLINES:!function(e){for(var t=e.geometry,a=t.attributes,o=a.position.values,u=a.prevPosition.values,p=a.nextPosition.values,d=a.expandAndWidth.values,y=n.defined(a.st)?a.st.values:void 0,f=n.defined(a.color)?a.color.values:void 0,v=Q(t),c=Q(t),m=!1,C=o.length/3,h=0;h<C;h+=4){var b=h,g=h+2,A=r.Cartesian3.fromArray(o,3*b,be),T=r.Cartesian3.fromArray(o,3*g,ge);if(Math.abs(A.y)<Oe)for(A.y=Oe*(T.y<0?-1:1),o[3*h+1]=A.y,o[3*(h+1)+1]=A.y,D=3*b;D<3*b+12;D+=3)u[D]=o[3*h],u[D+1]=o[3*h+1],u[D+2]=o[3*h+2];if(Math.abs(T.y)<Oe)for(T.y=Oe*(A.y<0?-1:1),o[3*(h+2)+1]=T.y,o[3*(h+3)+1]=T.y,D=3*b;D<3*b+12;D+=3)p[D]=o[3*(h+2)],p[D+1]=o[3*(h+2)+1],p[D+2]=o[3*(h+2)+2];var x=v.attributes,P=v.indices,w=c.attributes,S=c.indices,I=l.IntersectionTests.lineSegmentPlane(A,T,ye,Te);if(n.defined(I)){m=!0;var O=r.Cartesian3.multiplyByScalar(r.Cartesian3.UNIT_Y,Ie,xe);A.y<0&&(r.Cartesian3.negate(O,O),x=c.attributes,P=c.indices,w=v.attributes,S=v.indices);var E=r.Cartesian3.add(I,O,Pe);x.position.values.push(A.x,A.y,A.z,A.x,A.y,A.z),x.position.values.push(E.x,E.y,E.z),x.position.values.push(E.x,E.y,E.z),x.prevPosition.values.push(u[3*b],u[3*b+1],u[3*b+2]),x.prevPosition.values.push(u[3*b+3],u[3*b+4],u[3*b+5]),x.prevPosition.values.push(A.x,A.y,A.z,A.x,A.y,A.z),x.nextPosition.values.push(E.x,E.y,E.z),x.nextPosition.values.push(E.x,E.y,E.z),x.nextPosition.values.push(E.x,E.y,E.z),x.nextPosition.values.push(E.x,E.y,E.z),r.Cartesian3.negate(O,O),r.Cartesian3.add(I,O,E),w.position.values.push(E.x,E.y,E.z),w.position.values.push(E.x,E.y,E.z),w.position.values.push(T.x,T.y,T.z,T.x,T.y,T.z),w.prevPosition.values.push(E.x,E.y,E.z),w.prevPosition.values.push(E.x,E.y,E.z),w.prevPosition.values.push(E.x,E.y,E.z),w.prevPosition.values.push(E.x,E.y,E.z),w.nextPosition.values.push(T.x,T.y,T.z,T.x,T.y,T.z),w.nextPosition.values.push(p[3*g],p[3*g+1],p[3*g+2]),w.nextPosition.values.push(p[3*g+3],p[3*g+4],p[3*g+5]);var N=r.Cartesian2.fromArray(d,2*b,Ce),L=Math.abs(N.y);if(x.expandAndWidth.values.push(-1,L,1,L),x.expandAndWidth.values.push(-1,-L,1,-L),w.expandAndWidth.values.push(-1,L,1,L),w.expandAndWidth.values.push(-1,-L,1,-L),O=r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(I,A,Ae)),O/=r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(T,A,Ae)),n.defined(f)){E=s.Cartesian4.fromArray(f,4*b,we);for(var z=s.Cartesian4.fromArray(f,4*g,we),D=(N=i.CesiumMath.lerp(E.x,z.x,O),L=i.CesiumMath.lerp(E.y,z.y,O),I=i.CesiumMath.lerp(E.z,z.z,O),z=i.CesiumMath.lerp(E.w,z.w,O),4*b);D<4*b+8;++D)x.color.values.push(f[D]);for(x.color.values.push(N,L,I,z),x.color.values.push(N,L,I,z),w.color.values.push(N,L,I,z),w.color.values.push(N,L,I,z),D=4*g;D<4*g+8;++D)w.color.values.push(f[D])}if(n.defined(y)){z=r.Cartesian2.fromArray(y,2*b,Ce);var M=r.Cartesian2.fromArray(y,2*(h+3),he);O=i.CesiumMath.lerp(z.x,M.x,O);for(D=2*b;D<2*b+4;++D)x.st.values.push(y[D]);for(x.st.values.push(O,z.y),x.st.values.push(O,M.y),w.st.values.push(O,z.y),w.st.values.push(O,M.y),D=2*g;D<2*g+4;++D)w.st.values.push(y[D])}M=x.position.values.length/3-4,P.push(M,M+2,M+1),P.push(M+1,M+2,M+3),M=w.position.values.length/3-4,S.push(M,M+2,M+1),S.push(M+1,M+2,M+3)}else{var G;S=A.y<0?(G=c.attributes,c.indices):(G=v.attributes,v.indices);for(G.position.values.push(A.x,A.y,A.z),G.position.values.push(A.x,A.y,A.z),G.position.values.push(T.x,T.y,T.z),G.position.values.push(T.x,T.y,T.z),D=3*h;D<3*h+12;++D)G.prevPosition.values.push(u[D]),G.nextPosition.values.push(p[D]);for(D=2*h;D<2*h+8;++D)G.expandAndWidth.values.push(d[D]),n.defined(y)&&G.st.values.push(y[D]);if(n.defined(f))for(D=4*h;D<4*h+16;++D)G.color.values.push(f[D]);M=G.position.values.length/3-4,S.push(M,M+2,M+1),S.push(M+1,M+2,M+3)}}m&&(Se(c),Se(v)),$(e,c,v)}(e);break;case p.GeometryType.TRIANGLES:le(e);break;case p.GeometryType.LINES:me(e)}else(function(e){switch(e.primitiveType){case p.PrimitiveType.TRIANGLE_FAN:return function(e){var t=p.Geometry.computeNumberOfVertices(e),r=d.IndexDatatype.createTypedArray(t,3*(t-2));r[0]=1,r[1]=0,r[2]=2;for(var a=3,n=3;n<t;++n)r[a++]=n-1,r[a++]=0,r[a++]=n;return e.indices=r,e.primitiveType=p.PrimitiveType.TRIANGLES,e}(e);case p.PrimitiveType.TRIANGLE_STRIP:return function(e){var t=p.Geometry.computeNumberOfVertices(e),r=d.IndexDatatype.createTypedArray(t,3*(t-2));r[0]=0,r[1]=1,r[2]=2,3<t&&(r[3]=0,r[4]=2,r[5]=3);for(var a=6,n=3;n<t-1;n+=2)r[a++]=n,r[a++]=n-1,r[a++]=n+1,n+2<t&&(r[a++]=n,r[a++]=n+1,r[a++]=n+2);return e.indices=r,e.primitiveType=p.PrimitiveType.TRIANGLES,e}(e);case p.PrimitiveType.TRIANGLES:return function(e){if(n.defined(e.indices))return e;for(var t=p.Geometry.computeNumberOfVertices(e),r=d.IndexDatatype.createTypedArray(t,t),a=0;a<t;++a)r[a]=a;return e.indices=r,e}(e);case p.PrimitiveType.LINE_STRIP:return function(e){var t=p.Geometry.computeNumberOfVertices(e),r=d.IndexDatatype.createTypedArray(t,2*(t-1));r[0]=0,r[1]=1;for(var a=2,n=2;n<t;++n)r[a++]=n-1,r[a++]=n;return e.indices=r,e.primitiveType=p.PrimitiveType.LINES,e}(e);case p.PrimitiveType.LINE_LOOP:return function(e){var t=p.Geometry.computeNumberOfVertices(e),r=d.IndexDatatype.createTypedArray(t,2*t);r[0]=0,r[1]=1;for(var a=2,n=2;n<t;++n)r[a++]=n-1,r[a++]=n;return r[a++]=t-1,r[a]=0,e.indices=r,e.primitiveType=p.PrimitiveType.LINES,e}(e);case p.PrimitiveType.LINES:return function(e){if(n.defined(e.indices))return e;for(var t=p.Geometry.computeNumberOfVertices(e),r=d.IndexDatatype.createTypedArray(t,t),a=0;a<t;++a)r[a]=a;return e.indices=r,e}(e)}})(t),t.primitiveType===p.PrimitiveType.TRIANGLES?le(e):t.primitiveType===p.PrimitiveType.LINES&&me(e);return e},e.GeometryPipeline=C}));
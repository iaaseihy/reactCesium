function quickselect(t,i,e,n,r){quickselectStep(t,i,e||0,n||t.length-1,r||defaultCompare)}function quickselectStep(t,i,e,n,r){for(;n>e;){if(n-e>600){var a=n-e+1,o=i-e+1,h=Math.log(a),s=.5*Math.exp(2*h/3),c=.5*Math.sqrt(h*s*(a-s)/a)*(o-a/2<0?-1:1);quickselectStep(t,i,Math.max(e,Math.floor(i-o*s/a+c)),Math.min(n,Math.floor(i+(a-o)*s/a+c)),r)}var l=t[i],u=e,m=n;for(swap(t,e,i),r(t[n],l)>0&&swap(t,e,n);u<m;){for(swap(t,u,m),u++,m--;r(t[u],l)<0;)u++;for(;r(t[m],l)>0;)m--}0===r(t[e],l)?swap(t,e,m):swap(t,++m,n),m<=i&&(e=m+1),i<=m&&(n=m-1)}}function swap(t,i,e){var n=t[i];t[i]=t[e],t[e]=n}function defaultCompare(t,i){return t<i?-1:t>i?1:0}function RBush(t){void 0===t&&(t=9),this._maxEntries=Math.max(4,t),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),this.clear()}function findItem(t,i,e){if(!e)return i.indexOf(t);for(var n=0;n<i.length;n++)if(e(t,i[n]))return n;return-1}function calcBBox(t,i){distBBox(t,0,t.children.length,i,t)}function distBBox(t,i,e,n,r){r||(r=createNode(null)),r.minX=1/0,r.minY=1/0,r.maxX=-1/0,r.maxY=-1/0;for(var a=i;a<e;a++){var o=t.children[a];extend(r,t.leaf?n(o):o)}return r}function extend(t,i){return t.minX=Math.min(t.minX,i.minX),t.minY=Math.min(t.minY,i.minY),t.maxX=Math.max(t.maxX,i.maxX),t.maxY=Math.max(t.maxY,i.maxY),t}function compareNodeMinX(t,i){return t.minX-i.minX}function compareNodeMinY(t,i){return t.minY-i.minY}function bboxArea(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function bboxMargin(t){return t.maxX-t.minX+(t.maxY-t.minY)}function enlargedArea(t,i){return(Math.max(i.maxX,t.maxX)-Math.min(i.minX,t.minX))*(Math.max(i.maxY,t.maxY)-Math.min(i.minY,t.minY))}function intersectionArea(t,i){var e=Math.max(t.minX,i.minX),n=Math.max(t.minY,i.minY),r=Math.min(t.maxX,i.maxX),a=Math.min(t.maxY,i.maxY);return Math.max(0,r-e)*Math.max(0,a-n)}function contains(t,i){return t.minX<=i.minX&&t.minY<=i.minY&&i.maxX<=t.maxX&&i.maxY<=t.maxY}function intersects(t,i){return i.minX<=t.maxX&&i.minY<=t.maxY&&i.maxX>=t.minX&&i.maxY>=t.minY}function createNode(t){return{children:t,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function multiSelect(t,i,e,n,r){for(var a=[i,e];a.length;)if(!((e=a.pop())-(i=a.pop())<=n)){var o=i+Math.ceil((e-i)/n/2)*n;quickselect(t,o,i,e,r),a.push(i,o,o,e)}}RBush.prototype.all=function(){return this._all(this.data,[])},RBush.prototype.search=function(t){var i=this.data,e=[];if(!intersects(t,i))return e;for(var n=this.toBBox,r=[];i;){for(var a=0;a<i.children.length;a++){var o=i.children[a],h=i.leaf?n(o):o;intersects(t,h)&&(i.leaf?e.push(o):contains(t,h)?this._all(o,e):r.push(o))}i=r.pop()}return e},RBush.prototype.collides=function(t){var i=this.data;if(!intersects(t,i))return!1;for(var e=[];i;){for(var n=0;n<i.children.length;n++){var r=i.children[n],a=i.leaf?this.toBBox(r):r;if(intersects(t,a)){if(i.leaf||contains(t,a))return!0;e.push(r)}}i=e.pop()}return!1},RBush.prototype.load=function(t){if(!t||!t.length)return this;if(t.length<this._minEntries){for(var i=0;i<t.length;i++)this.insert(t[i]);return this}var e=this._build(t.slice(),0,t.length-1,0);if(this.data.children.length)if(this.data.height===e.height)this._splitRoot(this.data,e);else{if(this.data.height<e.height){var n=this.data;this.data=e,e=n}this._insert(e,this.data.height-e.height-1,!0)}else this.data=e;return this},RBush.prototype.insert=function(t){return t&&this._insert(t,this.data.height-1),this},RBush.prototype.clear=function(){return this.data=createNode([]),this},RBush.prototype.remove=function(t,i){if(!t)return this;for(var e,n,r,a=this.data,o=this.toBBox(t),h=[],s=[];a||h.length;){if(a||(a=h.pop(),n=h[h.length-1],e=s.pop(),r=!0),a.leaf){var c=findItem(t,a.children,i);if(-1!==c)return a.children.splice(c,1),h.push(a),this._condense(h),this}r||a.leaf||!contains(a,o)?n?(e++,a=n.children[e],r=!1):a=null:(h.push(a),s.push(e),e=0,n=a,a=a.children[0])}return this},RBush.prototype.toBBox=function(t){return t},RBush.prototype.compareMinX=function(t,i){return t.minX-i.minX},RBush.prototype.compareMinY=function(t,i){return t.minY-i.minY},RBush.prototype.toJSON=function(){return this.data},RBush.prototype.fromJSON=function(t){return this.data=t,this},RBush.prototype._all=function(t,i){for(var e=[];t;)t.leaf?i.push.apply(i,t.children):e.push.apply(e,t.children),t=e.pop();return i},RBush.prototype._build=function(t,i,e,n){var r,a=e-i+1,o=this._maxEntries;if(a<=o)return calcBBox(r=createNode(t.slice(i,e+1)),this.toBBox),r;n||(n=Math.ceil(Math.log(a)/Math.log(o)),o=Math.ceil(a/Math.pow(o,n-1))),(r=createNode([])).leaf=!1,r.height=n;var h=Math.ceil(a/o),s=h*Math.ceil(Math.sqrt(o));multiSelect(t,i,e,s,this.compareMinX);for(var c=i;c<=e;c+=s){var l=Math.min(c+s-1,e);multiSelect(t,c,l,h,this.compareMinY);for(var u=c;u<=l;u+=h){var m=Math.min(u+h-1,l);r.children.push(this._build(t,u,m,n-1))}}return calcBBox(r,this.toBBox),r},RBush.prototype._chooseSubtree=function(t,i,e,n){for(;n.push(i),!i.leaf&&n.length-1!==e;){for(var r=1/0,a=1/0,o=void 0,h=0;h<i.children.length;h++){var s=i.children[h],c=bboxArea(s),l=enlargedArea(t,s)-c;l<a?(a=l,r=c<r?c:r,o=s):l===a&&c<r&&(r=c,o=s)}i=o||i.children[0]}return i},RBush.prototype._insert=function(t,i,e){var n=e?t:this.toBBox(t),r=[],a=this._chooseSubtree(n,this.data,i,r);for(a.children.push(t),extend(a,n);i>=0&&r[i].children.length>this._maxEntries;)this._split(r,i),i--;this._adjustParentBBoxes(n,r,i)},RBush.prototype._split=function(t,i){var e=t[i],n=e.children.length,r=this._minEntries;this._chooseSplitAxis(e,r,n);var a=this._chooseSplitIndex(e,r,n),o=createNode(e.children.splice(a,e.children.length-a));o.height=e.height,o.leaf=e.leaf,calcBBox(e,this.toBBox),calcBBox(o,this.toBBox),i?t[i-1].children.push(o):this._splitRoot(e,o)},RBush.prototype._splitRoot=function(t,i){this.data=createNode([t,i]),this.data.height=t.height+1,this.data.leaf=!1,calcBBox(this.data,this.toBBox)},RBush.prototype._chooseSplitIndex=function(t,i,e){for(var n,r=1/0,a=1/0,o=i;o<=e-i;o++){var h=distBBox(t,0,o,this.toBBox),s=distBBox(t,o,e,this.toBBox),c=intersectionArea(h,s),l=bboxArea(h)+bboxArea(s);c<r?(r=c,n=o,a=l<a?l:a):c===r&&l<a&&(a=l,n=o)}return n||e-i},RBush.prototype._chooseSplitAxis=function(t,i,e){var n=t.leaf?this.compareMinX:compareNodeMinX,r=t.leaf?this.compareMinY:compareNodeMinY;this._allDistMargin(t,i,e,n)<this._allDistMargin(t,i,e,r)&&t.children.sort(n)},RBush.prototype._allDistMargin=function(t,i,e,n){t.children.sort(n);for(var r=this.toBBox,a=distBBox(t,0,i,r),o=distBBox(t,e-i,e,r),h=bboxMargin(a)+bboxMargin(o),s=i;s<e-i;s++){var c=t.children[s];extend(a,t.leaf?r(c):c),h+=bboxMargin(a)}for(var l=e-i-1;l>=i;l--){var u=t.children[l];extend(o,t.leaf?r(u):u),h+=bboxMargin(o)}return h},RBush.prototype._adjustParentBBoxes=function(t,i,e){for(var n=e;n>=0;n--)extend(i[n],t)},RBush.prototype._condense=function(t){for(var i=t.length-1,e=void 0;i>=0;i--)0===t[i].children.length?i>0?(e=t[i-1].children).splice(e.indexOf(t[i]),1):this.clear():calcBBox(t[i],this.toBBox)};export default RBush;
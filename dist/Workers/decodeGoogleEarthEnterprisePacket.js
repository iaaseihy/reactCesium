define(["./Check-d18af7c4","./RuntimeError-7f634f5d","./when-208fe5b0","./createTaskProcessorWorker"],(function(e,t,i,n){"use strict";function r(e,i){if(r.passThroughDataForTesting)return i;var n=e.byteLength;if(0===n||n%4!=0)throw new t.RuntimeError("The length of key must be greater than 0 and a multiple of 4.");var a=new DataView(i),o=a.getUint32(0,!0);if(1953029805===o||2917034100===o)return i;for(var s,f=new DataView(e),l=0,u=i.byteLength,d=u-u%8,h=n,c=8;l<d;)for(s=c=(c+8)%24;l<d&&s<h;)a.setUint32(l,a.getUint32(l,!0)^f.getUint32(s,!0),!0),a.setUint32(l+4,a.getUint32(l+4,!0)^f.getUint32(s+4,!0),!0),l+=8,s+=24;if(l<u)for(h<=s&&(s=c=(c+8)%24);l<u;)a.setUint8(l,a.getUint8(l)^f.getUint8(s)),l++,s++}function a(e,t){return 0!=(e&t)}r.passThroughDataForTesting=!1;var o=[1,2,4,8];function s(e,t,i,n,r,a){this._bits=e,this.cnodeVersion=t,this.imageryVersion=i,this.terrainVersion=n,this.imageryProvider=r,this.terrainProvider=a,this.ancestorHasTerrain=!1,this.terrainState=void 0}s.clone=function(e,t){return i.defined(t)?(t._bits=e._bits,t.cnodeVersion=e.cnodeVersion,t.imageryVersion=e.imageryVersion,t.terrainVersion=e.terrainVersion,t.imageryProvider=e.imageryProvider,t.terrainProvider=e.terrainProvider):t=new s(e._bits,e.cnodeVersion,e.imageryVersion,e.terrainVersion,e.imageryProvider,e.terrainProvider),t.ancestorHasTerrain=e.ancestorHasTerrain,t.terrainState=e.terrainState,t},s.prototype.setParent=function(e){this.ancestorHasTerrain=e.ancestorHasTerrain||this.hasTerrain()},s.prototype.hasSubtree=function(){return a(this._bits,16)},s.prototype.hasImagery=function(){return a(this._bits,64)},s.prototype.hasTerrain=function(){return a(this._bits,128)},s.prototype.hasChildren=function(){return a(this._bits,15)},s.prototype.hasChild=function(e){return a(this._bits,o[e])},s.prototype.getChildBitmask=function(){return 15&this._bits};var f=function e(t,i,n){function r(o,s){if(!i[o]){if(!t[o]){var f="function"==typeof require&&require;if(!s&&f)return f(o,!0);if(a)return a(o,!0);throw(f=new Error("Cannot find module '"+o+"'")).code="MODULE_NOT_FOUND",f}f=i[o]={exports:{}},t[o][0].call(f.exports,(function(e){return r(t[o][1][e]||e)}),f,f.exports,e,t,i,n)}return i[o].exports}for(var a="function"==typeof require&&require,o=0;o<n.length;o++)r(n[o]);return r}({1:[function(e,t,i){var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;i.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var i=t.shift();if(i){if("object"!=typeof i)throw new TypeError(i+"must be non-object");for(var n in i)i.hasOwnProperty(n)&&(e[n]=i[n])}}return e},i.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var r={arraySet:function(e,t,i,n,r){if(t.subarray&&e.subarray)e.set(t.subarray(i,i+n),r);else for(var a=0;a<n;a++)e[r+a]=t[i+a]},flattenChunks:function(e){for(var t,i,n,r=0,a=0,o=e.length;a<o;a++)r+=e[a].length;for(n=new Uint8Array(r),a=t=0,o=e.length;a<o;a++)i=e[a],n.set(i,t),t+=i.length;return n}},a={arraySet:function(e,t,i,n,r){for(var a=0;a<n;a++)e[r+a]=t[i+a]},flattenChunks:function(e){return[].concat.apply([],e)}};i.setTyped=function(e){e?(i.Buf8=Uint8Array,i.Buf16=Uint16Array,i.Buf32=Int32Array,i.assign(i,r)):(i.Buf8=Array,i.Buf16=Array,i.Buf32=Array,i.assign(i,a))},i.setTyped(n)},{}],2:[function(e,t,i){var n=e("./common"),r=!0,a=!0;try{String.fromCharCode.apply(null,[0])}catch(e){r=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){a=!1}for(var o=new n.Buf8(256),s=0;s<256;s++)o[s]=252<=s?6:248<=s?5:240<=s?4:224<=s?3:192<=s?2:1;function f(e,t){if(t<65537&&(e.subarray&&a||!e.subarray&&r))return String.fromCharCode.apply(null,n.shrinkBuf(e,t));for(var i="",o=0;o<t;o++)i+=String.fromCharCode(e[o]);return i}o[254]=o[254]=1,i.string2buf=function(e){for(var t,i,r,a,o=e.length,s=0,f=0;f<o;f++)55296==(64512&(i=e.charCodeAt(f)))&&f+1<o&&56320==(64512&(r=e.charCodeAt(f+1)))&&(i=65536+(i-55296<<10)+(r-56320),f++),s+=i<128?1:i<2048?2:i<65536?3:4;for(t=new n.Buf8(s),f=a=0;a<s;f++)55296==(64512&(i=e.charCodeAt(f)))&&f+1<o&&56320==(64512&(r=e.charCodeAt(f+1)))&&(i=65536+(i-55296<<10)+(r-56320),f++),i<128?t[a++]=i:(i<2048?t[a++]=192|i>>>6:(i<65536?t[a++]=224|i>>>12:(t[a++]=240|i>>>18,t[a++]=128|i>>>12&63),t[a++]=128|i>>>6&63),t[a++]=128|63&i);return t},i.buf2binstring=function(e){return f(e,e.length)},i.binstring2buf=function(e){for(var t=new n.Buf8(e.length),i=0,r=t.length;i<r;i++)t[i]=e.charCodeAt(i);return t},i.buf2string=function(e,t){for(var i,n,r=t||e.length,a=new Array(2*r),s=0,l=0;l<r;)if((i=e[l++])<128)a[s++]=i;else if(4<(n=o[i]))a[s++]=65533,l+=n-1;else{for(i&=2===n?31:3===n?15:7;1<n&&l<r;)i=i<<6|63&e[l++],n--;1<n?a[s++]=65533:i<65536?a[s++]=i:(i-=65536,a[s++]=55296|i>>10&1023,a[s++]=56320|1023&i)}return f(a,s)},i.utf8border=function(e,t){for(var i=(t=(t=t||e.length)>e.length?e.length:t)-1;0<=i&&128==(192&e[i]);)i--;return!(i<0)&&0!==i&&i+o[e[i]]>t?i:t}},{"./common":1}],3:[function(e,t,i){t.exports=function(e,t,i,n){for(var r=65535&e|0,a=e>>>16&65535|0,o=0;0!==i;){for(i-=o=2e3<i?2e3:i;a=a+(r=r+t[n++]|0)|0,--o;);r%=65521,a%=65521}return r|a<<16|0}},{}],4:[function(e,t,i){t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],5:[function(e,t,i){var n=function(){for(var e=[],t=0;t<256;t++){for(var i=t,n=0;n<8;n++)i=1&i?3988292384^i>>>1:i>>>1;e[t]=i}return e}();t.exports=function(e,t,i,r){var a=n,o=r+i;e^=-1;for(var s=r;s<o;s++)e=e>>>8^a[255&(e^t[s])];return-1^e}},{}],6:[function(e,t,i){t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],7:[function(e,t,i){t.exports=function(e,t){var i,n,r,a,o,s,f=e.state,l=e.next_in,u=e.input,d=l+(e.avail_in-5),h=e.next_out,c=e.output,b=h-(t-e.avail_out),m=h+(e.avail_out-257),w=f.dmax,g=f.wsize,k=f.whave,v=f.wnext,_=f.window,p=f.hold,y=f.bits,x=f.lencode,E=f.distcode,S=(1<<f.lenbits)-1,T=(1<<f.distbits)-1;e:do{y<15&&(p+=u[l++]<<y,y+=8,p+=u[l++]<<y,y+=8),i=x[p&S];t:for(;;){if(p>>>=n=i>>>24,y-=n,0===(n=i>>>16&255))c[h++]=65535&i;else{if(!(16&n)){if(0==(64&n)){i=x[(65535&i)+(p&(1<<n)-1)];continue t}if(32&n){f.mode=12;break e}e.msg="invalid literal/length code",f.mode=30;break e}r=65535&i,(n&=15)&&(y<n&&(p+=u[l++]<<y,y+=8),r+=p&(1<<n)-1,p>>>=n,y-=n),y<15&&(p+=u[l++]<<y,y+=8,p+=u[l++]<<y,y+=8),i=E[p&T];i:for(;;){if(p>>>=n=i>>>24,y-=n,!(16&(n=i>>>16&255))){if(0==(64&n)){i=E[(65535&i)+(p&(1<<n)-1)];continue i}e.msg="invalid distance code",f.mode=30;break e}if(a=65535&i,y<(n&=15)&&(p+=u[l++]<<y,(y+=8)<n&&(p+=u[l++]<<y,y+=8)),w<(a+=p&(1<<n)-1)){e.msg="invalid distance too far back",f.mode=30;break e}if(p>>>=n,y-=n,(n=h-b)<a){if(k<(n=a-n)&&f.sane){e.msg="invalid distance too far back",f.mode=30;break e}if(s=_,(o=0)===v){if(o+=g-n,n<r){for(r-=n;c[h++]=_[o++],--n;);o=h-a,s=c}}else if(v<n){if(o+=g+v-n,(n-=v)<r){for(r-=n;c[h++]=_[o++],--n;);if(o=0,v<r){for(r-=n=v;c[h++]=_[o++],--n;);o=h-a,s=c}}}else if(o+=v-n,n<r){for(r-=n;c[h++]=_[o++],--n;);o=h-a,s=c}for(;2<r;)c[h++]=s[o++],c[h++]=s[o++],c[h++]=s[o++],r-=3;r&&(c[h++]=s[o++],1<r&&(c[h++]=s[o++]))}else{for(o=h-a;c[h++]=c[o++],c[h++]=c[o++],c[h++]=c[o++],2<(r-=3););r&&(c[h++]=c[o++],1<r&&(c[h++]=c[o++]))}break}}break}}while(l<d&&h<m);l-=r=y>>3,p&=(1<<(y-=r<<3))-1,e.next_in=l,e.next_out=h,e.avail_in=l<d?d-l+5:5-(l-d),e.avail_out=h<m?m-h+257:257-(h-m),f.hold=p,f.bits=y}},{}],8:[function(e,t,i){var n=e("../utils/common"),r=e("./adler32"),a=e("./crc32"),o=e("./inffast"),s=e("./inftrees"),f=-2;function l(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function u(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new n.Buf16(320),this.work=new n.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function d(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=1,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new n.Buf32(852),t.distcode=t.distdyn=new n.Buf32(592),t.sane=1,t.back=-1,0):f}function h(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,d(e)):f}function c(e,t){var i,n;return e&&e.state?(n=e.state,t<0?(i=0,t=-t):(i=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?f:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=i,n.wbits=t,h(e))):f}function b(e,t){var i;return e?(i=new u,(e.state=i).window=null,0!==(t=c(e,t))&&(e.state=null),t):f}var m,w,g=!0;function k(e,t,i,r){var a=e.state;return null===a.window&&(a.wsize=1<<a.wbits,a.wnext=0,a.whave=0,a.window=new n.Buf8(a.wsize)),r>=a.wsize?(n.arraySet(a.window,t,i-a.wsize,a.wsize,0),a.wnext=0,a.whave=a.wsize):(r<(e=a.wsize-a.wnext)&&(e=r),n.arraySet(a.window,t,i-r,e,a.wnext),(r-=e)?(n.arraySet(a.window,t,i-r,r,0),a.wnext=r,a.whave=a.wsize):(a.wnext+=e,a.wnext===a.wsize&&(a.wnext=0),a.whave<a.wsize&&(a.whave+=e))),0}i.inflateReset=h,i.inflateReset2=c,i.inflateResetKeep=d,i.inflateInit=function(e){return b(e,15)},i.inflateInit2=b,i.inflate=function(e,t){var i,u,d,h,c,b,v,_,p,y,x,E,S,T,R,A,B,U,Z,I,D,N,O,z,C=0,F=new n.Buf8(4),L=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return f;12===(i=e.state).mode&&(i.mode=13),c=e.next_out,d=e.output,v=e.avail_out,h=e.next_in,u=e.input,b=e.avail_in,_=i.hold,p=i.bits,y=b,x=v,N=0;e:for(;;)switch(i.mode){case 1:if(0===i.wrap){i.mode=13;break}for(;p<16;){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}if(2&i.wrap&&35615===_){F[i.check=0]=255&_,F[1]=_>>>8&255,i.check=a(i.check,F,2,0),p=_=0,i.mode=2;break}if(i.flags=0,i.head&&(i.head.done=!1),!(1&i.wrap)||(((255&_)<<8)+(_>>8))%31){e.msg="incorrect header check",i.mode=30;break}if(8!=(15&_)){e.msg="unknown compression method",i.mode=30;break}if(p-=4,D=8+(15&(_>>>=4)),0===i.wbits)i.wbits=D;else if(D>i.wbits){e.msg="invalid window size",i.mode=30;break}i.dmax=1<<D,e.adler=i.check=1,i.mode=512&_?10:12,p=_=0;break;case 2:for(;p<16;){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}if(i.flags=_,8!=(255&i.flags)){e.msg="unknown compression method",i.mode=30;break}if(57344&i.flags){e.msg="unknown header flags set",i.mode=30;break}i.head&&(i.head.text=_>>8&1),512&i.flags&&(F[0]=255&_,F[1]=_>>>8&255,i.check=a(i.check,F,2,0)),p=_=0,i.mode=3;case 3:for(;p<32;){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}i.head&&(i.head.time=_),512&i.flags&&(F[0]=255&_,F[1]=_>>>8&255,F[2]=_>>>16&255,F[3]=_>>>24&255,i.check=a(i.check,F,4,0)),p=_=0,i.mode=4;case 4:for(;p<16;){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}i.head&&(i.head.xflags=255&_,i.head.os=_>>8),512&i.flags&&(F[0]=255&_,F[1]=_>>>8&255,i.check=a(i.check,F,2,0)),p=_=0,i.mode=5;case 5:if(1024&i.flags){for(;p<16;){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}i.length=_,i.head&&(i.head.extra_len=_),512&i.flags&&(F[0]=255&_,F[1]=_>>>8&255,i.check=a(i.check,F,2,0)),p=_=0}else i.head&&(i.head.extra=null);i.mode=6;case 6:if(1024&i.flags&&((E=b<(E=i.length)?b:E)&&(i.head&&(D=i.head.extra_len-i.length,i.head.extra||(i.head.extra=new Array(i.head.extra_len)),n.arraySet(i.head.extra,u,h,E,D)),512&i.flags&&(i.check=a(i.check,u,E,h)),b-=E,h+=E,i.length-=E),i.length))break e;i.length=0,i.mode=7;case 7:if(2048&i.flags){if(0===b)break e;for(E=0;D=u[h+E++],i.head&&D&&i.length<65536&&(i.head.name+=String.fromCharCode(D)),D&&E<b;);if(512&i.flags&&(i.check=a(i.check,u,E,h)),b-=E,h+=E,D)break e}else i.head&&(i.head.name=null);i.length=0,i.mode=8;case 8:if(4096&i.flags){if(0===b)break e;for(E=0;D=u[h+E++],i.head&&D&&i.length<65536&&(i.head.comment+=String.fromCharCode(D)),D&&E<b;);if(512&i.flags&&(i.check=a(i.check,u,E,h)),b-=E,h+=E,D)break e}else i.head&&(i.head.comment=null);i.mode=9;case 9:if(512&i.flags){for(;p<16;){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}if(_!==(65535&i.check)){e.msg="header crc mismatch",i.mode=30;break}p=_=0}i.head&&(i.head.hcrc=i.flags>>9&1,i.head.done=!0),e.adler=i.check=0,i.mode=12;break;case 10:for(;p<32;){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}e.adler=i.check=l(_),p=_=0,i.mode=11;case 11:if(0===i.havedict)return e.next_out=c,e.avail_out=v,e.next_in=h,e.avail_in=b,i.hold=_,i.bits=p,2;e.adler=i.check=1,i.mode=12;case 12:if(5===t||6===t)break e;case 13:if(i.last){_>>>=7&p,p-=7&p,i.mode=27;break}for(;p<3;){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}switch(i.last=1&_,--p,3&(_>>>=1)){case 0:i.mode=14;break;case 1:if(function(e){if(g){var t;for(m=new n.Buf32(512),w=new n.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(s(1,e.lens,0,288,m,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;s(2,e.lens,0,32,w,0,e.work,{bits:5}),g=!1}e.lencode=m,e.lenbits=9,e.distcode=w,e.distbits=5}(i),i.mode=20,6!==t)break;_>>>=2,p-=2;break e;case 2:i.mode=17;break;case 3:e.msg="invalid block type",i.mode=30}_>>>=2,p-=2;break;case 14:for(_>>>=7&p,p-=7&p;p<32;){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}if((65535&_)!=(_>>>16^65535)){e.msg="invalid stored block lengths",i.mode=30;break}if(i.length=65535&_,p=_=0,i.mode=15,6===t)break e;case 15:i.mode=16;case 16:if(E=i.length){if(0===(E=v<(E=b<E?b:E)?v:E))break e;n.arraySet(d,u,h,E,c),b-=E,h+=E,v-=E,c+=E,i.length-=E;break}i.mode=12;break;case 17:for(;p<14;){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}if(i.nlen=257+(31&_),_>>>=5,p-=5,i.ndist=1+(31&_),_>>>=5,p-=5,i.ncode=4+(15&_),_>>>=4,p-=4,286<i.nlen||30<i.ndist){e.msg="too many length or distance symbols",i.mode=30;break}i.have=0,i.mode=18;case 18:for(;i.have<i.ncode;){for(;p<3;){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}i.lens[L[i.have++]]=7&_,_>>>=3,p-=3}for(;i.have<19;)i.lens[L[i.have++]]=0;if(i.lencode=i.lendyn,i.lenbits=7,O={bits:i.lenbits},N=s(0,i.lens,0,19,i.lencode,0,i.work,O),i.lenbits=O.bits,N){e.msg="invalid code lengths set",i.mode=30;break}i.have=0,i.mode=19;case 19:for(;i.have<i.nlen+i.ndist;){for(;A=(C=i.lencode[_&(1<<i.lenbits)-1])>>>16&255,B=65535&C,!((R=C>>>24)<=p);){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}if(B<16)_>>>=R,p-=R,i.lens[i.have++]=B;else{if(16===B){for(z=R+2;p<z;){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}if(_>>>=R,p-=R,0===i.have){e.msg="invalid bit length repeat",i.mode=30;break}D=i.lens[i.have-1],E=3+(3&_),_>>>=2,p-=2}else if(17===B){for(z=R+3;p<z;){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}p-=R,D=0,E=3+(7&(_>>>=R)),_>>>=3,p-=3}else{for(z=R+7;p<z;){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}p-=R,D=0,E=11+(127&(_>>>=R)),_>>>=7,p-=7}if(i.have+E>i.nlen+i.ndist){e.msg="invalid bit length repeat",i.mode=30;break}for(;E--;)i.lens[i.have++]=D}}if(30===i.mode)break;if(0===i.lens[256]){e.msg="invalid code -- missing end-of-block",i.mode=30;break}if(i.lenbits=9,O={bits:i.lenbits},N=s(1,i.lens,0,i.nlen,i.lencode,0,i.work,O),i.lenbits=O.bits,N){e.msg="invalid literal/lengths set",i.mode=30;break}if(i.distbits=6,i.distcode=i.distdyn,O={bits:i.distbits},N=s(2,i.lens,i.nlen,i.ndist,i.distcode,0,i.work,O),i.distbits=O.bits,N){e.msg="invalid distances set",i.mode=30;break}if(i.mode=20,6===t)break e;case 20:i.mode=21;case 21:if(6<=b&&258<=v){e.next_out=c,e.avail_out=v,e.next_in=h,e.avail_in=b,i.hold=_,i.bits=p,o(e,x),c=e.next_out,d=e.output,v=e.avail_out,h=e.next_in,u=e.input,b=e.avail_in,_=i.hold,p=i.bits,12===i.mode&&(i.back=-1);break}for(i.back=0;A=(C=i.lencode[_&(1<<i.lenbits)-1])>>>16&255,B=65535&C,!((R=C>>>24)<=p);){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}if(A&&0==(240&A)){for(U=R,Z=A,I=B;A=(C=i.lencode[I+((_&(1<<U+Z)-1)>>U)])>>>16&255,B=65535&C,!(U+(R=C>>>24)<=p);){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}_>>>=U,p-=U,i.back+=U}if(_>>>=R,p-=R,i.back+=R,i.length=B,0===A){i.mode=26;break}if(32&A){i.back=-1,i.mode=12;break}if(64&A){e.msg="invalid literal/length code",i.mode=30;break}i.extra=15&A,i.mode=22;case 22:if(i.extra){for(z=i.extra;p<z;){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}i.length+=_&(1<<i.extra)-1,_>>>=i.extra,p-=i.extra,i.back+=i.extra}i.was=i.length,i.mode=23;case 23:for(;A=(C=i.distcode[_&(1<<i.distbits)-1])>>>16&255,B=65535&C,!((R=C>>>24)<=p);){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}if(0==(240&A)){for(U=R,Z=A,I=B;A=(C=i.distcode[I+((_&(1<<U+Z)-1)>>U)])>>>16&255,B=65535&C,!(U+(R=C>>>24)<=p);){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}_>>>=U,p-=U,i.back+=U}if(_>>>=R,p-=R,i.back+=R,64&A){e.msg="invalid distance code",i.mode=30;break}i.offset=B,i.extra=15&A,i.mode=24;case 24:if(i.extra){for(z=i.extra;p<z;){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}i.offset+=_&(1<<i.extra)-1,_>>>=i.extra,p-=i.extra,i.back+=i.extra}if(i.offset>i.dmax){e.msg="invalid distance too far back",i.mode=30;break}i.mode=25;case 25:if(0===v)break e;if(E=x-v,i.offset>E){if((E=i.offset-E)>i.whave&&i.sane){e.msg="invalid distance too far back",i.mode=30;break}S=E>i.wnext?(E-=i.wnext,i.wsize-E):i.wnext-E,E>i.length&&(E=i.length),T=i.window}else T=d,S=c-i.offset,E=i.length;for(v<E&&(E=v),v-=E,i.length-=E;d[c++]=T[S++],--E;);0===i.length&&(i.mode=21);break;case 26:if(0===v)break e;d[c++]=i.length,v--,i.mode=21;break;case 27:if(i.wrap){for(;p<32;){if(0===b)break e;b--,_|=u[h++]<<p,p+=8}if(x-=v,e.total_out+=x,i.total+=x,x&&(e.adler=i.check=(i.flags?a:r)(i.check,d,x,c-x)),x=v,(i.flags?_:l(_))!==i.check){e.msg="incorrect data check",i.mode=30;break}p=_=0}i.mode=28;case 28:if(i.wrap&&i.flags){for(;p<32;){if(0===b)break e;b--,_+=u[h++]<<p,p+=8}if(_!==(4294967295&i.total)){e.msg="incorrect length check",i.mode=30;break}p=_=0}i.mode=29;case 29:N=1;break e;case 30:N=-3;break e;case 31:return-4;default:return f}return e.next_out=c,e.avail_out=v,e.next_in=h,e.avail_in=b,i.hold=_,i.bits=p,(i.wsize||x!==e.avail_out&&i.mode<30&&(i.mode<27||4!==t))&&k(e,e.output,e.next_out,x-e.avail_out),y-=e.avail_in,x-=e.avail_out,e.total_in+=y,e.total_out+=x,i.total+=x,i.wrap&&x&&(e.adler=i.check=(i.flags?a:r)(i.check,d,x,e.next_out-x)),e.data_type=i.bits+(i.last?64:0)+(12===i.mode?128:0)+(20===i.mode||15===i.mode?256:0),(0==y&&0===x||4===t)&&0===N?-5:N},i.inflateEnd=function(e){if(!e||!e.state)return f;var t=e.state;return t.window&&(t.window=null),e.state=null,0},i.inflateGetHeader=function(e,t){return e&&e.state&&0!=(2&(e=e.state).wrap)?((e.head=t).done=!1,0):f},i.inflateSetDictionary=function(e,t){var i,n=t.length;return!e||!e.state||0!==(i=e.state).wrap&&11!==i.mode?f:11===i.mode&&r(1,t,n,0)!==i.check?-3:k(e,t,n,n)?(i.mode=31,-4):(i.havedict=1,0)},i.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":1,"./adler32":3,"./crc32":5,"./inffast":7,"./inftrees":9}],9:[function(e,t,i){var n=e("../utils/common"),r=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],a=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],o=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],s=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,i,f,l,u,d,h){var c,b,m,w,g,k,v,_,p,y=h.bits,x=0,E=0,S=0,T=0,R=0,A=0,B=0,U=0,Z=0,I=0,D=null,N=0,O=new n.Buf16(16),z=new n.Buf16(16),C=null,F=0;for(x=0;x<=15;x++)O[x]=0;for(E=0;E<f;E++)O[t[i+E]]++;for(R=y,T=15;1<=T&&0===O[T];T--);if(T<R&&(R=T),0===T)return l[u++]=20971520,l[u++]=20971520,h.bits=1,0;for(S=1;S<T&&0===O[S];S++);for(R<S&&(R=S),x=U=1;x<=15;x++)if(U<<=1,(U-=O[x])<0)return-1;if(0<U&&(0===e||1!==T))return-1;for(z[1]=0,x=1;x<15;x++)z[x+1]=z[x]+O[x];for(E=0;E<f;E++)0!==t[i+E]&&(d[z[t[i+E]]++]=E);if(k=0===e?(D=C=d,19):1===e?(D=r,N-=257,C=a,F-=257,256):(D=o,C=s,-1),x=S,g=u,B=E=I=0,m=-1,w=(Z=1<<(A=R))-1,1===e&&852<Z||2===e&&592<Z)return 1;for(;;){for(v=x-B,p=d[E]<k?(_=0,d[E]):d[E]>k?(_=C[F+d[E]],D[N+d[E]]):(_=96,0),c=1<<x-B,S=b=1<<A;l[g+(I>>B)+(b-=c)]=v<<24|_<<16|p|0,0!==b;);for(c=1<<x-1;I&c;)c>>=1;if(0!==c?(I&=c-1,I+=c):I=0,E++,0==--O[x]){if(x===T)break;x=t[i+d[E]]}if(R<x&&(I&w)!==m){for(g+=S,U=1<<(A=x-(B=0===B?R:B));A+B<T&&!((U-=O[A+B])<=0);)A++,U<<=1;if(Z+=1<<A,1===e&&852<Z||2===e&&592<Z)return 1;l[m=I&w]=R<<24|A<<16|g-u|0}}return 0!==I&&(l[g+I]=x-B<<24|64<<16|0),h.bits=R,0}},{"../utils/common":1}],10:[function(e,t,i){t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],11:[function(e,t,i){t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],"/lib/inflate.js":[function(e,t,i){var n=e("./zlib/inflate"),r=e("./utils/common"),a=e("./utils/strings"),o=e("./zlib/constants"),s=e("./zlib/messages"),f=e("./zlib/zstream"),l=e("./zlib/gzheader"),u=Object.prototype.toString;function d(e){if(!(this instanceof d))return new d(e);this.options=r.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;if(t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new f,this.strm.avail_out=0,(t=n.inflateInit2(this.strm,t.windowBits))!==o.Z_OK)throw new Error(s[t]);this.header=new l,n.inflateGetHeader(this.strm,this.header)}function h(e,t){if((t=new d(t)).push(e,!0),t.err)throw t.msg||s[t.err];return t.result}d.prototype.push=function(e,t){var i,s,f,l,d,h=this.strm,c=this.options.chunkSize,b=this.options.dictionary,m=!1;if(this.ended)return!1;s=t===~~t?t:!0===t?o.Z_FINISH:o.Z_NO_FLUSH,"string"==typeof e?h.input=a.binstring2buf(e):"[object ArrayBuffer]"===u.call(e)?h.input=new Uint8Array(e):h.input=e,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new r.Buf8(c),h.next_out=0,h.avail_out=c),(i=n.inflate(h,o.Z_NO_FLUSH))===o.Z_NEED_DICT&&b&&(d="string"==typeof b?a.string2buf(b):"[object ArrayBuffer]"===u.call(b)?new Uint8Array(b):b,i=n.inflateSetDictionary(this.strm,d)),i===o.Z_BUF_ERROR&&!0===m&&(i=o.Z_OK,m=!1),i!==o.Z_STREAM_END&&i!==o.Z_OK)return this.onEnd(i),!(this.ended=!0)}while(h.next_out&&(0!==h.avail_out&&i!==o.Z_STREAM_END&&(0!==h.avail_in||s!==o.Z_FINISH&&s!==o.Z_SYNC_FLUSH)||("string"===this.options.to?(f=a.utf8border(h.output,h.next_out),l=h.next_out-f,d=a.buf2string(h.output,f),h.next_out=l,h.avail_out=c-l,l&&r.arraySet(h.output,h.output,f,l,0),this.onData(d)):this.onData(r.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(m=!0),(0<h.avail_in||0===h.avail_out)&&i!==o.Z_STREAM_END);return(s=i===o.Z_STREAM_END?o.Z_FINISH:s)===o.Z_FINISH?(i=n.inflateEnd(this.strm),this.onEnd(i),this.ended=!0,i===o.Z_OK):s!==o.Z_SYNC_FLUSH||(this.onEnd(o.Z_OK),!(h.avail_out=0))},d.prototype.onData=function(e){this.chunks.push(e)},d.prototype.onEnd=function(e){e===o.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=r.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},i.Inflate=d,i.inflate=h,i.inflateRaw=function(e,t){return(t=t||{}).raw=!0,h(e,t)},i.ungzip=h},{"./utils/common":1,"./utils/strings":2,"./zlib/constants":4,"./zlib/gzheader":6,"./zlib/inflate":8,"./zlib/messages":10,"./zlib/zstream":11}]},{},[])("/lib/inflate.js"),l=Uint16Array.BYTES_PER_ELEMENT,u=Int32Array.BYTES_PER_ELEMENT,d=Uint32Array.BYTES_PER_ELEMENT,h={METADATA:0,TERRAIN:1,DBROOT:2,fromString:function(e){return"Metadata"===e?h.METADATA:"Terrain"===e?h.TERRAIN:"DbRoot"===e?h.DBROOT:void 0}},c=1953029805;return n((function(e,i){var n=h.fromString(e.type),a=e.buffer;r(e.key,a);var o=function(e){var i=new DataView(e),n=0,r=i.getUint32(0,!0);if(n+=d,r!==c&&2917034100!==r)throw new t.RuntimeError("Invalid magic");if(r=i.getUint32(n,r===c),n+=d,n=new Uint8Array(e,n),(n=f.inflate(n)).length===r)return n;throw new t.RuntimeError("Size of packet doesn't match header")}(a),b=(a=o.buffer,o.length);switch(n){case h.METADATA:return function(e,i,n){var r=new DataView(e),a=0,o=r.getUint32(a,!0);if(a+=d,32301!==o)throw new t.RuntimeError("Invalid magic");var f=r.getUint32(a,!0);if(a+=d,1!==f)throw new t.RuntimeError("Invalid data type. Must be 1 for QuadTreePacket");var h=r.getUint32(a,!0);if(a+=d,2!==h)throw new t.RuntimeError("Invalid QuadTreePacket version. Only version 2 is supported.");var c=r.getInt32(a,!0);if(a+=u,e=r.getInt32(a,!0),a+=u,32!==e)throw new t.RuntimeError("Invalid instance size.");if(o=r.getInt32(a,!0),a+=u,f=r.getInt32(a,!0),a+=u,h=r.getInt32(a,!0),o!==c*e+(a+=u))throw new t.RuntimeError("Invalid dataBufferOffset");if(o+f+h!==i)throw new t.RuntimeError("Invalid packet offsets");for(var b=[],m=0;m<c;++m){var w=r.getUint8(a);++a,++a;var g=r.getUint16(a,!0);a+=l;var k=r.getUint16(a,!0);a+=l;var v=r.getUint16(a,!0);a+=l,a+=l,a+=l,a+=u,a+=u,a+=8;var _=r.getUint8(a++),p=r.getUint8(a++);a+=l,b.push(new s(w,g,k,v,_,p))}var y=[],x=0;return h=0,i=b[x++],""===n?++h:y[n]=i,function e(t,i,n){var r=!1;if(4===n){if(i.hasSubtree())return;r=!0}for(var a=0;a<4;++a){var o=t+a.toString();if(r)y[o]=null;else if(n<4)if(i.hasChild(a)){if(x===c)return void console.log("Incorrect number of instances");var s=b[x++];y[o]=s,e(o,s,n+1)}else y[o]=null}}(n,i,h),y}(a,b,e.quadKey);case h.TERRAIN:return function(e,t,i){for(var n=new DataView(e),r=0,a=[];r<t;){for(var o=r,s=0;s<4;++s){var f=n.getUint32(r,!0);r+=d,r+=f}o=e.slice(o,r),i.push(o),a.push(o)}return a}(a,b,i);case h.DBROOT:return i.push(a),{buffer:a}}}))}));
import protobufMinimal from"../ThirdParty/protobuf-minimal.js";import when from"../ThirdParty/when.js";import buildModuleUrl from"./buildModuleUrl.js";import Check from"./Check.js";import Credit from"./Credit.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import GoogleEarthEnterpriseTileInformation from"./GoogleEarthEnterpriseTileInformation.js";import isBitSet from"./isBitSet.js";import loadAndExecuteScript from"./loadAndExecuteScript.js";import CesiumMath from"./Math.js";import Request from"./Request.js";import Resource from"./Resource.js";import RuntimeError from"./RuntimeError.js";import TaskProcessor from"./TaskProcessor.js";function stringToBuffer(e){for(var t=e.length,r=new ArrayBuffer(t),o=new Uint8Array(r),i=0;i<t;++i)o[i]=e.charCodeAt(i);return r}var defaultKey=stringToBuffer('E\xf4\xbd\vy\xe2jE"\x05\x92,\x17\xcd\x06q\xf8I\x10FgQ\0B%\xc6\xe8a,f)\b\xc64\xdcjb%y\nw\x1dmi\xd6\xf0\x9ck\x93\xa1\xbdNu\xe0A\x04[\xdf@V\f\xd9\xbbr\x9b\x81|\x103S\xeeOl\xd4q\x05\xb0{\xc0\x7fE\x03VZ\xadwUe\v3\x92*\xac\x19l5\x14\xc5\x1d0s\xf83>mF8J\xb4\xdd\xf0.\xdd\x17u\x16\xda\x8cDt"\x06\xfaa"\f3"So\xaf9D\v\x8c\x0e9\xd99\x13L\xb9\xbf\x7f\xab\\\x8cP_\x9f"ux\x1f\xe9\x07q\x91h;\xc1\xc4\x9b\x7f\xf0<VqH\x82\x05\'UfYNe\x1d\x98u\xa3aF}a?\x15A\0\x9f\x14\x06\xd7\xb44M\xce\x13\x87F\xb0\x1a\xd5\x05\x1c\xb8\x8a\'{\x8b\xdc+\xbbMg0\xc8\xd1\xf6\\\x8fP\xfa[/F\x9bn5\x18/\'C.\xeb\n\f^\x10\x05\x10\xa5s\x1be4\xe5l.jC\'c\x14#U\xa9?q{gC}:\xaf\xcd\xe2TU\x9c\xfdK\xc6\xe2\x9f/(\xed\xcb\\\xc6-f\x07\x88\xa7;/\x18*"N\x0e\xb0k.\xdd\r\x95}}G\xbaC\xb2\x11\xb2+>M\xaa>}\xe6\xceI\x89\xc6\xe6x\fa1\x05-\x01\xa4O\xa5~q \x88\xec\r1\xe8N\v\0nPh}\x17=\b\r\x17\x95\xa6n\xa3h\x97$[k\xf3\x17#\xf3\xb6s\xb3\r\v@\xc0\x9f\xd8\x04Q]\xfa\x1a\x17".\x15j\xdfI\0\xb9\xa0wU\xc6\xef\x10j\xbf{GL\x7f\x83\x17\x05\xee\xdc\xdcF\x85\xa9\xadS\x07+S4\x06\x07\xff\x14\x94Y\x19\x02\xe48\xe81\x83N\xb9XFk\xcb-#\x86\x92p\x005\x88"\xcf1\xb2&/\xe7\xc3u-6,rt\xb0#G\xb7\xd3\xd1&\x16\x857r\xe2\0\x8cD\xcf\x10\xda3-\x1a\xde`\x86i#i*|\xcdKQ\r\x95T9w.)\xea\x1b\xa6P\xa2j\x8foP\x99\\>T\xfb\xefP[\v\x07E\x17\x89m(\x13w7\x1d\xdb\x8e\x1eJ\x05fJo\x99 \xe5p\xe2\xb9q~\fmI\x04-z\xfer\xc7\xf2Y0\x8f\xbb\x02]s\xe5\xc9 \xeax\xec \x90\xf0\x8a\x7fB\x17|G\x19`\xb0\x16\xbd&\xb7q\xb6\xc7\x9f\x0e\xd13\x82=\xd3\xab\xeec\x99\xc8+S\xa0D\\q\x01\xc6\xccD\x1f2O<\xca\xc0)=R\xd3a\x19X\xa9}e\xb4\xdc\xcf\r\xf4=\xf1\b\xa9B\xda#\t\xd8\xbf^PI\xf8M\xc0\xcbGL\x1cO\xf7{+\xd8\x16\x18\xc51\x92;\xb5o\xdcl\r\x92\x88\x16\xd1\x9e\xdb?\xe2\xe9\xda_\xd4\x84\xe2FaZ\xde\x1cU\xcf\xa4\0\xbe\xfd\xceg\xf1Ji\x1c\x97\xe6 H\xd8]\x7f~\xaeq \x0eN\xae\xc0V\xa9\x91\x01<\x82\x1d\x0fr\xe7v\xec)I\xd6]-\x83\xe3\xdb6\x06\xa9;f\x13\x97\x87j\xd5\xb6=P^R\xb9K\xc7sWx\xc9\xf4.Y\x07\x95\x93o\xd0K\x17W\x19>\'\'\xc7`\xdb;\xed\x9a\x0eSD\x16>?\x8d\x92mw\xa2\n\xeb?R\xa8\xc6U^1I7\x85\xf4\xc5\x1f&-\xa9\x1c\xbf\x8b\'T\xda\xc3j \xe5*x\x04\xb0\xd6\x90pr\xaa\x8bh\xbd\x88\xf7\x02_H\xb1~\xc0XL?f\x1a\xf9>\xe1e\xc0p\xa7\xcf8i\xaf\xf0VldI\x9c\'\xadxtO\xc2\x87\xdeV9\0\xdaw\v\xcb-\x1b\x89\xfb5O\x02\xf5\bQ\x13`\xc1\nZGM&\x1c30x\xda\xc0\x9cFG\xe2[y`In7gS\n>\xe9\xecF9\xb2\xf14\r\xc6\x84Sun\xe1\fY\xd9\x1e\xde)\x85\x10{II\xa5wy\xbeIV.6\xe7\v:\xbbO\x03b{\xd2M1\x95/\xbd8{\xa8O!\xe1\xecFpv\x95})"x\x88\n\x90\xdd\x9d\\\xda\xde\x19Q\xcf\xf0\xfcYRe|3\x13\xdf\xf3H\xda\xbb*u\xdb`\xb2\x02\x15\xd4\xfc\x19\xed\x1b\xec\x7f5\xa8\xff(1\x07-\x12\xc8\xdc\x88F|\x8a["');function GoogleEarthEnterpriseMetadata(e){Check.defined("resourceOrUrl",e);var t=e;"string"===typeof t||t instanceof Resource||(Check.typeOf.string("resourceOrUrl.url",e.url),t=e.url);var r=Resource.createIfNeeded(t);r.appendForwardSlash(),this._resource=r,this.imageryPresent=!0,this.protoImagery=void 0,this.terrainPresent=!0,this.negativeAltitudeExponentBias=32,this.negativeAltitudeThreshold=CesiumMath.EPSILON12,this.providers={},this.key=void 0,this._quadPacketVersion=1,this._tileInfo={},this._subtreePromises={};var o=this;this._readyPromise=requestDbRoot(this).then((function(){return o.getQuadTreePacket("",o._quadPacketVersion)})).then((function(){return!0})).otherwise((function(e){var t="An error occurred while accessing "+getMetadataResource(o,"",1).url+".";return when.reject(new RuntimeError(t))}))}Object.defineProperties(GoogleEarthEnterpriseMetadata.prototype,{url:{get:function(){return this._resource.url}},proxy:{get:function(){return this._resource.proxy}},resource:{get:function(){return this._resource}},readyPromise:{get:function(){return this._readyPromise}}}),GoogleEarthEnterpriseMetadata.tileXYToQuadKey=function(e,t,r){for(var o="",i=r;i>=0;--i){var n=1<<i,a=0;isBitSet(t,n)?isBitSet(e,n)&&(a|=1):(a|=2,isBitSet(e,n)||(a|=1)),o+=a}return o},GoogleEarthEnterpriseMetadata.quadKeyToTileXY=function(e){for(var t=0,r=0,o=e.length-1,i=o;i>=0;--i){var n=1<<i,a=+e[o-i];isBitSet(a,2)?isBitSet(a,1)||(t|=n):(r|=n,isBitSet(a,1)&&(t|=n))}return{x:t,y:r,level:o}},GoogleEarthEnterpriseMetadata.prototype.isValid=function(e){var t=this.getTileInformationFromQuadKey(e);if(defined(t))return null!==t;for(var r,o=!0,i=e;i.length>1;){if(r=i.substring(i.length-1),i=i.substring(0,i.length-1),t=this.getTileInformationFromQuadKey(i),defined(t)){t.hasSubtree()||t.hasChild(parseInt(r))||(o=!1);break}if(null===t){o=!1;break}}return o};var dbrootParser,dbrootParserPromise,taskProcessor=new TaskProcessor("decodeGoogleEarthEnterprisePacket");function populateSubtree(e,t,r){var o,i=e._tileInfo,n=t,a=i[n];if(defined(a)&&(!a.hasSubtree()||a.hasChildren()))return a;for(;void 0===a&&n.length>1;)a=i[n=n.substring(0,n.length-1)];var s=e._subtreePromises,u=s[n];return defined(u)?u.then((function(){return o=new Request({throttle:r.throttle,throttleByServer:r.throttleByServer,type:r.type,priorityFunction:r.priorityFunction}),populateSubtree(e,t,o)})):defined(a)&&a.hasSubtree()?(u=e.getQuadTreePacket(n,a.cnodeVersion,r),defined(u)?(s[n]=u,u.then((function(){return o=new Request({throttle:r.throttle,throttleByServer:r.throttleByServer,type:r.type,priorityFunction:r.priorityFunction}),populateSubtree(e,t,o)})).always((function(){delete s[n]}))):void 0):when.reject(new RuntimeError("Couldn't load metadata for tile "+t))}function getMetadataResource(e,t,r,o){return e._resource.getDerivedResource({url:"flatfile?q2-0"+t+"-q."+r.toString(),request:o})}function requestDbRoot(e){var t=e._resource.getDerivedResource({url:"dbRoot.v5",queryParameters:{output:"proto"}});if(!defined(dbrootParserPromise)){var r=buildModuleUrl("ThirdParty/google-earth-dbroot-parser.js"),o=window.cesiumGoogleEarthDbRootParser;dbrootParserPromise=loadAndExecuteScript(r).then((function(){dbrootParser=window.cesiumGoogleEarthDbRootParser(protobufMinimal),defined(o)?window.cesiumGoogleEarthDbRootParser=o:delete window.cesiumGoogleEarthDbRootParser}))}return dbrootParserPromise.then((function(){return t.fetchArrayBuffer()})).then((function(t){var r=dbrootParser.EncryptedDbRootProto.decode(new Uint8Array(t)),o=r.encryptionData,i=o.byteOffset,n=i+o.byteLength,a=e.key=o.buffer.slice(i,n);n=(i=(o=r.dbrootData).byteOffset)+o.byteLength;var s=o.buffer.slice(i,n);return taskProcessor.scheduleTask({buffer:s,type:"DbRoot",key:a},[s])})).then((function(t){var r=dbrootParser.DbRootProto.decode(new Uint8Array(t.buffer));if(e.imageryPresent=defaultValue(r.imageryPresent,e.imageryPresent),e.protoImagery=r.protoImagery,e.terrainPresent=defaultValue(r.terrainPresent,e.terrainPresent),defined(r.endSnippet)&&defined(r.endSnippet.model)){var o=r.endSnippet.model;e.negativeAltitudeExponentBias=defaultValue(o.negativeAltitudeExponentBias,e.negativeAltitudeExponentBias),e.negativeAltitudeThreshold=defaultValue(o.compressedNegativeAltitudeThreshold,e.negativeAltitudeThreshold)}defined(r.databaseVersion)&&(e._quadPacketVersion=defaultValue(r.databaseVersion.quadtreeVersion,e._quadPacketVersion));for(var i=e.providers,n=defaultValue(r.providerInfo,[]),a=n.length,s=0;s<a;++s){var u=n[s],d=u.copyrightString;defined(d)&&(i[u.providerId]=new Credit(d.value))}})).otherwise((function(){console.log("Failed to retrieve "+t.url+". Using defaults."),e.key=defaultKey}))}GoogleEarthEnterpriseMetadata.prototype.getQuadTreePacket=function(e,t,r){t=defaultValue(t,1);var o=getMetadataResource(this,e=defaultValue(e,""),t,r).fetchArrayBuffer();if(defined(o)){var i=this._tileInfo,n=this.key;return o.then((function(t){return taskProcessor.scheduleTask({buffer:t,quadKey:e,type:"Metadata",key:n},[t]).then((function(t){var r,o=-1;if(""!==e){o=e.length+1;var n=t[e];(r=i[e])._bits|=n._bits,delete t[e]}var a=Object.keys(t);a.sort((function(e,t){return e.length-t.length}));for(var s=a.length,u=0;u<s;++u){var d=a[u];if(null!==t[d]){var l=GoogleEarthEnterpriseTileInformation.clone(t[d]),f=d.length;if(f===o)l.setParent(r);else if(f>1){var h=i[d.substring(0,d.length-1)];l.setParent(h)}i[d]=l}else i[d]=null}}))}))}},GoogleEarthEnterpriseMetadata.prototype.populateSubtree=function(e,t,r,o){return populateSubtree(this,GoogleEarthEnterpriseMetadata.tileXYToQuadKey(e,t,r),o)},GoogleEarthEnterpriseMetadata.prototype.getTileInformation=function(e,t,r){var o=GoogleEarthEnterpriseMetadata.tileXYToQuadKey(e,t,r);return this._tileInfo[o]},GoogleEarthEnterpriseMetadata.prototype.getTileInformationFromQuadKey=function(e){return this._tileInfo[e]};export default GoogleEarthEnterpriseMetadata;
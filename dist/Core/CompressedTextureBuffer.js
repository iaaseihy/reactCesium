import defined from"./defined.js";function CompressedTextureBuffer(e,t,r,f){this._format=e,this._width=t,this._height=r,this._buffer=f}Object.defineProperties(CompressedTextureBuffer.prototype,{internalFormat:{get:function(){return this._format}},width:{get:function(){return this._width}},height:{get:function(){return this._height}},bufferView:{get:function(){return this._buffer}}}),CompressedTextureBuffer.clone=function(e){if(defined(e))return new CompressedTextureBuffer(e._format,e._width,e._height,e._buffer)},CompressedTextureBuffer.prototype.clone=function(){return CompressedTextureBuffer.clone(this)};export default CompressedTextureBuffer;
import PixelDatatype from"../Renderer/PixelDatatype.js";import WebGLConstants from"./WebGLConstants.js";var PixelFormat={DEPTH_COMPONENT:WebGLConstants.DEPTH_COMPONENT,DEPTH_STENCIL:WebGLConstants.DEPTH_STENCIL,ALPHA:WebGLConstants.ALPHA,RGB:WebGLConstants.RGB,RGBA:WebGLConstants.RGBA,LUMINANCE:WebGLConstants.LUMINANCE,LUMINANCE_ALPHA:WebGLConstants.LUMINANCE_ALPHA,RGB_DXT1:WebGLConstants.COMPRESSED_RGB_S3TC_DXT1_EXT,RGBA_DXT1:WebGLConstants.COMPRESSED_RGBA_S3TC_DXT1_EXT,RGBA_DXT3:WebGLConstants.COMPRESSED_RGBA_S3TC_DXT3_EXT,RGBA_DXT5:WebGLConstants.COMPRESSED_RGBA_S3TC_DXT5_EXT,RGB_PVRTC_4BPPV1:WebGLConstants.COMPRESSED_RGB_PVRTC_4BPPV1_IMG,RGB_PVRTC_2BPPV1:WebGLConstants.COMPRESSED_RGB_PVRTC_2BPPV1_IMG,RGBA_PVRTC_4BPPV1:WebGLConstants.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,RGBA_PVRTC_2BPPV1:WebGLConstants.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG,RGB_ETC1:WebGLConstants.COMPRESSED_RGB_ETC1_WEBGL,componentsLength:function(t){switch(t){case PixelFormat.RGB:return 3;case PixelFormat.RGBA:return 4;case PixelFormat.LUMINANCE_ALPHA:return 2;case PixelFormat.ALPHA:case PixelFormat.LUMINANCE:default:return 1}},validate:function(t){return t===PixelFormat.DEPTH_COMPONENT||t===PixelFormat.DEPTH_STENCIL||t===PixelFormat.ALPHA||t===PixelFormat.RGB||t===PixelFormat.RGBA||t===PixelFormat.LUMINANCE||t===PixelFormat.LUMINANCE_ALPHA||t===PixelFormat.RGB_DXT1||t===PixelFormat.RGBA_DXT1||t===PixelFormat.RGBA_DXT3||t===PixelFormat.RGBA_DXT5||t===PixelFormat.RGB_PVRTC_4BPPV1||t===PixelFormat.RGB_PVRTC_2BPPV1||t===PixelFormat.RGBA_PVRTC_4BPPV1||t===PixelFormat.RGBA_PVRTC_2BPPV1||t===PixelFormat.RGB_ETC1},isColorFormat:function(t){return t===PixelFormat.ALPHA||t===PixelFormat.RGB||t===PixelFormat.RGBA||t===PixelFormat.LUMINANCE||t===PixelFormat.LUMINANCE_ALPHA},isDepthFormat:function(t){return t===PixelFormat.DEPTH_COMPONENT||t===PixelFormat.DEPTH_STENCIL},isCompressedFormat:function(t){return t===PixelFormat.RGB_DXT1||t===PixelFormat.RGBA_DXT1||t===PixelFormat.RGBA_DXT3||t===PixelFormat.RGBA_DXT5||t===PixelFormat.RGB_PVRTC_4BPPV1||t===PixelFormat.RGB_PVRTC_2BPPV1||t===PixelFormat.RGBA_PVRTC_4BPPV1||t===PixelFormat.RGBA_PVRTC_2BPPV1||t===PixelFormat.RGB_ETC1},isDXTFormat:function(t){return t===PixelFormat.RGB_DXT1||t===PixelFormat.RGBA_DXT1||t===PixelFormat.RGBA_DXT3||t===PixelFormat.RGBA_DXT5},isPVRTCFormat:function(t){return t===PixelFormat.RGB_PVRTC_4BPPV1||t===PixelFormat.RGB_PVRTC_2BPPV1||t===PixelFormat.RGBA_PVRTC_4BPPV1||t===PixelFormat.RGBA_PVRTC_2BPPV1},isETC1Format:function(t){return t===PixelFormat.RGB_ETC1},compressedTextureSizeInBytes:function(t,e,P){switch(t){case PixelFormat.RGB_DXT1:case PixelFormat.RGBA_DXT1:case PixelFormat.RGB_ETC1:return Math.floor((e+3)/4)*Math.floor((P+3)/4)*8;case PixelFormat.RGBA_DXT3:case PixelFormat.RGBA_DXT5:return Math.floor((e+3)/4)*Math.floor((P+3)/4)*16;case PixelFormat.RGB_PVRTC_4BPPV1:case PixelFormat.RGBA_PVRTC_4BPPV1:return Math.floor((Math.max(e,8)*Math.max(P,8)*4+7)/8);case PixelFormat.RGB_PVRTC_2BPPV1:case PixelFormat.RGBA_PVRTC_2BPPV1:return Math.floor((Math.max(e,16)*Math.max(P,8)*2+7)/8);default:return 0}},textureSizeInBytes:function(t,e,P,r){var a=PixelFormat.componentsLength(t);return PixelDatatype.isPacked(e)&&(a=1),a*PixelDatatype.sizeInBytes(e)*P*r},alignmentInBytes:function(t,e,P){var r=PixelFormat.textureSizeInBytes(t,e,P,1)%4;return 0===r?4:2===r?2:1},createTypedArray:function(t,e,P,r){var a=PixelDatatype.sizeInBytes(e);return new(a===Uint8Array.BYTES_PER_ELEMENT?Uint8Array:a===Uint16Array.BYTES_PER_ELEMENT?Uint16Array:a===Float32Array.BYTES_PER_ELEMENT&&e===PixelDatatype.FLOAT?Float32Array:Uint32Array)(PixelFormat.componentsLength(t)*P*r)},flipY:function(t,e,P,r,a){if(1===a)return t;for(var o=PixelFormat.createTypedArray(e,P,r,a),n=PixelFormat.componentsLength(e),i=r*n,_=0;_<a;++_)for(var R=_*r*n,G=(a-_-1)*r*n,s=0;s<i;++s)o[G+s]=t[R+s];return o},toInternalFormat:function(t,e,P){if(!P.webgl2)return t;if(t===PixelFormat.DEPTH_STENCIL)return WebGLConstants.DEPTH24_STENCIL8;if(t===PixelFormat.DEPTH_COMPONENT){if(e===PixelDatatype.UNSIGNED_SHORT)return WebGLConstants.DEPTH_COMPONENT16;if(e===PixelDatatype.UNSIGNED_INT)return WebGLConstants.DEPTH_COMPONENT24}if(e===PixelDatatype.FLOAT)switch(t){case PixelFormat.RGBA:return WebGLConstants.RGBA32F;case PixelFormat.RGB:return WebGLConstants.RGB32F;case PixelFormat.RG:return WebGLConstants.RG32F;case PixelFormat.R:return WebGLConstants.R32F}if(e===PixelDatatype.HALF_FLOAT)switch(t){case PixelFormat.RGBA:return WebGLConstants.RGBA16F;case PixelFormat.RGB:return WebGLConstants.RGB16F;case PixelFormat.RG:return WebGLConstants.RG16F;case PixelFormat.R:return WebGLConstants.R16F}return t}};export default Object.freeze(PixelFormat);
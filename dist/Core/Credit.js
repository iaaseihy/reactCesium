import DOMPurify from"../ThirdParty/purify.js";import Check from"./Check.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";var nextCreditId=0,creditToId={};function Credit(e,t){var i;Check.typeOf.string("html",e);var r=e;defined(creditToId[r])?i=creditToId[r]:(i=nextCreditId++,creditToId[r]=i),t=defaultValue(t,!1),this._id=i,this._html=e,this._showOnScreen=t,this._element=void 0}Object.defineProperties(Credit.prototype,{html:{get:function(){return this._html}},id:{get:function(){return this._id}},showOnScreen:{get:function(){return this._showOnScreen}},element:{get:function(){if(!defined(this._element)){var e=DOMPurify.sanitize(this._html),t=document.createElement("div");t._creditId=this._id,t.style.display="inline",t.innerHTML=e;for(var i=t.querySelectorAll("a"),r=0;r<i.length;r++)i[r].setAttribute("target","_blank");this._element=t}return this._element}}}),Credit.equals=function(e,t){return e===t||defined(e)&&defined(t)&&e._id===t._id},Credit.prototype.equals=function(e){return Credit.equals(this,e)},Credit.getIonCredit=function(e){var t=defined(e.collapsible)&&!e.collapsible,i=new Credit(e.html,t);return i._isIon=-1!==i.html.indexOf("ion-credit.png"),i},Credit.clone=function(e){if(defined(e))return new Credit(e.html,e.showOnScreen)};export default Credit;
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("whatInput",[],t):"object"==typeof exports?exports.whatInput=t():e.whatInput=t()}(this,function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}return n.m=e,n.c=t,n.p="",n(0)}([function(e,t){"use strict";e.exports=function(){var e="initial",t=null,n=document.documentElement,o=["input","select","textarea"],r=[],i=[16,17,18,91,93],u=[9],d={keydown:"keyboard",keyup:"keyboard",mousedown:"mouse",mousemove:"mouse",MSPointerDown:"pointer",MSPointerMove:"pointer",pointerdown:"pointer",pointermove:"pointer",touchstart:"touch"},s=[],a=!1,p=!1,c={x:null,y:null},f={2:"touch",3:"touch",4:"mouse"},v=!1;try{var l=Object.defineProperty({},"passive",{get:function(){v=!0}});window.addEventListener("test",null,l)}catch(e){}var h=function(){var e=!!v&&{passive:!0};window.PointerEvent?(n.addEventListener("pointerdown",m),n.addEventListener("pointermove",y)):window.MSPointerEvent?(n.addEventListener("MSPointerDown",m),n.addEventListener("MSPointerMove",y)):(n.addEventListener("mousedown",m),n.addEventListener("mousemove",y),"ontouchstart"in window&&(n.addEventListener("touchstart",x,e),n.addEventListener("touchend",x))),n.addEventListener(b(),y,e),n.addEventListener("keydown",m),n.addEventListener("keyup",m)},m=function(n){if(!a){var r=n.which,s=d[n.type];if("pointer"===s&&(s=L(n)),e!==s||t!==s){var p=document.activeElement,c=!1;(p&&p.nodeName&&-1===o.indexOf(p.nodeName.toLowerCase())||-1!==u.indexOf(r))&&(c=!0),("touch"===s||"mouse"===s||"keyboard"===s&&r&&c&&-1===i.indexOf(r))&&(e=t=s,w())}}},w=function(){n.setAttribute("data-whatinput",e),n.setAttribute("data-whatintent",e),-1===s.indexOf(e)&&(s.push(e),n.className+=" whatinput-types-"+e),E("input")},y=function(e){if(c.x!==e.screenX||c.y!==e.screenY?(p=!1,c.x=e.screenX,c.y=e.screenY):p=!0,!a&&!p){var o=d[e.type];"pointer"===o&&(o=L(e)),t!==o&&(t=o,n.setAttribute("data-whatintent",t),E("intent"))}},x=function(e){"touchstart"===e.type?(a=!1,m(e)):a=!0},E=function(e){for(var n=0,o=r.length;n<o;n++)r[n].type===e&&r[n].fn.call(void 0,t)},L=function(e){return"number"==typeof e.pointerType?f[e.pointerType]:"pen"===e.pointerType?"touch":e.pointerType},b=function(){return"onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll"};return"addEventListener"in window&&Array.prototype.indexOf&&(d[b()]="mouse",h(),w()),{ask:function(n){return"loose"===n?t:e},types:function(){return s},ignoreKeys:function(e){i=e},registerOnChange:function(e,t){r.push({fn:e,type:t||"input"})},unRegisterOnChange:function(e){var t=function(e){for(var t=0,n=r.length;t<n;t++)if(r[t].fn===e)return t}(e);t&&r.splice(t,1)}}}()}])});
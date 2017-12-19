(function(a,b){'object'==typeof exports&&'undefined'!=typeof module?b(exports):'function'==typeof define&&define.amd?define(['exports'],b):b((a.JFE=a.JFE||{},a.JFE.util={}))})(this,function(a){'use strict';/**九次方大数据前端工具库*/function b(a){return a instanceof Function||'[object Function]'===Object.prototype.toString.call(a)}/** @memberof util */function c(a){return a instanceof Array||'[object Array]'===Object.prototype.toString.call(a)}function d(a){// IE8 will treat undefined and null as object if it wasn't for
// input != null
return null!=a&&'[object Object]'===Object.prototype.toString.call(a)}/**
 * @namespace 
 *//** 
* 将两个或更多对象的内容合并到第一个对象。
* @memberof  util 
* @param { Boolean } deep 如果是 true，合并成为递归（又叫做深拷贝）。不支持给这个参数传递 false
* @param { Object } target 对象扩展。这将接收新的属性。
* @param { Object } object1 一个对象，它包含额外的属性合并到第一个参数.
* @param { Object } objectN 包含额外的属性合并到第一个参数
 * @example
 *  var object1 = {
 *      apple: 0,
 *      banana: { weight: 52, price: 100 },
 *      cherry: 97
 *  };
 *  var object2 = {
 *      banana: { price: 200 },
 *      durian: 100
 *  };
 *  // Merge object2 into object1
 *  JFE.util.extend( object1, object2 );
 */function e(){var a,f,g,h,j,k,l=arguments[0]||{},m=1,i=arguments.length,n=!1;// Handle a deep copy situation  
for('boolean'==typeof l&&(n=l,l=arguments[1]||{},m=2),'object'!=typeof l&&b(l)&&(l={}),i===m&&(l=this,--m);m<i;m++)// Only deal with non-null/undefined values  
if(null!=(a=arguments[m]))// Extend the base object  
for(f in a)// Prevent never-ending loop  
(g=l[f],h=a[f],l!==h)&&(n&&h&&(d(h)||(j=c(h)))?(j?(j=!1,k=g&&c(g)?g:[]):k=g&&d(g)?g:{},l[f]=e(n,k,h)):void 0!==h&&(l[f]=h));// Recurse if we're merging plain objects or arrays  
// Return the modified object  
return l}a.extend=e,Object.defineProperty(a,'__esModule',{value:!0})});
//# sourceMappingURL=util.js.map

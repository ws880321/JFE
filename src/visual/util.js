(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.JFE = global.JFE || {}, global.JFE.util = {})));
}(this, (function (exports) { 'use strict';

/**九次方大数据前端工具库*/

/**
 * isBrowser类 判断浏览器及浏览器版本234.
 * @memberof util
 * @example
 *    let s =  JFE.util.isBrowser().s
      let type =  JFE.util.isBrowser().type
      console.log('s',s)
      console.log('type',type)

 */

function isBrowser() {
  var Sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] : (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

  var type = '';
  for (var key in Sys) {
    if (Sys[key]) {
      type = key;
    }
  }
  return {
    s: s,
    type: type
  };
}

/**
* 将时间戳转为时间格式。
* @memberof  util
* @param { string } timeStamp 时间戳
* @param { string } type 时间之间的连接符 默认是 '/' 。
* @param { Boolean } needHMS 是否需要小时 分钟 秒。
 * @example
 *   const timestamp=new Date().getTime();
      JFE.util.formatTime(timestamp,'-',true) 输出：2017-12-22 17:33:17
      JFE.util.formatTime(timestamp)  输出：2017/12/22
 */
function formatTime(timeStamp, type, needHMS) {
  function add0(m) {
    return m < 10 ? '0' + m : m;
  }
  var localType = type || '/';
  //timeStamp是整数，否则要parseInt转换
  var time = new Date(timeStamp);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  console.log(needHMS);
  return needHMS ? y + localType + add0(m) + localType + add0(d) + ' ' + h + ':' + mm + ':' + s : y + localType + add0(m) + localType + add0(d);
}

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

/** @memberof util */

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

/**
 * @namespace 
 */

/** 
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
 */

function extend() {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation  
    if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target  
        i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)  
    if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== "object" && isFunction(target)) {
        target = {};
    }

    // extend jQuery itself if only one argument is passed  
    if (length === i) {
        target = this;
        --i;
    }

    for (; i < length; i++) {
        // Only deal with non-null/undefined values  
        if ((options = arguments[i]) != null) {
            // Extend the base object  
            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop  
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays  
                if (deep && copy && (isObject(copy) || (copyIsArray = isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && isArray(src) ? src : [];
                    } else {
                        clone = src && isObject(src) ? src : {};
                    }

                    // Never move original objects, clone them  
                    target[name] = extend(deep, clone, copy);

                    // Don't bring in undefined values  
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object  
    return target;
}

exports.isBrowser = isBrowser;
exports.formatTime = formatTime;
exports.extend = extend;

Object.defineProperty(exports, '__esModule', { value: true });

})));

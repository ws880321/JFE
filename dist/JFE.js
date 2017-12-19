(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.JFE = {})));
}(this, (function (exports) { 'use strict';

/**九次方大数据前端工具库*/

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
    if (typeof target !== "object" && isFunction(target)) {
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



var index = Object.freeze({
	extend: extend
});

/**
 * chart 是 JFE的图表库，提供了一些项目中常用图表。
 * @namespace chart
 */

const aaa = 123;



var index$1 = Object.freeze({
	aaa: aaa
});

/**
 * visual 是 JFE的3d可视化库，提供了一些项目中常用3d效果。
 * @namespace visual
 */

const bbb = 23412132123;


var index$2 = Object.freeze({
	bbb: bbb
});

exports.util = index;
exports.chart = index$1;
exports.visual = index$2;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=jfe.js.map

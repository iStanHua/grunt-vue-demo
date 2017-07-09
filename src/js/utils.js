if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}

/**
 * 替换所有匹配exp的字符串为指定字符串
 * @param exp 被替换部分的正则
 * @param newStr 替换成的字符串
 */
String.prototype.replaceAll = function (exp, newStr) {
    return this.replace(new RegExp(exp, "gm"), newStr);
};

/**
 * 原型：字符串格式化
 * @param args 格式化参数值
 */
String.prototype.format = function (args) {
    var result = this;
    if (arguments.length < 1) {
        return result;
    }

    var data = arguments; // 如果模板参数是数组
    if (arguments.length == 1 && typeof (args) == "object") {
        // 如果模板参数是对象
        data = args;
    }
    for (var key in data) {
        var value = data[key];
        if (undefined != value) {
            result = result.replaceAll("\\{" + key + "\\}", value);
        }
    }
    return result;
}

/*
    格式化日期
*/
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//判断变量是否为数组
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
// remove ， 移除
Array.prototype.remove = function (value) { //#移除数组中某值
    var len = this.length;
    while (len--) {
        if (value === this[len]) {
            this.splice(len, 1);
        }
    }
    this.length -= 1;
}


/** utilities */

dmp.util = {

    getCursorPosition: function (e) {
        e = e || window.event;
        var cursor = { x: 0, y: 0 };

        if (e.pageX || e.pageY) {
            cursor.x = e.pageX;
            cursor.y = e.pageY;
        } else {
            var de = document.documentElement;
            var b = document.body;
            cursor.x = e.clientX + (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
            cursor.y = e.clientY + (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
        }

        return cursor;
    },

    getAbsolutePosition: function (obj) {
        var curleft = 0;
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj === obj.offsetParent);
        }

        return { 'x': curleft, 'y': curtop };
    },

    makeElement: function (htmlTag, attrs) {
        var el = document.createElement(htmlTag);

        for (var key in attrs) {
            if (attrs.hasOwnProperty(key)) {
                el.setAttribute(key, attrs[key]);
            }
        }

        return el;
    },

    getPxNum: function (val) {
        return val.slice(0, val.length - 2);
    },

    disableSelect: function (trueFalse) {
        document.onselectstart = function () {
            return trueFalse;
        }
    },

    hasClass: function (elem, className) {
        return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
    },

    addClass: function (elem, className) {
        if (!dmp.util.hasClass(elem, className)) {
            elem.className += ' ' + className;
        }
    },

    removeClass: function (elem, className) {
        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';

        if (dmp.util.hasClass(elem, className)) {
            while (newClass.indexOf(' ' + className + ' ') >= 0) {
                newClass = newClass.replace(' ' + className + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    },

    swapClass: function (elem, oldClass, newClass) {
        if (dmp.util.hasClass(elem, oldClass)) {
            var classStr = elem.getAttribute('class');
            classStr = classStr.replace(oldClass, newClass);

            elem.setAttribute('class', classStr);
        }
    },

};


/** feature detection */

dmp.detect = {
    transforms: function () {
        var s = document.body.style;
        if (s.transform !== undefined || s.WebkitTransform !== undefined || s.MozTransform !== undefined || s.OTransform !== undefined) {
            return true;
        } else {
            return false;
        }
    }
};


var log = function (msg) {
    console.log(msg);
};


// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () { };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


var assign = make_assign()
var create = make_create()
var trim = make_trim()
var Global = (typeof window !== 'undefined' ? window : global)

module.exports = {
    assign: assign,
    create: create,
    trim: trim,
    bind: bind,
    slice: slice,
    each: each,
    map: map,
    pluck: pluck,
    isList: isList,
    isFunction: isFunction,
    isObject: isObject,
    Global: Global,
}

function make_assign() {
    if (Object.assign) {
        return Object.assign
    } else {
        return function shimAssign(obj, props1, props2, etc) {
            for (var i = 1; i < arguments.length; i++) {
                each(Object(arguments[i]), function (val, key) {
                    obj[key] = val
                })
            }
            return obj
        }
    }
}

function make_create() {
    if (Object.create) {
        return function create(obj, assignProps1, assignProps2, etc) {
            var assignArgsList = slice(arguments, 1)
            return assign.apply(this, [Object.create(obj)].concat(assignArgsList))
        }
    } else {
        function F() { } // eslint-disable-line no-inner-declarations
        return function create(obj, assignProps1, assignProps2, etc) {
            var assignArgsList = slice(arguments, 1)
            F.prototype = obj
            return assign.apply(this, [new F()].concat(assignArgsList))
        }
    }
}

function make_trim() {
    if (String.prototype.trim) {
        return function trim(str) {
            return String.prototype.trim.call(str)
        }
    } else {
        return function trim(str) {
            return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
        }
    }
}

function bind(obj, fn) {
    return function () {
        return fn.apply(obj, Array.prototype.slice.call(arguments, 0))
    }
}

function slice(arr, index) {
    return Array.prototype.slice.call(arr, index || 0)
}

function each(obj, fn) {
    pluck(obj, function (key, val) {
        fn(key, val)
        return false
    })
}

function map(obj, fn) {
    var res = (isList(obj) ? [] : {})
    pluck(obj, function (v, k) {
        res[k] = fn(v, k)
        return false
    })
    return res
}

function pluck(obj, fn) {
    if (isList(obj)) {
        for (var i = 0; i < obj.length; i++) {
            if (fn(obj[i], i)) {
                return obj[i]
            }
        }
    } else {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (fn(obj[key], key)) {
                    return obj[key]
                }
            }
        }
    }
}

function isList(val) {
    return (val != null && typeof val != 'function' && typeof val.length == 'number')
}

function isFunction(val) {
    return val && {}.toString.call(val) === '[object Function]'
}

function isObject(val) {
    return val && {}.toString.call(val) === '[object Object]'
}


me.hasClass = function (e, c) {
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
    return re.test(e.className);
};

me.addClass = function (e, c) {
    if (me.hasClass(e, c)) {
        return;
    }

    var newclass = e.className.split(' ');
    newclass.push(c);
    e.className = newclass.join(' ');
};

me.removeClass = function (e, c) {
    if (!me.hasClass(e, c)) {
        return;
    }

    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
    e.className = e.className.replace(re, ' ');
};

var isArray = Array.isArray || function (obj) {
    return ({}).toString.call(obj) === '[object Array]';
};


var each = function (data, callback) {
    var i, len;
    if (isArray(data)) {
        for (i = 0, len = data.length; i < len; i++) {
            callback.call(data, data[i], i, data);
        }
    } else {
        for (i in data) {
            callback.call(data, data[i], i);
        }
    }
};
//封装hasClass,removeClass,addClass
function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('\\b' + cls + '\\b'));
}

function addClass(ele, cls) {
    if (ele.length && ele.length > 0) {
        for (var i = 0; i < ele.length; i++) {
            singleAddClass(ele[i], cls);
        }
    } else {
        singleAddClass(ele, cls);
    }
}

function removeClass(ele, cls) {
    if (ele.length && ele.length > 0) {
        for (var i = 0; i < ele.length; i++) {
            singleRemoveClass(ele[i], cls);
        }
    } else {
        singleRemoveClass(ele, cls);
    }
}

function singleAddClass(ele, cls) {
    if (hasClass(ele, cls)) return;
    ele.className += ' ' + cls;
}

function singleRemoveClass(ele, cls) {
    ele.className = ele.className.replace(new RegExp('\\b' + cls + '\\b', 'g'), '');
}
//取窗口滚动条高度  
function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    }
    else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}


//取窗口可视范围的高度
function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    else {
        var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
}

//取文档内容实际高度
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

//测试是否成功
function test() {
    if (getScrollTop() + getClientHeight() > getScrollHeight()) {

        alert("到达底部");
        return true;
    } else {

        alert("没有到达底部");
        return false;
    }
}
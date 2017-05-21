var util = {
    htmlEscape: function (text) {
        return text.replace(/[<>"&]/g, function (match, pos, originalText) {
            switch (match) {
                case '<':
                    return '&lt;';
                case '>':
                    return '&gt;';
                case '&':
                    return '&amp;';
                case '\"':
                    return '&quot;';
            }
        })
    }
}

console.log(util.htmlEscape("<p class=\"greeting\">Hello world!</p>"));

var client = function () {
    //呈现引擎
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        //完整的版本号
        ver: null
    };
    //浏览器
    var browser = {
        //主要浏览器
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,
        //具体的版本号
        ver: null

    };
    //平台、设备和操作系统
    var system = {
        win: false,
        mac: false,
        x11: false,
        //移动设备
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,
        //游戏系统
        wii: false,
        ps: false
    };
    //检测呈现引擎和浏览器
    var ua = navigator.userAgent;
    if (window.opera) {
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
        engine.ver = RegExp['$1'];
        engine.webkit = parseFloat(engine.ver);
        //确定是Chrome还是Safari
        if (/Chrome\/(\S+)/.test(ua)) {
            browser.ver = RegExp['$1'];
            browser.chrome = parseFloat(browser.ver);
        } else if (/Version\/(\S+)/.test(ua)) {
            browser.ver = RegExp['$1'];
            browser.safari = parseFloat(browser.ver);
        } else {
            //近似地确定版本号
            var _v = 1;
            var _webkit = engine.webkit;
            if (_webkit < 100) {
                _v = 1;
            } else if (_webkit < 312) {
                _v = 1.2;
            } else if (_webkit < 412) {
                _v = 1.3;
            } else {
                _v = 2;
            }
            browser.ver = browser.safari = _v;
        }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp['$1'];
        engine.kthtml = browser.konq = parseFloat(engine.ver);
    } else if (/rv:([^;]+)\) Gecko\/d{8}/.test(ua)) {
        engine.ver = browser.ver = RegExp['$1'];
        engine.gecko = parseFloat(engine.ver);
        //确定是不是FireFox
        if (/FireFox\/(\S+)/.test(ua)) {
            browser.ver = RegExp['$1'];
            browser.firefox = parseFloat(browser.ver);
        }
    } else if (/MSIE ([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp['$1'];
        engine.ie = browser.ie = parseFloat(engine.ver);
    }
    //检测浏览器
    browser.ie = engine.ie;
    browser.opera = engine.opera;

    //检测平台
    var p = navigator.platform;
    system.win = p.indexOf('Win') == 0;
    system.mac = p.o = indexOf('Mac') == 0;
    system.x11 = (p == 'X11') || (p.indexOf('linux') == 0);

    //检验Windows操作系统
    if (system.win) {
        if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
            if (RegExp['$1'] == 'NT') {
                switch (RegExp['$2']) {
                    case '5.0':
                        system.win = '2000';
                        break;
                    case '5.1':
                        system.win = 'XP';
                        break;
                    case '6.0':
                        system.win = 'Vista';
                    case '6.1':
                        system.win = '7';
                        break;
                    default:
                        system.win = 'NT';
                        break;
                }
            }
            else if (RegExp['$1'] == '9x') {
                system.win = 'NE';
            }
            else {
                system.win = RegExp['$1'];
            }
        }
    }
    //移动设备
    system.iphone = ua.indexOf('iPhone') > -1;
    system.ipod = ua.indexOf('iPod') > -1;
    system.ipad = ua.indexOf('iPod') > -1;
    system.nokiaN = ua.indexOf('NokiaN') > -1;

    //windows mobile
    if (system.win == 'CE') {
        system.winMobile = system.win;
    }
    else if (system.win == 'Ph') {
        if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
            system.win = 'Phone';
            system.winMobile = parseFloat(RegExp['$1']);

        }
    }
    //检验iOS版本
    if(system.mac&&ua.indexOf('Mobile')>-1){
        if(/CPU (?:iPhone )?OS (\d+_d+)/.test(ua)){
            system.ios=parseFloat(RegExp.$1.replace('_','.'));
        }
        else{
            system.ios=2; //不能真正检验出来，所以只能猜测
        }
    }
    //检验Android版本
    if(/Android (\d+\.\d+)/.test(ua)){
        system.android=parseFloat(RegExp.$1);
    }
    //游戏系统
    system.wii=ua.indexOf('Wii')>-1;
    system.ps=/playstation/i.test(ua);
    return{
        engine:engine,
        browser:browser,
        system:system
    };
}();
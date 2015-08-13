/**
 * H5 - web app helper functions
 */

ST = window.ST || {};
(function(win) {
    var doc = document;
    var noop = function() {};
    win.H5 = win.H5 || {};
    H5.ua = navigator.userAgent;
    H5.viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]');
    ST.H5 = H5; //继承到ST下
    // 初始化控制台，防止控制台报错
    (function() {
        var method;
        var methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeStamp', 'trace', 'warn'
        ];
        var length = methods.length;
        var console = (win.console = win.console || {});

        while (length--) {
            method = methods[length];

            // 检测控制台不存在的方法
            if (!console[method]) {
                console[method] = noop;
            }
        }
    }());
    // 初始化HTML5方法
    (function() {
        var method;
        var methods = [
            'localStorage'
        ];
        var length = methods.length;
        while (length--) {
            method = methods[length];
            if (!win[method]) {
                win[method] = noop;
            }
        }
    }());
    // 浏览器检测
    (function(a) {
        function b(a) {
            var os = this.os = {},
                browser = this.browser = {},
                WebKit = a.match(/WebKit\/([\d.]+)/),
                android = a.match(/(Android)[\s+|\/]([\d.]+)/),
                windowPhone = a.match(/Windows\s+Phone/),
                ipad = a.match(/(iPad).*OS\s([\d_]+)/),
                iphone = !ipad && a.match(/(iPhone\sOS)\s([\d_]+)/),
                webOS = a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
                touchPad = webOS && a.match(/TouchPad/),
                Kindle = a.match(/Kindle\/([\d.]+)/),
                Silk = a.match(/Silk\/([\d._]+)/),
                BlackBerry = a.match(/(BlackBerry).*Version\/([\d.]+)/),
                BB10 = a.match(/(BB10).*Version\/([\d.]+)/),
                RIM = a.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
                PlayBook = a.match(/PlayBook/),
                Chrome = a.match(/Chrome\/([\d.]+)/) || a.match(/CriOS\/([\d.]+)/),
                Firefox = a.match(/Firefox\/([\d.]+)/),
                PC = a.match(/Windows|Linux|Macintosh/);
            if (browser.webkit = !!WebKit) browser.version = WebKit[1];
            android && (os.android = !0, os.version = android[2]),
                iphone && (os.ios = os.iphone = !0, os.version = iphone[2].replace(/_/g, ".")),
                ipad && (os.ios = os.ipad = !0, os.version = ipad[2].replace(/_/g, ".")),
                webOS && (os.webos = !0, os.version = webOS[2]),
                touchPad && (os.touchpad = !0),
                BlackBerry && (os.blackberry = !0, os.version = BlackBerry[2]),
                BB10 && (os.bb10 = !0, os.version = BB10[2]),
                RIM && (os.rimtabletos = !0, os.version = RIM[2]),
                PlayBook && (browser.playbook = !0),
                Kindle && (os.kindle = !0, os.version = Kindle[1]),
                Silk && (browser.silk = !0, browser.version = Silk[1]), !Silk && os.android && a.match(/Kindle Fire/) && (browser.silk = !0),
                Chrome && (browser.chrome = !0, browser.version = Chrome[1]),
                Firefox && (browser.firefox = !0, browser.version = Firefox[1]),
                os.tablet = !!(ipad || PlayBook || android && !a.match(/Mobile/) || Firefox && a.match(/Tablet/)),
                os.phone = !os.tablet && !!(android || iphone || windowPhone || webOS || BlackBerry || BB10 || Chrome && a.match(/Android/) || Chrome && a.match(/CriOS\/([\d.]+)/) || Firefox && a.match(/Mobile/)),
                os.pc = !os.tablet && !os.phone && !!PC;
        }
        var u = H5.ua;
        b.call(a, u), a.__detect = b;
        a.os.touch = !!(('ontouchstart' in win) && win.DocumentTouch && doc instanceof DocumentTouch);
    })(H5);

    // 是否开启debug模式
    H5.debug = false;
    if (location.hash.indexOf("debug") != -1) {
        H5.debug = true;
    }

    // 空函数
    H5.noop = noop;

    H5._guid = 1;
    /**
    获取唯一GUID
    * @return {Number} 返回唯一GUID 
    */
    H5.getGUID = function() {
        return H5._guid++;
    };
    /**
    错误图片
    * @param {String or Element} [ssrc] [错误图片路径]    
    */
    H5._errorImg = "resource/images/transparent.gif";
    H5.setErrorImg = function(ssrc) {
        H5._errorImg = ssrc;
    };
    /**
    懒加载图片
    * @param {String or Element} [el] [选择器]
    * @return {Number} 返回唯一GUID 
    */
    H5.loadimages = function(el) {
        el = el || "body";
        var lazy = $(el).find("[data-src]");
        lazy.each(function(i) {
            loadImg.call(this);
        });

        function loadImg() {
            var t = this;
            var dataSrc = t.getAttribute("data-src");
            var img = new Image();
            img.src = dataSrc;
            img.onload = function() {
                t.setAttribute("src", dataSrc);
                $(t).removeAttr("data-src");
            }
            img.onerror = function() {
                H5._errorImg && t.setAttribute("src", H5._errorImg)
            }
        }
    };
    /**
    加密手机号
    * @param  {[String]} name [手机号]
    * @return {[String]} 返回被加密的手机号
    */
    H5.uname = function(tel) {
        if (tel) {
            tel = tel.substring(0, 3) + "****" + tel.substring(8, 11);
        } else {
            tel = "匿名";
        }
        return tel;
    };
    /**
     * 设置离线缓存
     * @param {[String]} key  [键]
     * @param {[String]} value [值]
     */
    H5.setItem = function(key, value) {
        localStorage.setItem(key, value);
    };
    /**
     * 获取离线缓存
     * @param  {[String]} key [键]
     * @return {[String]}     [值]
     */
    H5.getItem = function(key) {
        return localStorage.getItem(key) || "";
    };
    /**
     * 打印log
     * @param  {[String]} str [日志]
     */
    H5.log = function(str) {
        console.log(str);
    };
    /**
     * [扩展jQuery ajax方法]
     * @param  {[String]} url      [地址]
     * @param  {[String,Object]} data     [参数]
     * @param  {[Function]} sfn      [成功返回函数]
     * @param  {[Function]} errfn    [失败返回函数]
     * @param  {[String]} method   [请求类型get 或者post]
     * @param  {[String]} datatype [数据类型json或者jsonp]
     * @param  {[Boolen]} isShowLoad   [是否显示加载进度条,默认显示加载进度条]
     */
    H5.getJSON = function(url, data, sfn, errfn, method, datatype, isload) {
        var t = this;
        data = data || "";
        !isload && $("#js-loading").show();
        // 关闭全局AJAX缓存
        // $.ajaxSetup({
        //  cache: false 
        // });
        $("body").queue(function() {
            $.ajax({
                type: method || "get",
                dataType: datatype || 'json',
                contentType: 'application/x-www-form-urlencoded;charset=utf-8',
                url: url,
                cache: false, //禁用AJAX缓存
                data: data,
                error: function(e, xhr, opt) {
                    $("#js-loading").hide();
                    $("body").dequeue();
                    if (xhr == "abort") {
                        H5.log("------------------------error↓--------------------------");
                        H5.log("error:abort" + ",参数：" + data + ",地址:" + url);
                        H5.log("错误行为分析：")
                        H5.log("说明你的请求并没有返回值,或者返回值超时")
                        H5.log("1.检测是否断网了")
                        H5.log("2.检测当前参数" + data + "是否正确")
                        H5.log("3.是否清理缓存,ctrl+F5 强制清理缓存.")
                        H5.log("------------------------error↑------------------------");
                        return;
                    } else {
                        e.url = url;
                        e.data = data;
                        H5.log("------------------------error↓--------------------------");
                        H5.log("error:url:" + url + ",data：" + data + ",sfn" + sfn + ",errfn" + errfn + ",method" + method + ",datatype" + datatype + "状态: " + e.status + " " + e.statusText);
                        H5.log("错误行为分析：")
                        H5.log("说明你的请求并没有返回值,或者返回值超时")
                        H5.log("1.检测是否断网了")
                        H5.log("2.检测当前参数" + data + "是否正确")
                        H5.log("3.是否清理缓存,ctrl+F5 强制清理缓存.")
                        H5.log("------------------------error↑------------------------");
                        errfn && errfn(e);
                    }
                },
                success: function(j) {
                    $("#js-loading").hide();
                    $("body").dequeue();
                    var flag = false;
                    if (!j) {
                        H5.log("error:ajax没有返回数据");
                        H5.alert("与服务器链接失败，请重试");
                        errfn && errfn();
                        return false;
                    }
                    var c = j.status;
                    if (c == "success") {
                        flag = true;
                    } else {
                        if (j.msg) {
                            H5.alert(j.msg);
                        }
                        H5.log("------------------------error↓--------------------------");
                        H5.log("error:" + "参数：" + data + ",地址:" + url + ",code:" + j.code + ",message:" + j.msg);
                        H5.log("错误行为分析：")
                        H5.log("1.检测当前参数" + data + "是否正确")
                        H5.log("2.是否清理缓存,ctrl+F5 强制清理缓存.")
                        H5.log("------------------------error↑------------------------");
                    }
                    if (flag) {
                        H5.log("------------------------success↓--------------------------");
                        H5.log("参数：" + data);
                        H5.log("地址:" + url);
                        H5.log("返回值:");
                        H5.log(j);
                        H5.log("------------------------success↑------------------------");
                        sfn && sfn(j);
                    } else {
                        errfn && errfn(j);
                    }
                }
            });
        });
    };
    /** 
     * @return {[Number]} [获取滚动高度]
     */
    H5.getScrollTop = function() {
        return win.pageYOffset || doc.compatMode === 'CSS1Compat' && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
    };
    /**
     * 弹出框 需要对应的HTML片段和CSS
     * @param  {[String]}   txt      [文本]
     * @param  {Function} callback [确定的回调函数]
     * @return {[Number]}            [返回当前弹出框的UID]
     */
    H5.alert = function(txt, callback) {
        var $dialog = $("#js-dialog-tpl").clone();
        var uid = H5.getGUID();
        $dialog.attr("id", "js-dialog" + uid).find(".js-dialog-msg").html(txt);
        $("body").append($dialog);
        $dialog.fadeIn(300);
        $dialog.find(".js-dialog-close").one('click', function() {
            $dialog.fadeOut(300, function() {
                $dialog.remove();
            });
            $(doc).trigger("closedialog" + uid);
            callback && callback();
        });
        return uid;
    };
    /**
     * [选择弹出框 需要对应的HTML片段和CSS]
     * @param  {[String]}   txt      [文本]
     * @param  {[Function]}   ok       [确定的回调函数]
     * @param  {[Function]}   cancel   [取消的回调函数]
     * @param  {Function} callback [弹出框显示的回调函数]
     * @return {[Number]}            [返回当前弹出框的UID]
     */
    H5.confirm = function(txt, ok, cancel, callback) {
        var $dialog = $("#js-dialog-tpl").clone();
        var uid = H5.getGUID();
        $dialog.attr("id", "js-dialog" + uid).find(".js-dialog-msg").html(txt);

        var $clone = $dialog.find(".js-dialog-close").html("取消").clone().addClass("js-dialog-ok").html("好");
        $dialog.find(".js-dialog-close").parent().append($clone);

        $("body").append($dialog);
        $dialog.fadeIn(300);
        $dialog.find(".js-dialog-close").one('click', function() {
            $dialog.fadeOut(300, function() {
                $dialog.remove();
            });
            $(document).trigger("closedialog" + uid);
            cancel && cancel();
        });
        $dialog.find(".js-dialog-ok").one('click', function() {
            $(document).trigger("okdialog" + uid);
            ok && ok();
        });
        callback && callback($dialog);
        return uid;
    };
    // 获取微信分享SDK
    H5.WXConfig = function(url) {
        H5.getJSON(url, {
            "url": location.href.split('#')[0]
        }, function(data) {
            // alert(JSON.stringify(data))
            if (window.wx) {
                wx.config(data);
                weixin6();
                wx.error(function(res) {
                    // 更新update_access_token
                    H5.getJSON(url + "/update_access_token/", '', function(data) {
                        H5.WXConfig();
                    })
                });
            }
        }, function(data) {
            alert(JSON.stringify(data))
        }, "post", "json", true)
    };
    H5.setShare = function(params) {
        if ($.isPlainObject(params) && !$.isEmptyObject(params) && window.WeiXinShare) {
            $.extend(params, WeiXinShare);
        }
    };
    // 显示分享
    H5.share = function(params) {
        if (params) {
            H5.setShare(params);
        }
        H5._showShare();
    };
    H5._showShare = function() {
        var $elem = $("#js-weixin-share");
        $elem.fadeIn(300, function() {
            $elem.one("touchstart.share", H5._hideShare);
        });
    };
    H5._hideShare = function() {
        $("#js-weixin-share").fadeOut(300);
    };
    /**
     * iOS启动动画 (示例)
     */
    H5.startupImage = function() {
        var portrait;
        var landscape;
        var pixelRatio;
        var head;
        var link1;
        var link2;

        pixelRatio = window.devicePixelRatio;
        head = document.getElementsByTagName('head')[0];

        if (navigator.platform === 'iPad') {
            portrait = pixelRatio >= 2 ? 'portrait-retina.png' : 'portrait.png';
            landscape = pixelRatio >= 2 ? 'landscape-retina.png' : 'landscape.png';

            link1 = document.createElement('link');
            link1.setAttribute('rel', 'apple-touch-startup-image');
            link1.setAttribute('media', 'screen and (orientation: portrait)');
            link1.setAttribute('href', portrait);
            head.appendChild(link1);

            link2 = document.createElement('link');
            link2.setAttribute('rel', 'apple-touch-startup-image');
            link2.setAttribute('media', 'screen and (orientation: landscape)');
            link2.setAttribute('href', landscape);
            head.appendChild(link2);
        } else {
            portrait = pixelRatio >= 2 ? "startup-retina.png" : "startup.png";
            portrait = screen.height >= 568 ? "startup-retina-4in.png" : portrait;
            link1 = document.createElement('link');
            link1.setAttribute('rel', 'apple-touch-startup-image');
            link1.setAttribute('href', portrait);
            head.appendChild(link1);
        }

        //hack to fix letterboxed full screen web apps on 4" iPhone / iPod with iOS 6
        if (navigator.platform.match(/iPhone|iPod/i) && (screen.height === 568) && navigator.userAgent.match(/\bOS 6_/)) {
            if (H5.viewportmeta) {
                H5.viewportmeta.content = H5.viewportmeta.content
                    .replace(/\bwidth\s*=\s*320\b/, 'width=320.1')
                    .replace(/\bwidth\s*=\s*device-width\b/, '');
            }
        }
    };

    /**
     * [动画(渐隐渐变)切换场景]
     * @param  {[Element]} s1  [场景1]
     * @param  {[Element]} s2  [场景2]
     * @param  {[Function]} sc1 [场景1结束回调函数]
     * @param  {[Function]} sc2 [场景2结束回调函数]
     */
    H5.switchScene = function(s1, s2, sc1, sc2) {
        $(s1).fadeOut(300, function() {
            sc1 && sc1();
            $(s2).fadeIn(300, function() {
                sc2 && sc2();
            });
        });
    };
    H5.load = function() {
        H5._showLoad();
    };
    H5._showLoad = function() {
        var $elem = $("#js-loading");
        $elem.fadeIn(300, function() {
            $elem.one("touchstart.loading", H5._hideLoad);
        });
    };
    H5._hideLoad = function() {
        $("#js-loading").fadeOut(300);
    };
    H5.nextFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        }
    })();
    H5.cancelFrame = (function() {
        return window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
    })();

    // 计算屏幕的尺寸
    H5.view = function() {
        return {
            w: Math.min(document.documentElement.clientWidth, window.innerWidth),
            h: Math.min(document.documentElement.clientHeight, window.innerHeight)
        };
    };
    // 全屏展示
    H5.full = function(id, minh) {
        // 全屏禁止上下滑动
        $(document).on("touchstart", function(e) {
            e.preventDefault();
        }).on("touchmove", function(e) {
            e.preventDefault();
        });
        // 设置全屏高度
        id = id || "body";
        minh = minh || 0;
        var v = H5.view();
        $(id).height(Math.max(v.h, minh));
    }

    /**
     * [ori 横竖屏切换]
     * @param  {Function} callback [切换后的回调函数]
     * @return {[type]}            [description]
     * landscape：风景模式（横屏）
     * portrait: 肖像模式（竖屏）
     * Android 需要同时监听orientationchange和resize事件，才能获取正确的屏幕宽高
     * iOS 监听orientationchange事件 即可
     * 事件通知 $(window).trigger("ori");
     */
    H5.ori = function(callback) {
        var isOri, isRes, resizeID, eventName = "",
            iDelay = 0;

        function initOri() {
            if (H5.os.ios) {
                isOri = true;
                isRes = true;
            } else {
                isOri = false;
                isRes = false;
                eventName = " resize";
                iDelay = 500;
            }
            resizeID && clearTimeout(resizeID);
            resizeID = null;
        }
        initOri();
        $(window).on("orientationchange" + eventName, function(e) {
            if (!H5.os.ios) {
                e.type == "resize" && (isRes = true);
                e.type == "orientationchange" && (isOri = true);
            }
            adjust()
        });

        function adjust() {
            resizeID && clearTimeout(resizeID);
            resizeID = setTimeout(function() {
                if (isRes == true && isOri == true) {
                    $(window).trigger("ori");
                    // 横竖屏
                    var v = H5.view();
                    var orientation = (v.w > v.h) ? "landscape" : "portrait";
                    callback && callback();
                    document.body.parentNode.setAttribute("class", orientation);
                }
                initOri();
            }, iDelay);
        }
    }
})(window);

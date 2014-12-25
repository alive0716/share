//微信分享组件
function wxShare(option) {
        var defaultOptions = {
            img: '', //分享显示的LOGO
            bigimg: '',
            bigwidth: '600',
            bigheight: '360',
            width: 100, //LOGO宽度
            height: 100, //LOGO高度
            title: document.title, //分享标题
            desc: '租房免租金,有钱没钱都任性!安居客品牌公寓暖冬盛典' || document.title, //分享描述
            url: window.location.href, //分享链接
            appid: '' //微信APPID       
        }
        var opt = J.mix(defaultOptions, option || {}, true);
        //微信内置方法
        // 发送给好友
        function shareFriend() {
                WeixinJSBridge.invoke('sendAppMessage', {
                    'appid': opt.appid,
                    'img_url': opt.img,
                    'img_width': opt.width,
                    'img_height': opt.height,
                    'link': opt.url,
                    'desc': opt.desc,
                    'title': opt.title
                }, function(res) {
                    window.location.reload();

                    //report('send_msg', res.err_msg);
                })
            }
            // 分享到朋友圈
        function shareTL() {
                WeixinJSBridge.invoke('shareTimeline', {
                    'img_url': opt.img,
                    'img_width': opt.width,
                    'img_height': opt.height,
                    'link': opt.url,
                    'desc': opt.desc,
                    'title': opt.title
                }, function(res) {
                    J.g('weixin_share').setStyle({
                            'display': 'none'
                        })
                        //report('timeline', res.err_msg);
                });
            }
            // 分享到微博
        function shareWB() {
                WeixinJSBridge.invoke('shareWeibo', {
                    'content': opt.desc,
                    'url': opt.url,
                }, function(res) {
                    J.g('weixin_share').setStyle({
                            'display': 'none'
                        })
                        //report('weibo', res.err_msg);
                });
            }
            // 分享到QQ
        function generalShare(argv) {
                argv.generalShare({
                    "appid": opt.appid,
                    "img_url": opt.img,
                    "link": opt.url,
                    "desc": opt.desc,
                    "title": opt.title,
                    "img_width": opt.width,
                    "img_height": opt.height
                }, function(res) {
                    J.g('weixin_share').setStyle({
                            'display': 'none'
                        })
                        //window.location.reload();
                        //report('weibo', res.err_msg);
                });
            }
            // 当微信内置浏览器初始化后会触发WeixinJSBridgeReady事件。
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            // 发送给好友
            WeixinJSBridge.on('menu:share:appmessage', function(argv) {
                shareFriend();
            });
            // 分享到朋友圈
            WeixinJSBridge.on('menu:share:timeline', function(argv) {
                shareTL();
            });
            // 分享到微博
            WeixinJSBridge.on('menu:share:weibo', function(argv) {
                shareWB();
            });
            // 分享到qq
            WeixinJSBridge.on('menu:general:share', function(argv) {
                generalShare(argv);
            });
        }, false);
    }
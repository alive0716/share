//分享按钮组件
function Share(option) {
    var defaultOptions = {
        box: J.g('share_box'),
        title: '租房免租金,有钱没钱都任性!安居客品牌公寓暖冬盛典',
        url: window.location.href,
        source: 'bookmark',
        pic: '',
        desc: '租房免租金,有钱没钱都任性!安居客品牌公寓暖冬盛典'
    }
    var opt = J.mix(defaultOptions, option || {}, true);

    function setLocalUrl(localUrl) {
        opt.url = localUrl || window.location.href;
    }

    function setTitle(title) {
        opt.title = title || document.title;
    }

    function setDesc(desc) {
        opt.desc = desc || '';
    }

    function show() {
        if (opt.box.length > 0) {
            opt.box.setStyle({
                'display': 'block'
            })
        }
    }

    function hide() {
        if (opt.box.length > 0) {
            opt.box.setStyle({
                'display': 'none'
            })
        }
    }

    function buildUrl(url, params) {
        //组装Url
        var httpUri = [];
        for (var k in params) {
            httpUri.push(k + "=" + encodeURI(params[k]));
        }
        return url + "?" + httpUri.join("&");
    }

    function copyBtn(e) {
        return false;
    }

    function sina(title, localUrl, picUrl) {
        var url = "http://service.weibo.com/share/share.php";
        var data = {
            title: opt.title,
            url: opt.url || localUrl,
            source: 'bookmark',
            appkey: "appkey",
            pic: opt.pic || picUrl,
            ralateUid: '来自安居客的分享按钮'
        };
        window.open(buildUrl(url, data));
    }

    function renren(title, localUrl, picUrl) {
        var url = 'http://widget.renren.com/dialog/share';
        var data = {
            resourceUrl: opt.url || localUrl,
            srcUrl: opt.url || localUrl,
            title: opt.title || title,
            pic: opt.pic || picUrl,
            description: opt.desc
        };
        window.open(buildUrl(url, data));
    }

    function qzone(title, localUrl, picUrl) {
        var url = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey";
        var data = {
            url: opt.url || localUrl,
            title: opt.title || title,
            pics: opt.pic || picUrl,
            summary: opt.desc
        };
        window.open(buildUrl(url, data));
    }

    function tqq(title, localUrl, picUrl) {
        var url = "http://share.v.t.qq.com/index.php";
        var data = {
            c: "share",
            a: "index",
            title: opt.title,
            url: opt.url || localUrl,
            appkey: "appkey",
            site: 'www.anjuke.com',
            pic: opt.pic || picUrl
        };
        window.open(buildUrl(url, data));
    }

    return {
        setLocalUrl: setLocalUrl, //设置URL
        setTitle: setTitle, //设置标题
        setDesc: setDesc, //设置标题
        show: show, //弹出显示
        hide: hide, //弹出隐藏
        buildUrl: buildUrl, //拼接URL
        copyBtn: copyBtn, //复制按钮
        sina: sina, //新浪分享
        renren: renren, //人人分享
        qzone: qzone, //qq空间分享
        tqq: tqq //腾讯QQ分享
    }
}

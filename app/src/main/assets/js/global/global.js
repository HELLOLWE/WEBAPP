/**
 * Created by stivepeim on 14/04/2017.
 */

var $$ = jQuery.noConflict();
//处理首页跳转功能
(function ($, doc) {
    $.init({
        swipeBack: true //启用右滑关闭功能
    });
    $.ready(function () {

    });
})(mui, document);
////////////////////////////////////////////////////////JSON data 处理 START
//验证errCode
function check_codeISOK(code) {
    return code === 999;
}
////////////////////////////////////////////////////////JSON data 处理 END

////////////////////////////////////////////////////////按钮倒计时 START
var wait = 60;//倒计时时间
function countDown(o) {
    if (wait == 0) {
        o.removeAttr("disabled");
        o.text("获取验证码");
        wait = 60;
    } else {
        o.attr("disabled", true);
        o.text("" + wait + "重新发送");
        wait--;
        setTimeout(function () {
                countDown(o)
            },
            1000);
    }
}
////////////////////////////////////////////////////////按钮倒计时 END

////////////////////////////////////////////////////////处理用户相关START
function userIsLogOn() {//只要返回的不是null就证明用户已经登录
    // return localStorage.getItem(USER_ISLOGIN);
    console.log('token:'+$$.cookie(USER_ISLOGIN));
    return checkIsNullUndefindEmpty($$.cookie(USER_ISLOGIN));
}
////////////////////////////////////////////////////////处理用户相关END

/////////////////////////////////////////////////////////暂时性START
function watingDeving() {
    mui.toast('正在建造请稍等！');
}
/////////////////////////////////////////////////////////暂时性END


//////////////////////////////////////////////////////////底部菜单按钮处理START

// 首页
$$("#toOA").on("tap", function (event) {
    mui.openWindow({
        url: "main.html",
        id: "main",
        waiting: {
            autoShow: true,
            title: '正在加载'
        }
    });
});

$$("#toDAIBAN").on("tap", function (event) {
    watingDeving();
    //mui.openWindow({
    //    url: "business/daiban/approval.html",
    //    id: "approval",
    //    waiting: {
    //        autoShow: true,
    //        title: '正在加载'
    //    }
    //});
});

$$("#toCONTACT").on("tap", function (event) {
    //watingDeving();
    mui.openWindow({
        url: "business/contact/contact.html",
        id: "contact",
        waiting: {
            autoShow: true,
            title: '正在加载'
        }
    });
});

$$("#toMyZone").on("tap", function (event) {
    mui.openWindow({
        url: "business/my/my.html",
        id: "my",
        waiting: {
            autoShow: true,
            title: '正在加载'
        }
    });
});

/*我的页面*/
$$("#toMy").on("tap", function (event) {
    mui.openWindow({
        url: "my.html",
        id: "my",
        waiting: {
            autoShow: true,
            title: '正在加载'
        }
    });
});

$$("#toContextbyMy").on("tap", function (event) {
    mui.openWindow({
        url: "../../business/contact/contact.html",
        id: "my",
        waiting: {
            autoShow: true,
            title: '正在加载'
        }
    });
});

$$("#toOApage").on("tap", function (event) {
    mui.openWindow({
        url: "../../main.html",
        id: "main",
        waiting: {
            autoShow: true,
            title: '正在加载'
        }
    });
});

/*联系人列表界面*/
$$("#toOAbyContent").on("tap", function (event) {
    mui.openWindow({
        url: "../../main.html",
        id: "main",
        waiting: {
            autoShow: true,
            title: '正在加载'
        }
    });
});

$$("#toMybyContent").on("tap", function (event) {
    mui.openWindow({
        url: "../../business/my/my.html",
        id: "my",
        waiting: {
            autoShow: true,
            title: '正在加载'
        }
    });
});


function curentTime() {
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒

    var clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    if (hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";

    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}
//////////////////////////////////////////////////////////底部菜单按钮处理END
//////////////////////////////////////////////////////////获取url参数 START
var urlTools = {
    //获取RUL参数值
    getUrlParam: function(name) {               /*?videoId=identification  */
        var params = decodeURI(window.location.search);        /* 截取？号后面的部分    index.html?act=doctor,截取后的字符串就是?act=doctor  */
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = params.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    },
    getUrlForAliPay:function () {
        var url = decodeURI(window.location.search);
        var pram = url.substring(url.indexOf('?')+1);
        return pram;
    },
    getUrlForWChatPay:function(){
        var url=decodeURI(window.location.search);
        var pram = url.substring(url.indexOf('=')+1);
        return pram;
    }
};
//////////////////////////////////////////////////////////获取url参数 END

//////////////////////////////////////////////////////////设置项目存储数据Cookie
//设置cookie
function setCookie(name, value, day) {
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires=' + date;
}

//获取cookie
function getCookie(name) {
    var reg = RegExp(name + '=([^;]+)');
    var arr = document.cookie.match(reg);
    if (arr) {
        return arr[1];
    } else {
        return '';
    }
}

//删除cookie
function delCookie(name) {
    setCookie(name, null, -1);
}

//////////////////////////////////////////////////////////
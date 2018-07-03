(function ($, doc) {
    $.init();
    $.ready(function () {
        var toRegister = $$("#toRegister"); //注册账号
        var toresetpwd = $$("#toresetpwd"); //忘记密码
        var login = $$("#tologin");
        var mobileNo = document.getElementById("mobileNo");
        var pwd = document.getElementById("pwd");
        var action = ''; //记住密码选择框的状态

        //处理登录事件
        login.on("tap", function (event) {
            if (mobileNo.value == "") {
                mui.toast("登录账号不能为空！");
                return;
            }else if (pwd.value == "") {
                mui.toast("密码不能为空！");
                return;
            }else if (!checkPWDLenght(pwd.value)) {
                mui.toast("输入密码长度不合法");
                return;
            }else{
                //登录成功，跳转到首页面
                showMsgDialog('登录成功');
                mui.openWindow({
                    url: "main.html",
                    id: "main"
                });
            }
        });

        function showMsgDialog(title) {
            layer.open({
                content: title
                , skin: 'footer'
                , time: 3
                , color: '#000000'
            });
        }
    });
})(mui, document);
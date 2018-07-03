/**配件包装方案搜索业务处理
 * Created by LWE on 2017-12-18.
 */
mui.init();
(function ($) {
    //验证登录
    var $scrollWrapper = $('.mui-scroll-wrapper');
    var $muiSearch = $(".mui-search");
    var txtSearch =document.getElementById("txtSeach");

    //阻尼系数
    var deceleration = mui.os.ios ? 0.003 : 0.0009;
    $scrollWrapper.scroll({
        bounce: false,
        indicators: true, //是否显示滚动条
        deceleration: deceleration
    });

    //绑定搜索事件
    $muiSearch.on("search", "#txtSeach", function () {
        var searchKeywords = this.value;
        if (searchKeywords === "") {
            $.toast("请输入搜索关键字");
            console.log("请输入搜索关键字");
            return;
        }else{
            //获取查询关键字
            GotoShowModel();
        }
    });

    mui(document.body).on('click', '.mui-btn', function(e) {
        var searchKeywords = txtSearch.value;

            if (searchKeywords === "") {
                $.toast("请输入搜索关键字");
                console.log("请输入搜索关键字"+searchKeywords);
                return;
            }else{
                //获取查询关键字
                GotoShowModel();
            }
    });

    /**
     * 跳转至登录页面
     */
    function GotoShowModel() {
        $.openWindow({
            url: "web/showPack3DModel.html",
            id: "login",
            waiting: {
                autoShow: true
            }
        });
    }
})(mui);
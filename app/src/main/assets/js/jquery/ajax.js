/**
 * Created by stivepeim on 14/06/2017.
 */
/*****************************************************************
 jQuery Ajax封装通用
 *****************************************************************/
/////////////////////////////////////////////////////////////URL url 定义START
const APP_REQUEST_URI = 'http://esp.qq-china.com:8080/esp/';
//login
const LOGIN_URL = APP_REQUEST_URI + 'loginApp.action';
//消息列表
const MSGLIST_URL = APP_REQUEST_URI + "workInformAction!getWorkInformListByApp.action";
//填写界面下拉项
//options  sys.department部门	 col.ccno成本中心	 wr.worktype工作类型     order.typecode1业务分类     order.typecode3类型分类 	order.statecode状态		order.typecode2下单分类
const QUERY_URL = APP_REQUEST_URI + "workInformAction!findOption.action";
//校验当前日清是否填写
const CHECKOUT_URL = APP_REQUEST_URI + "workInformAction!checkDateByApp.action";
//创建timesheet
const CREATE_URL = APP_REQUEST_URI + "workInformAction!addWorkInformByApp.action";
//查询订单号
const ORDERFORMNO = APP_REQUEST_URI + "order!searchByApp.action";
//打卡接口
const COLOCK = APP_REQUEST_URI + "classNotesAction!doCard.action";
//打卡查询接口
const QUERY = APP_REQUEST_URI + "classNotesAction!findCard.action";
//迟到打卡接口
const LEVENCOLOCK = APP_REQUEST_URI + "classNotesAction!lateAndLevenDoCard.action";
//办公范围
const WROKLOCATION = APP_REQUEST_URI + "classNotesAction!findLocation.action";
//上下班时间定义
const TIME = APP_REQUEST_URI + "classNotesAction!findTime.action";
/**
 * 2017-03-08 帮助台部分添加接口
 */
//帮助台列表列表
const TASKLIST = APP_REQUEST_URI + "xiaoxi!GetWillDoByUserNo.action";
//消息详情
const MESSAGE_DETAIL = APP_REQUEST_URI + "xiaoxi!GetXiaoxiInfoByXiaoxiId.action";
// 接收系统消息
const RECEIVE_MESSAGE = APP_REQUEST_URI + "xiaoxi!receiveMessage.action"; //接收系统消息
//消息回复
const REPLY_MESSAGE = APP_REQUEST_URI + "jiaohu!UserInterActiveXiaoxi.action";
//联系人信息数据接口
const CONTACT = APP_REQUEST_URI + "showUserMsgAction!showUserMsg.action";
//创建消息
const CREATE_MSG = APP_REQUEST_URI + "xiaoxi!createMessage.action";
//系统模块代码集查询
const SYS_MODULE = APP_REQUEST_URI + "systemmodule!GetAllSystemModule.action";
//查询当前用户相关的消息号
const QUERY_MSGID = APP_REQUEST_URI + "workInformAction!getMessageInfo.action";
//查询对应消息下的消息简单回复的会话列表
const QUERY_SESSIONLIST = APP_REQUEST_URI + "xiaoxi!GetXiaoxiReply.action";

/**
 * 2017-07-05 流程提报部分功能接口
 */
//1.2.1	获取用户菜单接口
const QUERY_OPTIONMENU = APP_REQUEST_URI + "treemenu!getStartTreeMenu.action";
//1.2.2	待处理流程列表接口
const QUERY_TASKLIST_DCL = APP_REQUEST_URI + "workflow!listTask.action";
//1.2.3	已提报流程列表接口
const QUERY_TASKLIST_YTB = APP_REQUEST_URI + "workflow!listTaskSubmit.action";
//1.2.4	已处理流程列表接口
const QUERY_TASKLIST_YCL = APP_REQUEST_URI + "workflow!listTaskDone.action";
//1.2.5	请假数据录入接口
const CREATE_LEAVEBILL = APP_REQUEST_URI + "leaveBill!addLeaveBill.action";
//1.2.7 请假数据提交接口
const SUBMIT_PROCESSDATA = APP_REQUEST_URI + "leaveBill!startProcess.action";
//1.2.6	报销数据录入及提交接口
const CREATE_BX = APP_REQUEST_URI + "expense!addExpense.action";
//请假数据录入及提交接口
const CREATE_QJ = APP_REQUEST_URI + "leaveBill!addLeaveBill.action";
//1.2.8	请假审批接口
const SUBMITTASK_QJ = APP_REQUEST_URI + "leaveBill!submitTask.action";
//1.2.9	报销审批接口
const SUBMITTASK_BX = APP_REQUEST_URI + "expense!submitTask.action";
//1.2.10 查看流程图接口
const FIND_LCIMAGE = APP_REQUEST_URI + "workflow!viewCurrentImageByProcessDefIdAndProcinstId.action";
const SHOW_LCIMG = APP_REQUEST_URI + "workflow!viewImage.action";
//1.2.11 查看详细业务数据接口,
const FIND_DETAILBYID = APP_REQUEST_URI + "workflow!viewHisComment.action";
//1.2.12 查询用户待处理流程数据详情,该数据详情包含附有审批权限的用户的审批操作。
const FIND_DCLDETAILBYID = APP_REQUEST_URI + "workflow!viewTaskForm.action";

const VERSION = '?version=1.0';//后台定义的访问接口版本号，应该对后面的更新有用
/////////////////////////////////////////////////////////////URL url 定义END

$(function () {
    //const TIKET = '&t=' + ((jQuery.cookie(USER_ISLOGIN) === undefined || jQuery.cookie(USER_ISLOGIN) === 'null') ? " " : jQuery.cookie(USER_ISLOGIN));//用户身份，以t=token的形式经过url传递
    /**
     * ajax封装
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
     * 注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
     * type 请求方式("POST" 或 "GET")， 默认为 "GET"
     * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * successfn 成功回调函数
     * errorfn 失败回调函数
     */
    jQuery.ax = function (urlType, url, data, async, type, dataType, successfn, errorfn) {
        // async = (async == null || async == "" || typeof(async) == "undefined") ? "true" : async;
        type = (type == null || type == "" || typeof(type) == "undefined") ? "post" : type;
        dataType = (dataType == null || dataType == "" || typeof(dataType) == "undefined") ? "json" : dataType;
        data = (data == null || data == "" || typeof(data) == "undefined") ? {"date": new Date().getTime()} : data;
        var fullUrl = '';
        fullUrl += APP_REQUEST_URI;
        fullUrl += url;
        console.log('url:' + fullUrl);
        console.log('pram:' + JSON.stringify(data));
        $$.ajax({
            type: type,
            async: async,
            data: JSON.stringify(data),
            url: fullUrl,
            dataType: dataType,
            headers: {'Content-Type': 'application/json'},
            success: function (d) {
                console.log('axspost_successfn:' + JSON.stringify(d));
                successfn(d);
            },
            error: function (e) {
                console.log('axspost_errorfn:' + JSON.stringify(e));
                errorfn(e);
            }
        });
    };
    /**
     * ajax封装
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * successfn 成功回调函数
     */
    jQuery.axpost = function (url, data, successfn, errfn) {
        data = (data == null || data == "" || typeof(data) == "undefined") ? {"date": new Date().getTime()} : data;
        console.log('ajaxPram:' + JSON.stringify(data));
        $$.ajax({
            type: "post",
            data: JSON.stringify(data),
            url: url,
            dataType: "json",
            headers: {'Content-Type': 'application/json'},
            success: function (d) {
                console.log('axpost_successfn:' + JSON.stringify(d));
                successfn(d);
            },
            error: function (e) {
                console.log('axpost_errorfn:' + JSON.stringify(e));
                errfn(e);
            }
        });
    };
    /**
     * ajax封装
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * successfn 成功回调函数
     * errorfn 失败回调函数
     */
    jQuery.axspost = function (url, data, successfn, errorfn) {
        data = (data == null || data == "" || typeof(data) == "undefined") ? {"date": new Date().getTime()} : data;//处理数据
        var fullUrl = '';
        fullUrl += url;
        console.log('url:' + fullUrl + JSON.stringify(data));
        $$.ajax({
            type: "post",
            data: JSON.stringify(data),
            url: fullUrl,
            async: true,
            dataType: "jsonp",
            //headers: {'Content-Type': 'application/json'},
            success: function (d) {
                console.log('axspost_successfn:' + JSON.stringify(d));
                successfn(d);
            },
            error: function (e) {
                console.log('axspost_errorfn:' + JSON.stringify(e));
                errorfn(e);
            }
        });
    };
});

/**
 * 使用AJAX的POST方式异步请求服务端函数(有加载动画)
 * @param requrestUrl 请求地址
 * @param postParam 请求参数
 * @param responseSuccessFunc 请求成功执行函数
 * @constructor
 *
 * 登录时使用的网络请求方法
 */
function AjaxAsyncPostWithAnimation(requrestUrl, postParam, responseSuccessFunc) {

    //加载动画
    var layerIndex = LayerLoading();
    //通过ajax请求
    jQuery.ajax({
        type: "POST",
        async: true,
        url: requrestUrl,
        data: postParam,
        dataType: "json",
        success: function (data) {

            console.info('用户登录成功网络数据：' + JSON.stringify(data));
            //获取JSON对象
            //var jsonObj = data[0];


            //获取代码
            var code = data["status"];
            console.info('用户登录请求CODE：' + JSON.stringify(code));

            //获取消息
            //var msg = jsonObj["msg"];

            //获取数据源
            //var dataObj = jsonObj["data"];

            //判断是否是服务端操作失败
            if (code == ResponseCode.yes) {
                //服务端处理成功
                responseSuccessFunc(data);
            }
            else if (code == ResponseCode.no) {
                //弹出错误消息
                LayerFailureMsg("登录失败,请检查用户名和密码是否正确。");
            } else {
                //弹出警告消息
                showHintMsg("请求结果异常");
            }
        },
        error: function () {
            //弹出错误消息
            showHintMsg("请求服务端失败");
        },
        complete: function () {
            //关闭加载动画
            LayerClose(layerIndex);
        }
    });
}


/**
 * 使用AJAX的POST方式异步请求服务端函数(有加载动画)
 * @param requrestUrl 请求地址
 * @param postParam 请求参数
 * @param responseSuccessFunc 请求成功执行函数
 * @constructor
 *
 * 获取日志填写界面代码集时使用的网络请求方法
 */

//headers:{
//    Connection:close
//},
function AjaxAsyncPostForTSTag(requUrl, postParam, responseSuccessFunc, responseErrorFunc) {

    //加载动画
    var layerIndex = LayerLoading();
    //通过ajax请求
    jQuery.ajax({
        type: "POST",
        async: true,
        url: requUrl,
        data: postParam,
        dataType: "json",
        success: function (data) {
            LayerClose(layerIndex);
            //获取代码
            var code = JSON.stringify(data["status"]);
            //判断是否是服务端操作失败
            if (code === ResponseCode.yes) {
                //服务端处理成功
                responseSuccessFunc(data);
            }
            else if (code === ResponseCode.no) {
                //弹出错误消息
                responseErrorFunc(data);
            } else {
                responseSuccessFunc(data);

                //  LayerWarningMsg("请求结果异常");
            }
        },
        error: function () {
            //弹出错误消息
            showHintMsg("请求服务端失败");
        },
        complete: function () {
            //关闭加载动画
            LayerClose(layerIndex);
        }
    });
}

/**
 * 移动打卡操作网络请求方法
 *
 * */
function AjaxAsyncForPushCard(requUrl, postParam, responseSuccessFunc, responseErrorFunc) {

    //加载动画
    var layerIndex = LayerLoading();
    //通过ajax请求
    jQuery.ajax({
        type: "POST",
        async: true,
        url: requUrl,
        data: postParam,
        dataType: "json",
        success: function (data) {
            LayerClose(layerIndex);
            console.info('网络数据：' + JSON.stringify(data));
            //获取代码
            var code = JSON.stringify(data);
            //判断是否是服务端操作失败
            if (code !== "") {
                //服务端处理成功
                console.info("非空");
                responseSuccessFunc(data);
            } else {
                console.info("空的");
                responseErrorFunc(data);
                //弹出警告消息
                showHintMsg("请求结果失败");
            }
        },
        error: function () {
            //弹出错误消息
            showHintMsg("请求服务端失败");
        },
        complete: function () {
            //关闭加载动画
            LayerClose(layerIndex);
        }
    });
}

/**
 * 使用AJAX的POST方式异步请求服务端函数(有加载动画)
 * @param requrestUrl 请求地址
 * @param postParam 请求参数
 * @param responseSuccessFunc 请求成功执行函数
 * @constructor
 *
 * 获取消息号数据集时使用的网络请求方法
 */
function AjaxAsyncPostForMsgNo(requUrl, postParam, responseSuccessFunc, responseErrorFunc) {

    //加载动画
    var layerIndex = LayerLoading();
    //通过ajax请求
    jQuery.ajax({
        type: "POST",
        async: true,
        url: requUrl,
        data: postParam,
        dataType: "json",
        success: function (data) {
            LayerClose(layerIndex);
            console.info('网络数据：' + JSON.stringify(data));
            //获取代码
            var code = JSON.stringify(data["status"]);
            //判断是否是服务端操作失败
            if (code === ResponseCode.yes) {
                //服务端处理成功
                console.info("成功");
                responseSuccessFunc(data);
            }
            else if (code === ResponseCode.no) {
                //弹出错误消息
                console.info("失败");
                showHintMsg("网络请求失败");
            } else {
                //弹出警告消息
                console.info("异常" + JSON.stringify(data));
                responseErrorFunc(data);
                showHintMsg("请求结果异常");
            }
        },
        error: function (ere) {
            //弹出错误消息
            showHintMsg("请求服务端失败");
            console.info("请求服务端失败:" + JSON.stringify(ere));
        },
        complete: function () {
            //关闭加载动画
            LayerClose(layerIndex);
        }
    });
}

/**
 * 获取消息号
 * */
function AjaxAsyncPostForNewMsgNo(requUrl, postParam, responseSuccessFunc, responseErrorFunc) {

    //加载动画
    var layerIndex = LayerLoading();
    //通过ajax请求
    jQuery.ajax({
        type: "POST",
        async: true,
        url: requUrl,
        data: postParam,
        dataType: "json",
        success: function (data) {
            LayerClose(layerIndex);
            console.info('网络数据：' + JSON.stringify(data));
            //获取代码
            var code = JSON.stringify(data);
            //判断是否是服务端操作失败
            if (code.value !== "") {
                //服务端处理成功
                responseSuccessFunc(data);
            } else {
                //弹出警告消息
                showHintMsg("请求结果异常");
                responseErrorFunc(data);
            }
        },
        error: function (ere) {
            //弹出错误消息
            showHintMsg("请求服务端失败");
            console.info("请求服务端失败:" + JSON.stringify(ere));
        },
        complete: function () {
            //关闭加载动画
            LayerClose(layerIndex);
        }
    });
}

//获取联系人列表数据
function AjaxAsyncForLinkMan(requUrl, postParam, responseSuccessFunc, responseErrorFunc) {

    //加载动画
    var layerIndex = LayerLoading();
    //通过ajax请求
    jQuery.ajax({
        type: "GET",
        async: true,
        url: requUrl,
        data: postParam,
        dataType: "json",
        success: function (data) {
            LayerClose(layerIndex);
            console.info('网络数据：' + JSON.stringify(data));
            //获取代码
            var code = JSON.stringify(data);
            //判断是否是服务端操作失败
            if (code !== "") {
                //服务端处理成功
                console.info("非空");
                responseSuccessFunc(data);
            } else {
                console.info("空的");
                responseErrorFunc(data);
                //弹出警告消息
                showHintMsg("请求结果失败");
            }
        },
        error: function () {
            //弹出错误消息
            showHintMsg("请求服务端失败");
        },
        complete: function () {
            //关闭加载动画
            LayerClose(layerIndex);
        }
    });
}

function AjaxAsyncForOutLogin(requUrl, postParam, responseSuccessFunc, responseErrorFunc) {
    //通过ajax请求
    jQuery.ajax({
        type: "POST",
        async: true,
        url: requUrl,
        data: postParam,
        dataType: "json",
        success: function (data) {
            //服务端处理成功
            responseSuccessFunc(data);
        },
        error: function (error) {
            responseErrorFunc(error);

        },
        complete: function () {
        }
    });
}

/**
 * 弹出加载动画(默认提示信息)
 */
function LayerLoading() {
    return layer.open({
        type: 2,
        shadeClose: true
    });
}
/**
 * 弹出失败信息
 * @param msg 消息内容
 */
function LayerFailureMsg(msg) {
    layer.open({
        type: 0,
        content: "<div class='failureTips'></div><div class='tipsContent'>" + msg + "</div>",
        shadeClose: true,
        time: 2
    });
}

/**
 * 弹出警告信息
 * @param msg 消息内容
 */
function LayerWarningMsg(msg) {
    layer.open({
        type: 0,
        content: "<div class='warningTips'></div><div class='tipsContent'>" + msg + "</div>",
        shadeClose: true,
        time: 2
    });
}

function showHintMsg(title) {
    layer.open({
        content: title
        , skin: 'footer'
        , time: 3
        , color: '#000000'
    });
}
/**
 * 关闭弹出层
 * @param layerIndex 弹出层索引
 */
function LayerClose(layerIndex) {
    layer.close(layerIndex);
}

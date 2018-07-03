/**
 * Created by Stivepeim on 2017/4/1.
 */

/////////////////////////////////////////////////////////////运行环境定义 START
const isDev = false;//是否开发环境
/////////////////////////////////////////////////////////////运行环境定义 END
/**
 *用户信息
 */

//////////////////////////////////////////////////////////////用户信息 START
const USER={
    username:'esp-username',
    userno:'esp-userno'
};
//////////////////////////////////////////////////////////////用户信息 END
const RespUrl={
    findTimeSheetList:"http://esp.qq-china.com:8080/esp/workInformAction!getWorkInformListByApp.action",//获取工作日志列表数据
    findPushCardList:"http://esp.qq-china.com:8080/esp/classNotesAction!findCard.action",//获取打卡记录详情数据列表
    findContentList:"http://esp.qq-china.com:8080/esp/showUserMsgAction!showUserMsg.action", //获取联系人列表数据
    findHelpDeskList:"http://esp.qq-china.com:8080/esp/xiaoxi!GetWillDoByUserNo.action" //获取帮助台
};

/**
 * 工作日志参数对象
 */
//////////////////////////////////////////////////////////////工作日志已选 START
var USER_CHOSE_TM = {};//用户日志对象valye
USER_CHOSE_TM.ORDNO = '';//已选订单号
USER_CHOSE_TM.ORDNAME = '';//已选订单名称
USER_CHOSE_TM.MSGNO = '';//已选消息号
USER_CHOSE_TM.MSGNAME = '';//已选消息名称
USER_CHOSE_TM.CBZX = '';//已选成本中心
USER_CHOSE_TM.CBZXNAME = '';//已选成本中心名称
USER_CHOSE_TM.DATE = '';//已选工作日期
USER_CHOSE_TM.TIME = '';//已选工作时长
USER_CHOSE_TM.WORKTYPE = '';//已选工作类型
USER_CHOSE_TM.WORKTYPENAME = '';//已选工作类型名称
USER_CHOSE_TM.WORKCONTENT = '';//工作详情信息
//////////////////////////////////////////////////////////////工作日志已选 END

//////////////////////////////////////////////////////////////支付信息 START
var ZHIFUTYPE = {};
ZHIFUTYPE.ALIPAY = 'alipay';
ZHIFUTYPE.WEIXIN = 'wxpay';
//////////////////////////////////////////////////////////////支付信息 END

//////////////////////////////////////////////////////////////流量 START
const LL={//流量参数配置
    regionType:{//地区标识
        POROVINCE:'province',//本地
        COUNTRY:'country'
    }

};

const ResponseCode={
    yes:'0',
    no:'999'
};
//////////////////////////////////////////////////////////////流量 END


/////////////////////////////////////////////////////////////Order START]
const ORDER = {//订单信息
    data:'order-data',
    order:'order-code',
    phonenum:'user-phone',
    skunume:'sku-name',
    skuid:'sku-id',
    saleprice: 'sku-price',
    payway:'order-pay'
};
const SPX_ORDER={//碎屏险订单信息
    phonebrand:'phone-brond',
    phonemodel:'phone-model',
    saleprice: 'ord-price'
};

const SP_ORDER={//碎屏险订单信息
    prodprice:'prod-price', //商品价格
    modelnum:'prod-num'//商品数量
};

const PAYTAG={
    spxorderpay:'SPX',
    llczorderpay:'LLCZ',
    goodsinfoorderpay:'DZSP'
};

const ORDERTAG="PayTag";//支付订单标记

const ORDERTYPE = {};//获取订单信息参数
ORDERTYPE.ALL = null;//属性为空则查询全部
ORDERTYPE.WEIZHIFU = 0;//未支付
ORDERTYPE.YIZHIFU = 1;//已支付
/////////////////////////////////////////////////////////////Order END


//////////////////////////////////////////////////////////////PRAM 参数名称定义START
const YIJIHUO = "yiJiHuo";//已激活
const WEIJIHUO = "weiJiHuo";//未激活
const YISHIXIAO = "yiShiXiao";//已失效
const JIHUOZHONG = "jiHuoZhong";//激活中

const TICKET = "ticket";//用户手机号码
const MOBILENO = "mobileNumber";//投保手机号码
const CODE = "code";//验证码
const COUPONCODE = "couponCode";//代金券号
const COUPONNAME = "couponName";//代金券名称
const COUPONVALIDATE = "couponValidate";//代金券有效期
const IDTYPE = "idType";//投保人证件类型
const IDNUMBER = "idNumber";//投保人证件号码
const NAME = "name";//投保人姓名
const SEX = "sex";//投保人性别
// const IMEI = "imei";//投保手机串号
const BRITHDAY = "birthday";//投保人生日
const PHONEALLNAME = "phoneAllName";//投保手机全称
const PHONEMODEID = "phoneModelId";//手机型号ID
const PRODUCTID = "productId";//产品id
const MOUTHUSERSELECT = "userSelected";//碎屏险用户选择的月份
//////////////////////////////////////////////////////////////PRAM 参数名称定义END

//////////////////////////////////////////////////////////////STATUS 代金券状态START
//Integer 0未激活，10 激活中，90 过期，99激活失败 ，100，激活成功
var STATUS_WEIJIHUO = 0;
var STATUS_JIHUOZHONG = 10;
var STATUS_GUOQI = 90;
var STATUS_JIHUOSHIBAI = 99;
var STATUS_JIHUOCHENGGONG = 100;


var TEXT_WEIJIHUO = "未激活";
var TEXT_JIHUOZHONG = "激活中";
var TEXT_JIHUOSHIBAI = "激活失败";
var TEXT_JIHUOCHENGGONG = "激活成功";
var TEXT_YISHIXIAO = "已失效";
var TEXT_YIWANCHENG = "已完成";
//////////////////////////////////////////////////////////////STATUS 代金券状态END


/////////////////////////////////////////////////////////////User info START
const USER_ISLOGIN = "userIsLogin";//是否登录0未登录1已登录
const USER_MOBILENO = "userMobileNo";//当前登录用户手机号码
/////////////////////////////////////////////////////////////User info END


/////////////////////////////////////////////////////////////H5HomeTypes START
const H5HOMETYPE = "h5HomeType";
/////////////////////////////////////////////////////////////H5HomeTypes END

/////////////////////////////////////////////////////////////Product START
const ALLPRODUCTLIST = 'allProductList';
const SALEPRODUCTID = 'seleProductId';
/////////////////////////////////////////////////////////////Product EDN


/////////////////////////////////////////////////////////////PagePram START 分页
const PAGECOUNT=10;//默认分页10条数据
/////////////////////////////////////////////////////////////PagePram END 分页




//获取地址栏参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}

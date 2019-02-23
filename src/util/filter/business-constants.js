import Vue from 'vue';

export function packingMachineryType(value) {
  switch (value) {
    case 1:
      return "打包机";
    case 2:
      return "回收机";
    case 3:
      return "集草机";
    case 4:
      return "灭茬机";
    case 5:
      return "搂草机";
    case 6:
      return "破冰机";
    default:
      return "-";
  }
}

/**
 // 状态
 export function mbrStatus(value) {
  switch (value) {
    case "VALID":
      return "有效";
    case "SUSPEND":
      return "吊销";
    case "CLOSE":
      return "关闭";
    default:
      return "-";
  }
}

 export function defaultStatusFilter(value) {
  switch (value) {
    case false:
      return "否";
    case true:
      return "是";
    default:
      return "-";
  }
}

 export function payMethod(value) {
  return {
    ALIPAY_PAGE: "支付宝网页",
    ALIPAY_F2F: "支付宝扫码",
    WEIXIN_NATIVE: "微信扫码"
  }[value];
}

 // 提交状态
 export function submitStatus(value) {
  switch (value) {
    case "有效":
      return "VALID";
    case "吊销":
      return "SUSPEND";
    case "关闭":
      return "CLOSE";
    default:
      return "-";
  }
}

 // 奖金池类型
 export function prizeType(value) {
  switch (value) {
    case "PAYOUT":
      return "奖金";
    case "BET":
      return "下注";
    case "REDEEM":
      return "兑换";
    case "RECHARGE":
      return "充值";
    case "BONUS":
      return "贈送";
    default:
      return "-";

  }
}

 // 支付方式
 export function paymentMethod(value) {
  switch (value) {
    case "ALIPAY_PAGE":
      return "支付宝网页";
    case "ALIPAY_F2F":
      return "支付宝扫码";
    case "WEIXIN_NATIVE":
      return "支付宝扫码";
    default:
      return "-";
  }
}

 Vue.filter('payMethod', (val) => {
  return payMethod(val)
});

 Vue.filter('statusFilter', (val) => {
  if (!val) return '-';
  return mbrStatus(val)
});
 Vue.filter('defaultAddressFilter', (val) => {
  if (!val) return '否';
  return defaultStatusFilter(val)
});
 Vue.filter('submitStatusFilter', (val) => {
  return submitStatus(val)
});
 Vue.filter('paymentMethodFilter', (val) => {
  if (!val) return '-';
  return paymentMethod(val)
});
 Vue.filter('prizeTypeFilter', (val) => {
  return prizeType(val)
});
 Vue.filter('orderStatus', val => {
  return {
    "REQUEST": "待支付",
    "PROCESS": "待收货",
    "SUCCESS": "成功",
    "CANCEL": "取消",
  }[val]
})
 Vue.filter('productStatus',val=>{
  return {
    "CLOSE": "已下架",
    "VALID": "上架中",
  }[val]
});

 Vue.prototype.$statusFilter = Vue.filter('statusFilter'); // 状态
 Vue.prototype.$defaultAddressFilter = Vue.filter('defaultAddressFilter'); // 默认地址显示
 Vue.prototype.$submitStatusFilter = Vue.filter('submitStatusFilter'); // 提交状态
 Vue.prototype.$paymentMethodFilter = Vue.filter('paymentMethodFilter'); // 支付方式
 Vue.prototype.$prizeTypeFilter = Vue.filter('prizeTypeFilter'); // 奖金池类型
 Vue.prototype.$amountTypeFilter = Vue.filter('amount'); // 积分正负号
 Vue.prototype.$orderStatus = Vue.filter('orderStatus');
 */


Vue.filter('packingMachineryTypeFilter', (val) => {
  return packingMachineryType(val)
});
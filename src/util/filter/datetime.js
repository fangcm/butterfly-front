import Vue from 'vue';

// 日期
export function formatDate(date, fmt) {
  // console.log(typeof(fmt))
  fmt = fmt.replace(/\"/g, "");
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

// 日期时间戳
export function timestamp(date) {
  return Date.parse(new Date(date));
}

Vue.filter('dateFilter', (val, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  // Vue.filter('dateFilter', (val, fmt = 'yyyy-MM-dd') => {
  if (!val) return '-';
  let time = new Date(val);
  return formatDate(time, fmt)
});
Vue.filter('timeStampFilter', (val) => {
  return timestamp(val)
});

Vue.filter('date', (val,type) => {
  if(type ==='start'){
    var start = new Date(val); // Wed Apr 18 2018 00:00:00 GMT+0800 (中国标准时间)
    start.setHours(0, 0, 0, 0); // 设置指定的时间的小时字段。
    start = start.getTime(); //时间戳
    return start
  }else{
    var end = new Date(val);
    end.setHours(23, 59, 59, 59);
    end = end.getTime();
    return end
  }
  // new Date(1526659199059)           // new Date()) 转化出来是标准时间
  // Fri May 18 2018 23:59:59 GMT+0800 (中国标准时间)
  // new Date(new Date(1526659199059)) // new Date(new Date()) 转化出来 还！是 ！标准时间！！
  // Fri May 18 2018 23:59:59 GMT+0800 (中国标准时间)
});

Vue.prototype.$dateFilter = Vue.filter('dateFilter'); // 日期格式化
Vue.prototype.$timeStampFilter = Vue.filter('timeStampFilter'); // 时间戳
Vue.prototype.$date = Vue.filter('date')

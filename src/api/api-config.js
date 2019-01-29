/**
 * Created by szatpig on 2017/11/14.
 */

import { GetQueryString } from '@/util/util'

console.log('当前开发环境：'+ process.env.NODE_ENV);

let api_config={};

const _orgCode = sessionStorage.getItem('orgCode');

const commonUrl = location.hostname == 'wxpay.dev.zt.raiyi.com' ? '/raiyi/helper':'/zxbapi/helper';
const wxUrl = location.hostname == 'wxpay.dev.zt.raiyi.com' ? '/raiyi':'/zxbapi';

if(process.env.NODE_ENV === 'production'){
  api_config={
    user:commonUrl,
    task:commonUrl,
    wex:commonUrl,
    authorUrl:location.hostname == 'wxpay.dev.zt.raiyi.com' ? 'http://wxpay.dev.zt.raiyi.com': 'http://zxb.2491.raiyi.com',
    orgId: _orgCode ? _orgCode : 'orgcode_21',
    common:commonUrl,
    zaok:commonUrl
  }
}else{
  api_config={
    user:'/user/helper',
    task:'/task/helper',
    wex:'/wex',
    authorUrl:'http://wxpay.dev.zt.raiyi.com',
    orgId: _orgCode ? _orgCode : 'orgcode_21',
    common:'/common',
    zaok:'/zaok'
  };
}

export  default api_config;

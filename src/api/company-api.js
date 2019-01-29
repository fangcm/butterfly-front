/**
 * Created by szatpig on 2018/1/25.
 */
import { fetch } from './../util/api'
import api from './api-config'


//信息保存
export const entitySave= (data)=> fetch(api.user+'/assenterprise/entity/save',{
  data
});

//信息保存
export const entityInfo= (data)=> fetch(api.user+'/assenterprise/entity/info',{
  data,
  headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
});

//信息获取
export const entityGetSave= (data)=> fetch(api.user+'/assenterprise/entity/save',{
  data
});

// 公司信息列表
export const companyInfoSearch = (data)=> fetch(api.user + '/assenterprise/entity/list',{
  data
});

//企业资金查询
export const fundBalance = (data)=> fetch(api.user + '/assenterprise/fund/balance/info',{
  data,
  headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}

});


//充值
export const balanceRecharge= (data)=> fetch(api.user+'/assenterprise/fund/balance/recharge',{
  data,
});

//充值记录
export const detailList= (data)=> fetch(api.user+'/assenterprise/fund/detail/list',{
  data,
});

//基础配置
export const configList= (data)=> fetch(api.user+'/assenterprise/config/list',{
  data,
  headers:{'Content-Type': 'application/json; charset=UTF-8'}
});



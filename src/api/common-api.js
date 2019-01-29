/**
 * Created by szatpig on 2018/1/26.
 */
import { fetch } from './../util/api'
import api from './api-config'

//信息保存
export const regionList= (data)=> fetch(api.user+'/assenterprise/org/city/view',{
  data,
  headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
});

//全部省市数据
export const regionAllList= (data)=> fetch(api.user+'/assenterprise/city/view',{
  data,
  headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
});

//全部省市数据
export const getCityChildren= (data)=> fetch(api.common+'/dsp/city/getChildren',{
  data,
  headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
});

//行业列表
export const industryList= (data)=> fetch(api.user+'/assenterprise/org/industry/getByOrg',{
  data
});

//行业列表
export const templateList= (data)=> fetch(api.user+'/relation/template/list',{
  data
});

//规模
export const availableLimit= (data)=> fetch(api.user+'/assenterprise/area/limit/availableLimit',{
  data,
  headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
});

//数据统计
export const uploadLoadStatistics= (data,code,action)=> fetch('/statistics/upload/'+ code +'/0/'+action ,{
  data,
  'type':'get'
});

export const uploadClickStatistics= (data,code,action)=> fetch('/statistics/upload/'+ code +'/1/'+action,{
  data,
  'type':'get'
});

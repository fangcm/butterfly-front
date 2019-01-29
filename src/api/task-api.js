/**
 * Created by szatpig on 2018/1/30.
 */
import { fetch } from './../util/api'
import api from './api-config'


//任务时间选择
export const timeList= (data)=> fetch(api.user+'/assenterprise/period/availablePeriod',{
  data,
  headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
});

//模板选择
export const assTemplate= (data)=> fetch(api.user+'/relation/template/list',{
  data
});

//任务信息保存
export const taskSave= (data)=> fetch(api.user+'/assenterprise/task/save',{
  data
});


//任务费用
export const calculateFee= (data)=> fetch(api.user+'/assenterprise/task/calculate/fee',{
  data,
  headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
});

//营销任务列表
export const assTaskList = (data)=> fetch(api.user + '/assenterprise/task/list',{
  data
});

//营销任务列表状态详情
export const assTaskDetail = (data)=> fetch(api.user + '/assenterprise/task/detail/list',{
  data
});

//营销禁用
export const assTaskUpdate = (data)=> fetch(api.user + '/assenterprise/task/update/status',{
  data,
  headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
});



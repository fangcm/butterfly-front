import {fetch} from './axios'
import api from './api-config'


// 我的打包机
export const myPackingMachineryList = (data) => fetch(api.baseUrl + 'packing/myPackingMachinery.json', {
  'params': data,
  'type': 'get'
});

// 我的打包数据
export const myPackingDataList = (data) => fetch(api.baseUrl + 'packing/myPackingData.json', {
  'params': data,
  'type': 'get'
});

// 打包机
export const packingMachineryList = (data) => fetch(api.baseUrl + 'machinery/packaging' + data.pageNumber + '.json', {
  'params': data,
  'type': 'get'
});


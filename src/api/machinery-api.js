import {fetch} from '@/util/api'
import api from './api-config'


// 打包机
export const myPackingMachineryList = (data) => fetch(api.baseUrl + 'packing/myPackingMachinery.json', {
  'params': data,
  'type': 'get'
});


// 打包机
export const packagingMachineryList = (data) => fetch(api.baseUrl + 'machinery/packaging' + data.pageNumber + '.json', {
  'params': data,
  'type': 'get'
});


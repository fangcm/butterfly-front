/**
 * Created by fangcm on 2019/01/30.
 */

import {GetQueryString} from '@/util/util'

console.log('当前环境：' + process.env.NODE_ENV);

let api_config = {};

if (process.env.NODE_ENV === 'production') {
  api_config = {
    baseUrl: '/dz/'
  }
} else {
  api_config = {
    baseUrl: '/'
  };
}

export default api_config;

/**
 * Created by fangcm on 2019/01/30.
 */


console.log('当前环境：' + process.env.NODE_ENV);

let api_config = {};

if (process.env.NODE_ENV === 'production') {
  api_config = {
    baseUrl: '/demo/data/'
  }
} else {
  api_config = {
    baseUrl: '/data/'
  };
}

export default api_config;

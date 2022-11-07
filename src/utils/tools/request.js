/*
 * @Author: lzl
 * @Date: 2021-05-06 09:16:16
 * @LastEditTime: 2021-07-05 12:00:31
 * @FilePath: \tsp_arcgis_3d_v2\src\utils\request.js
 * @Description:
 */
import axios from 'axios';
import { Message } from 'element-ui';
// create an axios instance
const service = axios.create({
  baseURL: 'http://192.168.101.177/hgsims-rest',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 6e4 // request timeout
});
const CancelToken = axios.CancelToken;
const cache = new Map();
service.interceptors.request.use(
  (config) => {
    try {
      const { url } = config;
      const source = CancelToken.source();
      // TODO 重复请求过滤
      cache.set(url, source);
      if (!config.params) {
        config.params = {};
      }

      if (localStorage.getItem("access_token")) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = 'bearer ' + localStorage.getItem("access_token");
      }
      return { ...config, CancelToken: source.token };
    } catch (error) {
      console.log(error);
      return config;
    }
  },
  (error) => {
    console.log('err' + error); // for debug
    return Promise.reject(error);
  }
);
// response interceptor
service.interceptors.response.use(
  (response) => {
    const { url } = response.config;
    const current = cache.get(url);
    if (current) {
      cache.delete(url);
    }
    const res = response.data;

    if (
      res.hasOwnProperty('error_code') &&
      res.error_code === '401' &&
      res.hasOwnProperty('error_reason') &&
      res.error_reason === 'invalid_token' &&
      process.env.VUE_APP_SSO_AUTH === 'yzt_fwaq'
    ) {
      // 重新刷新窗口获取token，用以解决将一张图应用集成到实施监督系统后，用户长期不刷新浏览器（超过2小时）导致token过期的问题
      window.location.reload();
    }

    // if the custom code is not 20000, it is judged as an error.
    if (res.hasOwnProperty('success') && !res.success) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      });

      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else {
      // console.log('err' + error); // for debug
      if (error.message.indexOf('404') < 0) {
        Message({
          // message: data.message || data.content,
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        });
      }
    }

    return Promise.reject(error);
  }
);

export default service;

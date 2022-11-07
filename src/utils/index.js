import axios from 'axios'
import { Message } from 'element-ui'

// 添加请求拦截器
axios.interceptors.request.use(config=>{
    console.log(config);
    // 在发送请求之前做些什么
     // 登录授权 请求验证是否有token  需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
  config.headers.Authorization = localStorage.getItem('token')
    return config;
  },error=> {
    console.log(error);
    // 对请求错误做些什么
    return Promise.reject(error);
  });
//响应拦截器
axios.interceptors.response.use(success=>{
  //业务逻辑
  if(success.status&&success.status==200){
      if(success.data.code==500||success.data.code==401||success.data.code==403){
          Message.error({message:success.data.message})
          return
      }
      if(success.data.message){
        Message.success({message:success.data.message})
      }
  }
  return success.data
}, error=>{
   if(error.response.code==504||error.response.code==404){
    Message.error({message:"请求错误"})
   }else if(error.response.code==403){
    Message.error({message:"权限不足"})
   }else if(error.response.code==401){
    Message.error({message:"请登录"})
   }else{
    Message.error({message:"未知错误"})
   }
   return
})

let base=""
//封装post请求
export const postRequest=(url,params)=>{
   return axios({
       method:'post',
       url:`${base}${url}`,
       data:params
   })
}
//封装put请求
export const putRequest=(url,params)=>{
    return axios({
        method:'put',
        url:`${base}${url}`,
        data:params
    })
 }
//封装get请求
 export const getRequest=(url,params)=>{
    return axios({
        method:'get',
        url:`${base}${url}`,
        data:params
    })
 }
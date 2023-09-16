import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: '/dev-api',
  // 超时
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
  const token=sessionStorage.getItem("token")
  if (token){
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config
}, 
error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res=>{
    if(res.status==200){
      return res.data
    }else{
      
    }
  },
  error=>{

  }
)


export default service

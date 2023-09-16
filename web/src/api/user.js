import requst from "@/utils/http.js"

export const login=(username,password)=>{
  return requst({
    url:"/user/account/token",
    method:"post",
    data:{username,password}
  })
}

export const getInfo=()=>{
  return requst({
    url:"/user/account/info",
    method:"get",
  })
}

export const register=(username,password,password0)=>{
  return requst({
    url:"/user/account/register",
    method:"post",
    data:{username,password,password0}
  })
}

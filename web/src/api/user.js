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

export const addBot=(data)=>{
  return requst({
    url:"/user/bot/add",
    method:"post",
    data
  })
}

export const deleteBot=(id)=>{
  return requst({
    url:"/user/bot/delete",
    method:"post",
    data:{id}
  })
}

export const updateBot=(data)=>{
  return requst({
    url:"/user/bot/update",
    method:"post",
    data
  })
}

export const getBots=()=>{
  return requst({
    url:"/user/bot/list",
  })
}

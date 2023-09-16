import requst from "@/utils/http.js"

export const login=(username,password)=>{
  return requst({
    url:"/user/account/token",
    method:"post",
    data:{username,password}
  })
}

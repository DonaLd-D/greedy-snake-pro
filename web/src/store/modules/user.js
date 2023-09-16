import { login,getInfo } from "../../api/user"
import router from '../../router'

const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      username:"",
      avatar:""
    }),
    actions: {
      toLogin(username,password){
        login(username,password).then(res=>{
          sessionStorage.setItem("token",res.token)
          this.toGetInfo()
          router.push({path:"/"})
        })
      },
      toGetInfo(){
        getInfo().then(res=>{
          console.log("success",res)
          this.username=res.username
          this.avatar=res.avatar
        })
      },
      logout(){
        this.username="",
        this.avatar=""
        sessionStorage.removeItem("token")
      }
    }
  })

export default useUserStore
